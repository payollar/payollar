import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database helper functions
export async function getUsers(userType?: string) {
  if (userType) {
    return await sql`
      SELECT u.*, 
             CASE 
               WHEN u.user_type = 'talent' THEN tp.stage_name
               WHEN u.user_type = 'media_owner' THEN mop.company_name
               ELSE NULL
             END as display_name
      FROM users u
      LEFT JOIN talent_profiles tp ON u.id = tp.user_id
      LEFT JOIN media_owner_profiles mop ON u.id = mop.user_id
      WHERE u.user_type = ${userType}
      ORDER BY u.created_at DESC
    `
  }

  return await sql`
    SELECT u.*, 
           CASE 
             WHEN u.user_type = 'talent' THEN tp.stage_name
             WHEN u.user_type = 'media_owner' THEN mop.company_name
             ELSE CONCAT(u.first_name, ' ', u.last_name)
           END as display_name
    FROM users u
    LEFT JOIN talent_profiles tp ON u.id = tp.user_id
    LEFT JOIN media_owner_profiles mop ON u.id = mop.user_id
    ORDER BY u.created_at DESC
  `
}

export async function getBookings(status?: string) {
  const query = status
    ? sql`
        SELECT b.*, 
               t.first_name as talent_first_name, 
               t.last_name as talent_last_name,
               tp.stage_name,
               mo.first_name as media_owner_first_name,
               mo.last_name as media_owner_last_name,
               mop.company_name
        FROM bookings b
        JOIN users t ON b.talent_id = t.id
        JOIN users mo ON b.media_owner_id = mo.id
        LEFT JOIN talent_profiles tp ON t.id = tp.user_id
        LEFT JOIN media_owner_profiles mop ON mo.id = mop.user_id
        WHERE b.status = ${status}
        ORDER BY b.start_datetime DESC
      `
    : sql`
        SELECT b.*, 
               t.first_name as talent_first_name, 
               t.last_name as talent_last_name,
               tp.stage_name,
               mo.first_name as media_owner_first_name,
               mo.last_name as media_owner_last_name,
               mop.company_name
        FROM bookings b
        JOIN users t ON b.talent_id = t.id
        JOIN users mo ON b.media_owner_id = mo.id
        LEFT JOIN talent_profiles tp ON t.id = tp.user_id
        LEFT JOIN media_owner_profiles mop ON mo.id = mop.user_id
        ORDER BY b.start_datetime DESC
      `

  return await query
}

export async function getDashboardStats() {
  const [users, bookings, revenue] = await Promise.all([
    sql`SELECT user_type, COUNT(*) as count FROM users WHERE user_type != 'admin' GROUP BY user_type`,
    sql`SELECT status, COUNT(*) as count FROM bookings GROUP BY status`,
    sql`SELECT SUM(budget) as total FROM bookings WHERE payment_status = 'paid'`,
  ])

  return { users, bookings, revenue: revenue[0]?.total || 0 }
}

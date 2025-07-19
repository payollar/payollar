import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    // Get user statistics
    const userStats = await sql`
      SELECT 
        user_type,
        COUNT(*) as count
      FROM users 
      WHERE user_type != 'admin'
      GROUP BY user_type
    `

    // Get booking statistics
    const bookingStats = await sql`
      SELECT 
        status,
        COUNT(*) as count
      FROM bookings 
      GROUP BY status
    `

    // Get revenue statistics
    const revenueStats = await sql`
      SELECT 
        SUM(budget) as total_revenue,
        COUNT(*) as total_bookings,
        AVG(budget) as avg_booking_value
      FROM bookings 
      WHERE payment_status = 'paid'
    `

    // Get recent activity
    const recentBookings = await sql`
      SELECT 
        b.id,
        b.title,
        b.status,
        b.created_at,
        tp.stage_name as talent_name,
        mop.company_name
      FROM bookings b
      JOIN users t ON b.talent_id = t.id
      JOIN users mo ON b.media_owner_id = mo.id
      LEFT JOIN talent_profiles tp ON t.id = tp.user_id
      LEFT JOIN media_owner_profiles mop ON mo.id = mop.user_id
      ORDER BY b.created_at DESC
      LIMIT 5
    `

    // Format the data
    const userCounts = userStats.reduce(
      (acc, row) => {
        acc[row.user_type] = Number.parseInt(row.count)
        return acc
      },
      {} as Record<string, number>,
    )

    const bookingCounts = bookingStats.reduce(
      (acc, row) => {
        acc[row.status] = Number.parseInt(row.count)
        return acc
      },
      {} as Record<string, number>,
    )

    const revenue = revenueStats[0] || { total_revenue: 0, total_bookings: 0, avg_booking_value: 0 }

    return NextResponse.json({
      users: {
        talents: userCounts.talent || 0,
        mediaOwners: userCounts.media_owner || 0,
        total: (userCounts.talent || 0) + (userCounts.media_owner || 0),
      },
      bookings: {
        pending: bookingCounts.pending || 0,
        confirmed: bookingCounts.confirmed || 0,
        completed: bookingCounts.completed || 0,
        cancelled: bookingCounts.cancelled || 0,
        total: Object.values(bookingCounts).reduce((sum, count) => sum + count, 0),
      },
      revenue: {
        total: Number.parseFloat(revenue.total_revenue) || 0,
        totalBookings: Number.parseInt(revenue.total_bookings) || 0,
        average: Number.parseFloat(revenue.avg_booking_value) || 0,
      },
      recentActivity: recentBookings,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard statistics" }, { status: 500 })
  }
}

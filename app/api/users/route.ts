import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userType = searchParams.get("type")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    let query = `
      SELECT u.*, 
             CASE 
               WHEN u.user_type = 'talent' THEN tp.stage_name
               WHEN u.user_type = 'media_owner' THEN mop.company_name
               ELSE CONCAT(u.first_name, ' ', u.last_name)
             END as display_name,
             tp.talent_type,
             tp.hourly_rate,
             mop.company_name,
             mop.media_type
      FROM users u
      LEFT JOIN talent_profiles tp ON u.id = tp.user_id
      LEFT JOIN media_owner_profiles mop ON u.id = mop.user_id
    `

    const params = []
    if (userType && userType !== "all") {
      query += ` WHERE u.user_type = $${params.length + 1}`
      params.push(userType)
    }

    query += ` ORDER BY u.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const users = await sql(query, params)

    // Get total count
    let countQuery = "SELECT COUNT(*) as total FROM users u"
    const countParams = []
    if (userType && userType !== "all") {
      countQuery += ` WHERE u.user_type = $${countParams.length + 1}`
      countParams.push(userType)
    }

    const totalResult = await sql(countQuery, countParams)
    const total = Number.parseInt(totalResult[0].total)

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, userType, firstName, lastName, phone, bio, location } = body

    // In a real app, you'd hash the password
    const passwordHash = `$2b$10$${password}_hashed`

    const result = await sql`
      INSERT INTO users (email, password_hash, user_type, first_name, last_name, phone, bio, location)
      VALUES (${email}, ${passwordHash}, ${userType}, ${firstName}, ${lastName}, ${phone}, ${bio}, ${location})
      RETURNING id, email, user_type, first_name, last_name, created_at
    `

    return NextResponse.json({ user: result[0] }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

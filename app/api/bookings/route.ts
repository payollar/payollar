import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    let query = `
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
    `

    const params = []
    if (status && status !== "all") {
      query += ` WHERE b.status = $${params.length + 1}`
      params.push(status)
    }

    query += ` ORDER BY b.start_datetime DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const bookings = await sql(query, params)

    // Get total count
    let countQuery = "SELECT COUNT(*) as total FROM bookings b"
    const countParams = []
    if (status && status !== "all") {
      countQuery += ` WHERE b.status = $${countParams.length + 1}`
      countParams.push(status)
    }

    const totalResult = await sql(countQuery, countParams)
    const total = Number.parseInt(totalResult[0].total)

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      talentId,
      mediaOwnerId,
      title,
      description,
      eventType,
      startDatetime,
      endDatetime,
      location,
      budget,
      isRemote,
    } = body

    const result = await sql`
      INSERT INTO bookings (
        talent_id, media_owner_id, title, description, event_type, 
        start_datetime, end_datetime, location, budget, is_remote
      )
      VALUES (
        ${talentId}, ${mediaOwnerId}, ${title}, ${description}, ${eventType},
        ${startDatetime}, ${endDatetime}, ${location}, ${budget}, ${isRemote}
      )
      RETURNING *
    `

    return NextResponse.json({ booking: result[0] }, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

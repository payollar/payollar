import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookingId = Number.parseInt(params.id)

    const booking = await sql`
      SELECT b.*, 
             t.first_name as talent_first_name, 
             t.last_name as talent_last_name,
             t.email as talent_email,
             tp.stage_name,
             tp.talent_type,
             mo.first_name as media_owner_first_name,
             mo.last_name as media_owner_last_name,
             mo.email as media_owner_email,
             mop.company_name,
             mop.media_type
      FROM bookings b
      JOIN users t ON b.talent_id = t.id
      JOIN users mo ON b.media_owner_id = mo.id
      LEFT JOIN talent_profiles tp ON t.id = tp.user_id
      LEFT JOIN media_owner_profiles mop ON mo.id = mop.user_id
      WHERE b.id = ${bookingId}
    `

    if (booking.length === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ booking: booking[0] })
  } catch (error) {
    console.error("Error fetching booking:", error)
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookingId = Number.parseInt(params.id)
    const body = await request.json()
    const { status, paymentStatus } = body

    const updates = []
    const values = []
    let paramCount = 1

    if (status) {
      updates.push(`status = $${paramCount}`)
      values.push(status)
      paramCount++
    }

    if (paymentStatus) {
      updates.push(`payment_status = $${paramCount}`)
      values.push(paymentStatus)
      paramCount++
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(bookingId)

    const query = `
      UPDATE bookings 
      SET ${updates.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *
    `

    const result = await sql(query, values)

    if (result.length === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ booking: result[0] })
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}

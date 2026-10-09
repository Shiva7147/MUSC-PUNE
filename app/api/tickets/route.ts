import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/tickets - Fetch all tickets from Supabase
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Format fields to match AdminTicketRecord interface
    const formatted = (data || []).map((t: any) => ({
      ticketId: t.ticket_id,
      screeningId: t.screening_id,
      matchTitle: t.match_title,
      venue: t.venue,
      date: t.date,
      time: t.time,
      quantity: t.quantity,
      totalAmount: t.total_amount,
      userName: t.user_name,
      userEmail: t.user_email,
      userPhone: t.user_phone,
      bookingDate: t.booking_date ? new Date(t.booking_date).toLocaleString('en-IN') : new Date().toLocaleString('en-IN'),
      qrDataUrl: t.qr_data_url || '',
      paymentStatus: t.payment_status || 'SUCCESS',
      checkedIn: Boolean(t.checked_in),
      checkedInAt: t.checked_in_at,
      checkedInBy: t.checked_in_by,
    }));

    return NextResponse.json({ tickets: formatted }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/tickets - Upsert ticket into Supabase
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const payload = {
      ticket_id: body.ticketId,
      screening_id: body.screeningId,
      match_title: body.matchTitle,
      venue: body.venue,
      date: body.date,
      time: body.time,
      quantity: body.quantity,
      total_amount: body.totalAmount,
      user_name: body.userName,
      user_email: body.userEmail,
      user_phone: body.userPhone,
      qr_data_url: body.qrDataUrl,
      payment_status: body.paymentStatus || 'SUCCESS',
      checked_in: Boolean(body.checkedIn),
      checked_in_at: body.checkedInAt || null,
      checked_in_by: body.checkedInBy || null,
    };

    const { data, error } = await supabaseAdmin
      .from('tickets')
      .upsert(payload)
      .select();

    if (error) {
      console.error('API Ticket Upsert Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

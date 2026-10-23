import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// POST /api/webhooks/razorpay
// Handles Razorpay Webhook Events: order.paid, payment.captured, payment.failed
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;

    // Verify webhook signature if secret is provided
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        console.warn('Razorpay webhook signature mismatch.');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const event = payload.event;
    console.log(`[Razorpay Webhook] Received event: ${event}`, {
      orderId: payload.payload?.order?.entity?.id || payload.payload?.payment?.entity?.order_id,
      paymentId: payload.payload?.payment?.entity?.id,
      amount: payload.payload?.payment?.entity?.amount,
      status: payload.payload?.payment?.entity?.status,
    });

    switch (event) {
      case 'order.paid':
      case 'payment.captured': {
        const payment = payload.payload?.payment?.entity;
        const order = payload.payload?.order?.entity;
        console.log(`[Razorpay Webhook] Payment Captured for Order ${order?.id || payment?.order_id}, Payment ID: ${payment?.id}`);
        break;
      }
      case 'payment.failed': {
        const payment = payload.payload?.payment?.entity;
        console.warn(`[Razorpay Webhook] Payment Failed for Order ${payment?.order_id}, Error:`, payment?.error_description);
        break;
      }
      default:
        console.log(`[Razorpay Webhook] Unhandled event type: ${event}`);
    }

    return NextResponse.json({ status: 'success', event, received: true }, { status: 200 });
  } catch (err: any) {
    console.error('Razorpay webhook error:', err);
    return NextResponse.json({ error: err.message || 'Webhook processing failed' }, { status: 500 });
  }
}

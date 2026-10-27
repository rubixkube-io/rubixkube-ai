import { NextResponse } from 'next/server'

/**
 * Razorpay Checkout's callback_url. When the card's 3-D Secure step takes over the whole tab (popups blocked,
 * in-app browsers), Razorpay finishes there and POSTs the result here instead of calling the page back. This
 * only sends the buyer back to /hubble/buy with the subscription id; the page then asks orchestrator whether
 * it is paid, so nothing posted here is trusted.
 */
export async function POST(request: Request) {
  const form = await request.formData().catch(() => null)
  const target = new URL('/hubble/buy', request.url)
  const subscription = form?.get('razorpay_subscription_id')
  const failure = form?.get('error[description]')
  if (typeof subscription === 'string' && /^sub_[A-Za-z0-9]{1,40}$/.test(subscription)) {
    target.searchParams.set('paid', subscription)
  } else {
    target.searchParams.set('failed', typeof failure === 'string' ? failure.slice(0, 200) : '')
  }
  // 303: the browser follows with a GET
  return NextResponse.redirect(target, 303)
}

export function GET(request: Request) {
  return NextResponse.redirect(new URL('/hubble/buy', request.url), 303)
}

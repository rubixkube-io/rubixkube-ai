/**
 * Buying Hubble seats: the form posts to orchestrator (api.rubixkube.ai), which makes a Razorpay
 * subscription, then Razorpay Checkout takes the card. Orchestrator sets up the organization from
 * Razorpay's webhook and emails the buyer an admin invite; nothing here decides that.
 */

export const HUBBLE_API_URL = process.env.NEXT_PUBLIC_RUBIXKUBE_API_URL ?? 'https://api.rubixkube.ai'

const RAZORPAY_CHECKOUT_JS = 'https://checkout.razorpay.com/v1/checkout.js'

/** Per seat, in US dollars. Must match the Razorpay plans orchestrator uses and the Hubble page's prices. */
export const HUBBLE_SEAT_PRICE = { monthly: 20, annual: 204 } as const
export const HUBBLE_MAX_SEATS = 500

export type Billing = keyof typeof HUBBLE_SEAT_PRICE

export interface CheckoutForm {
  seats: number
  billing: Billing
  name: string
  email: string
  company: string
}

export interface Checkout {
  subscription_id: string
  key_id: string
  seats: number
  interval: 'monthly' | 'yearly'
  currency: string
  amount_per_seat: number
  amount: number
}

interface RazorpayPayment {
  razorpay_payment_id: string
  razorpay_subscription_id: string
  razorpay_signature: string
}

interface RazorpayCheckout {
  open: () => void
  close?: () => void
  on: (event: 'payment.failed', handler: (response: { error?: { description?: string } }) => void) => void
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckout
  }
}

async function post<T>(path: string, body: unknown): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${HUBBLE_API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Could not reach RubixKube. Check your connection and try again.')
  }
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const detail = data?.detail
    // A 422 lists what was wrong with each field
    const message = Array.isArray(detail)
      ? 'Check the details you entered.'
      : typeof detail === 'string'
        ? detail
        : 'Something went wrong. Try again.'
    throw new Error(message)
  }
  return data as T
}

export function startCheckout(form: CheckoutForm): Promise<Checkout> {
  return post<Checkout>('/billing/hubble/checkout', {
    seats: form.seats,
    interval: form.billing === 'annual' ? 'yearly' : 'monthly',
    name: form.name,
    email: form.email,
    company: form.company,
  })
}

/** Asks orchestrator whether Razorpay has the subscription paid. Any failure reads as not yet. */
export async function isPaid(subscriptionId: string): Promise<boolean> {
  try {
    const response = await fetch(`${HUBBLE_API_URL}/billing/hubble/checkout/${encodeURIComponent(subscriptionId)}/status`)
    return response.ok && (await response.json())?.paid === true
  } catch {
    return false
  }
}

/** How often the page asks while Checkout is open */
const PAID_CHECK_MS = 5000

/** The order being paid, kept in the tab across Razorpay's redirect (see /hubble/buy/return) */
export interface PendingOrder {
  subscriptionId: string
  email: string
  company: string
}

const PENDING_KEY = 'rk.hubble.pendingOrder'

function rememberOrder(order: PendingOrder) {
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(order))
  } catch {
    // private mode: the return page falls back to generic wording
  }
}

export function pendingOrder(subscriptionId: string): PendingOrder | null {
  try {
    const order = JSON.parse(sessionStorage.getItem(PENDING_KEY) || 'null') as PendingOrder | null
    return order?.subscriptionId === subscriptionId ? order : null
  } catch {
    return null
  }
}

/** Asks until the subscription reads as paid or the time runs out (Razorpay can take a moment to settle). */
export async function waitUntilPaid(subscriptionId: string, timeoutMs = 60_000): Promise<boolean> {
  const until = Date.now() + timeoutMs
  for (;;) {
    if (await isPaid(subscriptionId)) return true
    if (Date.now() > until) return false
    await new Promise((resolve) => setTimeout(resolve, 3000))
  }
}

let loading: Promise<void> | null = null

function loadRazorpay(): Promise<void> {
  if (window.Razorpay) return Promise.resolve()
  loading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = RAZORPAY_CHECKOUT_JS
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      loading = null
      reject(new Error('The payment form did not load. Turn off blockers for checkout.razorpay.com and try again.'))
    }
    document.body.appendChild(script)
  })
  return loading
}

export type PaymentOutcome =
  | { status: 'paid'; email: string; company: string }
  /** Checkout was closed without a payment; `error` is the last failed attempt's reason, if any */
  | { status: 'closed'; error?: string }

/**
 * Opens Razorpay Checkout for the subscription. A failed attempt keeps Checkout open for another try.
 *
 * Checkout's success callback does not always reach the page. When popups are blocked (in-app browsers, some
 * settings) the card's 3-D Secure step takes over the whole tab, so Razorpay is given a callback_url
 * (/hubble/buy/return) that brings the buyer back to /hubble/buy?paid=<subscription>, and the order is kept in
 * the tab for that page. While Checkout is open, and once more when it closes, the page also asks orchestrator
 * whether it is paid, so a buyer who pays never sees nothing and pays again.
 */
export async function pay(checkout: Checkout, form: CheckoutForm): Promise<PaymentOutcome> {
  await loadRazorpay()
  const Razorpay = window.Razorpay
  if (!Razorpay) throw new Error('The payment form did not load. Try again.')
  rememberOrder({ subscriptionId: checkout.subscription_id, email: form.email, company: form.company })
  return new Promise<PaymentOutcome>((resolve) => {
    let failure: string | undefined
    let done = false
    const paid: PaymentOutcome = { status: 'paid', email: form.email, company: form.company }
    const finish = (outcome: PaymentOutcome) => {
      if (done) return
      done = true
      window.clearInterval(timer)
      resolve(outcome)
    }
    const razorpay = new Razorpay({
      key: checkout.key_id,
      subscription_id: checkout.subscription_id,
      name: 'RubixKube',
      description: `Hubble, ${checkout.seats} seat${checkout.seats === 1 ? '' : 's'}, billed ${checkout.interval}`,
      prefill: { name: form.name, email: form.email },
      notes: { company: form.company },
      theme: { color: '#2F5BFF' },
      callback_url: `${window.location.origin}/hubble/buy/return`,
      redirect: true,
      handler: (payment: RazorpayPayment) => {
        post<{ email: string; company: string }>('/billing/hubble/checkout/confirm', payment)
          .then((confirmed) => finish({ status: 'paid', ...confirmed }))
          // The payment went through even if this check did not answer; the email still comes
          .catch(() => finish(paid))
      },
      modal: {
        // Closed by the buyer: paid anyway if the money went through before they closed it
        ondismiss: () => {
          isPaid(checkout.subscription_id).then((yes) => finish(yes ? paid : { status: 'closed', error: failure }))
        },
      },
    })
    razorpay.on('payment.failed', (response) => {
      failure = response.error?.description || 'The payment did not go through.'
    })
    const timer = window.setInterval(() => {
      isPaid(checkout.subscription_id).then((yes) => {
        if (!yes || done) return
        razorpay.close?.()
        finish(paid)
      })
    }, PAID_CHECK_MS)
    razorpay.open()
  })
}

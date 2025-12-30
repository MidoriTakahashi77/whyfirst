import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import type Stripe from 'stripe'
import { db } from '../../db'
import { users } from '../../db/schema'
import { stripe } from '../../stripe/client'
import { PLANS } from '../../stripe/config'

const stripeRoutes = new Hono()

// Checkout Session作成
stripeRoutes.post('/checkout', async (c) => {
  const { userId, plan } = await c.req.json<{ userId: string; plan: 'pro' | 'team' }>()

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  // Stripe Customer作成/取得
  let customerId = user.stripeCustomerId
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    })
    customerId = customer.id
    await db.update(users).set({ stripeCustomerId: customerId }).where(eq(users.id, userId))
  }

  // Checkout Session作成
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [
      {
        price: PLANS[plan].priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
  })

  return c.json({ url: session.url })
})

// Customer Portal
stripeRoutes.post('/portal', async (c) => {
  const { userId } = await c.req.json<{ userId: string }>()

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })

  if (!user?.stripeCustomerId) {
    return c.json({ error: 'No subscription found' }, 404)
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  })

  return c.json({ url: session.url })
})

// Webhook
stripeRoutes.post('/webhook', async (c) => {
  const body = await c.req.text()
  const signature = c.req.header('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return c.json({ error: 'Invalid signature' }, 400)
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const _session = event.data.object as Stripe.Checkout.Session
      // TODO: サブスクリプション作成処理
      break
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const _subscription = event.data.object as Stripe.Subscription
      // TODO: サブスクリプション更新処理
      break
    }
  }

  return c.json({ received: true })
})

export default stripeRoutes

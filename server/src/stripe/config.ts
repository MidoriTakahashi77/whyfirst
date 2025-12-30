export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    projectLimit: 3,
    exportLimit: 3,
  },
  pro: {
    name: 'Pro',
    price: 980,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    projectLimit: Number.POSITIVE_INFINITY,
    exportLimit: Number.POSITIVE_INFINITY,
  },
  team: {
    name: 'Team',
    price: 2980,
    priceId: process.env.STRIPE_TEAM_PRICE_ID!,
    projectLimit: Number.POSITIVE_INFINITY,
    exportLimit: Number.POSITIVE_INFINITY,
    features: ['チーム共有', 'ブランドキット'],
  },
} as const

export type PlanType = keyof typeof PLANS

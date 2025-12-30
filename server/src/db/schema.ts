import { boolean, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

// ユーザー（Supabase Authと連携）
export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // Supabase Auth の user.id
  email: text('email').notNull(),
  name: text('name'),
  plan: text('plan').default('free'), // free, pro, team
  stripeCustomerId: text('stripe_customer_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// プロジェクト（デザイン、スライド、ロゴ等）
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  type: text('type').notNull(), // 'design' | 'slide' | 'logo'
  name: text('name'),

  currentStep: text('current_step').default('why'),
  detectedLanguage: text('detected_language').default('ja'),

  why: jsonb('why'),
  mood: jsonb('mood'),
  colour: jsonb('colour'),
  movement: jsonb('movement'),
  shape: jsonb('shape'),
  space: jsonb('space'),
  images: jsonb('images'),
  moodboard: jsonb('moodboard'),
  output: jsonb('output'), // design, slide, logo など各タイプの出力

  isCompleted: boolean('is_completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// エクスポート履歴
export const exports = pgTable('exports', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id),
  format: text('format'), // tailwind, css, json
  createdAt: timestamp('created_at').defaultNow(),
})

// サブスクリプション
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  stripeSubscriptionId: text('stripe_subscription_id'),
  status: text('status'), // active, canceled, past_due
  plan: text('plan'), // pro, team
  currentPeriodEnd: timestamp('current_period_end'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// 型エクスポート
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type Export = typeof exports.$inferSelect
export type NewExport = typeof exports.$inferInsert
export type Subscription = typeof subscriptions.$inferSelect
export type NewSubscription = typeof subscriptions.$inferInsert

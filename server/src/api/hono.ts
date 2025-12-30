import { Hono } from 'hono'
import auth from './routes/auth'
import stripe from './routes/stripe'

const app = new Hono().basePath('/api')

// ヘルスチェック
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.route('/auth', auth)
app.route('/stripe', stripe)

export default app

import { Hono } from 'hono'
import auth from './routes/auth'

const app = new Hono().basePath('/api')

// ヘルスチェック
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Auth routes
app.route('/auth', auth)

export default app

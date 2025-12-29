import { Hono } from 'hono'

const auth = new Hono()

// Get current user info
auth.get('/me', async (c) => {
  // TODO: Implement with Supabase server client
  return c.json({ user: null })
})

// Sign out
auth.post('/signout', async (c) => {
  // TODO: Implement sign out
  return c.json({ success: true })
})

export default auth

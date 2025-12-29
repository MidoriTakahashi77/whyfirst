import { redirect } from 'next/navigation'
import { getUser } from '@/lib/supabase/server'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3">
          <span className="font-bold">Whyfirst</span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

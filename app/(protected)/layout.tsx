/**
 * Protected Layout
 *
 * Shared layout for all protected routes with sidebar navigation.
 * Includes: Dashboard, Trading, Bots
 */

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  // Get user display name from email
  const userData = {
    name: user.email?.split('@')[0] || 'User',
    email: user.email || '',
    avatar: '',
  }

  // Get sidebar state from cookie
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value !== 'false'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={userData} />
      <SidebarInset>
        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

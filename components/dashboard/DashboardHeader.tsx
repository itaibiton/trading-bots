/**
 * Dashboard Header Component
 *
 * Top section of dashboard with welcome message and actions.
 */

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Sparkles } from 'lucide-react'

interface DashboardHeaderProps {
  userName?: string
  displayName?: string
}

export function DashboardHeader({ userName, displayName }: DashboardHeaderProps) {
  // Use display name if available, otherwise extract name from email
  const getDisplayName = () => {
    if (displayName) return displayName
    if (userName) {
      // Extract name part from email (before @)
      const namePart = userName.split('@')[0]
      // Capitalize first letter and replace dots/underscores with spaces
      return namePart
        .replace(/[._]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
    return 'there'
  }

  const name = getDisplayName()

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {name}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your trading bots today.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild size="lg" className="gap-2">
          <Link href="/bots/create/simple">
            <Sparkles className="h-5 w-5" />
            Create New Bot
          </Link>
        </Button>
      </div>
    </div>
  )
}

/**
 * NavMain Component - Sectioned Navigation
 *
 * Renders navigation sections with nested menu items.
 * Supports badges on menu items (e.g., "New" badge).
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type LucideIcon } from 'lucide-react'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'

export interface NavSection {
  label: string
  items: NavItem[]
}

export interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  badge?: {
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }
}

interface NavMainProps {
  sections: NavSection[]
}

export function NavMain({ sections }: NavMainProps) {
  const pathname = usePathname()

  return (
    <>
      {sections.map((section) => (
        <SidebarGroup key={section.label}>
          <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => {
              const isActive = pathname === item.url || pathname.startsWith(item.url + '/')

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.url} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant={item.badge.variant || 'default'}
                          className="ml-auto text-[10px] px-1.5 py-0"
                        >
                          {item.badge.label}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import {
  Bot,
  Grid3x3,
  LayoutDashboard,
  Repeat,
  ShoppingBag,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react"

import { NavMain, type NavSection } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Navigation sections for TradingBot
const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Portfolio",
        url: "/portfolio",
        icon: Wallet,
      },
    ],
  },
  {
    label: "Trading",
    items: [
      {
        title: "DCA Bot",
        url: "/bots/dca",
        icon: Repeat,
      },
      {
        title: "GRID Bot",
        url: "/bots/grid",
        icon: Grid3x3,
      },
      {
        title: "AI Bot",
        url: "/bots/create/simple",
        icon: Bot,
        badge: {
          label: "New",
          variant: "outline",
        },
      },
      {
        title: "Marketplace",
        url: "/marketplace",
        icon: ShoppingBag,
      },
      {
        title: "Manual Trading",
        url: "/trading",
        icon: TrendingUp,
      },
    ],
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    name: string
    email: string
    avatar: string
  }
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Zap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">TradingBot</span>
                  <span className="truncate text-xs text-muted-foreground">Paper Trading</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain sections={navSections} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || {
          name: "User",
          email: "user@example.com",
          avatar: "",
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

interface SidebarLink {
  id: string
  title: string
}

const sections: SidebarLink[] = [
  { id: 'form-components', title: 'Form Components' },
  { id: 'feedback', title: 'Feedback' },
  { id: 'overlay', title: 'Overlay' },
  { id: 'data-display', title: 'Data Display' },
  { id: 'charts', title: 'Charts' },
  { id: 'navigation', title: 'Navigation' },
  { id: 'theme', title: 'Theme' },
]

interface SidebarProps {
  activeSection?: string
}

function SidebarContent({ activeSection }: SidebarProps) {
  return (
    <nav className="space-y-1">
      <div className="pb-2">
        <h2 className="text-lg font-semibold tracking-tight">Components</h2>
        <p className="text-sm text-muted-foreground">Browse all design system components</p>
      </div>
      {sections.map((section) => (
        <Link
          key={section.id}
          href={`#${section.id}`}
          className={cn(
            'block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
            activeSection === section.id
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground'
          )}
          onClick={(e) => {
            e.preventDefault()
            const element = document.getElementById(section.id)
            if (element) {
              const offset = 80
              const elementPosition = element.getBoundingClientRect().top + window.scrollY
              const offsetPosition = elementPosition - offset

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              })
            }
          }}
        >
          {section.title}
        </Link>
      ))}
    </nav>
  )
}

export function Sidebar({ activeSection }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px]">
            <div className="mt-6">
              <SidebarContent activeSection={activeSection} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="sticky top-20 space-y-4">
          <SidebarContent activeSection={activeSection} />
        </div>
      </aside>
    </>
  )
}

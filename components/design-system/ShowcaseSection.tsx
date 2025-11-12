import * as React from 'react'
import { cn } from '@/lib/utils'

interface ShowcaseSectionProps {
  id: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

/**
 * ShowcaseSection - Category section container for the design system
 *
 * Creates a scrollable section with an anchor ID for navigation.
 * Provides consistent spacing and typography across all showcase sections.
 *
 * @param id - Anchor ID for navigation (e.g., "form-components")
 * @param title - Section heading
 * @param description - Optional section description
 * @param children - Component showcase content
 * @param className - Optional additional classes
 */
export function ShowcaseSection({
  id,
  title,
  description,
  children,
  className,
}: ShowcaseSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-20 space-y-6 py-8 first:pt-0',
        className
      )}
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-lg">{description}</p>
        )}
      </div>
      <div className="space-y-8">
        {children}
      </div>
    </section>
  )
}

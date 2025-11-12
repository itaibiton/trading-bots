import * as React from 'react'
import { cn } from '@/lib/utils'

interface ComponentShowcaseProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

/**
 * ComponentShowcase - Reusable wrapper for individual component examples
 *
 * Provides a consistent presentation for component demonstrations with:
 * - Title derived anchor ID for deep linking
 * - Optional description for context
 * - Subtle border and background separation
 * - Responsive padding and spacing
 *
 * @param title - Component name (e.g., "Button", "Input")
 * @param description - Optional description of the component
 * @param children - Visual examples and code snippets
 * @param className - Optional additional classes
 */
export function ComponentShowcase({
  title,
  description,
  children,
  className,
}: ComponentShowcaseProps) {
  // Generate anchor ID from title (e.g., "Button Variants" -> "button-variants")
  const anchorId = title.toLowerCase().replace(/\s+/g, '-')

  return (
    <div
      id={anchorId}
      className={cn(
        'scroll-mt-24 rounded-lg border bg-card p-6 space-y-4',
        'transition-colors hover:border-accent-foreground/20',
        className
      )}
    >
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="pt-2">
        {children}
      </div>
    </div>
  )
}

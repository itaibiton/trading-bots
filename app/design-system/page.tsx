'use client'

import * as React from 'react'
import { Sidebar } from '@/components/design-system/Sidebar'
import { ShowcaseSection } from '@/components/design-system/ShowcaseSection'
import FormComponents from '@/components/design-system/sections/FormComponents'
import FeedbackComponents from '@/components/design-system/sections/FeedbackComponents'
import OverlayComponents from '@/components/design-system/sections/OverlayComponents'
import DataDisplay from '@/components/design-system/sections/DataDisplay'
import ChartComponents from '@/components/design-system/sections/ChartComponents'
import NavigationComponents from '@/components/design-system/sections/NavigationComponents'
import ThemeShowcase from '@/components/design-system/sections/ThemeShowcase'
import { Toaster } from '@/components/ui/sonner'

/**
 * Design System Page
 *
 * Comprehensive showcase of all TradingBot UI components and design patterns.
 * Demonstrates components in both light and dark modes with interactive examples.
 *
 * Structure:
 * - Hero section with title and description
 * - Sticky sidebar navigation (desktop) / Floating action button (mobile)
 * - Showcase sections organized by category
 * - Smooth scroll behavior with anchor links
 *
 * Publicly accessible - no authentication required.
 */
export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = React.useState<string>('')

  // Detect active section on scroll for sidebar highlighting
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    )

    // Observe all section elements
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Design System
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive collection of reusable components, design patterns, and guidelines
              that power the TradingBot platform. Built with React, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                React 19
              </div>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                Next.js 15
              </div>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                TypeScript 5.3+
              </div>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                Tailwind CSS v4
              </div>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                shadcn/ui
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 lg:gap-12">
          <Sidebar activeSection={activeSection} />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="max-w-4xl space-y-12">
              {/* Form Components Section */}
              <ShowcaseSection
                id="form-components"
                title="Form Components"
                description="Input controls and form elements for collecting user data."
              >
                <FormComponents />
              </ShowcaseSection>

              {/* Feedback Section */}
              <ShowcaseSection
                id="feedback"
                title="Feedback"
                description="Components that provide feedback to user actions and system states."
              >
                <FeedbackComponents />
              </ShowcaseSection>

              {/* Overlay Section */}
              <ShowcaseSection
                id="overlay"
                title="Overlay"
                description="Modal windows, dialogs, and popover components."
              >
                <OverlayComponents />
              </ShowcaseSection>

              {/* Data Display Section */}
              <ShowcaseSection
                id="data-display"
                title="Data Display"
                description="Components for presenting data and information clearly."
              >
                <DataDisplay />
              </ShowcaseSection>

              {/* Charts Section */}
              <ShowcaseSection
                id="charts"
                title="Charts"
                description="Visualizations for data trends and statistics."
              >
                <ChartComponents />
              </ShowcaseSection>

              {/* Navigation Section */}
              <ShowcaseSection
                id="navigation"
                title="Navigation"
                description="Components for navigating through the application."
              >
                <NavigationComponents />
              </ShowcaseSection>

              {/* Theme Section */}
              <ShowcaseSection
                id="theme"
                title="Theme"
                description="Color system, typography, and theme customization."
              >
                <ThemeShowcase />
              </ShowcaseSection>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

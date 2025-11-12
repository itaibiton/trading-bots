'use client'

import * as React from 'react'
import { ComponentShowcase } from '../ComponentShowcase'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

/**
 * ThemeShowcase - Comprehensive display of the design system's theme
 *
 * Showcases:
 * - Color palette with light/dark mode values
 * - Typography scale and hierarchy
 * - Spacing scale
 * - Border radius scale
 * - Theme toggle for switching between light/dark/system
 *
 * This section helps developers understand all available design tokens.
 */

interface ColorSwatchProps {
  name: string
  variable: string
  description?: string
}

/**
 * ColorSwatch - Display a single color with its CSS variable and computed value
 */
function ColorSwatch({ name, variable, description }: ColorSwatchProps) {
  const [computedValue, setComputedValue] = React.useState<string>('')

  React.useEffect(() => {
    // Get computed color value from CSS variable
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim()
    setComputedValue(value)
  }, [variable])

  return (
    <div className="space-y-2">
      <div
        className="h-20 rounded-md border shadow-sm transition-colors"
        style={{ backgroundColor: `var(${variable})` }}
        aria-label={`${name} color swatch`}
      />
      <div className="space-y-0.5">
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs text-muted-foreground font-mono">{variable}</div>
        {computedValue && (
          <div className="text-xs text-muted-foreground font-mono">
            {computedValue}
          </div>
        )}
        {description && (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
      </div>
    </div>
  )
}

/**
 * SpacingBox - Visual representation of a spacing value
 */
function SpacingBox({ size, label }: { size: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="bg-primary transition-colors"
        style={{ width: size, height: size }}
        aria-label={`${label} spacing`}
      />
      <div className="text-sm font-mono">{label}</div>
    </div>
  )
}

/**
 * BorderRadiusBox - Visual representation of border radius values
 */
function BorderRadiusBox({ radius, label }: { radius: string; label: string }) {
  return (
    <div className="space-y-2">
      <div
        className="h-20 w-20 bg-primary transition-colors"
        style={{ borderRadius: `var(${radius})` }}
        aria-label={`${label} border radius`}
      />
      <div className="text-sm font-mono">{label}</div>
    </div>
  )
}

export default function ThemeShowcase() {
  // Color categories for better organization
  const baseColors: ColorSwatchProps[] = [
    {
      name: 'Background',
      variable: '--background',
      description: 'Main background color',
    },
    {
      name: 'Foreground',
      variable: '--foreground',
      description: 'Main text color',
    },
    {
      name: 'Card',
      variable: '--card',
      description: 'Card background',
    },
    {
      name: 'Card Foreground',
      variable: '--card-foreground',
      description: 'Card text color',
    },
    {
      name: 'Popover',
      variable: '--popover',
      description: 'Popover background',
    },
    {
      name: 'Popover Foreground',
      variable: '--popover-foreground',
      description: 'Popover text color',
    },
  ]

  const brandColors: ColorSwatchProps[] = [
    {
      name: 'Primary',
      variable: '--primary',
      description: 'Primary brand color',
    },
    {
      name: 'Primary Foreground',
      variable: '--primary-foreground',
      description: 'Text on primary',
    },
    {
      name: 'Secondary',
      variable: '--secondary',
      description: 'Secondary brand color',
    },
    {
      name: 'Secondary Foreground',
      variable: '--secondary-foreground',
      description: 'Text on secondary',
    },
  ]

  const functionalColors: ColorSwatchProps[] = [
    {
      name: 'Muted',
      variable: '--muted',
      description: 'Muted background',
    },
    {
      name: 'Muted Foreground',
      variable: '--muted-foreground',
      description: 'Muted text',
    },
    {
      name: 'Accent',
      variable: '--accent',
      description: 'Accent background',
    },
    {
      name: 'Accent Foreground',
      variable: '--accent-foreground',
      description: 'Text on accent',
    },
    {
      name: 'Destructive',
      variable: '--destructive',
      description: 'Destructive actions',
    },
  ]

  const borderColors: ColorSwatchProps[] = [
    {
      name: 'Border',
      variable: '--border',
      description: 'Default border color',
    },
    {
      name: 'Input',
      variable: '--input',
      description: 'Input border color',
    },
    {
      name: 'Ring',
      variable: '--ring',
      description: 'Focus ring color',
    },
  ]

  const chartColors: ColorSwatchProps[] = [
    { name: 'Chart 1', variable: '--chart-1', description: 'Chart color 1' },
    { name: 'Chart 2', variable: '--chart-2', description: 'Chart color 2' },
    { name: 'Chart 3', variable: '--chart-3', description: 'Chart color 3' },
    { name: 'Chart 4', variable: '--chart-4', description: 'Chart color 4' },
    { name: 'Chart 5', variable: '--chart-5', description: 'Chart color 5' },
  ]

  const sidebarColors: ColorSwatchProps[] = [
    {
      name: 'Sidebar',
      variable: '--sidebar',
      description: 'Sidebar background',
    },
    {
      name: 'Sidebar Foreground',
      variable: '--sidebar-foreground',
      description: 'Sidebar text',
    },
    {
      name: 'Sidebar Primary',
      variable: '--sidebar-primary',
      description: 'Sidebar primary',
    },
    {
      name: 'Sidebar Accent',
      variable: '--sidebar-accent',
      description: 'Sidebar accent',
    },
    {
      name: 'Sidebar Border',
      variable: '--sidebar-border',
      description: 'Sidebar border',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Theme Toggle Section */}
      <ComponentShowcase
        title="Theme Toggle"
        description="Switch between light, dark, and system themes. The entire design system adapts to the selected theme."
      >
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <p className="text-sm text-muted-foreground">
            Try switching themes to see all colors change dynamically
          </p>
        </div>
      </ComponentShowcase>

      {/* Color Palette Section */}
      <ComponentShowcase
        title="Color Palette"
        description="All CSS color variables with their computed OKLCH values. Colors automatically adapt between light and dark modes."
      >
        <div className="space-y-8">
          {/* Base Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Base Colors
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {baseColors.map((color) => (
                <ColorSwatch key={color.variable} {...color} />
              ))}
            </div>
          </div>

          {/* Brand Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Brand Colors
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brandColors.map((color) => (
                <ColorSwatch key={color.variable} {...color} />
              ))}
            </div>
          </div>

          {/* Functional Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Functional Colors
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {functionalColors.map((color) => (
                <ColorSwatch key={color.variable} {...color} />
              ))}
            </div>
          </div>

          {/* Border Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Border & Focus Colors
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {borderColors.map((color) => (
                <ColorSwatch key={color.variable} {...color} />
              ))}
            </div>
          </div>

          {/* Chart Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Chart Colors
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {chartColors.map((color) => (
                <ColorSwatch key={color.variable} {...color} />
              ))}
            </div>
          </div>

          {/* Sidebar Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Sidebar Colors
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {sidebarColors.map((color) => (
                <ColorSwatch key={color.variable} {...color} />
              ))}
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Typography Section */}
      <ComponentShowcase
        title="Typography"
        description="Type scale hierarchy including headings, body text, and specialized text styles."
      >
        <div className="space-y-6">
          {/* Headings */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Headings
            </h4>
            <div className="space-y-4">
              <div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Heading 1
                </h1>
                <code className="text-xs text-muted-foreground">
                  text-4xl font-extrabold lg:text-5xl
                </code>
              </div>
              <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  Heading 2
                </h2>
                <code className="text-xs text-muted-foreground">
                  text-3xl font-semibold
                </code>
              </div>
              <div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Heading 3
                </h3>
                <code className="text-xs text-muted-foreground">
                  text-2xl font-semibold
                </code>
              </div>
              <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Heading 4
                </h4>
                <code className="text-xs text-muted-foreground">
                  text-xl font-semibold
                </code>
              </div>
              <div>
                <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
                  Heading 5
                </h5>
                <code className="text-xs text-muted-foreground">
                  text-lg font-semibold
                </code>
              </div>
              <div>
                <h6 className="scroll-m-20 text-base font-semibold tracking-tight">
                  Heading 6
                </h6>
                <code className="text-xs text-muted-foreground">
                  text-base font-semibold
                </code>
              </div>
            </div>
          </div>

          {/* Body Text */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Body Text
            </h4>
            <div className="space-y-4">
              <div>
                <p className="leading-7">
                  This is regular paragraph text. It uses the default text size
                  and leading for optimal readability. The quick brown fox jumps
                  over the lazy dog.
                </p>
                <code className="text-xs text-muted-foreground">
                  leading-7 (default)
                </code>
              </div>
              <div>
                <p className="text-lg">
                  This is large paragraph text for emphasis or introductory
                  content.
                </p>
                <code className="text-xs text-muted-foreground">text-lg</code>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  This is small muted text, often used for captions or secondary
                  information.
                </p>
                <code className="text-xs text-muted-foreground">
                  text-sm text-muted-foreground
                </code>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  This is extra small text for metadata or fine print.
                </p>
                <code className="text-xs text-muted-foreground">text-xs</code>
              </div>
            </div>
          </div>

          {/* Specialized Text */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Specialized Text
            </h4>
            <div className="space-y-4">
              <div>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                  Inline code
                </code>
                <p className="text-xs text-muted-foreground mt-1">
                  bg-muted px-[0.3rem] py-[0.2rem] font-mono
                </p>
              </div>
              <div>
                <blockquote className="mt-6 border-l-2 pl-6 italic">
                  This is a blockquote. It&apos;s used for quotations or
                  callouts that need visual distinction from regular text.
                </blockquote>
                <p className="text-xs text-muted-foreground mt-1">
                  border-l-2 pl-6 italic
                </p>
              </div>
              <div>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>First item in unordered list</li>
                  <li>Second item in unordered list</li>
                  <li>Third item in unordered list</li>
                </ul>
                <p className="text-xs text-muted-foreground">
                  list-disc ml-6 [&gt;li]:mt-2
                </p>
              </div>
              <div>
                <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                  <li>First item in ordered list</li>
                  <li>Second item in ordered list</li>
                  <li>Third item in ordered list</li>
                </ol>
                <p className="text-xs text-muted-foreground">
                  list-decimal ml-6 [&gt;li]:mt-2
                </p>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Spacing Scale Section */}
      <ComponentShowcase
        title="Spacing Scale"
        description="Standard spacing values used for padding and margins throughout the design system."
      >
        <div className="space-y-4">
          <SpacingBox size="0.25rem" label="1 (4px)" />
          <SpacingBox size="0.5rem" label="2 (8px)" />
          <SpacingBox size="0.75rem" label="3 (12px)" />
          <SpacingBox size="1rem" label="4 (16px)" />
          <SpacingBox size="1.25rem" label="5 (20px)" />
          <SpacingBox size="1.5rem" label="6 (24px)" />
          <SpacingBox size="2rem" label="8 (32px)" />
          <SpacingBox size="2.5rem" label="10 (40px)" />
          <SpacingBox size="3rem" label="12 (48px)" />
          <SpacingBox size="4rem" label="16 (64px)" />
        </div>
      </ComponentShowcase>

      {/* Border Radius Section */}
      <ComponentShowcase
        title="Border Radius"
        description="Standard corner radius values for consistent roundness across components."
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <BorderRadiusBox radius="--radius-sm" label="Small" />
          <BorderRadiusBox radius="--radius-md" label="Medium" />
          <BorderRadiusBox radius="--radius-lg" label="Large" />
          <BorderRadiusBox radius="--radius-xl" label="Extra Large" />
          <div className="space-y-2">
            <div
              className="h-20 w-20 bg-primary transition-colors"
              style={{ borderRadius: '9999px' }}
              aria-label="Full border radius"
            />
            <div className="text-sm font-mono">Full (9999px)</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Base radius: <code className="font-mono">0.625rem (10px)</code>
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Small: base - 4px</li>
            <li>Medium: base - 2px</li>
            <li>Large: base</li>
            <li>Extra Large: base + 4px</li>
          </ul>
        </div>
      </ComponentShowcase>

      {/* Design Tokens Summary */}
      <ComponentShowcase
        title="Design Tokens Summary"
        description="Quick reference for accessing design tokens in your code."
      >
        <div className="space-y-4 text-sm">
          <div>
            <h5 className="font-semibold mb-2">CSS Variables</h5>
            <code className="block bg-muted p-4 rounded-md font-mono text-xs">
              color: var(--primary);
              <br />
              background: var(--background);
              <br />
              border-color: var(--border);
            </code>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Tailwind Utilities</h5>
            <code className="block bg-muted p-4 rounded-md font-mono text-xs">
              className=&quot;bg-primary text-primary-foreground&quot;
              <br />
              className=&quot;border border-border&quot;
              <br />
              className=&quot;text-muted-foreground&quot;
            </code>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Radius Utilities</h5>
            <code className="block bg-muted p-4 rounded-md font-mono text-xs">
              className=&quot;rounded-sm&quot; // --radius-sm
              <br />
              className=&quot;rounded-md&quot; // --radius-md
              <br />
              className=&quot;rounded-lg&quot; // --radius-lg
              <br />
              className=&quot;rounded-xl&quot; // --radius-xl
            </code>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

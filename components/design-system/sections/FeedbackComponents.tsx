'use client'

import * as React from 'react'
import { toast } from 'sonner'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Terminal,
  Loader2,
  User,
  Mail,
  Calendar,
} from 'lucide-react'
import { ComponentShowcase } from '../ComponentShowcase'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * FeedbackComponents - Comprehensive showcase of all feedback UI components
 *
 * Demonstrates:
 * - Alert (default, destructive, with/without icons)
 * - Toast/Sonner (success, error, info, warning, promise, loading)
 * - Progress (determinate, with labels, different states)
 * - Skeleton (text, card, avatar, list loading patterns)
 * - Spinner (different sizes, colors, variants)
 */
export default function FeedbackComponents() {
  const [progressValue, setProgressValue] = React.useState(0)

  // Simulate progress animation
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [progressValue])

  // Toast trigger handlers
  const handleSuccessToast = () => {
    toast.success('Success!', {
      description: 'Your changes have been saved successfully.',
    })
  }

  const handleErrorToast = () => {
    toast.error('Error occurred', {
      description: 'Failed to save changes. Please try again.',
    })
  }

  const handleInfoToast = () => {
    toast.info('Information', {
      description: 'This is an informational message for your reference.',
    })
  }

  const handleWarningToast = () => {
    toast.warning('Warning', {
      description: 'This action may have unintended consequences.',
    })
  }

  const handleLoadingToast = () => {
    toast.loading('Processing...', {
      description: 'Please wait while we process your request.',
    })

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      toast.dismiss()
    }, 3000)
  }

  const handlePromiseToast = () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve({ name: 'Trading Bot' }), 2000)
    })

    toast.promise(promise, {
      loading: 'Creating bot...',
      success: 'Bot created successfully!',
      error: 'Failed to create bot',
    })
  }

  const handleCustomToast = () => {
    toast('Custom Toast', {
      description: 'This is a custom toast with an action button.',
      action: {
        label: 'Undo',
        onClick: () => toast.info('Action clicked!'),
      },
    })
  }

  return (
    <div className="space-y-8">
      {/* Alert Component */}
      <ComponentShowcase
        title="Alert"
        description="Display important messages to users with different severity levels."
      >
        <div className="space-y-4">
          {/* Default Variant */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Alert>
              <Terminal />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the CLI.
              </AlertDescription>
            </Alert>
          </div>

          {/* Destructive Variant */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">Destructive</div>
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </div>

          {/* Without Icon */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">Without Icon</div>
            <Alert>
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                This is an alert without an icon. Use this for general information.
              </AlertDescription>
            </Alert>
          </div>

          {/* With Different Icons */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              Different Icon Styles
            </div>
            <div className="space-y-3">
              <Alert>
                <Info />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  This is an informational message with an info icon.
                </AlertDescription>
              </Alert>

              <Alert>
                <CheckCircle2 />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your trading bot has been successfully activated.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertTriangle />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Your stop-loss threshold is critically low. Consider adjusting your risk
                  settings.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Toast/Sonner Component */}
      <ComponentShowcase
        title="Toast"
        description="Display temporary notifications to users. Click buttons to see different toast types."
      >
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            Click the buttons below to trigger different toast notifications:
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSuccessToast} variant="default">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Success Toast
            </Button>

            <Button onClick={handleErrorToast} variant="destructive">
              <AlertCircle className="mr-2 h-4 w-4" />
              Error Toast
            </Button>

            <Button onClick={handleInfoToast} variant="outline">
              <Info className="mr-2 h-4 w-4" />
              Info Toast
            </Button>

            <Button onClick={handleWarningToast} variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Warning Toast
            </Button>

            <Button onClick={handleLoadingToast} variant="outline">
              <Loader2 className="mr-2 h-4 w-4" />
              Loading Toast
            </Button>

            <Button onClick={handlePromiseToast} variant="outline">
              Promise Toast
            </Button>

            <Button onClick={handleCustomToast} variant="outline">
              Custom Action Toast
            </Button>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
            <div className="text-sm font-medium mb-2">Toast Features:</div>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Auto-dismiss after 3-5 seconds</li>
              <li>Stack multiple toasts</li>
              <li>Custom actions with buttons</li>
              <li>Promise-based for async operations</li>
              <li>Accessible and keyboard navigable</li>
            </ul>
          </div>
        </div>
      </ComponentShowcase>

      {/* Progress Component */}
      <ComponentShowcase
        title="Progress"
        description="Show task completion status with determinate and indeterminate progress indicators."
      >
        <div className="space-y-6">
          {/* Determinate Progress - Static Values */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              Determinate Progress (Static)
            </div>
            <div className="space-y-4">
              {[0, 25, 50, 75, 100].map((value) => (
                <div key={value} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{value}% Complete</span>
                    <span className="font-medium">{value}%</span>
                  </div>
                  <Progress value={value} />
                </div>
              ))}
            </div>
          </div>

          {/* Animated Progress */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              Animated Progress
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uploading strategy...</span>
                <span className="font-medium">{progressValue}%</span>
              </div>
              <Progress value={progressValue} />
            </div>
          </div>

          {/* Different Sizes */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Different Sizes</div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Small (h-1)</div>
                <Progress value={60} className="h-1" />
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Default (h-2)</div>
                <Progress value={60} />
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Large (h-3)</div>
                <Progress value={60} className="h-3" />
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Extra Large (h-4)</div>
                <Progress value={60} className="h-4" />
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              Real-World Use Cases
            </div>
            <div className="space-y-4 p-4 rounded-lg border bg-card">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Bot Configuration</div>
                  <div className="text-xs text-muted-foreground">3 of 5 steps</div>
                </div>
                <Progress value={60} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Risk Analysis Complete</div>
                  <div className="text-xs text-green-600 dark:text-green-400">100%</div>
                </div>
                <Progress value={100} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Backtesting Strategy</div>
                  <div className="text-xs text-muted-foreground">Processing...</div>
                </div>
                <Progress value={33} />
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Skeleton Component */}
      <ComponentShowcase
        title="Skeleton"
        description="Show loading placeholders that mimic the structure of actual content."
      >
        <div className="space-y-6">
          {/* Text Loading Patterns */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Text Loading</div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>

          {/* Profile Card Loading */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              Profile Card Loading
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg border bg-card">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </div>

          {/* List Loading Pattern */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              List Loading Pattern
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-3 rounded-lg border bg-card"
                >
                  <Skeleton className="h-10 w-10 rounded" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                  <Skeleton className="h-8 w-16 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Trading Bot Card Loading */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              Bot Card Loading (Realistic Example)
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="p-6 rounded-lg border bg-card space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Skeleton className="h-8 flex-1 rounded" />
                    <Skeleton className="h-8 flex-1 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Loading Pattern */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Form Loading</div>
            <div className="space-y-4 p-6 rounded-lg border bg-card max-w-md">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-20 w-full rounded" />
              </div>
              <Skeleton className="h-10 w-full rounded" />
            </div>
          </div>

          {/* Avatar with Text */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              Avatar + Text Patterns
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-56" />
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>

      {/* Spinner Component */}
      <ComponentShowcase
        title="Spinner"
        description="Indicate loading state with animated spinners in various sizes."
      >
        <div className="space-y-6">
          {/* Different Sizes */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Sizes</div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <Spinner className="h-3 w-3" />
                <span className="text-xs text-muted-foreground">Small (h-3)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner />
                <span className="text-xs text-muted-foreground">Default (h-4)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner className="h-6 w-6" />
                <span className="text-xs text-muted-foreground">Medium (h-6)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner className="h-8 w-8" />
                <span className="text-xs text-muted-foreground">Large (h-8)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner className="h-12 w-12" />
                <span className="text-xs text-muted-foreground">XL (h-12)</span>
              </div>
            </div>
          </div>

          {/* Different Colors */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Colors</div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <Spinner className="h-6 w-6 text-primary" />
                <span className="text-xs text-muted-foreground">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Muted</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner className="h-6 w-6 text-destructive" />
                <span className="text-xs text-muted-foreground">Destructive</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span className="text-xs text-muted-foreground">Success</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-muted-foreground">Info</span>
              </div>
            </div>
          </div>

          {/* In Buttons */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">In Buttons</div>
            <div className="flex flex-wrap gap-3">
              <Button disabled>
                <Spinner className="mr-2" />
                Loading...
              </Button>
              <Button variant="outline" disabled>
                <Spinner className="mr-2" />
                Processing
              </Button>
              <Button variant="destructive" disabled>
                <Spinner className="mr-2" />
                Deleting...
              </Button>
              <Button variant="ghost" disabled>
                <Spinner className="mr-2 h-4 w-4" />
                Please wait
              </Button>
            </div>
          </div>

          {/* In Cards */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              Loading States in Cards
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-6 rounded-lg border bg-card">
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-3">
                    <Spinner className="h-8 w-8" />
                    <p className="text-sm text-muted-foreground">Loading bot data...</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border bg-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Trading Bot Analysis</h3>
                  <Spinner className="h-5 w-5" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Running performance analysis on your trading strategy...
                </p>
              </div>
            </div>
          </div>

          {/* Centered Page Loading */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              Centered Page Loading
            </div>
            <div className="p-12 rounded-lg border bg-card">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Spinner className="h-12 w-12" />
                  <div className="text-center space-y-1">
                    <p className="font-medium">Loading your dashboard</p>
                    <p className="text-sm text-muted-foreground">
                      Please wait while we fetch your data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inline with Text */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Inline with Text</div>
            <div className="space-y-3 p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2">
                <Spinner className="h-4 w-4" />
                <span className="text-sm">Analyzing market trends...</span>
              </div>
              <div className="flex items-center gap-2">
                <Spinner className="h-4 w-4" />
                <span className="text-sm">Calculating risk metrics...</span>
              </div>
              <div className="flex items-center gap-2">
                <Spinner className="h-4 w-4" />
                <span className="text-sm">Generating strategy recommendations...</span>
              </div>
            </div>
          </div>
        </div>
      </ComponentShowcase>
    </div>
  )
}

/**
 * Empty Dashboard Component
 *
 * Welcome screen for users with no bots.
 * Shows onboarding steps and CTA to create first bot.
 */

'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bot, Shield, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react'

export function EmptyDashboard() {
  const steps = [
    {
      number: '1',
      icon: Bot,
      title: 'Create Your Bot',
      description: 'Use AI guidance or pro mode to set up your trading bot in minutes',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      number: '2',
      icon: Shield,
      title: 'Configure Settings',
      description: 'Set risk controls, stop-loss, and strategy parameters for safe trading',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      number: '3',
      icon: TrendingUp,
      title: 'Start Trading',
      description: 'Begin with paper trading to test your strategy risk-free',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ]

  const features = [
    {
      icon: Sparkles,
      text: 'AI-Guided Setup',
      color: 'text-blue-500',
    },
    {
      icon: Shield,
      text: 'Built-in Risk Management',
      color: 'text-purple-500',
    },
    {
      icon: TrendingUp,
      text: 'Paper Trading',
      color: 'text-green-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Bot className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to TradingBot! 🚀
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get started by creating your first trading bot.
          Our AI will guide you through the process step by step.
        </p>
      </div>

      {/* Steps */}
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <Card key={step.number} className="relative overflow-hidden hover:border-primary/50 transition-colors">
              <div className="absolute top-4 right-4 text-6xl font-bold text-muted/5">
                {step.number}
              </div>
              <CardHeader>
                <div className={`inline-flex w-12 h-12 items-center justify-center rounded-lg ${step.bgColor} mb-2`}>
                  <Icon className={`h-6 w-6 ${step.iconColor}`} />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* CTA Section */}
      <Card className="max-w-3xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Ready to get started?</CardTitle>
          <CardDescription className="text-base">
            Create your first bot in less than 5 minutes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Badge
                  key={feature.text}
                  variant="outline"
                  className="px-4 py-2 text-sm font-normal gap-2"
                >
                  <Icon className={`h-4 w-4 ${feature.color}`} />
                  {feature.text}
                </Badge>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/bots/create/simple">
                <Sparkles className="h-5 w-5" />
                Create Your First Bot
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center space-y-2 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Start with paper trading
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>$1,000,000 virtual balance included</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Need help?{' '}
          <Link href="/docs" className="text-primary hover:underline">
            Read the documentation
          </Link>
          {' '}or{' '}
          <Link href="/support" className="text-primary hover:underline">
            contact support
          </Link>
        </p>
      </div>
    </div>
  )
}

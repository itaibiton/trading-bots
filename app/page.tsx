'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, TrendingUp, Zap, Shield } from 'lucide-react'

export default function Home() {
  const { user, loading } = useAuth()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center p-2 mb-4 text-sm bg-primary/10 text-primary rounded-full">
            <Bot className="w-4 h-4 mr-2" />
            Automated Crypto Trading Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Build and deploy trading bots{' '}
            <span className="text-primary">in minutes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create sophisticated automated trading strategies without writing code.
            Start with crypto, expand to any market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            {loading ? (
              <div className="h-10 w-32 animate-pulse bg-muted rounded-md" />
            ) : user ? (
              <Button size="lg" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need to automate trading
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional-grade tools designed for both beginners and experienced traders
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Bot className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Smart Bots</CardTitle>
                <CardDescription>
                  Create intelligent trading bots with customizable strategies
                  {/* TODO: Phase 2 - Bot creation interface */}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Strategy Builder</CardTitle>
                <CardDescription>
                  Visual strategy designer with technical indicators and conditions
                  {/* TODO: Phase 2-3 - Strategy builder */}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Real-time Execution</CardTitle>
                <CardDescription>
                  Lightning-fast trade execution with live market data
                  {/* TODO: Phase 3 - Exchange integrations */}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Risk Management</CardTitle>
                <CardDescription>
                  Built-in stop-loss, take-profit, and position sizing tools
                  {/* TODO: Phase 3 - Risk management features */}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl md:text-4xl">
                Ready to start automated trading?
              </CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                Join traders who are automating their strategies today
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8">
              {loading ? (
                <div className="h-10 w-32 animate-pulse bg-background/20 rounded-md" />
              ) : user ? (
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/signup">Create Free Account</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

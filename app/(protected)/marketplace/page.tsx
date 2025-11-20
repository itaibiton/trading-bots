/**
 * Marketplace Page
 *
 * Browse and copy bot strategies from the community.
 * Features strategy templates, community bots, and ratings.
 */

'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ShoppingBag, Star, TrendingUp, Users, Clock, Sparkles } from 'lucide-react'

export default function MarketplacePage() {
  // Mock data for featured strategies
  const featuredStrategies = [
    {
      id: 1,
      name: 'Conservative DCA',
      author: 'TraderPro',
      description: 'Low-risk DCA strategy with daily purchases. Perfect for beginners.',
      strategy: 'DCA',
      rating: 4.8,
      users: 1243,
      performance: '+12.5%',
      riskLevel: 'low',
    },
    {
      id: 2,
      name: 'Volatility Grid Master',
      author: 'GridExpert',
      description: 'Advanced grid trading for sideways markets with tight ranges.',
      strategy: 'Grid',
      rating: 4.6,
      users: 856,
      performance: '+18.3%',
      riskLevel: 'medium',
    },
    {
      id: 3,
      name: 'Momentum Rider',
      author: 'CryptoWhale',
      description: 'Catch trending markets with momentum-based entries.',
      strategy: 'Momentum',
      rating: 4.5,
      users: 627,
      performance: '+24.1%',
      riskLevel: 'high',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Marketplace</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Strategy Marketplace</h1>
        </div>
        <p className="text-muted-foreground">
          Discover and copy proven trading strategies from the community
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">150+</p>
                <p className="text-xs text-muted-foreground">Active Strategies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">5,000+</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.7★</p>
                <p className="text-xs text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Strategies Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Featured Strategies
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredStrategies.map((strategy) => (
            <Card key={strategy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{strategy.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs">
                      <span>by {strategy.author}</span>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span>{strategy.rating}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      strategy.riskLevel === 'low'
                        ? 'border-green-500/50 text-green-500'
                        : strategy.riskLevel === 'medium'
                        ? 'border-yellow-500/50 text-yellow-500'
                        : 'border-red-500/50 text-red-500'
                    }
                  >
                    {strategy.riskLevel}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{strategy.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{strategy.users.toLocaleString()} users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">{strategy.performance}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{strategy.strategy}</Badge>
                  <Button size="sm" className="ml-auto" disabled>
                    Copy Strategy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Coming Soon Section */}
      <Card className="border-dashed">
        <CardContent className="text-center py-12">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">More Features Coming Soon</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            We're building advanced search, filters, custom strategy creation, and community ratings.
            The marketplace will launch in the next update.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button asChild variant="outline">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/bots/create/simple">
                Create Your Own Bot
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

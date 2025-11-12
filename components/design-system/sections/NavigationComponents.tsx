"use client"

import * as React from 'react'
import { ComponentShowcase } from '../ComponentShowcase'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Settings,
  HelpCircle,
  FileText,
  Shield,
  DollarSign,
  TrendingUp,
  Activity,
  BarChart3,
} from 'lucide-react'

/**
 * NavigationComponents - Comprehensive showcase of navigation UI components
 *
 * Demonstrates:
 * - Tabs: Default, with icons, vertical orientation, full width
 * - Accordion: Single open, multiple open, with icons, collapsible
 *
 * All components are fully interactive with realistic content.
 */
export default function NavigationComponents() {
  return (
    <div className="space-y-8">
      {/* TABS SECTION */}
      <ComponentShowcase
        title="Tabs - Default"
        description="Standard horizontal tabs for organizing content into separate views. Click to switch between tabs."
      >
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <h4 className="text-base font-semibold mb-3">Account Settings</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your account information and preferences. Update your profile details,
                change your username, or configure privacy settings.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">user@example.com</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Username</span>
                  <span className="font-medium">tradingpro</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <h4 className="text-base font-semibold mb-3">Password Security</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Change your password to keep your account secure. We recommend using a strong,
                unique password that you don't use elsewhere.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">
                    Password last changed 30 days ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Two-factor authentication enabled</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <h4 className="text-base font-semibold mb-3">Notification Preferences</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Choose how and when you want to be notified about bot activity, price alerts, and
                account updates.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email notifications</span>
                  <span className="font-medium text-green-600">Enabled</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Push notifications</span>
                  <span className="font-medium text-green-600">Enabled</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Trading alerts</span>
                  <span className="font-medium text-green-600">Enabled</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="billing" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <h4 className="text-base font-semibold mb-3">Billing Information</h4>
              <p className="text-sm text-muted-foreground mb-4">
                View your subscription details, payment methods, and billing history. Upgrade or
                downgrade your plan at any time.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current plan</span>
                  <span className="font-medium">Pro Plan</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly cost</span>
                  <span className="font-medium">$29.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Next billing date</span>
                  <span className="font-medium">Feb 1, 2025</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ComponentShowcase>

      <ComponentShowcase
        title="Tabs - With Icons"
        description="Tabs enhanced with icons for better visual recognition. Icons help users quickly identify tab categories."
      >
        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <Bell className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-semibold">Profile Information</h4>
                  <p className="text-xs text-muted-foreground">
                    Your personal details and public profile
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your profile is visible to other users in shared trading spaces and leaderboards.
                Keep your information up to date.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="security" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-semibold">Security Settings</h4>
                  <p className="text-xs text-muted-foreground">
                    Protect your account and trading activity
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Enable two-factor authentication and review your recent login activity to keep your
                account secure.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="alerts" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-semibold">Alert Configuration</h4>
                  <p className="text-xs text-muted-foreground">
                    Customize your notification preferences
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Set up price alerts, bot status notifications, and risk management warnings to stay
                informed about your trading activity.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="payment" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-semibold">Payment Methods</h4>
                  <p className="text-xs text-muted-foreground">
                    Manage your subscription and billing
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Add or remove payment methods, view invoices, and manage your subscription plan.
                All payments are processed securely.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </ComponentShowcase>

      <ComponentShowcase
        title="Tabs - Full Width"
        description="Tabs that expand to fill the available width. Useful for main navigation or when you have fewer tabs."
      >
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Total Balance
                  </span>
                </div>
                <p className="text-2xl font-bold">$10,432.50</p>
                <p className="text-xs text-muted-foreground mt-1">+2.3% from last month</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Active Bots</span>
                </div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground mt-1">3 in profit, 9 neutral</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Today's Trades
                  </span>
                </div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-xs text-muted-foreground mt-1">+12 from yesterday</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <h4 className="text-base font-semibold mb-3">Performance Analytics</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Detailed metrics about your trading performance, strategy effectiveness, and market
                trends over time.
              </p>
              <div className="h-32 rounded-md bg-muted flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Chart placeholder</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <h4 className="text-base font-semibold mb-3">Trading Reports</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Generate and download comprehensive reports for tax purposes, performance reviews,
                or strategy analysis.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-3 rounded-md border">
                  <span>Monthly Summary - January 2025</span>
                  <span className="text-xs text-muted-foreground">Ready</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-md border">
                  <span>Tax Report - 2024</span>
                  <span className="text-xs text-muted-foreground">Ready</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ComponentShowcase>

      <ComponentShowcase
        title="Tabs - Compact (Icon Only on Mobile)"
        description="Responsive tabs that show icons on mobile and text on desktop for optimal space usage."
      >
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList>
            <TabsTrigger value="dashboard">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="trades">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trades</span>
            </TabsTrigger>
            <TabsTrigger value="help">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Help</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Main dashboard view with quick access to key metrics and controls.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="trades" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Recent trading activity and transaction history.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="help" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Documentation, tutorials, and support resources.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </ComponentShowcase>

      {/* ACCORDION SECTION */}
      <ComponentShowcase
        title="Accordion - Single Open"
        description="Accordion where only one item can be open at a time. Opening a new item automatically closes the previous one."
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is paper trading?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Paper trading is a risk-free way to test your trading strategies using virtual
                money. You get $10,000 in virtual funds to experiment with different strategies
                and settings without risking real capital. All bots start in paper trading mode by
                default, and you can switch to live trading once you're confident in your strategy.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do risk controls work?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Every bot requires mandatory risk controls including stop-loss percentages, maximum
                position sizes, and daily loss limits. These settings help protect your capital by
                automatically stopping or pausing trades when certain thresholds are reached. You
                can customize these controls when creating a bot, but they cannot be disabled
                entirely to ensure safe trading.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I create custom strategies?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Yes! In addition to our pre-built strategy templates (DCA, Grid Trading, Momentum,
                Mean Reversion), you can use our AI assistant to create custom strategies. Simply
                describe your trading approach in natural language, and the AI will help configure
                the right settings and parameters. You can also clone and modify existing
                strategies.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How do I monitor bot performance?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                The bot dashboard provides real-time monitoring of all your active bots, including
                profit/loss, trade history, and performance metrics. You'll receive notifications
                for important events like risk thresholds being reached or significant price
                movements. You can also view detailed analytics and export reports for tax
                purposes.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentShowcase>

      <ComponentShowcase
        title="Accordion - Multiple Open"
        description="Accordion where multiple items can be open simultaneously. Great for comparison or when users need to reference multiple sections."
      >
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>DCA Strategy (Dollar-Cost Averaging)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Automatically buy at fixed intervals regardless of price, reducing the impact of
                  volatility.
                </p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className="font-medium text-green-600">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Commitment:</span>
                    <span className="font-medium">Low (Automated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best For:</span>
                    <span className="font-medium">Long-term holders</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Grid Trading Strategy</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Place multiple buy and sell orders at predetermined price intervals to profit
                  from price volatility.
                </p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className="font-medium text-yellow-600">Medium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Commitment:</span>
                    <span className="font-medium">Low (Automated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best For:</span>
                    <span className="font-medium">Ranging markets</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Momentum Strategy</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Follow market trends by buying when prices are rising and selling when they're
                  falling.
                </p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className="font-medium text-orange-600">Medium-High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Commitment:</span>
                    <span className="font-medium">Medium (Monitoring required)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best For:</span>
                    <span className="font-medium">Trending markets</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentShowcase>

      <ComponentShowcase
        title="Accordion - With Icons"
        description="Accordion items enhanced with icons for better visual hierarchy and quick scanning."
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Account Management</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Manage your account settings, profile information, and preferences. Update your
                email, password, and notification settings from this section.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span>Security & Privacy</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Control your security settings including two-factor authentication, API key
                management, and privacy preferences. Review your login history and active sessions.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>Billing & Subscription</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                View your current subscription plan, payment methods, and billing history. Upgrade
                or downgrade your plan, and manage invoices and receipts.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span>Help & Support</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Access documentation, video tutorials, and our knowledge base. Contact support for
                assistance with technical issues or questions about the platform.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentShowcase>

      <ComponentShowcase
        title="Accordion - Nested Content"
        description="Accordion with rich nested content including lists, statistics, and structured information."
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Bot Configuration Options</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-semibold mb-2">Strategy Settings</h5>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Choose from pre-built templates or create custom</li>
                    <li>Configure entry and exit conditions</li>
                    <li>Set position sizing and allocation</li>
                    <li>Define rebalancing frequency</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold mb-2">Risk Management</h5>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Stop-loss percentage (required)</li>
                    <li>Take-profit targets (optional)</li>
                    <li>Maximum position size</li>
                    <li>Daily loss limit</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Performance Metrics</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Total Return</div>
                    <div className="text-lg font-bold text-green-600">+12.4%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
                    <div className="text-lg font-bold">68%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Sharpe Ratio</div>
                    <div className="text-lg font-bold">1.85</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Max Drawdown</div>
                    <div className="text-lg font-bold text-red-600">-8.2%</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Metrics calculated over the last 30 days of trading activity.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>API Integration Guide</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Connect your exchange account securely to enable live trading.
                </p>
                <div className="rounded-md bg-muted p-4 text-sm space-y-2">
                  <div className="font-mono text-xs">Step 1: Generate API keys</div>
                  <div className="font-mono text-xs">Step 2: Configure permissions</div>
                  <div className="font-mono text-xs">Step 3: Test connection</div>
                  <div className="font-mono text-xs">Step 4: Enable live trading</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> API keys are encrypted and stored securely. We only
                  request trading permissions, never withdrawal access.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentShowcase>
    </div>
  )
}

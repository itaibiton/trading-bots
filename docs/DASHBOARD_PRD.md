# Product Requirements Document: TradingBot Dashboard (Home Page)

**Version:** 1.0
**Date:** 2025-11-20
**Status:** Ready for Implementation
**Owner:** Product Team
**Phase:** Phase 2 - Bot Management & AI Creation

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Target Users & Use Cases](#target-users--use-cases)
4. [Product Vision & Goals](#product-vision--goals)
5. [Success Metrics](#success-metrics)
6. [Functional Requirements](#functional-requirements)
7. [Component Specifications](#component-specifications)
8. [User Flows](#user-flows)
9. [Data Requirements](#data-requirements)
10. [UI/UX Guidelines](#uiux-guidelines)
11. [Technical Requirements](#technical-requirements)
12. [Edge Cases & Error Handling](#edge-cases--error-handling)
13. [Testing Requirements](#testing-requirements)
14. [Implementation Plan](#implementation-plan)

---

## Executive Summary

The TradingBot Dashboard is the **primary landing page** after user authentication, serving as the central hub for monitoring bot performance, viewing account status, and accessing key actions. This PRD defines the complete rebuild of the placeholder dashboard into a production-ready home page that provides immediate value and clear next steps for users of all experience levels.

### Key Features

- **Quick Stats Overview:** Total Balance, Active Bots, Total P&L, Win Rate
- **Recent Bots Section:** 3-4 most recently created/active bots using existing BotCard component
- **Empty State Experience:** Welcoming guide for new users with no bots
- **Quick Actions:** Prominent "Create Bot" CTA with mode selection
- **Personalized Welcome:** Dynamic greeting with user's display name
- **Performance Indicators:** At-a-glance portfolio health visualization

### Scope

**In Scope:**
- Dashboard home page (`/dashboard/page.tsx`) complete rebuild
- Stats calculation and display
- Recent bots section with existing BotCard
- Empty state for new users
- Quick action buttons
- Mobile-responsive design

**Out of Scope (Future Phases):**
- Real-time P&L updates (Phase 3 with WebSocket)
- Charts and historical data visualization (Phase 4)
- Trade activity feed (Phase 3)
- Risk exposure panel (Phase 4)
- Portfolio comparison tools (Phase 4)

---

## Problem Statement

### Current State

The dashboard is a **placeholder page** with:
- Generic shadcn/ui sidebar template
- Empty skeleton boxes with no content
- No user data displayed
- No clear path forward for users
- Placeholder breadcrumbs ("Building Your Application")

### Problems

1. **No Value on First Load:** New users see empty boxes and don't know what to do
2. **No Status Visibility:** Existing users can't see bot performance at a glance
3. **Poor Navigation:** No clear path to create bots or view bot list
4. **Generic Experience:** No personalization or user-specific data
5. **Missing Empty State:** New users are confused about next steps

### Impact

- Poor first impression for new users
- Low activation rate (users don't create bots)
- Existing users must navigate to `/dashboard/bots` to see any data
- Increased support burden ("What do I do now?")

---

## Target Users & Use Cases

### Persona 1: Alex the Beginner (New User)

**Scenario:** Just signed up, lands on dashboard for the first time

**Goals:**
- Understand what the platform does
- Learn how to create first bot
- Feel welcomed and guided
- Avoid feeling overwhelmed

**Dashboard Needs:**
- Clear empty state with explanation
- Prominent "Create Bot" button
- Simple getting started guide
- No intimidating empty charts or complex stats

### Persona 2: Jordan the Part-Time Trader (Active User)

**Scenario:** Has 2-3 bots running, checks dashboard daily

**Goals:**
- Quick portfolio health check
- See if bots are running correctly
- Check today's P&L at a glance
- Access bot details quickly

**Dashboard Needs:**
- Total P&L prominently displayed
- Active bot count with status
- Recent bot performance cards
- Quick access to full bot list

### Persona 3: Morgan the Strategy Tester (Power User)

**Scenario:** Has 10+ bots, testing multiple strategies

**Goals:**
- Monitor overall portfolio performance
- Identify underperforming bots quickly
- Track win rate across all bots
- Manage multiple bots efficiently

**Dashboard Needs:**
- Aggregate stats (total trades, win rate)
- Quick access to bot management page
- Performance indicators (best/worst bots)
- Fast navigation to details

---

## Product Vision & Goals

### Vision Statement

"The dashboard serves as a **control tower** for traders, providing instant portfolio visibility and effortless access to bot management, ensuring users always know their status and next steps within 3 seconds of landing."

### Product Goals

1. **Immediate Value:** Users see meaningful data within 500ms of page load
2. **Clear Direction:** 100% of new users understand what to do next
3. **Quick Access:** Users can reach any key action in 1-2 clicks
4. **Portfolio Visibility:** Users understand portfolio health at a glance
5. **Delightful Experience:** Professional, polished UI that builds trust

### Success Criteria

**Quantitative:**
- Dashboard loads and displays data < 1 second
- 90%+ of new users click "Create Bot" from dashboard
- 70%+ of returning users check dashboard before navigating elsewhere
- < 5% bounce rate on dashboard
- 80%+ of users rate dashboard as "helpful" or "very helpful"

**Qualitative:**
- Users say "I know exactly what's happening with my bots"
- New users feel welcomed and guided
- Dashboard feels polished and professional
- Mobile experience is smooth and usable

---

## Success Metrics

### North Star Metric

**Dashboard Engagement Rate** = % of sessions that start with dashboard visit and lead to action (create bot, view bots, or bot details)

Target: 75% engagement rate

### Key Performance Indicators

| Metric | Target (Week 1) | Target (Month 1) | Measurement |
|--------|-----------------|------------------|-------------|
| Page Load Time (p95) | < 1s | < 800ms | Performance API |
| New User Activation | 85% | 90% | "Create Bot" clicks |
| Returning User Engagement | 60% | 70% | Bot list clicks |
| Mobile Usage | 30% | 40% | Device type tracking |
| Empty State Interaction | 80% | 85% | CTA click rate |

### Product Health Metrics

- **Stats Accuracy:** 99.9%+ correctness for P&L calculations
- **Error Rate:** < 0.1% of dashboard loads fail
- **Refresh Success Rate:** 100% of manual refreshes succeed
- **Mobile Responsiveness:** 0 layout breaks on mobile devices

---

## Functional Requirements

### MoSCoW Prioritization

#### Must Have (MVP)

**MH-1: Quick Stats Cards**
- Display 4 key metrics in card format
- Cards: Total Balance, Active Bots, Total P&L, Win Rate
- Real-time data from database
- Color coding for positive/negative values
- Responsive grid layout (4 cols desktop, 2 cols tablet, 1 col mobile)

**MH-2: Recent Bots Section**
- Show 3-4 most recently created/active bots
- Use existing `BotCard` component
- Display bot name, strategy, status, P&L, capital
- "View All Bots" link to `/dashboard/bots`
- Grid layout matching bot list page

**MH-3: Empty State for New Users**
- Welcome message with user's name
- Clear explanation of platform value
- Step-by-step getting started guide
- Large "Create Your First Bot" CTA
- Illustration or icon (optional)

**MH-4: Welcome Header**
- Personalized greeting ("Welcome back, [Name]!")
- Current date/time
- Last login timestamp (optional)
- Breadcrumb navigation

**MH-5: Quick Actions**
- "Create Bot" primary button
- Links to key pages (Bots, Settings)
- Paper trading balance indicator
- Mobile-friendly action buttons

**MH-6: Loading States**
- Skeleton loaders for all sections
- Smooth transitions when data loads
- No layout shift (CLS = 0)
- Loading indicators for stats

**MH-7: Error States**
- Graceful error handling for data fetch failures
- User-friendly error messages
- Retry mechanism
- Fallback to cached data if available

#### Should Have (Phase 2.5)

**SH-1: Performance Indicator**
- Small sparkline chart for P&L trend (last 7 days)
- Best performing bot highlight
- Worst performing bot alert (if P&L < -10%)

**SH-2: Quick Stats Comparison**
- Show change vs yesterday/last week
- Up/down arrows with percentage change
- Color coding (green up, red down)

**SH-3: Activity Summary**
- "X trades today" indicator
- Last bot execution timestamp
- Upcoming scheduled executions

**SH-4: Paper Trading Balance**
- Dedicated card for paper trading balance
- Allocated vs available capital
- Visual progress bar

#### Could Have (Phase 3+)

**CH-1: Dashboard Customization**
- Drag-and-drop card reordering
- Show/hide specific stats
- Custom card sizes

**CH-2: Recent Activity Feed**
- Last 5 trades across all bots
- Recent bot status changes
- System notifications

**CH-3: Market Overview**
- BTC/ETH price widgets
- Market sentiment indicator
- News feed integration

#### Won't Have (Out of Scope)

- Advanced charting and analytics (Phase 4)
- Real-time trade execution from dashboard
- Social features or community feed
- Bot configuration editing inline
- Multi-user collaboration

---

## Component Specifications

### 1. Quick Stats Cards

**Component:** `StatsCard.tsx` (new)

**Props:**
```typescript
interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  loading?: boolean
}
```

**Layout:**
```
┌──────────────────────────┐
│ 💰 Icon  Total Balance   │
│                          │
│ $10,000.00               │
│ ↑ +2.5% vs yesterday     │ (optional)
└──────────────────────────┘
```

**Stats to Display:**

1. **Total Balance**
   - Formula: `paper_trading_balance + sum(bot.capital_allocated)`
   - Icon: DollarSign
   - Color: Primary
   - Subtitle: "Paper trading balance"

2. **Active Bots**
   - Formula: `count(bots WHERE status = 'active')`
   - Icon: Bot (from lucide)
   - Color: Green if > 0, Gray if 0
   - Subtitle: "X paused, X stopped"

3. **Total P&L**
   - Formula: `sum(bot.total_pnl)`
   - Icon: TrendingUp (green) or TrendingDown (red)
   - Color: Green if positive, Red if negative, Gray if zero
   - Subtitle: "±X.X% return"

4. **Win Rate**
   - Formula: `sum(winning_trades) / sum(total_trades) * 100`
   - Icon: Target or Activity
   - Color: Green if > 60%, Yellow if 40-60%, Red if < 40%
   - Subtitle: "Across X trades"

**Behavior:**
- Clickable (link to relevant page)
- Hover effect (border color change)
- Loading skeleton matches final size
- Graceful degradation if data missing

### 2. Recent Bots Section

**Component:** Uses existing `BotCard.tsx`

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Recent Bots                    [View All Bots →]│
├─────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ │ Bot Card │ │ Bot Card │ │ Bot Card │        │
│ │  (from   │ │  (from   │ │  (from   │        │
│ │ existing)│ │ existing)│ │ existing)│        │
│ └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────┘
```

**Data Source:**
- Query: `SELECT * FROM bots WHERE user_id = ? ORDER BY created_at DESC LIMIT 4`
- Use existing `useBots` hook with limit
- Filter: `is_template = false`

**Sorting Priority:**
1. Active bots first (status = 'active')
2. Recently created (created_at DESC)
3. Recently active (last_active_at DESC)

**Responsive Behavior:**
- Desktop (≥1024px): 4 cards in a row
- Tablet (768-1023px): 2 cards in a row
- Mobile (<768px): 1 card stacked

**Empty State (if user has bots but none recent):**
- Show message: "No recent activity"
- Link to "View All Bots"

### 3. Empty State Component

**Component:** `DashboardEmptyState.tsx` (new)

**Layout:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│              🤖 Icon/Illustration               │
│                                                 │
│        Welcome to TradingBot, [Name]!           │
│                                                 │
│   Let's create your first trading bot in        │
│   under 5 minutes with AI assistance.           │
│                                                 │
│   ┌────────────────────────────────────┐       │
│   │ 1. Choose a strategy or let AI help│       │
│   │ 2. Configure your bot settings      │       │
│   │ 3. Start paper trading risk-free    │       │
│   └────────────────────────────────────┘       │
│                                                 │
│     [Create Your First Bot] ← Primary CTA      │
│                                                 │
│            Learn more about strategies →        │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Content:**
- **Headline:** "Welcome to TradingBot, [display_name]!"
- **Subheadline:** "Create your first AI-powered trading bot in minutes"
- **Steps:**
  1. "Choose a strategy template or let AI guide you"
  2. "Configure trading parameters and risk controls"
  3. "Start with paper trading to learn risk-free"
- **CTA Button:** "Create Your First Bot" (primary, large)
- **Secondary Link:** "Learn more about strategies" → `/docs/strategies`

**Behavior:**
- Only shows if `bots.length === 0`
- Button navigates to `/bots/create/simple` (AI path default)
- Icon has subtle animation (optional)

### 4. Welcome Header

**Component:** `DashboardHeader.tsx` (new)

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Welcome back, Jordan!              [Create Bot] │
│ Last login: Today at 2:34 PM                    │
└─────────────────────────────────────────────────┘
```

**Content:**
- **Greeting:** "Welcome back, [display_name]!" (or "Good morning/afternoon/evening")
- **Last Login:** "Last login: [relative time]" (e.g., "Today at 2:34 PM")
- **Date:** Current date (optional)
- **Action:** "Create Bot" button (primary)

**Logic for Greeting:**
- First visit of the day: "Good morning/afternoon/evening, [name]!"
- Subsequent visits: "Welcome back, [name]!"
- Brand new user: "Welcome to TradingBot, [name]!"

**Data Source:**
- Display name: `profiles.display_name` or `auth.users.email.split('@')[0]`
- Last login: `auth.users.last_sign_in_at`

### 5. Quick Actions Panel

**Component:** Inline in dashboard (no separate component needed)

**Layout:**
```
┌─────────────────────────────────────┐
│ Quick Actions                       │
├─────────────────────────────────────┤
│ [+ Create Bot] [📊 View All Bots]  │
│ [⚙️ Settings]  [📚 Learn More]      │
└─────────────────────────────────────┘
```

**Buttons:**
1. **Create Bot** (Primary)
   - Route: `/bots/create/simple` (default to AI path)
   - Icon: Plus
   - Style: Primary button

2. **View All Bots** (Secondary)
   - Route: `/dashboard/bots`
   - Icon: List or Grid
   - Style: Secondary/Outline button

3. **Settings** (Tertiary)
   - Route: `/dashboard/settings`
   - Icon: Settings
   - Style: Ghost button

4. **Learn More** (Tertiary)
   - Route: External link or `/docs`
   - Icon: Book or ExternalLink
   - Style: Ghost button

**Responsive:**
- Desktop: 4 buttons in a row
- Mobile: 2x2 grid or stacked

---

## User Flows

### Flow 1: New User First Visit

```
1. User signs up and authenticates
   ↓
2. Redirected to /dashboard
   ↓
3. Dashboard loads with empty state
   ↓
4. User sees:
   - Welcome message with name
   - Getting started guide (3 steps)
   - "Create Your First Bot" CTA
   - Quick stats show $10,000 paper balance
   ↓
5. User clicks "Create Your First Bot"
   ↓
6. Navigates to /bots/create/simple (AI path)
   ↓
7. [Bot creation flow - separate PRD]
```

**Success Criteria:**
- 90%+ of new users click CTA within 30 seconds
- 0 users report confusion about next steps

### Flow 2: Returning User with Bots

```
1. User logs in
   ↓
2. Lands on /dashboard
   ↓
3. Dashboard loads with data:
   - Welcome header: "Welcome back, [Name]!"
   - Quick stats populate with real data
   - Recent bots section shows 3-4 bots
   - Each bot card displays current status/P&L
   ↓
4. User scans stats (3-5 seconds)
   ↓
5. User takes action:
   Option A: Clicks "View All Bots" to see full list
   Option B: Clicks bot card to view details
   Option C: Clicks "Create Bot" to make new bot
   Option D: Navigates away via sidebar
```

**Success Criteria:**
- Stats load within 1 second
- 70%+ users engage with dashboard content
- Users can assess portfolio health in < 5 seconds

### Flow 3: User with No Recent Bots

```
1. User has created bots in the past but all are stopped/deleted
   ↓
2. Lands on /dashboard
   ↓
3. Dashboard shows:
   - Welcome header
   - Quick stats (balance, 0 active bots, historical P&L)
   - Recent bots section is empty or shows stopped bots
   - Message: "No active bots. Create one to get started."
   ↓
4. User clicks "Create Bot"
   ↓
5. Navigates to bot creation flow
```

**Success Criteria:**
- Clear indication that no bots are active
- Easy path to create new bot
- Historical stats still visible

### Flow 4: Mobile User Quick Check

```
1. User opens app on mobile
   ↓
2. Dashboard loads (mobile layout)
   ↓
3. Stats cards stack vertically (1 column)
   ↓
4. User scrolls to see all stats
   ↓
5. Recent bots section shows 2-3 bots stacked
   ↓
6. User taps bot card to view details
```

**Success Criteria:**
- Smooth vertical scroll
- No horizontal overflow
- Touch targets ≥ 44x44px
- Loads in < 2 seconds on 3G

---

## Data Requirements

### Data Sources

**1. User Profile Data**
- Table: `profiles`
- Fields:
  - `id` (UUID, FK to auth.users)
  - `display_name` (TEXT)
  - `paper_trading_balance` (DECIMAL)
  - `created_at` (TIMESTAMPTZ)
- Query: `SELECT * FROM profiles WHERE id = user_id`

**2. Bots Data**
- Table: `bots`
- Fields:
  - `id`, `user_id`, `name`, `status`, `strategy_type`
  - `capital_allocated`, `total_pnl`, `total_pnl_percentage`
  - `win_rate`, `total_trades`, `trading_pair`
  - `created_at`, `updated_at`, `last_active_at`
- Query: `SELECT * FROM bots WHERE user_id = ? AND is_template = false`

**3. Aggregate Stats**
- **Total Balance:**
  ```sql
  SELECT
    paper_trading_balance + COALESCE(SUM(capital_allocated), 0) as total_balance
  FROM profiles p
  LEFT JOIN bots b ON p.id = b.user_id
  WHERE p.id = ?
  ```

- **Active Bots Count:**
  ```sql
  SELECT COUNT(*) FROM bots
  WHERE user_id = ? AND status = 'active'
  ```

- **Total P&L:**
  ```sql
  SELECT SUM(total_pnl) as total_pnl,
         AVG(total_pnl_percentage) as avg_pnl_percentage
  FROM bots
  WHERE user_id = ?
  ```

- **Overall Win Rate:**
  ```sql
  SELECT
    SUM(CASE WHEN total_pnl > 0 THEN 1 ELSE 0 END) * 100.0 /
    NULLIF(COUNT(*), 0) as win_rate,
    SUM(total_trades) as total_trades
  FROM bots
  WHERE user_id = ?
  ```

### Data Fetching Strategy

**Option 1: Single API Call (Recommended)**
```typescript
// GET /api/dashboard
{
  profile: { display_name, paper_trading_balance },
  stats: {
    total_balance: number,
    active_bots: number,
    total_pnl: number,
    win_rate: number,
    total_trades: number
  },
  recent_bots: Bot[] // 4 most recent
}
```

**Option 2: Parallel API Calls**
- `GET /api/profile` (user profile)
- `GET /api/bots?limit=4&sort=created_at:desc` (recent bots)
- `GET /api/dashboard/stats` (aggregated stats)

**Recommended:** Option 1 (single call) for better performance

### Caching Strategy

- **Cache Duration:** 30 seconds (client-side)
- **Refresh Trigger:** Manual refresh button
- **Stale-While-Revalidate:** Show cached data, fetch fresh in background
- **Cache Key:** `dashboard_${user_id}`

### Real-Time Updates (Phase 3)

Currently: Manual refresh only
Future: WebSocket subscriptions for real-time P&L updates

---

## UI/UX Guidelines

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Navbar (from layout)                                    │
├─────────────────────────────────────────────────────────┤
│ Sidebar │ Dashboard Content                             │
│         │ ┌───────────────────────────────────────────┐ │
│         │ │ Welcome Header                            │ │
│         │ └───────────────────────────────────────────┘ │
│         │                                               │
│         │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│         │ │ Stat │ │ Stat │ │ Stat │ │ Stat │        │
│         │ │ Card │ │ Card │ │ Card │ │ Card │        │
│         │ └──────┘ └──────┘ └──────┘ └──────┘        │
│         │                                               │
│         │ ┌─────────────────────────────────────────┐ │
│         │ │ Recent Bots           [View All Bots →]│ │
│         │ ├─────────────────────────────────────────┤ │
│         │ │ ┌────────┐ ┌────────┐ ┌────────┐       │ │
│         │ │ │ Bot 1  │ │ Bot 2  │ │ Bot 3  │       │ │
│         │ │ └────────┘ └────────┘ └────────┘       │ │
│         │ └─────────────────────────────────────────┘ │
│         │                                               │
└─────────────────────────────────────────────────────────┘
```

### Spacing & Typography

**Spacing:**
- Section gap: 24px (6 in Tailwind)
- Card gap: 16px (4 in Tailwind)
- Stat card padding: 16px (p-4)
- Content padding: 16px mobile, 24px desktop

**Typography:**
- Page title: `text-3xl font-bold`
- Section title: `text-xl font-semibold`
- Stat value: `text-2xl font-bold`
- Stat label: `text-sm text-muted-foreground`
- Body text: `text-base`

### Color Palette

**Stats Colors:**
- Positive P&L: `text-green-500` (profit)
- Negative P&L: `text-red-500` (loss)
- Neutral: `text-muted-foreground`
- Primary: `text-primary` (brand color)

**Status Colors:**
- Active: `bg-green-500/10 text-green-500`
- Paused: `bg-yellow-500/10 text-yellow-500`
- Stopped: `bg-gray-500/10 text-gray-500`
- Error: `bg-red-500/10 text-red-500`

### Icons

**Stats Icons (from lucide-react):**
- Total Balance: `DollarSign`
- Active Bots: `Bot` or `Activity`
- Total P&L: `TrendingUp` (profit) / `TrendingDown` (loss)
- Win Rate: `Target` or `PercentCircle`

**Action Icons:**
- Create: `Plus`
- View: `Eye` or `List`
- Settings: `Settings`
- Refresh: `RefreshCw`

### Animation & Transitions

**Loading:**
- Skeleton loaders with shimmer effect
- Fade in on data load (300ms ease-out)
- Stagger animation for bot cards (50ms delay each)

**Interactions:**
- Hover: Border color change (200ms)
- Click: Scale down slightly (active:scale-95)
- Stat updates: Number count-up animation (optional)

**Performance:**
- Avoid layout shifts (CLS = 0)
- Use `transform` for animations (GPU-accelerated)
- Limit animations on mobile to save battery

### Accessibility

**Keyboard Navigation:**
- All interactive elements focusable
- Visible focus indicators
- Tab order follows visual hierarchy

**Screen Readers:**
- Semantic HTML (`<main>`, `<section>`, `<article>`)
- ARIA labels for stats ("Total balance: $10,000")
- Loading states announced
- Error messages announced

**Color Contrast:**
- WCAG AA compliance (4.5:1 for text)
- Don't rely on color alone for status
- Use icons + text for status indicators

**Responsive:**
- Touch targets ≥ 44x44px
- No horizontal scroll
- Readable text sizes (≥ 16px body)

---

## Technical Requirements

### Technology Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19 (client components)
- TypeScript 5.3+
- TailwindCSS v4
- shadcn/ui components

**Data Fetching:**
- Supabase client SDK
- React hooks (custom)
- Client-side data fetching (CSR)
- Optional: React Query for caching

**State Management:**
- React useState/useEffect
- No global state needed (page-level only)

### File Structure

```
/app/(protected)/dashboard/
├── page.tsx                    # Main dashboard page (rebuild this)
├── layout.tsx                  # Existing layout (keep)
└── loading.tsx                 # Loading state (new)

/components/dashboard/
├── DashboardStats.tsx          # Stats cards grid (new)
├── StatsCard.tsx               # Individual stat card (new)
├── RecentBots.tsx              # Recent bots section (new)
├── DashboardEmptyState.tsx     # Empty state component (new)
└── DashboardHeader.tsx         # Welcome header (new)

/lib/api/
└── dashboard.ts                # Dashboard API client (new)

/hooks/
└── useDashboard.ts             # Dashboard data hook (new)

/app/api/dashboard/
└── route.ts                    # Dashboard API endpoint (new)
```

### API Endpoints

**GET /api/dashboard**

**Request:**
```typescript
// Headers
Authorization: Bearer <jwt_token>
```

**Response:**
```typescript
{
  success: true,
  data: {
    profile: {
      display_name: string,
      paper_trading_balance: number
    },
    stats: {
      total_balance: number,
      active_bots_count: number,
      paused_bots_count: number,
      stopped_bots_count: number,
      total_pnl: number,
      total_pnl_percentage: number,
      win_rate: number,
      total_trades: number
    },
    recent_bots: Bot[] // Max 4 bots
  }
}
```

**Error Response:**
```typescript
{
  success: false,
  error: {
    code: 'UNAUTHORIZED' | 'SERVER_ERROR',
    message: string
  }
}
```

### Performance Requirements

**Load Time:**
- Initial page load: < 1 second (p95)
- Time to Interactive (TTI): < 1.5 seconds
- First Contentful Paint (FCP): < 500ms
- Largest Contentful Paint (LCP): < 1 second

**Bundle Size:**
- Dashboard page JS: < 100KB
- Total page weight: < 300KB
- Use code splitting for heavy components

**Database Queries:**
- Dashboard query: < 100ms
- Use database indexes on `user_id`, `status`
- Consider materialized view for stats (future)

### Security Requirements

**Authentication:**
- Require normal auth (no recovery sessions)
- Use `requireNormalAuth()` helper
- Server-side JWT validation

**Authorization:**
- Row Level Security (RLS) on all queries
- Users can only see own data
- API routes verify user ownership

**Data Validation:**
- Sanitize all inputs
- Validate numeric calculations
- Prevent SQL injection (use Supabase SDK)

---

## Edge Cases & Error Handling

### Edge Cases

**EC-1: User with 0 bots**
- Show: Empty state component
- Hide: Recent bots section, complex stats
- Display: Paper trading balance only

**EC-2: User with exactly 1 bot**
- Show: Stats + single bot in recent section
- Layout: Adjust grid to center single bot

**EC-3: User with 100+ bots**
- Show: Only 4 most recent in dashboard
- Link: "View All Bots" prominent
- Performance: Aggregate queries optimized

**EC-4: All bots are stopped**
- Stats: Show historical P&L
- Active count: 0 (with orange/red indicator)
- CTA: "Activate a bot" or "Create new bot"

**EC-5: User has negative total P&L**
- Color: Red text
- Icon: TrendingDown
- No panic messaging (just data)

**EC-6: No display name set**
- Fallback: Use email username
- Example: "john@example.com" → "Welcome, john!"

**EC-7: Database query timeout**
- Show: Error state with retry button
- Fallback: Use cached data if available
- Message: "Unable to load dashboard. Please try again."

**EC-8: Partial data load**
- Show: Stats that loaded successfully
- Show: Skeleton for failed sections
- Retry: Only failed sections

### Error States

**Error State 1: Network Error**
- Display: "Network error. Check your connection."
- Action: [Retry] button
- Behavior: Exponential backoff retry (1s, 2s, 4s)

**Error State 2: Authentication Error**
- Display: "Session expired. Please log in again."
- Action: Redirect to `/login` after 3 seconds
- Behavior: Clear local storage

**Error State 3: Server Error**
- Display: "Something went wrong. Our team has been notified."
- Action: [Retry] button, [Contact Support] link
- Behavior: Log error to monitoring system

**Error State 4: Data Inconsistency**
- Display: "Data temporarily unavailable."
- Action: [Refresh] button
- Behavior: Show last known good data if cached

### Loading States

**Initial Load:**
```
┌─────────────────────────────────┐
│ Welcome!                        │
├─────────────────────────────────┤
│ ▮▮▮▮▮  ▮▮▮▮▮  ▮▮▮▮▮  ▮▮▮▮▮   │ ← Skeleton cards
│                                 │
│ ▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮   │ ← Skeleton bot cards
└─────────────────────────────────┘
```

**Refreshing (data already loaded):**
- Show spinner icon on refresh button
- Dim existing content slightly
- Update content with fade transition

**Progressive Loading:**
1. Header loads first (0-100ms)
2. Stats skeleton appears (100-200ms)
3. Stats populate (200-500ms)
4. Bots skeleton appears (200-300ms)
5. Bots populate (500-800ms)

---

## Testing Requirements

### Unit Tests

**Components to Test:**
- [ ] `StatsCard` renders correctly with props
- [ ] `StatsCard` handles loading state
- [ ] `StatsCard` formats currency correctly
- [ ] `RecentBots` renders bot cards
- [ ] `DashboardEmptyState` shows for new users
- [ ] `DashboardHeader` displays user name

**Utilities to Test:**
- [ ] Stats calculation functions
- [ ] Currency formatting
- [ ] Percentage calculation
- [ ] Date formatting (last login)

### Integration Tests

**Data Flow Tests:**
- [ ] Dashboard fetches data on mount
- [ ] Stats update when bots change
- [ ] Recent bots section updates correctly
- [ ] Error state shows on API failure
- [ ] Retry button refetches data

**Navigation Tests:**
- [ ] "Create Bot" navigates to `/bots/create/simple`
- [ ] "View All Bots" navigates to `/dashboard/bots`
- [ ] Bot card click navigates to bot details
- [ ] Breadcrumb links work correctly

### E2E Tests (Playwright)

**User Journey 1: New User First Visit**
```typescript
test('new user sees empty state and can create bot', async ({ page }) => {
  // 1. Login as new user
  await loginAsNewUser(page)

  // 2. Should land on dashboard
  await expect(page).toHaveURL('/dashboard')

  // 3. Should see empty state
  await expect(page.locator('text=Welcome to TradingBot')).toBeVisible()
  await expect(page.locator('text=Create Your First Bot')).toBeVisible()

  // 4. Should show paper trading balance
  await expect(page.locator('text=$10,000')).toBeVisible()

  // 5. Click create bot
  await page.click('text=Create Your First Bot')

  // 6. Should navigate to bot creation
  await expect(page).toHaveURL('/bots/create/simple')
})
```

**User Journey 2: Returning User with Bots**
```typescript
test('returning user sees stats and recent bots', async ({ page }) => {
  // 1. Login as user with bots
  await loginAsUserWithBots(page, { botCount: 3 })

  // 2. Should land on dashboard
  await expect(page).toHaveURL('/dashboard')

  // 3. Should see stats
  await expect(page.locator('text=Active Bots')).toBeVisible()
  await expect(page.locator('text=Total P&L')).toBeVisible()

  // 4. Should see recent bots
  await expect(page.locator('[data-testid="bot-card"]')).toHaveCount(3)

  // 5. Should see "View All Bots" link
  await expect(page.locator('text=View All Bots')).toBeVisible()
})
```

**User Journey 3: Mobile Responsive**
```typescript
test('dashboard works on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await loginAsUser(page)

  // Stats should stack vertically
  const statsGrid = page.locator('[data-testid="stats-grid"]')
  await expect(statsGrid).toHaveCSS('grid-template-columns', 'repeat(1, minmax(0, 1fr))')

  // Bot cards should stack
  const botsGrid = page.locator('[data-testid="bots-grid"]')
  await expect(botsGrid).toHaveCSS('grid-template-columns', 'repeat(1, minmax(0, 1fr))')
})
```

### Manual Testing Checklist

**Functional:**
- [ ] Dashboard loads successfully
- [ ] Stats display correct values
- [ ] Recent bots show up to 4 bots
- [ ] Empty state appears for new users
- [ ] All buttons navigate correctly
- [ ] Refresh button updates data

**Visual:**
- [ ] Layout matches design
- [ ] Colors are correct (P&L green/red)
- [ ] Icons render correctly
- [ ] Spacing is consistent
- [ ] Typography is readable

**Responsive:**
- [ ] Mobile (375px): Single column
- [ ] Tablet (768px): Two columns
- [ ] Desktop (1024px+): Four columns
- [ ] No horizontal scroll on any size
- [ ] Touch targets ≥ 44px on mobile

**Performance:**
- [ ] Page loads < 1 second
- [ ] No layout shift (CLS = 0)
- [ ] Smooth animations
- [ ] No console errors
- [ ] Works on slow 3G

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces content
- [ ] Color contrast passes WCAG AA
- [ ] All images have alt text

---

## Implementation Plan

### Phase 1: Foundation (Day 1)

**Tasks:**
1. Create file structure
   - [ ] `/components/dashboard/` directory
   - [ ] Dashboard API route
   - [ ] Custom hooks

2. Build API endpoint
   - [ ] `GET /api/dashboard` route
   - [ ] Aggregate queries for stats
   - [ ] Recent bots query
   - [ ] Error handling

3. Create `useDashboard` hook
   - [ ] Fetch dashboard data
   - [ ] Loading/error states
   - [ ] Refresh mechanism

4. Set up types
   - [ ] `DashboardStats` interface
   - [ ] `DashboardData` interface
   - [ ] Export from types/index.ts

**Acceptance Criteria:**
- API endpoint returns correct data
- Hook fetches data successfully
- Types are properly defined

### Phase 2: Stats Components (Day 2)

**Tasks:**
1. Build `StatsCard` component
   - [ ] Props interface
   - [ ] Layout and styling
   - [ ] Icon support
   - [ ] Loading skeleton
   - [ ] Clickable variant

2. Build `DashboardStats` component
   - [ ] Grid layout (4 cols → 2 cols → 1 col)
   - [ ] Render 4 StatsCards
   - [ ] Pass calculated stats
   - [ ] Responsive design

3. Implement calculations
   - [ ] Total balance calculation
   - [ ] Active bots count
   - [ ] Total P&L aggregation
   - [ ] Win rate calculation

**Acceptance Criteria:**
- Stats cards render correctly
- Numbers are accurate
- Responsive grid works
- Loading states appear

### Phase 3: Recent Bots Section (Day 2-3)

**Tasks:**
1. Build `RecentBots` component
   - [ ] Section header with "View All Bots" link
   - [ ] Grid layout for bot cards
   - [ ] Use existing `BotCard` component
   - [ ] Handle 0-4 bots

2. Integrate with data
   - [ ] Fetch recent bots from dashboard data
   - [ ] Sort logic (active first, then recent)
   - [ ] Limit to 4 bots
   - [ ] Loading skeletons

**Acceptance Criteria:**
- Recent bots section displays correctly
- BotCard component works unchanged
- "View All Bots" link navigates correctly
- Responsive layout works

### Phase 4: Empty State (Day 3)

**Tasks:**
1. Build `DashboardEmptyState` component
   - [ ] Welcome message with user name
   - [ ] 3-step getting started guide
   - [ ] Large CTA button
   - [ ] Illustration/icon
   - [ ] Links to docs

2. Conditional rendering
   - [ ] Show empty state if bots.length === 0
   - [ ] Show normal dashboard otherwise
   - [ ] Smooth transition

**Acceptance Criteria:**
- Empty state shows for new users
- Welcome message is personalized
- CTA button is prominent
- Links navigate correctly

### Phase 5: Header & Layout (Day 3)

**Tasks:**
1. Build `DashboardHeader` component
   - [ ] Personalized greeting
   - [ ] Last login timestamp
   - [ ] Create Bot button
   - [ ] Breadcrumbs

2. Integrate into main page
   - [ ] Replace placeholder content in page.tsx
   - [ ] Add proper breadcrumbs
   - [ ] Remove dummy sidebar content
   - [ ] Add proper padding/spacing

**Acceptance Criteria:**
- Header displays user name
- Greeting logic works correctly
- Create Bot button navigates
- Layout is clean and organized

### Phase 6: Polish & Testing (Day 4)

**Tasks:**
1. Loading states
   - [ ] Skeleton loaders for all sections
   - [ ] Smooth fade-in transitions
   - [ ] No layout shift

2. Error states
   - [ ] Network error handling
   - [ ] Retry button
   - [ ] User-friendly messages

3. Animations
   - [ ] Hover effects on cards
   - [ ] Stagger animation for bots
   - [ ] Optional: Number count-up

4. Testing
   - [ ] Write unit tests
   - [ ] Write integration tests
   - [ ] Manual testing on all screen sizes
   - [ ] Accessibility audit

**Acceptance Criteria:**
- All loading states work
- Error handling is graceful
- Animations are smooth
- Tests pass

### Phase 7: Documentation & Deployment (Day 4)

**Tasks:**
1. Code documentation
   - [ ] JSDoc comments on components
   - [ ] README for dashboard components
   - [ ] Update ROADMAP.md

2. User documentation
   - [ ] Update user guide (if exists)
   - [ ] Add screenshots to docs

3. Deployment
   - [ ] Test on staging environment
   - [ ] Performance check
   - [ ] Deploy to production

**Acceptance Criteria:**
- Code is well-documented
- User guide is updated
- Dashboard is live in production

---

## Timeline & Effort Estimate

**Total Effort:** 3-4 days (solo developer)

**Breakdown:**
- Day 1: Foundation & API (4-6 hours)
- Day 2: Stats & Recent Bots (4-6 hours)
- Day 3: Empty State & Header (4-6 hours)
- Day 4: Polish, Testing, Deploy (4-6 hours)

**Dependencies:**
- Database migrations completed (Phase 2 Week 1) ✅
- `useBots` hook exists ✅
- `BotCard` component exists ✅
- Auth system works ✅

**Blockers:**
- None (all dependencies met)

---

## Appendix

### Design References

**Inspiration:**
- Stripe Dashboard (clean stats cards)
- Vercel Dashboard (simple, fast)
- Linear App (smooth animations)
- TradingView (financial data display)

### Related Documents

- [Main PRD](./PRD.md) - Overall product requirements
- [Phase 2 Plan](../progress/phase2-plan.md) - Phase 2 implementation details
- [ROADMAP.md](../ROADMAP.md) - Project roadmap and tasks
- Bot List PRD (not yet created)

### Glossary

- **P&L:** Profit and Loss (net gain or loss)
- **Win Rate:** Percentage of profitable trades
- **Paper Trading:** Simulated trading with virtual money
- **Bot Status:** Current state (active/paused/stopped/error)
- **Capital Allocated:** Money assigned to a specific bot

---

**Document History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-20 | Product Team | Initial PRD for dashboard home page |

**Approval:**

- [ ] Product Owner
- [ ] Technical Lead
- [ ] Design Lead

**Next Review Date:** After implementation completion

---

*This PRD is ready for implementation. All requirements are defined, dependencies are met, and the existing codebase supports the new dashboard page.*

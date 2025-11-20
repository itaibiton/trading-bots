# TradingBot Dashboard - Visual Specification

**Quick Reference Guide for Implementation**

---

## Layout Overview

```
╔═══════════════════════════════════════════════════════════════╗
║ NAVBAR (from existing layout)                                 ║
╠═══════════════════════════════════════════════════════════════╣
║ SIDEBAR │ MAIN DASHBOARD CONTENT                              ║
║         │                                                      ║
║  Home   │ ┌────────────────────────────────────────────────┐ ║
║  Bots   │ │ Welcome Header                                 │ ║
║ Trading │ │ Welcome back, Jordan!     [Create Bot Button] │ ║
║ Settings│ │ Last login: Today at 2:34 PM                  │ ║
║         │ └────────────────────────────────────────────────┘ ║
║         │                                                      ║
║         │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ ║
║         │ │💰        │ │🤖        │ │📈        │ │🎯      │ ║
║         │ │Balance   │ │Active    │ │Total P&L │ │Win Rate│ ║
║         │ │          │ │Bots      │ │          │ │        │ ║
║         │ │$10,000   │ │3 active  │ │+$450.23  │ │68%     │ ║
║         │ │          │ │2 paused  │ │+4.5%     │ │12/18   │ ║
║         │ └──────────┘ └──────────┘ └──────────┘ └────────┘ ║
║         │                                                      ║
║         │ ┌────────────────────────────────────────────────┐ ║
║         │ │ Recent Bots              [View All Bots →]    │ ║
║         │ ├────────────────────────────────────────────────┤ ║
║         │ │ ┌──────────┐ ┌──────────┐ ┌──────────┐       │ ║
║         │ │ │🤖 DCA Bot│ │🤖 Grid   │ │🤖 Momentum│       │ ║
║         │ │ │Strategy: │ │Strategy: │ │Strategy:  │       │ ║
║         │ │ │DCA       │ │Grid      │ │Momentum   │       │ ║
║         │ │ │          │ │          │ │           │       │ ║
║         │ │ │● Active  │ │● Active  │ │○ Paused   │       │ ║
║         │ │ │          │ │          │ │           │       │ ║
║         │ │ │P&L: +$45 │ │P&L: +$23 │ │P&L: -$15  │       │ ║
║         │ │ │Capital:  │ │Capital:  │ │Capital:   │       │ ║
║         │ │ │$1,000    │ │$2,000    │ │$1,500     │       │ ║
║         │ │ │          │ │          │ │           │       │ ║
║         │ │ │[Details] │ │[Details] │ │[Details]  │       │ ║
║         │ │ └──────────┘ └──────────┘ └──────────┘       │ ║
║         │ └────────────────────────────────────────────────┘ ║
║         │                                                      ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Empty State (New Users)

```
╔═══════════════════════════════════════════════════════════════╗
║ SIDEBAR │ MAIN DASHBOARD CONTENT                              ║
║         │                                                      ║
║         │ ┌────────────────────────────────────────────────┐ ║
║         │ │ Welcome to TradingBot, Jordan!                 │ ║
║         │ └────────────────────────────────────────────────┘ ║
║         │                                                      ║
║         │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ ║
║         │ │💰        │ │🤖        │ │📈        │ │🎯      │ ║
║         │ │Balance   │ │Active    │ │Total P&L │ │Win Rate│ ║
║         │ │$10,000   │ │0 bots    │ │$0.00     │ │--      │ ║
║         │ └──────────┘ └──────────┘ └──────────┘ └────────┘ ║
║         │                                                      ║
║         │              ┌──────────────────────┐               ║
║         │              │                      │               ║
║         │              │        🤖           │               ║
║         │              │   (Large Icon)      │               ║
║         │              │                      │               ║
║         │              │  Create your first  │               ║
║         │              │  AI-powered trading │               ║
║         │              │   bot in minutes    │               ║
║         │              │                      │               ║
║         │              │  Getting Started:   │               ║
║         │              │  1. Choose strategy │               ║
║         │              │  2. Configure bot   │               ║
║         │              │  3. Start trading   │               ║
║         │              │                      │               ║
║         │              │ ┌──────────────────┐│               ║
║         │              │ │ Create Your      ││               ║
║         │              │ │ First Bot        ││               ║
║         │              │ └──────────────────┘│               ║
║         │              │                      │               ║
║         │              │ Learn more about    │               ║
║         │              │ strategies →        │               ║
║         │              │                      │               ║
║         │              └──────────────────────┘               ║
║         │                                                      ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Mobile Layout (375px width)

```
╔═════════════════════════╗
║ NAVBAR                  ║
╠═════════════════════════╣
║ [☰] Dashboard           ║
║                         ║
║ Welcome back, Jordan!   ║
║ [Create Bot Button]     ║
╠═════════════════════════╣
║ ┌─────────────────────┐ ║
║ │💰 Balance           │ ║
║ │$10,000              │ ║
║ └─────────────────────┘ ║
║                         ║
║ ┌─────────────────────┐ ║
║ │🤖 Active Bots       │ ║
║ │3 active             │ ║
║ └─────────────────────┘ ║
║                         ║
║ ┌─────────────────────┐ ║
║ │📈 Total P&L         │ ║
║ │+$450.23 (+4.5%)     │ ║
║ └─────────────────────┘ ║
║                         ║
║ ┌─────────────────────┐ ║
║ │🎯 Win Rate          │ ║
║ │68% (12/18)          │ ║
║ └─────────────────────┘ ║
║                         ║
║ Recent Bots             ║
║ [View All Bots →]      ║
║                         ║
║ ┌─────────────────────┐ ║
║ │🤖 DCA Bot           │ ║
║ │● Active             │ ║
║ │P&L: +$45.23         │ ║
║ │[View Details]       │ ║
║ └─────────────────────┘ ║
║                         ║
║ ┌─────────────────────┐ ║
║ │🤖 Grid Bot          │ ║
║ │● Active             │ ║
║ │P&L: +$23.45         │ ║
║ │[View Details]       │ ║
║ └─────────────────────┘ ║
║                         ║
╚═════════════════════════╝
```

---

## Component Hierarchy

```
DashboardPage
├── DashboardHeader
│   ├── Welcome message
│   ├── Last login time
│   └── Create Bot button
│
├── DashboardStats (grid container)
│   ├── StatsCard (Total Balance)
│   ├── StatsCard (Active Bots)
│   ├── StatsCard (Total P&L)
│   └── StatsCard (Win Rate)
│
└── Conditional Render:
    │
    ├── If bots.length === 0:
    │   └── DashboardEmptyState
    │       ├── Welcome message
    │       ├── Icon/Illustration
    │       ├── Getting Started steps
    │       └── CTA button
    │
    └── If bots.length > 0:
        └── RecentBots
            ├── Section header
            ├── "View All Bots" link
            └── BotCard[] (existing component)
                └── Render 3-4 most recent bots
```

---

## Color Palette

### Stats Colors

```
Positive (Profit):  #22c55e  (green-500)  ████
Negative (Loss):    #ef4444  (red-500)    ████
Neutral:            #71717a  (gray-500)   ████
Primary (Brand):    #3b82f6  (blue-500)   ████
```

### Status Colors

```
Active:   #22c55e/10 bg, #22c55e text  ░░░█
Paused:   #eab308/10 bg, #eab308 text  ░░░█
Stopped:  #71717a/10 bg, #71717a text  ░░░█
Error:    #ef4444/10 bg, #ef4444 text  ░░░█
```

---

## Spacing Scale

```
xs:  4px   (gap-1)
sm:  8px   (gap-2)
md:  16px  (gap-4)  ← Default between cards
lg:  24px  (gap-6)  ← Default between sections
xl:  32px  (gap-8)
2xl: 48px  (gap-12)
```

---

## Typography Scale

```
Page Title:       text-3xl font-bold        (30px, bold)
Section Title:    text-xl font-semibold     (20px, semibold)
Stat Value:       text-2xl font-bold        (24px, bold)
Stat Label:       text-sm text-muted        (14px, muted)
Body Text:        text-base                 (16px)
Small Text:       text-xs                   (12px)
```

---

## Stat Card Anatomy

```
┌────────────────────────────────────┐
│ [Icon] Label              [Trend?] │ ← Header (flex, space-between)
│                                    │
│ Large Value                        │ ← Main stat (text-2xl, bold)
│ Subtitle text                      │ ← Context (text-sm, muted)
└────────────────────────────────────┘

Padding: p-4 (16px)
Border: border rounded-lg
Hover: hover:border-primary/50
Shadow: shadow-sm
```

### Stat Card States

**Loading:**
```
┌────────────────────────────────────┐
│ [Icon] Label                       │
│                                    │
│ ▮▮▮▮▮▮▮▮                          │ ← Skeleton shimmer
│ ▮▮▮▮▮▮                            │
└────────────────────────────────────┘
```

**With Trend (Optional Phase 2.5):**
```
┌────────────────────────────────────┐
│ 💰 Total Balance            ↑ +2.5%│
│                                    │
│ $10,450.00                         │
│ vs yesterday                       │
└────────────────────────────────────┘
```

---

## Responsive Breakpoints

```
Mobile:     < 640px    → 1 column (stats & bots)
Tablet:     640-1023px → 2 columns (stats), 2 cols (bots)
Desktop:    ≥ 1024px   → 4 columns (stats), 3-4 cols (bots)

TailwindCSS classes:
- Mobile:  Default
- Tablet:  sm: prefix
- Desktop: lg: prefix

Example grid:
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
```

---

## Icon Usage

### From lucide-react

```typescript
import {
  DollarSign,     // 💰 Total Balance
  Bot,            // 🤖 Active Bots, Bot Cards
  TrendingUp,     // 📈 Positive P&L
  TrendingDown,   // 📉 Negative P&L
  Target,         // 🎯 Win Rate
  Plus,           // ➕ Create Bot
  RefreshCw,      // 🔄 Refresh
  Eye,            // 👁 View Details
  Activity        // 📊 Alternative for stats
} from 'lucide-react'
```

### Icon Sizes

```
Stats icons:   h-5 w-5  (20px)
Action icons:  h-4 w-4  (16px)
Large icons:   h-12 w-12 (48px) in empty state
```

---

## Animation Timing

```
Fast:    100-200ms  → Hover effects
Normal:  200-300ms  → Fades, color changes
Slow:    300-500ms  → Page transitions
```

### Animation Classes

```css
/* Hover effect on cards */
transition-colors duration-200

/* Fade in on data load */
animate-in fade-in duration-300

/* Stagger animation for bot cards */
style={{ animationDelay: `${index * 50}ms` }}

/* Loading spinner */
animate-spin

/* Scale on click */
active:scale-95
```

---

## Accessibility Notes

### ARIA Labels

```tsx
<div
  role="region"
  aria-label="Dashboard statistics"
>
  {/* Stats cards */}
</div>

<button
  aria-label="Create new trading bot"
>
  <Plus /> Create Bot
</button>

<div
  role="status"
  aria-live="polite"
>
  {loading ? 'Loading dashboard data...' : null}
</div>
```

### Keyboard Navigation

```
Tab order:
1. Create Bot button
2. Stat card 1 (if clickable)
3. Stat card 2
4. Stat card 3
5. Stat card 4
6. View All Bots link
7. Bot card 1
8. Bot card 2
9. Bot card 3
...
```

---

## Data Display Formats

### Currency

```typescript
// US Dollar format
$10,000.00

// Formatting function
value.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})
```

### Percentage

```typescript
// Always show sign for P&L
+4.50%
-2.30%

// Formatting
(isProfitable ? '+' : '') + percentage.toFixed(2) + '%'
```

### Win Rate

```typescript
// Percentage with context
68% (12/18)

// Format
`${winRate.toFixed(0)}% (${wins}/${total})`
```

### Date/Time

```typescript
// Relative time
"Today at 2:34 PM"
"Yesterday at 10:15 AM"
"2 hours ago"

// Use date-fns or similar library
```

---

## Loading Sequence

```
Time    Event
────────────────────────────────────────
0ms     → User lands on /dashboard
50ms    → Show page skeleton
100ms   → Header renders with user name
200ms   → Stats skeletons appear
300ms   → Fetch dashboard data (API call)
500ms   → Stats populate (fade in)
600ms   → Recent bots section appears
800ms   → Bot cards populate (stagger)
────────────────────────────────────────
```

---

## Empty State Details

### Welcome Message

```
Welcome to TradingBot, [FirstName]!

Create your first AI-powered trading bot in minutes.
```

### Getting Started Steps

```
1. 📝 Choose a strategy template or let AI guide you
2. ⚙️  Configure trading parameters and risk controls
3. 🚀 Start with paper trading to learn risk-free
```

### CTA Button

```
Style: Primary, large
Text: "Create Your First Bot"
Icon: Plus icon (optional)
Route: /bots/create/simple
Size: px-8 py-4 text-lg (larger than normal)
```

---

## Quick Reference: CSS Classes

### Layout Containers

```html
<!-- Page container -->
<div class="space-y-6 p-4 lg:p-6">

<!-- Stats grid -->
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

<!-- Bots grid -->
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
```

### Stats Card

```html
<div class="
  rounded-lg border bg-card
  p-4 shadow-sm
  hover:border-primary/50
  transition-colors
">
```

### Stat Value (Positive)

```html
<p class="text-2xl font-bold text-green-500">
  +$450.23
</p>
```

### Stat Value (Negative)

```html
<p class="text-2xl font-bold text-red-500">
  -$45.23
</p>
```

### Loading Skeleton

```html
<div class="
  h-8 w-32
  animate-pulse rounded
  bg-muted
"></div>
```

---

## Testing Checklist

### Visual Tests

- [ ] Stats cards align correctly
- [ ] Colors match design (green/red for P&L)
- [ ] Icons render at correct size
- [ ] Spacing is consistent (16px between cards)
- [ ] Typography hierarchy is clear
- [ ] Empty state is centered and readable

### Responsive Tests

- [ ] Desktop (1920px): 4-column stats, 4 bot cards
- [ ] Laptop (1280px): 4-column stats, 3 bot cards
- [ ] Tablet (768px): 2-column stats, 2 bot cards
- [ ] Mobile (375px): 1-column everything
- [ ] No horizontal scroll on any size
- [ ] Touch targets ≥ 44px on mobile

### Functional Tests

- [ ] Stats show correct values
- [ ] Create Bot button navigates
- [ ] View All Bots link navigates
- [ ] Bot cards are clickable
- [ ] Refresh button works
- [ ] Loading states appear/disappear correctly

---

**Quick Start Implementation:**

1. Copy file structure from Implementation Plan (Phase 1)
2. Use this visual spec as reference while coding
3. Start with stats cards (simplest)
4. Then add recent bots section
5. Finally add empty state
6. Polish with animations last

**Need Help?**
- Refer to DASHBOARD_PRD.md for detailed requirements
- Check existing BotCard.tsx for style reference
- Use shadcn/ui Card component as base
- Ask questions as you implement!

# Visual Guide to Performance Charts

Quick visual reference for all chart types and their use cases.

## 1. PerformanceChart

### Full Version (Default)

```
┌─────────────────────────────────────────────────────────┐
│ Performance Overview                            [Card]  │
│ Portfolio value and asset price over 90 days • 90 ...  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  $1,200 ┤                          ╭───○────○          │
│         │                    ╭─────╯        ↓ (Sell)   │
│         │              ╭─────╯     ○ (Buy)              │
│  $1,100 ┤        ╭─────╯    ↑                          │
│         │  ╭─────╯                                      │
│         │╭─╯                                            │
│  $1,000 ┼─────────────────────────────────────         │
│         │░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░        │
│         │░░░░▓▓▓▓▓ Price Area ▓▓▓▓▓▓▓▓▓▓▓▓░░░         │
│         ├─────────────────────────────────────         │
│         │ Nov 01  Nov 15  Nov 30  Dec 15  Dec 30      │
│         │                                              │
│         │ Legend:                                      │
│         │ ━━━ Portfolio Value  ▓▓▓ Asset Price        │
│         │  ○  Buy             ○  Sell                 │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- Dual Y-axis (portfolio on left, price on right)
- Smooth line animation
- Interactive tooltip with date, values, trade info
- Buy/sell markers with arrows
- Grid lines
- Legend

**Use in:** Bot preview, backtest results, pro mode

### Compact Version

```
┌────────────────────────────────────┐
│                                    │
│  ╭──○────○     Height: 200px       │
│ ╭╯   ↑  ↓     No title             │
│─░▓▓▓▓▓▓▓▓░     No legend           │
│ Nov    Dec     Smaller margins     │
└────────────────────────────────────┘
```

**Use in:** Bot cards, success screen, mobile

---

## 2. RiskChart

### Full Version with Title

```
┌─────────────────────────────────────┐
│ Risk Level                  [Card]  │
│ Balanced risk and reward            │
├─────────────────────────────────────┤
│                                     │
│        ╭───────────╮                │
│       ╱    ███████  ╲               │
│      │    █  50%  █  │              │
│      │    █ Moderate█│              │
│       ╲   ███████  ╱                │
│        ╰───────────╯                │
│                                     │
│  ━━━━━━━━━━━━━━ Conservative       │
│  ██████████████ Moderate  ←        │
│  ━━━━━━━━━━━━━━ Aggressive         │
│                                     │
└─────────────────────────────────────┘
```

**Colors:**
- 0-33%: Green (Conservative)
- 34-66%: Yellow/Amber (Moderate)
- 67-100%: Red (Aggressive)

**Features:**
- Animated fill (1000ms)
- Center text with % and level
- Risk bars below show active level
- Responsive sizing

**Use in:** Risk assessment, bot config, strategy selection

### RiskBadge (Compact)

```
┌─────────────────────┐
│ ● Medium Risk (50%) │  ← Small badge
└─────────────────────┘
```

**Use in:** Bot cards, headers, lists

---

## 3. StrategyComparisonChart

### Returns Comparison (Bar Chart)

```
┌─────────────────────────────────────────────────────┐
│ Strategy Comparison                         [Card]  │
│ Percentage gain over backtest period (90 days)     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  40% ┤                            ▓▓▓              │
│      │                            ▓▓▓              │
│  30% ┤              ▓▓▓            ▓▓▓              │
│      │              ▓▓▓            ▓▓▓              │
│  20% ┤     ▓▓▓      ▓▓▓            ▓▓▓              │
│      │     ▓▓▓      ▓▓▓            ▓▓▓              │
│  10% ┤     ▓▓▓      ▓▓▓      ▓▓▓   ▓▓▓              │
│      │     ▓▓▓      ▓▓▓      ▓▓▓   ▓▓▓              │
│   0% ┼─────▓▓▓──────▓▓▓──────▓▓▓───▓▓▓────         │
│      │     DCA    Grid   Momentum Mean             │
│      │                                              │
│      │ Legend: ▓▓▓ Total Returns                   │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Color-coded bars by strategy
- Interactive tooltips with all metrics
- Switchable metrics (Returns, Win Rate, Drawdown)
- Grouped bar layout
- Legend

**Use in:** Strategy selection, comparison views, analytics

### Comparison Table

```
┌─────────────────────────────────────────────────────┐
│ Strategy Comparison                         [Card]  │
│ Compare key performance metrics across all strat.  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Strategy         Returns  Win Rate  Drawdown Sharpe│
│ ─────────────────────────────────────────────────  │
│ 📊 DCA             +15%      65%      5.2%    1.8   │
│ ⚡ Grid Trading    +25%      70%     15.0%    2.1   │
│ 🚀 Momentum        +40%      55%     25.0%    1.6   │
│ 🎯 Mean Reversion  +30%      68%     18.0%    1.9   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Use in:** Strategy selection, detailed comparison, reports

---

## Color Palette

### Chart Colors (from design system)

```
Chart 1 (Orange):  ███ hsl(var(--chart-1))  - Price, Grid
Chart 2 (Green):   ███ hsl(var(--chart-2))  - Equity, DCA
Chart 3 (Blue):    ███ hsl(var(--chart-3))  - Accent
Chart 4 (Purple):  ███ hsl(var(--chart-4))  - Momentum
Chart 5 (Rose):    ███ hsl(var(--chart-5))  - Mean Rev

Destructive (Red): ███ hsl(var(--destructive)) - Losses, Sell
Muted:             ███ hsl(var(--muted))       - Backgrounds
Border:            ─── hsl(var(--border))      - Grid lines
```

### Theme Adaptation

**Light Mode:**
- Bright colors with good contrast
- White backgrounds
- Dark text

**Dark Mode:**
- Muted colors (same hues, lower saturation)
- Dark backgrounds
- Light text

Charts automatically switch based on theme!

---

## Integration Examples

### Bot Preview Card

```
┌───────────────────────────────────────────────┐
│ 📊 DCA Strategy Bot      ● Low Risk (25%)    │
│ Dollar Cost Averaging • BTC/USDT              │
├───────────────────────────────────────────────┤
│                                               │
│  +15%      65%      5.2%                      │
│ Returns  Win Rate  Drawdown                   │
│                                               │
│ [Mini Performance Chart - 200px height]       │
│  ╭──○────○                                    │
│ ╭╯   ↑  ↓                                     │
│─░▓▓▓▓▓▓▓▓░                                    │
│                                               │
└───────────────────────────────────────────────┘
```

### Pro Mode Backtest Tab

```
┌─────────────────────────────────────────────────┐
│                                                 │
│ [Full Performance Chart - 400px]                │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌───────────────────┐  ┌──────────────────────┐│
│ │ [Risk Chart]      │  │ [Strategy Compare]   ││
│ │                   │  │                      ││
│ │     50%           │  │  Bar Chart           ││
│ │   Moderate        │  │                      ││
│ └───────────────────┘  └──────────────────────┘│
│                                                 │
└─────────────────────────────────────────────────┘
```

### Mobile View

```
┌─────────────────────┐
│ 📊 Bot Name    ●    │
│                     │
│ [Chart - 250px]     │
│  ╭──○                │
│ ╭╯  ↑                │
│─░▓▓▓▓                │
│                     │
│  +15%  65%  5.2%    │
│                     │
└─────────────────────┘
```

**Responsive:**
- Smaller heights (250px vs 400px)
- Compact mode enabled
- Touch-friendly tooltips
- Stacked layout

---

## Tooltip Examples

### Performance Chart Tooltip

```
┌─────────────────────────┐
│ Nov 15, 2024            │
│                         │
│ Portfolio Value $1,150  │
│ Asset Price     $42,500 │
│                         │
│ ● Buy @ $41,000         │
│ P&L: +$8.50             │
└─────────────────────────┘
```

### Strategy Comparison Tooltip

```
┌─────────────────────────┐
│ 🚀 Momentum             │
│ Momentum Trading        │
│                         │
│ Returns       +40%      │
│ Win Rate       55%      │
│ Max Drawdown   25%      │
│ Sharpe Ratio   1.6      │
└─────────────────────────┘
```

---

## Animation Timeline

### Chart Load Sequence

```
0ms     ├─ Component mounts
        │
100ms   ├─ Grid fades in
        │
300ms   ├─ Axes appear
        │
500ms   ├─ Line starts drawing ──────┐
        │                             │
1000ms  │                             │
        │                   Drawing...│
1500ms  ├─ Line complete ◀────────────┘
        │
1700ms  ├─ Trade markers appear
        │
2000ms  └─ Legend fades in (if shown)
```

**Easing:** ease-in-out for smooth, natural motion

---

## Accessibility Features

### Keyboard Navigation

```
Tab     → Move to next chart element
Enter   → Activate/show tooltip
Esc     → Close tooltip
Arrows  → Navigate data points (if interactive)
```

### Screen Reader

```
<Chart>
  <caption>Performance chart showing...</caption>
  <desc>Portfolio grew from $1000 to $1150...</desc>
  <data>
    Nov 1: $1000, Nov 2: $1010...
  </data>
</Chart>
```

### Color Blind Support

Not just color-coded:
- Buy: Green circle + ↑ arrow
- Sell: Red circle + ↓ arrow
- Risk: Color + percentage + text label
- Charts: Color + position + tooltip

---

## Size Guidelines

### Heights

```
Mini:    150px  - Bot cards, very compact
Small:   200px  - Compact mode, mobile
Medium:  300px  - Standard, balanced
Large:   400px  - Full featured, desktop
XL:      500px+ - Detailed analysis
```

### Responsive Breakpoints

```
Mobile:   < 768px   → height: 200px, compact: true
Tablet:   768-1024  → height: 300px, compact: false
Desktop:  1024+     → height: 400px, compact: false
```

---

## Quick Reference

### Import

```tsx
import {
  PerformanceChart,    // Equity + price + trades
  RiskChart,           // Risk gauge
  RiskBadge,           // Compact risk badge
  StrategyComparisonChart, // Bar comparison
  StrategyComparisonTable, // Table comparison
} from '@/components/bot-creation/charts';
```

### Basic Usage

```tsx
// Performance
<PerformanceChart backtestResult={data} />

// Risk
<RiskChart riskPercentage={50} />
<RiskBadge riskPercentage={50} />

// Comparison
<StrategyComparisonChart metric="returns" />
<StrategyComparisonTable />
```

### Compact Mode

```tsx
<PerformanceChart
  backtestResult={data}
  height={200}
  compact={true}
  showTitle={false}
/>
```

---

**Pro Tip:** Visit `/charts-demo` to see all charts in action with real data and interactive examples!

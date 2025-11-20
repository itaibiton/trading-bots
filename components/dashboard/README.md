# Dashboard Components

Enhanced dashboard components with modern design, animations, and data visualizations.

## Components

### QuickStats
Main stats display with 4 key metrics.

**Features:**
- Animated number counters with smooth easing
- Trend indicators with percentage changes
- Mini sparkline charts (area, line, bar)
- Hover effects and stagger animations
- Responsive grid layout (2 cols mobile, 4 cols desktop)
- Loading skeleton states

**Usage:**
```tsx
import { QuickStats } from '@/components/dashboard/QuickStats'

<QuickStats
  paperBalance={1000000}
  totalBots={6}
  activeBots={3}
  totalPnL={12500}
  isLoading={false}
/>
```

### Sparkline
Reusable mini chart component for displaying trends.

**Props:**
- `data`: Array of `{ value: number, timestamp?: string }`
- `color`: HSL color string (e.g., `'hsl(221, 83%, 53%)'`)
- `type`: `'area' | 'line' | 'bar'` (default: 'area')
- `height`: Chart height in pixels (default: 60)
- `showGradient`: Enable gradient fill for area charts (default: true)

**Usage:**
```tsx
import { Sparkline } from '@/components/dashboard/Sparkline'

<Sparkline
  data={[
    { value: 100, timestamp: '2024-01-01' },
    { value: 150, timestamp: '2024-01-02' },
    { value: 120, timestamp: '2024-01-03' },
  ]}
  color="hsl(142, 71%, 45%)"
  type="area"
  height={60}
  showGradient
/>
```

### AnimatedCounter
Smooth number animation component with easing.

**Props:**
- `value`: Target number to animate to
- `prefix`: Text before number (e.g., '$')
- `suffix`: Text after number (e.g., '%')
- `duration`: Animation duration in seconds (default: 1.5)
- `decimals`: Number of decimal places (default: 0)

**Usage:**
```tsx
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter'

<AnimatedCounter
  value={1000000}
  prefix="$"
  decimals={2}
  duration={1.5}
/>
```

## Utility Functions

### generateTrendData
Generate mock trend data for charts.

```typescript
generateTrendData(
  currentValue: number,
  days: number,
  trend: 'up' | 'down' | 'stable'
): Array<{ value: number; timestamp: string }>
```

**Example:**
```typescript
import { generateTrendData } from '@/components/dashboard/utils'

const data = generateTrendData(1000000, 14, 'up')
// Returns 14 days of data trending upward to 1,000,000
```

### calculatePercentageChange
Calculate percentage change between two values.

```typescript
calculatePercentageChange(current: number, previous: number): number
```

### formatPercentage
Format percentage with +/- sign.

```typescript
formatPercentage(percentage: number, decimals?: number): string
// formatPercentage(12.5) => "+12.5%"
// formatPercentage(-8.3, 2) => "-8.30%"
```

### formatCurrency
Format number as currency.

```typescript
formatCurrency(value: number, currency?: string): string
// formatCurrency(1000000) => "$1,000,000.00"
```

### formatCompactNumber
Format large numbers with K/M/B suffixes.

```typescript
formatCompactNumber(value: number): string
// formatCompactNumber(1500000) => "1.5M"
// formatCompactNumber(2500) => "2.5K"
```

## Design Tokens

### Colors
All colors use HSL values for consistency with the design system:

- **Blue** (Paper Balance): `hsl(221, 83%, 53%)`
- **Purple** (Total Bots): `hsl(262, 83%, 58%)`
- **Green** (Active/Profit): `hsl(142, 71%, 45%)`
- **Red** (Loss): `hsl(0, 84%, 60%)`

### Animations

**fadeInUp** (defined in `app/globals.css`):
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Used for staggered card entrance animations.

### Card Hover Effects
- **Scale**: 1.02x on hover
- **Shadow**: Elevated shadow on hover
- **Icon**: 1.1x scale on hover
- **Transition**: 300ms ease for smooth interaction

## Architecture

### Data Flow
```
QuickStats (container)
  ├── Generates trend data (useMemo)
  ├── Calculates percentages (useMemo)
  └── Maps 4 stat cards
       ├── AnimatedCounter (number animation)
       ├── Trend indicator (TrendingUp/Down icon + %)
       └── Sparkline (mini chart)
```

### Performance Optimizations
- **useMemo**: Prevents trend data regeneration on every render
- **ChartContainer**: Recharts ResponsiveContainer for efficient resizing
- **requestAnimationFrame**: Smooth counter animations without layout thrashing
- **CSS animations**: Hardware-accelerated transforms for smooth hover effects

## Customization

### Adding New Stat Cards
To add a new metric card to QuickStats:

1. Add stat configuration to the `stats` array:
```typescript
{
  id: 'custom-metric',
  label: 'Custom Metric',
  value: customValue,
  formattedValue: formatValue(customValue),
  icon: CustomIcon,
  color: 'hsl(200, 70%, 50%)',
  iconBg: 'bg-sky-500/10',
  iconColor: 'text-sky-500',
  gradientFrom: 'from-sky-500/5',
  trend: customTrend,
  chart: {
    type: 'area',
    data: customTrendData,
    height: 60,
    showGradient: true,
  },
  footer: 'Custom footer text',
}
```

2. Generate trend data:
```typescript
const customTrendData = useMemo(
  () => generateTrendData(customValue, 7, 'up'),
  [customValue]
)
```

3. Update grid layout if needed (adjust `lg:grid-cols-X` in QuickStats return).

### Customizing Chart Colors
Pass HSL color strings to Sparkline for consistent theme integration:

```typescript
// Use design system colors
<Sparkline color="hsl(var(--primary))" />

// Or custom HSL colors
<Sparkline color="hsl(200, 70%, 50%)" />
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS Grid support
- Requires `requestAnimationFrame` for animations
- Recharts requires SVG support

## Dependencies
- **recharts** (^3.4.1): Chart rendering
- **lucide-react** (^0.553.0): Icons
- **shadcn/ui**: Card, Skeleton components
- **framer-motion** (^12.23.24): Available but not used (prefer CSS animations for performance)

## Testing
To verify the components work correctly:

1. Check with loading state: `isLoading={true}`
2. Test with zero values: `paperBalance={0}`
3. Test with negative P&L: `totalPnL={-5000}`
4. Test responsive breakpoints (mobile, tablet, desktop)
5. Test dark mode appearance
6. Verify animations don't cause jank (60fps)

## Future Enhancements
Potential improvements for future iterations:

- Real-time data updates with WebSocket
- Click-through to detailed views
- Customizable time ranges (7d, 30d, 90d, 1y)
- Comparison mode (compare to previous period)
- Export chart data as CSV/PNG
- Accessibility improvements (ARIA labels, keyboard navigation)
- Interactive tooltips on chart hover

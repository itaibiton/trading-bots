# Bot Creation Components

Complete documentation for all bot creation flow components.

## Table of Contents

1. [Overview](#overview)
2. [Component Architecture](#component-architecture)
3. [Simple Mode Components](#simple-mode-components)
4. [Pro Mode Components](#pro-mode-components)
5. [Shared Components](#shared-components)
6. [Usage Examples](#usage-examples)
7. [Styling Guide](#styling-guide)
8. [Testing](#testing)

---

## Overview

The bot creation system consists of two main flows:

### Simple Mode (AI-Guided)
A conversational interface where an AI assistant guides users through bot creation via a chat interface. Perfect for beginners who want quick setup without technical knowledge.

**Key Features:**
- Split-screen layout (Preview | Chat)
- Multi-step conversation flow
- Real-time preview updates
- Quick reply buttons
- Strategy templates
- Estimated ~5 minutes to complete

### Pro Mode (Advanced)
A comprehensive tabbed interface for experienced users who want full control over bot configuration.

**Key Features:**
- 5-tab configuration system
- Advanced parameter controls
- Backtesting capabilities
- Technical indicators
- Custom risk management
- Estimated 15-30 minutes to complete

---

## Component Architecture

```
bot-creation/
├── simple/                    # Simple Mode (AI-Guided)
│   ├── ChatInterface.tsx     # Main chat UI
│   ├── BotPreview.tsx        # Live configuration preview
│   ├── AIMessage.tsx         # AI message bubble
│   ├── UserMessage.tsx       # User message bubble
│   ├── TypingIndicator.tsx   # "AI is typing..." animation
│   ├── QuickReplyButtons.tsx # Quick action buttons
│   └── StrategyTemplateCard.tsx # Strategy selection cards
│
├── pro/                       # Pro Mode (Advanced)
│   ├── StrategyTab.tsx       # Strategy selection & config
│   ├── RiskTab.tsx           # Risk management settings
│   ├── TechnicalTab.tsx      # Trading pair & exchange
│   ├── BacktestTab.tsx       # Historical testing
│   └── ReviewTab.tsx         # Final review & submission
│
├── SuccessCelebration.tsx     # Success modal with confetti
└── BotCreationDemo.tsx        # Standalone demo component
```

---

## Simple Mode Components

### ChatInterface

The main conversational interface for simple bot creation.

**Props:**
```tsx
interface ChatInterfaceProps {
  onBack?: () => void;           // Navigate back to mode selection
  onComplete?: (data: any) => void; // Bot creation completion
  onDataUpdate?: (data: any) => void; // Preview data updates
}
```

**Features:**
- Multi-step conversation flow (Goal → Risk → Capital → Strategy → Review)
- Auto-scroll to latest message
- Quick reply buttons for common answers
- Custom text input for flexible responses
- Real-time preview synchronization
- Loading states with typing indicator

**Usage:**
```tsx
import { ChatInterface } from '@/components/bot-creation/simple/ChatInterface';

<ChatInterface
  onBack={() => router.push('/bots/create')}
  onComplete={(data) => console.log('Bot created:', data)}
  onDataUpdate={(data) => setPreviewData(prev => ({ ...prev, ...data }))}
/>
```

**Conversation Steps:**
1. **Goal Selection** - What's your trading goal?
2. **Risk Tolerance** - How much risk are you comfortable with?
3. **Capital Allocation** - How much capital to allocate?
4. **Strategy Recommendation** - AI recommends optimal strategy
5. **Final Review** - Confirm and create bot

---

### BotPreview

Live preview that updates as user progresses through conversation.

**Props:**
```tsx
interface BotPreviewProps {
  goal?: string;              // Trading goal
  risk?: RiskLevel;           // Risk level (low/medium/high)
  capital?: number;           // Capital amount
  strategy?: StrategyType;    // Selected strategy
  currentStep?: number;       // Current conversation step (1-5)
}
```

**Features:**
- 5-step progress indicator with icons
- Risk gauge visualization
- Estimated performance chart (12-month projection)
- Confidence builder section (why this bot works)
- Estimated returns calculation
- Configuration summary cards
- Empty state with helpful message

**Visual Elements:**
- Goal icon and label
- Risk level badge with color coding
- Capital display with formatting
- Strategy icon and name
- Paper trading mode badge
- Mini performance chart (Recharts)
- Sequential animations for each data point

**Usage:**
```tsx
import { BotPreview } from '@/components/bot-creation/simple/BotPreview';

<BotPreview
  goal="passive_income"
  risk="medium"
  capital={5000}
  strategy="dca"
  currentStep={4}
/>
```

---

### AIMessage

Renders AI assistant messages with optional quick replies and strategy cards.

**Props:**
```tsx
interface AIMessageProps {
  message: {
    content: string;          // Message text (supports markdown)
    timestamp?: Date;         // Message timestamp
    quickReplies?: Array<{    // Quick reply options
      label: string;
      value: string;
    }>;
    strategyCards?: boolean;  // Show strategy template cards
  };
  onQuickReply?: (value: string, label: string) => void;
  onStrategySelect?: (type: string, name: string) => void;
}
```

**Features:**
- Markdown content rendering
- Animated entry (fade + slide)
- Avatar with bot icon
- Timestamp display
- Quick reply buttons
- Strategy template cards
- Loading skeleton

---

### UserMessage

Renders user messages in the chat.

**Props:**
```tsx
interface UserMessageProps {
  content: string;
  timestamp?: Date;
}
```

**Features:**
- Right-aligned layout
- User avatar placeholder
- Timestamp display
- Animated entry

---

### TypingIndicator

Animated "AI is typing..." indicator.

**Features:**
- Three bouncing dots animation
- Smooth fade in/out
- Consistent with chat design

**Usage:**
```tsx
import { TypingIndicator } from '@/components/bot-creation/simple/TypingIndicator';

<AnimatePresence>
  {isLoading && <TypingIndicator />}
</AnimatePresence>
```

---

### QuickReplyButtons

Interactive buttons for quick responses.

**Props:**
```tsx
interface QuickReplyButtonsProps {
  options: Array<{
    label: string;
    value: string;
    icon?: React.ReactNode;
  }>;
  onSelect: (value: string, label: string) => void;
}
```

**Features:**
- Horizontal scrollable layout
- Icon support
- Hover effects
- Touch-friendly sizing
- Keyboard accessible

---

### StrategyTemplateCard

Visual cards for strategy selection.

**Props:**
```tsx
interface StrategyTemplateCardProps {
  strategy: {
    type: StrategyType;
    name: string;
    description: string;
    icon: string;
    pros: string[];
    riskLevel: RiskLevel;
  };
  onSelect: (type: StrategyType, name: string) => void;
}
```

**Features:**
- Large icon display
- Strategy name and description
- Pros list with checkmarks
- Risk level badge
- Hover lift effect
- Click to select

---

## Pro Mode Components

### StrategyTab

First tab for strategy selection and configuration.

**Props:**
```tsx
interface StrategyTabProps {
  selectedStrategy?: StrategyType;
  strategyParams?: Record<string, unknown>;
  onStrategyChange: (strategy: StrategyType) => void;
  onParamsChange: (params: Record<string, unknown>) => void;
}
```

**Features:**
- 4 strategy templates (DCA, Grid, Momentum, Mean Reversion)
- Template cards with descriptions
- Custom parameter configuration per strategy
- Real-time parameter validation
- Help tooltips for complex settings

**Strategy Templates:**
1. **DCA (Dollar Cost Averaging)**
   - Best for: Long-term accumulation
   - Risk: Low to Medium
   - Parameters: Buy interval, amount per buy

2. **Grid Trading**
   - Best for: Range-bound markets
   - Risk: Medium
   - Parameters: Grid levels, spacing, profit per grid

3. **Momentum Trading**
   - Best for: Trending markets
   - Risk: Medium to High
   - Parameters: Momentum indicators, entry/exit thresholds

4. **Mean Reversion**
   - Best for: Volatile markets
   - Risk: Medium
   - Parameters: Deviation thresholds, holding period

---

### RiskTab

Risk management configuration.

**Props:**
```tsx
interface RiskTabProps {
  stopLoss: number;           // Stop loss %
  takeProfit: number;         // Take profit %
  maxDrawdown: number;        // Max drawdown %
  positionSize: number;       // Max position size %
  maxDailyLoss: number;       // Max daily loss $
  capitalAllocated: number;   // Total capital
  onRiskChange: (risk: Partial<RiskConfig>) => void;
}
```

**Features:**
- Interactive sliders for all risk parameters
- Real-time calculations and previews
- Risk level auto-detection (low/medium/high)
- Visual risk gauge
- Recommended ranges with warnings
- Safety checks and validation
- Impact preview (dollar amounts)

**Risk Parameters:**
- **Stop Loss:** Automatic exit if loss reaches threshold
- **Take Profit:** Automatic exit when profit target hit
- **Max Drawdown:** Maximum portfolio decline allowed
- **Position Size:** Maximum % of capital per trade
- **Max Daily Loss:** Daily loss limit in dollars

---

### TechnicalTab

Trading pair and exchange configuration.

**Props:**
```tsx
interface TechnicalTabProps {
  tradingPair: string;
  exchange: string;
  tradingMode: 'paper' | 'live';
  leverage?: number;
  orderType?: string;
  retryEnabled?: boolean;
  onTechnicalChange: (technical: Partial<TechnicalConfig>) => void;
}
```

**Features:**
- Trading pair selector (BTC/USDT, ETH/USDT, etc.)
- Exchange selection (Binance for now)
- Trading mode toggle (paper/live)
- Leverage configuration (Phase 3)
- Order type selection (market/limit)
- Retry settings for failed orders
- Real-time pair info (price, 24h change)

---

### BacktestTab

Historical backtesting interface.

**Props:**
```tsx
interface BacktestTabProps {
  strategyType?: StrategyType;
  tradingPair: string;
  capitalAllocated: number;
}
```

**Features:**
- Date range selector
- Backtest execution button
- Results visualization (charts)
- Performance metrics:
  - Total return %
  - Win rate
  - Sharpe ratio
  - Max drawdown
  - Number of trades
- Trade history table
- Export results (CSV/JSON)

**Note:** Phase 1 uses mock data. Phase 3 will integrate real historical data from Binance.

---

### ReviewTab

Final review and bot creation.

**Props:**
```tsx
interface ReviewTabProps {
  formData: BotFormData;
  strategyType?: StrategyType;
  onSubmit: () => void;
  isSubmitting: boolean;
}
```

**Features:**
- Complete configuration summary
- Edit buttons for each section
- Risk warnings if applicable
- Terms and conditions checkbox
- Final validation before submission
- Loading state during creation
- Error display if submission fails

**Summary Sections:**
1. **Bot Information** - Name, description
2. **Strategy** - Type, parameters
3. **Risk Management** - All risk settings
4. **Technical Setup** - Pair, exchange, mode
5. **Capital** - Allocation amount

---

## Shared Components

### SuccessCelebration

Celebratory modal shown after successful bot creation.

**Props:**
```tsx
interface SuccessCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  botData: {
    name: string;
    strategyType: StrategyType;
    riskLevel: RiskLevel;
    capitalAllocated: number;
    botId?: string;
  };
  onViewBot?: () => void;
  onCreateAnother?: () => void;
}
```

**Features:**
- Confetti animation (4 seconds)
- Large success checkmark animation
- Bot configuration summary card
- Sequential checkmark animations:
  1. Bot Created Successfully
  2. Risk Configuration Applied
  3. Paper Trading Activated
  4. Ready to Start Trading
- AI insight box
- Multiple CTA buttons:
  - Start Paper Trading (primary)
  - View Dashboard
  - Create Another Bot

**Usage:**
```tsx
import { SuccessCelebration } from '@/components/bot-creation/SuccessCelebration';

<SuccessCelebration
  isOpen={showSuccess}
  onClose={() => setShowSuccess(false)}
  botData={{
    name: 'My DCA Bot',
    strategyType: 'dca',
    riskLevel: 'medium',
    capitalAllocated: 5000,
    botId: 'bot_123',
  }}
  onViewBot={() => router.push(`/dashboard/bots/${botId}`)}
  onCreateAnother={() => router.push('/bots/create')}
/>
```

---

## Usage Examples

### Complete Simple Mode Flow

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/bot-creation/simple/ChatInterface';
import { BotPreview } from '@/components/bot-creation/simple/BotPreview';
import { SuccessCelebration } from '@/components/bot-creation/SuccessCelebration';

export default function SimpleBotCreationPage() {
  const router = useRouter();
  const [previewData, setPreviewData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [botData, setBotData] = useState(null);

  const handleDataUpdate = (data) => {
    setPreviewData(prev => ({ ...prev, ...data }));
  };

  const handleComplete = async (conversationData) => {
    // TODO: API call to create bot
    const newBot = {
      name: `${conversationData.recommendedStrategy.toUpperCase()} Bot`,
      strategyType: conversationData.recommendedStrategy,
      riskLevel: conversationData.risk,
      capitalAllocated: conversationData.capital,
      botId: 'bot_' + Date.now(),
    };

    setBotData(newBot);
    setShowSuccess(true);
  };

  return (
    <>
      <div className="container max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-6 h-[calc(100vh-12rem)]">
          {/* Preview */}
          <div className="order-2 lg:order-1">
            <BotPreview {...previewData} />
          </div>

          {/* Chat */}
          <div className="order-1 lg:order-2">
            <ChatInterface
              onBack={() => router.push('/bots/create')}
              onComplete={handleComplete}
              onDataUpdate={handleDataUpdate}
            />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {botData && (
        <SuccessCelebration
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          botData={botData}
          onViewBot={() => router.push(`/dashboard/bots/${botData.botId}`)}
          onCreateAnother={() => router.push('/bots/create')}
        />
      )}
    </>
  );
}
```

### Complete Pro Mode Flow

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBotCreation } from '@/hooks/useBotCreation';
import { StrategyTab } from '@/components/bot-creation/pro/StrategyTab';
import { RiskTab } from '@/components/bot-creation/pro/RiskTab';
import { TechnicalTab } from '@/components/bot-creation/pro/TechnicalTab';
import { BacktestTab } from '@/components/bot-creation/pro/BacktestTab';
import { ReviewTab } from '@/components/bot-creation/pro/ReviewTab';

export default function ProModePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('strategy');

  const { formData, updateFormData, submit } = useBotCreation({
    mode: 'pro',
    onComplete: (data) => {
      router.push('/dashboard/bots');
    },
  });

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="backtest">Backtest</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>

        <TabsContent value="strategy">
          <StrategyTab
            selectedStrategy={formData.strategyType}
            onStrategyChange={(strategy) => updateFormData({ strategyType: strategy })}
          />
        </TabsContent>

        {/* Other tabs... */}

        <TabsContent value="review">
          <ReviewTab
            formData={formData}
            onSubmit={submit}
            isSubmitting={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## Styling Guide

### Design System

All components use the shadcn/ui design system with Tailwind CSS v4.

**Color Palette:**
- Primary: `text-primary` / `bg-primary`
- Muted: `text-muted-foreground` / `bg-muted`
- Destructive: `text-destructive` / `bg-destructive`
- Success: `text-green-600 dark:text-green-400`

**Risk Level Colors:**
```tsx
const riskColors = {
  low: 'bg-green-500/10 text-green-700 border-green-500/20',
  medium: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  high: 'bg-red-500/10 text-red-700 border-red-500/20',
};
```

**Spacing:**
- Base unit: 4px (Tailwind's default)
- Gaps: `gap-2` (8px), `gap-4` (16px), `gap-6` (24px)
- Padding: `p-4` (16px), `p-6` (24px)
- Margins: `mb-4` (16px), `mt-6` (24px)

**Typography:**
- Headings: `text-3xl font-bold`, `text-2xl font-semibold`, `text-lg font-medium`
- Body: `text-sm` (14px), `text-base` (16px)
- Muted: `text-xs text-muted-foreground`

**Animations:**
- Duration: 200-300ms
- Easing: `ease-in-out` or custom bezier `[0.25, 0.1, 0.25, 1]`
- Transitions: `transition-all duration-300`

### Dark Mode

All components support dark mode automatically via Tailwind's `dark:` prefix.

**Example:**
```tsx
<div className="bg-background text-foreground border border-border">
  <p className="text-muted-foreground">
    This text adapts to dark mode automatically
  </p>
</div>
```

---

## Testing

### Unit Testing (React Testing Library)

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInterface } from '@/components/bot-creation/simple/ChatInterface';

describe('ChatInterface', () => {
  it('renders welcome message on mount', () => {
    render(<ChatInterface />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it('handles quick reply selection', () => {
    const onDataUpdate = jest.fn();
    render(<ChatInterface onDataUpdate={onDataUpdate} />);

    const button = screen.getByText('Passive Income');
    fireEvent.click(button);

    expect(onDataUpdate).toHaveBeenCalledWith({ goal: 'passive_income' });
  });
});
```

### E2E Testing (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('simple bot creation flow', async ({ page }) => {
  await page.goto('/bots/create/simple');

  // Select goal
  await page.click('text=Passive Income');
  await page.waitForSelector('text=risk');

  // Select risk
  await page.click('text=Medium Risk');
  await page.waitForSelector('text=capital');

  // Enter capital
  await page.click('text=$1000');
  await page.waitForSelector('text=strategy');

  // Select strategy
  await page.click('text=DCA');
  await page.waitForSelector('text=Create Bot');

  // Create bot
  await page.click('text=Create Bot');
  await expect(page.locator('text=Success')).toBeVisible();
});
```

### Visual Regression Testing (Chromatic)

```bash
# Build Storybook
pnpm build-storybook

# Upload to Chromatic
npx chromatic --project-token=YOUR_TOKEN
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('ChatInterface has no accessibility violations', async () => {
  const { container } = render(<ChatInterface />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Performance Optimization

### Memoization

Use `useMemo` for expensive calculations:

```tsx
const chartData = useMemo(() => {
  // Generate chart data
  return data;
}, [strategy]);
```

### Code Splitting

Lazy load heavy components:

```tsx
const SuccessCelebration = dynamic(
  () => import('@/components/bot-creation/SuccessCelebration'),
  { ssr: false }
);
```

### Virtualization

For long lists (e.g., backtest trade history):

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
```

---

## API Integration (Phase 2)

### Simple Mode Bot Creation

```tsx
// POST /api/bots
const response = await fetch('/api/bots', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: botName,
    strategy_type: strategyType,
    risk_level: riskLevel,
    capital_allocated: capital,
    trading_pair: 'BTC/USDT',
    trading_mode: 'paper',
    ai_conversation_id: conversationId,
  }),
});

const bot = await response.json();
```

### Pro Mode Bot Creation

```tsx
// POST /api/bots
const response = await fetch('/api/bots', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: formData.name,
    strategy_type: formData.strategyType,
    strategy_params: formData.strategyParams,
    risk_level: formData.riskLevel,
    stop_loss_percentage: formData.stopLossPercentage,
    take_profit_percentage: formData.takeProfitPercentage,
    max_position_size: formData.maxPositionSize,
    trading_pair: formData.tradingPair,
    capital_allocated: formData.capitalAllocated,
    trading_mode: formData.tradingMode,
  }),
});

const bot = await response.json();
```

---

## Troubleshooting

### Common Issues

**Issue:** Chat messages not auto-scrolling
**Solution:** Ensure ScrollArea ref is properly attached and scrollHeight is being updated

**Issue:** Preview not updating in real-time
**Solution:** Check that `onDataUpdate` callback is properly wired through props

**Issue:** Animations stuttering
**Solution:** Use `will-change` CSS property or reduce animation complexity

**Issue:** Build failing with Suspense error
**Solution:** Wrap components using `useSearchParams()` in Suspense boundary

---

## Contributing

When adding new components:

1. Follow existing naming conventions
2. Add TypeScript interfaces for all props
3. Include JSDoc comments
4. Support dark mode
5. Add ARIA labels for accessibility
6. Test on mobile viewports
7. Write unit tests
8. Update this README

---

## License

Proprietary - TradingBot Platform

---

## Support

For questions or issues, contact the development team or create an issue in the project repository.

---

**Last Updated:** 2025-11-13
**Version:** 1.0.0

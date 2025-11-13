# Bot Creation Components - Integration Guide

This guide explains how to integrate the enhanced `BotPreview` and `SuccessCelebration` components into your bot creation flow.

## Components Overview

### 1. BotPreview (Enhanced)

**Location:** `/components/bot-creation/simple/BotPreview.tsx`

**Features:**
- 5-step progress indicator with icons
- Real-time configuration display in grid layout
- Animated risk gauge with color coding
- Mini performance chart (12-month projection)
- Confidence builder section with checkmarks
- AI insights and recommendations
- All animations powered by Framer Motion
- Full design system integration

**Props:**
```typescript
interface BotPreviewProps {
  goal?: string;           // Trading goal: 'passive_income' | 'growth' | 'volatility' | 'learning'
  risk?: RiskLevel;        // 'low' | 'medium' | 'high'
  capital?: number;        // Amount in USDT
  strategy?: StrategyType; // 'dca' | 'grid' | 'momentum' | 'mean-reversion'
  currentStep?: number;    // Optional: 1-5 to manually control progress indicator
}
```

### 2. SuccessCelebration

**Location:** `/components/bot-creation/SuccessCelebration.tsx`

**Features:**
- Full-screen confetti animation (4 seconds)
- Large success checkmark with spring animation
- Bot summary card with key metrics
- Sequential checkmark animations (4 steps)
- AI insight box
- Three CTA buttons (primary, secondary, tertiary)
- Keyboard accessible (ESC to close)
- Auto-cleanup and smooth transitions

**Props:**
```typescript
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
  onViewBot?: () => void;      // Optional: custom handler for "View Bot"
  onCreateAnother?: () => void; // Optional: custom handler for "Create Another"
}
```

## Integration Examples

### Example 1: Simple Mode Chat Interface

```tsx
'use client';

import { useState } from 'react';
import { BotPreview } from '@/components/bot-creation/simple/BotPreview';
import { SuccessCelebration } from '@/components/bot-creation/SuccessCelebration';
import { AIChat } from '@/components/bot-creation/simple/AIChat';

export function SimpleBotCreation() {
  const [config, setConfig] = useState({
    goal: undefined,
    risk: undefined,
    capital: undefined,
    strategy: undefined,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdBot, setCreatedBot] = useState(null);

  // Update config as user chats with AI
  const handleConfigUpdate = (updates) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  // Handle bot creation
  const handleCreateBot = async (finalConfig) => {
    try {
      const response = await fetch('/api/bots', {
        method: 'POST',
        body: JSON.stringify(finalConfig),
      });

      const bot = await response.json();
      setCreatedBot(bot);
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to create bot:', error);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left: AI Chat */}
      <AIChat
        onConfigUpdate={handleConfigUpdate}
        onComplete={handleCreateBot}
      />

      {/* Right: Live Preview */}
      <BotPreview
        goal={config.goal}
        risk={config.risk}
        capital={config.capital}
        strategy={config.strategy}
      />

      {/* Success Modal */}
      {createdBot && (
        <SuccessCelebration
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          botData={{
            name: createdBot.name,
            strategyType: createdBot.strategyType,
            riskLevel: createdBot.riskLevel,
            capitalAllocated: createdBot.capitalAllocated,
            botId: createdBot.id,
          }}
        />
      )}
    </div>
  );
}
```

### Example 2: Multi-Step Form Integration

```tsx
'use client';

import { useState } from 'react';
import { BotPreview } from '@/components/bot-creation/simple/BotPreview';
import { SuccessCelebration } from '@/components/bot-creation/SuccessCelebration';
import { Button } from '@/components/ui/button';

export function FormBotCreation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    // Create bot via API
    const bot = await createBot(formData);
    setShowSuccess(true);
  };

  return (
    <div className="grid lg:grid-cols-[1fr,400px] gap-6">
      {/* Left: Multi-step form */}
      <div className="space-y-6">
        {currentStep === 1 && <GoalStep onChange={setFormData} />}
        {currentStep === 2 && <RiskStep onChange={setFormData} />}
        {currentStep === 3 && <CapitalStep onChange={setFormData} />}
        {currentStep === 4 && <StrategyStep onChange={setFormData} />}
        {currentStep === 5 && <ReviewStep data={formData} onSubmit={handleSubmit} />}

        <div className="flex gap-2">
          <Button onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 1}>
            Back
          </Button>
          <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === 5}>
            Next
          </Button>
        </div>
      </div>

      {/* Right: Sticky Preview */}
      <div className="lg:sticky lg:top-6 h-fit">
        <BotPreview
          goal={formData.goal}
          risk={formData.risk}
          capital={formData.capital}
          strategy={formData.strategy}
          currentStep={currentStep}
        />
      </div>

      {/* Success Modal */}
      <SuccessCelebration
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        botData={formData}
      />
    </div>
  );
}
```

### Example 3: Template Selection Flow

```tsx
'use client';

import { useState } from 'react';
import { SuccessCelebration } from '@/components/bot-creation/SuccessCelebration';
import { StrategyTemplate } from '@/components/bot-creation/StrategyTemplate';

export function TemplateBotCreation() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdBot, setCreatedBot] = useState(null);

  const handleSelectTemplate = async (template) => {
    setSelectedTemplate(template);

    // Auto-create bot from template
    const bot = await createBotFromTemplate(template);
    setCreatedBot(bot);
    setShowSuccess(true);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StrategyTemplate
          name="DCA Bot"
          strategy="dca"
          onClick={() => handleSelectTemplate('dca')}
        />
        <StrategyTemplate
          name="Grid Bot"
          strategy="grid"
          onClick={() => handleSelectTemplate('grid')}
        />
        <StrategyTemplate
          name="Momentum Bot"
          strategy="momentum"
          onClick={() => handleSelectTemplate('momentum')}
        />
      </div>

      {createdBot && (
        <SuccessCelebration
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          botData={createdBot}
          onCreateAnother={() => {
            setShowSuccess(false);
            setCreatedBot(null);
            setSelectedTemplate(null);
          }}
        />
      )}
    </>
  );
}
```

## Best Practices

### BotPreview

1. **Update in Real-Time:** Call state setters immediately when user provides input
2. **Use currentStep Prop:** For precise control in multi-step forms
3. **Responsive Layout:** Works best in a 350-450px wide sidebar
4. **Sticky Positioning:** Use `sticky top-6` on desktop for always-visible preview

### SuccessCelebration

1. **Timing:** Show immediately after bot creation API call succeeds
2. **Auto-Dismiss:** Consider auto-closing after 10-15 seconds (optional)
3. **Redirect:** Always provide clear next actions (view dashboard, create another)
4. **Toast Notification:** Add a toast after modal closes for confirmation
5. **Error Handling:** Never show success modal if bot creation failed

## Styling Notes

Both components use:
- Design system colors and spacing
- Framer Motion for all animations
- Light/dark mode support
- Mobile-responsive layouts
- Accessible ARIA labels

## Demo Page

Visit `/demo/bot-creation` to see an interactive demo with step controls.

## Troubleshooting

### Confetti Not Showing
- Ensure `react-confetti` is installed: `npm install react-confetti`
- Check window dimensions are calculated correctly
- Verify modal is rendered in browser (not SSR)

### Animations Stuttering
- Reduce `numberOfPieces` in confetti to 100 for slower devices
- Check Framer Motion version compatibility
- Ensure parent containers don't have `overflow: hidden`

### Chart Not Rendering
- Verify `recharts` is installed: `npm install recharts`
- Check chart data is not empty
- Ensure ResponsiveContainer has explicit height

## API Integration

```typescript
// Example API call for bot creation
async function createBot(config: BotCreationData) {
  const response = await fetch('/api/bots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: config.name || 'My Bot',
      strategyType: config.strategy,
      riskLevel: config.risk,
      capitalAllocated: config.capital,
      tradingMode: 'paper',
      tradingPair: 'BTC/USDT',
      // ... other required fields
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create bot');
  }

  return response.json();
}
```

## Next Steps

1. Integrate components into your bot creation routes
2. Connect to your bot creation API endpoints
3. Add toast notifications for user feedback
4. Implement analytics tracking for success events
5. Test on mobile devices for responsive behavior

## Support

For questions or issues with these components, refer to:
- `/components/bot-creation/simple/BotPreview.tsx` (source)
- `/components/bot-creation/SuccessCelebration.tsx` (source)
- `/app/demo/bot-creation/page.tsx` (demo)

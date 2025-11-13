# Bot Creation - Quick Start Guide

Quick reference for working with the bot creation foundation.

## 📦 What's Available

### Types
```typescript
import { Bot, Strategy, BotCreationData, RiskLevel, StrategyType } from '@/types/bot';
```

### Mock Data
```typescript
import {
  strategies,              // Array of 4 strategy templates
  getStrategyById,        // Get strategy by ID
  getStrategyByType,      // Get strategy by type
  conversationFlow,       // AI conversation messages
  generateAIResponse,     // Generate dynamic AI responses
  dcaBacktestResult,      // DCA backtest data
  getBacktestByStrategy,  // Get backtest by strategy type
} from '@/lib/mock-data';
```

### Hooks
```typescript
import { useBotCreation, useAIConversation } from '@/hooks/useBotCreation';

// Bot creation state management
const {
  formData,
  currentStep,
  steps,
  updateFormData,
  nextStep,
  prevStep,
  validateStep,
  submit,
} = useBotCreation({
  mode: 'template', // or 'ai' or 'pro'
  onComplete: (data) => console.log('Bot created:', data),
});

// AI conversation management
const {
  messages,
  conversationData,
  addMessage,
  updateConversationData,
} = useAIConversation();
```

### Utilities
```typescript
import {
  formatCurrency,          // "$1,500.00"
  formatPercentage,        // "+15.50%"
  getRiskLevelColor,       // Tailwind classes
  validateBotName,         // Name validation
  calculatePositionSize,   // Position calculations
  sortBots,               // Sort bot arrays
  filterBotsByStatus,     // Filter bot arrays
} from '@/lib/utils/bot-helpers';
```

## 🎯 Strategy Templates

### DCA (dca-001)
- **Risk:** Low
- **Return:** 15% annually
- **Best For:** Passive income, beginners
- **Min Capital:** $100
- **Recommended:** $1,000

### Grid Trading (grid-001)
- **Risk:** Medium
- **Return:** 25% annually
- **Best For:** Sideways markets
- **Min Capital:** $500
- **Recommended:** $2,000

### Momentum (momentum-001)
- **Risk:** High
- **Return:** 40% annually
- **Best For:** Trend following
- **Min Capital:** $500
- **Recommended:** $2,000

### Mean Reversion (meanrev-001)
- **Risk:** Medium
- **Return:** 30% annually
- **Best For:** Range-bound markets
- **Min Capital:** $300
- **Recommended:** $1,500

## 🚀 Usage Examples

### Get Strategy Template
```typescript
import { getStrategyById } from '@/lib/mock-data';

const dcaStrategy = getStrategyById('dca-001');
console.log(dcaStrategy.name); // "DCA"
console.log(dcaStrategy.expectedReturn); // 15
console.log(dcaStrategy.defaultParams); // { buyAmount: 100, ... }
```

### Create Bot with Hook
```typescript
function BotCreationForm() {
  const { formData, updateFormData, nextStep } = useBotCreation({
    mode: 'template',
  });

  const handleStrategySelect = (strategyId: string) => {
    const strategy = getStrategyById(strategyId);
    updateFormData({
      strategyId,
      strategyType: strategy.type,
      strategyParams: strategy.defaultParams,
    });
    nextStep();
  };

  return (
    <div>
      {/* Your form UI */}
    </div>
  );
}
```

### Format Values
```typescript
import { formatCurrency, formatPercentage } from '@/lib/utils/bot-helpers';

formatCurrency(1500);        // "$1,500.00"
formatPercentage(15.5);      // "+15.50%"
formatCompactNumber(1500000); // "1.5M"
```

### Validate Inputs
```typescript
import { validateBotName, validateCapital } from '@/lib/utils/bot-helpers';

const nameError = validateBotName('My Bot');
if (nameError) {
  console.log(nameError); // null if valid
}

const capitalError = validateCapital(1500, 1000); // amount, minRequired
if (capitalError) {
  console.log(capitalError); // null if valid
}
```

### Get Risk Colors
```typescript
import { getRiskLevelColor, getRiskLevelBgColor } from '@/lib/utils/bot-helpers';

<span className={getRiskLevelColor('medium')}>
  Medium Risk
</span>

<div className={getRiskLevelBgColor('high')}>
  High Risk
</div>
```

## 📍 Routes

- `/bots/create` - Mode selection
- `/bots/create/simple` - AI-guided mode
- `/bots/create/pro` - Pro mode

## 📚 Key Files

| File | Purpose |
|------|---------|
| `/types/bot.ts` | TypeScript definitions |
| `/lib/mock-data/strategies.ts` | Strategy templates |
| `/lib/mock-data/ai-responses.ts` | AI conversation flow |
| `/lib/mock-data/backtest-data.ts` | Backtest results |
| `/hooks/useBotCreation.ts` | State management |
| `/lib/utils/bot-helpers.ts` | Helper functions |

## 🎨 Component Examples

### Strategy Card
```typescript
import { strategies } from '@/lib/mock-data';
import { getRiskLevelColor } from '@/lib/utils/bot-helpers';

{strategies.map(strategy => (
  <div key={strategy.id}>
    <div>{strategy.icon}</div>
    <h3>{strategy.name}</h3>
    <p>{strategy.description}</p>
    <span className={getRiskLevelColor(strategy.risk)}>
      {strategy.risk.toUpperCase()}
    </span>
  </div>
))}
```

### Risk Settings Form
```typescript
const { formData, updateFormData, validationErrors } = useBotCreation({
  mode: 'template',
});

<input
  type="number"
  value={formData.stopLossPercentage || ''}
  onChange={(e) => updateFormData({ stopLossPercentage: Number(e.target.value) })}
/>

{validationErrors.find(e => e.field === 'stopLossPercentage')?.message}
```

### Step Navigation
```typescript
const { currentStep, steps, nextStep, prevStep } = useBotCreation({
  mode: 'template',
});

<div>
  {steps.map(step => (
    <div key={step.id} className={step.isActive ? 'active' : ''}>
      {step.title}
    </div>
  ))}
</div>

<button onClick={prevStep}>Previous</button>
<button onClick={nextStep}>Next</button>
```

## 🔧 Development Workflow

1. **Use Mock Data** - All templates, AI responses, backtests ready
2. **Build Components** - Use shadcn agent for UI components
3. **Connect Hooks** - Wire up useBotCreation for state
4. **Add Validation** - Use validation utilities from bot-helpers
5. **Test with Mock Data** - Everything works without backend
6. **Connect Backend** - Swap mock data for real API calls

## 📖 Documentation

Full documentation available at:
- `BOT_CREATION_FOUNDATION.md` - Complete guide
- `/app/bots/create/README.md` - Route-specific docs
- Inline JSDoc comments in all files

---

**Status:** Foundation Complete ✅
**Updated:** 2025-11-13
**Phase:** Phase 2 - Bot Management & AI Creation

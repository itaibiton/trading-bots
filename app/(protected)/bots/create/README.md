# Bot Creation Flow - Foundation

This directory contains the bot creation flow with three different modes: Template, AI-Guided (Simple), and Pro.

## 🏗️ Structure

```
/app/bots/create/
├── page.tsx           # Mode selection screen
├── simple/
│   └── page.tsx      # AI-guided mode (conversational)
└── pro/
    └── page.tsx      # Pro mode (advanced configuration)
```

## 📦 Supporting Files

### Types
- **`/types/bot.ts`** - Complete TypeScript definitions for:
  - Bot configuration
  - Strategy templates
  - Risk settings
  - AI conversations
  - Backtest results
  - Form validation

### Mock Data
- **`/lib/mock-data/strategies.ts`** - 4 strategy templates:
  - DCA (Dollar Cost Averaging)
  - Grid Trading
  - Momentum Trading
  - Mean Reversion
- **`/lib/mock-data/ai-responses.ts`** - 5-step AI conversation flow
- **`/lib/mock-data/backtest-data.ts`** - Mock backtesting results with equity curves
- **`/lib/mock-data/index.ts`** - Centralized exports

### Hooks
- **`/hooks/useBotCreation.ts`** - State management for bot creation:
  - Form data management
  - Step navigation
  - Validation
  - Mode-specific logic

### Utilities
- **`/lib/utils/bot-helpers.ts`** - Helper functions:
  - Formatting (currency, percentages, numbers)
  - Color utilities for risk/status
  - Validation functions
  - Sorting and filtering
  - Statistics calculations

## 🎯 Current Status

### ✅ Completed
- [x] Project structure created
- [x] TypeScript types defined (comprehensive)
- [x] Mock data created (strategies, AI flow, backtests)
- [x] State management hooks implemented
- [x] Utility functions written
- [x] Placeholder pages created
- [x] Dependencies installed (framer-motion, react-confetti, recharts)

### 🚧 Next Steps
1. **Mode Selection Page** - Build interactive mode cards with routing
2. **Template Mode** - Strategy selector, config forms, risk questionnaire
3. **Simple Mode (AI)** - Chat interface, conversation flow, AI integration
4. **Pro Mode** - Advanced forms, backtesting UI, live preview
5. **Shared Components** - Bot preview card, risk slider, strategy card
6. **API Integration** - Connect to Supabase, implement CRUD operations

## 📋 Strategy Templates

### DCA (Dollar Cost Averaging)
- **Risk:** Low
- **Expected Return:** 15% annually
- **Best For:** Passive income, beginners
- **Complexity:** Beginner

### Grid Trading
- **Risk:** Medium
- **Expected Return:** 25% annually
- **Best For:** Sideways markets, volatility
- **Complexity:** Intermediate

### Momentum Trading
- **Risk:** High
- **Expected Return:** 40% annually
- **Best For:** Trend following, aggressive growth
- **Complexity:** Advanced

### Mean Reversion
- **Risk:** Medium
- **Expected Return:** 30% annually
- **Best For:** Range-bound markets, corrections
- **Complexity:** Intermediate

## 🤖 AI Conversation Flow

1. **Welcome & Goal Discovery** - What do you want to achieve?
2. **Risk Tolerance** - How much risk are you comfortable with?
3. **Capital Amount** - How much capital to allocate?
4. **Strategy Recommendation** - AI suggests best strategy
5. **Final Configuration** - Review and create

## 🔧 Usage

### Using the Bot Creation Hook

```typescript
import { useBotCreation } from '@/hooks/useBotCreation';

function MyComponent() {
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
    mode: 'template',
    onComplete: (data) => {
      console.log('Bot created:', data);
    },
  });

  // Use the hook...
}
```

### Accessing Mock Data

```typescript
import {
  strategies,
  getStrategyById,
  conversationFlow,
  dcaBacktestResult,
} from '@/lib/mock-data';

// Get all strategies
const allStrategies = strategies;

// Get specific strategy
const dcaStrategy = getStrategyById('dca-001');

// Get conversation messages
const welcomeMessage = conversationFlow.step1.message;

// Get backtest data
const backtestData = dcaBacktestResult;
```

### Using Utility Functions

```typescript
import {
  formatCurrency,
  formatPercentage,
  getRiskLevelColor,
  validateBotName,
} from '@/lib/utils/bot-helpers';

// Format values
formatCurrency(1500); // "$1,500.00"
formatPercentage(15.5); // "+15.50%"

// Get colors
getRiskLevelColor('medium'); // "text-orange-600 dark:text-orange-400"

// Validate
const error = validateBotName('My Bot'); // null (valid)
```

## 🎨 Design Patterns

### Form Validation
- Real-time validation as user types
- Clear error messages
- Field-specific validation
- Step-by-step validation

### State Management
- Centralized form state in hook
- Step progress tracking
- Validation state management
- Easy reset and navigation

### Mock Data
- Realistic strategy parameters
- Complete AI conversation scripts
- Authentic backtest results
- Reusable across components

## 📝 Notes

- All bots default to **paper trading** mode for safety
- Risk controls are **mandatory** - no bots without stop-loss
- Strategy templates include **safe defaults**
- AI recommendations prioritize **user safety**
- Forms include **comprehensive validation**
- Mobile-responsive design throughout

## 🔗 Related Files

- `/docs/PRD.md` - Product requirements for bot creation
- `/progress/phase2-plan.md` - Detailed implementation plan
- `/tests/TEST_PLAN.md` - Testing requirements
- `/ROADMAP.md` - Task tracker for bot creation features

---

**Foundation Status:** ✅ Complete and ready for component development
**Last Updated:** 2025-11-13

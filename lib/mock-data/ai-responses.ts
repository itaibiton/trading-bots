/**
 * Mock AI Conversation Flow
 * Simulates the AI-guided bot creation conversation
 */

import { AIMessage, QuickReply } from '@/types/bot';

/**
 * Conversation Flow Steps
 */
export const conversationFlow = {
  // Step 1: Welcome & Goal Discovery
  step1: {
    message: `Hey! I'm your AI trading assistant. I'll help you create a custom trading bot in just a few minutes.

First, let me understand your goals. What are you looking to achieve with automated trading?`,
    quickReplies: [
      {
        id: 'goal-1',
        label: 'Steady passive income',
        value: 'passive_income',
      },
      {
        id: 'goal-2',
        label: 'Grow my portfolio',
        value: 'growth',
      },
      {
        id: 'goal-3',
        label: 'Profit from volatility',
        value: 'volatility',
      },
      {
        id: 'goal-4',
        label: 'Just learning to trade',
        value: 'learning',
      },
    ] as QuickReply[],
  },

  // Step 2: Risk Tolerance
  step2: {
    passive_income: {
      message: `Great choice! Building passive income through trading is all about consistency and managing risk.

How would you describe your risk tolerance?`,
      quickReplies: [
        {
          id: 'risk-1',
          label: 'Conservative (low risk)',
          value: 'low',
        },
        {
          id: 'risk-2',
          label: 'Balanced (medium risk)',
          value: 'medium',
        },
        {
          id: 'risk-3',
          label: 'Aggressive (high risk)',
          value: 'high',
        },
      ] as QuickReply[],
    },
    growth: {
      message: `Perfect! Growing your portfolio requires a balance between opportunity and protection.

How much risk are you comfortable taking?`,
      quickReplies: [
        {
          id: 'risk-1',
          label: 'Conservative (low risk)',
          value: 'low',
        },
        {
          id: 'risk-2',
          label: 'Balanced (medium risk)',
          value: 'medium',
        },
        {
          id: 'risk-3',
          label: 'Aggressive (high risk)',
          value: 'high',
        },
      ] as QuickReply[],
    },
    volatility: {
      message: `Exciting! Volatility trading can be very profitable but requires careful risk management.

What's your risk appetite?`,
      quickReplies: [
        {
          id: 'risk-2',
          label: 'Balanced (medium risk)',
          value: 'medium',
        },
        {
          id: 'risk-3',
          label: 'Aggressive (high risk)',
          value: 'high',
        },
      ] as QuickReply[],
    },
    learning: {
      message: `Welcome! Starting with automated trading is a smart way to learn. We'll set up something safe and educational.

Since you're learning, I'd recommend starting with lower risk. Sound good?`,
      quickReplies: [
        {
          id: 'risk-1',
          label: 'Yes, low risk please',
          value: 'low',
        },
        {
          id: 'risk-2',
          label: 'I want medium risk',
          value: 'medium',
        },
      ] as QuickReply[],
    },
  },

  // Step 3: Capital Amount
  step3: {
    message: `How much capital would you like to allocate to this bot?

Remember, this will be in paper trading mode first, so you can test it with virtual money before risking real funds.`,
    quickReplies: [
      {
        id: 'capital-1',
        label: '$100',
        value: '100',
      },
      {
        id: 'capital-2',
        label: '$500',
        value: '500',
      },
      {
        id: 'capital-3',
        label: '$1,000',
        value: '1000',
      },
      {
        id: 'capital-4',
        label: '$2,500',
        value: '2500',
      },
      {
        id: 'capital-5',
        label: '$5,000',
        value: '5000',
      },
      {
        id: 'capital-6',
        label: 'Custom amount',
        value: 'custom',
      },
    ] as QuickReply[],
  },

  // Step 4: Strategy Recommendation
  step4: {
    low_passive: {
      message: `Based on your goals (passive income) and risk tolerance (low), I recommend the **DCA (Dollar Cost Averaging)** strategy.

**Why DCA?**
• Extremely low risk - just buys at regular intervals
• Reduces impact of volatility
• Great for long-term accumulation
• Expected return: ~15% annually
• Max drawdown: ~5%

**How it works:**
Your bot will automatically buy a fixed amount of crypto at regular intervals (e.g., $100 every day). This averages out your buy price over time and removes emotional decision-making.

Would you like to proceed with DCA, or explore other options?`,
      quickReplies: [
        {
          id: 'strategy-dca',
          label: 'Yes, use DCA',
          value: 'dca',
        },
        {
          id: 'strategy-other',
          label: 'Show other strategies',
          value: 'other',
        },
      ] as QuickReply[],
    },
    low_growth: {
      message: `Based on your goals (portfolio growth) and risk tolerance (low), I recommend starting with **DCA (Dollar Cost Averaging)**.

**Why DCA?**
• Safe, steady growth strategy
• Perfect for beginners
• Expected return: ~15% annually
• Max drawdown: ~5%

You can always create more aggressive bots later once you're comfortable!

Sound good?`,
      quickReplies: [
        {
          id: 'strategy-dca',
          label: 'Yes, use DCA',
          value: 'dca',
        },
        {
          id: 'strategy-meanrev',
          label: 'Try Mean Reversion (medium risk)',
          value: 'mean-reversion',
        },
      ] as QuickReply[],
    },
    medium_passive: {
      message: `Based on your goals (passive income) and risk tolerance (medium), I recommend **Mean Reversion**.

**Why Mean Reversion?**
• Buys dips and sells peaks
• Profits from price corrections
• Expected return: ~30% annually
• Max drawdown: ~18%
• Win rate: ~68%

**How it works:**
Your bot monitors price deviations from the moving average. When the price drops below the average, it buys. When it rises above, it sells. This captures natural market oscillations.

Ready to set this up?`,
      quickReplies: [
        {
          id: 'strategy-meanrev',
          label: 'Yes, use Mean Reversion',
          value: 'mean-reversion',
        },
        {
          id: 'strategy-grid',
          label: 'Try Grid Trading instead',
          value: 'grid',
        },
      ] as QuickReply[],
    },
    medium_growth: {
      message: `Based on your goals (growth) and risk tolerance (medium), I recommend **Grid Trading**.

**Why Grid Trading?**
• Profits from price swings
• Works great in sideways markets
• Expected return: ~25% annually
• Max drawdown: ~15%
• Win rate: ~70%

**How it works:**
Your bot places multiple buy and sell orders at different price levels (a "grid"). As the price moves, it automatically buys low and sells high between the grid levels.

Interested in this strategy?`,
      quickReplies: [
        {
          id: 'strategy-grid',
          label: 'Yes, use Grid Trading',
          value: 'grid',
        },
        {
          id: 'strategy-meanrev',
          label: 'Try Mean Reversion instead',
          value: 'mean-reversion',
        },
      ] as QuickReply[],
    },
    high_volatility: {
      message: `Based on your goals (profit from volatility) and risk tolerance (high), I recommend **Momentum Trading**.

**Why Momentum?**
• Captures strong price trends
• Highest profit potential
• Expected return: ~40% annually
• Max drawdown: ~25%
• Uses RSI and MACD indicators

**How it works:**
Your bot identifies strong price movements using technical indicators (RSI, MACD) and rides the momentum. It buys when momentum is strong upward, sells when it weakens.

⚠️ **Note:** Higher returns come with higher risk. Make sure you're comfortable with potential drawdowns.

Ready for this?`,
      quickReplies: [
        {
          id: 'strategy-momentum',
          label: 'Yes, use Momentum',
          value: 'momentum',
        },
        {
          id: 'strategy-grid',
          label: 'Try Grid Trading (medium risk)',
          value: 'grid',
        },
      ] as QuickReply[],
    },
    high_growth: {
      message: `Based on your goals (growth) and risk tolerance (high), I recommend **Momentum Trading**.

**Why Momentum?**
• Highest growth potential
• Captures major price moves
• Expected return: ~40% annually
• Active strategy for aggressive traders

**How it works:**
Your bot uses RSI and MACD indicators to identify strong trends and rides the momentum for maximum gains.

⚠️ **Important:** This strategy can have larger drawdowns (~25%). Make sure your risk management is solid.

Proceed with Momentum?`,
      quickReplies: [
        {
          id: 'strategy-momentum',
          label: 'Yes, use Momentum',
          value: 'momentum',
        },
        {
          id: 'strategy-meanrev',
          label: 'Try Mean Reversion (medium risk)',
          value: 'mean-reversion',
        },
      ] as QuickReply[],
    },
  },

  // Step 5: Final Configuration
  step5: {
    message: `Perfect! Let me set up your bot with safe defaults.

**Your Bot Configuration:**
• Strategy: {strategyName}
• Trading Pair: BTC/USDT
• Capital: ${'{capital}'}
• Risk Level: {risk}
• Stop Loss: {stopLoss}%
• Take Profit: {takeProfit}%
• Max Daily Loss: ${'{maxDailyLoss}'}
• Trading Mode: Paper (virtual money)

I've configured everything with safety first. You can adjust these settings on the next screen if you'd like.

Ready to create your bot?`,
    quickReplies: [
      {
        id: 'create-yes',
        label: 'Yes, create my bot!',
        value: 'create',
      },
      {
        id: 'create-adjust',
        label: 'Let me adjust settings first',
        value: 'adjust',
      },
    ] as QuickReply[],
  },
};

/**
 * Generate AI response based on conversation state
 */
export function generateAIResponse(
  step: number,
  userGoal?: string,
  riskTolerance?: string
): AIMessage {
  const timestamp = new Date().toISOString();

  if (step === 1) {
    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: conversationFlow.step1.message,
      timestamp,
      quickReplies: conversationFlow.step1.quickReplies,
    };
  }

  if (step === 2 && userGoal) {
    const goalKey = userGoal as keyof typeof conversationFlow.step2;
    const stepData = conversationFlow.step2[goalKey];

    if (stepData) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: stepData.message,
        timestamp,
        quickReplies: stepData.quickReplies,
      };
    }
  }

  if (step === 3) {
    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: conversationFlow.step3.message,
      timestamp,
      quickReplies: conversationFlow.step3.quickReplies,
    };
  }

  if (step === 4 && riskTolerance && userGoal) {
    // Determine recommendation key based on goal and risk
    let key: keyof typeof conversationFlow.step4 = 'low_passive';

    if (riskTolerance === 'low' && userGoal === 'passive_income') key = 'low_passive';
    else if (riskTolerance === 'low' && userGoal === 'growth') key = 'low_growth';
    else if (riskTolerance === 'medium' && userGoal === 'passive_income') key = 'medium_passive';
    else if (riskTolerance === 'medium' && userGoal === 'growth') key = 'medium_growth';
    else if (riskTolerance === 'high' && userGoal === 'volatility') key = 'high_volatility';
    else if (riskTolerance === 'high' && userGoal === 'growth') key = 'high_growth';

    const stepData = conversationFlow.step4[key];

    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: stepData.message,
      timestamp,
      quickReplies: stepData.quickReplies,
    };
  }

  // Fallback
  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content: 'I can help you set up your trading bot. What would you like to do?',
    timestamp,
  };
}

/**
 * Strategy to risk level mapping
 */
export const strategyRiskMapping = {
  dca: 'low',
  'mean-reversion': 'medium',
  grid: 'medium',
  momentum: 'high',
} as const;

/**
 * Default risk settings by risk level
 */
export const defaultRiskSettings = {
  low: {
    stopLoss: 5,
    takeProfit: 10,
    maxDailyLoss: 50,
    maxPositionSize: 20,
  },
  medium: {
    stopLoss: 10,
    takeProfit: 20,
    maxDailyLoss: 100,
    maxPositionSize: 30,
  },
  high: {
    stopLoss: 15,
    takeProfit: 30,
    maxDailyLoss: 200,
    maxPositionSize: 50,
  },
};

/**
 * AI Prompts for Bot Creation Conversation
 *
 * This file contains all the system prompts and question templates
 * for the AI-guided bot creation flow.
 */

import type { ConversationState } from '@/types/bot';

/**
 * Build the system prompt based on conversation state
 */
export function buildSystemPrompt(state: Partial<ConversationState>): string {
  const { currentStep = 1, experienceLevel, tradingGoal, config } = state;

  return `You are an expert cryptocurrency trading assistant helping users create trading bots through conversation.

## Your Role
- Guide users through a 5-step conversation to configure a trading bot
- Be friendly, educational, and encouraging
- Use simple language, avoid jargon unless necessary
- Provide 2-4 quick reply options when appropriate
- Keep responses under 100 words unless explaining a concept
- Focus on safety and education

## Current Context
- Step: ${currentStep}/5
- Experience Level: ${experienceLevel || 'Unknown'}
- Trading Goal: ${tradingGoal || 'Unknown'}
- Capital: ${config?.capitalAllocated ? `$${config.capitalAllocated}` : 'Unknown'}

## Safety Rules (MUST FOLLOW)
1. Beginners (new traders):
   - Maximum 5% stop-loss
   - Force paper trading mode
   - Recommend conservative strategies (DCA)

2. Intermediate traders:
   - Maximum 10% stop-loss
   - Suggest paper trading first
   - Can use moderately risky strategies

3. Advanced traders:
   - Maximum 20% stop-loss
   - Allow live trading with warnings
   - Can use any strategy

4. General Rules:
   - Never suggest leverage > 3x
   - Always validate capital against strategy minimums
   - Take-profit must be higher than stop-loss
   - Daily loss limit should be max 10% of capital

## Response Format
Respond with a JSON object:
{
  "message": "Your conversational response to the user",
  "quickReplies": ["Option 1", "Option 2", "Option 3"] or null,
  "configUpdate": { "key": "value" } or null,
  "validation": {
    "type": "info|warning|error",
    "message": "Validation message",
    "allowProceed": true|false
  } or null,
  "nextStep": number or null
}

## Important
- Extract structured data from user responses
- Update config when user provides relevant information
- Show warnings for risky configurations
- Be encouraging and supportive
- Explain WHY you're asking each question`;
}

/**
 * Question templates for each conversation step
 */
export const QUESTION_TEMPLATES = {
  1: {
    title: "Goal Discovery",
    question: `Hi! I'm your trading assistant. I'll help you create a trading bot tailored to your goals in just a few minutes.

Let's start simple: What are you hoping to achieve with this bot?`,
    quickReplies: [
      "Build wealth over time",
      "Profit from market volatility",
      "Catch trending moves",
      "I'm not sure yet"
    ],
    extractionPrompt: `Based on the user's answer, determine:
1. Their trading goal (long-term growth, short-term profits, passive income, etc.)
2. Their experience level (if mentioned)
3. Suggested strategy preference (DCA for long-term, Grid for volatility, Momentum for trends)

Update the config with:
- tradingGoal: string
- experienceLevel: 'beginner'|'intermediate'|'advanced' (if determinable)
- Suggest appropriate strategy`
  },

  2: {
    title: "Capital Discussion",
    question: (experienceLevel?: string) => `Great! Now, how much capital do you want to allocate to this bot?

This is the maximum amount the bot can use for trading. ${
      experienceLevel === 'beginner'
        ? 'I recommend starting with paper trading (virtual money) to practice risk-free first!'
        : 'You can always adjust this later.'
    }`,
    quickReplies: (capital?: number) => {
      if (!capital || capital < 500) {
        return ["$100 - $500", "$500 - $2,000", "Custom amount"];
      } else if (capital < 2000) {
        return ["$500 - $2,000", "$2,000 - $5,000", "Custom amount"];
      } else {
        return ["$2,000 - $5,000", "$5,000 - $10,000", "Custom amount"];
      }
    },
    extractionPrompt: `Extract the capital amount from the user's response.

Validation:
- Minimum: $10
- DCA minimum: $100 recommended
- Grid Trading minimum: $500 recommended
- Momentum/Mean Reversion minimum: $500 recommended

If below recommended, show a warning but allow to proceed.
If user is beginner and capital > $1000, strongly suggest paper trading first.

Update config with:
- capitalAllocated: number
- tradingMode: 'paper' (if beginner) or ask user preference`
  },

  3: {
    title: "Risk Tolerance",
    question: `Now let's talk about risk management - the most important part!

How comfortable are you with the possibility of losses while your bot is trading?`,
    quickReplies: [
      "Very cautious - Protect my capital",
      "Balanced - Some risk is okay",
      "Aggressive - Higher risk for higher returns"
    ],
    extractionPrompt: `Based on user's risk tolerance, set appropriate parameters:

LOW RISK (Cautious):
- stopLossPercentage: 3
- takeProfitPercentage: 5
- maxDailyLoss: capitalAllocated * 0.02
- maxPositionSize: 25
- riskLevel: 'low'

MEDIUM RISK (Balanced):
- stopLossPercentage: 5
- takeProfitPercentage: 10
- maxDailyLoss: capitalAllocated * 0.05
- maxPositionSize: 50
- riskLevel: 'medium'

HIGH RISK (Aggressive):
- stopLossPercentage: 8 (max for beginners is 5!)
- takeProfitPercentage: 15
- maxDailyLoss: capitalAllocated * 0.10
- maxPositionSize: 75
- riskLevel: 'high'

IMPORTANT: Override aggressive settings for beginners!
If beginner selects aggressive, use medium settings and explain why.`
  },

  4: {
    title: "Strategy Recommendation",
    question: (goal?: string, risk?: string, capital?: number) => {
      // This will be dynamically generated based on user profile
      return `Based on our conversation, I have the perfect strategy for you!`;
    },
    extractionPrompt: `Recommend ONE strategy based on the user profile:

DOLLAR COST AVERAGING (DCA):
- Best for: Long-term wealth building, beginners, hands-off investing
- Risk: Low to Medium
- Min Capital: $100
- Parameters to set:
  - strategyType: 'dca'
  - strategyParams.buyInterval: 24 (hours) - can be 1h, 4h, 12h, 24h, 168h
  - strategyParams.buyAmount: calculate based on capital (5-10% recommended)
  - strategyParams.maxBuys: 0 (unlimited) or specific number
  - tradingPair: 'BTC/USDT'

GRID TRADING:
- Best for: Profiting from volatility, range-bound markets
- Risk: Medium
- Min Capital: $500
- Parameters to set:
  - strategyType: 'grid'
  - strategyParams.gridLevels: 10-20
  - strategyParams.lowerPrice: auto-calculate (current price - 10%)
  - strategyParams.upperPrice: auto-calculate (current price + 10%)
  - strategyParams.investmentPerGrid: capitalAllocated / gridLevels
  - tradingPair: 'BTC/USDT'

MOMENTUM TRADING:
- Best for: Experienced traders, catching trends
- Risk: Medium to High
- Min Capital: $500
- Parameters to set:
  - strategyType: 'momentum'
  - strategyParams.rsiPeriod: 14
  - strategyParams.rsiBuyThreshold: 30
  - strategyParams.rsiSellThreshold: 70
  - tradingPair: 'BTC/USDT'

MEAN REVERSION:
- Best for: Intermediate traders, sideways markets
- Risk: Medium
- Min Capital: $300
- Parameters to set:
  - strategyType: 'mean-reversion'
  - strategyParams.maPeriod: 20
  - strategyParams.stdDevMultiplier: 2
  - tradingPair: 'BTC/USDT'

Present the recommendation with:
1. Strategy name and description
2. Why it fits their profile
3. Expected performance (return, drawdown, win rate)
4. The specific parameters you're setting`
  },

  5: {
    title: "Final Preview",
    question: (config: any) => {
      return `Excellent! Here's your complete bot configuration. Review it and we can deploy when you're ready!`;
    },
    extractionPrompt: `This is the final step. Generate a comprehensive summary of the bot configuration.

Include:
1. Bot name (auto-generate if not provided): "[STRATEGY] [PAIR] Bot"
2. Strategy type and parameters
3. Capital allocation
4. Risk controls (stop-loss, take-profit, daily loss limit)
5. Trading mode (paper vs live)
6. Expected performance

Ask user to confirm or make edits.
If confirmed, set isComplete: true and prepare for deployment.`
  }
};

/**
 * Safety validation prompts
 */
export const SAFETY_VALIDATIONS = {
  beginnerHighRisk: {
    type: 'warning' as const,
    message: `I notice you're new to trading but chose aggressive risk settings.

I'd suggest starting with "Balanced" risk instead. Here's why:

✅ Balanced Risk gives you:
• Good profit potential (10% take-profit)
• Strong protection (5% stop-loss)
• Room to learn and adjust

You can always increase risk later once you're comfortable. Sound good?`,
    allowProceed: true,
    suggestedAction: 'Use Balanced risk settings'
  },

  capitalBelowMinimum: (strategy: string, minCapital: number) => ({
    type: 'error' as const,
    message: `For ${strategy}, the minimum capital is $${minCapital}.

This ensures the bot can operate effectively and cover trading fees.

Would you like to:
• Increase to $${minCapital} (minimum)
• Try a different strategy (DCA works with less)
• Start with paper trading to practice`,
    allowProceed: false
  }),

  highCapitalBeginner: (amount: number) => ({
    type: 'warning' as const,
    message: `That's a significant amount ($${amount})! Let me make sure we set this up safely.

I strongly recommend:
✅ Starting with paper trading first
✅ Conservative risk settings
✅ Monitoring closely the first few days

Sound good?`,
    allowProceed: true,
    suggestedAction: 'Start with paper trading'
  }),

  takeProfitTooLow: (takeProfit: number, stopLoss: number) => ({
    type: 'error' as const,
    message: `Your take-profit (${takeProfit}%) is lower than your stop-loss (${stopLoss}%).

This means you'd lose more when wrong than you'd gain when right.

I recommend:
• Take-profit should be at least 1.5x your stop-loss
• For ${stopLoss}% stop-loss, try ${stopLoss * 1.5}% take-profit`,
    allowProceed: false
  })
};

/**
 * Build extraction prompt for current step
 */
export function buildExtractionPrompt(step: number, userMessage: string, state: Partial<ConversationState>): string {
  const template = QUESTION_TEMPLATES[step as keyof typeof QUESTION_TEMPLATES];

  if (!template) {
    return 'Invalid step';
  }

  return `${template.extractionPrompt}

User's response: "${userMessage}"

Current state:
${JSON.stringify(state, null, 2)}

Extract relevant information and update the config appropriately.
Validate according to safety rules.
Provide the next question or summary.`;
}

/**
 * Example responses for few-shot learning
 */
export const EXAMPLE_RESPONSES = [
  {
    user: "I want to build long-term wealth",
    assistant: {
      message: "Great! Building long-term wealth is a smart goal. That suggests a strategy focused on consistent accumulation rather than timing the market.\n\n✨ I'm already thinking DCA (Dollar Cost Averaging) could be perfect for you.\n\nNext: How much capital do you want to allocate to this bot?",
      quickReplies: ["$100 - $500", "$500 - $2,000", "Custom amount"],
      configUpdate: {
        tradingGoal: "long-term wealth building",
        experienceLevel: "beginner"
      },
      nextStep: 2
    }
  },
  {
    user: "$1000",
    assistant: {
      message: "$1,000 is a solid amount to start with!\n\n💡 For paper trading, you'll get $10,000 virtual USDT to practice with the full strategy.\n\nNext: How comfortable are you with the possibility of losses?",
      quickReplies: [
        "Very cautious - Protect my capital",
        "Balanced - Some risk is okay",
        "Aggressive - Higher risk for higher returns"
      ],
      configUpdate: {
        capitalAllocated: 1000,
        tradingMode: "paper"
      },
      nextStep: 3
    }
  }
];

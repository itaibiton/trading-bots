/**
 * Question Tree for AI Bot Creation Conversation
 *
 * This file contains the conversation flow logic, question generation,
 * and config extraction rules for each step.
 */

export interface QuestionStep {
  step: number;
  title: string;
  generateQuestion: (state: any) => string;
  generateQuickReplies: (state: any) => string[] | null;
  extractConfig: (userMessage: string, state: any) => any;
  validate: (config: any, state: any) => ValidationResult | null;
}

export interface ValidationResult {
  type: 'info' | 'warning' | 'error';
  message: string;
  allowProceed: boolean;
  suggestedValue?: any;
}

/**
 * Step 1: Goal Discovery
 */
export const STEP_1: QuestionStep = {
  step: 1,
  title: "Goal Discovery",

  generateQuestion: () => {
    return `Hi! I'm your trading assistant. I'll help you create a trading bot tailored to your goals in just a few minutes.

Let's start simple: What are you hoping to achieve with this bot?`;
  },

  generateQuickReplies: () => [
    "Build wealth over time",
    "Profit from market volatility",
    "Catch trending moves",
    "I'm not sure yet"
  ],

  extractConfig: (userMessage: string) => {
    const lower = userMessage.toLowerCase();
    const config: any = {};

    // Extract trading goal
    config.tradingGoal = userMessage;

    // Infer experience level
    if (lower.includes('new') || lower.includes('first time') || lower.includes('beginner')) {
      config.experienceLevel = 'beginner';
    } else if (lower.includes('experienced') || lower.includes('advanced') || lower.includes('pro')) {
      config.experienceLevel = 'advanced';
    } else if (lower.includes('some experience') || lower.includes('intermediate')) {
      config.experienceLevel = 'intermediate';
    }

    // Suggest strategy based on goal
    if (lower.includes('long') || lower.includes('wealth') || lower.includes('save') || userMessage === 'Build wealth over time') {
      // Suggest DCA for long-term
      config._suggestedStrategy = 'dca';
    } else if (lower.includes('volatility') || lower.includes('range') || userMessage === 'Profit from market volatility') {
      // Suggest Grid for volatility
      config._suggestedStrategy = 'grid';
    } else if (lower.includes('trend') || lower.includes('momentum') || userMessage === 'Catch trending moves') {
      // Suggest Momentum for trends
      config._suggestedStrategy = 'momentum';
    }

    return config;
  },

  validate: () => null // No validation needed for step 1
};

/**
 * Step 2: Capital Discussion
 */
export const STEP_2: QuestionStep = {
  step: 2,
  title: "Capital Discussion",

  generateQuestion: (state: any) => {
    const isBeginner = state.experienceLevel === 'beginner';

    return `Great! Now, how much capital do you want to allocate to this bot?

This is the maximum amount the bot can use for trading. ${
      isBeginner
        ? "I recommend starting with paper trading (virtual money) to practice risk-free first!"
        : "You can always adjust this later."
    }`;
  },

  generateQuickReplies: () => [
    "$100 - $500",
    "$500 - $2,000",
    "$2,000 - $5,000",
    "Custom amount"
  ],

  extractConfig: (userMessage: string, state: any) => {
    const config: any = {};

    // Extract capital amount
    const match = userMessage.match(/\$?(\d{1,3}(?:,\d{3})*|\d+)/);
    if (match) {
      config.capitalAllocated = parseInt(match[1].replace(/,/g, ''), 10);
    } else if (userMessage === "$100 - $500") {
      config.capitalAllocated = 300;
    } else if (userMessage === "$500 - $2,000") {
      config.capitalAllocated = 1000;
    } else if (userMessage === "$2,000 - $5,000") {
      config.capitalAllocated = 3000;
    }

    // Set trading mode for beginners
    if (state.experienceLevel === 'beginner') {
      config.tradingMode = 'paper';
    }

    return config;
  },

  validate: (config: any, state: any) => {
    const capital = config.capitalAllocated;
    const suggestedStrategy = state._suggestedStrategy;

    if (!capital || capital < 10) {
      return {
        type: 'error',
        message: 'Minimum capital is $10 to cover trading fees effectively.',
        allowProceed: false,
        suggestedValue: 100
      };
    }

    // Check against strategy minimums
    const minimums: Record<string, number> = {
      dca: 100,
      grid: 500,
      momentum: 500,
      'mean-reversion': 300
    };

    const minCapital = minimums[suggestedStrategy] || 100;

    if (capital < minCapital) {
      return {
        type: 'warning',
        message: `For ${suggestedStrategy.toUpperCase()}, I recommend at least $${minCapital}. With $${capital}, the bot will work but may have higher fee impact.`,
        allowProceed: true
      };
    }

    // Warn beginners about high capital
    if (state.experienceLevel === 'beginner' && capital > 1000) {
      return {
        type: 'warning',
        message: `That's a significant amount! I strongly recommend starting with paper trading first to practice risk-free.`,
        allowProceed: true
      };
    }

    return null;
  }
};

/**
 * Step 3: Risk Tolerance
 */
export const STEP_3: QuestionStep = {
  step: 3,
  title: "Risk Tolerance",

  generateQuestion: () => {
    return `Now let's talk about risk management - the most important part!

How comfortable are you with the possibility of losses while your bot is trading?`;
  },

  generateQuickReplies: () => [
    "Very cautious - Protect my capital",
    "Balanced - Some risk is okay",
    "Aggressive - Higher risk for higher returns"
  ],

  extractConfig: (userMessage: string, state: any) => {
    const lower = userMessage.toLowerCase();
    const capital = state.capitalAllocated || 1000;
    const isBeginner = state.experienceLevel === 'beginner';
    const config: any = {};

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';

    if (lower.includes('cautious') || lower.includes('protect') || lower.includes('conservative') || userMessage.includes('Very cautious')) {
      riskLevel = 'low';
    } else if (lower.includes('balanced') || lower.includes('moderate') || userMessage.includes('Balanced')) {
      riskLevel = 'medium';
    } else if (lower.includes('aggressive') || lower.includes('high risk') || userMessage.includes('Aggressive')) {
      riskLevel = 'high';
      // Override for beginners
      if (isBeginner) {
        riskLevel = 'medium';
      }
    }

    config.riskLevel = riskLevel;

    // Set risk parameters based on risk level
    const riskProfiles = {
      low: {
        stopLossPercentage: 3,
        takeProfitPercentage: 5,
        maxDailyLoss: capital * 0.02,
        maxPositionSize: 25
      },
      medium: {
        stopLossPercentage: 5,
        takeProfitPercentage: 10,
        maxDailyLoss: capital * 0.05,
        maxPositionSize: 50
      },
      high: {
        stopLossPercentage: 8,
        takeProfitPercentage: 15,
        maxDailyLoss: capital * 0.10,
        maxPositionSize: 75
      }
    };

    Object.assign(config, riskProfiles[riskLevel]);

    // Always set trading pair
    config.tradingPair = 'BTC/USDT';

    return config;
  },

  validate: (config: any, state: any) => {
    const userSelectedAggressive = config.riskLevel === 'high';
    const isBeginner = state.experienceLevel === 'beginner';

    if (userSelectedAggressive && isBeginner) {
      return {
        type: 'warning',
        message: `I notice you're new to trading but chose aggressive risk. I've set "Balanced" risk instead for your safety. You can increase risk later once you're comfortable.`,
        allowProceed: true
      };
    }

    return null;
  }
};

/**
 * Step 4: Strategy Recommendation
 */
export const STEP_4: QuestionStep = {
  step: 4,
  title: "Strategy Recommendation",

  generateQuestion: (state: any) => {
    const suggestedStrategy = state._suggestedStrategy || 'dca';
    const strategyNames: Record<string, string> = {
      dca: 'Dollar Cost Averaging (DCA)',
      grid: 'Grid Trading',
      momentum: 'Momentum Trading',
      'mean-reversion': 'Mean Reversion'
    };

    const strategyDescriptions: Record<string, string> = {
      dca: `Perfect for long-term wealth building! DCA removes emotion from investing by automatically buying at regular intervals, regardless of price.

This smooths out volatility over time and is ideal for beginners.`,
      grid: `Great for profiting from volatility! Grid Trading places buy/sell orders at multiple price levels, automatically buying dips and selling peaks.

Best for range-bound markets.`,
      momentum: `Excellent for catching trends! Momentum Trading buys when price shows upward strength and sells when momentum weakens.

Requires more monitoring but can catch big moves.`,
      'mean-reversion': `Smart for sideways markets! Mean Reversion buys when price is unusually low and sells when it's high, based on moving averages.

Good balance of activity and safety.`
    };

    return `Based on our conversation, I recommend **${strategyNames[suggestedStrategy]}**!

${strategyDescriptions[suggestedStrategy]}

I'll configure it with safe defaults. Ready to proceed?`;
  },

  generateQuickReplies: () => [
    "Yes, sounds good!",
    "Tell me more",
    "Use a different strategy"
  ],

  extractConfig: (userMessage: string, state: any) => {
    const suggestedStrategy = state._suggestedStrategy || 'dca';
    const capital = state.capitalAllocated || 1000;
    const config: any = {
      strategyType: suggestedStrategy
    };

    // Set strategy-specific parameters
    const strategyParams: any = {};

    if (suggestedStrategy === 'dca') {
      strategyParams.buyInterval = 24; // 24 hours
      strategyParams.buyAmount = Math.floor(capital * 0.05); // 5% of capital
      strategyParams.maxBuys = 0; // Unlimited
    } else if (suggestedStrategy === 'grid') {
      strategyParams.gridLevels = 10;
      strategyParams.lowerPrice = 0; // Will be set based on current price
      strategyParams.upperPrice = 0; // Will be set based on current price
      strategyParams.investmentPerGrid = Math.floor(capital / 10);
    } else if (suggestedStrategy === 'momentum') {
      strategyParams.rsiPeriod = 14;
      strategyParams.rsiBuyThreshold = 30;
      strategyParams.rsiSellThreshold = 70;
      strategyParams.macdFastPeriod = 12;
      strategyParams.macdSlowPeriod = 26;
      strategyParams.macdSignalPeriod = 9;
    } else if (suggestedStrategy === 'mean-reversion') {
      strategyParams.maPeriod = 20;
      strategyParams.stdDevMultiplier = 2;
      strategyParams.buyDeviations = 2;
      strategyParams.sellDeviations = 2;
    }

    config.strategyParams = strategyParams;

    // Generate bot name
    const strategyName = suggestedStrategy.toUpperCase();
    const pair = state.tradingPair || 'BTC/USDT';
    config.name = `${strategyName} ${pair.split('/')[0]} Bot`;

    return config;
  },

  validate: () => null // No validation needed for step 4
};

/**
 * Step 5: Final Preview
 */
export const STEP_5: QuestionStep = {
  step: 5,
  title: "Final Preview",

  generateQuestion: (state: any) => {
    const config = state;
    const strategyNames: Record<string, string> = {
      dca: 'Dollar Cost Averaging',
      grid: 'Grid Trading',
      momentum: 'Momentum Trading',
      'mean-reversion': 'Mean Reversion'
    };

    return `Excellent! Here's your complete bot configuration:

🤖 **${config.name || 'Your Trading Bot'}**

📊 **Strategy:** ${strategyNames[config.strategyType] || config.strategyType}
💰 **Capital:** $${config.capitalAllocated?.toLocaleString()}
🎮 **Mode:** ${config.tradingMode === 'paper' ? 'Paper Trading (virtual money)' : 'Live Trading'}

🛡️ **Risk Controls:**
• Stop-loss: ${config.stopLossPercentage}%
• Take-profit: ${config.takeProfitPercentage}%
• Daily loss limit: $${config.maxDailyLoss}
• Max position size: ${config.maxPositionSize}%

Everything look good? Ready to deploy your bot?`;
  },

  generateQuickReplies: () => [
    "Deploy Bot!",
    "Make changes",
    "Start over"
  ],

  extractConfig: (userMessage: string) => {
    if (userMessage === "Deploy Bot!" || userMessage.toLowerCase().includes('deploy')) {
      // Don't set isComplete here - will be set by frontend after bot is created
      // This avoids database constraint violation (isComplete requires bot_id to be set)
      return { readyToDeploy: true };
    }
    return {};
  },

  validate: () => null // No validation needed for step 5
};

/**
 * All conversation steps
 */
export const CONVERSATION_STEPS: Record<number, QuestionStep> = {
  1: STEP_1,
  2: STEP_2,
  3: STEP_3,
  4: STEP_4,
  5: STEP_5
};

/**
 * Get the next question based on current step and state
 */
export function getNextQuestion(currentStep: number, state: any) {
  const step = CONVERSATION_STEPS[currentStep];
  if (!step) {
    return null;
  }

  return {
    question: step.generateQuestion(state),
    quickReplies: step.generateQuickReplies(state),
    step: currentStep,
    title: step.title
  };
}

/**
 * Process user message and extract configuration
 */
export function processUserMessage(currentStep: number, userMessage: string, state: any) {
  const step = CONVERSATION_STEPS[currentStep];
  if (!step) {
    throw new Error(`Invalid step: ${currentStep}`);
  }

  // Extract config from message
  const configUpdate = step.extractConfig(userMessage, state);

  // Merge with existing state
  const newState = { ...state, ...configUpdate };

  // Validate
  const validation = step.validate(configUpdate, newState);

  // Determine next step
  let nextStep = currentStep + 1;
  if (currentStep >= 5) {
    nextStep = 5; // Stay on final step
  }

  return {
    configUpdate,
    validation,
    nextStep,
    newState
  };
}

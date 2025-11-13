/**
 * Mock Strategy Templates
 * 4 pre-configured trading strategies for bot creation
 */

import { Strategy, StrategyType } from '@/types/bot';

export const strategies: Strategy[] = [
  {
    id: 'dca-001',
    type: 'dca',
    name: 'DCA',
    fullName: 'Dollar Cost Averaging',
    description: 'Buy fixed amount at regular intervals',
    longDescription:
      'Dollar Cost Averaging is a strategy where you invest a fixed amount of money at regular intervals, regardless of the asset price. This reduces the impact of volatility and removes emotional decision-making from trading.',

    // Risk & Performance
    risk: 'low',
    expectedReturn: 15,
    maxDrawdown: 5,
    winRate: 65,

    // Visual
    icon: '📊',
    color: 'green',

    // Default Parameters
    defaultParams: {
      buyAmount: 100, // USDT per buy
      buyInterval: 24, // hours
      maxBuys: 0, // 0 = unlimited
    },

    paramDefinitions: [
      {
        key: 'buyAmount',
        label: 'Buy Amount',
        type: 'number',
        description: 'Amount in USDT to buy each interval',
        defaultValue: 100,
        min: 10,
        max: 10000,
        step: 10,
        required: true,
      },
      {
        key: 'buyInterval',
        label: 'Buy Interval',
        type: 'select',
        description: 'Time between purchases',
        defaultValue: 24,
        options: [
          { value: '1', label: 'Every hour' },
          { value: '4', label: 'Every 4 hours' },
          { value: '12', label: 'Every 12 hours' },
          { value: '24', label: 'Daily' },
          { value: '168', label: 'Weekly' },
        ],
        required: true,
      },
      {
        key: 'maxBuys',
        label: 'Maximum Buys',
        type: 'number',
        description: 'Stop after this many buys (0 = unlimited)',
        defaultValue: 0,
        min: 0,
        max: 1000,
        step: 1,
        required: true,
      },
    ],

    // Requirements
    minCapital: 100,
    recommendedCapital: 1000,
    supportedPairs: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT'],

    // Metadata
    complexity: 'beginner',
    timeframe: '1d',
    isActive: true,
  },

  {
    id: 'grid-001',
    type: 'grid',
    name: 'Grid Trading',
    fullName: 'Grid Trading',
    description: 'Place buy/sell orders in a price grid',
    longDescription:
      'Grid Trading places multiple buy and sell orders at predefined price levels, creating a "grid" of orders. When the price moves between grid levels, the bot automatically buys low and sells high, profiting from volatility.',

    // Risk & Performance
    risk: 'medium',
    expectedReturn: 25,
    maxDrawdown: 15,
    winRate: 70,

    // Visual
    icon: '⚡',
    color: 'blue',

    // Default Parameters
    defaultParams: {
      gridLevels: 10,
      lowerPrice: 0, // Will be set based on current price
      upperPrice: 0, // Will be set based on current price
      investmentPerGrid: 100, // USDT per grid level
    },

    paramDefinitions: [
      {
        key: 'gridLevels',
        label: 'Grid Levels',
        type: 'number',
        description: 'Number of price levels in the grid',
        defaultValue: 10,
        min: 5,
        max: 50,
        step: 1,
        required: true,
      },
      {
        key: 'lowerPrice',
        label: 'Lower Price',
        type: 'number',
        description: 'Bottom price of the grid',
        defaultValue: 0,
        min: 0,
        required: true,
      },
      {
        key: 'upperPrice',
        label: 'Upper Price',
        type: 'number',
        description: 'Top price of the grid',
        defaultValue: 0,
        min: 0,
        required: true,
      },
      {
        key: 'investmentPerGrid',
        label: 'Investment Per Grid',
        type: 'number',
        description: 'USDT to invest at each grid level',
        defaultValue: 100,
        min: 10,
        max: 10000,
        step: 10,
        required: true,
      },
    ],

    // Requirements
    minCapital: 500,
    recommendedCapital: 2000,
    supportedPairs: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT'],

    // Metadata
    complexity: 'intermediate',
    timeframe: '15m',
    isActive: true,
  },

  {
    id: 'momentum-001',
    type: 'momentum',
    name: 'Momentum',
    fullName: 'Momentum Trading',
    description: 'Follow strong price trends',
    longDescription:
      'Momentum Trading identifies and follows strong price trends. The bot buys when the price shows strong upward momentum (based on technical indicators) and sells when momentum weakens, capturing major price movements.',

    // Risk & Performance
    risk: 'high',
    expectedReturn: 40,
    maxDrawdown: 25,
    winRate: 55,

    // Visual
    icon: '🚀',
    color: 'purple',

    // Default Parameters
    defaultParams: {
      rsiPeriod: 14,
      rsiBuyThreshold: 30,
      rsiSellThreshold: 70,
      macdFastPeriod: 12,
      macdSlowPeriod: 26,
      macdSignalPeriod: 9,
    },

    paramDefinitions: [
      {
        key: 'rsiPeriod',
        label: 'RSI Period',
        type: 'number',
        description: 'Periods for RSI calculation',
        defaultValue: 14,
        min: 5,
        max: 30,
        step: 1,
        required: true,
      },
      {
        key: 'rsiBuyThreshold',
        label: 'RSI Buy Threshold',
        type: 'number',
        description: 'Buy when RSI crosses below this value',
        defaultValue: 30,
        min: 10,
        max: 50,
        step: 5,
        required: true,
      },
      {
        key: 'rsiSellThreshold',
        label: 'RSI Sell Threshold',
        type: 'number',
        description: 'Sell when RSI crosses above this value',
        defaultValue: 70,
        min: 50,
        max: 90,
        step: 5,
        required: true,
      },
      {
        key: 'macdFastPeriod',
        label: 'MACD Fast Period',
        type: 'number',
        description: 'Fast EMA period for MACD',
        defaultValue: 12,
        min: 5,
        max: 20,
        step: 1,
        required: true,
      },
      {
        key: 'macdSlowPeriod',
        label: 'MACD Slow Period',
        type: 'number',
        description: 'Slow EMA period for MACD',
        defaultValue: 26,
        min: 15,
        max: 40,
        step: 1,
        required: true,
      },
      {
        key: 'macdSignalPeriod',
        label: 'MACD Signal Period',
        type: 'number',
        description: 'Signal line period for MACD',
        defaultValue: 9,
        min: 5,
        max: 15,
        step: 1,
        required: true,
      },
    ],

    // Requirements
    minCapital: 500,
    recommendedCapital: 2000,
    supportedPairs: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT'],

    // Metadata
    complexity: 'advanced',
    timeframe: '1h',
    isActive: true,
  },

  {
    id: 'meanrev-001',
    type: 'mean-reversion',
    name: 'Mean Reversion',
    fullName: 'Mean Reversion',
    description: 'Buy dips, sell peaks',
    longDescription:
      'Mean Reversion assumes that prices tend to return to their average over time. The bot buys when the price drops significantly below the moving average and sells when it rises above, profiting from price corrections.',

    // Risk & Performance
    risk: 'medium',
    expectedReturn: 30,
    maxDrawdown: 18,
    winRate: 68,

    // Visual
    icon: '🎯',
    color: 'orange',

    // Default Parameters
    defaultParams: {
      maPeriod: 20,
      stdDevMultiplier: 2,
      buyDeviations: 2,
      sellDeviations: 2,
    },

    paramDefinitions: [
      {
        key: 'maPeriod',
        label: 'Moving Average Period',
        type: 'number',
        description: 'Periods for calculating moving average',
        defaultValue: 20,
        min: 10,
        max: 50,
        step: 5,
        required: true,
      },
      {
        key: 'stdDevMultiplier',
        label: 'Std Dev Multiplier',
        type: 'number',
        description: 'Multiplier for standard deviation bands',
        defaultValue: 2,
        min: 1,
        max: 3,
        step: 0.5,
        required: true,
      },
      {
        key: 'buyDeviations',
        label: 'Buy Deviations',
        type: 'number',
        description: 'Standard deviations below MA to trigger buy',
        defaultValue: 2,
        min: 1,
        max: 3,
        step: 0.5,
        required: true,
      },
      {
        key: 'sellDeviations',
        label: 'Sell Deviations',
        type: 'number',
        description: 'Standard deviations above MA to trigger sell',
        defaultValue: 2,
        min: 1,
        max: 3,
        step: 0.5,
        required: true,
      },
    ],

    // Requirements
    minCapital: 300,
    recommendedCapital: 1500,
    supportedPairs: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT'],

    // Metadata
    complexity: 'intermediate',
    timeframe: '4h',
    isActive: true,
  },
];

/**
 * Get strategy by ID
 */
export function getStrategyById(id: string): Strategy | undefined {
  return strategies.find((s) => s.id === id);
}

/**
 * Get strategy by type
 */
export function getStrategyByType(type: StrategyType): Strategy | undefined {
  return strategies.find((s) => s.type === type);
}

/**
 * Get strategies by risk level
 */
export function getStrategiesByRisk(risk: 'low' | 'medium' | 'high'): Strategy[] {
  return strategies.filter((s) => s.risk === risk);
}

/**
 * Get strategies by complexity
 */
export function getStrategiesByComplexity(
  complexity: 'beginner' | 'intermediate' | 'advanced'
): Strategy[] {
  return strategies.filter((s) => s.complexity === complexity);
}

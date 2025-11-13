/**
 * Bot Helper Utilities
 * Utility functions for bot creation, validation, and formatting
 */

import { Bot, RiskLevel, BotStatus, Strategy, BotCreationData } from '@/types/bot';

/**
 * Format currency values
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format percentage values
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

/**
 * Format large numbers with K/M/B suffixes
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

/**
 * Get risk level color
 */
export function getRiskLevelColor(risk: RiskLevel): string {
  switch (risk) {
    case 'low':
      return 'text-green-600 dark:text-green-400';
    case 'medium':
      return 'text-orange-600 dark:text-orange-400';
    case 'high':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
}

/**
 * Get risk level background color
 */
export function getRiskLevelBgColor(risk: RiskLevel): string {
  switch (risk) {
    case 'low':
      return 'bg-green-100 dark:bg-green-900/20';
    case 'medium':
      return 'bg-orange-100 dark:bg-orange-900/20';
    case 'high':
      return 'bg-red-100 dark:bg-red-900/20';
    default:
      return 'bg-gray-100 dark:bg-gray-900/20';
  }
}

/**
 * Get bot status color
 */
export function getBotStatusColor(status: BotStatus): string {
  switch (status) {
    case 'active':
      return 'text-green-600 dark:text-green-400';
    case 'paused':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'stopped':
      return 'text-gray-600 dark:text-gray-400';
    case 'error':
      return 'text-red-600 dark:text-red-400';
    case 'draft':
      return 'text-blue-600 dark:text-blue-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
}

/**
 * Get bot status icon
 */
export function getBotStatusIcon(status: BotStatus): string {
  switch (status) {
    case 'active':
      return '▶️';
    case 'paused':
      return '⏸️';
    case 'stopped':
      return '⏹️';
    case 'error':
      return '⚠️';
    case 'draft':
      return '📝';
    default:
      return '❓';
  }
}

/**
 * Get strategy color class
 */
export function getStrategyColor(color: Strategy['color']): string {
  switch (color) {
    case 'green':
      return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
    case 'blue':
      return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20';
    case 'purple':
      return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20';
    case 'orange':
      return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
  }
}

/**
 * Validate bot name
 */
export function validateBotName(name: string): string | null {
  if (!name || name.trim().length === 0) {
    return 'Bot name is required';
  }
  if (name.trim().length < 3) {
    return 'Bot name must be at least 3 characters';
  }
  if (name.trim().length > 50) {
    return 'Bot name must be less than 50 characters';
  }
  if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) {
    return 'Bot name can only contain letters, numbers, spaces, hyphens, and underscores';
  }
  return null;
}

/**
 * Validate capital amount
 */
export function validateCapital(capital: number, minCapital?: number): string | null {
  if (!capital || capital <= 0) {
    return 'Capital amount is required';
  }
  if (capital < 10) {
    return 'Capital must be at least $10';
  }
  if (minCapital && capital < minCapital) {
    return `Capital must be at least ${formatCurrency(minCapital)} for this strategy`;
  }
  if (capital > 1_000_000) {
    return 'Capital cannot exceed $1,000,000 for paper trading';
  }
  return null;
}

/**
 * Validate stop loss percentage
 */
export function validateStopLoss(stopLoss: number): string | null {
  if (stopLoss === undefined || stopLoss === null) {
    return 'Stop loss is required';
  }
  if (stopLoss < 1) {
    return 'Stop loss must be at least 1%';
  }
  if (stopLoss > 50) {
    return 'Stop loss cannot exceed 50%';
  }
  return null;
}

/**
 * Validate take profit percentage
 */
export function validateTakeProfit(takeProfit: number): string | null {
  if (takeProfit === undefined || takeProfit === null) {
    return 'Take profit is required';
  }
  if (takeProfit < 1) {
    return 'Take profit must be at least 1%';
  }
  if (takeProfit > 100) {
    return 'Take profit cannot exceed 100%';
  }
  return null;
}

/**
 * Validate bot creation data
 */
export function validateBotCreation(data: Partial<BotCreationData>): string[] {
  const errors: string[] = [];

  // Name validation
  const nameError = validateBotName(data.name || '');
  if (nameError) errors.push(nameError);

  // Strategy validation
  if (!data.strategyId && !data.strategyType) {
    errors.push('Strategy is required');
  }

  // Trading pair validation
  if (!data.tradingPair) {
    errors.push('Trading pair is required');
  }

  // Capital validation
  const capitalError = validateCapital(data.capitalAllocated || 0);
  if (capitalError) errors.push(capitalError);

  // Risk validation
  if (!data.riskLevel) {
    errors.push('Risk level is required');
  }

  // Stop loss validation
  const stopLossError = validateStopLoss(data.stopLossPercentage || 0);
  if (stopLossError) errors.push(stopLossError);

  // Take profit validation
  const takeProfitError = validateTakeProfit(data.takeProfitPercentage || 0);
  if (takeProfitError) errors.push(takeProfitError);

  return errors;
}

/**
 * Calculate position size based on capital and risk
 */
export function calculatePositionSize(capital: number, riskPercentage: number): number {
  return (capital * riskPercentage) / 100;
}

/**
 * Calculate max daily loss amount
 */
export function calculateMaxDailyLoss(capital: number, percentage: number): number {
  return (capital * percentage) / 100;
}

/**
 * Generate unique bot name
 */
export function generateBotName(strategyName: string): string {
  const timestamp = new Date().toISOString().slice(0, 10);
  return `${strategyName} - ${timestamp}`;
}

/**
 * Calculate estimated return based on strategy
 */
export function calculateEstimatedReturn(
  capital: number,
  expectedReturnPercentage: number,
  timeframeMonths: number = 12
): number {
  return (capital * expectedReturnPercentage * timeframeMonths) / (100 * 12);
}

/**
 * Format timeframe for display
 */
export function formatTimeframe(timeframe: string): string {
  const timeframeMap: Record<string, string> = {
    '1m': '1 minute',
    '5m': '5 minutes',
    '15m': '15 minutes',
    '30m': '30 minutes',
    '1h': '1 hour',
    '4h': '4 hours',
    '1d': '1 day',
    '1w': '1 week',
  };

  return timeframeMap[timeframe] || timeframe;
}

/**
 * Get trading pair display name
 */
export function formatTradingPair(pair: string): string {
  return pair.replace('/', ' / ');
}

/**
 * Check if bot is active
 */
export function isBotActive(bot: Bot): boolean {
  return bot.status === 'active';
}

/**
 * Check if bot can be started
 */
export function canStartBot(bot: Bot): boolean {
  return bot.status === 'stopped' || bot.status === 'paused' || bot.status === 'draft';
}

/**
 * Check if bot can be paused
 */
export function canPauseBot(bot: Bot): boolean {
  return bot.status === 'active';
}

/**
 * Check if bot can be edited
 */
export function canEditBot(bot: Bot): boolean {
  return bot.status !== 'active';
}

/**
 * Sort bots by various criteria
 */
export function sortBots(bots: Bot[], sortBy: 'name' | 'pnl' | 'created' | 'updated'): Bot[] {
  return [...bots].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'pnl':
        return (b.totalPnL || 0) - (a.totalPnL || 0);
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'updated':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      default:
        return 0;
    }
  });
}

/**
 * Filter bots by status
 */
export function filterBotsByStatus(bots: Bot[], status: BotStatus | 'all'): Bot[] {
  if (status === 'all') return bots;
  return bots.filter((bot) => bot.status === status);
}

/**
 * Filter bots by strategy type
 */
export function filterBotsByStrategy(bots: Bot[], strategyType: string | 'all'): Bot[] {
  if (strategyType === 'all') return bots;
  return bots.filter((bot) => bot.strategyType === strategyType);
}

/**
 * Calculate total allocated capital across all bots
 */
export function calculateTotalAllocated(bots: Bot[]): number {
  return bots.reduce((sum, bot) => sum + bot.capitalAllocated, 0);
}

/**
 * Calculate total P&L across all bots
 */
export function calculateTotalPnL(bots: Bot[]): number {
  return bots.reduce((sum, bot) => sum + (bot.totalPnL || 0), 0);
}

/**
 * Get bot summary statistics
 */
export function getBotSummaryStats(bots: Bot[]) {
  const activeBots = bots.filter((b) => b.status === 'active').length;
  const totalAllocated = calculateTotalAllocated(bots);
  const totalPnL = calculateTotalPnL(bots);
  const avgPnL = bots.length > 0 ? totalPnL / bots.length : 0;

  return {
    total: bots.length,
    active: activeBots,
    inactive: bots.length - activeBots,
    totalAllocated,
    totalPnL,
    avgPnL,
  };
}

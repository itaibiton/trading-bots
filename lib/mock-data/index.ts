/**
 * Mock Data Exports
 * Centralized export for all mock data used in bot creation
 */

// Strategy Templates
export {
  strategies,
  getStrategyById,
  getStrategyByType,
  getStrategiesByRisk,
  getStrategiesByComplexity,
} from './strategies';

// AI Conversation Flow
export {
  conversationFlow,
  generateAIResponse,
  strategyRiskMapping,
  defaultRiskSettings,
} from './ai-responses';

// Backtest Data
export {
  dcaBacktestResult,
  gridBacktestResult,
  momentumBacktestResult,
  meanReversionBacktestResult,
  getBacktestByStrategy,
  generateCandlestickData,
  type CandlestickData,
} from './backtest-data';

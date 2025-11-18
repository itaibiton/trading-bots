/**
 * Bot Creation & Management Types
 * Shared types for the bot creation flow and management dashboard
 */

export type RiskLevel = 'low' | 'medium' | 'high';
export type BotStatus = 'draft' | 'active' | 'paused' | 'stopped' | 'error';
export type TradingMode = 'paper' | 'live';
export type StrategyType = 'dca' | 'grid' | 'momentum' | 'mean-reversion';

/**
 * Bot Configuration
 */
export interface Bot {
  id: string;
  userId: string;
  name: string;
  description?: string;
  strategyId: string;
  strategyType: StrategyType;
  status: BotStatus;
  tradingMode: TradingMode;

  // Trading Configuration
  tradingPair: string; // e.g., "BTC/USDT"
  capitalAllocated: number; // USDT

  // Risk Configuration
  riskLevel: RiskLevel;
  stopLossPercentage: number; // 0-100
  takeProfitPercentage: number; // 0-100
  maxDailyLoss: number; // USDT
  maxPositionSize: number; // percentage of capital

  // Strategy-specific parameters (JSON)
  strategyParams: Record<string, unknown>;

  // Performance (will be null for new bots)
  totalPnL?: number;
  totalPnLPercentage?: number;
  winRate?: number;
  totalTrades?: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;

  // Metadata
  isTemplate: boolean;
  clonedFromId?: string;
}

/**
 * Strategy Template
 */
export interface Strategy {
  id: string;
  type: StrategyType;
  name: string;
  fullName: string;
  description: string;
  longDescription: string;

  // Risk & Performance
  risk: RiskLevel;
  expectedReturn: number; // percentage
  maxDrawdown: number; // percentage
  winRate: number; // percentage

  // Visual
  icon: string; // emoji
  color: 'green' | 'blue' | 'purple' | 'orange';

  // Default Parameters
  defaultParams: Record<string, unknown>;
  paramDefinitions: StrategyParamDefinition[];

  // Requirements
  minCapital: number; // USDT
  recommendedCapital: number; // USDT
  supportedPairs: string[];

  // Metadata
  complexity: 'beginner' | 'intermediate' | 'advanced';
  timeframe: string; // e.g., "1h", "4h", "1d"
  isActive: boolean;
}

/**
 * Strategy Parameter Definition
 * Defines the configuration options for a strategy
 */
export interface StrategyParamDefinition {
  key: string;
  label: string;
  type: 'number' | 'percentage' | 'select' | 'boolean';
  description: string;
  defaultValue: unknown;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  required: boolean;
}

/**
 * Risk Configuration
 */
export interface RiskConfig {
  id: string;
  botId: string;

  // Stop Loss & Take Profit
  stopLossPercentage: number;
  takeProfitPercentage: number;
  trailingStopEnabled: boolean;
  trailingStopPercentage?: number;

  // Position Limits
  maxPositionSize: number; // percentage of capital
  maxDailyLoss: number; // USDT
  maxOpenPositions: number;

  // Trading Hours
  tradingHoursEnabled: boolean;
  tradingStartHour?: number; // 0-23
  tradingEndHour?: number; // 0-23

  // Risk Level
  riskLevel: RiskLevel;

  createdAt: string;
  updatedAt: string;
}

/**
 * AI Conversation for bot creation
 */
export interface AIConversation {
  id: string;
  userId: string;
  botId?: string; // null until bot is created

  // Conversation State
  currentStep: number;
  isComplete: boolean;

  // User Inputs
  tradingGoal?: string;
  riskTolerance?: RiskLevel;
  capitalAmount?: number;
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  preferredPairs?: string[];

  // AI Recommendations
  recommendedStrategy?: StrategyType;
  recommendedParams?: Record<string, unknown>;

  // Messages
  messages: AIMessage[];

  createdAt: string;
  updatedAt: string;
}

/**
 * AI Chat Message
 */
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;

  // Optional structured data
  quickReplies?: QuickReply[];
  suggestedConfig?: Partial<Bot>;
}

/**
 * Quick Reply for AI Chat
 */
export interface QuickReply {
  id: string;
  label: string;
  value: string;
}

/**
 * Bot Creation Form Data
 */
export interface BotCreationData {
  // Basic Info
  name: string;
  description?: string;

  // Strategy Selection
  strategyId?: string;
  strategyType?: StrategyType;

  // Trading Config
  tradingPair: string;
  capitalAllocated: number;
  tradingMode: TradingMode;

  // Risk Config
  riskLevel: RiskLevel;
  stopLossPercentage: number;
  takeProfitPercentage: number;
  maxDailyLoss: number;
  maxPositionSize: number;

  // Strategy Parameters
  strategyParams: Record<string, unknown>;
}

/**
 * Backtest Result
 */
export interface BacktestResult {
  id: string;
  botId?: string;
  strategyType: StrategyType;

  // Test Configuration
  startDate: string;
  endDate: string;
  initialCapital: number;
  tradingPair: string;

  // Results
  finalCapital: number;
  totalReturn: number; // percentage
  totalPnL: number; // USDT

  // Performance Metrics
  winRate: number; // percentage
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;

  avgWin: number;
  avgLoss: number;
  maxDrawdown: number; // percentage
  sharpeRatio: number;

  // Time Series Data
  equityCurve: EquityPoint[];
  trades: BacktestTrade[];

  createdAt: string;
}

/**
 * Equity Curve Point
 */
export interface EquityPoint {
  timestamp: string;
  equity: number;
  drawdown: number;
}

/**
 * Backtest Trade
 */
export interface BacktestTrade {
  id: string;
  timestamp: string;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  pnl?: number;
  pnlPercentage?: number;
}

/**
 * Bot Creation Mode
 */
export type BotCreationMode = 'template' | 'ai' | 'pro';

/**
 * Bot Creation Step
 */
export interface BotCreationStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
}

/**
 * Form Validation Error
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Conversation Message (New AI Chat System)
 */
export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  quickReplies?: string[];
  configUpdate?: Record<string, any>;
  validation?: {
    type: 'info' | 'warning' | 'error';
    message: string;
    allowProceed: boolean;
  };
}

/**
 * Conversation State (New AI Chat System)
 */
export interface ConversationState {
  id: string;
  userId: string;
  botId?: string;
  currentStep: number;
  isComplete: boolean;
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  tradingGoal?: string;
  riskTolerance?: 'low' | 'medium' | 'high';
  config: Partial<BotCreationData> & { readyToDeploy?: boolean };
  messages: ConversationMessage[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

/**
 * Bot Configuration (used during creation)
 */
export interface BotConfig extends BotCreationData {
  // Additional fields that might be needed during conversation
  trailingStopEnabled?: boolean;
  leverage?: number;
}

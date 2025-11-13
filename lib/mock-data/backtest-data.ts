/**
 * Mock Backtesting Data
 * Simulates historical trading performance for strategy validation
 */

import { BacktestResult, BacktestTrade, EquityPoint } from '@/types/bot';

/**
 * Generate mock equity curve data
 */
function generateEquityCurve(
  initialCapital: number,
  finalCapital: number,
  days: number
): EquityPoint[] {
  const points: EquityPoint[] = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - days);

  let equity = initialCapital;
  let maxEquity = initialCapital;

  for (let i = 0; i <= days; i++) {
    // Simulate realistic growth with volatility
    const progress = i / days;
    const targetEquity = initialCapital + (finalCapital - initialCapital) * progress;

    // Add some random volatility (±2% daily)
    const volatility = (Math.random() - 0.5) * 0.04;
    equity = targetEquity * (1 + volatility);

    // Track max equity for drawdown calculation
    if (equity > maxEquity) {
      maxEquity = equity;
    }

    const drawdown = maxEquity > 0 ? ((maxEquity - equity) / maxEquity) * 100 : 0;

    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);

    points.push({
      timestamp: date.toISOString(),
      equity: Math.round(equity * 100) / 100,
      drawdown: Math.round(drawdown * 100) / 100,
    });
  }

  return points;
}

/**
 * Generate mock trade history
 */
function generateTrades(
  totalTrades: number,
  winRate: number,
  avgWin: number,
  avgLoss: number,
  startDate: Date,
  endDate: Date
): BacktestTrade[] {
  const trades: BacktestTrade[] = [];
  const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const winningTrades = Math.round(totalTrades * (winRate / 100));

  for (let i = 0; i < totalTrades; i++) {
    const isWin = i < winningTrades;
    const pnl = isWin ? avgWin : -avgLoss;
    const pnlPercentage = (Math.random() * 5 + 1) * (isWin ? 1 : -1);

    // Random timestamp within the backtest period
    const daysOffset = Math.floor(Math.random() * daysDiff);
    const tradeDate = new Date(startDate);
    tradeDate.setDate(tradeDate.getDate() + daysOffset);

    trades.push({
      id: `trade-${i}`,
      timestamp: tradeDate.toISOString(),
      side: i % 2 === 0 ? 'buy' : 'sell',
      price: 40000 + Math.random() * 10000,
      quantity: 0.01 + Math.random() * 0.05,
      pnl: Math.round(pnl * 100) / 100,
      pnlPercentage: Math.round(pnlPercentage * 100) / 100,
    });
  }

  // Sort by timestamp
  return trades.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

/**
 * DCA Backtest Result
 */
export const dcaBacktestResult: BacktestResult = {
  id: 'backtest-dca-001',
  strategyType: 'dca',

  // Test Configuration
  startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date().toISOString(),
  initialCapital: 1000,
  tradingPair: 'BTC/USDT',

  // Results
  finalCapital: 1150,
  totalReturn: 15.0,
  totalPnL: 150,

  // Performance Metrics
  winRate: 65,
  totalTrades: 90,
  winningTrades: 59,
  losingTrades: 31,

  avgWin: 8.5,
  avgLoss: 5.2,
  maxDrawdown: 5.2,
  sharpeRatio: 1.8,

  // Time Series Data
  equityCurve: generateEquityCurve(1000, 1150, 90),
  trades: generateTrades(90, 65, 8.5, 5.2, new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()),

  createdAt: new Date().toISOString(),
};

/**
 * Grid Trading Backtest Result
 */
export const gridBacktestResult: BacktestResult = {
  id: 'backtest-grid-001',
  strategyType: 'grid',

  startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date().toISOString(),
  initialCapital: 2000,
  tradingPair: 'BTC/USDT',

  finalCapital: 2500,
  totalReturn: 25.0,
  totalPnL: 500,

  winRate: 70,
  totalTrades: 140,
  winningTrades: 98,
  losingTrades: 42,

  avgWin: 12.5,
  avgLoss: 8.0,
  maxDrawdown: 15.0,
  sharpeRatio: 2.1,

  equityCurve: generateEquityCurve(2000, 2500, 90),
  trades: generateTrades(140, 70, 12.5, 8.0, new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()),

  createdAt: new Date().toISOString(),
};

/**
 * Momentum Backtest Result
 */
export const momentumBacktestResult: BacktestResult = {
  id: 'backtest-momentum-001',
  strategyType: 'momentum',

  startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date().toISOString(),
  initialCapital: 2000,
  tradingPair: 'BTC/USDT',

  finalCapital: 2800,
  totalReturn: 40.0,
  totalPnL: 800,

  winRate: 55,
  totalTrades: 65,
  winningTrades: 36,
  losingTrades: 29,

  avgWin: 45.0,
  avgLoss: 25.0,
  maxDrawdown: 25.0,
  sharpeRatio: 1.6,

  equityCurve: generateEquityCurve(2000, 2800, 90),
  trades: generateTrades(65, 55, 45.0, 25.0, new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()),

  createdAt: new Date().toISOString(),
};

/**
 * Mean Reversion Backtest Result
 */
export const meanReversionBacktestResult: BacktestResult = {
  id: 'backtest-meanrev-001',
  strategyType: 'mean-reversion',

  startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date().toISOString(),
  initialCapital: 1500,
  tradingPair: 'BTC/USDT',

  finalCapital: 1950,
  totalReturn: 30.0,
  totalPnL: 450,

  winRate: 68,
  totalTrades: 85,
  winningTrades: 58,
  losingTrades: 27,

  avgWin: 18.5,
  avgLoss: 11.0,
  maxDrawdown: 18.0,
  sharpeRatio: 1.9,

  equityCurve: generateEquityCurve(1500, 1950, 90),
  trades: generateTrades(85, 68, 18.5, 11.0, new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()),

  createdAt: new Date().toISOString(),
};

/**
 * Get backtest result by strategy type
 */
export function getBacktestByStrategy(strategyType: string): BacktestResult | undefined {
  switch (strategyType) {
    case 'dca':
      return dcaBacktestResult;
    case 'grid':
      return gridBacktestResult;
    case 'momentum':
      return momentumBacktestResult;
    case 'mean-reversion':
      return meanReversionBacktestResult;
    default:
      return undefined;
  }
}

/**
 * Mock candlestick data for charts
 */
export interface CandlestickData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * Generate mock candlestick data
 */
export function generateCandlestickData(days: number): CandlestickData[] {
  const data: CandlestickData[] = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - days);

  let price = 40000;

  for (let i = 0; i < days; i++) {
    const open = price;
    const change = (Math.random() - 0.5) * 2000;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 500;
    const low = Math.min(open, close) - Math.random() * 500;

    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);

    data.push({
      timestamp: date.toISOString(),
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume: Math.random() * 1000 + 500,
    });

    price = close;
  }

  return data;
}

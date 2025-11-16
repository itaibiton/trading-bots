-- =====================================================
-- Migration: Create trades table
-- Description: Trading history for paper and live trading
-- =====================================================

CREATE TABLE IF NOT EXISTS trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- denormalized for quick user queries

  -- Trade Details
  side TEXT NOT NULL CHECK (side IN ('buy', 'sell')),
  trading_pair TEXT NOT NULL,
  trading_mode TEXT NOT NULL CHECK (trading_mode IN ('paper', 'live')),

  -- Execution
  executed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  price DECIMAL(20, 8) NOT NULL CHECK (price > 0), -- crypto prices can have many decimals
  quantity DECIMAL(20, 8) NOT NULL CHECK (quantity > 0),
  total_value DECIMAL(15, 2) NOT NULL CHECK (total_value > 0), -- price * quantity in USDT

  -- Fees
  fee DECIMAL(15, 6) DEFAULT 0 NOT NULL,
  fee_currency TEXT DEFAULT 'USDT' NOT NULL,

  -- P&L (for sell orders, calculated against paired buy)
  pnl DECIMAL(15, 4), -- profit/loss in USDT
  pnl_percentage DECIMAL(8, 4), -- profit/loss as percentage

  -- External Reference (for live trading)
  exchange_order_id TEXT, -- Binance order ID
  exchange TEXT DEFAULT 'binance' CHECK (exchange IN ('binance', 'paper')),

  -- Metadata
  strategy_type TEXT NOT NULL CHECK (strategy_type IN ('dca', 'grid', 'momentum', 'mean-reversion')),
  execution_reason TEXT, -- e.g., "DCA schedule", "Grid level hit", "Momentum signal"

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_trades_bot_id ON trades(bot_id);
CREATE INDEX idx_trades_user_id ON trades(user_id);
CREATE INDEX idx_trades_executed_at ON trades(executed_at DESC);
CREATE INDEX idx_trades_bot_id_executed_at ON trades(bot_id, executed_at DESC);
CREATE INDEX idx_trades_user_id_executed_at ON trades(user_id, executed_at DESC);
CREATE INDEX idx_trades_trading_mode ON trades(trading_mode);
CREATE INDEX idx_trades_side ON trades(side);

-- Composite index for P&L queries (only on sell trades with P&L)
CREATE INDEX idx_trades_pnl ON trades(bot_id, pnl DESC) WHERE side = 'sell' AND pnl IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trades
-- Users can only access trades for their own bots
CREATE POLICY "Users can view their own trades"
  ON trades
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only bot executor (service role) can insert trades
-- Users cannot manually insert trades
CREATE POLICY "Service role can insert trades"
  ON trades
  FOR INSERT
  TO service_role
  WITH CHECK (TRUE);

-- Users cannot update or delete trades (immutable audit log)
-- Only service role can delete (for cleanup/admin purposes)
CREATE POLICY "Service role can delete trades"
  ON trades
  FOR DELETE
  TO service_role
  USING (TRUE);

-- Comments
COMMENT ON TABLE trades IS 'Trading history for all bots (paper and live trading). Immutable audit log.';
COMMENT ON COLUMN trades.user_id IS 'Denormalized from bots table for faster user-level queries';
COMMENT ON COLUMN trades.price IS 'Execution price with up to 8 decimal places (crypto precision)';
COMMENT ON COLUMN trades.quantity IS 'Amount of crypto traded (e.g., 0.001 BTC)';
COMMENT ON COLUMN trades.total_value IS 'Total trade value in USDT (price * quantity)';
COMMENT ON COLUMN trades.pnl IS 'Profit/Loss in USDT (only set for sell orders)';
COMMENT ON COLUMN trades.pnl_percentage IS 'Profit/Loss as percentage (only set for sell orders)';
COMMENT ON COLUMN trades.exchange_order_id IS 'External exchange order ID (Binance) for live trades';
COMMENT ON COLUMN trades.execution_reason IS 'Human-readable reason for trade execution (for logs and debugging)';

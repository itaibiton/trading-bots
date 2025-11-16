-- =====================================================
-- Migration: Create bots table
-- Description: User-created trading bots
-- =====================================================

CREATE TABLE IF NOT EXISTS bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Basic Info
  name TEXT NOT NULL,
  description TEXT,

  -- Strategy
  strategy_id UUID NOT NULL REFERENCES strategies(id) ON DELETE RESTRICT,
  strategy_type TEXT NOT NULL CHECK (strategy_type IN ('dca', 'grid', 'momentum', 'mean-reversion')),

  -- Status
  status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'active', 'paused', 'stopped', 'error')),
  trading_mode TEXT DEFAULT 'paper' NOT NULL CHECK (trading_mode IN ('paper', 'live')),

  -- Trading Configuration
  trading_pair TEXT NOT NULL, -- e.g., "BTC/USDT"
  capital_allocated DECIMAL(15, 2) NOT NULL CHECK (capital_allocated > 0),

  -- Risk Configuration (denormalized for quick access)
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  stop_loss_percentage DECIMAL(5, 2) NOT NULL CHECK (stop_loss_percentage >= 0 AND stop_loss_percentage <= 100),
  take_profit_percentage DECIMAL(5, 2) NOT NULL CHECK (take_profit_percentage >= 0 AND take_profit_percentage <= 100),
  max_daily_loss DECIMAL(15, 2) NOT NULL CHECK (max_daily_loss > 0),
  max_position_size DECIMAL(5, 2) NOT NULL CHECK (max_position_size > 0 AND max_position_size <= 100),

  -- Strategy Parameters (JSONB for flexibility)
  strategy_params JSONB NOT NULL DEFAULT '{}',

  -- Performance Metrics (updated by bot executor)
  total_pnl DECIMAL(15, 2) DEFAULT 0 NOT NULL,
  total_pnl_percentage DECIMAL(8, 4) DEFAULT 0 NOT NULL,
  win_rate DECIMAL(5, 2) DEFAULT 0 NOT NULL,
  total_trades INTEGER DEFAULT 0 NOT NULL,

  -- Execution
  next_execution_at TIMESTAMPTZ, -- CRITICAL for cron job
  last_execution_at TIMESTAMPTZ,
  error_message TEXT,
  error_count INTEGER DEFAULT 0 NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_active_at TIMESTAMPTZ,

  -- Metadata
  is_template BOOLEAN DEFAULT FALSE NOT NULL,
  cloned_from_id UUID REFERENCES bots(id) ON DELETE SET NULL,

  -- Constraints
  CONSTRAINT bots_capital_allocated_positive CHECK (capital_allocated > 0),
  CONSTRAINT bots_stop_loss_less_than_take_profit CHECK (stop_loss_percentage < take_profit_percentage),
  CONSTRAINT bots_error_count_nonnegative CHECK (error_count >= 0)
);

-- Indexes for performance
CREATE INDEX idx_bots_user_id ON bots(user_id);
CREATE INDEX idx_bots_status ON bots(status);
CREATE INDEX idx_bots_trading_mode ON bots(trading_mode);
CREATE INDEX idx_bots_strategy_type ON bots(strategy_type);
CREATE INDEX idx_bots_next_execution_at ON bots(next_execution_at) WHERE status = 'active'; -- CRITICAL for cron
CREATE INDEX idx_bots_user_id_status ON bots(user_id, status); -- Common query pattern
CREATE INDEX idx_bots_cloned_from_id ON bots(cloned_from_id) WHERE cloned_from_id IS NOT NULL;

-- Composite index for dashboard queries (filtering + sorting)
CREATE INDEX idx_bots_user_id_created_at ON bots(user_id, created_at DESC);

-- Updated at trigger
CREATE TRIGGER update_bots_updated_at
  BEFORE UPDATE ON bots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE bots ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bots
-- Users can only access their own bots
CREATE POLICY "Users can view their own bots"
  ON bots
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bots"
  ON bots
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bots"
  ON bots
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bots"
  ON bots
  FOR DELETE
  USING (auth.uid() = user_id);

-- Comments
COMMENT ON TABLE bots IS 'User-created trading bots with strategy configuration and performance tracking';
COMMENT ON COLUMN bots.strategy_params IS 'Strategy-specific configuration parameters (JSON)';
COMMENT ON COLUMN bots.next_execution_at IS 'Next scheduled execution time (used by cron job)';
COMMENT ON COLUMN bots.last_execution_at IS 'Last successful execution timestamp';
COMMENT ON COLUMN bots.is_template IS 'Whether this bot can be used as a template for cloning';
COMMENT ON COLUMN bots.cloned_from_id IS 'Reference to the bot this was cloned from (for marketplace)';

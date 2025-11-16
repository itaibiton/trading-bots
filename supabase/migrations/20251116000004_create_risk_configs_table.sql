-- =====================================================
-- Migration: Create risk_configs table
-- Description: Detailed risk management configuration for bots
-- =====================================================

CREATE TABLE IF NOT EXISTS risk_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL UNIQUE REFERENCES bots(id) ON DELETE CASCADE, -- 1:1 relationship

  -- Stop Loss & Take Profit
  stop_loss_percentage DECIMAL(5, 2) NOT NULL CHECK (stop_loss_percentage >= 0 AND stop_loss_percentage <= 100),
  take_profit_percentage DECIMAL(5, 2) NOT NULL CHECK (take_profit_percentage >= 0 AND take_profit_percentage <= 100),
  trailing_stop_enabled BOOLEAN DEFAULT FALSE NOT NULL,
  trailing_stop_percentage DECIMAL(5, 2) CHECK (trailing_stop_percentage IS NULL OR (trailing_stop_percentage >= 0 AND trailing_stop_percentage <= 100)),

  -- Position Limits
  max_position_size DECIMAL(5, 2) NOT NULL CHECK (max_position_size > 0 AND max_position_size <= 100), -- % of capital
  max_daily_loss DECIMAL(15, 2) NOT NULL CHECK (max_daily_loss > 0), -- USDT
  max_open_positions INTEGER DEFAULT 1 NOT NULL CHECK (max_open_positions > 0),

  -- Trading Hours (optional time-based trading restrictions)
  trading_hours_enabled BOOLEAN DEFAULT FALSE NOT NULL,
  trading_start_hour INTEGER CHECK (trading_start_hour IS NULL OR (trading_start_hour >= 0 AND trading_start_hour <= 23)),
  trading_end_hour INTEGER CHECK (trading_end_hour IS NULL OR (trading_end_hour >= 0 AND trading_end_hour <= 23)),

  -- Risk Level (denormalized from bot for convenience)
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Constraints
  CONSTRAINT risk_configs_stop_loss_less_than_take_profit CHECK (stop_loss_percentage < take_profit_percentage),
  CONSTRAINT risk_configs_trailing_stop_requires_enabled CHECK (
    (trailing_stop_enabled = FALSE AND trailing_stop_percentage IS NULL) OR
    (trailing_stop_enabled = TRUE AND trailing_stop_percentage IS NOT NULL)
  ),
  CONSTRAINT risk_configs_trading_hours_require_enabled CHECK (
    (trading_hours_enabled = FALSE AND trading_start_hour IS NULL AND trading_end_hour IS NULL) OR
    (trading_hours_enabled = TRUE AND trading_start_hour IS NOT NULL AND trading_end_hour IS NOT NULL)
  )
);

-- Indexes
CREATE INDEX idx_risk_configs_bot_id ON risk_configs(bot_id);
CREATE INDEX idx_risk_configs_risk_level ON risk_configs(risk_level);

-- Updated at trigger
CREATE TRIGGER update_risk_configs_updated_at
  BEFORE UPDATE ON risk_configs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE risk_configs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for risk_configs
-- Users can only access risk configs for their own bots
CREATE POLICY "Users can view risk configs for their own bots"
  ON risk_configs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bots
      WHERE bots.id = risk_configs.bot_id
      AND bots.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert risk configs for their own bots"
  ON risk_configs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bots
      WHERE bots.id = risk_configs.bot_id
      AND bots.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update risk configs for their own bots"
  ON risk_configs
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM bots
      WHERE bots.id = risk_configs.bot_id
      AND bots.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete risk configs for their own bots"
  ON risk_configs
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM bots
      WHERE bots.id = risk_configs.bot_id
      AND bots.user_id = auth.uid()
    )
  );

-- Comments
COMMENT ON TABLE risk_configs IS 'Detailed risk management configuration for each bot (1:1 relationship)';
COMMENT ON COLUMN risk_configs.bot_id IS 'Foreign key to bots table (UNIQUE for 1:1 relationship)';
COMMENT ON COLUMN risk_configs.trailing_stop_enabled IS 'Enable trailing stop-loss that adjusts with price movement';
COMMENT ON COLUMN risk_configs.max_position_size IS 'Maximum position size as percentage of allocated capital';
COMMENT ON COLUMN risk_configs.max_daily_loss IS 'Maximum allowed loss per day in USDT (bot pauses if exceeded)';
COMMENT ON COLUMN risk_configs.trading_hours_enabled IS 'Enable time-based trading restrictions (e.g., only trade during market hours)';

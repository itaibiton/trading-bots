-- =====================================================
-- Migration: Create strategies table
-- Description: Strategy templates for bot creation
-- =====================================================

CREATE TABLE IF NOT EXISTS strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL UNIQUE CHECK (type IN ('dca', 'grid', 'momentum', 'mean-reversion')),
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,

  -- Risk & Performance
  risk TEXT NOT NULL CHECK (risk IN ('low', 'medium', 'high')),
  expected_return DECIMAL(5, 2) NOT NULL, -- percentage (e.g., 15.50 for 15.5%)
  max_drawdown DECIMAL(5, 2) NOT NULL, -- percentage
  win_rate DECIMAL(5, 2) NOT NULL, -- percentage

  -- Visual
  icon TEXT NOT NULL, -- emoji
  color TEXT NOT NULL CHECK (color IN ('green', 'blue', 'purple', 'orange')),

  -- Default Parameters (JSONB for flexibility)
  default_params JSONB NOT NULL DEFAULT '{}',
  param_definitions JSONB NOT NULL DEFAULT '[]',

  -- Requirements
  min_capital DECIMAL(10, 2) NOT NULL, -- USDT
  recommended_capital DECIMAL(10, 2) NOT NULL, -- USDT
  supported_pairs TEXT[] NOT NULL DEFAULT ARRAY['BTC/USDT', 'ETH/USDT'],

  -- Metadata
  complexity TEXT NOT NULL CHECK (complexity IN ('beginner', 'intermediate', 'advanced')),
  timeframe TEXT NOT NULL, -- e.g., "1h", "4h", "1d"
  is_active BOOLEAN DEFAULT TRUE NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_strategies_type ON strategies(type);
CREATE INDEX idx_strategies_risk ON strategies(risk);
CREATE INDEX idx_strategies_complexity ON strategies(complexity);
CREATE INDEX idx_strategies_is_active ON strategies(is_active);

-- Updated at trigger
CREATE TRIGGER update_strategies_updated_at
  BEFORE UPDATE ON strategies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE strategies ENABLE ROW LEVEL SECURITY;

-- RLS Policies for strategies
-- All authenticated users can read strategies (they are templates)
CREATE POLICY "Authenticated users can view strategies"
  ON strategies
  FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

-- Only admins can insert/update/delete strategies (implement later)
-- For now, strategies are seeded via migrations

-- Comments
COMMENT ON TABLE strategies IS 'Strategy templates for bot creation (DCA, Grid, Momentum, Mean Reversion)';
COMMENT ON COLUMN strategies.type IS 'Unique strategy identifier (dca, grid, momentum, mean-reversion)';
COMMENT ON COLUMN strategies.default_params IS 'Default strategy configuration parameters (JSON)';
COMMENT ON COLUMN strategies.param_definitions IS 'Array of parameter definitions for UI forms (JSON)';
COMMENT ON COLUMN strategies.supported_pairs IS 'List of trading pairs this strategy supports';

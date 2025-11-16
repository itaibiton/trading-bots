-- =====================================================
-- Migration: Seed strategy templates
-- Description: Insert 4 strategy templates (DCA, Grid, Momentum, Mean Reversion)
-- =====================================================

-- Clear existing strategies (for development, remove in production)
-- TRUNCATE strategies CASCADE;

-- Strategy 1: DCA (Dollar Cost Averaging)
INSERT INTO strategies (
  type,
  name,
  full_name,
  description,
  long_description,
  risk,
  expected_return,
  max_drawdown,
  win_rate,
  icon,
  color,
  default_params,
  param_definitions,
  min_capital,
  recommended_capital,
  supported_pairs,
  complexity,
  timeframe,
  is_active
) VALUES (
  'dca',
  'DCA',
  'Dollar Cost Averaging',
  'Invest a fixed amount at regular intervals, reducing impact of volatility.',
  'Dollar Cost Averaging (DCA) is a strategy where you invest a fixed amount of money at regular intervals, regardless of the asset price. This approach reduces the impact of volatility by spreading purchases over time, lowering the average cost per unit. Ideal for long-term investors who want to build positions gradually without trying to time the market.',
  'low',
  12.50, -- expected return (%)
  8.00,  -- max drawdown (%)
  65.00, -- win rate (%)
  '📊',
  'green',
  '{
    "investmentAmount": 100,
    "frequency": "daily",
    "frequencyHours": 24,
    "targetAsset": "BTC"
  }'::jsonb,
  '[
    {
      "key": "investmentAmount",
      "label": "Investment Amount",
      "type": "number",
      "description": "Fixed amount to invest each interval (USDT)",
      "defaultValue": 100,
      "min": 10,
      "max": 10000,
      "step": 10,
      "required": true
    },
    {
      "key": "frequency",
      "label": "Purchase Frequency",
      "type": "select",
      "description": "How often to make purchases",
      "defaultValue": "daily",
      "options": [
        {"value": "hourly", "label": "Every Hour"},
        {"value": "daily", "label": "Daily"},
        {"value": "weekly", "label": "Weekly"}
      ],
      "required": true
    }
  ]'::jsonb,
  100.00,  -- min capital
  500.00,  -- recommended capital
  ARRAY['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT'],
  'beginner',
  '1d',
  TRUE
) ON CONFLICT (type) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  long_description = EXCLUDED.long_description,
  risk = EXCLUDED.risk,
  expected_return = EXCLUDED.expected_return,
  max_drawdown = EXCLUDED.max_drawdown,
  win_rate = EXCLUDED.win_rate,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  default_params = EXCLUDED.default_params,
  param_definitions = EXCLUDED.param_definitions,
  min_capital = EXCLUDED.min_capital,
  recommended_capital = EXCLUDED.recommended_capital,
  supported_pairs = EXCLUDED.supported_pairs,
  complexity = EXCLUDED.complexity,
  timeframe = EXCLUDED.timeframe,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Strategy 2: Grid Trading
INSERT INTO strategies (
  type,
  name,
  full_name,
  description,
  long_description,
  risk,
  expected_return,
  max_drawdown,
  win_rate,
  icon,
  color,
  default_params,
  param_definitions,
  min_capital,
  recommended_capital,
  supported_pairs,
  complexity,
  timeframe,
  is_active
) VALUES (
  'grid',
  'Grid',
  'Grid Trading',
  'Place buy and sell orders at preset intervals, profiting from price oscillations.',
  'Grid Trading creates a "grid" of buy and sell orders at predetermined price levels. When the price falls to a grid level, the bot buys. When it rises, it sells. This strategy profits from sideways markets and price oscillations, making small gains from frequent trades. Best suited for ranging markets with predictable support and resistance levels.',
  'medium',
  18.00, -- expected return (%)
  15.00, -- max drawdown (%)
  72.00, -- win rate (%)
  '🎯',
  'blue',
  '{
    "gridLevels": 10,
    "gridSpacing": 2.0,
    "upperPrice": 50000,
    "lowerPrice": 40000,
    "orderSize": 50
  }'::jsonb,
  '[
    {
      "key": "gridLevels",
      "label": "Number of Grid Levels",
      "type": "number",
      "description": "How many buy/sell levels in the grid",
      "defaultValue": 10,
      "min": 5,
      "max": 50,
      "step": 1,
      "required": true
    },
    {
      "key": "gridSpacing",
      "label": "Grid Spacing",
      "type": "percentage",
      "description": "Percentage distance between grid levels",
      "defaultValue": 2.0,
      "min": 0.5,
      "max": 10.0,
      "step": 0.5,
      "required": true
    },
    {
      "key": "orderSize",
      "label": "Order Size per Level",
      "type": "number",
      "description": "USDT to allocate per grid level",
      "defaultValue": 50,
      "min": 10,
      "max": 1000,
      "step": 10,
      "required": true
    }
  ]'::jsonb,
  500.00,  -- min capital
  2000.00, -- recommended capital
  ARRAY['BTC/USDT', 'ETH/USDT', 'BNB/USDT'],
  'intermediate',
  '1h',
  TRUE
) ON CONFLICT (type) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  long_description = EXCLUDED.long_description,
  risk = EXCLUDED.risk,
  expected_return = EXCLUDED.expected_return,
  max_drawdown = EXCLUDED.max_drawdown,
  win_rate = EXCLUDED.win_rate,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  default_params = EXCLUDED.default_params,
  param_definitions = EXCLUDED.param_definitions,
  min_capital = EXCLUDED.min_capital,
  recommended_capital = EXCLUDED.recommended_capital,
  supported_pairs = EXCLUDED.supported_pairs,
  complexity = EXCLUDED.complexity,
  timeframe = EXCLUDED.timeframe,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Strategy 3: Momentum
INSERT INTO strategies (
  type,
  name,
  full_name,
  description,
  long_description,
  risk,
  expected_return,
  max_drawdown,
  win_rate,
  icon,
  color,
  default_params,
  param_definitions,
  min_capital,
  recommended_capital,
  supported_pairs,
  complexity,
  timeframe,
  is_active
) VALUES (
  'momentum',
  'Momentum',
  'Momentum Trading',
  'Follow strong price trends, buying during uptrends and selling in downtrends.',
  'Momentum Trading capitalizes on strong price movements by identifying and following trends. The strategy uses technical indicators like RSI (Relative Strength Index) and moving averages to detect when an asset is gaining momentum. It buys during confirmed uptrends and sells when momentum weakens. This approach works best in trending markets with clear directional movement.',
  'high',
  25.00, -- expected return (%)
  22.00, -- max drawdown (%)
  58.00, -- win rate (%)
  '🚀',
  'purple',
  '{
    "rsiPeriod": 14,
    "rsiBuyThreshold": 30,
    "rsiSellThreshold": 70,
    "maShortPeriod": 10,
    "maLongPeriod": 50,
    "trendStrengthThreshold": 5
  }'::jsonb,
  '[
    {
      "key": "rsiPeriod",
      "label": "RSI Period",
      "type": "number",
      "description": "Number of periods for RSI calculation",
      "defaultValue": 14,
      "min": 7,
      "max": 30,
      "step": 1,
      "required": true
    },
    {
      "key": "rsiBuyThreshold",
      "label": "RSI Buy Threshold",
      "type": "number",
      "description": "RSI level to trigger buy (oversold)",
      "defaultValue": 30,
      "min": 20,
      "max": 40,
      "step": 5,
      "required": true
    },
    {
      "key": "rsiSellThreshold",
      "label": "RSI Sell Threshold",
      "type": "number",
      "description": "RSI level to trigger sell (overbought)",
      "defaultValue": 70,
      "min": 60,
      "max": 80,
      "step": 5,
      "required": true
    }
  ]'::jsonb,
  300.00,  -- min capital
  1000.00, -- recommended capital
  ARRAY['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'AVAX/USDT'],
  'advanced',
  '4h',
  TRUE
) ON CONFLICT (type) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  long_description = EXCLUDED.long_description,
  risk = EXCLUDED.risk,
  expected_return = EXCLUDED.expected_return,
  max_drawdown = EXCLUDED.max_drawdown,
  win_rate = EXCLUDED.win_rate,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  default_params = EXCLUDED.default_params,
  param_definitions = EXCLUDED.param_definitions,
  min_capital = EXCLUDED.min_capital,
  recommended_capital = EXCLUDED.recommended_capital,
  supported_pairs = EXCLUDED.supported_pairs,
  complexity = EXCLUDED.complexity,
  timeframe = EXCLUDED.timeframe,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Strategy 4: Mean Reversion
INSERT INTO strategies (
  type,
  name,
  full_name,
  description,
  long_description,
  risk,
  expected_return,
  max_drawdown,
  win_rate,
  icon,
  color,
  default_params,
  param_definitions,
  min_capital,
  recommended_capital,
  supported_pairs,
  complexity,
  timeframe,
  is_active
) VALUES (
  'mean-reversion',
  'Mean Reversion',
  'Mean Reversion Trading',
  'Buy when price drops below average, sell when it rises above, expecting reversion to mean.',
  'Mean Reversion is based on the principle that prices tend to return to their average over time. The strategy identifies when an asset is oversold (below its average) and buys, then sells when it becomes overbought (above average). It uses Bollinger Bands and moving averages to determine entry and exit points. Works best in stable, range-bound markets.',
  'medium',
  16.00, -- expected return (%)
  12.00, -- max drawdown (%)
  68.00, -- win rate (%)
  '⚖️',
  'orange',
  '{
    "bollingerPeriod": 20,
    "bollingerStdDev": 2,
    "maPeriod": 20,
    "buyDeviationThreshold": -2,
    "sellDeviationThreshold": 2
  }'::jsonb,
  '[
    {
      "key": "bollingerPeriod",
      "label": "Bollinger Period",
      "type": "number",
      "description": "Number of periods for Bollinger Bands",
      "defaultValue": 20,
      "min": 10,
      "max": 50,
      "step": 5,
      "required": true
    },
    {
      "key": "bollingerStdDev",
      "label": "Standard Deviations",
      "type": "number",
      "description": "Number of standard deviations for bands",
      "defaultValue": 2,
      "min": 1,
      "max": 3,
      "step": 0.5,
      "required": true
    },
    {
      "key": "buyDeviationThreshold",
      "label": "Buy Deviation Threshold",
      "type": "number",
      "description": "How many std devs below mean to buy",
      "defaultValue": -2,
      "min": -3,
      "max": -1,
      "step": 0.5,
      "required": true
    }
  ]'::jsonb,
  250.00,  -- min capital
  800.00,  -- recommended capital
  ARRAY['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'MATIC/USDT'],
  'intermediate',
  '1h',
  TRUE
) ON CONFLICT (type) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  long_description = EXCLUDED.long_description,
  risk = EXCLUDED.risk,
  expected_return = EXCLUDED.expected_return,
  max_drawdown = EXCLUDED.max_drawdown,
  win_rate = EXCLUDED.win_rate,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  default_params = EXCLUDED.default_params,
  param_definitions = EXCLUDED.param_definitions,
  min_capital = EXCLUDED.min_capital,
  recommended_capital = EXCLUDED.recommended_capital,
  supported_pairs = EXCLUDED.supported_pairs,
  complexity = EXCLUDED.complexity,
  timeframe = EXCLUDED.timeframe,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Verify seeded data
DO $$
DECLARE
  strategy_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO strategy_count FROM strategies WHERE is_active = TRUE;

  IF strategy_count = 4 THEN
    RAISE NOTICE 'Successfully seeded 4 strategy templates';
  ELSE
    RAISE WARNING 'Expected 4 strategies, found %', strategy_count;
  END IF;
END $$;

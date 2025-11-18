-- Migration: Allow Manual Trades
-- Description: Modify trades table to allow NULL bot_id for manual paper trades
-- Date: 2025-11-18

-- Drop the existing foreign key constraint
ALTER TABLE trades
  DROP CONSTRAINT IF EXISTS trades_bot_id_fkey;

-- Modify bot_id to allow NULL
ALTER TABLE trades
  ALTER COLUMN bot_id DROP NOT NULL;

-- Re-add foreign key constraint (still valid when bot_id is present)
ALTER TABLE trades
  ADD CONSTRAINT trades_bot_id_fkey
  FOREIGN KEY (bot_id)
  REFERENCES bots(id)
  ON DELETE CASCADE;

-- Add index for manual trades (where bot_id is NULL)
CREATE INDEX IF NOT EXISTS idx_trades_manual
  ON trades(user_id, executed_at DESC)
  WHERE bot_id IS NULL;

-- Add RLS policy for inserting manual trades
CREATE POLICY "Users can insert their own manual trades"
  ON trades
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Comment for documentation
COMMENT ON COLUMN trades.bot_id IS 'References the bot that made this trade. NULL for manual trades.';

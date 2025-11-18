-- =====================================================
-- Migration: Extend profiles table for TradingBot
-- Description: Add paper trading balance and AI usage tracking
-- =====================================================

-- Extend the existing profiles table with TradingBot-specific columns
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS paper_balance DECIMAL(15, 2) DEFAULT 10000.00 NOT NULL,
ADD COLUMN IF NOT EXISTS paper_balance_allocated DECIMAL(15, 2) DEFAULT 0.00 NOT NULL,
ADD COLUMN IF NOT EXISTS ai_conversations_used INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS ai_conversations_limit INTEGER DEFAULT 3 NOT NULL,
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'starter' NOT NULL CHECK (subscription_tier IN ('starter', 'pro', 'enterprise')),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL;

-- Add constraints (only if they don't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_paper_balance_positive') THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_paper_balance_positive CHECK (paper_balance >= 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_paper_balance_allocated_positive') THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_paper_balance_allocated_positive CHECK (paper_balance_allocated >= 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_paper_balance_allocated_lte_balance') THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_paper_balance_allocated_lte_balance CHECK (paper_balance_allocated <= paper_balance);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_ai_conversations_used_nonnegative') THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_ai_conversations_used_nonnegative CHECK (ai_conversations_used >= 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_ai_conversations_limit_positive') THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_ai_conversations_limit_positive CHECK (ai_conversations_limit > 0);
  END IF;
END $$;

-- Create index for subscription tier queries
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_tier ON profiles(subscription_tier);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
-- Users can only read/update their own profile
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Comment
COMMENT ON COLUMN profiles.paper_balance IS 'Virtual USDT balance for paper trading (starts at $10,000)';
COMMENT ON COLUMN profiles.paper_balance_allocated IS 'Amount of paper balance currently allocated to active bots';
COMMENT ON COLUMN profiles.ai_conversations_used IS 'Number of AI bot creation conversations used this month';
COMMENT ON COLUMN profiles.ai_conversations_limit IS 'Monthly limit for AI bot creation conversations (3 for starter, unlimited for pro)';
COMMENT ON COLUMN profiles.subscription_tier IS 'User subscription tier: starter (free), pro ($24/mo), enterprise ($99/mo)';

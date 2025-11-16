-- =====================================================
-- Migration: Create ai_conversations table
-- Description: AI-guided bot creation conversations
-- =====================================================

CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bot_id UUID REFERENCES bots(id) ON DELETE SET NULL, -- null until bot is created

  -- Conversation State
  current_step INTEGER DEFAULT 1 NOT NULL CHECK (current_step >= 1 AND current_step <= 5),
  is_complete BOOLEAN DEFAULT FALSE NOT NULL,

  -- User Inputs (collected during conversation)
  trading_goal TEXT,
  risk_tolerance TEXT CHECK (risk_tolerance IS NULL OR risk_tolerance IN ('low', 'medium', 'high')),
  capital_amount DECIMAL(15, 2) CHECK (capital_amount IS NULL OR capital_amount > 0),
  experience_level TEXT CHECK (experience_level IS NULL OR experience_level IN ('beginner', 'intermediate', 'advanced')),
  preferred_pairs TEXT[], -- e.g., ['BTC/USDT', 'ETH/USDT']

  -- AI Recommendations (generated after conversation)
  recommended_strategy TEXT CHECK (recommended_strategy IS NULL OR recommended_strategy IN ('dca', 'grid', 'momentum', 'mean-reversion')),
  recommended_params JSONB, -- JSON object with strategy-specific parameters

  -- Messages (stored as JSONB array)
  messages JSONB NOT NULL DEFAULT '[]', -- Array of {id, role, content, timestamp, quickReplies?, suggestedConfig?}

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT ai_conversations_complete_has_bot CHECK (
    (is_complete = FALSE) OR (is_complete = TRUE AND bot_id IS NOT NULL)
  )
);

-- Indexes
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_bot_id ON ai_conversations(bot_id) WHERE bot_id IS NOT NULL;
CREATE INDEX idx_ai_conversations_is_complete ON ai_conversations(is_complete);
CREATE INDEX idx_ai_conversations_user_id_created_at ON ai_conversations(user_id, created_at DESC);

-- Updated at trigger
CREATE TRIGGER update_ai_conversations_updated_at
  BEFORE UPDATE ON ai_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to set completed_at when conversation is marked complete
CREATE OR REPLACE FUNCTION set_ai_conversation_completed_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_complete = TRUE AND OLD.is_complete = FALSE THEN
    NEW.completed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ai_conversations_set_completed_at
  BEFORE UPDATE ON ai_conversations
  FOR EACH ROW
  EXECUTE FUNCTION set_ai_conversation_completed_at();

-- Enable Row Level Security
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_conversations
-- Users can only access their own conversations
CREATE POLICY "Users can view their own AI conversations"
  ON ai_conversations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI conversations"
  ON ai_conversations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI conversations"
  ON ai_conversations
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI conversations"
  ON ai_conversations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Comments
COMMENT ON TABLE ai_conversations IS 'AI-guided bot creation conversations using Claude API';
COMMENT ON COLUMN ai_conversations.current_step IS 'Current step in the 5-step AI conversation flow (1=Goal Discovery, 2=Risk Assessment, 3=Capital Allocation, 4=Strategy Recommendation, 5=Review & Deploy)';
COMMENT ON COLUMN ai_conversations.messages IS 'Array of conversation messages in JSONB format [{id, role, content, timestamp, quickReplies?, suggestedConfig?}]';
COMMENT ON COLUMN ai_conversations.recommended_strategy IS 'AI-recommended strategy type after conversation completes';
COMMENT ON COLUMN ai_conversations.recommended_params IS 'AI-recommended strategy parameters (JSON)';

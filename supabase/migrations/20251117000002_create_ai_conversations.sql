-- Create ai_conversations table for AI-guided bot creation
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  bot_id UUID REFERENCES bots,

  -- Conversation state
  current_step INTEGER NOT NULL DEFAULT 1,
  is_complete BOOLEAN DEFAULT FALSE,

  -- User profile (inferred during conversation)
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  trading_goal TEXT,
  risk_tolerance TEXT CHECK (risk_tolerance IN ('low', 'medium', 'high')),

  -- Bot configuration (builds during conversation)
  config JSONB NOT NULL DEFAULT '{}',
  trading_mode TEXT DEFAULT 'paper' CHECK (trading_mode IN ('paper', 'live')),

  -- Messages array
  messages JSONB NOT NULL DEFAULT '[]',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_is_complete ON ai_conversations(is_complete);
CREATE INDEX idx_ai_conversations_created_at ON ai_conversations(created_at DESC);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ai_conversations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ai_conversations_updated_at
  BEFORE UPDATE ON ai_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_conversations_updated_at();

-- Row Level Security
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- Users can only see their own conversations
CREATE POLICY "Users can view own conversations"
  ON ai_conversations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own conversations
CREATE POLICY "Users can create own conversations"
  ON ai_conversations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own conversations
CREATE POLICY "Users can update own conversations"
  ON ai_conversations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own conversations
CREATE POLICY "Users can delete own conversations"
  ON ai_conversations
  FOR DELETE
  USING (auth.uid() = user_id);

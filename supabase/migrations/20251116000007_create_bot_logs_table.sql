-- =====================================================
-- Migration: Create bot_logs table
-- Description: Execution logs, errors, and status changes for bots
-- =====================================================

CREATE TABLE IF NOT EXISTS bot_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- denormalized for quick user queries

  -- Log Details
  level TEXT NOT NULL CHECK (level IN ('info', 'warning', 'error', 'debug')),
  event_type TEXT NOT NULL CHECK (event_type IN (
    'bot_created',
    'bot_started',
    'bot_paused',
    'bot_stopped',
    'bot_error',
    'execution_started',
    'execution_completed',
    'execution_failed',
    'trade_executed',
    'risk_limit_hit',
    'balance_updated',
    'config_updated'
  )),
  message TEXT NOT NULL,

  -- Additional Context (JSONB for flexibility)
  metadata JSONB DEFAULT '{}',

  -- Error Details (if level = 'error')
  error_code TEXT,
  error_stack TEXT,

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_bot_logs_bot_id ON bot_logs(bot_id);
CREATE INDEX idx_bot_logs_user_id ON bot_logs(user_id);
CREATE INDEX idx_bot_logs_created_at ON bot_logs(created_at DESC);
CREATE INDEX idx_bot_logs_level ON bot_logs(level);
CREATE INDEX idx_bot_logs_event_type ON bot_logs(event_type);
CREATE INDEX idx_bot_logs_bot_id_created_at ON bot_logs(bot_id, created_at DESC);

-- Composite index for error queries
CREATE INDEX idx_bot_logs_errors ON bot_logs(bot_id, created_at DESC) WHERE level = 'error';

-- Partial index for recent logs (last 7 days) - most common query
CREATE INDEX idx_bot_logs_recent ON bot_logs(bot_id, created_at DESC)
  WHERE created_at > NOW() - INTERVAL '7 days';

-- Enable Row Level Security
ALTER TABLE bot_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bot_logs
-- Users can only access logs for their own bots
CREATE POLICY "Users can view their own bot logs"
  ON bot_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only bot executor (service role) can insert logs
-- Users cannot manually create logs
CREATE POLICY "Service role can insert bot logs"
  ON bot_logs
  FOR INSERT
  TO service_role
  WITH CHECK (TRUE);

-- Users cannot update or delete logs (immutable audit trail)
-- Only service role can delete (for cleanup/admin purposes)
CREATE POLICY "Service role can delete bot logs"
  ON bot_logs
  FOR DELETE
  TO service_role
  USING (TRUE);

-- Automatic cleanup function (delete logs older than 90 days)
-- This will be run via a scheduled job (pg_cron or Supabase Edge Function)
CREATE OR REPLACE FUNCTION cleanup_old_bot_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM bot_logs
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments
COMMENT ON TABLE bot_logs IS 'Execution logs, errors, and status changes for all bots. Immutable audit trail.';
COMMENT ON COLUMN bot_logs.user_id IS 'Denormalized from bots table for faster user-level queries';
COMMENT ON COLUMN bot_logs.level IS 'Log severity: info (normal operation), warning (potential issue), error (failure), debug (development)';
COMMENT ON COLUMN bot_logs.event_type IS 'Type of event that triggered this log entry';
COMMENT ON COLUMN bot_logs.metadata IS 'Additional context as JSON (e.g., trade details, config changes, error context)';
COMMENT ON COLUMN bot_logs.error_code IS 'Machine-readable error code (e.g., INSUFFICIENT_BALANCE, API_ERROR)';
COMMENT ON COLUMN bot_logs.error_stack IS 'Stack trace for debugging (only for error level)';
COMMENT ON FUNCTION cleanup_old_bot_logs IS 'Deletes bot logs older than 90 days to keep database size manageable';

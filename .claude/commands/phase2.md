# Phase 2: Bot Management & AI Creation

**Status:** 🔄 Ready to Start
**Timeline:** 2-3 weeks (2025-11-11 to 2025-12-02)
**Priority:** HIGH

This command provides Phase 2 specific implementation details and current progress.

## Quick Overview

Phase 2 focuses on enabling users to create and manage trading bots with AI assistance. This establishes the foundation for bot execution (Phase 3) by creating data models, UIs, and AI integration.

## Main Objectives

1. Enable bot creation in under 5 minutes
2. Provide dual paths: Templates + AI-assisted
3. Ensure all bots have mandatory risk controls
4. Build database foundation ready for Phase 3

## Current Progress: 0%

### Week 1: Database & AI Foundation (In Progress)

**Days 1-2: Database Design & Setup**
- [ ] Design complete schema (bots, risk_configs, strategies, bot_logs, ai_conversations)
- [ ] Write Supabase migrations (7 migration files)
- [ ] Set up Row Level Security (RLS) policies
- [ ] Seed 4 strategy templates (DCA, Grid, Momentum, Mean Reversion)
- [ ] Test locally and deploy

**Days 3-4: AI Integration**
- [ ] Set up Anthropic Claude API credentials
- [ ] Create `ai-strategy-recommender` Edge Function
- [ ] Design system prompts for bot creation
- [ ] Implement function calling for structured outputs
- [ ] Build frontend AI client and hooks

**Day 5: Bot Data Layer**
- [ ] Create TypeScript types (Bot, Strategy, RiskConfig)
- [ ] Build API routes for bot CRUD operations
- [ ] Set up error handling and validation

### Week 2: Bot Creation Flows

**Days 1-2: Template Path**
- [ ] Strategy selector UI with 4 template cards
- [ ] Configuration forms (trading pair, capital, strategy params)
- [ ] Risk management questionnaire
- [ ] Preview page before deployment

**Days 3-4: AI Path**
- [ ] AI chat interface component
- [ ] Conversation flow (goal discovery → recommendation → config)
- [ ] Live configuration preview
- [ ] Connect to Edge Function with streaming

**Day 5: Polish**
- [ ] UI polish and animations
- [ ] Error states and edge cases
- [ ] Mobile responsiveness
- [ ] Integration testing

### Week 3: Bot Management & Finalization

**Days 1-2: Bot Dashboard**
- [ ] Bot list/grid view with cards
- [ ] Filter by status and strategy
- [ ] Sort by name, P&L, date
- [ ] Status indicators (running/paused/stopped)

**Days 3-4: Bot Operations**
- [ ] Edit configuration flow
- [ ] Delete with confirmation modal
- [ ] Clone bot functionality
- [ ] Paper trading UI and balance display

**Day 5: Testing & Documentation**
- [ ] Full E2E testing
- [ ] Fix bugs
- [ ] Write user documentation
- [ ] Update progress tracking

## Database Schema (Phase 2)

### Tables to Create

```sql
-- profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  paper_trading_balance DECIMAL(20, 8) DEFAULT 10000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- bots
CREATE TABLE bots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  strategy_type TEXT NOT NULL, -- 'dca', 'grid', 'momentum', 'mean_reversion'
  trading_pair TEXT NOT NULL, -- 'BTC/USDT', 'ETH/USDT', etc.
  status TEXT NOT NULL DEFAULT 'stopped', -- 'running', 'paused', 'stopped', 'error'
  allocated_capital DECIMAL(20, 8) NOT NULL,
  current_value DECIMAL(20, 8) DEFAULT 0,
  is_paper_trading BOOLEAN DEFAULT true,
  strategy_config JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_executed_at TIMESTAMPTZ
);

-- risk_configs
CREATE TABLE risk_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID UNIQUE REFERENCES bots(id) ON DELETE CASCADE,
  stop_loss_percent DECIMAL(5, 2) NOT NULL,
  take_profit_percent DECIMAL(5, 2),
  max_position_size DECIMAL(20, 8) NOT NULL,
  max_daily_loss DECIMAL(20, 8),
  max_daily_trades INTEGER,
  volatility_threshold TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- strategies (pre-defined templates)
CREATE TABLE strategies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  default_config JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- bot_logs
CREATE TABLE bot_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  level TEXT NOT NULL, -- 'info', 'warning', 'error'
  message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ai_conversations (audit trail)
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  bot_id UUID REFERENCES bots(id) ON DELETE SET NULL,
  messages JSONB NOT NULL,
  result_config JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Strategy Templates

### 1. DCA (Dollar Cost Averaging)
**Description:** Buy fixed amounts at regular intervals, regardless of price.
**Best for:** Beginners, long-term investors, bear markets
**Risk Level:** Low

**Config Example:**
```json
{
  "type": "dca",
  "buy_amount_usd": 100,
  "buy_frequency_hours": 24,
  "total_investment_limit": 1000
}
```

### 2. Grid Trading
**Description:** Place buy/sell orders at predetermined price levels in a range.
**Best for:** Sideways markets, range-bound trading
**Risk Level:** Medium

**Config Example:**
```json
{
  "type": "grid",
  "price_range_min": 40000,
  "price_range_max": 50000,
  "grid_levels": 10,
  "amount_per_grid": 100
}
```

### 3. Momentum
**Description:** Trade based on price trend strength using technical indicators.
**Best for:** Trending markets, experienced traders
**Risk Level:** Medium-High

**Config Example:**
```json
{
  "type": "momentum",
  "ema_short_period": 12,
  "ema_long_period": 26,
  "rsi_period": 14,
  "rsi_overbought": 70,
  "rsi_oversold": 30
}
```

### 4. Mean Reversion
**Description:** Bet on prices returning to average levels.
**Best for:** Range-bound markets, statistical traders
**Risk Level:** Medium

**Config Example:**
```json
{
  "type": "mean_reversion",
  "sma_period": 20,
  "bollinger_std_dev": 2,
  "entry_threshold_percent": 2,
  "exit_threshold_percent": 0.5
}
```

## AI Integration Specs

### Edge Function: ai-strategy-recommender

**Location:** `supabase/functions/ai-strategy-recommender/index.ts`

**Responsibilities:**
1. Accept user messages and conversation history
2. Call Claude API with appropriate system prompts
3. Stream responses back to client
4. Return structured bot configurations using function calling

**System Prompt Structure:**

```typescript
// Goal Discovery
`You are an expert cryptocurrency trading assistant.
User Experience: {beginner|intermediate|advanced}
Task: Understand user's trading goals

Ask ONE clarifying question at a time. Focus on:
1. Risk tolerance
2. Time horizon
3. Trading experience
4. Capital available`

// Strategy Recommendation
`User Profile:
- Goals: {goals_summary}
- Risk: {low|medium|high}
- Experience: {level}

Recommend ONE of:
1. DCA - Best for beginners, low risk
2. Grid - Moderate risk, range-bound
3. Momentum - Higher risk, trending
4. Mean Reversion - Moderate risk

Explain in 2-3 sentences why it fits.`

// Parameter Configuration
`Helping configure a {strategy_type} bot.

Ask about ONE parameter at a time:
- Trading pair
- Capital allocation
- Strategy parameters

For each:
1. Explain what it means
2. Provide examples
3. Recommend safe default`
```

### API Endpoints to Create

```typescript
// Bot CRUD
POST   /api/bots           - Create new bot
GET    /api/bots           - List user's bots (with filters)
GET    /api/bots/[id]      - Get bot details
PATCH  /api/bots/[id]      - Update bot config
DELETE /api/bots/[id]      - Delete bot

// AI Interaction
POST   /api/ai/chat        - Send message to AI (streaming)
POST   /api/ai/recommend   - Get strategy recommendation
```

## UI Components to Build

### Bot Creation
- `components/bot/StrategySelector.tsx` - Template card grid
- `components/bot/TemplateConfig.tsx` - Configuration form
- `components/bot/RiskQuestionnaire.tsx` - Risk settings form
- `components/bot/BotPreview.tsx` - Final preview before deploy
- `components/bot/AIChat.tsx` - Chat interface with streaming

### Bot Management
- `components/bot/BotCard.tsx` - Individual bot display card
- `components/bot/BotList.tsx` - Grid/list view with filters
- `components/bot/BotControls.tsx` - Start/pause/stop/edit/delete
- `components/bot/DeleteBotModal.tsx` - Confirmation modal
- `components/PaperTradingBadge.tsx` - Paper trading indicator

## TypeScript Types

```typescript
// types/bot.ts
export type BotStatus = 'stopped' | 'running' | 'paused' | 'error'
export type StrategyType = 'dca' | 'grid' | 'momentum' | 'mean_reversion'

export interface Bot {
  id: string
  user_id: string
  name: string
  strategy_type: StrategyType
  trading_pair: string
  status: BotStatus
  allocated_capital: number
  current_value: number
  is_paper_trading: boolean
  strategy_config: Record<string, any>
  created_at: string
  updated_at: string
  last_executed_at: string | null
}

// types/risk.ts
export type RiskLevel = 'low' | 'medium' | 'high'

export interface RiskConfig {
  id: string
  bot_id: string
  stop_loss_percent: number
  take_profit_percent: number | null
  max_position_size: number
  max_daily_loss: number | null
  max_daily_trades: number | null
  volatility_threshold: string | null
  created_at: string
}

// types/strategy.ts
export interface Strategy {
  id: string
  name: string
  type: StrategyType
  description: string
  default_config: Record<string, any>
  is_active: boolean
  created_at: string
}

// types/ai.ts
export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface AIConversation {
  id: string
  user_id: string
  bot_id: string | null
  messages: AIMessage[]
  result_config: Record<string, any> | null
  created_at: string
}
```

## Testing Checklist

### Unit Tests
- [ ] StrategySelector component
- [ ] BotCard component
- [ ] RiskQuestionnaire validation
- [ ] AIChat message handling
- [ ] Bot CRUD API routes

### Integration Tests
- [ ] Template bot creation (end-to-end)
- [ ] AI bot creation (end-to-end)
- [ ] Bot configuration editing
- [ ] Bot deletion with cascade
- [ ] Filter and sort functionality

### E2E Tests (Playwright)
- [ ] New user creates first bot via template
- [ ] New user creates bot with AI
- [ ] User edits existing bot
- [ ] User deletes a bot
- [ ] User clones a bot
- [ ] Network error handling

## Success Criteria

**Functional:**
- ✅ Users can create bots via templates
- ✅ Users can create bots via AI
- ✅ All bots have mandatory risk controls
- ✅ Users can manage bots (edit, delete, clone)
- ✅ Paper trading balance tracked

**Quality:**
- ✅ Bot creation < 5 minutes
- ✅ 80%+ test user success rate
- ✅ AI recommendations are relevant and safe
- ✅ Mobile responsive
- ✅ All API routes have error handling

**UX:**
- ✅ Intuitive onboarding
- ✅ Helpful error messages
- ✅ Clear loading states
- ✅ Success feedback
- ✅ Help text available

## Blockers & Risks

**Potential Issues:**
- AI responses too slow → Use streaming, typing animation
- AI unsafe recommendations → Add validation layer, hard limits
- Database performance → Add indexes early, optimize queries
- Complex config overwhelms users → Progressive disclosure
- Users don't understand paper trading → Prominent explainer

## Quick Reference Links

- **Full Plan:** `progress/phase2-plan.md`
- **PRD Section:** `docs/PRD.md` (lines 1277-1351)
- **Database Schema:** `docs/PRD.md` (lines 932-1069)
- **Tracking:** `progress/tracking.md`

## Next Phase Preview

**Phase 3:** Strategy Execution & Live Trading
- Bot execution engine (Edge Functions + cron)
- Binance integration for real market data
- Trade simulator for paper trading
- Real-time P&L dashboard with WebSocket
- Risk monitoring and circuit breakers

---

**Phase Owner:** Solo Developer
**Started:** Not yet
**Target Completion:** 2025-12-02
**Dependencies:** Phase 1 Complete ✅

Use `/project` for overall context or `/docs` for specific documentation.

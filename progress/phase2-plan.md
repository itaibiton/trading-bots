# Phase 2: Bot Management & AI Creation - Detailed Plan

**Status:** 🔄 Ready to Start
**Timeline:** 2-3 weeks (2025-11-11 to 2025-12-02)
**Prerequisites:** Phase 1 Complete ✅

---

## Table of Contents

1. [Overview](#overview)
2. [Goals & Objectives](#goals--objectives)
3. [Deliverables Checklist](#deliverables-checklist)
4. [Database Schema Design](#database-schema-design)
5. [AI Integration](#ai-integration)
6. [Bot Creation Flows](#bot-creation-flows)
7. [Bot Management Dashboard](#bot-management-dashboard)
8. [Implementation Timeline](#implementation-timeline)
9. [Testing Strategy](#testing-strategy)
10. [Success Criteria](#success-criteria)

---

## Overview

Phase 2 focuses on enabling users to create and manage trading bots with AI assistance. This phase establishes the foundation for bot execution (Phase 3) by creating the data models, user interfaces, and AI integration needed for a smooth bot creation experience.

### Key Features

- **AI-Assisted Bot Creation:** Conversational setup with Claude
- **Quick Start Templates:** 4 pre-configured strategy templates
- **Bot Management:** Full CRUD operations for bots
- **Risk Management:** Comprehensive risk configuration system
- **Paper Trading:** Virtual trading environment

---

## Goals & Objectives

### Primary Goals

1. **Enable Bot Creation:** Users can create bots in under 5 minutes
2. **Provide Dual Paths:** Support both template and AI-assisted creation
3. **Ensure Safety:** All bots have mandatory risk controls
4. **Build Foundation:** Database and UI ready for Phase 3 execution

### Success Metrics

- 80%+ of test users successfully create a bot
- 70%+ complete bot creation flow without help
- Average creation time < 5 minutes
- 0 bots created without risk controls
- AI recommendations are relevant and safe

### Non-Goals (Deferred to Phase 3)

- ❌ Bot execution (coming in Phase 3)
- ❌ Real money trading
- ❌ Live market data
- ❌ Trade history and P&L (placeholders only)
- ❌ Backtesting

---

## Deliverables Checklist

### 1. Database Foundation

- [ ] **Database Schema Design**
  - [ ] Design `bots` table schema
  - [ ] Design `risk_configs` table schema
  - [ ] Design `strategies` table schema
  - [ ] Design `bot_logs` table schema
  - [ ] Design `profiles` table extension
  - [ ] Design `ai_conversations` table schema
  - [ ] Plan indexes for performance

- [ ] **Supabase Migrations**
  - [ ] Create migration: `001_create_profiles_table.sql`
  - [ ] Create migration: `002_create_bots_table.sql`
  - [ ] Create migration: `003_create_risk_configs_table.sql`
  - [ ] Create migration: `004_create_strategies_table.sql`
  - [ ] Create migration: `005_create_bot_logs_table.sql`
  - [ ] Create migration: `006_create_ai_conversations_table.sql`
  - [ ] Create migration: `007_setup_rls_policies.sql`
  - [ ] Test migrations on local Supabase

- [ ] **Seed Data**
  - [ ] Create seed script for strategy templates
  - [ ] Seed DCA strategy template
  - [ ] Seed Grid Trading strategy template
  - [ ] Seed Momentum strategy template
  - [ ] Seed Mean Reversion strategy template
  - [ ] Add default risk parameter suggestions

### 2. AI Integration

- [ ] **Claude API Setup**
  - [ ] Create Anthropic account
  - [ ] Generate API key
  - [ ] Add `ANTHROPIC_API_KEY` to environment
  - [ ] Test API connectivity
  - [ ] Set up rate limiting

- [ ] **Supabase Edge Function**
  - [ ] Create `supabase/functions/ai-strategy-recommender/index.ts`
  - [ ] Implement Claude API client
  - [ ] Design system prompts for strategy recommendation
  - [ ] Design prompts for parameter configuration
  - [ ] Implement function calling for structured output
  - [ ] Add error handling and fallbacks
  - [ ] Test Edge Function locally
  - [ ] Deploy to Supabase

- [ ] **Frontend AI Integration**
  - [ ] Create `lib/ai/client.ts` - AI API wrapper
  - [ ] Create `hooks/useAI.ts` - React hook for AI interactions
  - [ ] Implement streaming responses
  - [ ] Add conversation state management
  - [ ] Create AI response parser
  - [ ] Add loading and error states

- [ ] **Prompt Engineering**
  - [ ] Create prompt templates directory
  - [ ] Design goal discovery prompts
  - [ ] Design strategy recommendation prompts
  - [ ] Design parameter configuration prompts
  - [ ] Design risk settings prompts
  - [ ] Test prompts with various inputs
  - [ ] Document prompt patterns

### 3. Bot Creation - Template Path

- [ ] **Strategy Template Selector**
  - [ ] Create `/app/bots/create/page.tsx` - Main creation page
  - [ ] Create `components/bot/StrategySelector.tsx`
  - [ ] Design template cards with icons
  - [ ] Add strategy descriptions
  - [ ] Implement template selection
  - [ ] Add navigation to template details

- [ ] **Template Configuration**
  - [ ] Create `/app/bots/create/template/[type]/page.tsx`
  - [ ] Create `components/bot/TemplateConfig.tsx`
  - [ ] Build configuration form (trading pair, capital)
  - [ ] Add trading pair selector (BTC/USDT, ETH/USDT, etc.)
  - [ ] Add capital allocation input
  - [ ] Implement form validation
  - [ ] Show strategy-specific parameters

- [ ] **Risk Management Questionnaire**
  - [ ] Create `components/bot/RiskQuestionnaire.tsx`
  - [ ] Q1: Stop-loss percentage input
  - [ ] Q2: Take-profit percentage input (optional)
  - [ ] Q3: Daily loss limit input
  - [ ] Q4: Position sizing method selector
  - [ ] Q5: Volatility threshold selector
  - [ ] Add explanations for each question
  - [ ] Show risk level indicator
  - [ ] Validate risk parameters

- [ ] **Preview & Deployment**
  - [ ] Create `components/bot/BotPreview.tsx`
  - [ ] Show complete bot configuration
  - [ ] Highlight risk settings prominently
  - [ ] Add "Edit" option for each section
  - [ ] Create "Deploy Bot" button
  - [ ] Show paper trading badge
  - [ ] Add success confirmation
  - [ ] Navigate to dashboard on success

### 4. Bot Creation - AI Path

- [ ] **AI Chat Interface**
  - [ ] Create `/app/bots/create/ai/page.tsx`
  - [ ] Create `components/bot/AIChat.tsx`
  - [ ] Design chat UI (messages, input)
  - [ ] Add message bubbles (user/assistant)
  - [ ] Implement streaming message display
  - [ ] Add loading indicators
  - [ ] Show typing animation

- [ ] **Conversation Flow**
  - [ ] Implement goal discovery conversation
  - [ ] Handle strategy recommendation step
  - [ ] Handle parameter configuration step
  - [ ] Handle risk settings step
  - [ ] Add conversation state machine
  - [ ] Allow going back to previous steps
  - [ ] Handle conversation errors gracefully

- [ ] **Configuration Preview**
  - [ ] Show bot config as AI builds it
  - [ ] Live update configuration card
  - [ ] Allow manual editing of AI suggestions
  - [ ] Validate configuration completeness
  - [ ] Show warnings for risky settings

- [ ] **Deployment**
  - [ ] Final preview page (same as template path)
  - [ ] Save AI conversation to database
  - [ ] Create bot with AI-generated config
  - [ ] Show success and next steps
  - [ ] Add option to create another bot

### 5. Bot Management Dashboard

- [ ] **Bot List View**
  - [ ] Create `/app/dashboard/bots/page.tsx`
  - [ ] Create `components/bot/BotCard.tsx`
  - [ ] Show bot name, strategy type, status
  - [ ] Display P&L (placeholder: $0.00)
  - [ ] Show win rate (placeholder: 0%)
  - [ ] Display allocated capital
  - [ ] Show risk level indicator
  - [ ] Add last activity timestamp

- [ ] **Bot Status Indicators**
  - [ ] Design status badges (Running/Paused/Stopped/Error)
  - [ ] Add color coding (green/yellow/gray/red)
  - [ ] Show status icon
  - [ ] Add status change animations

- [ ] **Bot Controls**
  - [ ] Create `components/bot/BotControls.tsx`
  - [ ] Add "Start" button (disabled for now - Phase 3)
  - [ ] Add "Pause" button (disabled for now)
  - [ ] Add "Stop" button (disabled for now)
  - [ ] Add "Settings" button → Edit configuration
  - [ ] Add "Details" button → Bot details page
  - [ ] Add "Delete" button with confirmation modal

- [ ] **Edit Configuration**
  - [ ] Create `/app/bots/[id]/edit/page.tsx`
  - [ ] Load existing bot configuration
  - [ ] Show editable form (similar to creation)
  - [ ] Allow editing all parameters
  - [ ] Validate changes
  - [ ] Save updated configuration
  - [ ] Show success message

- [ ] **Delete Confirmation**
  - [ ] Create `components/bot/DeleteBotModal.tsx`
  - [ ] Show warning about deletion
  - [ ] Require typing bot name for confirmation
  - [ ] Delete bot from database
  - [ ] Update UI optimistically
  - [ ] Show success toast

- [ ] **Clone Bot**
  - [ ] Add "Clone" button to bot card
  - [ ] Copy bot configuration
  - [ ] Open creation flow with pre-filled data
  - [ ] Allow modifications before saving
  - [ ] Create new bot with cloned config

- [ ] **Filter & Sort**
  - [ ] Add filter dropdown (Status, Strategy Type)
  - [ ] Add sort dropdown (Name, P&L, Created Date)
  - [ ] Add search input (search by name)
  - [ ] Implement client-side filtering
  - [ ] Persist filter/sort preferences

### 6. Paper Trading Setup

- [ ] **Database Extension**
  - [ ] Add `paper_trading_balance` to profiles table
  - [ ] Set default balance to $10,000
  - [ ] Create balance initialization logic

- [ ] **UI Components**
  - [ ] Create `components/PaperTradingBadge.tsx`
  - [ ] Show badge on all bot cards
  - [ ] Add balance display in dashboard
  - [ ] Create explainer tooltip
  - [ ] Link to paper trading documentation

- [ ] **Account Management**
  - [ ] Show total paper trading balance
  - [ ] Show allocated vs available capital
  - [ ] Add "Reset Balance" option (admin only)
  - [ ] Track balance across all bots

### 7. TypeScript Types

- [ ] **Create Type Definitions**
  - [ ] `types/bot.ts` - Bot, BotStatus, BotConfig
  - [ ] `types/strategy.ts` - Strategy, StrategyType, StrategyConfig
  - [ ] `types/risk.ts` - RiskConfig, RiskLevel
  - [ ] `types/ai.ts` - AIMessage, AIConversation
  - [ ] Export all types from `types/index.ts`

### 8. API Routes

- [ ] **Bot CRUD Operations**
  - [ ] Create `app/api/bots/route.ts`
    - [ ] POST - Create new bot
    - [ ] GET - List user's bots
  - [ ] Create `app/api/bots/[id]/route.ts`
    - [ ] GET - Get bot details
    - [ ] PATCH - Update bot configuration
    - [ ] DELETE - Delete bot
  - [ ] Add error handling
  - [ ] Add input validation
  - [ ] Add rate limiting

- [ ] **AI Endpoints**
  - [ ] Create `app/api/ai/chat/route.ts`
    - [ ] POST - Send message to AI
    - [ ] Handle streaming responses
    - [ ] Save conversation history
  - [ ] Create `app/api/ai/recommend/route.ts`
    - [ ] POST - Get strategy recommendation
    - [ ] Return structured data

### 9. Documentation

- [ ] **User Documentation**
  - [ ] Create `docs/bot-creation-guide.md`
  - [ ] Create `docs/risk-management-guide.md`
  - [ ] Create `docs/strategy-templates.md`
  - [ ] Add inline help tooltips
  - [ ] Create video tutorial (optional)

- [ ] **Developer Documentation**
  - [ ] Document database schema in detail
  - [ ] Document AI prompt patterns
  - [ ] Document API endpoints
  - [ ] Add JSDoc comments to components
  - [ ] Update README with Phase 2 progress

---

## Database Schema Design

### Tables Overview

```
profiles (extends auth.users)
├─ id (UUID, FK to auth.users)
├─ display_name (TEXT)
├─ paper_trading_balance (DECIMAL)
├─ created_at (TIMESTAMPTZ)
└─ updated_at (TIMESTAMPTZ)

bots
├─ id (UUID, PK)
├─ user_id (UUID, FK to auth.users)
├─ name (TEXT)
├─ strategy_type (TEXT: 'dca', 'grid', 'momentum', 'mean_reversion')
├─ trading_pair (TEXT: 'BTC/USDT', etc.)
├─ status (TEXT: 'stopped', 'running', 'paused', 'error')
├─ allocated_capital (DECIMAL)
├─ current_value (DECIMAL)
├─ is_paper_trading (BOOLEAN, default true)
├─ strategy_config (JSONB) - Strategy-specific parameters
├─ created_at (TIMESTAMPTZ)
├─ updated_at (TIMESTAMPTZ)
└─ last_executed_at (TIMESTAMPTZ)

risk_configs
├─ id (UUID, PK)
├─ bot_id (UUID, FK to bots, UNIQUE)
├─ stop_loss_percent (DECIMAL)
├─ take_profit_percent (DECIMAL, nullable)
├─ max_position_size (DECIMAL)
├─ max_daily_loss (DECIMAL, nullable)
├─ max_daily_trades (INTEGER, nullable)
├─ volatility_threshold (TEXT: 'low', 'medium', 'high', nullable)
└─ created_at (TIMESTAMPTZ)

strategies (templates)
├─ id (UUID, PK)
├─ name (TEXT)
├─ type (TEXT: 'dca', 'grid', 'momentum', 'mean_reversion')
├─ description (TEXT)
├─ default_config (JSONB)
├─ is_active (BOOLEAN, default true)
└─ created_at (TIMESTAMPTZ)

bot_logs
├─ id (UUID, PK)
├─ bot_id (UUID, FK to bots)
├─ level (TEXT: 'info', 'warning', 'error')
├─ message (TEXT)
├─ metadata (JSONB)
└─ created_at (TIMESTAMPTZ)

ai_conversations
├─ id (UUID, PK)
├─ user_id (UUID, FK to auth.users)
├─ bot_id (UUID, FK to bots, nullable)
├─ messages (JSONB) - Array of {role, content}
├─ result_config (JSONB, nullable)
└─ created_at (TIMESTAMPTZ)
```

### Strategy Config Examples

**DCA (Dollar Cost Averaging):**
```json
{
  "type": "dca",
  "buy_amount_usd": 100,
  "buy_frequency_hours": 24,
  "total_investment_limit": 1000
}
```

**Grid Trading:**
```json
{
  "type": "grid",
  "price_range_min": 40000,
  "price_range_max": 50000,
  "grid_levels": 10,
  "amount_per_grid": 100
}
```

**Momentum:**
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

**Mean Reversion:**
```json
{
  "type": "mean_reversion",
  "sma_period": 20,
  "bollinger_std_dev": 2,
  "entry_threshold_percent": 2,
  "exit_threshold_percent": 0.5
}
```

---

## AI Integration

### Edge Function Structure

```typescript
// supabase/functions/ai-strategy-recommender/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Anthropic from '@anthropic-ai/sdk'

serve(async (req) => {
  // Get request body
  const { messages, task } = await req.json()

  // Initialize Claude client
  const anthropic = new Anthropic({
    apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
  })

  // Build system prompt based on task
  const systemPrompt = buildSystemPrompt(task)

  // Call Claude API with streaming
  const stream = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages,
    stream: true,
  })

  // Stream response back to client
  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(JSON.stringify(chunk) + '\n')
        }
        controller.close()
      },
    }),
    {
      headers: { 'Content-Type': 'text/event-stream' },
    }
  )
})
```

### System Prompt Templates

**Goal Discovery:**
```
You are an expert cryptocurrency trading assistant helping users create trading bots.

User Experience Level: {beginner|intermediate|advanced}
Current Task: Understand user's trading goals

Ask ONE clarifying question at a time. Be conversational and friendly.
Focus on understanding:
1. Risk tolerance
2. Time horizon
3. Trading experience
4. Capital available

Based on their answers, recommend a suitable strategy.
```

**Strategy Recommendation:**
```
You are recommending a trading strategy to the user.

User Profile:
- Goals: {goals_summary}
- Risk Tolerance: {low|medium|high}
- Experience: {beginner|intermediate|advanced}

Available Strategies:
1. DCA (Dollar Cost Averaging) - Best for beginners, low risk
2. Grid Trading - Moderate risk, range-bound markets
3. Momentum - Higher risk, trending markets
4. Mean Reversion - Moderate risk, requires monitoring

Recommend ONE strategy and explain why it fits their profile.
Use simple language. Explain the strategy in 2-3 sentences.
```

**Parameter Configuration:**
```
You are helping configure a {strategy_type} trading bot.

Ask about ONE parameter at a time:
- Trading pair (BTC/USDT, ETH/USDT, etc.)
- Capital allocation ($ amount)
- Strategy-specific parameters

For each parameter:
1. Explain what it means
2. Provide example values
3. Recommend a safe default for their experience level

Validate their input. If out of safe range, suggest correction.
```

---

## Bot Creation Flows

### Template Path (5-7 Steps)

1. **Strategy Selection**
   - Show 4 strategy cards
   - Each with icon, name, description
   - Click to select

2. **Strategy Overview**
   - Detailed explanation
   - Use cases and examples
   - Visual diagram (optional)
   - "Configure Bot" CTA

3. **Basic Configuration**
   - Bot name input
   - Trading pair selector
   - Capital allocation input
   - Strategy-specific parameters

4. **Risk Management**
   - Stop-loss percentage
   - Take-profit percentage (optional)
   - Position sizing method
   - Daily loss limit
   - Show risk level indicator

5. **Advanced Settings (Optional)**
   - Volatility filters
   - Trading hours
   - Max daily trades
   - "Use defaults" option

6. **Preview**
   - Complete configuration summary
   - Edit buttons for each section
   - Risk warning prominent
   - Paper trading badge

7. **Deployment**
   - Create bot in database
   - Show success message
   - "Go to Dashboard" or "Create Another Bot"

### AI Path (Conversational)

1. **Welcome**
   - "Hi! I'll help you create a trading bot."
   - "What are your main trading goals?"

2. **Goal Discovery (2-3 questions)**
   - User describes goals in natural language
   - AI asks follow-up questions
   - AI identifies risk tolerance and experience

3. **Strategy Recommendation**
   - AI suggests best strategy
   - Explains why it's a good fit
   - User can accept or ask for alternatives

4. **Configuration Conversation**
   - AI asks about each parameter
   - Provides context and examples
   - Validates input
   - Shows live config preview on side

5. **Risk Settings Conversation**
   - AI asks about risk tolerance
   - Recommends safe defaults
   - Explains each control
   - User can adjust

6. **Preview & Edit**
   - Show complete configuration
   - Allow manual edits
   - "Looks good" or "Make changes"

7. **Deployment**
   - Same as template path
   - Save AI conversation for audit

---

## Bot Management Dashboard

### Layout

```
┌─────────────────────────────────────────────────┐
│  Dashboard Header                               │
│  ┌──────────┐  ┌──────────┐                    │
│  │ Balance  │  │ Allocated│   [Create Bot] ←   │
│  └──────────┘  └──────────┘                    │
├─────────────────────────────────────────────────┤
│  Filters & Sort                                 │
│  [All Statuses ▼] [All Strategies ▼] [Sort ▼]  │
│  [Search bots...]                               │
├─────────────────────────────────────────────────┤
│  Bot Grid (Responsive)                          │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ Bot Card 1   │  │ Bot Card 2   │            │
│  │ [Details]    │  │ [Details]    │            │
│  └──────────────┘  └──────────────┘            │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ Bot Card 3   │  │ Bot Card 4   │            │
│  └──────────────┘  └──────────────┘            │
└─────────────────────────────────────────────────┘
```

### Bot Card Details

```
┌─────────────────────────────────────┐
│ 🤖 DCA Bitcoin Bot        📄 Paper  │
│ Strategy: DCA · BTC/USDT            │
│─────────────────────────────────────│
│ Status: ● Stopped                   │
│                                     │
│ P&L: $0.00 (0.00%)                 │
│ Win Rate: 0% (0/0 trades)          │
│                                     │
│ Capital: $1,000                     │
│ Risk: ◐ Medium                      │
│                                     │
│ Created: 2 hours ago                │
│─────────────────────────────────────│
│ [▶ Start] [⚙ Settings] [📊 Details] │
│ [📋 Clone] [🗑 Delete]               │
└─────────────────────────────────────┘
```

---

## Implementation Timeline

### Week 1: Database & AI Foundation

**Days 1-2: Database Design & Setup**
- [ ] Design complete schema
- [ ] Write all migrations
- [ ] Test locally
- [ ] Deploy to Supabase
- [ ] Seed strategy templates

**Days 3-4: AI Integration**
- [ ] Set up Claude API
- [ ] Create Edge Function
- [ ] Design prompts
- [ ] Test AI responses
- [ ] Build frontend AI client

**Day 5: Bot Data Layer**
- [ ] Create TypeScript types
- [ ] Build API routes for CRUD
- [ ] Test API endpoints
- [ ] Set up error handling

### Week 2: Bot Creation Flows

**Days 1-2: Template Path**
- [ ] Strategy selector UI
- [ ] Configuration forms
- [ ] Risk questionnaire
- [ ] Preview page
- [ ] End-to-end test

**Days 3-4: AI Path**
- [ ] AI chat interface
- [ ] Conversation flow
- [ ] Live config preview
- [ ] Connect to Edge Function
- [ ] End-to-end test

**Day 5: Polish & Testing**
- [ ] UI polish and animations
- [ ] Error states and edge cases
- [ ] Mobile responsiveness
- [ ] Integration testing

### Week 3: Bot Management & Finalization

**Days 1-2: Bot Dashboard**
- [ ] Bot list/grid view
- [ ] Bot cards with all data
- [ ] Filter and sort
- [ ] Status indicators

**Days 3-4: Bot Operations**
- [ ] Edit configuration flow
- [ ] Delete with confirmation
- [ ] Clone bot
- [ ] Paper trading UI

**Day 5: Testing & Documentation**
- [ ] Full E2E testing
- [ ] Fix bugs
- [ ] Write documentation
- [ ] Update progress tracking

---

## Testing Strategy

### Unit Tests

**Components to Test:**
- [ ] `StrategySelector` - Template selection logic
- [ ] `BotCard` - Rendering and status display
- [ ] `RiskQuestionnaire` - Form validation
- [ ] `AIChat` - Message handling
- [ ] Utility functions (formatters, validators)

**API Routes to Test:**
- [ ] POST /api/bots - Bot creation validation
- [ ] GET /api/bots - Filtering and sorting
- [ ] PATCH /api/bots/[id] - Update validation
- [ ] DELETE /api/bots/[id] - Deletion logic

### Integration Tests

**Flows to Test:**
- [ ] Template bot creation (end-to-end)
- [ ] AI bot creation (end-to-end)
- [ ] Bot configuration editing
- [ ] Bot deletion
- [ ] Filter and sort functionality

**Database Tests:**
- [ ] RLS policies (users can only access own bots)
- [ ] Foreign key constraints
- [ ] Data validation
- [ ] Cascade deletions

### E2E Tests (Playwright)

**User Journeys:**
- [ ] New user creates first bot via template
- [ ] New user creates bot with AI assistant
- [ ] User edits existing bot configuration
- [ ] User deletes a bot
- [ ] User clones a bot
- [ ] User filters and sorts bot list

**Edge Cases:**
- [ ] Network errors during bot creation
- [ ] AI API timeout handling
- [ ] Invalid configuration submission
- [ ] Concurrent bot operations
- [ ] Browser refresh during creation

### Manual Testing Checklist

**UI/UX:**
- [ ] All buttons have hover states
- [ ] Forms show validation errors clearly
- [ ] Loading states are visible
- [ ] Success messages appear
- [ ] Mobile responsive on all screens
- [ ] Tooltips work correctly
- [ ] Modals can be closed

**AI Experience:**
- [ ] AI responses make sense
- [ ] AI handles unclear input gracefully
- [ ] Configuration preview updates correctly
- [ ] Can go back in conversation
- [ ] AI errors show user-friendly messages

**Bot Management:**
- [ ] Bot cards display all data correctly
- [ ] Filters work as expected
- [ ] Sort works correctly
- [ ] Search finds bots by name
- [ ] Status badges show correct colors
- [ ] Risk indicators are accurate

---

## Success Criteria

### Functional Requirements

- ✅ Users can create bots via templates
- ✅ Users can create bots via AI conversation
- ✅ All bots have mandatory risk controls
- ✅ Users can view all their bots in dashboard
- ✅ Users can edit bot configurations
- ✅ Users can delete bots
- ✅ Users can clone bots
- ✅ Bot data is stored securely in database
- ✅ Paper trading balance is tracked

### Quality Requirements

- ✅ Bot creation takes < 5 minutes
- ✅ 80%+ test user success rate
- ✅ AI recommendations are relevant
- ✅ No bots created without risk controls
- ✅ Mobile responsive design
- ✅ All API routes have error handling
- ✅ Database queries are optimized (< 100ms)

### User Experience Requirements

- ✅ Onboarding flow is intuitive
- ✅ Error messages are helpful
- ✅ Loading states prevent confusion
- ✅ Success feedback is clear
- ✅ Help text is available where needed
- ✅ UI is consistent with Phase 1 design

### Technical Requirements

- ✅ All TypeScript with no `any` types
- ✅ Components follow React best practices
- ✅ RLS policies prevent data leaks
- ✅ All user input is validated
- ✅ API routes have rate limiting
- ✅ Code is well-documented
- ✅ Tests cover critical paths

---

## Risk Mitigation

### Potential Issues & Solutions

**Issue:** AI responses are too slow
- **Solution:** Implement streaming, show typing animation
- **Fallback:** Offer template-only mode

**Issue:** AI recommendations are unsafe
- **Solution:** Add validation layer, hard-code safe ranges
- **Fallback:** Override with conservative defaults

**Issue:** Database performance issues
- **Solution:** Add indexes early, optimize queries
- **Fallback:** Limit number of bots per user

**Issue:** Complex configuration overwhelms users
- **Solution:** Use progressive disclosure, hide advanced options
- **Fallback:** Simplify to essential parameters only

**Issue:** Users don't understand paper trading
- **Solution:** Add prominent explainer, onboarding tutorial
- **Fallback:** Show modal on first bot creation

---

## Next Steps After Phase 2

Once Phase 2 is complete:

1. **Validate with Users**
   - Recruit 10-20 beta testers
   - Gather feedback on creation flows
   - Identify pain points
   - Iterate on UX issues

2. **Begin Phase 3 Planning**
   - Design bot execution engine
   - Plan Binance integration
   - Define trade simulation logic
   - Update Phase 3 plan document

3. **Continuous Improvement**
   - Monitor AI costs
   - Track bot creation metrics
   - Fix bugs reported by testers
   - Optimize performance bottlenecks

---

## Resources & References

- [Phase 1 Summary](phase1-summary.md)
- [PRD](../docs/PRD.md)
- [MVP Roadmap](../MVP.md)
- [Test Plan](../tests/TEST_PLAN.md)
- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Anthropic Claude API](https://docs.anthropic.com/claude/reference)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

**Phase Owner:** Solo Developer
**Start Date:** 2025-11-11
**Target Completion:** 2025-12-02
**Status:** Ready to Begin 🚀

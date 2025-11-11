# Test Coverage Checklist

**Last Updated:** 2025-11-11
**Overall Coverage:** Phase 1: 100% | Phase 2: 0% | Phase 3: 0%

---

## How to Use This Checklist

1. **Mark tests as you write them:** Change `[ ]` to `[x]` when test is written and passing
2. **Update after each feature:** When adding a feature, add corresponding test items
3. **Review weekly:** Check for gaps in coverage
4. **Link to test files:** Add file paths for easy navigation

**Legend:**
- `[ ]` Not Started
- `[x]` Complete and Passing
- `[⚠]` Written but Failing (needs fix)
- `[~]` Partially Complete
- `[-]` Skipped / Not Applicable

---

## Phase 1: Authentication & Foundation ✅

### Unit Tests

**Auth Components:**
- [x] `components/auth/Login.tsx` - Form validation
  - [x] Email validation
  - [x] Password minimum length
  - [x] Error message display
  - [x] Loading states
- [x] `components/auth/Signup.tsx` - Registration logic
  - [x] Password confirmation matching
  - [x] 8-character minimum enforcement
  - [x] Error handling
- [x] `components/auth/ForgotPassword.tsx` - Password reset request
  - [x] Email validation
  - [x] Success message display
- [x] `components/auth/ResetPassword.tsx` - Password reset confirmation
  - [x] Password matching validation
  - [x] Minimum length check

**Auth Context:**
- [x] `contexts/AuthProvider.tsx` - Auth state management
  - [x] User session initialization
  - [x] Sign up functionality
  - [x] Sign in functionality
  - [x] Sign out functionality
  - [x] Password reset flow
  - [x] Auth state listener

**Utils:**
- [x] Form validation helpers
- [x] Error message formatters

### Integration Tests

**Supabase Auth:**
- [x] Sign up with email/password
- [x] Sign in with email/password
- [x] Sign out
- [x] Password reset request
- [x] Password reset confirmation
- [x] Session persistence across page refresh
- [x] Invalid credentials handling

**Middleware:**
- [x] Protected route redirection
- [x] Auth page redirection when logged in
- [x] `redirectTo` parameter preservation

### E2E Tests

**Auth Flows:**
- [x] Complete signup journey (signup → dashboard)
- [x] Complete login journey (login → dashboard)
- [x] Complete password reset journey
- [x] Protected route redirection (unauthenticated)
- [x] Auth page redirection (authenticated)
- [x] Logout flow

**UI/UX:**
- [x] Navbar shows correct state for logged out user
- [x] Navbar shows correct state for logged in user
- [x] User dropdown displays email
- [x] User dropdown has logout option

**File Locations:**
- Tests: `__tests__/auth/` (to be created)
- E2E: `e2e/auth/` (to be created)

---

## Phase 2: Bot Management & AI Creation (In Progress)

### Unit Tests - Components

**Bot Creation:**
- [ ] `components/bot/StrategySelector.tsx`
  - [ ] Renders all 4 strategy templates
  - [ ] Handles template selection
  - [ ] Displays strategy descriptions
  - [ ] Navigation to template config page
  - File: `components/bot/__tests__/StrategySelector.test.tsx`

- [ ] `components/bot/TemplateConfig.tsx`
  - [ ] Trading pair selection validation
  - [ ] Capital allocation validation (min/max)
  - [ ] Strategy-specific parameter validation
  - [ ] Form submission
  - File: `components/bot/__tests__/TemplateConfig.test.tsx`

- [ ] `components/bot/RiskQuestionnaire.tsx`
  - [ ] Stop-loss validation (0.5% - 20%)
  - [ ] Take-profit validation
  - [ ] Position sizing validation
  - [ ] Risk level calculation
  - [ ] Risk warnings for aggressive settings
  - File: `components/bot/__tests__/RiskQuestionnaire.test.tsx`

- [ ] `components/bot/BotPreview.tsx`
  - [ ] Displays all configuration sections
  - [ ] Shows risk level prominently
  - [ ] Edit buttons work correctly
  - [ ] Paper trading badge displays
  - File: `components/bot/__tests__/BotPreview.test.tsx`

- [ ] `components/bot/AIChat.tsx`
  - [ ] Renders messages correctly
  - [ ] Handles user input
  - [ ] Displays streaming responses
  - [ ] Shows loading states
  - [ ] Error message display
  - File: `components/bot/__tests__/AIChat.test.tsx`

**Bot Management:**
- [ ] `components/bot/BotCard.tsx`
  - [ ] Displays bot name and strategy
  - [ ] Shows correct status badge
  - [ ] Calculates and displays P&L
  - [ ] Shows win rate
  - [ ] Risk level indicator
  - [ ] Last activity timestamp
  - File: `components/bot/__tests__/BotCard.test.tsx`

- [ ] `components/bot/BotControls.tsx`
  - [ ] Start button (disabled in Phase 2)
  - [ ] Pause button (disabled in Phase 2)
  - [ ] Stop button (disabled in Phase 2)
  - [ ] Settings button navigation
  - [ ] Delete button opens modal
  - File: `components/bot/__tests__/BotControls.test.tsx`

- [ ] `components/bot/DeleteBotModal.tsx`
  - [ ] Shows warning message
  - [ ] Requires name confirmation
  - [ ] Validates input
  - [ ] Cancel button works
  - [ ] Delete button triggers deletion
  - File: `components/bot/__tests__/DeleteBotModal.test.tsx`

### Unit Tests - Utilities

**Validation:**
- [ ] `lib/validation/botConfig.ts`
  - [ ] Validates bot name (min/max length)
  - [ ] Validates trading pair format
  - [ ] Validates capital allocation range
  - [ ] Validates strategy config structure
  - File: `lib/validation/__tests__/botConfig.test.ts`

- [ ] `lib/validation/riskConfig.ts`
  - [ ] Validates stop-loss percentage
  - [ ] Validates take-profit percentage
  - [ ] Validates daily loss limits
  - [ ] Validates position size
  - [ ] Calculates risk level correctly
  - File: `lib/validation/__tests__/riskConfig.test.ts`

**Formatters:**
- [ ] `lib/formatters/currency.ts`
  - [ ] Formats positive amounts
  - [ ] Formats negative amounts
  - [ ] Handles zero
  - [ ] Handles large numbers
  - [ ] Error handling for invalid input
  - File: `lib/formatters/__tests__/currency.test.ts`

- [ ] `lib/formatters/percentage.ts`
  - [ ] Formats percentage with sign
  - [ ] Handles decimal precision
  - [ ] Color coding (green/red)
  - File: `lib/formatters/__tests__/percentage.test.ts`

**Calculators:**
- [ ] `lib/calculators/riskLevel.ts`
  - [ ] Conservative settings → Low risk
  - [ ] Moderate settings → Medium risk
  - [ ] Aggressive settings → High risk
  - [ ] Edge cases
  - File: `lib/calculators/__tests__/riskLevel.test.ts`

- [ ] `lib/calculators/pnl.ts` (Phase 3, placeholder now)
  - [ ] Calculates profit/loss from trades
  - [ ] Handles multiple positions
  - [ ] Accounts for fees
  - File: `lib/calculators/__tests__/pnl.test.ts`

### Unit Tests - Hooks

**Custom Hooks:**
- [ ] `hooks/useAI.ts`
  - [ ] Initializes conversation state
  - [ ] Sends messages to AI
  - [ ] Handles streaming responses
  - [ ] Manages conversation history
  - [ ] Error handling
  - File: `hooks/__tests__/useAI.test.ts`

- [ ] `hooks/useBots.ts`
  - [ ] Fetches user's bots
  - [ ] Creates new bot
  - [ ] Updates bot configuration
  - [ ] Deletes bot
  - [ ] Handles loading states
  - [ ] Error handling
  - File: `hooks/__tests__/useBots.test.ts`

- [ ] `hooks/useBotFilters.ts`
  - [ ] Filters by status
  - [ ] Filters by strategy type
  - [ ] Sorts by name, P&L, date
  - [ ] Searches by name
  - File: `hooks/__tests__/useBotFilters.test.ts`

### Integration Tests - API Routes

**Bot CRUD:**
- [ ] `POST /api/bots` - Create bot
  - [ ] Success with valid data
  - [ ] Validation error for missing fields
  - [ ] Validation error for invalid capital
  - [ ] Enforces stop-loss requirement
  - [ ] Creates risk_config record
  - [ ] Returns created bot with ID
  - File: `app/api/bots/__tests__/route.integration.test.ts`

- [ ] `GET /api/bots` - List bots
  - [ ] Returns all user's bots
  - [ ] Filters by status
  - [ ] Filters by strategy type
  - [ ] Sorts by created_at
  - [ ] Pagination works
  - [ ] Empty result for new user
  - File: `app/api/bots/__tests__/route.integration.test.ts`

- [ ] `GET /api/bots/[id]` - Get bot details
  - [ ] Returns bot with risk_config
  - [ ] 404 for non-existent bot
  - [ ] 403 for other user's bot
  - File: `app/api/bots/[id]/__tests__/route.integration.test.ts`

- [ ] `PATCH /api/bots/[id]` - Update bot
  - [ ] Updates bot configuration
  - [ ] Updates risk configuration
  - [ ] Validates new parameters
  - [ ] 404 for non-existent bot
  - [ ] 403 for other user's bot
  - File: `app/api/bots/[id]/__tests__/route.integration.test.ts`

- [ ] `DELETE /api/bots/[id]` - Delete bot
  - [ ] Deletes bot successfully
  - [ ] Cascades to risk_config
  - [ ] 404 for non-existent bot
  - [ ] 403 for other user's bot
  - File: `app/api/bots/[id]/__tests__/route.integration.test.ts`

**AI Endpoints:**
- [ ] `POST /api/ai/chat` - AI conversation
  - [ ] Handles message successfully
  - [ ] Streams response
  - [ ] Saves conversation history
  - [ ] Handles AI API errors
  - [ ] Rate limiting works
  - File: `app/api/ai/chat/__tests__/route.integration.test.ts`

- [ ] `POST /api/ai/recommend` - Strategy recommendation
  - [ ] Returns strategy recommendation
  - [ ] Validates user input
  - [ ] Returns structured data
  - [ ] Handles edge cases
  - File: `app/api/ai/recommend/__tests__/route.integration.test.ts`

### Integration Tests - Database

**Row Level Security (RLS):**
- [ ] Users can only view their own bots
- [ ] Users can only create bots for themselves
- [ ] Users can only update their own bots
- [ ] Users can only delete their own bots
- [ ] Same for risk_configs, ai_conversations
- File: `tests/integration/database/rls.test.ts`

**Constraints & Relations:**
- [ ] bot_id foreign key in risk_configs
- [ ] user_id foreign key in bots
- [ ] Unique constraint on risk_configs.bot_id
- [ ] Cascade delete: bot → risk_config
- [ ] Cascade delete: bot → bot_logs
- File: `tests/integration/database/constraints.test.ts`

**Default Values:**
- [ ] Bot status defaults to 'stopped'
- [ ] Bot is_paper_trading defaults to true
- [ ] Profile paper_trading_balance defaults to 10000
- File: `tests/integration/database/defaults.test.ts`

### Integration Tests - Supabase Edge Functions

**ai-strategy-recommender:**
- [ ] Accepts message and context
- [ ] Calls Claude API successfully
- [ ] Returns streaming response
- [ ] Handles AI API timeout
- [ ] Validates AI response structure
- [ ] Rate limiting per user
- File: `supabase/functions/ai-strategy-recommender/__tests__/index.test.ts`

### E2E Tests - Bot Creation (Template Path)

**DCA Bot Creation:**
- [ ] Navigate to bot creation
- [ ] Select DCA template
- [ ] Fill configuration form
- [ ] Configure risk settings
- [ ] Preview configuration
- [ ] Deploy bot
- [ ] Verify bot in dashboard
- File: `e2e/bot-creation/template-dca.spec.ts`

**Grid Trading Bot Creation:**
- [ ] Select Grid template
- [ ] Configure grid parameters (levels, range)
- [ ] Configure risk settings
- [ ] Deploy successfully
- File: `e2e/bot-creation/template-grid.spec.ts`

**Momentum Bot Creation:**
- [ ] Select Momentum template
- [ ] Configure indicators (EMA, RSI)
- [ ] Configure risk settings
- [ ] Deploy successfully
- File: `e2e/bot-creation/template-momentum.spec.ts`

**Mean Reversion Bot Creation:**
- [ ] Select Mean Reversion template
- [ ] Configure parameters (SMA, Bollinger)
- [ ] Configure risk settings
- [ ] Deploy successfully
- File: `e2e/bot-creation/template-mean-reversion.spec.ts`

**Validation Errors:**
- [ ] Shows error for missing bot name
- [ ] Shows error for invalid capital (< $10)
- [ ] Shows error for invalid capital (> 50% portfolio)
- [ ] Shows error for missing stop-loss
- [ ] Shows error for stop-loss out of range
- [ ] Cannot proceed with validation errors
- File: `e2e/bot-creation/validation.spec.ts`

### E2E Tests - Bot Creation (AI Path)

**Full AI Conversation:**
- [ ] Start AI chat
- [ ] AI asks about goals
- [ ] User responds with natural language
- [ ] AI recommends strategy
- [ ] User accepts recommendation
- [ ] AI asks about capital and parameters
- [ ] AI asks about risk tolerance
- [ ] Preview shows complete config
- [ ] Deploy bot successfully
- File: `e2e/bot-creation/ai-full-flow.spec.ts`

**AI Edge Cases:**
- [ ] AI handles unclear user input
- [ ] AI asks clarifying questions
- [ ] User requests different strategy
- [ ] User edits AI-suggested parameters
- [ ] Conversation saves to database
- File: `e2e/bot-creation/ai-edge-cases.spec.ts`

**AI Errors:**
- [ ] Shows error message on AI API timeout
- [ ] Allows retry after error
- [ ] Fallback to template creation on repeated failures
- File: `e2e/bot-creation/ai-errors.spec.ts`

### E2E Tests - Bot Management

**View Bots Dashboard:**
- [ ] Shows all user's bots
- [ ] Displays bot cards with all data
- [ ] Shows "No bots yet" for new user
- [ ] Shows paper trading badge on all bots
- [ ] Displays correct status badges
- File: `e2e/bot-management/dashboard.spec.ts`

**Filter and Sort:**
- [ ] Filter by status (running/paused/stopped)
- [ ] Filter by strategy type
- [ ] Sort by name (A-Z, Z-A)
- [ ] Sort by P&L (high to low, low to high)
- [ ] Sort by creation date (newest/oldest)
- [ ] Search by bot name
- [ ] Combined filters work correctly
- File: `e2e/bot-management/filter-sort.spec.ts`

**Edit Bot Configuration:**
- [ ] Navigate to edit page
- [ ] Load existing configuration
- [ ] Update bot name
- [ ] Update trading pair
- [ ] Update capital allocation
- [ ] Update risk settings
- [ ] Save changes successfully
- [ ] Changes reflect in dashboard
- File: `e2e/bot-management/edit.spec.ts`

**Delete Bot:**
- [ ] Click delete button
- [ ] Shows confirmation modal
- [ ] Requires typing bot name
- [ ] Cancel button closes modal
- [ ] Delete removes bot from dashboard
- [ ] Deleted bot no longer in database
- File: `e2e/bot-management/delete.spec.ts`

**Clone Bot:**
- [ ] Click clone button
- [ ] Opens creation flow with pre-filled data
- [ ] Can edit configuration before saving
- [ ] Creates new bot with copied config
- [ ] Original bot unchanged
- File: `e2e/bot-management/clone.spec.ts`

### E2E Tests - Paper Trading

**Paper Trading Setup:**
- [ ] New user has $10,000 balance
- [ ] Balance displays in dashboard
- [ ] Paper trading badge shows on all bots
- [ ] Tooltip explains paper trading
- File: `e2e/paper-trading/setup.spec.ts`

**Capital Allocation:**
- [ ] Shows total balance
- [ ] Shows allocated capital
- [ ] Shows available capital
- [ ] Prevents over-allocation
- File: `e2e/paper-trading/allocation.spec.ts`

---

## Phase 3: Strategy Execution & Live Trading (Planned)

### Unit Tests - Strategy Implementations

**DCA Strategy:**
- [ ] Buys at correct intervals
- [ ] Calculates correct buy amount
- [ ] Stops at investment limit
- [ ] Handles partial fills

**Grid Trading Strategy:**
- [ ] Calculates grid levels correctly
- [ ] Places buy orders at correct prices
- [ ] Places sell orders at correct prices
- [ ] Manages multiple open positions

**Momentum Strategy:**
- [ ] Calculates EMA correctly
- [ ] Calculates RSI correctly
- [ ] Generates buy signals (oversold + uptrend)
- [ ] Generates sell signals (overbought)

**Mean Reversion Strategy:**
- [ ] Calculates SMA correctly
- [ ] Calculates Bollinger Bands
- [ ] Buys at lower band
- [ ] Sells at upper band

### Unit Tests - Trade Simulation

**Trade Simulator:**
- [ ] Executes buy order correctly
- [ ] Executes sell order correctly
- [ ] Applies slippage (0.1-0.5%)
- [ ] Deducts fees (0.1%)
- [ ] Updates balance correctly
- [ ] Creates trade record

**P&L Calculator:**
- [ ] Calculates realized P&L
- [ ] Calculates unrealized P&L
- [ ] Accounts for fees
- [ ] Handles multiple positions
- [ ] Calculates percentage return

### Integration Tests - Bot Execution

**Bot Executor Edge Function:**
- [ ] Runs on schedule (cron)
- [ ] Fetches all active bots
- [ ] Evaluates strategy for each bot
- [ ] Makes trade decisions
- [ ] Executes trades via simulator
- [ ] Updates bot positions
- [ ] Logs activity
- [ ] Handles errors gracefully

**Risk Monitor:**
- [ ] Triggers stop-loss when hit
- [ ] Triggers take-profit when hit
- [ ] Pauses bot on daily loss limit
- [ ] Pauses bot on volatility threshold
- [ ] Sends alerts to user
- [ ] Updates bot status

### Integration Tests - Binance Integration

**Market Data Fetcher:**
- [ ] Fetches current prices
- [ ] Fetches historical data
- [ ] Handles API rate limits
- [ ] Retries on errors
- [ ] Caches data appropriately

**WebSocket Price Updates:**
- [ ] Connects to Binance WebSocket
- [ ] Receives real-time price updates
- [ ] Handles reconnection
- [ ] Updates positions in database

### E2E Tests - Bot Lifecycle

**Start Bot:**
- [ ] Start button becomes enabled (Phase 3)
- [ ] Bot status changes to "Running"
- [ ] Bot begins executing strategy
- [ ] Dashboard shows live updates

**Monitor Bot:**
- [ ] P&L updates in real-time
- [ ] Trade activity feed shows new trades
- [ ] Position display updates
- [ ] Risk exposure updates

**Bot Triggers Stop-Loss:**
- [ ] Bot detects stop-loss condition
- [ ] Bot executes exit trade
- [ ] Bot pauses automatically
- [ ] User receives notification
- [ ] Dashboard shows updated status

**Pause and Resume:**
- [ ] Pause button stops execution
- [ ] Bot status changes to "Paused"
- [ ] Resume button restarts execution
- [ ] Bot continues from paused state

---

## Phase 4: Analytics & Optimization (Planned)

### Unit Tests - Analytics

**Risk Metrics:**
- [ ] Sharpe ratio calculation
- [ ] Sortino ratio calculation
- [ ] Maximum drawdown calculation
- [ ] Win rate calculation
- [ ] Average trade duration

**Performance Metrics:**
- [ ] Total return calculation
- [ ] Annualized return
- [ ] Profit factor
- [ ] Best/worst trade
- [ ] Risk-adjusted return

### Integration Tests - Analytics API

**Analytics Endpoints:**
- [ ] GET /api/analytics/portfolio - Portfolio metrics
- [ ] GET /api/analytics/bot/[id] - Bot-specific analytics
- [ ] GET /api/analytics/compare - Compare multiple bots
- [ ] GET /api/trades - Trade history with pagination

### E2E Tests - Analytics Dashboard

**View Analytics:**
- [ ] Navigate to analytics page
- [ ] View portfolio performance chart
- [ ] View risk metrics
- [ ] View trade distribution
- [ ] Export data to CSV

**Compare Bots:**
- [ ] Select multiple bots
- [ ] View side-by-side comparison
- [ ] Compare performance metrics
- [ ] Identify best performer

---

## Phase 5: Advanced Features (Planned)

### Unit Tests - Backtesting

**Backtest Engine:**
- [ ] Loads historical data
- [ ] Simulates strategy execution
- [ ] Calculates historical performance
- [ ] Generates performance report

### Integration Tests - Live Trading

**Binance Live Trading:**
- [ ] Places real buy order
- [ ] Places real sell order
- [ ] Handles order rejection
- [ ] Tracks real positions
- [ ] Syncs with Binance account

### E2E Tests - Live Trading

**Enable Live Trading:**
- [ ] Add Binance API keys
- [ ] Verify API key permissions
- [ ] Enable live trading mode
- [ ] Execute first real trade
- [ ] Monitor real P&L

---

## Coverage Summary by Phase

| Phase | Unit | Integration | E2E | Overall |
|-------|------|-------------|-----|---------|
| Phase 1 | 100% | 100% | 100% | ✅ 100% |
| Phase 2 | 0% | 0% | 0% | 🔴 0% |
| Phase 3 | 0% | 0% | 0% | ⏸️ Planned |
| Phase 4 | 0% | 0% | 0% | ⏸️ Planned |
| Phase 5 | 0% | 0% | 0% | ⏸️ Planned |

---

## High Priority Tests (Write First)

### Phase 2 Priorities:
1. **API Route Tests** - Core CRUD operations
2. **RLS Policy Tests** - Security critical
3. **Risk Validation Tests** - Prevent user losses
4. **E2E Bot Creation** - Core user journey
5. **AI Integration Tests** - AI reliability

### Before Deployment Checklist:
- [ ] All API routes have tests
- [ ] All RLS policies verified
- [ ] Critical user flows tested E2E
- [ ] Security tests passing
- [ ] Performance tests passing (< 200ms API, < 1s page load)

---

## Notes

**Testing Strategy:**
- Write tests alongside features (TDD when possible)
- Review coverage weekly
- Never skip security tests
- E2E tests for critical flows only (avoid over-testing)

**Common Issues:**
- Flaky tests: Increase timeouts, fix race conditions
- Slow tests: Mock external APIs, use in-memory DB
- Brittle tests: Use data-testid, avoid implementation details

**Resources:**
- [TEST_PLAN.md](TEST_PLAN.md) - Full testing strategy
- [Jest Docs](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Docs](https://playwright.dev/)

---

**Maintained By:** Solo Developer
**Update Frequency:** After each feature/fix
**Review:** Weekly during active development

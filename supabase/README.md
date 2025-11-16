# TradingBot Database Migrations

This directory contains Supabase database migrations for the TradingBot platform.

## Overview

The database schema consists of **7 tables** designed to support:
- **Paper trading** with virtual $10,000 balance
- **AI-guided bot creation** via Claude API
- **4 strategy templates**: DCA, Grid, Momentum, Mean Reversion
- **Comprehensive risk management**
- **Real-time bot execution** via cron jobs
- **Audit trails** for trades and bot activity

## Database Schema

### 1. `profiles` (Extension)
Extends Supabase `auth.users` with TradingBot-specific fields:
- Paper trading balance ($10,000 starting balance)
- Allocated balance tracking
- AI conversation usage limits (3/month for Starter tier)
- Subscription tier (starter, pro, enterprise)

### 2. `strategies`
Strategy templates (seeded with 4 templates):
- **DCA** (Dollar Cost Averaging) - Low risk, beginner
- **Grid Trading** - Medium risk, intermediate
- **Momentum** - High risk, advanced
- **Mean Reversion** - Medium risk, intermediate

Each strategy includes:
- Risk metrics (expected return, max drawdown, win rate)
- Default parameters and definitions (for dynamic forms)
- Capital requirements and supported trading pairs

### 3. `bots`
User-created trading bots:
- Links to user and strategy
- Trading configuration (pair, capital, risk settings)
- Performance metrics (P&L, win rate, total trades)
- Execution scheduling (`next_execution_at` for cron jobs)
- Status tracking (draft, active, paused, stopped, error)

### 4. `risk_configs`
Detailed risk management (1:1 with bots):
- Stop loss & take profit percentages
- Trailing stop configuration
- Position limits (max size, max daily loss)
- Trading hours restrictions (optional)

### 5. `ai_conversations`
AI-guided bot creation conversations:
- 5-step conversation flow tracking
- User inputs (goals, risk tolerance, capital)
- AI recommendations (strategy, parameters)
- Complete message history (JSONB array)

### 6. `trades`
Trading history (immutable audit log):
- Buy/sell execution records
- Price, quantity, total value, fees
- P&L calculation (for sell orders)
- Paper vs live trading mode
- Exchange integration (Binance order IDs for live)

### 7. `bot_logs`
Execution logs and errors (immutable audit trail):
- Event types (execution, errors, status changes)
- Log levels (info, warning, error, debug)
- Metadata (JSONB for flexible context)
- Error details (code, stack trace)
- Auto-cleanup after 90 days

## Migrations

| File | Description |
|------|-------------|
| `20251116000001_create_profiles_extension.sql` | Extend profiles table |
| `20251116000002_create_strategies_table.sql` | Create strategies table |
| `20251116000003_create_bots_table.sql` | Create bots table |
| `20251116000004_create_risk_configs_table.sql` | Create risk_configs table |
| `20251116000005_create_ai_conversations_table.sql` | Create ai_conversations table |
| `20251116000006_create_trades_table.sql` | Create trades table |
| `20251116000007_create_bot_logs_table.sql` | Create bot_logs table |
| `20251116000008_seed_strategy_templates.sql` | Seed 4 strategy templates |

## Key Features

### Row Level Security (RLS)
All tables have RLS policies ensuring:
- Users can only access their own data
- Service role (bot executor) can insert trades and logs
- Strategies are read-only for authenticated users

### Indexes
Optimized for common query patterns:
- User-specific queries (`user_id`)
- Dashboard filters (`status`, `trading_mode`)
- **Cron job execution** (`next_execution_at` for active bots) - CRITICAL
- Time-based queries (`created_at DESC`)
- Recent logs (7-day partial index)

### Constraints
Data integrity enforced via:
- Check constraints (positive balances, valid percentages)
- Foreign key cascades (delete bot → delete trades/logs)
- Unique constraints (1:1 bot ↔ risk_config)
- Balance allocation validation (allocated ≤ total balance)

### Auto-Cleanup
- Bot logs older than 90 days are automatically deleted
- Function: `cleanup_old_bot_logs()` (call via cron or Edge Function)

## Testing Locally

### Prerequisites
- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- Docker running (for local Supabase)

### Setup Local Supabase

```bash
# Initialize Supabase (if not already done)
npx supabase init

# Start local Supabase
npx supabase start

# This will output:
# - API URL: http://localhost:54321
# - Database URL: postgresql://postgres:postgres@localhost:54322/postgres
# - Anon Key: eyJh... (use this in .env.local)
# - Service Role Key: eyJh... (for admin operations)
```

### Run Migrations

```bash
# Run all migrations
npx supabase db reset

# This will:
# 1. Drop and recreate the database
# 2. Run all migrations in order
# 3. Seed strategy templates

# Verify migrations
npx supabase db diff
# (Should show no changes if migrations applied successfully)
```

### Manual Testing

```bash
# Connect to local database
psql postgresql://postgres:postgres@localhost:54322/postgres

# Verify tables exist
\dt

# Check seeded strategies
SELECT type, name, risk, complexity FROM strategies ORDER BY type;

# Expected output:
#       type       |      name       | risk | complexity
# -----------------+-----------------+------+-------------
#  dca             | DCA             | low  | beginner
#  grid            | Grid            | medium | intermediate
#  mean-reversion  | Mean Reversion  | medium | intermediate
#  momentum        | Momentum        | high | advanced
```

### Test User Flow

```sql
-- 1. Create test user (handled by Supabase Auth)
-- For testing, use Supabase Studio: http://localhost:54323

-- 2. Check profile created automatically
SELECT id, paper_balance, subscription_tier FROM profiles;

-- 3. Create a test bot
INSERT INTO bots (
  user_id,
  name,
  strategy_id,
  strategy_type,
  trading_pair,
  capital_allocated,
  risk_level,
  stop_loss_percentage,
  take_profit_percentage,
  max_daily_loss,
  max_position_size,
  strategy_params
)
SELECT
  auth.uid(),
  'My First DCA Bot',
  id,
  'dca',
  'BTC/USDT',
  500.00,
  'low',
  5.00,
  10.00,
  100.00,
  50.00,
  '{"investmentAmount": 50, "frequency": "daily"}'::jsonb
FROM strategies
WHERE type = 'dca'
LIMIT 1;

-- 4. Verify bot created
SELECT id, name, status, capital_allocated FROM bots;

-- 5. Create risk config for bot
INSERT INTO risk_configs (
  bot_id,
  stop_loss_percentage,
  take_profit_percentage,
  max_position_size,
  max_daily_loss,
  risk_level
)
SELECT
  id,
  5.00,
  10.00,
  50.00,
  100.00,
  'low'
FROM bots
WHERE name = 'My First DCA Bot'
LIMIT 1;

-- 6. Verify RLS policies work
-- Try to query another user's bots (should return empty)
```

## Deploying to Production

### Prerequisites
- Supabase project created at [supabase.com](https://supabase.com)
- Project linked via CLI: `npx supabase link --project-ref <your-project-ref>`

### Deploy

```bash
# Push migrations to production
npx supabase db push

# This will:
# 1. Compare local migrations with production
# 2. Apply new migrations
# 3. Show migration status

# Verify deployment
npx supabase db remote commit
```

### Post-Deployment Checklist

- [ ] Verify all 7 tables exist in Supabase Studio
- [ ] Check 4 strategies seeded correctly
- [ ] Test RLS policies with test users
- [ ] Verify indexes created (check performance)
- [ ] Set up cron job for `cleanup_old_bot_logs()` (optional)
- [ ] Update environment variables with production keys

## Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh... # For server-side operations
```

## Next Steps

After migrations are deployed:

1. **Phase 2: AI Integration**
   - Create Supabase Edge Function for Claude API
   - Build AI conversation API route
   - Integrate with bot creation UI

2. **Phase 3: Bot Executor**
   - Create bot executor Edge Function
   - Set up Supabase cron job (every 60 seconds)
   - Implement DCA strategy execution
   - Connect to Binance Testnet for paper trading

3. **Phase 4: Real-time Updates**
   - Set up Supabase Realtime subscriptions
   - Live bot status updates
   - Real-time P&L tracking

## Troubleshooting

### Migration fails with "function already exists"
```bash
# Reset local database
npx supabase db reset
```

### RLS policies blocking inserts
- Check you're using authenticated user context
- For testing, temporarily disable RLS: `ALTER TABLE <table> DISABLE ROW LEVEL SECURITY;`
- Re-enable before production: `ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;`

### Strategies not seeded
```bash
# Manually run seed migration
npx supabase db execute -f supabase/migrations/20251116000008_seed_strategy_templates.sql
```

## Resources

- [Supabase Migrations Docs](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL JSON Functions](https://www.postgresql.org/docs/current/functions-json.html)
- [TradingBot PRD](/docs/PRD.md)
- [Phase 2 Implementation Plan](/progress/phase2-plan.md)

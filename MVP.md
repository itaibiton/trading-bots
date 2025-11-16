# TradingBot MVP - The Platform for Bot Trading

> **Vision**: We're not building "just another algo trading tool" — we're building the PLATFORM where anyone can create, use, and share trading bots. Think Shopify for trading automation, not TradingView with bots.

---

## 🎯 Executive Summary

### What We're Building

**TradingBot** is a modern, AI-powered platform that democratizes automated trading through:

1. **Easy Bot Creation** - AI guides you through setup in plain language (no code, no confusion)
2. **Bot Marketplace** - Discover, clone, and use strategies from other traders
3. **Smart Execution** - Bots trade 24/7 with built-in risk protection
4. **AI Trade Alerts** - Get notified when market conditions favor your strategies

### Who It's For

- **Newbies** - Zero trading knowledge? AI teaches you while building your first bot
- **Hobbyists** - Want to automate without learning to code? Templates + AI = done in 5 minutes
- **Pros** - Need advanced controls? Pro mode gives you full strategy customization
- **Everyone** - Paper trading means ZERO risk while learning

### Why We'll Win

**Competitors** (3Commas, Cryptohopper, TradeSanta):
- Complex interfaces built for algo traders
- No AI assistance (you're on your own)
- No marketplace (just signals, not full strategies)
- Expensive ($29-129/month)

**TradingBot**:
- ✅ AI-powered setup (conversational, not forms)
- ✅ Modern UX (Next.js 15, React 19, smooth animations)
- ✅ Marketplace ecosystem (create, share, earn)
- ✅ Better pricing ($24/mo Pro vs $29+ competitors)
- ✅ Forever free tier (1 bot, paper trading)

### Business Model At-A-Glance

| Tier | Price | Limits | Target User |
|------|-------|--------|-------------|
| **Starter** | **FREE** | 1 bot, paper trading, 3 AI creations/month | Learning, testing |
| **Pro** | **$24/mo** | Unlimited bots, live trading, unlimited AI | Serious traders |
| **Enterprise** | **$99/mo** | Institutional features, API, 80/20 marketplace split | Professionals |

**Year 1 Target**: 10,000 users, 1,500 paid ($60k MRR = $720k ARR)

---

## ✅ MVP SCOPE: What's IN

### Phase 1: Foundation ✅ **COMPLETE**

**Status**: Shipped November 2025

- ✅ Authentication system (email/password, PKCE reset, JWT AMR security)
- ✅ Row Level Security (RLS) on all tables
- ✅ Design system (27 shadcn components, dark/light theme)
- ✅ Responsive navigation with user menu
- ✅ Landing page + protected routes

**Tech Stack Deployed**:
- Next.js 15 (App Router), React 19, TypeScript 5.3+
- Supabase (Auth + PostgreSQL + Edge Functions)
- TailwindCSS v4, Framer Motion, Recharts
- Deployed on Vercel

---

### Phase 2: Bot Creation UI ✅ **COMPLETE**

**Status**: Shipped November 13, 2025 (10,000+ lines in 1 day!)

#### Bot Creation - 3 Modes (All UI Complete)

**1. Template Mode** (For Beginners)
- **File**: `/app/bots/create/page.tsx`
- Beautiful card selector with 4 pre-built strategies:
  - DCA (Dollar Cost Averaging) - Buy $X every Y hours
  - Grid Trading - Buy low, sell high in price ranges
  - Momentum - Ride the trend (buy rising, sell falling)
  - Mean Reversion - Contrarian (buy dips, sell pumps)
- Configuration forms (trading pair, capital, params)
- Risk questionnaire (conservative/moderate/aggressive)
- Bot preview before deployment
- **User Value**: Create profitable bot in 3 minutes, zero expertise

**2. Simple Mode (AI-Guided)** (For Everyone)
- **File**: `/app/bots/create/simple/page.tsx`
- Full ChatGPT-style conversation interface
- 5-step guided flow:
  1. "What are your trading goals?" (goal discovery)
  2. "I recommend DCA because..." (strategy recommendation with reasoning)
  3. "Let's configure BTC/USDT with $1000" (parameters)
  4. "How much risk can you tolerate?" (risk assessment)
  5. "Review your bot before deploying" (confirmation)
- **Live Preview Panel** (35% width):
  - Real-time config updates as you chat
  - Risk gauge (0-100 score with color)
  - Mock performance chart (equity curve)
  - Expected metrics (win rate, monthly return)
- **Chat Interface** (65% width):
  - Message bubbles (user + AI)
  - Typing indicators
  - Quick-reply buttons
  - Streaming AI responses (currently mock, will be real Claude)
- **Success Celebration**:
  - Confetti animation 🎉
  - Sequential checkmarks
  - "Your bot is live!" message
- **User Value**: No learning curve, AI explains everything, feels magical

**3. Pro Mode (Advanced Dashboard)** (For Power Users)
- **File**: `/app/bots/create/pro/page.tsx`
- 5-tab professional dashboard:
  1. **Strategy Tab**: Deep-dive into 4 strategies with charts
  2. **Risk Tab**: Advanced controls (stop-loss, take-profit, position sizing, daily limits)
  3. **Technical Tab**: Indicators (RSI, MACD, Bollinger Bands, custom params)
  4. **Backtest Tab**: Mock 90-day backtest with interactive charts (Recharts)
  5. **Review Tab**: Full config summary + JSON export
- Real-time risk calculator (0-100 score)
- Advanced settings (leverage, order types, retry logic)
- JSON config download (for version control)
- **User Value**: Full control, pro-grade features, no compromises

#### Foundation Built ✅

**Type System** (`/types/bot.ts` - 299 lines):
- 20+ TypeScript interfaces covering entire domain
- Types: `Bot`, `Strategy`, `RiskConfig`, `AIConversation`, `BacktestResult`
- Serves as API contract for backend integration

**Mock Data** (`/lib/mock-data/`):
- 4 complete strategy templates with descriptions
- AI conversation flow (5 steps)
- Backtest data generator (90-day equity curves)
- Market data simulator

**Charts & Viz**:
- Performance charts (equity curves)
- Risk gauges (donut charts with color bands)
- Strategy comparison (bar charts)
- All mobile-responsive, theme-aware

**Dependencies Installed**:
- `framer-motion` - Smooth animations
- `react-confetti` - Success celebrations
- `recharts` - Data visualizations
- `date-fns` - Date formatting
- `next-themes` - Dark/light mode

**What's Ready**:
- ✅ All UI flows work perfectly with mock data
- ✅ Zero TypeScript errors
- ✅ Mobile responsive
- ✅ Delightful animations
- ✅ Ready for stakeholder demos

**What's Needed**: Backend integration (Phase 3)

---

### Phase 3: Backend Integration & Paper Trading 🏗️ **NEXT UP**

**Timeline**: 3-4 weeks (December 2025)
**Goal**: Make bots actually work (execute trades, track P&L)

#### Database Schema (7 Tables with RLS)

**1. `profiles` - User Profile & Paper Trading Balance**
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  paper_balance DECIMAL(20, 8) DEFAULT 10000.00, -- $10k virtual capital
  allocated_capital DECIMAL(20, 8) DEFAULT 0, -- Currently deployed in bots
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Users can only read/update their own profile
CREATE POLICY "Users can manage own profile" ON profiles
  FOR ALL USING (auth.uid() = id);
```

**2. `strategies` - Template Definitions (Seeded)**
```sql
CREATE TABLE strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- 'DCA', 'Grid Trading', 'Momentum', 'Mean Reversion'
  description TEXT NOT NULL,
  risk_level TEXT NOT NULL, -- 'low', 'medium', 'high'
  min_capital DECIMAL(10, 2) DEFAULT 100.00,
  default_params JSONB NOT NULL, -- Strategy-specific config
  is_template BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed with 4 templates (from existing mock data)
-- Public readable (no auth required)
CREATE POLICY "Templates are public" ON strategies
  FOR SELECT USING (is_template = true);
```

**3. `bots` - User-Created Bots**
```sql
CREATE TABLE bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  strategy_id UUID NOT NULL REFERENCES strategies(id),

  -- Configuration
  name TEXT NOT NULL,
  trading_pair TEXT NOT NULL, -- 'BTC/USDT', 'ETH/USDT'
  capital DECIMAL(20, 8) NOT NULL,
  strategy_params JSONB NOT NULL, -- Strategy-specific settings

  -- Status
  status TEXT DEFAULT 'stopped', -- 'active', 'paused', 'stopped', 'error'
  is_paper_trading BOOLEAN DEFAULT true,

  -- Performance (updated by bot executor)
  total_pnl DECIMAL(20, 8) DEFAULT 0,
  total_trades INTEGER DEFAULT 0,
  win_rate DECIMAL(5, 2) DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_executed_at TIMESTAMPTZ
);

-- RLS: Users can only manage their own bots
CREATE POLICY "Users manage own bots" ON bots
  FOR ALL USING (auth.uid() = user_id);

-- Index for bot executor (fetch active bots)
CREATE INDEX idx_bots_active ON bots(user_id, status) WHERE status = 'active';
```

**4. `risk_configs` - Risk Management Settings**
```sql
CREATE TABLE risk_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,

  -- Stop-Loss & Take-Profit
  stop_loss_pct DECIMAL(5, 2) NOT NULL, -- 0.5 to 20.0 (%)
  take_profit_pct DECIMAL(5, 2), -- Optional

  -- Position Sizing
  max_position_size DECIMAL(20, 8), -- Max $ per trade
  position_size_pct DECIMAL(5, 2), -- % of capital per trade

  -- Daily/Monthly Limits
  daily_loss_limit DECIMAL(20, 8),
  monthly_loss_limit DECIMAL(20, 8),

  -- Volatility Filters
  max_volatility DECIMAL(5, 2), -- Pause if volatility > X%

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(bot_id)
);

-- RLS: Inherits from bots table
CREATE POLICY "Risk configs follow bot ownership" ON risk_configs
  FOR ALL USING (
    bot_id IN (SELECT id FROM bots WHERE user_id = auth.uid())
  );
```

**5. `ai_conversations` - AI Chat History**
```sql
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  bot_id UUID REFERENCES bots(id) ON DELETE SET NULL,

  -- Conversation Data
  messages JSONB NOT NULL, -- Array of {role, content, timestamp}
  bot_config JSONB, -- Final generated config

  -- Metadata
  model TEXT DEFAULT 'claude-sonnet-3.5',
  total_tokens INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- RLS: Users own their conversations
CREATE POLICY "Users own AI conversations" ON ai_conversations
  FOR ALL USING (auth.uid() = user_id);
```

**6. `bot_logs` - Activity Tracking**
```sql
CREATE TABLE bot_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,

  -- Log Entry
  event_type TEXT NOT NULL, -- 'created', 'started', 'paused', 'stopped', 'trade', 'error'
  message TEXT NOT NULL,
  metadata JSONB, -- Additional context

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Logs follow bot ownership
CREATE POLICY "Bot logs follow ownership" ON bot_logs
  FOR ALL USING (
    bot_id IN (SELECT id FROM bots WHERE user_id = auth.uid())
  );

-- Index for fast log retrieval
CREATE INDEX idx_bot_logs_bot ON bot_logs(bot_id, created_at DESC);
```

**7. `trades` - Executed Trades (Paper & Live)**
```sql
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,

  -- Trade Details
  trade_type TEXT NOT NULL, -- 'buy', 'sell'
  symbol TEXT NOT NULL, -- 'BTC/USDT'
  amount DECIMAL(20, 8) NOT NULL,
  price DECIMAL(20, 8) NOT NULL,
  total_value DECIMAL(20, 8) NOT NULL,
  fee DECIMAL(20, 8) DEFAULT 0,

  -- Status
  is_paper_trading BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'executed', -- 'pending', 'executed', 'failed', 'cancelled'

  -- Timestamps
  executed_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

-- RLS: Trades follow bot ownership
CREATE POLICY "Trades follow bot ownership" ON trades
  FOR ALL USING (
    bot_id IN (SELECT id FROM bots WHERE user_id = auth.uid())
  );

-- Index for performance queries
CREATE INDEX idx_trades_bot ON trades(bot_id, executed_at DESC);
```

#### API Routes (9 Endpoints)

**Bot Management**:
- `POST /api/bots` - Create new bot
- `GET /api/bots` - List user's bots (with filters)
- `GET /api/bots/[id]` - Get bot details
- `PATCH /api/bots/[id]` - Update bot config
- `DELETE /api/bots/[id]` - Delete bot
- `POST /api/bots/[id]/clone` - Clone bot
- `PATCH /api/bots/[id]/status` - Update status (start/pause/stop)

**Strategy Templates**:
- `GET /api/strategies` - List all templates (public)
- `GET /api/strategies/[id]` - Get template details

**AI Integration**:
- `POST /api/ai/chat` - Send message, get AI response (streaming)

**All routes use**:
- `requireNormalAuth()` (except public template endpoints)
- Zod validation for inputs
- Type-safe responses
- Error handling with user-friendly messages

#### Anthropic Claude AI Integration

**Setup**:
- Create Anthropic account
- Get API key → add to `.env.local` and Vercel
- Install `@anthropic-ai/sdk`

**Edge Function**: `supabase/functions/ai-strategy-recommender/index.ts`

**Features**:
- Receives conversation context (messages array)
- Returns structured JSON via function calling
- Saves conversation to `ai_conversations` table
- Rate limited (5 requests/minute per user)

**3 System Prompts**:

1. **Goal Discovery Prompt**:
```
You are a friendly trading assistant helping a user create their first trading bot.

Ask about their trading goals in a conversational way:
- Are they trying to grow savings long-term or make quick profits?
- How much risk are they comfortable with?
- Do they prefer hands-off automation or active monitoring?

Keep it simple and jargon-free. Use examples like "like buying a little Bitcoin every week" instead of "dollar-cost averaging."
```

2. **Strategy Recommendation Prompt**:
```
Based on the user's goals:
- Risk tolerance: {low/medium/high}
- Time horizon: {short/long}
- Experience: {beginner/intermediate/advanced}

Recommend ONE of these strategies:
- DCA: Best for beginners, low risk, long-term growth
- Grid Trading: Medium risk, range-bound markets
- Momentum: Higher risk, trending markets
- Mean Reversion: Medium-high risk, choppy markets

Explain in plain language WHY this strategy fits their goals. No jargon.
```

3. **Configuration Guidance Prompt**:
```
Help the user configure their {strategy_name} bot safely.

Suggest:
- Trading pair (BTC/USDT is most popular)
- Capital allocation (start small: $100-500)
- Strategy parameters (safe defaults)
- Stop-loss (mandatory: 3-5% recommended)
- Take-profit (optional: 1.5x-2x stop-loss)

Always prioritize safety. Warn against over-allocating or removing stop-loss.
```

**Cost Management**:
- Cache common responses (first-time user flow)
- Rate limit: 3 AI bot creations/month (Starter), unlimited (Pro)
- Estimated cost: $0.02-0.05 per bot creation
- Monthly budget: 1,000 free users × 3 bots = $60-150/month

#### Paper Trading Execution

**DCA Strategy Only** (MVP):
- Buy fixed $ amount at regular intervals
- Example: Buy $100 of BTC every 24 hours
- Stop when total investment limit reached
- Track in `trades` table with `is_paper_trading = true`

**Why DCA Only?**:
- Simplest to implement (just buy at intervals)
- Validates entire execution pipeline
- Proves bots work end-to-end
- Other strategies (Grid, Momentum, Mean Reversion) in Phase 5

**Bot Executor Edge Function** (Supabase Cron):
```typescript
// Runs every 60 seconds
// File: supabase/functions/bot-executor/index.ts

Deno.serve(async (req) => {
  // 1. Fetch all active bots (status = 'active', is_paper_trading = true)
  const { data: bots } = await supabase
    .from('bots')
    .select('*, risk_configs(*)')
    .eq('status', 'active')
    .eq('is_paper_trading', true);

  for (const bot of bots) {
    try {
      // 2. Check if bot should execute (time-based for DCA)
      const shouldExecute = checkDCAInterval(bot);
      if (!shouldExecute) continue;

      // 3. Fetch current market price (Binance public API, no auth)
      const price = await getBinancePrice(bot.trading_pair);

      // 4. Calculate trade amount
      const amount = bot.strategy_params.amount_per_buy;

      // 5. Simulate order execution
      const trade = await simulateTrade({
        bot_id: bot.id,
        type: 'buy',
        symbol: bot.trading_pair,
        amount,
        price,
        fee_pct: 0.1, // 0.1% Binance fee
        slippage_pct: 0.2 // 0.2% realistic slippage
      });

      // 6. Update paper balance
      await updatePaperBalance(bot.user_id, -trade.total_value);

      // 7. Log trade
      await supabase.from('trades').insert(trade);
      await supabase.from('bot_logs').insert({
        bot_id: bot.id,
        event_type: 'trade',
        message: `Bought ${amount} ${bot.trading_pair} at $${price}`
      });

      // 8. Update bot stats
      await updateBotStats(bot.id);

    } catch (error) {
      // Log error, don't crash
      await logError(bot.id, error);
    }
  }

  return new Response('Bot execution complete');
});
```

**Trade Simulator**:
- Realistic order execution with slippage (0.1-0.5%)
- Trading fees (0.1% Binance taker fee)
- Update virtual portfolio
- Track P&L in real-time

**Risk Monitor**:
- Check stop-loss before every trade
- Enforce daily/monthly limits
- Auto-pause on risk breach
- Log all risk events

#### Bot Management Dashboard

**Features**:
- Grid view of all bots with status badges
- Filters: Status (All/Active/Paused/Stopped), Strategy
- Sort: Name, P&L, Created Date
- Search by bot name
- Start/Pause/Stop buttons (optimistic UI)
- Edit configuration modal (reuse creation forms)
- Delete confirmation dialog
- Clone bot (copy config, new name)

**Real-Time Updates**:
- Supabase Realtime WebSocket subscriptions
- Listen to `bots` table changes
- Update UI instantly when bot executes trade
- Manual refresh fallback (every 5 seconds)

**Components to Build**:
- `BotCard.tsx` - Individual bot display
- `BotGrid.tsx` - Grid layout with filters
- `BotFilters.tsx` - Filter controls
- `EditBotModal.tsx` - Configuration editor
- `DeleteBotDialog.tsx` - Confirmation prompt
- `BotStatusBadge.tsx` - Status indicator

#### What Success Looks Like (Phase 3 Complete)

**User Journey**:
1. User creates bot via AI (5-minute conversation)
2. Bot appears in dashboard with "Active" status
3. Bot executes first DCA trade within 24 hours
4. User sees trade in activity feed
5. Paper balance decreases by trade amount + fees
6. Bot P&L updates in real-time
7. User can pause, edit, or clone bot

**Technical Success**:
- ✅ All 3 creation modes save to database
- ✅ Bots execute DCA trades every X hours
- ✅ Trades recorded in `trades` table
- ✅ Paper balance tracked accurately (±$0.01)
- ✅ Real-time dashboard updates (<5 sec latency)
- ✅ Zero failed executions (error handling works)

**Business Success**:
- ✅ 80%+ users successfully deploy a bot
- ✅ Bots execute without errors for 7 days
- ✅ Users understand P&L and risk controls
- ✅ "Wow, it actually works!" moment

---

### Phase 4: Marketplace Preview 🛍️ **DEFERRED**

**Timeline**: 2-3 weeks (January 2026)
**Goal**: Prove platform value (share/discover bots)

#### Marketplace Database Schema

**1. `marketplace_bots` - Public Bot Listings**
```sql
CREATE TABLE marketplace_bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES auth.users(id),

  -- Listing Info
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[], -- ['dca', 'btc', 'conservative']

  -- Pricing
  is_free BOOLEAN DEFAULT true,
  price DECIMAL(10, 2), -- One-time OR monthly
  pricing_model TEXT DEFAULT 'one_time', -- 'one_time', 'monthly'

  -- Performance Metrics (from bot history)
  total_pnl DECIMAL(20, 8),
  win_rate DECIMAL(5, 2),
  total_trades INTEGER,
  sharpe_ratio DECIMAL(5, 2),

  -- Engagement
  views INTEGER DEFAULT 0,
  clones INTEGER DEFAULT 0,
  rating DECIMAL(3, 2), -- 0-5 stars (avg)

  -- Status
  is_public BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false, -- Admin approval

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Public bots viewable by all, editable by creator
CREATE POLICY "Public bots viewable" ON marketplace_bots
  FOR SELECT USING (is_public = true OR auth.uid() = creator_id);

CREATE POLICY "Creators manage own listings" ON marketplace_bots
  FOR ALL USING (auth.uid() = creator_id);

-- Indexes for marketplace queries
CREATE INDEX idx_marketplace_tags ON marketplace_bots USING GIN(tags);
CREATE INDEX idx_marketplace_popular ON marketplace_bots(clones DESC, rating DESC);
```

**2. `marketplace_purchases` - Track Sales**
```sql
CREATE TABLE marketplace_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marketplace_bot_id UUID NOT NULL REFERENCES marketplace_bots(id),
  buyer_id UUID NOT NULL REFERENCES auth.users(id),
  creator_id UUID NOT NULL REFERENCES auth.users(id),

  -- Payment
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL, -- 30% of amount
  creator_earnings DECIMAL(10, 2) NOT NULL, -- 70% of amount

  -- Subscription (if monthly)
  subscription_status TEXT, -- 'active', 'cancelled', 'expired'
  next_billing_date TIMESTAMPTZ,

  purchased_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Buyers see their purchases, creators see their sales
CREATE POLICY "Users see own purchases" ON marketplace_purchases
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = creator_id);
```

**3. `bot_clones` - Track Free Clones**
```sql
CREATE TABLE bot_clones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cloned_bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  original_bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  cloned_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Users see their clones
CREATE POLICY "Users see own clones" ON bot_clones
  FOR ALL USING (auth.uid() = user_id);
```

#### Marketplace Features

**Browse Marketplace** (`/marketplace`):
- Grid of bot cards with:
  - Bot name + description
  - Strategy type badge
  - Performance metrics (P&L, win rate)
  - Creator profile pic + name
  - Price (FREE or $X)
  - Clone count (social proof)
  - Star rating
- Filters:
  - Strategy type (DCA, Grid, Momentum, Mean Reversion)
  - Price (Free, Under $20, Under $50, Premium)
  - Risk level (Low, Medium, High)
  - Tags (bitcoin, ethereum, conservative, aggressive)
- Sort:
  - Most cloned (default)
  - Highest rated
  - Newest
  - Best performing (highest P&L)
- Search by name/description

**Bot Detail Page** (`/marketplace/[botId]`):
- Full bot configuration display
- Creator profile (name, verified badge, total clones)
- Performance stats:
  - 90-day equity curve chart
  - Total P&L, win rate, max drawdown
  - Total trades executed
  - Sharpe ratio (if available)
- Risk settings (stop-loss, position sizing)
- User reviews (5-star ratings + comments)
- "Clone This Bot" button (prominent CTA)
- Tags and description

**Share Bot Flow** (`/bots/[id]/share`):
- Toggle "Make Public" switch
- Add title (required, 50-100 chars)
- Add description (required, 200-500 chars)
- Add tags (select from list + custom)
- Set pricing:
  - FREE (default)
  - One-time ($5-99)
  - Monthly subscription ($5-49/month)
- Preview how it will look in marketplace
- Submit for review (if premium) or publish immediately (if free)

**Clone Bot** (One-Click):
- Click "Clone" on marketplace bot
- Copies entire configuration
- Adds "(Clone)" suffix to name
- User can edit before deploying
- Original creator gets attribution
- Clone count increments

#### Marketplace Economics

**Revenue Share** (Pro Tier Sellers):
- 70/30 split (creator keeps 70%, platform keeps 30%)
- Example: User buys bot for $20 → Creator gets $14, platform gets $6
- Monthly subscriptions: Same split applies to recurring revenue

**Revenue Share** (Enterprise Tier Sellers):
- 80/20 split (creator keeps 80%, platform keeps 20%)
- Incentive to upgrade to Enterprise ($99/mo)
- If creator sells $500/month in bots:
  - Pro (70/30): Keeps $350
  - Enterprise (80/20): Keeps $400 (saves $50/month)

**Marketplace Listing Fees** (Optional):
- FREE to list bots (no barrier to entry)
- $10/month - Featured placement on homepage
- $25/month - Verified badge + email marketing

**Quality Control**:
- All premium bots reviewed before approval
- Must show backtested results (no fake claims)
- 7-day money-back guarantee
- 5-star rating system
- Report abuse/scams

#### Success Metrics (Phase 4)

- 50+ premium bots listed by Month 6
- 20+ active creators
- $2,000+/month marketplace revenue (30% of sales)
- 30% of users clone at least one bot
- 10% of Pro users create premium bots

---

### Phase 5: AI Trade Alerts 🤖 **DEFERRED**

**Timeline**: 2-3 weeks (February 2026)
**Goal**: Proactive AI assistant that helps users profit

#### What Are AI Trade Alerts?

**Not Just Notifications** - Smart AI monitors markets 24/7 and alerts you when:
- Market conditions favor your strategy (e.g., "DCA bots perform well in bear markets - now's a good time!")
- Your bot is underperforming (e.g., "Your Momentum bot lost 5% this week - consider pausing in sideways markets")
- Risk exposure is high (e.g., "You've allocated 80% of capital - diversify to reduce risk")
- New opportunities appear (e.g., "ETH volatility dropped 50% - good for Grid Trading")

**Example Alerts**:
1. **Strategy Recommendation**: "Bitcoin dipped 10% today. Your DCA bot can accumulate cheaper - consider increasing buy amount temporarily."
2. **Risk Warning**: "Your Momentum bot has 3 losing trades in a row. Market is choppy - AI suggests pausing until trend resumes."
3. **Optimization Tip**: "Your Grid bot's range is too narrow. Widen to 5-10% for more trades and better profits."
4. **Market Insight**: "Altcoin season starting (BTC dominance falling). Consider cloning your DCA bot for ETH/USDT."

#### How It Works

**AI Analysis Triggers** (Minimize API Costs):
- Run AI only on significant market events:
  - 5%+ price move (major swing)
  - Volatility spike (3x normal)
  - Volume spike (2x average)
  - User requests analysis (manual button)
- NOT continuously (too expensive)

**Edge Function**: `ai-trade-alerts`
```typescript
// Runs every 5 minutes (Supabase cron)
// Only analyzes if trigger conditions met

Deno.serve(async (req) => {
  // 1. Fetch market data for all active bots
  const marketData = await fetchMarketConditions();

  // 2. Check if any triggers met
  const triggers = detectTriggers(marketData);
  if (triggers.length === 0) return; // No alerts needed

  // 3. For each trigger, analyze with Claude AI
  for (const trigger of triggers) {
    const analysis = await analyzeWithClaude({
      trigger,
      marketData,
      userBots: trigger.affectedBots,
      userRiskProfile: trigger.user.riskProfile
    });

    // 4. Generate alert if AI finds actionable insight
    if (analysis.hasInsight) {
      await sendAlert({
        user_id: trigger.user.id,
        alert_type: analysis.type, // 'opportunity', 'warning', 'optimization'
        message: analysis.message,
        action_items: analysis.suggestions,
        priority: analysis.priority // 'low', 'medium', 'high'
      });
    }
  }
});
```

**Notification Delivery**:
- **Email** (Resend/SendGrid): Default, 1-5 minute delay
- **Push Notifications** (Firebase): Optional, real-time (Phase 6)
- **In-App Inbox**: Always available, check anytime
- **SMS** (Twilio): Enterprise only, critical alerts

**User Preferences**:
- Alert frequency (Real-time, Daily digest, Weekly summary)
- Alert types (Opportunities, Warnings, Optimizations, All)
- Channels (Email, Push, SMS)
- Quiet hours (e.g., 10pm - 8am)

#### AI Alert Types

**1. Opportunity Alerts** (Green 🟢):
- "Great time to deploy your DCA bot - market dipped 15%"
- "Low volatility detected - perfect for Grid Trading"
- "Momentum building in BTC - consider increasing position size"

**2. Risk Warnings** (Red 🔴):
- "Bot approaching daily loss limit - will auto-pause soon"
- "3 losing trades in a row - market conditions unfavorable"
- "High volatility detected - consider tightening stop-loss"

**3. Optimization Tips** (Blue 🔵):
- "Your Grid bot range is suboptimal - widen by 2% for more trades"
- "DCA frequency too high - reduce to weekly for better averaging"
- "Consider taking profit - bot up 20% this month"

**4. Educational Insights** (Purple 🟣):
- "Your Momentum bot performs better in trending markets - current: sideways"
- "DCA bots thrive in bear markets - consider increasing allocation"
- "Mean Reversion works best in range-bound conditions - now active"

#### Cost Management

**Problem**: Claude API is expensive ($0.02-0.05 per analysis)
**Solution**: Smart triggering + rate limiting

**Free Tier** (Starter):
- 3 AI alerts per month
- Email delivery only
- Low priority (processed in batches)

**Pro Tier**:
- Unlimited AI alerts
- Email + in-app inbox
- Real-time analysis (within 5 minutes)

**Enterprise Tier**:
- Unlimited AI alerts
- All channels (email, push, SMS)
- Priority analysis (within 1 minute)
- Custom alert rules

**Estimated Costs**:
- 1,000 free users × 3 alerts/month = 3,000 alerts × $0.02 = $60/month
- 500 Pro users × 20 alerts/month = 10,000 alerts × $0.02 = $200/month
- **Total**: $260/month AI alert costs (acceptable at $24k MRR from Pro users)

#### Success Metrics (Phase 5)

- 60%+ users enable AI alerts
- 4.0+ star rating on alert relevance
- 20%+ users act on alerts (deploy bots, adjust configs)
- <5% unsubscribe from alerts (low noise)

---

## ❌ OUT OF SCOPE (Post-MVP)

### What We're NOT Building (Yet)

**Deferred to Phase 6+** (After Marketplace + AI Alerts Proven):

1. **Live Trading with Real Money**
   - Risk: Bugs can cause financial loss
   - Complexity: Binance API key security, encryption, 2FA
   - Timeline: 6-12 months AFTER paper trading proven
   - Strategy: Require extensive paper trading history before enabling

2. **Complex Strategy Execution**
   - Grid Trading execution (MVP = DCA only)
   - Momentum strategy logic
   - Mean Reversion triggers
   - Custom technical indicators
   - Rationale: Focus on ONE strategy done right (DCA), then expand

3. **Real Backtesting Engine**
   - Historical price data integration
   - Multi-year backtests
   - Monte Carlo simulations
   - Optimization algorithms
   - Rationale: Mock backtest sufficient for MVP UX validation

4. **Multi-Exchange Support**
   - Coinbase, Kraken, Bybit, etc.
   - Cross-exchange arbitrage
   - Unified order book
   - Rationale: Focus on Binance depth over breadth

5. **Advanced Analytics**
   - Sharpe ratio, Sortino ratio, Calmar ratio
   - Maximum drawdown analysis
   - Risk-adjusted returns
   - Strategy correlation matrix
   - Rationale: Basic P&L + win rate sufficient for MVP

6. **Social Features**
   - User profiles and followers
   - Comments on marketplace bots
   - Direct messaging
   - Leaderboards
   - Rationale: Marketplace first, social layer later

7. **API Access for Developers**
   - RESTful API for bot CRUD
   - Webhook integrations (TradingView, Discord)
   - SDK for programmatic bot creation
   - Rationale: Enterprise feature, not MVP-critical

8. **White-Label Solutions**
   - Custom branding
   - Reseller programs
   - Dedicated infrastructure
   - Rationale: Enterprise upsell, not needed until 1,000+ users

### Why We're Deferring These

**Focus = Speed = Validation**

Every feature we DON'T build is:
- 2-4 weeks saved
- $5-20k development cost avoided
- Faster time-to-market
- Less complexity to maintain

**MVP Goal**: Prove the platform value (create, share, automate) with MINIMUM features.

Once validated:
- Live trading adds $50-100k ARR (high willingness to pay)
- Complex strategies add differentiation
- Analytics add retention
- Multi-exchange adds TAM expansion

But first: **Ship, learn, iterate**.

---

## 👥 USER JOURNEYS

### Journey 1: Complete Newbie (Zero Experience)

**Persona**: Sarah, 28, office worker, heard about crypto from friends, wants to "try trading" but scared of losing money.

**Journey**:
1. **Lands on homepage** (Google search: "automated crypto trading")
   - Headline: "Create Your First Trading Bot in 5 Minutes - No Code, No Risk"
   - CTA: "Start Free Trial"

2. **Signs up** (Email + password, 30 seconds)
   - Onboarding checklist appears:
     - ✅ Account created
     - ⬜ Create your first bot
     - ⬜ Deploy to paper trading
     - ⬜ See your first trade

3. **Clicks "Create Bot"** → **AI Simple Mode** (default for first-timers)
   - AI: "Hi Sarah! 👋 Let's build your first trading bot together. What are you hoping to achieve with automated trading?"
   - Sarah (types): "I want to save for retirement, not looking to get rich quick"
   - AI: "Perfect! I recommend Dollar Cost Averaging (DCA). It's like putting $100 into Bitcoin every week - slow, steady, and low-risk. Sound good?"
   - Sarah: "Yes, sounds safe"
   - AI: "Great! Let's start with $100 every week on Bitcoin (BTC/USDT). I'll also add a 3% stop-loss to protect you if prices drop. Want to review?"
   - Sarah: "Yes" (sees live preview panel update with config)
   - AI: "Your bot is ready! Deploy to paper trading?" (explains it's $10k fake money)
   - Sarah: "Yes!" → **Confetti animation 🎉**

4. **Redirected to Dashboard**
   - Sees 1 bot: "Sarah's DCA Bot" (Status: Active, Capital: $100/week)
   - Tooltip: "Your bot will execute its first trade in 7 days. Check back then!"

5. **7 Days Later** (Email notification)
   - "Your bot made its first trade! 🎉 Bought 0.0015 BTC at $66,000"
   - Sarah logs in → Dashboard shows:
     - Total Trades: 1
     - P&L: -$0.10 (due to fees)
     - Paper Balance: $9,899.90
   - Tooltip: "Fees are normal! DCA works over months, not days."

6. **30 Days Later**
   - 4 trades executed
   - P&L: +$12 (3% gain)
   - Sarah clicks "Clone Bot" → Creates "Sarah's ETH DCA Bot"
   - **Free tier limit hit**: "You've reached 1 bot limit. Upgrade to Pro for unlimited bots."

7. **Upgrade to Pro** ($24/month)
   - Sarah sees value (bot works, made money), upgrades
   - Now runs 3 DCA bots (BTC, ETH, SOL)

**Why This Journey Works**:
- ✅ Zero intimidation (AI explains everything)
- ✅ Risk-free (paper trading)
- ✅ Quick win (first trade in 7 days)
- ✅ Natural upsell (clone bot → hit limit → upgrade)

---

### Journey 2: Experienced Trader (Knows Crypto)

**Persona**: Mike, 35, day trader, manages $50k portfolio, wants to automate repetitive strategies.

**Journey**:
1. **Lands on homepage** (Reddit recommendation)
   - Sees "Pro Mode" mentioned → Interested

2. **Signs up** → **Skips onboarding** (clicks "I know what I'm doing")

3. **Clicks "Create Bot"** → **Pro Mode**
   - Sees 5-tab dashboard
   - **Strategy Tab**: Selects "Grid Trading" (his favorite manual strategy)
   - **Risk Tab**: Configures:
     - Stop-loss: 5% (aggressive)
     - Take-profit: 15%
     - Position size: $500 per grid
     - Daily loss limit: $1,000
   - **Technical Tab**: Adds RSI indicator (overbought/oversold zones)
   - **Backtest Tab**: Runs 90-day backtest → +18% return (mock data, but validates config)
   - **Review Tab**: Exports JSON config (saves to GitHub for version control)

4. **Deploys to Paper Trading**
   - Wants to test before real money
   - Runs for 2 weeks → +$850 paper profit
   - Confident it works

5. **Clones Grid Bot 5 Times** (Different pairs: BTC, ETH, BNB, SOL, ADA)
   - Diversifies across assets
   - Each bot: $500 capital, different grid ranges

6. **Discovers Marketplace**
   - Sees "Top Performing DCA Bot - 30% YTD"
   - Clones it → Adds to portfolio
   - Now running 6 bots (5 grid + 1 DCA)

7. **Shares Own Strategy**
   - Creates premium listing: "Mike's Proven Grid Strategy"
   - Price: $29 one-time
   - Description: "Used this to make $5k in 3 months. Optimized for volatile markets."
   - Uploads 3-month P&L screenshot
   - Gets 12 sales in first week → Earns $247 (70% of $348)

8. **Upgrades to Enterprise** ($99/month)
   - Wants 80/20 revenue split (saves $84/month at current sales pace)
   - Gets verified badge + featured listing
   - Sales increase to 40/month → $800/month passive income

**Why This Journey Works**:
- ✅ Pro mode gives full control (no hand-holding)
- ✅ Marketplace creates passive income (creator economy)
- ✅ Natural upgrade path (Pro → Enterprise based on marketplace success)

---

### Journey 3: Influencer/Educator (Business Opportunity)

**Persona**: Alex, 30, YouTube crypto educator (50k subs), wants to monetize audience without sponsored ads.

**Journey**:
1. **Hears About TradingBot** (Twitter buzz about marketplace)
   - Sees revenue share model (70/30)
   - Realizes: "I can create premium bots for my audience"

2. **Signs Up → Pro Plan** ($24/month)
   - Creates 3 bots based on strategies from YouTube videos:
     - "Beginner's Safe DCA" (conservative, low-risk)
     - "Swing Trader's Momentum Bot" (medium risk)
     - "Grid Master Pro" (advanced, high returns)

3. **Runs All Bots for 90 Days** (Builds Track Record)
   - DCA: +15% (consistent, safe)
   - Momentum: +40% (volatile, big wins)
   - Grid: +28% (steady profits)

4. **Creates Marketplace Listings**
   - **DCA Bot**: FREE (builds trust, brings audience to platform)
   - **Momentum Bot**: $19 one-time
   - **Grid Bot**: $39 one-time

5. **Promotes on YouTube**
   - Video: "I Built 3 Trading Bots - Here's My Results (You Can Clone Them)"
   - Description includes affiliate link (10% of referred users' subscriptions)
   - 20k views → 500 signups (2.5% conversion)
   - 200 clone DCA bot (free)
   - 80 buy Momentum bot ($1,520 sales → $1,064 earnings)
   - 40 buy Grid bot ($1,560 sales → $1,092 earnings)
   - **Total earnings**: $2,156 in Month 1

6. **Upgrades to Enterprise** ($99/month)
   - 80/20 split increases earnings by $431
   - Gets verified badge (trust signal)
   - Featured listing (more visibility)

7. **Builds Community**
   - Monthly leaderboard video ("My bots made $X this month")
   - Students share their results (social proof)
   - Creates "Alex's Bot Collection" (5 bots, $99 bundle)
   - Sells 20 bundles/month → $1,386/month
   - Plus affiliate revenue from referrals
   - **Total passive income**: $3,000-5,000/month

**Why This Journey Works**:
- ✅ Influencers have built-in audience (distribution)
- ✅ Marketplace enables monetization (revenue share)
- ✅ Platform grows virally (influencers bring users)
- ✅ Win-win-win (platform, creator, users)

---

## 💰 MONETIZATION STRATEGY

### Tier Breakdown

#### **STARTER** - FREE Forever

**What You Get**:
- ✅ **1 bot** (forever, not just trial)
- ✅ **Paper trading only** ($10k virtual balance, resets monthly)
- ✅ **4 strategy templates** (DCA, Grid, Momentum, Mean Reversion)
- ✅ **3 AI bot creations per month** (experience AI magic)
- ✅ **Marketplace access** (browse and use FREE bots only)
- ✅ **Basic analytics** (P&L, win rate, trade history)
- ✅ **Community support** (Discord, docs)

**Limits**:
- ❌ Only 1 active bot at a time
- ❌ No live trading (paper mode only)
- ❌ Can't access premium marketplace bots
- ❌ No backtesting (Pro feature)
- ❌ No AI trade alerts

**Goal**: Let users learn and succeed risk-free, then upgrade when they're confident.

**Conversion Triggers**:
- Hit 1 bot limit (want to test multiple strategies)
- Bot performs well (ready for real money)
- See premium marketplace bots (FOMO)
- Use all 3 AI creations (want more guidance)

---

#### **PRO** - $24/month (or $19/month annual)

**Positioning**: "For serious traders ready to automate and scale"

**Everything in Starter, Plus**:

**Bot Management**:
- ✅ **Unlimited bots** (run as many as you want)
- ✅ **Live trading enabled** (connect Binance API, real money)
- ✅ **Paper trading unlimited** (test before deploying)

**AI & Creation**:
- ✅ **Unlimited AI bot creation** (no monthly limit)
- ✅ **Advanced AI recommendations** (optimization suggestions)
- ✅ **Backtesting engine** (test on historical data)

**Marketplace**:
- ✅ **Full marketplace access** (browse, use, create premium bots)
- ✅ **Create & sell bots** (70% revenue share - you keep $14 of $20 sale)
- ✅ **Premium bot access** (buy/subscribe to top strategies)

**Analytics**:
- ✅ **Advanced analytics** (Sharpe ratio, max drawdown, Sortino)
- ✅ **Performance comparison** (compare multiple bots)
- ✅ **Detailed trade logs** (export to CSV)

**Support**:
- ✅ **Priority email support** (24-48 hour response)
- ✅ **Pro Discord channel** (direct dev interaction)
- ✅ **Early access to new features**

**Limits** (To Drive Enterprise Upsell):
- Live trading capital: Up to $50,000 per account
- Concurrent live bots: Up to 25
- Marketplace revenue share: 70/30 split

**Price Rationale**:
- Competitors: 3Commas ($29), TradeSanta ($25), Cryptohopper ($24-29)
- **Our advantage**: Match/undercut price + better AI + marketplace

**Annual Discount**:
- $24/month × 12 = $288/year
- Annual: $19/month × 12 = $228/year (**20% savings**)

---

#### **ENTERPRISE** - $99/month (or $79/month annual)

**Positioning**: "For professionals, institutions, and top creators"

**Everything in Pro, Plus**:

**Unlimited Everything**:
- ✅ **Unlimited bots** (no concurrent limits)
- ✅ **Live trading capital**: Up to $500,000
- ✅ **API rate limits**: 5x higher (faster execution)

**Advanced Features**:
- ✅ **Multi-exchange support** (Binance, Coinbase, Kraken - future)
- ✅ **Cross-exchange arbitrage** (exploit price differences)
- ✅ **Portfolio risk management** (coordinate bots)
- ✅ **Custom technical indicators** (build your own)
- ✅ **White-label options** (custom branding for resellers)

**Marketplace Benefits**:
- ✅ **Premium seller account** (verified badge, featured listing)
- ✅ **Higher revenue share**: 80/20 (you keep $16 of $20 sale)
- ✅ **Marketplace analytics** (sales data, engagement)
- ✅ **Private bot sales** (sell directly to specific users)

**AI & Automation**:
- ✅ **Dedicated AI compute** (faster responses)
- ✅ **Custom AI training** (future: train on your data)
- ✅ **API access** (automate bot creation via REST API)
- ✅ **Webhook integrations** (TradingView, Discord, Slack)

**Support & Services**:
- ✅ **Dedicated account manager** (for $100k+ capital accounts)
- ✅ **Priority support**: 12-hour response SLA
- ✅ **Private Slack channel** (direct dev access)
- ✅ **Strategy consultation**: 1 hour/month (future)

**Who Needs This?**
- Professional traders managing $100k+ capital
- Trading teams/firms
- Influencers/educators selling strategies
- Quant traders needing API access
- Crypto funds testing algorithms

**Price Rationale**:
- Competitors: 3Commas Pro ($99), Cryptohopper Hero ($107-129)
- **Our advantage**: Match price + unique features (marketplace, AI, API)

---

### Revenue Projections (Year 1)

| Month | Users | Starter | Pro ($24) | Enterprise ($99) | MRR | ARR |
|-------|-------|---------|-----------|------------------|-----|-----|
| 1 | 200 | 190 | 8 | 2 | $390 | $4,680 |
| 3 | 500 | 425 | 60 | 15 | $2,925 | $35,100 |
| 6 | 2,000 | 1,700 | 250 | 50 | $10,950 | $131,400 |
| 12 | 10,000 | 8,500 | 1,200 | 300 | $58,500 | $702,000 |

**Additional Revenue**:
- Marketplace (30% of sales): +$500-2,000/month by Month 12
- Featured listings: +$500-1,000/month
- **Total Year 1**: $60-65k MRR = **$720-780k ARR**

**Assumptions**:
- 15% Starter → Pro conversion by Month 3
- 5% Pro → Enterprise conversion
- 150% monthly growth (Month 1-3), 50% (Month 4-6), 25% (Month 7-12)

---

### Marketplace Revenue Share

**For Pro Sellers**:
- **70/30 split**: Creator keeps 70%, platform keeps 30%
- Example: Bot sells for $20 → Creator gets $14, platform gets $6

**For Enterprise Sellers**:
- **80/20 split**: Creator keeps 80%, platform keeps 20%
- Example: Bot sells for $20 → Creator gets $16, platform gets $4
- **Why upgrade?** If selling $500/month in bots:
  - Pro (70/30): Keep $350
  - Enterprise (80/20): Keep $400 → **Save $50/month** (pays for $49 of $99 upgrade)

**Marketplace Fees** (Optional):
- FREE to list bots
- $10/month - Featured placement
- $25/month - Verified badge + marketing

---

### Competitive Pricing Analysis

| Platform | Starter | Mid-Tier | Pro | TradingBot Advantage |
|----------|---------|----------|-----|----------------------|
| **TradingBot** | FREE (1 bot) | $24/mo (unlimited) | $99/mo | AI + Marketplace + Better UX |
| **3Commas** | FREE (limited) | $29/mo | $99/mo | We're $5 cheaper + better AI |
| **Cryptohopper** | FREE (paper) | $24-29/mo | $129/mo | We match price, better marketplace |
| **TradeSanta** | $25/mo | $45/mo | $90/mo | We're cheaper + no bot limits at Pro |
| **Pionex** | FREE (built-in bots) | N/A | N/A | We have customization + AI |

**Our Edge**:
1. **Forever free tier** (not just trial)
2. **AI-powered setup** (unique to us)
3. **Marketplace ecosystem** (create, share, earn)
4. **Better pricing** ($24 vs $29+ competitors)
5. **Modern UX** (Next.js 15, smooth animations)

---

## 🎯 SUCCESS METRICS

### User Acquisition & Activation

**Acquisition**:
- Target: 200 signups Month 1 → 10,000 by Month 12
- Channels: SEO, Reddit, YouTube, Twitter
- CAC (Customer Acquisition Cost): <$50 (organic), <$100 (paid)

**Activation** (User Creates Bot):
- Target: 70% of signups create at least 1 bot
- Time to activation: <10 minutes (from signup to first bot deployed)
- First bot success: 80%+ deploy successfully (no errors)

**Engagement** (Bot Usage):
- Target: 60% of users have active bot after 7 days
- First trade: Within 24-48 hours of deployment
- Weekly active users (WAU): 50%+
- Monthly active users (MAU): 70%+

---

### Conversion & Revenue

**Free → Pro Conversion**:
- Target: 15% by Month 3 (industry standard: 10-20%)
- Time to conversion: 30-60 days avg
- Conversion triggers:
  - Hit bot limit: 40% of conversions
  - Want live trading: 35%
  - Premium marketplace access: 15%
  - AI limit: 10%

**Pro → Enterprise Conversion**:
- Target: 5% of Pro users (high-value users)
- Indicators:
  - Managing $100k+ capital
  - Selling $500+/month in marketplace
  - Need API access
  - Multi-exchange interest

**Churn Rate**:
- Target: <5% monthly churn
- Acceptable: 5-10%
- Red flag: >10%

**Revenue Goals**:
- Month 1: $390 MRR
- Month 6: $10,950 MRR
- Month 12: $58,500 MRR (**$702k ARR**)

---

### Product Quality & Performance

**Bot Execution**:
- Uptime: 99.5%+ (max 3.6 hours downtime/month)
- Execution accuracy: 100% (all DCA trades execute as configured)
- Latency: <5 seconds from trigger to execution (paper trading)
- Error rate: <0.1% (1 error per 1,000 executions)

**User Experience**:
- Page load time: <2 seconds (p95)
- Time to first byte (TTFB): <300ms
- Mobile responsive: Works on 375px (iPhone SE)
- Dark mode: 100% coverage (all pages)
- Accessibility: WCAG 2.1 AA compliance

**AI Quality**:
- AI understanding: 90%+ of user inputs handled correctly
- AI safety: 100% of generated configs have mandatory stop-loss
- Response time: <3 seconds (streaming starts)
- User satisfaction: 4.0+ stars (on AI assistance)

---

### Marketplace Health

**Listings**:
- Target: 50+ premium bots by Month 6
- Quality: 4.0+ average star rating
- Diversity: All 4 strategy types represented

**Creators**:
- Active creators: 30+ by Month 12
- Top creator earnings: $1,000+/month
- Creator retention: 80%+ (keep listing after 90 days)

**Sales**:
- Monthly sales volume: $5,000+ by Month 12
- Platform revenue (30%): $1,500+/month
- Average bot price: $15-25 one-time or $10-20/month

**Engagement**:
- Marketplace visits: 50%+ of users
- Clone rate: 30%+ clone at least one bot
- Purchase rate: 10%+ buy premium bot

---

### Business Health KPIs

**Customer Lifetime Value (LTV)**:
- Target: $200+ (12+ month avg retention)
- Calculation: $24/mo × 12 months × 70% retention = $201.60

**CAC Payback Period**:
- Target: <3 months
- Calculation: $50 CAC ÷ $24 MRR = 2.08 months ✅

**LTV:CAC Ratio**:
- Target: >3:1
- Calculation: $200 LTV ÷ $50 CAC = 4:1 ✅ (healthy)

**Gross Margin**:
- Target: >80%
- Infrastructure costs: $500-2,000/month (Supabase, Vercel, APIs)
- At $60k MRR: (60k - 2k) / 60k = 96.7% ✅

**Net Revenue Retention (NRR)**:
- Target: >100% (expansion revenue > churn)
- Upsells: Free → Pro, Pro → Enterprise
- Expansion: Marketplace revenue share grows over time

---

## 🏗️ TECHNICAL ARCHITECTURE

### Tech Stack Summary

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript | Latest features, App Router, SSR for SEO |
| **UI Framework** | TailwindCSS v4, shadcn/ui | Modern, accessible, 27 components ready |
| **Backend** | Supabase (PostgreSQL + Edge Functions) | Serverless, auto-scaling, built-in auth |
| **Database** | PostgreSQL (Supabase) | Relational data, RLS for security, JSONB for flexibility |
| **Auth** | Supabase Auth | JWT-based, PKCE flow, recovery session detection |
| **AI** | Anthropic Claude Sonnet 3.5 | Superior reasoning, function calling, structured outputs |
| **Exchange API** | Binance (REST + WebSocket) | Largest exchange, best liquidity, extensive API |
| **Real-time** | Supabase Realtime (WebSocket) | Database change subscriptions, 100-300ms latency |
| **Animations** | Framer Motion | Smooth, performant, industry standard |
| **Charts** | Recharts | React-native, TypeScript support, composable |
| **Payments** | Stripe | Standard for SaaS, handles subscriptions |
| **Hosting** | Vercel | Optimized for Next.js, edge network, auto-scaling |
| **Monitoring** | Sentry | Error tracking, performance monitoring |

---

### Database Architecture (7 Tables)

**Security Model**: Row Level Security (RLS) on ALL tables
- Users can only access their own data
- Admin policies for platform operations
- Public policies for marketplace (read-only)

**Optimization**:
- Indexes on (user_id, status, created_at) for fast queries
- JSONB for flexible strategy params
- Soft deletes (deleted_at) for audit trail
- Foreign keys with CASCADE for data integrity

**Scalability**:
- Connection pooling via PgBouncer (Supabase built-in)
- Read replicas (future, if needed at 10k+ users)
- Partitioning by date (future, for trade logs)

---

### API Architecture

**Next.js API Routes** (`/app/api`):
- Server-side only (not exposed to frontend bundle)
- TypeScript with Zod validation
- Error handling with user-friendly messages
- Rate limiting via Supabase (future: Upstash Redis)

**Supabase Edge Functions** (Deno Deploy):
- Bot executor (cron: every 60 seconds)
- AI strategy recommender (on-demand)
- Market data fetcher (cron: every 30 seconds)
- Trade alerts (cron: every 5 minutes)

**Security**:
- All routes use `requireNormalAuth()` (except public endpoints)
- Input validation with Zod schemas
- SQL injection prevention (parameterized queries)
- XSS protection (React escapes by default)
- CSRF protection (SameSite cookies)

---

### Bot Execution Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. Supabase Cron Trigger (every 60 seconds)            │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Edge Function: bot-executor                          │
│    - Fetch active bots (status = 'active')              │
│    - For each bot: Check if execution needed            │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Market Data Service                                  │
│    - Fetch current price from Binance (WebSocket cache) │
│    - Get 24h volatility, volume                         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Strategy Logic (DCA Only for MVP)                   │
│    - Check if interval elapsed (e.g., 24 hours)         │
│    - Calculate buy amount from config                   │
│    - Validate against risk limits                       │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Trade Simulator (Paper Trading)                     │
│    - Simulate order execution                           │
│    - Apply realistic slippage (0.1-0.5%)                │
│    - Apply trading fees (0.1%)                          │
│    - Generate trade record                              │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 6. Database Updates (Atomic Transaction)               │
│    - Insert trade record                                │
│    - Update paper balance                               │
│    - Update bot stats (total_pnl, total_trades)         │
│    - Insert bot log entry                               │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 7. Supabase Realtime Broadcast                         │
│    - WebSocket notifies frontend                        │
│    - Dashboard updates in real-time (<5 sec)            │
└─────────────────────────────────────────────────────────┘
```

---

### AI Integration Flow

```
┌─────────────────────────────────────────────────────────┐
│ User Types Message in Chat Interface                    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ Frontend: POST /api/ai/chat                             │
│ Body: { messages: [...], step: 1 }                      │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ API Route: Validate + Forward to Edge Function         │
│ - Check user auth                                        │
│ - Check AI usage quota (3/month for Starter)            │
│ - Forward to ai-strategy-recommender                    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ Edge Function: ai-strategy-recommender                  │
│ - Load system prompt based on step (1-5)                │
│ - Call Anthropic Claude API                             │
│ - Use function calling for structured output            │
│ - Stream response back                                  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ Anthropic Claude Sonnet 3.5                             │
│ - Analyze user input                                     │
│ - Generate recommendation                                │
│ - Return JSON: { strategy, config, reasoning }          │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ Edge Function: Post-Process                             │
│ - Validate AI output (safety checks)                    │
│ - Ensure stop-loss is present                           │
│ - Save conversation to ai_conversations table           │
│ - Return to frontend                                    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ Frontend: Update UI                                     │
│ - Display AI message in chat                            │
│ - Update live preview panel                             │
│ - Show quick-reply buttons                              │
│ - Confetti if final step (bot created)                  │
└─────────────────────────────────────────────────────────┘
```

---

### Security Architecture

**Authentication**:
- JWT tokens with AMR claim (recovery vs. normal session)
- Supabase Auth handles token rotation
- `requireNormalAuth()` utility for protected routes
- Middleware enforces auth on /dashboard, /bots

**Authorization**:
- Row Level Security (RLS) on all tables
- `auth.uid() = user_id` policy pattern
- Marketplace: Public read, creator-only write
- Admin policies for platform operations

**Data Protection**:
- Binance API keys encrypted at rest (Supabase Vault - future)
- Passwords hashed (bcrypt via Supabase Auth)
- Sensitive data never exposed to frontend
- HTTPS-only (TLS 1.3)

**API Security**:
- Rate limiting (5 req/sec per user - future: Upstash)
- Input validation (Zod schemas)
- SQL injection prevention (parameterized queries)
- XSS protection (React auto-escaping)
- CORS configured (allow only tradingbot.com)

---

### Scalability Considerations

**100 Users** (Month 1-3):
- ✅ Supabase Free Tier (500 connections)
- ✅ Vercel Hobby (100GB bandwidth)
- ✅ Anthropic API ($50/month)
- **Total cost**: $0-100/month

**1,000 Users** (Month 6):
- ✅ Supabase Pro ($25/month)
- ✅ Vercel Pro ($20/month)
- ✅ Anthropic API ($500/month)
- **Total cost**: $545/month (~1% of revenue)

**10,000 Users** (Month 12):
- ⚠️ Need optimization:
  - Database connection pooling (PgBouncer)
  - Redis caching for market data (Upstash $10/mo)
  - CDN for static assets (Cloudflare $20/mo)
  - Rate limiting (Upstash Redis)
- ✅ Supabase Pro ($200/month estimated)
- ✅ Vercel Pro ($20/month + overages)
- ✅ Anthropic API ($2,000/month)
- **Total cost**: $2,250/month (~4% of revenue)

**Bottlenecks**:
1. Database connections (PostgreSQL limit: 500)
   - Solution: PgBouncer (Supabase built-in)
2. Edge Function invocations (50M/month limit)
   - Solution: Optimize bot executor (batch processing)
3. Binance rate limits (1,200 req/min)
   - Solution: Aggressive caching (30-60s TTL)

---

## 🚀 LAUNCH CRITERIA

### What "Ready to Launch" Means

**Minimum Bar** (All Must Be True):

#### Functional Completeness
- ✅ All 3 bot creation modes work end-to-end (Template, AI, Pro)
- ✅ Bots execute DCA trades successfully (0 failures in 7-day test)
- ✅ Paper trading balance tracked accurately (±$0.01 precision)
- ✅ Dashboard shows real data (no mock data)
- ✅ Start/pause/stop controls work reliably
- ✅ Edit/delete/clone operations successful

#### User Experience
- ✅ Mobile responsive (works on iPhone SE 375px)
- ✅ Dark mode works perfectly (no theme flashing)
- ✅ Page load <2 seconds (p95)
- ✅ Zero TypeScript errors (clean build)
- ✅ All animations smooth (60fps)
- ✅ Loading states on all async operations
- ✅ Error messages are user-friendly (no stack traces)

#### Data Quality
- ✅ RLS policies tested (users can't access others' data)
- ✅ No data loss in 7-day continuous test
- ✅ Database migrations reversible (rollback tested)
- ✅ Backup strategy in place (Supabase daily backups)

#### Security
- ✅ No known security vulnerabilities (Snyk scan clean)
- ✅ Auth bypass vulnerability fixed (JWT AMR check)
- ✅ Environment variables secured (not in repo)
- ✅ API routes require auth (except public endpoints)
- ✅ HTTPS-only (TLS 1.3)

#### Performance
- ✅ Bot execution latency <5 seconds (paper trading)
- ✅ WebSocket updates <5 seconds (trade to dashboard)
- ✅ AI response starts streaming <3 seconds
- ✅ Can handle 100 concurrent users (load tested)

#### Content & Polish
- ✅ Landing page copy finalized (value prop clear)
- ✅ Onboarding checklist guides new users
- ✅ Error messages helpful (explain what to do)
- ✅ Success states celebrate wins (confetti, toasts)
- ✅ Empty states guide next action (no dead ends)

#### Legal & Compliance
- ✅ Privacy policy published (/privacy)
- ✅ Terms of service published (/terms)
- ✅ Disclaimer: Paper trading only, not financial advice
- ✅ User data export available (GDPR compliance)

#### Monitoring & Support
- ✅ Sentry error tracking configured
- ✅ Supabase logs monitored
- ✅ Discord community set up
- ✅ Support email configured (support@tradingbot.com)
- ✅ FAQ page with common questions

---

### Pre-Launch Checklist

**1 Week Before Launch**:
- [ ] Recruit 20 beta testers (friends, Reddit, Twitter)
- [ ] Beta test for 7 days (track bugs and feedback)
- [ ] Fix critical bugs (P0 only, defer P1/P2)
- [ ] Finalize pricing page (/pricing)
- [ ] Write launch blog post
- [ ] Prepare demo video (3 minutes)
- [ ] Set up analytics (Plausible or PostHog)

**Launch Day**:
- [ ] Deploy to production (Vercel)
- [ ] Run database migrations (Supabase)
- [ ] Smoke test all flows (create bot, execute trade, dashboard)
- [ ] Post on Product Hunt (10am EST)
- [ ] Post on Reddit (r/cryptocurrency, r/algotrading)
- [ ] Tweet launch announcement
- [ ] Email beta testers (thank them + ask for reviews)
- [ ] Monitor errors (Sentry dashboard)
- [ ] Respond to support (Discord, email)

**Week 1 Post-Launch**:
- [ ] Daily check-ins (errors, user feedback)
- [ ] Fix critical bugs within 24 hours
- [ ] Respond to all support within 12 hours
- [ ] Ship 2-3 small improvements (quick wins)
- [ ] Track key metrics (signups, activations, conversions)
- [ ] Collect testimonials (ask successful users)

---

### Success Definition (30 Days Post-Launch)

**Minimum Success** (We Can Iterate):
- 200+ signups
- 70%+ create at least 1 bot
- 50%+ have active bot after 7 days
- 10+ paying customers (Pro tier)
- 4.0+ star NPS (user satisfaction)
- <5% churn (users don't abandon)

**Good Success** (Strong Product-Market Fit):
- 500+ signups
- 80%+ create bot
- 60%+ active after 7 days
- 30+ paying customers ($720 MRR)
- 4.5+ star NPS
- <3% churn

**Exceptional Success** (Ready to Scale):
- 1,000+ signups
- 90%+ create bot
- 70%+ active after 7 days
- 100+ paying customers ($2,400 MRR)
- 4.8+ star NPS
- <2% churn
- Organic word-of-mouth (users invite friends)

---

## 📝 APPENDIX

### Tech Stack Links

- **Next.js 15**: https://nextjs.org/docs
- **React 19**: https://react.dev
- **Supabase**: https://supabase.com/docs
- **Anthropic Claude**: https://docs.anthropic.com
- **TailwindCSS v4**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Framer Motion**: https://www.framer.com/motion
- **Recharts**: https://recharts.org/en-US
- **Binance API**: https://binance-docs.github.io/apidocs

### Competitor Research

- **3Commas**: https://3commas.io (pricing: $29-99/mo)
- **Cryptohopper**: https://cryptohopper.com (pricing: $24-129/mo)
- **TradeSanta**: https://tradesanta.com (pricing: $25-90/mo)
- **Pionex**: https://pionex.com (free built-in bots)

### Design Inspiration

- **Linear**: https://linear.app (modern SaaS UX)
- **Vercel**: https://vercel.com (dashboard design)
- **Stripe**: https://stripe.com (pricing page)
- **Notion**: https://notion.so (onboarding flow)

### Community & Support

- **Discord**: discord.gg/tradingbot (coming soon)
- **Twitter**: @tradingbot_ai (coming soon)
- **GitHub**: github.com/tradingbot (issues)
- **Email**: support@tradingbot.com

---

## 🎉 CONCLUSION

### This MVP Is Focused

**What We're Building**:
- ✅ Bot creation (3 modes, AI-powered, delightful UX)
- ✅ Paper trading (DCA strategy, prove execution works)
- ✅ Bot management (dashboard, CRUD, filters)
- ✅ Marketplace preview (Phase 4 - browse, clone, share)
- ✅ AI trade alerts (Phase 5 - proactive recommendations)

**What We're NOT Building** (Yet):
- ❌ Live trading (too risky without extensive testing)
- ❌ Complex strategies (Grid, Momentum, Mean Reversion execution)
- ❌ Real backtesting (mock data sufficient for MVP)
- ❌ Multi-exchange (focus on Binance)
- ❌ Advanced analytics (basic P&L is enough)

### This MVP Is Differentiated

**Competitors** focus on algo traders (complex, intimidating).
**We** focus on EVERYONE (AI-guided, marketplace, modern UX).

**Competitors** are expensive ($29-129/month).
**We're** accessible ($24 Pro, forever free tier).

**Competitors** are tools (you trade alone).
**We're** a platform (create, share, learn together).

### This MVP Is Achievable

**Phase 1**: ✅ Complete (auth, design system)
**Phase 2**: ✅ Complete (bot creation UI, 10,000+ lines)
**Phase 3**: 🏗️ 3-4 weeks (backend, paper trading)
**Phase 4**: 2-3 weeks (marketplace)
**Phase 5**: 2-3 weeks (AI alerts)

**Total**: 8-10 weeks from today to full MVP launch.

### This MVP Will Succeed Because

1. **It solves a real problem**: Algo trading is hard → We make it easy
2. **It has a moat**: AI-powered UX + marketplace ecosystem (hard to copy)
3. **It's priced right**: $24/mo undercuts $29+ competitors
4. **It's delightful**: Smooth animations, modern design, AI magic
5. **It's focused**: Ship fast, learn fast, iterate fast

---

**Let's build the platform that makes bot trading accessible to everyone.** 🚀

**Last Updated**: November 16, 2025
**Version**: 2.0 (Ultimate MVP - Multi-Agent Analysis)
**Status**: Ready to Execute Phase 3

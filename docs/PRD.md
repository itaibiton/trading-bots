# Product Requirements Document (PRD)
## TradingBot - AI-Powered Automated Crypto Trading Platform

**Version:** 1.0
**Date:** 2025-11-11
**Status:** Active Development
**Owner:** Product Team

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement & Market Opportunity](#problem-statement--market-opportunity)
3. [Target Users & Personas](#target-users--personas)
4. [Product Vision & Goals](#product-vision--goals)
5. [Success Metrics & KPIs](#success-metrics--kpis)
6. [Core Features](#core-features)
7. [User Flows & Journeys](#user-flows--journeys)
8. [AI Integration Specifications](#ai-integration-specifications)
9. [Risk Management Framework](#risk-management-framework)
10. [Dashboard & Analytics Requirements](#dashboard--analytics-requirements)
11. [Technical Architecture & Requirements](#technical-architecture--requirements)
12. [Phase Breakdown](#phase-breakdown)
13. [Go-to-Market Strategy](#go-to-market-strategy)
14. [Risks & Mitigation](#risks--mitigation)
15. [Appendix](#appendix)

---

## Executive Summary

TradingBot is an AI-powered SaaS platform that democratizes automated cryptocurrency trading by combining sophisticated AI assistance with risk management and user-friendly interfaces. The platform enables users of all experience levels to create, configure, and deploy trading bots without writing code.

### Key Differentiators

1. **AI-Powered Bot Creation** - Hybrid approach where AI both suggests strategies AND helps configure through conversation
2. **Comprehensive Risk Management** - Built-in safeguards with capital limits, stop-loss, and market condition filters
3. **Progressive Complexity** - Simple for beginners, powerful for advanced users
4. **Real-Time P&L Dashboard** - Instant visibility into bot performance and risk exposure

### MVP Scope

- **Paper Trading** - Simulated trading environment for risk-free testing
- **Single Exchange** - Binance integration (expandable later)
- **4 Strategy Templates** - DCA, Grid Trading, Momentum, Mean Reversion
- **AI-Assisted Setup** - Conversational bot configuration with Claude
- **Free Trial Model** - Trial period then paid subscription

---

## Problem Statement & Market Opportunity

### The Problem

1. **Trading is Time-Intensive** - Crypto markets operate 24/7, but humans can't monitor them constantly
2. **High Learning Curve** - Algorithmic trading requires programming skills and market knowledge
3. **Risk Management is Complex** - New traders often lose money due to poor risk controls
4. **Existing Solutions are Intimidating** - Most bot platforms assume technical expertise

### Market Opportunity

- **Growing Crypto Adoption** - Millions of retail crypto traders worldwide
- **Bot Trading Demand** - Automated trading market growing 15%+ annually
- **Accessibility Gap** - Few platforms serve non-technical users effectively
- **AI Timing** - LLM advancements make conversational bot creation feasible

### Why Now?

- AI models (Claude, GPT-4) can understand trading strategies and guide users
- Supabase and modern frameworks enable rapid MVP development
- Crypto market maturity creates demand for sophisticated retail tools
- Solo dev can compete with fast iteration and user-centric design

---

## Target Users & Personas

### Persona 1: Alex the Beginner

**Demographics:**
- Age: 25-35
- Occupation: Software Engineer or Marketing Professional
- Crypto Experience: 3-6 months, holds some BTC/ETH
- Technical Skills: Can use web apps, no coding

**Goals:**
- Learn about algorithmic trading safely
- Automate basic strategies (DCA) without coding
- Understand risk management basics
- Avoid losing money while learning

**Pain Points:**
- Overwhelmed by technical trading platforms
- Doesn't understand indicators or strategies
- Afraid of making costly mistakes
- Limited time to monitor markets

**How TradingBot Helps:**
- AI guides setup with simple questions
- Paper trading for risk-free learning
- Pre-built strategy templates (DCA)
- Clear explanations of risk settings

### Persona 2: Jordan the Part-Time Trader

**Demographics:**
- Age: 30-45
- Occupation: Full-time professional (finance, tech, healthcare)
- Crypto Experience: 2-3 years, active trader
- Technical Skills: Moderate, comfortable with spreadsheets and APIs

**Goals:**
- Automate proven strategies to save time
- Run multiple bots with different strategies
- Monitor performance without constant checking
- Optimize strategies based on market conditions

**Pain Points:**
- Can't monitor markets during work hours
- Misses opportunities due to manual trading
- Wants advanced features without coding
- Needs reliable execution and monitoring

**How TradingBot Helps:**
- Quick bot creation with templates
- Real-time dashboard with P&L metrics
- Mobile notifications for key events
- Advanced risk controls for peace of mind

### Persona 3: Morgan the Strategy Tester

**Demographics:**
- Age: 28-50
- Occupation: Trader, Analyst, or Quant (part-time)
- Crypto Experience: 5+ years, advanced trader
- Technical Skills: High, may know some coding

**Goals:**
- Quickly test and deploy new strategies
- Backtest strategies on historical data
- Compare multiple strategy performance
- Iterate and optimize without heavy coding

**Pain Points:**
- Coding bots from scratch is time-consuming
- Backtesting infrastructure is complex
- Wants flexibility without reinventing the wheel
- Needs detailed analytics and logs

**How TradingBot Helps:**
- Custom AI-configured bots
- Backtesting engine (future)
- Strategy comparison tools
- Detailed trade logs and analytics

---

## Product Vision & Goals

### Vision Statement

"Make algorithmic trading accessible to everyone through AI-powered guidance and built-in risk management, enabling traders to automate strategies confidently without coding."

### Product Goals (12 Months)

1. **Activation:** 70% of signups create at least one bot
2. **Engagement:** 50% of users deploy bots within 7 days
3. **Retention:** 40% 7-day retention, 25% 30-day retention
4. **Conversion:** 15% trial-to-paid conversion rate
5. **Satisfaction:** NPS score of 50+
6. **Scale:** Support 10,000+ active users with sub-100ms response times

### Success Criteria (MVP)

- ✅ Users can create bots via AI conversation in under 5 minutes
- ✅ Paper trading works reliably with real market data
- ✅ Dashboard shows accurate P&L in real-time
- ✅ No user loses money in paper trading mode (by design)
- ✅ 80%+ of test users successfully create and deploy a bot

---

## Success Metrics & KPIs

### North Star Metric

**Activated Users Running Bots** - Users who have at least one bot actively trading (paper or live)

### Key Performance Indicators

| Metric | Target (Month 3) | Target (Month 6) | Target (Month 12) |
|--------|------------------|------------------|-------------------|
| Total Signups | 500 | 2,000 | 10,000 |
| Activation Rate | 60% | 70% | 75% |
| Bot Deployment Rate | 40% | 50% | 60% |
| 7-Day Retention | 35% | 40% | 45% |
| 30-Day Retention | 20% | 25% | 30% |
| Trial Conversion | 10% | 15% | 20% |
| Active Bots | 200 | 1,000 | 5,000 |
| Avg. Bots per User | 1.2 | 1.5 | 2.0 |

### Product Health Metrics

- **Bot Success Rate** - % of bots that execute trades successfully
- **Average Session Duration** - Time spent in dashboard
- **Feature Adoption** - % using AI vs template creation
- **Error Rate** - Failed bot executions / total executions
- **Support Ticket Rate** - Tickets per 100 active users

---

## Core Features

### MoSCoW Prioritization

#### Must Have (MVP - Phase 2-3)

1. **AI-Assisted Bot Creation**
   - Conversational setup with Claude AI
   - Strategy suggestions based on user goals
   - Risk parameter recommendations
   - Plain language strategy explanation

2. **Bot Creation Wizard (Quick Start)**
   - 4 strategy templates: DCA, Grid, Momentum, Mean Reversion
   - Step-by-step configuration flow
   - Risk management questionnaire
   - Preview before deployment

3. **Risk Management System**
   - Per-bot capital allocation (% of total or fixed amount)
   - Stop-loss and take-profit settings
   - Daily/monthly loss limits
   - Max position size controls
   - Market volatility filters

4. **Paper Trading Mode**
   - Simulated trading with real market data
   - Virtual portfolio management
   - Real-time trade execution simulation
   - P&L tracking without real money

5. **Binance Integration**
   - Real-time market data feed
   - Order execution (paper mode)
   - Account balance queries
   - Trade history retrieval

6. **Dashboard with P&L**
   - Real-time bot status (running/paused/stopped)
   - Current P&L per bot and total
   - Win rate and success metrics
   - Recent trade activity
   - Risk exposure indicators

7. **Bot Management**
   - Start/pause/stop controls
   - Edit bot configuration
   - Delete bots
   - Clone/duplicate bots
   - View detailed bot history

#### Should Have (Phase 4-5)

8. **Backtesting Engine**
   - Test strategies on historical data
   - Performance visualization
   - Strategy optimization suggestions
   - Compare multiple strategies

9. **Advanced Analytics**
   - Sharpe ratio and risk metrics
   - Drawdown analysis
   - Trade distribution charts
   - Strategy comparison dashboard

10. **Alert System**
    - Email notifications for key events
    - Webhook integrations
    - Custom alert conditions
    - Mobile push notifications (future)

11. **Portfolio Management**
    - Multiple bot coordination
    - Cross-bot risk limits
    - Rebalancing recommendations
    - Capital allocation optimizer

12. **Live Trading Mode**
    - Real money trading with Binance API keys
    - Enhanced security (2FA, withdrawal whitelist)
    - Real-time order execution
    - Audit logs and compliance

#### Could Have (Phase 6+)

13. **Multi-Exchange Support**
    - Coinbase, Kraken, Bybit, OKX
    - Cross-exchange arbitrage
    - Unified portfolio view

14. **Social Features**
    - Strategy marketplace
    - Copy trading
    - Leaderboards
    - Community discussions

15. **Advanced Strategies**
    - Machine learning predictions
    - Multi-timeframe analysis
    - Options and futures strategies
    - Custom technical indicators

16. **White-Label Solution**
    - Branded platform for enterprise
    - Custom integrations
    - Dedicated infrastructure
    - API access for developers

#### Won't Have (Out of Scope)

- Stock market trading (focus on crypto first)
- Forex trading
- High-frequency trading (HFT)
- Margin trading (too risky for MVP)
- Social trading with real money (regulatory complexity)

---

## User Flows & Journeys

### Core User Journey: Creating First Bot

```
1. User signs up and lands on empty dashboard
   → "Welcome! Let's create your first trading bot"

2. User chooses creation path:

   PATH A: Quick Start (Template)
   ├─ Select strategy template (DCA, Grid, Momentum, Mean Reversion)
   ├─ Review strategy description with visuals
   ├─ Configure basic parameters (trading pair, capital)
   ├─ Answer risk management questions
   ├─ Preview bot configuration
   └─ Deploy bot to paper trading

   PATH B: AI Assistant (Custom)
   ├─ Chat with AI: "What are your trading goals?"
   ├─ AI asks clarifying questions
   ├─ AI suggests strategy based on answers
   ├─ User refines strategy in conversation
   ├─ AI configures risk parameters
   ├─ Preview bot configuration
   └─ Deploy bot to paper trading

3. Bot deployed successfully
   → Onboarding tutorial: "Watch your bot's first trade"
   → Dashboard updates with real-time data

4. User monitors bot performance
   → Receives notification when bot makes first trade
   → Reviews P&L and metrics
   → Decides to keep running or adjust settings

5. (Optional) User creates additional bots
   → Faster flow using learned knowledge
   → Experiments with different strategies
```

### Detailed Flow: AI-Assisted Bot Creation

```
Step 1: Initiate AI Chat
- User clicks "Create Bot with AI"
- Chat interface opens
- AI: "Hi! I'll help you create a trading bot. What are your main trading goals?"

Step 2: Goal Discovery
- User input examples:
  * "I want to buy the dip on Bitcoin"
  * "I want steady returns with low risk"
  * "I want to profit from volatility"
- AI clarifies goals with follow-up questions

Step 3: Strategy Recommendation
- AI: "Based on your goals, I recommend a [Strategy Name] strategy. Here's how it works..."
- AI explains strategy in plain language
- User can ask questions or request alternatives

Step 4: Parameter Configuration
- AI: "Let's configure your bot. How much capital do you want to allocate?"
- AI guides through each parameter with explanations
- Parameters:
  * Trading pair (BTC/USDT, ETH/USDT, etc.)
  * Capital allocation
  * Buy/sell triggers
  * Position sizing

Step 5: Risk Management
- AI: "Now let's set up risk controls to protect your capital."
- AI explains each risk setting:
  * Stop-loss percentage
  * Daily loss limit
  * Maximum position size
  * Volatility threshold
- AI recommends conservative defaults for beginners

Step 6: Preview & Confirmation
- Show full bot configuration card
- Highlight risk settings prominently
- Option to edit any parameter
- AI: "Review your bot. Ready to deploy to paper trading?"

Step 7: Deployment
- Create bot in database
- Initialize paper trading account
- Start bot execution
- Redirect to dashboard with success message

Step 8: Post-Deployment
- Show onboarding tooltip: "Your bot is now running in paper trading mode"
- Explain how to monitor performance
- Link to bot details page
```

### Risk Management Configuration Flow

```
Question 1: Capital Allocation
"How much capital do you want to allocate to this bot?"
- Options:
  * Percentage of total (10%, 25%, 50%)
  * Fixed amount ($100, $500, $1000)
- AI explains: "This limits your maximum exposure"

Question 2: Loss Protection
"What's the maximum loss you're comfortable with per trade?"
- Stop-loss percentage: 1%, 2%, 5%, 10%
- AI explains: "Your bot will exit trades if losses exceed this"

Question 3: Daily Limits
"Do you want to set daily trading limits?"
- Max daily loss: $ amount or %
- Max daily trades: number
- AI explains: "Prevents overtrading on volatile days"

Question 4: Position Sizing
"How should your bot size positions?"
- Options:
  * Fixed size (always trade X amount)
  * Percentage of capital (2%, 5%, 10%)
  * Dynamic (adjust based on volatility)
- AI recommends based on risk tolerance

Question 5: Market Conditions
"Should your bot pause trading during extreme volatility?"
- Volatility threshold: Low/Medium/High
- AI explains: "Protects you during market crashes"

Result: Risk Configuration Summary
- Show all settings in one view
- Explain overall risk profile (Conservative/Moderate/Aggressive)
- Allow adjustments before finalizing
```

---

## AI Integration Specifications

### AI Provider

**Primary:** Anthropic Claude (Sonnet 3.5)

**Rationale:**
- Superior instruction following for technical tasks
- 200K token context for complex conversations
- Strong reasoning for strategy recommendations
- Function calling for structured outputs
- Cost-effective for MVP scale

### AI Use Cases

#### 1. Strategy Recommendation

**Input:**
- User goals (free text)
- Risk tolerance (low/medium/high)
- Trading experience (beginner/intermediate/advanced)
- Available capital range

**Process:**
- Analyze user input with prompt engineering
- Map to suitable strategy type (DCA, Grid, Momentum, Mean Reversion)
- Explain strategy in user's language
- Provide example scenarios

**Output:**
- Recommended strategy name
- Plain language explanation
- Expected risk/reward profile
- Parameter suggestions

#### 2. Conversational Configuration

**Input:**
- Strategy type selected
- User responses to configuration questions

**Process:**
- Ask one parameter at a time
- Provide context and examples for each
- Validate input and suggest corrections
- Build complete bot configuration

**Output:**
- Structured bot configuration JSON
- Risk settings object
- Validation status

#### 3. Parameter Explanation

**Input:**
- Parameter name (e.g., "stop-loss", "position size")
- User experience level

**Process:**
- Generate beginner-friendly explanation
- Provide examples with numbers
- Suggest safe default values
- Explain implications of different values

**Output:**
- Plain language explanation
- Example scenarios
- Recommended value with reasoning

#### 4. Strategy Adjustment Suggestions

**Input (Future Phase):**
- Bot performance data
- Market conditions
- Win/loss ratio

**Process:**
- Analyze bot performance
- Identify underperforming parameters
- Suggest specific adjustments
- Explain reasoning

**Output:**
- Suggested parameter changes
- Expected impact explanation
- Risk assessment of changes

### Prompt Engineering Strategy

**System Prompt Template:**
```
You are an expert cryptocurrency trading assistant helping users create trading bots.

Context:
- User experience level: {beginner|intermediate|advanced}
- Platform: TradingBot (paper trading focused)
- Goal: Help user create a safe, effective trading bot

Guidelines:
1. Use plain language, avoid jargon
2. Always explain risk implications
3. Recommend conservative defaults for beginners
4. Ask clarifying questions when input is ambiguous
5. Validate parameter values are within safe ranges
6. Structure responses for easy parsing

Current Task: {strategy_recommendation|configuration|explanation}
```

**Function Calling Schema:**
```json
{
  "name": "create_bot_configuration",
  "description": "Generate bot configuration from conversation",
  "parameters": {
    "strategy_type": "enum [dca, grid, momentum, mean_reversion]",
    "trading_pair": "string (e.g., BTC/USDT)",
    "capital_allocation": "number",
    "risk_settings": {
      "stop_loss_percent": "number",
      "take_profit_percent": "number",
      "max_daily_loss": "number",
      "max_position_size": "number",
      "volatility_threshold": "enum [low, medium, high]"
    },
    "strategy_parameters": "object (strategy-specific)"
  }
}
```

### Error Handling & Fallbacks

- **AI Timeout:** Fall back to template-based creation
- **Invalid Configuration:** Show form validation errors, ask AI to correct
- **API Rate Limits:** Queue requests, show user-friendly loading state
- **Hallucination Detection:** Validate all numeric parameters against safe ranges

### Cost Management

- **Estimated Cost per Bot Creation:** $0.02-0.05 (Claude Sonnet)
- **Monthly Budget (1000 users):** ~$50-100
- **Caching Strategy:** Cache common strategy explanations
- **Rate Limiting:** 10 AI bot creations per user per day (free tier)

---

## Risk Management Framework

### Capital Allocation Controls

**Per-Bot Limits:**
- Minimum: $10 equivalent
- Maximum: 50% of total account value (configurable)
- Recommended for beginners: 10-20% per bot

**Portfolio-Wide Limits:**
- Total capital allocation across all bots
- Reserve cash requirement (minimum 20%)
- Maximum concurrent positions

### Trade-Level Risk Controls

**Stop-Loss Requirements:**
- Always required (cannot be disabled)
- Minimum: 0.5%
- Maximum: 20%
- Recommended: 2-5%

**Take-Profit Settings:**
- Optional but recommended
- Minimum: 1%
- Recommended: 1.5x stop-loss ratio
- Example: 3% stop-loss → 4.5% take-profit

**Position Sizing:**
- Fixed amount mode: Exact $ per trade
- Percentage mode: % of allocated capital
- Dynamic mode: Adjust based on volatility (future)
- Minimum position: $5
- Maximum position: Bot's allocated capital

### Time-Based Controls

**Daily Limits:**
- Maximum daily loss ($ or %)
- Maximum number of trades per day
- Trading hour restrictions (optional)

**Monthly Limits:**
- Maximum monthly loss ($ or %)
- Cumulative loss shutdown trigger

### Market Condition Filters

**Volatility Protection:**
- Low: Normal market (< 2% hourly change)
- Medium: Elevated volatility (2-5% hourly change)
- High: Extreme volatility (> 5% hourly change)
- Bot can pause during selected volatility levels

**Trend Filters:**
- Strong uptrend only
- Strong downtrend only
- Sideways market only
- Any market condition

**Volume Requirements:**
- Minimum 24h volume threshold
- Prevents trading illiquid pairs
- Default: $1M+ daily volume

### Emergency Shutoffs

**Automatic Shutdown Triggers:**
- Stop-loss hit X times in Y hours
- Daily loss limit reached
- Monthly loss limit reached
- Exchange API errors (3+ consecutive)
- Market circuit breaker events

**Manual Controls:**
- Pause bot (can resume)
- Stop bot (cannot resume, must reconfigure)
- Emergency stop all bots

### Risk Disclosure & Education

**Before First Bot Creation:**
- Show risk disclaimer modal
- Require checkbox: "I understand trading risks"
- Link to risk education resources
- Emphasize paper trading for learning

**Throughout Platform:**
- Risk score indicator per bot (Low/Medium/High)
- Warning badges for aggressive settings
- Tooltips explaining risk implications
- Links to help documentation

---

## Dashboard & Analytics Requirements

### Dashboard Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                     Navbar                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Portfolio Overview (Top Section)                   │
│  ┌──────────┬──────────┬──────────┬──────────┐    │
│  │ Total    │ Today's  │ Active   │ Total    │    │
│  │ P&L      │ P&L      │ Bots     │ Trades   │    │
│  └──────────┴──────────┴──────────┴──────────┘    │
│                                                     │
│  Bot Performance Grid (Middle Section)              │
│  ┌─────────────────┬─────────────────┐            │
│  │ Bot Card 1      │ Bot Card 2      │            │
│  │ - Status        │ - Status        │            │
│  │ - P&L           │ - P&L           │            │
│  │ - Win Rate      │ - Win Rate      │            │
│  │ - Controls      │ - Controls      │            │
│  └─────────────────┴─────────────────┘            │
│                                                     │
│  Quick Insights (Bottom Section)                    │
│  ┌──────────────┬──────────────┬─────────────┐    │
│  │ Risk         │ Trade        │ Market      │    │
│  │ Exposure     │ Activity     │ Conditions  │    │
│  └──────────────┴──────────────┴─────────────┘    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Priority 1: Portfolio Overview

**Total P&L Card:**
- Large prominent number with color coding
  - Green for profit
  - Red for loss
  - Gray for break-even
- Percentage gain/loss
- Time period selector (Today/Week/Month/All Time)
- Small sparkline chart showing trend

**Today's P&L Card:**
- Focus on current day performance
- Number of trades executed today
- Best performing bot today

**Active Bots Card:**
- Count of running bots
- Quick status: All healthy / Issues detected
- "Create New Bot" CTA button

**Total Trades Card:**
- Cumulative trades across all bots
- Win rate percentage
- Average trade duration

### Priority 2: Bot Performance Grid

**Bot Card Components:**

Each bot card shows:
```
┌─────────────────────────────────┐
│ [Bot Icon] Bot Name             │
│ Strategy: DCA                   │
│                                 │
│ Status: ● Running               │
│                                 │
│ P&L: +$45.23 (+4.52%)          │
│ Win Rate: 68%                   │
│ Trades Today: 3                 │
│                                 │
│ Capital: $1,000 ($1,045 now)   │
│ Risk Level: ◐ Medium            │
│                                 │
│ [Pause] [Settings] [Details]    │
└─────────────────────────────────┘
```

**Required Data Points:**
- Bot name (editable)
- Strategy type icon and name
- Current status (Running/Paused/Stopped/Error)
- Real-time P&L ($ and %)
- Win rate (wins / total trades)
- Number of trades today
- Allocated capital vs current value
- Risk level indicator
- Quick action buttons

**Sorting & Filtering:**
- Sort by: P&L, Win Rate, Name, Date Created
- Filter by: Status, Strategy Type, Risk Level
- Search by bot name

### Priority 3: Risk Exposure Panel

**Overall Risk Metrics:**
- Total capital at risk (sum of all allocated capital)
- Largest position size currently open
- Number of open positions
- Risk distribution pie chart (by bot)

**Risk Warnings:**
- Alert if total allocation > 80%
- Warning if any bot has aggressive risk settings
- Notice if multiple bots trade same pair

**Risk Score:**
- Portfolio-wide risk score (1-10)
- Breakdown by factor:
  - Capital allocation
  - Leverage usage (future)
  - Correlation risk
  - Market conditions

### Priority 4: Trade Activity Feed

**Recent Trades List:**
```
┌─────────────────────────────────────────────┐
│ Recent Activity                             │
├─────────────────────────────────────────────┤
│ 🟢 DCA Bot #1 - BUY 0.005 BTC @ $43,200    │
│    2 minutes ago                            │
│                                             │
│ 🔴 Grid Bot - SELL 0.1 ETH @ $2,250        │
│    15 minutes ago (+$12.50)                 │
│                                             │
│ 🟢 Momentum Bot - BUY 100 ADA @ $0.45      │
│    1 hour ago                               │
│                                             │
│ [View All Trades]                           │
└─────────────────────────────────────────────┘
```

**Data Points:**
- Trade direction (BUY/SELL) with color coding
- Bot name
- Amount and asset
- Price
- Timestamp (relative)
- P&L for completed trades
- Link to full trade details

**Filters:**
- By bot
- By asset
- By trade type (entry/exit)
- Time range

### Data Refresh Requirements

**Real-Time Updates:**
- Bot status changes (WebSocket)
- New trades (WebSocket)
- P&L updates (every 5 seconds)

**Periodic Updates:**
- Market data (every 30 seconds)
- Risk metrics (every 60 seconds)

**On-Demand:**
- Historical charts (when viewed)
- Detailed trade logs (when opened)

### Mobile Responsiveness

- Stack cards vertically on mobile
- Collapsible sections for bot details
- Swipe gestures for bot actions
- Bottom navigation for key actions

---

## Technical Architecture & Requirements

### High-Level Architecture

```
┌──────────────────────────────────────────────────┐
│                   Frontend                        │
│  Next.js 15 + React 19 + TailwindCSS + shadcn    │
└────────────┬──────────────────────────────────┬──┘
             │                                  │
             │ (HTTPS/WSS)                      │ (WebSocket)
             │                                  │
┌────────────▼─────────────┐    ┌──────────────▼─────┐
│   Supabase Auth          │    │ Supabase Realtime  │
│   User Management        │    │ Live P&L Updates   │
└──────────────────────────┘    └────────────────────┘
             │                                  │
             │                                  │
┌────────────▼─────────────────────────────────▼────┐
│         Supabase PostgreSQL Database              │
│  (users, bots, trades, strategies, risk_configs)  │
└───────────────────────────┬───────────────────────┘
                            │
                            │
┌───────────────────────────▼───────────────────────┐
│         Supabase Edge Functions (Deno)            │
│  - Bot Execution Engine                           │
│  - AI Strategy Recommender (Claude API)           │
│  - Market Data Fetcher (Binance API)              │
│  - Risk Monitor & Circuit Breaker                 │
│  - Trade Simulator (Paper Trading)                │
└──────────────────────┬────────────────────────────┘
                       │
                       │ (HTTPS REST)
                       │
┌──────────────────────▼────────────────────────────┐
│              External APIs                        │
│  - Binance (Market Data, Orders)                  │
│  - Anthropic Claude (AI Assistant)                │
│  - Email Service (Resend or SendGrid)             │
└───────────────────────────────────────────────────┘
```

### Database Schema (PostgreSQL)

```sql
-- Users (managed by Supabase Auth)
-- auth.users table (built-in)

-- User Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  paper_trading_balance DECIMAL(20, 8) DEFAULT 10000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bots
CREATE TABLE bots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  strategy_type TEXT NOT NULL, -- 'dca', 'grid', 'momentum', 'mean_reversion'
  trading_pair TEXT NOT NULL, -- e.g., 'BTC/USDT'
  status TEXT NOT NULL DEFAULT 'stopped', -- 'running', 'paused', 'stopped', 'error'
  allocated_capital DECIMAL(20, 8) NOT NULL,
  current_value DECIMAL(20, 8) NOT NULL DEFAULT 0,
  is_paper_trading BOOLEAN NOT NULL DEFAULT true,
  strategy_config JSONB NOT NULL, -- Strategy-specific parameters
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_executed_at TIMESTAMPTZ
);

-- Risk Configurations
CREATE TABLE risk_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  stop_loss_percent DECIMAL(5, 2) NOT NULL,
  take_profit_percent DECIMAL(5, 2),
  max_position_size DECIMAL(20, 8) NOT NULL,
  max_daily_loss DECIMAL(20, 8),
  max_daily_trades INTEGER,
  volatility_threshold TEXT, -- 'low', 'medium', 'high'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bot_id)
);

-- Trades
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  trade_type TEXT NOT NULL, -- 'buy', 'sell'
  symbol TEXT NOT NULL, -- e.g., 'BTC/USDT'
  amount DECIMAL(20, 8) NOT NULL,
  price DECIMAL(20, 8) NOT NULL,
  total_value DECIMAL(20, 8) NOT NULL,
  fee DECIMAL(20, 8) DEFAULT 0,
  is_paper_trading BOOLEAN NOT NULL DEFAULT true,
  exchange_order_id TEXT, -- For real trading
  status TEXT NOT NULL DEFAULT 'executed', -- 'pending', 'executed', 'failed', 'cancelled'
  executed_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB -- Additional trade info
);

-- Positions (current holdings)
CREATE TABLE positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  avg_entry_price DECIMAL(20, 8) NOT NULL,
  current_price DECIMAL(20, 8),
  unrealized_pnl DECIMAL(20, 8),
  is_paper_trading BOOLEAN NOT NULL DEFAULT true,
  opened_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bot_id, symbol, is_paper_trading)
);

-- Strategies (pre-defined templates)
CREATE TABLE strategies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'dca', 'grid', etc.
  description TEXT,
  default_config JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bot Logs (for debugging and audit)
CREATE TABLE bot_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  level TEXT NOT NULL, -- 'info', 'warning', 'error'
  message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Conversations (for auditing AI interactions)
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bot_id UUID REFERENCES bots(id) ON DELETE SET NULL,
  messages JSONB NOT NULL, -- Array of {role, content}
  result_config JSONB, -- Final bot config if created
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_bots_user_id ON bots(user_id);
CREATE INDEX idx_bots_status ON bots(status);
CREATE INDEX idx_trades_bot_id ON trades(bot_id);
CREATE INDEX idx_trades_executed_at ON trades(executed_at);
CREATE INDEX idx_positions_bot_id ON positions(bot_id);
CREATE INDEX idx_bot_logs_bot_id ON bot_logs(bot_id);
CREATE INDEX idx_bot_logs_created_at ON bot_logs(created_at);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own bots" ON bots FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bots" ON bots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bots" ON bots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own bots" ON bots FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for other tables...
```

### Supabase Edge Functions

**1. bot-executor (Runs every minute via cron)**
- Fetches all active bots
- For each bot, execute strategy logic
- Place paper trading orders
- Update positions and P&L
- Log activity

**2. ai-strategy-recommender**
- Accepts user input and conversation history
- Calls Claude API with structured prompts
- Returns strategy recommendations or configurations
- Logs conversation for audit

**3. market-data-fetcher**
- Fetches real-time prices from Binance
- Updates positions' current_price
- Calculates unrealized P&L
- Caches data for performance

**4. risk-monitor**
- Checks all active bots against risk limits
- Triggers stop-loss/take-profit
- Pauses bots that exceed limits
- Sends alerts to users

**5. trade-simulator**
- Simulates order execution for paper trading
- Applies realistic slippage and fees
- Updates paper trading balance
- Records trades in database

### Frontend Architecture

**Tech Stack:**
- Next.js 15 (App Router)
- React 19
- TypeScript 5.3+
- TailwindCSS v4
- shadcn/ui components
- Zustand (state management for complex UI state)
- React Query (server state caching)
- Recharts (charts)
- WebSocket (Supabase Realtime)

**Directory Structure:**
```
/app
  /dashboard
  /bots
    /[id]
    /create
  /api
/components
  /bot
  /dashboard
  /ai
  /ui (shadcn)
/lib
  /supabase
  /api-client
  /hooks
  /utils
/contexts
  AuthProvider.tsx
/types
  bot.ts
  trade.ts
  strategy.ts
```

### API Design

**RESTful Endpoints (Next.js API Routes + Supabase):**

```
POST   /api/bots                    - Create new bot
GET    /api/bots                    - List user's bots
GET    /api/bots/:id                - Get bot details
PATCH  /api/bots/:id                - Update bot config
DELETE /api/bots/:id                - Delete bot
POST   /api/bots/:id/start          - Start bot
POST   /api/bots/:id/pause          - Pause bot
POST   /api/bots/:id/stop           - Stop bot

GET    /api/trades                  - List trades (with filters)
GET    /api/trades/:id              - Get trade details

GET    /api/positions               - Get current positions
GET    /api/positions/:bot_id       - Get positions for bot

POST   /api/ai/chat                 - Send message to AI
POST   /api/ai/recommend-strategy   - Get strategy recommendation

GET    /api/market-data/:symbol     - Get real-time price
GET    /api/analytics/portfolio     - Get portfolio metrics
GET    /api/analytics/bot/:id       - Get bot analytics
```

**WebSocket Channels (Supabase Realtime):**

```
bots:user_id=<uuid>          - Bot status changes
trades:bot_id=<uuid>         - New trades
positions:bot_id=<uuid>      - Position updates
```

### Third-Party Integrations

**Binance API:**
- Market Data API (public, no auth)
- Spot Trading API (for real trading, future)
- WebSocket streams for real-time prices

**Anthropic Claude API:**
- Messages API for conversational AI
- Function calling for structured outputs
- Streaming responses for better UX

**Email Service (Resend or SendGrid):**
- Transactional emails (welcome, alerts)
- Marketing emails (future)

### Security Requirements

**Authentication & Authorization:**
- Supabase Auth with email/password
- JWT tokens for API authentication
- Row Level Security (RLS) for all tables
- API rate limiting per user

**Data Protection:**
- All API keys encrypted at rest (future)
- HTTPS only (TLS 1.3)
- Secure WebSocket connections (WSS)
- CSRF protection
- XSS protection

**Secrets Management:**
- Environment variables for all secrets
- Separate keys for dev/staging/prod
- Rotate Supabase anon key if leaked
- Never expose service role key to frontend

### Performance Requirements

**Response Times:**
- Dashboard load: < 1 second
- API responses: < 200ms (p95)
- WebSocket latency: < 100ms
- AI response: < 3 seconds (streaming starts < 1s)

**Scalability:**
- Support 10,000 concurrent users
- Support 50,000 active bots
- Handle 1,000 trades per minute
- Database: Scale with Supabase Pro plan

**Reliability:**
- 99.9% uptime (excluding maintenance)
- Automated backups daily
- Disaster recovery plan
- Graceful degradation if external APIs fail

### Monitoring & Observability

**Logging:**
- Application logs (Supabase logs)
- Error tracking (Sentry)
- Bot execution logs (database)

**Metrics:**
- API response times
- Database query performance
- Bot execution success rate
- Error rates by endpoint

**Alerts:**
- High error rate
- Database slow queries
- Edge function failures
- External API downtime

---

## Phase Breakdown

### Phase 1: Authentication & Foundation ✅

**Status:** Complete
**Duration:** 1 session
**Completion Date:** 2025-11-11

**Deliverables:**
- ✅ Supabase Auth integration
- ✅ Login, Signup, Password Reset flows
- ✅ Protected routes with middleware
- ✅ Navigation with user dropdown
- ✅ Landing page
- ✅ Dashboard placeholder
- ✅ MVP.md and progress tracking

**Details:** See `progress/phase1-summary.md`

---

### Phase 2: Bot Management & AI Creation

**Status:** Next (Ready to Start)
**Duration:** 2-3 weeks
**Priority:** High

**Objectives:**
- Enable users to create and manage bots
- Implement AI-assisted bot creation
- Build bot management dashboard
- Set up paper trading infrastructure

**Deliverables:**

1. **Database Schema**
   - [ ] Create `bots` table with RLS policies
   - [ ] Create `risk_configs` table
   - [ ] Create `strategies` table with templates
   - [ ] Create `bot_logs` table
   - [ ] Seed 4 strategy templates

2. **AI Integration**
   - [ ] Set up Anthropic Claude API client
   - [ ] Create `ai-strategy-recommender` Edge Function
   - [ ] Build AI chat component with streaming
   - [ ] Implement conversation state management
   - [ ] Design and test AI prompts
   - [ ] Create `ai_conversations` table for audit

3. **Bot Creation Flow - Template Path**
   - [ ] Strategy template selector page
   - [ ] Template detail view with explanation
   - [ ] Configuration form (trading pair, capital)
   - [ ] Risk management questionnaire
   - [ ] Preview page before deployment
   - [ ] Success page with onboarding

4. **Bot Creation Flow - AI Path**
   - [ ] AI chat interface component
   - [ ] Goal discovery conversation flow
   - [ ] Strategy recommendation with alternatives
   - [ ] Parameter configuration conversation
   - [ ] Risk settings conversation
   - [ ] Configuration preview and edit
   - [ ] Deployment confirmation

5. **Bot Management Dashboard**
   - [ ] Bot list/grid view with cards
   - [ ] Bot status indicators (running/paused/stopped)
   - [ ] Start/pause/stop controls
   - [ ] Edit bot configuration
   - [ ] Delete bot with confirmation
   - [ ] Clone/duplicate bot
   - [ ] Filter and sort functionality

6. **Paper Trading Setup**
   - [ ] Create `profiles` table with paper balance
   - [ ] Initialize paper trading balance ($10k default)
   - [ ] Create paper trading account UI
   - [ ] Balance display in dashboard

**Success Criteria:**
- Users can create bots via templates in < 3 minutes
- Users can create bots via AI in < 5 minutes
- 80%+ of test users successfully create a bot
- AI recommendations are relevant and safe
- All bots default to paper trading mode

**Testing Requirements:**
- Unit tests for AI prompt logic
- Integration tests for bot CRUD operations
- E2E tests for both creation flows
- Load test AI endpoint (100 concurrent users)

---

### Phase 3: Strategy Execution & Live Trading

**Status:** Planned
**Duration:** 3-4 weeks
**Priority:** High

**Objectives:**
- Implement bot execution engine
- Integrate Binance API for market data
- Build trade simulation system
- Create real-time dashboard updates

**Deliverables:**

1. **Database Schema Extensions**
   - [ ] Create `trades` table
   - [ ] Create `positions` table
   - [ ] Add indexes for performance

2. **Binance Integration**
   - [ ] Set up Binance API client
   - [ ] Market data fetcher (prices, volume)
   - [ ] WebSocket for real-time prices
   - [ ] Error handling and rate limiting

3. **Strategy Implementations**
   - [ ] DCA (Dollar Cost Averaging) strategy
   - [ ] Grid Trading strategy
   - [ ] Momentum strategy
   - [ ] Mean Reversion strategy
   - [ ] Strategy base class/interface

4. **Bot Execution Engine**
   - [ ] `bot-executor` Edge Function with cron
   - [ ] Strategy evaluation logic
   - [ ] Trade decision making
   - [ ] Trade execution (paper mode)
   - [ ] Position management
   - [ ] P&L calculation

5. **Trade Simulator**
   - [ ] `trade-simulator` Edge Function
   - [ ] Realistic order execution
   - [ ] Slippage simulation (0.1-0.5%)
   - [ ] Fee calculation (0.1%)
   - [ ] Balance updates

6. **Risk Monitor**
   - [ ] `risk-monitor` Edge Function
   - [ ] Stop-loss trigger logic
   - [ ] Take-profit trigger logic
   - [ ] Daily/monthly limit checks
   - [ ] Volatility monitoring
   - [ ] Circuit breaker system
   - [ ] Auto-pause on risk breach

7. **Real-Time Dashboard**
   - [ ] Portfolio overview with live P&L
   - [ ] Bot performance cards with real data
   - [ ] Recent trade activity feed
   - [ ] Risk exposure panel
   - [ ] WebSocket subscriptions
   - [ ] Auto-refresh every 5 seconds
   - [ ] Loading states and optimistic updates

8. **Bot Details Page**
   - [ ] Detailed bot information
   - [ ] Trade history table
   - [ ] P&L chart (Recharts)
   - [ ] Open positions list
   - [ ] Bot logs viewer
   - [ ] Configuration display

**Success Criteria:**
- Bots execute trades correctly based on strategy
- P&L calculations are accurate (±0.01%)
- Risk limits are enforced 100% of the time
- Dashboard updates within 5 seconds of trades
- Bot execution latency < 1 second
- No trades executed outside risk parameters

**Testing Requirements:**
- Unit tests for each strategy implementation
- Integration tests for bot execution flow
- E2E tests for full bot lifecycle
- Stress test execution engine (1000 bots)
- Verify P&L accuracy with sample data

---

### Phase 4: Analytics & Optimization

**Status:** Planned
**Duration:** 2-3 weeks
**Priority:** Medium

**Objectives:**
- Build comprehensive analytics dashboard
- Add performance metrics and charts
- Implement trade history and logs
- Create strategy comparison tools

**Deliverables:**

1. **Analytics Dashboard**
   - [ ] Portfolio performance chart
   - [ ] Win rate and success metrics
   - [ ] Profit factor calculation
   - [ ] Average trade duration
   - [ ] Best/worst performing bots

2. **Risk Metrics**
   - [ ] Sharpe ratio calculation
   - [ ] Maximum drawdown
   - [ ] Sortino ratio
   - [ ] Risk-adjusted returns

3. **Trade History**
   - [ ] Comprehensive trade log
   - [ ] Filters (bot, date, symbol, type)
   - [ ] Search functionality
   - [ ] Export to CSV
   - [ ] Trade detail modal

4. **Strategy Comparison**
   - [ ] Compare multiple bots side-by-side
   - [ ] Performance benchmarking
   - [ ] Visual comparison charts
   - [ ] Export comparison report

5. **Bot Optimization Suggestions**
   - [ ] Analyze bot performance
   - [ ] AI-powered improvement suggestions
   - [ ] Parameter tuning recommendations
   - [ ] Risk adjustment advice

**Success Criteria:**
- Users can understand bot performance at a glance
- Analytics load within 2 seconds
- All metrics calculated correctly
- Comparison tools help users make decisions

---

### Phase 5: Advanced Features

**Status:** Planned
**Duration:** 4-6 weeks
**Priority:** Low

**Objectives:**
- Add advanced trading features
- Implement alert system
- Build backtesting engine
- Enable live trading mode

**Deliverables:**

1. **Backtesting Engine**
   - [ ] Historical data integration
   - [ ] Backtest execution engine
   - [ ] Performance visualization
   - [ ] Strategy optimization

2. **Alert System**
   - [ ] Email notifications (Resend)
   - [ ] Webhook integrations
   - [ ] Custom alert conditions
   - [ ] Alert management UI

3. **Live Trading Mode**
   - [ ] Binance API key management (encrypted)
   - [ ] Real order execution
   - [ ] Enhanced security (2FA)
   - [ ] Audit logs
   - [ ] Risk disclosures

4. **Portfolio Management**
   - [ ] Multi-bot coordination
   - [ ] Cross-bot risk limits
   - [ ] Capital allocation optimizer
   - [ ] Rebalancing suggestions

5. **Advanced Order Types**
   - [ ] Trailing stop-loss
   - [ ] OCO (One-Cancels-Other)
   - [ ] Limit orders with time constraints
   - [ ] Conditional orders

**Success Criteria:**
- Backtesting produces accurate results
- Live trading executes orders reliably
- Alerts delivered within 30 seconds
- Portfolio tools improve performance

---

### Phase 6: Market Expansion (Future)

**Status:** Future
**Duration:** TBD
**Priority:** Low

**Scope:**
- Multi-exchange support (Coinbase, Kraken, etc.)
- Stock market trading
- Forex trading
- Social features and strategy marketplace
- White-label solution

---

## Go-to-Market Strategy

### Launch Plan

**Pre-Launch (Weeks 1-2):**
- Create landing page with waitlist
- Set up social media accounts (Twitter, Discord)
- Write launch blog post
- Prepare demo videos
- Recruit beta testers (50 users)

**Soft Launch (Weeks 3-4):**
- Invite beta testers
- Gather feedback intensively
- Fix critical bugs
- Iterate on UX pain points
- Build case studies

**Public Launch (Week 5):**
- Post on Product Hunt
- Share on Reddit (r/cryptocurrency, r/algotrading)
- Launch on Hacker News
- Email marketing to waitlist
- Paid ads (Google, Twitter) - small budget

### Pricing Strategy

**Free Trial:**
- 14-day trial with all features
- Up to 3 bots
- Paper trading only
- $10,000 virtual capital
- Community support

**Pro Plan ($29/month):**
- Unlimited bots
- Paper trading unlimited
- Live trading enabled (future)
- Priority support
- Advanced analytics
- Backtesting

**Premium Plan ($79/month - Future):**
- All Pro features
- Multi-exchange support
- API access
- White-label options
- Dedicated support

### Marketing Channels

**Organic:**
- Content marketing (blog posts, guides)
- SEO optimization
- Social media (Twitter, YouTube)
- Community building (Discord)
- Reddit engagement
- Product Hunt launch

**Paid:**
- Google Ads (search: "crypto trading bot")
- Twitter Ads (crypto audience)
- YouTube sponsorships (crypto influencers)
- Affiliate program (10% commission)

**Partnerships:**
- Crypto exchanges (referral programs)
- Trading education platforms
- Crypto news sites (sponsored content)

### User Acquisition Goals

| Month | Signups | Activated Users | Paying Users | MRR |
|-------|---------|----------------|--------------|-----|
| 1 | 200 | 120 | 10 | $290 |
| 3 | 500 | 350 | 50 | $1,450 |
| 6 | 2,000 | 1,400 | 200 | $5,800 |
| 12 | 10,000 | 7,000 | 1,000 | $29,000 |

---

## Risks & Mitigation

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|---------|------------|
| Binance API rate limits | Medium | High | Cache data, queue requests, implement backoff |
| Database scaling issues | Low | High | Use Supabase Pro, optimize queries, add indexes |
| Bot execution delays | Medium | Medium | Use cron jobs, monitor latency, optimize code |
| AI API costs exceed budget | Medium | Medium | Cache responses, set rate limits, monitor usage |
| Security breach (API keys) | Low | Critical | Encrypt at rest, use Supabase Vault, audit logs |

### Product Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|---------|------------|
| Users lose money in live trading | High | Critical | Require paper trading first, risk disclosures, strong defaults |
| Poor AI recommendations | Medium | High | Validate all configs, set safety limits, human review prompts |
| Low user activation | Medium | High | Onboarding tutorial, AI simplification, customer support |
| Bots underperform expectations | High | Medium | Manage expectations, show backtests, paper trading emphasis |
| Regulatory issues | Low | Critical | Consult legal, avoid investment advice, clear disclaimers |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|---------|------------|
| Low conversion to paid | Medium | High | Improve value prop, trial nudges, case studies |
| High churn rate | Medium | High | Focus on user success, responsive support, feature iteration |
| Competitive pressure | High | Medium | Differentiate with AI, move fast, user feedback loops |
| Market downturn (crypto winter) | Medium | Medium | Diversify to stocks/forex, pivot messaging, reduce costs |
| Solo dev burnout | Medium | High | Set realistic goals, automate tasks, consider co-founder |

---

## Appendix

### Glossary

**Algorithmic Trading:** Automated trading using pre-defined rules and strategies

**DCA (Dollar Cost Averaging):** Strategy that buys fixed amounts at regular intervals

**Grid Trading:** Strategy that places buy/sell orders at predetermined price levels

**Momentum Trading:** Strategy that buys assets showing upward price trends

**Mean Reversion:** Strategy that bets prices will return to average levels

**P&L (Profit & Loss):** Net gain or loss from trading activities

**Paper Trading:** Simulated trading with virtual money

**Position:** Current holding of an asset

**Risk-Adjusted Returns:** Returns considering the risk taken to achieve them

**Sharpe Ratio:** Measure of risk-adjusted return

**Slippage:** Difference between expected and actual execution price

**Stop-Loss:** Order that automatically sells to limit losses

**Take-Profit:** Order that automatically sells to lock in gains

**Volatility:** Measure of price fluctuation magnitude

### Competitive Analysis

| Competitor | Strengths | Weaknesses | Our Advantage |
|-----------|-----------|-----------|---------------|
| 3Commas | Established, many exchanges | Complex UI, expensive | AI simplicity, better UX |
| Cryptohopper | Visual strategy builder | No AI assistance | AI-powered setup |
| Pionex | Free built-in bots | Limited customization | Full control + AI |
| TradingView | Advanced charting | No execution | Full automation |
| Manual Coding | Complete control | High barrier to entry | No-code + AI |

### References

- [Binance API Documentation](https://binance-docs.github.io/apidocs/spot/en/)
- [Anthropic Claude API](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

**Document History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-11 | Product Team | Initial PRD based on user vision and prd-expert recommendations |

**Approval:**

- [ ] Product Owner
- [ ] Technical Lead
- [ ] Design Lead

**Next Review Date:** 2025-12-11

---

*This is a living document and will be updated as the product evolves.*

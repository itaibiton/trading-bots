# TradingBot - Trading Infrastructure & AI Integration Guide

**Last Updated:** 2025-01-16
**Status:** Implementation Ready
**Target:** Phase 2 & Phase 3 MVP

---

## Table of Contents

1. [Overview](#overview)
2. [Binance API Integration](#binance-api-integration)
3. [AI Integration with Claude](#ai-integration-with-claude)
4. [Supabase Infrastructure](#supabase-infrastructure)
5. [Security & Best Practices](#security--best-practices)
6. [Implementation Roadmap](#implementation-roadmap)
7. [Cost Estimates](#cost-estimates)
8. [Testing Strategy](#testing-strategy)

---

## Overview

This document provides comprehensive guidance for integrating Binance trading capabilities and AI-powered bot creation into TradingBot. It covers:

- **Binance Testnet Setup** - Paper trading with real market data
- **Market Data Access** - REST API and WebSocket streams
- **Trading Execution** - Order placement and management
- **AI Integration** - Claude API for conversational bot wizard
- **Cloud Infrastructure** - Supabase Edge Functions for bot execution
- **Security** - API key management, rate limiting, RLS policies

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │  Bot Creation    │              │  Bot Dashboard   │        │
│  │  (AI Chat UI)    │              │  (Management)    │        │
│  └────────┬─────────┘              └────────┬─────────┘        │
└───────────┼────────────────────────────────┼──────────────────┘
            │                                 │
            │ API Routes                      │ API Routes
            ▼                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Supabase Backend                              │
│  ┌──────────────────────────┐    ┌──────────────────────────┐  │
│  │   Edge Functions         │    │   PostgreSQL + pg_cron   │  │
│  │ ┌──────────────────────┐ │    │ ┌──────────────────────┐ │  │
│  │ │ ai-strategy-         │ │    │ │  Scheduled Jobs      │ │  │
│  │ │ recommender          │ │    │ │  (execute-bot)       │ │  │
│  │ └──────────────────────┘ │    │ └──────────────────────┘ │  │
│  │ ┌──────────────────────┐ │    │ ┌──────────────────────┐ │  │
│  │ │ execute-bot          │◄┼────┤ │  Database            │ │  │
│  │ │ (trading logic)      │ │    │ │  (bots, orders,      │ │  │
│  │ └──────────────────────┘ │    │ │   positions, etc.)   │ │  │
│  └────┬────────────────┬────┘    │ └──────────────────────┘ │  │
│       │                │         │ ┌──────────────────────┐ │  │
│       │                │         │ │  Vault (API Keys)    │ │  │
│       │                └─────────┼─┤  - Binance           │ │  │
│       │                          │ │  - Anthropic         │ │  │
│       │                          │ └──────────────────────┘ │  │
└───────┼──────────────────────────┴──────────────────────────┘  │
        │                                                         │
        ▼                          ▼                              │
┌──────────────────┐      ┌──────────────────┐                   │
│  Anthropic       │      │  Binance API     │                   │
│  Claude API      │      │  (Testnet)       │                   │
│  - Bot creation  │      │  - Market data   │                   │
│  - Strategy rec  │      │  - Trade exec    │                   │
└──────────────────┘      └──────────────────┘
```

---

## Binance API Integration

### 1. Testnet Setup

#### Access Binance Testnet

**Portal URL:** https://testnet.binance.vision

**Authentication:**
- Login via GitHub OAuth (instant access)
- API keys generated directly on platform
- Supports 3 auth methods: HMAC-SHA-256, RSA (2048-4096 bits), Ed25519

**Endpoint URLs:**
```bash
REST API:              https://testnet.binance.vision/api
WebSocket API:         wss://ws-api.testnet.binance.vision/ws-api/v3
Market Data Streams:   wss://stream.testnet.binance.vision/ws
```

#### Virtual Funds

- **Automatic Balance:** All users receive virtual funds in multiple assets
- **Futures Mock Trading:** 3,000 USDT starting balance
- **Top-up:** Additional funds via "Faucet" feature
- **Important:** Testnet funds cannot be transferred to live accounts

#### Key Differences from Production

| Feature | Testnet | Production |
|---------|---------|-----------|
| Endpoints | `/api` only (no `/sapi` wallet) | Full API access |
| Data Resets | ~Monthly (no notice) | Never |
| API Keys | Persist across resets | Persist |
| Rate Limits | Identical to production | Same |
| Trading Pairs | Match production | Match testnet |

### 2. API Key Setup

#### Step 1: Create API Keys

1. Visit https://testnet.binance.vision
2. Sign in with GitHub
3. Navigate to API Management
4. Click "Generate HMAC_SHA256"
5. Save API Key and Secret Key securely

#### Step 2: Configure Permissions

**Recommended Permissions for MVP:**
- ✅ **Enable Reading** - View account data
- ✅ **Enable Spot & Margin Trading** - Place orders
- ❌ **Disable Withdrawals** - Not needed for MVP
- ❌ **Disable Futures** - Not needed for MVP

**Security Notes:**
- Without IP whitelisting, trading permission expires after 30 days
- With IP whitelisting, no expiration
- Unused keys without IP whitelist auto-delete after 30 days

#### Step 3: Store in Supabase Vault

```sql
-- Store API keys securely
SELECT vault.create_secret('binance_api_key_testnet', 'YOUR_API_KEY_HERE');
SELECT vault.create_secret('binance_secret_key_testnet', 'YOUR_SECRET_KEY_HERE');

-- Retrieve in Edge Functions
SELECT decrypted_secret
FROM vault.decrypted_secrets
WHERE name = 'binance_api_key_testnet';
```

### 3. Market Data Access

#### REST API Endpoints

**General Information:**
```bash
GET /api/v3/ping                    # Connectivity test
GET /api/v3/time                    # Server time (for sync)
GET /api/v3/exchangeInfo            # Trading rules, symbols, filters
```

**Market Data (No Auth Required):**
```bash
GET /api/v3/depth                   # Order book (5, 10, 20, 50, 100, 500, 1000, 5000 levels)
GET /api/v3/trades                  # Recent trades (last 1000)
GET /api/v3/klines                  # Candlestick/OHLCV data
GET /api/v3/ticker/24hr             # 24-hour price statistics
GET /api/v3/ticker/price            # Latest price
GET /api/v3/ticker/bookTicker       # Best bid/ask prices
```

**Rate Limits:**
- **6,000 weight units per minute** (per IP)
- Each endpoint has assigned weight (e.g., depth with limit=100 = weight 5)
- Monitor via header: `X-MBX-USED-WEIGHT-1M`

#### WebSocket Streams (Real-time)

**Base Endpoint:** `wss://stream.testnet.binance.vision/ws`

**Stream Types:**
```javascript
// Aggregate trades
<symbol>@aggTrade              // e.g., btcusdt@aggTrade

// Candlestick data
<symbol>@kline_<interval>      // e.g., btcusdt@kline_1m
// Intervals: 1s, 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M

// 24hr ticker
<symbol>@ticker                // Full statistics
<symbol>@miniTicker            // Minimal data

// Order book
<symbol>@depth                 // Diff depth (real-time updates)
<symbol>@depth5                // Top 5 levels (snapshot)
```

**Combined Streams:**
```javascript
/stream?streams=btcusdt@aggTrade/btcusdt@depth
```

**Subscribe/Unsubscribe:**
```json
{
  "method": "SUBSCRIBE",
  "params": ["btcusdt@aggTrade"],
  "id": 1
}
```

**Rate Limits:**
- 5 messages per second per connection
- Max 1,024 streams per connection
- 300 connections per 5 minutes per IP

### 4. Trading Execution

#### Order Placement

**Endpoint:** `POST /api/v3/order` (requires authentication)

**Required Parameters:**
```typescript
{
  symbol: "BTCUSDT",           // Trading pair
  side: "BUY" | "SELL",        // Order side
  type: "MARKET" | "LIMIT" | ..., // Order type
  timestamp: 1234567890123,    // Current time in ms
  signature: "abc123...",      // HMAC SHA256 signature
}
```

**Optional Parameters:**
```typescript
{
  timeInForce: "GTC" | "IOC" | "FOK",  // Good Till Cancel, Immediate or Cancel, Fill or Kill
  quantity: 0.001,                      // Base asset quantity
  quoteOrderQty: 10,                    // Quote asset quantity (for MARKET)
  price: 50000,                         // Limit price
  stopPrice: 48000,                     // Stop trigger price
  newOrderRespType: "ACK" | "RESULT" | "FULL",
  recvWindow: 5000,                     // Request validity window (ms)
}
```

#### Supported Order Types

1. **LIMIT** - Requires: `timeInForce`, `quantity`, `price`
2. **MARKET** - Requires: `quantity` OR `quoteOrderQty`
3. **STOP_LOSS** - Triggers MARKET order at `stopPrice`
4. **STOP_LOSS_LIMIT** - Requires: `timeInForce`, `quantity`, `price`, `stopPrice`
5. **TAKE_PROFIT** - Triggers MARKET order at `stopPrice`
6. **TAKE_PROFIT_LIMIT** - Requires: `timeInForce`, `quantity`, `price`, `stopPrice`

**Advanced:**
- **OCO (One-Cancels-Other)** - Combine limit + stop-loss
- **OTO (One-Triggers-Other)** - Entry triggers exit order
- **OTOCO** - Entry triggers OCO (take-profit + stop-loss)

#### Authentication

**Signature Generation (HMAC SHA256):**

```typescript
import { createHmac } from 'crypto';

function generateSignature(queryString: string, secretKey: string): string {
  return createHmac('sha256', secretKey)
    .update(queryString)
    .digest('hex');
}

// Example usage
const params = new URLSearchParams({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  timeInForce: 'GTC',
  quantity: '0.001',
  price: '50000',
  timestamp: Date.now().toString(),
  recvWindow: '5000'
});

const queryString = params.toString();
const signature = generateSignature(queryString, secretKey);

const url = `https://testnet.binance.vision/api/v3/order?${queryString}&signature=${signature}`;

fetch(url, {
  method: 'POST',
  headers: {
    'X-MBX-APIKEY': apiKey
  }
});
```

#### Error Handling

**Common Error Codes:**

| Code | Meaning | Action |
|------|---------|--------|
| -1003 | TOO_MANY_REQUESTS | Rate limit exceeded, implement backoff |
| -1021 | INVALID_TIMESTAMP | Sync system clock with server time |
| -1022 | INVALID_SIGNATURE | Check signature generation |
| -2010 | NEW_ORDER_REJECTED | Check filters, balances |
| -2014 | BAD_API_KEY_FMT | Verify API key format |

**HTTP Status Codes:**
- **429** - Rate limit exceeded (check `Retry-After` header)
- **418** - IP auto-banned (2 min to 3 days)
- **5XX** - Server error (execution status unknown, verify manually)

### 5. Recommended SDK

**Package:** `binance` by tiagosiebler

```bash
npm install binance
```

**Features:**
- ✅ Full TypeScript support (written in TypeScript)
- ✅ Comprehensive API coverage (Spot, Futures, WebSocket)
- ✅ Built-in testnet configuration
- ✅ Automatic reconnection for WebSocket
- ✅ Type-safe requests and responses

**Usage Example:**

```typescript
import { MainClient } from 'binance';

const client = new MainClient({
  api_key: process.env.BINANCE_API_KEY,
  api_secret: process.env.BINANCE_SECRET_KEY,
  testnet: true // Use testnet
});

// Get account info
const account = await client.getAccountInformation();

// Place market buy order
const order = await client.submitNewOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'MARKET',
  quoteOrderQty: 10 // Buy $10 worth of BTC
});

// Get open orders
const openOrders = await client.getOpenOrders({ symbol: 'BTCUSDT' });

// Cancel order
await client.cancelOrder({
  symbol: 'BTCUSDT',
  orderId: order.orderId
});
```

**WebSocket Example:**

```typescript
import { WebsocketClient } from 'binance';

const wsClient = new WebsocketClient({
  api_key: process.env.BINANCE_API_KEY,
  api_secret: process.env.BINANCE_SECRET_KEY,
  beautify: true, // Readable key names
  testnet: true
});

// Subscribe to market data
wsClient.subscribe(['btcusdt@aggTrade', 'btcusdt@depth'], 'spot');

// Subscribe to user data (account updates)
wsClient.subscribeSpotUserDataStream();

wsClient.on('message', (data) => {
  console.log('Received:', data);
});

wsClient.on('error', (error) => {
  console.error('WebSocket error:', error);
});
```

---

## AI Integration with Claude

### 1. Provider Selection

**Recommended: Anthropic Claude Sonnet 4.5**

**Model ID:** `claude-sonnet-4-5-20250929`

**Why Claude:**
1. Superior instruction following for technical parameters
2. 200K token context window (full conversation history)
3. Strong reasoning for risk analysis
4. Function calling for structured outputs (JSON)
5. Cost-effective with prompt caching (90% savings)
6. Already specified in TradingBot PRD/tech stack

**Pricing:**
- **Input:** $3 per million tokens
- **Output:** $15 per million tokens
- **Cache Write:** $3.75 per million tokens (1.25x)
- **Cache Read:** $0.30 per million tokens (0.1x)

**Cost per Bot Creation:** ~$0.01 with caching

### 2. Account Setup

#### Step 1: Create Anthropic Account

1. Visit https://console.anthropic.com
2. Sign up for account
3. Navigate to API Keys section
4. Generate new API key
5. Save securely (starts with `sk-ant-`)

#### Step 2: Store in Supabase

**Environment Variables (Supabase Dashboard):**
```bash
# Navigate to: Project Settings → Edge Functions → Secrets
ANTHROPIC_API_KEY=sk-ant-api03-...
```

**Local Development (`.env.local`):**
```bash
ANTHROPIC_API_KEY=sk-ant-api03-...
```

**Access in Edge Functions:**
```typescript
const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
if (!apiKey) {
  throw new Error('ANTHROPIC_API_KEY not configured');
}
```

### 3. Implementation Pattern

#### Edge Function Structure

```typescript
// supabase/functions/ai-strategy-recommender/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

serve(async (req) => {
  const { messages, userId, conversationId } = await req.json();

  // Initialize Claude client
  const anthropic = new Anthropic({
    apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
  });

  // Build system prompt
  const systemPrompt = `You are an expert cryptocurrency trading assistant for TradingBot platform.

Context:
- Platform: Paper trading focused, risk-safety first
- Goal: Create safe, effective trading bot configuration

Guidelines:
1. Use plain language, avoid jargon
2. Always explain risk implications
3. Recommend conservative defaults for beginners
4. Ask ONE clarifying question at a time
5. Validate parameters against safe ranges
6. Use function calling for final configuration

Available Strategies: DCA, Grid Trading, Momentum, Mean Reversion

Safety Constraints:
- Stop-loss: Required, 0.5% - 20%
- Capital allocation: Max 50% per bot
- Risk level: Must be explicitly set`;

  // Stream response
  const stream = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: systemPrompt,
        cache_control: { type: 'ephemeral' } // Cache system prompt
      }
    ],
    messages: messages,
    stream: true,
  });

  // Return SSE stream
  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta') {
            controller.enqueue(
              new TextEncoder().encode(chunk.delta.text)
            );
          }
        }
        controller.close();
      }
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    }
  );
});
```

#### Frontend Integration

```typescript
// lib/ai/client.ts
export async function streamAIResponse(
  messages: AIMessage[],
  onChunk: (text: string) => void,
  onComplete: (fullResponse: string) => void
) {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    fullText += chunk;
    onChunk(chunk); // Update UI incrementally
  }

  onComplete(fullText);
}

// Usage in component
const [aiResponse, setAiResponse] = useState('');

await streamAIResponse(
  conversationHistory,
  (chunk) => setAiResponse(prev => prev + chunk),
  (full) => console.log('Complete:', full)
);
```

### 4. Function Calling for Structured Outputs

**Schema Definition:**

```typescript
const botConfigSchema = {
  name: 'create_bot_configuration',
  description: 'Generate complete bot configuration from conversation',
  parameters: {
    type: 'object',
    properties: {
      strategy_type: {
        type: 'string',
        enum: ['dca', 'grid', 'momentum', 'mean_reversion']
      },
      trading_pair: {
        type: 'string',
        description: 'e.g., BTC/USDT'
      },
      capital_allocation: {
        type: 'number',
        minimum: 10,
        maximum: 50000
      },
      risk_config: {
        type: 'object',
        properties: {
          stop_loss_percent: {
            type: 'number',
            minimum: 0.5,
            maximum: 20
          },
          take_profit_percent: {
            type: 'number',
            minimum: 1
          },
          max_daily_loss: { type: 'number' },
          volatility_threshold: {
            type: 'string',
            enum: ['low', 'medium', 'high']
          }
        },
        required: ['stop_loss_percent']
      },
      strategy_parameters: {
        type: 'object',
        description: 'Strategy-specific parameters (DCA: interval, Grid: levels, etc.)'
      }
    },
    required: ['strategy_type', 'trading_pair', 'capital_allocation', 'risk_config']
  }
};

// Use in Claude API call
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 1024,
  tools: [botConfigSchema],
  messages: conversationHistory,
});

// Extract structured output
if (response.content[0].type === 'tool_use') {
  const botConfig = response.content[0].input;
  // Save to database
  await saveBotConfiguration(userId, botConfig);
}
```

### 5. Conversation Storage

**Database Schema:**

```sql
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bot_id UUID REFERENCES bots(id) ON DELETE SET NULL,
  messages JSONB NOT NULL,
  result_config JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_bot_id ON ai_conversations(bot_id);

-- RLS Policy
CREATE POLICY "Users can view their own conversations"
  ON ai_conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations"
  ON ai_conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Message Format:**

```typescript
interface AIConversation {
  id: string;
  user_id: string;
  bot_id?: string;
  messages: AIMessage[];
  result_config?: BotConfig;
  created_at: string;
  updated_at: string;
}

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
```

### 6. Prompt Templates

**System Prompt for Goal Discovery:**
```
You are helping a user create their first trading bot.

Current Step: Understanding Goals

Ask ONE question to understand their trading goals:
- Passive income vs active trading
- Risk tolerance (conservative, moderate, aggressive)
- Time commitment (hands-off vs monitoring)

Keep it conversational and friendly. Avoid jargon.
```

**System Prompt for Strategy Recommendation:**
```
Based on user goals: {goals}

Recommend ONE strategy from:
1. DCA (Dollar Cost Averaging) - Best for: Steady accumulation, low risk
2. Grid Trading - Best for: Sideways markets, moderate risk
3. Momentum - Best for: Trending markets, higher risk
4. Mean Reversion - Best for: Range-bound markets, moderate risk

Explain in 2-3 sentences why this strategy fits their goals.
Highlight risk/reward profile.
```

**System Prompt for Parameter Configuration:**
```
Strategy selected: {strategy_type}

Configure parameters one at a time:
1. Trading pair (e.g., BTC/USDT, ETH/USDT)
2. Capital allocation ($10 - $10,000)
3. {strategy_specific_params}

For each parameter:
- Ask clearly with example values
- Validate input immediately
- Explain impact on strategy

Current parameter: {current_param}
```

### 7. Cost Optimization

**Implement Prompt Caching:**

```typescript
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 1024,
  system: [
    {
      type: 'text',
      text: systemPrompt, // 500 tokens
      cache_control: { type: 'ephemeral' } // Cache for 5 minutes
    },
    {
      type: 'text',
      text: strategyTemplates, // 1000 tokens
      cache_control: { type: 'ephemeral' } // Cache
    }
  ],
  messages: conversationHistory,
});
```

**Savings:**
- Without caching: 1500 input tokens × $3 = $0.0045 per request
- With caching (after first): 1500 × $0.30 = $0.00045 per request
- **90% cost reduction**

---

## Supabase Infrastructure

### 1. Enable Extensions

```sql
-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;    -- Scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_net;     -- HTTP requests from database
CREATE EXTENSION IF NOT EXISTS vault;      -- Secure secret storage
```

**Enable via Supabase Dashboard:**
1. Navigate to Database → Extensions
2. Search for `pg_cron`, `pg_net`, `vault`
3. Enable each extension

### 2. Database Schema

#### Bot Executions Table

```sql
CREATE TABLE bot_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  executed_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'partial')),
  actions_taken JSONB,
  error_message TEXT,
  execution_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bot_executions_bot_id ON bot_executions(bot_id);
CREATE INDEX idx_bot_executions_executed_at ON bot_executions(executed_at);

-- RLS
ALTER TABLE bot_executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own bot executions"
  ON bot_executions FOR SELECT
  USING (
    bot_id IN (SELECT id FROM bots WHERE user_id = auth.uid())
  );
```

#### Positions Table

```sql
CREATE TABLE positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('LONG', 'SHORT')),
  entry_price DECIMAL(18, 8) NOT NULL,
  quantity DECIMAL(18, 8) NOT NULL,
  current_price DECIMAL(18, 8),
  unrealized_pnl DECIMAL(18, 8),
  opened_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ
);

CREATE INDEX idx_positions_bot_id ON positions(bot_id);
CREATE INDEX idx_positions_symbol ON positions(symbol);

-- RLS
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own positions"
  ON positions FOR SELECT
  USING (
    bot_id IN (SELECT id FROM bots WHERE user_id = auth.uid())
  );
```

#### Orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  binance_order_id BIGINT,
  symbol TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('BUY', 'SELL')),
  type TEXT NOT NULL,
  quantity DECIMAL(18, 8) NOT NULL,
  price DECIMAL(18, 8),
  status TEXT NOT NULL,
  executed_qty DECIMAL(18, 8) DEFAULT 0,
  filled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_bot_id ON orders(bot_id);
CREATE INDEX idx_orders_binance_order_id ON orders(binance_order_id);
CREATE INDEX idx_orders_status ON orders(status);

-- RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own orders"
  ON orders FOR SELECT
  USING (
    bot_id IN (SELECT id FROM bots WHERE user_id = auth.uid())
  );
```

#### Paper Trading Balance Table

```sql
CREATE TABLE paper_trading_balance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  asset TEXT NOT NULL,
  free DECIMAL(18, 8) DEFAULT 0,
  locked DECIMAL(18, 8) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, asset)
);

CREATE INDEX idx_paper_balance_user_id ON paper_trading_balance(user_id);

-- RLS
ALTER TABLE paper_trading_balance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own balance"
  ON paper_trading_balance FOR SELECT
  USING (auth.uid() = user_id);

-- Initialize with default balance
CREATE OR REPLACE FUNCTION initialize_paper_balance()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO paper_trading_balance (user_id, asset, free)
  VALUES
    (NEW.id, 'USDT', 10000),
    (NEW.id, 'BTC', 0),
    (NEW.id, 'ETH', 0)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_paper_balance();
```

### 3. Scheduled Jobs (pg_cron)

#### Schedule Bot Execution

```sql
-- Store Supabase project URL in Vault (one-time setup)
SELECT vault.create_secret('https://your-project.supabase.co', 'project_url');
SELECT vault.create_secret('your-service-role-key', 'service_role_key');

-- Schedule bot execution every minute
SELECT cron.schedule(
  'execute-trading-bots',
  '* * * * *', -- Every minute
  $$
  SELECT
    net.http_post(
      url:= (SELECT decrypted_secret FROM vault.decrypted_secrets
             WHERE name = 'project_url') || '/functions/v1/execute-bot',
      headers:=jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || (SELECT decrypted_secret
                        FROM vault.decrypted_secrets WHERE name = 'service_role_key')
      ),
      body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);
```

#### Monitor Scheduled Jobs

```sql
-- View all scheduled jobs
SELECT * FROM cron.job;

-- View job execution history
SELECT
  jobid,
  runid,
  job_pid,
  database,
  username,
  command,
  status,
  return_message,
  start_time,
  end_time
FROM cron.job_run_details
WHERE jobname = 'execute-trading-bots'
ORDER BY start_time DESC
LIMIT 100;

-- Unschedule a job
SELECT cron.unschedule('execute-trading-bots');
```

### 4. Edge Function: execute-bot

```typescript
// supabase/functions/execute-bot/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { MainClient } from 'npm:binance@2.11.1';

interface BotConfig {
  id: string;
  user_id: string;
  name: string;
  status: 'active' | 'paused' | 'stopped';
  trading_mode: 'paper' | 'live';
  strategy_type: 'dca' | 'grid' | 'momentum' | 'mean_reversion';
  config: {
    symbol: string;
    investment_amount: number;
    interval_hours: number;
    stop_loss_percentage: number;
    take_profit_percentage: number;
  };
}

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch active bots
    const { data: bots, error: botsError } = await supabaseClient
      .from('bots')
      .select('*')
      .eq('status', 'active')
      .eq('trading_mode', 'paper'); // MVP: paper trading only

    if (botsError) throw botsError;

    // Initialize Binance client
    const binanceClient = new MainClient({
      api_key: Deno.env.get('BINANCE_API_KEY'),
      api_secret: Deno.env.get('BINANCE_SECRET_KEY'),
      testnet: true
    });

    // Execute each bot
    for (const bot of bots as BotConfig[]) {
      const executionStart = Date.now();

      try {
        let actions: any[] = [];

        // Execute strategy based on type
        if (bot.strategy_type === 'dca') {
          actions = await executeDCAStrategy(bot, binanceClient, supabaseClient);
        }
        // Add other strategy types here

        // Log successful execution
        await supabaseClient.from('bot_executions').insert({
          bot_id: bot.id,
          executed_at: new Date().toISOString(),
          status: 'success',
          actions_taken: actions,
          execution_time_ms: Date.now() - executionStart
        });

      } catch (error) {
        // Log failed execution
        await supabaseClient.from('bot_executions').insert({
          bot_id: bot.id,
          executed_at: new Date().toISOString(),
          status: 'failed',
          error_message: error.message,
          execution_time_ms: Date.now() - executionStart
        });

        console.error(`Bot ${bot.id} execution failed:`, error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, bots_executed: bots.length }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

async function executeDCAStrategy(
  bot: BotConfig,
  binanceClient: MainClient,
  supabaseClient: any
): Promise<any[]> {
  const actions = [];

  // Check if it's time to buy (based on interval)
  const { data: lastExecution } = await supabaseClient
    .from('bot_executions')
    .select('executed_at')
    .eq('bot_id', bot.id)
    .eq('status', 'success')
    .order('executed_at', { ascending: false })
    .limit(1)
    .single();

  const hoursSinceLastExecution = lastExecution
    ? (Date.now() - new Date(lastExecution.executed_at).getTime()) / (1000 * 60 * 60)
    : Infinity;

  if (hoursSinceLastExecution >= bot.config.interval_hours) {
    // Place DCA buy order
    const order = await binanceClient.submitNewOrder({
      symbol: bot.config.symbol,
      side: 'BUY',
      type: 'MARKET',
      quoteOrderQty: bot.config.investment_amount
    });

    // Store order in database
    await supabaseClient.from('orders').insert({
      bot_id: bot.id,
      binance_order_id: order.orderId,
      symbol: bot.config.symbol,
      side: 'BUY',
      type: 'MARKET',
      quantity: parseFloat(order.executedQty),
      price: parseFloat(order.fills[0].price),
      status: order.status,
      executed_qty: parseFloat(order.executedQty),
      filled_at: new Date().toISOString()
    });

    // Update paper trading balance
    await updatePaperBalance(
      supabaseClient,
      bot.user_id,
      bot.config.symbol,
      parseFloat(order.executedQty),
      -bot.config.investment_amount
    );

    actions.push({
      action: 'buy',
      order_id: order.orderId,
      quantity: order.executedQty,
      price: order.fills[0].price
    });
  }

  return actions;
}

async function updatePaperBalance(
  supabaseClient: any,
  userId: string,
  symbol: string,
  btcQty: number,
  usdtChange: number
) {
  // Update USDT balance
  await supabaseClient.rpc('update_paper_balance', {
    p_user_id: userId,
    p_asset: 'USDT',
    p_change: usdtChange
  });

  // Update BTC balance
  const baseAsset = symbol.replace('USDT', '');
  await supabaseClient.rpc('update_paper_balance', {
    p_user_id: userId,
    p_asset: baseAsset,
    p_change: btcQty
  });
}
```

**Helper Function (SQL):**

```sql
CREATE OR REPLACE FUNCTION update_paper_balance(
  p_user_id UUID,
  p_asset TEXT,
  p_change DECIMAL
)
RETURNS VOID AS $$
BEGIN
  UPDATE paper_trading_balance
  SET
    free = free + p_change,
    updated_at = NOW()
  WHERE user_id = p_user_id AND asset = p_asset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Security & Best Practices

### 1. API Key Security

**Storage:**
- ✅ Store in Supabase Vault (encrypted at rest)
- ✅ Use environment variables for Edge Functions
- ❌ NEVER hardcode in source code
- ❌ NEVER commit to Git
- ❌ NEVER expose in frontend

**Access Control:**
- ✅ Service role key for Edge Functions only
- ✅ Separate keys for dev/staging/production
- ✅ Minimal permissions (only what's needed)

**Rotation:**
- Rotate API keys every 90 days
- Monitor usage in Binance dashboard
- Set up alerts for unusual activity

### 2. Rate Limiting

**Client-Side Rate Limiter:**

```typescript
// lib/binance/rate-limiter.ts
export class BinanceRateLimiter {
  private weight = 0;
  private resetTime = Date.now() + 60000; // 1 minute window
  private readonly MAX_WEIGHT = 6000;

  async checkLimit(requestWeight: number): Promise<void> {
    const now = Date.now();

    // Reset weight if window expired
    if (now >= this.resetTime) {
      this.weight = 0;
      this.resetTime = now + 60000;
    }

    // Wait if request would exceed limit
    if (this.weight + requestWeight > this.MAX_WEIGHT) {
      const waitTime = this.resetTime - now;
      console.log(`Rate limit approaching. Waiting ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.weight = 0;
      this.resetTime = Date.now() + 60000;
    }

    this.weight += requestWeight;
  }

  updateFromHeaders(headers: Headers): void {
    const usedWeight = headers.get('X-MBX-USED-WEIGHT-1M');
    if (usedWeight) {
      this.weight = parseInt(usedWeight);
    }
  }
}
```

### 3. Row Level Security

**Ensure all tables have RLS policies:**

```sql
-- Example: Bots table
ALTER TABLE bots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own bots"
  ON bots FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own bots"
  ON bots FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own bots"
  ON bots FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own bots"
  ON bots FOR DELETE
  USING (auth.uid() = user_id);
```

### 4. Input Validation

**Validate all bot configurations:**

```typescript
function validateBotConfig(config: BotConfig): void {
  // Validate stop loss
  if (config.risk_config.stop_loss_percent < 0.5 ||
      config.risk_config.stop_loss_percent > 20) {
    throw new Error('Stop loss must be between 0.5% and 20%');
  }

  // Validate capital allocation
  if (config.capital_allocation < 10 ||
      config.capital_allocation > 50000) {
    throw new Error('Capital must be between $10 and $50,000');
  }

  // Validate trading pair
  const validPairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
  if (!validPairs.includes(config.trading_pair.replace('/', ''))) {
    throw new Error('Invalid trading pair');
  }
}
```

### 5. Error Handling

**Implement comprehensive error handling:**

```typescript
try {
  const order = await binanceClient.submitNewOrder({...});
} catch (error) {
  if (error.code === -2010) {
    // Order rejected - check filters, balances
    console.error('Order rejected:', error.message);
    // Notify user
  } else if (error.code === -1003) {
    // Rate limit exceeded
    console.error('Rate limited');
    // Implement backoff
  } else if (error.code === -1021) {
    // Invalid timestamp
    console.error('Clock sync issue');
    // Sync with server time
  } else {
    // Unknown error
    console.error('Unknown error:', error);
    // Log to monitoring service
  }
}
```

---

## Implementation Roadmap

### Week 1: Foundation Setup

**Day 1-2: Account & Infrastructure Setup**
- [ ] Create Binance testnet account
- [ ] Generate testnet API keys
- [ ] Create Anthropic API account
- [ ] Store keys in Supabase Vault
- [ ] Enable Supabase extensions (pg_cron, pg_net, vault)

**Day 3-4: Database & SDK Setup**
- [ ] Install `binance` npm package
- [ ] Create database migrations (bot_executions, positions, orders, paper_balance)
- [ ] Deploy migrations to Supabase
- [ ] Test Binance SDK connectivity

**Day 5-7: Basic Integration Testing**
- [ ] Test market data API (REST)
- [ ] Test WebSocket streams
- [ ] Place test orders on testnet
- [ ] Verify order status updates

### Week 2: AI Integration

**Day 1-2: Edge Function Development**
- [ ] Create `ai-strategy-recommender` Edge Function
- [ ] Implement Claude API client
- [ ] Build system prompt templates
- [ ] Test streaming responses

**Day 3-4: Frontend Integration**
- [ ] Replace mock AI responses in `/app/bots/create/simple/page.tsx`
- [ ] Implement SSE client
- [ ] Add conversation state management
- [ ] Test end-to-end chat flow

**Day 5-7: Function Calling & Storage**
- [ ] Implement function calling schema
- [ ] Test structured output generation
- [ ] Store conversations in database
- [ ] Add prompt caching for cost optimization

### Week 3: Bot Execution Engine

**Day 1-3: Execute-Bot Edge Function**
- [ ] Create `execute-bot` Edge Function
- [ ] Implement DCA strategy logic
- [ ] Add order placement with Binance
- [ ] Implement paper balance updates
- [ ] Add execution logging

**Day 4-5: Scheduled Jobs**
- [ ] Configure pg_cron scheduler
- [ ] Test scheduled execution (every minute)
- [ ] Monitor job execution logs
- [ ] Implement error handling and retries

**Day 6-7: Testing & Refinement**
- [ ] End-to-end testing (create bot → execution → results)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation updates

---

## Cost Estimates

### AI Costs (Anthropic Claude Sonnet 4.5)

**Per Bot Creation:**
- Typical conversation: 5-10 exchanges
- Total tokens: ~1500 (1000 input, 500 output)
- Cost with caching: ~$0.01
- Cost without caching: ~$0.03

**Monthly Projections:**

| Month | Users | Bot Creations | AI Cost | Revenue | % of Revenue |
|-------|-------|--------------|---------|---------|--------------|
| 1 | 500 | 350 | $5 | - | - |
| 3 | 2,000 | 1,400 | $20 | $5,800 | 0.3% |
| 6 | 10,000 | 7,000 | $95 | $29,000 | 0.3% |
| 12 | 50,000 | 20,000 | $300 | $145,000 | 0.2% |

**Verdict:** AI costs are negligible (<1% of revenue) and highly sustainable.

### Infrastructure Costs

**Supabase:**
- Free tier: Sufficient for MVP (up to 500MB database, 2GB bandwidth/month)
- Pro tier ($25/mo): Recommended for production (8GB database, 250GB bandwidth)

**Binance:**
- Testnet: Free (unlimited virtual funds)
- Production: No API fees (only trading commissions: 0.1% per trade)

**Total Monthly Operating Costs (Month 6):**
- Supabase Pro: $25
- AI (Claude): $95
- Domain/SSL: $10
- **Total: ~$130/month**

**Revenue (Month 6):** 200 paying users × $29 = $5,800/month
**Operating Margin:** 97.8%

---

## Testing Strategy

### 1. Unit Tests

**Test Signature Generation:**
```typescript
// __tests__/binance/signature.test.ts
import { generateSignature } from '@/lib/binance/signature';

describe('Binance Signature', () => {
  it('should generate correct HMAC SHA256 signature', () => {
    const queryString = 'symbol=BTCUSDT&side=BUY&type=MARKET&timestamp=1234567890';
    const secretKey = 'test_secret';
    const signature = generateSignature(queryString, secretKey);

    expect(signature).toBe('expected_signature_hash');
  });
});
```

**Test Rate Limiter:**
```typescript
// __tests__/binance/rate-limiter.test.ts
import { BinanceRateLimiter } from '@/lib/binance/rate-limiter';

describe('Rate Limiter', () => {
  it('should allow requests under limit', async () => {
    const limiter = new BinanceRateLimiter();
    await expect(limiter.checkLimit(1000)).resolves.not.toThrow();
  });

  it('should wait when limit exceeded', async () => {
    const limiter = new BinanceRateLimiter();
    const start = Date.now();

    await limiter.checkLimit(5000);
    await limiter.checkLimit(2000); // Should wait

    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThan(0);
  });
});
```

### 2. Integration Tests

**Test Binance API Connectivity:**
```typescript
// __tests__/integration/binance.test.ts
import { MainClient } from 'binance';

describe('Binance Integration', () => {
  const client = new MainClient({
    api_key: process.env.BINANCE_API_KEY,
    api_secret: process.env.BINANCE_SECRET_KEY,
    testnet: true
  });

  it('should fetch account information', async () => {
    const account = await client.getAccountInformation();
    expect(account).toHaveProperty('balances');
  });

  it('should place and cancel market order', async () => {
    const order = await client.submitNewOrder({
      symbol: 'BTCUSDT',
      side: 'BUY',
      type: 'MARKET',
      quoteOrderQty: 10
    });

    expect(order).toHaveProperty('orderId');
    expect(order.status).toBe('FILLED');

    // Cancel is not needed for filled orders
  });
});
```

**Test AI Conversation Flow:**
```typescript
// __tests__/integration/ai.test.ts
import { streamAIResponse } from '@/lib/ai/client';

describe('AI Integration', () => {
  it('should stream AI response', async () => {
    const messages = [
      { role: 'user', content: 'I want steady passive income' }
    ];

    let response = '';
    await streamAIResponse(
      messages,
      (chunk) => { response += chunk; },
      (full) => { expect(full).toContain('DCA'); }
    );

    expect(response.length).toBeGreaterThan(0);
  });
});
```

### 3. End-to-End Tests (Playwright)

**Test Bot Creation Flow:**
```typescript
// e2e/bot-creation.spec.ts
import { test, expect } from '@playwright/test';

test('should create bot via AI chat', async ({ page }) => {
  await page.goto('/bots/create/simple');

  // Start conversation
  await page.fill('[data-testid="chat-input"]', 'I want steady passive income');
  await page.click('[data-testid="send-button"]');

  // Wait for AI response
  await expect(page.locator('[data-testid="ai-response"]')).toContainText('DCA', { timeout: 10000 });

  // Continue conversation
  await page.fill('[data-testid="chat-input"]', 'Conservative');
  await page.click('[data-testid="send-button"]');

  // Complete bot creation
  await page.click('[data-testid="create-bot-button"]');

  // Verify bot created
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();

  // Navigate to dashboard
  await page.goto('/dashboard');
  await expect(page.locator('[data-testid="bot-card"]')).toBeVisible();
});
```

### 4. Manual Testing Checklist

**Binance Integration:**
- [ ] API key authentication works
- [ ] Market data fetched correctly (ticker, orderbook)
- [ ] WebSocket streams connect successfully
- [ ] Orders placed on testnet
- [ ] Order status updates received
- [ ] Stop-loss orders trigger correctly
- [ ] Rate limiting prevents IP ban

**AI Integration:**
- [ ] Conversation flows naturally
- [ ] AI recommendations are safe and relevant
- [ ] Streaming responses work smoothly
- [ ] Structured output (function calling) generates valid JSON
- [ ] Conversations stored in database
- [ ] Prompt caching reduces costs

**Bot Execution:**
- [ ] Bots execute on schedule (pg_cron)
- [ ] DCA strategy logic works correctly
- [ ] Orders placed via bot execution
- [ ] Execution logs captured
- [ ] Paper balance updates accurately
- [ ] Errors handled gracefully

---

## Next Steps

### Immediate Actions (Week 1)

1. **Set up Binance testnet account** (15 minutes)
   - Visit https://testnet.binance.vision
   - Login with GitHub
   - Generate API keys

2. **Create Anthropic API account** (10 minutes)
   - Visit https://console.anthropic.com
   - Sign up
   - Generate API key

3. **Store credentials in Supabase Vault** (10 minutes)
   ```sql
   SELECT vault.create_secret('YOUR_BINANCE_KEY', 'binance_api_key_testnet');
   SELECT vault.create_secret('YOUR_BINANCE_SECRET', 'binance_secret_key_testnet');
   SELECT vault.create_secret('YOUR_ANTHROPIC_KEY', 'anthropic_api_key');
   ```

4. **Install dependencies** (5 minutes)
   ```bash
   npm install binance
   npm install @anthropic-ai/sdk
   ```

5. **Create database migrations** (1-2 hours)
   - bot_executions table
   - positions table
   - orders table
   - paper_trading_balance table
   - ai_conversations table (already designed)

### Development Sequence

1. **Binance Integration** → 2. **AI Integration** → 3. **Bot Execution** → 4. **Testing**

Follow the roadmap in [Implementation Roadmap](#implementation-roadmap) section.

### Success Metrics

**Week 1:**
- ✅ Binance testnet orders placed successfully
- ✅ AI chat responds with strategy recommendations
- ✅ Conversations stored in database

**Week 2:**
- ✅ Complete bot creation flow (AI chat → database)
- ✅ Bot executes on schedule (manual trigger first)
- ✅ Orders tracked in database

**Week 3:**
- ✅ End-to-end automation (create → execute → results)
- ✅ Paper balance updates accurately
- ✅ Error handling robust
- ✅ Ready for user testing

---

## Support & Resources

**Binance API Documentation:**
- Official Docs: https://binance-docs.github.io/apidocs/spot/en
- Testnet Docs: https://developers.binance.com/docs/binance-spot-api-docs/testnet
- GitHub: https://github.com/binance/binance-spot-api-docs

**Anthropic Claude API:**
- Documentation: https://docs.anthropic.com
- API Reference: https://docs.anthropic.com/en/api
- Console: https://console.anthropic.com

**Supabase:**
- Documentation: https://supabase.com/docs
- Edge Functions: https://supabase.com/docs/guides/functions
- pg_cron: https://supabase.com/docs/guides/database/extensions/pg_cron

**TradingBot Internal Docs:**
- PRD: `/docs/PRD.md`
- Phase 2 Plan: `/progress/phase2-plan.md`
- Roadmap: `/ROADMAP.md`
- Tracking: `/progress/tracking.md`

---

**Document Version:** 1.0
**Last Updated:** 2025-01-16
**Author:** Claude (TradingBot Project Manager)
**Status:** Ready for Implementation

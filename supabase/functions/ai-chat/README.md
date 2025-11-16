# AI Chat Edge Function

Handles AI-powered conversation for bot creation using Claude 3.5 Sonnet (`claude-3-5-sonnet-20240620`).

## Overview

This Edge Function manages a 5-step conversation flow to guide users through creating a trading bot:

1. **Goal Discovery** - Understand why they want a bot
2. **Risk Assessment** - Determine risk tolerance
3. **Capital Allocation** - Decide investment amount
4. **Strategy Recommendation** - Select best trading strategy
5. **Review & Deploy** - Generate 3 bot configuration options

## Environment Variables

Required in Supabase Dashboard → Settings → Edge Functions:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-... # Your Claude API key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJh... # Service role key
```

## API Endpoint

**URL**: `https://your-project.supabase.co/functions/v1/ai-chat`

**Method**: `POST`

**Headers**:
```
Authorization: Bearer <user_access_token>
Content-Type: application/json
```

**Request Body**:
```typescript
{
  conversationId?: string; // null for new conversation
  message: string;          // User's message
  currentStep: number;      // 1-5
}
```

**Response**:
```typescript
{
  conversationId: string;
  message: {
    id: string;
    role: "assistant";
    content: string;
    timestamp: string;
    quickReplies?: Array<{
      id: string;
      label: string;
      value: string;
    }>;
  };
  nextStep: number; // 1-5
  extractedData?: {
    trading_goal?: string;
    risk_tolerance?: "low" | "medium" | "high";
    capital_amount?: number;
    experience_level?: "beginner" | "intermediate" | "advanced";
    preferred_pairs?: string[];
    recommended_strategy?: "dca" | "grid" | "momentum" | "mean-reversion";
  };
  recommendations?: Array<BotOption>; // Only returned at step 5
}
```

## Bot Option Structure (Step 5)

```typescript
{
  id: string;
  name: string;                // "Conservative Bot", "Balanced Bot", "Aggressive Bot"
  strategyType: string;        // "dca" | "grid" | "momentum" | "mean-reversion"
  riskLevel: string;           // "low" | "medium" | "high"
  config: {
    tradingPair: string;       // "BTC/USDT"
    capitalAllocated: number;  // e.g., 1000
    stopLossPercentage: number; // 5, 10, or 15
    takeProfitPercentage: number; // 10, 20, or 30
    maxDailyLoss: number;      // Based on capital * risk
    maxPositionSize: number;   // 20, 30, or 50
    strategyParams: object;    // Strategy-specific params
  };
  expectedReturn: { min: number; max: number }; // Percentage
  maxDrawdown: number;         // Percentage
  winRate: number;             // Percentage
  confidence: number;          // AI confidence 0-100
  reasoning: string;           // Why AI recommends this
}
```

## Conversation Flow

### Step 1: Goal Discovery

**AI asks**: What's your trading objective?

**Quick Replies**:
- Generate passive income
- Long-term investment
- Learn about trading
- Diversify portfolio

**Extracted**: `trading_goal`

### Step 2: Risk Assessment

**AI asks**: How would you feel if your investment dropped 20%?

**Quick Replies**:
- That would worry me (→ low risk)
- I could handle it (→ medium risk)
- No problem (→ high risk)

**Extracted**: `risk_tolerance`

### Step 3: Capital Allocation

**AI asks**: How much do you want to allocate?

**Quick Replies**:
- Try paper trading ($10k virtual)
- $100 - Just testing
- $500 - Conservative start
- $1,000 - Ready to invest
- Custom amount

**Extracted**: `capital_amount`

### Step 4: Strategy Recommendation

**AI recommends**: Best strategy based on profile

**Logic**:
- Low risk → DCA
- Medium risk + passive → Mean Reversion or Grid
- High risk → Momentum

**Extracted**: `recommended_strategy`

### Step 5: Review & Deploy

**AI generates**: 3 bot configurations (Conservative, Balanced, Aggressive)

**Returns**: `recommendations` array with complete bot configs

## Strategy Recommendation Matrix

| Risk Level | Goal Type | Recommended Strategy |
|------------|-----------|---------------------|
| Low | Any | DCA (Dollar-Cost Averaging) |
| Medium | Passive Income | Mean Reversion or Grid |
| Medium | Growth | Grid Trading |
| High | Active Trading | Momentum |

## Testing Locally

### 1. Install Supabase CLI
```bash
brew install supabase/tap/supabase
```

### 2. Start Local Supabase
```bash
cd /path/to/kohelet-bots
npx supabase start
```

### 3. Set Environment Variables
```bash
# Create .env file in supabase/functions/ai-chat/
echo "ANTHROPIC_API_KEY=sk-ant-..." > supabase/functions/ai-chat/.env
```

### 4. Serve Function Locally
```bash
npx supabase functions serve ai-chat --env-file supabase/functions/ai-chat/.env
```

### 5. Test with cURL
```bash
curl -X POST http://localhost:54321/functions/v1/ai-chat \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I want to create a trading bot",
    "currentStep": 1
  }'
```

## Deploying to Production

### 1. Link Your Supabase Project
```bash
npx supabase link --project-ref your-project-ref
```

### 2. Set Environment Variables
In Supabase Dashboard → Settings → Edge Functions:
- `ANTHROPIC_API_KEY`: Your Claude API key
- Other vars (SUPABASE_URL, SERVICE_ROLE_KEY) are auto-injected

### 3. Deploy Function
```bash
npx supabase functions deploy ai-chat
```

### 4. Verify Deployment
```bash
npx supabase functions list
```

## Error Handling

The function handles:
- **Authentication errors** (401): Missing or invalid auth token
- **Validation errors** (400): Invalid request parameters
- **Claude API errors** (500): API timeout, rate limits, invalid key
- **Database errors** (500): Failed to save/load conversation

All errors return JSON:
```json
{
  "error": "Error message here"
}
```

## Rate Limiting

- **Free tier**: 3 conversations per month
- **Pro tier**: Unlimited conversations
- Tracked via `ai_conversations_used` in profiles table

## Security

- ✅ User authentication required (Supabase Auth)
- ✅ RLS policies ensure users only access their conversations
- ✅ Service role key kept server-side only
- ✅ Input validation on all parameters
- ✅ CORS configured for web app domain

## Monitoring

View logs in Supabase Dashboard → Functions → ai-chat → Logs

Or via CLI:
```bash
npx supabase functions logs ai-chat
```

## Next Steps

After deploying this Edge Function:

1. Create frontend API client (`/lib/api/ai-chat.ts`)
2. Build `useAIChat` React hook
3. Update `ChatInterface` component to use real API
4. Create `BotOptionsDisplay` component for Step 5
5. Add conversation progress indicator
6. Test complete flow end-to-end

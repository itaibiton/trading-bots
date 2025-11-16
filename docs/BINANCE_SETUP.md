# Binance Live Trading Setup Guide

## Quick Start (5 minutes)

### 1. Configure Supabase Secrets

Add your Binance API keys to Supabase Edge Functions:

**Via Supabase Dashboard:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Edge Functions** → **Secrets**
4. Add two secrets:
   - Name: `BINANCE_API_KEY` → Value: `your_binance_api_key`
   - Name: `BINANCE_SECRET_KEY` → Value: `your_binance_secret_key`

**Via Supabase CLI:**
```bash
supabase secrets set BINANCE_API_KEY=your_binance_api_key
supabase secrets set BINANCE_SECRET_KEY=your_binance_secret_key
```

### 2. Deploy Edge Function

Deploy the `get-binance-account` Edge Function to Supabase:

```bash
# From project root
supabase functions deploy get-binance-account
```

### 3. Test the Integration

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to: http://localhost:3000/trading

3. You should see:
   - ✅ Green "Connected to Binance" status
   - ✅ Your live account balance
   - ✅ List of all assets with USD values
   - ✅ P&L cards (placeholder for now)

### 4. Troubleshooting

**"Binance API keys not configured" error:**
- Check that secrets are properly set in Supabase Dashboard
- Redeploy the Edge Function after adding secrets

**"Unauthorized" error:**
- Make sure you're logged in to the app
- Check that your Binance API keys have "Enable Reading" permission

**"Invalid API key" error:**
- Verify API keys are correct (no extra spaces)
- Check that keys are for LIVE Binance (not testnet)
- Ensure IP whitelisting allows Supabase's IPs (if enabled)

**Connection timeout:**
- Check Binance API status: https://www.binance.com/en/support/announcement
- Verify network connectivity

---

## Security Checklist

Before going live, ensure:

- ✅ API keys stored in Supabase secrets (NOT in code)
- ✅ "Enable Withdrawal" permission is DISABLED
- ✅ Only "Enable Reading" + "Enable Spot Trading" enabled
- ✅ IP whitelisting configured (recommended)
- ✅ 2FA enabled on Binance account
- ✅ API key permissions reviewed regularly

---

## Features

### Current Implementation (Phase 1)

✅ **Connection Status**
- Real-time connection indicator
- Last sync timestamp
- Manual refresh button

✅ **Account Balance**
- Total portfolio value in USD
- All assets with balances > $0.01
- Individual asset USD values
- Portfolio percentage breakdown

✅ **Auto-Refresh**
- Data updates every 30 seconds
- Smooth loading states
- Error handling with retry

### Coming Soon (Phase 2)

⏳ **P&L Calculations**
- Track realized P&L from closed trades
- Calculate unrealized P&L from open positions
- Historical performance charts

⏳ **Trading History**
- View all executed trades
- Filter by date, symbol, side
- Export to CSV

⏳ **Price Alerts**
- Set custom price alerts
- Email/push notifications
- Multiple alert types (price, %, change)

---

## File Structure

```
📁 kohelet-bots/
├── 📁 supabase/functions/get-binance-account/
│   └── index.ts                    # Edge Function (fetches Binance data)
│
├── 📁 app/
│   ├── 📁 api/binance/account/
│   │   └── route.ts                # API route (proxy with auth)
│   └── 📁 trading/
│       └── page.tsx                # Main trading dashboard
│
├── 📁 components/binance/
│   ├── ConnectionStatus.tsx        # Connection indicator
│   ├── AccountBalanceCard.tsx      # Balance display
│   └── PnLCard.tsx                 # P&L metrics
│
├── 📁 hooks/
│   └── useBinanceAccount.ts        # React hook for fetching data
│
└── 📁 lib/binance/
    ├── types.ts                    # TypeScript types
    └── utils.ts                    # Helper functions
```

---

## API Endpoints

### GET /api/binance/account

Fetches live account data from Binance.

**Response:**
```json
{
  "success": true,
  "data": {
    "connected": true,
    "timestamp": "2025-01-16T12:00:00Z",
    "balances": [
      {
        "asset": "USDT",
        "free": "10000.00",
        "locked": "0.00",
        "usdValue": "10000.00",
        "percentage": 18.2
      },
      {
        "asset": "BTC",
        "free": "0.5",
        "locked": "0.0",
        "usdValue": "45000.00",
        "percentage": 81.8
      }
    ],
    "totalBalance": "55000.00",
    "unrealizedPnL": "0.00",
    "realizedPnL": "0.00",
    "totalPnL": "0.00",
    "pnlPercentage": 0,
    "canTrade": true,
    "canWithdraw": false,
    "canDeposit": true
  }
}
```

---

## Rate Limiting

Binance API has rate limits:
- **6,000 weight units per minute** (per IP)
- Current implementation uses ~5 weight per request

**Our safeguards:**
- Client-side auto-refresh limited to 30 seconds
- API route caching (30 seconds revalidation)
- Manual refresh button with debouncing

---

## Next Steps

1. **Deploy to production** - Push code and deploy Edge Function
2. **Test with real trading** - Create your first bot
3. **Monitor performance** - Track P&L and adjust strategies
4. **Scale up** - Add more bots and strategies

---

## Support

- **Documentation:** `/docs/TRADING_INFRASTRUCTURE.md`
- **Binance API Docs:** https://binance-docs.github.io/apidocs/spot/en
- **Supabase Docs:** https://supabase.com/docs

---

**Status:** ✅ Ready for Testing
**Last Updated:** 2025-01-16

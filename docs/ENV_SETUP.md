# Environment Variables Setup Guide

## Quick Start

### 1. Create Your Local Environment File

```bash
# Copy the example file
cp .env.example .env.local
```

### 2. Fill in Required Variables

Open `.env.local` and fill in these **REQUIRED** variables:

```bash
# Supabase (get from https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key
```

### 3. Set Supabase Secrets (For Binance & AI)

**These go in Supabase Dashboard, NOT in .env.local**

#### Via Supabase Dashboard:

1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/functions
2. Click **"Manage secrets"**
3. Add these secrets:

```
BINANCE_API_KEY=your-live-binance-api-key
BINANCE_SECRET_KEY=your-live-binance-secret-key
ANTHROPIC_API_KEY=sk-ant-api03-your-claude-key
```

#### Via Supabase CLI:

```bash
supabase secrets set BINANCE_API_KEY=your-key
supabase secrets set BINANCE_SECRET_KEY=your-secret
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-your-key
```

---

## Environment Variables Reference

### Required for Development

| Variable | Where to Get | Purpose |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | [Supabase Dashboard](https://supabase.com/dashboard) → Settings → API | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same as above | Public anon key for client-side |
| `SUPABASE_SERVICE_ROLE_KEY` | Same as above | Service role for server-side (⚠️ KEEP SECRET) |

### Required for Live Trading

**Set in Supabase Secrets (not .env.local):**

| Variable | Where to Get | Purpose |
|----------|-------------|---------|
| `BINANCE_API_KEY` | [Binance API Management](https://www.binance.com/en/my/settings/api-management) | Live trading API access |
| `BINANCE_SECRET_KEY` | Same as above | Secret key for signing requests |

**Security Recommendations:**
- ✅ Enable "Enable Reading" permission
- ✅ Enable "Enable Spot & Margin Trading" permission
- ❌ **DISABLE** "Enable Withdrawals" (for safety)
- ✅ Enable IP whitelisting if possible
- ✅ Enable 2FA on your Binance account

### Required for AI Features

**Set in Supabase Secrets:**

| Variable | Where to Get | Purpose |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | [Anthropic Console](https://console.anthropic.com/settings/keys) | Claude API for bot creation chat |

---

## Optional Variables (Future Features)

### Testing with Binance Testnet

For development/testing before going live:

```bash
# Get keys from: https://testnet.binance.vision
BINANCE_TESTNET_API_KEY=your-testnet-key
BINANCE_TESTNET_SECRET_KEY=your-testnet-secret
```

### Alternative AI Provider (OpenAI)

```bash
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-openai-key
```

### Email Notifications (Phase 3+)

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@tradingbot.com
```

### Analytics & Monitoring (Phase 3+)

```bash
# Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id

# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_AUTH_TOKEN=your-sentry-auth-token

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Payment Integration (Phase 4+)

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

---

## Security Best Practices

### ✅ DO:
- Store sensitive keys in Supabase Secrets (not .env.local)
- Keep `.env.local` in `.gitignore` (it's already there)
- Use different API keys for development and production
- Rotate API keys every 90 days
- Enable 2FA on all service accounts

### ❌ DON'T:
- Commit `.env.local` to git
- Share API keys in chat/email
- Use production keys in development
- Enable withdrawal permissions on Binance API keys
- Hardcode secrets in source code

---

## Verifying Your Setup

### 1. Check Local Environment

```bash
# This should show your Supabase URL
echo $NEXT_PUBLIC_SUPABASE_URL

# This should show nothing (keeps secrets safe)
echo $BINANCE_API_KEY
```

### 2. Check Supabase Secrets

```bash
# List all secrets (doesn't show values for security)
supabase secrets list
```

You should see:
```
BINANCE_API_KEY
BINANCE_SECRET_KEY
ANTHROPIC_API_KEY
```

### 3. Test Connection

```bash
# Start dev server
pnpm dev

# Visit these pages:
# http://localhost:3000/dashboard (should load)
# http://localhost:3000/trading (should show Binance connection)
```

---

## Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Solution:** Make sure `.env.local` exists and has the Supabase URL:
```bash
cp .env.example .env.local
# Then edit .env.local with your actual values
```

### "Binance API keys not configured"

**Solution:** Keys should be in Supabase Secrets, not .env.local:
```bash
supabase secrets set BINANCE_API_KEY=your-key
supabase secrets set BINANCE_SECRET_KEY=your-secret
```

Then redeploy Edge Function:
```bash
supabase functions deploy get-binance-account
```

### "Unauthorized" when accessing /api/binance/account

**Solution:** Make sure you're logged into the app. The API route requires authentication.

### Edge Function returns 500 error

**Solution:** Check Edge Function logs:
```bash
supabase functions logs get-binance-account
```

Common issues:
- API keys not set in secrets
- Invalid API key format
- Binance API rate limit exceeded

---

## Environment Files Overview

| File | Purpose | Committed to Git? |
|------|---------|------------------|
| `.env.example` | Template with placeholders | ✅ Yes (safe) |
| `.env.local` | Your actual values | ❌ No (in .gitignore) |
| `.env.production` | Production values (Vercel) | ❌ No |

---

## Deployment (Vercel)

When deploying to Vercel, set environment variables in the Vercel Dashboard:

1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

**Note:** Binance and Anthropic keys go in **Supabase Secrets**, not Vercel environment variables.

---

## Next Steps

1. ✅ Copy `.env.example` to `.env.local`
2. ✅ Fill in Supabase credentials
3. ✅ Set Binance keys in Supabase Secrets
4. ✅ Set Anthropic key in Supabase Secrets
5. ✅ Deploy Edge Function: `supabase functions deploy get-binance-account`
6. ✅ Test locally: `pnpm dev`
7. ✅ Visit `/trading` to see live Binance data

---

**Last Updated:** 2025-01-16

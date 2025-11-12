# TradingBot Project Context

You are working on **TradingBot**, an AI-powered SaaS platform for automated cryptocurrency trading.

## Mission & Vision

**Mission:** Democratize algorithmic trading by making it accessible to everyone through AI-powered guidance and built-in risk management, enabling traders to automate strategies confidently without coding.

**Vision:** Build a no-code platform that combines sophistication with simplicity - from beginners to experienced traders can create, test, and deploy automated trading bots with confidence.

## Current Status

**Phase:** Phase 1 Complete ✅ → Phase 2 Ready to Start 🚀
**Last Updated:** 2025-11-13

### Recent Achievements (Phase 1)
- ✅ Full authentication system with Supabase
- ✅ Login, Signup, Password Reset flows with PKCE
- ✅ **CRITICAL SECURITY FIX:** Recovery session isolation (prevents dashboard access during password reset)
- ✅ Protected routing with middleware
- ✅ JWT AMR-based session type detection
- ✅ Landing page and dashboard structure
- ✅ Complete project documentation (PRD, MVP, Phase plans)

### Current Focus (Phase 2)
**Timeline:** 2-3 weeks (2025-11-11 to 2025-12-02)

**Key Deliverables:**
1. Database schema (bots, risk_configs, strategies, ai_conversations)
2. AI integration with Claude (Anthropic)
3. Bot creation - Template path (DCA, Grid, Momentum, Mean Reversion)
4. Bot creation - AI-assisted path (conversational setup)
5. Bot management dashboard
6. Paper trading infrastructure

**Priority:** HIGH - Foundation for all future bot execution

## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.3+
- **UI:** React 19
- **Styling:** TailwindCSS v4
- **Components:** shadcn/ui (new-york style)
- **State:** Zustand (complex UI), React Query (server state)
- **Charts:** Recharts

### Backend
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (email/password with PKCE)
- **Serverless:** Supabase Edge Functions (Deno)
- **Real-time:** Supabase Realtime (WebSocket)
- **AI:** Anthropic Claude API (Sonnet 3.5)

### External APIs
- **Market Data:** Binance API (Phase 3)
- **AI:** Anthropic Claude
- **Email:** Resend/SendGrid (future)

### Hosting
- **Frontend:** Vercel (planned)
- **Backend:** Supabase Cloud

## Architecture Overview

```
┌──────────────────────────────────────────────────┐
│            Frontend (Next.js 15)                 │
│  App Router + React 19 + TailwindCSS + shadcn   │
└────────────┬──────────────────────────────────┬──┘
             │ (HTTPS/WSS)                      │ (WebSocket)
             │                                  │
┌────────────▼─────────────┐    ┌──────────────▼─────┐
│   Supabase Auth          │    │ Supabase Realtime  │
│   - PKCE Flow            │    │ - Live Updates     │
│   - AMR Detection        │    │ - Bot Status       │
│   - Session Management   │    │ - P&L Streaming    │
└──────────────────────────┘    └────────────────────┘
             │                                  │
┌────────────▼─────────────────────────────────▼────┐
│         Supabase PostgreSQL Database              │
│  - Row Level Security (RLS)                       │
│  - users, bots, trades, strategies, risk_configs  │
└───────────────────────────┬───────────────────────┘
                            │
┌───────────────────────────▼───────────────────────┐
│         Supabase Edge Functions (Deno)            │
│  - bot-executor (cron)                            │
│  - ai-strategy-recommender (Claude)               │
│  - market-data-fetcher (Binance)                  │
│  - risk-monitor                                   │
│  - trade-simulator                                │
└──────────────────────┬────────────────────────────┘
                       │
┌──────────────────────▼────────────────────────────┐
│              External APIs                        │
│  - Binance (Market Data)                          │
│  - Anthropic Claude (AI)                          │
└───────────────────────────────────────────────────┘
```

## Project Structure

```
/app                    - Next.js App Router pages
  /dashboard           - Protected dashboard area
  /login, /signup      - Auth pages
  /forgot-password     - Password reset request
  /reset-password      - Password reset confirmation
  /auth/confirm        - PKCE token exchange endpoint
  /auth/error          - Auth error handler
  /api                 - API routes (Phase 2)
/components
  /auth               - Auth form components
  /bot                - Bot-related components (Phase 2)
  /ui                 - shadcn/ui components
  Navbar.tsx          - Main navigation
/contexts
  AuthProvider.tsx    - Auth state management
/lib
  /supabase          - Supabase client utilities
    client.ts         - Client-side Supabase
    server.ts         - Server-side Supabase
    middleware.ts     - Request middleware
    auth-utils.ts     - requireNormalAuth, isRecoverySession
  /ai                - AI client (Phase 2)
  utils.ts           - Helper functions
/types                - TypeScript type definitions
/docs                 - Product documentation
  PRD.md             - Product Requirements Document
/progress             - Progress tracking
  tracking.md        - Overall progress tracker
  phase1-summary.md  - Phase 1 completion summary
  phase2-plan.md     - Phase 2 detailed plan
/tests                - Test files (Phase 2)
  TEST_PLAN.md       - Testing strategy
/supabase             - Supabase configuration
  /functions         - Edge Functions (Phase 2+)
  /migrations        - Database migrations (Phase 2+)
```

## Critical Security Implementation

### Recovery Session Isolation
**Problem:** Users could access dashboard during password reset by manually changing URL.

**Solution Implemented:**
- JWT AMR (Authentication Methods Reference) detection in `lib/supabase/middleware.ts:40-85`
- Decode JWT payload to check `amr[0].method === 'recovery'`
- Restrict recovery sessions to ONLY `/reset-password` and `/auth/*` routes
- Created `requireNormalAuth()` utility for API route protection
- Hide navbar on `/reset-password` for focused UX

**Key Files:**
- `lib/supabase/middleware.ts` - Route protection with AMR checking
- `lib/supabase/auth-utils.ts` - Server-side auth utilities
- `app/reset-password/page.tsx` - Password reset page with security notice
- `components/Navbar.tsx` - Conditional rendering based on route

## Core Features (MVP)

### Phase 1: Authentication & Foundation ✅
- Email/password authentication with Supabase
- Secure password reset with PKCE flow
- Protected routes and middleware
- Landing page and dashboard structure

### Phase 2: Bot Management & AI Creation (CURRENT)
- AI-assisted bot creation with Claude
- 4 strategy templates (DCA, Grid, Momentum, Mean Reversion)
- Comprehensive risk management system
- Bot CRUD operations
- Paper trading infrastructure ($10k virtual balance)

### Phase 3: Strategy Execution & Live Trading (NEXT)
- Bot execution engine (Edge Functions + cron)
- Binance integration for market data
- Trade simulator for paper trading
- Real-time P&L dashboard
- Risk monitoring system

### Phase 4-6: Analytics, Advanced Features, Market Expansion
- See `docs/PRD.md` for complete roadmap

## Key Concepts & Terms

**Bot:** An automated trading strategy configuration that executes trades based on predefined rules.

**Strategy Types:**
- **DCA (Dollar Cost Averaging):** Buy fixed amounts at regular intervals
- **Grid Trading:** Place buy/sell orders at predetermined price levels
- **Momentum:** Trade based on price trend strength
- **Mean Reversion:** Bet on prices returning to average

**Risk Management:**
- **Stop-loss:** Automatic sell to limit losses (mandatory)
- **Take-profit:** Automatic sell to lock in gains (optional)
- **Position sizing:** How much to trade per order
- **Daily/monthly limits:** Maximum loss thresholds

**Paper Trading:** Simulated trading with virtual money ($10k default) - risk-free learning environment.

**PKCE Flow:** Proof Key for Code Exchange - secure OAuth flow using token_hash exchange instead of implicit tokens.

**AMR:** Authentication Methods Reference - JWT claim indicating how user authenticated (`recovery`, `password`, `oauth`).

## Important Files for Context

### Documentation
- `MVP.md` - High-level product vision and roadmap
- `docs/PRD.md` - Comprehensive product requirements (1700+ lines)
- `progress/tracking.md` - Real-time progress tracker
- `progress/phase2-plan.md` - Detailed Phase 2 implementation plan
- `tests/TEST_PLAN.md` - Testing strategy

### Core Authentication
- `lib/supabase/middleware.ts` - Route protection + AMR checking
- `lib/supabase/auth-utils.ts` - `requireNormalAuth()`, `isRecoverySession()`
- `contexts/AuthProvider.tsx` - Client-side auth state
- `app/auth/confirm/route.ts` - PKCE token exchange

### UI Components
- `components/Navbar.tsx` - Main navigation with user dropdown
- `components/auth/*.tsx` - Login, Signup, ForgotPassword, ResetPassword
- `components/ui/*.tsx` - shadcn/ui base components

## Development Workflow

### Starting Development
```bash
pnpm dev                 # Start Next.js dev server
pnpm build              # Production build
pnpm lint               # Run ESLint
pnpm test               # Run tests (Phase 2+)
```

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL          # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Supabase anon key
ANTHROPIC_API_KEY                 # Claude API (Phase 2)
```

### Database (Phase 2+)
```bash
npx supabase db reset            # Reset local database
npx supabase db push             # Push migrations
npx supabase functions deploy    # Deploy Edge Functions
```

## Current Priorities

### Immediate Next Steps (Phase 2 Week 1)
1. **Database Design:** Complete schema for bots, risk_configs, strategies, ai_conversations
2. **Supabase Migrations:** Create and test all migration files
3. **Claude API Setup:** Get API key, test connectivity
4. **Edge Function:** Build `ai-strategy-recommender` function
5. **TypeScript Types:** Define Bot, Strategy, RiskConfig types

### Success Criteria
- Users can create bots via templates in < 3 minutes
- Users can create bots via AI in < 5 minutes
- 80%+ of test users successfully create a bot
- AI recommendations are relevant and safe
- All bots default to paper trading mode

## Common Commands

### For Context in Any Session
- `/project` - Load this complete project overview
- `/phase2` - Load Phase 2 specific details
- `/docs` - Reference all documentation
- `/recent` - Recent work summary

### Git Workflow
```bash
git status              # Check current changes
git add .               # Stage all changes
git commit -m "msg"     # Commit with message
git push                # Push to remote
```

## Notes for AI Assistants

1. **Always check documentation first** - PRD and phase plans have detailed specs
2. **Security is critical** - All new features must consider auth and RLS
3. **Follow existing patterns** - Maintain consistency with Phase 1 code style
4. **Paper trading first** - Real money trading only in Phase 5
5. **Risk management mandatory** - Never allow bots without risk controls
6. **User experience focus** - Simple for beginners, powerful for advanced users
7. **Test thoroughly** - Unit, integration, and E2E tests required
8. **Document decisions** - Update tracking.md and decision log

## Related Commands

- Use `/phase2` for detailed Phase 2 implementation specs
- Use `/docs` to reference specific documentation files
- Use `/recent` to see what was just completed

---

**Last Updated:** 2025-11-13 (Post-authentication security fixes)
**Phase Status:** Phase 1 Complete, Phase 2 Ready
**Project Owner:** Solo Developer

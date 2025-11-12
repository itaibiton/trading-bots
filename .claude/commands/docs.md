# Documentation Reference

Quick reference guide to all TradingBot project documentation.

## Core Documentation

### 📋 Product Requirements Document (PRD)
**File:** `docs/PRD.md` (1750 lines)
**Purpose:** Comprehensive product specification

**Key Sections:**
- Executive Summary (lines 29-50)
- Problem Statement & Market (lines 52-74)
- Target Users & Personas (lines 76-156)
- Product Vision & Goals (lines 158-182)
- Success Metrics & KPIs (lines 184-212)
- Core Features (MoSCoW) (lines 214-328)
- User Flows & Journeys (lines 330-466)
- AI Integration Specifications (lines 468-607)
- Risk Management Framework (lines 609-708)
- Dashboard & Analytics Requirements (lines 710-886)
- Technical Architecture (lines 888-1255)
- Phase Breakdown (lines 1256-1563)
- Go-to-Market Strategy (lines 1564-1644)
- Risks & Mitigation (lines 1646-1677)

**When to reference:**
- Clarifying product requirements
- Understanding user personas
- Checking feature specifications
- Reviewing technical architecture
- Planning new features

### 🚀 MVP Roadmap
**File:** `MVP.md` (346 lines)
**Purpose:** High-level product vision and phased roadmap

**Key Sections:**
- Overview & Vision (lines 1-26)
- Core Value Proposition (lines 18-25)
- Phase 1: Auth & Foundation ✅ (lines 27-52)
- Phase 2: Bot Management & AI (lines 56-103)
- Phase 3: Strategy Execution (lines 105-155)
- Phase 4-6: Future Phases (lines 157-192)
- Business Model & Pricing (lines 194-227)
- Technical Architecture (lines 247-318)
- Development Principles (lines 319-327)

**When to reference:**
- Understanding project vision
- Checking roadmap priorities
- Reviewing phase scope
- Understanding business model

## Progress Tracking

### 📊 Progress Tracker
**File:** `progress/tracking.md` (330 lines)
**Purpose:** Real-time progress tracking and status updates

**Key Sections:**
- Quick Status Overview (lines 8-17)
- Current Phase Progress (lines 19-41)
- Weekly Progress Log (lines 43-88)
- Phase 2 Milestones (lines 91-157)
- Completed Phases (lines 159-176)
- Dependencies & Services (lines 178-195)
- Risks & Issues (lines 212-227)
- Key Metrics (lines 229-243)
- Decision Log (lines 245-281)

**When to reference:**
- Checking current progress
- Understanding blockers
- Reviewing past decisions
- Planning next steps

### 📝 Phase 1 Summary
**File:** `progress/phase1-summary.md`
**Purpose:** Completed Phase 1 details and achievements

**What was built:**
- Full authentication system with Supabase
- Login, Signup, Password Reset flows
- PKCE token exchange implementation
- Recovery session isolation (security fix)
- Protected routes with middleware
- Landing page and dashboard structure

### 📋 Phase 2 Detailed Plan
**File:** `progress/phase2-plan.md` (940 lines)
**Purpose:** Comprehensive Phase 2 implementation guide

**Key Sections:**
- Overview & Goals (lines 1-62)
- Deliverables Checklist (lines 64-331)
- Database Schema Design (lines 333-443)
- AI Integration (lines 445-547)
- Bot Creation Flows (lines 549-633)
- Bot Management Dashboard (lines 635-682)
- Implementation Timeline (lines 684-750)
- Testing Strategy (lines 752-827)
- Success Criteria (lines 829-873)

**When to reference:**
- Implementing Phase 2 features
- Checking task completion
- Understanding database schema
- Planning AI integration

## Testing Documentation

### 🧪 Test Plan
**File:** `tests/TEST_PLAN.md`
**Purpose:** Comprehensive testing strategy

**Coverage:**
- Unit testing approach
- Integration testing requirements
- E2E testing with Playwright
- Manual testing checklists
- Performance testing
- Security testing

**When to reference:**
- Writing new tests
- Planning test coverage
- Reviewing test strategy
- Setting up CI/CD

## Technical Documentation

### 🔐 Authentication Implementation
**Files:**
- `lib/supabase/middleware.ts` - Route protection with AMR detection
- `lib/supabase/auth-utils.ts` - Server-side utilities
- `lib/supabase/client.ts` - Client-side Supabase
- `lib/supabase/server.ts` - Server-side Supabase

**Key Concepts:**
- PKCE flow implementation
- JWT AMR (Authentication Methods Reference)
- Recovery session isolation
- Row Level Security (RLS)

### 🎨 UI Components
**Directory:** `components/`

**Structure:**
- `components/auth/` - Authentication components
- `components/ui/` - shadcn/ui base components
- `components/Navbar.tsx` - Main navigation
- `components/bot/` - Bot-related components (Phase 2)

### 🗄️ Database Schema
**Current Schema (Phase 1):**
- `auth.users` - Supabase Auth (built-in)

**Phase 2 Schema:**
- `profiles` - User profiles with paper trading balance
- `bots` - Bot configurations
- `risk_configs` - Risk management settings
- `strategies` - Strategy templates
- `bot_logs` - Activity logs
- `ai_conversations` - AI interaction audit trail

**Full schema:** See `docs/PRD.md` lines 932-1069

## API Documentation

### Current Endpoints (Phase 1)
- `/auth/confirm` - PKCE token exchange
- `/auth/error` - Auth error handler

### Phase 2 Endpoints (Planned)
```
POST   /api/bots           - Create bot
GET    /api/bots           - List bots
GET    /api/bots/[id]      - Get bot details
PATCH  /api/bots/[id]      - Update bot
DELETE /api/bots/[id]      - Delete bot

POST   /api/ai/chat        - AI conversation
POST   /api/ai/recommend   - Strategy recommendation
```

**Full API design:** See `docs/PRD.md` lines 1144-1177

## AI Integration

### Claude API Specs
**File:** `docs/PRD.md` lines 468-607

**Key Details:**
- Provider: Anthropic Claude (Sonnet 3.5)
- Use cases: Strategy recommendation, conversational config
- Prompt templates: Goal discovery, recommendation, configuration
- Function calling: Structured bot configs
- Streaming: Real-time responses

### System Prompts
**Location:** `docs/PRD.md` lines 559-577

**Templates:**
- Goal Discovery
- Strategy Recommendation
- Parameter Configuration
- Risk Settings

## User Flows

### Bot Creation - Template Path
**File:** `docs/PRD.md` lines 553-594

**Steps:**
1. Strategy selection
2. Strategy overview
3. Basic configuration
4. Risk management
5. Advanced settings (optional)
6. Preview
7. Deployment

### Bot Creation - AI Path
**File:** `docs/PRD.md` lines 596-632

**Flow:**
1. Welcome
2. Goal discovery
3. Strategy recommendation
4. Configuration conversation
5. Risk settings conversation
6. Preview & edit
7. Deployment

## Strategy Specifications

### DCA (Dollar Cost Averaging)
**Description:** Buy fixed amounts at regular intervals
**Risk:** Low
**Best for:** Beginners, long-term investors
**Config:** `progress/phase2-plan.md` lines 400-407

### Grid Trading
**Description:** Buy/sell at predetermined price levels
**Risk:** Medium
**Best for:** Range-bound markets
**Config:** `progress/phase2-plan.md` lines 410-418

### Momentum
**Description:** Trade based on trend strength
**Risk:** Medium-High
**Best for:** Trending markets
**Config:** `progress/phase2-plan.md` lines 421-431

### Mean Reversion
**Description:** Bet on prices returning to average
**Risk:** Medium
**Best for:** Statistical traders
**Config:** `progress/phase2-plan.md` lines 434-443

## Risk Management

### Framework Details
**File:** `docs/PRD.md` lines 609-708

**Key Components:**
- Capital allocation controls
- Trade-level risk controls (stop-loss, take-profit)
- Time-based controls (daily/monthly limits)
- Market condition filters (volatility, volume)
- Emergency shutoffs

### Risk Configuration
**Default Settings:**
- Stop-loss: 2-5% (required)
- Take-profit: 1.5x stop-loss ratio (recommended)
- Daily loss limit: Optional
- Position sizing: Fixed or percentage
- Volatility threshold: Medium

## Quick Command Reference

```bash
# View specific documentation
/project          # Load complete project context
/phase2           # Load Phase 2 details
/docs             # This reference guide
/recent           # Recent work summary

# Read specific files
Read docs/PRD.md              # Product requirements
Read MVP.md                   # MVP roadmap
Read progress/tracking.md     # Progress tracker
Read progress/phase2-plan.md  # Phase 2 plan
Read tests/TEST_PLAN.md       # Testing strategy
```

## External References

### Technical Documentation
- [Supabase Docs](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Anthropic Claude API](https://docs.anthropic.com/claude/reference)
- [shadcn/ui](https://ui.shadcn.com/)
- [TailwindCSS v4](https://tailwindcss.com/)

### API References
- [Binance API](https://binance-docs.github.io/apidocs/spot/en/)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

## Documentation Guidelines

### When Adding New Docs
1. **Location:** Place in appropriate directory (`docs/`, `progress/`, `tests/`)
2. **Naming:** Use kebab-case: `feature-name.md`
3. **Format:** Use markdown with clear headings
4. **References:** Link to related docs
5. **Updates:** Keep tracking.md updated

### Documentation Standards
- Clear headings and sections
- Code examples where relevant
- Links to related files
- Date last updated
- Version/status information

---

**Last Updated:** 2025-11-13
**Total Documentation Files:** 8 core files
**Most Critical:** PRD.md, MVP.md, phase2-plan.md

Use `/project` for complete context or specific file paths for detailed information.

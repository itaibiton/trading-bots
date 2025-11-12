# TradingBot Roadmap

**Last Updated:** 2025-11-13
**Current Phase:** Phase 2 - Bot Management & AI Creation

---

## Phase 2: Bot Management & AI Creation
**Status:** Ready to Start
**Timeline:** 2025-11-11 to 2025-12-02 (3 weeks)
**Progress:** 0%

### Week 1: Database & AI Foundation (Nov 11-18)

#### High Priority

**Theme System (Foundation):**
- [x] Install next-themes package (~1 min) ✅ 2025-11-13
- [x] Create ThemeProvider wrapper component (~5 min) ✅ 2025-11-13
- [x] Update root layout with ThemeProvider and suppressHydrationWarning (~3 min) ✅ 2025-11-13
- [x] Create ThemeToggle component with Light/Dark/System options (~10 min) ✅ 2025-11-13
- [x] Add ThemeToggle to Navbar (~2 min) ✅ 2025-11-13
- [-] Test theme switching (light, dark, system, persistence, no flash) (~10 min) 🏗️ 2025-11-13
- [ ] Verify accessibility (keyboard navigation, screen readers) (~5 min)

**Database & AI:**
- [ ] Design complete database schema (bots, risk_configs, strategies, bot_logs, ai_conversations, profiles)
- [ ] Write Supabase migration files (7 migrations total)
- [ ] Test migrations locally with sample data
- [ ] Deploy migrations to Supabase
- [ ] Seed 4 strategy templates (DCA, Grid, Momentum, Mean Reversion)
- [ ] Set up Anthropic Claude API account and credentials
- [ ] Create ai-strategy-recommender Edge Function
- [ ] Design AI system prompts (goal discovery, recommendation, configuration)
- [ ] Test AI responses with sample inputs

#### Medium Priority
- [ ] Create TypeScript types (Bot, Strategy, RiskConfig, AIConversation)
- [ ] Build API routes for bot CRUD operations
- [ ] Set up error handling and validation layer
- [ ] Create bot data layer utilities

### Week 2: Bot Creation Flows (Nov 18-25)

#### High Priority
- [ ] Build strategy template selector UI with 4 cards
- [ ] Create template configuration forms (trading pair, capital, strategy params)
- [ ] Implement risk management questionnaire
- [ ] Build bot preview page before deployment
- [ ] Create AI chat interface component
- [ ] Implement conversation flow (goal → recommendation → config)
- [ ] Add streaming AI responses
- [ ] Connect AI chat to Edge Function

#### Medium Priority
- [ ] Add live configuration preview during AI conversation
- [ ] Allow manual editing of AI suggestions
- [ ] Implement end-to-end template creation flow
- [ ] Implement end-to-end AI creation flow
- [ ] Add UI polish and animations
- [ ] Handle error states and edge cases

### Week 3: Bot Management & Finalization (Nov 25-Dec 2)

#### High Priority
- [ ] Build bot list/grid view with cards
- [ ] Display bot status, P&L (placeholder), win rate, capital, risk level
- [ ] Add filter by status and strategy type
- [ ] Add sort by name, P&L, created date
- [ ] Implement search by bot name
- [ ] Create edit configuration flow
- [ ] Add delete bot with confirmation modal
- [ ] Implement clone bot functionality

#### Medium Priority
- [ ] Add paper trading balance display
- [ ] Create paper trading explainer tooltip
- [ ] Show allocated vs available capital
- [ ] Add status indicators with proper colors
- [ ] Implement bot detail page
- [ ] Mobile responsiveness for all screens

#### Low Priority
- [ ] Add bot clone with modifications
- [ ] Implement advanced filters
- [ ] Create export bot config functionality
- [ ] Add keyboard shortcuts for bot management

### Testing & Documentation
- [ ] Write unit tests for critical components
- [ ] Create integration tests for bot creation flows
- [ ] Write E2E tests (Playwright) for user journeys
- [ ] Update user documentation
- [ ] Update developer documentation
- [ ] Create video tutorial (optional)

---

## Recently Completed (Last 7 Days)

- [x] Create custom Claude Code commands (/project, /phase2, /docs, /recent) ✅ 2025-11-13
- [x] Update README.md with custom commands documentation ✅ 2025-11-13
- [x] Fix critical authentication bypass vulnerability (recovery session isolation) ✅ 2025-11-12
- [x] Implement JWT AMR detection in middleware ✅ 2025-11-12
- [x] Create requireNormalAuth() and isRecoverySession() utilities ✅ 2025-11-12
- [x] Complete Phase 1 authentication system with PKCE ✅ 2025-11-11
- [x] Create comprehensive PRD (1750 lines) ✅ 2025-11-11
- [x] Create detailed Phase 2 plan (940 lines) ✅ 2025-11-11
- [x] Set up project tracking system ✅ 2025-11-11

---

## Phase 3: Strategy Execution & Live Trading (NEXT)
**Status:** Planned
**Timeline:** Dec 2025 - Jan 2026 (4 weeks)
**Dependencies:** Phase 2 complete

### Deferred to Phase 3
- [ ] Bot execution engine with Supabase Edge Functions (cron jobs)
- [ ] Binance API integration for real-time market data
- [ ] Trade simulator for paper trading with realistic execution
- [ ] Real-time P&L dashboard with WebSocket updates
- [ ] Risk monitoring system with automated circuit breakers
- [ ] Create trades and positions database tables
- [ ] Implement stop-loss and take-profit triggers
- [ ] Build bot execution logs viewer

---

## Milestones & Progress

### Phase 2 Milestones

**Milestone 1: Database Foundation** (Target: Nov 18)
- [ ] Schema designed
- [ ] Migrations created and tested
- [ ] RLS policies set up
- [ ] Strategy templates seeded

**Milestone 2: AI Integration** (Target: Nov 25)
- [ ] Claude API configured
- [ ] Edge Function deployed
- [ ] Prompts designed and tested
- [ ] AI chat UI complete

**Milestone 3: Bot Creation** (Target: Nov 25)
- [ ] Template path working end-to-end
- [ ] AI path working end-to-end
- [ ] Both flows tested with users

**Milestone 4: Bot Management** (Target: Dec 2)
- [ ] Dashboard complete with all features
- [ ] CRUD operations working
- [ ] Paper trading setup
- [ ] Phase 2 complete and ready for Phase 3

---

## Active Blockers & Issues

### Current Blockers
- None

### Waiting On
- Anthropic API key (need to create account and generate key)

### Recent Decisions
- **2025-11-13:** Added dark/light mode support to Phase 2 using next-themes (industry standard, ~35 min implementation)
- **2025-11-13:** Implemented 3-layer project manager architecture (SessionStart hooks + ROADMAP.md + PM subagent)
- **2025-11-12:** Used JWT AMR claims for recovery session detection instead of URL parameters
- **2025-11-11:** Chose hybrid AI approach (templates + conversational) over AI-only

---

## Notes & Context

### Project Status
- Phase 1 authentication completed successfully
- Critical security vulnerability fixed (recovery session bypass)
- Comprehensive documentation in place
- Custom Claude Code commands created for efficiency
- Project manager agent implemented for task tracking

### Technical Decisions
- Using Supabase for database and auth (PostgreSQL + RLS)
- Anthropic Claude Sonnet 3.5 for AI bot creation
- Next.js 15 App Router with React 19
- TailwindCSS v4 with shadcn/ui components
- Paper trading first, real trading in Phase 5

### Success Criteria for Phase 2
- Users can create bots via templates in < 3 minutes
- Users can create bots via AI in < 5 minutes
- 80%+ of test users successfully create a bot
- AI recommendations are relevant and safe
- All bots default to paper trading mode
- Mobile responsive design
- No bots created without risk controls

---

## Quick Reference

**Commands:**
- `/project` - Complete project context
- `/phase2` - Phase 2 implementation details
- `/docs` - Documentation reference
- `/recent` - Recent work summary
- `/status` - Quick status check
- `/review` - Weekly review and planning

**Key Files:**
- `docs/PRD.md` - Product requirements (1750 lines)
- `progress/phase2-plan.md` - Detailed Phase 2 plan (940 lines)
- `progress/tracking.md` - Progress tracker (330 lines)
- `MVP.md` - Product vision and roadmap (346 lines)
- `tests/TEST_PLAN.md` - Testing strategy

---

**Maintained by:** Project Manager Agent
**Review Frequency:** Daily updates, Weekly comprehensive review

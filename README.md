# TradingBot - AI-Powered Automated Crypto Trading Platform

An AI-powered SaaS platform that enables users to create, configure, and run automated trading bots for cryptocurrency markets without writing code.

## 🚀 Project Status

- **Current Phase:** Phase 1 Complete ✅ → Phase 2 Ready to Start
- **Last Updated:** 2025-11-13
- **Tech Stack:** Next.js 15, React 19, TypeScript, Supabase, Claude AI
- **Stage:** MVP Development

## 📋 Quick Links

- **Product Vision:** See [MVP.md](./MVP.md)
- **Detailed Requirements:** See [docs/PRD.md](./docs/PRD.md)
- **Progress Tracking:** See [progress/tracking.md](./progress/tracking.md)
- **Phase 2 Plan:** See [progress/phase2-plan.md](./progress/phase2-plan.md)

## 🎯 Vision

Democratize algorithmic trading by making it accessible to everyone through AI-powered guidance and built-in risk management, enabling traders to automate strategies confidently without coding.

## ✨ Key Features (Planned)

- **AI-Assisted Bot Creation** - Conversational setup with Claude AI
- **Quick Start Templates** - DCA, Grid Trading, Momentum, Mean Reversion
- **Comprehensive Risk Management** - Built-in safeguards with capital limits and stop-loss
- **24/7 Automated Execution** - Bots run continuously in paper trading mode
- **Real-Time P&L Dashboard** - Instant visibility into bot performance
- **Paper Trading First** - Risk-free testing before real money deployment

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.3+
- **UI Library:** React 19
- **Styling:** TailwindCSS v4
- **Components:** shadcn/ui (new-york style)
- **State Management:** Zustand, React Query

### Backend
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (email/password with PKCE)
- **Serverless:** Supabase Edge Functions (Deno)
- **Real-time:** Supabase Realtime (WebSocket)
- **AI:** Anthropic Claude API (Sonnet 3.5)

### External APIs
- **Market Data:** Binance API (Phase 3)
- **AI:** Anthropic Claude
- **Email:** Resend/SendGrid (future)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account (free tier works)
- Anthropic API key (for Phase 2+)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd kohelet-bots

# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_claude_api_key  # Phase 2+
```

## 📁 Project Structure

```
/app                    - Next.js App Router pages
  /dashboard           - Protected dashboard area
  /login, /signup      - Authentication pages
  /auth/confirm        - PKCE token exchange endpoint
  /auth/error          - Auth error handler
/components
  /auth               - Auth form components
  /ui                 - shadcn/ui components
  Navbar.tsx          - Main navigation
/contexts
  AuthProvider.tsx    - Auth state management
/lib
  /supabase          - Supabase client utilities
  utils.ts           - Helper functions
/docs                 - Product documentation
  PRD.md             - Product Requirements Document
/progress             - Progress tracking
  tracking.md        - Real-time progress tracker
  phase2-plan.md     - Phase 2 detailed plan
/.claude/commands     - Custom Claude Code commands
```

## 🤖 Custom Claude Code Commands

This project includes custom slash commands for Claude Code that provide instant project context:

### Available Commands

- **`/project`** - Complete project overview
  - Mission and vision
  - Current status and recent work
  - Tech stack and architecture
  - Project structure and important files
  - Development workflow and priorities

- **`/phase2`** - Phase 2 implementation details
  - Current progress and timeline
  - Database schema specifications
  - AI integration specs
  - Component requirements
  - Testing checklist

- **`/docs`** - Documentation reference guide
  - Quick links to all project docs
  - PRD sections with line numbers
  - API documentation
  - Strategy specifications
  - Testing documentation

- **`/recent`** - Recent work summary
  - Latest session achievements
  - Security fixes implemented
  - Files modified
  - Technical details and lessons learned

### Using Custom Commands

In any Claude Code session working on this project, simply type:

```
/project
```

And Claude will instantly load the complete project context, making it much more efficient and knowledgeable about your specific codebase.

### Creating New Commands

To add a new custom command:

1. Create a markdown file in `.claude/commands/`
2. Name it descriptively (e.g., `feature-name.md`)
3. Write comprehensive context about that feature
4. Use the command with `/feature-name`

See existing commands in `.claude/commands/` for examples.

## 📅 Development Roadmap

### Phase 1: Authentication & Foundation ✅ (Complete)
- Full authentication system with Supabase
- Login, Signup, Password Reset with PKCE
- Protected routes and middleware
- Landing page and dashboard structure
- **CRITICAL:** Recovery session isolation security fix

### Phase 2: Bot Management & AI Creation (Current - Nov 2025)
- Database schema for bots and strategies
- AI integration with Claude
- Bot creation via templates and AI
- Bot management dashboard
- Paper trading infrastructure

### Phase 3: Strategy Execution & Live Trading (Dec 2025)
- Bot execution engine
- Binance integration
- Trade simulator
- Real-time P&L dashboard
- Risk monitoring system

### Phase 4+: Analytics & Advanced Features
- Performance analytics
- Backtesting engine
- Alert system
- Portfolio management

See [MVP.md](./MVP.md) for complete roadmap.

## 🧪 Testing

```bash
# Run tests (Phase 2+)
pnpm test

# Run linting
pnpm lint

# Build for production
pnpm build
```

## 🔐 Security

### Recent Security Fixes

**Recovery Session Isolation (2025-11-13):**
- Fixed critical authentication bypass vulnerability
- Recovery sessions now restricted to `/reset-password` only
- Implemented JWT AMR (Authentication Methods Reference) detection
- Created `requireNormalAuth()` utility for API route protection

See [.claude/commands/recent.md](./.claude/commands/recent.md) for full details.

### Security Practices

- Row Level Security (RLS) on all Supabase tables
- PKCE flow for password reset
- JWT-based session validation
- Server-side auth checks for all protected operations
- API rate limiting (planned)

## 📚 Documentation

### Core Documents
- **[MVP.md](./MVP.md)** - Product vision and high-level roadmap (346 lines)
- **[docs/PRD.md](./docs/PRD.md)** - Comprehensive product requirements (1750 lines)
- **[progress/tracking.md](./progress/tracking.md)** - Real-time progress tracker (330 lines)
- **[progress/phase2-plan.md](./progress/phase2-plan.md)** - Detailed Phase 2 plan (940 lines)
- **[tests/TEST_PLAN.md](./tests/TEST_PLAN.md)** - Testing strategy

### Quick Reference
Use the custom Claude commands for instant context:
- `/project` - Complete project overview
- `/phase2` - Current phase details
- `/docs` - All documentation links
- `/recent` - Recent work summary

## 🤝 Contributing

This is currently a solo development project. Contribution guidelines will be added once the MVP is complete and ready for community involvement.

## 📝 Development Notes

### For AI Assistants (Claude Code)

When working on this project, always:
1. Load context with `/project` or relevant slash command
2. Check documentation before implementing features
3. Follow existing patterns from Phase 1
4. Consider security implications (auth, RLS)
5. Update progress tracking in `progress/tracking.md`
6. Write tests for new features
7. Document decisions in decision log

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push to remote
git push origin feature/feature-name
```

## 📜 License

[Add license information]

## 📧 Contact

[Add contact information]

---

**Project Stage:** MVP Development (Phase 1 Complete, Phase 2 In Progress)

**Last Updated:** 2025-11-13

For detailed project context, use `/project` command in Claude Code.

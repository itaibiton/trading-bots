# TradingBot Testing Strategy & Plan

**Version:** 1.0
**Last Updated:** 2025-11-11
**Status:** Active

---

## Table of Contents

1. [Overview](#overview)
2. [Testing Philosophy](#testing-philosophy)
3. [Testing Tools & Framework](#testing-tools--framework)
4. [Test Types](#test-types)
5. [Test Coverage Requirements](#test-coverage-requirements)
6. [Phase-by-Phase Testing](#phase-by-phase-testing)
7. [CI/CD Integration](#cicd-integration)
8. [Testing Best Practices](#testing-best-practices)
9. [Bug Tracking & Resolution](#bug-tracking--resolution)

---

## Overview

This document outlines the comprehensive testing strategy for the TradingBot platform. Our goal is to ensure high quality, reliability, and security through systematic testing at all levels—from unit tests to end-to-end user flows.

### Testing Goals

1. **Prevent Regressions** - Catch bugs before they reach production
2. **Enable Confident Refactoring** - Tests allow safe code improvements
3. **Document Behavior** - Tests serve as living documentation
4. **Ensure Security** - Verify authentication and data protection
5. **Validate User Flows** - Confirm critical journeys work end-to-end

### Success Metrics

- **Unit Test Coverage:** 80%+ for critical business logic
- **Integration Test Coverage:** 100% of API routes
- **E2E Test Coverage:** 100% of critical user flows
- **CI/CD:** All tests pass before deployment
- **Bug Detection:** 90%+ of bugs caught before production

---

## Testing Philosophy

### Test Pyramid Strategy

```
        ╱───────╲
       ╱   E2E   ╲       ← Few, slow, high-level (10%)
      ╱───────────╲
     ╱             ╲
    ╱  Integration  ╲    ← Moderate, medium speed (30%)
   ╱─────────────────╲
  ╱                   ╲
 ╱    Unit Tests       ╲  ← Many, fast, focused (60%)
╱───────────────────────╲
```

### Guiding Principles

1. **Write Tests First (TDD)** - For complex logic, write failing tests then implement
2. **Test Behavior, Not Implementation** - Focus on what code does, not how
3. **Keep Tests Fast** - Unit tests < 1s, integration < 5s, E2E < 30s
4. **Make Tests Readable** - Tests are documentation
5. **Isolate Tests** - No dependencies between tests
6. **Use Real Data Structures** - Avoid excessive mocking

---

## Testing Tools & Framework

### Core Testing Stack

| Tool | Purpose | Phase |
|------|---------|-------|
| **Jest** | Unit and integration testing | All |
| **React Testing Library** | Component testing | All |
| **Playwright** | E2E browser testing | Phase 2+ |
| **Supertest** | API route testing | Phase 2+ |
| **MSW (Mock Service Worker)** | API mocking for tests | Phase 2+ |
| **Faker.js** | Test data generation | Phase 2+ |

### Setup Instructions

**Install Testing Dependencies:**
```bash
pnpm add -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D @playwright/test
pnpm add -D msw @faker-js/faker
pnpm add -D @supabase/supabase-js-mock # For Supabase mocks
```

**Jest Configuration (jest.config.js):**
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
}
```

**Playwright Configuration (playwright.config.ts):**
```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

---

## Test Types

### 1. Unit Tests

**What:** Test individual functions, utilities, and components in isolation

**Scope:**
- Utility functions (formatters, validators, calculators)
- React hooks
- Pure business logic
- Simple components (no complex interactions)

**Example Structure:**
```typescript
// lib/utils/formatCurrency.test.ts
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('should format positive amounts with 2 decimals', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('should format negative amounts with minus sign', () => {
    expect(formatCurrency(-500)).toBe('-$500.00')
  })

  it('should handle zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('should throw error for invalid input', () => {
    expect(() => formatCurrency(NaN)).toThrow()
  })
})
```

**Component Example:**
```typescript
// components/bot/BotCard.test.tsx
import { render, screen } from '@testing-library/react'
import { BotCard } from './BotCard'

describe('BotCard', () => {
  const mockBot = {
    id: '1',
    name: 'Test Bot',
    strategy_type: 'dca',
    status: 'running',
    allocated_capital: 1000,
    current_value: 1050,
  }

  it('should render bot name', () => {
    render(<BotCard bot={mockBot} />)
    expect(screen.getByText('Test Bot')).toBeInTheDocument()
  })

  it('should show correct status badge', () => {
    render(<BotCard bot={mockBot} />)
    expect(screen.getByText('Running')).toHaveClass('status-running')
  })

  it('should calculate and display P&L', () => {
    render(<BotCard bot={mockBot} />)
    expect(screen.getByText('+$50.00 (+5.00%)')).toBeInTheDocument()
  })
})
```

### 2. Integration Tests

**What:** Test multiple units working together (API routes, database queries, services)

**Scope:**
- API route handlers
- Database operations with Supabase
- Authentication flows
- Service layer functions

**Example Structure:**
```typescript
// app/api/bots/route.test.ts
import { POST, GET } from './route'
import { createMockRequest } from '@/tests/utils'
import { mockSupabaseClient } from '@/tests/mocks/supabase'

describe('POST /api/bots', () => {
  beforeEach(() => {
    mockSupabaseClient.reset()
  })

  it('should create a new bot successfully', async () => {
    const request = createMockRequest({
      method: 'POST',
      body: {
        name: 'My DCA Bot',
        strategy_type: 'dca',
        trading_pair: 'BTC/USDT',
        allocated_capital: 1000,
        strategy_config: { buy_amount_usd: 100, buy_frequency_hours: 24 },
        risk_config: { stop_loss_percent: 2, take_profit_percent: 5 },
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.bot.name).toBe('My DCA Bot')
    expect(mockSupabaseClient.insert).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'My DCA Bot' })
    )
  })

  it('should return 400 for invalid input', async () => {
    const request = createMockRequest({
      method: 'POST',
      body: { name: '' }, // Missing required fields
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('should enforce stop-loss requirement', async () => {
    const request = createMockRequest({
      method: 'POST',
      body: {
        name: 'Bot without stop-loss',
        // ... other fields
        risk_config: {}, // Missing stop_loss
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('stop-loss')
  })
})

describe('GET /api/bots', () => {
  it('should return all user bots', async () => {
    mockSupabaseClient.select.mockResolvedValue([
      { id: '1', name: 'Bot 1' },
      { id: '2', name: 'Bot 2' },
    ])

    const request = createMockRequest({ method: 'GET' })
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.bots).toHaveLength(2)
  })

  it('should filter by status query param', async () => {
    const request = createMockRequest({
      method: 'GET',
      query: { status: 'running' },
    })

    const response = await GET(request)

    expect(mockSupabaseClient.eq).toHaveBeenCalledWith('status', 'running')
  })
})
```

### 3. End-to-End (E2E) Tests

**What:** Test complete user flows from browser perspective

**Scope:**
- Critical user journeys
- Multi-step processes
- Real browser interactions
- Full stack (frontend + backend + database)

**Example Structure:**
```typescript
// e2e/bot-creation.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Bot Creation - Template Path', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto('/login')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'testpassword123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })

  test('should create a DCA bot via template', async ({ page }) => {
    // Navigate to bot creation
    await page.click('text=Create Bot')
    await page.waitForURL('/bots/create')

    // Select DCA template
    await page.click('text=DCA (Dollar Cost Averaging)')
    await page.waitForURL('/bots/create/template/dca')

    // Fill configuration form
    await page.fill('[name="bot_name"]', 'My DCA Bot')
    await page.selectOption('[name="trading_pair"]', 'BTC/USDT')
    await page.fill('[name="allocated_capital"]', '1000')
    await page.fill('[name="buy_amount_usd"]', '100')
    await page.fill('[name="buy_frequency_hours"]', '24')
    await page.click('text=Next: Risk Settings')

    // Configure risk settings
    await page.fill('[name="stop_loss_percent"]', '2')
    await page.fill('[name="take_profit_percent"]', '5')
    await page.fill('[name="max_daily_loss"]', '50')
    await page.click('text=Preview Bot')

    // Verify preview page
    await expect(page.locator('text=My DCA Bot')).toBeVisible()
    await expect(page.locator('text=Risk Level: Medium')).toBeVisible()

    // Deploy bot
    await page.click('text=Deploy Bot')
    await page.waitForURL('/dashboard')

    // Verify bot appears in dashboard
    await expect(page.locator('text=My DCA Bot')).toBeVisible()
    await expect(page.locator('text=Status: Stopped')).toBeVisible()
  })

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/bots/create/template/dca')

    // Try to submit without required fields
    await page.click('text=Next: Risk Settings')

    // Should see error messages
    await expect(page.locator('text=Bot name is required')).toBeVisible()
    await expect(page.locator('text=Capital allocation is required')).toBeVisible()
  })
})

test.describe('Bot Creation - AI Path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'testpassword123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })

  test('should create bot through AI conversation', async ({ page }) => {
    await page.click('text=Create Bot with AI')
    await page.waitForURL('/bots/create/ai')

    // AI asks first question
    await expect(page.locator('text=What are your trading goals?')).toBeVisible()

    // User responds
    await page.fill('[placeholder="Type your message..."]', 'I want to buy Bitcoin regularly with low risk')
    await page.click('button[aria-label="Send"]')

    // Wait for AI response
    await expect(page.locator('text=DCA strategy')).toBeVisible({ timeout: 10000 })

    // Continue conversation
    await page.fill('[placeholder="Type your message..."]', 'Yes, that sounds good')
    await page.click('button[aria-label="Send"]')

    // Eventually reach preview
    await page.click('text=Deploy This Bot')
    await page.waitForURL('/dashboard')

    // Verify bot created
    await expect(page.locator('[data-testid="bot-card"]')).toBeVisible()
  })
})
```

---

## Test Coverage Requirements

### Coverage Targets by Layer

| Layer | Unit Tests | Integration Tests | E2E Tests |
|-------|-----------|-------------------|-----------|
| **Utils & Helpers** | 90%+ | N/A | N/A |
| **Components** | 80%+ | N/A | Critical flows |
| **API Routes** | 70%+ | 100% | Critical endpoints |
| **Business Logic** | 90%+ | 80%+ | N/A |
| **User Flows** | N/A | N/A | 100% critical |

### Critical Code Requiring 100% Coverage

1. **Authentication Logic** - Security-critical
2. **Risk Validation** - Prevents user losses
3. **Bot Creation** - Core value proposition
4. **P&L Calculations** - Financial accuracy
5. **Trade Execution** - Money at risk (Phase 3)

### Acceptable to Skip

- UI styling and animations
- Simple presentational components
- Third-party API mocks (focus on our code)
- Error messages and static content

---

## Phase-by-Phase Testing

### Phase 1: Authentication & Foundation ✅

**Unit Tests:**
- [x] Auth context hook (useAuth)
- [x] Supabase client functions
- [x] Form validation logic

**Integration Tests:**
- [x] Login flow with Supabase
- [x] Signup flow
- [x] Password reset flow
- [x] Session persistence

**E2E Tests:**
- [x] Complete signup → dashboard journey
- [x] Login → dashboard journey
- [x] Password reset journey
- [x] Protected route redirection

**Status:** All tests passing ✅

---

### Phase 2: Bot Management & AI Creation (Current)

**Unit Tests:**

**Components:**
- [ ] `StrategySelector` - Template selection logic
- [ ] `BotCard` - Data display and formatting
- [ ] `BotControls` - Button states and actions
- [ ] `RiskQuestionnaire` - Form validation and risk calculation
- [ ] `AIChat` - Message handling and display
- [ ] `BotPreview` - Configuration summary display

**Utilities:**
- [ ] `calculateRiskLevel` - Risk scoring algorithm
- [ ] `validateBotConfig` - Configuration validation
- [ ] `validateRiskConfig` - Risk parameter validation
- [ ] `formatStrategyConfig` - Config transformation
- [ ] `parseTradingPair` - Trading pair validation

**Hooks:**
- [ ] `useAI` - AI conversation state management
- [ ] `useBots` - Bot CRUD operations
- [ ] `useBotFilters` - Filter and sort logic

**Integration Tests:**

**API Routes:**
- [ ] POST /api/bots - Bot creation with all validations
- [ ] GET /api/bots - List with filters and sorting
- [ ] GET /api/bots/[id] - Single bot retrieval
- [ ] PATCH /api/bots/[id] - Bot update validation
- [ ] DELETE /api/bots/[id] - Soft/hard deletion
- [ ] POST /api/ai/chat - AI conversation handling
- [ ] POST /api/ai/recommend - Strategy recommendation

**Database:**
- [ ] RLS policies (users can only access own bots)
- [ ] Cascade deletes (deleting bot deletes risk_config)
- [ ] Unique constraints (one risk_config per bot)
- [ ] Foreign key integrity
- [ ] Default values (status='stopped', is_paper_trading=true)

**Supabase Edge Functions:**
- [ ] ai-strategy-recommender - Claude API integration
- [ ] Input validation
- [ ] Error handling
- [ ] Rate limiting

**E2E Tests:**

**Critical User Journeys:**
- [ ] New user creates first bot via DCA template
- [ ] New user creates first bot via AI assistant
- [ ] User views bot dashboard with multiple bots
- [ ] User edits existing bot configuration
- [ ] User deletes a bot with confirmation
- [ ] User clones an existing bot
- [ ] User filters bots by status
- [ ] User sorts bots by P&L
- [ ] User searches for bot by name

**AI-Specific Flows:**
- [ ] Full AI conversation from start to deployment
- [ ] AI handles unclear user input
- [ ] AI recommends appropriate strategy
- [ ] AI validates risky parameters
- [ ] User can edit AI-generated config
- [ ] Conversation saves to database

**Error Scenarios:**
- [ ] Network error during bot creation
- [ ] AI API timeout
- [ ] Validation error shows clear message
- [ ] Browser refresh during creation (state recovery)
- [ ] Concurrent bot creation

---

### Phase 3: Strategy Execution & Live Trading

**Unit Tests:**

**Strategy Implementations:**
- [ ] DCA strategy decision logic
- [ ] Grid Trading buy/sell level calculation
- [ ] Momentum indicator calculations (EMA, RSI)
- [ ] Mean Reversion signal generation

**Utilities:**
- [ ] `calculatePnL` - Profit/loss calculation
- [ ] `simulateTrade` - Paper trading simulator
- [ ] `applySlippage` - Slippage calculation
- [ ] `calculateFees` - Fee calculation

**Integration Tests:**

**Bot Execution:**
- [ ] Bot executor Edge Function
- [ ] Strategy evaluation
- [ ] Trade decision making
- [ ] Position management
- [ ] Risk limit enforcement

**Binance Integration:**
- [ ] Market data fetching
- [ ] Price updates
- [ ] Order placement (paper mode)
- [ ] Error handling and retries

**Trade Simulator:**
- [ ] Trade execution simulation
- [ ] Balance updates
- [ ] Position tracking
- [ ] P&L calculation

**E2E Tests:**

**Bot Lifecycle:**
- [ ] Create bot → Start → Execute trades → View results
- [ ] Bot respects stop-loss trigger
- [ ] Bot respects take-profit trigger
- [ ] Bot pauses on daily loss limit
- [ ] Bot continues after manual pause/resume

**Dashboard Real-Time:**
- [ ] P&L updates in real-time
- [ ] Trade activity feed updates
- [ ] Position display updates
- [ ] Risk exposure updates

---

### Phase 4: Analytics & Optimization

**Unit Tests:**
- [ ] Sharpe ratio calculation
- [ ] Drawdown calculation
- [ ] Win rate calculation
- [ ] Risk-adjusted return formulas

**Integration Tests:**
- [ ] Analytics API endpoints
- [ ] Historical data aggregation
- [ ] Chart data generation
- [ ] Report exports

**E2E Tests:**
- [ ] View bot performance analytics
- [ ] Compare multiple bots
- [ ] Export trade history
- [ ] View risk metrics

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:unit
      - run: pnpm test:coverage
      - uses: codecov/codecov-action@v3

  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: supabase/postgres
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm playwright install --with-deps
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathPattern=\\.test\\.(ts|tsx)$",
    "test:integration": "jest --testPathPattern=\\.integration\\.test\\.(ts|tsx)$",
    "test:e2e": "playwright test",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:ui": "playwright test --ui"
  }
}
```

---

## Testing Best Practices

### Do's ✅

1. **Write Descriptive Test Names**
   ```typescript
   // ✅ Good
   it('should calculate P&L correctly for profitable trade', () => {})

   // ❌ Bad
   it('test1', () => {})
   ```

2. **Use Arrange-Act-Assert Pattern**
   ```typescript
   it('should format currency with commas', () => {
     // Arrange
     const amount = 1234.56

     // Act
     const result = formatCurrency(amount)

     // Assert
     expect(result).toBe('$1,234.56')
   })
   ```

3. **Test One Thing Per Test**
   ```typescript
   // ✅ Good - focused tests
   it('should add new bot to list')
   it('should update bot count')

   // ❌ Bad - testing multiple behaviors
   it('should add bot and update count and show notification')
   ```

4. **Use Data-Testid for Stable Selectors**
   ```typescript
   // ✅ Good
   <button data-testid="create-bot-button">Create Bot</button>
   screen.getByTestId('create-bot-button')

   // ❌ Bad - brittle
   screen.getByText('Create Bot') // Breaks if text changes
   ```

5. **Mock External Dependencies**
   ```typescript
   // ✅ Good
   jest.mock('@/lib/supabase/client', () => ({
     createClient: () => mockSupabaseClient
   }))

   // ❌ Bad - hitting real Supabase in unit tests
   ```

### Don'ts ❌

1. **Don't Test Implementation Details**
   ```typescript
   // ❌ Bad
   expect(component.state.count).toBe(1)

   // ✅ Good
   expect(screen.getByText('Count: 1')).toBeInTheDocument()
   ```

2. **Don't Use Magic Numbers**
   ```typescript
   // ❌ Bad
   expect(calculateFee(100)).toBe(0.1)

   // ✅ Good
   const TRADE_AMOUNT = 100
   const EXPECTED_FEE = 0.1
   expect(calculateFee(TRADE_AMOUNT)).toBe(EXPECTED_FEE)
   ```

3. **Don't Skip Cleanup**
   ```typescript
   // ✅ Good
   afterEach(() => {
     jest.clearAllMocks()
     cleanup()
   })
   ```

4. **Don't Test External Libraries**
   ```typescript
   // ❌ Bad - testing React itself
   it('should update state when setState is called')

   // ✅ Good - test your logic
   it('should show error message when validation fails')
   ```

---

## Bug Tracking & Resolution

### Bug Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| **P0 - Critical** | App broken, data loss risk | Immediate | Auth broken, trades not executing |
| **P1 - High** | Core feature broken | < 24 hours | Bot creation fails |
| **P2 - Medium** | Feature impaired | < 1 week | Slow dashboard load |
| **P3 - Low** | Minor issue | Next sprint | UI misalignment |

### Bug Report Template

```markdown
**Title:** [Brief description]

**Severity:** P0 / P1 / P2 / P3

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. Observe...

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Browser: Chrome 120
- OS: macOS 14
- Version: Phase 2 (commit abc123)

**Screenshots:**
[Attach if relevant]

**Logs:**
[Error messages or console logs]
```

### Bug Resolution Process

1. **Triage:** Assign severity within 24 hours
2. **Investigation:** Reproduce bug, identify root cause
3. **Write Test:** Create failing test that reproduces bug
4. **Fix:** Implement fix
5. **Verify:** Confirm test now passes
6. **Review:** Code review with emphasis on test coverage
7. **Deploy:** Merge and deploy
8. **Monitor:** Watch for recurrence

---

## Appendix

### Useful Testing Utilities

**Mock Bot Data Generator:**
```typescript
// tests/factories/bot.factory.ts
import { faker } from '@faker-js/faker'

export function createMockBot(overrides = {}) {
  return {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    name: faker.commerce.productName(),
    strategy_type: faker.helpers.arrayElement(['dca', 'grid', 'momentum', 'mean_reversion']),
    trading_pair: 'BTC/USDT',
    status: 'stopped',
    allocated_capital: faker.number.float({ min: 100, max: 10000 }),
    current_value: faker.number.float({ min: 100, max: 10000 }),
    is_paper_trading: true,
    strategy_config: {},
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    ...overrides,
  }
}
```

**Mock Supabase Client:**
```typescript
// tests/mocks/supabase.ts
export const mockSupabaseClient = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn(),
  reset: function() {
    Object.values(this).forEach(fn => {
      if (typeof fn === 'function' && fn.mockReset) {
        fn.mockReset()
      }
    })
  }
}
```

---

**Next Steps:**
1. Set up testing framework (Jest, Playwright)
2. Write first unit tests for Phase 1 auth logic
3. Add CI/CD workflow
4. Begin Phase 2 tests alongside development
5. Track coverage in progress/test-checklist.md

---

**Maintained By:** Solo Developer
**Review Frequency:** After each phase completion
**Last Review:** Phase 1 Complete

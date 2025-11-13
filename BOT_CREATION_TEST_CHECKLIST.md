# Bot Creation Flow - Manual Testing Checklist

Complete testing checklist for the bot creation flow before production deployment.

---

## Pre-Testing Setup

### Environment
- [ ] Development server running (`pnpm dev`)
- [ ] All dependencies installed (`pnpm install`)
- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] Production build succeeds (`pnpm run build`)
- [ ] Browser DevTools open (Console + Network tabs)

### Test Accounts
- [ ] Test user account created
- [ ] User logged in successfully
- [ ] Authentication working (session valid)

### Browsers to Test
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Mode Selection Page (`/bots/create`)

### Visual & Layout
- [ ] Page loads without errors
- [ ] Header text visible and centered
- [ ] Both mode cards render side-by-side (desktop)
- [ ] Cards stack vertically on mobile (<768px)
- [ ] Icons display correctly (Sparkles, Zap)
- [ ] Badges show correct labels
- [ ] Comparison table displays properly
- [ ] All text is readable in light mode
- [ ] All text is readable in dark mode
- [ ] No horizontal scroll on mobile

### Animations
- [ ] Cards slide in from sides on page load
- [ ] Feature list items animate sequentially
- [ ] Hover effect scales cards up slightly
- [ ] Gradient overlay appears on hover
- [ ] Smooth transitions (no jank)

### Interactions
- [ ] Simple Mode card is clickable
- [ ] Pro Mode card is clickable
- [ ] Clicking Simple Mode navigates to `/bots/create/simple`
- [ ] Clicking Pro Mode navigates to `/bots/create/pro`
- [ ] Comparison table rows highlight on hover
- [ ] Table scrolls horizontally on mobile

### Accessibility
- [ ] Tab navigation works (cards focusable)
- [ ] Focus indicators visible
- [ ] Screen reader announces card content
- [ ] All interactive elements have proper ARIA labels
- [ ] Color contrast meets WCAG AA

### Console
- [ ] No JavaScript errors
- [ ] No console warnings
- [ ] No 404 network errors

---

## Simple Mode (`/bots/create/simple`)

### Initial Load
- [ ] Page loads without errors
- [ ] Split screen layout displays (Preview | Chat)
- [ ] Preview on left (35%), Chat on right (65%) on desktop
- [ ] Layout stacks on mobile (chat first, preview second)
- [ ] Welcome message appears in chat automatically
- [ ] Preview shows "Configuration will appear..." empty state
- [ ] Back button visible in chat header

### Chat Interface
#### Step 1: Goal Selection
- [ ] AI welcome message displays
- [ ] Four goal quick reply buttons appear
- [ ] Clicking "Passive Income" adds user message
- [ ] AI typing indicator appears
- [ ] AI responds with risk question after 1 second
- [ ] Preview updates with goal (icon + label)
- [ ] Progress indicator shows Step 1 complete

#### Step 2: Risk Selection
- [ ] Three risk quick reply buttons appear
- [ ] Clicking "Medium Risk" adds user message
- [ ] AI typing indicator appears
- [ ] AI responds with capital question
- [ ] Preview updates with risk badge (yellow)
- [ ] Risk gauge appears in preview
- [ ] Progress indicator shows Step 2 complete

#### Step 3: Capital Selection
- [ ] Four capital quick reply buttons appear ($1000, $5000, $10000, Custom)
- [ ] Clicking "$5000" adds user message
- [ ] AI typing indicator appears
- [ ] AI responds with strategy recommendations
- [ ] Preview updates with capital ($5,000 USDT)
- [ ] Progress indicator shows Step 3 complete

**Custom Capital:**
- [ ] Clicking "Custom" prompts for text input
- [ ] AI asks "Please enter your custom amount"
- [ ] User can type amount in input field
- [ ] Entering valid number (e.g., 7500) proceeds to strategies
- [ ] Entering invalid input shows error message

#### Step 4: Strategy Selection
- [ ] Four strategy template cards appear
- [ ] Each card shows: icon, name, description, pros, risk badge
- [ ] Cards are clickable
- [ ] Clicking "DCA" adds user message
- [ ] AI typing indicator appears
- [ ] AI shows final summary with all configuration
- [ ] Preview updates with strategy (DCA icon + name)
- [ ] Mini performance chart appears
- [ ] Confidence builder section appears
- [ ] Progress indicator shows Step 4 complete

#### Step 5: Final Review
- [ ] Final summary message displays
- [ ] Shows: Strategy, Trading Pair, Capital, Risk, Mode
- [ ] "Create Bot" quick reply button appears
- [ ] "Make Changes" button appears
- [ ] Clicking "Create Bot" triggers creation
- [ ] Success toast notification appears
- [ ] Redirects to dashboard after 1.5 seconds

### Bot Preview
- [ ] Empty state shows initially
- [ ] Progress indicator shows 5 steps
- [ ] Goal updates in real-time
- [ ] Risk level updates with correct color
- [ ] Capital updates with formatting
- [ ] Strategy updates with icon
- [ ] Paper Trading badge appears
- [ ] Risk gauge animates smoothly
- [ ] Mini chart renders (Recharts)
- [ ] Estimated return calculates correctly
- [ ] Confidence points list all benefits
- [ ] "Configuration Complete" badge appears at end

### Chat Scrolling
- [ ] Chat auto-scrolls to latest message
- [ ] Scroll is smooth (not jumpy)
- [ ] User can manually scroll up
- [ ] Auto-scroll resumes on new message
- [ ] Typing indicator is always visible at bottom

### Input Field
- [ ] Text input visible at bottom
- [ ] Placeholder text: "Type your message..."
- [ ] Send button appears
- [ ] Send button disabled when input empty
- [ ] Enter key sends message
- [ ] Input disabled while AI typing
- [ ] Helper text: "Press Enter to send..."

### Mobile Responsiveness
- [ ] Layout stacks: chat on top, preview on bottom
- [ ] Both sections have minimum heights
- [ ] Chat input always accessible
- [ ] Strategy cards scroll horizontally
- [ ] Quick reply buttons scroll horizontally
- [ ] Preview grid adapts to single column
- [ ] All text remains readable
- [ ] Touch targets at least 44x44px

### Back Navigation
- [ ] Back button visible
- [ ] Clicking back returns to mode selection
- [ ] Confirmation prompt if conversation in progress (optional)
- [ ] No data loss warning (optional)

### Error Handling
- [ ] Network error shows toast notification
- [ ] Invalid input shows inline error
- [ ] API failure shows retry option
- [ ] Graceful fallback if AI response fails

### Performance
- [ ] Initial load < 3 seconds
- [ ] Message send < 1 second
- [ ] AI response delay intentional (1 second)
- [ ] Animations smooth (60fps)
- [ ] No memory leaks (check DevTools)

---

## Pro Mode (`/bots/create/pro`)

### Initial Load
- [ ] Page loads without errors
- [ ] Header with title and "Advanced" badge
- [ ] Back button to mode selection
- [ ] Progress card with percentage (0%)
- [ ] Progress bar at 0%
- [ ] Tab list with 5 tabs
- [ ] Strategy tab is active by default
- [ ] All tabs are clickable

### Progress Tracking
- [ ] Progress updates as fields filled
- [ ] Progress badges show completion status
- [ ] Green checkmark on completed tabs
- [ ] Tab completion badge displays
- [ ] Progress bar animates smoothly

### Tab 1: Strategy
#### Template Cards
- [ ] Four strategy cards display
- [ ] Each card shows: icon, name, description
- [ ] Best for, risk level, pros list visible
- [ ] Clicking card selects it (highlighted)
- [ ] Only one can be selected at a time
- [ ] Selection persists when switching tabs

#### DCA Parameters
- [ ] Buy interval dropdown (Daily, Weekly, Monthly)
- [ ] Amount per buy input (number)
- [ ] Start date picker
- [ ] Default values populated
- [ ] Validation on invalid input

#### Grid Trading Parameters
- [ ] Grid levels slider (5-50)
- [ ] Price range inputs (min/max)
- [ ] Profit per grid percentage
- [ ] Grid visualization (optional)

#### Momentum Parameters
- [ ] Momentum period slider
- [ ] Entry threshold slider
- [ ] Exit threshold slider
- [ ] Indicator selection (RSI, MACD, etc.)

#### Mean Reversion Parameters
- [ ] Deviation threshold slider
- [ ] Holding period input
- [ ] Mean calculation method dropdown

### Tab 2: Risk
#### Risk Sliders
- [ ] Stop Loss slider (1-50%)
- [ ] Take Profit slider (1-100%)
- [ ] Max Drawdown slider (1-50%)
- [ ] Position Size slider (1-100%)
- [ ] Max Daily Loss input ($)

#### Real-time Calculations
- [ ] Stop loss $ amount calculates
- [ ] Take profit $ amount calculates
- [ ] Risk level auto-detects (Low/Med/High)
- [ ] Risk gauge updates
- [ ] Impact preview shows potential P&L

#### Visual Indicators
- [ ] Risk gauge displays (green/yellow/red)
- [ ] Recommended range indicators
- [ ] Warning messages for high risk
- [ ] Safety check validations

### Tab 3: Technical
#### Trading Pair
- [ ] Trading pair dropdown (BTC/USDT, ETH/USDT, etc.)
- [ ] Current price displays
- [ ] 24h change percentage
- [ ] Pair info updates on selection

#### Exchange
- [ ] Exchange selector (Binance for now)
- [ ] Exchange logo/icon
- [ ] Trading fees info

#### Trading Mode
- [ ] Toggle: Paper / Live
- [ ] Paper mode selected by default
- [ ] Warning for live mode (optional)
- [ ] Capital input for paper mode

#### Advanced Options
- [ ] Leverage slider (1-10x) - Phase 3
- [ ] Order type radio (Market/Limit)
- [ ] Retry settings checkbox
- [ ] Timeout configuration

### Tab 4: Backtest
#### Configuration
- [ ] Date range picker (start/end)
- [ ] Timeframe selector (1h, 4h, 1d)
- [ ] Run Backtest button
- [ ] Loading state when running

#### Results Display
- [ ] Performance chart (equity curve)
- [ ] Metrics cards:
  - [ ] Total Return %
  - [ ] Win Rate %
  - [ ] Sharpe Ratio
  - [ ] Max Drawdown %
  - [ ] Number of Trades
  - [ ] Profit Factor
- [ ] Trade history table
- [ ] Export buttons (CSV, JSON)

#### Chart Interactions
- [ ] Hover tooltip shows data
- [ ] Zoom controls work
- [ ] Pan controls work (optional)
- [ ] Legend toggle works

### Tab 5: Review
#### Summary Sections
- [ ] Bot Information section
  - [ ] Name input field
  - [ ] Description textarea
  - [ ] Edit button
- [ ] Strategy section
  - [ ] Strategy type display
  - [ ] Parameters summary
  - [ ] Edit button (jumps to Strategy tab)
- [ ] Risk Management section
  - [ ] All risk settings listed
  - [ ] Edit button (jumps to Risk tab)
- [ ] Technical Setup section
  - [ ] Trading pair, exchange, mode
  - [ ] Edit button (jumps to Technical tab)
- [ ] Capital section
  - [ ] Amount display
  - [ ] Paper/Live mode badge

#### Validation
- [ ] Red warnings for missing required fields
- [ ] Create button disabled if incomplete
- [ ] Inline error messages
- [ ] Summary of errors at top

#### Submission
- [ ] Create Bot button enabled when complete
- [ ] Loading spinner during submission
- [ ] Success toast notification
- [ ] Success celebration modal appears
- [ ] Error toast on failure with message

### Tab Navigation
#### Keyboard Navigation
- [ ] Left/Right arrows navigate tabs
- [ ] Tab key focuses next tab
- [ ] Enter/Space activates tab

#### Mouse Navigation
- [ ] Clicking tab switches view
- [ ] Active tab highlighted
- [ ] Previous/Next buttons work
- [ ] Previous disabled on first tab
- [ ] Next disabled on last tab

### Form Persistence
- [ ] Data persists when switching tabs
- [ ] Refreshing page shows warning (optional)
- [ ] No data loss during navigation
- [ ] Back button warns of unsaved changes

### Mobile Responsiveness
- [ ] Tabs scroll horizontally
- [ ] Active tab stays visible
- [ ] Form inputs stack vertically
- [ ] Sliders work with touch
- [ ] Dropdowns accessible
- [ ] Date pickers mobile-friendly
- [ ] Charts resize responsively
- [ ] Navigation buttons full-width

### Error Handling
- [ ] Form validation messages
- [ ] Network error toast
- [ ] API error with retry option
- [ ] Backtest failure handled gracefully
- [ ] Missing data warnings

### Performance
- [ ] Tab switching instant (< 100ms)
- [ ] Form updates reactive
- [ ] Charts render smoothly
- [ ] No lag when typing
- [ ] Build time acceptable

---

## Success Celebration Modal

### Trigger
- [ ] Appears after bot creation (Simple or Pro)
- [ ] Overlay backdrop visible
- [ ] Click outside closes modal (optional)
- [ ] ESC key closes modal

### Animations
- [ ] Confetti animation plays immediately
- [ ] Confetti lasts ~4 seconds
- [ ] Modal scales in with spring animation
- [ ] Success checkmark spins in
- [ ] Sequential checkmarks animate (4 steps)
- [ ] Each checkmark appears after 200ms delay

### Content
- [ ] Large green checkmark icon
- [ ] "Bot Created Successfully!" title
- [ ] Description text
- [ ] Bot summary card:
  - [ ] Strategy icon
  - [ ] Bot name
  - [ ] Strategy label
  - [ ] Paper Trading badge
  - [ ] Strategy type
  - [ ] Risk level badge
  - [ ] Capital amount
- [ ] Four sequential checkmarks:
  1. Bot Created Successfully
  2. Risk Configuration Applied
  3. Paper Trading Activated
  4. Ready to Start Trading
- [ ] AI Insight box with message
- [ ] Three CTA buttons

### Buttons
- [ ] "Start Paper Trading" button (primary)
  - [ ] Click navigates to bot details page
  - [ ] Arrow icon animates on hover
- [ ] "View Dashboard" button (outline)
  - [ ] Click navigates to dashboard
- [ ] "Create Another" button (ghost)
  - [ ] Click refreshes page to create new bot

### Mobile Responsiveness
- [ ] Modal scales to fit mobile screen
- [ ] All content readable
- [ ] Buttons stack vertically if needed
- [ ] Confetti works on mobile
- [ ] Touch-friendly button sizes

### Accessibility
- [ ] Focus trapped in modal
- [ ] First button receives focus
- [ ] Tab cycles through buttons
- [ ] ESC closes modal
- [ ] Screen reader announces success

---

## Cross-Browser Testing

### Chrome (Desktop)
- [ ] All features work
- [ ] Animations smooth
- [ ] Charts render correctly
- [ ] No console errors

### Firefox (Desktop)
- [ ] All features work
- [ ] Animations smooth
- [ ] Charts render correctly
- [ ] No console errors

### Safari (Desktop)
- [ ] All features work
- [ ] Animations smooth
- [ ] Charts render correctly
- [ ] No console errors

### Edge (Desktop)
- [ ] All features work
- [ ] Animations smooth
- [ ] Charts render correctly
- [ ] No console errors

### Chrome Mobile (Android)
- [ ] Responsive layout works
- [ ] Touch interactions work
- [ ] Scrolling smooth
- [ ] Forms accessible

### Safari Mobile (iOS)
- [ ] Responsive layout works
- [ ] Touch interactions work
- [ ] Scrolling smooth
- [ ] Forms accessible

---

## Dark Mode Testing

### All Pages
- [ ] Toggle dark mode (system/manual)
- [ ] All text readable (sufficient contrast)
- [ ] Borders visible
- [ ] Backgrounds appropriate
- [ ] Charts adapt colors
- [ ] Icons visible
- [ ] Hover states work
- [ ] Focus states visible
- [ ] No white flashes on load

---

## Performance Testing

### Lighthouse (Chrome DevTools)
- [ ] Performance score > 90
- [ ] Accessibility score = 100
- [ ] Best Practices score > 95
- [ ] SEO score > 90

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

### Network Throttling
- [ ] Test on "Fast 3G"
- [ ] Test on "Slow 3G"
- [ ] Loading states appear
- [ ] Graceful degradation
- [ ] No layout shift

### Memory Profiling
- [ ] Take heap snapshot before
- [ ] Navigate through flow
- [ ] Take heap snapshot after
- [ ] Check for memory leaks
- [ ] Detached DOM nodes < 100

---

## Accessibility Testing

### Screen Reader (NVDA/JAWS/VoiceOver)
- [ ] Page structure announced
- [ ] Headings announced correctly
- [ ] Buttons announced with role
- [ ] Form labels announced
- [ ] Validation errors announced
- [ ] Loading states announced
- [ ] Success messages announced

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Tab order logical
- [ ] No keyboard traps
- [ ] Skip to content link works
- [ ] Modal focus trapped
- [ ] Focus returns after modal close

### Color Contrast
- [ ] Use axe DevTools to check
- [ ] All text meets WCAG AA (4.5:1)
- [ ] Large text meets WCAG AA (3:1)
- [ ] Icons have sufficient contrast
- [ ] Focus indicators visible

### ARIA
- [ ] Buttons have aria-label
- [ ] Inputs have aria-describedby
- [ ] Loading states have aria-live
- [ ] Modals have aria-modal
- [ ] Tabs have aria-selected

---

## Error Scenarios

### Network Failures
- [ ] Disconnect internet during bot creation
- [ ] Error toast appears
- [ ] Retry button works
- [ ] Data not lost
- [ ] Graceful recovery

### API Errors
- [ ] 500 Internal Server Error
- [ ] 400 Bad Request
- [ ] 401 Unauthorized
- [ ] 429 Rate Limited
- [ ] Timeout

### Validation Errors
- [ ] Empty required fields
- [ ] Invalid number inputs
- [ ] Out of range values
- [ ] Negative numbers
- [ ] Special characters

### Edge Cases
- [ ] Very large capital ($1,000,000+)
- [ ] Very small capital ($10)
- [ ] Extreme risk settings (50% stop loss)
- [ ] Special characters in bot name
- [ ] Very long bot description (>1000 chars)

---

## Integration Testing

### Authentication Flow
- [ ] Create bot while logged in
- [ ] Session expires during creation
- [ ] Redirect to login if not authenticated
- [ ] Return to creation after login

### Database
- [ ] Bot saved to database
- [ ] All fields saved correctly
- [ ] Timestamps set correctly
- [ ] User ID associated
- [ ] RLS policies enforced

### Navigation
- [ ] Back button works
- [ ] Browser back button works
- [ ] Forward button works
- [ ] Deep linking works (/bots/create/simple)
- [ ] 404 page for invalid routes

---

## Regression Testing

### After Each Change
- [ ] No existing functionality broken
- [ ] TypeScript compiles
- [ ] Build succeeds
- [ ] No new console errors
- [ ] Tests still pass

---

## Pre-Production Checklist

### Code Quality
- [ ] TypeScript errors: 0
- [ ] ESLint warnings: 0
- [ ] Console errors: 0
- [ ] Console warnings: 0
- [ ] Dead code removed
- [ ] Comments added where needed

### Performance
- [ ] Bundle size acceptable
- [ ] Code splitting implemented
- [ ] Lazy loading where appropriate
- [ ] Images optimized
- [ ] Fonts optimized

### Security
- [ ] No API keys in client code
- [ ] Input sanitization
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting (API level)

### Documentation
- [ ] Component README complete
- [ ] API documentation updated
- [ ] User documentation updated
- [ ] CHANGELOG updated

### Monitoring
- [ ] Error tracking setup (Sentry)
- [ ] Analytics tracking (GA4)
- [ ] Performance monitoring
- [ ] User behavior tracking

---

## Sign-Off

### Developers
- [ ] Code reviewed
- [ ] Tests written
- [ ] Documentation complete
- [ ] Demo recorded

### QA Team
- [ ] Manual testing complete
- [ ] Automation tests pass
- [ ] No blockers
- [ ] Known issues documented

### Product Manager
- [ ] Acceptance criteria met
- [ ] User stories complete
- [ ] No critical bugs
- [ ] Ready for production

### Designer
- [ ] Visual design matches
- [ ] Interactions smooth
- [ ] Mobile design approved
- [ ] Dark mode approved

---

## Post-Deployment

### Smoke Test
- [ ] Production URL accessible
- [ ] All pages load
- [ ] Bot creation works end-to-end
- [ ] No console errors

### Monitoring
- [ ] Error rate < 1%
- [ ] Response times acceptable
- [ ] No memory leaks
- [ ] User feedback positive

---

## Testing Notes

**Date Tested:** ___________

**Tester Name:** ___________

**Environment:** Production / Staging / Development

**Browser/Device:** ___________

**Issues Found:**
1. ___________
2. ___________
3. ___________

**Blockers:**
- [ ] None
- [ ] Critical bug found
- [ ] Performance issue
- [ ] Accessibility issue
- [ ] Other: ___________

**Overall Status:** Pass / Fail / Conditional Pass

**Notes:**
___________________________________________
___________________________________________
___________________________________________

---

**Generated:** 2025-11-13
**Version:** 1.0.0
**Total Checklist Items:** 500+

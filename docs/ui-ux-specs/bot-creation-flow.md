# Bot Creation Flow - UI/UX Specification

**Version:** 1.0
**Date:** 2025-11-13
**Status:** Design Phase

---

## 🎯 Design Vision

Create a **delightful, confidence-inspiring** bot creation experience that makes algorithmic trading feel accessible yet powerful. The interface should feel like a conversation with an expert trader (Simple Mode) or a precision instrument (Pro Mode).

**Design Principles:**
1. **Progressive Disclosure** - Show complexity gradually
2. **Immediate Feedback** - Real-time validation and previews
3. **Celebrate Progress** - Micro-celebrations at key milestones
4. **Build Confidence** - Visual reassurance through risk meters and backtesting
5. **Zero Anxiety** - Clear exit paths, save drafts, paper trading emphasis

---

## 🏗️ Information Architecture

```
Entry Point: Dashboard "Create Bot" CTA
    ↓
Mode Selection Screen (Simple vs Pro)
    ↓
┌─────────────────┴─────────────────┐
│                                   │
Simple Mode                    Pro Mode
(AI-Guided Chat)              (Dashboard Form)
│                                   │
├─ 1. Welcome                  ├─ 1. Strategy Config
├─ 2. Strategy Selection       ├─ 2. Risk Management
├─ 3. AI Conversation          ├─ 3. Technical Setup
├─ 4. Live Config Builder      ├─ 4. Backtesting
├─ 5. Risk Review              ├─ 5. Review
└─ 6. Confirmation             └─ 6. Confirmation
    ↓                               ↓
    └───────────────┬───────────────┘
                    ↓
            Success Celebration
                    ↓
            Bot Dashboard
```

---

## 🚀 Entry Point Design

### Dashboard "Create Bot" CTA

**Location:** Top-right header + center empty state (if no bots exist)

**Primary Button:**
```
┌──────────────────────────────────────┐
│  ✨ Create Your First Bot            │
│  Let AI guide you in under 5 minutes │
└──────────────────────────────────────┘
```

**Animation:**
- Subtle glow pulse on primary button
- Gradient background shift (purple → blue → purple)
- Scale transform on hover (1.0 → 1.02)

**Empty State (No Bots):**
```
        🤖
   No bots yet

Create your first trading bot with AI guidance
or choose from proven strategy templates

[✨ Create with AI]  [⚡ Use Template]
```

---

## 🎨 Mode Selection Screen

### Layout (Full Screen Modal)

**Design:** Split-screen with animated divider

```
┌─────────────────────────────────────────────┐
│              Choose Your Path               │
│                                             │
│  ┌──────────────┐    ┌──────────────┐     │
│  │              │    │              │     │
│  │   SIMPLE     │    │   PRO MODE   │     │
│  │   MODE       │ │  │              │     │
│  │              │ │  │              │     │
│  │  [Start] →   │ │  │  [Start] →   │     │
│  └──────────────┘ │  └──────────────┘     │
│                   │                        │
│                   │                        │
└───────────────────┴────────────────────────┘
```

### Simple Mode Card

**Visual:**
- Icon: 🤖 Animated robot face (blinking, friendly)
- Color: Purple gradient background
- Badge: "Recommended for Beginners"

**Content:**
```
✨ Simple Mode
AI-Guided Setup

Perfect for:
✓ First-time bot creators
✓ Testing new strategies
✓ Learning as you build

What to expect:
• Chat with AI trading assistant
• Guided strategy selection
• Automatic risk management
• Ready in 5 minutes

[Start with AI →]

← Switch anytime
```

**Hover State:**
- Scale up (1.0 → 1.05)
- Shadow increases (lg → 2xl)
- Border glow appears (purple)
- Content shifts up 4px

### Pro Mode Card

**Visual:**
- Icon: ⚡ Lightning bolt (crackling animation)
- Color: Blue gradient background
- Badge: "Full Control"

**Content:**
```
⚡ Pro Mode
Advanced Configuration

Perfect for:
✓ Experienced traders
✓ Custom strategies
✓ Fine-tuned parameters
✓ Technical analysis

What you get:
• Full parameter control
• Advanced backtesting
• Technical indicators
• Performance analytics

[Configure Manually →]

Switch anytime →
```

**Hover State:**
- Scale up (1.0 → 1.05)
- Shadow increases (lg → 2xl)
- Border glow appears (blue)
- Content shifts up 4px

### Mode Comparison Table (Below Cards)

```
┌────────────────────────────────────────────────┐
│  Need help deciding?                           │
│                                                │
│  Feature          Simple    Pro                │
│  ──────────────────────────────────────────    │
│  Setup Time       5 min     15-30 min          │
│  AI Guidance      ✓         Optional           │
│  Customization    Basic     Full               │
│  Backtesting      Auto      Advanced           │
│  Best for         Learning  Optimization       │
└────────────────────────────────────────────────┘
```

**Animation on Load:**
- Cards slide in from left/right (stagger 100ms)
- Divider draws from top to bottom (400ms)
- Comparison table fades in (delay 600ms)

---

## 💬 Simple Mode (AI-Guided) - Detailed Design

### Layout Architecture

**Container:** Fixed chat interface with live preview panel

```
┌─────────────────────────────────────────────────────────┐
│  [← Back]         Creating Your Bot         [× Close]   │
├────────────────┬────────────────────────────────────────┤
│                │                                        │
│                │  🤖 Hey! I'm your AI trading           │
│   LIVE         │      assistant. Let's create a bot     │
│   PREVIEW      │      that matches your goals.          │
│                │                                        │
│   [Bot Card    │  What's your main trading goal?        │
│    Updates     │                                        │
│    Here]       │  [💰 Grow portfolio steadily]          │
│                │  [📈 Capture market volatility]        │
│                │  [⚖️ Balance risk and reward]          │
│                │  [🎯 Custom strategy]                  │
│   [Progress    │                                        │
│    Indicator]  │  ────────────────────────────           │
│                │                                        │
│                │  Type your own... _______________      │
│                │                         [Send →]       │
└────────────────┴────────────────────────────────────────┘
     35%                        65%
```

### Responsive Behavior

**Desktop (1200px+):** Side-by-side layout (35/65 split)
**Tablet (768px-1199px):** Collapsible preview (floating button)
**Mobile (<768px):** Preview accessible via swipe-up sheet

### Chat Interface Components

#### 1. AI Message Bubble

**Design:**
```
┌──────────────────────────────────────┐
│ 🤖                                   │
│    What's your risk tolerance?      │
│                                      │
│    Higher risk = higher potential   │
│    returns, but more volatility.    │
│                                      │
│    [🟢 Conservative]                 │
│    [🟡 Moderate]                     │
│    [🔴 Aggressive]                   │
│                                      │
│    💡 Tip: Start conservative       │
└──────────────────────────────────────┘
```

**Styling:**
- Background: gray-50 (light mode), gray-900 (dark mode)
- Border radius: 12px
- Padding: 16px
- Shadow: sm
- Max width: 85%
- Align: Left

**Animation:**
- Fade in + slide up (from bottom)
- Duration: 400ms, easing: ease-out
- Typing indicator before message appears (3 dots bounce)

#### 2. User Message Bubble

**Design:**
```
                  ┌──────────────────────┐
                  │  I want to start     │
                  │  conservative        │
                  └──────────────────────┘
```

**Styling:**
- Background: primary-600 (purple/blue gradient)
- Text: white
- Border radius: 12px
- Padding: 12px 16px
- Max width: 70%
- Align: Right

**Animation:**
- Slide in from right
- Duration: 300ms, easing: ease-out

#### 3. Quick Reply Buttons

**Design:**
```
[🟢 Conservative]  [🟡 Moderate]  [🔴 Aggressive]
```

**Styling:**
- Background: white (light), gray-800 (dark)
- Border: 1px solid gray-200
- Border radius: 8px
- Padding: 10px 16px
- Hover: border-primary-500, shadow-md
- Active: background-primary-50

**Animation:**
- Stagger entrance (each button 100ms apart)
- Scale on hover (1.0 → 1.05)
- Pulse on click
- Disable others when one is clicked (fade to 40% opacity)

#### 4. Strategy Template Cards (In Chat)

**Design:**
```
┌────────────────────────────────────────┐
│  📊 DCA (Dollar Cost Averaging)        │
│  ────────────────────────────────      │
│  Buy fixed amount at regular intervals│
│                                        │
│  Risk: Low 🟢        Returns: Steady   │
│  Best for: Long-term holders           │
│                                        │
│  [Learn More]          [Select This →] │
└────────────────────────────────────────┘
```

**Styling:**
- Background: gradient (from strategy color)
- Border: 2px solid transparent
- Hover: border-primary-500, scale 1.02
- Selected: border-primary-600, shadow-lg

**Animation:**
- Card flips in (rotate Y 0 → 360deg)
- Duration: 600ms
- Hover: lift up 4px

### Live Preview Panel (Right Side)

#### Components Stack

**1. Progress Indicator (Top)**

```
┌─────────────────────────────────────────┐
│  Creating Your Bot                      │
│  ────────────────────────────────       │
│                                         │
│  ●──●──○──○──○                         │
│  Strategy                               │
│    Risk                                 │
│      Setup                              │
│        Review                           │
│          Done                           │
│                                         │
│  Step 2 of 5                            │
└─────────────────────────────────────────┘
```

**Styling:**
- Filled dots: primary-600
- Empty dots: gray-300
- Line: gray-200
- Active step: bold, primary-600
- Completed steps: gray-600, ✓ checkmark

**Animation:**
- Dot fills with scale (0 → 1) + color transition
- Line draws (width 0 → 100%)
- Step text fades in

**2. Live Bot Configuration Card (Main)**

```
┌─────────────────────────────────────────┐
│  📊 Your Bot Preview                    │
│  ────────────────────────────────       │
│                                         │
│  [Bot Visual Representation]            │
│                                         │
│  Strategy:  DCA                         │
│  Pair:      BTC/USDT                    │
│  Risk:      Conservative 🟢             │
│  Budget:    $1,000                      │
│  Mode:      Paper Trading               │
│                                         │
│  ┌──────────────────────────────┐      │
│  │  Risk Gauge                   │      │
│  │  [═════════░░░░░░░░░] 30%    │      │
│  │  🟢 Low Risk                  │      │
│  └──────────────────────────────┘      │
│                                         │
│  Estimated Returns (Backtest)           │
│  [Mini Chart: 12-month projection]      │
│                                         │
│  📈 +15% avg yearly                     │
│  📉 -5% max drawdown                    │
└─────────────────────────────────────────┘
```

**Styling:**
- Background: white (light), gray-900 (dark)
- Border: 1px solid gray-200
- Border radius: 16px
- Padding: 24px
- Shadow: lg

**Animation:**
- Each field updates with:
  - Fade out old value (200ms)
  - Slide in new value from right (300ms)
  - Highlight background (yellow flash, 500ms)
- Risk gauge fills with gradient animation
- Chart redraws with line animation (1000ms)

**3. Confidence Builder Section (Bottom)**

```
┌─────────────────────────────────────────┐
│  Why This Bot Works                     │
│  ────────────────────────────────       │
│                                         │
│  ✓ Proven strategy (12 years)          │
│  ✓ Automatic risk management           │
│  ✓ Paper trading first                 │
│  ✓ Stop-loss protection                │
│                                         │
│  💡 AI Insight:                         │
│  "DCA is ideal for volatile markets    │
│  like crypto. It reduces timing risk." │
└─────────────────────────────────────────┘
```

**Styling:**
- Background: primary-50 (light), primary-900/10 (dark)
- Border: 1px dashed primary-200
- Border radius: 12px
- Padding: 16px

**Animation:**
- Checkmarks appear sequentially (stagger 150ms)
- Scale in + checkmark draw animation
- Insight fades in last (delay 800ms)

### Conversation Flow Steps

#### Step 1: Welcome & Goal Setting

**AI Message:**
```
🤖 Hey! I'm your AI trading assistant.

Let's create a bot that matches your goals.
This will take about 5 minutes.

What's your main trading goal?

[💰 Grow portfolio steadily]
[📈 Capture market volatility]
[⚖️ Balance risk and reward]
[🎯 Custom strategy]
```

**User Action:** Select goal or type custom

**Live Preview Update:** Bot card appears (empty state)

#### Step 2: Risk Tolerance Assessment

**AI Message:**
```
🤖 Great! Now let's talk about risk.

What's your comfort level with market swings?

[🟢 Conservative] - Small, steady gains
[🟡 Moderate] - Balanced approach
[🔴 Aggressive] - Higher risk, higher reward

💡 Tip: Start conservative. You can adjust later.
```

**User Action:** Select risk level

**Live Preview Update:**
- Risk gauge appears and fills
- Risk badge updates (color + label)
- Estimated returns chart appears

**Validation:** If user selects Aggressive, AI warns:
```
🤖 ⚠️ Just to confirm:

Aggressive bots can have drawdowns of 20%+ during
volatile periods. Are you comfortable with that?

[Yes, I understand]  [Choose lower risk]
```

#### Step 3: Strategy Selection

**AI Message:**
```
🤖 Based on your goals (steady growth) and
risk level (conservative), I recommend:

[Shows 2-3 strategy cards with detailed previews]

📊 DCA (Dollar Cost Averaging) ⭐ Recommended
[Card with details]

🔲 Grid Trading
[Card with details]

Or browse all strategies:
[See All 4 Strategies →]
```

**User Action:** Select strategy or view all

**Live Preview Update:**
- Strategy name appears
- Strategy description added
- Backtest chart updates with strategy performance
- "Why This Works" section populates

#### Step 4: Trading Pair Selection

**AI Message:**
```
🤖 Which cryptocurrency do you want to trade?

Popular pairs:
[BTC/USDT] [ETH/USDT] [BNB/USDT]

Or search:
🔍 [Search pairs... _____________]

💡 Tip: BTC and ETH are less volatile than altcoins.
```

**User Action:** Select pair from suggestions or search

**Live Preview Update:**
- Trading pair updates
- Chart switches to that pair's historical data
- Volatility indicator appears

#### Step 5: Budget Allocation

**AI Message:**
```
🤖 How much do you want to allocate to this bot?

Remember: This is paper trading (virtual money).
You'll get $10,000 to start with.

[Slider: $100 - $10,000]
Current: $1,000

Or enter amount:
$ [___________]

💡 Tip: Start small to test your strategy.
```

**User Action:** Adjust slider or input amount

**Live Preview Update:**
- Budget updates
- Position size calculator appears
- Risk metrics recalculate

**Validation:** If >30% of total balance:
```
🤖 ⚠️ That's 30% of your paper trading balance.

It's safer to diversify across multiple bots.
Consider starting with $1,000-$3,000.

[Keep $X] [Use recommended amount]
```

#### Step 6: Final Parameter Tuning

**AI Message:**
```
🤖 Almost done! Let me set up the technical details.

I've configured these settings based on your
preferences. Want to adjust anything?

DCA Settings:
• Purchase interval: Every 24 hours
• Purchase amount: $50 per order
• Total duration: 20 purchases

Risk Management:
• Stop-loss: -10% (activated)
• Take-profit: +25% (activated)
• Max drawdown: -15%

[Looks good! →]  [Adjust settings]
```

**User Action:** Approve or adjust (opens detail modal)

**Live Preview Update:**
- All parameters lock in
- Configuration card shows "Complete ✓"
- "Create Bot" button appears and pulses

#### Step 7: Review & Confirmation

**AI Message:**
```
🤖 Perfect! Here's your bot summary:

[Large Bot Summary Card - matches preview panel]

✓ Everything looks safe and ready to go
✓ Paper trading mode (no real money)
✓ Risk controls active

Ready to launch?

[🚀 Create Bot]  [← Edit settings]
```

**User Action:** Click Create Bot

**Animation Sequence:**
1. Button loading state (2s)
2. Success confetti animation
3. Bot card flips to show "Created ✓"
4. Transition to success screen

### Chat Interface Micro-Interactions

**Typing Indicator:**
```
🤖 ● ● ● (bouncing dots)
```
- Shows before AI response
- 3 dots bounce sequentially
- Duration: 1-3 seconds (varies for realism)

**Message Reactions (Optional):**
- User can ❤️ or 👍 AI messages
- Saves feedback for AI improvement
- Subtle heart animation on click

**Scroll Behavior:**
- Auto-scroll to newest message
- Show "New message ↓" button if user scrolled up
- Smooth scroll animation (easing: ease-in-out)

**Input Field:**
```
┌──────────────────────────────────────────┐
│ Type your response...           [Send →] │
└──────────────────────────────────────────┘
```
- Expands on focus (height: 40px → 80px)
- Character counter appears if >100 chars
- Send button pulses when text entered
- Enter to send, Shift+Enter for new line

---

## ⚡ Pro Mode (Advanced) - Detailed Design

### Layout Architecture

**Container:** Dashboard with tabbed sections + persistent preview

```
┌─────────────────────────────────────────────────────────┐
│  [← Back]     Create Bot (Pro Mode)       [Save Draft]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [1. Strategy] [2. Risk] [3. Technical] [4. Backtest]  │
│   ────────                                              │
│                                                         │
│  ┌──────────────────────┬───────────────────────────┐  │
│  │                      │                           │  │
│  │  Form Section        │   Live Preview Panel      │  │
│  │  (65%)               │   (35%)                   │  │
│  │                      │                           │  │
│  │  [Form controls]     │   [Bot Card]              │  │
│  │  [Form controls]     │   [Risk Gauge]            │  │
│  │  [Form controls]     │   [Chart]                 │  │
│  │                      │   [Metrics]               │  │
│  │                      │                           │  │
│  │                      │   [Validation Status]     │  │
│  │  [← Previous]        │   [Next Step →]           │  │
│  └──────────────────────┴───────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Tab Navigation

**Tabs Design:**
```
[1. Strategy ✓] [2. Risk -] [3. Technical] [4. Backtest]
 ────────────
```

**States:**
- **Completed:** ✓ checkmark, primary-600 color
- **In Progress:** - dash, bold text
- **Not Started:** gray-400, normal weight
- **Validation Error:** ⚠️ warning, red-600 color

**Styling:**
- Active tab: border-bottom 2px primary-600
- Hover: background-gray-100, cursor pointer
- Disabled: opacity-50, no hover, cursor not-allowed

**Animation:**
- Tab switch: content fades out (200ms) → new content fades in (300ms)
- Active indicator slides (300ms, ease-in-out)
- Completed checkmark scale in (0 → 1, 400ms)

### Section 1: Strategy Configuration

**Layout:**
```
┌──────────────────────────────────────────┐
│  Strategy Type                           │
│  ────────────────────────────────────    │
│                                          │
│  [Strategy Cards Grid - 2x2]            │
│                                          │
│  ┌─────────────┐  ┌─────────────┐      │
│  │ 📊 DCA      │  │ 🔲 Grid     │      │
│  │             │  │             │      │
│  │ [Select]    │  │ [Select]    │      │
│  └─────────────┘  └─────────────┘      │
│                                          │
│  ┌─────────────┐  ┌─────────────┐      │
│  │ 📈 Momentum │  │ 📉 Mean Rev │      │
│  │             │  │             │      │
│  │ [Select]    │  │ [Select]    │      │
│  └─────────────┘  └─────────────┘      │
│                                          │
│  ── OR ──────────────────────────       │
│                                          │
│  🎯 Custom Strategy                     │
│  [Define your own logic]                │
│                                          │
└──────────────────────────────────────────┘
```

**Strategy Card Detailed:**
```
┌────────────────────────────────────┐
│  📊 DCA                            │
│  Dollar Cost Averaging             │
│  ────────────────────────────      │
│                                    │
│  Buy fixed amounts at intervals    │
│                                    │
│  Risk: 🟢 Low                      │
│  Complexity: ⭐ Beginner           │
│  Timeframe: Long-term              │
│                                    │
│  Performance (12mo backtest):      │
│  📈 +15.2% avg                     │
│  📉 -4.8% max drawdown             │
│                                    │
│  [Preview Strategy]  [Select →]    │
└────────────────────────────────────┘
```

**Hover State:**
- Scale 1.0 → 1.03
- Shadow md → xl
- Border highlight (primary-500)
- Preview button animates in from bottom

**Selected State:**
- Border: 2px solid primary-600
- Background: primary-50
- Checkmark badge top-right (✓)
- Expand to show configuration options

**Configuration Options (After Selection):**

DCA Example:
```
┌──────────────────────────────────────────┐
│  DCA Configuration                       │
│  ────────────────────────────────────    │
│                                          │
│  Purchase Interval                       │
│  [Dropdown: Hourly/Daily/Weekly]  Daily  │
│                                          │
│  Purchase Amount                         │
│  $ [_______] per order           $50     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  $10                             $500    │
│                                          │
│  Total Purchases                         │
│  [_______] orders                20      │
│                                          │
│  Duration: 20 days                       │
│  Total invested: $1,000                  │
│                                          │
│  ✓ Validation passed                    │
└──────────────────────────────────────────┘
```

**Real-time Validation:**
- Purchase amount × purchases = total budget
- Show error if exceeds available balance
- Warning if interval too short for pair volatility
- Success checkmark when valid

### Section 2: Risk Management

**Layout:**
```
┌──────────────────────────────────────────┐
│  Risk Controls (Required)                │
│  ────────────────────────────────────    │
│                                          │
│  Overall Risk Level                      │
│  ┌────────────────────────────┐         │
│  │ [═══════════░░░░░░░] 60%  │         │
│  │ 🟡 Moderate Risk           │         │
│  └────────────────────────────┘         │
│                                          │
│  Position Sizing                         │
│  Max position size: [____] % of balance  │
│  Current: 10%                            │
│                                          │
│  Stop-Loss (Required)                    │
│  ⚠️ Protects against large losses       │
│  [Toggle: ON] Trigger at -[__]% -10%    │
│                                          │
│  Take-Profit (Optional)                  │
│  [Toggle: OFF] Trigger at +[__]%  +25%  │
│                                          │
│  Max Drawdown                            │
│  Pause bot if losses exceed [__]%  -15% │
│                                          │
│  Daily Loss Limit                        │
│  [Toggle: ON] Max loss per day: $[___]  │
│                                          │
│  ── Advanced Settings ──────────         │
│  [▼ Show advanced risk controls]         │
│                                          │
└──────────────────────────────────────────┘
```

**Risk Gauge (Interactive):**

**Visual:**
```
    🟢──────🟡──────🔴
    │       ●       │
    Low   Current  High
```

**Interaction:**
- Draggable thumb control
- Snaps to preset levels (low/medium/high)
- Color transitions smoothly
- Haptic feedback on mobile

**Zones:**
- 0-33%: Green (Conservative)
- 34-66%: Yellow (Moderate)
- 67-100%: Red (Aggressive)

**Animation:**
- Gauge fills from left (gradient animation)
- Number counts up (0 → current%)
- Zone label fades in

**Stop-Loss Configuration:**

```
┌────────────────────────────────────┐
│  Stop-Loss Protection              │
│  ────────────────────────────      │
│                                    │
│  [Toggle: ● ON]                    │
│                                    │
│  Trigger when loss reaches:        │
│  -[______]%                  -10%  │
│  ━━━━━━●━━━━━━━━━━━━━━━━━         │
│  -1%                         -30%  │
│                                    │
│  Action:                           │
│  ○ Pause bot                       │
│  ● Close all positions             │
│  ○ Alert only                      │
│                                    │
│  💡 Recommendation: -10% for       │
│     volatile assets like crypto    │
│                                    │
│  Historical impact (backtest):     │
│  📉 Prevented 3 major losses       │
│  💰 Saved $450 on average          │
└────────────────────────────────────┘
```

**Validation Rules:**
- Stop-loss is MANDATORY (cannot disable)
- Must be between -1% and -30%
- Warning if >-20%: "High risk of major loss"
- Take-profit must be > stop-loss (if enabled)

**Advanced Risk Controls (Collapsible):**

```
[▼ Show advanced risk controls]

↓ Expands to:

┌────────────────────────────────────┐
│  Trailing Stop                     │
│  [Toggle: OFF]                     │
│  Trail by [__]% -5%                │
│                                    │
│  Scaling In/Out                    │
│  [Toggle: OFF]                     │
│  Scale into position over [__] orders│
│                                    │
│  Exposure Limits                   │
│  Max simultaneous positions: [__]  │
│  Max per asset: [__]%              │
│                                    │
│  Volatility Filter                 │
│  [Toggle: OFF]                     │
│  Pause if volatility > [__]%       │
└────────────────────────────────────┘
```

### Section 3: Technical Setup

**Layout:**
```
┌──────────────────────────────────────────┐
│  Trading Pair                            │
│  ────────────────────────────────────    │
│                                          │
│  Select cryptocurrency pair              │
│  🔍 [Search pairs... ________]           │
│                                          │
│  Popular:                                │
│  [BTC/USDT] [ETH/USDT] [BNB/USDT]       │
│                                          │
│  Your selection: BTC/USDT                │
│  Current price: $45,234.50 (+2.3%)       │
│  24h volume: $28.5B                      │
│                                          │
│  ──────────────────────────────────      │
│                                          │
│  Timeframe                               │
│  Chart interval for analysis             │
│  [1m] [5m] [15m] [1h] [4h] [1d]         │
│                           ────           │
│                                          │
│  ──────────────────────────────────      │
│                                          │
│  Indicators (Optional)                   │
│  [+ Add Technical Indicator]             │
│                                          │
│  Selected:                               │
│  ● RSI (14) - Overbought/oversold       │
│    [Configure] [Remove]                  │
│                                          │
│  ● MACD (12, 26, 9) - Trend momentum    │
│    [Configure] [Remove]                  │
│                                          │
│  ──────────────────────────────────      │
│                                          │
│  Initial Budget                          │
│  Allocate funds for this bot            │
│                                          │
│  $ [__________]                $1,000    │
│  ━━━━━━━━━●━━━━━━━━━━━━━━━━━           │
│  $100                         $10,000    │
│                                          │
│  Available: $10,000 (paper trading)      │
│  Remaining: $9,000                       │
│                                          │
└──────────────────────────────────────────┘
```

**Pair Search (Autocomplete):**

```
🔍 [BTC_____________]
     ↓
   [Dropdown results]

   BTC/USDT  Bitcoin
   $45,234.50  Vol: $28.5B

   BTC/BUSD  Bitcoin
   $45,230.10  Vol: $8.2B

   BTC/EUR  Bitcoin
   €41,230.50  Vol: $2.1B
```

**Features:**
- Real-time search (debounced 300ms)
- Fuzzy matching (BTC = Bitcoin)
- Shows price + 24h change + volume
- Keyboard navigation (↑↓ arrows)
- Recent pairs at top

**Indicator Configuration Modal:**

```
┌────────────────────────────────────┐
│  Configure RSI                  [×]│
│  ────────────────────────────      │
│                                    │
│  Period                            │
│  [______] bars              14     │
│                                    │
│  Overbought Level                  │
│  [______]                   70     │
│  ━━━━━━━━━━━━●━━━━━━━━━━         │
│  50                         90     │
│                                    │
│  Oversold Level                    │
│  [______]                   30     │
│  ━━━━━●━━━━━━━━━━━━━━━━━         │
│  10                         50     │
│                                    │
│  Signal Actions:                   │
│  ☑ Buy when oversold              │
│  ☑ Sell when overbought           │
│                                    │
│  [Cancel]            [Save →]      │
└────────────────────────────────────┘
```

### Section 4: Backtesting & Preview

**Layout:**
```
┌──────────────────────────────────────────┐
│  Backtest Your Strategy                  │
│  ────────────────────────────────────    │
│                                          │
│  Date Range                              │
│  [2024-01-01] to [2024-12-13]           │
│  Preset: [Last 30d] [Last 90d] [1 Year] │
│                                          │
│  [▶ Run Backtest]                        │
│                                          │
│  ── Results ──────────────────────       │
│                                          │
│  [Large Performance Chart]               │
│  Candlestick + equity curve              │
│                                          │
│  ┌──────────────────────────┐           │
│  │ Net Profit: +$1,245      │           │
│  │ ROI: +12.45%             │           │
│  │ Win Rate: 68%            │           │
│  │ Max Drawdown: -$180      │           │
│  │ Sharpe Ratio: 1.8        │           │
│  │ Total Trades: 45         │           │
│  └──────────────────────────┘           │
│                                          │
│  Trade History                           │
│  [Table: Date | Type | Entry | Exit |   │
│          P/L | Duration]                 │
│                                          │
│  [Export CSV]  [View Details]           │
│                                          │
└──────────────────────────────────────────┘
```

**Backtest Loading State:**

```
[▶ Run Backtest]
      ↓ Clicked
[● Running backtest...]
      ↓ (2-5 seconds)
[✓ Backtest complete]
```

**Animation:**
- Button shows spinner
- Progress bar fills (0 → 100%)
- "Analyzing 1,234 candles..."
- Chart draws from left to right
- Metrics count up (0 → final value)
- Win rate fills like progress bar

**Performance Chart:**

**Visual:**
- Dual-axis chart (candlestick + equity curve)
- Candlestick: green/red candles (price)
- Equity curve: blue line (account balance over time)
- Trade markers: 🟢 buy, 🔴 sell
- Drawdown zones: red shaded areas

**Interactions:**
- Hover over candle: shows OHLC + date
- Hover over trade marker: shows details popup
- Zoom: scroll wheel or pinch
- Pan: click and drag
- Tooltip: comprehensive trade info

**Trade Details Popup (on hover):**
```
┌────────────────────────────┐
│  🟢 BUY                    │
│  ──────────────────────    │
│  Date: 2024-06-15 14:30   │
│  Entry: $44,230.50        │
│  Exit: $45,890.20 🔴      │
│  Profit: +$165.70 (+3.7%) │
│  Duration: 2d 4h          │
│  Reason: RSI oversold     │
└────────────────────────────┘
```

**Metrics Grid:**

```
┌───────────────┬───────────────┬───────────────┐
│ Net Profit    │ ROI           │ Win Rate      │
│ +$1,245       │ +12.45%       │ 68%           │
│ 🟢 Strong     │ 🟢 Good       │ 🟢 High       │
├───────────────┼───────────────┼───────────────┤
│ Max Drawdown  │ Sharpe Ratio  │ Total Trades  │
│ -$180 (-1.8%) │ 1.8           │ 45            │
│ 🟢 Low        │ 🟢 Excellent  │ 🟡 Moderate   │
└───────────────┴───────────────┴───────────────┘
```

**Color Coding:**
- 🟢 Green: Good/Positive
- 🟡 Yellow: Moderate/Warning
- 🔴 Red: Bad/Negative

**Trade History Table:**

```
┌─────────────────────────────────────────────┐
│ Date       Type  Entry     Exit     P/L     │
├─────────────────────────────────────────────┤
│ 2024-12-10 BUY   $45,230  $46,120  +$89    │
│ 2024-12-08 SELL  $44,890  $44,120  -$77    │
│ 2024-12-05 BUY   $43,450  $44,890  +$144   │
│ ...                                         │
└─────────────────────────────────────────────┘

[< Previous] Page 1 of 3 [Next >]
```

**Features:**
- Sortable columns
- Color-coded P/L (green/red)
- Pagination (10 per page)
- Filter by win/loss
- Export to CSV

### Live Preview Panel (Pro Mode)

**Same as Simple Mode but with:**

**1. Configuration JSON Preview**

```
┌─────────────────────────────────────┐
│  [Preview] [JSON] [Performance]    │
│                                     │
│  {                                  │
│    "strategy": "dca",               │
│    "pair": "BTC/USDT",              │
│    "risk": {                        │
│      "stopLoss": -10,               │
│      "takeProfit": 25,              │
│      "maxDrawdown": -15             │
│    },                               │
│    "parameters": {                  │
│      "interval": "daily",           │
│      "amount": 50,                  │
│      "purchases": 20                │
│    }                                │
│  }                                  │
│                                     │
│  [Copy JSON]  [Export Config]       │
└─────────────────────────────────────┘
```

**2. Validation Checklist**

```
┌─────────────────────────────────────┐
│  Configuration Status               │
│  ────────────────────────────       │
│                                     │
│  ✓ Strategy configured              │
│  ✓ Risk controls active             │
│  ✓ Stop-loss enabled                │
│  ⚠ Backtesting pending              │
│  ○ Ready to create                  │
│                                     │
│  [Run Backtest] Required            │
└─────────────────────────────────────┘
```

**3. Real-time Performance Estimate**

```
┌─────────────────────────────────────┐
│  Estimated Performance              │
│  Based on historical data           │
│  ────────────────────────────       │
│                                     │
│  📈 Expected Return (1 year)        │
│     +10% to +18%                    │
│                                     │
│  📉 Risk of Loss                    │
│     Low (5% chance > -10%)          │
│                                     │
│  💡 Confidence: 85%                 │
│     Based on 12 months backtest     │
└─────────────────────────────────────┘
```

### Bottom Navigation Bar

**Design:**
```
┌────────────────────────────────────────────┐
│  [Save Draft]  [← Previous]  [Next Step →] │
└────────────────────────────────────────────┘
```

**States:**
- **Save Draft:** Always enabled, shows "Saved ✓" on success
- **Previous:** Disabled on first step
- **Next:** Disabled until section valid, pulses when enabled

**Keyboard Shortcuts:**
- Cmd/Ctrl + S: Save draft
- Cmd/Ctrl + ←: Previous step
- Cmd/Ctrl + →: Next step (if valid)
- Esc: Exit (with confirmation)

---

## 🎉 Success Celebration Screen

**Triggered:** After "Create Bot" button clicked (both modes)

### Animation Sequence

**Phase 1: Loading (2 seconds)**
```
[Creating your bot...]
[●●●●●●○○○○] 60%

- Generating configuration...
- Setting up risk controls...
- Initializing paper trading account...
```

**Phase 2: Success Animation**

1. **Confetti Burst** (1 second)
   - Multi-colored confetti from top
   - 200+ particles
   - Gravity physics
   - Fade out after 3 seconds

2. **Bot Card Reveal** (0.8 seconds)
   - Scale in (0 → 1)
   - Rotate (0 → 360deg)
   - Glow effect

3. **Success Message** (0.5 seconds)
   - Fade in
   - Slide up from bottom

**Phase 3: Results Display**

```
┌─────────────────────────────────────────────┐
│                                             │
│              🎉 Bot Created! 🎉             │
│                                             │
│  Your trading bot is ready to start         │
│  paper trading. No real money involved.     │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │  [Bot Card - Full Details]            │ │
│  │                                       │ │
│  │  🤖 DCA Bitcoin Strategy              │ │
│  │  BTC/USDT • Paper Trading             │ │
│  │  ─────────────────────────────        │ │
│  │                                       │ │
│  │  Strategy: DCA                        │ │
│  │  Risk Level: Conservative 🟢          │ │
│  │  Budget: $1,000                       │ │
│  │  Expected Return: +15% yearly         │ │
│  │                                       │ │
│  │  Status: ⏸️ Paused                    │ │
│  │                                       │ │
│  │  [▶ Start Bot] [View Dashboard]      │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  What's Next?                               │
│  ✓ Bot is created and configured            │
│  • Click "Start Bot" to begin trading       │
│  • Monitor performance on dashboard         │
│  • Adjust settings anytime                  │
│                                             │
│  [▶ Start Paper Trading] [← Create Another] │
│                                             │
└─────────────────────────────────────────────┘
```

**Alternative Actions:**
- **Start Bot:** Activates bot immediately, redirects to dashboard
- **Create Another:** Returns to mode selection
- **View Dashboard:** Goes to bot management dashboard
- **Share:** Copy link to bot configuration (for education)

**Micro-Interactions:**
- Bot card pulses gently (breathing animation)
- Status badge glows
- "Start Bot" button has gradient animation
- Success checkmarks appear sequentially

---

## 🧩 Shared Component Library

### 1. Strategy Template Cards

**Component:** `StrategyCard.tsx`

**Props:**
```typescript
interface StrategyCardProps {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  riskLevel: 'low' | 'medium' | 'high'
  complexity: 'beginner' | 'intermediate' | 'advanced'
  timeframe: string
  backtest: {
    returns: number
    maxDrawdown: number
    winRate: number
  }
  isSelected?: boolean
  onSelect: (id: string) => void
  onPreview: (id: string) => void
}
```

**shadcn Components Used:**
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Badge`
- `Button`
- `Separator`

**Styling:**
```css
/* Base */
- Card with hover state
- Border: 2px solid transparent → primary-500 on hover
- Shadow: md → xl on hover
- Transition: all 300ms ease

/* Selected State */
- Border: 2px solid primary-600
- Background: primary-50/10
- Checkmark badge: absolute top-right

/* Risk Badge Colors */
- Low: bg-green-100 text-green-800
- Medium: bg-yellow-100 text-yellow-800
- High: bg-red-100 text-red-800
```

**Animation:**
- Card entrance: fade + slide up (stagger 100ms per card)
- Hover: scale 1.03 + lift shadow
- Select: flip animation (rotate Y 180deg → 0)

### 2. Risk Gauge Component

**Component:** `RiskGauge.tsx`

**Props:**
```typescript
interface RiskGaugeProps {
  value: number // 0-100
  onChange?: (value: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  zones?: {
    low: { threshold: number; color: string; label: string }
    medium: { threshold: number; color: string; label: string }
    high: { threshold: number; color: string; label: string }
  }
}
```

**shadcn Components Used:**
- `Slider`
- `Label`
- Custom SVG gauge visualization

**Visual Design:**
```
    🟢──────────🟡──────────🔴
    │          ●          │
    Low     Medium      High

    Current Risk: 45%
    🟡 Moderate
```

**Implementation:**
- SVG arc path with gradient fill
- Animated fill (0 → value) with spring physics
- Draggable thumb (if interactive)
- Color transitions smoothly between zones
- Number counter animates (counting up effect)

**Animation:**
- Mount: draw from 0 to current value (1s)
- Change: smooth transition (500ms)
- Hover (if interactive): scale thumb 1.1
- Click: ripple effect from thumb

### 3. Performance Chart Component

**Component:** `PerformanceChart.tsx`

**Props:**
```typescript
interface PerformanceChartProps {
  data: {
    timestamp: number
    open: number
    high: number
    low: number
    close: number
    volume: number
    equity?: number
  }[]
  trades?: {
    timestamp: number
    type: 'buy' | 'sell'
    price: number
    details: any
  }[]
  height?: number
  showEquityCurve?: boolean
  showVolume?: boolean
  interactive?: boolean
}
```

**Library:** Recharts (compatible with shadcn/ui)

**Features:**
- Candlestick chart (OHLC data)
- Equity curve overlay (blue line)
- Trade markers (🟢 buy, 🔴 sell)
- Volume bars (bottom)
- Crosshair tooltip on hover
- Zoom and pan controls
- Responsive sizing

**Interactions:**
- Hover: Show detailed tooltip
- Click trade marker: Open trade details popup
- Scroll: Zoom in/out
- Drag: Pan left/right
- Touch: Pinch to zoom, drag to pan

**Animation:**
- Chart draws from left to right (1.5s)
- Candles appear sequentially (stagger 50ms)
- Equity line draws with path animation
- Trade markers scale in (pop effect)

### 4. Bot Configuration Card

**Component:** `BotConfigCard.tsx`

**Props:**
```typescript
interface BotConfigCardProps {
  bot: {
    id?: string
    name: string
    strategy: string
    pair: string
    riskLevel: 'low' | 'medium' | 'high'
    budget: number
    status: 'paused' | 'active' | 'error'
    mode: 'paper' | 'live'
    estimatedReturns?: {
      yearly: number
      maxDrawdown: number
    }
  }
  variant?: 'preview' | 'summary' | 'detailed'
  actions?: React.ReactNode
}
```

**shadcn Components Used:**
- `Card`
- `Badge`
- `Separator`
- `Button`

**Variants:**

**Preview (Live preview panel):**
- Compact size
- Essential info only
- Real-time updates
- Highlight animation on change

**Summary (Confirmation screen):**
- Medium size
- All key details
- Visual metrics (gauge, chart)
- Action buttons

**Detailed (Dashboard):**
- Full size
- Performance graphs
- Trade history
- Advanced controls

**Status Badges:**
```typescript
const statusColors = {
  paused: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800'
}
```

### 5. Validation Status Component

**Component:** `ValidationStatus.tsx`

**Props:**
```typescript
interface ValidationStatusProps {
  checks: {
    id: string
    label: string
    status: 'pending' | 'success' | 'error' | 'warning'
    message?: string
  }[]
  onRetry?: (checkId: string) => void
}
```

**Visual:**
```
┌───────────────────────────────┐
│  Configuration Status         │
│  ──────────────────────       │
│                               │
│  ✓ Strategy selected          │
│  ✓ Risk controls active       │
│  ⚠ High risk settings         │
│  ⚠ Backtesting recommended    │
│  ○ Waiting for review         │
│                               │
│  2 warnings, 0 errors         │
└───────────────────────────────┘
```

**Status Icons:**
- Success: ✓ (green)
- Error: ✗ (red)
- Warning: ⚠ (yellow)
- Pending: ○ (gray)
- Loading: ● animated (blue)

**Animation:**
- Checks appear sequentially (stagger 200ms)
- Icon animates in (scale + rotate)
- Status change: icon swap with flip animation

### 6. Chat Message Bubble

**Component:** `ChatBubble.tsx`

**Props:**
```typescript
interface ChatBubbleProps {
  type: 'ai' | 'user'
  content: string | React.ReactNode
  timestamp?: Date
  avatar?: string
  actions?: React.ReactNode // Quick reply buttons
  isTyping?: boolean
}
```

**shadcn Components Used:**
- `Card`
- `Avatar`
- `Button` (for quick replies)

**Styling:**

**AI Message:**
- Align: Left
- Background: gray-50 (light) / gray-900 (dark)
- Max width: 85%
- Avatar: 🤖 robot icon

**User Message:**
- Align: Right
- Background: primary-600 gradient
- Text: white
- Max width: 70%
- No avatar

**Animation:**
- AI: fade in + slide up from bottom (400ms)
- User: slide in from right (300ms)
- Typing indicator: 3 dots bounce animation

### 7. Progress Steps Component

**Component:** `ProgressSteps.tsx`

**Props:**
```typescript
interface ProgressStepsProps {
  steps: {
    id: string
    label: string
    status: 'completed' | 'current' | 'upcoming'
  }[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
}
```

**Visual (Horizontal):**
```
●──────●──────○──────○──────○
Strategy  Risk  Setup Review Done
  ✓       -
```

**Visual (Vertical):**
```
●  Strategy ✓
│
●  Risk -
│
○  Setup
│
○  Review
│
○  Done
```

**Animation:**
- Dot fills with scale animation
- Line draws (width 0 → 100%)
- Checkmark draws (path animation)
- Active step pulses gently

### 8. Action Buttons

**Component Variants:**

**Primary CTA:**
```typescript
<Button
  size="lg"
  className="bg-gradient-to-r from-primary-600 to-purple-600"
>
  Create Bot →
</Button>
```

**Features:**
- Gradient background
- Arrow icon animates on hover (→ slides right)
- Pulse animation when enabled
- Loading state with spinner

**Secondary:**
```typescript
<Button variant="outline" size="md">
  Save Draft
</Button>
```

**Danger (Stop Bot):**
```typescript
<Button variant="destructive">
  Stop Bot
</Button>
```

**Loading State:**
```typescript
<Button disabled>
  <Loader2 className="animate-spin" />
  Creating...
</Button>
```

---

## 🎬 Animation Specifications

### Page Transitions

**Route Changes:**
```typescript
// Framer Motion variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3
}
```

**Mode Switch (Simple ↔ Pro):**
```typescript
const modeTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 }
}
```

### Component Entrance Animations

**Staggered Lists:**
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}
```

**Cards Grid:**
- Each card fades + slides up
- Stagger delay: 100ms per card
- Row-by-row entrance (not all at once)

### Loading States

**Skeleton Loader:**
```typescript
<Card>
  <Skeleton className="h-24 w-full animate-pulse" />
  <Skeleton className="h-4 w-3/4 mt-2" />
  <Skeleton className="h-4 w-1/2 mt-1" />
</Card>
```

**Spinner:**
```typescript
<Loader2 className="animate-spin" />
```

**Progress Bar:**
```typescript
<div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
  <motion.div
    className="absolute h-full bg-primary-600"
    initial={{ width: 0 }}
    animate={{ width: '100%' }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
</div>
```

### Success Celebrations

**Confetti:**
```typescript
import confetti from 'canvas-confetti'

const celebrate = () => {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B']
  })
}
```

**Checkmark Draw:**
```typescript
<motion.svg viewBox="0 0 24 24">
  <motion.path
    d="M5 13l4 4L19 7"
    stroke="currentColor"
    strokeWidth={2}
    fill="none"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  />
</motion.svg>
```

**Scale In with Bounce:**
```typescript
const bounceIn = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
}
```

### Micro-Interactions

**Button Hover:**
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

**Card Hover:**
```typescript
<motion.div
  whileHover={{
    y: -4,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }}
  transition={{ duration: 0.2 }}
>
  Card content
</motion.div>
```

**Input Focus:**
```typescript
<motion.div
  whileFocus={{ scale: 1.02 }}
  className="relative"
>
  <input className="peer" />
  <motion.div
    className="absolute inset-0 border-2 rounded-lg"
    initial={{ borderColor: 'transparent' }}
    whileFocus={{ borderColor: 'primary-500' }}
  />
</motion.div>
```

**Number Counter:**
```typescript
const AnimatedNumber = ({ value }: { value: number }) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 1,
      ease: 'easeOut'
    })
    return animation.stop
  }, [value])

  return <motion.span>{rounded}</motion.span>
}
```

### Chart Animations

**Line Drawing:**
```typescript
<motion.path
  d={pathData}
  stroke="currentColor"
  strokeWidth={2}
  fill="none"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.5, ease: 'easeInOut' }}
/>
```

**Bar Chart Growth:**
```typescript
{data.map((item, i) => (
  <motion.rect
    key={i}
    initial={{ height: 0, y: chartHeight }}
    animate={{ height: item.value, y: chartHeight - item.value }}
    transition={{ delay: i * 0.1, duration: 0.5 }}
  />
))}
```

**Gauge Fill:**
```typescript
<motion.circle
  r={radius}
  stroke="url(#gradient)"
  strokeDasharray={circumference}
  initial={{ strokeDashoffset: circumference }}
  animate={{ strokeDashoffset: circumference - (value / 100) * circumference }}
  transition={{ duration: 1, ease: 'easeOut' }}
/>
```

---

## 🎨 Visual Hierarchy & Design Tokens

### Color System

**Primary (Brand):**
- 50: #F5F3FF
- 100: #EDE9FE
- 500: #8B5CF6 (Main)
- 600: #7C3AED (Hover)
- 900: #4C1D95

**Secondary (Accent):**
- 500: #3B82F6 (Blue)
- 600: #2563EB

**Semantic:**
- Success: #10B981 (Green)
- Warning: #F59E0B (Yellow)
- Error: #EF4444 (Red)
- Info: #3B82F6 (Blue)

**Risk Levels:**
- Low: #10B981 (Green)
- Medium: #F59E0B (Yellow)
- High: #EF4444 (Red)

**Gradients:**
```css
.gradient-primary {
  background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
}

.gradient-success {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
}

.gradient-danger {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
}
```

### Typography Scale

**Font Family:**
- Display: Inter (weights: 600, 700, 800)
- Body: Inter (weights: 400, 500, 600)
- Mono: JetBrains Mono (for code/JSON)

**Scale:**
- Display: 48px / 60px (line height)
- H1: 36px / 44px
- H2: 30px / 38px
- H3: 24px / 32px
- H4: 20px / 28px
- Body Large: 18px / 28px
- Body: 16px / 24px
- Body Small: 14px / 20px
- Caption: 12px / 16px

**Usage:**
- Page titles: Display
- Section headers: H2
- Card titles: H3
- Labels: Body Small
- Descriptions: Body
- Metrics: H1 (for emphasis)

### Spacing System

**Base Unit:** 4px

**Scale:**
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 5: 20px
- 6: 24px
- 8: 32px
- 10: 40px
- 12: 48px
- 16: 64px
- 20: 80px

**Component Spacing:**
- Card padding: 24px (6)
- Section gap: 32px (8)
- Element gap: 16px (4)
- Button padding: 12px 24px (3/6)

### Border Radius

**Scale:**
- sm: 4px (inputs, badges)
- md: 8px (buttons, small cards)
- lg: 12px (cards, modals)
- xl: 16px (feature cards)
- 2xl: 24px (hero sections)
- full: 9999px (pills, avatars)

### Shadows

**Elevation Scale:**
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

**Usage:**
- Cards: md
- Hover cards: lg
- Modals: xl
- Floating panels: 2xl
- Dropdowns: lg

### Z-Index Layers

```typescript
const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80
}
```

---

## 📱 Responsive Design

### Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
}
```

### Layout Adaptations

**Mode Selection:**
- Desktop: Side-by-side cards
- Tablet: Stacked cards (still side-by-side)
- Mobile: Vertical stack, full width

**Simple Mode:**
- Desktop: 35% preview / 65% chat
- Tablet: Collapsible preview (floating button)
- Mobile: Preview via swipe-up sheet

**Pro Mode:**
- Desktop: 65% form / 35% preview
- Tablet: Tabs for form sections, collapsible preview
- Mobile: Full-width form, preview at bottom

**Charts:**
- Desktop: Full interactive features
- Tablet: Simplified interactions
- Mobile: Touch-optimized, essential data only

### Mobile Optimizations

**Touch Targets:**
- Minimum: 44px × 44px (iOS HIG standard)
- Spacing: 8px between tappable elements

**Input Fields:**
- Font size: 16px minimum (prevents iOS zoom)
- Type attributes for numeric keyboards

**Navigation:**
- Bottom sheet for mobile (not sidebar)
- Swipe gestures for navigation
- Sticky header with back button

**Performance:**
- Lazy load charts (IntersectionObserver)
- Reduce animation complexity on mobile
- Use CSS transforms (GPU accelerated)

---

## ♿ Accessibility Specifications

### Keyboard Navigation

**Focus Management:**
- Visible focus indicators (2px outline, primary-500)
- Focus trap in modals
- Skip to main content link
- Logical tab order

**Shortcuts:**
- Esc: Close modal/exit flow
- Enter: Submit form/advance step
- Tab: Next element
- Shift+Tab: Previous element
- Arrow keys: Navigate radio groups

### Screen Reader Support

**ARIA Labels:**
```tsx
// Button with icon
<Button aria-label="Create new bot">
  <Plus />
</Button>

// Progress indicator
<div role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
  Step 3 of 5
</div>

// Live region for status updates
<div role="status" aria-live="polite">
  Bot created successfully
</div>
```

**Semantic HTML:**
- Use proper heading hierarchy (h1, h2, h3)
- `<nav>` for navigation
- `<main>` for main content
- `<section>` for content sections
- `<article>` for independent content

**Form Accessibility:**
```tsx
<label htmlFor="bot-name">Bot Name</label>
<input
  id="bot-name"
  aria-describedby="name-help"
  aria-required="true"
/>
<span id="name-help">Choose a unique name for your bot</span>
```

### Color Contrast

**WCAG AA Standards:**
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**Testing:**
- Use Stark or axe DevTools
- Test in grayscale mode
- Verify color-blind modes

**Alternatives to Color:**
- Icons + text labels
- Patterns + colors (not color alone)
- Status text ("Error", "Success") not just red/green

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Implementation:**
```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

const animationDuration = prefersReducedMotion ? 0 : 300
```

---

## 📊 Mock Data Structure

### Strategy Templates

```typescript
export const strategyTemplates = [
  {
    id: 'dca',
    name: 'DCA (Dollar Cost Averaging)',
    icon: '📊',
    description: 'Buy fixed amounts at regular intervals to reduce timing risk',
    riskLevel: 'low',
    complexity: 'beginner',
    timeframe: 'Long-term (months-years)',
    category: 'passive',
    backtest: {
      period: '12 months',
      returns: 15.2,
      maxDrawdown: -4.8,
      winRate: 72,
      sharpeRatio: 1.6,
      totalTrades: 365
    },
    parameters: {
      interval: {
        type: 'select',
        options: ['hourly', 'daily', 'weekly'],
        default: 'daily',
        label: 'Purchase Interval'
      },
      amount: {
        type: 'number',
        min: 10,
        max: 1000,
        default: 50,
        label: 'Amount per Purchase ($)'
      },
      purchases: {
        type: 'number',
        min: 1,
        max: 100,
        default: 20,
        label: 'Total Purchases'
      }
    },
    whyItWorks: [
      'Proven strategy for 12+ years',
      'Reduces emotional trading decisions',
      'Works in volatile markets',
      'Automatic risk management'
    ],
    bestFor: [
      'Long-term investors',
      'Volatile markets',
      'First-time bot users',
      'Passive income seekers'
    ],
    risks: [
      'Slow to react to major trends',
      'May miss sharp rallies',
      'Requires patience'
    ]
  },
  {
    id: 'grid',
    name: 'Grid Trading',
    icon: '🔲',
    description: 'Place buy and sell orders at preset intervals to profit from volatility',
    riskLevel: 'medium',
    complexity: 'intermediate',
    timeframe: 'Medium-term (weeks-months)',
    category: 'active',
    backtest: {
      period: '12 months',
      returns: 22.5,
      maxDrawdown: -12.3,
      winRate: 65,
      sharpeRatio: 1.4,
      totalTrades: 856
    },
    parameters: {
      gridLevels: {
        type: 'number',
        min: 3,
        max: 20,
        default: 10,
        label: 'Number of Grid Levels'
      },
      gridSpacing: {
        type: 'number',
        min: 0.5,
        max: 10,
        default: 2,
        label: 'Grid Spacing (%)'
      },
      upperLimit: {
        type: 'number',
        label: 'Upper Price Limit ($)'
      },
      lowerLimit: {
        type: 'number',
        label: 'Lower Price Limit ($)'
      }
    },
    whyItWorks: [
      'Capitalizes on range-bound markets',
      'Frequent small profits add up',
      'No need to predict direction',
      'Automatic buy low, sell high'
    ],
    bestFor: [
      'Range-bound markets',
      'High volatility periods',
      'Active traders',
      'Medium risk tolerance'
    ],
    risks: [
      'Can lose in strong trends',
      'Many small transactions (fees)',
      'Requires range estimation'
    ]
  },
  {
    id: 'momentum',
    name: 'Momentum Trading',
    icon: '📈',
    description: 'Follow strong trends by buying rising assets and selling falling ones',
    riskLevel: 'high',
    complexity: 'advanced',
    timeframe: 'Short-term (days-weeks)',
    category: 'active',
    backtest: {
      period: '12 months',
      returns: 34.8,
      maxDrawdown: -22.1,
      winRate: 58,
      sharpeRatio: 1.2,
      totalTrades: 234
    },
    parameters: {
      momentumPeriod: {
        type: 'number',
        min: 5,
        max: 50,
        default: 14,
        label: 'Momentum Period (days)'
      },
      entryThreshold: {
        type: 'number',
        min: 1,
        max: 10,
        default: 3,
        label: 'Entry Threshold (%)'
      },
      exitThreshold: {
        type: 'number',
        min: 1,
        max: 10,
        default: 2,
        label: 'Exit Threshold (%)'
      },
      indicators: {
        type: 'multiselect',
        options: ['RSI', 'MACD', 'Moving Average'],
        default: ['RSI', 'MACD'],
        label: 'Technical Indicators'
      }
    },
    whyItWorks: [
      'Captures strong trends early',
      'High profit potential',
      'Clear entry/exit signals',
      'Works in trending markets'
    ],
    bestFor: [
      'Trending markets',
      'Experienced traders',
      'High risk tolerance',
      'Active monitoring'
    ],
    risks: [
      'High drawdown potential',
      'Requires trend reversal timing',
      'Whipsaw risk in ranging markets',
      'Higher stress level'
    ]
  },
  {
    id: 'mean_reversion',
    name: 'Mean Reversion',
    icon: '📉',
    description: 'Buy when price drops below average, sell when it rises above',
    riskLevel: 'medium',
    complexity: 'intermediate',
    timeframe: 'Short-term (days-weeks)',
    category: 'active',
    backtest: {
      period: '12 months',
      returns: 18.9,
      maxDrawdown: -9.2,
      winRate: 68,
      sharpeRatio: 1.5,
      totalTrades: 412
    },
    parameters: {
      movingAverage: {
        type: 'select',
        options: ['SMA', 'EMA', 'WMA'],
        default: 'SMA',
        label: 'Moving Average Type'
      },
      period: {
        type: 'number',
        min: 5,
        max: 200,
        default: 20,
        label: 'MA Period (days)'
      },
      deviationThreshold: {
        type: 'number',
        min: 0.5,
        max: 5,
        default: 2,
        label: 'Std Dev Threshold'
      },
      maxPositions: {
        type: 'number',
        min: 1,
        max: 10,
        default: 3,
        label: 'Max Simultaneous Positions'
      }
    },
    whyItWorks: [
      'Prices tend to return to average',
      'Statistical edge',
      'Works in sideways markets',
      'Defined risk parameters'
    ],
    bestFor: [
      'Range-bound markets',
      'Lower volatility periods',
      'Patient traders',
      'Statistical traders'
    ],
    risks: [
      'Can lose in strong trends',
      'Timing is critical',
      'Requires patience',
      'May catch falling knives'
    ]
  }
]
```

### Trading Pairs

```typescript
export const tradingPairs = [
  {
    id: 'BTCUSDT',
    symbol: 'BTC/USDT',
    name: 'Bitcoin',
    baseAsset: 'BTC',
    quoteAsset: 'USDT',
    currentPrice: 45234.50,
    change24h: 2.3,
    volume24h: 28500000000,
    volatility: 'medium',
    liquidity: 'high',
    minOrder: 0.0001,
    priceDecimals: 2,
    logo: '/assets/btc.png',
    popular: true,
    recommended: true
  },
  {
    id: 'ETHUSDT',
    symbol: 'ETH/USDT',
    name: 'Ethereum',
    baseAsset: 'ETH',
    quoteAsset: 'USDT',
    currentPrice: 2340.80,
    change24h: 3.1,
    volume24h: 15200000000,
    volatility: 'medium',
    liquidity: 'high',
    minOrder: 0.001,
    priceDecimals: 2,
    logo: '/assets/eth.png',
    popular: true,
    recommended: true
  },
  {
    id: 'BNBUSDT',
    symbol: 'BNB/USDT',
    name: 'Binance Coin',
    baseAsset: 'BNB',
    quoteAsset: 'USDT',
    currentPrice: 312.45,
    change24h: -1.2,
    volume24h: 980000000,
    volatility: 'medium',
    liquidity: 'high',
    minOrder: 0.01,
    priceDecimals: 2,
    logo: '/assets/bnb.png',
    popular: true,
    recommended: false
  }
  // ... more pairs
]
```

### Backtest Data

```typescript
export const backtestData = {
  period: {
    start: '2024-01-01',
    end: '2024-12-13',
    duration: 347 // days
  },
  performance: {
    initialBalance: 10000,
    finalBalance: 11245,
    netProfit: 1245,
    roi: 12.45,
    maxDrawdown: -180,
    maxDrawdownPercent: -1.8,
    sharpeRatio: 1.8,
    winRate: 68,
    profitFactor: 2.3,
    totalTrades: 45,
    winningTrades: 31,
    losingTrades: 14,
    avgWin: 85,
    avgLoss: -45,
    largestWin: 320,
    largestLoss: -125,
    avgTradeDuration: '2.5 days',
    avgTradesPerDay: 0.13
  },
  equityCurve: [
    { timestamp: 1704067200000, balance: 10000 },
    { timestamp: 1704153600000, balance: 10050 },
    { timestamp: 1704240000000, balance: 10120 },
    // ... daily balance snapshots
    { timestamp: 1734048000000, balance: 11245 }
  ],
  trades: [
    {
      id: 1,
      timestamp: 1704153600000,
      type: 'buy',
      price: 44230.50,
      amount: 0.0226,
      total: 1000,
      exitTimestamp: 1704326400000,
      exitPrice: 44890.20,
      exitTotal: 1015,
      profit: 15,
      profitPercent: 1.5,
      duration: '2 days',
      reason: 'DCA schedule',
      status: 'closed'
    },
    {
      id: 2,
      timestamp: 1704240000000,
      type: 'buy',
      price: 44890.20,
      amount: 0.0223,
      total: 1000,
      exitTimestamp: 1704499200000,
      exitPrice: 45678.90,
      exitTotal: 1017,
      profit: 17,
      profitPercent: 1.7,
      duration: '3 days',
      reason: 'DCA schedule',
      status: 'closed'
    }
    // ... more trades
  ],
  priceData: [
    {
      timestamp: 1704067200000,
      open: 44120.50,
      high: 44456.20,
      low: 43890.30,
      close: 44230.50,
      volume: 1234567890
    }
    // ... OHLC candles
  ]
}
```

### AI Conversation Flow

```typescript
export const aiConversation = [
  {
    id: 1,
    type: 'ai',
    content: "Hey! I'm your AI trading assistant. Let's create a bot that matches your goals. This will take about 5 minutes.",
    timestamp: Date.now(),
    actions: null
  },
  {
    id: 2,
    type: 'ai',
    content: "What's your main trading goal?",
    timestamp: Date.now() + 1000,
    actions: [
      { id: 'grow', label: '💰 Grow portfolio steadily', value: 'growth' },
      { id: 'volatility', label: '📈 Capture market volatility', value: 'volatility' },
      { id: 'balance', label: '⚖️ Balance risk and reward', value: 'balanced' },
      { id: 'custom', label: '🎯 Custom strategy', value: 'custom' }
    ]
  }
  // ... conversation continues based on user selections
]
```

### Bot Configuration State

```typescript
export interface BotConfiguration {
  // Identity
  id?: string
  name: string

  // Strategy
  strategy: {
    id: string
    name: string
    parameters: Record<string, any>
  }

  // Trading
  pair: {
    symbol: string
    baseAsset: string
    quoteAsset: string
  }
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d'

  // Risk Management
  risk: {
    level: 'low' | 'medium' | 'high'
    stopLoss: {
      enabled: boolean
      percentage: number
      action: 'pause' | 'close' | 'alert'
    }
    takeProfit: {
      enabled: boolean
      percentage: number
    }
    maxDrawdown: number
    dailyLossLimit?: number
    maxPositions: number
    positionSize: number // % of balance
    trailingStop?: {
      enabled: boolean
      percentage: number
    }
  }

  // Capital
  budget: number
  mode: 'paper' | 'live'

  // Technical
  indicators?: Array<{
    id: string
    name: string
    parameters: Record<string, any>
  }>

  // Status
  status: 'draft' | 'paused' | 'active' | 'error'
  createdAt: Date
  updatedAt: Date

  // Backtest Results (if available)
  backtest?: {
    netProfit: number
    roi: number
    winRate: number
    maxDrawdown: number
    sharpeRatio: number
    confidence: number
  }
}
```

---

## 🎨 Wireframe Descriptions

### 1. Mode Selection Screen

**Visual Hierarchy:**
```
[Header: "Choose Your Path"]
     ↓
[Split screen with gradient divider]
     ↓
[Left Card: Simple Mode]  [Right Card: Pro Mode]
     ↓                         ↓
[Features list]           [Features list]
[CTA button]             [CTA button]
     ↓
[Comparison table]
```

**Key Elements:**
- Center-aligned header
- Equal-width cards (responsive to single column on mobile)
- Clear CTAs with directional arrows
- Visual badges ("Recommended", "Full Control")
- Comparison table below for detailed decision-making

### 2. Simple Mode - Chat Interface

**Visual Hierarchy:**
```
[Top Nav: Back | Title | Close]
     ↓
[Split Layout: Preview (35%) | Chat (65%)]
     ↓ Chat Side         ↓ Preview Side
[Message history]    [Progress Steps]
[AI message]         [Bot Config Card]
[User message]       [Risk Gauge]
[Quick actions]      [Performance Chart]
[Input field]        [Confidence Builder]
```

**Key Elements:**
- Fixed header with escape routes
- Scrollable message history
- Sticky input at bottom
- Real-time preview updates
- Visual feedback on every interaction

### 3. Pro Mode - Dashboard Form

**Visual Hierarchy:**
```
[Top Nav: Back | Title | Save Draft]
     ↓
[Tab Navigation: Strategy | Risk | Technical | Backtest]
     ↓
[Main Content: Form (65%) | Preview (35%)]
     ↓ Form Side          ↓ Preview Side
[Section content]     [Bot Config Card]
[Form controls]       [Validation Status]
[Validation msgs]     [Performance Metrics]
     ↓
[Bottom Nav: Previous | Next]
```

**Key Elements:**
- Tab-based navigation for sections
- Clear form sections with labels
- Real-time validation feedback
- Preview panel always visible
- Bottom action bar for navigation

### 4. Backtesting Results

**Visual Hierarchy:**
```
[Header: "Backtest Results"]
     ↓
[Date Range Selector]
[Run Backtest Button]
     ↓
[Large Performance Chart]
(Candlestick + Equity Curve + Trade Markers)
     ↓
[Metrics Grid - 6 key metrics]
     ↓
[Trade History Table]
     ↓
[Export Actions]
```

**Key Elements:**
- Prominent date range controls
- Large, interactive chart
- Grid layout for metrics
- Color-coded performance indicators
- Sortable trade history

### 5. Success Celebration

**Visual Hierarchy:**
```
[Confetti Animation]
     ↓
[Success Icon (animated checkmark)]
     ↓
[Headline: "Bot Created!"]
     ↓
[Bot Summary Card]
(Comprehensive bot details)
     ↓
[Next Steps Section]
(Guided actions)
     ↓
[Primary CTA: Start Bot]
[Secondary: Create Another | View Dashboard]
```

**Key Elements:**
- Full-screen celebration
- Clear bot summary
- Actionable next steps
- Multiple exit paths
- Encouraging copy

---

## 🛠️ Implementation Recommendations

### Component Architecture

```
app/
├── bots/
│   └── create/
│       ├── page.tsx                    // Entry point
│       ├── _components/
│       │   ├── ModeSelector.tsx        // Mode selection screen
│       │   ├── SimpleMode/
│       │   │   ├── ChatInterface.tsx
│       │   │   ├── ChatBubble.tsx
│       │   │   ├── QuickReplyButton.tsx
│       │   │   └── LivePreview.tsx
│       │   ├── ProMode/
│       │   │   ├── DashboardForm.tsx
│       │   │   ├── StrategySection.tsx
│       │   │   ├── RiskSection.tsx
│       │   │   ├── TechnicalSection.tsx
│       │   │   └── BacktestSection.tsx
│       │   ├── Shared/
│       │   │   ├── StrategyCard.tsx
│       │   │   ├── RiskGauge.tsx
│       │   │   ├── PerformanceChart.tsx
│       │   │   ├── BotConfigCard.tsx
│       │   │   ├── ValidationStatus.tsx
│       │   │   ├── ProgressSteps.tsx
│       │   │   └── TradeHistoryTable.tsx
│       │   └── SuccessCelebration.tsx
│       ├── _hooks/
│       │   ├── useBotConfiguration.ts  // State management
│       │   ├── useAIConversation.ts    // Chat logic
│       │   ├── useBacktest.ts          // Backtest runner
│       │   └── useValidation.ts        // Form validation
│       └── _lib/
│           ├── mockData.ts             // All mock data
│           ├── validation.ts           // Validation rules
│           └── animations.ts           // Framer Motion variants
```

### State Management

**Option 1: Zustand (Recommended)**
```typescript
// stores/botCreationStore.ts
import { create } from 'zustand'

interface BotCreationStore {
  mode: 'simple' | 'pro' | null
  configuration: BotConfiguration
  currentStep: number
  validationErrors: Record<string, string>

  setMode: (mode: 'simple' | 'pro') => void
  updateConfiguration: (updates: Partial<BotConfiguration>) => void
  nextStep: () => void
  previousStep: () => void
  validate: () => boolean
  reset: () => void
}

export const useBotCreation = create<BotCreationStore>((set, get) => ({
  mode: null,
  configuration: initialConfiguration,
  currentStep: 0,
  validationErrors: {},

  setMode: (mode) => set({ mode }),

  updateConfiguration: (updates) => set((state) => ({
    configuration: { ...state.configuration, ...updates }
  })),

  nextStep: () => set((state) => {
    if (state.validate()) {
      return { currentStep: state.currentStep + 1 }
    }
    return state
  }),

  previousStep: () => set((state) => ({
    currentStep: Math.max(0, state.currentStep - 1)
  })),

  validate: () => {
    const { configuration } = get()
    const errors = validateConfiguration(configuration)
    set({ validationErrors: errors })
    return Object.keys(errors).length === 0
  },

  reset: () => set({
    mode: null,
    configuration: initialConfiguration,
    currentStep: 0,
    validationErrors: {}
  })
}))
```

**Option 2: React Context (Simpler)**
```typescript
// contexts/BotCreationContext.tsx
const BotCreationContext = createContext<BotCreationContextType | null>(null)

export const BotCreationProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(botCreationReducer, initialState)

  return (
    <BotCreationContext.Provider value={{ state, dispatch }}>
      {children}
    </BotCreationContext.Provider>
  )
}
```

### Animation Library Setup

```typescript
// lib/animations.ts
import { Variants } from 'framer-motion'

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export const scaleIn: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
}

export const slideIn: Variants = {
  left: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 }
  },
  right: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 }
  },
  up: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  },
  down: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  }
}
```

### Performance Optimizations

**1. Code Splitting:**
```typescript
// Lazy load heavy components
const PerformanceChart = lazy(() => import('./_components/Shared/PerformanceChart'))
const BacktestSection = lazy(() => import('./_components/ProMode/BacktestSection'))

// Usage with Suspense
<Suspense fallback={<Skeleton />}>
  <PerformanceChart data={chartData} />
</Suspense>
```

**2. Memoization:**
```typescript
// Expensive chart calculations
const chartData = useMemo(() => {
  return calculateChartData(backtestResults)
}, [backtestResults])

// Expensive component
const MemoizedChart = memo(PerformanceChart, (prev, next) => {
  return prev.data === next.data
})
```

**3. Debounced Inputs:**
```typescript
import { useDebouncedCallback } from 'use-debounce'

const handleSearch = useDebouncedCallback((query: string) => {
  searchTradingPairs(query)
}, 300)
```

**4. Virtual Scrolling (for trade history):**
```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

const virtualizer = useVirtualizer({
  count: trades.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
  overscan: 5
})
```

### Testing Strategy

**Unit Tests:**
- Validation functions
- State management logic
- Animation variants
- Mock data generators

**Integration Tests:**
- Form submission flows
- Chat conversation logic
- Step navigation
- Configuration validation

**E2E Tests (Playwright):**
```typescript
test('create bot via simple mode', async ({ page }) => {
  await page.goto('/bots/create')

  // Select simple mode
  await page.click('text=Simple Mode')

  // Answer AI questions
  await page.click('text=Grow portfolio steadily')
  await page.click('text=Conservative')
  await page.click('text=DCA')

  // Verify bot created
  await expect(page.locator('text=Bot Created!')).toBeVisible()
})
```

---

## 📦 Required Dependencies

### Core UI Libraries
```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tooltip": "^1.0.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.344.0"
  }
}
```

### Animation Libraries
```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "canvas-confetti": "^1.9.2"
  }
}
```

### Charting
```json
{
  "dependencies": {
    "recharts": "^2.10.0",
    "lightweight-charts": "^4.1.0" // Alternative for advanced charts
  }
}
```

### State Management
```json
{
  "dependencies": {
    "zustand": "^4.5.0"
  }
}
```

### Form & Validation
```json
{
  "dependencies": {
    "react-hook-form": "^7.50.0",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.4"
  }
}
```

### Utilities
```json
{
  "dependencies": {
    "date-fns": "^3.3.0",
    "use-debounce": "^10.0.0",
    "@tanstack/react-virtual": "^3.0.0"
  }
}
```

---

## 🎓 Design References

### Inspiration Sources

**1. Stripe Dashboard**
- Clean form layouts
- Real-time validation feedback
- Progressive disclosure
- Micro-interactions

**2. Vercel Deploy Flow**
- Step-by-step progression
- Live preview panels
- Celebration animations
- Clear status indicators

**3. Linear Issue Creation**
- Keyboard shortcuts
- Fast inline editing
- Smart autocomplete
- Command palette pattern

**4. Framer**
- Smooth animations
- Transition choreography
- Gesture-based interactions
- Playful micro-interactions

**5. Robinhood**
- Financial data visualization
- Risk indicators
- Clean charts
- Mobile-first design

---

## ✅ Implementation Checklist

### Phase 1: Foundation (Week 1)
- [ ] Set up component architecture
- [ ] Implement mode selection screen
- [ ] Create base layout for both modes
- [ ] Set up state management (Zustand)
- [ ] Implement routing
- [ ] Add basic animations (page transitions)

### Phase 2: Simple Mode (Week 2)
- [ ] Build chat interface layout
- [ ] Implement AI message bubbles
- [ ] Create quick reply buttons
- [ ] Build live preview panel
- [ ] Implement conversation flow logic
- [ ] Add strategy template cards
- [ ] Create risk gauge component
- [ ] Implement validation logic

### Phase 3: Pro Mode (Week 3)
- [ ] Build tab navigation
- [ ] Create strategy configuration section
- [ ] Build risk management section
- [ ] Implement technical setup section
- [ ] Create backtesting section
- [ ] Build performance chart
- [ ] Implement form validation
- [ ] Add JSON preview

### Phase 4: Shared Components (Week 4)
- [ ] Create reusable strategy cards
- [ ] Build bot configuration card
- [ ] Implement validation status component
- [ ] Create progress steps component
- [ ] Build trade history table
- [ ] Add filter and search functionality

### Phase 5: Polish & Animations (Week 5)
- [ ] Add all micro-interactions
- [ ] Implement success celebration
- [ ] Add confetti animation
- [ ] Polish loading states
- [ ] Add skeleton loaders
- [ ] Implement chart animations
- [ ] Add sound effects (optional)

### Phase 6: Accessibility & Testing (Week 6)
- [ ] Audit keyboard navigation
- [ ] Add ARIA labels
- [ ] Test screen reader compatibility
- [ ] Implement focus management
- [ ] Add reduced motion support
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Conduct user testing

---

## 📚 Additional Notes

### Design Decisions Rationale

**Why split-screen layout?**
- Reduces cognitive load by showing preview alongside input
- Builds confidence through immediate visual feedback
- Matches mental model of "configure → see result"

**Why chat interface for simple mode?**
- Familiar pattern (everyone knows ChatGPT)
- Reduces form intimidation
- Guides users step-by-step
- Feels conversational and friendly
- Easy to add personality

**Why dashboard for pro mode?**
- Power users expect full visibility
- Faster navigation between sections
- Can see all settings at once
- Matches trading platform patterns

**Why mandatory backtesting?**
- Builds trust through data
- Prevents "hope-based" trading
- Educational (shows historical performance)
- Sets realistic expectations

**Why paper trading default?**
- Zero financial risk for beginners
- Encourages experimentation
- Builds confidence before real money
- Reduces user anxiety

---

## 🚀 Future Enhancements

### V2 Features
- **Template Marketplace:** Share and import community templates
- **Social Features:** See what strategies others are using
- **Advanced Charts:** Multi-timeframe analysis, more indicators
- **Bot Comparison:** Compare multiple bots side-by-side
- **Strategy Builder:** Visual flow chart for custom strategies
- **AI Tuning:** Let AI optimize existing bots
- **Mobile App:** Native iOS/Android experience
- **Voice Control:** Create bots with voice commands
- **AR Dashboard:** View bot performance in AR

### Animation Enhancements
- **Sound effects:** Subtle audio feedback (toggle in settings)
- **Haptics:** Mobile vibration feedback
- **Particle effects:** More celebration options
- **Lottie animations:** Complex animated illustrations
- **3D visuals:** Three.js bot visualizations

---

## 📞 Support Resources

### For Developers
- shadcn/ui docs: https://ui.shadcn.com
- Framer Motion docs: https://www.framer.com/motion
- Recharts docs: https://recharts.org
- Zustand docs: https://zustand-demo.pmnd.rs

### For Designers
- Figma file: (Create design mockups)
- Design tokens: (Export to Figma Variables)
- Component library: (Storybook deployment)
- Style guide: (Living documentation)

---

**End of UI/UX Specification**

This comprehensive spec provides everything needed to implement a world-class bot creation experience. The design prioritizes user confidence, progressive disclosure, and delightful interactions while maintaining accessibility and performance standards.

Focus on implementing one mode at a time, starting with the simpler mode first to validate the core UX patterns before tackling the more complex pro mode.

Remember: The goal is to make algorithmic trading feel accessible, not intimidating. Every design decision should reduce anxiety and build confidence.

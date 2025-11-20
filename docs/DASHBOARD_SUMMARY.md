# Dashboard PRD - Executive Summary

**Quick 2-Minute Overview**

---

## What We're Building

Rebuild the **TradingBot Dashboard (home page)** from a placeholder template into a production-ready central hub that:

1. Shows portfolio health at a glance (4 stat cards)
2. Displays 3-4 most recent bots with performance
3. Guides new users with clear empty state
4. Provides quick access to bot creation

---

## Why Now?

- Dashboard is currently a **shadcn/ui template placeholder** with no real data
- Users land here after login and don't know what to do
- Fully functional `/dashboard/bots` page exists with BotCard component
- Database schema is complete with all needed data
- **No technical blockers** - ready to implement

---

## Success Criteria

**For New Users:**
- 90%+ click "Create Bot" within 30 seconds
- Clear path forward, no confusion

**For Returning Users:**
- See portfolio status in < 5 seconds
- Quick access to bot details

**Technical:**
- Page loads < 1 second
- Mobile responsive
- No layout shifts

---

## What's Included

### 1. Quick Stats Cards (Top Priority)

```
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Balance │ │ Active  │ │ Total   │ │ Win     │
│ $10,000 │ │ 3 bots  │ │ +$450   │ │ Rate 68%│
└─────────┘ └─────────┘ └─────────┘ └─────────┘
```

### 2. Recent Bots Section

- Shows 3-4 most recently created/active bots
- Uses existing `BotCard` component (no changes needed)
- "View All Bots" link to full list
- Responsive grid layout

### 3. Empty State (New Users)

```
        Welcome to TradingBot, Jordan!

   Create your first AI-powered trading bot

        Getting Started:
        1. Choose strategy
        2. Configure bot
        3. Start trading

        [Create Your First Bot]
```

### 4. Welcome Header

- Personalized greeting
- Last login time
- Create Bot button

---

## What's NOT Included (Future)

- Real-time P&L charts (Phase 3)
- Trade activity feed (Phase 3)
- Advanced analytics (Phase 4)
- Dashboard customization (Phase 5)

---

## Effort Estimate

**3-4 days** (solo developer)

**Breakdown:**
- Day 1: API endpoint + stats cards
- Day 2: Recent bots section
- Day 3: Empty state + header
- Day 4: Polish + testing

---

## Technical Overview

**Stack:**
- Next.js 15 (App Router)
- React 19 (client components)
- Existing `useBots` hook
- Existing `BotCard` component
- TailwindCSS + shadcn/ui

**New Components:**
- `StatsCard.tsx` (4 instances)
- `DashboardStats.tsx` (grid container)
- `RecentBots.tsx` (bot list with header)
- `DashboardEmptyState.tsx` (new user experience)
- `DashboardHeader.tsx` (welcome + actions)

**New API:**
- `GET /api/dashboard` (single endpoint for all data)

**New Hook:**
- `useDashboard.ts` (fetch dashboard data)

---

## Data Requirements

### Stats Calculations

1. **Total Balance**
   - `paper_trading_balance + sum(bot.capital_allocated)`

2. **Active Bots**
   - `count(bots WHERE status = 'active')`

3. **Total P&L**
   - `sum(bot.total_pnl)` across all bots

4. **Win Rate**
   - `sum(winning_trades) / sum(total_trades) * 100`

### Recent Bots Query

```sql
SELECT * FROM bots
WHERE user_id = ?
  AND is_template = false
ORDER BY
  CASE WHEN status = 'active' THEN 0 ELSE 1 END,
  created_at DESC
LIMIT 4
```

---

## User Flows

### Flow 1: New User
```
Login → Dashboard → Empty State → "Create Bot" → Bot Creation
```

### Flow 2: Returning User
```
Login → Dashboard → Scan Stats (3s) → Click "View All Bots" → Bot List
```

### Flow 3: Mobile User
```
Login → Dashboard (mobile) → Scroll stats → Tap bot card → Bot Details
```

---

## Key Design Decisions

### Why These Stats?

1. **Total Balance** - Most important number (paper trading + allocated)
2. **Active Bots** - Shows automation level
3. **Total P&L** - Performance indicator
4. **Win Rate** - Quality of strategies

### Why 3-4 Recent Bots?

- Enough to see activity without overwhelming
- Fits well on desktop (3-4 columns)
- Encourages "View All" click for more

### Why Empty State Instead of Blank Stats?

- New users need guidance, not empty boxes
- Clear value proposition upfront
- Reduces cognitive load
- Increases activation rate

---

## Implementation Priority

**Must Have (Day 1-3):**
- Stats cards with correct calculations
- Recent bots section
- Empty state for new users
- Basic loading/error states

**Nice to Have (Day 4):**
- Smooth animations
- Trend indicators (up/down arrows)
- Count-up animations for numbers
- Hover effects

**Future (Phase 2.5+):**
- Sparkline charts in stats
- Change vs yesterday/week
- Activity feed
- Quick actions panel

---

## Dependencies

### Already Complete ✅
- Database schema (bots, profiles tables)
- `useBots` hook
- `BotCard` component
- `/dashboard/bots` page
- Authentication system

### Needs to be Built 🔧
- Dashboard API endpoint
- Dashboard components (5 new)
- `useDashboard` hook
- Empty state content

---

## Risks & Mitigations

### Risk 1: Stats Calculation Performance
- **Mitigation:** Use database indexes, optimize queries
- **Fallback:** Cache stats for 30 seconds

### Risk 2: Empty State Overwhelming
- **Mitigation:** Keep messaging simple, 3 steps max
- **Fallback:** Just show big CTA button

### Risk 3: Mobile Layout Breaks
- **Mitigation:** Test on real devices early
- **Fallback:** Force vertical stacking on mobile

---

## Success Metrics (Week 1)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load Time | < 1s | Performance API |
| New User Activation | 85% | "Create Bot" clicks |
| Returning User Engagement | 60% | Any dashboard interaction |
| Mobile Usage | 30% | Device type |
| Error Rate | < 0.1% | Error logs |

---

## Next Steps

1. **Review PRD** - Read full DASHBOARD_PRD.md (20 min)
2. **Check Visual Spec** - Reference DASHBOARD_VISUAL_SPEC.md (10 min)
3. **Start Implementation** - Follow Phase 1 in PRD (Day 1)
4. **Test Early** - Manual test on mobile after Day 1
5. **Deploy** - Push to production after Day 4

---

## Related Documents

- **Full PRD:** `docs/DASHBOARD_PRD.md` (detailed requirements)
- **Visual Spec:** `docs/DASHBOARD_VISUAL_SPEC.md` (layout reference)
- **Phase 2 Plan:** `progress/phase2-plan.md` (context)
- **Main PRD:** `docs/PRD.md` (overall product)

---

## Questions to Answer Before Starting

1. **Do we have user display names in profiles table?**
   - Yes → Use display_name
   - No → Use email.split('@')[0]

2. **Should stats be clickable?**
   - Suggested: Yes (link to relevant pages)
   - Fallback: No (just display)

3. **Empty state illustration?**
   - Nice to have: Bot icon or custom illustration
   - Minimum: Just emoji 🤖

4. **Animation level?**
   - Full: Fade ins, stagger, hover effects
   - Minimal: Just loading skeletons

---

## Ready to Implement?

**Checklist:**
- [ ] Read full DASHBOARD_PRD.md
- [ ] Check DASHBOARD_VISUAL_SPEC.md
- [ ] Confirm database schema is deployed
- [ ] Test existing /dashboard/bots page works
- [ ] Verify BotCard component renders correctly
- [ ] Set up development environment
- [ ] Create feature branch: `feature/dashboard-home`

**Estimated Time:** 3-4 days
**Complexity:** Medium (well-defined, clear scope)
**Blocker Risk:** Low (all dependencies met)

---

**Let's build a dashboard that users love! 🚀**

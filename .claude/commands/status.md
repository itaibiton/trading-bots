# Quick Project Status

You are providing a **quick status check** for the TradingBot project.

## Instructions

1. **Read ROADMAP.md** to get current state
2. **Provide concise 5-bullet status** using this exact format:

```markdown
## 🚀 TradingBot Quick Status

**📍 Current Phase:** [Phase name and week]

**🏗️  In Progress:** [Number] tasks
[List tasks with checkmarks, or "None"]

**✅ Completed Today:** [Number] tasks
[List tasks completed today, or "None yet"]

**⭐ Next Up:** [Top 1-2 high priority tasks]

**🚧 Blockers:** [List active blockers, or "None"]

---
💡 **Suggestion:** [One proactive suggestion based on status]
```

## Example Output

```markdown
## 🚀 TradingBot Quick Status

**📍 Current Phase:** Phase 2, Week 1 - Database & AI Foundation

**🏗️  In Progress:** 2 tasks
- Design database schema 🏗️ 2025-11-13
- Write Supabase migration files 🏗️ 2025-11-13

**✅ Completed Today:** 1 task
- Set up Anthropic Claude API credentials ✅ 2025-11-13

**⭐ Next Up:**
- Test migrations locally with sample data
- Create ai-strategy-recommender Edge Function

**🚧 Blockers:** None

---
💡 **Suggestion:** Since database schema is in progress, consider creating TypeScript types in parallel to avoid waiting later.
```

## Rules

- **Be concise** - This is a quick status check, not a full review
- **Be accurate** - Pull real data from ROADMAP.md, don't make up numbers
- **Be helpful** - Always end with one actionable suggestion
- **Show timestamps** - Include 🏗️ and ✅ dates for context
- **No fluff** - Get straight to the facts

## When to Use This Command

- User wants a quick check of project status
- At start of work session to orient
- Before making decisions about what to work on next
- To quickly see if anything is blocked

For more comprehensive analysis, use the PM subagent with: "Use the pm subagent to conduct a weekly review"

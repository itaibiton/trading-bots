#!/bin/bash
# TradingBot Project Manager - SessionStart Hook
# Automatically injects project context at every Claude Code session start
# Execution time: ~100-200ms

echo "╔════════════════════════════════════════════════════════════╗"
echo "║        TRADINGBOT PROJECT MANAGER CONTEXT                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 1. Current Phase & Status
echo "## 📍 Current Phase"
if [ -f "ROADMAP.md" ]; then
  # Extract phase header and progress
  awk '/^## Phase [0-9]/ {p=1; print; next} p && /^##/ {exit} p && /^\*\*/ {print}' ROADMAP.md | head -4
else
  echo "⚠️  ROADMAP.md not found"
fi
echo ""

# 2. Active Tasks (In Progress)
echo "## 🏗️  Active Tasks (In Progress)"
if [ -f "ROADMAP.md" ]; then
  in_progress=$(grep -E "^- \[-\]" ROADMAP.md)
  if [ -n "$in_progress" ]; then
    echo "$in_progress"
  else
    echo "✓ No tasks currently in progress"
  fi
else
  echo "⚠️  ROADMAP.md not found"
fi
echo ""

# 3. High Priority Next Up
echo "## ⭐ High Priority Next Up"
if [ -f "ROADMAP.md" ]; then
  # Extract tasks under "High Priority" section
  high_priority=$(awk '/^#### High Priority/,/^####/ {if (/^- \[ \]/) print}' ROADMAP.md | head -3)
  if [ -n "$high_priority" ]; then
    echo "$high_priority"
  else
    echo "✓ No high priority tasks pending"
  fi
else
  echo "⚠️  ROADMAP.md not found"
fi
echo ""

# 4. Recent Completions (Last 3)
echo "## ✅ Recent Completions"
if [ -f "ROADMAP.md" ]; then
  recent=$(grep -E "^- \[x\]" ROADMAP.md | head -3)
  if [ -n "$recent" ]; then
    echo "$recent"
  else
    echo "No recent completions yet"
  fi
else
  echo "⚠️  ROADMAP.md not found"
fi
echo ""

# 5. Git Status (show uncommitted changes)
echo "## 📝 Git Status"
if [ -d ".git" ]; then
  # Check if there are any changes
  if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "Modified files:"
    git status --short | head -10
  else
    echo "✓ No uncommitted changes"
  fi
else
  echo "⚠️  Not a git repository"
fi
echo ""

# 6. Active Blockers
echo "## 🚧 Active Blockers"
if [ -f "ROADMAP.md" ]; then
  # Extract blocker section
  blockers=$(awk '/^### Current Blockers/,/^###/ {if (!/^###/ && !/^$/) print}' ROADMAP.md | grep -v "^$")
  if [ -n "$blockers" ]; then
    echo "$blockers"
  else
    echo "✓ No active blockers"
  fi
else
  echo "⚠️  ROADMAP.md not found"
fi
echo ""

# 7. Milestones Progress (Current Phase)
echo "## 🎯 Current Week Milestone"
if [ -f "ROADMAP.md" ]; then
  # Extract current week section (Week 1, Week 2, or Week 3)
  current_week=$(awk '/^### Week [0-9].*\(Nov [0-9]/ {print; getline; print; exit}' ROADMAP.md)
  if [ -n "$current_week" ]; then
    echo "$current_week"
  else
    echo "No current week milestone found"
  fi
else
  echo "⚠️  ROADMAP.md not found"
fi
echo ""

# 8. PM Instructions Reminder
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  📋 REMEMBER: Always check ROADMAP.md first!              ║"
echo "║  📊 Update task states as work progresses                 ║"
echo "║  💡 Proactively suggest next steps based on priorities    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Success indicator
echo "✅ Project Manager context loaded successfully"
echo ""

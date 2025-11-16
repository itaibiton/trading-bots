# AI Chat Troubleshooting Guide

## Current Error: CORS + 500 Internal Server Error

### Quick Diagnosis Checklist

#### 1. Check Edge Function Logs (MOST IMPORTANT)
**Dashboard:** https://supabase.com/dashboard/project/xhwjwqlefhtcfhubmokw/logs/functions

**What to look for:**
- `[CONFIG] Missing ANTHROPIC_API_KEY` ← Most likely!
- `[AUTH] Missing authorization header`
- `[DB] Failed to create conversation`
- Any error stack traces

#### 2. Verify Environment Variables
**Dashboard:** https://supabase.com/dashboard/project/xhwjwqlefhtcfhubmokw/settings/functions

**Required Environment Variables:**
```
Name: ANTHROPIC_API_KEY
Value: sk-ant-api03-... (your Claude API key from https://console.anthropic.com)
Scope: All functions
```

**How to Add:**
1. Click "+ Add variable"
2. Name: `ANTHROPIC_API_KEY`
3. Value: Your Claude API key
4. Click "Save"
5. **IMPORTANT:** Redeploy the Edge Function after adding

#### 3. Deploy/Redeploy Edge Function
**Dashboard:** https://supabase.com/dashboard/project/xhwjwqlefhtcfhubmokw/functions

**If ai-chat doesn't exist:**
1. Click "Create function"
2. Name: `ai-chat`
3. Copy ALL content from `/Users/itaibiton/Code/kohelet-bots/supabase/functions/ai-chat/index.ts`
4. Paste into editor
5. Deploy

**If ai-chat exists:**
1. Click on `ai-chat` function
2. Click "Edit"
3. Replace code with latest from `supabase/functions/ai-chat/index.ts`
4. Deploy

#### 4. Test Connection
After deploying with environment variables:

1. Open browser console (F12)
2. Clear console
3. Try sending a message in AI chat
4. Check for new logs:
   - ✅ `[AI Chat Client] Sending message`
   - ✅ `[AI Chat Client] Response status: 200`
   - OR specific error message

---

## Common Issues & Solutions

### Issue 1: Missing ANTHROPIC_API_KEY ⚠️ MOST COMMON
**Symptom:** 500 error immediately when trying to send message
**Logs show:** `[CONFIG] Missing ANTHROPIC_API_KEY environment variable`

**Solution:**
1. Get API key: https://console.anthropic.com/settings/keys
2. Add to Supabase: Dashboard → Settings → Edge Functions → Environment Variables
3. Redeploy Edge Function

### Issue 2: CORS Error on 500 Response
**Symptom:** "No 'Access-Control-Allow-Origin' header"
**Cause:** Old Edge Function code OR error before response is sent

**Solution:**
1. Redeploy Edge Function with latest code (includes CORS on all responses)
2. Check logs to see actual error

### Issue 3: Authentication Failed
**Symptom:** 401 Unauthorized
**Logs show:** `[AUTH] Authentication failed`

**Solution:**
1. Refresh the page
2. Sign out and sign back in
3. Check Supabase auth status

### Issue 4: Database Connection Failed
**Symptom:** "Failed to create conversation"
**Logs show:** `[DB] Failed to create conversation`

**Solution:**
1. Check RLS policies on `ai_conversations` table
2. Verify user is authenticated
3. Check database connection

---

## Environment Variable Reference

### ANTHROPIC_API_KEY (REQUIRED)
- **Purpose:** Allows Edge Function to call Claude API
- **Where to get:** https://console.anthropic.com/settings/keys
- **Format:** `sk-ant-api03-...` (starts with sk-ant)
- **Scope:** All functions
- **Cost:** ~$0.003 per message (Claude 3.5 Sonnet)

### Auto-Configured (Don't need to set)
- `SUPABASE_URL` - Auto-set by Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Auto-set by Supabase
- `SUPABASE_ANON_KEY` - Auto-set by Supabase

---

## Testing Checklist

After applying fixes:

- [ ] Environment variables set in Supabase Dashboard
- [ ] Edge Function deployed with latest code
- [ ] Browser console shows `[AI Chat Client]` logs
- [ ] No CORS errors
- [ ] AI responds to messages OR shows specific error
- [ ] Supabase logs show detailed error tags (`[AUTH]`, `[DB]`, etc.)

---

## Getting Help

If still stuck:

1. **Check logs:** https://supabase.com/dashboard/project/xhwjwqlefhtcfhubmokw/logs/functions
2. **Copy error message** from logs and browser console
3. **Check this file:** Look for matching symptom in "Common Issues"
4. **Environment variables:** Double-check all required vars are set

## Quick Links

- **Supabase Dashboard:** https://supabase.com/dashboard/project/xhwjwqlefhtcfhubmokw
- **Edge Functions:** https://supabase.com/dashboard/project/xhwjwqlefhtcfhubmokw/functions
- **Function Logs:** https://supabase.com/dashboard/project/xhwjwqlefhtcfhubmokw/logs/functions
- **Environment Vars:** https://supabase.com/dashboard/project/xhwjwqlefhtcfhubmokw/settings/functions
- **Anthropic Console:** https://console.anthropic.com

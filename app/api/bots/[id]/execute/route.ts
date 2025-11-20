/**
 * Bot Execute API Route
 *
 * POST /api/bots/[id]/execute
 * Triggers manual execution of a bot's trading strategy.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: botId } = await params
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify bot exists and belongs to user
    const { data: bot, error: botError } = await supabase
      .from('bots')
      .select('id, status, user_id')
      .eq('id', botId)
      .eq('user_id', user.id)
      .single()

    if (botError || !bot) {
      return NextResponse.json(
        { success: false, error: 'Bot not found' },
        { status: 404 }
      )
    }

    if (bot.status !== 'active') {
      return NextResponse.json(
        { success: false, error: `Bot must be active to execute. Current status: ${bot.status}` },
        { status: 400 }
      )
    }

    // Get session for token
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'No active session' },
        { status: 401 }
      )
    }

    // Call the execute-bot Edge Function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const response = await fetch(`${supabaseUrl}/functions/v1/execute-bot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ botId }),
    })

    const result = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: result.error || 'Execution failed' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      ...result,
    })

  } catch (error) {
    console.error('Bot execute error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to execute bot' },
      { status: 500 }
    )
  }
}

/**
 * API Route: GET /api/trades
 *
 * Fetches user's trade history with pagination.
 * Query params: ?limit=50&offset=0&pair=BTCUSDT&mode=paper
 */

import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse query params
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')
    const pair = searchParams.get('pair')?.toUpperCase()
    const mode = searchParams.get('mode') as 'paper' | 'live' | null

    // Build query
    let query = supabase
      .from('trades')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('executed_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (pair) {
      query = query.eq('trading_pair', pair)
    }

    if (mode) {
      query = query.eq('trading_mode', mode)
    }

    const { data: trades, error: queryError, count } = await query

    if (queryError) {
      console.error('Trade fetch error:', queryError)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch trades' },
        { status: 500 }
      )
    }

    // Transform to frontend format
    const formattedTrades = (trades || []).map(trade => ({
      id: trade.id,
      side: trade.side,
      tradingPair: trade.trading_pair,
      tradingMode: trade.trading_mode,
      executedAt: trade.executed_at,
      price: trade.price,
      quantity: trade.quantity,
      totalValue: trade.total_value,
      fee: trade.fee,
      feeCurrency: trade.fee_currency,
      pnl: trade.pnl,
      pnlPercentage: trade.pnl_percentage,
      botId: trade.bot_id,
      strategyType: trade.strategy_type,
      executionReason: trade.execution_reason,
    }))

    return NextResponse.json({
      success: true,
      data: {
        trades: formattedTrades,
        total: count || 0,
        limit,
        offset,
      }
    })
  } catch (error: any) {
    console.error('Trade history error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch trade history',
      },
      { status: 500 }
    )
  }
}

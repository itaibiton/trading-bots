/**
 * API Route: POST /api/binance/trade
 *
 * Execute a paper trade with realistic simulation.
 * Updates paper balance and records trade in database.
 */

import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { MainClient } from 'binance'
import {
  SUPPORTED_TRADING_PAIRS,
  type TradeRequest,
  type SupportedTradingPair,
} from '@/lib/binance/types'
import { calculatePaperTrade } from '@/lib/trading/paper-trading'
import { validateTradeOrder } from '@/lib/trading/validation'

export async function POST(request: NextRequest) {
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

    // Parse request body
    const body: TradeRequest = await request.json()
    const { side, tradingPair, quantity } = body

    // Basic validation
    if (!side || !tradingPair || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: side, tradingPair, quantity' },
        { status: 400 }
      )
    }

    if (!['buy', 'sell'].includes(side)) {
      return NextResponse.json(
        { success: false, error: 'Side must be "buy" or "sell"' },
        { status: 400 }
      )
    }

    // Validate trading pair
    const normalizedPair = tradingPair.toUpperCase()
    if (!SUPPORTED_TRADING_PAIRS.includes(normalizedPair as SupportedTradingPair)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported trading pair: ${tradingPair}`
        },
        { status: 400 }
      )
    }

    // Get user's paper balance
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('paper_balance')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      console.error('Profile fetch error:', profileError)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch user profile' },
        { status: 500 }
      )
    }

    const availableBalance = profile.paper_balance || 10000

    // Get current market price from Binance
    const apiKey = process.env.BINANCE_TESTNET_API_KEY || process.env.BINANCE_API_KEY
    const secretKey = process.env.BINANCE_TESTNET_SECRET_KEY || process.env.BINANCE_SECRET_KEY
    const useTestnet = !!(process.env.BINANCE_TESTNET_API_KEY && process.env.BINANCE_TESTNET_SECRET_KEY)

    if (!apiKey || !secretKey) {
      return NextResponse.json(
        { success: false, error: 'Binance API keys not configured' },
        { status: 500 }
      )
    }

    const client = new MainClient({
      api_key: apiKey,
      api_secret: secretKey,
      testnet: useTestnet,
    })

    const ticker = await client.getSymbolPriceTicker({ symbol: normalizedPair })
    const priceData = Array.isArray(ticker) ? ticker[0] : ticker
    const marketPrice = parseFloat(priceData.price)

    // Validate the trade order
    const validation = validateTradeOrder({
      side,
      tradingPair: normalizedPair,
      quantity,
      price: marketPrice,
      availableBalance,
    })

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    // Calculate trade with slippage and fees
    const tradeResult = calculatePaperTrade({
      side,
      tradingPair: normalizedPair as SupportedTradingPair,
      quantity,
      marketPrice,
    })

    // Calculate new balance
    let newBalance: number
    if (side === 'buy') {
      newBalance = availableBalance - tradeResult.netAmount
    } else {
      newBalance = availableBalance + tradeResult.netAmount
    }

    // Start transaction: update balance and insert trade
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({ paper_balance: newBalance })
      .eq('id', user.id)
      .select('paper_balance')
      .single()

    if (updateError) {
      console.error('Balance update error:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update balance' },
        { status: 500 }
      )
    }

    // Insert trade record
    const { data: trade, error: tradeError } = await supabase
      .from('trades')
      .insert({
        bot_id: null, // Manual trade
        user_id: user.id,
        side,
        trading_pair: normalizedPair,
        trading_mode: 'paper',
        executed_at: new Date().toISOString(),
        price: tradeResult.executedPrice,
        quantity,
        total_value: tradeResult.totalValue,
        fee: tradeResult.fee,
        fee_currency: 'USDT',
        exchange: 'binance',
        exchange_order_id: null,
        strategy_type: 'manual',
        execution_reason: 'Manual paper trade',
      })
      .select('id')
      .single()

    if (tradeError) {
      console.error('Trade insert error:', tradeError)
      // Note: Balance was already updated, but trade wasn't recorded
      // In production, this should be a proper transaction
      return NextResponse.json(
        { success: false, error: 'Failed to record trade' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        tradeId: trade.id,
        side,
        tradingPair: normalizedPair,
        executedPrice: tradeResult.executedPrice,
        quantity,
        totalValue: tradeResult.totalValue,
        fee: tradeResult.fee,
        feeCurrency: 'USDT',
        newBalance: updatedProfile.paper_balance,
        executedAt: new Date().toISOString(),
      }
    })
  } catch (error: any) {
    console.error('Trade execution error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Trade execution failed',
      },
      { status: 500 }
    )
  }
}

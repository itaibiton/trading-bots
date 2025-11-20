/**
 * API Route: GET /api/binance/price
 *
 * Fetches current price for a trading pair from Binance.
 * Query param: ?symbol=BTCUSDT
 */

import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { MainClient } from 'binance'
import { SUPPORTED_TRADING_PAIRS, type SupportedTradingPair } from '@/lib/binance/types'

export async function GET(request: NextRequest) {
  try {
    // Get symbol from query params
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol')?.toUpperCase()

    if (!symbol) {
      return NextResponse.json(
        { success: false, error: 'Symbol query parameter is required' },
        { status: 400 }
      )
    }

    // Validate symbol
    if (!SUPPORTED_TRADING_PAIRS.includes(symbol as SupportedTradingPair)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported trading pair: ${symbol}. Supported: ${SUPPORTED_TRADING_PAIRS.join(', ')}`
        },
        { status: 400 }
      )
    }

    // Check authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get API keys from environment
    const apiKey = process.env.BINANCE_TESTNET_API_KEY || process.env.BINANCE_API_KEY
    const secretKey = process.env.BINANCE_TESTNET_SECRET_KEY || process.env.BINANCE_SECRET_KEY
    const useTestnet = !!(process.env.BINANCE_TESTNET_API_KEY && process.env.BINANCE_TESTNET_SECRET_KEY)

    if (!apiKey || !secretKey) {
      return NextResponse.json(
        { success: false, error: 'Binance API keys not configured' },
        { status: 500 }
      )
    }

    // Initialize Binance client
    const client = new MainClient({
      api_key: apiKey,
      api_secret: secretKey,
      testnet: useTestnet,
    })

    // Fetch current price
    const ticker = await client.getSymbolPriceTicker({ symbol })

    // Handle array response (shouldn't happen for single symbol, but be safe)
    const priceData = Array.isArray(ticker) ? ticker[0] : ticker

    return NextResponse.json({
      success: true,
      data: {
        symbol: priceData.symbol,
        price: parseFloat(String(priceData.price)),
        timestamp: new Date().toISOString(),
      }
    })
  } catch (error: any) {
    console.error('Price fetch error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch price',
      },
      { status: 500 }
    )
  }
}

// Cache for 5 seconds to prevent excessive API calls
export const revalidate = 5

// @ts-nocheck

/**
 * Bot Execution Edge Function
 *
 * Executes trading strategy for a specific bot.
 * - Loads bot configuration
 * - Gets current market price
 * - Executes strategy logic (DCA, Grid)
 * - Creates paper trades
 * - Updates bot metrics
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Bot {
  id: string;
  user_id: string;
  name: string;
  strategy_type: 'dca' | 'grid' | 'momentum' | 'mean-reversion';
  status: string;
  trading_mode: 'paper' | 'live';
  trading_pair: string;
  capital_allocated: number;
  risk_level: string;
  stop_loss_percentage: number;
  take_profit_percentage: number;
  max_daily_loss: number;
  max_position_size: number;
  strategy_params: Record<string, any>;
  total_pnl: number;
  total_trades: number;
  win_rate: number;
  error_count: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();

  try {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return jsonResponse({ error: 'Missing authorization token' }, 401);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: 'Server configuration error' }, 500);
    }

    // Use service role for bot execution (needs to update user balance)
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Verify user token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return jsonResponse({ error: 'Unauthorized' }, 401);
    }

    const { botId } = await req.json();

    if (!botId) {
      return jsonResponse({ error: 'Bot ID is required' }, 400);
    }

    // Load bot
    const { data: bot, error: botError } = await supabase
      .from('bots')
      .select('*')
      .eq('id', botId)
      .eq('user_id', user.id)
      .single();

    if (botError || !bot) {
      return jsonResponse({ error: 'Bot not found' }, 404);
    }

    if (bot.status !== 'active') {
      return jsonResponse({ error: `Bot is ${bot.status}, not active` }, 400);
    }

    // Get current price from Binance
    const price = await getCurrentPrice(bot.trading_pair);
    if (!price) {
      await logBotExecution(supabase, bot, 'error', 'Failed to get market price');
      return jsonResponse({ error: 'Failed to get market price' }, 500);
    }

    // Execute strategy
    let result;
    try {
      switch (bot.strategy_type) {
        case 'dca':
          result = await executeDCA(supabase, bot, price, user.id);
          break;
        case 'grid':
          result = await executeGrid(supabase, bot, price, user.id);
          break;
        default:
          result = { executed: false, reason: `Strategy ${bot.strategy_type} not implemented yet` };
      }
    } catch (strategyError) {
      const errorMessage = strategyError instanceof Error ? strategyError.message : 'Strategy execution failed';
      await logBotExecution(supabase, bot, 'error', errorMessage);

      // Increment error count
      await supabase
        .from('bots')
        .update({
          error_count: bot.error_count + 1,
          error_message: errorMessage,
          status: bot.error_count >= 4 ? 'error' : bot.status // Auto-pause after 5 errors
        })
        .eq('id', bot.id);

      return jsonResponse({ error: errorMessage }, 500);
    }

    // Calculate next execution time
    const nextExecution = calculateNextExecution(bot);

    // Update bot
    await supabase
      .from('bots')
      .update({
        last_execution_at: new Date().toISOString(),
        next_execution_at: nextExecution,
        error_count: 0, // Reset on success
        error_message: null,
      })
      .eq('id', bot.id);

    // Log successful execution
    await logBotExecution(supabase, bot, 'info', result.executed
      ? `Executed ${result.side} trade: ${result.quantity} @ $${price}`
      : result.reason
    );

    return jsonResponse({
      success: true,
      result,
      nextExecution,
    });

  } catch (error) {
    console.error(`[execute-bot][${requestId}] Error:`, error);
    return jsonResponse({
      error: error instanceof Error ? error.message : 'Execution failed',
    }, 500);
  }
});

/**
 * Get current price from Binance
 */
async function getCurrentPrice(tradingPair: string): Promise<number | null> {
  try {
    const symbol = tradingPair.replace('/', '');
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );

    if (!response.ok) {
      console.error('Binance API error:', response.status);
      return null;
    }

    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.error('Failed to get price:', error);
    return null;
  }
}

/**
 * Execute DCA Strategy
 * Buys a fixed amount at regular intervals
 */
async function executeDCA(
  supabase: any,
  bot: Bot,
  currentPrice: number,
  userId: string
): Promise<{ executed: boolean; side?: string; quantity?: number; reason?: string }> {
  const params = bot.strategy_params;
  const buyAmount = params.buyAmount || bot.capital_allocated * 0.05;

  // Check if we have enough balance
  const { data: profile } = await supabase
    .from('profiles')
    .select('paper_balance')
    .eq('id', userId)
    .single();

  if (!profile || profile.paper_balance < buyAmount) {
    return { executed: false, reason: 'Insufficient balance for DCA buy' };
  }

  // Calculate quantity
  const quantity = buyAmount / currentPrice;

  // Apply slippage (0.1%)
  const executionPrice = currentPrice * 1.001;
  const totalValue = quantity * executionPrice;
  const fee = totalValue * 0.001; // 0.1% fee

  // Create trade
  const { error: tradeError } = await supabase
    .from('trades')
    .insert({
      bot_id: bot.id,
      user_id: userId,
      side: 'buy',
      trading_pair: bot.trading_pair.replace('/', ''),
      trading_mode: bot.trading_mode,
      price: executionPrice,
      quantity,
      total_value: totalValue,
      fee,
      strategy_type: bot.strategy_type,
      execution_reason: 'DCA scheduled buy',
    });

  if (tradeError) {
    throw new Error(`Failed to create trade: ${tradeError.message}`);
  }

  // Update user balance (paper trading)
  if (bot.trading_mode === 'paper') {
    await supabase
      .from('profiles')
      .update({
        paper_balance: profile.paper_balance - totalValue - fee,
      })
      .eq('id', userId);
  }

  // Update bot metrics
  await supabase
    .from('bots')
    .update({
      total_trades: bot.total_trades + 1,
    })
    .eq('id', bot.id);

  return {
    executed: true,
    side: 'buy',
    quantity,
  };
}

/**
 * Execute Grid Strategy
 * Places buy/sell orders at grid levels
 */
async function executeGrid(
  supabase: any,
  bot: Bot,
  currentPrice: number,
  userId: string
): Promise<{ executed: boolean; side?: string; quantity?: number; reason?: string }> {
  const params = bot.strategy_params;
  const gridLevels = params.gridLevels || 10;
  const investmentPerGrid = params.investmentPerGrid || bot.capital_allocated / gridLevels;

  // Get user balance
  const { data: profile } = await supabase
    .from('profiles')
    .select('paper_balance')
    .eq('id', userId)
    .single();

  if (!profile) {
    return { executed: false, reason: 'Could not fetch user profile' };
  }

  // Simple grid logic: buy when price drops below a threshold
  // In a real implementation, we'd track grid levels and positions

  // For MVP: Just do a small buy if we have balance
  if (profile.paper_balance < investmentPerGrid) {
    return { executed: false, reason: 'Insufficient balance for grid buy' };
  }

  const quantity = investmentPerGrid / currentPrice;
  const executionPrice = currentPrice * 1.001; // Slippage
  const totalValue = quantity * executionPrice;
  const fee = totalValue * 0.001;

  // Create trade
  const { error: tradeError } = await supabase
    .from('trades')
    .insert({
      bot_id: bot.id,
      user_id: userId,
      side: 'buy',
      trading_pair: bot.trading_pair.replace('/', ''),
      trading_mode: bot.trading_mode,
      price: executionPrice,
      quantity,
      total_value: totalValue,
      fee,
      strategy_type: bot.strategy_type,
      execution_reason: 'Grid level buy',
    });

  if (tradeError) {
    throw new Error(`Failed to create trade: ${tradeError.message}`);
  }

  // Update balance
  if (bot.trading_mode === 'paper') {
    await supabase
      .from('profiles')
      .update({
        paper_balance: profile.paper_balance - totalValue - fee,
      })
      .eq('id', userId);
  }

  // Update bot metrics
  await supabase
    .from('bots')
    .update({
      total_trades: bot.total_trades + 1,
    })
    .eq('id', bot.id);

  return {
    executed: true,
    side: 'buy',
    quantity,
  };
}

/**
 * Calculate next execution time based on strategy
 */
function calculateNextExecution(bot: Bot): string {
  const now = new Date();
  let intervalMs: number;

  switch (bot.strategy_type) {
    case 'dca':
      // DCA: Execute every X hours (default 24)
      const hours = bot.strategy_params.buyInterval || 24;
      intervalMs = hours * 60 * 60 * 1000;
      break;
    case 'grid':
      // Grid: Check more frequently (every 15 minutes)
      intervalMs = 15 * 60 * 1000;
      break;
    default:
      // Default: Every hour
      intervalMs = 60 * 60 * 1000;
  }

  return new Date(now.getTime() + intervalMs).toISOString();
}

/**
 * Log bot execution event
 */
async function logBotExecution(
  supabase: any,
  bot: Bot,
  level: 'info' | 'warning' | 'error',
  message: string
) {
  await supabase.from('bot_logs').insert({
    bot_id: bot.id,
    user_id: bot.user_id,
    level,
    event_type: level === 'error' ? 'execution_failed' : 'execution_completed',
    message,
    metadata: {
      strategy: bot.strategy_type,
      trading_pair: bot.trading_pair,
    },
  });
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

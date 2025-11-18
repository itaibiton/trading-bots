/**
 * AI Chat API Client
 *
 * Client-side API for interacting with the AI chat Edge Function
 */

import { createClient } from '@/lib/supabase/client';
import type { ConversationState, ConversationMessage, BotCreationData } from '@/types/bot';

/**
 * Create a new conversation
 */
export async function createConversation(): Promise<ConversationState> {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  const response = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'create',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = error.error || 'Failed to create conversation';

    // Log detailed error information for debugging
    console.error('AI Chat API Error (createConversation):', {
      status: response.status,
      statusText: response.statusText,
      message: errorMessage,
      details: error.details,
      url: response.url,
    });

    throw new Error(errorMessage);
  }

  const { conversation } = await response.json();
  return conversation;
}

/**
 * Get existing conversation
 */
export async function getConversation(conversationId: string): Promise<ConversationState> {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  const response = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'get',
      conversationId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = error.error || 'Failed to get conversation';

    // Log detailed error information for debugging
    console.error('AI Chat API Error (getConversation):', {
      status: response.status,
      statusText: response.statusText,
      message: errorMessage,
      details: error.details,
      conversationId,
      url: response.url,
    });

    throw new Error(errorMessage);
  }

  const { conversation } = await response.json();
  return conversation;
}

/**
 * Send a message in the conversation
 */
export async function sendMessage(
  conversationId: string,
  message: string
): Promise<{ message: ConversationMessage; conversation: ConversationState }> {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  const response = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'send',
      conversationId,
      userMessage: message,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = error.error || 'Failed to send message';

    // Log detailed error information for debugging
    console.error('AI Chat API Error (sendMessage):', {
      status: response.status,
      statusText: response.statusText,
      message: errorMessage,
      details: error.details,
      conversationId,
      userMessage: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
      url: response.url,
    });

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
}

/**
 * Deploy bot from conversation config
 */
export async function deployBot(conversationId: string): Promise<{ botId: string }> {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  // First get the conversation to get the config
  const conversation = await getConversation(conversationId);

  // Check if user completed the questions (readyToDeploy flag in config)
  if (!conversation.config.readyToDeploy) {
    throw new Error('Please complete all questions before deploying');
  }

  // Create bot from config
  const botData: BotCreationData = {
    name: conversation.config.name || 'My Trading Bot',
    description: conversation.config.description,
    strategyType: conversation.config.strategyType!,
    tradingPair: conversation.config.tradingPair || 'BTC/USDT',
    capitalAllocated: conversation.config.capitalAllocated || 1000,
    tradingMode: conversation.config.tradingMode || 'paper',
    riskLevel: conversation.config.riskLevel || 'medium',
    stopLossPercentage: conversation.config.stopLossPercentage || 5,
    takeProfitPercentage: conversation.config.takeProfitPercentage || 10,
    maxDailyLoss: conversation.config.maxDailyLoss || 50,
    maxPositionSize: conversation.config.maxPositionSize || 50,
    strategyParams: conversation.config.strategyParams || {},
  };

  if (!botData.strategyType) {
    throw new Error('Strategy type missing from conversation config');
  }

  const { data: strategy, error: strategyError } = await supabase
    .from('strategies')
    .select('id, type')
    .eq('type', botData.strategyType)
    .eq('is_active', true)
    .single();

  if (strategyError || !strategy) {
    throw new Error(`Strategy "${botData.strategyType}" is not available right now`);
  }

  // Create bot in database
  const { data: bot, error } = await supabase
    .from('bots')
    .insert({
      user_id: user.id,
      name: botData.name,
      description: botData.description,
      strategy_id: strategy.id,
      strategy_type: botData.strategyType,
      trading_pair: botData.tradingPair,
      capital_allocated: botData.capitalAllocated,
      trading_mode: botData.tradingMode,
      risk_level: botData.riskLevel,
      stop_loss_percentage: botData.stopLossPercentage,
      take_profit_percentage: botData.takeProfitPercentage,
      max_daily_loss: botData.maxDailyLoss,
      max_position_size: botData.maxPositionSize,
      strategy_params: botData.strategyParams,
      status: 'active',
      is_template: false,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create bot: ${error.message}`);
  }

  // Update conversation with bot ID AND mark as complete
  // This satisfies the CHECK constraint: is_complete can only be true when bot_id is NOT NULL
  await supabase
    .from('ai_conversations')
    .update({
      bot_id: bot.id,
      is_complete: true,
      completed_at: new Date().toISOString()
    })
    .eq('id', conversationId);

  return { botId: bot.id };
}

/**
 * Delete conversation
 */
export async function deleteConversation(conversationId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from('ai_conversations')
    .delete()
    .eq('id', conversationId);

  if (error) {
    throw new Error(`Failed to delete conversation: ${error.message}`);
  }
}

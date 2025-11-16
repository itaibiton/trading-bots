import { createClient } from '@/lib/supabase/client';
import type {
  AIConversation,
  AIMessage,
  BotCreationData,
  RiskLevel,
  StrategyType,
} from '@/types/bot';

// Request/Response types matching Edge Function
export interface ChatRequest {
  conversationId?: string;
  message: string;
  currentStep: number;
}

export interface ChatResponse {
  conversationId: string;
  message: {
    id: string;
    role: 'assistant';
    content: string;
    timestamp: string;
    quickReplies?: QuickReply[];
  };
  nextStep: number;
  extractedData?: {
    trading_goal?: string;
    risk_tolerance?: RiskLevel;
    capital_amount?: number;
    experience_level?: 'beginner' | 'intermediate' | 'advanced';
    preferred_pairs?: string[];
    recommended_strategy?: StrategyType;
  };
  recommendations?: BotOption[];
}

export interface QuickReply {
  id: string;
  label: string;
  value: string;
}

export interface BotOption {
  id: string;
  name: string;
  strategyType: StrategyType;
  riskLevel: RiskLevel;
  config: {
    tradingPair: string;
    capitalAllocated: number;
    stopLossPercentage: number;
    takeProfitPercentage: number;
    maxDailyLoss: number;
    maxPositionSize: number;
    strategyParams: Record<string, any>;
  };
  expectedReturn: { min: number; max: number };
  maxDrawdown: number;
  winRate: number;
  confidence: number;
  reasoning: string;
}

export class AIChatClient {
  private supabase = createClient();
  private functionsUrl: string;

  constructor() {
    // Next.js inlines NEXT_PUBLIC_* environment variables at build time
    // Using non-null assertion (!) since this is required and validated at build
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    this.functionsUrl = `${supabaseUrl}/functions/v1`;
  }

  /**
   * Send a message to the AI assistant
   */
  async sendMessage(params: ChatRequest): Promise<ChatResponse> {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();

    if (!session) {
      throw new Error('Not authenticated. Please sign in.');
    }

    try {
      console.log('[AI Chat Client] Sending message:', {
        conversationId: params.conversationId,
        messageLength: params.message?.length,
        currentStep: params.currentStep,
      });

      const response = await fetch(`${this.functionsUrl}/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(params),
      });

      console.log('[AI Chat Client] Response status:', response.status);

      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('[AI Chat Client] Error response:', errorData);

          // Extract detailed error message
          if (errorData.error) {
            errorMessage = errorData.error;
          }

          // Add details if available (development mode)
          if (errorData.details) {
            console.error('[AI Chat Client] Error details:', errorData.details);
          }
        } catch (parseError) {
          console.error('[AI Chat Client] Failed to parse error response:', parseError);
        }

        throw new Error(errorMessage);
      }

      const data: ChatResponse = await response.json();
      console.log('[AI Chat Client] Success:', {
        conversationId: data.conversationId,
        nextStep: data.nextStep,
        hasRecommendations: !!data.recommendations?.length,
      });

      return data;
    } catch (error) {
      console.error('[AI Chat Client] Error:', error);

      if (error instanceof Error) {
        // Enhance common errors with user-friendly messages
        if (error.message.includes('Failed to create conversation')) {
          throw new Error(
            'Unable to start conversation. Please check your database connection and try again.'
          );
        }
        if (error.message.includes('Missing Anthropic API key')) {
          throw new Error(
            'AI service not configured. Please contact support.'
          );
        }
        if (error.message.includes('Claude API error')) {
          throw new Error(
            'AI service temporarily unavailable. Please try again in a moment.'
          );
        }
        throw error;
      }

      throw new Error('Failed to send message to AI assistant');
    }
  }

  /**
   * Load an existing conversation
   */
  async loadConversation(conversationId: string): Promise<AIConversation | null> {
    try {
      const { data, error } = await this.supabase
        .from('ai_conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Not found
          return null;
        }
        throw error;
      }

      return data as AIConversation;
    } catch (error) {
      console.error('Failed to load conversation:', error);
      throw new Error('Failed to load conversation');
    }
  }

  /**
   * Get the user's most recent incomplete conversation
   */
  async getRecentIncompleteConversation(): Promise<AIConversation | null> {
    try {
      const { data, error } = await this.supabase
        .from('ai_conversations')
        .select('*')
        .eq('is_complete', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as AIConversation | null;
    } catch (error) {
      console.error('Failed to get recent conversation:', error);
      return null;
    }
  }

  /**
   * Create a bot from a selected option
   */
  async createBotFromOption(params: {
    conversationId: string;
    optionId: string;
    customizations?: Partial<BotCreationData>;
  }): Promise<{ botId: string }> {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();

    if (!session) {
      throw new Error('Not authenticated');
    }

    try {
      // 1. Load conversation to get bot options
      const conversation = await this.loadConversation(params.conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }

      // 2. Find selected option from recommended_params
      const options = conversation.recommended_params as BotOption[] | undefined;
      if (!options || options.length === 0) {
        throw new Error('No bot options available');
      }

      const selectedOption = options.find((opt) => opt.id === params.optionId);
      if (!selectedOption) {
        throw new Error('Selected option not found');
      }

      // 3. Get strategy ID from strategies table
      const { data: strategy, error: strategyError } = await this.supabase
        .from('strategies')
        .select('id')
        .eq('type', selectedOption.strategyType)
        .single();

      if (strategyError || !strategy) {
        throw new Error('Strategy not found');
      }

      // 4. Build bot creation data
      const botData: Partial<BotCreationData> = {
        name: selectedOption.name,
        description: selectedOption.reasoning,
        strategyId: strategy.id,
        strategyType: selectedOption.strategyType,
        tradingPair: selectedOption.config.tradingPair,
        capitalAllocated: selectedOption.config.capitalAllocated,
        tradingMode: 'paper', // Always start with paper trading
        riskLevel: selectedOption.riskLevel,
        stopLossPercentage: selectedOption.config.stopLossPercentage,
        takeProfitPercentage: selectedOption.config.takeProfitPercentage,
        maxDailyLoss: selectedOption.config.maxDailyLoss,
        maxPositionSize: selectedOption.config.maxPositionSize,
        strategyParams: selectedOption.config.strategyParams,
        ...params.customizations, // Apply any user customizations
      };

      // 5. Create bot in database
      const { data: bot, error: botError } = await this.supabase
        .from('bots')
        .insert({
          user_id: session.user.id,
          name: botData.name,
          description: botData.description,
          strategy_id: botData.strategyId,
          strategy_type: botData.strategyType,
          trading_pair: botData.tradingPair,
          capital_allocated: botData.capitalAllocated,
          trading_mode: botData.tradingMode,
          status: 'draft', // Start as draft
          risk_level: botData.riskLevel,
          stop_loss_percentage: botData.stopLossPercentage,
          take_profit_percentage: botData.takeProfitPercentage,
          max_daily_loss: botData.maxDailyLoss,
          max_position_size: botData.maxPositionSize,
          strategy_params: botData.strategyParams || {},
        })
        .select('id')
        .single();

      if (botError || !bot) {
        throw new Error(`Failed to create bot: ${botError?.message || 'Unknown error'}`);
      }

      // 6. Create risk config (1:1 with bot)
      const { error: riskError } = await this.supabase.from('risk_configs').insert({
        bot_id: bot.id,
        stop_loss_percentage: botData.stopLossPercentage,
        take_profit_percentage: botData.takeProfitPercentage,
        max_position_size: botData.maxPositionSize,
        max_daily_loss: botData.maxDailyLoss,
        risk_level: botData.riskLevel,
        trailing_stop_enabled: false,
        max_open_positions: 1,
      });

      if (riskError) {
        console.error('Failed to create risk config:', riskError);
        // Continue anyway - bot is created
      }

      // 7. Mark conversation as complete
      const { error: updateError } = await this.supabase
        .from('ai_conversations')
        .update({
          bot_id: bot.id,
          is_complete: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', params.conversationId);

      if (updateError) {
        console.error('Failed to mark conversation complete:', updateError);
      }

      // 8. Update user's AI conversation count
      const { error: profileError } = await this.supabase.rpc('increment', {
        row_id: session.user.id,
        x: 1,
        table_name: 'profiles',
        column_name: 'ai_conversations_used',
      });

      if (profileError) {
        console.error('Failed to increment conversation count:', profileError);
      }

      return { botId: bot.id };
    } catch (error) {
      console.error('Failed to create bot:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to create bot from AI conversation');
    }
  }

  /**
   * Delete a conversation (cleanup)
   */
  async deleteConversation(conversationId: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('ai_conversations')
        .delete()
        .eq('id', conversationId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      throw new Error('Failed to delete conversation');
    }
  }

  /**
   * Check if user has reached AI conversation limit
   */
  async checkConversationLimit(): Promise<{ canCreate: boolean; used: number; limit: number }> {
    try {
      const { data: profile, error } = await this.supabase
        .from('profiles')
        .select('ai_conversations_used, ai_conversations_limit, subscription_tier')
        .single();

      if (error) {
        throw error;
      }

      const used = profile.ai_conversations_used || 0;
      const limit = profile.ai_conversations_limit || 3;

      // Pro users have unlimited (we'll use 9999 as "unlimited")
      const canCreate = profile.subscription_tier === 'pro' || used < limit;

      return {
        canCreate,
        used,
        limit,
      };
    } catch (error) {
      console.error('Failed to check conversation limit:', error);
      // Default to allowing creation if check fails
      return {
        canCreate: true,
        used: 0,
        limit: 3,
      };
    }
  }
}

// Export singleton instance
export const aiChatClient = new AIChatClient();

// Helper function to generate quick replies for each step (client-side generation)
export function generateQuickReplies(step: number, context?: any): QuickReply[] {
  const quickReplies: Record<number, QuickReply[]> = {
    1: [
      { id: 'goal-1', label: 'Generate passive income', value: 'passive_income' },
      { id: 'goal-2', label: 'Long-term investment', value: 'long_term' },
      { id: 'goal-3', label: 'Learn about trading', value: 'learning' },
      { id: 'goal-4', label: 'Diversify portfolio', value: 'diversification' },
    ],
    2: [
      { id: 'risk-1', label: 'That would worry me', value: 'low' },
      { id: 'risk-2', label: 'I could handle it', value: 'medium' },
      { id: 'risk-3', label: 'No problem, I understand volatility', value: 'high' },
    ],
    3: [
      { id: 'capital-1', label: 'Try paper trading first ($10k virtual)', value: 'paper' },
      { id: 'capital-2', label: '$100 - Just testing', value: '100' },
      { id: 'capital-3', label: '$500 - Conservative start', value: '500' },
      { id: 'capital-4', label: '$1,000 - Ready to invest', value: '1000' },
      { id: 'capital-5', label: 'Custom amount', value: 'custom' },
    ],
    4: [
      {
        id: 'strategy-1',
        label: `Yes, use ${context?.recommended_strategy || 'recommended strategy'}`,
        value: 'accept',
      },
      { id: 'strategy-2', label: 'Tell me about other options', value: 'alternatives' },
    ],
    5: [], // No quick replies at step 5 - user selects bot option cards
  };

  return quickReplies[step] || [];
}

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Types
interface ChatRequest {
  conversationId?: string;
  message: string;
  currentStep: number;
}

interface ChatResponse {
  conversationId: string;
  message: {
    id: string;
    role: 'assistant';
    content: string;
    timestamp: string;
    quickReplies?: QuickReply[];
  };
  nextStep: number;
  extractedData?: Record<string, any>;
  recommendations?: BotOption[];
}

interface QuickReply {
  id: string;
  label: string;
  value: string;
}

interface BotOption {
  id: string;
  name: string;
  strategyType: string;
  riskLevel: string;
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

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    // 1. Authenticate request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('[AUTH] Missing authorization header');
      throw new Error('Missing authorization header');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[CONFIG] Missing environment variables:', {
        hasSupabaseUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseServiceKey,
      });
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('[AUTH] Authentication failed:', authError);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('[AUTH] User authenticated:', user.id);

    // 2. Parse request body
    const body: ChatRequest = await req.json();
    const { conversationId, message, currentStep } = body;

    console.log('[REQUEST] Received:', { conversationId, messageLength: message?.length, currentStep });

    if (!message || currentStep < 1 || currentStep > 5) {
      console.error('[VALIDATION] Invalid parameters:', { hasMessage: !!message, currentStep });
      throw new Error('Invalid request parameters');
    }

    // 3. Load or create conversation
    let conversation;

    if (conversationId) {
      // Load existing conversation
      console.log('[DB] Loading conversation:', conversationId);
      const { data, error } = await supabase
        .from('ai_conversations')
        .select('*')
        .eq('id', conversationId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('[DB] Failed to load conversation:', error);
        throw new Error(`Conversation not found: ${error.message}`);
      }

      if (!data) {
        console.error('[DB] No conversation data returned');
        throw new Error('Conversation not found');
      }

      conversation = data;
      console.log('[DB] Conversation loaded successfully');
    } else {
      // Create new conversation
      console.log('[DB] Creating new conversation for user:', user.id);
      const { data, error } = await supabase
        .from('ai_conversations')
        .insert({
          user_id: user.id,
          current_step: 1,
          messages: [],
        })
        .select()
        .single();

      if (error) {
        console.error('[DB] Failed to create conversation:', error);
        throw new Error(`Failed to create conversation: ${error.message}`);
      }

      if (!data) {
        console.error('[DB] No conversation data returned after insert');
        throw new Error('Failed to create conversation: No data returned');
      }

      conversation = data;
      console.log('[DB] Conversation created:', conversation.id);
    }

    // 4. Get Claude API key
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!anthropicApiKey) {
      console.error('[CONFIG] Missing ANTHROPIC_API_KEY environment variable');
      throw new Error('Missing Anthropic API key');
    }
    console.log('[CONFIG] Anthropic API key found');

    // 5. Build system prompt based on current step
    const systemPrompt = buildSystemPrompt(currentStep, conversation);

    // 6. Build conversation history
    const messages = Array.isArray(conversation.messages) ? conversation.messages : [];
    const conversationHistory = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add current user message
    conversationHistory.push({
      role: 'user',
      content: message,
    });

    // 7. Call Claude API
    const startTime = Date.now();
    console.log('[CLAUDE] Calling API with', conversationHistory.length, 'messages');

    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        system: systemPrompt,
        messages: conversationHistory,
      }),
    });

    if (!claudeResponse.ok) {
      const errorData = await claudeResponse.json().catch(() => ({}));
      console.error('[CLAUDE] API error:', claudeResponse.status, errorData);
      throw new Error(`Claude API error (${claudeResponse.status}): ${errorData.error?.message || 'Unknown error'}`);
    }

    const claudeData = await claudeResponse.json();
    const processingTime = Date.now() - startTime;
    console.log('[CLAUDE] Response received in', processingTime, 'ms');

    // 8. Parse Claude response
    const aiContent = claudeData.content[0]?.text || '';
    const { content, quickReplies, recommendations, extractedData } = parseAIResponse(
      aiContent,
      currentStep
    );

    // 9. Save messages to conversation
    const updatedMessages = [
      ...messages,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content,
        timestamp: new Date().toISOString(),
        quickReplies,
      },
    ];

    // 10. Update conversation with new data
    const updateData: any = {
      messages: updatedMessages,
      current_step: currentStep,
      updated_at: new Date().toISOString(),
    };

    // Extract and save structured data based on step
    if (extractedData) {
      if (extractedData.trading_goal) updateData.trading_goal = extractedData.trading_goal;
      if (extractedData.risk_tolerance) updateData.risk_tolerance = extractedData.risk_tolerance;
      if (extractedData.capital_amount) updateData.capital_amount = extractedData.capital_amount;
      if (extractedData.experience_level) updateData.experience_level = extractedData.experience_level;
      if (extractedData.preferred_pairs) updateData.preferred_pairs = extractedData.preferred_pairs;
      if (extractedData.recommended_strategy) updateData.recommended_strategy = extractedData.recommended_strategy;
    }

    // Save recommendations (Step 5)
    if (recommendations && recommendations.length > 0) {
      updateData.recommended_params = recommendations;
      updateData.is_complete = false; // Will be marked complete when bot is created
    }

    console.log('[DB] Updating conversation:', conversation.id);
    const { error: updateError } = await supabase
      .from('ai_conversations')
      .update(updateData)
      .eq('id', conversation.id);

    if (updateError) {
      console.error('[DB] Failed to update conversation:', updateError);
      // Don't throw - conversation already happened, just log the error
    } else {
      console.log('[DB] Conversation updated successfully');
    }

    // 11. Return response
    const response: ChatResponse = {
      conversationId: conversation.id,
      message: {
        id: updatedMessages[updatedMessages.length - 1].id,
        role: 'assistant',
        content,
        timestamp: new Date().toISOString(),
        quickReplies,
      },
      nextStep: currentStep < 5 ? currentStep + 1 : 5,
      extractedData,
      recommendations,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    // Enhanced error logging
    console.error('=== AI Chat Error ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Request body:', await req.clone().json().catch(() => 'Could not parse body'));
    console.error('===================');

    // Return detailed error in development, generic in production
    const isDev = Deno.env.get('ENVIRONMENT') !== 'production';
    const errorResponse = {
      error: error instanceof Error ? error.message : 'Internal server error',
      ...(isDev && {
        details: {
          type: error?.constructor?.name,
          stack: error instanceof Error ? error.stack : undefined,
        },
      }),
    };

    return new Response(
      JSON.stringify(errorResponse),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});

// Helper function to build system prompt
function buildSystemPrompt(step: number, conversation: any): string {
  const basePrompt = `You are TradingBot AI, a friendly cryptocurrency trading assistant helping users create automated trading bots.

Your personality:
- Conversational and encouraging (like a knowledgeable friend)
- Use simple language, avoid jargon
- Keep responses concise (2-3 paragraphs max)
- Use emojis sparingly (1-2 per message)
- Emphasize safety and risk management

Safety rules:
- NEVER recommend investing more than user can afford to lose
- ALWAYS mention paper trading ($10,000 virtual balance)
- Enforce risk limits: Low (max 5% per trade), Medium (max 10%), High (max 15%)
- Minimum capital: $100
- Always remind users crypto trading involves risk

Available strategies:
1. DCA (Dollar-Cost Averaging) - Low risk, beginner-friendly
2. Grid Trading - Medium risk, sideways markets
3. Momentum - High risk, trending markets
4. Mean Reversion - Medium risk, experienced traders

Current conversation step: ${step}/5`;

  const stepPrompts: Record<number, string> = {
    1: `
STEP 1: Goal Discovery

Ask about their trading objective. Provide 4 quick reply options:
- "Generate passive income"
- "Long-term investment"
- "Learn about trading"
- "Diversify portfolio"

Keep it friendly and welcoming. This is their first interaction.`,

    2: `
STEP 2: Risk Assessment

User's goal: ${conversation.trading_goal || 'Not specified'}

Determine risk tolerance. Ask how they'd feel if investment dropped 20% temporarily.

Provide 3 quick reply options:
- "That would worry me" → Low risk
- "I could handle it" → Medium risk
- "No problem" → High risk

Explain each level briefly.`,

    3: `
STEP 3: Capital Allocation

User's risk: ${conversation.risk_tolerance || 'Not specified'}

Ask how much they want to allocate. Remind them about paper trading.

Provide 5 quick reply options:
- "Try paper trading first ($10,000 virtual)"
- "$100 - Just testing"
- "$500 - Conservative start"
- "$1,000 - Ready to invest"
- "Custom amount"

Minimum: $100. Recommend starting with paper trading.`,

    4: `
STEP 4: Strategy Recommendation

User profile:
- Goal: ${conversation.trading_goal || 'Not specified'}
- Risk: ${conversation.risk_tolerance || 'Not specified'}
- Capital: $${conversation.capital_amount || 'Not specified'}

Recommend ONE strategy based on their profile:
- Low risk → DCA
- Medium risk + passive goal → Mean Reversion or Grid
- High risk → Momentum

Explain in 2-3 sentences:
1. Why it fits their profile
2. How it works (simple explanation)
3. Expected returns + max drawdown

Provide 2 quick replies:
- "Yes, use [Strategy]"
- "Tell me about other options"`,

    5: `
STEP 5: Review & Deploy

User's final profile:
- Goal: ${conversation.trading_goal || 'Not specified'}
- Risk: ${conversation.risk_tolerance || 'Not specified'}
- Capital: $${conversation.capital_amount || 'Not specified'}
- Strategy: ${conversation.recommended_strategy || 'DCA'}

Generate 3 bot configurations as JSON in this exact format:

{
  "options": [
    {
      "id": "conservative",
      "name": "Conservative Bot",
      "strategyType": "${conversation.recommended_strategy || 'dca'}",
      "riskLevel": "low",
      "config": {
        "tradingPair": "BTC/USDT",
        "capitalAllocated": ${conversation.capital_amount || 1000},
        "stopLossPercentage": 5,
        "takeProfitPercentage": 10,
        "maxDailyLoss": ${(conversation.capital_amount || 1000) * 0.05},
        "maxPositionSize": 20,
        "strategyParams": {}
      },
      "expectedReturn": {"min": 8, "max": 15},
      "maxDrawdown": 8,
      "winRate": 65,
      "confidence": 95,
      "reasoning": "Safest option with minimal risk and steady growth"
    },
    {
      "id": "balanced",
      "name": "Balanced Bot",
      "strategyType": "${conversation.recommended_strategy || 'dca'}",
      "riskLevel": "medium",
      "config": {
        "tradingPair": "BTC/USDT",
        "capitalAllocated": ${conversation.capital_amount || 1000},
        "stopLossPercentage": 10,
        "takeProfitPercentage": 20,
        "maxDailyLoss": ${(conversation.capital_amount || 1000) * 0.10},
        "maxPositionSize": 30,
        "strategyParams": {}
      },
      "expectedReturn": {"min": 12, "max": 22},
      "maxDrawdown": 15,
      "winRate": 60,
      "confidence": 90,
      "reasoning": "Good balance between risk and potential returns"
    },
    {
      "id": "aggressive",
      "name": "Aggressive Bot",
      "strategyType": "${conversation.recommended_strategy || 'dca'}",
      "riskLevel": "high",
      "config": {
        "tradingPair": "BTC/USDT",
        "capitalAllocated": ${conversation.capital_amount || 1000},
        "stopLossPercentage": 15,
        "takeProfitPercentage": 30,
        "maxDailyLoss": ${(conversation.capital_amount || 1000) * 0.15},
        "maxPositionSize": 50,
        "strategyParams": {}
      },
      "expectedReturn": {"min": 18, "max": 35},
      "maxDrawdown": 22,
      "winRate": 55,
      "confidence": 85,
      "reasoning": "Higher risk with potential for greater returns"
    }
  ]
}

Then provide a friendly summary explaining the 3 options.`,
  };

  return basePrompt + (stepPrompts[step] || '');
}

// Helper function to parse AI response
function parseAIResponse(
  content: string,
  step: number
): {
  content: string;
  quickReplies?: QuickReply[];
  recommendations?: BotOption[];
  extractedData?: Record<string, any>;
} {
  // Step 5: Extract bot configurations from JSON
  if (step === 5) {
    const jsonMatch = content.match(/\{[\s\S]*"options"[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        const cleanContent = content.replace(jsonMatch[0], '').trim();

        return {
          content: cleanContent,
          recommendations: parsed.options,
        };
      } catch (e) {
        console.error('Failed to parse bot options JSON:', e);
      }
    }
  }

  // For steps 1-4, extract structured data from conversation
  const extractedData: Record<string, any> = {};

  // Step 1: Extract goal
  if (step === 1 && (content.toLowerCase().includes('passive income') || content.toLowerCase().includes('investment'))) {
    // This is basic extraction - in production, use Claude function calling
    extractedData.trading_goal = content.substring(0, 200);
  }

  // Step 2: Extract risk tolerance
  if (step === 2) {
    if (content.toLowerCase().includes('worry') || content.toLowerCase().includes('safe')) {
      extractedData.risk_tolerance = 'low';
    } else if (content.toLowerCase().includes('handle') || content.toLowerCase().includes('balanced')) {
      extractedData.risk_tolerance = 'medium';
    } else if (content.toLowerCase().includes('problem') || content.toLowerCase().includes('comfortable')) {
      extractedData.risk_tolerance = 'high';
    }
  }

  // Step 3: Extract capital amount
  if (step === 3) {
    const amountMatch = content.match(/\$?(\d{1,3}(,\d{3})*(\.\d{2})?|\d+)/);
    if (amountMatch) {
      const amount = parseFloat(amountMatch[1].replace(',', ''));
      if (amount >= 100) {
        extractedData.capital_amount = amount;
      }
    }
  }

  // Step 4: Extract recommended strategy
  if (step === 4) {
    if (content.toLowerCase().includes('dca') || content.toLowerCase().includes('dollar cost')) {
      extractedData.recommended_strategy = 'dca';
    } else if (content.toLowerCase().includes('grid')) {
      extractedData.recommended_strategy = 'grid';
    } else if (content.toLowerCase().includes('momentum')) {
      extractedData.recommended_strategy = 'momentum';
    } else if (content.toLowerCase().includes('mean reversion')) {
      extractedData.recommended_strategy = 'mean-reversion';
    }
  }

  return {
    content,
    extractedData: Object.keys(extractedData).length > 0 ? extractedData : undefined,
  };
}

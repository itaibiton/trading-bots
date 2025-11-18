// @ts-nocheck

/**
 * AI Chat Edge Function
 *
 * Handles conversation between user and Claude AI for bot creation.
 * Integrates with Anthropic API to generate responses and extract bot configuration.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { getNextQuestion, processUserMessage } from './question-tree.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestContext {
  requestId: string;
  action: string;
  conversationId?: string;
  userId?: string;
}

type LogPayload = Record<string, unknown> | undefined;

function logWithContext(
  level: 'log' | 'error',
  context: RequestContext,
  message: string,
  data?: LogPayload
) {
  const prefix = `[ai-chat][${context.requestId}][${context.action}]`;
  const payload =
    data && typeof data === 'object'
      ? { ...data, conversationId: context.conversationId, userId: context.userId }
      : {
        conversationId: context.conversationId,
        userId: context.userId
      };

  if (level === 'error') {
    console.error(`${prefix} ${message}`, payload);
  } else {
    console.log(`${prefix} ${message}`, payload);
  }
}

function logUnhandledError(requestId: string, error: unknown) {
  console.error(`[ai-chat][${requestId}] Unhandled error:`, {
    message: error instanceof Error ? error.message : String(error),
    name: error instanceof Error ? error.name : 'Unknown',
    stack: error instanceof Error ? error.stack : undefined,
    ...(error && typeof error === 'object' && 'code' in error && {
      code: (error as Record<string, unknown>).code,
      details: (error as Record<string, unknown>).details,
      hint: (error as Record<string, unknown>).hint
    })
  });
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  requestId?: string
) {
  const payload = requestId ? { ...body, requestId } : body;

  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();

  try {
    // Extract JWT token from Authorization header
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return jsonResponse({ error: 'Missing authorization token' }, 401, requestId);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const supabaseKey = serviceRoleKey ?? anonKey;

    if (!supabaseUrl || !supabaseKey) {
      console.error(`[ai-chat][${requestId}] Missing Supabase configuration`, {
        hasUrl: !!supabaseUrl,
        hasServiceRoleKey: !!serviceRoleKey,
        hasAnonKey: !!anonKey
      });

      return jsonResponse({ error: 'Server configuration error' }, 500, requestId);
    }

    // Create Supabase client with user JWT so RLS policies see auth.uid()
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseKey,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        auth: {
          persistSession: false,
        },
      }
    );

    // Get user with explicit JWT parameter to validate token quickly
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      return jsonResponse({ error: 'Unauthorized' }, 401, requestId);
    }

    // Parse request body
    const { conversationId, userMessage, action } = await req.json();
    const context: RequestContext = {
      requestId,
      action,
      conversationId,
      userId: user.id
    };

    logWithContext('log', context, 'Incoming request payload');

    // Handle different actions
    if (action === 'create') {
      return await handleCreateConversation(supabaseClient, user.id, context);
    } else if (action === 'send') {
      return await handleSendMessage(
        supabaseClient,
        conversationId,
        userMessage,
        user.id,
        context
      );
    } else if (action === 'get') {
      return await handleGetConversation(supabaseClient, conversationId, user.id, context);
    }

    return jsonResponse({ error: 'Invalid action' }, 400, requestId);
  } catch (error) {
    logUnhandledError(requestId, error);

    return jsonResponse(
      {
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      500,
      requestId
    );
  }
});

/**
 * Create a new conversation
 */
async function handleCreateConversation(
  supabaseClient: any,
  userId: string,
  context: RequestContext
) {
  // Create new conversation
  const { data: conversation, error } = await supabaseClient
    .from('ai_conversations')
    .insert({
      user_id: userId,
      current_step: 1,
      is_complete: false,
      trading_mode: 'paper', // Default to paper trading for safety
      config: {},
      messages: [],
    })
    .select()
    .single();

  if (error) {
    // Enhanced error with full Supabase error details
    logWithContext('error', context, 'Failed to create conversation', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      userId
    });
    throw new Error(`Failed to create conversation: ${error.message}`);
  }

  // Get first question
  const firstQuestion = getNextQuestion(1, {});

  if (!firstQuestion) {
    logWithContext('error', context, 'Failed to load initial question');
    throw new Error('Conversation flow is not configured correctly');
  }

  // Add initial AI message
  const initialMessage = {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: firstQuestion.question,
    timestamp: new Date().toISOString(),
    quickReplies: firstQuestion.quickReplies,
  };

  // Update conversation with first message
  const { error: updateError } = await supabaseClient
    .from('ai_conversations')
    .update({
      messages: [initialMessage],
    })
    .eq('id', conversation.id);

  if (updateError) {
    logWithContext('error', context, 'Failed to add initial message', {
      message: updateError.message,
      code: updateError.code,
      details: updateError.details,
      hint: updateError.hint,
    });
  }

  return jsonResponse(
    {
      conversation: {
        ...conversation,
        messages: [initialMessage],
      },
    },
    200,
    context.requestId
  );
}

/**
 * Get existing conversation
 */
async function handleGetConversation(
  supabaseClient: any,
  conversationId: string,
  userId: string,
  context: RequestContext
) {
  const { data: conversation, error } = await supabaseClient
    .from('ai_conversations')
    .select('*')
    .eq('id', conversationId)
    .eq('user_id', userId)
    .single();

  if (error) {
    logWithContext('error', context, 'Failed to fetch conversation', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(`Failed to get conversation: ${error.message}`);
  }

  return jsonResponse({ conversation }, 200, context.requestId);
}

/**
 * Send message and get AI response
 */
async function handleSendMessage(
  supabaseClient: any,
  conversationId: string,
  userMessage: string,
  userId: string,
  context: RequestContext
) {
  // Load conversation
  const { data: conversation, error: loadError } = await supabaseClient
    .from('ai_conversations')
    .select('*')
    .eq('id', conversationId)
    .eq('user_id', userId)
    .single();

  if (loadError) {
    logWithContext('error', context, 'Failed to load conversation', {
      message: loadError.message,
      code: loadError.code,
      details: loadError.details,
      hint: loadError.hint,
    });
    throw new Error(`Failed to load conversation: ${loadError.message}`);
  }

  // Add user message
  const userMsg = {
    id: crypto.randomUUID(),
    role: 'user',
    content: userMessage,
    timestamp: new Date().toISOString(),
  };

  const messages = [...(conversation.messages || []), userMsg];

  // Process message and extract config
  const {
    configUpdate,
    validation,
    nextStep,
    newState,
  } = processUserMessage(
    conversation.current_step,
    userMessage,
    { ...conversation.config, ...conversation }
  );

  // Merge config
  const updatedConfig = { ...conversation.config, ...configUpdate };

  // Generate AI response
  let aiMessage: any;

  if (validation && validation.type === 'error' && !validation.allowProceed) {
    // Show error message
    aiMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: validation.message,
      timestamp: new Date().toISOString(),
      validation: validation,
    };
  } else {
    // Get next question
    const nextQuestion = getNextQuestion(nextStep, newState);

    let content = '';

    if (validation) {
      content = validation.message + '\n\n';
    }

    if (nextQuestion) {
      content += nextQuestion.question;
    }

    aiMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content,
      timestamp: new Date().toISOString(),
      quickReplies: nextQuestion?.quickReplies || null,
      configUpdate,
      validation: validation || undefined,
    };
  }

  // Update conversation
  // NOTE: is_complete and completed_at are NOT updated here
  // They will be set by the frontend after bot deployment to avoid constraint violation
  const { data: updated, error: updateError } = await supabaseClient
    .from('ai_conversations')
    .update({
      messages: [...messages, aiMessage],
      config: updatedConfig,
      current_step: nextStep,
      // is_complete is NOT updated - frontend will set after bot creation
      experience_level: newState.experienceLevel || conversation.experience_level,
      trading_goal: newState.tradingGoal || conversation.trading_goal,
      risk_tolerance: updatedConfig.riskLevel || conversation.risk_tolerance,
      // completed_at is NOT updated - frontend will set after bot creation
    })
    .eq('id', conversationId)
    .select()
    .single();

  if (updateError) {
    // Enhanced error with full Supabase error details
    logWithContext('error', context, 'Failed to update conversation', {
      message: updateError.message,
      code: updateError.code,
      details: updateError.details,
      hint: updateError.hint,
      conversationId,
      updateData: {
        messagesCount: messages.length + 1,
        currentStep: nextStep,
        hasExperienceLevel: !!newState.experienceLevel,
        hasTradingGoal: !!newState.tradingGoal,
        hasRiskTolerance: !!updatedConfig.riskLevel
      }
    });
    throw new Error(`Failed to update conversation: ${updateError.message}`);
  }

  return jsonResponse(
    {
      message: aiMessage,
      conversation: updated,
    },
    200,
    context.requestId
  );
}

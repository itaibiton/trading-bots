'use client';

import { useReducer, useCallback, useEffect, useRef } from 'react';
import { aiChatClient, type ChatRequest, type ChatResponse, type QuickReply, type BotOption } from '@/lib/api/ai-chat';
import type { AIMessage, RiskLevel, StrategyType } from '@/types/bot';

// State type
interface AIChatState {
  conversationId: string | null;
  messages: AIMessage[];
  currentStep: number;
  extractedData: {
    trading_goal?: string;
    risk_tolerance?: RiskLevel;
    capital_amount?: number;
    experience_level?: 'beginner' | 'intermediate' | 'advanced';
    preferred_pairs?: string[];
    recommended_strategy?: StrategyType;
  };
  recommendations: BotOption[];
  isAIThinking: boolean;
  isLoading: boolean;
  error: string | null;
  lastUserMessage: string | null;
  canRetry: boolean;
}

// Action types
type AIChatAction =
  | { type: 'SEND_MESSAGE_START'; payload: { message: string } }
  | { type: 'SEND_MESSAGE_SUCCESS'; payload: ChatResponse }
  | { type: 'SEND_MESSAGE_ERROR'; payload: { error: string } }
  | { type: 'LOAD_CONVERSATION_START' }
  | { type: 'LOAD_CONVERSATION_SUCCESS'; payload: { conversationId: string; messages: AIMessage[]; currentStep: number; extractedData: any; recommendations: BotOption[] } }
  | { type: 'LOAD_CONVERSATION_ERROR'; payload: { error: string } }
  | { type: 'RESET_CONVERSATION' }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AIChatState = {
  conversationId: null,
  messages: [],
  currentStep: 1,
  extractedData: {},
  recommendations: [],
  isAIThinking: false,
  isLoading: false,
  error: null,
  lastUserMessage: null,
  canRetry: false,
};

// Reducer
function aiChatReducer(state: AIChatState, action: AIChatAction): AIChatState {
  switch (action.type) {
    case 'SEND_MESSAGE_START':
      return {
        ...state,
        isAIThinking: true,
        error: null,
        lastUserMessage: action.payload.message,
        canRetry: false,
      };

    case 'SEND_MESSAGE_SUCCESS': {
      const { conversationId, message, nextStep, extractedData, recommendations } = action.payload;

      // Add user message (already in state, but ensure it's there)
      const userMessage: AIMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: state.lastUserMessage || '',
        timestamp: new Date().toISOString(),
      };

      // Add AI message
      const aiMessage: AIMessage = {
        id: message.id,
        role: 'assistant',
        content: message.content,
        timestamp: message.timestamp,
        quickReplies: message.quickReplies,
      };

      return {
        ...state,
        conversationId,
        messages: [...state.messages, userMessage, aiMessage],
        currentStep: nextStep,
        extractedData: {
          ...state.extractedData,
          ...extractedData,
        },
        recommendations: recommendations || state.recommendations,
        isAIThinking: false,
        lastUserMessage: null,
        canRetry: false,
      };
    }

    case 'SEND_MESSAGE_ERROR':
      return {
        ...state,
        isAIThinking: false,
        error: action.payload.error,
        canRetry: true,
      };

    case 'LOAD_CONVERSATION_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'LOAD_CONVERSATION_SUCCESS':
      return {
        ...state,
        conversationId: action.payload.conversationId,
        messages: action.payload.messages,
        currentStep: action.payload.currentStep,
        extractedData: action.payload.extractedData,
        recommendations: action.payload.recommendations,
        isLoading: false,
      };

    case 'LOAD_CONVERSATION_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case 'RESET_CONVERSATION':
      return initialState;

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
        canRetry: false,
      };

    default:
      return state;
  }
}

/**
 * React hook for managing AI chat conversations
 *
 * @example
 * ```tsx
 * const {
 *   messages,
 *   sendMessage,
 *   selectQuickReply,
 *   isAIThinking
 * } = useAIChat();
 *
 * // Send a message
 * await sendMessage('I want to create a trading bot');
 *
 * // Handle quick reply click
 * await selectQuickReply('Generate passive income');
 * ```
 */
export function useAIChat() {
  const [state, dispatch] = useReducer(aiChatReducer, initialState);
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * Send a message to the AI assistant
   */
  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) {
        return;
      }

      dispatch({ type: 'SEND_MESSAGE_START', payload: { message } });

      try {
        const request: ChatRequest = {
          conversationId: state.conversationId || undefined,
          message,
          currentStep: state.currentStep,
        };

        const response = await aiChatClient.sendMessage(request);

        if (isMountedRef.current) {
          dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: response });
        }
      } catch (error) {
        if (isMountedRef.current) {
          dispatch({
            type: 'SEND_MESSAGE_ERROR',
            payload: {
              error: error instanceof Error ? error.message : 'Failed to send message',
            },
          });
        }
      }
    },
    [state.conversationId, state.currentStep]
  );

  /**
   * Handle quick reply button click
   */
  const selectQuickReply = useCallback(
    async (quickReply: QuickReply) => {
      await sendMessage(quickReply.label);
    },
    [sendMessage]
  );

  /**
   * Retry the last failed message
   */
  const retryLastMessage = useCallback(async () => {
    if (state.lastUserMessage && state.canRetry) {
      dispatch({ type: 'CLEAR_ERROR' });
      await sendMessage(state.lastUserMessage);
    }
  }, [state.lastUserMessage, state.canRetry, sendMessage]);

  /**
   * Load an existing conversation
   */
  const loadConversation = useCallback(async (conversationId: string) => {
    dispatch({ type: 'LOAD_CONVERSATION_START' });

    try {
      const conversation = await aiChatClient.loadConversation(conversationId);

      if (!conversation) {
        throw new Error('Conversation not found');
      }

      if (isMountedRef.current) {
        dispatch({
          type: 'LOAD_CONVERSATION_SUCCESS',
          payload: {
            conversationId: conversation.id,
            messages: (conversation.messages as AIMessage[]) || [],
            currentStep: conversation.current_step,
            extractedData: {
              trading_goal: conversation.trading_goal,
              risk_tolerance: conversation.risk_tolerance,
              capital_amount: conversation.capital_amount,
              experience_level: conversation.experience_level,
              preferred_pairs: conversation.preferred_pairs,
              recommended_strategy: conversation.recommended_strategy,
            },
            recommendations: (conversation.recommended_params as BotOption[]) || [],
          },
        });
      }
    } catch (error) {
      if (isMountedRef.current) {
        dispatch({
          type: 'LOAD_CONVERSATION_ERROR',
          payload: {
            error: error instanceof Error ? error.message : 'Failed to load conversation',
          },
        });
      }
    }
  }, []);

  /**
   * Resume the most recent incomplete conversation (if any)
   */
  const resumeConversation = useCallback(async () => {
    dispatch({ type: 'LOAD_CONVERSATION_START' });

    try {
      const conversation = await aiChatClient.getRecentIncompleteConversation();

      if (!conversation) {
        // No conversation to resume, start fresh
        if (isMountedRef.current) {
          dispatch({ type: 'RESET_CONVERSATION' });
        }
        return false;
      }

      if (isMountedRef.current) {
        dispatch({
          type: 'LOAD_CONVERSATION_SUCCESS',
          payload: {
            conversationId: conversation.id,
            messages: (conversation.messages as AIMessage[]) || [],
            currentStep: conversation.current_step,
            extractedData: {
              trading_goal: conversation.trading_goal,
              risk_tolerance: conversation.risk_tolerance,
              capital_amount: conversation.capital_amount,
              experience_level: conversation.experience_level,
              preferred_pairs: conversation.preferred_pairs,
              recommended_strategy: conversation.recommended_strategy,
            },
            recommendations: (conversation.recommended_params as BotOption[]) || [],
          },
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to resume conversation:', error);
      if (isMountedRef.current) {
        dispatch({
          type: 'LOAD_CONVERSATION_ERROR',
          payload: {
            error: error instanceof Error ? error.message : 'Failed to load conversation',
          },
        });
      }
      return false;
    }
  }, []);

  /**
   * Create a bot from a selected option
   */
  const createBotFromOption = useCallback(
    async (optionId: string, customizations?: any) => {
      if (!state.conversationId) {
        throw new Error('No active conversation');
      }

      try {
        const result = await aiChatClient.createBotFromOption({
          conversationId: state.conversationId,
          optionId,
          customizations,
        });

        return result.botId;
      } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to create bot');
      }
    },
    [state.conversationId]
  );

  /**
   * Delete the current conversation
   */
  const deleteConversation = useCallback(async () => {
    if (!state.conversationId) {
      return;
    }

    try {
      await aiChatClient.deleteConversation(state.conversationId);
      dispatch({ type: 'RESET_CONVERSATION' });
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      // Still reset local state even if deletion fails
      dispatch({ type: 'RESET_CONVERSATION' });
    }
  }, [state.conversationId]);

  /**
   * Reset to start a new conversation
   */
  const resetConversation = useCallback(() => {
    dispatch({ type: 'RESET_CONVERSATION' });
  }, []);

  /**
   * Clear current error
   */
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  /**
   * Check if user can create a new conversation (rate limiting)
   */
  const checkConversationLimit = useCallback(async () => {
    return await aiChatClient.checkConversationLimit();
  }, []);

  return {
    // State
    conversationId: state.conversationId,
    messages: state.messages,
    currentStep: state.currentStep,
    extractedData: state.extractedData,
    recommendations: state.recommendations,
    isAIThinking: state.isAIThinking,
    isLoading: state.isLoading,
    error: state.error,
    canRetry: state.canRetry,

    // Actions
    sendMessage,
    selectQuickReply,
    retryLastMessage,
    loadConversation,
    resumeConversation,
    createBotFromOption,
    deleteConversation,
    resetConversation,
    clearError,
    checkConversationLimit,
  };
}

/**
 * Hook return type for external use
 */
export type UseAIChatReturn = ReturnType<typeof useAIChat>;

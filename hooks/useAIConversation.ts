/**
 * useAIConversation Hook
 *
 * Manages AI conversation state and provides methods for interacting with the conversation
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { ConversationState, ConversationMessage, BotCreationData } from '@/types/bot';
import * as aiChatApi from '@/lib/api/ai-chat';
import { toast } from 'sonner';

export interface UseAIConversationReturn {
  // State
  conversation: ConversationState | null;
  messages: ConversationMessage[];
  currentConfig: Partial<BotCreationData>;
  currentStep: number;
  isComplete: boolean;
  readyToDeploy: boolean;
  isLoading: boolean;
  error: string | null;

  // Conversation-level properties
  tradingGoal?: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  riskTolerance?: 'low' | 'medium' | 'high';

  // Actions
  sendMessage: (message: string) => Promise<void>;
  restart: () => Promise<void>;
  deployBot: () => Promise<void>;
}

export function useAIConversation(conversationId?: string): UseAIConversationReturn {
  const router = useRouter();
  const [conversation, setConversation] = useState<ConversationState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derived state
  const messages = conversation?.messages || [];
  const currentConfig = conversation?.config || {};
  const currentStep = conversation?.currentStep || 1;
  const isComplete = conversation?.isComplete || false;
  const readyToDeploy = conversation?.config?.readyToDeploy || false;
  const tradingGoal = conversation?.tradingGoal;
  const experienceLevel = conversation?.experienceLevel;
  const riskTolerance = conversation?.riskTolerance;

  /**
   * Initialize conversation
   */
  useEffect(() => {
    async function initialize() {
      if (!conversationId) {
        // Create new conversation
        setIsLoading(true);
        try {
          const newConversation = await aiChatApi.createConversation();
          setConversation(newConversation);
          setError(null);
        } catch (err) {
          console.error('Failed to create conversation:', err);
          setError(err instanceof Error ? err.message : 'Failed to create conversation');
          toast.error('Failed to start conversation');
        } finally {
          setIsLoading(false);
        }
      } else {
        // Load existing conversation
        setIsLoading(true);
        try {
          const existingConversation = await aiChatApi.getConversation(conversationId);
          setConversation(existingConversation);
          setError(null);
        } catch (err) {
          console.error('Failed to load conversation:', err);
          setError(err instanceof Error ? err.message : 'Failed to load conversation');
          toast.error('Failed to load conversation');
        } finally {
          setIsLoading(false);
        }
      }
    }

    initialize();
  }, [conversationId]);

  /**
   * Send a message
   */
  const sendMessage = useCallback(async (message: string) => {
    if (!conversation) {
      toast.error('No active conversation');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { message: aiMessage, conversation: updatedConversation } = await aiChatApi.sendMessage(
        conversation.id,
        message
      );

      setConversation(updatedConversation);

      // Show validation messages
      if (aiMessage.validation) {
        if (aiMessage.validation.type === 'error') {
          toast.error(aiMessage.validation.message);
        } else if (aiMessage.validation.type === 'warning') {
          toast.warning(aiMessage.validation.message);
        }
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [conversation]);

  /**
   * Restart conversation
   */
  const restart = useCallback(async () => {
    if (!conversation) return;

    setIsLoading(true);
    try {
      // Delete old conversation
      await aiChatApi.deleteConversation(conversation.id);

      // Create new conversation
      const newConversation = await aiChatApi.createConversation();
      setConversation(newConversation);
      setError(null);
      toast.success('Conversation restarted');
    } catch (err) {
      console.error('Failed to restart conversation:', err);
      setError(err instanceof Error ? err.message : 'Failed to restart');
      toast.error('Failed to restart conversation');
    } finally {
      setIsLoading(false);
    }
  }, [conversation]);

  /**
   * Deploy bot
   */
  const deployBot = useCallback(async () => {
    if (!conversation) {
      toast.error('No active conversation');
      return;
    }

    if (!conversation.config?.readyToDeploy) {
      toast.error('Please complete all questions before deploying');
      return;
    }

    setIsLoading(true);
    try {
      const { botId } = await aiChatApi.deployBot(conversation.id);

      toast.success('Bot created successfully!', {
        description: 'Your bot is now active and ready to trade.',
      });

      // Navigate to the new bot's detail page
      router.push(`/dashboard/bots/${botId}`);
    } catch (err) {
      console.error('Failed to deploy bot:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to deploy bot';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [conversation, router]);

  return {
    conversation,
    messages,
    currentConfig,
    currentStep,
    isComplete,
    readyToDeploy,
    isLoading,
    error,
    tradingGoal,
    experienceLevel,
    riskTolerance,
    sendMessage,
    restart,
    deployBot,
  };
}

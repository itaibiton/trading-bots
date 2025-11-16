/**
 * Chat Interface Component
 * Main AI chat interface for simple bot creation mode
 * Now connected to real Claude AI API
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AIMessage } from './AIMessage';
import { UserMessage } from './UserMessage';
import { TypingIndicator } from './TypingIndicator';
import { ArrowLeft, Send, RefreshCw, AlertCircle } from 'lucide-react';
import { useAIChat } from '@/hooks/useAIChat';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  onBack?: () => void;
  onComplete?: (data: any) => void;
  onDataUpdate?: (data: any) => void;
}

export function ChatInterface({ onBack, onComplete, onDataUpdate }: ChatInterfaceProps) {
  const {
    messages,
    currentStep,
    extractedData,
    recommendations,
    isAIThinking,
    isLoading,
    error,
    canRetry,
    sendMessage,
    selectQuickReply,
    retryLastMessage,
    resumeConversation,
    clearError,
  } = useAIChat();

  const { toast } = useToast();
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const lastUpdateRef = useRef<string>('');
  const completedRef = useRef(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isAIThinking]);

  // Initialize conversation on mount (runs only once)
  useEffect(() => {
    const initConversation = async () => {
      if (hasInitializedRef.current) return;
      hasInitializedRef.current = true;

      try {
        // Try to resume existing conversation
        const resumed = await resumeConversation();

        if (!resumed) {
          // No conversation to resume, start with welcome message
          await sendMessage('I want to create a trading bot');
        }
      } catch (error) {
        console.error('Failed to initialize conversation:', error);

        // Clear any error states to allow retry
        clearError();

        toast({
          title: 'Connection Error',
          description: 'Failed to start conversation. Please refresh the page.',
          variant: 'destructive',
        });
      }
    };

    initConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Update parent component when data changes (with deduplication)
  useEffect(() => {
    if (extractedData && onDataUpdate) {
      const dataString = JSON.stringify(extractedData);
      if (dataString !== lastUpdateRef.current && dataString !== '{}') {
        lastUpdateRef.current = dataString;
        onDataUpdate(extractedData);
      }
    }
  }, [extractedData, onDataUpdate]);

  // Handle completion (Step 5 with recommendations) - only fire once
  useEffect(() => {
    if (currentStep === 5 && recommendations.length > 0 && onComplete && !completedRef.current) {
      completedRef.current = true;
      // Pass recommendations to parent for bot selection
      onComplete({
        ...extractedData,
        recommendations,
      });
    }
  }, [currentStep, recommendations, extractedData, onComplete]);

  /**
   * Handle quick reply selection
   */
  const handleQuickReply = async (value: string, label: string) => {
    try {
      // Use the quick reply object from AI response
      await selectQuickReply({ id: value, label, value });
    } catch (error) {
      console.error('Failed to send quick reply:', error);
      toast({
        title: 'Failed to send message',
        description: 'Please try again or type your message manually.',
        variant: 'destructive',
      });
    }
  };

  /**
   * Handle strategy selection from cards
   */
  const handleStrategySelect = async (strategyType: string, strategyName: string) => {
    await handleQuickReply(strategyType, strategyName);
  };

  /**
   * Handle manual text input
   */
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isAIThinking) return;

    const message = inputValue.trim();
    setInputValue('');

    try {
      await sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: 'Failed to send message',
        description: 'Your message could not be sent. Please try again.',
        variant: 'destructive',
      });
    }
  };

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Handle retry button click
   */
  const handleRetry = async () => {
    clearError();
    await retryLastMessage();
  };

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <CardHeader className="border-b shrink-0">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon-sm" onClick={onBack}>
              <ArrowLeft className="size-4" />
            </Button>
          )}
          <CardTitle className="text-lg">AI Assistant</CardTitle>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea ref={scrollRef} className="h-full">
          <div className="p-6 space-y-4">
            {/* Loading State */}
            {isLoading && messages.length === 0 && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-3">
                  <RefreshCw className="size-8 animate-spin mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Initializing conversation...</p>
                  <p className="text-xs text-muted-foreground/60">
                    Taking too long? Try refreshing the page.
                  </p>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1;

              if (message.role === 'assistant') {
                return (
                  <AIMessage
                    key={message.id || `assistant-${index}`}
                    message={message}
                    onQuickReply={handleQuickReply}
                    onStrategySelect={handleStrategySelect}
                  />
                );
              } else {
                return (
                  <UserMessage
                    key={message.id || `user-${index}`}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                );
              }
            })}

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>{error}</span>
                  {canRetry && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRetry}
                      className="ml-4"
                    >
                      <RefreshCw className="size-3 mr-1" />
                      Retry
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Typing Indicator */}
            <AnimatePresence>
              {isAIThinking && <TypingIndicator />}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </CardContent>

      {/* Input Area */}
      <div className="border-t p-4 shrink-0">
        <div className="flex items-center gap-2">
          <Input
            placeholder={isAIThinking ? 'AI is typing...' : 'Type your message...'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isAIThinking || isLoading}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isAIThinking || isLoading}
          >
            <Send className="size-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {isAIThinking
            ? 'AI is thinking...'
            : 'Press Enter to send, or click the quick reply buttons above'}
        </p>
      </div>
    </Card>
  );
}

/**
 * Chat Interface Component
 * Main AI chat interface for simple bot creation mode
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AIMessage } from './AIMessage';
import { UserMessage } from './UserMessage';
import { TypingIndicator } from './TypingIndicator';
import { ArrowLeft, Send } from 'lucide-react';
import { useAIConversation } from '@/hooks/useBotCreation';
import { generateAIResponse } from '@/lib/mock-data/ai-responses';

interface ChatInterfaceProps {
  onBack?: () => void;
  onComplete?: (data: any) => void;
  onDataUpdate?: (data: any) => void;
}

export function ChatInterface({ onBack, onComplete, onDataUpdate }: ChatInterfaceProps) {
  const {
    messages,
    isLoading,
    conversationData,
    addMessage,
    updateConversationData,
    setIsLoading,
  } = useAIConversation();

  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  // Send initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = generateAIResponse(1);
      addMessage('assistant', welcomeMessage.content);
    }
  }, []);

  /**
   * Handle quick reply selection
   */
  const handleQuickReply = (value: string, label: string) => {
    // Add user message
    addMessage('user', label);

    // Update conversation data based on step
    if (currentStep === 1) {
      // User selected trading goal
      updateConversationData({ goal: value });
      onDataUpdate?.({ goal: value });
      setTimeout(() => {
        setIsLoading(true);
        setTimeout(() => {
          const aiResponse = generateAIResponse(2, value);
          addMessage('assistant', aiResponse.content);
          setIsLoading(false);
          setCurrentStep(2);
        }, 1000);
      }, 300);
    } else if (currentStep === 2) {
      // User selected risk level
      updateConversationData({ risk: value as any });
      onDataUpdate?.({ risk: value as any });
      setTimeout(() => {
        setIsLoading(true);
        setTimeout(() => {
          const aiResponse = generateAIResponse(3);
          addMessage('assistant', aiResponse.content);
          setIsLoading(false);
          setCurrentStep(3);
        }, 1000);
      }, 300);
    } else if (currentStep === 3) {
      // User selected capital amount
      const capital = value === 'custom' ? null : parseFloat(value);
      if (capital) {
        updateConversationData({ capital });
        onDataUpdate?.({ capital });
        setTimeout(() => {
          setIsLoading(true);
          setTimeout(() => {
            const aiResponse = generateAIResponse(
              4,
              conversationData.goal,
              conversationData.risk
            );
            addMessage('assistant', aiResponse.content);
            setIsLoading(false);
            setCurrentStep(4);
          }, 1000);
        }, 300);
      } else {
        // Handle custom amount - show input
        addMessage('assistant', 'Please enter your custom amount in USDT:');
        setCurrentStep(3.5); // Sub-step for custom input
      }
    } else if (currentStep === 4) {
      // User selected strategy
      updateConversationData({ recommendedStrategy: value as any });
      onDataUpdate?.({ strategy: value as any });
      setTimeout(() => {
        setIsLoading(true);
        setTimeout(() => {
          const summaryMessage = `Perfect! Let me set up your bot with safe defaults.

**Your Bot Configuration:**
• Strategy: ${value}
• Trading Pair: BTC/USDT
• Capital: $${conversationData.capital}
• Risk Level: ${conversationData.risk}
• Trading Mode: Paper (virtual money)

Ready to create your bot?`;
          addMessage('assistant', summaryMessage);
          setIsLoading(false);
          setCurrentStep(5);
        }, 1500);
      }, 300);
    } else if (currentStep === 5) {
      // Final step - create bot
      if (value === 'create' && onComplete) {
        onComplete(conversationData);
      }
    }
  };

  /**
   * Handle strategy selection from cards
   */
  const handleStrategySelect = (strategyType: string, strategyName: string) => {
    handleQuickReply(strategyType, strategyName);
  };

  /**
   * Handle manual text input
   */
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage('user', inputValue);

    // Handle custom capital input
    if (currentStep === 3.5) {
      const capital = parseFloat(inputValue);
      if (!isNaN(capital) && capital >= 10) {
        updateConversationData({ capital });
        onDataUpdate?.({ capital });
        setInputValue('');
        setTimeout(() => {
          setIsLoading(true);
          setTimeout(() => {
            const aiResponse = generateAIResponse(
              4,
              conversationData.goal,
              conversationData.risk
            );
            addMessage('assistant', aiResponse.content);
            setIsLoading(false);
            setCurrentStep(4);
          }, 1000);
        }, 300);
      } else {
        setTimeout(() => {
          addMessage('assistant', 'Please enter a valid amount (minimum $10):');
        }, 500);
      }
    }

    setInputValue('');
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

  // Get the last AI message for rendering
  const lastAIMessage = messages
    .slice()
    .reverse()
    .find((msg) => msg.role === 'assistant');

  const lastAIMessageWithReplies = lastAIMessage
    ? generateAIResponse(
        currentStep,
        conversationData.goal,
        conversationData.risk
      )
    : null;

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
            {messages.map((message, index) => {
              if (message.role === 'assistant') {
                // Only show quick replies on the last AI message
                const isLastAI =
                  index ===
                  messages.length -
                    1 -
                    messages
                      .slice(index + 1)
                      .findIndex((m) => m.role === 'assistant');

                return (
                  <AIMessage
                    key={`${message.role}-${index}`}
                    message={{
                      ...message,
                      quickReplies:
                        isLastAI && lastAIMessageWithReplies?.quickReplies
                          ? lastAIMessageWithReplies.quickReplies
                          : undefined,
                    }}
                    onQuickReply={handleQuickReply}
                    onStrategySelect={handleStrategySelect}
                  />
                );
              } else {
                return (
                  <UserMessage
                    key={`${message.role}-${index}`}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                );
              }
            })}

            {/* Typing Indicator */}
            <AnimatePresence>
              {isLoading && <TypingIndicator />}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </CardContent>

      {/* Input Area */}
      <div className="border-t p-4 shrink-0">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
          >
            <Send className="size-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, or click the quick reply buttons above
        </p>
      </div>
    </Card>
  );
}

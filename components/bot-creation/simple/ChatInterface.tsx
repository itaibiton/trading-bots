/**
 * Chat Interface Component
 *
 * Main chat UI for AI-guided bot creation
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, RotateCcw, Sparkles, Bot, User } from 'lucide-react';
import type { ConversationMessage } from '@/types/bot';
import { cn } from '@/lib/utils';

export interface ChatInterfaceProps {
  messages: ConversationMessage[];
  currentStep: number;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onRestart: () => void;
  onBack: () => void;
}

export function ChatInterface({
  messages,
  currentStep,
  isLoading,
  onSendMessage,
  onRestart,
  onBack,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (reply: string) => {
    if (isLoading) return;
    onSendMessage(reply);
  };

  // Get the last AI message's quick replies
  const lastAiMessage = [...messages].reverse().find((m) => m.role === 'assistant');
  const quickReplies = lastAiMessage?.quickReplies || [];

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h2 className="font-semibold flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              AI-Guided Bot Creation
            </h2>
            <p className="text-sm text-muted-foreground">Step {currentStep}/5</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onRestart}>
          <RotateCcw className="size-4 mr-2" />
          Restart
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <MessageBubble key={message.id} message={message} index={index} />
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-3"
          >
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot className="size-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="inline-block px-4 py-3 rounded-2xl bg-muted">
                <div className="flex gap-1">
                  <div className="size-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]" />
                  <div className="size-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]" />
                  <div className="size-2 rounded-full bg-muted-foreground/50 animate-bounce" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {quickReplies.length > 0 && !isLoading && (
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply)}
                className="text-sm"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!input.trim() || isLoading}>
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Message Bubble Component
 */
interface MessageBubbleProps {
  message: ConversationMessage;
  index: number;
}

function MessageBubble({ message, index }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05 }}
      className={cn('flex items-start gap-3', isUser && 'flex-row-reverse')}
    >
      {/* Avatar */}
      <div
        className={cn(
          'size-8 rounded-full flex items-center justify-center flex-shrink-0',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4 text-primary" />}
      </div>

      {/* Message Content */}
      <div className={cn('flex-1 max-w-[80%]', isUser && 'flex flex-col items-end')}>
        <div
          className={cn(
            'inline-block px-4 py-3 rounded-2xl',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Validation Badge */}
        {message.validation && (
          <Badge
            variant={
              message.validation.type === 'error'
                ? 'destructive'
                : message.validation.type === 'warning'
                ? 'secondary'
                : 'default'
            }
            className="mt-2"
          >
            {message.validation.type === 'error' && '⚠️ '}
            {message.validation.type === 'warning' && '⚡ '}
            {message.validation.type === 'info' && 'ℹ️ '}
            {message.validation.message}
          </Badge>
        )}

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  );
}

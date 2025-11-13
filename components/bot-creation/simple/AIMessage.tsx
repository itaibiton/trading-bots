/**
 * AI Message Component
 * Displays AI messages with avatar, content, and optional quick reply buttons
 */

'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AIMessage as AIMessageType } from '@/types/bot';
import { QuickReplyButtons } from './QuickReplyButtons';
import { StrategyTemplateCard } from './StrategyTemplateCard';
import { Bot } from 'lucide-react';

interface AIMessageProps {
  message: AIMessageType;
  onQuickReply?: (value: string, label: string) => void;
  onStrategySelect?: (strategyType: string, label: string) => void;
}

export function AIMessage({ message, onQuickReply, onStrategySelect }: AIMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-start gap-3 w-full"
    >
      {/* AI Avatar */}
      <Avatar className="size-8 shrink-0 mt-1">
        <AvatarFallback className="bg-primary/10 text-primary">
          <Bot className="size-4" />
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className="flex-1 space-y-3 max-w-[85%]">
        <Card className="bg-muted border-muted-foreground/10">
          <div className="p-4">
            <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>
          </div>
        </Card>

        {/* Quick Reply Buttons */}
        {message.quickReplies && message.quickReplies.length > 0 && onQuickReply && (
          <QuickReplyButtons quickReplies={message.quickReplies} onSelect={onQuickReply} />
        )}

        {/* Strategy Template Cards (if showing strategy options) */}
        {message.content.includes('Show other strategies') && onStrategySelect && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <StrategyTemplateCard
              type="dca"
              name="DCA"
              description="Buy fixed amount at regular intervals"
              risk="low"
              expectedReturn={15}
              icon="📊"
              onSelect={onStrategySelect}
            />
            <StrategyTemplateCard
              type="grid"
              name="Grid Trading"
              description="Place buy/sell orders in a price grid"
              risk="medium"
              expectedReturn={25}
              icon="⚡"
              onSelect={onStrategySelect}
            />
            <StrategyTemplateCard
              type="mean-reversion"
              name="Mean Reversion"
              description="Buy dips, sell peaks"
              risk="medium"
              expectedReturn={30}
              icon="🎯"
              onSelect={onStrategySelect}
            />
            <StrategyTemplateCard
              type="momentum"
              name="Momentum"
              description="Follow strong price trends"
              risk="high"
              expectedReturn={40}
              icon="🚀"
              onSelect={onStrategySelect}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

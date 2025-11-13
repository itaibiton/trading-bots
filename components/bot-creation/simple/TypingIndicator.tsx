/**
 * Typing Indicator Component
 * Shows three bouncing dots when AI is "thinking"
 */

'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-3 w-full"
    >
      {/* AI Avatar */}
      <Avatar className="size-8 shrink-0 mt-1">
        <AvatarFallback className="bg-primary/10 text-primary">
          <Bot className="size-4" />
        </AvatarFallback>
      </Avatar>

      {/* Typing Animation */}
      <Card className="bg-muted border-muted-foreground/10">
        <div className="p-4 flex items-center gap-1.5">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="size-2 rounded-full bg-muted-foreground/40"
              animate={{
                y: [-2, 2, -2],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

/**
 * User Message Component
 * Displays user messages with right-aligned styling
 */

'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface UserMessageProps {
  content: string;
  timestamp?: string;
}

export function UserMessage({ content, timestamp }: UserMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex justify-end w-full"
    >
      <div className="max-w-[85%]">
        <Card className="bg-primary text-primary-foreground border-primary">
          <div className="p-4">
            <div className="text-sm leading-relaxed">{content}</div>
          </div>
        </Card>
        {timestamp && (
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {new Date(timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

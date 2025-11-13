/**
 * Quick Reply Buttons Component
 * Grid of quick reply options for AI chat
 */

'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QuickReply } from '@/types/bot';
import { useState } from 'react';

interface QuickReplyButtonsProps {
  quickReplies: QuickReply[];
  onSelect: (value: string, label: string) => void;
}

export function QuickReplyButtons({ quickReplies, onSelect }: QuickReplyButtonsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (reply: QuickReply) => {
    setSelectedId(reply.id);
    onSelect(reply.value, reply.label);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {quickReplies.map((reply, index) => (
        <motion.div
          key={reply.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full h-auto py-2 px-3 text-xs font-normal hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
            disabled={selectedId !== null}
            onClick={() => handleSelect(reply)}
          >
            <span className="text-center leading-tight">{reply.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

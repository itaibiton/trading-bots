/**
 * Conversation Progress Component
 * Visual progress indicator for the 5-step bot creation conversation
 */

'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Target,
  TrendingUp,
  DollarSign,
  Settings,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversationProgressProps {
  currentStep: number;
  className?: string;
}

const steps = [
  {
    step: 1,
    label: 'Your Goal',
    description: 'What do you want to achieve?',
    icon: Target,
  },
  {
    step: 2,
    label: 'Risk Level',
    description: 'How much risk can you handle?',
    icon: TrendingUp,
  },
  {
    step: 3,
    label: 'Capital',
    description: 'How much to invest?',
    icon: DollarSign,
  },
  {
    step: 4,
    label: 'Strategy',
    description: 'Which trading approach?',
    icon: Settings,
  },
  {
    step: 5,
    label: 'Review',
    description: 'Choose your bot',
    icon: CheckCircle2,
  },
];

export function ConversationProgress({ currentStep, className }: ConversationProgressProps) {
  return (
    <Card className={cn('p-4', className)}>
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />

        {/* Animated Progress Bar */}
        <motion.div
          className="absolute top-6 left-0 h-0.5 bg-primary"
          initial={{ width: '0%' }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.step;
            const isCurrent = currentStep === step.step;
            const isUpcoming = currentStep < step.step;

            return (
              <div
                key={step.step}
                className={cn(
                  'flex flex-col items-center gap-2 flex-1',
                  index !== steps.length - 1 && 'pr-4'
                )}
              >
                {/* Step Circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'relative size-12 rounded-full border-2 flex items-center justify-center transition-colors z-10',
                    isCompleted && 'bg-primary border-primary text-primary-foreground',
                    isCurrent && 'bg-primary/10 border-primary text-primary animate-pulse',
                    isUpcoming && 'bg-background border-muted-foreground/30 text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="size-6" />
                  ) : (
                    <Icon className="size-5" />
                  )}

                  {/* Step Number Badge */}
                  {!isCompleted && (
                    <span
                      className={cn(
                        'absolute -top-1 -right-1 size-5 rounded-full flex items-center justify-center text-xs font-semibold border-2',
                        isCurrent
                          ? 'bg-primary text-primary-foreground border-background'
                          : 'bg-muted text-muted-foreground border-background'
                      )}
                    >
                      {step.step}
                    </span>
                  )}
                </motion.div>

                {/* Step Label */}
                <div className="text-center">
                  <p
                    className={cn(
                      'text-sm font-medium transition-colors',
                      isCurrent && 'text-foreground',
                      isCompleted && 'text-primary',
                      isUpcoming && 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </p>
                  <p
                    className={cn(
                      'text-xs transition-colors hidden sm:block',
                      isCurrent && 'text-muted-foreground',
                      isCompleted && 'text-muted-foreground',
                      isUpcoming && 'text-muted-foreground/50'
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Step Indicator */}
      <div className="mt-4 sm:hidden text-center">
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </p>
      </div>
    </Card>
  );
}

/**
 * Compact version for smaller spaces (e.g., mobile header)
 */
export function ConversationProgressCompact({ currentStep }: ConversationProgressProps) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step) => (
        <div
          key={step.step}
          className={cn(
            'size-2 rounded-full transition-all',
            currentStep > step.step && 'bg-primary',
            currentStep === step.step && 'bg-primary scale-125',
            currentStep < step.step && 'bg-muted-foreground/30'
          )}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">
        {currentStep}/{steps.length}
      </span>
    </div>
  );
}

/**
 * Bot Options Display Component
 * Shows 3 AI-generated bot configurations (Conservative, Balanced, Aggressive)
 * Displayed at Step 5 of the conversation flow
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  Shield,
  Zap,
  Check,
  Sparkles,
} from 'lucide-react';
import type { BotOption } from '@/lib/api/ai-chat';
import { cn } from '@/lib/utils';

interface BotOptionsDisplayProps {
  options: BotOption[];
  onSelectOption: (optionId: string) => void;
  isCreating?: boolean;
}

const riskColors = {
  low: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  medium: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  high: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

const riskIcons = {
  low: Shield,
  medium: Target,
  high: Zap,
};

export function BotOptionsDisplay({ options, onSelectOption, isCreating }: BotOptionsDisplayProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    onSelectOption(optionId);
  };

  if (options.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Sparkles className="size-12 mx-auto mb-3 opacity-50" />
        <p>No bot options available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
          <Sparkles className="size-5 text-primary" />
          AI-Generated Bot Configurations
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose the bot that best matches your risk tolerance and goals
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {options.map((option, index) => {
          const RiskIcon = riskIcons[option.riskLevel as keyof typeof riskIcons];
          const isSelected = selectedOption === option.id;
          const isRecommended = index === 1; // Middle option (Balanced) is default recommendation

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  'relative overflow-hidden transition-all cursor-pointer hover:shadow-lg',
                  isSelected && 'ring-2 ring-primary',
                  isRecommended && 'border-primary/50'
                )}
                onClick={() => !isCreating && handleSelect(option.id)}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="default" className="gap-1">
                      <Sparkles className="size-3" />
                      Recommended
                    </Badge>
                  </div>
                )}

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="size-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="size-4 text-primary-foreground" />
                    </div>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={cn(
                        'size-8 rounded-lg flex items-center justify-center border',
                        riskColors[option.riskLevel as keyof typeof riskColors]
                      )}
                    >
                      <RiskIcon className="size-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{option.name}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {option.strategyType.toUpperCase()} Strategy
                      </CardDescription>
                    </div>
                  </div>

                  {/* Risk Level Badge */}
                  <Badge
                    variant="outline"
                    className={cn('w-fit', riskColors[option.riskLevel as keyof typeof riskColors])}
                  >
                    {option.riskLevel.charAt(0).toUpperCase() + option.riskLevel.slice(1)} Risk
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Expected Returns */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <TrendingUp className="size-3.5" />
                        Expected Returns
                      </span>
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {option.expectedReturn.min}% - {option.expectedReturn.max}%
                      </span>
                    </div>
                    <Progress value={option.expectedReturn.max} className="h-1.5" />
                  </div>

                  {/* Max Drawdown */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <TrendingDown className="size-3.5" />
                        Max Drawdown
                      </span>
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                        {option.maxDrawdown}%
                      </span>
                    </div>
                    <Progress value={option.maxDrawdown} className="h-1.5 bg-red-100 dark:bg-red-950" />
                  </div>

                  {/* Win Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Target className="size-3.5" />
                        Win Rate
                      </span>
                      <span className="text-sm font-semibold">
                        {option.winRate}%
                      </span>
                    </div>
                    <Progress value={option.winRate} className="h-1.5 bg-blue-100 dark:bg-blue-950" />
                  </div>

                  {/* Capital Allocation */}
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <DollarSign className="size-3.5" />
                        Capital
                      </span>
                      <span className="font-semibold">
                        ${option.config.capitalAllocated.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Risk Controls */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stop Loss</span>
                      <span className="font-medium">{option.config.stopLossPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Take Profit</span>
                      <span className="font-medium">{option.config.takeProfitPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Position</span>
                      <span className="font-medium">{option.config.maxPositionSize}%</span>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground italic">
                      "{option.reasoning}"
                    </p>
                  </div>

                  {/* AI Confidence */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">AI Confidence</span>
                    <Progress value={option.confidence} className="h-1 flex-1" />
                    <span className="text-xs font-medium">{option.confidence}%</span>
                  </div>

                  {/* Select Button */}
                  <Button
                    className="w-full mt-2"
                    variant={isSelected ? 'default' : 'outline'}
                    disabled={isCreating}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(option.id);
                    }}
                  >
                    {isCreating && isSelected ? (
                      <>
                        <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Creating Bot...
                      </>
                    ) : isSelected ? (
                      <>
                        <Check className="size-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      'Select This Bot'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Info Footer */}
      <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
        <p className="text-sm text-muted-foreground text-center">
          💡 <strong>Tip:</strong> Start with the recommended option, or choose based on your risk
          tolerance. You can always adjust settings later in the bot dashboard.
        </p>
      </div>
    </div>
  );
}

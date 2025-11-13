/**
 * Bot Preview Component - Enhanced
 * Live preview of bot configuration as user progresses through chat
 * Features: Progress indicator, risk gauge, mini chart, confidence builder
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, DollarSign, Shield, TrendingUp, Target, CheckCircle2, Sparkles } from 'lucide-react';
import { RiskLevel, StrategyType } from '@/types/bot';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

interface BotPreviewProps {
  goal?: string;
  risk?: RiskLevel;
  capital?: number;
  strategy?: StrategyType;
  currentStep?: number; // 1-5
}

const goalLabels: Record<string, string> = {
  passive_income: 'Passive Income',
  growth: 'Portfolio Growth',
  volatility: 'Profit from Volatility',
  learning: 'Learning to Trade',
};

const goalIcons: Record<string, string> = {
  passive_income: '💰',
  growth: '📈',
  volatility: '⚡',
  learning: '🎓',
};

const riskColors = {
  low: 'bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400',
  medium: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400',
  high: 'bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-400',
};

const riskLabels = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
};

const riskPercentages = {
  low: 25,
  medium: 60,
  high: 90,
};

const strategyLabels: Record<StrategyType, string> = {
  dca: 'DCA (Dollar Cost Averaging)',
  grid: 'Grid Trading',
  momentum: 'Momentum Trading',
  'mean-reversion': 'Mean Reversion',
};

const strategyIcons: Record<StrategyType, string> = {
  dca: '📊',
  grid: '⚡',
  momentum: '🚀',
  'mean-reversion': '🎯',
};

const strategyColors: Record<StrategyType, string> = {
  dca: 'text-green-600 dark:text-green-400',
  grid: 'text-blue-600 dark:text-blue-400',
  momentum: 'text-purple-600 dark:text-purple-400',
  'mean-reversion': 'text-orange-600 dark:text-orange-400',
};

// Steps for progress indicator
const steps = [
  { id: 1, label: 'Goal', icon: Target },
  { id: 2, label: 'Risk', icon: Shield },
  { id: 3, label: 'Capital', icon: DollarSign },
  { id: 4, label: 'Strategy', icon: TrendingUp },
  { id: 5, label: 'Review', icon: CheckCircle2 },
];

export function BotPreview({ goal, risk, capital, strategy, currentStep = 0 }: BotPreviewProps) {
  const hasData = goal || risk || capital || strategy;

  // Determine current step based on data if not provided
  const activeStep = currentStep || (
    strategy ? 4 : capital ? 3 : risk ? 2 : goal ? 1 : 0
  );

  // Generate mock chart data based on strategy
  const chartData = useMemo(() => {
    if (!strategy) return [];

    const months = 12;
    const data = [];
    const baseReturn = {
      dca: 1.5,
      grid: 2.0,
      momentum: 2.5,
      'mean-reversion': 1.8,
    }[strategy];

    for (let i = 0; i <= months; i++) {
      const volatility = Math.sin(i * 0.5) * 0.1;
      const trend = (i / months) * baseReturn;
      data.push({
        month: i,
        value: 100 + (trend * 100) + (volatility * 100),
      });
    }

    return data;
  }, [strategy]);

  // Confidence builder points based on configuration
  const confidencePoints = useMemo(() => {
    const points = [];

    if (risk === 'low') {
      points.push('Protected by conservative risk limits');
    } else if (risk === 'medium') {
      points.push('Balanced risk-reward ratio');
    } else if (risk === 'high') {
      points.push('Higher potential returns');
    }

    if (strategy === 'dca') {
      points.push('Proven long-term accumulation strategy');
    } else if (strategy === 'grid') {
      points.push('Profits from market volatility');
    } else if (strategy === 'momentum') {
      points.push('Captures strong market trends');
    } else if (strategy === 'mean-reversion') {
      points.push('Exploits price corrections');
    }

    if (capital) {
      points.push('Paper trading mode - zero real money risk');
    }

    points.push('24/7 automated execution');
    points.push('AI-optimized parameters');

    return points;
  }, [risk, strategy, capital]);

  // Calculate estimated returns based on strategy
  const estimatedReturn = useMemo(() => {
    if (!strategy || !capital) return null;

    const baseReturns = {
      dca: { low: 8, medium: 12, high: 15 },
      grid: { low: 10, medium: 15, high: 20 },
      momentum: { low: 12, medium: 18, high: 25 },
      'mean-reversion': { low: 9, medium: 14, high: 18 },
    };

    const percentage = baseReturns[strategy][risk || 'medium'];
    return {
      percentage,
      amount: (capital * percentage) / 100,
    };
  }, [strategy, risk, capital]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="size-5 text-primary" />
          <CardTitle className="text-lg">Bot Preview</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-6">
        {/* Progress Indicator */}
        {hasData && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isComplete = activeStep > step.id;
                const isActive = activeStep === step.id;

                return (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                      }}
                      className={`flex flex-col items-center gap-1 ${
                        isComplete || isActive ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      <div
                        className={`size-8 rounded-full flex items-center justify-center transition-colors ${
                          isComplete
                            ? 'bg-primary text-primary-foreground'
                            : isActive
                            ? 'bg-primary/20 text-primary border-2 border-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <span className="text-xs font-medium">{step.label}</span>
                    </motion.div>

                    {index < steps.length - 1 && (
                      <div className="h-0.5 w-8 mx-1 bg-muted relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-primary"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: activeStep > step.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ transformOrigin: 'left' }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Progress value={(activeStep / steps.length) * 100} className="h-1" />
          </motion.div>
        )}

        <Separator />

        <AnimatePresence mode="wait">
          {!hasData ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center justify-center text-center py-8 text-muted-foreground"
            >
              <div>
                <Bot className="size-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Your bot configuration will appear here as you chat with the AI assistant.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 space-y-6"
            >
              {/* Bot Configuration Card */}
              <div className="grid grid-cols-2 gap-4">
                {/* Trading Goal */}
                {goal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Target className="size-3" />
                      <span>Trading Goal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{goalIcons[goal]}</span>
                      <span className="text-sm font-medium">{goalLabels[goal]}</span>
                    </div>
                  </motion.div>
                )}

                {/* Risk Level */}
                {risk && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="size-3" />
                      <span>Risk Level</span>
                    </div>
                    <Badge variant="outline" className={riskColors[risk]}>
                      {riskLabels[risk]}
                    </Badge>
                  </motion.div>
                )}

                {/* Capital */}
                {capital && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <DollarSign className="size-3" />
                      <span>Capital</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold">${capital.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">USDT</p>
                    </div>
                  </motion.div>
                )}

                {/* Strategy */}
                {strategy && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="size-3" />
                      <span>Strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{strategyIcons[strategy]}</span>
                      <span className={`text-sm font-medium ${strategyColors[strategy]}`}>
                        {strategy.toUpperCase()}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Mode Badge */}
                {capital && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="col-span-2"
                  >
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400">
                      Paper Trading Mode
                    </Badge>
                  </motion.div>
                )}
              </div>

              {/* Risk Gauge Visualization */}
              {risk && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Risk Level</span>
                    <span className="font-medium">{riskPercentages[risk]}%</span>
                  </div>
                  <Progress
                    value={riskPercentages[risk]}
                    className={`h-2 ${
                      risk === 'low'
                        ? '[&>div]:bg-green-500'
                        : risk === 'medium'
                        ? '[&>div]:bg-yellow-500'
                        : '[&>div]:bg-red-500'
                    }`}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </motion.div>
              )}

              {/* Mini Performance Chart */}
              {strategy && chartData.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Estimated 12-Month Performance</span>
                    {estimatedReturn && (
                      <span className="font-medium text-green-600 dark:text-green-400">
                        +{estimatedReturn.percentage}%
                      </span>
                    )}
                  </div>
                  <div className="h-20 bg-muted/30 rounded-lg p-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="currentColor"
                          strokeWidth={2}
                          dot={false}
                          className={strategyColors[strategy]}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  {estimatedReturn && (
                    <p className="text-xs text-muted-foreground text-center">
                      Estimated return: ${estimatedReturn.amount.toLocaleString()} over 12 months
                    </p>
                  )}
                </motion.div>
              )}

              {/* Confidence Builder Section */}
              {confidencePoints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-muted/30 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <p className="text-xs font-medium text-foreground">Why This Bot Works</p>
                  </div>
                  <div className="space-y-2">
                    {confidencePoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 className="size-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Summary when complete */}
              {goal && risk && capital && strategy && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                  className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <p className="text-sm font-medium text-foreground">Configuration Complete</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your bot is ready to be created. Confirm in the chat to proceed with paper trading.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

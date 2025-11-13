/**
 * Success Celebration Component
 * Displays a celebratory modal with confetti when a bot is successfully created
 * Features: Confetti animation, bot summary, sequential checkmarks, call-to-action buttons
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  Bot,
  TrendingUp,
  Shield,
  DollarSign,
  ArrowRight,
  LayoutDashboard,
  Plus,
  Sparkles,
} from 'lucide-react';
import { RiskLevel, StrategyType } from '@/types/bot';
import { useRouter } from 'next/navigation';

interface SuccessCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  botData: {
    name: string;
    strategyType: StrategyType;
    riskLevel: RiskLevel;
    capitalAllocated: number;
    botId?: string;
  };
  onViewBot?: () => void;
  onCreateAnother?: () => void;
}

const strategyIcons: Record<StrategyType, string> = {
  dca: '📊',
  grid: '⚡',
  momentum: '🚀',
  'mean-reversion': '🎯',
};

const strategyLabels: Record<StrategyType, string> = {
  dca: 'DCA (Dollar Cost Averaging)',
  grid: 'Grid Trading',
  momentum: 'Momentum Trading',
  'mean-reversion': 'Mean Reversion',
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

// Checkmark animation steps
const checkmarkSteps = [
  {
    id: 1,
    label: 'Bot Created Successfully',
    icon: Bot,
    delay: 0,
  },
  {
    id: 2,
    label: 'Risk Configuration Applied',
    icon: Shield,
    delay: 200,
  },
  {
    id: 3,
    label: 'Paper Trading Activated',
    icon: DollarSign,
    delay: 400,
  },
  {
    id: 4,
    label: 'Ready to Start Trading',
    icon: TrendingUp,
    delay: 600,
  },
];

export function SuccessCelebration({
  isOpen,
  onClose,
  botData,
  onViewBot,
  onCreateAnother,
}: SuccessCelebrationProps) {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [visibleCheckmarks, setVisibleCheckmarks] = useState<number[]>([]);

  // Handle window resize for confetti
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Start confetti and checkmark animations when opened
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setVisibleCheckmarks([]);

      // Show checkmarks sequentially
      checkmarkSteps.forEach((step) => {
        setTimeout(() => {
          setVisibleCheckmarks((prev) => [...prev, step.id]);
        }, step.delay + 500);
      });

      // Stop confetti after 4 seconds
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000);

      return () => {
        clearTimeout(confettiTimer);
      };
    } else {
      setShowConfetti(false);
      setVisibleCheckmarks([]);
    }
  }, [isOpen]);

  const handleViewDashboard = () => {
    onClose();
    if (onViewBot && botData.botId) {
      onViewBot();
    } else {
      router.push('/dashboard');
    }
  };

  const handleCreateAnother = () => {
    onClose();
    if (onCreateAnother) {
      onCreateAnother();
    } else {
      router.refresh();
    }
  };

  const handleStartTrading = () => {
    onClose();
    if (botData.botId) {
      router.push(`/dashboard/bots/${botData.botId}`);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Confetti */}
          {showConfetti && windowSize.width > 0 && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={200}
              recycle={false}
              colors={['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']}
              gravity={0.3}
            />
          )}

          {/* Overlay and Modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <Card className="border-2 border-primary/20 shadow-2xl">
                <CardHeader className="text-center space-y-4 pb-6">
                  {/* Success Checkmark */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                    className="mx-auto"
                  >
                    <div className="size-20 rounded-full bg-green-500/10 border-4 border-green-500 flex items-center justify-center">
                      <CheckCircle2 className="size-12 text-green-600 dark:text-green-400" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <CardTitle className="text-3xl font-bold">
                      Bot Created Successfully!
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Your AI-powered trading bot is ready to start paper trading
                    </p>
                  </motion.div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Bot Summary Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="bg-muted/30">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                            {strategyIcons[botData.strategyType]}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{botData.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {strategyLabels[botData.strategyType]}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400"
                          >
                            Paper Trading
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          {/* Strategy */}
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Strategy</p>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="size-4 text-primary" />
                              <p className="text-sm font-medium">
                                {botData.strategyType.toUpperCase()}
                              </p>
                            </div>
                          </div>

                          {/* Risk Level */}
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Risk Level</p>
                            <Badge variant="outline" className={riskColors[botData.riskLevel]}>
                              {riskLabels[botData.riskLevel]}
                            </Badge>
                          </div>

                          {/* Capital */}
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Capital</p>
                            <p className="text-sm font-bold">
                              ${botData.capitalAllocated.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <Separator />

                  {/* Sequential Checkmarks */}
                  <div className="space-y-3">
                    {checkmarkSteps.map((step) => {
                      const Icon = step.icon;
                      const isVisible = visibleCheckmarks.includes(step.id);

                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: isVisible ? 1 : 0,
                            x: isVisible ? 0 : -20,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                          }}
                          className="flex items-center gap-3"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: isVisible ? 1 : 0 }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 20,
                            }}
                            className="size-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0"
                          >
                            <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
                          </motion.div>
                          <div className="flex-1 flex items-center gap-2">
                            <Icon className="size-4 text-muted-foreground" />
                            <p className="text-sm font-medium">{step.label}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* AI Insight Box */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-primary" />
                      <p className="text-xs font-medium text-foreground">AI Insight</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your bot has been optimized with AI-recommended parameters based on your
                      risk profile. Start paper trading to see how it performs with zero risk
                      before committing real capital.
                    </p>
                  </motion.div>

                  <Separator />

                  {/* Call-to-Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="flex flex-col gap-3"
                  >
                    {/* Primary CTA */}
                    <Button
                      size="lg"
                      onClick={handleStartTrading}
                      className="w-full group"
                    >
                      <span>Start Paper Trading</span>
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    {/* Secondary CTAs */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        onClick={handleViewDashboard}
                        className="w-full"
                      >
                        <LayoutDashboard className="size-4" />
                        <span>View Dashboard</span>
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={handleCreateAnother}
                        className="w-full"
                      >
                        <Plus className="size-4" />
                        <span>Create Another</span>
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

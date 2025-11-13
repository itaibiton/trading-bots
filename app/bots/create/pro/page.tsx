/**
 * Pro Mode Bot Creation
 * Advanced configuration with full control over all parameters
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useBotCreation } from '@/hooks/useBotCreation';
import { StrategyTab } from '@/components/bot-creation/pro/StrategyTab';
import { RiskTab } from '@/components/bot-creation/pro/RiskTab';
import { TechnicalTab } from '@/components/bot-creation/pro/TechnicalTab';
import { BacktestTab } from '@/components/bot-creation/pro/BacktestTab';
import { ReviewTab } from '@/components/bot-creation/pro/ReviewTab';
import { StrategyType } from '@/types/bot';
import { toast } from 'sonner';

export default function ProModePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('strategy');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize bot creation hook
  const { formData, updateFormData, submit } = useBotCreation({
    mode: 'pro',
    onComplete: async (data) => {
      console.log('Bot creation completed:', data);
      // TODO: Submit to Supabase in Phase 2
      toast.success('Bot created successfully!', {
        description: 'Your trading bot has been created and is ready to activate.',
      });
      router.push('/dashboard/bots');
    },
  });

  // Calculate completion percentage
  const calculateProgress = () => {
    let completed = 0;
    const total = 5;

    if (formData.strategyType) completed++;
    if (formData.tradingPair && formData.capitalAllocated) completed++;
    if (
      formData.riskLevel &&
      formData.stopLossPercentage &&
      formData.takeProfitPercentage
    )
      completed++;
    if (formData.tradingMode) completed++;
    // Backtest is optional, always count as complete
    completed++;

    return (completed / total) * 100;
  };

  const progress = calculateProgress();

  // Tab metadata
  const tabs = [
    {
      id: 'strategy',
      label: 'Strategy',
      description: 'Choose and configure your trading strategy',
      isComplete: !!formData.strategyType,
    },
    {
      id: 'risk',
      label: 'Risk',
      description: 'Set risk management parameters',
      isComplete: !!(
        formData.riskLevel &&
        formData.stopLossPercentage &&
        formData.takeProfitPercentage
      ),
    },
    {
      id: 'technical',
      label: 'Technical',
      description: 'Configure trading pair and exchange',
      isComplete: !!(formData.tradingPair && formData.tradingMode),
    },
    {
      id: 'backtest',
      label: 'Backtest',
      description: 'Test strategy with historical data',
      isComplete: true, // Optional, always complete
    },
    {
      id: 'review',
      label: 'Review',
      description: 'Review and create your bot',
      isComplete: progress === 100,
    },
  ];

  // Handle strategy changes
  const handleStrategyChange = (strategyType: StrategyType) => {
    updateFormData({ strategyType });
  };

  const handleParamsChange = (params: Record<string, unknown>) => {
    updateFormData({ strategyParams: params });
  };

  // Handle risk changes
  const handleRiskChange = (risk: {
    stopLoss?: number;
    takeProfit?: number;
    maxDrawdown?: number;
    positionSize?: number;
    maxDailyLoss?: number;
  }) => {
    const updates: Record<string, unknown> = {};

    if (risk.stopLoss !== undefined) updates.stopLossPercentage = risk.stopLoss;
    if (risk.takeProfit !== undefined) updates.takeProfitPercentage = risk.takeProfit;
    if (risk.maxDrawdown !== undefined) updates.maxPositionSize = risk.maxDrawdown;
    if (risk.positionSize !== undefined) updates.maxPositionSize = risk.positionSize;
    if (risk.maxDailyLoss !== undefined) updates.maxDailyLoss = risk.maxDailyLoss;

    // Auto-calculate risk level based on settings
    if (risk.stopLoss !== undefined || risk.maxDrawdown !== undefined) {
      const stopLoss = risk.stopLoss ?? formData.stopLossPercentage ?? 5;
      const maxDrawdown = risk.maxDrawdown ?? formData.maxPositionSize ?? 10;
      const riskScore = (stopLoss + maxDrawdown) / 2;

      if (riskScore < 8) updates.riskLevel = 'low';
      else if (riskScore < 15) updates.riskLevel = 'medium';
      else updates.riskLevel = 'high';
    }

    updateFormData(updates);
  };

  // Handle technical changes
  const handleTechnicalChange = (technical: {
    tradingPair?: string;
    exchange?: string;
    tradingMode?: 'paper' | 'live';
    leverage?: number;
    orderType?: string;
    retryEnabled?: boolean;
  }) => {
    updateFormData(technical);
  };

  // Handle submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.strategyType) {
        toast.error('Please select a strategy');
        setActiveTab('strategy');
        return;
      }

      if (!formData.tradingPair || !formData.capitalAllocated) {
        toast.error('Please configure trading settings');
        setActiveTab('technical');
        return;
      }

      if (
        !formData.riskLevel ||
        !formData.stopLossPercentage ||
        !formData.takeProfitPercentage
      ) {
        toast.error('Please set risk management parameters');
        setActiveTab('risk');
        return;
      }

      // Set default name if not provided
      if (!formData.name) {
        updateFormData({
          name: `${formData.strategyType?.toUpperCase()} Bot - ${new Date().toLocaleDateString()}`,
        });
      }

      // Submit the bot
      await submit();
    } catch (error) {
      console.error('Failed to create bot:', error);
      toast.error('Failed to create bot', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => router.push('/bots/create')}
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Mode Selection
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">⚙️</div>
                <h1 className="text-3xl font-bold">Pro Mode Bot Creation</h1>
              </div>
              <p className="text-muted-foreground">
                Full control over your bot configuration with advanced parameters, backtesting, and
                custom risk settings.
              </p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1.5">
              <Sparkles className="size-3" />
              Advanced
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Configuration Progress</span>
              <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => (
                <Badge
                  key={tab.id}
                  variant={tab.isComplete ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {tab.label} {tab.isComplete && '✓'}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="relative">
                {tab.label}
                {tab.isComplete && (
                  <div className="absolute -top-1 -right-1 size-2 bg-green-600 rounded-full" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Strategy Tab */}
          <TabsContent value="strategy" className="space-y-6">
            <StrategyTab
              selectedStrategy={formData.strategyType}
              strategyParams={formData.strategyParams || {}}
              onStrategyChange={handleStrategyChange}
              onParamsChange={handleParamsChange}
            />
          </TabsContent>

          {/* Risk Tab */}
          <TabsContent value="risk" className="space-y-6">
            <RiskTab
              stopLoss={formData.stopLossPercentage || 5}
              takeProfit={formData.takeProfitPercentage || 10}
              maxDrawdown={formData.maxPositionSize || 15}
              positionSize={formData.maxPositionSize || 10}
              maxDailyLoss={formData.maxDailyLoss || 100}
              capitalAllocated={formData.capitalAllocated || 1000}
              onRiskChange={handleRiskChange}
            />
          </TabsContent>

          {/* Technical Tab */}
          <TabsContent value="technical" className="space-y-6">
            <TechnicalTab
              tradingPair={formData.tradingPair || ''}
              exchange="binance"
              tradingMode={formData.tradingMode || 'paper'}
              leverage={1}
              orderType="market"
              retryEnabled={true}
              onTechnicalChange={handleTechnicalChange}
            />
          </TabsContent>

          {/* Backtest Tab */}
          <TabsContent value="backtest" className="space-y-6">
            <BacktestTab
              strategyType={formData.strategyType}
              tradingPair={formData.tradingPair || 'BTC/USDT'}
              capitalAllocated={formData.capitalAllocated || 1000}
            />
          </TabsContent>

          {/* Review Tab */}
          <TabsContent value="review" className="space-y-6">
            <ReviewTab
              formData={formData}
              strategyType={formData.strategyType}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </TabsContent>
        </Tabs>

        {/* Navigation Footer */}
        {activeTab !== 'review' && (
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = tabs.findIndex((t) => t.id === activeTab);
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1].id);
                }
              }}
              disabled={activeTab === tabs[0].id}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                const currentIndex = tabs.findIndex((t) => t.id === activeTab);
                if (currentIndex < tabs.length - 1) {
                  setActiveTab(tabs[currentIndex + 1].id);
                }
              }}
              disabled={activeTab === tabs[tabs.length - 1].id}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

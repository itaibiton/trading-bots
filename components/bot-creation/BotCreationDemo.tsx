/**
 * Bot Creation Demo Component
 * Demo page to test BotPreview and SuccessCelebration components
 */

'use client';

import { useState } from 'react';
import { BotPreview } from './simple/BotPreview';
import { SuccessCelebration } from './SuccessCelebration';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskLevel, StrategyType } from '@/types/bot';

export function BotCreationDemo() {
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Demo bot configuration that builds up through steps
  const getConfig = () => {
    const configs = [
      { goal: undefined, risk: undefined, capital: undefined, strategy: undefined },
      { goal: 'growth', risk: undefined, capital: undefined, strategy: undefined },
      { goal: 'growth', risk: 'medium' as RiskLevel, capital: undefined, strategy: undefined },
      { goal: 'growth', risk: 'medium' as RiskLevel, capital: 5000, strategy: undefined },
      {
        goal: 'growth',
        risk: 'medium' as RiskLevel,
        capital: 5000,
        strategy: 'momentum' as StrategyType,
      },
    ];

    return configs[step] || configs[configs.length - 1];
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setShowSuccess(false);
  };

  const config = getConfig();
  const stepLabels = [
    'Empty State',
    'Step 1: Trading Goal',
    'Step 2: Risk Level',
    'Step 3: Capital',
    'Step 4: Strategy',
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Bot Creation Demo</h1>
        <p className="text-muted-foreground">
          Interactive demo of the enhanced live preview and success celebration
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Demo Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Step</span>
                <span className="text-sm text-muted-foreground">
                  {step + 1} / 5: {stepLabels[step]}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handlePrevStep}
                  disabled={step === 0}
                  variant="outline"
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button onClick={handleNextStep} className="flex-1">
                  {step < 4 ? 'Next Step' : 'Create Bot'}
                </Button>
              </div>

              <Button onClick={handleReset} variant="ghost" className="w-full">
                Reset Demo
              </Button>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h3 className="font-medium text-sm">Current Configuration</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Goal:</span>
                  <span>{config.goal || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Risk:</span>
                  <span>{config.risk || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capital:</span>
                  <span>{config.capital ? `$${config.capital.toLocaleString()}` : 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Strategy:</span>
                  <span>{config.strategy || 'Not set'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h3 className="font-medium text-sm">Test Success Modal</h3>
              <Button onClick={() => setShowSuccess(true)} variant="secondary" className="w-full">
                Show Success Celebration
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <div className="h-[600px]">
          <BotPreview
            goal={config.goal}
            risk={config.risk}
            capital={config.capital}
            strategy={config.strategy}
            currentStep={step}
          />
        </div>
      </div>

      {/* Success Celebration Modal */}
      <SuccessCelebration
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        botData={{
          name: 'Growth Momentum Bot',
          strategyType: 'momentum',
          riskLevel: 'medium',
          capitalAllocated: 5000,
          botId: 'demo-bot-123',
        }}
        onViewBot={() => console.log('View bot clicked')}
        onCreateAnother={handleReset}
      />
    </div>
  );
}

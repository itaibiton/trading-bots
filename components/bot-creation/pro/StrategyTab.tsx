/**
 * Strategy Tab - Pro Mode Bot Creation
 * Strategy template selection and parameter configuration
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { strategies } from '@/lib/mock-data/strategies';
import { Strategy, StrategyType } from '@/types/bot';
import { useState } from 'react';

interface StrategyTabProps {
  selectedStrategy?: StrategyType;
  strategyParams: Record<string, unknown>;
  onStrategyChange: (strategyType: StrategyType) => void;
  onParamsChange: (params: Record<string, unknown>) => void;
}

export function StrategyTab({
  selectedStrategy,
  strategyParams,
  onStrategyChange,
  onParamsChange,
}: StrategyTabProps) {
  const strategy = strategies.find((s) => s.type === selectedStrategy);

  const handleParamChange = (key: string, value: unknown) => {
    onParamsChange({
      ...strategyParams,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Strategy Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Your Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strategies.map((strat) => (
            <Card
              key={strat.id}
              className={`cursor-pointer transition-all hover:border-primary ${
                selectedStrategy === strat.type ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
              onClick={() => onStrategyChange(strat.type)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{strat.icon}</div>
                    <div>
                      <CardTitle className="text-base">{strat.fullName}</CardTitle>
                      <CardDescription className="text-xs mt-1">{strat.description}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      strat.risk === 'low'
                        ? 'default'
                        : strat.risk === 'medium'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {strat.risk} risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground">Expected Return</div>
                    <div className="font-semibold text-green-600 dark:text-green-400">
                      +{strat.expectedReturn}%
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Win Rate</div>
                    <div className="font-semibold">{strat.winRate}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Max Drawdown</div>
                    <div className="font-semibold text-red-600 dark:text-red-400">
                      -{strat.maxDrawdown}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Strategy Parameters */}
      {strategy && (
        <Card>
          <CardHeader>
            <CardTitle>Strategy Parameters</CardTitle>
            <CardDescription>
              Fine-tune the parameters for your {strategy.fullName} strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {strategy.paramDefinitions.map((param) => (
              <div key={param.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={param.key}>
                    {param.label}
                    {param.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {(param.type === 'number' || param.type === 'percentage') && (
                    <span className="text-sm text-muted-foreground">
                      {String(strategyParams[param.key] ?? param.defaultValue)}
                      {param.type === 'percentage' && '%'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{param.description}</p>

                {param.type === 'number' && (
                  <div className="space-y-2">
                    <Slider
                      id={param.key}
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={[Number(strategyParams[param.key] ?? param.defaultValue)]}
                      onValueChange={([value]) => handleParamChange(param.key, value)}
                    />
                    <Input
                      type="number"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={Number(strategyParams[param.key] ?? param.defaultValue)}
                      onChange={(e) => handleParamChange(param.key, Number(e.target.value))}
                      className="max-w-[120px]"
                    />
                  </div>
                )}

                {param.type === 'select' && param.options && (
                  <Select
                    value={String(strategyParams[param.key] ?? param.defaultValue)}
                    onValueChange={(value) => handleParamChange(param.key, value)}
                  >
                    <SelectTrigger id={param.key}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {param.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {param.type === 'boolean' && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={param.key}
                      checked={Boolean(strategyParams[param.key] ?? param.defaultValue)}
                      onChange={(e) => handleParamChange(param.key, e.target.checked)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor={param.key} className="cursor-pointer">
                      Enable
                    </Label>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {!strategy && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <div className="text-4xl mb-2">👆</div>
              <p>Select a strategy above to configure its parameters</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

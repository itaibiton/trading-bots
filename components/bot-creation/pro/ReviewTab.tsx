/**
 * Review Tab - Pro Mode Bot Creation
 * Final review and configuration summary before creating the bot
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  CheckCircle2,
  FileCode,
  FileText,
  Zap,
  Shield,
  Settings,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { BotCreationData, StrategyType, RiskLevel, TradingMode } from '@/types/bot';
import { strategies } from '@/lib/mock-data/strategies';
import { useState } from 'react';

interface ReviewTabProps {
  formData: Partial<BotCreationData>;
  strategyType?: StrategyType;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export function ReviewTab({ formData, strategyType, onSubmit, isSubmitting }: ReviewTabProps) {
  const [viewMode, setViewMode] = useState<'summary' | 'json'>('summary');

  const strategy = strategyType ? strategies.find((s) => s.type === strategyType) : undefined;

  // Validation checks
  const isComplete = {
    strategy: !!strategyType,
    trading: !!formData.tradingPair && !!formData.capitalAllocated,
    risk:
      !!formData.riskLevel &&
      formData.stopLossPercentage !== undefined &&
      formData.takeProfitPercentage !== undefined,
    technical: !!formData.tradingMode,
  };

  const allComplete = Object.values(isComplete).every((v) => v);

  // Generate JSON preview
  const jsonPreview = JSON.stringify(
    {
      name: formData.name || 'Unnamed Bot',
      strategyType,
      tradingPair: formData.tradingPair,
      tradingMode: formData.tradingMode,
      capitalAllocated: formData.capitalAllocated,
      riskLevel: formData.riskLevel,
      stopLossPercentage: formData.stopLossPercentage,
      takeProfitPercentage: formData.takeProfitPercentage,
      maxDailyLoss: formData.maxDailyLoss,
      maxPositionSize: formData.maxPositionSize,
      strategyParams: formData.strategyParams,
    },
    null,
    2
  );

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Configuration Review</h3>
          <p className="text-sm text-muted-foreground">
            Review your bot settings before creating
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'summary' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('summary')}
          >
            <FileText className="size-4 mr-2" />
            Summary
          </Button>
          <Button
            variant={viewMode === 'json' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('json')}
          >
            <FileCode className="size-4 mr-2" />
            JSON
          </Button>
        </div>
      </div>

      {/* Summary View */}
      {viewMode === 'summary' && (
        <div className="space-y-4">
          {/* Strategy Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="size-5" />
                  Strategy Configuration
                </CardTitle>
                {isComplete.strategy ? (
                  <CheckCircle2 className="size-5 text-green-600" />
                ) : (
                  <AlertTriangle className="size-5 text-yellow-600" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {strategy ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{strategy.icon}</div>
                    <div>
                      <div className="font-semibold">{strategy.fullName}</div>
                      <div className="text-sm text-muted-foreground">{strategy.description}</div>
                    </div>
                    <Badge
                      variant={
                        strategy.risk === 'low'
                          ? 'default'
                          : strategy.risk === 'medium'
                            ? 'secondary'
                            : 'destructive'
                      }
                      className="ml-auto"
                    >
                      {strategy.risk} risk
                    </Badge>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Expected Return:</span>{' '}
                      <span className="font-semibold text-green-600">+{strategy.expectedReturn}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Win Rate:</span>{' '}
                      <span className="font-semibold">{strategy.winRate}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max Drawdown:</span>{' '}
                      <span className="font-semibold text-red-600">-{strategy.maxDrawdown}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Complexity:</span>{' '}
                      <span className="font-semibold capitalize">{strategy.complexity}</span>
                    </div>
                  </div>
                  {formData.strategyParams && Object.keys(formData.strategyParams).length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Parameters</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(formData.strategyParams).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                              </span>
                              <span className="font-mono">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No strategy selected
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trading Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="size-5" />
                  Trading Configuration
                </CardTitle>
                {isComplete.trading ? (
                  <CheckCircle2 className="size-5 text-green-600" />
                ) : (
                  <AlertTriangle className="size-5 text-yellow-600" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Trading Pair</div>
                  <div className="font-semibold text-lg">
                    {formData.tradingPair || 'Not selected'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Capital Allocated</div>
                  <div className="font-semibold text-lg">
                    ${formData.capitalAllocated?.toFixed(2) || '0.00'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Trading Mode</div>
                  <Badge variant={formData.tradingMode === 'paper' ? 'default' : 'destructive'}>
                    {formData.tradingMode === 'paper' ? 'Paper Trading' : 'Live Trading'}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Exchange</div>
                  <div className="font-semibold">Binance (Paper)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="size-5" />
                  Risk Management
                </CardTitle>
                {isComplete.risk ? (
                  <CheckCircle2 className="size-5 text-green-600" />
                ) : (
                  <AlertTriangle className="size-5 text-yellow-600" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                  <Badge
                    variant={
                      formData.riskLevel === 'low'
                        ? 'default'
                        : formData.riskLevel === 'medium'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {formData.riskLevel?.toUpperCase() || 'NOT SET'}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Risk/Reward Ratio</div>
                  <div className="font-semibold">
                    1:
                    {formData.stopLossPercentage && formData.takeProfitPercentage
                      ? (formData.takeProfitPercentage / formData.stopLossPercentage).toFixed(2)
                      : '0'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Stop Loss</div>
                  <div className="font-semibold text-red-600">
                    -{formData.stopLossPercentage?.toFixed(1) || '0'}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Take Profit</div>
                  <div className="font-semibold text-green-600">
                    +{formData.takeProfitPercentage?.toFixed(1) || '0'}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Max Drawdown</div>
                  <div className="font-semibold">{formData.maxPositionSize || 0}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Max Daily Loss</div>
                  <div className="font-semibold">${formData.maxDailyLoss?.toFixed(2) || '0.00'}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="size-5" />
                  Technical Settings
                </CardTitle>
                {isComplete.technical ? (
                  <CheckCircle2 className="size-5 text-green-600" />
                ) : (
                  <AlertTriangle className="size-5 text-yellow-600" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trading Mode:</span>
                  <span className="font-semibold">
                    {formData.tradingMode === 'paper' ? 'Paper Trading' : 'Live Trading'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exchange:</span>
                  <span className="font-semibold">Binance (Simulated)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Type:</span>
                  <span className="font-semibold">Market</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Retry Logic:</span>
                  <span className="font-semibold">Enabled</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* JSON View */}
      {viewMode === 'json' && (
        <Card>
          <CardHeader>
            <CardTitle>Configuration JSON</CardTitle>
            <CardDescription>Raw configuration data for your bot</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jsonPreview}
              readOnly
              className="font-mono text-xs h-[600px] resize-none"
            />
          </CardContent>
        </Card>
      )}

      {/* Warnings */}
      {!allComplete && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Configuration Incomplete</AlertTitle>
          <AlertDescription>
            Please complete all required sections before creating your bot:
            <ul className="list-disc list-inside mt-2 space-y-1">
              {!isComplete.strategy && <li>Select a trading strategy</li>}
              {!isComplete.trading && <li>Configure trading pair and capital</li>}
              {!isComplete.risk && <li>Set risk management parameters</li>}
              {!isComplete.technical && <li>Configure technical settings</li>}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {formData.tradingMode === 'live' && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Live Trading Not Available</AlertTitle>
          <AlertDescription>
            Live trading is not yet available in Phase 2. Your bot will run in paper trading mode.
          </AlertDescription>
        </Alert>
      )}

      {/* Create Button */}
      <Card>
        <CardContent className="py-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ready to Create Your Bot?</h3>
              <p className="text-sm text-muted-foreground">
                Your bot will start in{' '}
                <Badge variant="outline" className="mx-1">
                  Paused
                </Badge>{' '}
                mode. You can activate it from the dashboard.
              </p>
            </div>
            <Button
              size="lg"
              className="w-full max-w-md"
              onClick={onSubmit}
              disabled={!allComplete || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Bot...
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-5 mr-2" />
                  Create Trading Bot
                </>
              )}
            </Button>
            {allComplete && (
              <p className="text-xs text-muted-foreground">
                By creating this bot, you agree to monitor its performance and understand the risks
                involved in automated trading.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

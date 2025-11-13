/**
 * Risk Management Tab - Pro Mode Bot Creation
 * Advanced risk controls with sliders and visual indicators
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, TrendingUp } from 'lucide-react';
import { RiskLevel } from '@/types/bot';

interface RiskTabProps {
  stopLoss: number;
  takeProfit: number;
  maxDrawdown: number;
  positionSize: number;
  maxDailyLoss: number;
  capitalAllocated: number;
  onRiskChange: (risk: {
    stopLoss?: number;
    takeProfit?: number;
    maxDrawdown?: number;
    positionSize?: number;
    maxDailyLoss?: number;
  }) => void;
}

export function RiskTab({
  stopLoss,
  takeProfit,
  maxDrawdown,
  positionSize,
  maxDailyLoss,
  capitalAllocated,
  onRiskChange,
}: RiskTabProps) {
  // Calculate risk score (0-100)
  const calculateRiskScore = () => {
    const stopLossScore = Math.min((stopLoss / 20) * 100, 100);
    const takeProfitScore = Math.max(100 - (takeProfit / 50) * 100, 0);
    const positionScore = (positionSize / 100) * 100;
    const drawdownScore = (maxDrawdown / 30) * 100;

    return Math.round((stopLossScore + takeProfitScore + positionScore + drawdownScore) / 4);
  };

  const riskScore = calculateRiskScore();
  const getRiskLevel = (): RiskLevel => {
    if (riskScore < 30) return 'low';
    if (riskScore < 60) return 'medium';
    return 'high';
  };

  const riskLevel = getRiskLevel();

  // Calculate position size in USDT
  const positionSizeUSDT = (capitalAllocated * positionSize) / 100;

  return (
    <div className="space-y-6">
      {/* Risk Gauge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5" />
            Risk Assessment
          </CardTitle>
          <CardDescription>Your current risk exposure level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Risk Score</span>
              <Badge
                variant={
                  riskLevel === 'low'
                    ? 'default'
                    : riskLevel === 'medium'
                      ? 'secondary'
                      : 'destructive'
                }
              >
                {riskLevel.toUpperCase()}
              </Badge>
            </div>
            <Progress
              value={riskScore}
              className={`h-3 ${
                riskLevel === 'low'
                  ? '[&>div]:bg-green-600'
                  : riskLevel === 'medium'
                    ? '[&>div]:bg-yellow-600'
                    : '[&>div]:bg-red-600'
              }`}
            />
            <div className="text-xs text-muted-foreground">
              {riskScore}/100 Risk Points
            </div>
          </div>

          {riskLevel === 'high' && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>High Risk Configuration</AlertTitle>
              <AlertDescription>
                Your current settings expose you to high risk. Consider reducing position size or
                tightening stop-loss.
              </AlertDescription>
            </Alert>
          )}

          {riskLevel === 'low' && (
            <Alert>
              <Shield className="size-4" />
              <AlertTitle>Conservative Setup</AlertTitle>
              <AlertDescription>
                Your settings are conservative. This limits potential losses but may also limit
                gains.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Stop Loss */}
      <Card>
        <CardHeader>
          <CardTitle>Stop Loss</CardTitle>
          <CardDescription>
            Automatically close position when loss reaches this percentage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Stop Loss Percentage</Label>
              <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                -{stopLoss}%
              </span>
            </div>
            <Slider
              min={1}
              max={50}
              step={0.5}
              value={[stopLoss]}
              onValueChange={([value]) => onRiskChange({ stopLoss: value })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1% (Tight)</span>
              <span>50% (Loose)</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <div className="text-xs text-muted-foreground">Max Loss Per Trade</div>
            <div className="text-lg font-semibold text-red-600 dark:text-red-400">
              ${((positionSizeUSDT * stopLoss) / 100).toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Take Profit */}
      <Card>
        <CardHeader>
          <CardTitle>Take Profit</CardTitle>
          <CardDescription>
            Automatically close position when profit reaches this percentage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Take Profit Percentage</Label>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                +{takeProfit}%
              </span>
            </div>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[takeProfit]}
              onValueChange={([value]) => onRiskChange({ takeProfit: value })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1% (Quick)</span>
              <span>100% (Patient)</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <div className="text-xs text-muted-foreground">Target Profit Per Trade</div>
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
              ${((positionSizeUSDT * takeProfit) / 100).toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk/Reward Ratio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5" />
            Risk/Reward Ratio
          </CardTitle>
          <CardDescription>Comparing potential profit vs. potential loss</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">
              1:{(takeProfit / stopLoss).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Risk ${((positionSizeUSDT * stopLoss) / 100).toFixed(2)} to gain $
              {((positionSizeUSDT * takeProfit) / 100).toFixed(2)}
            </div>
            {takeProfit / stopLoss >= 2 && (
              <Badge variant="default" className="mt-2">
                Good Ratio
              </Badge>
            )}
            {takeProfit / stopLoss < 1.5 && (
              <Badge variant="destructive" className="mt-2">
                Poor Ratio
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Max Drawdown */}
      <Card>
        <CardHeader>
          <CardTitle>Maximum Drawdown</CardTitle>
          <CardDescription>
            Pause bot if total losses exceed this percentage of capital
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Max Drawdown</Label>
              <span className="text-sm font-semibold">{maxDrawdown}%</span>
            </div>
            <Slider
              min={5}
              max={50}
              step={1}
              value={[maxDrawdown]}
              onValueChange={([value]) => onRiskChange({ maxDrawdown: value })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5% (Safe)</span>
              <span>50% (Risky)</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <div className="text-xs text-muted-foreground">Bot Will Pause At Loss Of</div>
            <div className="text-lg font-semibold text-red-600 dark:text-red-400">
              ${((capitalAllocated * maxDrawdown) / 100).toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Position Size */}
      <Card>
        <CardHeader>
          <CardTitle>Position Size</CardTitle>
          <CardDescription>Percentage of capital to use per trade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Position Size</Label>
              <span className="text-sm font-semibold">{positionSize}%</span>
            </div>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[positionSize]}
              onValueChange={([value]) => onRiskChange({ positionSize: value })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1% (Conservative)</span>
              <span>100% (All-In)</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <div className="text-xs text-muted-foreground">USDT Per Trade</div>
            <div className="text-lg font-semibold">${positionSizeUSDT.toFixed(2)}</div>
          </div>
        </CardContent>
      </Card>

      {/* Max Daily Loss */}
      <Card>
        <CardHeader>
          <CardTitle>Maximum Daily Loss</CardTitle>
          <CardDescription>
            Stop trading for the day if losses exceed this amount
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maxDailyLoss">Max Daily Loss (USDT)</Label>
            <Input
              id="maxDailyLoss"
              type="number"
              min={0}
              max={capitalAllocated}
              step={10}
              value={maxDailyLoss}
              onChange={(e) => onRiskChange({ maxDailyLoss: Number(e.target.value) })}
            />
            <p className="text-xs text-muted-foreground">
              Recommended: {(capitalAllocated * 0.05).toFixed(2)} - {(capitalAllocated * 0.1).toFixed(2)} (
              5-10% of capital)
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <div className="text-xs text-muted-foreground">Percentage of Capital</div>
            <div className="text-lg font-semibold">
              {((maxDailyLoss / capitalAllocated) * 100).toFixed(1)}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

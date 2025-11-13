/**
 * Technical Setup Tab - Pro Mode Bot Creation
 * Exchange, pair, trading mode, and advanced settings
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Zap } from 'lucide-react';
import { TradingMode } from '@/types/bot';
import { useState } from 'react';

interface TechnicalTabProps {
  tradingPair: string;
  exchange: string;
  tradingMode: TradingMode;
  leverage: number;
  orderType: string;
  retryEnabled: boolean;
  onTechnicalChange: (technical: {
    tradingPair?: string;
    exchange?: string;
    tradingMode?: TradingMode;
    leverage?: number;
    orderType?: string;
    retryEnabled?: boolean;
  }) => void;
}

const TRADING_PAIRS = [
  { value: 'BTC/USDT', label: 'BTC/USDT', volume: '$45.2B' },
  { value: 'ETH/USDT', label: 'ETH/USDT', volume: '$18.7B' },
  { value: 'BNB/USDT', label: 'BNB/USDT', volume: '$2.1B' },
  { value: 'SOL/USDT', label: 'SOL/USDT', volume: '$3.8B' },
  { value: 'ADA/USDT', label: 'ADA/USDT', volume: '$890M' },
  { value: 'AVAX/USDT', label: 'AVAX/USDT', volume: '$650M' },
];

const EXCHANGES = [
  { value: 'binance', label: 'Binance', popular: true },
  { value: 'coinbase', label: 'Coinbase Pro', popular: true },
  { value: 'kraken', label: 'Kraken', popular: false },
  { value: 'bybit', label: 'Bybit', popular: true },
];

const ORDER_TYPES = [
  { value: 'market', label: 'Market', description: 'Execute immediately at current price' },
  { value: 'limit', label: 'Limit', description: 'Execute only at specified price or better' },
  { value: 'stop-limit', label: 'Stop Limit', description: 'Trigger limit order at stop price' },
];

export function TechnicalTab({
  tradingPair,
  exchange,
  tradingMode,
  leverage,
  orderType,
  retryEnabled,
  onTechnicalChange,
}: TechnicalTabProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-6">
      {/* Trading Pair Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Pair</CardTitle>
          <CardDescription>Select the cryptocurrency pair to trade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tradingPair">Cryptocurrency Pair</Label>
            <Select value={tradingPair} onValueChange={(value) => onTechnicalChange({ tradingPair: value })}>
              <SelectTrigger id="tradingPair">
                <SelectValue placeholder="Select trading pair" />
              </SelectTrigger>
              <SelectContent>
                {TRADING_PAIRS.map((pair) => (
                  <SelectItem key={pair.value} value={pair.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{pair.label}</span>
                      <span className="text-xs text-muted-foreground ml-4">
                        Vol: {pair.volume}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Higher volume pairs typically have better liquidity and lower slippage
            </p>
          </div>

          {tradingPair && (
            <div className="bg-muted/30 rounded-lg p-3 grid grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Current Price</div>
                <div className="font-semibold">
                  ${(40000 + Math.random() * 5000).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">24h Change</div>
                <div className="font-semibold text-green-600 dark:text-green-400">
                  +{(Math.random() * 5).toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">24h Volume</div>
                <div className="font-semibold">
                  {TRADING_PAIRS.find((p) => p.value === tradingPair)?.volume}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exchange Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Exchange</CardTitle>
          <CardDescription>Choose your trading exchange (Coming in Phase 3)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exchange">Exchange</Label>
            <Select value={exchange} onValueChange={(value) => onTechnicalChange({ exchange: value })}>
              <SelectTrigger id="exchange">
                <SelectValue placeholder="Select exchange" />
              </SelectTrigger>
              <SelectContent>
                {EXCHANGES.map((ex) => (
                  <SelectItem key={ex.value} value={ex.value}>
                    <div className="flex items-center gap-2">
                      <span>{ex.label}</span>
                      {ex.popular && <Badge variant="secondary">Popular</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Alert>
            <AlertTriangle className="size-4" />
            <AlertTitle>Phase 2: Paper Trading Only</AlertTitle>
            <AlertDescription>
              Exchange integration is coming in Phase 3. For now, all bots run in paper trading mode with
              simulated execution.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Trading Mode */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Mode</CardTitle>
          <CardDescription>Choose between paper trading (simulated) or live trading</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="tradingMode" className="cursor-pointer">
                  Paper Trading Mode
                </Label>
                <Badge variant={tradingMode === 'paper' ? 'default' : 'secondary'}>
                  {tradingMode === 'paper' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {tradingMode === 'paper'
                  ? 'Bot will simulate trades without real money'
                  : 'Bot will execute real trades with your capital'}
              </p>
            </div>
            <Switch
              id="tradingMode"
              checked={tradingMode === 'paper'}
              onCheckedChange={(checked) =>
                onTechnicalChange({ tradingMode: checked ? 'paper' : 'live' })
              }
            />
          </div>

          {tradingMode === 'live' && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>Live Trading Warning</AlertTitle>
              <AlertDescription>
                Live trading is not yet available. This feature will be enabled in Phase 3 after thorough
                testing and security audits.
              </AlertDescription>
            </Alert>
          )}

          {tradingMode === 'paper' && (
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-sm font-medium mb-1">Paper Trading Balance</div>
              <div className="text-2xl font-bold">$10,000.00</div>
              <p className="text-xs text-muted-foreground mt-1">
                Your starting balance for simulated trading
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Settings Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Advanced Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure leverage, order types, and execution options
          </p>
        </div>
        <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
      </div>

      {/* Advanced Settings */}
      {showAdvanced && (
        <>
          {/* Leverage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="size-5" />
                Leverage
              </CardTitle>
              <CardDescription>
                Multiply your position size (increases both profits and losses)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Leverage Multiplier</Label>
                  <span className="text-sm font-semibold">{leverage}x</span>
                </div>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[leverage]}
                  onValueChange={([value]) => onTechnicalChange({ leverage: value })}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1x (No Leverage)</span>
                  <span>10x (High Risk)</span>
                </div>
              </div>

              {leverage > 3 && (
                <Alert variant="destructive">
                  <AlertTriangle className="size-4" />
                  <AlertTitle>High Leverage Warning</AlertTitle>
                  <AlertDescription>
                    Leverage above 3x significantly increases liquidation risk. Use with extreme caution.
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-muted/30 rounded-lg p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Effective Position Size</span>
                  <span className="font-semibold">{leverage}x your capital</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Potential Profit</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {leverage}x faster
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Potential Loss</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {leverage}x faster
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Type */}
          <Card>
            <CardHeader>
              <CardTitle>Order Type</CardTitle>
              <CardDescription>How your trades will be executed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {ORDER_TYPES.map((type) => (
                  <div
                    key={type.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      orderType === type.value ? 'border-primary ring-2 ring-primary/20' : ''
                    }`}
                    onClick={() => onTechnicalChange({ orderType: type.value })}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                      </div>
                      <input
                        type="radio"
                        checked={orderType === type.value}
                        onChange={() => onTechnicalChange({ orderType: type.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Retry Logic */}
          <Card>
            <CardHeader>
              <CardTitle>Retry Logic</CardTitle>
              <CardDescription>Automatically retry failed orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="retryEnabled"
                      checked={retryEnabled}
                      onCheckedChange={(checked) =>
                        onTechnicalChange({ retryEnabled: Boolean(checked) })
                      }
                    />
                    <Label htmlFor="retryEnabled" className="cursor-pointer">
                      Enable Order Retry
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    Automatically retry orders that fail due to network issues or temporary errors
                  </p>
                </div>
              </div>

              {retryEnabled && (
                <div className="mt-4 bg-muted/30 rounded-lg p-3 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Retries</span>
                    <span className="font-semibold">3 attempts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Retry Delay</span>
                    <span className="font-semibold">5 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeout</span>
                    <span className="font-semibold">30 seconds</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

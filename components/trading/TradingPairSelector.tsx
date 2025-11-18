/**
 * Trading Pair Selector Component
 *
 * Dropdown to select a trading pair from supported pairs.
 */

'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SUPPORTED_TRADING_PAIRS, type SupportedTradingPair } from '@/lib/binance/types'

interface TradingPairSelectorProps {
  value: SupportedTradingPair
  onChange: (pair: SupportedTradingPair) => void
  disabled?: boolean
}

// Map of trading pairs to display names
const PAIR_DISPLAY_NAMES: Record<SupportedTradingPair, string> = {
  BTCUSDT: 'BTC/USDT',
  ETHUSDT: 'ETH/USDT',
  SOLUSDT: 'SOL/USDT',
  BNBUSDT: 'BNB/USDT',
  XRPUSDT: 'XRP/USDT',
  ADAUSDT: 'ADA/USDT',
  DOGEUSDT: 'DOGE/USDT',
  MATICUSDT: 'MATIC/USDT',
  AVAXUSDT: 'AVAX/USDT',
  LINKUSDT: 'LINK/USDT',
}

export function TradingPairSelector({
  value,
  onChange,
  disabled = false,
}: TradingPairSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as SupportedTradingPair)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select trading pair" />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_TRADING_PAIRS.map((pair) => (
          <SelectItem key={pair} value={pair}>
            {PAIR_DISPLAY_NAMES[pair]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

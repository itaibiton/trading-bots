/**
 * Trading Validation Utilities
 *
 * Functions for validating trade orders before execution.
 */

import {
  SUPPORTED_TRADING_PAIRS,
  MIN_ORDER_VALUE_USDT,
  type SupportedTradingPair,
} from '@/lib/binance/types'
import { calculateBuyCost, calculateSellProceeds } from './paper-trading'

export interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validate trading pair
 */
export function validateTradingPair(tradingPair: string): ValidationResult {
  if (!tradingPair) {
    return { valid: false, error: 'Trading pair is required' }
  }

  if (!SUPPORTED_TRADING_PAIRS.includes(tradingPair as SupportedTradingPair)) {
    return {
      valid: false,
      error: `Unsupported trading pair: ${tradingPair}. Supported: ${SUPPORTED_TRADING_PAIRS.join(', ')}`
    }
  }

  return { valid: true }
}

/**
 * Validate quantity
 */
export function validateQuantity(quantity: number): ValidationResult {
  if (quantity === undefined || quantity === null) {
    return { valid: false, error: 'Quantity is required' }
  }

  if (typeof quantity !== 'number' || isNaN(quantity)) {
    return { valid: false, error: 'Quantity must be a number' }
  }

  if (quantity <= 0) {
    return { valid: false, error: 'Quantity must be greater than 0' }
  }

  return { valid: true }
}

/**
 * Validate minimum order value
 */
export function validateMinOrderValue(
  quantity: number,
  price: number
): ValidationResult {
  const totalValue = quantity * price

  if (totalValue < MIN_ORDER_VALUE_USDT) {
    return {
      valid: false,
      error: `Minimum order value is $${MIN_ORDER_VALUE_USDT} USDT. Your order: $${totalValue.toFixed(2)}`
    }
  }

  return { valid: true }
}

/**
 * Validate buy order against available balance
 */
export function validateBuyBalance(
  quantity: number,
  price: number,
  availableBalance: number
): ValidationResult {
  const { total } = calculateBuyCost(quantity, price)

  if (total > availableBalance) {
    return {
      valid: false,
      error: `Insufficient balance. Required: $${total.toFixed(2)}, Available: $${availableBalance.toFixed(2)}`
    }
  }

  return { valid: true }
}

/**
 * Validate sell order against available holdings
 * For paper trading, we check USDT balance (simplified - no position tracking yet)
 */
export function validateSellBalance(
  quantity: number,
  price: number,
  availableBalance: number
): ValidationResult {
  // In a full implementation, we'd check actual crypto holdings
  // For MVP paper trading, we allow sells if user has enough USDT value
  const { total } = calculateSellProceeds(quantity, price)

  // Just check that the trade value is reasonable
  if (total <= 0) {
    return {
      valid: false,
      error: 'Trade value too small'
    }
  }

  return { valid: true }
}

/**
 * Validate complete trade order
 */
export function validateTradeOrder(params: {
  side: 'buy' | 'sell'
  tradingPair: string
  quantity: number
  price: number
  availableBalance: number
}): ValidationResult {
  const { side, tradingPair, quantity, price, availableBalance } = params

  // Validate trading pair
  const pairValidation = validateTradingPair(tradingPair)
  if (!pairValidation.valid) return pairValidation

  // Validate quantity
  const quantityValidation = validateQuantity(quantity)
  if (!quantityValidation.valid) return quantityValidation

  // Validate minimum order value
  const minValueValidation = validateMinOrderValue(quantity, price)
  if (!minValueValidation.valid) return minValueValidation

  // Validate balance based on side
  if (side === 'buy') {
    const balanceValidation = validateBuyBalance(quantity, price, availableBalance)
    if (!balanceValidation.valid) return balanceValidation
  } else {
    const balanceValidation = validateSellBalance(quantity, price, availableBalance)
    if (!balanceValidation.valid) return balanceValidation
  }

  return { valid: true }
}

/**
 * Get minimum quantity for a trading pair at given price
 */
export function getMinQuantity(price: number): number {
  return MIN_ORDER_VALUE_USDT / price
}

/**
 * Get maximum quantity for a buy order given balance and price
 */
export function getMaxBuyQuantity(
  availableBalance: number,
  price: number
): number {
  // Account for fee
  const effectiveBalance = availableBalance / 1.001 // 0.1% fee
  return effectiveBalance / price
}

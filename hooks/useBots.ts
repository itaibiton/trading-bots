/**
 * useBots Hook
 *
 * Fetches and manages the user's bots from Supabase.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Bot {
  id: string
  name: string
  description: string | null
  strategy_id: string
  strategy_type: 'dca' | 'grid' | 'momentum' | 'mean-reversion'
  status: 'draft' | 'active' | 'paused' | 'stopped' | 'error'
  trading_mode: 'paper' | 'live'
  trading_pair: string
  capital_allocated: number
  risk_level: 'low' | 'medium' | 'high'
  stop_loss_percentage: number
  take_profit_percentage: number
  max_daily_loss: number
  max_position_size: number
  strategy_params: Record<string, any>
  total_pnl: number
  total_pnl_percentage: number
  win_rate: number
  total_trades: number
  next_execution_at: string | null
  last_execution_at: string | null
  error_message: string | null
  error_count: number
  created_at: string
  updated_at: string
  last_active_at: string | null
  is_template: boolean
}

interface UseBotsOptions {
  status?: Bot['status'] | 'all'
  strategyType?: Bot['strategy_type'] | 'all'
  tradingMode?: Bot['trading_mode'] | 'all'
  sortBy?: 'name' | 'created_at' | 'capital_allocated' | 'total_pnl'
  sortOrder?: 'asc' | 'desc'
}

interface UseBotsReturn {
  bots: Bot[]
  isLoading: boolean
  error: string | null
  refresh: () => void
  totalCount: number
}

export function useBots(options: UseBotsOptions = {}): UseBotsReturn {
  const {
    status = 'all',
    strategyType = 'all',
    tradingMode = 'all',
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = options

  const [bots, setBots] = useState<Bot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const fetchBots = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError('Not authenticated')
        setBots([])
        return
      }

      let query = supabase
        .from('bots')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .eq('is_template', false)

      // Apply filters
      if (status !== 'all') {
        query = query.eq('status', status)
      }
      if (strategyType !== 'all') {
        query = query.eq('strategy_type', strategyType)
      }
      if (tradingMode !== 'all') {
        query = query.eq('trading_mode', tradingMode)
      }

      // Apply sorting
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })

      const { data, error: fetchError, count } = await query

      if (fetchError) {
        throw new Error(fetchError.message)
      }

      setBots(data || [])
      setTotalCount(count || 0)
    } catch (err) {
      console.error('Failed to fetch bots:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch bots')
      setBots([])
    } finally {
      setIsLoading(false)
    }
  }, [status, strategyType, tradingMode, sortBy, sortOrder])

  useEffect(() => {
    fetchBots()
  }, [fetchBots])

  return {
    bots,
    isLoading,
    error,
    refresh: fetchBots,
    totalCount,
  }
}

/**
 * Fetch a single bot by ID
 */
export async function getBot(botId: string): Promise<Bot | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('bots')
    .select('*')
    .eq('id', botId)
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // Bot not found
    }
    throw new Error(error.message)
  }

  return data
}

/**
 * Update bot status
 */
export async function updateBotStatus(
  botId: string,
  status: Bot['status']
): Promise<Bot> {
  const supabase = createClient()

  const updates: Record<string, any> = {
    status,
    updated_at: new Date().toISOString(),
  }

  // Clear next_execution_at if stopping or pausing
  if (status === 'stopped' || status === 'paused') {
    updates.next_execution_at = null
  }

  // Set last_active_at if activating
  if (status === 'active') {
    updates.last_active_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('bots')
    .update(updates)
    .eq('id', botId)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Delete a bot
 */
export async function deleteBot(botId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('bots')
    .delete()
    .eq('id', botId)

  if (error) {
    throw new Error(error.message)
  }
}

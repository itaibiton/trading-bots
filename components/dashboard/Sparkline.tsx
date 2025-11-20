/**
 * Sparkline Component
 *
 * A flexible mini chart component for displaying trends without axes or labels.
 * Supports area charts (with gradients), line charts, and bar charts.
 */

'use client'

import { Area, AreaChart, Bar, BarChart, Line, LineChart } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { cn } from '@/lib/utils'

interface SparklineDataPoint {
  value: number
  timestamp?: string
}

interface SparklineProps {
  data: SparklineDataPoint[]
  color: string
  type?: 'area' | 'line' | 'bar'
  height?: number
  showGradient?: boolean
  className?: string
}

export function Sparkline({
  data,
  color,
  type = 'area',
  height = 60,
  showGradient = true,
  className,
}: SparklineProps) {
  // Chart configuration for shadcn chart component
  const chartConfig = {
    value: {
      color: color,
    },
  }

  // Generate unique gradient ID for this instance
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`

  if (type === 'area') {
    return (
      <div className={cn('w-full', className)} style={{ height: `${height}px` }}>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs>
              {showGradient && (
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              )}
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={showGradient ? `url(#${gradientId})` : 'none'}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    )
  }

  if (type === 'line') {
    return (
      <div className={cn('w-full', className)} style={{ height: `${height}px` }}>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </LineChart>
        </ChartContainer>
      </div>
    )
  }

  // Bar chart
  return (
    <div className={cn('w-full', className)} style={{ height: `${height}px` }}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Bar
            dataKey="value"
            fill={color}
            radius={[2, 2, 0, 0]}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

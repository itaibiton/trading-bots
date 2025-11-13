'use client';

import * as React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RiskChartProps {
  riskPercentage: number; // 0-100
  riskLevel?: 'conservative' | 'moderate' | 'aggressive';
  height?: number;
  showTitle?: boolean;
  className?: string;
}

/**
 * Risk Chart Component
 *
 * A beautiful gauge/donut chart showing risk level:
 * - 0-33%: Green (Conservative)
 * - 34-66%: Yellow (Moderate)
 * - 67-100%: Red (Aggressive)
 *
 * Features:
 * - Animated fill
 * - Center text showing percentage
 * - Color transitions based on risk level
 * - Responsive design
 */
export function RiskChart({
  riskPercentage,
  riskLevel,
  height = 200,
  showTitle = true,
  className,
}: RiskChartProps) {
  // Clamp risk percentage to 0-100
  const clampedRisk = Math.max(0, Math.min(100, riskPercentage));

  // Determine risk level and color based on percentage
  const getRiskInfo = React.useMemo(() => {
    if (riskLevel) {
      // Use provided risk level
      switch (riskLevel) {
        case 'conservative':
          return {
            level: 'Conservative',
            color: 'hsl(var(--chart-2))',
            bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
            textColor: 'text-emerald-700 dark:text-emerald-400',
            description: 'Low risk, steady growth',
          };
        case 'moderate':
          return {
            level: 'Moderate',
            color: 'hsl(var(--chart-4))',
            bgColor: 'bg-amber-50 dark:bg-amber-950/30',
            textColor: 'text-amber-700 dark:text-amber-400',
            description: 'Balanced risk and reward',
          };
        case 'aggressive':
          return {
            level: 'Aggressive',
            color: 'hsl(var(--destructive))',
            bgColor: 'bg-rose-50 dark:bg-rose-950/30',
            textColor: 'text-rose-700 dark:text-rose-400',
            description: 'High risk, high potential',
          };
      }
    }

    // Calculate based on percentage
    if (clampedRisk <= 33) {
      return {
        level: 'Conservative',
        color: 'hsl(var(--chart-2))',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
        textColor: 'text-emerald-700 dark:text-emerald-400',
        description: 'Low risk, steady growth',
      };
    } else if (clampedRisk <= 66) {
      return {
        level: 'Moderate',
        color: 'hsl(var(--chart-4))',
        bgColor: 'bg-amber-50 dark:bg-amber-950/30',
        textColor: 'text-amber-700 dark:text-amber-400',
        description: 'Balanced risk and reward',
      };
    } else {
      return {
        level: 'Aggressive',
        color: 'hsl(var(--destructive))',
        bgColor: 'bg-rose-50 dark:bg-rose-950/30',
        textColor: 'text-rose-700 dark:text-rose-400',
        description: 'High risk, high potential',
      };
    }
  }, [clampedRisk, riskLevel]);

  // Prepare data for pie chart
  const data = [
    { name: 'filled', value: clampedRisk },
    { name: 'empty', value: 100 - clampedRisk },
  ];

  const chart = (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={0}
            dataKey="value"
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            <Cell fill={getRiskInfo.color} />
            <Cell fill="hsl(var(--muted))" opacity={0.2} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">{clampedRisk}%</div>
          <div className={cn('text-sm font-medium mt-1', getRiskInfo.textColor)}>
            {getRiskInfo.level}
          </div>
        </div>
      </div>
    </div>
  );

  if (!showTitle) {
    return <div className={className}>{chart}</div>;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Risk Level</CardTitle>
        <CardDescription>{getRiskInfo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {chart}

        {/* Risk Level Indicator */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'h-2 flex-1 rounded-full transition-all',
                clampedRisk > 0 ? 'bg-emerald-500' : 'bg-muted'
              )}
              style={{
                opacity: clampedRisk <= 33 ? 1 : 0.3,
              }}
            />
            <span className="text-xs text-muted-foreground w-24">Conservative</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'h-2 flex-1 rounded-full transition-all',
                clampedRisk > 33 && clampedRisk <= 66 ? 'bg-amber-500' : 'bg-muted'
              )}
              style={{
                opacity: clampedRisk > 33 && clampedRisk <= 66 ? 1 : 0.3,
              }}
            />
            <span className="text-xs text-muted-foreground w-24">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'h-2 flex-1 rounded-full transition-all',
                clampedRisk > 66 ? 'bg-rose-500' : 'bg-muted'
              )}
              style={{
                opacity: clampedRisk > 66 ? 1 : 0.3,
              }}
            />
            <span className="text-xs text-muted-foreground w-24">Aggressive</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Compact Risk Badge
 *
 * A minimal version showing just the risk percentage and level
 * Useful for bot cards and lists
 */
export function RiskBadge({ riskPercentage, riskLevel }: Omit<RiskChartProps, 'height'>) {
  const clampedRisk = Math.max(0, Math.min(100, riskPercentage));

  const getRiskInfo = React.useMemo(() => {
    if (riskLevel) {
      switch (riskLevel) {
        case 'conservative':
          return {
            level: 'Low',
            bgColor: 'bg-emerald-100 dark:bg-emerald-950/50',
            textColor: 'text-emerald-700 dark:text-emerald-400',
            dotColor: 'bg-emerald-500',
          };
        case 'moderate':
          return {
            level: 'Medium',
            bgColor: 'bg-amber-100 dark:bg-amber-950/50',
            textColor: 'text-amber-700 dark:text-amber-400',
            dotColor: 'bg-amber-500',
          };
        case 'aggressive':
          return {
            level: 'High',
            bgColor: 'bg-rose-100 dark:bg-rose-950/50',
            textColor: 'text-rose-700 dark:text-rose-400',
            dotColor: 'bg-rose-500',
          };
      }
    }

    if (clampedRisk <= 33) {
      return {
        level: 'Low',
        bgColor: 'bg-emerald-100 dark:bg-emerald-950/50',
        textColor: 'text-emerald-700 dark:text-emerald-400',
        dotColor: 'bg-emerald-500',
      };
    } else if (clampedRisk <= 66) {
      return {
        level: 'Medium',
        bgColor: 'bg-amber-100 dark:bg-amber-950/50',
        textColor: 'text-amber-700 dark:text-amber-400',
        dotColor: 'bg-amber-500',
      };
    } else {
      return {
        level: 'High',
        bgColor: 'bg-rose-100 dark:bg-rose-950/50',
        textColor: 'text-rose-700 dark:text-rose-400',
        dotColor: 'bg-rose-500',
      };
    }
  }, [clampedRisk, riskLevel]);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
        getRiskInfo.bgColor
      )}
    >
      <div className={cn('w-2 h-2 rounded-full', getRiskInfo.dotColor)} />
      <span className={cn('text-xs font-medium', getRiskInfo.textColor)}>
        {getRiskInfo.level} Risk
      </span>
      <span className={cn('text-xs', getRiskInfo.textColor)}>({clampedRisk}%)</span>
    </div>
  );
}

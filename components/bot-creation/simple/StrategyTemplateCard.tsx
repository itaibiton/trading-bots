/**
 * Strategy Template Card Component
 * Interactive card showing strategy info in chat context
 */

'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RiskLevel } from '@/types/bot';
import { TrendingUp } from 'lucide-react';

interface StrategyTemplateCardProps {
  type: string;
  name: string;
  description: string;
  risk: RiskLevel;
  expectedReturn: number;
  icon: string;
  onSelect: (type: string, name: string) => void;
}

const riskColors = {
  low: 'bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400',
  medium: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400',
  high: 'bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-400',
};

const riskLabels = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
};

export function StrategyTemplateCard({
  type,
  name,
  description,
  risk,
  expectedReturn,
  icon,
  onSelect,
}: StrategyTemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.02, translateY: -2 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl">{icon}</div>
              <CardTitle className="text-base font-semibold">{name}</CardTitle>
            </div>
            <Badge variant="outline" className={riskColors[risk]}>
              {riskLabels[risk]}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>

          <div className="flex items-center gap-1.5 text-xs">
            <TrendingUp className="size-3.5 text-green-600 dark:text-green-400" />
            <span className="text-muted-foreground">Expected return:</span>
            <span className="font-semibold text-foreground">~{expectedReturn}%</span>
          </div>

          <Button
            size="sm"
            className="w-full mt-2"
            onClick={() => onSelect(type, name)}
          >
            Select This Strategy
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

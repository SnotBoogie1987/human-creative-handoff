'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  trend: number;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
}

export default function StatsCard({ title, value, trend, icon: Icon, prefix = '', suffix = '' }: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const isPositive = trend >= 0;

  return (
    <Card className="bg-card text-card-foreground border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-tertiary rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground uppercase tracking-wide">{title}</p>
        <p className="text-3xl font-headline text-foreground">
          {prefix}{displayValue.toLocaleString()}{suffix}
        </p>
      </div>
    </Card>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  previousPeriod: number;
  format: 'currency' | 'percentage' | 'number';
  status: 'positive' | 'negative' | 'warning' | 'neutral';
}

interface PerformanceMetricsCardProps {
  metrics: PerformanceMetric[];
  title?: string;
  description?: string;
}

export function PerformanceMetricsCard({
  metrics,
  title = "Capital Raise Performance",
  description = "Key fundraising metrics and targets"
}: PerformanceMetricsCardProps) {
  const formatValue = (value: number, format: PerformanceMetric['format']) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
          notation: 'compact',
          compactDisplay: 'short'
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'number':
        return new Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short'
        }).format(value);
      default:
        return value.toString();
    }
  };

  const getStatusIcon = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'positive':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'neutral':
      default:
        return null;
    }
  };

  const getChangeIndicator = (current: number, previous: number) => {
    const percentChange = ((current - previous) / previous) * 100;
    const isPositive = percentChange >= 0;
    
    return (
      <div className={cn(
        "flex items-center text-xs font-medium",
        isPositive ? "text-green-500" : "text-red-500"
      )}>
        {isPositive ? 
          <ArrowUp className="h-3 w-3 mr-1" /> : 
          <ArrowDown className="h-3 w-3 mr-1" />
        }
        {Math.abs(percentChange).toFixed(1)}%
      </div>
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {metrics.map((metric, index) => {
            const progress = (metric.value / metric.target) * 100;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                    {getStatusIcon(metric.status)}
                  </div>
                  {getChangeIndicator(metric.value, metric.previousPeriod)}
                </div>
                
                <div className="flex justify-between items-end mb-1">
                  <div className="text-xl font-semibold">
                    {formatValue(metric.value, metric.format)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Target: {formatValue(metric.target, metric.format)}
                  </div>
                </div>
                
                <Progress 
                  value={Math.min(progress, 100)} 
                  className={cn(
                    "h-2",
                    metric.status === 'positive' ? "bg-gray-100" : 
                    metric.status === 'negative' ? "bg-red-100" : 
                    metric.status === 'warning' ? "bg-amber-100" : "bg-gray-100"
                  )}
                  indicatorClassName={cn(
                    metric.status === 'positive' ? "bg-green-500" : 
                    metric.status === 'negative' ? "bg-red-500" : 
                    metric.status === 'warning' ? "bg-amber-500" : "bg-[#275E91]"
                  )}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
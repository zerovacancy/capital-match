import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CapitalRaiseMetrics } from '@/data';
import { formatCurrency } from '@/lib/utils';

interface CapitalProgressCardProps {
  metrics: CapitalRaiseMetrics;
}

export function CapitalProgressCard({ metrics }: CapitalProgressCardProps) {
  const progressPercentage = Math.min(100, Math.round((metrics.hardCommitments / metrics.goalAmount) * 100));
  const softProgressPercentage = Math.min(100, Math.round((metrics.softCommitments / metrics.goalAmount) * 100));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Capital Raise Progress</CardTitle>
        <CardDescription>Q2 {new Date(metrics.goalDate).getFullYear()} Goal: {formatCurrency(metrics.goalAmount)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Hard Commitments</span>
              <span className="text-sm font-semibold">{formatCurrency(metrics.hardCommitments)} ({progressPercentage}%)</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Soft Commitments</span>
              <span className="text-sm font-semibold">{formatCurrency(metrics.softCommitments)} ({softProgressPercentage}%)</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full"
                style={{ width: `${softProgressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Days Remaining</span>
              <span className="text-2xl font-bold">{metrics.remainingDays}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Probability of Success</span>
              <span className="text-2xl font-bold">{metrics.probabilityOfSuccess}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-2 bg-muted/50 rounded">
              <span className="text-xs text-muted-foreground block mb-1">Current Velocity</span>
              <span className={`text-sm font-bold ${metrics.currentVelocity >= metrics.velocityTarget ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(metrics.currentVelocity)}/mo
              </span>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <span className="text-xs text-muted-foreground block mb-1">Target Velocity</span>
              <span className="text-sm font-bold">
                {formatCurrency(metrics.velocityTarget)}/mo
              </span>
            </div>
          </div>
          
          <div className="text-center p-2 bg-muted/50 rounded">
            <span className="text-xs text-muted-foreground block mb-1">Projected Completion</span>
            <span className="text-sm font-bold">
              {new Date(metrics.projectedCompletionDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
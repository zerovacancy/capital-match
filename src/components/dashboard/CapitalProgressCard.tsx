import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CapitalRaiseMetrics } from '@/data';
import { formatCurrency } from '@/lib/utils';
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface CapitalProgressCardProps {
  metrics: CapitalRaiseMetrics;
}

export function CapitalProgressCard({ metrics }: CapitalProgressCardProps) {
  const [progressAnimated, setProgressAnimated] = useState(false);
  
  // Set animation to start after component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgressAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const progressPercentage = Math.min(100, Math.round((metrics.hardCommitments / metrics.goalAmount) * 100));
  const softProgressPercentage = Math.min(100, Math.round((metrics.softCommitments / metrics.goalAmount) * 100));
  
  // Success probability color
  const probabilityColor = metrics.probabilityOfSuccess >= 80 ? 'text-lg-success' : 
                           metrics.probabilityOfSuccess >= 60 ? 'text-lg-warning' : 'text-lg-error';

  return (
    <Card className="border border-lg-highlight/30 shadow-md">
      <CardHeader className="pb-2 border-b border-lg-highlight/20">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg-blue">Capital Raise Progress</CardTitle>
            <CardDescription className="text-lg-text">
              Q2 {new Date(metrics.goalDate).getFullYear()} Goal: {formatCurrency(metrics.goalAmount)}
            </CardDescription>
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-lg-blue/10 shadow-inner">
            <span className="text-lg font-bold text-lg-blue">{Math.round((metrics.hardCommitments + metrics.softCommitments) / metrics.goalAmount * 100)}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-1.5 items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-lg-success shadow-sm"></div>
                <span className="text-sm font-semibold text-lg-text">Hard Commitments</span>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info size={14} className="text-lg-blue cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[260px] p-3">
                      <p className="text-xs">Signed agreements with binding financial commitments from LPs. These are highly reliable funds that can be counted toward capital raise goals.</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-bold text-lg-blue">{formatCurrency(metrics.hardCommitments)} <span className="text-xs text-lg-text">({progressPercentage}%)</span></span>
            </div>
            <div className="w-full h-4 bg-lg-highlight/20 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full rounded-full ${progressAnimated ? 'animate-progress-width' : ''}`}
                style={{ 
                  width: progressAnimated ? `${progressPercentage}%` : '0%',
                  background: 'linear-gradient(90deg, #7A8D79 0%, #2E7D32 100%)',
                  transition: 'width 1.2s ease-out'
                }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1.5 items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-lg-green shadow-sm"></div>
                <span className="text-sm font-semibold text-lg-text">Soft Commitments</span>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info size={14} className="text-lg-blue cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[260px] p-3">
                      <p className="text-xs">Verbal commitments or LOIs from LPs that indicate interest but are not yet legally binding. These typically have a 60-90% conversion rate to hard commitments.</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-bold text-lg-blue">{formatCurrency(metrics.softCommitments)} <span className="text-xs text-lg-text">({softProgressPercentage}%)</span></span>
            </div>
            <div className="w-full h-4 bg-lg-highlight/20 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full rounded-full ${progressAnimated ? 'animate-progress-width' : ''}`}
                style={{ 
                  width: progressAnimated ? `${softProgressPercentage}%` : '0%',
                  background: '#7A8D79',
                  transition: 'width 1.2s ease-out'
                }}
              ></div>
            </div>
          </div>
          
          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="bg-lg-background rounded-lg p-3 shadow-sm border border-lg-highlight/10">
              <div className="flex items-center mb-2 gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="text-sm font-semibold text-lg-text">Days Remaining</span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-lg-blue">{metrics.remainingDays}</span>
                <span className="text-xs text-lg-text pb-1">until target date</span>
              </div>
            </div>
            <div className="bg-lg-background rounded-lg p-3 shadow-sm border border-lg-highlight/10">
              <div className="flex items-center mb-2 gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span className="text-sm font-semibold text-lg-text">Success Probability</span>
              </div>
              <div className="flex items-end gap-1">
                <span className={`text-2xl font-bold ${probabilityColor}`}>{metrics.probabilityOfSuccess}%</span>
                <span className="text-xs text-lg-text pb-1">likelihood</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-lg-background rounded-lg p-3 shadow-sm border border-lg-highlight/10 flex flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                <span className="text-sm font-medium text-lg-text">Current Velocity</span>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info size={14} className="text-lg-blue cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[260px] p-3">
                      <p className="text-xs">Average monthly capital raise over the last 3 months, indicating current fundraising momentum.</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
              <span className={`text-lg font-bold ${metrics.currentVelocity >= metrics.velocityTarget ? 'text-lg-success' : 'text-lg-error'}`}>
                {formatCurrency(metrics.currentVelocity)}<span className="text-xs font-normal">/mo</span>
              </span>
            </div>
            <div className="bg-lg-background rounded-lg p-3 shadow-sm border border-lg-highlight/10 flex flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
                <span className="text-sm font-medium text-lg-text">Target Velocity</span>
              </div>
              <span className="text-lg font-bold text-lg-blue">
                {formatCurrency(metrics.velocityTarget)}<span className="text-xs font-normal">/mo</span>
              </span>
            </div>
          </div>
          
          <div className="bg-lg-background rounded-lg p-3 shadow-sm border border-lg-highlight/10">
            <div className="flex items-center mb-2 gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-sm font-medium text-lg-text">Projected Completion</span>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-lg-blue cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[260px] p-3">
                    <p className="text-xs">Estimated date when capital raise goal will be met, based on current velocity and pipeline conversion rates.</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-lg font-bold text-lg-blue">
                {new Date(metrics.projectedCompletionDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="text-xs text-lg-text">{
                new Date(metrics.projectedCompletionDate) < new Date(metrics.goalDate) ? 
                'ahead of schedule' : 'behind schedule'
              }</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
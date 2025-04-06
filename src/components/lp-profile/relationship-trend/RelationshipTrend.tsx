
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, CalendarIcon, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RelationshipTrendProps } from './RelationshipTrend.types';
import { useRelationshipTrend } from './useRelationshipTrend';
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function RelationshipTrend({ lpId, className }: RelationshipTrendProps) {
  const { trendData, metrics } = useRelationshipTrend(lpId);
  const [animatedData, setAnimatedData] = useState<any[]>([]);
  
  // Animate the line chart on load
  useEffect(() => {
    if (trendData.length > 0) {
      setAnimatedData([]);
      
      const timer = setTimeout(() => {
        let currentIndex = 0;
        
        const interval = setInterval(() => {
          if (currentIndex < trendData.length) {
            setAnimatedData(prev => [...prev, trendData[currentIndex]]);
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, 300);
        
        return () => clearInterval(interval);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [trendData]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      // Determine color based on strength
      const strengthColor = 
        data.strength >= 8 ? '#2E7D32' : 
        data.strength >= 5 ? '#7A8D79' : 
        '#C62828';
      
      return (
        <div className="bg-lg-footer border border-lg-highlight p-3 text-sm shadow-md rounded-md">
          <p className="font-semibold text-lg-blue mb-1">{data.formattedDate}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={strengthColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <p className="text-lg-text">
                Strength: <span className="font-medium text-lg-blue">{data.strength}/10</span>
              </p>
            </div>
            {data.event && (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <p className="text-lg-text">
                  Event: <span className="font-medium text-lg-blue">{data.event}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }
  
    return null;
  };
  
  // Get trend badge information
  const getTrendBadge = () => {
    const badgeColor = 
      metrics.trend === 'improving' ? 'bg-lg-success text-white' : 
      metrics.trend === 'declining' ? 'bg-lg-error text-white' : 
      'bg-lg-highlight/30 text-lg-text';
    
    const icon = 
      metrics.trend === 'improving' ? <ArrowUpIcon className="mr-1 h-3 w-3" /> :
      metrics.trend === 'declining' ? <ArrowDownIcon className="mr-1 h-3 w-3" /> :
      <MinusIcon className="mr-1 h-3 w-3" />;
    
    return { badgeColor, icon };
  };
  
  const { badgeColor, icon } = getTrendBadge();
  
  return (
    <Card className={cn("h-full border border-lg-highlight/30 shadow-md", className)}>
      <CardHeader className="pb-2 border-b border-lg-highlight/20">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg-blue flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Relationship Strength Trend
          </CardTitle>
          <Badge 
            className={cn("text-xs px-2 py-1", badgeColor)}
          >
            {icon}
            {metrics.trend.charAt(0).toUpperCase() + metrics.trend.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {trendData.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="bg-lg-highlight/5 p-2 rounded-md shadow-sm border border-lg-highlight/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <p className="text-xs text-lg-text font-medium">Current</p>
                </div>
                <p className="text-xl font-bold text-lg-blue">{metrics.currentStrength}<span className="text-xs text-lg-text font-normal">/10</span></p>
              </div>
              <div className="bg-lg-highlight/5 p-2 rounded-md shadow-sm border border-lg-highlight/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  <p className="text-xs text-lg-text font-medium">Average</p>
                </div>
                <p className="text-xl font-bold text-lg-blue">{metrics.averageStrength}<span className="text-xs text-lg-text font-normal">/10</span></p>
              </div>
              <div className="bg-lg-highlight/5 p-2 rounded-md shadow-sm border border-lg-highlight/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  <p className="text-xs text-lg-text font-medium">Recent Change</p>
                </div>
                <p className={cn(
                  "text-xl font-bold",
                  metrics.changeLastMonth > 0 ? "text-lg-success" : 
                  metrics.changeLastMonth < 0 ? "text-lg-error" : "text-lg-text"
                )}>
                  {metrics.changeLastMonth > 0 ? `+${metrics.changeLastMonth}` : metrics.changeLastMonth}
                </p>
              </div>
            </div>
            
            <div className="bg-lg-highlight/5 p-4 rounded-lg mb-3 shadow-sm border border-lg-highlight/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-lg-text flex items-center gap-1.5">
                  Relationship Strength Over Time
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info size={14} className="text-lg-blue cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[260px] p-3">
                        <p className="text-xs">
                          Relationship strength is measured on a scale from 0-10 based on interaction frequency, 
                          response times, deal participation, and feedback quality. The reference line at 5 
                          indicates the minimum target strength for active relationships.
                        </p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </h4>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-lg-blue"></div>
                    <span className="text-lg-text">Strength</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-0.5 bg-lg-green"></div>
                    <span className="text-lg-text">Target (5)</span>
                  </div>
                </div>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={animatedData.length > 0 ? animatedData : trendData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="strengthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#275E91" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#275E91" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      vertical={false} 
                      stroke="#C9D4DC" 
                      strokeOpacity={0.4}
                    />
                    <XAxis 
                      dataKey="formattedDate"
                      tick={{ fontSize: 10, fill: '#1C1C1C' }}
                      axisLine={{ stroke: '#C9D4DC', strokeOpacity: 0.5 }}
                    />
                    <YAxis 
                      domain={[0, 10]}
                      ticks={[0, 2, 4, 6, 8, 10]}
                      tick={{ fontSize: 10, fill: '#1C1C1C' }}
                      axisLine={{ stroke: '#C9D4DC', strokeOpacity: 0.5 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine 
                      y={5} 
                      stroke="#7A8D79" 
                      strokeDasharray="3 3"
                      strokeOpacity={0.8} 
                    />
                    <Area
                      type="monotone"
                      dataKey="strength"
                      stroke="#275E91"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#strengthGradient)"
                      activeDot={{ 
                        r: 6, 
                        strokeWidth: 2,
                        stroke: '#275E91',
                        fill: '#FFFFFF',
                        className: "drop-shadow-md" 
                      }}
                      isAnimationActive={true}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="text-sm font-medium mb-2 text-lg-text flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Recent Activity
              </h4>
              <div className="space-y-2">
                {trendData.slice().reverse().slice(0, 3).map((point, index) => (
                  <div key={index} className="flex items-start gap-2 bg-lg-highlight/5 p-2 rounded-md shadow-sm border border-lg-highlight/10">
                    <div className="mt-0.5 text-lg-blue">
                      <CalendarIcon size={14} className="text-lg-blue" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-lg-blue">{point.formattedDate}</p>
                      {point.event ? (
                        <p className="text-xs text-lg-text">{point.event}</p>
                      ) : (
                        <p className="text-xs text-lg-text">Regular check-in</p>
                      )}
                    </div>
                    <div className="ml-auto">
                      <Badge 
                        className={cn(
                          "text-xs",
                          point.strength >= 8 ? "bg-lg-success text-white" : 
                          point.strength >= 5 ? "bg-lg-green text-white" : 
                          "bg-lg-error text-white"
                        )}
                      >
                        {point.strength}/10
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-lg-text">No relationship history available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

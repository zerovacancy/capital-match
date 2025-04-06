
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { CreditCardIcon, Info } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { getInvestmentHistory } from '@/data/relationshipHistory';
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InvestmentHistoryProps {
  lpId: string;
  className?: string;
}

export function InvestmentHistory({ lpId, className }: InvestmentHistoryProps) {
  const investmentHistory = getInvestmentHistory(lpId);
  const [animationReady, setAnimationReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  // Start animation after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Format the data for the chart
  const chartData = investmentHistory.map((item, index) => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    }),
    formattedAmount: formatCurrency(item.amount),
    index
  }));
  
  // Calculate total investment amount
  const totalInvestment = investmentHistory.reduce((sum, item) => sum + item.amount, 0);
  
  // Custom bar colors based on index - variations of Primary Blue
  const getBarColor = (index: number) => {
    // Use primary blue with different opacity levels
    return `rgba(39, 94, 145, ${0.6 + (index * 0.05)})`;
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-lg-footer border border-lg-highlight p-3 text-sm shadow-md rounded-md">
          <p className="font-semibold text-lg-blue mb-1">{data.formattedDate}</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <p className="text-lg-text">
                Deal: <span className="font-medium text-lg-blue">{data.deal}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <p className="text-lg-text">
                Amount: <span className="font-medium text-lg-blue">{data.formattedAmount}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <p className="text-lg-text">
                Date: <span className="font-medium text-lg-blue">{new Date(data.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };
  
  const handleMouseLeave = () => {
    setActiveIndex(-1);
  };
  
  return (
    <Card className={cn("h-full border border-lg-highlight/30 shadow-md", className)}>
      <CardHeader className="pb-2 border-b border-lg-highlight/20">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg-blue flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            Investment History
          </CardTitle>
          <Badge className="bg-lg-blue/10 text-lg-blue border border-lg-blue/20 text-xs font-normal">
            {chartData.length} Investments
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {chartData.length > 0 ? (
          <>
            <div className="bg-lg-highlight/5 p-3 rounded-md shadow-sm border border-lg-highlight/10 mb-5">
              <div className="flex items-center gap-1.5 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <p className="text-xs text-lg-text font-medium">Total Investment</p>
              </div>
              <p className="text-xl font-bold text-lg-blue">{formatCurrency(totalInvestment)}</p>
            </div>
            
            <div className="bg-lg-highlight/5 p-4 rounded-lg mb-4 shadow-sm border border-lg-highlight/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-lg-text flex items-center gap-1.5">
                  Investment Amount Over Time
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info size={14} className="text-lg-blue cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[260px] p-3">
                        <p className="text-xs">
                          Distribution of capital investments over time. Hover over bars to see detailed 
                          information about each investment including deal name and exact amount.
                        </p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </h4>
              </div>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    onMouseLeave={handleMouseLeave}
                  >
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
                      tickFormatter={(value) => 
                        value >= 1000000 
                          ? `$${(value / 1000000).toFixed(1)}M` 
                          : value >= 1000 
                          ? `$${(value / 1000).toFixed(0)}K` 
                          : `$${value}`
                      }
                      tick={{ fontSize: 10, fill: '#1C1C1C' }}
                      axisLine={{ stroke: '#C9D4DC', strokeOpacity: 0.5 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <defs>
                      <linearGradient id="investmentBarGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#275E91" stopOpacity={0.9}/>
                        <stop offset="100%" stopColor="#7A8D79" stopOpacity={0.7}/>
                      </linearGradient>
                    </defs>
                    <Bar 
                      dataKey="amount" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      animationEasing="ease-out"
                      isAnimationActive={animationReady}
                      onMouseEnter={handleMouseEnter}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill={index === activeIndex ? '#275E91' : 'url(#investmentBarGradient)'}
                          className="transition-all duration-300 hover:filter hover:brightness-110"
                          style={{
                            filter: index === activeIndex ? 'drop-shadow(0 2px 4px rgba(39, 94, 145, 0.3))' : 'none',
                            cursor: 'pointer'
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="text-sm font-medium mb-2 text-lg-text flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                Recent Investments
              </h4>
              <div className="space-y-2">
                {chartData.slice().reverse().map((item, index) => (
                  <div key={index} className="flex items-start gap-2 bg-lg-highlight/5 p-2 rounded-md shadow-sm border border-lg-highlight/10">
                    <div className="mt-0.5 text-lg-blue">
                      <CreditCardIcon size={14} className="text-lg-blue" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-lg-blue">{item.formattedDate}</p>
                      <p className="text-xs text-lg-text">{item.deal}</p>
                    </div>
                    <div className="ml-auto">
                      <Badge className="bg-lg-blue/10 text-lg-blue border border-lg-blue/20 text-xs font-mono">
                        {formatCurrency(item.amount)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-lg-text">No investment history available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

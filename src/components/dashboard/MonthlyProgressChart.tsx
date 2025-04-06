import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';
import { monthlyProgress } from '@/data';
import { formatCurrency } from '@/lib/utils';
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

export function MonthlyProgressChart() {
  // Calculate total raised for the current year
  const totalRaised = monthlyProgress.reduce((total, month) => total + (month.actual || 0), 0);
  const totalProjected = monthlyProgress.reduce((total, month) => total + (month.projected || 0), 0);
  const annualTarget = monthlyProgress[0].target * 12; // Assuming constant monthly target
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-lg-footer border border-lg-highlight p-3 text-sm shadow-md rounded">
          <p className="font-semibold text-lg-blue mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="flex items-center gap-2 py-0.5">
              <span className={`h-3 w-3 rounded-full ${
                entry.dataKey === "actual" ? "bg-lg-blue" : 
                entry.dataKey === "projected" ? "bg-lg-green" : "bg-lg-highlight"
              }`}></span>
              <span className="capitalize text-lg-text">{entry.dataKey}:</span>
              <span className="font-semibold text-lg-text">{formatCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend that includes tooltips
  const CustomLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex justify-center items-center gap-6 mt-2">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-sm text-lg-text">{entry.value}</span>
            
            {entry.value === 'Target' && (
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-lg-blue cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[220px] p-3">
                    <p className="text-xs">Monthly target of {formatCurrency(850000)} based on Q2 capital raise goals.</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            )}
            
            {entry.value === 'Actual' && (
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-lg-blue cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[220px] p-3">
                    <p className="text-xs">Confirmed commitments received each month. Total to date: {formatCurrency(totalRaised)}</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            )}
            
            {entry.value === 'Projected' && (
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-lg-blue cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[220px] p-3">
                    <p className="text-xs">Estimated future commitments based on current pipeline and conversion rates.</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // Generate gradients for bars
  const actualBarGradient = (
    <linearGradient id="actualBarGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#275E91" />
      <stop offset="100%" stopColor="#275E91" stopOpacity={0.8} />
    </linearGradient>
  );
  
  const projectedBarGradient = (
    <linearGradient id="projectedBarGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#7A8D79" />
      <stop offset="100%" stopColor="#7A8D79" stopOpacity={0.8} />
    </linearGradient>
  );

  return (
    <Card className="col-span-2 border border-lg-highlight/30 shadow-md">
      <CardHeader className="pb-2 border-b border-lg-highlight/20">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg-blue flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6" y2="6"></line>
                <line x1="6" y1="18" x2="6" y2="18"></line>
              </svg>
              Monthly Capital Raise Progress
            </CardTitle>
            <CardDescription className="text-lg-text">
              Target vs. actual monthly capital velocity
            </CardDescription>
          </div>
          <div className="flex items-center p-2 bg-lg-background rounded-md border border-lg-highlight/10 shadow-sm">
            <div className="px-3 border-r border-lg-highlight/20">
              <p className="text-xs text-lg-text font-medium">YTD Raised</p>
              <p className="text-lg font-bold text-lg-blue">{formatCurrency(totalRaised)}</p>
            </div>
            <div className="px-3">
              <p className="text-xs text-lg-text font-medium">Annual Goal</p>
              <p className="text-lg font-bold text-lg-blue">{formatCurrency(annualTarget)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyProgress}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <defs>
              {actualBarGradient}
              {projectedBarGradient}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#C9D4DC" strokeOpacity={0.3} />
            <XAxis 
              dataKey="month" 
              axisLine={{ stroke: '#C9D4DC', strokeOpacity: 0.5 }}
              tick={{ fill: '#1C1C1C' }}
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000)}k`}
              width={60}
              axisLine={{ stroke: '#C9D4DC', strokeOpacity: 0.5 }}
              tick={{ fill: '#1C1C1C' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <ReferenceLine 
              y={850000} 
              stroke="#275E91" 
              strokeDasharray="3 3" 
              strokeWidth={1.5}
              label={{ 
                value: 'Monthly Target', 
                position: 'right', 
                fill: '#275E91', 
                fontSize: 12,
                fontWeight: 500 
              }} 
            />
            <Bar 
              dataKey="target" 
              fill="#C9D4DC" 
              name="Target" 
              radius={[2, 2, 0, 0]}
              barSize={20}
            />
            <Bar 
              dataKey="actual" 
              fill="url(#actualBarGradient)" 
              name="Actual" 
              radius={[2, 2, 0, 0]}
              barSize={20}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Bar 
              dataKey="projected" 
              fill="url(#projectedBarGradient)" 
              name="Projected" 
              radius={[2, 2, 0, 0]}
              barSize={20}
              animationDuration={1500}
              animationEasing="ease-out"
              strokeDasharray="4 2"
              stroke="#7A8D79"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
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
      const targetValue = payload.find(p => p.dataKey === 'target')?.value || 0;
      
      const getBarColor = (dataKey: string) => {
        switch(dataKey) {
          case "actual": return "#275E91"; // lg-blue
          case "projected": return "#7A8D79"; // lg-green
          default: return "#C9D4DC"; // lg-highlight
        }
      };
      
      return (
        <div className="bg-lg-footer border border-lg-highlight p-4 text-sm shadow-md rounded-md">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-lg-blue">{label}</p>
            <span className="text-xs text-lg-text bg-lg-highlight/20 px-2 py-0.5 rounded">
              Monthly data
            </span>
          </div>
          <div className="space-y-2 pt-1">
            {payload.map((entry: any, index: number) => {
              const percentage = targetValue ? Math.round((entry.value / targetValue) * 100) : 0;
              const barColor = getBarColor(entry.dataKey);
              
              return (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span 
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: barColor }}
                      ></span>
                      <span className="capitalize text-xs text-lg-text">{entry.dataKey}:</span>
                    </div>
                    <span className="font-semibold text-lg-blue">{formatCurrency(entry.value)}</span>
                  </div>
                  {entry.dataKey !== 'target' && (
                    <div className="w-full h-1.5 bg-lg-highlight/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: barColor
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom legend that includes tooltips
  const CustomLegend = (props: any) => {
    const { payload } = props;
    
    // Define tooltips for each legend item
    const tooltips = {
      Target: "Monthly target of $850,000 based on Q2 capital raise goals.",
      Actual: `Confirmed commitments received each month. Total to date: ${formatCurrency(totalRaised)}`,
      Projected: "Estimated future commitments based on current pipeline and conversion rates."
    };
    
    return (
      <div className="flex justify-center items-center gap-6 mt-4">
        {payload.map((entry: any, index: number) => (
          <div 
            key={`legend-${index}`} 
            className="flex items-center gap-2 bg-lg-highlight/10 px-3 py-1.5 rounded-lg border border-lg-highlight/10 shadow-sm"
          >
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-sm font-medium text-lg-text">{entry.value}</span>
            
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info size={14} className="text-lg-blue cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[220px] p-3">
                  <p className="text-xs">{tooltips[entry.value as keyof typeof tooltips]}</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
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
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-6 md:col-span-4 lg:col-span-3">
          <div className="flex items-center p-3 bg-lg-background rounded-md border border-lg-highlight/10 shadow-sm h-full">
            <div className="w-full">
              <p className="text-xs text-lg-text font-medium">YTD Raised</p>
              <p className="text-lg font-bold text-lg-blue">{formatCurrency(totalRaised)}</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3">
          <div className="flex items-center p-3 bg-lg-background rounded-md border border-lg-highlight/10 shadow-sm h-full">
            <div className="w-full">
              <p className="text-xs text-lg-text font-medium">Annual Goal</p>
              <p className="text-lg font-bold text-lg-blue">{formatCurrency(annualTarget)}</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3">
          <div className="flex items-center p-3 bg-lg-background rounded-md border border-lg-highlight/10 shadow-sm h-full">
            <div className="w-full">
              <p className="text-xs text-lg-text font-medium">Progress</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-lg-blue">{Math.round((totalRaised / annualTarget) * 100)}%</p>
                <div className="w-full h-2 bg-lg-highlight/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-lg-blue" 
                    style={{ width: `${Math.min(100, Math.round((totalRaised / annualTarget) * 100))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-lg-highlight/5 rounded-lg p-5 flex-1 shadow-sm border border-lg-highlight/10">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyProgress}
            margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              {actualBarGradient}
              {projectedBarGradient}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#C9D4DC" strokeOpacity={0.3} />
            <XAxis 
              dataKey="month" 
              axisLine={{ stroke: '#C9D4DC', strokeOpacity: 0.5 }}
              tick={{ fill: '#1C1C1C', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000)}k`}
              width={60}
              axisLine={{ stroke: '#C9D4DC', strokeOpacity: 0.5 }}
              tick={{ fill: '#1C1C1C', fontSize: 12 }}
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
              barSize={22}
            />
            <Bar 
              dataKey="actual" 
              fill="url(#actualBarGradient)" 
              name="Actual" 
              radius={[2, 2, 0, 0]}
              barSize={22}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Bar 
              dataKey="projected" 
              fill="url(#projectedBarGradient)" 
              name="Projected" 
              radius={[2, 2, 0, 0]}
              barSize={22}
              animationDuration={1500}
              animationEasing="ease-out"
              strokeDasharray="4 2"
              stroke="#7A8D79"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
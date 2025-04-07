import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  ResponsiveContainer,
  Tooltip,
  Sector
} from 'recharts';
import { capitalSourceBreakdown } from '@/data';
import { formatCurrency } from '@/lib/utils';
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

export function CapitalSourceChart() {
  // State for animations
  const [animation, setAnimation] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  // Start animation after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Colors based on our design system
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Hard Commit': return '#2E7D32'; // Success Green
      case 'Soft Commit': return '#7A8D79'; // Secondary Green
      case 'Reviewing': return '#275E91'; // Primary Blue
      case 'Interested': return '#C9D4DC'; // Section Highlight
      default: return '#C9D4DC';
    }
  };
  
  // Generate colors based on LP status
  const COLORS = capitalSourceBreakdown.map(item => getStatusColor(item.status));
  
  // Active sector configuration for hover state
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          strokeWidth={2}
          stroke="#275E91"
          className="filter drop-shadow-md transition-all duration-300"
        />
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(-1);
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const statusColor = getStatusColor(data.status);
      
      return (
        <div className="bg-lg-footer border border-lg-highlight p-3 text-sm shadow-md rounded-md">
          <p className="font-semibold text-lg-blue mb-1">{data.source}</p>
          <div className="space-y-1.5">
            <p className="flex items-center justify-between gap-4">
              <span className="text-lg-text">Amount:</span>
              <span className="font-medium text-lg-blue">{formatCurrency(data.amount)}</span>
            </p>
            <p className="flex items-center justify-between gap-4">
              <span className="text-lg-text">Status:</span>
              <span className="font-medium px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: statusColor }}>
                {data.status}
              </span>
            </p>
            <p className="flex items-center justify-between gap-4">
              <span className="text-lg-text">% of Raise:</span>
              <span className="font-medium text-lg-blue">
                {((data.amount / capitalSourceBreakdown.reduce((sum, item) => sum + item.amount, 0)) * 100).toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };
  
  const CustomLegend = ({ payload }: any) => {
    // Group by status for a better organized legend
    const statusGroups: {[key: string]: {color: string, sources: string[], totalAmount: number}} = {};
    
    payload.forEach((entry: any, index: number) => {
      const sourceData = capitalSourceBreakdown[index];
      if (!statusGroups[sourceData.status]) {
        statusGroups[sourceData.status] = {
          color: getStatusColor(sourceData.status),
          sources: [],
          totalAmount: 0
        };
      }
      statusGroups[sourceData.status].sources.push(sourceData.source);
      statusGroups[sourceData.status].totalAmount += sourceData.amount;
    });
    
    // Order by status priority
    const statusPriority = ["Hard Commit", "Soft Commit", "Reviewing", "Interested"];
    const orderedStatuses = statusPriority.filter(status => statusGroups[status]);
    
    return (
      <div className="mt-4">
        <div className="flex items-center justify-center mb-3 gap-1">
          <span className="text-sm text-lg-text font-medium">Commitment Status</span>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Info size={12} className="text-lg-blue cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight max-w-[260px] p-3">
                <p className="text-xs">
                  Investment commitments by status: Hard commitments are legally binding, Soft commitments are verbal agreements,
                  Reviewing means actively evaluating the deal, and Interested indicates initial positive response.
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        
        {/* Status Legend */}
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs mb-2">
          {orderedStatuses.map((status) => (
            <li 
              key={`status-${status}`} 
              className="flex items-center gap-1.5 bg-lg-highlight/10 px-3 py-1.5 rounded-lg shadow-sm border border-lg-highlight/10"
            >
              <span
                className="inline-block h-3 w-3 rounded-full shadow-sm"
                style={{ backgroundColor: statusGroups[status].color }}
              ></span>
              <div className="flex flex-col">
                <span className="text-lg-text font-medium">{status}</span>
                <span className="text-lg-blue font-semibold">
                  {formatCurrency(statusGroups[status].totalAmount)}
                </span>
                <span className="text-lg-text text-xs">
                  {((statusGroups[status].totalAmount / capitalSourceBreakdown.reduce((sum, item) => sum + item.amount, 0)) * 100).toFixed(1)}%
                </span>
              </div>
            </li>
          ))}
        </ul>
        
        {/* Source Indicators - only shown on hover */}
        <div className="text-center">
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-lg-text underline cursor-help inline-flex items-center gap-1">
                  View all sources <Info size={10} />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-lg-footer text-lg-text border-lg-highlight p-3 w-64">
                <p className="text-xs mb-2 font-medium">Capital Sources by Investor</p>
                <ul className="space-y-2">
                  {payload.map((entry: any, index: number) => {
                    const sourceData = capitalSourceBreakdown[index];
                    return (
                      <li key={`source-${index}`} className="flex items-center justify-between gap-1.5 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="inline-block h-2 w-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          ></span>
                          <span className="text-lg-text">{entry.value}</span>
                        </div>
                        <span className="text-lg-blue font-medium">
                          {formatCurrency(sourceData.amount)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center p-2 bg-lg-background rounded-md border border-lg-highlight/10 shadow-sm">
          <p className="text-xs text-lg-text font-medium">Total Commitments: <span className="text-lg-blue font-bold">{formatCurrency(capitalSourceBreakdown.reduce((sum, item) => sum + item.amount, 0))}</span></p>
        </div>
      </div>
      
      <div className="bg-lg-highlight/5 rounded-lg p-4 h-[280px] flex flex-col shadow-sm border border-lg-highlight/10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {/* Subtle background pattern */}
              <pattern id="pieBackgroundPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#ECEDE3" />
                <circle cx="5" cy="5" r="1" fill="#C9D4DC" fillOpacity="0.3" />
              </pattern>
            </defs>
            <circle cx="50%" cy="50%" r="85" fill="url(#pieBackgroundPattern)" />
            <Pie
              data={capitalSourceBreakdown}
              dataKey="amount"
              nameKey="source"
              cx="50%"
              cy="50%"
              innerRadius={animation ? 30 : 0}
              outerRadius={80}
              paddingAngle={2}
              label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              isAnimationActive={animation}
            >
              {capitalSourceBreakdown.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke="#FFFFFF"
                  strokeWidth={1}
                  className="transition-all duration-300"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
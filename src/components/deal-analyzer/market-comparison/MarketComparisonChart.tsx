import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
import { MarketComparisonChartProps } from './MarketComparisonChart.types';
import { useMarketComparisonChart } from './useMarketComparisonChart';
import { cn } from '@/lib/utils';

export function MarketComparisonChart({ deal, className }: MarketComparisonChartProps) {
  const [activeTab, setActiveTab] = useState("chart");
  const { 
    marketComparison,
    radarData,
    metricItems,
    marketStrength,
    marketStrengthLabel
  } = useMarketComparisonChart(deal);

  if (!marketComparison) {
    return (
      <Card className={cn("h-full", className)}>
        <CardHeader>
          <CardTitle>Market Comparison</CardTitle>
          <CardDescription>
            No market data available for {deal.location}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Format score for display
  const formattedMarketStrength = marketStrength.toFixed(1);
  
  // Rating color
  const ratingColor = 
    marketStrength >= 8 ? 'bg-green-500' :
    marketStrength >= 6 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Market Comparison</CardTitle>
            <CardDescription>
              {deal.location} market analysis
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <div 
              className={`${ratingColor} text-white font-bold flex items-center justify-center h-10 w-16 rounded-md text-lg`}
            >
              {formattedMarketStrength}
            </div>
            <span className="text-xs">{marketStrengthLabel}</span>
          </div>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-2"
        >
          <TabsList>
            <TabsTrigger value="chart">Radar Chart</TabsTrigger>
            <TabsTrigger value="table">Metrics Table</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} className="h-full">
          <TabsContent value="chart" className="m-0 h-[350px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                cx="50%" 
                cy="50%" 
                outerRadius="70%" 
                data={radarData}
              >
                <PolarGrid strokeDasharray="3 3" stroke="#7A8D79" strokeOpacity={0.3} />
                <PolarAngleAxis
                  dataKey="name"
                  tick={{ fill: '#1C1C1C', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={30}
                  stroke="#7A8D79" 
                  strokeOpacity={0.5}
                  domain={[0, 100]}
                  tick={false}
                />
                <Radar
                  name="Market Benchmark"
                  dataKey="benchmark"
                  stroke="#7A8D79"
                  fill="#7A8D79"
                  fillOpacity={0.2}
                />
                <Radar
                  name={deal.location}
                  dataKey="normalizedValue"
                  stroke="#275E91"
                  fill="#275E91"
                  fillOpacity={0.5}
                />
                <Tooltip
                  formatter={(value: number, name: string, props: any) => {
                    // Get the original value rather than normalized
                    const originalValue = props.payload.value;
                    const metricName = props.payload.name;
                    
                    // Find metric info
                    const metricInfo = metricItems.find(item => item.name === metricName);
                    
                    if (metricInfo) {
                      return [`${originalValue}${metricInfo.unit}`, metricName];
                    }
                    
                    return [value, name];
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="table" className="m-0 p-0">
            <div className="p-4 space-y-4">
              <div className="text-lg-blue font-semibold mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18"/>
                  <path d="m19 9-5 5-4-4-3 3"/>
                </svg>
                {deal.location} Market Metrics
              </div>
              <div className="grid grid-cols-3 text-sm font-semibold bg-lg-highlight/10 py-2 px-2 rounded-md mb-2 text-lg-text">
                <div>Metric</div>
                <div className="text-center">Market Value</div>
                <div className="text-center">Performance</div>
              </div>
              <div className="space-y-2.5">
                {metricItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`grid grid-cols-3 text-sm items-center py-2 ${
                      index < metricItems.length - 1 ? "border-b border-lg-highlight/20" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-lg-text font-medium">{item.name}</span>
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon size={14} className="text-lg-blue cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent side="right" className="bg-lg-footer border-lg-highlight">
                            <p className="max-w-[200px] text-lg-text">{item.description}</p>
                            <p className="mt-1 text-xs text-lg-text">
                              Benchmark: {item.benchmark}{item.unit}
                            </p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-center font-medium text-lg-blue">
                      {item.value}{item.unit}
                    </div>
                    <div className="flex justify-center">
                      <Badge 
                        className={
                          item.performance === 'above' ? 'bg-lg-success hover:bg-lg-success/90 text-white' :
                          item.performance === 'below' ? 'bg-lg-error hover:bg-lg-error/90 text-white' :
                          'bg-lg-warning hover:bg-lg-warning/90 text-white'
                        }
                      >
                        {item.performance === 'above' ? 'Above Average' :
                         item.performance === 'below' ? 'Below Average' :
                         'Average'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

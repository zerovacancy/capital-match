import React, { useState } from 'react';
import { 
  PerformanceMetricsCard, 
  CapitalVelocityChart, 
  InvestorSegmentationChart, 
  GeographicDistribution, 
  PredictiveInsightsCard 
} from './';
import { lps } from '@/data';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Download, Filter, Printer, RefreshCw } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';

// Example data for the analytics components
const performanceMetrics = [
  {
    name: "Capital Raised",
    value: 42500000,
    target: 150000000,
    previousPeriod: 38000000,
    format: 'currency' as const,
    status: 'positive' as const
  },
  {
    name: "Investor Conversion Rate",
    value: 28.5,
    target: 35,
    previousPeriod: 25.2,
    format: 'percentage' as const,
    status: 'positive' as const
  },
  {
    name: "Deal Flow",
    value: 15,
    target: 20,
    previousPeriod: 12,
    format: 'number' as const,
    status: 'warning' as const
  },
  {
    name: "Capital Velocity",
    value: 5600000,
    target: 6000000,
    previousPeriod: 5100000,
    format: 'currency' as const,
    status: 'neutral' as const
  }
];

const capitalVelocityData = [
  { month: 'Jan', actual: 3000000, target: 2500000 },
  { month: 'Feb', actual: 4200000, target: 4000000 },
  { month: 'Mar', actual: 3800000, target: 4500000 },
  { month: 'Apr', actual: 5100000, target: 5000000 },
  { month: 'May', actual: 4700000, target: 5500000 },
  { month: 'Jun', actual: 5600000, target: 6000000 },
  { month: 'Jul', actual: 0, target: 6500000, forecast: 5800000 },
  { month: 'Aug', actual: 0, target: 7000000, forecast: 6200000 },
  { month: 'Sep', actual: 0, target: 7500000, forecast: 6800000 },
  { month: 'Oct', actual: 0, target: 8000000, forecast: 7500000 },
  { month: 'Nov', actual: 0, target: 8500000, forecast: 8000000 },
  { month: 'Dec', actual: 0, target: 9000000, forecast: 8200000 }
];

const predictiveInsights = [
  {
    id: "insight1",
    title: "Increased Deal Flow Expected",
    description: "Based on historical patterns and current market conditions, expect a 15-20% increase in deal flow over the next quarter.",
    impact: 'positive' as const,
    category: 'market' as const,
    dateGenerated: "2025-04-05",
    confidence: 78
  },
  {
    id: "insight2",
    title: "Key Investor at Risk",
    description: "Midwest Opportunity Fund showing reduced engagement - recommend proactive communication strategy to maintain relationship.",
    impact: 'warning' as const,
    category: 'investor' as const,
    dateGenerated: "2025-04-04",
    confidence: 65
  },
  {
    id: "insight3",
    title: "Underperforming Geographic Region",
    description: "Charlotte market underperforming targets by 22%. Consider reallocating resources to Denver which is exceeding expectations.",
    impact: 'negative' as const,
    category: 'performance' as const,
    dateGenerated: "2025-04-03",
    confidence: 83
  },
  {
    id: "insight4",
    title: "Strategic Partnership Opportunity",
    description: "Blue Harbor Capital and Summit Ventures have complementary investment profiles. Potential co-investment opportunity with higher commitment.",
    impact: 'positive' as const,
    category: 'investor' as const,
    dateGenerated: "2025-04-02",
    confidence: 71
  }
];

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(2025, 0, 1), // Jan 1, 2025
    to: new Date(2025, 5, 30),  // Jun 30, 2025
  });
  
  const [timeframe, setTimeframe] = useState("ytd");

  return (
    <ScrollArea className="h-full w-full">
      <div className="space-y-6">
        {/* Header with filters */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Capital Raise Analytics</h3>
            <p className="text-sm text-gray-500">Detailed metrics and insights on fundraising performance</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[140px] h-9 text-xs">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="mtd">Month to Date</SelectItem>
                  <SelectItem value="qtd">Quarter to Date</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="1y">Last 12 Months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            {timeframe === 'custom' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 px-3 text-xs"
                  >
                    <CalendarIcon className="h-3.5 w-3.5 mr-2" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(dateRange.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange as any}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}
            
            <Button variant="outline" size="sm" className="h-9 px-3">
              <Filter className="h-3.5 w-3.5 mr-2" />
              <span className="text-xs">Filters</span>
            </Button>
            
            <Button variant="outline" size="sm" className="h-9 w-9 p-0">
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        {/* Export/Print Controls */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Printer className="h-3.5 w-3.5 mr-2" />
            Print Report
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Download className="h-3.5 w-3.5 mr-2" />
            Export Data
          </Button>
        </div>
        
        {/* Performance Metrics */}
        <PerformanceMetricsCard metrics={performanceMetrics} />
        
        {/* Capital Velocity Chart */}
        <CapitalVelocityChart data={capitalVelocityData} />
        
        {/* Investor Segmentation and Geographic Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InvestorSegmentationChart lps={lps} />
          <GeographicDistribution lps={lps} />
        </div>
        
        {/* Predictive Insights */}
        <PredictiveInsightsCard insights={predictiveInsights} />
      </div>
    </ScrollArea>
  );
}
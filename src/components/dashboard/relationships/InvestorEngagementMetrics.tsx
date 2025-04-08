import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LP } from '@/data/lps';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EngagementMetric {
  lpId: string;
  responseRate: number;
  meetingsAttended: number;
  communicationFrequency: number;
  investmentVelocity: number;
  overallEngagement: number;
  trend: 'up' | 'down' | 'neutral';
}

interface InvestorEngagementMetricsProps {
  metrics: EngagementMetric[];
  lps: LP[];
  title?: string;
  description?: string;
}

export function InvestorEngagementMetrics({
  metrics,
  lps,
  title = "Investor Engagement",
  description = "Key engagement metrics for top investors"
}: InvestorEngagementMetricsProps) {
  
  // Get LP name by ID
  const getLPName = (id: string): string => {
    const lp = lps.find(lp => lp.id === id);
    return lp ? lp.name : 'Unknown';
  };
  
  // Sort metrics by overall engagement score (descending)
  const sortedMetrics = [...metrics].sort((a, b) => b.overallEngagement - a.overallEngagement);
  
  // Take top 5 for display
  const topEngaged = sortedMetrics.slice(0, 5);
  
  // Prepare data for chart
  const barChartData = topEngaged.map(metric => ({
    name: getLPName(metric.lpId),
    engagement: metric.overallEngagement,
    responseRate: metric.responseRate,
    meetings: metric.meetingsAttended,
    communication: metric.communicationFrequency,
    investments: metric.investmentVelocity,
    trend: metric.trend,
    lpId: metric.lpId,
  }));
  
  // Calculate overall metrics
  const averageEngagement = metrics.reduce((sum, metric) => sum + metric.overallEngagement, 0) / metrics.length;
  const engagingInvestors = metrics.filter(m => m.overallEngagement >= 7).length;
  const disengagingInvestors = metrics.filter(m => m.overallEngagement < 5).length;
  const averageTrend = metrics.reduce((acc, metric) => {
    if (metric.trend === 'up') return acc + 1;
    if (metric.trend === 'down') return acc - 1;
    return acc;
  }, 0) / metrics.length;
  
  // Get color based on engagement score - using consistent color scheme
  const getEngagementColor = (score: number) => {
    if (score >= 8) return '#34C759'; // Green for high engagement
    if (score >= 5) return '#FFCC00'; // Yellow/amber for medium engagement
    return '#FF3B30'; // Red for low engagement
  };
  
  // Custom tooltip for the bar chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="text-sm font-medium">{data.name}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
            <div className="text-xs text-gray-600">Response Rate:</div>
            <div className="text-xs font-medium">{data.responseRate}%</div>
            
            <div className="text-xs text-gray-600">Meetings Attended:</div>
            <div className="text-xs font-medium">{data.meetings}</div>
            
            <div className="text-xs text-gray-600">Communication:</div>
            <div className="text-xs font-medium">{data.communication}/10</div>
            
            <div className="text-xs text-gray-600">Investment Velocity:</div>
            <div className="text-xs font-medium">{data.investments}/10</div>
            
            <div className="text-xs text-gray-600">Overall Score:</div>
            <div className="text-xs font-medium">{data.engagement}/10</div>
            
            <div className="text-xs text-gray-600">Trend:</div>
            <div className="flex items-center text-xs">
              {data.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : data.trend === 'down' ? (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              ) : (
                <span className="h-3 w-3 rounded-full bg-gray-300 mr-1"></span>
              )}
              {data.trend.charAt(0).toUpperCase() + data.trend.slice(1)}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-md rounded-lg overflow-hidden">
      <CardHeader className="pb-2 border-b border-gray-100 bg-white">
        <CardTitle className="text-base font-semibold text-gray-900">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Metrics Summary */}
          <div className="mb-6 md:mb-0 md:w-1/4 space-y-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Average Engagement</div>
              <div className="text-2xl font-semibold">{averageEngagement.toFixed(1)}<span className="text-sm font-normal text-gray-500">/10</span></div>
              <div className={cn(
                "flex items-center text-xs font-medium",
                averageTrend > 0 ? "text-green-600" : averageTrend < 0 ? "text-red-600" : "text-gray-500"
              )}>
                {averageTrend > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : averageTrend < 0 ? (
                  <TrendingDown className="h-3 w-3 mr-1" />
                ) : null}
                {averageTrend > 0 ? "Increasing" : averageTrend < 0 ? "Decreasing" : "Stable"}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50/80 p-3 rounded-lg border border-green-100">
                <div className="text-green-700 text-xs font-medium mb-1">Engaging</div>
                <div className="text-xl font-semibold text-green-800">{engagingInvestors}</div>
                <div className="text-xs text-green-600 mt-1">investors</div>
              </div>
              
              <div className="bg-red-50/80 p-3 rounded-lg border border-red-100">
                <div className="text-red-700 text-xs font-medium mb-1">Disengaging</div>
                <div className="text-xl font-semibold text-red-800">{disengagingInvestors}</div>
                <div className="text-xs text-red-600 mt-1">investors</div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium">Engagement Factors:</p>
              <ul className="pl-4 list-disc space-y-1">
                <li>Response rate to communications</li>
                <li>Meetings attended</li>
                <li>Communication frequency</li>
                <li>Investment velocity</li>
              </ul>
            </div>
          </div>
          
          {/* Engagement Chart */}
          <div className="md:w-3/4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                layout="vertical"
                margin={{ top: 5, right: 35, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  domain={[0, 10]} 
                  tickCount={6} 
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={120} 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="engagement" 
                  fill="#8884d8" 
                  radius={[0, 4, 4, 0]}
                  barSize={24}
                >
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getEngagementColor(entry.engagement)} />
                  ))}
                  <LabelList 
                    dataKey="engagement" 
                    position="right" 
                    formatter={(value: number) => `${value}/10`}
                    style={{ fill: '#666', fontSize: '11px', fontWeight: 500 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Engagement Details */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <h4 className="text-sm font-medium mb-3">Engagement Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Highest Engagement */}
            <div className="p-3 rounded-lg border border-green-100 bg-green-50/80 shadow-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#34C759] mr-2"></div>
                <h5 className="text-xs font-medium text-green-800">Highest Engagement</h5>
              </div>
              <div className="mt-1 text-sm font-semibold text-green-900">
                {topEngaged.length > 0 ? getLPName(topEngaged[0].lpId) : 'N/A'}
              </div>
              <div className="mt-1 text-xs text-green-700">
                Score: {topEngaged.length > 0 ? `${topEngaged[0].overallEngagement}/10` : 'N/A'}
                {topEngaged.length > 0 && topEngaged[0].trend === 'up' && 
                  <span className="inline-flex items-center ml-2">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> Increasing
                  </span>
                }
              </div>
            </div>
            
            {/* Needs Attention */}
            <div className="p-3 rounded-lg border border-red-100 bg-red-50/80 shadow-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#FF3B30] mr-2"></div>
                <h5 className="text-xs font-medium text-red-800">Needs Attention</h5>
              </div>
              <div className="mt-1 text-sm font-semibold text-red-900">
                {sortedMetrics.length > 0 ? getLPName(sortedMetrics[sortedMetrics.length - 1].lpId) : 'N/A'}
              </div>
              <div className="mt-1 text-xs text-red-700">
                Score: {sortedMetrics.length > 0 ? `${sortedMetrics[sortedMetrics.length - 1].overallEngagement}/10` : 'N/A'}
                {sortedMetrics.length > 0 && sortedMetrics[sortedMetrics.length - 1].trend === 'down' && 
                  <span className="inline-flex items-center ml-2">
                    <TrendingDown className="h-3 w-3 mr-0.5" /> Decreasing
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import React from 'react';
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
  ReferenceLine
} from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RelationshipTrendProps } from './RelationshipTrend.types';
import { useRelationshipTrend } from './useRelationshipTrend';

export function RelationshipTrend({ lpId, className }: RelationshipTrendProps) {
  const { trendData, metrics } = useRelationshipTrend(lpId);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border shadow-sm rounded-md text-xs">
          <p className="font-semibold">{data.formattedDate}</p>
          <p className="text-muted-foreground">Strength: <span className="font-medium">{data.strength}/10</span></p>
          {data.event && (
            <p className="text-muted-foreground">Event: <span className="font-medium">{data.event}</span></p>
          )}
        </div>
      );
    }
  
    return null;
  };
  
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm">Relationship Strength Trend</CardTitle>
          <Badge 
            variant={
              metrics.trend === 'improving' ? 'default' : 
              metrics.trend === 'declining' ? 'destructive' : 
              'outline'
            }
            className="text-xs"
          >
            {metrics.trend === 'improving' && (
              <ArrowUpIcon className="mr-1 h-3 w-3" />
            )}
            {metrics.trend === 'declining' && (
              <ArrowDownIcon className="mr-1 h-3 w-3" />
            )}
            {metrics.trend === 'stable' && (
              <MinusIcon className="mr-1 h-3 w-3" />
            )}
            {metrics.trend.charAt(0).toUpperCase() + metrics.trend.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {trendData.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Current</p>
                <p className="text-xl font-bold">{metrics.currentStrength}/10</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Average</p>
                <p className="text-xl font-bold">{metrics.averageStrength}/10</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Change (Last)</p>
                <p className={cn(
                  "text-xl font-bold",
                  metrics.changeLastMonth > 0 ? "text-green-600" : 
                  metrics.changeLastMonth < 0 ? "text-red-600" : ""
                )}>
                  {metrics.changeLastMonth > 0 ? `+${metrics.changeLastMonth}` : metrics.changeLastMonth}
                </p>
              </div>
            </div>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="formattedDate"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={5} stroke="#7A8D79" strokeDasharray="3 3" />
                  <Line
                    type="monotone"
                    dataKey="strength"
                    stroke="#275E91"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      strokeWidth: 1,
                      fill: "#275E91",
                      stroke: '#275E91'
                    }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-2">
              <h4 className="text-xs font-medium mb-1">Recent Activity</h4>
              <div className="space-y-2">
                {trendData.slice().reverse().slice(0, 3).map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CalendarIcon size={12} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{point.formattedDate}</p>
                      {point.event ? (
                        <p className="text-xs text-muted-foreground">{point.event}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Regular check-in</p>
                      )}
                    </div>
                    <div className="ml-auto">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          point.strength >= 8 ? "border-green-500 text-green-600" : 
                          point.strength >= 5 ? "border-yellow-500 text-yellow-600" : 
                          "border-red-500 text-red-600"
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
            <p className="text-sm text-muted-foreground">No relationship history available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

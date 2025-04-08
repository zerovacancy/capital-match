import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface CapitalVelocityDataPoint {
  month: string;
  actual: number;
  target: number;
  forecast?: number;
}

interface CapitalVelocityChartProps {
  data: CapitalVelocityDataPoint[];
  title?: string;
  description?: string;
}

export function CapitalVelocityChart({
  data,
  title = "Capital Velocity",
  description = "Monthly capital raise compared to targets and forecasts"
}: CapitalVelocityChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="text-sm font-medium mb-1">{label}</p>
          <div className="space-y-1">
            <p className="text-xs">
              <span className="inline-block w-3 h-3 bg-[#275E91] rounded-full mr-2"></span>
              Actual: {formatCurrency(payload[0].value)}
            </p>
            <p className="text-xs">
              <span className="inline-block w-3 h-3 bg-[#8EA8C1] rounded-full mr-2"></span>
              Target: {formatCurrency(payload[1].value)}
            </p>
            {payload[2] && (
              <p className="text-xs">
                <span className="inline-block w-3 h-3 bg-[#F5A742] rounded-full mr-2"></span>
                Forecast: {formatCurrency(payload[2].value)}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate cumulative totals for reference line
  const currentTotal = data.reduce((sum, item) => sum + item.actual, 0);
  const targetTotal = data.reduce((sum, item) => sum + item.target, 0);
  
  // Get the max value for Y-axis domain
  const maxValue = Math.max(
    ...data.map(item => Math.max(item.actual, item.target, item.forecast || 0))
  );

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <div className="flex justify-between mb-4">
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Current Total</div>
              <div className="text-lg font-semibold text-[#275E91]">{formatCurrency(currentTotal)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Target Total</div>
              <div className="text-lg font-semibold text-[#8EA8C1]">{formatCurrency(targetTotal)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Progress</div>
              <div className="text-lg font-semibold text-gray-800">
                {((currentTotal / targetTotal) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatCurrency}
                  domain={[0, maxValue * 1.1]}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual"
                  stroke="#275E91" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  name="Target"
                  stroke="#8EA8C1" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3 }}
                />
                {data.some(item => item.forecast !== undefined) && (
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    name="Forecast"
                    stroke="#F5A742" 
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={{ r: 3 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
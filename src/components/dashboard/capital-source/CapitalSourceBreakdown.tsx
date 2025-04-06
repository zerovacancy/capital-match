import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { CapitalSourceBreakdownProps } from './CapitalSourceBreakdown.types';

export const CapitalSourceBreakdown: React.FC<CapitalSourceBreakdownProps> = ({
  data,
  className
}) => {
  // Calculate total amount
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  
  // Generate percentage data for the chart
  const chartData = data.map(item => ({
    name: item.source,
    value: item.amount,
    percentage: Math.round((item.amount / totalAmount) * 100),
    status: item.status
  }));
  
  // Use LG Group color palette - use variations of primary, secondary, and other brand colors
  const COLORS = [
    '#275E91', // Primary - accent blue
    '#7A8D79', // Secondary - muted green
    '#3F7CAC', // Lighter variation of primary blue
    '#95A792', // Lighter variation of secondary green
    '#5D89A8', // Mix of primary and secondary
    '#607973', // Darker variation of secondary
  ];
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">${data.value.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Status: {data.status}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Capital Source Breakdown</CardTitle>
        <p className="text-sm text-gray-500">Commitment status by LP</p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percentage }) => `${percentage}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                formatter={(value) => <span style={{ color: '#1C1C1C', fontSize: '14px' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

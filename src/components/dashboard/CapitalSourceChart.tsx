import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { capitalSourceBreakdown } from '@/data';
import { formatCurrency } from '@/lib/utils';

export function CapitalSourceChart() {
  const COLORS = ['#10b981', '#fbbf24', '#60a5fa', '#a78bfa', '#f472b6'];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border p-2 text-sm shadow-sm">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="flex items-center gap-1">
            <span>Amount:</span>
            <span className="font-medium">{formatCurrency(payload[0].value)}</span>
          </p>
          <p className="flex items-center gap-1">
            <span>Status:</span>
            <span className="font-medium">{payload[0].payload.status}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center gap-1">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Capital Source Breakdown</CardTitle>
        <CardDescription>Commitment status by LP</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={capitalSourceBreakdown}
              dataKey="amount"
              nameKey="source"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {capitalSourceBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
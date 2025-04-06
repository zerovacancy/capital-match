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
  ReferenceLine
} from 'recharts';
import { monthlyProgress } from '@/data';
import { formatCurrency } from '@/lib/utils';

export function MonthlyProgressChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border p-2 text-sm shadow-sm">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${
                entry.dataKey === "actual" ? "bg-primary" : 
                entry.dataKey === "projected" ? "bg-blue-400" : "bg-gray-400"
              }`}></span>
              <span className="capitalize">{entry.dataKey}:</span>
              <span className="font-medium">{formatCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Monthly Capital Raise Progress</CardTitle>
        <CardDescription>Target vs. actual monthly capital velocity</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyProgress}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000)}k`}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine y={850000} stroke="#888" strokeDasharray="3 3" />
            <Bar dataKey="target" fill="#d1d5db" name="Target" />
            <Bar dataKey="actual" fill="#9333ea" name="Actual" />
            <Bar dataKey="projected" fill="#60a5fa" name="Projected" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
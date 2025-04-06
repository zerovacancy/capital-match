
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { CreditCardIcon } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { getInvestmentHistory } from '@/data/relationshipHistory';

interface InvestmentHistoryProps {
  lpId: string;
  className?: string;
}

export function InvestmentHistory({ lpId, className }: InvestmentHistoryProps) {
  const investmentHistory = getInvestmentHistory(lpId);
  
  // Format the data for the chart
  const chartData = investmentHistory.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    }),
    formattedAmount: formatCurrency(item.amount)
  }));
  
  // Calculate total investment amount
  const totalInvestment = investmentHistory.reduce((sum, item) => sum + item.amount, 0);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border shadow-sm rounded-md text-xs">
          <p className="font-semibold">{data.formattedDate}</p>
          <p className="text-muted-foreground">Deal: <span className="font-medium">{data.deal}</span></p>
          <p className="text-muted-foreground">Amount: <span className="font-medium">{data.formattedAmount}</span></p>
        </div>
      );
    }
  
    return null;
  };
  
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm">Investment History</CardTitle>
          <Badge variant="outline" className="text-xs font-normal">
            {chartData.length} Investments
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <>
            <div className="mb-4">
              <p className="text-xs text-muted-foreground">Total Investment</p>
              <p className="text-xl font-bold">{formatCurrency(totalInvestment)}</p>
            </div>
            
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="formattedDate"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => 
                      value >= 1000000 
                        ? `$${(value / 1000000).toFixed(0)}M` 
                        : value >= 1000 
                        ? `$${(value / 1000).toFixed(0)}K` 
                        : `$${value}`
                    }
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="amount" 
                    fill="#7A8D79"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3">
              <h4 className="text-xs font-medium mb-1">Recent Investments</h4>
              <div className="space-y-2">
                {chartData.slice().reverse().map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CreditCardIcon size={12} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{item.formattedDate}</p>
                      <p className="text-xs text-muted-foreground">{item.deal}</p>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="outline" className="text-xs font-mono">
                        {formatCurrency(item.amount, { notation: 'compact' })}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">No investment history available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

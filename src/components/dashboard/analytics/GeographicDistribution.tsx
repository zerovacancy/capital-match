import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LP } from '@/data/lps';

interface LocationData {
  name: string;
  value: number;
  count: number;
}

interface GeographicDistributionProps {
  lps: LP[];
  title?: string;
  description?: string;
}

export function GeographicDistribution({
  lps,
  title = "Geographic Distribution",
  description = "Capital allocation by geographic region"
}: GeographicDistributionProps) {
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(value);
  };

  // Process the data to get geographic distribution
  const getGeographicData = (): LocationData[] => {
    const locationMap: Record<string, { value: number, count: number }> = {};
    
    // Process primary locations (weighted more heavily)
    lps.forEach(lp => {
      const primaryWeight = 0.7; // 70% weight to primary locations
      const secondaryWeight = 0.3; // 30% weight to secondary locations
      const primaryAllocation = lp.investmentParameters.maxInvestment * primaryWeight;
      const secondaryAllocation = lp.investmentParameters.maxInvestment * secondaryWeight;
      
      // Distribute primary allocation
      lp.geographicPreferences.primary.forEach(location => {
        if (!locationMap[location]) {
          locationMap[location] = { value: 0, count: 0 };
        }
        locationMap[location].value += primaryAllocation / lp.geographicPreferences.primary.length;
        locationMap[location].count += 1;
      });
      
      // Distribute secondary allocation
      lp.geographicPreferences.secondary.forEach(location => {
        if (!locationMap[location]) {
          locationMap[location] = { value: 0, count: 0 };
        }
        locationMap[location].value += secondaryAllocation / lp.geographicPreferences.secondary.length;
        // Don't increment count for secondary preferences
      });
    });
    
    // Convert to array and sort by value
    return Object.entries(locationMap)
      .map(([name, data]) => ({
        name,
        value: data.value,
        count: data.count
      }))
      .sort((a, b) => b.value - a.value);
  };

  const data = getGeographicData();
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-xs">Capital: {formatCurrency(payload[0].value)}</p>
          <p className="text-xs">Primary for: {payload[0].payload.count} investors</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 10, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                tickFormatter={formatCurrency}
                domain={[0, 'dataMax']}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                tick={{ fontSize: 12 }}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="#275E91" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="text-xs text-gray-500 mb-1">Top Location</div>
            <div className="text-lg font-semibold">{data[0]?.name || 'N/A'}</div>
            <div className="text-xs text-gray-500 mt-1">
              {data[0] ? formatCurrency(data[0].value) : '-'} ({data[0]?.count || 0} investors)
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="text-xs text-gray-500 mb-1">Most Diverse</div>
            <div className="text-lg font-semibold">
              {lps.reduce((max, lp) => 
                Math.max(max, lp.geographicPreferences.primary.length + lp.geographicPreferences.secondary.length), 0)
              } regions
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Maximum geographic diversity from a single investor
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
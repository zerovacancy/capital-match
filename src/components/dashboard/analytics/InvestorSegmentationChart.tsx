import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { LP } from '@/data/lps';

interface SegmentationData {
  name: string;
  value: number;
  color: string;
  count: number;
}

interface InvestorSegmentationChartProps {
  lps: LP[];
  title?: string;
  description?: string;
}

export function InvestorSegmentationChart({
  lps,
  title = "Investor Segmentation",
  description = "Breakdown of investors by various metrics"
}: InvestorSegmentationChartProps) {
  const [segmentationType, setSegmentationType] = useState<'tier' | 'riskTolerance' | 'geographicPreference'>('tier');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(value);
  };

  const getSegmentationData = (): SegmentationData[] => {
    switch (segmentationType) {
      case 'tier': {
        const tierColors = {
          'Tier 1': '#275E91',
          'Tier 2': '#5A89B0',
          'Tier 3': '#8EA8C1'
        };
        
        const tierData: Record<string, { value: number, count: number }> = {
          'Tier 1': { value: 0, count: 0 },
          'Tier 2': { value: 0, count: 0 },
          'Tier 3': { value: 0, count: 0 }
        };
        
        lps.forEach(lp => {
          // Assuming investmentParameters.maxInvestment represents commitment size
          tierData[lp.tier].value += lp.investmentParameters.maxInvestment;
          tierData[lp.tier].count += 1;
        });
        
        return Object.entries(tierData).map(([tier, data]) => ({
          name: tier,
          value: data.value,
          count: data.count,
          color: tierColors[tier as keyof typeof tierColors]
        }));
      }
      
      case 'riskTolerance': {
        const riskColors = {
          'Conservative': '#4CAF50',
          'Moderate': '#FFC107',
          'Aggressive': '#F44336'
        };
        
        const riskData: Record<string, { value: number, count: number }> = {
          'Conservative': { value: 0, count: 0 },
          'Moderate': { value: 0, count: 0 },
          'Aggressive': { value: 0, count: 0 }
        };
        
        lps.forEach(lp => {
          riskData[lp.riskTolerance].value += lp.investmentParameters.maxInvestment;
          riskData[lp.riskTolerance].count += 1;
        });
        
        return Object.entries(riskData).map(([risk, data]) => ({
          name: risk,
          value: data.value,
          count: data.count,
          color: riskColors[risk as keyof typeof riskColors]
        }));
      }
      
      case 'geographicPreference': {
        // Create a map to track preferences
        const geoPreferences: Record<string, { value: number, count: number }> = {};
        
        // Color palette for geographic regions
        const geoColors = [
          '#1E88E5', '#5E35B1', '#43A047', '#FB8C00', 
          '#E53935', '#8E24AA', '#00ACC1', '#3949AB'
        ];
        
        // Count each primary geographic preference
        lps.forEach(lp => {
          lp.geographicPreferences.primary.forEach(location => {
            if (!geoPreferences[location]) {
              geoPreferences[location] = { value: 0, count: 0 };
            }
            geoPreferences[location].value += lp.investmentParameters.maxInvestment / lp.geographicPreferences.primary.length;
            geoPreferences[location].count += 1;
          });
        });
        
        // Convert to array and sort by value
        return Object.entries(geoPreferences)
          .map(([location, data], index) => ({
            name: location,
            value: data.value,
            count: data.count,
            color: geoColors[index % geoColors.length]
          }))
          .sort((a, b) => b.value - a.value);
      }
      
      default:
        return [];
    }
  };

  const data = getSegmentationData();
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="text-sm font-medium mb-1">{item.name}</p>
          <p className="text-xs">Capital: {formatCurrency(item.value)}</p>
          <p className="text-xs">Investors: {item.count}</p>
          <p className="text-xs">
            Avg: {formatCurrency(item.value / item.count)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Tabs value={segmentationType} onValueChange={(v) => setSegmentationType(v as any)}>
            <TabsList className="grid grid-cols-3 h-8">
              <TabsTrigger value="tier" className="text-xs py-1">By Tier</TabsTrigger>
              <TabsTrigger value="riskTolerance" className="text-xs py-1">By Risk</TabsTrigger>
              <TabsTrigger value="geographicPreference" className="text-xs py-1">By Location</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                formatter={(value) => <span className="text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary metrics */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-xs text-gray-500">Total Investors</div>
            <div className="text-lg font-semibold">{lps.length}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Total Capital</div>
            <div className="text-lg font-semibold">
              {formatCurrency(lps.reduce((sum, lp) => sum + lp.investmentParameters.maxInvestment, 0))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Avg. Investment</div>
            <div className="text-lg font-semibold">
              {formatCurrency(
                lps.reduce((sum, lp) => sum + lp.investmentParameters.maxInvestment, 0) / lps.length
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
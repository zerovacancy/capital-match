import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LP } from '@/data/lps';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface RelationshipScoreSummary {
  name: string;
  count: number;
  color: string;
}

interface RelationshipHealthScoreProps {
  lps: LP[];
  title?: string;
  description?: string;
}

export function RelationshipHealthScore({
  lps,
  title = "Relationship Health",
  description = "Overall health of investor relationships"
}: RelationshipHealthScoreProps) {
  
  // Group LPs by relationship strength
  const getRelationshipGroups = (): RelationshipScoreSummary[] => {
    const groups: Record<string, number> = {
      "Strong (8-10)": 0,
      "Moderate (5-7)": 0,
      "Weak (1-4)": 0
    };
    
    lps.forEach(lp => {
      if (lp.relationshipStrength >= 8) {
        groups["Strong (8-10)"]++;
      } else if (lp.relationshipStrength >= 5) {
        groups["Moderate (5-7)"]++;
      } else {
        groups["Weak (1-4)"]++;
      }
    });
    
    // Use primary colors consistent with the rest of the application
    return [
      { name: "Strong (8-10)", count: groups["Strong (8-10)"], color: "#34C759" },
      { name: "Moderate (5-7)", count: groups["Moderate (5-7)"], color: "#FFCC00" },
      { name: "Weak (1-4)", count: groups["Weak (1-4)"], color: "#FF3B30" }
    ];
  };
  
  const relationshipGroups = getRelationshipGroups();
  
  // Calculate the total, average, and rating distribution
  const totalRelationships = lps.length;
  const averageScore = lps.reduce((sum, lp) => sum + lp.relationshipStrength, 0) / totalRelationships;
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-xs">{data.count} investors</p>
          <p className="text-xs">{((data.count / totalRelationships) * 100).toFixed(1)}% of total</p>
        </div>
      );
    }
    return null;
  };
  
  // Custom label renderer to fix positioning
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    // Only show labels for segments with data
    if (relationshipGroups[index].count === 0) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  // Custom legend format
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap justify-center gap-4 pt-2">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-sm mr-1" style={{ backgroundColor: entry.color }}></div>
            <span className="text-gray-700">{entry.value}: {relationshipGroups[index].count}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="shadow-md rounded-lg overflow-hidden">
      <CardHeader className="pb-2 border-b border-gray-100 bg-white">
        <CardTitle className="text-base font-semibold text-gray-900">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Metrics */}
          <div className="space-y-6 md:w-1/3">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Average Score</div>
              <div className="text-3xl font-bold">
                {averageScore.toFixed(1)}
                <span className="text-base font-normal text-gray-500">/10</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {relationshipGroups.map((group) => (
                <div key={group.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{group.name}</span>
                    <span>{group.count} ({((group.count / totalRelationships) * 100).toFixed(0)}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${(group.count / totalRelationships) * 100}%`,
                        backgroundColor: group.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-[220px] md:w-2/3 mt-4 md:mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={relationshipGroups}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {relationshipGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top Relationships Summary */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <h4 className="text-sm font-medium mb-3">Top Relationship Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Strength */}
            <div className="p-3 rounded-lg border border-green-100 bg-green-50/80 shadow-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#34C759] mr-2"></div>
                <h5 className="text-xs font-medium text-green-800">Strongest Relationship</h5>
              </div>
              <div className="mt-1 text-sm font-semibold text-green-900">
                {lps.sort((a, b) => b.relationshipStrength - a.relationshipStrength)[0]?.name || 'N/A'}
              </div>
              <div className="mt-1 text-xs text-green-700">
                Score: {lps.sort((a, b) => b.relationshipStrength - a.relationshipStrength)[0]?.relationshipStrength || 'N/A'}/10
              </div>
            </div>
            
            {/* Needs Attention */}
            <div className="p-3 rounded-lg border border-red-100 bg-red-50/80 shadow-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#FF3B30] mr-2"></div>
                <h5 className="text-xs font-medium text-red-800">Needs Attention</h5>
              </div>
              <div className="mt-1 text-sm font-semibold text-red-900">
                {lps.sort((a, b) => a.relationshipStrength - b.relationshipStrength)[0]?.name || 'N/A'}
              </div>
              <div className="mt-1 text-xs text-red-700">
                Score: {lps.sort((a, b) => a.relationshipStrength - b.relationshipStrength)[0]?.relationshipStrength || 'N/A'}/10
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
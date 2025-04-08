import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Insight {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral' | 'warning';
  category: 'market' | 'investor' | 'deal' | 'performance';
  dateGenerated: string;
  confidence: number; // 0-100
}

interface PredictiveInsightsCardProps {
  insights: Insight[];
  title?: string;
  description?: string;
}

export function PredictiveInsightsCard({
  insights,
  title = "Predictive Insights",
  description = "AI-driven analysis and predictions"
}: PredictiveInsightsCardProps) {
  
  const getImpactIcon = (impact: Insight['impact']) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'neutral':
      default:
        return <Lightbulb className="h-4 w-4 text-blue-500" />;
    }
  };
  
  const getImpactColor = (impact: Insight['impact']) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'negative':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'neutral':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };
  
  const getCategoryLabel = (category: Insight['category']) => {
    switch (category) {
      case 'market':
        return 'Market';
      case 'investor':
        return 'Investor';
      case 'deal':
        return 'Deal';
      case 'performance':
        return 'Performance';
      default:
        return category;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Badge className="bg-[#F8F5F0] text-[#275E91] hover:bg-[#F0EAE0]">
            AI-Generated
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div 
              key={insight.id}
              className={cn(
                "p-3 rounded-lg border",
                getImpactColor(insight.impact)
              )}
            >
              <div className="flex items-start">
                <div className="mt-0.5 mr-3">
                  {getImpactIcon(insight.impact)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{insight.title}</h4>
                    <Badge variant="outline" className="text-xs h-5 px-1.5">
                      {getCategoryLabel(insight.category)}
                    </Badge>
                  </div>
                  <p className="text-xs mt-1 leading-snug">{insight.description}</p>
                  <div className="flex justify-between items-center mt-2 text-2xs text-gray-500">
                    <div>
                      Generated: {new Date(insight.dateGenerated).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <span>Confidence:</span>
                      <div className="ml-1 w-16 h-1.5 bg-gray-200 rounded overflow-hidden">
                        <div 
                          className={cn(
                            "h-full",
                            insight.confidence >= 70 ? "bg-green-500" :
                            insight.confidence >= 40 ? "bg-amber-500" : "bg-red-500"
                          )}
                          style={{ width: `${insight.confidence}%` }}
                        ></div>
                      </div>
                      <span className="ml-1">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button className="w-full mt-2 rounded-md border border-gray-200 bg-white py-2 text-xs font-medium text-[#275E91] hover:bg-[#F8F5F0] flex items-center justify-center">
            View all insights
            <ChevronRight className="h-3 w-3 ml-1" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
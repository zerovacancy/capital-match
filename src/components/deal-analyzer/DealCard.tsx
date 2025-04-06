import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Deal } from '@/data';
import { formatCurrency } from '@/lib/utils';

interface DealCardProps {
  deal: Deal;
  onClick?: () => void;
  selected?: boolean;
}

export function DealCard({ deal, onClick, selected = false }: DealCardProps) {
  const marketColor = () => {
    if (deal.market === 'Core') return 'bg-blue-100 text-blue-800';
    if (deal.market === 'Strategic Growth') return 'bg-green-100 text-green-800';
    return 'bg-amber-100 text-amber-800';
  };
  
  const typeColor = () => {
    if (deal.type === 'Build-to-Rent') return 'bg-purple-100 text-purple-800';
    if (deal.type === 'Mid-Rise Multifamily') return 'bg-indigo-100 text-indigo-800';
    return 'bg-sky-100 text-sky-800';
  };
  
  const alignmentColor = () => {
    if (deal.strategicAlignment >= 8) return "bg-green-500";
    if (deal.strategicAlignment >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all ${selected ? 'border-2 border-primary' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{deal.name}</CardTitle>
            <CardDescription>{deal.location}</CardDescription>
          </div>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${alignmentColor()}`}
            title="Strategic Alignment"
          >
            {deal.strategicAlignment}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            <Badge className={marketColor()}>{deal.market}</Badge>
            <Badge className={typeColor()}>{deal.type}</Badge>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-1">Financial Metrics</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">IRR:</span>
                <span className="font-medium ml-1">{deal.financialMetrics.projectedIRR}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Equity Multiple:</span>
                <span className="font-medium ml-1">{deal.financialMetrics.projectedEM}x</span>
              </div>
              <div>
                <span className="text-muted-foreground">Cash on Cash:</span>
                <span className="font-medium ml-1">{deal.financialMetrics.cashOnCash}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Target Close:</span>
                <span className="font-medium ml-1">{new Date(deal.financialMetrics.targetClose).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-1">Capital Requirements</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Total Investment:</span>
                <span className="font-medium ml-1">{formatCurrency(deal.capitalRequirements.totalInvestment)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Equity Required:</span>
                <span className="font-medium ml-1">{formatCurrency(deal.capitalRequirements.equityRequired)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Min Investment:</span>
                <span className="font-medium ml-1">{formatCurrency(deal.capitalRequirements.minInvestment)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Target LPs:</span>
                <span className="font-medium ml-1">{deal.capitalRequirements.targetLPs}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
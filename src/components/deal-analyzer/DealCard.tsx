
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
    if (deal.market === 'Core') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (deal.market === 'Strategic Growth') return 'bg-green-100 text-green-800 border-green-200';
    return 'bg-amber-100 text-amber-800 border-amber-200';
  };
  
  const typeColor = () => {
    if (deal.type === 'Build-to-Rent') return 'bg-purple-100 text-purple-800 border-purple-200';
    if (deal.type === 'Mid-Rise Multifamily') return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    return 'bg-sky-100 text-sky-800 border-sky-200';
  };
  
  const alignmentColor = () => {
    if (deal.strategicAlignment >= 8) return "bg-green-500";
    if (deal.strategicAlignment >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-all border-lg-border/60 shadow-md ${
        selected ? 'border-2 border-primary bg-white' : 'card-bg-tertiary'
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2 px-3 pt-3 border-b border-lg-border/30">
        <div className="flex justify-between items-start gap-2">
          <div>
            <CardTitle className="text-lg-blue text-base">{deal.name}</CardTitle>
            <CardDescription className="text-lg-text text-xs mt-0.5">{deal.location}</CardDescription>
          </div>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${alignmentColor()}`}
            title="Strategic Alignment Score"
          >
            {deal.strategicAlignment}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        {/* Investment Amount - Prominently Displayed */}
        <div className="bg-lg-highlight/10 rounded-md p-2 flex items-center justify-between">
          <div className="text-lg-blue font-bold text-base">
            {formatCurrency(deal.capitalRequirements.totalInvestment)}
          </div>
          <div className="text-lg-text text-xs ml-2 px-1.5 py-0.5 bg-lg-blue/10 rounded">Total Investment</div>
        </div>
        
        {/* Tags with uniform spacing */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className={`px-2 py-0.5 text-xs font-medium ${marketColor()}`}>
            {deal.market}
          </Badge>
          <Badge variant="outline" className={`px-2 py-0.5 text-xs font-medium ${typeColor()}`}>
            {deal.type}
          </Badge>
        </div>
        
        {/* Financial Metrics - Reduced vertical spacing */}
        <div>
          <h4 className="text-xs font-semibold text-lg-blue mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-lg-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Financial Metrics
          </h4>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm bg-lg-background rounded-md p-2 border border-lg-border/30 shadow-sm">
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">IRR</span>
              <span className="font-semibold text-lg-blue text-xs">{deal.financialMetrics.projectedIRR}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Equity Multiple</span>
              <span className="font-semibold text-lg-blue text-xs">{deal.financialMetrics.projectedEM}x</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Cash on Cash</span>
              <span className="font-semibold text-lg-blue text-xs">{deal.financialMetrics.cashOnCash}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Target Close</span>
              <span className="font-semibold text-lg-blue text-xs">{new Date(deal.financialMetrics.targetClose).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
        
        {/* Capital Requirements - Reduced vertical spacing */}
        <div>
          <h4 className="text-xs font-semibold text-lg-blue mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-lg-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Capital Requirements
          </h4>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm bg-lg-background rounded-md p-2 border border-lg-border/30 shadow-sm">
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Equity Required</span>
              <span className="font-semibold text-lg-blue text-xs">{formatCurrency(deal.capitalRequirements.equityRequired)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Min Investment</span>
              <span className="font-semibold text-lg-blue text-xs">{formatCurrency(deal.capitalRequirements.minInvestment)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Target LPs</span>
              <span className="font-semibold text-lg-blue text-xs">{deal.capitalRequirements.targetLPs}</span>
            </div>
            {/* View Details indicator with reduced size */}
            <div className="flex items-end justify-end text-lg-blue">
              <span className="text-[10px] font-medium flex items-center bg-lg-highlight/10 px-1.5 py-0.5 rounded hover:bg-lg-highlight/20">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

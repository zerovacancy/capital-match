
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LP } from '@/data';
import { formatCurrency } from '@/lib/utils';

interface LPProfileCardProps {
  lp: LP;
  onClick?: () => void;
  selected?: boolean;
}

export function LPProfileCard({ lp, onClick, selected = false }: LPProfileCardProps) {
  const relationshipColor = () => {
    if (lp.relationshipStrength >= 8) return "bg-lg-success";
    if (lp.relationshipStrength >= 5) return "bg-lg-warning";
    return "bg-lg-error";
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-all border-lg-border/60 shadow-md ${
        selected ? 'border-2 border-lg-blue' : ''
      } card-bg-primary`}
      onClick={onClick}
    >
      <CardHeader className="py-2 px-3 border-b border-lg-border/30">
        <div className="flex justify-between items-start gap-2">
          <div>
            <CardTitle className="text-lg-blue text-base">{lp.name}</CardTitle>
            <CardDescription className="text-lg-text text-xs mt-0.5">{lp.tier}</CardDescription>
          </div>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${relationshipColor()}`}
            title="Relationship Strength Score"
          >
            {lp.relationshipStrength}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        <div>
          <h4 className="text-xs font-semibold text-lg-blue mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-lg-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Geographic Preferences
          </h4>
          <div className="flex flex-wrap gap-1">
            {lp.geographicPreferences.primary.map(location => (
              <Badge key={location} variant="outline" className="bg-lg-blue/10 text-lg-blue border-lg-blue/20 px-2 py-0.5 text-xs font-medium">{location}</Badge>
            ))}
            {lp.geographicPreferences.secondary.map(location => (
              <Badge key={location} variant="outline" className="bg-transparent text-lg-text border-lg-highlight/30 px-2 py-0.5 text-xs">{location}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-semibold text-lg-blue mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-lg-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Product Preferences
          </h4>
          <div className="flex flex-wrap gap-1">
            {lp.productPreferences.primary.map(product => (
              <Badge key={product} variant="outline" className="bg-lg-success/10 text-lg-success border-lg-success/20 px-2 py-0.5 text-xs font-medium">{product}</Badge>
            ))}
            {lp.productPreferences.secondary.map(product => (
              <Badge key={product} variant="outline" className="bg-transparent text-lg-text border-lg-highlight/30 px-2 py-0.5 text-xs">{product}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-semibold text-lg-blue mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-lg-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Investment Parameters
          </h4>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm bg-lg-background rounded-md p-2 border border-lg-border/30 shadow-sm">
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Target IRR</span>
              <span className="font-semibold text-lg-blue text-xs">{lp.investmentParameters.targetIRR}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Equity Multiple</span>
              <span className="font-semibold text-lg-blue text-xs">{lp.investmentParameters.targetEM}x</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Min Investment</span>
              <span className="font-semibold text-lg-blue text-xs">{formatCurrency(lp.investmentParameters.minInvestment)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Max Investment</span>
              <span className="font-semibold text-lg-blue text-xs">{formatCurrency(lp.investmentParameters.maxInvestment)}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-semibold text-lg-blue mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-lg-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Contact Info
          </h4>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm bg-lg-background rounded-md p-2 border border-lg-border/30 shadow-sm">
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Preferred Method</span>
              <span className="font-semibold text-lg-blue text-xs">{lp.preferredContact}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg-text text-[10px]">Frequency</span>
              <span className="font-semibold text-lg-blue text-xs">{lp.contactFrequency}</span>
            </div>
            <div className="flex flex-col col-span-2">
              <span className="text-lg-text text-[10px]">Last Contact</span>
              <span className="font-semibold text-lg-blue text-xs">{new Date(lp.lastContact).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

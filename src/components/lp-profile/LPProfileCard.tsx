
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
    if (lp.relationshipStrength >= 8) return "bg-green-500";
    if (lp.relationshipStrength >= 5) return "bg-yellow-500";
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
            <CardTitle>{lp.name}</CardTitle>
            <CardDescription>{lp.tier}</CardDescription>
          </div>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${relationshipColor()}`}
            title="Relationship Strength"
          >
            {lp.relationshipStrength}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-1">Geographic Preferences</h4>
            <div className="flex flex-wrap gap-1">
              {lp.geographicPreferences.primary.map(location => (
                <Badge key={location} variant="default">{location}</Badge>
              ))}
              {lp.geographicPreferences.secondary.map(location => (
                <Badge key={location} variant="outline">{location}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-1">Product Preferences</h4>
            <div className="flex flex-wrap gap-1">
              {lp.productPreferences.primary.map(product => (
                <Badge key={product} variant="default">{product}</Badge>
              ))}
              {lp.productPreferences.secondary.map(product => (
                <Badge key={product} variant="outline">{product}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-1">Investment Parameters</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Target IRR:</span>
                <span className="font-medium ml-1">{lp.investmentParameters.targetIRR}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Equity Multiple:</span>
                <span className="font-medium ml-1">{lp.investmentParameters.targetEM}x</span>
              </div>
              <div>
                <span className="text-muted-foreground">Min Investment:</span>
                <span className="font-medium ml-1">{formatCurrency(lp.investmentParameters.minInvestment)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Max Investment:</span>
                <span className="font-medium ml-1">{formatCurrency(lp.investmentParameters.maxInvestment)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Investment Horizon:</span>
                <span className="font-medium ml-1">{lp.investmentParameters.investmentHorizon} years</span>
              </div>
              <div>
                <span className="text-muted-foreground">Risk Profile:</span>
                <span className="font-medium ml-1">{lp.riskTolerance}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-1">Communication</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Preferred Contact:</span>
                <span className="font-medium ml-1">{lp.preferredContact}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Contact Frequency:</span>
                <span className="font-medium ml-1">{lp.contactFrequency}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Contact:</span>
                <span className="font-medium ml-1">{new Date(lp.lastContact).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

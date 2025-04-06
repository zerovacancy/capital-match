import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Deal, deals, marketMetrics } from '@/data';
import { MarketComparisonChart } from './MarketComparisonChart';

export function DealMarketAnalyzer() {
  const [selectedDealId, setSelectedDealId] = useState<string>(deals[0].id);
  
  // Find the selected deal
  const selectedDeal = deals.find(deal => deal.id === selectedDealId) || deals[0];
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <CardTitle>Deal Market Analyzer</CardTitle>
            <CardDescription>
              Compare deals against market benchmarks
            </CardDescription>
          </div>
          <div className="w-full max-w-xs">
            <Select
              value={selectedDealId}
              onValueChange={setSelectedDealId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a deal" />
              </SelectTrigger>
              <SelectContent>
                {deals.map((deal) => (
                  <SelectItem key={deal.id} value={deal.id}>
                    {deal.name} ({deal.location})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{selectedDeal.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{selectedDeal.location}</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Deal Type</h4>
                  <p className="text-sm">{selectedDeal.type}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Key Financial Metrics</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-xs text-muted-foreground">IRR</div>
                      <div className="font-semibold">{selectedDeal.financialMetrics.projectedIRR}%</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-xs text-muted-foreground">Equity Multiple</div>
                      <div className="font-semibold">{selectedDeal.financialMetrics.projectedEM}x</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-xs text-muted-foreground">Cash on Cash</div>
                      <div className="font-semibold">{selectedDeal.financialMetrics.cashOnCash}%</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Deal Highlights</h4>
                  <ul className="list-disc pl-4 text-sm space-y-1">
                    {selectedDeal.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <MarketComparisonChart 
              deal={selectedDeal} 
              marketMetrics={marketMetrics} 
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>
              This analysis compares key market metrics for {selectedDeal.location} against industry 
              benchmarks. The radar chart visualizes how this market performs across multiple dimensions,
              helping to identify strengths and weaknesses relative to average market performance.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
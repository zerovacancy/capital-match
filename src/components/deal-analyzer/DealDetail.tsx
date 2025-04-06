import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Deal } from '@/data';
import { formatCurrency } from '@/lib/utils';

interface DealDetailProps {
  deal: Deal;
}

export function DealDetail({ deal }: DealDetailProps) {
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
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Deal Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="strategy">Strategic Fit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{deal.name}</h3>
                <p className="text-sm text-muted-foreground">{deal.location}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className={marketColor()}>{deal.market}</Badge>
                  <Badge className={typeColor()}>{deal.type}</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Project Timeline</h4>
                <div className="relative pt-6">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-muted rounded-full">
                    <div className="absolute inset-y-0 left-0 w-3 h-3 -ml-0.5 -mt-0.5 rounded-full bg-green-500 border border-white shadow-sm"></div>
                    <div className="absolute inset-y-0 left-1/4 w-3 h-3 -ml-1.5 -mt-0.5 rounded-full bg-blue-500 border border-white shadow-sm"></div>
                    <div className="absolute inset-y-0 left-1/2 w-3 h-3 -ml-1.5 -mt-0.5 rounded-full bg-indigo-500 border border-white shadow-sm"></div>
                    <div className="absolute inset-y-0 left-3/4 w-3 h-3 -ml-1.5 -mt-0.5 rounded-full bg-purple-500 border border-white shadow-sm"></div>
                    <div className="absolute inset-y-0 right-0 w-3 h-3 -mr-0.5 -mt-0.5 rounded-full bg-rose-500 border border-white shadow-sm"></div>
                  </div>
                  <div className="grid grid-cols-5 text-xs text-center">
                    <div>
                      <span>Acquisition</span>
                      <p className="text-muted-foreground">{new Date(deal.timeline.acquisitionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <span>Construction Start</span>
                      <p className="text-muted-foreground">{new Date(deal.timeline.constructionStart).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <span>Construction End</span>
                      <p className="text-muted-foreground">{new Date(deal.timeline.constructionEnd).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <span>Stabilization</span>
                      <p className="text-muted-foreground">{new Date(deal.timeline.stabilizationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <span>Exit</span>
                      <p className="text-muted-foreground">{new Date(deal.timeline.projectedExit).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Key Highlights</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <ul className="list-disc pl-4 text-sm space-y-1">
                      {deal.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Risk Factors</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <ul className="list-disc pl-4 text-sm space-y-1">
                      {deal.riskFactors.map((risk, index) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="financial" className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Return Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">IRR</span>
                          <span className="text-sm font-bold">{deal.financialMetrics.projectedIRR}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${(deal.financialMetrics.projectedIRR / 25) * 100}%` }}>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Equity Multiple</span>
                          <span className="text-sm font-bold">{deal.financialMetrics.projectedEM}x</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${(deal.financialMetrics.projectedEM / 3) * 100}%` }}>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Cash on Cash</span>
                          <span className="text-sm font-bold">{deal.financialMetrics.cashOnCash}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${(deal.financialMetrics.cashOnCash / 12) * 100}%` }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Capital Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Investment:</span>
                        <span className="text-sm font-semibold">{formatCurrency(deal.capitalRequirements.totalInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Equity Required:</span>
                        <span className="text-sm font-semibold">{formatCurrency(deal.capitalRequirements.equityRequired)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Debt:</span>
                        <span className="text-sm font-semibold">
                          {formatCurrency(deal.capitalRequirements.totalInvestment - deal.capitalRequirements.equityRequired)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Loan to Cost:</span>
                        <span className="text-sm font-semibold">
                          {Math.round(((deal.capitalRequirements.totalInvestment - deal.capitalRequirements.equityRequired) / 
                            deal.capitalRequirements.totalInvestment) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Min LP Investment:</span>
                        <span className="text-sm font-semibold">{formatCurrency(deal.capitalRequirements.minInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Target LP Count:</span>
                        <span className="text-sm font-semibold">{deal.capitalRequirements.targetLPs}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="py-2 px-4">
                  <CardTitle className="text-sm">Key Financial Metrics Comparison</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground mb-1">IRR vs. Portfolio Average</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>This Deal</span>
                            <span>{deal.financialMetrics.projectedIRR}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(deal.financialMetrics.projectedIRR / 25) * 100}%` }}>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Portfolio Average</span>
                            <span>17.5%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-gray-500 h-2 rounded-full" 
                              style={{ width: `${(17.5 / 25) * 100}%` }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground mb-1">Equity Multiple vs. Portfolio Average</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>This Deal</span>
                            <span>{deal.financialMetrics.projectedEM}x</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(deal.financialMetrics.projectedEM / 3) * 100}%` }}>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Portfolio Average</span>
                            <span>1.95x</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-gray-500 h-2 rounded-full" 
                              style={{ width: `${(1.95 / 3) * 100}%` }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="strategy" className="pt-4">
            <div className="space-y-4">
              <Card>
                <CardHeader className="py-2 px-4">
                  <CardTitle className="text-sm">Strategic Alignment</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-full bg-muted rounded-full h-4">
                          <div 
                            className={`h-4 rounded-full ${
                              deal.strategicAlignment >= 8 ? 'bg-green-500' : 
                              deal.strategicAlignment >= 5 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`} 
                            style={{ width: `${deal.strategicAlignment * 10}%` }}>
                          </div>
                        </div>
                        <span className="text-sm font-semibold">{deal.strategicAlignment}/10</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This score represents how well the deal aligns with LG Development's strategic objectives including geographic expansion, product focus, and revenue growth.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Geographic Strategy</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground">Core Market (Chicago)</h4>
                        <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                          <div className="bg-primary h-2.5 rounded-full" style={{ 
                            width: `${deal.location.includes('Chicago') ? '100%' : '0%'}` 
                          }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground">Strategic Expansion Markets</h4>
                        <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                          <div className="bg-primary h-2.5 rounded-full" style={{ 
                            width: `${["Denver", "Charlotte", "Raleigh", "Nashville"].some(city => 
                              deal.location.includes(city)) ? '100%' : '0%'}` 
                          }}></div>
                        </div>
                      </div>
                      
                      <p className="text-xs mt-2">
                        {deal.location.includes('Chicago') ? 
                          'This deal is in our core Chicago market, strengthening our existing presence.' : 
                          ["Denver", "Charlotte", "Raleigh", "Nashville"].some(city => deal.location.includes(city)) ?
                          `This deal advances our strategic expansion into ${deal.location.split(',')[0]}.` :
                          'This deal is outside our current strategic market focus.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Product Strategy</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="space-y-2">
                      <div className="flex gap-1 mb-2">
                        <Badge variant={deal.type === 'Build-to-Rent' ? 'default' : 'outline'} className="flex-1 justify-center">BTR</Badge>
                        <Badge variant={deal.type === 'Mid-Rise Multifamily' ? 'default' : 'outline'} className="flex-1 justify-center">Mid-Rise</Badge>
                        <Badge variant={deal.type === 'High-Rise Multifamily' ? 'default' : 'outline'} className="flex-1 justify-center">High-Rise</Badge>
                      </div>
                      
                      <p className="text-xs">
                        {deal.type === 'Build-to-Rent' ? 
                          'Build-to-Rent is a key strategic focus that supports our 30% YOY growth target.' : 
                          deal.type === 'Mid-Rise Multifamily' ?
                          'Mid-Rise Multifamily aligns with our product diversification strategy.' :
                          'High-Rise Multifamily supports our urban core development objectives.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="py-2 px-4">
                  <CardTitle className="text-sm">Impact on Strategic KPIs</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground">Revenue Growth (30% YOY Target)</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-green-500 h-2.5 rounded-full" 
                            style={{ width: `${
                              deal.financialMetrics.projectedIRR >= 18 ? '90%' : 
                              deal.financialMetrics.projectedIRR >= 15 ? '70%' : '50%'
                            }` }}>
                          </div>
                        </div>
                        <span className="text-xs font-semibold">
                          {deal.financialMetrics.projectedIRR >= 18 ? 'High' : 
                          deal.financialMetrics.projectedIRR >= 15 ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground">Q2 Capital Goal ($5M Target)</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-blue-500 h-2.5 rounded-full" 
                            style={{ width: `${
                              new Date(deal.financialMetrics.targetClose) <= new Date('2025-06-30') ? '100%' : 
                              new Date(deal.financialMetrics.targetClose) <= new Date('2025-09-30') ? '50%' : '0%'
                            }` }}>
                          </div>
                        </div>
                        <span className="text-xs font-semibold">
                          {new Date(deal.financialMetrics.targetClose) <= new Date('2025-06-30') ? 'Aligned' : 
                          new Date(deal.financialMetrics.targetClose) <= new Date('2025-09-30') ? 'Partial' : 'Misaligned'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
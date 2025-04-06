import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LP } from '@/data';
import { formatCurrency } from '@/lib/utils';

interface LPProfileDetailProps {
  lp: LP;
}

export function LPProfileDetail({ lp }: LPProfileDetailProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>LP Profile Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investments">Investment Criteria</TabsTrigger>
            <TabsTrigger value="relationship">Relationship</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{lp.name}</h3>
                <p className="text-sm text-muted-foreground">{lp.tier}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Geographic Focus</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Primary Markets:</span>
                    <p className="text-sm">{lp.geographicPreferences.primary.join(", ")}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Secondary Markets:</span>
                    <p className="text-sm">{lp.geographicPreferences.secondary.join(", ")}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Product Focus</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Primary Products:</span>
                    <p className="text-sm">{lp.productPreferences.primary.join(", ")}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Secondary Products:</span>
                    <p className="text-sm">{lp.productPreferences.secondary.join(", ") || "None"}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Notes</h4>
                <p className="text-sm">{lp.notes}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="investments" className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Financial Targets</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Target IRR:</span>
                        <span className="text-sm font-semibold">{lp.investmentParameters.targetIRR}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Target Equity Multiple:</span>
                        <span className="text-sm font-semibold">{lp.investmentParameters.targetEM}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Investment Horizon:</span>
                        <span className="text-sm font-semibold">{lp.investmentParameters.investmentHorizon} years</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-2 px-4">
                    <CardTitle className="text-sm">Investment Parameters</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Minimum Investment:</span>
                        <span className="text-sm font-semibold">{formatCurrency(lp.investmentParameters.minInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Maximum Investment:</span>
                        <span className="text-sm font-semibold">{formatCurrency(lp.investmentParameters.maxInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Risk Tolerance:</span>
                        <span className="text-sm font-semibold">{lp.riskTolerance}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="py-2 px-4">
                  <CardTitle className="text-sm">Strategic Alignment</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground">Geographic Focus Alignment</h4>
                      <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                        <div className="bg-primary h-2.5 rounded-full" style={{ 
                          width: `${lp.geographicPreferences.primary.includes("Chicago") ? '90%' : 
                            lp.geographicPreferences.secondary.includes("Chicago") ? '60%' : '30%'}` 
                        }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground">Strategic Market Expansion</h4>
                      <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                        <div className="bg-primary h-2.5 rounded-full" style={{ 
                          width: `${(
                            (lp.geographicPreferences.primary.filter(loc => 
                              ["Denver", "Charlotte", "Raleigh", "Nashville"].includes(loc)
                            ).length * 20) + 
                            (lp.geographicPreferences.secondary.filter(loc => 
                              ["Denver", "Charlotte", "Raleigh", "Nashville"].includes(loc)
                            ).length * 10)
                          )}%` 
                        }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground">Product Focus Alignment</h4>
                      <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                        <div className="bg-primary h-2.5 rounded-full" style={{ 
                          width: `${(
                            (lp.productPreferences.primary.filter(prod => 
                              ["Build-to-Rent", "Mid-Rise Multifamily", "High-Rise Multifamily"].includes(prod)
                            ).length * 30) + 
                            (lp.productPreferences.secondary.filter(prod => 
                              ["Build-to-Rent", "Mid-Rise Multifamily", "High-Rise Multifamily"].includes(prod)
                            ).length * 15)
                          )}%` 
                        }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="relationship" className="pt-4">
            <div className="space-y-4">
              <Card>
                <CardHeader className="py-2 px-4">
                  <CardTitle className="text-sm">Communication Preferences</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Preferred Contact Method:</span>
                      <span className="text-sm font-semibold">{lp.preferredContact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Contact Frequency:</span>
                      <span className="text-sm font-semibold">{lp.contactFrequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Contact:</span>
                      <span className="text-sm font-semibold">{new Date(lp.lastContact).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-2 px-4">
                  <CardTitle className="text-sm">Relationship Strength</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full ${
                            lp.relationshipStrength >= 8 ? 'bg-green-500' : 
                            lp.relationshipStrength >= 5 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`} 
                          style={{ width: `${lp.relationshipStrength * 10}%` }}>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">{lp.relationshipStrength}/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-2 px-4">
                  <CardTitle className="text-sm">Key Contacts</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Primary Contact</span>
                      <span className="text-sm">Brian G., Managing Partner</span>
                      <span className="text-sm text-muted-foreground">brian@example.com | (312) 555-0123</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Secondary Contact</span>
                      <span className="text-sm">Mark L., Investment Director</span>
                      <span className="text-sm text-muted-foreground">mark@example.com | (312) 555-0124</span>
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
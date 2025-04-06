import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Match, lps, deals } from '@/data';

interface MatchDetailProps {
  match: Match;
}

export function MatchDetail({ match }: MatchDetailProps) {
  // Find the LP and Deal data
  const lp = lps.find(l => l.id === match.lpId);
  const deal = deals.find(d => d.id === match.dealId);
  
  if (!lp || !deal) return null;
  
  // Calculate total weight for percentage calculation
  const totalWeight = match.factors.reduce((sum, factor) => sum + factor.weight, 0);
  
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <CardTitle>Match Analysis</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto h-[calc(100%-4rem)]">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{match.lpName}</h2>
              <p className="text-sm text-muted-foreground">{match.dealName}</p>
            </div>
            <div className="flex flex-col items-center">
              <div 
                className={`text-white font-bold flex items-center justify-center h-14 w-20 rounded-md text-xl ${
                  match.confidenceScore >= 85 ? 'bg-green-500' : 
                  match.confidenceScore >= 70 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
              >
                {match.confidenceScore}%
              </div>
              <span className="text-xs mt-1">Match Confidence</span>
            </div>
          </div>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm">Factor Analysis</CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-4">
              <div className="space-y-3">
                {match.factors.map((factor, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{factor.factor}</span>
                      <div className="text-sm flex items-center gap-1">
                        <span className="text-muted-foreground">Weight: {factor.weight}</span>
                        <span>•</span>
                        <span className="font-medium">Score: {factor.score}/10</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full ${
                          factor.score >= 8 ? 'bg-green-500' : 
                          factor.score >= 5 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`} 
                        style={{ width: `${factor.score * 10}%` }}>
                      </div>
                    </div>
                    <div className="text-xs text-right mt-1 text-muted-foreground">
                      Contribution: {Math.round((factor.contribution / (totalWeight * 10)) * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="py-2 px-4">
                <CardTitle className="text-sm">Geographic Alignment</CardTitle>
              </CardHeader>
              <CardContent className="py-3 px-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">LP Primary Markets:</span>
                    <span className="text-sm">{lp.geographicPreferences.primary.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Deal Location:</span>
                    <span className="text-sm">{deal.location}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Match Strength:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            lp.geographicPreferences.primary.some(loc => deal.location.includes(loc)) ? 'bg-green-500' : 
                            lp.geographicPreferences.secondary.some(loc => deal.location.includes(loc)) ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`} 
                          style={{ 
                            width: `${
                              lp.geographicPreferences.primary.some(loc => deal.location.includes(loc)) ? '100%' : 
                              lp.geographicPreferences.secondary.some(loc => deal.location.includes(loc)) ? '60%' : 
                              '30%'
                            }` 
                          }}>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">
                        {lp.geographicPreferences.primary.some(loc => deal.location.includes(loc)) ? 'High' : 
                         lp.geographicPreferences.secondary.some(loc => deal.location.includes(loc)) ? 'Medium' : 
                         'Low'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-2 px-4">
                <CardTitle className="text-sm">Product Alignment</CardTitle>
              </CardHeader>
              <CardContent className="py-3 px-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">LP Primary Products:</span>
                    <span className="text-sm">{lp.productPreferences.primary.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Deal Type:</span>
                    <span className="text-sm">{deal.type}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Match Strength:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            lp.productPreferences.primary.includes(deal.type) ? 'bg-green-500' : 
                            lp.productPreferences.secondary.includes(deal.type) ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`} 
                          style={{ 
                            width: `${
                              lp.productPreferences.primary.includes(deal.type) ? '100%' : 
                              lp.productPreferences.secondary.includes(deal.type) ? '60%' : 
                              '30%'
                            }` 
                          }}>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">
                        {lp.productPreferences.primary.includes(deal.type) ? 'High' : 
                         lp.productPreferences.secondary.includes(deal.type) ? 'Medium' : 
                         'Low'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="py-2 px-4">
                <CardTitle className="text-sm">Financial Alignment</CardTitle>
              </CardHeader>
              <CardContent className="py-3 px-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-muted-foreground">Metric</span>
                    <span className="text-muted-foreground">LP Target</span>
                    <span className="text-muted-foreground">Deal Value</span>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <span>Target IRR</span>
                    <span>{lp.investmentParameters.targetIRR}%</span>
                    <span className={`font-medium ${deal.financialMetrics.projectedIRR >= lp.investmentParameters.targetIRR ? 'text-green-600' : 'text-red-600'}`}>
                      {deal.financialMetrics.projectedIRR}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <span>Equity Multiple</span>
                    <span>{lp.investmentParameters.targetEM}x</span>
                    <span className={`font-medium ${deal.financialMetrics.projectedEM >= lp.investmentParameters.targetEM ? 'text-green-600' : 'text-red-600'}`}>
                      {deal.financialMetrics.projectedEM}x
                    </span>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <span>Min Investment</span>
                    <span>${lp.investmentParameters.minInvestment.toLocaleString()}</span>
                    <span className={`font-medium ${deal.capitalRequirements.minInvestment >= lp.investmentParameters.minInvestment ? 'text-green-600' : 'text-red-600'}`}>
                      ${deal.capitalRequirements.minInvestment.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-2 px-4">
                <CardTitle className="text-sm">Relationship Status</CardTitle>
              </CardHeader>
              <CardContent className="py-3 px-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Relationship Strength:</span>
                    <div className="flex items-center gap-1">
                      <span 
                        className={`h-3 w-3 rounded-full ${
                          lp.relationshipStrength >= 8 ? 'bg-green-500' : 
                          lp.relationshipStrength >= 5 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                      ></span>
                      <span className="text-sm font-semibold">{lp.relationshipStrength}/10</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Contact:</span>
                    <span className="text-sm">{new Date(lp.lastContact).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contact Preference:</span>
                    <span className="text-sm">{lp.preferredContact}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm">Outreach Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Recommended Approach</h3>
                  <p className="text-sm">{match.optimalContactMethod}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Suggested Timeline</h3>
                  <p className="text-sm">{match.suggestedTimeline}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Talking Points</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {match.talkingPoints.map((point, index) => (
                      <li key={index} className="text-sm">{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
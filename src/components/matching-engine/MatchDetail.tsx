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
    <Card className="h-full overflow-hidden border-lg-blue shadow-lg" style={{ boxShadow: '0 10px 25px -5px rgba(39, 94, 145, 0.1), 0 8px 10px -6px rgba(39, 94, 145, 0.1)' }}>
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
                className={`text-white font-bold flex items-center justify-center h-14 w-20 rounded-xl text-xl shadow-md ${
                  match.confidenceScore >= 85 ? 'bg-lg-success' : 
                  match.confidenceScore >= 70 ? 'bg-lg-warning' : 
                  'bg-lg-error'
                }`}
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
              >
                {match.confidenceScore}%
              </div>
              <span className="text-xs mt-1">Match Confidence</span>
            </div>
          </div>
          
          <Card className="border border-lg-blue/20 rounded-xl shadow-md overflow-hidden">
            <CardHeader className="py-2 px-4 bg-lg-highlight/20">
              <CardTitle className="text-sm text-lg-blue font-semibold">Factor Analysis</CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-4">
              <div className="space-y-4">
                {match.factors.map((factor, index) => (
                  <div key={index} className={index > 0 ? "pt-4 border-t border-lg-highlight/30" : ""}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{factor.factor}</span>
                      <div className="text-sm flex items-center gap-1">
                        <span className="text-muted-foreground">Weight: {factor.weight}</span>
                        <span>•</span>
                        <span className="font-bold text-lg-blue">Score: {factor.score}/10</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden shadow-inner">
                      <div 
                        className={`h-2.5 rounded-full animate-progress-bar ${
                          factor.score >= 8 ? 'bg-gradient-to-r from-lg-green to-lg-success' : 
                          factor.score >= 5 ? 'bg-gradient-to-r from-lg-green/80 to-lg-warning' : 
                          'bg-gradient-to-r from-lg-warning to-lg-error'
                        }`} 
                        style={{ 
                          width: `${factor.score * 10}%`,
                          transition: 'width 1s ease-in-out'
                        }}>
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="text-xs font-medium text-lg-blue">
                        {factor.score >= 8 ? 'Strong Match' : factor.score >= 5 ? 'Moderate Match' : 'Weak Match'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Contribution: {Math.round((factor.contribution / (totalWeight * 10)) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="border border-lg-blue/20 rounded-xl shadow-md overflow-hidden">
              <CardHeader className="py-2 px-4 bg-lg-highlight/20">
                <CardTitle className="text-sm text-lg-blue font-semibold">Geographic Alignment</CardTitle>
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
                      <div className="w-20 bg-muted rounded-full h-2 shadow-inner overflow-hidden">
                        <div 
                          className={`h-2 rounded-full animate-progress-bar ${
                            lp.geographicPreferences.primary.some(loc => deal.location.includes(loc)) ? 'bg-gradient-to-r from-lg-green to-lg-success' : 
                            lp.geographicPreferences.secondary.some(loc => deal.location.includes(loc)) ? 'bg-gradient-to-r from-lg-green/80 to-lg-warning' : 
                            'bg-gradient-to-r from-lg-warning to-lg-error'
                          }`} 
                          style={{ 
                            width: `${
                              lp.geographicPreferences.primary.some(loc => deal.location.includes(loc)) ? '100%' : 
                              lp.geographicPreferences.secondary.some(loc => deal.location.includes(loc)) ? '60%' : 
                              '30%'
                            }`,
                            transition: 'width 1s ease-in-out'
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
            
            <Card className="border border-lg-blue/20 rounded-xl shadow-md overflow-hidden">
              <CardHeader className="py-2 px-4 bg-lg-highlight/20">
                <CardTitle className="text-sm text-lg-blue font-semibold">Product Alignment</CardTitle>
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
                      <div className="w-20 bg-muted rounded-full h-2 shadow-inner overflow-hidden">
                        <div 
                          className={`h-2 rounded-full animate-progress-bar ${
                            lp.productPreferences.primary.includes(deal.type) ? 'bg-gradient-to-r from-lg-green to-lg-success' : 
                            lp.productPreferences.secondary.includes(deal.type) ? 'bg-gradient-to-r from-lg-green/80 to-lg-warning' : 
                            'bg-gradient-to-r from-lg-warning to-lg-error'
                          }`} 
                          style={{ 
                            width: `${
                              lp.productPreferences.primary.includes(deal.type) ? '100%' : 
                              lp.productPreferences.secondary.includes(deal.type) ? '60%' : 
                              '30%'
                            }`,
                            transition: 'width 1s ease-in-out'
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
            <Card className="border border-lg-blue/20 rounded-xl shadow-md overflow-hidden">
              <CardHeader className="py-2 px-4 bg-lg-highlight/20">
                <CardTitle className="text-sm text-lg-blue font-semibold">Financial Alignment</CardTitle>
              </CardHeader>
              <CardContent className="py-3 px-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 text-sm bg-lg-highlight/10 py-1.5 px-2 rounded-md">
                    <span className="text-lg-text font-semibold text-xs">Metric</span>
                    <span className="text-lg-text font-semibold text-xs">LP Target</span>
                    <span className="text-lg-text font-semibold text-xs">Deal Value</span>
                  </div>
                  <div className="grid grid-cols-3 text-sm items-center border-b border-lg-highlight/20 pb-2">
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      <span className="text-lg-text font-semibold">Target IRR</span>
                    </div>
                    <span className="text-lg-text">{lp.investmentParameters.targetIRR}%</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-lg-blue font-medium`}>
                        {deal.financialMetrics.projectedIRR}%
                      </span>
                      <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full text-white text-xs ${deal.financialMetrics.projectedIRR >= lp.investmentParameters.targetIRR ? 'bg-lg-success' : 'bg-lg-error'}`}>
                        {deal.financialMetrics.projectedIRR >= lp.investmentParameters.targetIRR ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-sm items-center border-b border-lg-highlight/20 pb-2">
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                      <span className="text-lg-text font-semibold">Equity Multiple</span>
                    </div>
                    <div className="group relative">
                      <span className="text-lg-text">{lp.investmentParameters.targetEM}x</span>
                      <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block">
                        <div className="bg-lg-footer text-lg-text text-xs p-2 rounded shadow-lg max-w-[200px]">
                          The ratio of total equity returned to total equity invested
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-lg-blue font-medium`}>
                        {deal.financialMetrics.projectedEM}x
                      </span>
                      <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full text-white text-xs ${deal.financialMetrics.projectedEM >= lp.investmentParameters.targetEM ? 'bg-lg-success' : 'bg-lg-error'}`}>
                        {deal.financialMetrics.projectedEM >= lp.investmentParameters.targetEM ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-sm items-center">
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                      <span className="text-lg-text font-semibold">Min Investment</span>
                    </div>
                    <div className="group relative">
                      <span className="text-lg-text">${(lp.investmentParameters.minInvestment/1000000).toFixed(1)}M</span>
                      <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block">
                        <div className="bg-lg-footer text-lg-text text-xs p-2 rounded shadow-lg max-w-[200px]">
                          Minimum capital commitment required by the LP
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-lg-blue font-medium`}>
                        ${(deal.capitalRequirements.minInvestment/1000000).toFixed(1)}M
                      </span>
                      <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full text-white text-xs ${deal.capitalRequirements.minInvestment >= lp.investmentParameters.minInvestment ? 'bg-lg-success' : 'bg-lg-error'}`}>
                        {deal.capitalRequirements.minInvestment >= lp.investmentParameters.minInvestment ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-lg-blue/20 rounded-xl shadow-md overflow-hidden">
              <CardHeader className="py-2 px-4 bg-lg-highlight/20">
                <CardTitle className="text-sm text-lg-blue font-semibold">Relationship Status</CardTitle>
              </CardHeader>
              <CardContent className="py-3 px-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Relationship Strength:</span>
                    <div className="flex items-center gap-1">
                      <span 
                        className={`h-3 w-3 rounded-full ${
                          lp.relationshipStrength >= 8 ? 'bg-lg-success shadow-lg' : 
                          lp.relationshipStrength >= 5 ? 'bg-lg-warning shadow-lg' : 
                          'bg-lg-error shadow-lg'
                        }`}
                      ></span>
                      <span className="text-sm font-bold text-lg-blue">{lp.relationshipStrength}/10</span>
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
          
          <Card className="border border-lg-blue/20 rounded-xl shadow-md overflow-hidden">
            <CardHeader className="py-2 px-4 bg-lg-highlight/20">
              <CardTitle className="text-sm text-lg-blue font-semibold">Outreach Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1 text-lg-blue">Recommended Approach</h3>
                  <p className="text-sm border-l-2 border-lg-blue/30 pl-2">{match.optimalContactMethod}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1 text-lg-blue">Suggested Timeline</h3>
                  <p className="text-sm border-l-2 border-lg-blue/30 pl-2">{match.suggestedTimeline}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1 text-lg-blue">Talking Points</h3>
                  <div className="border-l-2 border-lg-blue/30 pl-2">
                    <ul className="list-disc pl-5 space-y-1">
                      {match.talkingPoints.map((point, index) => (
                        <li key={index} className="text-sm">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, LineChart, ChevronRight, Filter, Building, Users, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CapitalProgressCard } from './CapitalProgressCard';
import { CapitalSourceChart } from './CapitalSourceChart';
import { MonthlyProgressChart } from './MonthlyProgressChart';
import { capitalRaiseMetrics, lps, deals, matches } from '@/data';
import { LPProfileCard } from '../lp-profile/LPProfileCard';
import { DealCard } from '../deal-analyzer/DealCard';
import { MatchCard } from '../matching-engine/MatchCard';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';

interface DashboardSummaryProps {
  title: string;
  value: string | number;
  description: string;
  change: number;
  icon: React.ReactNode;
}

const DashboardSummary = ({ title, value, description, change, icon }: DashboardSummaryProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="h-5 w-5 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <div className={cn(
          "text-xs mt-2 flex items-center font-medium",
          change > 0 ? "text-green-500" : "text-red-500"
        )}>
          {change > 0 ? "+" : ""}{change}% from last month
        </div>
      </CardContent>
    </Card>
  );
};

export function UnifiedDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedLP, setSelectedLP] = useState(lps[0]);
  const [selectedDeal, setSelectedDeal] = useState(deals[0]);
  
  // Top 3 LPs by commitment size
  const topLPs = [...lps].sort((a, b) => b.commitmentSize - a.commitmentSize).slice(0, 3);
  
  // Top 3 deals by match score
  const topDeals = [...deals].sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  
  // Most recent matches
  const recentMatches = [...matches].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <div className="bg-card rounded-lg border shadow-sm flex flex-col h-full w-full">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="h2">LG Development Capital Match</h2>
          <p className="text-muted-foreground max-w-xl">Unified view of capital raising activities</p>
        </div>
      </div>
      
      <Tabs value={activeSection} onValueChange={setActiveSection} className="flex-1">
        <div className="px-6 pt-6 pb-2">
          <TabsList className="w-full flex justify-end">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="relationships">Relationships</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="px-6 py-6 overflow-auto flex-1">
          <TabsContent value="overview" className="mt-0 space-y-4 h-full">
            {/* Summary Cards */}
            <div className="grid grid-cols-12 gap-6 mb-8">
              <div className="col-span-12 sm:col-span-6 md:col-span-3">
                <DashboardSummary
                  title="Capital Raised"
                  value="$42M"
                  description="of $150M target"
                  change={8.3}
                  icon={<PieChart className="h-4 w-4" />}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-3">
                <DashboardSummary
                  title="Active LPs"
                  value={lps.length}
                  description="investor relationships"
                  change={12.5}
                  icon={<Users className="h-4 w-4" />}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-3">
                <DashboardSummary
                  title="Deal Pipeline"
                  value={deals.length}
                  description="active opportunities"
                  change={5.2}
                  icon={<Building className="h-4 w-4" />}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-3">
                <DashboardSummary
                  title="Match Success Rate"
                  value="92%"
                  description="deals to investors"
                  change={3.1}
                  icon={<Filter className="h-4 w-4" />}
                />
              </div>
            </div>
            
            {/* Top LPs, Deals and Matches */}
            <div className="grid grid-cols-12 gap-6 mb-8">
              <div className="col-span-12 md:col-span-4">
                <Card className="h-[420px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Top Investors</CardTitle>
                    <CardDescription>By commitment size</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[340px]">
                      <div className="px-4 py-3 space-y-4">
                        {topLPs.map(lp => (
                          <LPProfileCard
                            key={lp.id}
                            lp={lp}
                            selected={false}
                            onClick={() => setSelectedLP(lp)}
                          />
                        ))}
                        <div className="pt-3">
                          <Button variant="ghost" size="sm" className="w-full flex justify-between items-center text-xs">
                            View all investors
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-12 md:col-span-4">
                <Card className="h-[420px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Top Deals</CardTitle>
                    <CardDescription>By match probability</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[340px]">
                      <div className="px-4 py-3 space-y-4">
                        {topDeals.map(deal => (
                          <DealCard
                            key={deal.id}
                            deal={deal}
                            selected={false}
                            onClick={() => setSelectedDeal(deal)}
                          />
                        ))}
                        <div className="pt-3">
                          <Button variant="ghost" size="sm" className="w-full flex justify-between items-center text-xs">
                            View all deals
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-12 md:col-span-4">
                <Card className="h-[420px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recent Matches</CardTitle>
                    <CardDescription>Investor-deal pairings</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[340px]">
                      <div className="px-4 py-3 space-y-4">
                        {recentMatches.map(match => (
                          <MatchCard
                            key={match.id}
                            match={match}
                            selected={false}
                            onClick={() => {}}
                          />
                        ))}
                        <div className="pt-3">
                          <Button variant="ghost" size="sm" className="w-full flex justify-between items-center text-xs">
                            View all matches
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Capital Progress and Sources */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12 md:col-span-6">
                <Card className="h-full border-lg-highlight/30 shadow-md overflow-hidden">
                  <CardHeader className="pb-2 border-b border-lg-highlight/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg-blue flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                          </svg>
                          Capital Progress
                        </CardTitle>
                        <CardDescription className="text-lg-text">
                          Tracking fundraising goals
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CapitalProgressCard metrics={capitalRaiseMetrics} />
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-12 md:col-span-6">
                <Card className="h-full border-lg-highlight/30 shadow-md overflow-hidden">
                  <CardHeader className="pb-2 border-b border-lg-highlight/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg-blue flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                          Capital Sources
                        </CardTitle>
                        <CardDescription className="text-lg-text">
                          By investor type and commitment status
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CapitalSourceChart />
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Monthly Progress Chart */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Card className="border-lg-highlight/30 shadow-md overflow-hidden">
                  <CardHeader className="pb-2 border-b border-lg-highlight/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg-blue flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                            <line x1="6" y1="6" x2="6" y2="6"></line>
                            <line x1="6" y1="18" x2="6" y2="18"></line>
                          </svg>
                          Monthly Capital Raise Progress
                        </CardTitle>
                        <CardDescription className="text-lg-text">
                          Target vs. actual monthly capital velocity
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <MonthlyProgressChart />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0">
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="max-w-lg w-full mx-auto bg-white/50 rounded-xl p-10 text-center shadow-sm border border-gray-100">
                <LineChart className="w-16 h-16 mx-auto mb-6 opacity-30" />
                <h3 className="text-xl font-medium mb-3">Advanced Analytics View</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">This section will contain detailed charts, trends, and projections based on historical data and AI predictions.</p>
                <Button className="flex items-center gap-2 px-6">
                  Explore Analytics <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="relationships" className="mt-0">
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="max-w-lg w-full mx-auto bg-white/50 rounded-xl p-10 text-center shadow-sm border border-gray-100">
                <Users className="w-16 h-16 mx-auto mb-6 opacity-30" />
                <h3 className="text-xl font-medium mb-3">LP Relationship Manager</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">View and manage all investor relationships, track communications, and monitor engagement metrics.</p>
                <Button className="flex items-center gap-2 px-6">
                  Manage Relationships <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
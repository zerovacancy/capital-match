import React, { useState, createContext, useContext } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LPProfileEngine } from '@/components/lp-profile';
import { DealAnalyzer } from '@/components/deal-analyzer';
import { MatchingEngine } from '@/components/matching-engine';
import { Dashboard } from '@/components/dashboard';
import Header from '@/components/Header';
import BreadcrumbNav from '@/components/BreadcrumbNav';

// Create a context to share the tab state
export const TabContext = createContext({
  activeTab: "dashboard",
  setActiveTab: (tab: string) => {}
});

const PrototypePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const getActiveTabLabel = () => {
    const tabLabels: Record<string, string> = {
      "dashboard": "Dashboard",
      "lp-profiles": "LP Profiles",
      "deal-analyzer": "Deal Analyzer",
      "matching-engine": "Matching Engine"
    };
    return tabLabels[activeTab] || "";
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="min-h-screen h-full flex flex-col bg-[#F8F5F0]/30">
        <Header />
        <BreadcrumbNav extraItems={[{ label: getActiveTabLabel() }]} />
        <div className="container mx-auto px-4 pb-8 pt-4 flex-1 flex flex-col">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-[#F8F5F0] rounded-md mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#275E91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Capital Match AI Platform</h1>
              <p className="text-gray-500">AI-powered capital raising for LG Development</p>
            </div>
          </div>
          
          <Tabs 
            defaultValue="dashboard" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col"
          >
            <div className="bg-white p-1 rounded-lg border border-gray-200 mb-6 inline-block">
              <TabsList className="grid grid-cols-4 relative z-20 bg-transparent">
                <TabsTrigger 
                  value="dashboard" 
                  data-value="dashboard"
                  className="data-[state=active]:bg-[#F8F5F0] data-[state=active]:text-[#275E91] hover:text-[#275E91] data-[state=active]:border-0 data-[state=active]:shadow-sm px-6"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="lp-profiles" 
                  data-value="lp-profiles"
                  className="data-[state=active]:bg-[#F8F5F0] data-[state=active]:text-[#275E91] hover:text-[#275E91] data-[state=active]:border-0 data-[state=active]:shadow-sm px-6"
                >
                  LP Profiles
                </TabsTrigger>
                <TabsTrigger 
                  value="deal-analyzer" 
                  data-value="deal-analyzer"
                  className="data-[state=active]:bg-[#F8F5F0] data-[state=active]:text-[#275E91] hover:text-[#275E91] data-[state=active]:border-0 data-[state=active]:shadow-sm px-6"
                >
                  Deal Analyzer
                </TabsTrigger>
                <TabsTrigger 
                  value="matching-engine" 
                  data-value="matching-engine"
                  className="data-[state=active]:bg-[#F8F5F0] data-[state=active]:text-[#275E91] hover:text-[#275E91] data-[state=active]:border-0 data-[state=active]:shadow-sm px-6"
                >
                  Matching Engine
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard" className="flex-1">
              <Dashboard />
            </TabsContent>
            
            <TabsContent value="lp-profiles" className="flex-1">
              <LPProfileEngine />
            </TabsContent>
            
            <TabsContent value="deal-analyzer" className="flex-1">
              <DealAnalyzer />
            </TabsContent>
            
            <TabsContent value="matching-engine" className="flex-1">
              <MatchingEngine />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TabContext.Provider>
  );
};

export default PrototypePage;
import React, { useState, createContext, useContext } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LPProfileEngine } from '@/components/lp-profile';
import { DealAnalyzer } from '@/components/deal-analyzer';
import { MatchingEngine } from '@/components/matching-engine';
import { Dashboard } from '@/components/dashboard';
import Header from '@/components/Header';

// Create a context to share the tab state
export const TabContext = createContext({
  activeTab: "dashboard",
  setActiveTab: (tab: string) => {}
});

const PrototypePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="min-h-screen h-full flex flex-col">
        <Header />
        <div className="container mx-auto pt-24 pb-6 flex-1 flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-display">Capital Match AI Platform</h1>
        <p className="text-muted-foreground">AI-powered capital raising for LG Development</p>
      </div>
      
      <Tabs 
        defaultValue="dashboard" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid grid-cols-4 mb-6 relative z-20">
          <TabsTrigger value="dashboard" data-value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="lp-profiles" data-value="lp-profiles">LP Profiles</TabsTrigger>
          <TabsTrigger value="deal-analyzer" data-value="deal-analyzer">Deal Analyzer</TabsTrigger>
          <TabsTrigger value="matching-engine" data-value="matching-engine">Matching Engine</TabsTrigger>
        </TabsList>
        
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
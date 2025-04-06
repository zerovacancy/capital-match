import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LPProfileEngine } from '@/components/lp-profile';
import { DealAnalyzer } from '@/components/deal-analyzer';
import { MatchingEngine } from '@/components/matching-engine';
import { Dashboard } from '@/components/dashboard';

const PrototypePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="container mx-auto py-6 min-h-screen h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Capital Match AI Platform</h1>
        <p className="text-muted-foreground">AI-powered capital raising for LG Development</p>
      </div>
      
      <Tabs 
        defaultValue="dashboard" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="lp-profiles">LP Profiles</TabsTrigger>
          <TabsTrigger value="deal-analyzer">Deal Analyzer</TabsTrigger>
          <TabsTrigger value="matching-engine">Matching Engine</TabsTrigger>
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
  );
};

export default PrototypePage;
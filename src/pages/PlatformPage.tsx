import React from 'react';
import { UnifiedDashboard } from '@/components/dashboard/UnifiedDashboard';
import Header from '@/components/Header';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const PlatformPage = () => {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <BreadcrumbNav extraItems={[{ label: "Capital Match AI Platform" }]} />
      <div className="container mx-auto pb-6 flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-display">Capital Match AI Platform</h1>
          <p className="text-muted-foreground">Complete capital raising solution for LG Development</p>
        </div>
        
        <div className="flex-1">
          <UnifiedDashboard />
        </div>
      </div>
    </div>
  );
};

export default PlatformPage;
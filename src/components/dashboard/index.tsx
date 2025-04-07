
import React from 'react';
import { capitalRaiseMetrics } from '@/data';
import { CapitalProgressCard } from './CapitalProgressCard';
import { MonthlyProgressChart } from './MonthlyProgressChart';
import { CapitalSourceChart } from './CapitalSourceChart';
import { CommitmentTable } from './CommitmentTable';
import { UnifiedDashboard } from './UnifiedDashboard';

// Original dashboard component with separate panels
export function OriginalDashboard() {
  return (
    <div className="bg-card rounded-lg border shadow-sm flex flex-col h-full w-full">
      <div className="p-4 border-b">
        <h2 className="h2">Capital Raise Dashboard</h2>
        <p>Monitor capital commitments and fundraising progress</p>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-y-auto h-[calc(100%-4rem)]">
        <div className="md:col-span-4">
          <CapitalProgressCard metrics={capitalRaiseMetrics} />
        </div>
        <div className="md:col-span-4">
          <CapitalSourceChart />
        </div>
        <div className="md:col-span-4">
          <MonthlyProgressChart />
        </div>
        <div className="md:col-span-12">
          <CommitmentTable />
        </div>
      </div>
    </div>
  );
}

// Default export is now the unified dashboard
export function Dashboard() {
  return <UnifiedDashboard />;
}

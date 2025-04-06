import React from 'react';
import { capitalRaiseMetrics } from '@/data';
import { CapitalProgressCard } from './CapitalProgressCard';
import { MonthlyProgressChart } from './MonthlyProgressChart';
import { CapitalSourceChart } from './CapitalSourceChart';
import { CommitmentTable } from './CommitmentTable';

export function Dashboard() {
  return (
    <div className="bg-card rounded-lg border shadow-sm flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Capital Raise Dashboard</h2>
        <p className="text-muted-foreground">Monitor capital commitments and fundraising progress</p>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto h-[calc(100%-4rem)]">
        <CapitalProgressCard metrics={capitalRaiseMetrics} />
        <CapitalSourceChart />
        <MonthlyProgressChart />
        <CommitmentTable />
      </div>
    </div>
  );
}
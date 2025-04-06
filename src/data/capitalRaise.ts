export interface CapitalCommitment {
  id: string;
  lpId: string;
  lpName: string;
  dealId: string;
  dealName: string;
  status: "Interested" | "Reviewing" | "Soft Commit" | "Hard Commit" | "Funded" | "Declined";
  amount: number;
  commitmentDate?: string;
  fundingDate?: string;
  notes: string;
}

export interface CapitalRaiseMetrics {
  goalAmount: number;
  goalDate: string;
  currentCommitments: number;
  softCommitments: number;
  hardCommitments: number;
  funded: number;
  velocityTarget: number; // monthly target
  currentVelocity: number; // actual monthly rate
  projectedCompletionDate: string;
  remainingDays: number;
  probabilityOfSuccess: number; // 0-100%
}

export const commitments: CapitalCommitment[] = [
  {
    id: "commit1",
    lpId: "lp4",
    lpName: "Lakefront Partners",
    dealId: "deal1",
    dealName: "Waterfront Heights",
    status: "Hard Commit",
    amount: 3000000,
    commitmentDate: "2025-03-15",
    fundingDate: "2025-07-01",
    notes: "Confirmed via signed LOI. First capital call scheduled."
  },
  {
    id: "commit2",
    lpId: "lp1",
    lpName: "Midwest Opportunity Fund",
    dealId: "deal2",
    dealName: "Highlands Villas",
    status: "Soft Commit",
    amount: 2000000,
    commitmentDate: "2025-03-25",
    notes: "Verbal commitment, legal docs in review. 90% likely to convert to hard commit."
  },
  {
    id: "commit3",
    lpId: "lp2",
    lpName: "Blue Harbor Capital",
    dealId: "deal4",
    dealName: "Riverside Commons",
    status: "Reviewing",
    amount: 2500000,
    notes: "Materials delivered, follow-up call scheduled for next week."
  },
  {
    id: "commit4",
    lpId: "lp5",
    lpName: "Greentree Investments",
    dealId: "deal3",
    dealName: "Midtown Square",
    status: "Interested",
    amount: 1000000,
    notes: "Initial meeting positive, requested additional materials on local market conditions."
  },
  {
    id: "commit5",
    lpId: "lp3",
    lpName: "Summit Ventures",
    dealId: "deal2",
    dealName: "Highlands Villas",
    status: "Soft Commit",
    amount: 1500000,
    commitmentDate: "2025-04-01",
    notes: "Verbal commitment, finalizing investment amount. Documentation in progress."
  }
];

export const capitalRaiseMetrics: CapitalRaiseMetrics = {
  goalAmount: 5000000, // $5M discretionary capital
  goalDate: "2025-06-30", // Q2 target
  currentCommitments: 10000000, // total of all commitments of any status
  softCommitments: 3500000, // total of soft commits
  hardCommitments: 3000000, // total of hard commits
  funded: 0, // total funded
  velocityTarget: 850000, // monthly target as per KPI
  currentVelocity: 1125000, // actual monthly rate
  projectedCompletionDate: "2025-06-01", 
  remainingDays: 86, // days to goal date
  probabilityOfSuccess: 92 // probability of meeting goal
};

export const monthlyProgress = [
  { month: "Jan", target: 850000, actual: 0 },
  { month: "Feb", target: 850000, actual: 750000 },
  { month: "Mar", target: 850000, actual: 1125000 },
  { month: "Apr", target: 850000, actual: 0, projected: 1250000 },
  { month: "May", target: 850000, actual: 0, projected: 1000000 },
  { month: "Jun", target: 850000, actual: 0, projected: 875000 }
];

export const capitalSourceBreakdown = [
  { source: "Lakefront Partners", amount: 3000000, status: "Hard Commit" },
  { source: "Midwest Opportunity Fund", amount: 2000000, status: "Soft Commit" },
  { source: "Summit Ventures", amount: 1500000, status: "Soft Commit" },
  { source: "Blue Harbor Capital", amount: 2500000, status: "Reviewing" },
  { source: "Greentree Investments", amount: 1000000, status: "Interested" }
];
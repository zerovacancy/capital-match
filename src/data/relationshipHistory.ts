import { RelationshipTrendPoint } from "@/components/lp-profile/relationship-trend/RelationshipTrend.types";

export interface RelationshipHistory {
  lpId: string;
  history: RelationshipTrendPoint[];
}

export const relationshipHistory: RelationshipHistory[] = [
  {
    lpId: "lp1",
    history: [
      { date: "2024-05-01", strength: 6, event: "Initial meeting" },
      { date: "2024-07-15", strength: 7, event: "Site visit - Chicago" },
      { date: "2024-09-30", strength: 7 },
      { date: "2024-11-15", strength: 8, event: "First investment ($1.2M)" },
      { date: "2025-01-05", strength: 8 },
      { date: "2025-03-15", strength: 9, event: "Additional investment ($2.5M)" }
    ]
  },
  {
    lpId: "lp2",
    history: [
      { date: "2024-06-15", strength: 5, event: "Conference introduction" },
      { date: "2024-08-01", strength: 6, event: "Office meeting" },
      { date: "2024-10-15", strength: 7, event: "Deal presentation" },
      { date: "2024-12-01", strength: 8, event: "First investment ($3M)" },
      { date: "2025-02-15", strength: 7 },
      { date: "2025-03-25", strength: 8, event: "Follow-up meeting" }
    ]
  },
  {
    lpId: "lp3",
    history: [
      { date: "2024-07-01", strength: 4, event: "Introduction call" },
      { date: "2024-09-15", strength: 5, event: "Initial meeting" },
      { date: "2024-11-01", strength: 5 },
      { date: "2025-01-15", strength: 6, event: "Deal discussion" },
      { date: "2025-02-10", strength: 6, event: "Updated on Denver project" }
    ]
  },
  {
    lpId: "lp4",
    history: [
      { date: "2024-04-01", strength: 8, event: "Long-term partner" },
      { date: "2024-06-15", strength: 9, event: "Chicago project tour" },
      { date: "2024-08-30", strength: 9 },
      { date: "2024-10-15", strength: 9, event: "Strategic planning" },
      { date: "2024-12-01", strength: 10, event: "Major investment ($8M)" },
      { date: "2025-02-01", strength: 10 },
      { date: "2025-04-01", strength: 10, event: "Quarterly review" }
    ]
  },
  {
    lpId: "lp5",
    history: [
      { date: "2024-06-01", strength: 5, event: "Introduction meeting" },
      { date: "2024-08-15", strength: 6, event: "Charlotte site visit" },
      { date: "2024-10-30", strength: 6 },
      { date: "2024-12-15", strength: 7, event: "Deal discussion" },
      { date: "2025-02-01", strength: 7 },
      { date: "2025-03-05", strength: 7, event: "Quarterly check-in" }
    ]
  }
];

export const getRelationshipHistory = (lpId: string): RelationshipTrendPoint[] => {
  const record = relationshipHistory.find(r => r.lpId === lpId);
  return record ? record.history : [];
};

export const getInvestmentHistory = (lpId: string): { date: string; amount: number; deal: string }[] => {
  // Sample investment history data
  const investmentHistoryData = {
    "lp1": [
      { date: "2024-11-15", amount: 1200000, deal: "Parkside Heights" },
      { date: "2025-03-15", amount: 2500000, deal: "Riverfront Commons" }
    ],
    "lp2": [
      { date: "2024-12-01", amount: 3000000, deal: "Denver Highlands" }
    ],
    "lp3": [],
    "lp4": [
      { date: "2024-05-10", amount: 5000000, deal: "Lakeshore Towers" },
      { date: "2024-09-20", amount: 4500000, deal: "Midtown Square" },
      { date: "2024-12-01", amount: 8000000, deal: "Waterfront Heights" }
    ],
    "lp5": [
      { date: "2025-01-10", amount: 1500000, deal: "Charlotte Commons" }
    ]
  };
  
  return investmentHistoryData[lpId as keyof typeof investmentHistoryData] || [];
};
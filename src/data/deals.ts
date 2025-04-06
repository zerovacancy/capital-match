export interface Deal {
  id: string;
  name: string;
  location: string;
  market: "Core" | "Strategic Growth" | "Opportunistic";
  type: "Build-to-Rent" | "Mid-Rise Multifamily" | "High-Rise Multifamily";
  financialMetrics: {
    projectedIRR: number;
    projectedEM: number; // Equity Multiple
    cashOnCash: number;
    targetClose: string;
  };
  capitalRequirements: {
    totalInvestment: number;
    equityRequired: number;
    minInvestment: number;
    targetLPs: number;
  };
  timeline: {
    acquisitionDate: string;
    constructionStart: string;
    constructionEnd: string;
    stabilizationDate: string;
    projectedExit: string;
  };
  riskFactors: string[];
  highlights: string[];
  strategicAlignment: number; // 1-10, alignment with company goals
}

export const deals: Deal[] = [
  {
    id: "deal1",
    name: "Waterfront Heights",
    location: "Chicago, IL",
    market: "Core",
    type: "High-Rise Multifamily",
    financialMetrics: {
      projectedIRR: 17.5,
      projectedEM: 1.9,
      cashOnCash: 8.2,
      targetClose: "2025-06-30"
    },
    capitalRequirements: {
      totalInvestment: 85000000,
      equityRequired: 25000000,
      minInvestment: 2000000,
      targetLPs: 8
    },
    timeline: {
      acquisitionDate: "2025-07-15",
      constructionStart: "2025-09-01",
      constructionEnd: "2027-10-30",
      stabilizationDate: "2028-03-15",
      projectedExit: "2030-04-01"
    },
    riskFactors: [
      "Potential construction cost increases",
      "Competitive luxury rental market",
      "Zoning approval delays"
    ],
    highlights: [
      "Prime waterfront location",
      "Sustainable design features",
      "Luxury amenities package",
      "Strong rental demand forecasts"
    ],
    strategicAlignment: 9
  },
  {
    id: "deal2",
    name: "Highlands Villas",
    location: "Denver, CO",
    market: "Strategic Growth",
    type: "Build-to-Rent",
    financialMetrics: {
      projectedIRR: 19.2,
      projectedEM: 2.1,
      cashOnCash: 9.5,
      targetClose: "2025-07-31"
    },
    capitalRequirements: {
      totalInvestment: 42000000,
      equityRequired: 12000000,
      minInvestment: 1000000,
      targetLPs: 6
    },
    timeline: {
      acquisitionDate: "2025-08-15",
      constructionStart: "2025-10-01",
      constructionEnd: "2026-12-15",
      stabilizationDate: "2027-04-30",
      projectedExit: "2029-05-01"
    },
    riskFactors: [
      "Weather-related construction delays",
      "Emerging BTR market",
      "Labor shortage in Denver market"
    ],
    highlights: [
      "First BTR community in growing submarket",
      "Energy-efficient design",
      "Premium finishes and smart home technology",
      "Strong demographic trends supporting BTR"
    ],
    strategicAlignment: 8
  },
  {
    id: "deal3",
    name: "Midtown Square",
    location: "Charlotte, NC",
    market: "Strategic Growth",
    type: "Mid-Rise Multifamily",
    financialMetrics: {
      projectedIRR: 18.3,
      projectedEM: 2.0,
      cashOnCash: 8.7,
      targetClose: "2025-08-15"
    },
    capitalRequirements: {
      totalInvestment: 38000000,
      equityRequired: 11000000,
      minInvestment: 850000,
      targetLPs: 7
    },
    timeline: {
      acquisitionDate: "2025-09-01",
      constructionStart: "2025-10-15",
      constructionEnd: "2026-12-30",
      stabilizationDate: "2027-05-15",
      projectedExit: "2029-06-01"
    },
    riskFactors: [
      "Increasing construction costs",
      "New supply pipeline in submarket",
      "Entitlement process timing"
    ],
    highlights: [
      "Mixed-use component with retail",
      "Walkable urban location",
      "Strong employment growth in area",
      "Robust pre-leasing projections"
    ],
    strategicAlignment: 7
  },
  {
    id: "deal4",
    name: "Riverside Commons",
    location: "Nashville, TN",
    market: "Strategic Growth",
    type: "Mid-Rise Multifamily",
    financialMetrics: {
      projectedIRR: 20.1,
      projectedEM: 2.2,
      cashOnCash: 9.8,
      targetClose: "2025-09-30"
    },
    capitalRequirements: {
      totalInvestment: 46000000,
      equityRequired: 13500000,
      minInvestment: 1000000,
      targetLPs: 8
    },
    timeline: {
      acquisitionDate: "2025-10-15",
      constructionStart: "2025-11-30",
      constructionEnd: "2027-01-15",
      stabilizationDate: "2027-07-01",
      projectedExit: "2029-08-15"
    },
    riskFactors: [
      "Competition from other developers",
      "Potential interest rate increases",
      "Regulatory changes in Nashville"
    ],
    highlights: [
      "Riverfront views and access",
      "Music City growth corridor",
      "Tech employment hub proximity",
      "Strong rent growth projections"
    ],
    strategicAlignment: 8
  }
];
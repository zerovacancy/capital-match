export interface LP {
  id: string;
  name: string;
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  geographicPreferences: {
    primary: string[];
    secondary: string[];
  };
  productPreferences: {
    primary: string[];
    secondary: string[];
  };
  investmentParameters: {
    targetIRR: number;
    targetEM: number; // Equity Multiple
    minInvestment: number;
    maxInvestment: number;
    investmentHorizon: number; // years
  };
  riskTolerance: "Conservative" | "Moderate" | "Aggressive";
  relationshipStrength: number; // 1-10
  lastContact: string;
  preferredContact: "Email" | "Phone" | "In-Person";
  contactFrequency: "Monthly" | "Quarterly" | "Bi-Annually";
  notes: string;
}

export const lps: LP[] = [
  {
    id: "lp1",
    name: "Midwest Opportunity Fund",
    tier: "Tier 1",
    geographicPreferences: {
      primary: ["Chicago", "Denver"],
      secondary: ["Nashville", "Charlotte"]
    },
    productPreferences: {
      primary: ["Build-to-Rent", "Mid-Rise Multifamily"],
      secondary: ["High-Rise Multifamily"]
    },
    investmentParameters: {
      targetIRR: 18,
      targetEM: 2.0,
      minInvestment: 1000000,
      maxInvestment: 5000000,
      investmentHorizon: 5
    },
    riskTolerance: "Moderate",
    relationshipStrength: 9,
    lastContact: "2025-03-15",
    preferredContact: "In-Person",
    contactFrequency: "Monthly",
    notes: "Strong relationship with partner David. Prefers deals with clear exit strategies."
  },
  {
    id: "lp2",
    name: "Blue Harbor Capital",
    tier: "Tier 1",
    geographicPreferences: {
      primary: ["Chicago", "Nashville"],
      secondary: ["Denver", "Raleigh"]
    },
    productPreferences: {
      primary: ["Mid-Rise Multifamily", "High-Rise Multifamily"],
      secondary: ["Build-to-Rent"]
    },
    investmentParameters: {
      targetIRR: 16,
      targetEM: 1.8,
      minInvestment: 2000000,
      maxInvestment: 10000000,
      investmentHorizon: 7
    },
    riskTolerance: "Conservative",
    relationshipStrength: 8,
    lastContact: "2025-03-25",
    preferredContact: "Phone",
    contactFrequency: "Monthly",
    notes: "Prioritizes capital preservation. Interested in 30% YOY growth projects."
  },
  {
    id: "lp3",
    name: "Summit Ventures",
    tier: "Tier 2",
    geographicPreferences: {
      primary: ["Denver", "Charlotte", "Raleigh"],
      secondary: ["Chicago", "Nashville"]
    },
    productPreferences: {
      primary: ["Build-to-Rent"],
      secondary: ["Mid-Rise Multifamily"]
    },
    investmentParameters: {
      targetIRR: 20,
      targetEM: 2.2,
      minInvestment: 500000,
      maxInvestment: 3000000,
      investmentHorizon: 4
    },
    riskTolerance: "Aggressive",
    relationshipStrength: 6,
    lastContact: "2025-02-10",
    preferredContact: "Email",
    contactFrequency: "Quarterly",
    notes: "New relationship, interested in innovative build-to-rent concepts."
  },
  {
    id: "lp4",
    name: "Lakefront Partners",
    tier: "Tier 1",
    geographicPreferences: {
      primary: ["Chicago"],
      secondary: ["Denver", "Nashville"]
    },
    productPreferences: {
      primary: ["High-Rise Multifamily"],
      secondary: ["Mid-Rise Multifamily"]
    },
    investmentParameters: {
      targetIRR: 15,
      targetEM: 1.7,
      minInvestment: 3000000,
      maxInvestment: 15000000,
      investmentHorizon: 10
    },
    riskTolerance: "Conservative",
    relationshipStrength: 10,
    lastContact: "2025-04-01",
    preferredContact: "In-Person",
    contactFrequency: "Monthly",
    notes: "Long-term partner, prefers Chicago luxury developments."
  },
  {
    id: "lp5",
    name: "Greentree Investments",
    tier: "Tier 2",
    geographicPreferences: {
      primary: ["Charlotte", "Raleigh", "Nashville"],
      secondary: ["Denver"]
    },
    productPreferences: {
      primary: ["Build-to-Rent", "Mid-Rise Multifamily"],
      secondary: []
    },
    investmentParameters: {
      targetIRR: 19,
      targetEM: 2.1,
      minInvestment: 750000,
      maxInvestment: 4000000,
      investmentHorizon: 5
    },
    riskTolerance: "Moderate",
    relationshipStrength: 7,
    lastContact: "2025-03-05",
    preferredContact: "Phone",
    contactFrequency: "Quarterly",
    notes: "Focused on southeastern markets, particularly interested in BTR opportunities."
  }
];
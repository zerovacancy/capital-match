export interface Match {
  id: string;
  lpId: string;
  lpName: string;
  dealId: string;
  dealName: string;
  confidenceScore: number; // 0-100
  factors: {
    factor: string;
    weight: number; // 0-10
    score: number; // 0-10
    contribution: number; // weight * score
  }[];
  talkingPoints: string[];
  optimalContactMethod: string;
  suggestedTimeline: string;
}

export const matches: Match[] = [
  {
    id: "match1",
    lpId: "lp1",
    lpName: "Midwest Opportunity Fund",
    dealId: "deal2",
    dealName: "Highlands Villas",
    confidenceScore: 87,
    factors: [
      {
        factor: "Geographic Alignment",
        weight: 9,
        score: 10,
        contribution: 90
      },
      {
        factor: "Product Type Alignment",
        weight: 8,
        score: 10,
        contribution: 80
      },
      {
        factor: "IRR Expectations",
        weight: 10,
        score: 9,
        contribution: 90
      },
      {
        factor: "Investment Size",
        weight: 7,
        score: 8,
        contribution: 56
      },
      {
        factor: "Timeline Alignment",
        weight: 6,
        score: 7,
        contribution: 42
      }
    ],
    talkingPoints: [
      "Denver is a primary market in their geographic preferences",
      "Build-to-Rent is their top product preference",
      "19.2% IRR exceeds their 18% target",
      "Equity multiple of 2.1 exceeds their 2.0 target",
      "Strong relationship (9/10) suggests high likelihood of commitment"
    ],
    optimalContactMethod: "In-Person Meeting with Deal Tour",
    suggestedTimeline: "Schedule meeting within next 14 days to ensure inclusion in Q2 capital raise"
  },
  {
    id: "match2",
    lpId: "lp4",
    lpName: "Lakefront Partners",
    dealId: "deal1",
    dealName: "Waterfront Heights",
    confidenceScore: 92,
    factors: [
      {
        factor: "Geographic Alignment",
        weight: 10,
        score: 10,
        contribution: 100
      },
      {
        factor: "Product Type Alignment",
        weight: 9,
        score: 10,
        contribution: 90
      },
      {
        factor: "IRR Expectations",
        weight: 8,
        score: 9,
        contribution: 72
      },
      {
        factor: "Investment Size",
        weight: 7,
        score: 9,
        contribution: 63
      },
      {
        factor: "Timeline Alignment",
        weight: 6,
        score: 8,
        contribution: 48
      }
    ],
    talkingPoints: [
      "Chicago is their primary target market",
      "High-Rise Multifamily is their top product preference",
      "Waterfront location aligns with their luxury development focus",
      "Investment size is within their optimal range",
      "Perfect 10/10 relationship score indicates highest priority LP"
    ],
    optimalContactMethod: "In-Person Executive Lunch",
    suggestedTimeline: "Schedule meeting this week to secure early commitment for Q2 goal"
  },
  {
    id: "match3",
    lpId: "lp5",
    lpName: "Greentree Investments",
    dealId: "deal3",
    dealName: "Midtown Square",
    confidenceScore: 84,
    factors: [
      {
        factor: "Geographic Alignment",
        weight: 10,
        score: 10,
        contribution: 100
      },
      {
        factor: "Product Type Alignment",
        weight: 8,
        score: 9,
        contribution: 72
      },
      {
        factor: "IRR Expectations",
        weight: 9,
        score: 8,
        contribution: 72
      },
      {
        factor: "Investment Size",
        weight: 7,
        score: 7,
        contribution: 49
      },
      {
        factor: "Timeline Alignment",
        weight: 6,
        score: 6,
        contribution: 36
      }
    ],
    talkingPoints: [
      "Charlotte is a primary market in their geographic preferences",
      "Mid-Rise Multifamily is their secondary product preference, but still strong alignment",
      "18.3% IRR is close to their 19% target",
      "Minimum investment is within their range but close to minimum",
      "Relationship strength of 7/10 suggests good potential"
    ],
    optimalContactMethod: "Video Conference with Follow-up Materials",
    suggestedTimeline: "Schedule call next week with materials sent ahead of time"
  },
  {
    id: "match4",
    lpId: "lp2",
    lpName: "Blue Harbor Capital",
    dealId: "deal4",
    dealName: "Riverside Commons",
    confidenceScore: 78,
    factors: [
      {
        factor: "Geographic Alignment",
        weight: 9,
        score: 9,
        contribution: 81
      },
      {
        factor: "Product Type Alignment",
        weight: 8,
        score: 9,
        contribution: 72
      },
      {
        factor: "IRR Expectations",
        weight: 10,
        score: 7,
        contribution: 70
      },
      {
        factor: "Investment Size",
        weight: 7,
        score: 8,
        contribution: 56
      },
      {
        factor: "Timeline Alignment",
        weight: 6,
        score: 6,
        contribution: 36
      }
    ],
    talkingPoints: [
      "Nashville is a primary market in their geographic preferences",
      "Mid-Rise Multifamily is their top product preference",
      "20.1% IRR exceeds their 16% target, but may be higher risk than preferred",
      "Investment size aligns well with their parameters",
      "Strong relationship (8/10) increases likelihood of positive reception"
    ],
    optimalContactMethod: "Phone Call with Digital Presentation",
    suggestedTimeline: "Schedule call in next 21 days to include in Q2 pipeline"
  },
  {
    id: "match5",
    lpId: "lp3",
    lpName: "Summit Ventures",
    dealId: "deal2",
    dealName: "Highlands Villas",
    confidenceScore: 89,
    factors: [
      {
        factor: "Geographic Alignment",
        weight: 10,
        score: 10,
        contribution: 100
      },
      {
        factor: "Product Type Alignment",
        weight: 9,
        score: 10,
        contribution: 90
      },
      {
        factor: "IRR Expectations",
        weight: 8,
        score: 9,
        contribution: 72
      },
      {
        factor: "Investment Size",
        weight: 7,
        score: 7,
        contribution: 49
      },
      {
        factor: "Timeline Alignment",
        weight: 6,
        score: 9,
        contribution: 54
      }
    ],
    talkingPoints: [
      "Denver is a primary market in their geographic preferences",
      "Build-to-Rent is their top product preference",
      "Project timeline aligns with their shorter investment horizon",
      "The innovative BTR concept matches their stated interests",
      "19.2% IRR is close to their 20% target"
    ],
    optimalContactMethod: "Email with Detailed Pitch Deck",
    suggestedTimeline: "Send materials this week with follow-up call scheduled"
  }
];
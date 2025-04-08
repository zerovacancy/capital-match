import { LP } from '../lps';

export interface Communication {
  id: string;
  lpId: string;
  type: 'meeting' | 'call' | 'email' | 'other';
  date: string;
  summary: string;
  participants: string[];
  followUp?: boolean;
  followUpDate?: string;
  attachments?: { name: string; url: string }[];
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export const communications: Communication[] = [
  {
    id: "comm1",
    lpId: "lp1",
    type: "meeting",
    date: "2025-04-01T14:00:00",
    summary: "Discussed the new Build-to-Rent project in Denver. Midwest Opportunity Fund expressed strong interest in participating with a potential $2M commitment.",
    participants: ["David Wilson", "Sarah Johnson", "Michael Chen"],
    followUp: true,
    followUpDate: "2025-04-15T10:00:00",
    attachments: [
      { name: "Denver_BTR_Deck.pdf", url: "/files/Denver_BTR_Deck.pdf" },
      { name: "Financial_Model.xlsx", url: "/files/Financial_Model.xlsx" }
    ],
    sentiment: "positive"
  },
  {
    id: "comm2",
    lpId: "lp2",
    type: "call",
    date: "2025-03-28T11:30:00",
    summary: "Quarterly check-in with Blue Harbor Capital. Discussed market conditions and potential opportunities in Nashville. They're looking to increase exposure in the region.",
    participants: ["James Peterson", "Alex Morgan"],
    followUp: false,
    attachments: [
      { name: "Nashville_Market_Update.pdf", url: "/files/Nashville_Market_Update.pdf" }
    ],
    sentiment: "neutral"
  },
  {
    id: "comm3",
    lpId: "lp3",
    type: "email",
    date: "2025-03-25T09:15:00",
    summary: "Sent updated information on the Charlotte BTR project to Summit Ventures. Addressed their questions about construction timeline and exit strategy.",
    participants: ["Emma Roberts"],
    followUp: true,
    followUpDate: "2025-04-05T09:00:00",
    sentiment: "neutral"
  },
  {
    id: "comm4",
    lpId: "lp4",
    type: "meeting",
    date: "2025-03-20T15:30:00",
    summary: "Strategic planning session with Lakefront Partners. Reviewed current portfolio performance and discussed potential new high-rise development in Chicago's River North.",
    participants: ["Robert Johnson", "Jennifer Thompson", "Daniel Kim", "Maria Rodriguez"],
    followUp: true,
    followUpDate: "2025-04-10T14:00:00",
    attachments: [
      { name: "Portfolio_Review_Q1.pdf", url: "/files/Portfolio_Review_Q1.pdf" },
      { name: "River_North_Concept.pdf", url: "/files/River_North_Concept.pdf" }
    ],
    sentiment: "positive"
  },
  {
    id: "comm5",
    lpId: "lp5",
    type: "call",
    date: "2025-03-18T10:00:00",
    summary: "Introductory call with Greentree Investments to discuss their interest in build-to-rent opportunities in Raleigh. They have capital available but concerns about market saturation.",
    participants: ["Thomas Wright", "Elizabeth Chen"],
    followUp: true,
    followUpDate: "2025-04-03T11:00:00",
    sentiment: "neutral"
  },
  {
    id: "comm6",
    lpId: "lp1",
    type: "email",
    date: "2025-03-10T16:45:00",
    summary: "Sent updated financial projections for the Denver project to Midwest Opportunity Fund. Adjusted IRR calculations based on their feedback.",
    participants: ["David Wilson"],
    followUp: false,
    attachments: [
      { name: "Denver_Updated_Financials.xlsx", url: "/files/Denver_Updated_Financials.xlsx" }
    ],
    sentiment: "positive"
  },
  {
    id: "comm7",
    lpId: "lp2",
    type: "meeting",
    date: "2025-03-05T09:30:00",
    summary: "Site visit to Nashville development with Blue Harbor Capital team. Reviewed construction progress and discussed timeline adjustments.",
    participants: ["James Peterson", "Alex Morgan", "Rachel Green", "Construction Team"],
    followUp: true,
    followUpDate: "2025-03-19T10:00:00",
    sentiment: "positive"
  },
  {
    id: "comm8",
    lpId: "lp3",
    type: "call",
    date: "2025-02-28T14:00:00",
    summary: "Follow-up call with Summit Ventures regarding their concerns about the return profile of the Charlotte project. Need to provide more data on comparable exits.",
    participants: ["Emma Roberts", "Kevin Zhang"],
    followUp: true,
    followUpDate: "2025-03-07T15:00:00",
    sentiment: "negative"
  },
  {
    id: "comm9",
    lpId: "lp4",
    type: "email",
    date: "2025-02-25T11:20:00",
    summary: "Sent quarterly investor update to Lakefront Partners. Included performance metrics for all active investments and capital call notification for River North project.",
    participants: ["Robert Johnson"],
    followUp: false,
    attachments: [
      { name: "Q4_2024_Investor_Update.pdf", url: "/files/Q4_2024_Investor_Update.pdf" },
      { name: "Capital_Call_Notice.pdf", url: "/files/Capital_Call_Notice.pdf" }
    ],
    sentiment: "neutral"
  },
  {
    id: "comm10",
    lpId: "lp5",
    type: "meeting",
    date: "2025-02-20T13:00:00",
    summary: "Presentation to Greentree Investments on Raleigh market dynamics and our competitive advantage in the region. They expressed concerns about our construction partner selection.",
    participants: ["Thomas Wright", "Elizabeth Chen", "Jason Park"],
    followUp: true,
    followUpDate: "2025-03-06T14:00:00",
    attachments: [
      { name: "Raleigh_Market_Presentation.pdf", url: "/files/Raleigh_Market_Presentation.pdf" }
    ],
    sentiment: "negative"
  }
];

export const getCommunicationsByLpId = (lpId: string): Communication[] => {
  return communications.filter(comm => comm.lpId === lpId);
};

export const getRecentCommunications = (count: number = 5): Communication[] => {
  return [...communications]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getCommunicationsByType = (type: Communication['type']): Communication[] => {
  return communications.filter(comm => comm.type === type);
};

export const getCommunicationsRequiringFollowUp = (): Communication[] => {
  return communications.filter(comm => comm.followUp === true);
};

export const getCommunicationsBySentiment = (sentiment: Communication['sentiment']): Communication[] => {
  return communications.filter(comm => comm.sentiment === sentiment);
};
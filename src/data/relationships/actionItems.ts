import { LP } from '../lps';

export interface ActionItem {
  id: string;
  lpId: string;
  type: 'follow-up' | 'meeting' | 'outreach' | 'document' | 'other';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  dueDate: string;
  assignedTo?: string;
  completed: boolean;
  createdDate: string;
}

export const actionItems: ActionItem[] = [
  {
    id: "action1",
    lpId: "lp1",
    type: "follow-up",
    priority: "high",
    title: "Send Denver BTR pro forma",
    description: "Update and send the revised pro forma for the Denver Build-to-Rent project with adjusted construction costs and timeline.",
    dueDate: "2025-04-10",
    assignedTo: "Sarah Johnson",
    completed: false,
    createdDate: "2025-04-01"
  },
  {
    id: "action2",
    lpId: "lp2",
    type: "meeting",
    priority: "medium",
    title: "Schedule site visit to Nashville project",
    description: "Coordinate with the Nashville team to schedule a site visit for Blue Harbor Capital executives during the week of April 15.",
    dueDate: "2025-04-08",
    assignedTo: "Michael Chen",
    completed: false,
    createdDate: "2025-03-28"
  },
  {
    id: "action3",
    lpId: "lp3",
    type: "document",
    priority: "medium",
    title: "Prepare comparable exits analysis",
    description: "Create a detailed analysis of comparable project exits in the Charlotte market to address Summit Ventures' concerns about return profiles.",
    dueDate: "2025-04-05",
    assignedTo: "Daniel Kim",
    completed: false,
    createdDate: "2025-02-28"
  },
  {
    id: "action4",
    lpId: "lp4",
    type: "meeting",
    priority: "high",
    title: "Quarterly review meeting",
    description: "Prepare and conduct quarterly portfolio review meeting with Lakefront Partners leadership team. Focus on Chicago developments and new opportunities.",
    dueDate: "2025-04-15",
    assignedTo: "Jennifer Thompson",
    completed: false,
    createdDate: "2025-03-20"
  },
  {
    id: "action5",
    lpId: "lp5",
    type: "document",
    priority: "high",
    title: "Construction partner due diligence",
    description: "Prepare detailed due diligence report on our Raleigh construction partners to address Greentree Investments' concerns.",
    dueDate: "2025-04-03",
    assignedTo: "Jason Park",
    completed: false,
    createdDate: "2025-02-20"
  },
  {
    id: "action6",
    lpId: "lp1",
    type: "outreach",
    priority: "medium",
    title: "Q2 investment opportunities preview",
    description: "Send preview of Q2 investment opportunities to Midwest Opportunity Fund with focus on Denver and Nashville markets.",
    dueDate: "2025-04-20",
    assignedTo: "Sarah Johnson",
    completed: false,
    createdDate: "2025-04-02"
  },
  {
    id: "action7",
    lpId: "lp2",
    type: "document",
    priority: "low",
    title: "Nashville market competitive analysis",
    description: "Update the competitive analysis for the Nashville market to include recent transactions and new entrants.",
    dueDate: "2025-04-30",
    assignedTo: "Alex Morgan",
    completed: false,
    createdDate: "2025-03-25"
  },
  {
    id: "action8",
    lpId: "lp3",
    type: "follow-up",
    priority: "low",
    title: "Check interest in Raleigh opportunities",
    description: "Follow up with Summit Ventures to gauge their interest in expanding to Raleigh market based on their Charlotte experience.",
    dueDate: "2025-04-15",
    assignedTo: "Emma Roberts",
    completed: false,
    createdDate: "2025-03-30"
  },
  {
    id: "action9",
    lpId: "lp4",
    type: "document",
    priority: "medium",
    title: "River North project executive summary",
    description: "Create an executive summary of the River North high-rise project highlighting the unique value proposition and expected returns.",
    dueDate: "2025-04-12",
    assignedTo: "Robert Johnson",
    completed: true,
    createdDate: "2025-03-15"
  },
  {
    id: "action10",
    lpId: "lp5",
    type: "outreach",
    priority: "high",
    title: "Reschedule Raleigh market discussion",
    description: "Reach out to Greentree Investments to reschedule the postponed discussion about Raleigh market opportunities.",
    dueDate: "2025-03-25",
    assignedTo: "Thomas Wright",
    completed: true,
    createdDate: "2025-03-10"
  },
  {
    id: "action11",
    lpId: "lp1",
    type: "meeting",
    priority: "low",
    title: "Annual strategy alignment",
    description: "Schedule annual strategy alignment meeting with Midwest Opportunity Fund to discuss long-term investment goals and geographic focus.",
    dueDate: "2025-05-15",
    assignedTo: "David Wilson",
    completed: false,
    createdDate: "2025-04-01"
  },
  {
    id: "action12",
    lpId: "lp4",
    type: "follow-up",
    priority: "medium",
    title: "Send updated River North renders",
    description: "Share the updated architectural renderings for the River North project with Lakefront Partners for their marketing materials.",
    dueDate: "2025-04-08",
    assignedTo: "Maria Rodriguez",
    completed: true,
    createdDate: "2025-03-25"
  }
];

export const getActionItemsByLpId = (lpId: string): ActionItem[] => {
  return actionItems.filter(item => item.lpId === lpId);
};

export const getActionItemsByType = (type: ActionItem['type']): ActionItem[] => {
  return actionItems.filter(item => item.type === type);
};

export const getActionItemsByPriority = (priority: ActionItem['priority']): ActionItem[] => {
  return actionItems.filter(item => item.priority === priority);
};

export const getActionItemsByStatus = (completed: boolean): ActionItem[] => {
  return actionItems.filter(item => item.completed === completed);
};

export const getOverdueActionItems = (): ActionItem[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return actionItems.filter(item => {
    if (item.completed) return false;
    
    const dueDate = new Date(item.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  });
};

export const getActionItemsDueThisWeek = (): ActionItem[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
  
  return actionItems.filter(item => {
    if (item.completed) return false;
    
    const dueDate = new Date(item.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate >= today && dueDate <= endOfWeek;
  });
};
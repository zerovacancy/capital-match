import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, CheckCircle2, Clock, AlertCircle, CalendarClock, User2, Users, Mail, Plus, FileText, PlusCircle } from 'lucide-react';
import { LP } from '@/data/lps';
import { cn } from '@/lib/utils';

interface ActionItem {
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

interface RelationshipActionItemsProps {
  actionItems: ActionItem[];
  lps: LP[];
  title?: string;
  description?: string;
}

export function RelationshipActionItems({
  actionItems,
  lps,
  title = "Action Items",
  description = "Prioritized tasks to strengthen investor relationships"
}: RelationshipActionItemsProps) {
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  
  // Get LP by ID
  const getLPById = (id: string) => {
    return lps.find(lp => lp.id === id);
  };
  
  // Get icon based on action item type
  const getActionIcon = (type: ActionItem['type']) => {
    switch (type) {
      case 'follow-up':
        return <Clock className="h-4 w-4" />;
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'outreach':
        return <Mail className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };
  
  // Get color based on priority
  const getPriorityColor = (priority: ActionItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Check if an item is overdue
  const isOverdue = (dueDate: string, completed: boolean) => {
    if (completed) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };
  
  // Calculate days remaining
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  // Get text for days remaining
  const getDaysRemainingText = (dueDate: string, completed: boolean) => {
    if (completed) return "Completed";
    
    const days = getDaysRemaining(dueDate);
    
    if (days < 0) {
      return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} overdue`;
    } else if (days === 0) {
      return "Due today";
    } else {
      return `${days} day${days !== 1 ? 's' : ''} remaining`;
    }
  };
  
  // Toggle completion status
  const toggleCompleted = (id: string) => {
    // In a real app, this would update the data in the backend
    console.log(`Toggling completion status for action item ${id}`);
  };
  
  // Filter action items
  const filteredItems = actionItems.filter(item => {
    // Filter by completion status
    if (filterCompleted && !item.completed) return false;
    if (!filterCompleted && item.completed) return false;
    
    // Filter by priority
    if (priorityFilter !== 'all' && item.priority !== priorityFilter) return false;
    
    return true;
  }).sort((a, b) => {
    // Sort by completion status first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Then by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <Card className="shadow-md rounded-lg overflow-hidden">
      <CardHeader className="pb-2 border-b border-gray-100 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <CardTitle className="text-base font-semibold text-gray-900">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Button 
              variant={priorityFilter === 'all' ? 'default' : 'outline'} 
              size="sm"
              className={cn(
                "h-8 text-xs rounded",
                priorityFilter === 'all' ? 'bg-[#2B6CA3] hover:bg-blue-700' : ''
              )}
              onClick={() => setPriorityFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={priorityFilter === 'high' ? 'default' : 'outline'} 
              size="sm"
              className={cn(
                "h-8 text-xs rounded",
                priorityFilter === 'high' ? 'bg-red-600 hover:bg-red-700' : ''
              )}
              onClick={() => setPriorityFilter('high')}
            >
              High
            </Button>
            <Button 
              variant={priorityFilter === 'medium' ? 'default' : 'outline'} 
              size="sm"
              className={cn(
                "h-8 text-xs rounded",
                priorityFilter === 'medium' ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''
              )}
              onClick={() => setPriorityFilter('medium')}
            >
              Medium
            </Button>
            <Button 
              variant={priorityFilter === 'low' ? 'default' : 'outline'} 
              size="sm"
              className={cn(
                "h-8 text-xs rounded",
                priorityFilter === 'low' ? 'bg-blue-600 hover:bg-blue-700' : ''
              )}
              onClick={() => setPriorityFilter('low')}
            >
              Low
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 text-xs font-medium rounded",
                filterCompleted ? 'bg-green-50 text-green-700 border-green-200' : ''
              )}
              onClick={() => setFilterCompleted(!filterCompleted)}
            >
              {filterCompleted ? 'Completed' : 'Open'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-3">
            {filteredItems.map(item => {
              const lp = getLPById(item.lpId);
              if (!lp) return null;
              
              const overdue = isOverdue(item.dueDate, item.completed);
              const daysRemainingText = getDaysRemainingText(item.dueDate, item.completed);
              
              return (
                <div 
                  key={item.id}
                  className={cn(
                    "flex border rounded-lg p-4 shadow-sm",
                    item.completed 
                      ? "border-gray-200 bg-gray-50" 
                      : overdue 
                        ? "border-red-200 bg-red-50" 
                        : "border-gray-200 bg-white"
                  )}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <Checkbox 
                        checked={item.completed} 
                        onCheckedChange={() => toggleCompleted(item.id)}
                        className={cn(
                          "h-5 w-5 rounded-sm",
                          item.completed ? "bg-green-500 text-white border-green-500" : ""
                        )}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge className={cn(getPriorityColor(item.priority), "rounded")}>
                          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                        </Badge>
                        
                        <Badge variant="outline" className="bg-gray-50 border-gray-200 rounded">
                          {getActionIcon(item.type)}
                          <span className="ml-1">
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1).replace('-', ' ')}
                          </span>
                        </Badge>
                        
                        <Badge variant="outline" className="bg-[#F8F5F0] text-[#275E91] border-[#275E91] rounded">
                          {lp.name}
                        </Badge>
                        
                        {item.completed ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 rounded">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        ) : overdue ? (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 rounded">
                            <Clock className="h-3 w-3 mr-1" />
                            {daysRemainingText}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 rounded">
                            <CalendarClock className="h-3 w-3 mr-1" />
                            {daysRemainingText}
                          </Badge>
                        )}
                      </div>
                      
                      <h4 className={cn(
                        "text-sm font-medium mb-1",
                        item.completed ? "text-gray-500 line-through" : "text-gray-900"
                      )}>
                        {item.title}
                      </h4>
                      
                      <p className={cn(
                        "text-sm mb-3",
                        item.completed ? "text-gray-400" : "text-gray-600"
                      )}>
                        {item.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <CalendarClock className="h-3.5 w-3.5 mr-1.5" />
                          Due: {formatDate(item.dueDate)}
                        </div>
                        
                        {item.assignedTo && (
                          <div className="flex items-center">
                            <User2 className="h-3.5 w-3.5 mr-1.5" />
                            Assigned to: {item.assignedTo}
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1.5" />
                          Created: {formatDate(item.createdDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 border border-dashed border-gray-200 rounded-lg">
                <div className="p-3 rounded-full bg-gray-50 mb-3">
                  <CheckCircle2 className="h-6 w-6 text-gray-300" />
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">No action items found</h4>
                <p className="text-xs text-gray-500 mb-4 text-center max-w-md">
                  {filterCompleted
                    ? "No completed action items match your current filters."
                    : "No open action items match your current filters."}
                </p>
                <Button size="sm" className="bg-[#2B6CA3] hover:bg-blue-700 text-white rounded">
                  <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                  Create new action item
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found • 
            {actionItems.filter(i => i.completed).length} completed • 
            {actionItems.filter(i => !i.completed && isOverdue(i.dueDate, i.completed)).length} overdue
          </div>
          <Button className="h-8 text-xs bg-[#2B6CA3] hover:bg-blue-700 rounded">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Action Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Clock, Mail, Phone, Users, Calendar } from 'lucide-react';
import { LP } from '@/data/lps';
import { cn } from '@/lib/utils';

interface ContactScheduleEvent {
  id: string;
  lpId: string;
  type: 'meeting' | 'call' | 'email' | 'follow-up';
  date: string;
  description: string;
  status: 'upcoming' | 'completed' | 'overdue';
  assignedTo?: string;
}

interface ContactScheduleCardProps {
  events: ContactScheduleEvent[];
  lps: LP[];
  title?: string;
  description?: string;
}

export function ContactScheduleCard({
  events,
  lps,
  title = "Contact Schedule",
  description = "Upcoming investor communications"
}: ContactScheduleCardProps) {
  
  // Get LP object by ID
  const getLPById = (id: string) => {
    return lps.find(lp => lp.id === id);
  };
  
  // Get the appropriate icon for each event type
  const getEventIcon = (type: ContactScheduleEvent['type']) => {
    switch (type) {
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'follow-up':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  
  // Get the appropriate background color for each event type
  const getTypeBackground = (type: ContactScheduleEvent['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-50 text-blue-700';
      case 'call':
        return 'bg-green-50 text-green-700';
      case 'email':
        return 'bg-purple-50 text-purple-700';
      case 'follow-up':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };
  
  // Get the appropriate color for each event status
  const getStatusColor = (status: ContactScheduleEvent['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'overdue':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };
  
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  return (
    <Card className="shadow-md rounded-lg overflow-hidden">
      <CardHeader className="pb-2 border-b border-gray-100 bg-white">
        <CardTitle className="text-base font-semibold text-gray-900">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-3">
            {sortedEvents.map(event => {
              const lp = getLPById(event.lpId);
              if (!lp) return null;
              
              return (
                <div 
                  key={event.id}
                  className="flex items-start p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-150 shadow-sm"
                >
                  <div 
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full mr-3",
                      getTypeBackground(event.type)
                    )}
                  >
                    {getEventIcon(event.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {lp.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {event.description}
                        </p>
                      </div>
                      <div className={cn(
                        "px-2 py-0.5 rounded-full text-2xs font-medium border",
                        getStatusColor(event.status)
                      )}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mt-2 gap-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(event.date)}
                      </div>
                      {event.assignedTo && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="h-3 w-3 mr-1" />
                          {event.assignedTo}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-blue-700 hover:text-blue-800 rounded">
                        View details
                        <ChevronRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {events.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 border border-dashed border-gray-200 rounded-lg">
                <div className="p-3 rounded-full bg-gray-50 mb-3">
                  <Clock className="w-6 h-6 text-gray-300" />
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-1">No upcoming contacts</h4>
                <p className="text-xs text-gray-500 mb-4">
                  No scheduled communications for this time period.
                </p>
                <Button size="sm" className="bg-[#2B6CA3] hover:bg-blue-700 rounded">
                  Schedule Contact
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="pt-3 mt-3 border-t border-gray-100">
          <Button variant="outline" size="sm" className="w-full border-gray-200 text-blue-700 hover:bg-gray-50 transition-colors duration-150 rounded">
            View all scheduled contacts
            <ChevronRight className="h-3 w-3 ml-auto" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
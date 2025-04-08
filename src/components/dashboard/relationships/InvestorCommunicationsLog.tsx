import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Filter, Mail, Phone, Users, FileText, PlusCircle, MessageSquare } from 'lucide-react';
import { LP } from '@/data/lps';
import { cn } from '@/lib/utils';

interface Communication {
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

interface InvestorCommunicationsLogProps {
  communications: Communication[];
  lps: LP[];
  title?: string;
  description?: string;
}

export function InvestorCommunicationsLog({
  communications,
  lps,
  title = "Communications Log",
  description = "Recent investor interactions and follow-ups"
}: InvestorCommunicationsLogProps) {
  const [filter, setFilter] = useState('all'); // 'all', 'call', 'meeting', 'email'
  
  // Get LP object by ID
  const getLPById = (id: string) => {
    return lps.find(lp => lp.id === id);
  };
  
  // Get icon for communication type
  const getTypeIcon = (type: Communication['type']) => {
    switch (type) {
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };
  
  // Get color for communication type
  const getTypeColor = (type: Communication['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-50 text-blue-700';
      case 'call':
        return 'bg-green-50 text-green-700';
      case 'email':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };
  
  // Get color for sentiment
  const getSentimentColor = (sentiment: Communication['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'negative':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Sort and filter communications
  const filteredCommunications = communications
    .filter(c => filter === 'all' || c.type === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="shadow-md rounded-lg overflow-hidden">
      <CardHeader className="pb-2 border-b border-gray-100 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div>
            <CardTitle className="text-base font-semibold text-gray-900">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex items-center space-x-2 flex-wrap sm:flex-nowrap">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              className={cn(
                "h-8 text-xs rounded",
                filter === 'all' ? 'bg-[#2B6CA3] hover:bg-blue-700' : ''
              )}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'meeting' ? 'default' : 'outline'} 
              size="sm"
              className={cn(
                "h-8 text-xs rounded",
                filter === 'meeting' ? 'bg-[#2B6CA3] hover:bg-blue-700' : ''
              )}
              onClick={() => setFilter('meeting')}
            >
              <Users className="h-3.5 w-3.5 mr-1" />
              Meetings
            </Button>
            <Button 
              variant={filter === 'call' ? 'default' : 'outline'} 
              size="sm"
              className={cn(
                "h-8 text-xs rounded",
                filter === 'call' ? 'bg-[#2B6CA3] hover:bg-blue-700' : ''
              )}
              onClick={() => setFilter('call')}
            >
              <Phone className="h-3.5 w-3.5 mr-1" />
              Calls
            </Button>
            <Button 
              variant={filter === 'email' ? 'default' : 'outline'} 
              size="sm"
              className={cn(
                "h-8 text-xs rounded",
                filter === 'email' ? 'bg-[#2B6CA3] hover:bg-blue-700' : ''
              )}
              onClick={() => setFilter('email')}
            >
              <Mail className="h-3.5 w-3.5 mr-1" />
              Emails
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 w-8 p-0 rounded"
            >
              <Filter className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredCommunications.map(comm => {
              const lp = getLPById(comm.lpId);
              if (!lp) return null;
              
              return (
                <div 
                  key={comm.id}
                  className={cn(
                    "p-4 rounded-lg border shadow-sm transition-colors duration-150 hover:bg-gray-50",
                    comm.sentiment ? getSentimentColor(comm.sentiment) : "border-gray-200 bg-white"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full mr-3",
                        getTypeColor(comm.type)
                      )}>
                        {getTypeIcon(comm.type)}
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {lp.name}
                        </h4>
                        <div className="flex items-center mt-0.5">
                          <span className="text-xs text-gray-500 mr-2">
                            {formatDate(comm.date)}
                          </span>
                          <Badge variant="outline" className={cn(
                            "text-2xs py-0 h-4",
                            getTypeColor(comm.type)
                          )}>
                            {comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {comm.followUp && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 rounded">
                          {comm.followUpDate ? formatDate(comm.followUpDate).split(',')[0] : 'Follow-up Required'}
                        </Badge>
                      )}
                      {comm.sentiment && (
                        <Badge variant="outline" className={cn(
                          "rounded",
                          comm.sentiment === 'positive' ? 'bg-green-50 text-green-700 border-green-200' : 
                          comm.sentiment === 'negative' ? 'bg-red-50 text-red-700 border-red-200' : 
                          'bg-gray-50 text-gray-500 border-gray-200'
                        )}>
                          {comm.sentiment.charAt(0).toUpperCase() + comm.sentiment.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-700">
                    {comm.summary}
                  </div>
                  
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {comm.participants.length > 0 && (
                      <div className="flex items-center text-xs text-gray-500 mr-3">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        {comm.participants.length} participants
                      </div>
                    )}
                    
                    {comm.attachments && comm.attachments.length > 0 && (
                      <div className="flex items-center">
                        <div className="flex items-center text-xs text-gray-500">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          {comm.attachments.length} attachment{comm.attachments.length > 1 ? 's' : ''}
                        </div>
                        <div className="ml-3 flex gap-2">
                          {comm.attachments.map((attachment, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="text-xs text-blue-700 bg-blue-50 border-blue-200 rounded cursor-pointer hover:bg-blue-700 hover:text-white transition-colors duration-200"
                            >
                              {attachment.name.length > 15 ? attachment.name.substring(0, 15) + '...' : attachment.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs rounded border-gray-200 hover:bg-gray-50">
                        <MessageSquare className="h-3.5 w-3.5 mr-1" />
                        Add Comment
                      </Button>
                      {!comm.followUp && (
                        <Button variant="outline" size="sm" className="h-7 text-xs rounded border-gray-200 hover:bg-gray-50">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Set Follow-up
                        </Button>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs rounded text-gray-500 hover:text-blue-700"
                    >
                      View Details <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
            
            {filteredCommunications.length === 0 && (
              <div className="p-12 text-center border border-dashed border-gray-200 rounded-lg">
                <Mail className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                <h4 className="text-sm font-medium text-gray-600 mb-1">No communications found</h4>
                <p className="text-xs text-gray-500 mb-4">
                  {filter !== 'all' 
                    ? `No ${filter} communications in the selected time period.` 
                    : 'There are no logged communications for the selected filters.'}
                </p>
                <Button size="sm" className="bg-[#2B6CA3] hover:bg-blue-700 rounded">
                  <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                  Log Communication
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {filteredCommunications.length} communication{filteredCommunications.length !== 1 ? 's' : ''} found
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs rounded border-gray-200 hover:bg-gray-50">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              Advanced Filters
            </Button>
            <Button className="h-8 text-xs rounded bg-[#2B6CA3] hover:bg-blue-700">
              <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
              Log New Communication
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
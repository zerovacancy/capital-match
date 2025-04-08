import React, { useState } from 'react';
import {
  ContactScheduleCard,
  RelationshipHealthScore,
  InvestorCommunicationsLog,
  InvestorEngagementMetrics,
  RelationshipActionItems
} from './';
import { lps } from '@/data';
import { 
  communications, 
  engagementMetrics, 
  actionItems 
} from '@/data/relationships';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Download, Filter, Printer, RefreshCw } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';

// Sample data for contact schedule - this will be moved to a data file in future enhancements
const sampleSchedule = [
  {
    id: "sched1",
    lpId: "lp1",
    type: "meeting" as const,
    date: "2025-04-10T14:00:00",
    description: "Quarterly portfolio review",
    status: "upcoming" as const,
    assignedTo: "Sarah Johnson"
  },
  {
    id: "sched2",
    lpId: "lp2",
    type: "call" as const,
    date: "2025-04-09T10:30:00",
    description: "Follow up on Chicago opportunity",
    status: "upcoming" as const,
    assignedTo: "Michael Chen"
  },
  {
    id: "sched3",
    lpId: "lp4",
    type: "email" as const,
    date: "2025-04-08T09:00:00",
    description: "Send monthly investment update",
    status: "completed" as const,
    assignedTo: "Sarah Johnson"
  },
  {
    id: "sched4",
    lpId: "lp3",
    type: "call" as const,
    date: "2025-04-05T11:00:00",
    description: "Discuss Denver project participation",
    status: "overdue" as const,
    assignedTo: "Michael Chen"
  },
  {
    id: "sched5",
    lpId: "lp5",
    type: "meeting" as const,
    date: "2025-04-15T15:30:00",
    description: "Intro to new build-to-rent project",
    status: "upcoming" as const,
    assignedTo: "Sarah Johnson"
  }
];

export function RelationshipsDashboard() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(2025, 0, 1), // Jan 1, 2025
    to: new Date(2025, 5, 30),  // Jun 30, 2025
  });
  
  const [timeframe, setTimeframe] = useState("ytd");

  // Get only engagement metrics for LPs we have in our database
  const filteredEngagementMetrics = engagementMetrics.filter(
    metric => lps.some(lp => lp.id === metric.lpId)
  );

  return (
    <ScrollArea className="h-full w-full">
      <div className="space-y-6 p-6 bg-gray-50">
        {/* Header with filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div>
            <h3 className="text-xl font-semibold text-[#2B6CA3]">Investor Relationship Manager</h3>
            <p className="text-sm text-muted-foreground">Track and manage investor relationships and engagement</p>
          </div>
          
          <div className="flex items-center space-x-2 flex-wrap sm:flex-nowrap">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[140px] h-9 text-xs rounded">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="mtd">Month to Date</SelectItem>
                  <SelectItem value="qtd">Quarter to Date</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="1y">Last 12 Months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            {timeframe === 'custom' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 px-3 text-xs rounded"
                  >
                    <CalendarIcon className="h-3.5 w-3.5 mr-2" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(dateRange.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange as any}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}
            
            <Button variant="outline" size="sm" className="h-9 px-3 rounded">
              <Filter className="h-3.5 w-3.5 mr-2" />
              <span className="text-xs">Filters</span>
            </Button>
            
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded">
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        {/* Export/Print Controls */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" className="h-8 text-xs bg-white rounded">
            <Printer className="h-3.5 w-3.5 mr-2" />
            Print Report
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs bg-white rounded">
            <Download className="h-3.5 w-3.5 mr-2" />
            Export Data
          </Button>
        </div>
        
        {/* Health and Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RelationshipHealthScore lps={lps} />
          <InvestorEngagementMetrics metrics={filteredEngagementMetrics} lps={lps} />
        </div>
        
        {/* Action Items and Contact Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RelationshipActionItems actionItems={actionItems} lps={lps} />
          <ContactScheduleCard events={sampleSchedule} lps={lps} />
        </div>
        
        {/* Communications Log */}
        <InvestorCommunicationsLog communications={communications} lps={lps} />
      </div>
    </ScrollArea>
  );
}
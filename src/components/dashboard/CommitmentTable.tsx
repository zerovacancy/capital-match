import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { commitments } from '@/data';
import { formatCurrency } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, AlertCircle } from 'lucide-react';

export function CommitmentTable() {
  // Get status badge properties based on commitment status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Hard Commit':
        return {
          color: 'bg-lg-success text-white',
          hoverColor: 'hover:bg-lg-success/90',
          icon: <div className="w-1.5 h-1.5 rounded-full bg-white mr-1"></div>,
          tooltip: 'Legally binding commitment with signed documents'
        };
      case 'Soft Commit':
        return {
          color: 'bg-lg-green text-white',
          hoverColor: 'hover:bg-lg-green/90',
          icon: <div className="w-1.5 h-1.5 rounded-full bg-white mr-1"></div>,
          tooltip: 'Verbal commitment, pending final paperwork'
        };
      case 'Funded':
        return {
          color: 'bg-lg-blue text-white',
          hoverColor: 'hover:bg-lg-blue/90',
          icon: <div className="w-1.5 h-1.5 rounded-full bg-white mr-1"></div>,
          tooltip: 'Funds received and deployed'
        };
      case 'Reviewing':
        return {
          color: 'bg-lg-highlight text-lg-text',
          hoverColor: 'hover:bg-lg-highlight/80',
          icon: <div className="w-1.5 h-1.5 rounded-full bg-lg-text mr-1"></div>,
          tooltip: 'Currently evaluating the investment opportunity'
        };
      case 'Interested':
        return {
          color: 'bg-lg-highlight/50 text-lg-text',
          hoverColor: 'hover:bg-lg-highlight/40',
          icon: <div className="w-1.5 h-1.5 rounded-full bg-lg-text mr-1"></div>,
          tooltip: 'Expressed initial interest, early stage discussions'
        };
      case 'Declined':
        return {
          color: 'bg-lg-error/10 text-lg-error',
          hoverColor: 'hover:bg-lg-error/20',
          icon: <AlertCircle size={12} className="mr-1" />,
          tooltip: 'Formally declined to participate'
        };
      default:
        return {
          color: 'bg-lg-highlight/30 text-lg-text',
          hoverColor: 'hover:bg-lg-highlight/40',
          icon: null,
          tooltip: 'Status unknown'
        };
    }
  };

  // Format commitment date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="col-span-2 border border-lg-highlight/30 shadow-md">
      <CardHeader className="pb-2 border-b border-lg-highlight/20">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg-blue flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              LP Commitment Status
            </CardTitle>
            <CardDescription className="text-lg-text">
              Current status of capital commitments by LP
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-lg-text font-medium">Total: </span>
            <span className="text-sm font-bold text-lg-blue">
              {formatCurrency(commitments.reduce((sum, c) => sum + c.amount, 0))}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto rounded-md">
          <Table>
            <TableHeader className="bg-lg-highlight/10">
              <TableRow className="hover:bg-lg-highlight/10 border-b-lg-highlight/20">
                <TableHead className="text-lg-text font-semibold h-10 py-2">LP</TableHead>
                <TableHead className="text-lg-text font-semibold h-10 py-2">Deal</TableHead>
                <TableHead className="text-lg-text font-semibold h-10 py-2 text-right">Amount</TableHead>
                <TableHead className="text-lg-text font-semibold h-10 py-2">Status</TableHead>
                <TableHead className="text-lg-text font-semibold h-10 py-2">Date</TableHead>
                <TableHead className="text-lg-text font-semibold h-10 py-2">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commitments.map((commitment, index) => {
                const statusBadge = getStatusBadge(commitment.status);
                return (
                  <TableRow 
                    key={commitment.id} 
                    className={`
                      ${index % 2 === 0 ? 'bg-lg-background' : 'bg-lg-footer'} 
                      hover:bg-lg-highlight/10
                      transition-colors duration-150
                      border-b border-lg-highlight/20
                    `}
                  >
                    <TableCell className="font-medium text-lg-blue py-3 align-middle">
                      {commitment.lpName}
                    </TableCell>
                    <TableCell className="text-lg-text py-3 align-middle">
                      {commitment.dealName}
                    </TableCell>
                    <TableCell className="text-right font-mono text-lg-text py-3 align-middle">
                      {formatCurrency(commitment.amount)}
                    </TableCell>
                    <TableCell className="py-3 align-middle">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge className={`${statusBadge.color} ${statusBadge.hoverColor} flex items-center justify-center py-1 px-2`}>
                              {statusBadge.icon}
                              {commitment.status}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="bg-lg-footer border-lg-highlight text-lg-text">
                            <p className="text-xs">{statusBadge.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-lg-text py-3 align-middle">
                      {formatDate(commitment.commitmentDate)}
                    </TableCell>
                    <TableCell className="text-lg-text py-3 align-middle">
                      <div className="max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">
                                {commitment.notes}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="bg-lg-footer border-lg-highlight text-lg-text max-w-xs">
                              <p className="text-xs">{commitment.notes}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="px-4 py-2 bg-lg-highlight/5 border-t border-lg-highlight/20 flex items-center text-xs text-lg-text">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-lg-success"></div>
              <span>Hard Commit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-lg-green"></div>
              <span>Soft Commit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-lg-highlight"></div>
              <span>Reviewing</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
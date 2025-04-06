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

export function CommitmentTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hard Commit':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Soft Commit':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Funded':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Reviewing':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'Interested':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'Declined':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>LP Commitment Status</CardTitle>
        <CardDescription>Current status of capital commitments by LP</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>LP</TableHead>
              <TableHead>Deal</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Commitment Date</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commitments.map((commitment) => (
              <TableRow key={commitment.id}>
                <TableCell className="font-medium">{commitment.lpName}</TableCell>
                <TableCell>{commitment.dealName}</TableCell>
                <TableCell>{formatCurrency(commitment.amount)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(commitment.status)} variant="outline">
                    {commitment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {commitment.commitmentDate ? 
                    new Date(commitment.commitmentDate).toLocaleDateString() : 
                    '-'}
                </TableCell>
                <TableCell className="max-w-[200px] truncate" title={commitment.notes}>
                  {commitment.notes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
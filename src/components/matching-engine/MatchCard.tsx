import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Match } from '@/data';

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
  selected?: boolean;
}

export function MatchCard({ match, onClick, selected = false }: MatchCardProps) {
  // Calculate confidence color based on score
  const confidenceColor = () => {
    if (match.confidenceScore >= 85) return 'bg-green-500';
    if (match.confidenceScore >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all ${selected ? 'border-2 border-primary' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-muted/50">
        <div>
          <div className="font-semibold truncate">{match.lpName}</div>
          <div className="text-sm text-muted-foreground truncate">{match.dealName}</div>
        </div>
        <div 
          className={`text-white font-bold flex items-center justify-center h-8 w-12 rounded-md ${confidenceColor()}`}
          title="Match Confidence Score"
        >
          {match.confidenceScore}%
        </div>
      </CardHeader>
      <CardContent className="px-4 py-3">
        <div className="space-y-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Top Alignment Factors:</span>
            <ul className="list-disc pl-5 mt-1">
              {match.factors.slice(0, 2).map((factor, index) => (
                <li key={index}>
                  {factor.factor}: {factor.score}/10
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-muted-foreground">Suggested Approach:</span>
            <div className="font-medium mt-1">{match.optimalContactMethod}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
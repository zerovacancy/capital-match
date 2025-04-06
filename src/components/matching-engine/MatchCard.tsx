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
    if (match.confidenceScore >= 85) return 'bg-lg-success';
    if (match.confidenceScore >= 70) return 'bg-lg-warning';
    return 'bg-lg-error';
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all ${selected ? 'border-2 border-lg-blue' : 'border border-lg-border'}`}
      onClick={onClick}
      style={{ boxShadow: selected ? '0 4px 12px rgba(39, 94, 145, 0.15)' : '' }}
    >
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-lg-highlight/20">
        <div>
          <div className="font-bold text-lg-text truncate">{match.lpName}</div>
          <div className="text-sm text-lg-text/70 truncate font-normal">{match.dealName}</div>
        </div>
        <div 
          className={`text-white font-bold flex items-center justify-center h-9 w-14 rounded-xl ${confidenceColor()}`}
          title="Match Confidence Score"
          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          {match.confidenceScore}%
        </div>
      </CardHeader>
      <CardContent className="px-4 py-3">
        <div className="space-y-3 text-sm">
          <div className="flex flex-col">
            <span className="text-lg-text font-medium mb-1">Top Alignment Factors:</span>
            <ul className="space-y-1.5 mt-1">
              {match.factors.slice(0, 2).map((factor, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-lg-blue mr-2 flex-shrink-0 mt-0.5"></div>
                  <span className="text-lg-text font-medium">{factor.factor}: </span>
                  <span className={`ml-1 font-bold ${factor.score >= 8 ? 'text-lg-success' : factor.score >= 5 ? 'text-lg-warning' : 'text-lg-error'}`}>
                    {factor.score}/10
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-lg-highlight/30 pt-3">
            <span className="text-lg-text font-medium">Suggested Approach:</span>
            <div className="flex mt-1 items-start">
              <div className="bg-lg-green/10 border-l-2 border-lg-green p-1.5 text-lg-text rounded-r-sm flex-1">
                {match.optimalContactMethod}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
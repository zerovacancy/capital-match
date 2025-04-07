
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
      className={`cursor-pointer hover:shadow-lg transition-all ${selected ? 'border-2 border-lg-blue bg-white' : 'border border-lg-border/60 shadow-md card-bg-secondary'}`}
      onClick={onClick}
    >
      <CardHeader className="py-2 px-3 flex flex-row items-center justify-between bg-lg-highlight/10 border-b border-lg-border/30">
        <div className="max-w-[65%]">
          <div className="font-semibold text-lg-blue text-sm truncate">{match.lpName}</div>
          <div className="text-xs text-lg-text/70 truncate font-normal">{match.dealName}</div>
        </div>
        <div 
          className={`text-white font-bold flex items-center justify-center h-7 w-12 rounded-md text-xs ${confidenceColor()}`}
          title="Match Confidence Score"
        >
          {match.confidenceScore}%
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2.5">
        <div className="space-y-2 text-xs">
          <div className="flex flex-col">
            <span className="text-lg-text font-medium mb-0.5 text-xs">Top Alignment Factors:</span>
            <ul className="space-y-1 mt-0.5">
              {match.factors.slice(0, 2).map((factor, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-1 h-1 rounded-full bg-lg-blue mr-1.5 flex-shrink-0 mt-0.5"></div>
                  <span className="text-lg-text font-medium text-[10px]">{factor.factor}: </span>
                  <span className={`ml-0.5 font-bold text-[10px] ${factor.score >= 8 ? 'text-lg-success' : factor.score >= 5 ? 'text-lg-warning' : 'text-lg-error'}`}>
                    {factor.score}/10
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-lg-highlight/20 pt-1.5">
            <span className="text-lg-text font-medium text-[10px]">Contact Method:</span>
            <div className="flex mt-0.5 items-start">
              <div className="bg-lg-green/10 border-l-2 border-lg-green p-1 text-[10px] text-lg-text rounded-r-sm flex-1 line-clamp-2">
                {match.optimalContactMethod}
              </div>
            </div>
          </div>
          
          {/* Added to show match date */}
          <div className="flex justify-end items-center mt-1 text-[10px] text-lg-text/70">
            <span>
              {new Date(match.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

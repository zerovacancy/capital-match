import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { matches } from '@/data';
import { MatchCard } from './MatchCard';
import { MatchDetail } from './MatchDetail';

export function MatchingEngine() {
  const [selectedMatch, setSelectedMatch] = useState(matches[0]);
  const [search, setSearch] = useState('');
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [filter, setFilter] = useState('all');
  
  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.lpName.toLowerCase().includes(search.toLowerCase()) || 
                         match.dealName.toLowerCase().includes(search.toLowerCase());
    const meetsThreshold = match.confidenceScore >= confidenceThreshold;
    
    if (!matchesSearch || !meetsThreshold) return false;
    
    if (filter === 'all') return true;
    if (filter === 'highConfidence') return match.confidenceScore >= 85;
    if (filter === 'mediumConfidence') return match.confidenceScore >= 70 && match.confidenceScore < 85;
    if (filter === 'lowConfidence') return match.confidenceScore < 70;
    
    return true;
  });
  
  // Sort by confidence score (descending)
  const sortedMatches = [...filteredMatches].sort((a, b) => b.confidenceScore - a.confidenceScore);

  return (
    <div className="bg-lg-background rounded-lg border border-lg-blue/20 shadow-md flex flex-col h-full" style={{ boxShadow: '0 4px 12px rgba(39, 94, 145, 0.08)' }}>
      <div className="p-4 border-b border-lg-highlight/30">
        <h2 className="h2 text-lg-blue">Matching Algorithm</h2>
        <p className="text-lg-text">Match deals with appropriate LPs based on criteria alignment</p>
      </div>
      
      <div className="p-4 grid grid-cols-12 gap-4 h-[calc(100%-4rem)]">
        <div className="col-span-12 md:col-span-5 flex flex-col h-full">
          <div className="space-y-3 mb-4">
            <Input 
              placeholder="Search LP or deal..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
            <div className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-lg-blue">Confidence Threshold: {confidenceThreshold}%</span>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[150px] h-8">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Matches</SelectItem>
                    <SelectItem value="highConfidence">High Confidence</SelectItem>
                    <SelectItem value="mediumConfidence">Medium Confidence</SelectItem>
                    <SelectItem value="lowConfidence">Low Confidence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Slider 
                defaultValue={[70]} 
                max={100} 
                step={5} 
                value={[confidenceThreshold]}
                onValueChange={(values) => setConfidenceThreshold(values[0])}
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="space-y-3 pr-4">
              {sortedMatches.map(match => (
                <MatchCard 
                  key={match.id}
                  match={match}
                  selected={selectedMatch.id === match.id}
                  onClick={() => setSelectedMatch(match)}
                />
              ))}
              {sortedMatches.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No matches found matching your search criteria.</p>
              )}
            </div>
          </ScrollArea>
        </div>
        
        <div className="col-span-12 md:col-span-7 h-full">
          <MatchDetail match={selectedMatch} />
        </div>
      </div>
    </div>
  );
}
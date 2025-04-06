import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lps } from '@/data';
import { LPProfileCard } from './LPProfileCard';
import { LPProfileDetail } from './LPProfileDetail';

export function LPProfileEngine() {
  const [selectedLP, setSelectedLP] = useState(lps[0]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredLPs = lps.filter(lp => {
    const matchesSearch = lp.name.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'tier1') return matchesSearch && lp.tier === 'Tier 1';
    if (filter === 'tier2') return matchesSearch && lp.tier === 'Tier 2';
    if (filter === 'tier3') return matchesSearch && lp.tier === 'Tier 3';
    if (filter === 'chicago') return matchesSearch && 
      (lp.geographicPreferences.primary.includes('Chicago') || 
       lp.geographicPreferences.secondary.includes('Chicago'));
    if (filter === 'growth') return matchesSearch && 
      (lp.geographicPreferences.primary.some(loc => ['Denver', 'Charlotte', 'Raleigh', 'Nashville'].includes(loc)) ||
       lp.geographicPreferences.secondary.some(loc => ['Denver', 'Charlotte', 'Raleigh', 'Nashville'].includes(loc)));
       
    return matchesSearch;
  });

  return (
    <div className="bg-card rounded-lg border shadow-sm flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">LP Profile Engine</h2>
        <p className="text-muted-foreground">Manage investor relationships and match criteria with deals</p>
      </div>
      
      <div className="p-4 grid grid-cols-12 gap-4 h-[calc(100%-4rem)]">
        <div className="col-span-12 md:col-span-5 flex flex-col h-full">
          <div className="flex gap-2 mb-4">
            <Input 
              placeholder="Search LPs..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All LPs</SelectItem>
                <SelectItem value="tier1">Tier 1</SelectItem>
                <SelectItem value="tier2">Tier 2</SelectItem>
                <SelectItem value="tier3">Tier 3</SelectItem>
                <SelectItem value="chicago">Chicago Focus</SelectItem>
                <SelectItem value="growth">Growth Markets</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="space-y-3 pr-4">
              {filteredLPs.map(lp => (
                <LPProfileCard 
                  key={lp.id}
                  lp={lp}
                  selected={selectedLP.id === lp.id}
                  onClick={() => setSelectedLP(lp)}
                />
              ))}
              {filteredLPs.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No LPs found matching your search criteria.</p>
              )}
            </div>
          </ScrollArea>
        </div>
        
        <div className="col-span-12 md:col-span-7 h-full">
          <LPProfileDetail lp={selectedLP} />
        </div>
      </div>
    </div>
  );
}
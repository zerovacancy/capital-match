import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { deals } from '@/data';
import { DealCard } from './DealCard';
import { DealDetail } from './DealDetail';

export function DealAnalyzer() {
  const [selectedDeal, setSelectedDeal] = useState(deals[0]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(search.toLowerCase()) || 
                         deal.location.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'btr') return matchesSearch && deal.type === 'Build-to-Rent';
    if (filter === 'midrise') return matchesSearch && deal.type === 'Mid-Rise Multifamily';
    if (filter === 'highrise') return matchesSearch && deal.type === 'High-Rise Multifamily';
    if (filter === 'core') return matchesSearch && deal.market === 'Core';
    if (filter === 'growth') return matchesSearch && deal.market === 'Strategic Growth';
    if (filter === 'opportunistic') return matchesSearch && deal.market === 'Opportunistic';
    
    return matchesSearch;
  });

  return (
    <div className="bg-card rounded-lg border shadow-sm flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Deal Analysis Engine</h2>
        <p className="text-muted-foreground">Analyze and standardize deal metrics for consistent evaluation</p>
      </div>
      
      <div className="p-4 grid grid-cols-12 gap-4 h-[calc(100%-4rem)]">
        <div className="col-span-12 md:col-span-5 flex flex-col h-full">
          <div className="flex gap-2 mb-4">
            <Input 
              placeholder="Search deals..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deals</SelectItem>
                <SelectItem value="btr">Build-to-Rent</SelectItem>
                <SelectItem value="midrise">Mid-Rise</SelectItem>
                <SelectItem value="highrise">High-Rise</SelectItem>
                <SelectItem value="core">Core Market</SelectItem>
                <SelectItem value="growth">Strategic Growth</SelectItem>
                <SelectItem value="opportunistic">Opportunistic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="space-y-3 pr-4">
              {filteredDeals.map(deal => (
                <DealCard 
                  key={deal.id}
                  deal={deal}
                  selected={selectedDeal.id === deal.id}
                  onClick={() => setSelectedDeal(deal)}
                />
              ))}
              {filteredDeals.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No deals found matching your search criteria.</p>
              )}
            </div>
          </ScrollArea>
        </div>
        
        <div className="col-span-12 md:col-span-7 h-full">
          <DealDetail deal={selectedDeal} />
        </div>
      </div>
    </div>
  );
}
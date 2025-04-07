import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, UserRound, LineChart, ArrowDownRight, ArrowUpRight, 
  Search, CheckCircle2, Building2, DollarSign, Target,
  Filter, X, ChevronDown, MapPin, Building, Users, BarChart3,
  HelpCircle, Play, PauseCircle, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from "@/components/ui/card";

interface PlatformVisualizationProps {
  className?: string;
  capitalGoal?: number;
  capitalRaised?: number;
  targetDate?: string;
  lpName?: string;
  lpCommitment?: number;
  dealName?: string;
  dealCapitalNeed?: number;
  showFilters?: boolean;
  onFilterChange?: (filters: {
    dealSize?: [number, number];
    location?: string[];
    investorType?: string[];
    assetClass?: string[];
    returnProfile?: string[];
  }) => void;
}

const PlatformVisualization: React.FC<PlatformVisualizationProps> = ({ 
  className,
  capitalGoal = 150,
  capitalRaised = 42,
  targetDate = "Q3 2025",
  lpName = "Walton Street Capital",
  lpCommitment = 42,
  dealName = "Triangle Square",
  dealCapitalNeed = 68,
  showFilters = false,
  onFilterChange
}) => {
  // Guided tour state
  const [showGuidedTour, setShowGuidedTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  // Animation states
  const [animationStep, setAnimationStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const visualizationRef = useRef<HTMLDivElement>(null);
  
  // Connection animation states
  const [connection1Active, setConnection1Active] = useState(false);
  const [connection2Active, setConnection2Active] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [dealMatched, setDealMatched] = useState(false);
  
  // Particle system states
  const [dataParticles, setDataParticles] = useState<Array<{id: number, position: number, direction: 'left' | 'right'}>>([]);
  
  // Generate data flow particles
  useEffect(() => {
    if (connection1Active || connection2Active) {
      const interval = setInterval(() => {
        setDataParticles(prev => {
          // Remove particles that have reached the end
          const filtered = prev.filter(p => 
            (p.direction === 'right' && p.position < 100) || 
            (p.direction === 'left' && p.position > 0)
          );
          
          // Add new particles
          if (connection1Active && Math.random() > 0.6) {
            filtered.push({
              id: Date.now() + Math.random(),
              position: 0,
              direction: 'right'
            });
          }
          
          if (connection2Active && Math.random() > 0.6) {
            filtered.push({
              id: Date.now() + Math.random(),
              position: 100,
              direction: 'left'
            });
          }
          
          // Move existing particles
          return filtered.map(p => ({
            ...p,
            position: p.direction === 'right' 
              ? p.position + 2 + Math.random() * 2 
              : p.position - 2 - Math.random() * 2
          }));
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
    
    return undefined;
  }, [connection1Active, connection2Active]);
  
  // Set up animation sequence when component is visible and not paused
  useEffect(() => {
    if (!isVisible || isPaused) return;
    
    const sequence = async () => {
      // Reset animations when repeating
      setAnimationStep(0);
      setConnection1Active(false);
      setConnection2Active(false);
      setAiProcessing(false);
      setDealMatched(false);
      setDataParticles([]);
      
      // Step 1: LP data flows to AI
      await new Promise(r => setTimeout(r, 1500));
      setAnimationStep(1);
      setConnection1Active(true);
      
      // Step 2: AI processes data
      await new Promise(r => setTimeout(r, 2500));
      setAnimationStep(2);
      setAiProcessing(true);
      
      // Step 3: AI matches to Deals
      await new Promise(r => setTimeout(r, 3000));
      setAnimationStep(3);
      setConnection2Active(true);
      
      // Step 4: Deal matched successfully
      await new Promise(r => setTimeout(r, 2500));
      setAnimationStep(4);
      setDealMatched(true);
      
      // Pause at the end before repeating
      await new Promise(r => setTimeout(r, 5000));
      
      // Reset and repeat
      sequence();
    };
    
    sequence();
  }, [isVisible, isPaused]);
  
  // Detect when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );
    
    const element = visualizationRef.current;
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Filtering state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    dealSize: [10, 100] as [number, number],
    location: ["Chicago"] as string[],
    investorType: ["Institutional"] as string[],
    assetClass: ["Multifamily"] as string[],
    returnProfile: ["Value-Add"] as string[]
  });

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Pause animation when hovered
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Toggle animation pause
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
      {[1, 2, 3, 4].map((step) => (
        <div 
          key={step} 
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            animationStep >= step 
              ? "bg-white/90 w-3" 
              : "bg-white/30"
          )}
        />
      ))}
    </div>
  );
  
  // Tour control handlers
  const startTour = () => {
    setTourStep(1);
    setShowGuidedTour(true);
    setIsPaused(true);
  };
  
  const nextTourStep = () => {
    if (tourStep < 4) {
      setTourStep(tourStep + 1);
    } else {
      setShowGuidedTour(false);
      setTourStep(0);
      setIsPaused(false);
    }
  };
  
  const endTour = () => {
    setShowGuidedTour(false);
    setTourStep(0);
    setIsPaused(false);
  };

  return (
    <div 
      id="platform-visualization"
      ref={visualizationRef}
      className={cn(
        "relative w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden transform transition-all duration-500",
        isHovered ? "shadow-2xl scale-[1.01]" : "shadow-xl",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Updated background with colors matching the site's palette */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#275E91]/90 via-[#5B7B9C]/85 to-[#7A8D79]/80 opacity-95" />
      
      {/* Subtle grid pattern for depth with adjusted opacity */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjhoMnY0em0wIDMwaC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptLTYgMTJoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')]} opacity-10" />
      
      {/* Updated lens flare effect with site's highlight color */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#C9D4DC]/15 blur-3xl"></div>
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/30 opacity-60"></div>
      
      {/* Content container with enhanced layout */}
      <div className="absolute inset-0 flex flex-col items-center text-white p-6 md:p-8 drop-shadow-sm">
        {/* Enhanced header with professional typography */}
        <div className="relative mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-white/95 tracking-tight relative z-10 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-[#C9D4DC] to-[#7A8D79] rounded-full mr-1"></div>
            Capital Match Platform
            <div className="ml-2 relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#7A8D79] rounded-full animate-ping opacity-75"></div>
              <div className="w-2 h-2 bg-[#C9D4DC] rounded-full"></div>
            </div>
          </h3>
          <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>
        
        {/* Capital progress tracker with improved UI */}
        <div className="w-full max-w-md mx-auto mb-6 px-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5">
              <div className="flex justify-center items-center w-4 h-4 rounded-full bg-[#C9D4DC]/20">
                <DollarSign className="w-2.5 h-2.5 text-[#C9D4DC]" />
              </div>
              <span className="text-sm font-medium text-[#C9D4DC]/90">Capital Progress</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-white font-bold">${capitalRaised}M</span>
              <span className="text-white/50 mx-1">/</span>
              <span className="text-white/60">${capitalGoal}M</span>
            </div>
          </div>
          <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full rounded-full"
              style={{ 
                width: `${(capitalRaised / capitalGoal) * 100}%`,
                background: "linear-gradient(90deg, rgba(122,141,121,0.7) 0%, rgba(122,141,121,0.8) 100%)"
              }}
            >
              <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-white/20"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-white/60 mt-2">
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3 text-white/40" />
              <span>Target: {targetDate}</span>
            </div>
            <div className="font-medium">{Math.round((capitalRaised / capitalGoal) * 100)}% Complete</div>
          </div>
        </div>
        
        {/* Enhanced visualizer with improved layout and professional design */}
        <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 relative">
          {/* LP Profiles with refined design */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 1 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-full mb-3 flex items-center justify-center transition-all duration-500 relative",
              animationStep === 1 ? "ring-2 ring-[#C9D4DC]/50 shadow-[0_0_15px_rgba(201,212,220,0.3)] scale-110" : "",
            )}>
              <div className="w-full h-full rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-filter backdrop-blur-sm backdrop-saturate-150 border border-white/20 overflow-hidden flex items-center justify-center">
                <UserRound className="w-8 h-8 md:w-10 md:h-10 text-white/90 drop-shadow" />
                
                {/* Data flow indicator with updated color */}
                {animationStep === 1 && (
                  <div className="absolute -right-1 -top-1 w-5 h-5 bg-gradient-to-br from-[#7A8D79] to-[#5B7B9C] rounded-full flex items-center justify-center shadow-lg">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              {/* Enhanced pulse effect with site colors */}
              {animationStep === 1 && (
                <>
                  <div className="absolute inset-0 rounded-full bg-[#7A8D79]/10 blur-xl animate-pulse-slow"></div>
                  <div className="absolute inset-0 rounded-full bg-white/5 animate-ping opacity-30 duration-1000"></div>
                </>
              )}
            </div>
            
            <span className={cn(
              "text-sm font-medium transition-all duration-300 mb-1.5",
              animationStep === 1 ? "text-white/95 scale-105" : "text-white/70"
            )}>
              LP Profiles
            </span>
            
            {/* Refined data indicators with secondary color */}
            <div className="flex flex-col gap-1 mb-2 w-24 md:w-28">
              <div className={cn(
                "h-1 w-full rounded-full transition-all duration-500",
                animationStep === 1 ? "bg-gradient-to-r from-[#7A8D79] to-[#5B7B9C]" : "bg-white/20"
              )}></div>
              <div className={cn(
                "h-1 w-3/4 rounded-full transition-all duration-500 delay-75",
                animationStep === 1 ? "bg-gradient-to-r from-[#7A8D79] to-[#5B7B9C]" : "bg-white/20"
              )}></div>
              <div className={cn(
                "h-1 w-5/6 rounded-full transition-all duration-500 delay-150",
                animationStep === 1 ? "bg-gradient-to-r from-[#7A8D79] to-[#5B7B9C]" : "bg-white/20"
              )}></div>
            </div>
            
            {/* LP details card with refined design using site colors */}
            <div className={cn(
              "mt-1 opacity-0 transition-all duration-500 transform scale-95",
              animationStep === 1 ? "opacity-100 translate-y-0 scale-100" : "translate-y-4"
            )}>
              <div className="px-3 py-2 rounded-lg bg-[#F5F5EF]/10 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-center gap-1 justify-center text-xs">
                  <ArrowUpRight className="w-3 h-3 text-[#2E7D32]" />
                  <span className="text-[#2E7D32] font-medium">IRR: 18%+</span>
                </div>
                <div className="text-[11px] mt-1 font-medium">{lpName}</div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-[#C9D4DC] mt-1 font-medium">
                  <DollarSign className="w-2.5 h-2.5" />
                  <span>${lpCommitment}M committed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connection line 1 with colors that match the site */}
          <div className="flex-1 flex items-center justify-center py-2">
            <div className="w-full h-1 bg-white/10 relative rounded-full overflow-hidden shadow-inner">
              {connection1Active && (
                <>
                  <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#C9D4DC] to-[#7A8D79] animate-[grow_3s_ease-in-out_infinite]"></div>
                  <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                </>
              )}
              
              {/* Enhanced data particles with site's colors */}
              {dataParticles
                .filter(p => p.direction === 'right')
                .map(particle => (
                  <div 
                    key={particle.id}
                    className="absolute top-1/2 -translate-y-1/2 rounded-full shadow-[0_0_5px_rgba(122,141,121,0.7)]"
                    style={{
                      left: `${particle.position}%`,
                      width: Math.max(2, 6 * (1 - Math.abs(particle.position - 50) / 100)),
                      height: Math.max(2, 6 * (1 - Math.abs(particle.position - 50) / 100)),
                      opacity: Math.min(1, (100 - Math.abs(particle.position - 50)) / 40),
                      background: "linear-gradient(90deg, rgba(201,212,220,0.8) 0%, rgba(122,141,121,0.9) 100%)"
                    }}
                  />
                ))
              }
            </div>
          </div>
          
          {/* AI Engine with site's primary blue */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 2 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-20 h-20 md:w-24 md:h-24 rounded-lg mb-3 flex items-center justify-center transition-all duration-500 relative overflow-hidden",
              animationStep === 2 ? "ring-2 ring-[#275E91]/40 shadow-[0_0_15px_rgba(39,94,145,0.3)] scale-110" : ""
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#275E91]/20 to-[#5B7B9C]/10 backdrop-blur-sm"></div>
              
              {/* Enhanced grid background */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              
              {/* Light effect with primary blue */}
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#275E91]/30 to-transparent"></div>
              </div>
              
              <div className="relative z-10 flex items-center justify-center">
                <LineChart className={cn(
                  "w-12 h-12 text-white/90 transition-all duration-500 transform filter drop-shadow-lg",
                  aiProcessing ? "scale-110" : ""
                )} />
              </div>
              
              {/* Enhanced processing animation with primary blue */}
              {aiProcessing && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-lg border border-[#275E91]/30 animate-[pulse_3s_ease-in-out_infinite]"></div>
                    <div className="absolute inset-0 border-2 border-transparent border-t-[#275E91]/40 rounded-lg animate-spin duration-3000"></div>
                  </div>
                  <div className="absolute inset-0 bg-[#275E91]/5 animate-pulse"></div>
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 p-2 z-20 opacity-80">
                    {[...Array(9)].map((_, i) => (
                      <div 
                        key={i}
                        className={`rounded-sm shadow-inner ${i % 3 === 1 ? 'bg-[#275E91]/30' : i % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}
                        style={{
                          animationName: 'pulse',
                          animationDuration: '1.5s',
                          animationTimingFunction: 'ease-in-out',
                          animationIterationCount: 'infinite',
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <span className={cn(
              "text-sm font-medium transition-all duration-300 mb-1.5",
              animationStep === 2 ? "text-white/95 scale-105" : "text-white/70"
            )}>
              AI Matching Engine
            </span>
            
            {/* Enhanced algorithm indicators with site colors */}
            <div className="grid grid-cols-3 gap-1 mb-2 w-28">
              <div className={cn(
                "h-1 rounded-full transition-all duration-500",
                aiProcessing ? "bg-gradient-to-r from-[#2E7D32] to-[#7A8D79]" : "bg-[#2E7D32]/40"
              )}></div>
              <div className={cn(
                "h-1 rounded-full transition-all duration-500 delay-75",
                aiProcessing ? "bg-gradient-to-r from-[#275E91] to-[#5B7B9C]" : "bg-[#275E91]/40"
              )}></div>
              <div className={cn(
                "h-1 rounded-full transition-all duration-500 delay-150",
                aiProcessing ? "bg-gradient-to-r from-[#C9D4DC] to-white" : "bg-[#C9D4DC]/40"
              )}></div>
            </div>
            
            {/* Algorithm details with site colors */}
            <div className={cn(
              "mt-1 opacity-0 transition-all duration-500 transform scale-95",
              animationStep === 2 ? "opacity-100 translate-y-0 scale-100" : "translate-y-4"
            )}>
              <div className="px-3 py-2 rounded-lg bg-[#F5F5EF]/10 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full bg-[#275E91]/30 flex items-center justify-center">
                    <Search className="w-2 h-2 text-[#275E91]" />
                  </div>
                  <span className="text-[#C9D4DC]">Analyzing criteria</span>
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]/60 animate-pulse"></div>
                  <span>128 parameters processed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connection line 2 with success/strong indicator color */}
          <div className="flex-1 flex items-center justify-center py-2">
            <div className="w-full h-1 bg-white/10 relative rounded-full overflow-hidden shadow-inner">
              {connection2Active && (
                <>
                  <div className="absolute right-0 top-0 h-full bg-gradient-to-l from-[#2E7D32] to-[#7A8D79] animate-[grow-reverse_3s_ease-in-out_infinite]"></div>
                  <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                </>
              )}
              
              {/* Enhanced data particles with success color */}
              {dataParticles
                .filter(p => p.direction === 'left')
                .map(particle => (
                  <div 
                    key={particle.id}
                    className="absolute top-1/2 -translate-y-1/2 rounded-full shadow-[0_0_5px_rgba(46,125,50,0.7)]"
                    style={{
                      left: `${particle.position}%`,
                      width: Math.max(2, 6 * (1 - Math.abs(particle.position - 50) / 100)),
                      height: Math.max(2, 6 * (1 - Math.abs(particle.position - 50) / 100)),
                      opacity: Math.min(1, (100 - Math.abs(particle.position - 50)) / 40),
                      background: "linear-gradient(90deg, rgba(122,141,121,0.8) 0%, rgba(46,125,50,0.9) 100%)"
                    }}
                  />
                ))
              }
            </div>
          </div>
          
          {/* Deals visualizer with success/strong color */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 3 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-lg mb-3 flex items-center justify-center transition-all duration-500 relative overflow-hidden",
              animationStep === 3 || animationStep === 4 ? "ring-2 ring-[#2E7D32]/40 shadow-[0_0_15px_rgba(46,125,50,0.3)] scale-110" : ""
            )}>
              <div className={cn(
                "w-full h-full flex items-center justify-center relative backdrop-blur-sm border border-white/10 bg-gradient-to-br",
                dealMatched 
                  ? "from-[#2E7D32]/20 to-[#7A8D79]/10" 
                  : "from-white/10 to-white/5"
              )}>
                <Building2 className="w-8 h-8 md:w-10 md:h-10 text-white/90 drop-shadow" />
                
                {/* Success indicator with strong color */}
                {dealMatched && (
                  <div className="absolute -right-1 -top-1 w-5 h-5 bg-gradient-to-br from-[#2E7D32] to-[#7A8D79] rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              {/* Success effect with strong color */}
              {dealMatched && (
                <>
                  <div className="absolute inset-0 rounded-lg bg-[#2E7D32]/5 blur-xl animate-pulse-slow"></div>
                  <div className="absolute inset-0 rounded-lg bg-[#2E7D32]/5 animate-ping opacity-30 duration-1000"></div>
                </>
              )}
            </div>
            
            <span className={cn(
              "text-sm font-medium transition-all duration-300 mb-1.5",
              animationStep === 3 || animationStep === 4 ? "text-white/95 scale-105" : "text-white/70"
            )}>
              Deal Proposals
            </span>
            
            {/* Refined deal indicators with success color */}
            <div className="flex flex-col gap-1 mb-2 w-24 md:w-28">
              <div className={cn(
                "h-1 w-full rounded-full transition-all duration-500",
                dealMatched ? "bg-gradient-to-r from-[#2E7D32] to-[#7A8D79]" : animationStep === 3 ? "bg-white/70" : "bg-white/20" 
              )}></div>
              <div className={cn(
                "h-1 w-4/5 rounded-full transition-all duration-500 delay-75",
                dealMatched ? "bg-gradient-to-r from-[#2E7D32] to-[#7A8D79]" : animationStep === 3 ? "bg-white/70" : "bg-white/20"
              )}></div>
              <div className={cn(
                "h-1 w-2/3 rounded-full transition-all duration-500 delay-150",
                dealMatched ? "bg-gradient-to-r from-[#2E7D32] to-[#7A8D79]" : animationStep === 3 ? "bg-white/70" : "bg-white/20"
              )}></div>
            </div>
            
            {/* Deal details with site colors */}
            <div className={cn

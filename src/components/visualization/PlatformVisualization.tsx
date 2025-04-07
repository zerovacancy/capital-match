
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
      {/* Enhanced background with modern gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A365D] via-[#275E91] to-[#2D3748] opacity-95" />
      
      {/* Subtle grid pattern for depth */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjhoMnY0em0wIDMwaC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptLTYgMTJoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')]} opacity-15" />
      
      {/* Lens flare effect in top right */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#89CFF0]/10 blur-3xl"></div>
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/30 opacity-60"></div>
      
      {/* Content container with enhanced layout */}
      <div className="absolute inset-0 flex flex-col items-center text-white p-6 md:p-8 drop-shadow-sm">
        {/* Enhanced header with professional typography */}
        <div className="relative mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-white/95 tracking-tight relative z-10 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-amber-200 to-amber-500 rounded-full mr-1"></div>
            Capital Match Platform
            <div className="ml-2 relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-75"></div>
              <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
            </div>
          </h3>
          <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>
        
        {/* Capital progress tracker with improved UI */}
        <div className="w-full max-w-md mx-auto mb-6 px-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5">
              <div className="flex justify-center items-center w-4 h-4 rounded-full bg-amber-400/20">
                <DollarSign className="w-2.5 h-2.5 text-amber-300" />
              </div>
              <span className="text-sm font-medium text-amber-200/90">Capital Progress</span>
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
                background: "linear-gradient(90deg, rgba(251,191,36,0.7) 0%, rgba(245,158,11,0.8) 100%)"
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
              animationStep === 1 ? "ring-2 ring-amber-200/50 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-110" : "",
            )}>
              <div className="w-full h-full rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-filter backdrop-blur-sm backdrop-saturate-150 border border-white/20 overflow-hidden flex items-center justify-center">
                <UserRound className="w-8 h-8 md:w-10 md:h-10 text-white/90 drop-shadow" />
                
                {/* Data flow indicator */}
                {animationStep === 1 && (
                  <div className="absolute -right-1 -top-1 w-5 h-5 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              {/* Enhanced pulse effect */}
              {animationStep === 1 && (
                <>
                  <div className="absolute inset-0 rounded-full bg-amber-400/5 blur-xl animate-pulse-slow"></div>
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
            
            {/* Refined data indicators */}
            <div className="flex flex-col gap-1 mb-2 w-24 md:w-28">
              <div className={cn(
                "h-1 w-full rounded-full transition-all duration-500",
                animationStep === 1 ? "bg-gradient-to-r from-amber-200 to-amber-400" : "bg-white/20"
              )}></div>
              <div className={cn(
                "h-1 w-3/4 rounded-full transition-all duration-500 delay-75",
                animationStep === 1 ? "bg-gradient-to-r from-amber-200 to-amber-400" : "bg-white/20"
              )}></div>
              <div className={cn(
                "h-1 w-5/6 rounded-full transition-all duration-500 delay-150",
                animationStep === 1 ? "bg-gradient-to-r from-amber-200 to-amber-400" : "bg-white/20"
              )}></div>
            </div>
            
            {/* LP details card with refined design */}
            <div className={cn(
              "mt-1 opacity-0 transition-all duration-500 transform scale-95",
              animationStep === 1 ? "opacity-100 translate-y-0 scale-100" : "translate-y-4"
            )}>
              <div className="px-3 py-2 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-center gap-1 justify-center text-xs">
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">IRR: 18%+</span>
                </div>
                <div className="text-[11px] mt-1 font-medium">{lpName}</div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-amber-200 mt-1 font-medium">
                  <DollarSign className="w-2.5 h-2.5" />
                  <span>${lpCommitment}M committed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connection line 1 with enhanced particles */}
          <div className="flex-1 flex items-center justify-center py-2">
            <div className="w-full h-1 bg-white/10 relative rounded-full overflow-hidden shadow-inner">
              {connection1Active && (
                <>
                  <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-200 to-amber-400 animate-[grow_3s_ease-in-out_infinite]"></div>
                  <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                </>
              )}
              
              {/* Enhanced data particles */}
              {dataParticles
                .filter(p => p.direction === 'right')
                .map(particle => (
                  <div 
                    key={particle.id}
                    className="absolute top-1/2 -translate-y-1/2 rounded-full shadow-[0_0_5px_rgba(251,191,36,0.7)]"
                    style={{
                      left: `${particle.position}%`,
                      width: Math.max(2, 6 * (1 - Math.abs(particle.position - 50) / 100)),
                      height: Math.max(2, 6 * (1 - Math.abs(particle.position - 50) / 100)),
                      opacity: Math.min(1, (100 - Math.abs(particle.position - 50)) / 40),
                      background: "linear-gradient(90deg, rgba(251,191,36,0.8) 0%, rgba(245,158,11,0.9) 100%)"
                    }}
                  />
                ))
              }
            </div>
          </div>
          
          {/* AI Engine with enhanced visuals */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 2 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-20 h-20 md:w-24 md:h-24 rounded-lg mb-3 flex items-center justify-center transition-all duration-500 relative overflow-hidden",
              animationStep === 2 ? "ring-2 ring-[#3B82F6]/40 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-110" : ""
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#2563EB]/10 backdrop-blur-sm"></div>
              
              {/* Enhanced grid background */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              
              {/* Light effect */}
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#2563EB]/30 to-transparent"></div>
              </div>
              
              <div className="relative z-10 flex items-center justify-center">
                <LineChart className={cn(
                  "w-12 h-12 text-white/90 transition-all duration-500 transform filter drop-shadow-lg",
                  aiProcessing ? "scale-110" : ""
                )} />
              </div>
              
              {/* Enhanced processing animation */}
              {aiProcessing && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-lg border border-[#3B82F6]/30 animate-[pulse_3s_ease-in-out_infinite]"></div>
                    <div className="absolute inset-0 border-2 border-transparent border-t-[#3B82F6]/40 rounded-lg animate-spin duration-3000"></div>
                  </div>
                  <div className="absolute inset-0 bg-[#3B82F6]/5 animate-pulse"></div>
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 p-2 z-20 opacity-80">
                    {[...Array(9)].map((_, i) => (
                      <div 
                        key={i}
                        className={`rounded-sm shadow-inner ${i % 3 === 1 ? 'bg-[#3B82F6]/30' : i % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}
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
            
            {/* Enhanced algorithm indicators */}
            <div className="grid grid-cols-3 gap-1 mb-2 w-28">
              <div className={cn(
                "h-1 rounded-full transition-all duration-500",
                aiProcessing ? "bg-gradient-to-r from-emerald-400 to-emerald-500" : "bg-emerald-400/40"
              )}></div>
              <div className={cn(
                "h-1 rounded-full transition-all duration-500 delay-75",
                aiProcessing ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB]" : "bg-[#3B82F6]/40"
              )}></div>
              <div className={cn(
                "h-1 rounded-full transition-all duration-500 delay-150",
                aiProcessing ? "bg-gradient-to-r from-amber-400 to-amber-500" : "bg-amber-400/40"
              )}></div>
            </div>
            
            {/* Algorithm details with refined design */}
            <div className={cn(
              "mt-1 opacity-0 transition-all duration-500 transform scale-95",
              animationStep === 2 ? "opacity-100 translate-y-0 scale-100" : "translate-y-4"
            )}>
              <div className="px-3 py-2 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full bg-[#3B82F6]/30 flex items-center justify-center">
                    <Search className="w-2 h-2 text-[#60A5FA]" />
                  </div>
                  <span className="text-[#60A5FA]">Analyzing criteria</span>
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse"></div>
                  <span>128 parameters processed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connection line 2 with enhanced particles */}
          <div className="flex-1 flex items-center justify-center py-2">
            <div className="w-full h-1 bg-white/10 relative rounded-full overflow-hidden shadow-inner">
              {connection2Active && (
                <>
                  <div className="absolute right-0 top-0 h-full bg-gradient-to-l from-emerald-400 to-emerald-600 animate-[grow-reverse_3s_ease-in-out_infinite]"></div>
                  <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                </>
              )}
              
              {/* Enhanced data particles */}
              {dataParticles
                .filter(p => p.direction === 'left')
                .map(particle => (
                  <div 
                    key={particle.id}
                    className="absolute top-1/2 -translate-y-1/2 rounded-full shadow-[0_0_5px_rgba(52,211,153,0.7)]"
                    style={{
                      left: `${particle.position}%`,
                      width: Math.max(2, 6 * (1 - Math.abs(particle.position - 50) / 100)),
                      height: Math.max(2, 6 * (1 - Math.abs(particle.position - 50) / 100)),
                      opacity: Math.min(1, (100 - Math.abs(particle.position - 50)) / 40),
                      background: "linear-gradient(90deg, rgba(52,211,153,0.8) 0%, rgba(16,185,129,0.9) 100%)"
                    }}
                  />
                ))
              }
            </div>
          </div>
          
          {/* Deals visualizer with enhanced design */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 3 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-lg mb-3 flex items-center justify-center transition-all duration-500 relative overflow-hidden",
              animationStep === 3 || animationStep === 4 ? "ring-2 ring-emerald-400/40 shadow-[0_0_15px_rgba(52,211,153,0.3)] scale-110" : ""
            )}>
              <div className={cn(
                "w-full h-full flex items-center justify-center relative backdrop-blur-sm border border-white/10 bg-gradient-to-br",
                dealMatched 
                  ? "from-emerald-500/20 to-emerald-600/10" 
                  : "from-white/10 to-white/5"
              )}>
                <Building2 className="w-8 h-8 md:w-10 md:h-10 text-white/90 drop-shadow" />
                
                {/* Success indicator */}
                {dealMatched && (
                  <div className="absolute -right-1 -top-1 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              {/* Success effect */}
              {dealMatched && (
                <>
                  <div className="absolute inset-0 rounded-lg bg-emerald-400/5 blur-xl animate-pulse-slow"></div>
                  <div className="absolute inset-0 rounded-lg bg-emerald-500/5 animate-ping opacity-30 duration-1000"></div>
                </>
              )}
            </div>
            
            <span className={cn(
              "text-sm font-medium transition-all duration-300 mb-1.5",
              animationStep === 3 || animationStep === 4 ? "text-white/95 scale-105" : "text-white/70"
            )}>
              Deal Proposals
            </span>
            
            {/* Refined deal indicators */}
            <div className="flex flex-col gap-1 mb-2 w-24 md:w-28">
              <div className={cn(
                "h-1 w-full rounded-full transition-all duration-500",
                dealMatched ? "bg-gradient-to-r from-emerald-400 to-emerald-500" : animationStep === 3 ? "bg-white/70" : "bg-white/20" 
              )}></div>
              <div className={cn(
                "h-1 w-4/5 rounded-full transition-all duration-500 delay-75",
                dealMatched ? "bg-gradient-to-r from-emerald-400 to-emerald-500" : animationStep === 3 ? "bg-white/70" : "bg-white/20"
              )}></div>
              <div className={cn(
                "h-1 w-2/3 rounded-full transition-all duration-500 delay-150",
                dealMatched ? "bg-gradient-to-r from-emerald-400 to-emerald-500" : animationStep === 3 ? "bg-white/70" : "bg-white/20"
              )}></div>
            </div>
            
            {/* Deal details with refined design */}
            <div className={cn(
              "mt-1 opacity-0 transition-all duration-500 transform scale-95",
              animationStep >= 3 ? "opacity-100 translate-y-0 scale-100" : "translate-y-4"
            )}>
              <div className="px-3 py-2 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="text-[11px] font-medium mb-1">{dealName}</div>
                <div className="flex items-center gap-1 justify-center text-xs">
                  <ArrowDownRight className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300">Low Risk</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[11px] mt-1">
                  <span className={cn(
                    "transition-all duration-500 font-medium",
                    dealMatched ? "text-emerald-400" : "text-white/70"
                  )}>
                    Match: {dealMatched ? (
                      <span className="relative">
                        98%
                        <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                      </span>
                    ) : "..."}
                  </span>
                </div>
                <div className="flex items-center gap-1 justify-center text-[10px] text-amber-200 mt-1 font-medium">
                  <DollarSign className="w-2.5 h-2.5" />
                  <span>${dealCapitalNeed}M needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced status panel with modern design */}
        <div className="mt-3 h-10 relative w-full max-w-md mx-auto">
          <div className="absolute inset-x-0 -top-4 h-4 bg-gradient-to-b from-transparent to-[#1A365D]/70"></div>
          <Card className="bg-black/30 backdrop-blur-md border-white/5 shadow-lg h-full relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-300/70 via-[#3B82F6]/70 to-emerald-400/70"></div>
            <div className="h-full flex items-center px-4">
              <p className={cn(
                "text-xs font-medium transition-all duration-1000 relative z-10 flex items-center gap-2 w-full justify-center",
                animationStep === 0 ? "opacity-100" : "opacity-0 absolute inset-0 items-center"
              )}>
                <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-pulse"></span>
                <span className="text-white/90">Initializing capital matching algorithm...</span>
              </p>
              <p className={cn(
                "text-xs font-medium transition-all duration-1000 relative z-10 flex items-center gap-2 w-full justify-center",
                animationStep === 1 ? "opacity-100" : "opacity-0 absolute inset-0 items-center"
              )}>
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                <span className="text-white/90">Processing <span className="text-amber-300 font-semibold">Walton Street Capital</span> investment criteria</span>
              </p>
              <p className={cn(
                "text-xs font-medium transition-all duration-1000 relative z-10 flex items-center gap-2 w-full justify-center",
                animationStep === 2 ? "opacity-100" : "opacity-0 absolute inset-0 items-center"
              )}>
                <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-pulse"></span>
                <span className="text-white/90">Matching to <span className="text-amber-300 font-semibold">Chicago properties</span> with <span className="text-[#60A5FA] font-bold">128</span> parameters</span>
              </p>
              <p className={cn(
                "text-xs font-medium transition-all duration-1000 relative z-10 flex items-center gap-2 w-full justify-center",
                animationStep === 3 ? "opacity-100" : "opacity-0 absolute inset-0 items-center"
              )}>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-white/90">Analyzing <span className="text-amber-300 font-semibold">Triangle Square</span> risk & return profile</span>
              </p>
              <p className={cn(
                "text-xs font-medium transition-all duration-1000 relative z-10 flex items-center gap-2 w-full justify-center",
                animationStep === 4 ? "opacity-100" : "opacity-0 absolute inset-0 items-center"
              )}>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-white/90">
                  <span className="text-emerald-400 font-semibold">98% match</span> aligned with <span className="text-amber-300 font-semibold">LG Development's</span> goals
                </span>
              </p>
            </div>
          </Card>
        </div>
        
        {/* Progress indicator */}
        <ProgressIndicator />

        {/* Controls */}
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
          <button
            onClick={togglePause}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/80 transition-all hover:bg-black/40 hover:text-white"
            title={isPaused ? "Resume Animation" : "Pause Animation"}
          >
            {isPaused ? (
              <Play className="w-4 h-4 ml-0.5" />
            ) : (
              <PauseCircle className="w-4 h-4" />
            )}
          </button>
          
          <button 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-xs font-medium text-white/80 transition-all hover:bg-black/40 hover:text-white"
            onClick={startTour}
          >
            <HelpCircle className="w-3 h-3" />
            Guided Tour
          </button>
          
          {/* Tour Overlay with enhanced design */}
          {showGuidedTour && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={endTour}></div>
              
              {/* Tour Content with refined design */}
              <div className="max-w-md w-full bg-gradient-to-br from-[#1A365D]/95 to-[#1E3A8A]/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-5 relative z-10 text-white">
                <div className="absolute -top-2 -right-2">
                  <button 
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors shadow-lg"
                    onClick={endTour}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400/20">
                    <Play className="w-3 h-3 text-amber-300 ml-0.5" />
                  </div>
                  {tourStep === 1 && "LP Investment Profiles"}
                  {tourStep === 2 && "AI Matching Algorithm"}
                  {tourStep === 3 && "Deal Analysis"}
                  {tourStep === 4 && "Match Confirmation"}
                </h3>
                
                <div className="mb-4 text-sm text-white/80 bg-white/5 p-3 rounded-lg border border-white/10">
                  {tourStep === 1 && (
                    <p>
                      Our Capital Match platform begins by analyzing sophisticated <span className="text-amber-300 font-medium">LP profiles</span>. 
                      The system processes detailed investment criteria from {lpName}, 
                      including Chicago market preference and a substantial ${lpCommitment}M commitment allocation.
                    </p>
                  )}
                  
                  {tourStep === 2 && (
                    <p>
                      The <span className="text-[#60A5FA] font-medium">AI Matching Engine</span> processes over 128 data points 
                      from each property and investor profile. This includes comprehensive location analytics, 
                      risk tolerance assessments, return expectations, asset class preferences, and historical investment patterns.
                    </p>
                  )}
                  
                  {tourStep === 3 && (
                    <p>
                      Our platform identifies <span className="text-amber-300 font-medium">{dealName}</span> as a potential match 
                      based on precise alignment with {lpName}'s investment criteria. 
                      The algorithm evaluates multiple risk factors and capital requirements in real-time through our proprietary assessment model.
                    </p>
                  )}
                  
                  {tourStep === 4 && (
                    <p>
                      The platform confirms a <span className="text-emerald-400 font-medium">98% match score</span>, indicating 
                      exceptional alignment between investor criteria and project characteristics. 
                      This precise matching enables LG Development to approach investors with 
                      opportunities specifically calibrated to their investment parameters.
                    </p>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(step => (
                      <div 
                        key={step}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          tourStep >= step 
                            ? "bg-amber-400" 
                            : "bg-white/20"
                        )}
                      />
                    ))}
                  </div>
                  
                  <button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-500/20 backdrop-blur-sm border border-amber-400/30 text-xs font-medium text-white transition-all hover:bg-amber-400/30 shadow-lg"
                    onClick={nextTourStep}
                  >
                    {tourStep < 4 ? (
                      <>
                        Next <ChevronRight className="w-3 h-3" />
                      </>
                    ) : (
                      "Complete Tour"
                    )}
                  </button>
                </div>
              </div>
              
              {/* Highlight Indicators */}
              {tourStep === 1 && (
                <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-2 border-amber-300 animate-pulse z-20"></div>
              )}
              
              {tourStep === 2 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-lg border-2 border-[#60A5FA] animate-pulse z-20"></div>
              )}
              
              {tourStep === 3 && (
                <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-lg border-2 border-amber-300 animate-pulse z-20"></div>
              )}
              
              {tourStep === 4 && (
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-[80%] h-16 rounded-lg border-2 border-emerald-400 animate-pulse z-20"></div>
              )}
            </div>
          )}
        </div>
        
        {/* Filtering Controls with enhanced design */}
        {showFilters && (
          <div className="absolute left-3 top-3 z-20">
            <button 
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm border text-xs font-medium transition-all",
                filtersOpen 
                  ? "bg-black/40 border-white/20 text-white shadow-lg" 
                  : "bg-black/30 border-white/10 text-white/80 hover:bg-black/40 hover:text-white"
              )}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="w-3 h-3" />
              Filters
              {filtersOpen ? (
                <X className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
            
            {filtersOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 p-3 rounded-lg bg-[#1A365D]/95 backdrop-blur-md shadow-xl border border-white/10 text-white text-xs animate-in slide-in-from-top-2 duration-200">
                {/* Deal Size Filter */}
                <div className="mb-3">
                  <div className="flex items-center mb-1.5 font-medium">
                    <div className="w-4 h-4 rounded-full bg-amber-400/20 flex items-center justify-center mr-1.5">
                      <DollarSign className="w-2.5 h-2.5 text-amber-300" />
                    </div>
                    Deal Size ($ millions)
                  </div>
                  <div className="flex items-center justify-between bg-black/20 p-2 rounded-lg">
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={filters.dealSize[0]}
                      onChange={(e) => handleFilterChange('dealSize', [parseInt(e.target.value), filters.dealSize[1]])}
                      className="w-24 accent-amber-400"
                    />
                    <span className="text-amber-300 font-medium">${filters.dealSize[0]}M - ${filters.dealSize[1]}M</span>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={filters.dealSize[1]}
                      onChange={(e) => handleFilterChange('dealSize', [filters.dealSize[0], parseInt(e.target.value)])}
                      className="w-24 accent-amber-400"
                    />
                  </div>
                </div>
                
                {/* Location Filter */}
                <div className="mb-3">
                  <div className="flex items-center mb-1.5 font-medium">
                    <div className="w-4 h-4 rounded-full bg-amber-400/20 flex items-center justify-center mr-1.5">
                      <MapPin className="w-2.5 h-2.5 text-amber-300" />
                    </div>
                    Location
                  </div>
                  <div className="flex flex-wrap gap-1.5 bg-black/20 p-2 rounded-lg">
                    {["Chicago", "Milwaukee", "Indianapolis", "Detroit"].map((city) => (
                      <button
                        key={city}
                        className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-medium border transition-colors",
                          filters.location.includes(city) 
                            ? "bg-amber-400/20 border-amber-400/40 text-white" 
                            : "bg-black/30 border-white/10 text-white/70 hover:bg-black/40"
                        )}
                        onClick={() => {
                          const newLocations = filters.location.includes(city)
                            ? filters.location.filter(c => c !== city)
                            : [...filters.location, city];
                          handleFilterChange('location', newLocations);
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Investor Type Filter */}
                <div className="mb-3">
                  <div className="flex items-center mb-1.5 font-medium">
                    <div className="w-4 h-4 rounded-full bg-amber-400/20 flex items-center justify-center mr-1.5">
                      <Users className="w-2.5 h-2.5 text-amber-300" />
                    </div>
                    Investor Type
                  </div>
                  <div className="flex flex-wrap gap-1.5 bg-black/20 p-2 rounded-lg">
                    {["Institutional", "Family Office", "Private Equity", "HNWI"].map((type) => (
                      <button
                        key={type}
                        className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-medium border transition-colors",
                          filters.investorType.includes(type) 
                            ? "bg-amber-400/20 border-amber-400/40 text-white" 
                            : "bg-black/30 border-white/10 text-white/70 hover:bg-black/40"
                        )}
                        onClick={() => {
                          const newTypes = filters.investorType.includes(type)
                            ? filters.investorType.filter(t => t !== type)
                            : [...filters.investorType, type];
                          handleFilterChange('investorType', newTypes);
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Asset Class Filter */}
                <div className="mb-3">
                  <div className="flex items-center mb-1.5 font-medium">
                    <div className="w-4 h-4 rounded-full bg-amber-400/20 flex items-center justify-center mr-1.5">
                      <Building className="w-2.5 h-2.5 text-amber-300" />
                    </div>
                    Asset Class
                  </div>
                  <div className="flex flex-wrap gap-1.5 bg-black/20 p-2 rounded-lg">
                    {["Multifamily", "Mixed-Use", "Office", "Retail", "Industrial"].map((asset) => (
                      <button
                        key={asset}
                        className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-medium border transition-colors",
                          filters.assetClass.includes(asset) 
                            ? "bg-amber-400/20 border-amber-400/40 text-white" 
                            : "bg-black/30 border-white/10 text-white/70 hover:bg-black/40"
                        )}
                        onClick={() => {
                          const newAssets = filters.assetClass.includes(asset)
                            ? filters.assetClass.filter(a => a !== asset)
                            : [...filters.assetClass, asset];
                          handleFilterChange('assetClass', newAssets);
                        }}
                      >
                        {asset}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Return Profile Filter */}
                <div>
                  <div className="flex items-center mb-1.5 font-medium">
                    <div className="w-4 h-4 rounded-full bg-amber-400/20 flex items-center justify-center mr-1.5">
                      <BarChart3 className="w-2.5 h-2.5 text-amber-300" />
                    </div>
                    Return Profile
                  </div>
                  <div className="flex flex-wrap gap-1.5 bg-black/20 p-2 rounded-lg">
                    {["Core", "Core-Plus", "Value-Add", "Opportunistic"].map((profile) => (
                      <button
                        key={profile}
                        className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-medium border transition-colors",
                          filters.returnProfile.includes(profile) 
                            ? "bg-amber-400/20 border-amber-400/40 text-white" 
                            : "bg-black/30 border-white/10 text-white/70 hover:bg-black/40"
                        )}
                        onClick={() => {
                          const newProfiles = filters.returnProfile.includes(profile)
                            ? filters.returnProfile.filter(p => p !== profile)
                            : [...filters.returnProfile, profile];
                          handleFilterChange('returnProfile', newProfiles);
                        }}
                      >
                        {profile}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformVisualization;

// Define these animations in src/index.css:
// @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
// @keyframes grow { from { width: 0; } to { width: 100%; } }
// @keyframes grow-reverse { from { width: 0; } to { width: 100%; } }
// @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
// @keyframes pulse-slow { 0% { opacity: 0.4; } 50% { opacity: 0.8; } 100% { opacity: 0.4; } }


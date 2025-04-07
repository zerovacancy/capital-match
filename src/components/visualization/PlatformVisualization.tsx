
import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, UserRound, LineChart, ArrowDownRight, ArrowUpRight, 
  Search, CheckCircle2, Building2, DollarSign, Target,
  Filter, X, ChevronDown, MapPin, Building, Users, BarChart3,
  HelpCircle, Play, PauseCircle, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  
  // Set up animation sequence when component is visible
  useEffect(() => {
    if (!isVisible) return;
    
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
  }, [isVisible]);
  
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

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
      {[1, 2, 3, 4].map((step) => (
        <div 
          key={step} 
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            animationStep >= step 
              ? "bg-white w-3" 
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
  };
  
  const nextTourStep = () => {
    if (tourStep < 4) {
      setTourStep(tourStep + 1);
    } else {
      setShowGuidedTour(false);
      setTourStep(0);
    }
  };
  
  const endTour = () => {
    setShowGuidedTour(false);
    setTourStep(0);
  };

  return (
    <div 
      id="platform-visualization"
      ref={visualizationRef}
      className={cn(
        "relative w-full max-w-4xl aspect-[16/9] rounded-xl shadow-xl overflow-hidden transform transition-all duration-500",
        isHovered ? "scale-[1.02] shadow-2xl" : "",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced background gradient with depth effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#275E91] to-[#C9D4DC] opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(39,94,145,0.5),rgba(201,212,220,0.3))]" />
      
      {/* Enhanced grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjhoMnY0em0wIDMwaC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptLTYgMTJoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')]} opacity-25" />
      
      {/* Advanced background effects */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#275E91]/30 to-transparent"></div>
      
      {/* Enhanced glow effects */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-[#275E91]/30 blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-[#C9D4DC]/30 blur-xl animate-pulse-slow animation-delay-1000"></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-white/5 blur-md animate-pulse-slow animation-delay-1500"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-white/5 blur-lg animate-pulse-slow animation-delay-2000"></div>
      
      {/* Floating particle system */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animation: 'float infinite ease-in-out',
              opacity: Math.random() * 0.5 + 0.2,
              transform: `translateY(0px) translateX(0px)`,
            }}
          />
        ))}
      </div>
      
      {/* Content container with enhanced drop shadow */}
      <div className="absolute inset-0 flex flex-col items-center text-white p-6 md:p-8 drop-shadow-sm">
        <div className="relative">
          <h3 className="text-xl md:text-2xl font-bold mb-1 text-white relative z-10">
            Platform Visualization
            <span className="absolute left-full ml-1 top-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-30"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white/50"></span>
            </span>
          </h3>
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
        
        <p className="max-w-md text-center text-white/90 mb-2 text-sm md:text-base leading-relaxed drop-shadow">
          Leading capital formation for <span className="text-amber-200 font-medium">Chicago's</span> most promising developments
        </p>
        
        {/* Capital Goal Progress Tracker */}
        <div className="w-full max-w-md mx-auto mb-4 px-4">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-amber-200" />
              <span className="text-sm font-medium text-amber-200">Capital Raise Progress</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-white font-bold">${capitalRaised}M</span>
              <span className="text-white/70 mx-1">/</span>
              <span className="text-white/70">${capitalGoal}M</span>
            </div>
          </div>
          <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-200 to-amber-400 rounded-full"
              style={{ width: `${(capitalRaised / capitalGoal) * 100}%` }}
            >
              <div className="h-full w-full bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-white/70 mt-1">
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              <span>Target: {targetDate}</span>
            </div>
            <div>{Math.round((capitalRaised / capitalGoal) * 100)}% Complete</div>
          </div>
        </div>
        
        {/* Enhanced interactive visualization */}
        <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 relative">
          {/* LP Profiles */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 1 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 mb-2 flex items-center justify-center transition-all duration-300 relative",
              animationStep === 1 ? "ring-2 ring-white shadow-lg shadow-white/20 scale-110" : ""
            )}>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#C9D4DC]/30 flex items-center justify-center relative backdrop-blur-sm">
                <UserRound className="w-7 h-7 md:w-8 md:h-8 text-white drop-shadow" />
                {animationStep === 1 && (
                  <div className="absolute -right-1 -top-1 w-4 h-4 bg-white rounded-full flex items-center justify-center animate-pulse">
                    <ArrowRight className="w-3 h-3 text-[#275E91]" />
                  </div>
                )}
              </div>
              
              {/* LP Glow effect */}
              {animationStep === 1 && (
                <div className="absolute inset-0 rounded-full bg-white/5 blur-sm animate-pulse"></div>
              )}
            </div>
            <span className={cn(
              "text-sm font-medium transition-all duration-300",
              animationStep === 1 ? "text-white scale-105" : "text-white/80"
            )}>
              LP Profiles
            </span>
            <div className="flex flex-col gap-1 mt-2 w-24 md:w-28">
              <div className={cn(
                "h-1.5 w-full rounded-full transition-all duration-500",
                animationStep === 1 ? "bg-white" : "bg-white/30"
              )}></div>
              <div className={cn(
                "h-1.5 w-3/4 rounded-full transition-all duration-500 delay-75",
                animationStep === 1 ? "bg-white" : "bg-white/30"
              )}></div>
              <div className={cn(
                "h-1.5 w-5/6 rounded-full transition-all duration-500 delay-150",
                animationStep === 1 ? "bg-white" : "bg-white/30"
              )}></div>
            </div>
            
            {/* LP Criteria Circle with enhanced animation */}
            <div className={cn(
              "mt-2 flex flex-col items-center opacity-0 transition-all duration-500 transform",
              animationStep === 1 ? "opacity-100 translate-y-0" : "translate-y-4"
            )}>
              <div className="px-2 py-1 rounded bg-[#C9D4DC]/20 text-[10px] md:text-xs text-center backdrop-blur-sm border border-white/10 shadow">
                <div className="flex items-center gap-1 justify-center">
                  <ArrowUpRight className="w-3 h-3 text-green-400" />
                  <span>IRR: 18%+</span>
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <Building2 className="w-3 h-3" />
                  <span>{lpName}</span>
                </div>
                <div className="flex items-center gap-1 justify-center text-amber-200">
                  <span>${lpCommitment}M committed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced connection line 1 with flowing data particles */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-1.5 bg-white/20 relative rounded-full overflow-hidden shadow-inner">
              {connection1Active && (
                <>
                  <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-white to-[#275E91] animate-[grow_3s_ease-in-out_infinite]"></div>
                  <div className="absolute left-0 top-0 h-full w-full bg-[#275E91]/20 animate-pulse"></div>
                </>
              )}
              
              {/* Data flow particles */}
              {dataParticles
                .filter(p => p.direction === 'right')
                .map(particle => (
                  <div 
                    key={particle.id}
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50"
                    style={{
                      left: `${particle.position}%`,
                      opacity: Math.min(1, (100 - Math.abs(particle.position - 50)) / 50),
                      transform: `translateY(-50%) scale(${Math.min(1, (100 - Math.abs(particle.position - 50)) / 100)})`,
                    }}
                  />
                ))
              }
            </div>
          </div>
          
          {/* AI matching engine in the middle with enhanced effects */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 2 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-20 h-20 md:w-24 md:h-24 rounded-lg bg-[#C9D4DC]/30 mb-2 flex items-center justify-center relative overflow-hidden transition-all duration-300",
              animationStep === 2 ? "ring-2 ring-[#275E91] shadow-lg shadow-[#275E91]/20 scale-110" : ""
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#275E91]/40 to-[#C9D4DC]/30 backdrop-blur-sm"></div>
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#275E91]/30 to-transparent"></div>
              </div>
              <LineChart className={cn(
                "w-10 h-10 md:w-12 md:h-12 text-white transition-all duration-500 transform relative z-10 drop-shadow",
                aiProcessing ? "scale-110 drop-shadow-lg" : ""
              )} />
              
              {/* Enhanced processing animation with depth effects */}
              {aiProcessing && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-lg border border-[#275E91]/40 animate-[pulse_2s_ease-in-out_infinite]"></div>
                  </div>
                  <div className="absolute inset-0 bg-[#275E91]/10 animate-pulse opacity-50"></div>
                  <div className="absolute inset-y-2 inset-x-2 grid grid-cols-3 grid-rows-3 gap-1 z-10 opacity-70">
                    {[...Array(9)].map((_, i) => (
                      <div 
                        key={i}
                        className={`${i % 3 === 0 ? 'bg-[#275E91]/40' : 'bg-white/30'} rounded-sm shadow-inner`}
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
                  
                  {/* Rotating analyzer effect */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full rounded-lg border-4 border-transparent border-t-white/20 animate-spin"></div>
                    <div className="w-8 h-8 rounded-full bg-[#275E91]/20 animate-ping"></div>
                  </div>
                </>
              )}
            </div>
            <span className={cn(
              "text-sm font-medium transition-all duration-300",
              animationStep === 2 ? "text-white scale-105" : "text-white/80"
            )}>
              AI Matching Engine
            </span>
            <div className="grid grid-cols-3 gap-1 mt-2">
              <div className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                aiProcessing ? "bg-green-400" : "bg-green-400/40"
              )}></div>
              <div className={cn(
                "h-1.5 rounded-full transition-all duration-500 delay-75",
                aiProcessing ? "bg-[#C9D4DC]" : "bg-[#C9D4DC]/40"
              )}></div>
              <div className={cn(
                "h-1.5 rounded-full transition-all duration-500 delay-150",
                aiProcessing ? "bg-[#7A8D79]" : "bg-[#7A8D79]/40"
              )}></div>
            </div>
            
            {/* Algorithm Details with enhanced animation */}
            <div className={cn(
              "mt-2 flex flex-col items-center opacity-0 transition-all duration-500 transform",
              animationStep === 2 ? "opacity-100 translate-y-0" : "translate-y-4"
            )}>
              <div className="px-2 py-1 rounded bg-[#C9D4DC]/20 text-[10px] md:text-xs backdrop-blur-sm border border-white/10 shadow">
                <div className="flex items-center gap-1">
                  <Search className="w-3 h-3" />
                  <span>Analyzing criteria...</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced connection line 2 with flowing data particles */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-1.5 bg-white/20 relative rounded-full overflow-hidden shadow-inner">
              {connection2Active && (
                <>
                  <div className="absolute right-0 top-0 h-full bg-gradient-to-l from-white to-[#275E91] animate-[grow-reverse_3s_ease-in-out_infinite]"></div>
                  <div className="absolute right-0 top-0 h-full w-full bg-[#275E91]/20 animate-pulse"></div>
                </>
              )}
              
              {/* Data flow particles */}
              {dataParticles
                .filter(p => p.direction === 'left')
                .map(particle => (
                  <div 
                    key={particle.id}
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50"
                    style={{
                      left: `${particle.position}%`,
                      opacity: Math.min(1, (100 - Math.abs(particle.position - 50)) / 50),
                      transform: `translateY(-50%) scale(${Math.min(1, (100 - Math.abs(particle.position - 50)) / 100)})`,
                    }}
                  />
                ))
              }
            </div>
          </div>
          
          {/* Deal proposals with enhanced UI */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 3 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-lg bg-white/20 mb-2 flex items-center justify-center transition-all duration-300 relative",
              animationStep === 3 || animationStep === 4 ? "ring-2 ring-white shadow-lg shadow-white/20 scale-110" : ""
            )}>
              <div className={cn(
                "w-12 h-12 md:w-14 md:h-14 rounded border border-white/30 flex items-center justify-center relative backdrop-blur-sm",
                dealMatched ? "bg-green-500/20" : ""
              )}>
                <Building2 className="w-7 h-7 md:w-8 md:h-8 text-white drop-shadow" />
                {dealMatched && (
                  <div className="absolute -right-1 -top-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                  </div>
                )}
              </div>
              
              {/* Glow effect for success state */}
              {dealMatched && (
                <div className="absolute inset-0 rounded-lg bg-green-500/10 blur-sm animate-pulse"></div>
              )}
            </div>
            <span className={cn(
              "text-sm font-medium transition-all duration-300",
              animationStep === 3 || animationStep === 4 ? "text-white scale-105" : "text-white/80"
            )}>
              Deal Proposals
            </span>
            <div className="flex flex-col gap-1 mt-2 w-24 md:w-28">
              <div className={cn(
                "h-1.5 w-full rounded-full transition-all duration-500",
                dealMatched ? "bg-green-400" : animationStep === 3 ? "bg-white" : "bg-white/30" 
              )}></div>
              <div className={cn(
                "h-1.5 w-4/5 rounded-full transition-all duration-500 delay-75",
                dealMatched ? "bg-green-400" : animationStep === 3 ? "bg-white" : "bg-white/30"
              )}></div>
              <div className={cn(
                "h-1.5 w-2/3 rounded-full transition-all duration-500 delay-150",
                dealMatched ? "bg-green-400" : animationStep === 3 ? "bg-white" : "bg-white/30"
              )}></div>
            </div>
            
            {/* Match Score with enhanced animation */}
            <div className={cn(
              "mt-2 flex flex-col items-center opacity-0 transition-all duration-500 transform",
              animationStep >= 3 ? "opacity-100 translate-y-0" : "translate-y-4"
            )}>
              <div className="px-2 py-1 rounded bg-[#C9D4DC]/20 text-[10px] md:text-xs text-center backdrop-blur-sm border border-white/10 shadow">
                <div className="flex items-center gap-1 justify-center">
                  <Building2 className="w-3 h-3" />
                  <span>{dealName}</span>
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <ArrowDownRight className="w-3 h-3 text-red-400" />
                  <span>Risk: Low</span>
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <span className={cn(
                    "transition-all duration-500",
                    dealMatched ? "text-green-400 font-bold" : ""
                  )}>
                    Match: {dealMatched ? (
                      <span className="relative">
                        98%
                        <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
                      </span>
                    ) : "Calculating..."}
                  </span>
                </div>
                <div className="flex items-center gap-1 justify-center text-amber-200 mt-1">
                  <span>${dealCapitalNeed}M capital need</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Status Text with better visibility */}
        <div className="mt-4 h-10 relative">
          <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-b from-transparent to-[#275E91]/10"></div>
          <div className="bg-[#C9D4DC]/20 px-4 py-2 rounded-md shadow-inner relative overflow-hidden backdrop-blur-sm border border-white/10">
            <div className="absolute inset-0 bg-[#275E91]/5"></div>
            <p className={cn(
              "text-sm font-medium transition-all duration-1000 relative z-10 flex items-center justify-center gap-2",
              animationStep === 0 ? "opacity-100" : "opacity-0 absolute inset-0"
            )}>
              <span className="inline-block w-2 h-2 bg-[#C9D4DC] rounded-full animate-pulse"></span>
              Initializing LG Development's capital matching platform...
            </p>
            <p className={cn(
              "text-sm font-medium transition-all duration-1000 relative z-10 flex items-center justify-center gap-2",
              animationStep === 1 ? "opacity-100" : "opacity-0 absolute inset-0"
            )}>
              <span className="inline-block w-2 h-2 bg-[#275E91] rounded-full animate-pulse"></span>
              Processing <span className="text-amber-200 font-medium">Walton Street Capital</span> investment criteria...
            </p>
            <p className={cn(
              "text-sm font-medium transition-all duration-1000 relative z-10 flex items-center justify-center gap-2",
              animationStep === 2 ? "opacity-100" : "opacity-0 absolute inset-0"
            )}>
              <span className="inline-block w-2 h-2 bg-[#275E91] rounded-full animate-pulse"></span>
              Matching to <span className="text-amber-200 font-medium">Chicago properties</span> with <span className="text-[#275E91] font-bold">128</span> parameters...
            </p>
            <p className={cn(
              "text-sm font-medium transition-all duration-1000 relative z-10 flex items-center justify-center gap-2",
              animationStep === 3 ? "opacity-100" : "opacity-0 absolute inset-0"
            )}>
              <span className="inline-block w-2 h-2 bg-[#7A8D79] rounded-full animate-pulse"></span>
              Analyzing <span className="text-amber-200 font-medium">Triangle Square</span> risk and return profile...
            </p>
            <p className={cn(
              "text-sm font-medium transition-all duration-1000 relative z-10 flex items-center justify-center gap-2",
              animationStep === 4 ? "opacity-100" : "opacity-0 absolute inset-0"
            )}>
              <span className="inline-block w-2 h-2 bg-[#2E7D32] rounded-full animate-pulse"></span>
              Perfect match! <span className="text-[#2E7D32] font-bold">98%</span> alignment with <span className="text-amber-200 font-medium">LG Development's strategic goals</span>
            </p>
          </div>
        </div>
        
        {/* Progress indicator */}
        <ProgressIndicator />

        {/* Guided Tour Button */}
        <div className="absolute right-3 top-3 z-20">
          <button 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-medium text-white transition-all hover:bg-white/15"
            onClick={startTour}
          >
            <HelpCircle className="w-3 h-3" />
            Guided Tour
          </button>
          
          {/* Tour Overlay */}
          {showGuidedTour && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/70" onClick={endTour}></div>
              
              {/* Tour Content */}
              <div className="max-w-md w-full bg-[#1E2F45]/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 p-5 relative z-10 text-white">
                <div className="absolute -top-2 -right-2">
                  <button 
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    onClick={endTour}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Play className="w-4 h-4 text-amber-200" />
                  {tourStep === 1 && "Step 1: LP Profiles"}
                  {tourStep === 2 && "Step 2: AI Matching Engine"}
                  {tourStep === 3 && "Step 3: Deal Analysis"}
                  {tourStep === 4 && "Step 4: Match Confirmation"}
                </h3>
                
                <div className="mb-4">
                  {tourStep === 1 && (
                    <p className="text-sm">
                      The Capital Match platform starts by analyzing <span className="text-amber-200 font-medium">LP profiles</span>. 
                      We've collected detailed investment criteria from {lpName}, 
                      including their focus on Chicago properties and $42M commitment.
                    </p>
                  )}
                  
                  {tourStep === 2 && (
                    <p className="text-sm">
                      Our <span className="text-amber-200 font-medium">AI Matching Engine</span> processes over 128 data points 
                      from each property and investor profile. This includes location preferences, 
                      risk tolerance, return expectations, asset types, and historical investment patterns.
                    </p>
                  )}
                  
                  {tourStep === 3 && (
                    <p className="text-sm">
                      The platform identifies <span className="text-amber-200 font-medium">{dealName}</span> as a potential match 
                      based on its alignment with {lpName}'s investment criteria. 
                      Our algorithm evaluates risk factors and capital requirements in real-time.
                    </p>
                  )}
                  
                  {tourStep === 4 && (
                    <p className="text-sm">
                      The platform confirms a <span className="text-amber-200 font-medium">98% match score</span>, indicating 
                      exceptional alignment between investor criteria and project characteristics. 
                      This level of precision allows LG Development to approach investors with 
                      opportunities tailored to their exact specifications.
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
                          tourStep >= step ? "bg-amber-200" : "bg-white/30"
                        )}
                      />
                    ))}
                  </div>
                  
                  <button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-200/20 backdrop-blur-sm border border-amber-200/30 text-xs font-medium text-white transition-all hover:bg-amber-200/30"
                    onClick={nextTourStep}
                  >
                    {tourStep < 4 ? (
                      <>
                        Next <ChevronRight className="w-3 h-3" />
                      </>
                    ) : (
                      "Finish Tour"
                    )}
                  </button>
                </div>
              </div>
              
              {/* Highlight Indicators */}
              {tourStep === 1 && (
                <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-2 border-amber-200 animate-pulse z-20"></div>
              )}
              
              {tourStep === 2 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-lg border-2 border-amber-200 animate-pulse z-20"></div>
              )}
              
              {tourStep === 3 && (
                <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-lg border-2 border-amber-200 animate-pulse z-20"></div>
              )}
              
              {tourStep === 4 && (
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-[80%] h-16 rounded-lg border-2 border-amber-200 animate-pulse z-20"></div>
              )}
            </div>
          )}
        </div>
        
        {/* Filtering Controls */}
        {showFilters && (
          <div className="absolute left-3 top-3 z-20">
            <button 
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-medium text-white transition-all",
                filtersOpen ? "bg-white/20 shadow-lg" : "hover:bg-white/15"
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
              <div className="absolute top-full left-0 mt-2 w-64 p-3 rounded-md bg-[#1E2F45]/95 backdrop-blur-md shadow-xl border border-white/10 text-white text-xs animate-in slide-in-from-top-2 duration-200">
                {/* Deal Size Filter */}
                <div className="mb-3">
                  <div className="flex items-center mb-1.5 font-medium">
                    <DollarSign className="w-3 h-3 mr-1 text-amber-200" />
                    Deal Size ($ millions)
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={filters.dealSize[0]}
                      onChange={(e) => handleFilterChange('dealSize', [parseInt(e.target.value), filters.dealSize[1]])}
                      className="w-24 accent-amber-200"
                    />
                    <span className="text-amber-200 font-medium">${filters.dealSize[0]}M - ${filters.dealSize[1]}M</span>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={filters.dealSize[1]}
                      onChange={(e) => handleFilterChange('dealSize', [filters.dealSize[0], parseInt(e.target.value)])}
                      className="w-24 accent-amber-200"
                    />
                  </div>
                </div>
                
                {/* Location Filter */}
                <div className="mb-3">
                  <div className="flex items-center mb-1.5 font-medium">
                    <MapPin className="w-3 h-3 mr-1 text-amber-200" />
                    Location
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Chicago", "Milwaukee", "Indianapolis", "Detroit"].map((city) => (
                      <button
                        key={city}
                        className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-medium border transition-colors",
                          filters.location.includes(city) 
                            ? "bg-amber-200/20 border-amber-200/40 text-white" 
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
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
                    <Users className="w-3 h-3 mr-1 text-amber-200" />
                    Investor Type
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Institutional", "Family Office", "Private Equity", "HNWI"].map((type) => (
                      <button
                        key={type}
                        className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-medium border transition-colors",
                          filters.investorType.includes(type) 
                            ? "bg-amber-200/20 border-amber-200/40 text-white" 
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
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
                    <Building className="w-3 h-3 mr-1 text-amber-200" />
                    Asset Class
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Multifamily", "Mixed-Use", "Office", "Retail", "Industrial"].map((asset) => (
                      <button
                        key={asset}
                        className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-medium border transition-colors",
                          filters.assetClass.includes(asset) 
                            ? "bg-amber-200/20 border-amber-200/40 text-white" 
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
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
                    <BarChart3 className="w-3 h-3 mr-1 text-amber-200" />
                    Return Profile
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Core", "Core-Plus", "Value-Add", "Opportunistic"].map((profile) => (
                      <button
                        key={profile}
                        className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-medium border transition-colors",
                          filters.returnProfile.includes(profile) 
                            ? "bg-amber-200/20 border-amber-200/40 text-white" 
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
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

// Note: Animations are defined in src/index.css
// Make sure the following keyframes are present:
// @keyframes float
// @keyframes grow
// @keyframes grow-reverse
// @keyframes pulse
// @keyframes pulse-slow

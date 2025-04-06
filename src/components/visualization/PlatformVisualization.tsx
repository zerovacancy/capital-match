
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, UserRound, LineChart, ArrowDownRight, ArrowUpRight, Search, CheckCircle2, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlatformVisualizationProps {
  className?: string;
}

const PlatformVisualization: React.FC<PlatformVisualizationProps> = ({ className }) => {
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
        
        <p className="max-w-md text-center text-white/90 mb-6 text-sm md:text-base leading-relaxed drop-shadow">
          AI-powered matching algorithm that aligns investor criteria with development opportunities in real-time.
        </p>
        
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
                  <span>BTR Focus</span>
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
              Initializing platform matching...
            </p>
            <p className={cn(
              "text-sm font-medium transition-all duration-1000 relative z-10 flex items-center justify-center gap-2",
              animationStep === 1 ? "opacity-100" : "opacity-0 absolute inset-0"
            )}>
              <span className="inline-block w-2 h-2 bg-[#275E91] rounded-full animate-pulse"></span>
              Processing investor criteria and preferences...
            </p>
            <p className={cn(
              "text-sm font-medium transition-all duration-1000 relative z-10 flex items-center justify-center gap-2",
              animationStep === 2 ? "opacity-100" : "opacity-0 absolute inset-0"
            )}>
              <span className="inline-block w-2 h-2 bg-[#275E91] rounded-full animate-pulse"></span>
              Running match algorithm with <span className="text-[#275E91] font-bold">128</span> parameters...
            </p>
            <p className={cn(
              "text-sm font-medium transition-all duration-1000 relative z-10 flex items-center justify-center gap-2",
              animationStep === 3 ? "opacity-100" : "opacity-0 absolute inset-0"
            )}>
              <span className="inline-block w-2 h-2 bg-[#7A8D79] rounded-full animate-pulse"></span>
              Calculating risk profile and match strength...
            </p>
            <p className={cn(
              "text-sm font-medium transition-all duration-1000 relative z-10 flex items-center justify-center gap-2",
              animationStep === 4 ? "opacity-100" : "opacity-0 absolute inset-0"
            )}>
              <span className="inline-block w-2 h-2 bg-[#2E7D32] rounded-full animate-pulse"></span>
              Match found! <span className="text-[#2E7D32] font-bold">98%</span> alignment with investor criteria
            </p>
          </div>
        </div>
        
        {/* Progress indicator */}
        <ProgressIndicator />
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

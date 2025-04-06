
import React, { useEffect, useState } from 'react';
import { ArrowRight, Building2, UserRound, LineChart, ArrowDownRight, ArrowUpRight, Search, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlatformVisualizationProps {
  className?: string;
}

const PlatformVisualization: React.FC<PlatformVisualizationProps> = ({ className }) => {
  // Animation states
  const [animationStep, setAnimationStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Connection animation states
  const [connection1Active, setConnection1Active] = useState(false);
  const [connection2Active, setConnection2Active] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [dealMatched, setDealMatched] = useState(false);
  
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
    
    const element = document.getElementById('platform-visualization');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div 
      id="platform-visualization"
      className={cn(
        "relative w-full max-w-4xl aspect-[16/9] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100",
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#275E91] to-[#7A8D79] opacity-95" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWOGgydjR6bTAgMzBoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiAxMmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      
      {/* Content container */}
      <div className="absolute inset-0 flex flex-col items-center text-white p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#C9D4DC]">Platform Visualization</h3>
        <p className="max-w-md text-center text-white/90 mb-6 text-sm md:text-base leading-relaxed">
          AI-powered matching algorithm that aligns investor criteria with development opportunities in real-time.
        </p>
        
        {/* Interactive visualization */}
        <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 relative">
          {/* LP Profiles */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 1 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 mb-2 flex items-center justify-center transition-all duration-300",
              animationStep === 1 ? "ring-2 ring-white scale-110" : ""
            )}>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#C9D4DC]/30 flex items-center justify-center relative">
                <UserRound className="w-7 h-7 md:w-8 md:h-8 text-white" />
                {animationStep === 1 && (
                  <div className="absolute -right-1 -top-1 w-4 h-4 bg-white rounded-full flex items-center justify-center animate-pulse">
                    <ArrowRight className="w-3 h-3 text-[#275E91]" />
                  </div>
                )}
              </div>
            </div>
            <span className={cn(
              "text-sm font-medium transition-all",
              animationStep === 1 ? "text-white" : "text-white/80"
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
            
            {/* LP Criteria Circle */}
            <div className={cn(
              "mt-2 flex flex-col items-center opacity-0 transition-all duration-500",
              animationStep === 1 ? "opacity-100" : ""
            )}>
              <div className="px-2 py-1 rounded bg-[#C9D4DC]/20 text-[10px] md:text-xs text-center">
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
          
          {/* Connection line 1 */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-0.5 bg-white/20 relative">
              {connection1Active && (
                <div className="absolute left-0 top-0 h-full bg-white animate-[grow_3s_ease-in-out_infinite]"></div>
              )}
            </div>
          </div>
          
          {/* AI matching engine in the middle */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 2 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-20 h-20 md:w-24 md:h-24 rounded-lg bg-[#C9D4DC]/20 mb-2 flex items-center justify-center relative overflow-hidden transition-all duration-300",
              animationStep === 2 ? "ring-2 ring-white scale-110" : ""
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#275E91]/30 to-[#7A8D79]/30"></div>
              <LineChart className={cn(
                "w-10 h-10 md:w-12 md:h-12 text-white transition-all duration-500 transform",
                aiProcessing ? "scale-110" : ""
              )} />
              
              {/* Processing animation */}
              {aiProcessing && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-lg border border-white/20 animate-[pulse_2s_ease-in-out_infinite]"></div>
                  </div>
                  <div className="absolute inset-y-2 inset-x-2 grid grid-cols-3 grid-rows-3 gap-1 z-10 opacity-70">
                    {[...Array(9)].map((_, i) => (
                      <div 
                        key={i}
                        className="bg-white/20 rounded-sm"
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
              "text-sm font-medium transition-all",
              animationStep === 2 ? "text-white" : "text-white/80"
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
            
            {/* Algorithm Details */}
            <div className={cn(
              "mt-2 flex flex-col items-center opacity-0 transition-all duration-500",
              animationStep === 2 ? "opacity-100" : ""
            )}>
              <div className="px-2 py-1 rounded bg-[#C9D4DC]/20 text-[10px] md:text-xs">
                <div className="flex items-center gap-1">
                  <Search className="w-3 h-3" />
                  <span>Analyzing criteria...</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connection line 2 */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-0.5 bg-white/20 relative">
              {connection2Active && (
                <div className="absolute right-0 top-0 h-full bg-white animate-[grow-reverse_3s_ease-in-out_infinite]"></div>
              )}
            </div>
          </div>
          
          {/* Deal proposals */}
          <div className={cn(
            "flex flex-col items-center transition-all duration-500",
            animationStep >= 3 ? "opacity-100" : "opacity-70"
          )}>
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-lg bg-white/20 mb-2 flex items-center justify-center transition-all duration-300",
              animationStep === 3 || animationStep === 4 ? "ring-2 ring-white scale-110" : ""
            )}>
              <div className={cn(
                "w-12 h-12 md:w-14 md:h-14 rounded border border-white/30 flex items-center justify-center relative",
                dealMatched ? "bg-green-500/20" : ""
              )}>
                <Building2 className="w-7 h-7 md:w-8 md:h-8 text-white" />
                {dealMatched && (
                  <div className="absolute -right-1 -top-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                  </div>
                )}
              </div>
            </div>
            <span className={cn(
              "text-sm font-medium transition-all",
              animationStep === 3 || animationStep === 4 ? "text-white" : "text-white/80"
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
            
            {/* Match Score */}
            <div className={cn(
              "mt-2 flex flex-col items-center opacity-0 transition-all duration-500",
              animationStep >= 3 ? "opacity-100" : ""
            )}>
              <div className="px-2 py-1 rounded bg-[#C9D4DC]/20 text-[10px] md:text-xs text-center">
                <div className="flex items-center gap-1 justify-center">
                  <ArrowDownRight className="w-3 h-3 text-red-400" />
                  <span>Risk: Low</span>
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <span className={cn(
                    "transition-all duration-500",
                    dealMatched ? "text-green-400 font-bold" : ""
                  )}>
                    Match: {dealMatched ? "98%" : "Calculating..."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Status Text */}
        <div className="mt-4 h-8">
          <p className={cn(
            "text-sm font-medium transition-all duration-1000",
            animationStep === 0 ? "opacity-100" : "opacity-0 absolute"
          )}>
            Initializing platform matching...
          </p>
          <p className={cn(
            "text-sm font-medium transition-all duration-1000",
            animationStep === 1 ? "opacity-100" : "opacity-0 absolute"
          )}>
            Processing investor criteria and preferences...
          </p>
          <p className={cn(
            "text-sm font-medium transition-all duration-1000",
            animationStep === 2 ? "opacity-100" : "opacity-0 absolute"
          )}>
            Running match algorithm with 128 parameters...
          </p>
          <p className={cn(
            "text-sm font-medium transition-all duration-1000",
            animationStep === 3 ? "opacity-100" : "opacity-0 absolute"
          )}>
            Calculating risk profile and match strength...
          </p>
          <p className={cn(
            "text-sm font-medium transition-all duration-1000",
            animationStep === 4 ? "opacity-100" : "opacity-0 absolute"
          )}>
            Match found! 98% alignment with investor criteria
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlatformVisualization;

// Note: Animations are now defined in src/index.css
// This keeps the code cleaner and more maintainable

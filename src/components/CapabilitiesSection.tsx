import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserRound, 
  BarChart2, 
  GitCompareArrows, 
  FileSpreadsheet, 
  ArrowUpRight, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  LineChart, 
  PieChart, 
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CapabilitiesSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  const capabilities = [
    {
      title: "LP Profile Engine",
      description: "Build comprehensive investor profiles based on historical preferences, risk tolerance, and targeted returns.",
      icon: <UserRound className="w-14 h-14 text-[#275E91]" />,
      benefits: ["Automated preference tracking", "Adaptive learning", "Regulatory compliance"],
      metrics: [
        { label: "Investor Insights", value: "95%", description: "Accuracy in preference identification" },
        { label: "Time Savings", value: "3.5x", description: "Faster LP onboarding" },
      ],
      features: [
        "Real-time sentiment tracking",
        "Investment history analysis",
        "Communication preference management",
        "Regulatory compliance automation"
      ],
      color: "from-[#275E91]/80 to-[#275E91]",
      glowColor: "from-[#275E91]/30 via-transparent to-transparent",
      iconBackground: "bg-gradient-to-br from-blue-50 to-blue-100"
    },
    {
      title: "Deal Analysis Engine",
      description: "Advanced algorithms to evaluate development opportunities against multiple investment criteria.",
      icon: <BarChart2 className="w-14 h-14 text-[#7A8D79]" />,
      benefits: ["Multi-factor analysis", "Predictive modeling", "Market comparables"],
      metrics: [
        { label: "Projection Accuracy", value: "98%", description: "Financial forecast reliability" },
        { label: "Data Points", value: "250+", description: "Parameters per analysis" },
      ],
      features: [
        "Scenario modeling with variable inputs",
        "Historical market trend analysis",
        "Risk assessment calibration",
        "Geospatial opportunity mapping"
      ],
      color: "from-[#7A8D79]/80 to-[#7A8D79]",
      glowColor: "from-[#7A8D79]/30 via-transparent to-transparent",
      iconBackground: "bg-gradient-to-br from-green-50 to-green-100"
    },
    {
      title: "Matching Algorithm",
      description: "AI-powered matching system to align investor profiles with the right development opportunities.",
      icon: <GitCompareArrows className="w-14 h-14 text-[#275E91]" />,
      benefits: ["98% match accuracy", "Real-time updates", "Custom weighting"],
      metrics: [
        { label: "Time Reduction", value: "87%", description: "From weeks to minutes" },
        { label: "Match Quality", value: "4.9/5", description: "LP satisfaction score" },
      ],
      features: [
        "Multi-dimensional criteria matching",
        "Weighted preference ranking",
        "Automated shortlist generation",
        "Confidence scoring for matches"
      ],
      color: "from-[#C9D4DC]/80 to-[#275E91]",
      glowColor: "from-[#275E91]/30 via-transparent to-transparent",
      iconBackground: "bg-gradient-to-br from-purple-50 to-blue-100"
    },
    {
      title: "Reporting Generator",
      description: "Automated creation of detailed reports for investors, executives, and regulatory compliance.",
      icon: <FileSpreadsheet className="w-14 h-14 text-[#7A8D79]" />,
      benefits: ["Custom templates", "Multi-format export", "Scheduled delivery"],
      metrics: [
        { label: "Time Saved", value: "45+", description: "Hours per month on reporting" },
        { label: "Compliance", value: "100%", description: "Regulatory standards" },
      ],
      features: [
        "White-labeled investor reporting",
        "Regulatory filing preparation",
        "Automated distribution scheduling",
        "Interactive data visualization"
      ],
      color: "from-[#7A8D79]/80 to-[#C9D4DC]",
      glowColor: "from-[#7A8D79]/30 via-transparent to-transparent",
      iconBackground: "bg-gradient-to-br from-gray-50 to-green-100"
    }
  ];

  const renderVisualization = (index: number) => {
    switch (index) {
      // LP Profile Engine Visualization
      case 0:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-full max-w-[220px] mx-auto">
              <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-[#275E91]/10 animate-pulse-slow"></div>
              
              {/* LP Profile Circle */}
              <div className="relative z-10 h-16 w-16 mx-auto rounded-full border-2 border-[#275E91] bg-white flex items-center justify-center mb-4">
                <UserRound className="h-8 w-8 text-[#275E91]" />
                <div className="absolute top-0 right-0 h-5 w-5 rounded-full bg-[#275E91] text-white flex items-center justify-center text-xs font-bold">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
              </div>
              
              {/* Profile Attributes */}
              <div className="grid grid-cols-2 gap-2 relative z-10">
                <Badge variant="outline" className="py-1 border-[#275E91]/50 flex items-center gap-1 justify-center">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-xs">IRR: 18-22%</span>
                </Badge>
                
                <Badge variant="outline" className="py-1 border-[#275E91]/50 flex items-center gap-1 justify-center">
                  <Building2 className="h-3 w-3 text-[#275E91]" />
                  <span className="text-xs">BTR Focus</span>
                </Badge>
                
                <Badge variant="outline" className="py-1 border-[#275E91]/50 flex items-center gap-1 justify-center">
                  <DollarSign className="h-3 w-3 text-[#275E91]" />
                  <span className="text-xs">$1-5M</span>
                </Badge>
                
                <Badge variant="outline" className="py-1 border-[#275E91]/50 flex items-center gap-1 justify-center">
                  <LineChart className="h-3 w-3 text-[#275E91]" />
                  <span className="text-xs">Moderate Risk</span>
                </Badge>
              </div>
            </div>
          </div>
        );
      
      // Deal Analysis Engine Visualization
      case 1:
        return (
          <div className="relative z-10 h-full flex flex-col justify-center items-center">
            <div className="text-xs text-[#7A8D79] font-medium mb-1 text-center">Projected Returns</div>
            <div className="grid grid-cols-3 gap-2 w-full max-w-[200px] mx-auto">
              <div className="flex flex-col items-center">
                <div className="h-14 relative w-full">
                  <div className="absolute bottom-0 inset-x-0 bg-[#7A8D79] rounded-t-sm" style={{ height: '60%' }}></div>
                </div>
                <span className="text-[10px] font-medium mt-1">IRR</span>
                <span className="text-[10px] text-[#7A8D79] font-bold">18.3%</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-14 relative w-full">
                  <div className="absolute bottom-0 inset-x-0 bg-[#7A8D79] rounded-t-sm" style={{ height: '80%' }}></div>
                </div>
                <span className="text-[10px] font-medium mt-1">EM</span>
                <span className="text-[10px] text-[#7A8D79] font-bold">2.1x</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-14 relative w-full">
                  <div className="absolute bottom-0 inset-x-0 bg-[#7A8D79] rounded-t-sm" style={{ height: '70%' }}></div>
                </div>
                <span className="text-[10px] font-medium mt-1">CoC</span>
                <span className="text-[10px] text-[#7A8D79] font-bold">9.5%</span>
              </div>
            </div>
            
            <div className="w-full max-w-[200px] mt-3 bg-gray-100 h-[1px]"></div>
            
            <div className="text-xs text-[#7A8D79] font-medium mt-2 mb-1 text-center">Capital Structure</div>
            <div className="relative h-3 w-full max-w-[200px] bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-[#275E91]" style={{ width: '65%' }}></div>
              <div className="absolute inset-y-0 right-0 bg-[#7A8D79]" style={{ width: '35%' }}></div>
            </div>
            <div className="flex justify-between w-full max-w-[200px] mt-1">
              <span className="text-[9px] text-gray-500">Debt: 65%</span>
              <span className="text-[9px] text-gray-500">Equity: 35%</span>
            </div>
          </div>
        );
      
      // Matching Algorithm Visualization
      case 2:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="relative">
              {/* LP side */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-[#275E91] flex items-center justify-center z-10">
                <UserRound className="w-6 h-6 text-[#275E91]" />
              </div>
              
              {/* Deal side */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-[#275E91] flex items-center justify-center z-10">
                <Building2 className="w-6 h-6 text-[#275E91]" />
              </div>
              
              {/* Middle AI node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-md bg-gradient-to-br from-[#275E91] to-[#7A8D79] flex items-center justify-center z-20 animate-pulse-slow">
                <GitCompareArrows className="w-8 h-8 text-white" />
              </div>
              
              {/* Connection Line 1 */}
              <div className="h-[2px] w-32 bg-gradient-to-r from-[#275E91] to-[#7A8D79] absolute left-10 top-1/2 -translate-y-1/2">
                <div className="absolute top-0 left-0 h-full bg-white/50 w-full animate-[grow_3s_ease-in-out_infinite]"></div>
              </div>
              
              {/* Connection Line 2 */}
              <div className="h-[2px] w-32 bg-gradient-to-r from-[#7A8D79] to-[#275E91] absolute right-10 top-1/2 -translate-y-1/2">
                <div className="absolute top-0 right-0 h-full bg-white/50 w-full animate-[grow-reverse_3s_ease-in-out_infinite]"></div>
              </div>
              
              {/* Match percentage */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-full px-2 py-1 text-xs font-medium border border-green-500 text-green-600 z-30">
                98% Match
              </div>
            </div>
          </div>
        );
      
      // Reporting Generator Visualization
      case 3:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="relative">
              {/* Report document */}
              <div className="w-32 h-40 bg-white border border-gray-300 rounded shadow-md relative mx-auto z-10">
                {/* Header */}
                <div className="h-6 bg-[#275E91] rounded-t"></div>
                
                {/* Content lines */}
                <div className="p-2">
                  <div className="h-1.5 bg-gray-200 rounded w-full mb-1.5"></div>
                  <div className="h-1.5 bg-gray-200 rounded w-5/6 mb-1.5"></div>
                  <div className="h-1.5 bg-gray-200 rounded w-11/12 mb-3"></div>
                  
                  {/* Chart */}
                  <div className="h-12 mb-2 flex items-end justify-between gap-1">
                    <div className="h-3 w-2 bg-[#275E91] rounded-t"></div>
                    <div className="h-8 w-2 bg-[#275E91] rounded-t"></div>
                    <div className="h-6 w-2 bg-[#275E91] rounded-t"></div>
                    <div className="h-10 w-2 bg-[#275E91] rounded-t"></div>
                    <div className="h-5 w-2 bg-[#275E91] rounded-t"></div>
                    <div className="h-7 w-2 bg-[#275E91] rounded-t"></div>
                  </div>
                  
                  {/* More content */}
                  <div className="h-1.5 bg-gray-200 rounded w-3/4 mb-1.5"></div>
                  <div className="h-1.5 bg-gray-200 rounded w-5/6 mb-1.5"></div>
                </div>
                
                {/* Copies behind for 3D effect */}
                <div className="absolute w-full h-full bg-white border border-gray-300 rounded shadow-sm -right-1 -bottom-1 -z-10"></div>
                <div className="absolute w-full h-full bg-white border border-gray-300 rounded shadow-sm -right-2 -bottom-2 -z-20"></div>
                
                {/* Export formats */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex space-x-1 z-20">
                  <Badge variant="outline" className="px-1 py-0 text-[8px] border-[#7A8D79]/50 text-[#7A8D79]">
                    PDF
                  </Badge>
                  <Badge variant="outline" className="px-1 py-0 text-[8px] border-[#7A8D79]/50 text-[#7A8D79]">
                    CSV
                  </Badge>
                  <Badge variant="outline" className="px-1 py-0 text-[8px] border-[#7A8D79]/50 text-[#7A8D79]">
                    XLSX
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="capabilities" className="section-container overflow-hidden relative py-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#275E91]/5 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#7A8D79]/5 to-transparent blur-3xl"></div>
      
      <div className="mb-12 text-center relative z-10">
        <h2 className="section-title mb-4">Core Capabilities</h2>
        <p className="section-subtitle mx-auto max-w-3xl">
          Our platform leverages advanced AI to streamline the capital matching process
          with these powerful capabilities tailored to LG Development's specific needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
        {capabilities.map((capability, index) => (
          <Card 
            key={index} 
            className={cn(
              "h-full overflow-hidden transition-all duration-300 relative group border-transparent rounded-2xl",
              "bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl",
              "hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(39,94,145,0.2)]",
              activeCard === index ? 
                "ring-2 ring-[#275E91]/60 shadow-xl translate-y-[-2px]" : 
                "border border-gray-100/60",
              "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/80 before:to-white/40 before:backdrop-blur-sm"
            )}
            onClick={() => setActiveCard(index === activeCard ? null : index)}
          >
            {/* Premium glow effect on hover and active */}
            <div 
              className={cn(
                "absolute -inset-0.5 bg-gradient-to-br rounded-2xl opacity-0 transition-all duration-300 -z-10",
                "group-hover:opacity-30 blur-md",
                capability.color, 
                activeCard === index ? "opacity-40" : ""
              )}
            ></div>
            
            {/* Background gradient */}
            <div 
              className={cn(
                "absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t transition-all duration-300",
                capability.glowColor,
                "opacity-0 group-hover:opacity-20",
                activeCard === index ? "opacity-30" : ""
              )}
            ></div>
            
            {/* Card content container */}
            <div className="relative z-10">
              <CardHeader className="pt-6 pb-3">
                <div className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 transform", 
                  "shadow-md group-hover:shadow-lg group-hover:scale-110",
                  "bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm",
                  activeCard === index ? "scale-110" : "",
                  capability.color.includes("275E91") ? "border-[#275E91]/10 border" : "border-[#7A8D79]/10 border"
                )}>
                  {capability.icon}
                </div>
                <CardTitle className="text-[22px] font-semibold bg-clip-text text-transparent bg-gradient-to-br from-[#275E91] to-[#275E91]/80 font-display">
                  {capability.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pb-5">
                <CardDescription className="text-base text-[#4F5D75]/90 mb-5 leading-relaxed">
                  {capability.description}
                </CardDescription>
                
                {/* Benefits list - with improved styling */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-[#275E91] mb-3 flex items-center">
                    <span className="w-1 h-4 bg-gradient-to-b from-[#275E91] to-[#7A8D79] rounded-full mr-2 flex-shrink-0"></span>
                    Key Benefits
                  </h4>
                  <ul className="space-y-2.5 pl-1">
                    {capability.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm flex items-center group">
                        <span className={cn(
                          "w-5 h-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center",
                          "bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm",
                          "group-hover:from-blue-50 group-hover:to-blue-100 transition-colors duration-300"
                        )}>
                          <span className="w-1.5 h-1.5 bg-[#7A8D79] rounded-full group-hover:scale-110 transition-transform"></span>
                        </span>
                        <span className="text-[#4F5D75] font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Expand/collapse indicator with improved interaction */}
                <div className="mt-4 mb-3 flex justify-center">
                  <button
                    className={cn(
                      "flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#275E91]/30 focus:ring-offset-1",
                      activeCard === index ? 
                        "bg-[#275E91]/10 text-[#275E91] border border-[#275E91]/20" : 
                        "bg-gray-50 text-[#4F5D75] hover:bg-[#275E91]/5 hover:text-[#275E91] border border-gray-200"
                    )}
                    onClick={(e) => {
                      e.stopPropagation(); // To prevent card click event
                      setActiveCard(index === activeCard ? null : index);
                    }}
                  >
                    {activeCard === index ? (
                      <>
                        View less
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 transform rotate-90" />
                      </>
                    ) : (
                      <>
                        View more
                        <ChevronRight className="h-4 w-4 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </div>
                
                {/* Expandable content with backdrop overlay */}
                <div 
                  className={cn(
                    "transition-all duration-500 overflow-hidden rounded-lg relative",
                    "bg-gradient-to-br from-white/80 to-gray-50/40 backdrop-blur-sm border",
                    activeCard === index ? 
                      "max-h-[500px] opacity-100 mb-5 border-[#275E91]/20 shadow-lg" : 
                      "max-h-0 opacity-0 mb-0 border-transparent"
                  )}
                  style={{
                    transitionProperty: "max-height, opacity, margin, border"
                  }}
                >
                  {/* Semi-transparent backdrop for depth */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-b from-[#275E91]/5 to-[#7A8D79]/5 transition-opacity duration-500",
                    activeCard === index ? "opacity-100" : "opacity-0"
                  )}></div>
                  
                  {/* Expandable content container */}
                  <div className="relative">
                    {/* Performance Metrics Section */}
                    <div className="border-b border-gray-100">
                      <div className="flex items-center justify-between px-4 py-3 bg-[#275E91]/5">
                        <h4 className="text-sm font-semibold text-[#275E91] flex items-center">
                          <span className="w-1 h-4 bg-gradient-to-b from-[#275E91] to-[#7A8D79] rounded-full mr-2"></span>
                          Performance Metrics
                        </h4>
                        <ChevronRight className="h-4 w-4 text-[#275E91] transform rotate-90" />
                      </div>
                      
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-3">
                          {capability.metrics.map((metric, i) => (
                            <div 
                              key={i} 
                              className="text-center p-3 rounded-md bg-white shadow-sm border border-gray-50 hover:shadow transition-shadow duration-300"
                            >
                              <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-br from-[#275E91] to-[#7A8D79]">
                                {metric.value}
                              </p>
                              <p className="text-xs text-[#4F5D75] font-medium mt-1">{metric.label}</p>
                              <p className="text-[10px] text-gray-400 mt-1">{metric.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Visualization Section */}
                    <div>
                      <div className="flex items-center justify-between px-4 py-3 bg-[#275E91]/5 border-b border-gray-100">
                        <h4 className="text-sm font-semibold text-[#275E91] flex items-center font-display">
                          <span className="w-1 h-4 bg-gradient-to-b from-[#275E91] to-[#7A8D79] rounded-full mr-2"></span>
                          {index === 0 ? "Investor Profile" : 
                           index === 1 ? "Financial Analysis" :
                           index === 2 ? "Matching Process" : "Reporting Output"}
                        </h4>
                        <ChevronRight className="h-4 w-4 text-[#275E91] transform rotate-90" />
                      </div>
                      
                      <div className="p-3 bg-white">
                        <div className="h-[180px] overflow-y-auto custom-scrollbar">
                          {renderVisualization(index)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Collapse section */}
                    <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex justify-center">
                      <button
                        className="flex items-center justify-center gap-1.5 text-xs text-[#4F5D75] hover:text-[#275E91] transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCard(null);
                        }}
                      >
                        Collapse
                        <ChevronRight className="h-3 w-3 transform rotate-90 -scale-y-100" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CapabilitiesSection;

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
      iconBackground: "from-[#275E91]/5 to-[#275E91]/20",
      iconColor: "#275E91",
      iconBorder: "border-[#275E91]/20"
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
      iconBackground: "from-[#7A8D79]/5 to-[#7A8D79]/20",
      iconColor: "#7A8D79",
      iconBorder: "border-[#7A8D79]/20"
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
      iconBackground: "from-[#275E91]/10 to-[#C9D4DC]/30",
      iconColor: "#275E91",
      iconBorder: "border-[#275E91]/20"
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
      iconBackground: "from-[#7A8D79]/10 to-[#C9D4DC]/30",
      iconColor: "#7A8D79",
      iconBorder: "border-[#7A8D79]/20"
    }
  ];

  const renderVisualization = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-full max-w-[220px] mx-auto">
              <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-[#275E91]/10 animate-pulse-slow"></div>
              
              <div className="relative z-10 h-16 w-16 mx-auto rounded-full border-2 border-[#275E91] bg-white flex items-center justify-center mb-4">
                <UserRound className="h-8 w-8 text-[#275E91]" />
                <div className="absolute top-0 right-0 h-5 w-5 rounded-full bg-[#275E91] text-white flex items-center justify-center text-xs font-bold">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
              </div>
              
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
      
      case 2:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-[#275E91] flex items-center justify-center z-10">
                <UserRound className="w-6 h-6 text-[#275E91]" />
              </div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-[#275E91] flex items-center justify-center z-10">
                <Building2 className="w-6 h-6 text-[#275E91]" />
              </div>
              
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-md bg-gradient-to-br from-[#275E91] to-[#7A8D79] flex items-center justify-center z-20 animate-pulse-slow">
                <GitCompareArrows className="w-8 h-8 text-white" />
              </div>
              
              <div className="h-[2px] w-32 bg-gradient-to-r from-[#275E91] to-[#7A8D79] absolute left-10 top-1/2 -translate-y-1/2">
                <div className="absolute top-0 left-0 h-full bg-white/50 w-full animate-[grow_3s_ease-in-out_infinite]"></div>
              </div>
              
              <div className="h-[2px] w-32 bg-gradient-to-r from-[#7A8D79] to-[#275E91] absolute right-10 top-1/2 -translate-y-1/2">
                <div className="absolute top-0 right-0 h-full bg-white/50 w-full animate-[grow-reverse_3s_ease-in-out_infinite]"></div>
              </div>
              
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-full px-2 py-1 text-xs font-medium border border-green-500 text-green-600 z-30">
                98% Match
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-40 bg-white border border-gray-300 rounded shadow-md relative mx-auto z-10">
                <div className="h-6 bg-[#275E91] rounded-t"></div>
                
                <div className="p-2">
                  <div className="h-1.5 bg-gray-200 rounded w-full mb-1.5"></div>
                  <div className="h-1.5 bg-gray-200 rounded w-5/6 mb-1.5"></div>
                  <div className="h-1.5 bg-gray-200 rounded w-11/12 mb-3"></div>
                  
                  <div className="h-12 mb-2 flex items-end justify-between gap-1">
                    <div className="h-3 w-2 bg-[#275E91] rounded-t"></div>
                    <div className="h-8 w-2 bg-[#275E91] rounded-t"></div>
                    <div className="h-6 w-2 bg-[#275E91] rounded-t"></div>
                    <div className="h-10 w-2 bg-[#275E91] rounded-t"></div>
                    <div className="h-5 w-2 bg-[#275E91] rounded-t"></div>
                    <div className="h-7 w-2 bg-[#275E91] rounded-t"></div>
                  </div>
                  
                  <div className="h-1.5 bg-gray-200 rounded w-3/4 mb-1.5"></div>
                  <div className="h-1.5 bg-gray-200 rounded w-5/6 mb-1.5"></div>
                </div>
                
                <div className="absolute w-full h-full bg-white border border-gray-300 rounded shadow-sm -right-1 -bottom-1 -z-10"></div>
                <div className="absolute w-full h-full bg-white border border-gray-300 rounded shadow-sm -right-2 -bottom-2 -z-20"></div>
                
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
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#275E91]/10 to-[#C9D4DC]/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#7A8D79]/10 to-[#C9D4DC]/10 blur-3xl"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOUQ0REMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjhoMnY0em0wIDMwaC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptLTYgMTJoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="mb-16 text-center relative z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#C9D4DC]/20 text-[#275E91] mb-4 border border-[#275E91]/10 text-sm font-medium">
          Platform Features
        </div>
        <h2 className="section-title text-[#275E91] mb-4">Core Capabilities</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#275E91] to-[#7A8D79] mx-auto rounded-full mb-6"></div>
        <p className="section-subtitle mx-auto text-[#1C1C1C]">
          Our platform leverages advanced AI to streamline the capital matching process
          with these powerful capabilities tailored to LG Development's specific needs.
        </p>
      </div>
      
      <div className="absolute inset-x-0 top-1/3 h-1/3 bg-[#ECEDE3]/30 -z-10 skew-y-3 transform"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
        {capabilities.map((capability, index) => (
          <Card 
            key={index} 
            className={cn(
              "h-full overflow-hidden transition-all duration-500 relative group border-transparent rounded-2xl",
              "backdrop-blur-md shadow-lg hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
              "hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,212,220,0.4)]",
              activeCard === index ? 
                "ring-2 ring-[#275E91]/60 shadow-xl translate-y-[-2px]" : 
                "border border-lg-border/40",
              "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-footer/80 before:to-footer/40 before:backdrop-blur-sm before:border before:border-lg-border/40"
            )}
            onClick={() => setActiveCard(index === activeCard ? null : index)}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-duration="800"
          >
            <div 
              className={cn(
                "absolute -inset-0.5 bg-gradient-to-br rounded-2xl opacity-0 transition-all duration-500 -z-10",
                "group-hover:opacity-40 blur-md",
                index % 2 === 0 ? "from-[#275E91]/30 to-[#C9D4DC]/40" : "from-[#7A8D79]/30 to-[#C9D4DC]/40", 
                activeCard === index ? "opacity-50" : ""
              )}
            ></div>
            
            
            <div 
              className={cn(
                "absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t transition-all duration-500",
                "from-[#C9D4DC]/20 to-transparent",
                "opacity-0 group-hover:opacity-30",
                activeCard === index ? "opacity-40" : ""
              )}
            ></div>
            
            <div 
              className={cn(
                "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOUQ0REMiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjhoMnY0em0wIDMwaC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptLTYgMTJoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')]",
                "opacity-0 group-hover:opacity-100 transition-all duration-500"
              )}
            ></div>
            
            <div className="relative z-10">
              <CardHeader className="pt-6 pb-3">
                <div 
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 transform", 
                    "shadow-md group-hover:shadow-lg group-hover:scale-110",
                    "relative overflow-hidden",
                    activeCard === index ? "scale-110" : "",
                    "border",
                    capability.iconBorder
                  )}
                >
                  {/* Enhanced icon background with gradient */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                      `bg-gradient-to-br ${capability.iconBackground}`
                    )}
                  ></div>
                  
                  {/* Reflective shine effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ 
                      transform: 'rotate(-45deg) translateY(100%)', 
                      animation: 'shine 3s ease-in-out infinite',
                      animationDelay: `${index * 0.75}s`
                    }}
                  ></div>
                  
                  {/* Subtle pattern overlay */}
                  <div 
                    className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTEyIDExaC0xdi0xaDFWMTB6TTEyIDhoLTF2MWgxVjh6TTkgOGgtMXYxaDFWOHpNOSAxMWgtMXYxaDFWMTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"
                  ></div>
                  
                  {/* Soft inner shadow */}
                  <div className="absolute inset-0 shadow-inner opacity-30"></div>
                  
                  {/* Icon container with improved glow */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ 
                        background: `radial-gradient(circle, ${capability.iconColor}40 0%, transparent 70%)` 
                      }}
                    ></div>
                    {capability.icon}
                  </div>
                  
                  {/* Corner accent */}
                  <div 
                    className={cn(
                      "absolute -bottom-1 -right-1 w-8 h-8 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      `bg-gradient-to-tl ${capability.iconBackground}`
                    )}
                  ></div>
                </div>
                
                <CardTitle className="text-[22px] font-bold text-[#275E91] font-display tracking-tight transition-colors duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#275E91] group-hover:to-[#275E91]/80">
                  {capability.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pb-5">
                <CardDescription className="text-base text-[#1C1C1C] mb-5 leading-relaxed line-height-1-5 relative pl-3">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#275E91]/20 rounded-full"></div>
                  {capability.description}
                </CardDescription>
                
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-[#275E91] mb-3 flex items-center font-display tracking-tight">
                    <span className="w-1 h-4 bg-gradient-to-b from-[#275E91] to-[#7A8D79] rounded-full mr-2 flex-shrink-0"></span>
                    Key Benefits
                  </h4>
                  <ul className="space-y-2.5 pl-1">
                    {capability.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm flex items-start group">
                        <span className={cn(
                          "w-5 h-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center mt-0.5",
                          "bg-gradient-to-br from-white to-[#C9D4DC]/30 shadow-sm border border-[#C9D4DC]/30",
                          "group-hover:border-[#275E91]/20 group-hover:from-[#C9D4DC]/20 group-hover:to-white transition-all duration-300"
                        )}>
                          <span className="w-1.5 h-1.5 bg-[#275E91] rounded-full group-hover:scale-110 transition-transform"></span>
                        </span>
                        <span className="text-[#1C1C1C] font-medium leading-relaxed group-hover:text-[#275E91] transition-colors duration-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 mb-3 flex justify-center">
                  <button
                    className={cn(
                      "flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#C9D4DC]/50 focus:ring-offset-1 group",
                      activeCard === index ? 
                        "bg-[#275E91]/10 text-[#275E91] border border-[#275E91]/20" : 
                        "bg-[#C9D4DC]/10 text-[#1C1C1C] hover:bg-[#C9D4DC]/20 hover:text-[#275E91] border border-[#C9D4DC]/20 hover:border-[#275E91]/20"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCard(index === activeCard ? null : index);
                    }}
                  >
                    {activeCard === index ? (
                      <>
                        <span>View less</span>
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 transform rotate-90" />
                      </>
                    ) : (
                      <>
                        <span>View more</span>
                        <div className="relative">
                          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute -inset-1 bg-[#275E91]/20 rounded-full blur-sm"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </button>
                </div>
                
                <div 
                  className={cn(
                    "transition-all duration-500 overflow-hidden rounded-lg relative",
                    "bg-gradient-to-br from-footer/90 to-[#C9D4DC]/20 backdrop-blur-sm border",
                    activeCard === index ? 
                      "max-h-[500px] opacity-100 mb-5 border-[#C9D4DC]/40 shadow-lg" : 
                      "max-h-0 opacity-0 mb-0 border-transparent"
                  )}
                  style={{
                    transitionProperty: "max-height, opacity, margin, border"
                  }}
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-b from-[#C9D4DC]/10 to-white/0 transition-opacity duration-500",
                    activeCard === index ? "opacity-100" : "opacity-0"
                  )}></div>
                  
                  <div className={cn(
                    "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOUQ0REMiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjhoMnY0em0wIDMwaC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptLTYgMTJoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30",
                    activeCard === index ? "opacity-80" : "opacity-0"
                  )}></div>
                  
                  <div className="h-full p-4 relative z-10">
                    {renderVisualization(index)}
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

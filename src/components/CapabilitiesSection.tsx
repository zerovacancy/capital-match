
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, BarChart2, GitCompareArrows, FileSpreadsheet } from "lucide-react";

const CapabilitiesSection = () => {
  const capabilities = [
    {
      title: "LP Profile Engine",
      description: "Build comprehensive investor profiles based on historical preferences, risk tolerance, and targeted returns.",
      icon: <UserRound className="w-10 h-10 text-lg-accent" />,
      benefits: ["Automated preference tracking", "Adaptive learning", "Regulatory compliance"],
      image: "/images/lp-profile-visualization.svg",
      imageAlt: "LP Profile Visualization"
    },
    {
      title: "Deal Analysis Engine",
      description: "Advanced algorithms to evaluate development opportunities against multiple investment criteria.",
      icon: <BarChart2 className="w-10 h-10 text-lg-accent" />,
      benefits: ["Multi-factor analysis", "Predictive modeling", "Market comparables"],
      image: "/images/deal-analysis-visualization.svg",
      imageAlt: "Deal Analysis Visualization"
    },
    {
      title: "Matching Algorithm",
      description: "AI-powered matching system to align investor profiles with the right development opportunities.",
      icon: <GitCompareArrows className="w-10 h-10 text-lg-accent" />,
      benefits: ["98% match accuracy", "Real-time updates", "Custom weighting"],
      image: "/images/matching-visualization.svg",
      imageAlt: "Matching Algorithm Visualization"
    },
    {
      title: "Reporting Generator",
      description: "Automated creation of detailed reports for investors, executives, and regulatory compliance.",
      icon: <FileSpreadsheet className="w-10 h-10 text-lg-accent" />,
      benefits: ["Custom templates", "Multi-format export", "Scheduled delivery"],
      image: "/images/reporting-visualization.svg",
      imageAlt: "Reporting Visualization"
    }
  ];

  return (
    <section id="capabilities" className="section-container">
      <div className="mb-12 text-center">
        <h2 className="section-title">Core Capabilities</h2>
        <p className="section-subtitle mx-auto">
          The LG Development platform leverages advanced AI to streamline the capital matching process
          with these powerful capabilities tailored to your specific needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {capabilities.map((capability, index) => (
          <Card key={index} className="feature-card group h-full overflow-hidden">
            <CardHeader className="pb-2">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                {capability.icon}
              </div>
              <CardTitle className="text-xl text-lg-blue">{capability.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <CardDescription className="text-base text-lg-gray mb-4">
                {capability.description}
              </CardDescription>
              <ul className="space-y-2 mb-4">
                {capability.benefits.map((benefit, i) => (
                  <li key={i} className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-lg-accent rounded-full mr-2"></span>
                    <span className="text-lg-gray-dark">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              {/* Platform Visualization */}
              <div className="mt-4 relative h-32 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-lg-blue-dark via-lg-blue to-lg-accent group-hover:from-lg-accent group-hover:to-lg-blue transition-all duration-500">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWOGgydjR6bTAgMzBoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiAxMmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
                  <div className="text-xs font-medium opacity-90 text-center">Platform Visualization</div>
                  
                  {/* Dynamic element for each capability */}
                  {index === 0 && (
                    <div className="flex items-center mt-2">
                      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                        <UserRound className="h-8 w-8 text-white" />
                      </div>
                      <div className="h-1 w-8 bg-white/40"></div>
                      <div className="h-10 w-20 rounded bg-white/20 flex items-center justify-center text-xs text-white/90">
                        Investor Profile
                      </div>
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className="grid grid-cols-3 gap-1 mt-2">
                      <div className="h-2 bg-green-400/60 rounded"></div>
                      <div className="h-3 bg-blue-400/60 rounded"></div>
                      <div className="h-4 bg-purple-400/60 rounded"></div>
                      <div className="h-5 bg-yellow-400/60 rounded"></div>
                      <div className="h-3 bg-red-400/60 rounded"></div>
                      <div className="h-2 bg-indigo-400/60 rounded"></div>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center text-xs">LP</div>
                      <div className="h-0.5 w-12 bg-white/40">
                        <div className="h-0.5 w-8 bg-green-400 animate-pulse"></div>
                      </div>
                      <div className="h-10 w-10 rounded border border-white/30 flex items-center justify-center text-xs">Deal</div>
                    </div>
                  )}
                  
                  {index === 3 && (
                    <div className="flex flex-col gap-1 mt-2 w-full px-4">
                      <div className="h-2 w-full bg-white/30 rounded"></div>
                      <div className="h-2 w-3/4 bg-white/30 rounded"></div>
                      <div className="h-2 w-5/6 bg-white/30 rounded"></div>
                      <div className="h-2 w-2/3 bg-white/30 rounded"></div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CapabilitiesSection;

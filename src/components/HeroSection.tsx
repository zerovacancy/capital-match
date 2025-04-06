
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Building2, ChevronDown, UserRound } from "lucide-react";

const HeroSection = () => {
  const scrollToCapabilities = () => {
    const element = document.getElementById('capabilities');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-lg-accent/20 to-lg-blue/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-lg-blue/10 to-lg-gray/5 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Overline */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-lg-blue/5 text-lg-blue mb-8">
          <Building2 className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Intelligent Capital Matching</span>
        </div>
        
        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-lg-blue-dark leading-tight mb-6 max-w-4xl">
          LG Development <span className="text-lg-accent">AI</span> Assistant
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-lg-gray mb-12 max-w-3xl">
          Automating the alignment of investor criteria with development opportunities through advanced AI and machine learning.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a href="/prototype">
            <Button className="btn-primary px-8 py-6 text-lg flex items-center gap-2">
              Explore Platform <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
          <Button variant="outline" className="btn-secondary px-8 py-6 text-lg" onClick={scrollToCapabilities}>
            View Features
          </Button>
        </div>
        
        {/* Visual element */}
        <div className="relative w-full max-w-4xl aspect-[16/9] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-lg-blue-dark via-lg-blue to-lg-accent opacity-95" />
          
          {/* Platform Visualization Content */}
          <div className="absolute inset-0 flex flex-col items-center text-white p-8">
            <h3 className="text-2xl font-bold mb-2">Platform Visualization</h3>
            <p className="max-w-md text-center text-white/80 mb-6">
              AI-powered matching algorithm analyzing investor preferences and development opportunities in real-time.
            </p>
            
            {/* Interactive visualization */}
            <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-8">
              {/* LP Profiles */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 mb-2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <UserRound className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className="text-sm font-medium">LP Profiles</span>
                <div className="flex flex-col gap-1 mt-2 w-28">
                  <div className="h-1.5 w-full bg-white/30 rounded-full"></div>
                  <div className="h-1.5 w-3/4 bg-white/30 rounded-full"></div>
                  <div className="h-1.5 w-5/6 bg-white/30 rounded-full"></div>
                </div>
              </div>
              
              {/* Connecting lines with animated pulse */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-0.5 bg-white/20 relative">
                  <div className="absolute top-0 left-0 h-full w-1/2 bg-white/60 animate-pulse rounded-full"></div>
                </div>
              </div>
              
              {/* AI matching engine in the middle */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-lg bg-white/20 mb-2 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30"></div>
                  <BarChart3 className="w-12 h-12 text-white" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-32 h-32 rounded-full border border-white/40 animate-ping"></div>
                  </div>
                </div>
                <span className="text-sm font-medium">AI Matching Engine</span>
                <div className="grid grid-cols-3 gap-1 mt-2">
                  <div className="h-1.5 w-full bg-green-400/60 rounded-full"></div>
                  <div className="h-1.5 w-full bg-blue-400/60 rounded-full"></div>
                  <div className="h-1.5 w-full bg-purple-400/60 rounded-full"></div>
                </div>
              </div>
              
              {/* Connecting lines with animated pulse */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-0.5 bg-white/20 relative">
                  <div className="absolute top-0 right-0 h-full w-1/2 bg-white/60 animate-pulse rounded-full"></div>
                </div>
              </div>
              
              {/* Deal proposals */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg bg-white/20 mb-2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded border border-white/30 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className="text-sm font-medium">Deal Proposals</span>
                <div className="flex flex-col gap-1 mt-2 w-28">
                  <div className="h-1.5 w-full bg-white/30 rounded-full"></div>
                  <div className="h-1.5 w-4/5 bg-white/30 rounded-full"></div>
                  <div className="h-1.5 w-2/3 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWOGgydjR6bTAgMzBoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiAxMmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button onClick={scrollToCapabilities} className="flex flex-col items-center text-lg-gray/50 hover:text-lg-blue transition-colors">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

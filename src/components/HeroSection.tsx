
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, ChevronDown } from "lucide-react";
import PlatformVisualization from '@/components/visualization/PlatformVisualization';

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
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#275E91]/20 to-[#C9D4DC]/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#7A8D79]/15 to-[#C9D4DC]/5 blur-3xl animate-pulse-slow animation-delay-2000" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-[#275E91]/10 animate-particle-move"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              animationDuration: `${Math.random() * 40 + 20}s`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: Math.random() * 0.5
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern overlay for depth */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNzVFOTEiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjhoMnY0em0wIDMwaC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptLTYgMTJoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Overline */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-lg-blue/5 text-lg-blue mb-8">
          <Building2 className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Intelligent Capital Matching</span>
        </div>
        
        {/* Main headline with animated gradient text */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-4xl animate-fade-in font-display tracking-tight">
          <span className="text-[#275E91]">LG Development</span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#275E91] to-[#7A8D79] animate-text-gradient">AI</span>
          <span className="text-[#275E91]"> Assistant</span>
        </h1>
        
        {/* Animated typing effect subtitle */}
        <div className="text-xl md:text-2xl text-[#4F5D75] mb-0 max-w-3xl">
          <p>
            Automating the alignment of investor criteria with development opportunities through advanced AI and machine learning.
          </p>
        </div>
        
        {/* Interactive Platform Visualization */}
        <div className="flex justify-center w-full mt-4 mb-6">
          <PlatformVisualization />
        </div>
        
        {/* CTA buttons with enhanced styling and animations */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in animation-delay-500">
          <a href="/prototype" className="transition-transform hover:scale-105 focus:scale-105 group">
            <Button className="bg-gradient-to-r from-[#275E91] to-[#275E91] hover:from-[#275E91] hover:to-[#7A8D79] transition-all duration-300 px-8 py-6 text-lg rounded-md font-semibold text-white shadow-lg hover:shadow-xl flex items-center gap-2 group-hover:gap-3">
              Explore Platform <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
          <Button 
            variant="outline" 
            className="border-[#275E91] text-[#275E91] px-8 py-6 text-lg hover:bg-[#275E91]/5 transition-all duration-300 shadow-lg hover:shadow-xl" 
            onClick={scrollToCapabilities}
          >
            View Features
          </Button>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <button 
            onClick={scrollToCapabilities} 
            className="flex flex-col items-center text-[#4F5D75]/50 hover:text-[#275E91] transition-all duration-300 transform hover:scale-110 group"
          >
            <span className="text-sm mb-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll to explore</span>
            <div className="relative">
              <ChevronDown className="w-6 h-6" />
              <div className="absolute inset-0 animate-ping opacity-30 rounded-full bg-[#275E91]/20 duration-700"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

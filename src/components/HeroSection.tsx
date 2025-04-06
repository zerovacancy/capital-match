
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Building2, ChevronDown } from "lucide-react";

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
          <Button className="btn-primary px-8 py-6 text-lg flex items-center gap-2">
            Request a Demo <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="btn-secondary px-8 py-6 text-lg">
            Learn More
          </Button>
        </div>
        
        {/* Visual element */}
        <div className="relative w-full max-w-4xl aspect-[16/9] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-lg-blue-dark via-lg-blue to-lg-accent opacity-95" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
            <BarChart3 className="w-16 h-16 mb-6 opacity-75" />
            <h3 className="text-2xl font-bold mb-4">Platform Visualization</h3>
            <p className="max-w-md text-center text-white/80">
              AI-powered matching algorithm analyzing investor preferences and development opportunities in real-time.
            </p>
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

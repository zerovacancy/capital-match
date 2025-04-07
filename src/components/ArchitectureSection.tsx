
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Database, Server, Cpu, CloudCog, ZoomIn, ZoomOut, AlertCircle } from "lucide-react";
import { useState } from 'react';
import ArchitectureDiagram from './visualization/ArchitectureDiagram';

const ArchitectureSection = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleImageError = () => {
    console.error("Failed to load architecture diagram image");
    setImageError(true);
  };

  const architectureComponents = [
    {
      title: "Data Ingestion Layer",
      description: "Collects and standardizes data from multiple sources including CRM systems, market data, and internal databases.",
      icon: <Database className="w-10 h-10 text-white" />,
      color: "bg-lg-blue"
    },
    {
      title: "Processing Core",
      description: "High-performance computing environment that runs ML models and analytics engines for real-time data processing.",
      icon: <Cpu className="w-10 h-10 text-white" />,
      color: "bg-lg-accent"
    },
    {
      title: "AI Engine",
      description: "Proprietary algorithms and machine learning models that power the matching logic and predictive analytics.",
      icon: <CloudCog className="w-10 h-10 text-white" />,
      color: "bg-lg-accent" 
    },
    {
      title: "API & Integration Layer",
      description: "Secure endpoints for exchanging data with external systems and presenting information to users.",
      icon: <Server className="w-10 h-10 text-white" />,
      color: "bg-lg-blue"
    }
  ];

  return (
    <section id="architecture" className="section-container bg-transparent">
      <div className="mb-16 text-center">
        <h2 className="section-title">Platform Architecture</h2>
        <p className="section-subtitle mx-auto">
          A modern, scalable design built for security, performance, and integration with existing systems.
        </p>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Architecture Diagram Visualization */}
        <div className="mb-16">
          {/* Diagram container with border including title and description */}
          <div className={`border-2 border-lg-blue/20 rounded-xl p-6 relative ${isZoomed ? 'max-h-[650px] overflow-auto' : ''}`}>
            {/* Zoom button */}
            <button 
              onClick={toggleZoom} 
              className="absolute top-3 right-3 z-10 flex items-center gap-1 px-3 py-1.5 rounded-md bg-lg-blue/10 text-lg-blue hover:bg-lg-blue/20 transition-colors"
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              <span className="text-sm">{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
            </button>
            
            {/* Centered title and description */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-lg-blue font-display mb-3">System Architecture Overview</h3>
              <p className="text-base text-lg-gray max-w-3xl mx-auto leading-relaxed">
                Our comprehensive architecture integrates data sources, security layers, and AI components through a scalable, multi-tiered approach.
              </p>
            </div>
            
            {/* Diagram */}
            <div className={`transition-all duration-300 ${isZoomed ? 'min-h-[350px]' : 'min-h-[350px]'}`}>
              <div className={`transition-transform duration-300 ${isZoomed ? 'scale-125 transform-origin-top-left' : ''}`}>
                <ArchitectureDiagram className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Architecture Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {architectureComponents.map((component, index) => (
            <Card key={index} className={`overflow-hidden shadow-md border-lg-border/60 ${index % 2 === 0 ? 'bg-transparent' : 'bg-transparent'}`}>
              <div className={`${component.color} p-4`}>
                <div className="flex items-center space-x-4">
                  {component.icon}
                  <h3 className="text-lg font-semibold text-white font-display">{component.title}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-lg-gray">{component.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Connection Lines SVG - Mobile hidden, visible on desktop */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
          <svg width="100%" height="100%" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M400 100 L400 400" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M200 300 L600 300" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M200 200 L600 400" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M200 400 L600 200" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
            
            {/* Connection points */}
            <circle cx="400" cy="100" r="3" fill="#275E91" opacity="0.5" />
            <circle cx="400" cy="300" r="3" fill="#7A8D79" opacity="0.5" />
            <circle cx="400" cy="400" r="3" fill="#C9D4DC" opacity="0.5" />
            <circle cx="200" cy="200" r="3" fill="#275E91" opacity="0.5" />
            <circle cx="200" cy="400" r="3" fill="#7A8D79" opacity="0.5" />
            <circle cx="600" cy="200" r="3" fill="#7A8D79" opacity="0.5" />
            <circle cx="600" cy="400" r="3" fill="#275E91" opacity="0.5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;

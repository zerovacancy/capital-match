
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Database, Server, Cpu, CloudCog } from "lucide-react";

const ArchitectureSection = () => {
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
      color: "bg-lg-blue-light"
    },
    {
      title: "API & Integration Layer",
      description: "Secure endpoints for exchanging data with external systems and presenting information to users.",
      icon: <Server className="w-10 h-10 text-white" />,
      color: "bg-lg-gray"
    }
  ];

  return (
    <section id="architecture" className="section-container bg-gray-50">
      <div className="mb-12 text-center">
        <h2 className="section-title">Platform Architecture</h2>
        <p className="section-subtitle mx-auto">
          A modern, scalable design built for security, performance, and integration with existing systems.
        </p>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Architecture Diagram Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
          <h3 className="text-lg font-semibold text-lg-blue mb-4 text-center">System Architecture Diagram</h3>
          <div className="aspect-[16/9] rounded-lg flex items-center justify-center relative">
            {/* Architecture layers */}
            <div className="w-full max-w-3xl mx-auto">
              {/* Data Sources Layer */}
              <div className="w-full py-3 px-4 bg-gray-100 rounded-t-lg border border-gray-200 text-center mb-6 relative">
                <h4 className="text-sm font-semibold text-lg-gray-dark">DATA SOURCES & INPUTS</h4>
                <div className="flex justify-between px-8 mt-2">
                  <div className="p-2 bg-white rounded shadow-sm border border-gray-200 text-xs text-center w-1/5">
                    <Database className="w-4 h-4 mx-auto mb-1 text-lg-blue" />
                    <span>HubSpot CRM</span>
                  </div>
                  <div className="p-2 bg-white rounded shadow-sm border border-gray-200 text-xs text-center w-1/5">
                    <span>Pro Forma Sheets</span>
                  </div>
                  <div className="p-2 bg-white rounded shadow-sm border border-gray-200 text-xs text-center w-1/5">
                    <span>Pitch Decks</span>
                  </div>
                  <div className="p-2 bg-white rounded shadow-sm border border-gray-200 text-xs text-center w-1/5">
                    <span>Market Data</span>
                  </div>
                </div>
                {/* Connecting arrow */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                    <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              
              {/* Security Layer */}
              <div className="w-full py-3 px-4 bg-lg-blue/10 rounded-lg border border-lg-blue/20 text-center mb-6 relative">
                <h4 className="text-sm font-semibold text-lg-blue">DATA GOVERNANCE & SECURITY LAYER</h4>
                <div className="flex justify-between px-8 mt-2">
                  <div className="p-2 bg-white rounded shadow-sm text-xs text-center w-1/5 bg-white/60">
                    <span>Role-based Access</span>
                  </div>
                  <div className="p-2 bg-white rounded shadow-sm text-xs text-center w-1/5 bg-white/60">
                    <span>Encryption</span>
                  </div>
                  <div className="p-2 bg-white rounded shadow-sm text-xs text-center w-1/5 bg-white/60">
                    <span>Compliance</span>
                  </div>
                  <div className="p-2 bg-white rounded shadow-sm text-xs text-center w-1/5 bg-white/60">
                    <span>Audit Trails</span>
                  </div>
                </div>
                {/* Connecting arrow */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                    <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              
              {/* AI Core Layer */}
              <div className="w-full py-3 px-4 bg-lg-accent/15 rounded-lg border border-lg-accent/20 text-center mb-6 relative">
                <h4 className="text-sm font-semibold text-lg-accent">AI ASSISTANT CORE (MCP SYSTEM)</h4>
                <div className="grid grid-cols-3 gap-3 px-4 mt-2">
                  <div className="p-2 bg-white/70 rounded shadow-sm text-xs text-center">
                    <span>LP Profile Engine</span>
                  </div>
                  <div className="p-2 bg-white/70 rounded shadow-sm text-xs text-center">
                    <span>Deal Analysis Engine</span>
                  </div>
                  <div className="p-2 bg-white/70 rounded shadow-sm text-xs text-center">
                    <span>Capital Raise Tracker</span>
                  </div>
                  <div className="p-2 bg-white/70 rounded shadow-sm text-xs text-center">
                    <span>Market Analysis Engine</span>
                  </div>
                  <div className="p-2 bg-white/70 rounded shadow-sm text-xs text-center">
                    <CloudCog className="w-4 h-4 mx-auto mb-1 text-lg-accent" />
                    <span>Matching Algorithm</span>
                  </div>
                  <div className="p-2 bg-white/70 rounded shadow-sm text-xs text-center">
                    <span>Reporting Generator</span>
                  </div>
                </div>
                {/* Connecting arrow */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                    <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              
              {/* Outputs Layer */}
              <div className="w-full py-3 px-4 bg-gray-100 rounded-b-lg border border-gray-200 text-center relative">
                <h4 className="text-sm font-semibold text-lg-gray-dark">OUTPUTS & INTEGRATIONS</h4>
                <div className="flex justify-between px-8 mt-2">
                  <div className="p-2 bg-white rounded shadow-sm border border-gray-200 text-xs text-center w-1/5">
                    <span>MS Teams Updates</span>
                  </div>
                  <div className="p-2 bg-white rounded shadow-sm border border-gray-200 text-xs text-center w-1/5">
                    <span>Office 365 Docs</span>
                  </div>
                  <div className="p-2 bg-white rounded shadow-sm border border-gray-200 text-xs text-center w-1/5">
                    <Server className="w-4 h-4 mx-auto mb-1 text-lg-gray" />
                    <span>HubSpot Actions</span>
                  </div>
                  <div className="p-2 bg-white rounded shadow-sm border border-gray-200 text-xs text-center w-1/5">
                    <span>Secure Documents</span>
                  </div>
                </div>
              </div>
              
              {/* Animated dots to show data flow */}
              <div className="absolute left-1/2 top-1/3 w-0.5 h-1/3 bg-gray-200 overflow-hidden">
                <div className="w-1.5 h-1.5 bg-lg-accent rounded-full absolute animate-pulse" style={{ animation: "flow 2s infinite" }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Architecture Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {architectureComponents.map((component, index) => (
            <Card key={index} className="overflow-hidden shadow-md">
              <div className={`${component.color} p-4`}>
                <div className="flex items-center space-x-4">
                  {component.icon}
                  <h3 className="text-lg font-semibold text-white">{component.title}</h3>
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
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;

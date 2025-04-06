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
      
      <div className="relative max-w-5xl mx-auto">
        {/* Architecture Diagram - Using enhanced SVG */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12 border border-gray-100">
          <h3 className="text-xl font-semibold text-lg-blue mb-6 text-center">System Architecture Overview</h3>
          
          <div className="relative aspect-video w-full overflow-hidden">
            {/* SVG Architecture Diagram */}
            <svg width="100%" height="100%" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
              {/* Definitions for gradients and patterns */}
              <defs>
                {/* Data Sources gradient */}
                <linearGradient id="ds-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1F4B8E" />
                  <stop offset="100%" stopColor="#275E91" />
                </linearGradient>
                
                {/* Security Layer gradient */}
                <linearGradient id="sl-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#275E91" />
                  <stop offset="100%" stopColor="#396FA0" />
                </linearGradient>
                
                {/* AI Core gradient */}
                <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7A8D79" />
                  <stop offset="100%" stopColor="#8A9D89" />
                </linearGradient>
                
                {/* Feedback Loop gradient */}
                <linearGradient id="fb-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#396FA0" />
                  <stop offset="100%" stopColor="#4A80B1" />
                </linearGradient>
                
                {/* Outputs gradient */}
                <linearGradient id="out-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9D4DC" />
                  <stop offset="100%" stopColor="#D9E4EC" />
                </linearGradient>
                
                {/* Connection Arrow definitions */}
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#8896A6" />
                </marker>
                
                {/* Pattern for container backgrounds */}
                <pattern id="grid-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="none"/>
                  <path d="M 20 0 L 0 0 0 20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" fill="none" />
                </pattern>
              </defs>
              
              {/* Background */}
              <rect width="1000" height="600" fill="#FFFFFF" rx="8" ry="8" />
              
              {/* DATA SOURCES & INPUTS */}
              <g transform="translate(100, 40)">
                <rect width="800" height="90" rx="6" ry="6" fill="url(#ds-gradient)" />
                <rect width="800" height="90" rx="6" ry="6" fill="url(#grid-pattern)" />
                
                <text x="400" y="25" fontFamily="Inter, sans-serif" fontSize="16" fill="white" textAnchor="middle" fontWeight="600">
                  DATA SOURCES & INPUTS
                </text>
                
                {/* Data Source Icons */}
                <g transform="translate(100, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    HubSpot CRM
                  </text>
                </g>
                
                <g transform="translate(260, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Pro Forma Sheets
                  </text>
                </g>
                
                <g transform="translate(420, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Pitch Decks
                  </text>
                </g>
                
                <g transform="translate(580, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Market/Property Data
                  </text>
                </g>
              </g>
              
              {/* Arrow 1 */}
              <line x1="500" y1="130" x2="500" y2="155" stroke="#8896A6" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="4,2" />
              
              {/* DATA GOVERNANCE & SECURITY LAYER */}
              <g transform="translate(100, 155)">
                <rect width="800" height="90" rx="6" ry="6" fill="url(#sl-gradient)" />
                <rect width="800" height="90" rx="6" ry="6" fill="url(#grid-pattern)" />
                
                <text x="400" y="25" fontFamily="Inter, sans-serif" fontSize="16" fill="white" textAnchor="middle" fontWeight="600">
                  DATA GOVERNANCE & SECURITY LAYER
                </text>
                
                {/* Security Features */}
                <g transform="translate(100, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Role-based Access
                  </text>
                </g>
                
                <g transform="translate(260, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Encryption Controls
                  </text>
                </g>
                
                <g transform="translate(420, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Compliance Mgmt
                  </text>
                </g>
                
                <g transform="translate(580, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Audit Trails
                  </text>
                </g>
              </g>
              
              {/* Arrow 2 */}
              <line x1="500" y1="245" x2="500" y2="270" stroke="#8896A6" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="4,2" />
              
              {/* AI ASSISTANT CORE */}
              <g transform="translate(100, 270)">
                <rect width="800" height="120" rx="6" ry="6" fill="url(#ai-gradient)" />
                <rect width="800" height="120" rx="6" ry="6" fill="url(#grid-pattern)" />
                
                <text x="400" y="25" fontFamily="Inter, sans-serif" fontSize="16" fill="white" textAnchor="middle" fontWeight="600">
                  AI ASSISTANT CORE (MCP SYSTEM)
                </text>
                
                {/* AI Core Components - First Row */}
                <g transform="translate(100, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    LP Profile Engine
                  </text>
                </g>
                
                <g transform="translate(260, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Deal Analysis Engine
                  </text>
                </g>
                
                <g transform="translate(420, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Capital Raise Tracker
                  </text>
                </g>
                
                {/* AI Core Components - Second Row */}
                <g transform="translate(100, 85)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Market Analysis
                  </text>
                </g>
                
                <g transform="translate(260, 85)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Matching Algorithm
                  </text>
                </g>
                
                <g transform="translate(420, 85)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Reporting Generator
                  </text>
                </g>
              </g>
              
              {/* Arrow 3 */}
              <line x1="500" y1="390" x2="500" y2="415" stroke="#8896A6" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="4,2" />
              
              {/* FEEDBACK LOOPS */}
              <g transform="translate(100, 415)">
                <rect width="800" height="90" rx="6" ry="6" fill="url(#fb-gradient)" />
                <rect width="800" height="90" rx="6" ry="6" fill="url(#grid-pattern)" />
                
                <text x="400" y="25" fontFamily="Inter, sans-serif" fontSize="16" fill="white" textAnchor="middle" fontWeight="600">
                  AI ADAPTATION & FEEDBACK LOOPS
                </text>
                
                {/* Feedback Components */}
                <g transform="translate(100, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    LP Feedback
                  </text>
                </g>
                
                <g transform="translate(260, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Deal Outcomes
                  </text>
                </g>
                
                <g transform="translate(420, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Outreach Optimization
                  </text>
                </g>
                
                <g transform="translate(580, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(255,255,255,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="white" textAnchor="middle">
                    Performance Learning
                  </text>
                </g>
              </g>
              
              {/* Arrow 4 */}
              <line x1="500" y1="505" x2="500" y2="530" stroke="#8896A6" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="4,2" />
              
              {/* OUTPUTS & INTEGRATIONS */}
              <g transform="translate(100, 530)">
                <rect width="800" height="90" rx="6" ry="6" fill="url(#out-gradient)" />
                <rect width="800" height="90" rx="6" ry="6" fill="url(#grid-pattern)" />
                
                <text x="400" y="25" fontFamily="Inter, sans-serif" fontSize="16" fill="#275E91" textAnchor="middle" fontWeight="600">
                  OUTPUTS & INTEGRATIONS
                </text>
                
                {/* Output Components */}
                <g transform="translate(100, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(39,94,145,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="#275E91" textAnchor="middle">
                    MS Teams Updates
                  </text>
                </g>
                
                <g transform="translate(260, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(39,94,145,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="#275E91" textAnchor="middle">
                    Office 365 Docs
                  </text>
                </g>
                
                <g transform="translate(420, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(39,94,145,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="#275E91" textAnchor="middle">
                    HubSpot Actions
                  </text>
                </g>
                
                <g transform="translate(580, 45)">
                  <rect width="120" height="30" rx="4" ry="4" fill="rgba(39,94,145,0.15)" />
                  <text x="60" y="20" fontFamily="Inter, sans-serif" fontSize="12" fill="#275E91" textAnchor="middle">
                    ShareFile Secure Docs
                  </text>
                </g>
              </g>
            </svg>
          </div>
          
          <div className="mt-6 text-sm text-lg-gray-dark max-w-3xl mx-auto">
            <p className="text-center">
              Our architecture features a multi-layered approach with robust security, AI-powered core capabilities, 
              and continuous learning through feedback loops. Data flows securely from external sources through our processing layers
              to deliver actionable outputs and integrations with your existing tools.
            </p>
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
      </div>
    </section>
  );
};

export default ArchitectureSection;
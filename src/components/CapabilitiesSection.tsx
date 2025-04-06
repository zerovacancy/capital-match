
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, BarChart2, GitCompareArrows, FileSpreadsheet } from "lucide-react";

const CapabilitiesSection = () => {
  const capabilities = [
    {
      title: "LP Profile Engine",
      description: "Build comprehensive investor profiles based on historical preferences, risk tolerance, and targeted returns.",
      icon: <UserRound className="w-10 h-10 text-lg-accent" />,
      benefits: ["Automated preference tracking", "Adaptive learning", "Regulatory compliance"]
    },
    {
      title: "Deal Analysis Engine",
      description: "Advanced algorithms to evaluate development opportunities against multiple investment criteria.",
      icon: <BarChart2 className="w-10 h-10 text-lg-accent" />,
      benefits: ["Multi-factor analysis", "Predictive modeling", "Market comparables"]
    },
    {
      title: "Matching Algorithm",
      description: "AI-powered matching system to align investor profiles with the right development opportunities.",
      icon: <GitCompareArrows className="w-10 h-10 text-lg-accent" />,
      benefits: ["98% match accuracy", "Real-time updates", "Custom weighting"]
    },
    {
      title: "Reporting Generator",
      description: "Automated creation of detailed reports for investors, executives, and regulatory compliance.",
      icon: <FileSpreadsheet className="w-10 h-10 text-lg-accent" />,
      benefits: ["Custom templates", "Multi-format export", "Scheduled delivery"]
    }
  ];

  return (
    <section id="capabilities" className="section-container">
      <div className="mb-12 text-center">
        <h2 className="section-title">Core Capabilities</h2>
        <p className="section-subtitle mx-auto">
          Our platform leverages advanced AI to streamline the capital matching process
          with these powerful capabilities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {capabilities.map((capability, index) => (
          <Card key={index} className="feature-card group h-full">
            <CardHeader className="pb-2">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                {capability.icon}
              </div>
              <CardTitle className="text-xl text-lg-blue">{capability.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-lg-gray mb-4">
                {capability.description}
              </CardDescription>
              <ul className="space-y-2">
                {capability.benefits.map((benefit, i) => (
                  <li key={i} className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-lg-accent rounded-full mr-2"></span>
                    <span className="text-lg-gray-dark">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CapabilitiesSection;

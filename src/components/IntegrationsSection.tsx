
import React from 'react';
import { DollarSign, Phone, PieChart, FileText, BriefcaseBusiness, BarChartHorizontal } from "lucide-react";

const IntegrationsSection = () => {
  const integrations = [
    {
      name: "HubSpot",
      category: "CRM & Marketing",
      description: "Sync investor profiles and communication data",
      icon: <Phone className="w-8 h-8" />
    },
    {
      name: "MS Teams",
      category: "Communication",
      description: "Real-time notifications and collaborative workflows",
      icon: <BriefcaseBusiness className="w-8 h-8" />
    },
    {
      name: "Procore",
      category: "Project Management",
      description: "Import development project details and timelines",
      icon: <FileText className="w-8 h-8" />
    },
    {
      name: "Power BI",
      category: "Analytics",
      description: "Advanced reporting and visualization dashboards",
      icon: <PieChart className="w-8 h-8" />
    },
    {
      name: "QuickBooks",
      category: "Finance",
      description: "Financial data integration for investment tracking",
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      name: "Salesforce",
      category: "CRM",
      description: "Comprehensive investor relationship management",
      icon: <BarChartHorizontal className="w-8 h-8" />
    }
  ];

  return (
    <section id="integrations" className="section-container bg-gray-50">
      <div className="mb-12 text-center">
        <h2 className="section-title">Integration Ecosystem</h2>
        <p className="section-subtitle mx-auto">
          Seamlessly connect with your existing business tools and platforms.
        </p>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        {/* Central platform element */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full gradient-bg flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h3 className="font-bold text-sm md:text-xl">LG AI</h3>
            <p className="text-xs md:text-sm">Platform</p>
          </div>
        </div>
        
        {/* Integration spokes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {integrations.map((integration, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-100 relative z-20">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-lg-blue/5 flex items-center justify-center mb-4">
                  <div className="text-lg-accent">{integration.icon}</div>
                </div>
                <h3 className="font-bold text-lg text-lg-blue-dark">{integration.name}</h3>
                <div className="text-xs font-medium text-lg-accent mb-2">{integration.category}</div>
                <p className="text-sm text-lg-gray">{integration.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Connection lines - visible only on desktop */}
        <div className="hidden md:block absolute inset-0 -z-0">
          <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M400 300 L200 150" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M400 300 L200 300" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M400 300 L200 450" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M400 300 L600 150" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M400 300 L600 300" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M400 300 L600 450" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;

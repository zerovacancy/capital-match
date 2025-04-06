
import React from 'react';
import { 
  Building2, 
  MessageSquareText, 
  FileSpreadsheet, 
  ListChecks,
  Mail, 
  HardDriveDownload,
  FileCheck,
  Home 
} from "lucide-react";

const IntegrationsSection = () => {
  const integrations = [
    {
      name: "Procore",
      category: "Construction",
      description: "Construction project management and tracking",
      icon: <Building2 className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/procore_logo.webp"
    },
    {
      name: "Sage",
      category: "Finance",
      description: "Financial and accounting management",
      icon: <FileSpreadsheet className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/sage_logo.webp"
    },
    {
      name: "HubSpot",
      category: "CRM & Marketing",
      description: "CRM and marketing automation",
      icon: <Home className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/hubspot_logo.webp"
    },
    {
      name: "Microsoft Teams",
      category: "Communication",
      description: "Internal team communication and collaboration",
      icon: <MessageSquareText className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/teams_logo.webp"
    },
    {
      name: "Office 365",
      category: "Productivity",
      description: "Email, documents, Excel, and productivity tools",
      icon: <Mail className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/office365_logo.webp"
    },
    {
      name: "Microsoft Lists",
      category: "Project Tracking",
      description: "Task and project tracking management",
      icon: <ListChecks className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/lists_logo.webp"
    },
    {
      name: "OneDrive",
      category: "File Storage",
      description: "Internal file storage and organization",
      icon: <HardDriveDownload className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/onedrive_logo.webp"
    },
    {
      name: "ShareFile",
      category: "Document Sharing",
      description: "Secure document sharing with external parties",
      icon: <FileCheck className="w-8 h-8" />,
      logo: "/assets/images/home/integrations/logos/sharefile_logo.webp"
    }
  ];

  return (
    <section id="integrations" className="section-container bg-background">
      <div className="mb-16 text-center">
        <h2 className="section-title">Integration Ecosystem</h2>
        <p className="section-subtitle mx-auto">
          Seamlessly connect with your existing business tools and platforms.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Header explaining platform integration */}
        <div className="mb-12 bg-footer rounded-xl p-6 shadow-md text-center border border-highlight/30">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-lg-blue-dark via-lg-blue to-lg-accent rounded-full flex items-center justify-center mb-4">
            <div className="text-white font-bold text-xl">LG AI</div>
          </div>
          <h3 className="h3 mb-2">Capital Match AI Platform</h3>
          <p className="max-w-2xl mx-auto">
            Our platform seamlessly integrates with your existing technology stack to provide a unified experience across all your tools and systems.
          </p>
        </div>
        
        {/* Integration cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {integrations.map((integration, index) => (
            <div key={index} className="bg-footer rounded-lg shadow-md p-6 border border-highlight/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 flex items-center justify-center mb-4 transition-all duration-300">
                  <img 
                    src={integration.logo} 
                    alt={`${integration.name} logo`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="h4 mb-1">{integration.name}</h3>
                <div className="text-xs font-medium text-lg-accent mb-2">{integration.category}</div>
                <p className="small-text">{integration.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Visual representation of system connections */}
        <div className="mt-16 bg-footer rounded-xl p-8 shadow-md border border-highlight/30">
          <h3 className="h3 mb-6 text-center">Integration Architecture</h3>
          <div className="relative w-full" style={{ height: "400px" }}>
            {/* Center platform */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-lg-blue-dark via-lg-blue to-lg-accent rounded-lg flex items-center justify-center z-30 shadow-lg">
              <div className="text-white text-center px-1">
                <p className="font-bold text-xs">Capital Match</p>
                <p className="text-[10px]">AI Platform</p>
                <div className="w-full h-0.5 bg-white/20 my-0.5"></div>
                <p className="text-[8px]">Integration Hub</p>
              </div>
            </div>
            
            {/* Integration nodes - positioned in a circle around the center */}
            {integrations.map((integration, index) => {
              // Calculate position in a circle
              const totalItems = integrations.length;
              const angle = (Math.PI * 2 * index) / totalItems;
              const radius = 180; // Increased radius to prevent overlap
              const x = Math.cos(angle) * radius; 
              const y = Math.sin(angle) * radius;
              
              return (
                <div 
                  key={index} 
                  className="absolute w-20 h-20 bg-footer rounded-full shadow-md flex items-center justify-center border border-highlight/40 z-20"
                  style={{ 
                    left: `calc(50% + ${x}px - 40px)`, 
                    top: `calc(50% + ${y}px - 40px)`,
                  }}
                >
                  <img 
                    src={integration.logo} 
                    alt={`${integration.name} logo`} 
                    className="w-12 h-12 object-contain"
                  />
                  
                  {/* Label - position dynamically based on position in circle */}
                  <div 
                    className={`absolute whitespace-nowrap text-xs font-medium bg-footer px-2 py-1 rounded shadow-sm z-40 ${
                      // Position labels based on which quadrant they're in
                      y < 0 ? '-bottom-8' : 'top-[-32px]'
                    }`}
                  >
                    {integration.name}
                  </div>
                </div>
              );
            })}
            
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {integrations.map((_, index) => {
                const totalItems = integrations.length;
                const angle = (Math.PI * 2 * index) / totalItems;
                const innerRadius = 6; // Central platform radius in %
                const outerRadius = 36; // Outer circle radius in %
                
                // Calculate start and end points
                const innerX = Math.cos(angle) * innerRadius + 50;
                const innerY = Math.sin(angle) * innerRadius + 50;
                const outerX = Math.cos(angle) * outerRadius + 50;
                const outerY = Math.sin(angle) * outerRadius + 50;
                
                return (
                  <path 
                    key={index}
                    d={`M${innerX} ${innerY} L${outerX} ${outerY}`} 
                    stroke="#C9D4DC" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 1"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;

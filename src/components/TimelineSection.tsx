
import React from 'react';

const TimelineSection = () => {
  const timelineSteps = [
    {
      phase: "Phase 1",
      title: "Foundation",
      description: "Setting up the core infrastructure and data models required for the platform.",
      tasks: ["Data architecture design", "LP profile schema development", "Integration framework setup"],
      timeline: "Q2 2025",
      status: "Planned"
    },
    {
      phase: "Phase 2",
      title: "Core Development",
      description: "Building the essential engines and algorithms that power the platform.",
      tasks: ["LP Profile Engine development", "Deal Analysis Engine build", "Initial matching algorithm"],
      timeline: "Q3 2025",
      status: "Planned"
    },
    {
      phase: "Phase 3",
      title: "Advanced Features",
      description: "Enhancing the platform with sophisticated AI capabilities and reporting.",
      tasks: ["AI model training", "Advanced matching algorithm", "Reporting generator implementation"],
      timeline: "Q4 2025",
      status: "Planned"
    },
    {
      phase: "Phase 4",
      title: "Deployment & Optimization",
      description: "Launching the platform and iteratively improving based on real-world feedback.",
      tasks: ["Beta testing with select LPs", "Full deployment", "Continuous improvement cycle"],
      timeline: "Q1 2026",
      status: "Planned"
    }
  ];

  return (
    <section id="timeline" className="section-container">
      <div className="mb-12 text-center">
        <h2 className="section-title">Implementation Timeline</h2>
        <p className="section-subtitle mx-auto">
          Our strategic roadmap for developing and deploying the AI Assistant platform.
        </p>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        {/* Horizontal timeline for desktop */}
        <div className="hidden md:block">
          {/* Timeline line */}
          <div className="absolute top-1/3 left-0 w-full h-1 bg-gray-200"></div>
          
          {/* Timeline steps */}
          <div className="grid grid-cols-4 gap-4">
            {timelineSteps.map((step, index) => (
              <div key={index} className="relative pt-12">
                {/* Timeline marker */}
                <div className="absolute top-[calc(1/3*100%_-_2rem)] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-lg-accent flex items-center justify-center">
                  <span className="font-bold text-lg-accent">{index + 1}</span>
                </div>
                
                {/* Content card */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 h-full">
                  <div className="text-xs font-semibold text-lg-accent mb-2">{step.phase}</div>
                  <h3 className="text-lg font-bold text-lg-blue-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-lg-gray mb-4">{step.description}</p>
                  <div className="mb-4">
                    <ul className="text-xs space-y-1">
                      {step.tasks.map((task, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-lg-blue rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span className="text-lg-gray-dark">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-lg-gray">{step.timeline}</span>
                    <span className="text-xs py-1 px-2 bg-lg-blue/10 text-lg-blue rounded-full">{step.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Vertical timeline for mobile */}
        <div className="md:hidden">
          <div className="relative pl-8 border-l-2 border-gray-200 space-y-12">
            {timelineSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline marker */}
                <div className="absolute top-0 -left-[25px] w-12 h-12 rounded-full bg-white border-4 border-lg-accent flex items-center justify-center">
                  <span className="font-bold text-lg-accent">{index + 1}</span>
                </div>
                
                {/* Content card */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="text-xs font-semibold text-lg-accent mb-2">{step.phase}</div>
                  <h3 className="text-lg font-bold text-lg-blue-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-lg-gray mb-4">{step.description}</p>
                  <div className="mb-4">
                    <ul className="text-xs space-y-1">
                      {step.tasks.map((task, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-lg-blue rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span className="text-lg-gray-dark">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-lg-gray">{step.timeline}</span>
                    <span className="text-xs py-1 px-2 bg-lg-blue/10 text-lg-blue rounded-full">{step.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

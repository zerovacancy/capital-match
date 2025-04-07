
import React from 'react';
import { CircleCheckBig, Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const ValueSection = () => {
  const metrics = [
    {
      title: "Time Savings",
      description: "Reduction in time spent matching investors to opportunities",
      value: "85%",
      icon: <Clock className="w-5 h-5 text-lg-accent" />,
      progress: 85
    },
    {
      title: "Capital Allocation",
      description: "Improved efficiency in capital allocation process",
      value: "3.5x",
      icon: <DollarSign className="w-5 h-5 text-lg-accent" />,
      progress: 70
    },
    {
      title: "LP Satisfaction",
      description: "Increase in limited partner satisfaction scores",
      value: "95%",
      icon: <Users className="w-5 h-5 text-lg-accent" />,
      progress: 95
    },
    {
      title: "Deal Match Rate",
      description: "Successful matches between LPs and development projects",
      value: "98%",
      icon: <TrendingUp className="w-5 h-5 text-lg-accent" />,
      progress: 98
    }
  ];

  const benefits = [
    "Faster capital deployment cycle",
    "Reduced administrative overhead",
    "Data-driven investment decisions",
    "Higher quality investor relationships",
    "Enhanced regulatory compliance",
    "Scalable investment operations"
  ];

  return (
    <section id="value" className="section-container">
      <div className="mb-16 text-center">
        <h2 className="section-title">Value Proposition</h2>
        <p className="section-subtitle mx-auto">
          The tangible benefits and ROI our AI platform delivers to LG Development and its investment partners.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card-bg-primary rounded-xl shadow-lg border border-lg-border/60 p-6 h-full">
            <h3 className="h3 mb-6">Performance Metrics</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {metrics.map((metric, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center mb-2">
                    <div className="mr-2">{metric.icon}</div>
                    <h4 className="h5 text-lg-blue">{metric.title}</h4>
                  </div>
                  <p className="small-text mb-3">{metric.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-lg-gray-dark">0%</span>
                    <span className="text-2xl font-bold text-lg-blue">{metric.value}</span>
                    <span className="text-xs text-lg-gray-dark">100%</span>
                  </div>
                  <Progress value={metric.progress} className="h-2 bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="card-bg-primary rounded-xl shadow-lg border border-lg-border/60 p-6 h-full">
            <h3 className="h3 mb-6">Key Benefits</h3>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CircleCheckBig className="w-5 h-5 text-lg-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-lg-gray-dark">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 p-4 rounded-lg bg-lg-blue/5 border border-lg-blue/20 shadow-md">
              <h4 className="h5 mb-2">ROI Projection</h4>
              <p className="small-text mb-3">
                Based on current metrics, projected ROI within the first year of implementation:
              </p>
              <div className="text-3xl font-bold text-lg-accent text-center">
                320%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;

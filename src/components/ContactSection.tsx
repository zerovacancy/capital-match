
import React from 'react';
import { Building2, Mail, Phone, Linkedin, Github } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-[#1c4b7e]">
      {/* Solid background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#1c4b7e]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-white/0"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-display tracking-tight">
            LG Development AI Platform
          </h2>
          <p className="text-xl mb-12 text-white/90">
            Custom-built for LG Development's strategic objectives
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 text-left text-white">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm opacity-75">Corporate Office</div>
                <div className="text-lg">LG Development Group, Chicago</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm opacity-75">Platform Support</div>
                <div className="text-lg">Internal Tech Team</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm opacity-75">Email</div>
                <div className="text-lg">team@lgdevelopment.com</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm opacity-75">Repository</div>
                <div className="text-lg">Internal GitLab</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

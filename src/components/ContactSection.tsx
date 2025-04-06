
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg opacity-95 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Investment Matching?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-lg">
              Take the next step in revolutionizing how you connect capital with development projects.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm opacity-75">Email Us</div>
                  <div className="text-lg">contact@lgdevelopment.com</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm opacity-75">Call Us</div>
                  <div className="text-lg">+1 (555) 123-4567</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm opacity-75">Connect</div>
                  <div className="text-lg">LG Development Group</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Card className="shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-lg-blue-dark mb-6">Schedule a Demo</h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-lg-gray-dark mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lg-accent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-lg-gray-dark mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lg-accent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-lg-gray-dark mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lg-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-lg-gray-dark mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lg-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-lg-gray-dark mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lg-accent"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full py-6 bg-lg-blue hover:bg-lg-blue-dark text-white text-lg font-semibold flex items-center justify-center gap-2">
                    Request Demo <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

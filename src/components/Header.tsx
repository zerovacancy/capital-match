
import React from 'react';
import { Button } from "@/components/ui/button";
import { Building, ChevronRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isPrototypePage = location.pathname === '/prototype';

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" className="flex items-center">
              <img 
                src="/assets/images/global/logos/lg-development/LG-Design-Logo_Black-e1640047593286-1024x535.png" 
                alt="LG Development Logo" 
                className="h-12 w-auto"
              />
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-lg-gray hover:text-lg-blue focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-10">
            {isPrototypePage ? (
              <>
                <button 
                  onClick={() => {
                    const element = document.querySelector('[data-value="dashboard"]');
                    if (element) (element as HTMLElement).click();
                  }} 
                  className="text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium cursor-pointer bg-transparent border-none text-left"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    const element = document.querySelector('[data-value="lp-profiles"]');
                    if (element) (element as HTMLElement).click();
                  }} 
                  className="text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium cursor-pointer bg-transparent border-none text-left"
                >
                  LP Profiles
                </button>
                <button 
                  onClick={() => {
                    const element = document.querySelector('[data-value="deal-analyzer"]');
                    if (element) (element as HTMLElement).click();
                  }} 
                  className="text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium cursor-pointer bg-transparent border-none text-left"
                >
                  Deal Analyzer
                </button>
                <button 
                  onClick={() => {
                    const element = document.querySelector('[data-value="matching-engine"]');
                    if (element) (element as HTMLElement).click();
                  }} 
                  className="text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium cursor-pointer bg-transparent border-none text-left"
                >
                  Matching Engine
                </button>
              </>
            ) : (
              <>
                <a href="#capabilities" className="text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium">
                  Capabilities
                </a>
                <a href="#architecture" className="text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium">
                  Architecture
                </a>
                <a href="#timeline" className="text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium">
                  Timeline
                </a>
                <a href="#integrations" className="text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium">
                  Integrations
                </a>
                <a href="#value" className="text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium">
                  Value
                </a>
              </>
            )}
          </nav>
          
          {/* CTA button */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {isPrototypePage ? (
              <a href="/">
                <Button className="ml-8 btn-primary flex items-center gap-2">
                  Back to Home <ChevronRight className="h-4 w-4" />
                </Button>
              </a>
            ) : (
              <a href="/prototype">
                <Button className="ml-8 btn-primary flex items-center gap-2">
                  Explore Platform <ChevronRight className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden absolute top-[72px] inset-x-0 bg-white shadow-lg transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-4">
          {isPrototypePage ? (
            <>
              <button 
                onClick={() => {
                  const element = document.querySelector('[data-value="dashboard"]');
                  if (element) (element as HTMLElement).click();
                  setMobileMenuOpen(false);
                }} 
                className="block py-2 w-full text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium cursor-pointer bg-transparent border-none text-left"
              >
                Dashboard
              </button>
              <button 
                onClick={() => {
                  const element = document.querySelector('[data-value="lp-profiles"]');
                  if (element) (element as HTMLElement).click();
                  setMobileMenuOpen(false);
                }} 
                className="block py-2 w-full text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium cursor-pointer bg-transparent border-none text-left"
              >
                LP Profiles
              </button>
              <button 
                onClick={() => {
                  const element = document.querySelector('[data-value="deal-analyzer"]');
                  if (element) (element as HTMLElement).click();
                  setMobileMenuOpen(false);
                }} 
                className="block py-2 w-full text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium cursor-pointer bg-transparent border-none text-left"
              >
                Deal Analyzer
              </button>
              <button 
                onClick={() => {
                  const element = document.querySelector('[data-value="matching-engine"]');
                  if (element) (element as HTMLElement).click();
                  setMobileMenuOpen(false);
                }} 
                className="block py-2 w-full text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium cursor-pointer bg-transparent border-none text-left"
              >
                Matching Engine
              </button>
              <a href="/" className="block w-full">
                <Button className="w-full btn-primary flex items-center justify-center gap-2 mt-4">
                  Back to Home <ChevronRight className="h-4 w-4" />
                </Button>
              </a>
            </>
          ) : (
            <>
              <a href="#capabilities" className="block py-2 text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium">
                Capabilities
              </a>
              <a href="#architecture" className="block py-2 text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium">
                Architecture
              </a>
              <a href="#timeline" className="block py-2 text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium">
                Timeline
              </a>
              <a href="#integrations" className="block py-2 text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium">
                Integrations
              </a>
              <a href="#value" className="block py-2 text-lg-gray-dark hover:text-lg-blue transition-colors font-display font-medium">
                Value
              </a>
              <a href="/prototype" className="block w-full">
                <Button className="w-full btn-primary flex items-center justify-center gap-2 mt-4">
                  Explore Platform <ChevronRight className="h-4 w-4" />
                </Button>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

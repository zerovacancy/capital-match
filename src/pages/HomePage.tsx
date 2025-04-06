
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import TimelineSection from '@/components/TimelineSection';
import IntegrationsSection from '@/components/IntegrationsSection';
import ValueSection from '@/components/ValueSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[72px]">
        <HeroSection />
        <CapabilitiesSection />
        <ArchitectureSection />
        <TimelineSection />
        <IntegrationsSection />
        <ValueSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

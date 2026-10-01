import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { MarqueeSection } from '../components/home/MarqueeSection';
import { AboutSection } from '../components/home/AboutSection';
import { SkillsSection } from '../components/home/SkillsSection';
import { JournalPreview } from '../components/home/JournalPreview';
import { ProjectsPreview } from '../components/home/ProjectsPreview';
import { Footer } from '../components/common/Footer';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <JournalPreview />
      <ProjectsPreview />
      <Footer />
    </div>
  );
};

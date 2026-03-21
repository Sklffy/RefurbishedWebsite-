import React, { useState } from 'react';
import Preloader from '../components/portfolio/Preloader';
import Navbar from '../components/portfolio/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import ExperienceEducationToggle from '../components/portfolio/ExperienceEducationToggle';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import CertificationsSection from '../components/portfolio/CertificationsSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';
import MatrixRain from '../components/portfolio/MatrixRain';
import SectionWrapper from '../components/portfolio/SectionWrapper';
import CyberBackground from '../components/portfolio/CyberBackground';
import CyberCursor from '../components/portfolio/CyberCursor';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-background font-inter">
      <CyberBackground />
      <CyberCursor />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <SectionWrapper variant="grid">
          <AboutSection />
        </SectionWrapper>
        <SectionWrapper variant="stripes">
          <ExperienceEducationToggle />
        </SectionWrapper>
        <SectionWrapper variant="dots">
          <ProjectsSection />
        </SectionWrapper>
        <SectionWrapper variant="hex">
          <SkillsSection />
        </SectionWrapper>
        <SectionWrapper variant="circuit">
          <CertificationsSection />
        </SectionWrapper>
        <SectionWrapper variant="circuit">
          <ContactSection />
        </SectionWrapper>
        <Footer />
      </div>
    </div>
  );
}
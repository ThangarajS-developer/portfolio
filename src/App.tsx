import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VoiceERPDemo } from './components/VoiceERPDemo';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceEducation } from './components/ExperienceEducation';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { TerminalConsole } from './components/TerminalConsole';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleScrollToVoice = () => {
    const el = document.getElementById('voice-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07050d] text-zinc-100 relative selection:bg-purple-600/30 selection:text-purple-200">
      {/* Unique Futuristic Custom Cursor */}
      <CustomCursor />

      {/* Cyber Grid Background Accent */}
      <div className="fixed inset-0 cyber-grid opacity-25 pointer-events-none z-0" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          onResumeClick={() => setResumeOpen(true)}
          onTerminalClick={() => setTerminalOpen(prev => !prev)}
          terminalOpen={terminalOpen}
        />

        {/* Hero Section with Split Space on Right for Profile Image */}
        <main className="flex-1">
          <HeroSection
            onResumeClick={() => setResumeOpen(true)}
            onVoiceDemoClick={handleScrollToVoice}
          />

          {/* Education & Internship Section */}
          <ExperienceEducation />

          {/* Technical Skills Matrix */}
          <SkillsSection />

          {/* Featured Projects Section */}
          <ProjectsSection onOpenVoiceDemo={handleScrollToVoice} />

          {/* Spotlight Interactive Voice ERP Demo */}
          <VoiceERPDemo />

          {/* Achievements & Recognitions */}
          <AchievementsSection />

          {/* Direct Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer
          onTerminalClick={() => setTerminalOpen(true)}
          onResumeClick={() => setResumeOpen(true)}
        />

        {/* Interactive Terminal Console Modal */}
        <TerminalConsole
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />

        {/* Printable / Downloadable Resume Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    </div>
  );
}

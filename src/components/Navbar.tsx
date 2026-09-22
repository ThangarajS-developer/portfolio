import React, { useState } from 'react';
import { Terminal, FileText, Volume2, VolumeX, Menu, X, ExternalLink, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverSound, playClickSound, setSoundEnabled } from '../utils/audio';

interface NavbarProps {
  onResumeClick: () => void;
  onTerminalClick: () => void;
  terminalOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onResumeClick,
  onTerminalClick,
  terminalOpen
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(true);

  const toggleAudio = () => {
    const next = !audioActive;
    setAudioActive(next);
    setSoundEnabled(next);
    if (next) playClickSound();
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Education & Exp', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#090712]/85 border-b border-purple-950/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#about"
          id="brand-logo-link"
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
          className="group flex items-center gap-3 interactive-target"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-900/60 via-purple-950 to-black border border-purple-600/40 flex items-center justify-center font-mono font-bold text-sm tracking-wider text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)] group-hover:border-purple-500 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
            TS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
              {PERSONAL_INFO.name}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Available for opportunities" />
            </span>
            <span className="text-[11px] font-mono text-purple-400/80 tracking-wide uppercase">
              AI Engineer & Developer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium text-zinc-300 hover:text-white hover:bg-purple-950/50 hover:border-purple-800/40 border border-transparent transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Toolbar Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Sound toggle */}
          <button
            id="audio-toggle-btn"
            onClick={toggleAudio}
            onMouseEnter={playHoverSound}
            className="p-2 rounded-lg text-zinc-400 hover:text-purple-300 hover:bg-purple-950/40 border border-purple-900/30 transition-all interactive-target"
            title={audioActive ? 'Mute cyber audio effects' : 'Enable cyber audio effects'}
          >
            {audioActive ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>

          {/* Terminal button */}
          <button
            id="open-terminal-btn"
            onClick={() => {
              playClickSound();
              onTerminalClick();
            }}
            onMouseEnter={playHoverSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border interactive-target ${
              terminalOpen
                ? 'bg-purple-600/30 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-purple-950/30 border-purple-900/40 text-purple-300 hover:border-purple-700/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console</span>
          </button>

          {/* Resume PDF / Modal CTA */}
          <button
            id="view-resume-nav-btn"
            onClick={() => {
              playClickSound();
              onResumeClick();
            }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_18px_rgba(147,51,234,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:brightness-110 border border-purple-400/40 transition-all interactive-target"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => {
              playClickSound();
              onResumeClick();
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded bg-purple-600/30 text-purple-300 border border-purple-500/40"
          >
            Resume
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-300 hover:text-white bg-purple-950/30 border border-purple-900/50"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-purple-900/50 bg-[#0c0819] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:text-purple-200 hover:bg-purple-950/60"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-purple-950 flex flex-wrap gap-2">
            <button
              onClick={() => {
                playClickSound();
                onTerminalClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono bg-purple-950/50 text-purple-300 border border-purple-800/40 w-full"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Terminal Console</span>
            </button>
            <button
              onClick={toggleAudio}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono bg-purple-950/50 text-zinc-300 border border-purple-800/40 w-full"
            >
              {audioActive ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
              <span>{audioActive ? 'Mute Sound Effects' : 'Enable Sound Effects'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

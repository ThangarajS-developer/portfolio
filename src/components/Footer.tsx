import React from 'react';
import { ArrowUp, Heart, Terminal, Sparkles, Shield, Cpu, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audio';

interface FooterProps {
  onTerminalClick: () => void;
  onResumeClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTerminalClick, onResumeClick }) => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05030a] border-t border-purple-950/80 py-12 text-zinc-400 font-mono text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-purple-950/60">
          {/* Brand & Summary */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-300 font-bold">
                TS
              </div>
              <span className="text-white font-bold text-sm tracking-wide">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-zinc-400 text-xs font-sans max-w-md leading-relaxed">
              B.Tech Artificial Intelligence & Data Science student at AVS Engineering College. Building intelligent AI-driven applications and full-stack solutions.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-purple-300 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-purple-300 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-zinc-400 hover:text-purple-300 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="space-y-2">
            <div className="text-white font-bold uppercase tracking-wider text-[11px] mb-2">
              Sections
            </div>
            <ul className="space-y-1.5 text-zinc-400">
              <li><a href="#about" className="hover:text-purple-300 transition-colors">Hero & Profile</a></li>
              <li><a href="#education" className="hover:text-purple-300 transition-colors">Education & Internship</a></li>
              <li><a href="#skills" className="hover:text-purple-300 transition-colors">Skill Matrix</a></li>
              <li><a href="#projects" className="hover:text-purple-300 transition-colors">Featured Projects</a></li>
              <li><a href="#achievements" className="hover:text-purple-300 transition-colors">Awards & Sports</a></li>
              <li><a href="#contact" className="hover:text-purple-300 transition-colors">Get in Touch</a></li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-2">
            <div className="text-white font-bold uppercase tracking-wider text-[11px] mb-2">
              Interactive Tools
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  playClickSound();
                  onTerminalClick();
                }}
                className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors interactive-target"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Launch CLI Console</span>
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  onResumeClick();
                }}
                className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors interactive-target"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Printable Resume PDF</span>
              </button>
              <div className="text-[11px] text-zinc-400 pt-1">
                Custom neon-purple cursor active on desktop devices with particle trail & magnetic ring.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All verified resume credentials represented accurately.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 transition-all interactive-target"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

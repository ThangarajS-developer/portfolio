import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Linkedin, Github, Download, Sparkles, 
  Check, Copy, ExternalLink, Award, GraduationCap, Bot, ArrowDown, 
  Terminal, Code2, Briefcase, Cpu
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverSound, playClickSound } from '../utils/audio';

interface HeroSectionProps {
  onResumeClick: () => void;
  onVoiceDemoClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onResumeClick,
  onVoiceDemoClick
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="about" className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Background ambient neon purple glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col space-y-7">
          
          {/* Top Status & Terminal Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-800/50 backdrop-blur-sm text-xs font-mono text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Seeking Opportunities • B.Tech AI & Data Science (2024 – 2028)</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-purple-950/30 px-3 py-1 rounded-lg border border-purple-900/40">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>AVS Engineering College</span>
            </div>
          </div>

          {/* Name & Title Header */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              <span className="block">{PERSONAL_INFO.name}</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-200 bg-clip-text text-transparent mt-2 block">
                {PERSONAL_INFO.title}
              </span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3.5 text-sm text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5 text-purple-300 font-mono">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                AVS Engineering College (Anna University)
              </span>
              <span className="text-zinc-600">•</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-purple-950/70 border border-purple-800/50 text-xs font-mono text-purple-300 shadow-sm">
                CGPA: 8.01
              </span>
              <span className="text-zinc-600">•</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-purple-900/50 border border-purple-600/50 text-xs font-mono text-amber-300 shadow-sm">
                <Award className="w-3 h-3 text-amber-300" />
                1st Prize: Tech Innovators
              </span>
            </div>
          </div>

          {/* Key Quick Highlight Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0c0817] border border-purple-900/50 flex flex-col">
              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1 mb-1">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                Specialization
              </div>
              <div className="text-sm font-bold text-white font-mono">AI & Data Science</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c0817] border border-purple-900/50 flex flex-col">
              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1 mb-1">
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                Internship
              </div>
              <div className="text-sm font-bold text-white font-mono">AI-Based ERP</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c0817] border border-purple-900/50 flex flex-col">
              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1 mb-1">
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
                Core Tech
              </div>
              <div className="text-sm font-bold text-white font-mono">Python, SQL, ML</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c0817] border border-purple-900/50 flex flex-col">
              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                Location
              </div>
              <div className="text-sm font-bold text-white font-mono">Salem, Tamil Nadu</div>
            </div>
          </div>

          {/* Career Objective / Pitch */}
          <div className="relative p-5 sm:p-6 rounded-xl bg-[#0e0a1b]/80 border border-purple-900/50 backdrop-blur-sm shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-indigo-600 rounded-l-xl" />
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Career Objective
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">Verified Portfolio Profile</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pl-2 font-normal">
              {PERSONAL_INFO.objective}
            </p>
          </div>

          {/* Contact Badges & Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Phone */}
            <button
              onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
              onMouseEnter={playHoverSound}
              className="group flex items-center justify-between p-2.5 rounded-lg bg-[#0c0817] border border-purple-950 hover:border-purple-700/60 transition-all text-left interactive-target"
              title="Click to copy phone number"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-md bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Phone</div>
                  <div className="text-xs font-mono text-zinc-200 group-hover:text-purple-300 truncate">
                    {PERSONAL_INFO.phone}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-purple-400 ml-2 shrink-0">
                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-400" />}
              </span>
            </button>

            {/* Email */}
            <button
              onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
              onMouseEnter={playHoverSound}
              className="group flex items-center justify-between p-2.5 rounded-lg bg-[#0c0817] border border-purple-950 hover:border-purple-700/60 transition-all text-left interactive-target"
              title="Click to copy email"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-md bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Primary Email</div>
                  <div className="text-xs font-mono text-zinc-200 group-hover:text-purple-300 truncate">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-purple-400 ml-2 shrink-0">
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-400" />}
              </span>
            </button>

            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="group flex items-center justify-between p-2.5 rounded-lg bg-[#0c0817] border border-purple-950 hover:border-purple-700/60 transition-all text-left interactive-target"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-md bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">LinkedIn</div>
                  <div className="text-xs font-mono text-zinc-200 group-hover:text-purple-300 truncate">
                    {PERSONAL_INFO.linkedinHandle}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-400 ml-2 shrink-0" />
            </a>

            {/* GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="group flex items-center justify-between p-2.5 rounded-lg bg-[#0c0817] border border-purple-950 hover:border-purple-700/60 transition-all text-left interactive-target"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-md bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">GitHub Repo</div>
                  <div className="text-xs font-mono text-zinc-200 group-hover:text-purple-300 truncate">
                    {PERSONAL_INFO.githubHandle}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-400 ml-2 shrink-0" />
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] hover:brightness-110 border border-purple-400/40 transition-all interactive-target"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                playClickSound();
                onResumeClick();
              }}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-[#120c24] text-purple-200 border border-purple-700/50 hover:bg-purple-950/60 hover:border-purple-500 hover:text-white transition-all interactive-target"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>Resume / Bio</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onVoiceDemoClick();
              }}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs text-purple-300 bg-purple-950/40 border border-purple-900/60 hover:border-purple-600/80 transition-all interactive-target"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Test Voice ERP AI</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

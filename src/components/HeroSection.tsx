import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Linkedin, Github, Download, Sparkles, 
  Check, Copy, ExternalLink, Award, GraduationCap, Bot, ArrowDown, 
  ShieldCheck, UserCheck, Terminal
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
    <section id="about" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
      {/* Background ambient neon purple glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Split Layout: Left Info & Right Image Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ================= LEFT SIDE: Details & Bio ================= */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Status chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-800/50 backdrop-blur-sm self-start text-xs font-mono text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Seeking Opportunities • B.Tech AI & Data Science (2024 – 2028)</span>
            </div>

            {/* Name & Title Header */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                <span className="block">{PERSONAL_INFO.name}</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-200 bg-clip-text text-transparent mt-2 block">
                  {PERSONAL_INFO.title}
                </span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 text-sm text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5 text-purple-300 font-mono">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  AVS Engineering College (Anna University)
                </span>
                <span className="text-zinc-600">•</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 text-xs font-mono text-purple-300">
                  CGPA: 8.01
                </span>
              </div>
            </div>

            {/* Career Objective / Pitch */}
            <div className="relative p-5 rounded-xl bg-[#0e0a1b]/70 border border-purple-900/40 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-indigo-600 rounded-l-xl" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Career Objective
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">Resume Profile</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pl-2 font-normal">
                {PERSONAL_INFO.objective}
              </p>
            </div>

            {/* Quick Contact Badges & Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
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
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">LinkedIn Profile</div>
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

            {/* Location strip */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 px-1">
              <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{PERSONAL_INFO.address}</span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] hover:brightness-110 border border-purple-400/40 transition-all interactive-target"
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-[#120c24] text-purple-200 border border-purple-700/50 hover:bg-purple-950/60 hover:border-purple-500 hover:text-white transition-all interactive-target"
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
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs text-purple-300 bg-purple-950/40 border border-purple-900/60 hover:border-purple-600/80 transition-all interactive-target"
              >
                <Bot className="w-4 h-4 text-purple-400" />
                <span>Test Voice ERP AI</span>
              </button>
            </div>
          </div>

          {/* ================= RIGHT SIDE: Given Portrait Image Frame ================= */}
          {/* Replaces upload section with the user's uploaded portrait image */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md group">
              
              {/* Outer Decorative Cyber Glow Accents */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-purple-600/40 via-indigo-600/30 to-purple-400/40 blur-xl opacity-75 group-hover:opacity-100 transition duration-700" />
              
              {/* Tech Brackets Corners */}
              <div className="absolute -top-2.5 -left-2.5 w-5 h-5 border-t-2 border-l-2 border-purple-400 z-20 pointer-events-none" />
              <div className="absolute -top-2.5 -right-2.5 w-5 h-5 border-t-2 border-r-2 border-purple-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-2.5 -left-2.5 w-5 h-5 border-b-2 border-l-2 border-purple-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b-2 border-r-2 border-purple-400 z-20 pointer-events-none" />

              {/* Main Profile Frame */}
              <div className="relative rounded-2xl bg-[#0c0819] border border-purple-800/60 group-hover:border-purple-500 transition-all overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.85)]">
                
                {/* Header bar of the image frame */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#120a26] border-b border-purple-950 text-xs font-mono text-purple-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>PORTFOLIO_IMAGE // VERIFIED</span>
                  </div>
                  <div className="text-[10px] text-purple-300 font-mono flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                    <span>PROFILE ACTIVE</span>
                  </div>
                </div>

                {/* Profile Image View Area */}
                <div className="relative aspect-[4/5] w-full bg-[#080512] flex items-center justify-center overflow-hidden">
                  
                  {/* Portrait photo of Thangaraj S */}
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt="Thangaraj S - Aspiring AI Engineer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle futuristic gradient vignette */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0819] via-transparent to-transparent opacity-70" />

                  {/* Overlaid Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-[#090514]/90 border border-purple-700/60 text-[11px] font-mono text-purple-200 shadow-lg backdrop-blur-md">
                      CGPA: 8.01
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-purple-900/90 border border-purple-500/70 text-[11px] font-mono text-white shadow-lg backdrop-blur-md flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-300" />
                      1st Prize Winner
                    </span>
                  </div>
                </div>

                {/* Identity Card Bar Beneath Image */}
                <div className="p-3.5 bg-[#0e0821] border-t border-purple-950/80 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <div className="text-xs font-bold font-mono text-white flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{PERSONAL_INFO.name}</span>
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 truncate mt-0.5">
                      B.Tech AI & Data Science • Developer
                    </div>
                  </div>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="px-2.5 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/70 border border-purple-800/50 text-[11px] font-mono text-purple-300 hover:text-white transition-all flex items-center gap-1.5 shrink-0 interactive-target"
                  >
                    <Linkedin className="w-3 h-3 text-purple-400" />
                    <span>Connect</span>
                  </a>
                </div>
              </div>

              {/* Helper caption beneath right-hand photo frame */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-2.5 px-1">
                <span className="flex items-center gap-1 text-purple-400/90">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  Verified Identity Profile
                </span>
                <span className="text-zinc-500">AVS Engineering College</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, MapPin, Linkedin, Github, Download, Sparkles, 
  Upload, Image as ImageIcon, RotateCcw, Check, Copy, ExternalLink, 
  Award, GraduationCap, Bot, ArrowDown, ShieldCheck, ZoomIn
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
  // Profile photo state with localStorage persistence
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageZoom, setImageZoom] = useState<'cover' | 'contain'>('cover');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load saved photo if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem('thangaraj_portfolio_photo');
      if (saved) {
        setProfileImage(saved);
      }
    } catch {
      // localStorage may be unavailable
    }
  }, []);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setProfileImage(result);
        try {
          localStorage.setItem('thangaraj_portfolio_photo', result);
        } catch {
          // Ignore storage quota limits
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileImage(null);
    try {
      localStorage.removeItem('thangaraj_portfolio_photo');
    } catch {
      // Ignore
    }
  };

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

          {/* ================= RIGHT SIDE: Image Frame Container ================= */}
          {/* Specifically fulfills: "split the space in the names right side for adding my image" */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer Decorative Cyber Accents */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-purple-400/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000" />
              
              {/* Tech Brackets Corners */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-purple-400 z-20 pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-purple-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-purple-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-purple-400 z-20 pointer-events-none" />

              {/* Main Profile Frame */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`relative rounded-2xl bg-[#0c0819] border transition-all overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] ${
                  isDragOver
                    ? 'border-purple-400 ring-4 ring-purple-500/30 bg-purple-950/40'
                    : 'border-purple-900/60 hover:border-purple-600/80'
                }`}
              >
                {/* Header bar of the image frame */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#120a26] border-b border-purple-950 text-xs font-mono text-purple-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    <span>PORTFOLIO_IMAGE // REPO</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    {profileImage ? 'Custom Photo Active' : 'Slot Ready'}
                  </div>
                </div>

                {/* Profile Image View Area */}
                <div className="relative aspect-[4/5] w-full bg-gradient-to-b from-[#130d29] via-[#090615] to-[#06040d] flex items-center justify-center overflow-hidden">
                  
                  {profileImage ? (
                    // Display user's uploaded image
                    <img
                      src={profileImage}
                      alt="Thangaraj S"
                      className={`w-full h-full ${imageZoom === 'cover' ? 'object-cover' : 'object-contain'} transition-all duration-300`}
                    />
                  ) : (
                    // Default sleek cyber avatar representation with visual indicators
                    <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full relative">
                      {/* Holographic grid rings in background */}
                      <div className="absolute inset-0 cyber-grid opacity-30" />
                      
                      {/* Animated circular aura */}
                      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-purple-900/30 border border-purple-500/40 flex items-center justify-center mb-4 relative shadow-[0_0_35px_rgba(168,85,247,0.3)]">
                        <div className="absolute inset-2 rounded-full border border-dashed border-purple-400/40 animate-[spin_20s_linear_infinite]" />
                        <span className="text-4xl font-extrabold font-mono tracking-wider bg-gradient-to-r from-purple-200 to-indigo-300 bg-clip-text text-transparent">
                          TS
                        </span>
                      </div>

                      <div className="space-y-1 relative z-10 max-w-xs">
                        <div className="text-base font-bold text-white font-mono tracking-wide">
                          THANGARAJ S
                        </div>
                        <p className="text-xs text-purple-300/80 font-mono">
                          B.Tech Artificial Intelligence & Data Science
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-2 px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-900/50">
                          Click below or drag & drop to upload your portrait photo right here
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Scanning line animation */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-purple-500/10 to-transparent h-16 w-full animate-[bounce_5s_infinite] opacity-40" />

                  {/* Badges overlaid on top of photo */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-[#090514]/90 border border-purple-700/50 text-[11px] font-mono text-purple-200 shadow-lg backdrop-blur-md">
                      CGPA: 8.01
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-purple-900/80 border border-purple-500/60 text-[11px] font-mono text-white shadow-lg backdrop-blur-md flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-300" />
                      1st Prize Winner
                    </span>
                  </div>
                </div>

                {/* Interactive Image Upload / Controls Footer */}
                <div className="p-3.5 bg-[#0e0821] border-t border-purple-950/80 flex items-center justify-between gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <button
                    onClick={() => {
                      playClickSound();
                      fileInputRef.current?.click();
                    }}
                    onMouseEnter={playHoverSound}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(147,51,234,0.3)] border border-purple-400/40 transition-all interactive-target"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{profileImage ? 'Change Image' : 'Upload My Image'}</span>
                  </button>

                  {profileImage && (
                    <>
                      <button
                        onClick={(e) => {
                          playClickSound();
                          e.stopPropagation();
                          setImageZoom(imageZoom === 'cover' ? 'contain' : 'cover');
                        }}
                        onMouseEnter={playHoverSound}
                        className="p-2 rounded-lg bg-purple-950/50 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 transition-all interactive-target"
                        title={imageZoom === 'cover' ? 'Fit entire image' : 'Fill frame'}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleResetImage}
                        onMouseEnter={playHoverSound}
                        className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/30 transition-all interactive-target"
                        title="Remove uploaded image"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Helper caption beneath right-hand photo frame */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-2 px-1">
                <span className="flex items-center gap-1 text-purple-400/80">
                  <ShieldCheck className="w-3 h-3 text-purple-400" />
                  Split Profile Space Active
                </span>
                <span>PNG / JPG / WEBP</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

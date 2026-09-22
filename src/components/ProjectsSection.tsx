import React, { useState } from 'react';
import { Bot, ShoppingBag, Layers, ArrowUpRight, CheckCircle, ExternalLink, Code2, Database, Cpu, Sparkles, X } from 'lucide-react';
import { PROJECTS_LIST } from '../data/portfolioData';
import { Project } from '../types';
import { playHoverSound, playClickSound } from '../utils/audio';

interface ProjectsSectionProps {
  onOpenVoiceDemo: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenVoiceDemo }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-[#07050f] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-xs font-mono text-purple-300 mb-2">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Core Engineered Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Real-world software combining modern full-stack web technologies, AI integrations, and sustainable architecture.
            </p>
          </div>

          <div className="text-xs font-mono text-purple-400">
            Total Projects: {PROJECTS_LIST.length} • Accurate Resume Data
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS_LIST.map((proj, idx) => (
            <div
              key={proj.id}
              className="group relative rounded-2xl bg-[#0d091a] border border-purple-900/50 hover:border-purple-600/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_0_35px_rgba(168,85,247,0.2)] project-card interactive-target"
            >
              {/* Top Accent Line */}
              <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 sm:p-8 space-y-5">
                {/* Header tag & category */}
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-800/60 text-xs font-mono text-purple-300">
                    {proj.id === 'voice-erp' ? <Bot className="w-3.5 h-3.5 text-purple-400" /> : <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />}
                    {proj.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    Project 0{idx + 1}
                  </span>
                </div>

                {/* Title and Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-400/80 mt-1">
                    {proj.tagline}
                  </p>
                </div>

                {/* Description Bullets from Resume */}
                <div className="space-y-2 text-zinc-300 text-sm leading-relaxed">
                  {proj.description.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Key Features Pill highlights */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                    Key Highlights
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {proj.features.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 p-2 rounded-lg bg-[#080512] border border-purple-950 text-xs text-zinc-300">
                        <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-950/40 text-purple-200 border border-purple-900/50 hover:border-purple-600 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-3 border-t border-purple-950/60 mt-4 bg-[#0a0615]">
                {proj.id === 'voice-erp' ? (
                  <button
                    onClick={() => {
                      playClickSound();
                      onOpenVoiceDemo();
                    }}
                    onMouseEnter={playHoverSound}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] interactive-target"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Launch Voice Assistant Demo</span>
                  </button>
                ) : (
                  <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Circular Economy Platform</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedProject(proj);
                  }}
                  onMouseEnter={playHoverSound}
                  className="flex items-center gap-1.5 text-xs font-mono text-purple-300 hover:text-white px-3 py-2 rounded-lg bg-purple-950/50 border border-purple-800/40 hover:border-purple-600 transition-all interactive-target"
                >
                  <span>Architecture Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c0819] border border-purple-700/60 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-purple-950 pb-4">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wide">
                  Project Deep-Dive // {selectedProject.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setSelectedProject(null);
                }}
                className="p-1.5 rounded-lg bg-purple-950 text-purple-300 hover:text-white border border-purple-800/60 interactive-target"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Breakdown */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono text-purple-300 uppercase mb-1">
                  Core Problem & Solution
                </h4>
                <div className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                  {selectedProject.description.map((p, i) => (
                    <p key={i}>• {p}</p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-purple-300 uppercase mb-2">
                  Key Technical Features
                </h4>
                <div className="space-y-2">
                  {selectedProject.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300 p-2.5 rounded-lg bg-[#080512] border border-purple-950">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-purple-300 uppercase mb-2">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-purple-950/60 text-purple-200 border border-purple-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-950">
              {selectedProject.id === 'voice-erp' && (
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedProject(null);
                    onOpenVoiceDemo();
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] interactive-target"
                >
                  Test Voice ERP Now
                </button>
              )}
              <button
                onClick={() => {
                  playClickSound();
                  setSelectedProject(null);
                }}
                className="px-4 py-2 rounded-xl bg-purple-950 text-zinc-300 text-xs font-mono hover:text-white border border-purple-800/40 interactive-target"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Code2, Globe, Database, Wrench, Sparkles, MessageSquare, 
  BrainCircuit, Users, Zap, Languages as LanguagesIcon, Check
} from 'lucide-react';
import { SKILL_CATEGORIES, SOFT_SKILLS, LANGUAGES } from '../data/portfolioData';
import { playHoverSound, playClickSound } from '../utils/audio';

export const SkillsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'languages' | 'web' | 'database' | 'tools' | 'soft'>('all');

  const filterOptions = [
    { id: 'all', label: 'All Skills' },
    { id: 'languages', label: 'Programming' },
    { id: 'web', label: 'Web Tech' },
    { id: 'database', label: 'Databases' },
    { id: 'tools', label: 'Tools' },
    { id: 'soft', label: 'Soft & Languages' }
  ];

  return (
    <section id="skills" className="py-20 bg-[#090614] relative overflow-hidden border-t border-purple-950/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-xs font-mono text-purple-300 mb-2">
              <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
              <span>Verified Resume Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Technical Skill Matrix
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Languages, frameworks, database systems, design software, and spoken proficiencies.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#0e0a1f] border border-purple-900/50">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  playClickSound();
                  setActiveFilter(opt.id as any);
                }}
                onMouseEnter={playHoverSound}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all interactive-target ${
                  activeFilter === opt.id
                    ? 'bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-purple-950/40'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const matchesFilter =
              activeFilter === 'all' ||
              (activeFilter === 'languages' && cat.title.includes('Programming')) ||
              (activeFilter === 'web' && cat.title.includes('Web')) ||
              (activeFilter === 'database' && cat.title.includes('Database')) ||
              (activeFilter === 'tools' && cat.title.includes('Tools'));

            if (!matchesFilter && activeFilter !== 'soft') return null;
            if (activeFilter === 'soft') return null;

            return (
              <div
                key={cat.title}
                className="rounded-2xl bg-[#0c0819] border border-purple-900/50 hover:border-purple-600/80 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] interactive-target"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-purple-950">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
                        {idx === 0 && <Code2 className="w-4 h-4" />}
                        {idx === 1 && <Globe className="w-4 h-4" />}
                        {idx === 2 && <Database className="w-4 h-4" />}
                        {idx === 3 && <Wrench className="w-4 h-4" />}
                      </div>
                      <h3 className="text-sm font-bold text-white font-mono tracking-wide">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3.5">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-200 font-medium flex items-center gap-1.5">
                            {skill.name}
                            {skill.tag && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800/40">
                                {skill.tag}
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-zinc-500 text-[11px]">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Progress meter */}
                        <div className="h-1.5 w-full bg-purple-950/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Soft Skills & Spoken Languages Section */}
        {(activeFilter === 'all' || activeFilter === 'soft') && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Soft Skills */}
            <div className="lg:col-span-7 rounded-2xl bg-[#0c0819] border border-purple-900/50 p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-mono text-purple-300 font-bold border-b border-purple-950 pb-3">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Soft Skills & Competencies</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOFT_SKILLS.map((item) => (
                  <div key={item.name} className="p-3 rounded-xl bg-[#080512] border border-purple-950 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>{item.name}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed pl-4">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Spoken Languages */}
            <div className="lg:col-span-5 rounded-2xl bg-[#0c0819] border border-purple-900/50 p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-mono text-purple-300 font-bold border-b border-purple-950 pb-3">
                <LanguagesIcon className="w-4 h-4 text-purple-400" />
                <span>Spoken Languages</span>
              </div>

              <div className="space-y-2.5">
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#080512] border border-purple-950"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center font-mono font-bold text-xs text-purple-300">
                        {lang.code.split('-')[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {lang.name}
                        </div>
                        <div className="text-[11px] font-mono text-purple-400/80">
                          {lang.fluency}
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-purple-950/70 border border-purple-800/40 text-[11px] font-mono text-zinc-300">
                      {lang.fluency === 'Native' ? 'Primary' : 'Professional'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

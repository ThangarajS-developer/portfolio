import React from 'react';
import { Trophy, Award, Medal, Flag, Sparkles, CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS_LIST } from '../data/portfolioData';
import { playHoverSound, playClickSound } from '../utils/audio';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-20 bg-[#080512] relative overflow-hidden border-t border-purple-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-xs font-mono text-purple-300 mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Honors, Competitions & Athletics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Achievements & Recognitions
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Competitive hackathon standings, institutional coding prizes, and athletic excellence.
            </p>
          </div>
        </div>

        {/* Grid of Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS_LIST.map((ach) => (
            <div
              key={ach.id}
              onMouseEnter={playHoverSound}
              className="relative p-6 rounded-2xl bg-[#0d091b] border border-purple-900/50 hover:border-purple-500/80 transition-all duration-300 group flex flex-col justify-between shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] interactive-target"
            >
              {/* Top Row Badge & Year */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                    ach.type === 'award'
                      ? 'bg-amber-950/50 text-amber-300 border border-amber-800/60 shadow-[0_0_12px_rgba(251,191,36,0.2)]'
                      : ach.type === 'sports'
                      ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/60'
                      : 'bg-purple-950/70 text-purple-300 border border-purple-700/60'
                  }`}
                >
                  {ach.type === 'award' && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                  {ach.type === 'sports' && <Medal className="w-3.5 h-3.5 text-emerald-400" />}
                  {ach.type === 'hackathon' && <Flag className="w-3.5 h-3.5 text-purple-400" />}
                  <span>{ach.badge}</span>
                </span>

                {ach.year && (
                  <span className="text-xs font-mono text-zinc-400">
                    {ach.year}
                  </span>
                )}
              </div>

              {/* Title & Organization */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {ach.title}
                </h3>
                <p className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>{ach.organization}</span>
                </p>
              </div>

              {/* Decorative Tech Grid footer */}
              <div className="mt-6 pt-4 border-t border-purple-950/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="text-purple-400/80">VERIFIED CREDENTIAL</span>
                <span>RESUME_REC</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

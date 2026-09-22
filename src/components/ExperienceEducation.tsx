import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { EDUCATION_LIST, INTERNSHIP_INFO } from '../data/portfolioData';

export const ExperienceEducation: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-[#070410] relative overflow-hidden border-t border-purple-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Internship & Practical Experience */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-xs font-mono text-purple-300 mb-2">
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                <span>Industry Practice</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Internship Experience
              </h2>
              <p className="text-zinc-400 text-sm mt-1">
                Practical engineering experience and production-grade web deliverables.
              </p>
            </div>

            {/* Internship Card */}
            <div className="relative rounded-2xl bg-[#0c0819] border border-purple-900/60 p-6 sm:p-7 space-y-4 hover:border-purple-600/80 transition-all shadow-xl interactive-target">
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-purple-950 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {INTERNSHIP_INFO.role}
                  </h3>
                  <div className="text-sm font-semibold text-purple-300 mt-0.5">
                    {INTERNSHIP_INFO.company}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/50 text-xs font-mono text-purple-200">
                  <Calendar className="w-3 h-3 text-purple-400" />
                  <span>{INTERNSHIP_INFO.duration}</span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-3 pt-1">
                {INTERNSHIP_INFO.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      {pt}
                    </p>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-purple-950">
                <span className="px-2.5 py-1 rounded-md bg-[#080512] border border-purple-900/50 text-xs font-mono text-purple-300">
                  HTML5
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#080512] border border-purple-900/50 text-xs font-mono text-purple-300">
                  CSS3
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#080512] border border-purple-900/50 text-xs font-mono text-purple-300">
                  JavaScript
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#080512] border border-purple-900/50 text-xs font-mono text-purple-300">
                  Responsive UI
                </span>
              </div>
            </div>
          </div>

          {/* Right: Academic Qualifications */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-xs font-mono text-purple-300 mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                <span>Academic Record</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Education Timeline
              </h2>
              <p className="text-zinc-400 text-sm mt-1">
                Formal education milestones in Artificial Intelligence and STEM disciplines.
              </p>
            </div>

            {/* Education Timeline Cards */}
            <div className="space-y-4">
              {EDUCATION_LIST.map((edu, idx) => (
                <div
                  key={edu.degree}
                  className="p-5 rounded-xl bg-[#0c0819] border border-purple-900/40 hover:border-purple-600/70 transition-all space-y-2.5 interactive-target"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <h3 className="text-base font-bold text-white">
                          {edu.degree}
                        </h3>
                      </div>
                      <div className="text-xs text-purple-300 font-medium pl-3.5 mt-0.5">
                        {edu.institution} {edu.boardOrAffiliation && `(${edu.boardOrAffiliation})`}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-400">
                        {edu.period}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-purple-950 border border-purple-700 text-xs font-mono font-bold text-white shadow-sm">
                        {edu.scoreLabel}: {edu.score}
                      </span>
                    </div>
                  </div>

                  {edu.details && (
                    <p className="text-xs text-zinc-400 pl-3.5 border-l border-purple-950">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

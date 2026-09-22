import React from 'react';
import { X, Printer, Download, ExternalLink, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_LIST, SKILL_CATEGORIES, INTERNSHIP_INFO, PROJECTS_LIST, ACHIEVEMENTS_LIST, SOFT_SKILLS, LANGUAGES } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0e0a1f] border border-purple-600/50 shadow-[0_0_60px_rgba(168,85,247,0.3)] overflow-hidden">
        
        {/* Top Action Bar */}
        <div className="px-6 py-3.5 bg-[#140c2b] border-b border-purple-950 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>THANGARAJ_S_RESUME.PDF // PREVIEW</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold transition-all shadow-sm interactive-target"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-zinc-300 hover:text-white border border-purple-800/40 interactive-target"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-zinc-900 font-sans leading-relaxed selection:bg-purple-200">
          
          {/* Header */}
          <div className="border-b-2 border-purple-800 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-serif">
                {PERSONAL_INFO.name}
              </h1>
              <div className="text-xs font-semibold text-purple-900 uppercase tracking-wide mt-0.5">
                {PERSONAL_INFO.title} • {PERSONAL_INFO.institution}
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 mt-2 text-xs text-zinc-700">
                <span className="font-medium">{PERSONAL_INFO.phone}</span>
                <span>•</span>
                <span className="font-medium">{PERSONAL_INFO.email}</span>
                <span>•</span>
                <span>{PERSONAL_INFO.address}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 mt-1 text-xs text-purple-800 font-medium">
                <span>{PERSONAL_INFO.linkedinHandle}</span>
                <span>•</span>
                <span>{PERSONAL_INFO.githubHandle}</span>
              </div>
            </div>

            {/* Resume Profile Photo */}
            <div className="w-20 h-24 rounded-lg border-2 border-purple-800/60 overflow-hidden shrink-0 shadow-sm">
              <img
                src={PERSONAL_INFO.avatar}
                alt="Thangaraj S"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Body Sections */}
          <div className="mt-5 space-y-5 text-xs text-zinc-800">
            
            {/* Career Objective */}
            <div>
              <h2 className="text-sm font-bold text-purple-900 border-b border-purple-200 pb-1 mb-1.5 uppercase tracking-wide">
                Career Objective
              </h2>
              <p className="leading-relaxed text-zinc-700">
                {PERSONAL_INFO.objective}
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-sm font-bold text-purple-900 border-b border-purple-200 pb-1 mb-2 uppercase tracking-wide">
                Education
              </h2>
              <div className="space-y-2">
                {EDUCATION_LIST.map((edu) => (
                  <div key={edu.degree} className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-zinc-900">{edu.degree}</div>
                      <div className="text-zinc-600">{edu.institution} {edu.boardOrAffiliation && `(${edu.boardOrAffiliation})`}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-zinc-600">{edu.period}</div>
                      <div className="font-bold text-purple-800">{edu.scoreLabel}: {edu.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-sm font-bold text-purple-900 border-b border-purple-200 pb-1 mb-2 uppercase tracking-wide">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 gap-1 leading-normal">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.title} className="flex">
                    <span className="w-48 font-bold text-zinc-900 shrink-0">{cat.title}:</span>
                    <span className="text-zinc-700">{cat.skills.map(s => s.name).join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Internship */}
            <div>
              <h2 className="text-sm font-bold text-purple-900 border-b border-purple-200 pb-1 mb-2 uppercase tracking-wide">
                Internship
              </h2>
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-zinc-900">{INTERNSHIP_INFO.role} – {INTERNSHIP_INFO.company}</span>
                <span className="text-zinc-600">{INTERNSHIP_INFO.duration}</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                {INTERNSHIP_INFO.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-sm font-bold text-purple-900 border-b border-purple-200 pb-1 mb-2 uppercase tracking-wide">
                Projects
              </h2>
              <div className="space-y-3">
                {PROJECTS_LIST.map((proj, idx) => (
                  <div key={proj.id} className="space-y-1">
                    <div className="font-bold text-zinc-900">{idx + 1}. {proj.title}</div>
                    <ul className="list-disc pl-5 space-y-0.5 text-zinc-700">
                      {proj.description.map((d, di) => (
                        <li key={di}>{d}</li>
                      ))}
                    </ul>
                    <div className="text-[11px] text-zinc-600 pl-5">
                      <span className="font-semibold text-zinc-900">Tech Stack:</span> {proj.techStack.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Soft Skills & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <h2 className="text-sm font-bold text-purple-900 border-b border-purple-200 pb-1 mb-2 uppercase tracking-wide">
                  Achievements
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                  {ACHIEVEMENTS_LIST.map((a) => (
                    <li key={a.id}>
                      <span className="font-semibold text-zinc-900">{a.title}</span> ({a.organization}{a.year ? `, ${a.year}` : ''})
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-bold text-purple-900 border-b border-purple-200 pb-1 mb-2 uppercase tracking-wide">
                  Languages & Soft Skills
                </h2>
                <div className="space-y-2 text-zinc-700">
                  <div>
                    <span className="font-semibold text-zinc-900">Languages:</span> Tamil (Native), English (Fluent), Telugu (Spoken)
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-900">Soft Skills:</span> {SOFT_SKILLS.map(s => s.name).join(', ')}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, PROJECTS_LIST, ACHIEVEMENTS_LIST, EDUCATION_LIST } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audio';

interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'init',
      output: (
        <div className="space-y-1 text-purple-300">
          <p>╔══════════════════════════════════════════════════════════════════╗</p>
          <p>║  THANGARAJ S — AI ENGINEER & FULL-STACK DEVELOPER CLI v2.4       ║</p>
          <p>║  B.Tech Artificial Intelligence & Data Science @ Anna University ║</p>
          <p>╚══════════════════════════════════════════════════════════════════╝</p>
          <p className="text-zinc-400 mt-2">
            Type <span className="text-purple-400 font-bold">help</span> to view all commands or click the prompt chips below.
          </p>
        </div>
      )
    }
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const runCommand = (cmdStr: string) => {
    playClickSound();
    const clean = cmdStr.trim().toLowerCase();

    let res: React.ReactNode = null;

    switch (clean) {
      case 'help':
        res = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-purple-400 font-bold">Available Commands:</p>
            <p>• <span className="text-purple-300 font-mono">whoami</span> — Display candidate background and objective</p>
            <p>• <span className="text-purple-300 font-mono">skills</span> — List programming languages, web & database stacks</p>
            <p>• <span className="text-purple-300 font-mono">projects</span> — Breakdown of full-stack and AI projects</p>
            <p>• <span className="text-purple-300 font-mono">education</span> — Academic record (B.Tech, HSC, SSLC)</p>
            <p>• <span className="text-purple-300 font-mono">achievements</span> — Hackathons, 1st prize & sports honors</p>
            <p>• <span className="text-purple-300 font-mono">contact</span> — Get direct phone, email, and social links</p>
            <p>• <span className="text-purple-300 font-mono">clear</span> — Wipe terminal history</p>
          </div>
        );
        break;

      case 'whoami':
        res = (
          <div className="space-y-2 text-zinc-300">
            <p className="font-bold text-white">{PERSONAL_INFO.name} — {PERSONAL_INFO.title}</p>
            <p className="text-purple-300 font-mono text-xs">{PERSONAL_INFO.institution} • CGPA: 8.01</p>
            <p className="text-xs text-zinc-400 leading-relaxed">{PERSONAL_INFO.objective}</p>
          </div>
        );
        break;

      case 'skills':
        res = (
          <div className="space-y-2 text-zinc-300">
            {SKILL_CATEGORIES.map(cat => (
              <div key={cat.title} className="text-xs">
                <span className="text-purple-400 font-mono font-bold">{cat.title}:</span>{' '}
                {cat.skills.map(s => s.name).join(', ')}
              </div>
            ))}
            <div className="text-xs">
              <span className="text-purple-400 font-mono font-bold">Spoken Languages:</span> Tamil (Native), English (Fluent), Telugu (Spoken)
            </div>
          </div>
        );
        break;

      case 'projects':
        res = (
          <div className="space-y-3 text-zinc-300">
            {PROJECTS_LIST.map((p, i) => (
              <div key={p.id} className="p-2 rounded bg-purple-950/30 border border-purple-900/40 text-xs space-y-1">
                <div className="font-bold text-white">0{i+1}. {p.title}</div>
                <div className="text-purple-300">{p.tagline}</div>
                <div className="text-zinc-400">Stack: {p.techStack.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        res = (
          <div className="space-y-2 text-xs text-zinc-300">
            {EDUCATION_LIST.map(e => (
              <div key={e.degree}>
                <span className="text-purple-300 font-bold">{e.degree}</span> ({e.period})
                <div className="text-zinc-400">{e.institution} — <span className="text-white font-mono">{e.scoreLabel}: {e.score}</span></div>
              </div>
            ))}
          </div>
        );
        break;

      case 'achievements':
        res = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            {ACHIEVEMENTS_LIST.map(a => (
              <div key={a.id} className="flex items-center gap-2">
                <span className="text-purple-400 font-mono">[{a.badge}]</span>
                <span className="text-white font-medium">{a.title}</span> — <span className="text-zinc-400">{a.organization}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="space-y-1 text-xs text-zinc-300 font-mono">
            <p>• Phone: <a href={`tel:${PERSONAL_INFO.phone}`} className="text-purple-300 hover:underline">{PERSONAL_INFO.phone}</a></p>
            <p>• Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-purple-300 hover:underline">{PERSONAL_INFO.email}</a></p>
            <p>• LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">{PERSONAL_INFO.linkedinHandle}</a></p>
            <p>• GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">{PERSONAL_INFO.githubHandle}</a></p>
            <p>• Location: {PERSONAL_INFO.address}</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        res = (
          <p className="text-red-400 text-xs">
            Command not recognized: <span className="font-mono text-white">"{clean}"</span>. Type <span className="text-purple-300 font-bold">help</span> for a list of valid commands.
          </p>
        );
    }

    setHistory(prev => [...prev, { command: cmdStr, output: res }]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    runCommand(inputVal);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[520px] rounded-2xl bg-[#090614] border border-purple-600/60 shadow-[0_0_50px_rgba(168,85,247,0.3)] flex flex-col overflow-hidden">
        
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-[#120a26] border-b border-purple-950 flex items-center justify-between text-xs font-mono text-purple-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-zinc-400">thangaraj@ai-workstation:~</span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded hover:bg-purple-950 interactive-target"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Body */}
        <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto font-mono text-xs space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-purple-400">
                <span className="text-zinc-500">guest@portfolio:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2 bg-[#0c081a] border-t border-purple-950/70 flex flex-wrap gap-1.5">
          <span className="text-[10px] font-mono text-zinc-500 self-center mr-1">Quick Run:</span>
          {['help', 'whoami', 'skills', 'projects', 'education', 'achievements', 'contact', 'clear'].map(cmd => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              onMouseEnter={playHoverSound}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-950/60 text-purple-300 hover:bg-purple-800/60 hover:text-white border border-purple-800/40 transition-colors interactive-target"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Command Input Prompt */}
        <form onSubmit={handleSubmit} className="px-4 py-3 bg-[#0a0616] border-t border-purple-950 flex items-center gap-2">
          <span className="text-purple-400 font-mono text-xs">guest@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command here (e.g., skills, projects, contact)..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none"
          />
          <button
            type="submit"
            className="p-1 rounded bg-purple-900/40 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors interactive-target"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};

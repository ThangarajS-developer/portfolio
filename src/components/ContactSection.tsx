import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Linkedin, Github, Send, Copy, Check, 
  MessageSquare, Sparkles, ShieldCheck 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverSound, playClickSound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('Internship / Job Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopy = (text: string, key: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();

    // Trigger direct mailto link with pre-filled content
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formSubject)}&body=${encodeURIComponent(
      `Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`
    )}`;

    window.location.href = mailtoUrl;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-[#07050f] relative overflow-hidden border-t border-purple-950/60">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-800/50 text-xs font-mono text-purple-300">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>Direct Communication Channel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In Touch With Thangaraj
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Interested in discussing AI engineering roles, internship opportunities, or full-stack software development? Feel free to reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-[#0d091b] border border-purple-900/50 hover:border-purple-600/80 transition-all flex items-center justify-between gap-4 interactive-target">
              <div className="flex items-center gap-3.5 truncate">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">Phone (Call / WhatsApp)</div>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm font-mono font-bold text-white hover:text-purple-300 transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                onMouseEnter={playHoverSound}
                className="p-2 rounded-lg bg-purple-950/50 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 transition-colors interactive-target"
                title="Copy phone"
              >
                {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-[#0d091b] border border-purple-900/50 hover:border-purple-600/80 transition-all flex items-center justify-between gap-4 interactive-target">
              <div className="flex items-center gap-3.5 truncate">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">Email Address</div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-mono font-bold text-white hover:text-purple-300 transition-colors truncate block">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                onMouseEnter={playHoverSound}
                className="p-2 rounded-lg bg-purple-950/50 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 transition-colors interactive-target"
                title="Copy email"
              >
                {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-[#0d091b] border border-purple-900/50 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase">Location</div>
                <div className="text-sm text-zinc-200 font-medium">
                  {PERSONAL_INFO.address}
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="p-3.5 rounded-xl bg-[#0c0819] border border-purple-900/50 hover:border-purple-600/80 flex items-center gap-2.5 text-xs font-mono text-zinc-200 hover:text-purple-300 transition-all interactive-target"
              >
                <Linkedin className="w-4 h-4 text-purple-400" />
                <span className="truncate">LinkedIn Profile</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="p-3.5 rounded-xl bg-[#0c0819] border border-purple-900/50 hover:border-purple-600/80 flex items-center gap-2.5 text-xs font-mono text-zinc-200 hover:text-purple-300 transition-all interactive-target"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span className="truncate">GitHub Profile</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0d091b] border border-purple-900/50 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-purple-950 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-purple-400" />
                  <span>Send a Direct Message</span>
                </h3>
                <span className="text-[11px] font-mono text-purple-400">
                  Quick Mail Protocol
                </span>
              </div>

              {sentSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Email client opened! Message drafted to {PERSONAL_INFO.email}.</span>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Hunter"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#080512] border border-purple-950 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-[#080512] border border-purple-950 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    Inquiry Subject
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full bg-[#080512] border border-purple-950 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="Internship / Job Inquiry">Internship / Job Inquiry</option>
                    <option value="AI Project Collaboration">AI Project Collaboration</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="General Technical Discussion">General Technical Discussion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hello Thangaraj, I reviewed your Voice ERP project and B.Tech AI background..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full bg-[#080512] border border-purple-950 rounded-xl p-3.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={playHoverSound}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] flex items-center justify-center gap-2 border border-purple-400/40 interactive-target"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Message via Mail</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

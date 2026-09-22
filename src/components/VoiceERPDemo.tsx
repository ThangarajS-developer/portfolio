import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Bot, Play, Sparkles, RefreshCw, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/audio';

interface SampleQuery {
  lang: 'ta' | 'en';
  text: string;
  transcription: string;
  response: string;
  tamilAudio?: string;
  category: string;
}

const SAMPLE_QUERIES: SampleQuery[] = [
  {
    lang: 'en',
    category: 'Inventory',
    text: "Check inventory status of Raw Materials & Dyes",
    transcription: "Query: Check inventory status of Raw Materials & Dyes",
    response: "Inventory analysis complete: Raw Cotton is at 84% capacity (420 bales). Dye Pigment (Violet-7B) is low at 18% (12 kg). Automated replenishment request dispatched."
  },
  {
    lang: 'ta',
    category: 'Production',
    text: "இன்றைய உற்பத்தி அறிக்கை என்ன? (What is today's production report?)",
    transcription: "கேள்வி: இன்றைய உற்பத்தி அறிக்கை என்ன?",
    response: "இன்றைய உற்பத்தி அறிக்கை: ஆலை பிரிவு 2 இல் 520 அலகுகள் முடிக்கப்பட்டுள்ளன. இலக்கில் 92% எட்டப்பட்டது. எந்த இயந்திர கோளாறும் இல்லை. (Production Report: 520 units completed in Plant Section 2. 92% target achieved.)"
  },
  {
    lang: 'en',
    category: 'Orders',
    text: "Show pending dispatch orders for this week",
    transcription: "Query: Show pending dispatch orders for this week",
    response: "Found 6 pending dispatch shipments. 4 are packed and awaiting logistics pickup (ETA: 4:30 PM). 2 orders are in final quality inspection."
  },
  {
    lang: 'ta',
    category: 'Low Stock',
    text: "இருப்பில் குறைவாக உள்ள பொருட்கள் எவை? (Which items are low in stock?)",
    transcription: "கேள்வி: இருப்பில் குறைவாக உள்ள பொருட்கள் எவை?",
    response: "கவனம்: அலுமினியம் தாள் (Aluminium Sheet) மற்றும் மோட்டார் பேரிங் 20% கீழே உள்ளது. உடனடியாக சப்ளையருக்கு தகவல் அனுப்பப்பட்டது."
  }
];

export const VoiceERPDemo: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<'all' | 'en' | 'ta'>('all');
  const [activeQuery, setActiveQuery] = useState<SampleQuery>(SAMPLE_QUERIES[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [activeTab, setActiveTab] = useState<'demo' | 'architecture'>('demo');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setRecognitionSupported(true);
    }
  }, []);

  const handleSpeak = (textToSpeak: string, lang: 'en' | 'ta') => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const executeQuery = (query: SampleQuery) => {
    playClickSound();
    stopSpeaking();
    setActiveQuery(query);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      handleSpeak(query.response, query.lang);
    }, 450);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    playClickSound();
    stopSpeaking();
    setIsProcessing(true);

    const isTamil = /[\u0B80-\u0BFF]/.test(customInput);
    const newQuery: SampleQuery = {
      lang: isTamil ? 'ta' : 'en',
      category: 'Custom Voice AI Query',
      text: customInput,
      transcription: isTamil ? `கேள்வி: ${customInput}` : `Voice Query: "${customInput}"`,
      response: isTamil
        ? `குரல் வழிகாட்டி பதில்: நீங்கள் கேட்ட "${customInput}" தகவல் ERP அமைப்பில் சரிபார்க்கப்பட்டது. உங்கள் செயல்பாடுகள் சீராக இயங்குகின்றன.`
        : `Voice ERP Response: Real-time query "${customInput}" processed via Gemini API & ERP NLP parser. Data synchronized with central MongoDB records.`
    };

    setActiveQuery(newQuery);
    setTimeout(() => {
      setIsProcessing(false);
      handleSpeak(newQuery.response, newQuery.lang);
    }, 600);
    setCustomInput('');
  };

  const filteredQueries = selectedLang === 'all'
    ? SAMPLE_QUERIES
    : SAMPLE_QUERIES.filter(q => q.lang === selectedLang);

  return (
    <section id="voice-demo" className="py-16 border-t border-purple-950/60 bg-[#080512] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/70 border border-purple-800/40 text-xs font-mono text-purple-300 mb-2">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Project Spotlight 01</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              Voice-Controlled ERP Assistant
              <span className="text-xs px-2.5 py-1 rounded bg-purple-900/40 text-purple-300 border border-purple-700/50 font-mono">
                Tamil & English
              </span>
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              An AI-powered voice interface built with React, Node.js, Express, MongoDB, Gemini API, and Web Speech API to empower regional MSME business owners.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#0f0920] border border-purple-900/50 self-start md:self-auto">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('demo');
              }}
              onMouseEnter={playHoverSound}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all interactive-target ${
                activeTab === 'demo'
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Interactive Voice Lab
            </button>
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('architecture');
              }}
              onMouseEnter={playHoverSound}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all interactive-target ${
                activeTab === 'architecture'
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Tech Architecture
            </button>
          </div>
        </div>

        {activeTab === 'demo' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Interactive Controls & Voice Triggers */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-[#0d091a] border border-purple-900/40">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Select Language Preset
                  </span>
                  <div className="flex gap-1">
                    {(['all', 'en', 'ta'] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setSelectedLang(l)}
                        onMouseEnter={playHoverSound}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                          selectedLang === l
                            ? 'bg-purple-600 text-white font-bold'
                            : 'bg-purple-950/40 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {l === 'all' ? 'All' : l === 'en' ? 'English' : 'தமிழ் (Tamil)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pre-recorded test triggers */}
                <div className="space-y-2.5">
                  {filteredQueries.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => executeQuery(q)}
                      onMouseEnter={playHoverSound}
                      className={`w-full p-3 rounded-lg text-left transition-all border group flex items-start justify-between gap-2 interactive-target ${
                        activeQuery.text === q.text
                          ? 'bg-purple-950/60 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                          : 'bg-[#0a0715] border-purple-950 hover:border-purple-800 hover:bg-[#110b24]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/50 text-purple-300 font-mono">
                            {q.category}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">
                            {q.lang === 'ta' ? 'தமிழ் Voice' : 'English Voice'}
                          </span>
                        </div>
                        <div className="text-xs font-medium text-zinc-200 group-hover:text-purple-200">
                          {q.text}
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-md bg-purple-900/40 flex items-center justify-center text-purple-300 shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input Form */}
              <form onSubmit={handleCustomSubmit} className="p-3 rounded-xl bg-[#0d091a] border border-purple-900/40 flex gap-2">
                <input
                  type="text"
                  placeholder="Type an ERP query in Tamil or English..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="flex-1 bg-[#070410] border border-purple-950 rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 font-mono"
                />
                <button
                  type="submit"
                  onMouseEnter={playHoverSound}
                  className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] interactive-target"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Right: Live Interactive Voice Visualizer & Output Screen */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="rounded-xl bg-[#0d091b] border border-purple-900/50 overflow-hidden flex-1 flex flex-col shadow-2xl">
                {/* Visualizer header */}
                <div className="px-4 py-3 bg-[#130d29] border-b border-purple-950 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-pulse' : 'bg-purple-400'}`} />
                    <span className="text-xs font-mono font-semibold text-purple-300">
                      NLP / LLM SPEECH SYNTHESIZER
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="text-[11px] font-mono text-red-400 hover:text-red-300 px-2 py-0.5 rounded bg-red-950/40 border border-red-900/40 flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3 animate-spin" /> Stop Audio
                      </button>
                    )}
                    <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-purple-950/40 border border-purple-900/40">
                      Latency: ~180ms
                    </span>
                  </div>
                </div>

                {/* Animated Speech Waveform Simulation */}
                <div className="p-5 bg-gradient-to-b from-[#110b24] to-[#0a0715] border-b border-purple-950/60">
                  <div className="flex items-center justify-center gap-1.5 h-16">
                    {[12, 28, 45, 18, 55, 34, 70, 48, 62, 85, 42, 68, 30, 52, 20, 38, 15].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1.5 rounded-full transition-all duration-150 ${
                          isSpeaking || isProcessing
                            ? 'bg-gradient-to-t from-purple-600 to-indigo-300 animate-pulse'
                            : 'bg-purple-950/80'
                        }`}
                        style={{
                          height: isSpeaking ? `${Math.max(14, (h * (Math.sin(Date.now() / 200 + i) + 1.2)) % 65)}px` : `${h * 0.4}px`
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-center text-[11px] font-mono text-zinc-400 mt-2">
                    {isProcessing ? 'Processing NLP intent with LLM backend...' : isSpeaking ? `Broadcasting Audio (${activeQuery.lang === 'ta' ? 'Tamil Voice' : 'English Voice'})...` : 'Audio output ready • Click play on any preset'}
                  </div>
                </div>

                {/* Output Screen */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-mono text-purple-400/80 mb-1">
                      USER SPEECH INPUT:
                    </div>
                    <div className="p-3 rounded-lg bg-[#070511] border border-purple-950 font-mono text-sm text-zinc-200">
                      {activeQuery.transcription}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-purple-400/80 mb-1">
                      <span>VOICE ERP AI RESPONSE:</span>
                      <button
                        onClick={() => handleSpeak(activeQuery.response, activeQuery.lang)}
                        className="text-purple-300 hover:text-white flex items-center gap-1 text-[11px]"
                      >
                        <Volume2 className="w-3 h-3" /> Replay Speech
                      </button>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-950/25 border border-purple-800/40 text-zinc-100 text-sm leading-relaxed font-normal">
                      {activeQuery.response}
                    </div>
                  </div>

                  {/* Operational Metrics Mock */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-purple-950/60 text-center">
                    <div className="p-2 rounded bg-[#090614] border border-purple-950">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">Inventory SKUs</div>
                      <div className="text-sm font-mono font-bold text-purple-300">1,420</div>
                    </div>
                    <div className="p-2 rounded bg-[#090614] border border-purple-950">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">Daily Output</div>
                      <div className="text-sm font-mono font-bold text-emerald-400">92% Target</div>
                    </div>
                    <div className="p-2 rounded bg-[#090614] border border-purple-950">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">NLP Model</div>
                      <div className="text-sm font-mono font-bold text-indigo-300">Gemini LLM</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* Tech Architecture View */
          <div className="p-6 rounded-2xl bg-[#0d091b] border border-purple-900/40 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#090615] border border-purple-950">
                <div className="text-xs font-mono text-purple-400 mb-1">1. Frontend Layer</div>
                <div className="text-base font-bold text-white mb-2">React.js + Web Speech API</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Captures microphone audio stream, performs client-side acoustic pre-processing, and utilizes Web Speech synthesis for natural audio output in Tamil and English.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090615] border border-purple-950">
                <div className="text-xs font-mono text-purple-400 mb-1">2. Server Middleware</div>
                <div className="text-base font-bold text-white mb-2">Node.js & Express.js</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  RESTful orchestration layer managing user sessions, security tokens, audio payload transmission, and ERP database queries with fast async dispatch.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090615] border border-purple-950">
                <div className="text-xs font-mono text-purple-400 mb-1">3. AI Intelligence</div>
                <div className="text-base font-bold text-white mb-2">Gemini API & NLP Parser</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Processes bi-lingual natural language intent, extracts operational parameters (item names, quantity, date range), and constructs tailored business summaries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090615] border border-purple-950">
                <div className="text-xs font-mono text-purple-400 mb-1">4. Database & State</div>
                <div className="text-base font-bold text-white mb-2">MongoDB & MySQL</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Maintains MSME inventory registries, supplier catalogs, daily production quotas, and historic voice interaction audit logs for business owners.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm text-zinc-200">
                  Built specifically to bridge the tech barrier for small factory owners who prefer voice commands in their native language over complex ERP dashboards.
                </span>
              </div>
              <button
                onClick={() => setActiveTab('demo')}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold transition-all interactive-target"
              >
                Back to Voice Testing
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

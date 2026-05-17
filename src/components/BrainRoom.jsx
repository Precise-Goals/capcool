import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SettingsDashboard } from './AuthComponents';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiPlayFill, 
  RiMessage3Fill, 
  RiTerminalBoxFill, 
  RiArrowRightSLine, 
  RiWindyFill, 
  RiWaterPercentFill, 
  RiMapPin2Fill, 
  RiGroupFill, 
  RiGlobalFill, 
  RiImageFill, 
  RiVolumeUpFill,
  RiVolumeMuteFill,
  RiDashboardFill,
  RiPulseFill
} from 'react-icons/ri';

const InputField = ({ label, value, onChange, placeholder, icon: Icon, type = "text", ariaLabel }) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center space-x-2 group-focus-within:text-white transition-colors">
      {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
      <span>{label}</span>
    </label>
    <div className="relative">
      <input 
        type={type} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel || label}
        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-white/30 transition-all font-mono text-white placeholder:text-zinc-300 shadow-inner"
      />
    </div>
  </div>
);

export const BrainRoom = () => {
  const { geminiKey } = useAuth();
  const [loading, setLoading] = useState(false);
  const [debate, setDebate] = useState([]);
  const [mode, setMode] = useState('manual');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  
  const [matchState, setMatchState] = useState({
    innings: '1',
    over: '',
    score: '',
    wickets: '',
    pitch: 'Flat',
    dew: 'No',
    venue: '',
    batterOnStrike: '',
    bowler: '',
    additionalContext: '',
    liveUrl: ''
  });

  const speak = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const runDebate = async () => {
    if (!geminiKey) {
      alert("Missing Gemini API Key. Please provision one in the dashboard.");
      return;
    }
    setLoading(true);
    
    const fullContext = mode === 'real-time' 
      ? `LIVE SCRAPER URL: ${matchState.liveUrl}\nADDITIONAL CONTEXT: ${matchState.additionalContext}`
      : `
      Innings: ${matchState.innings}
      Over: ${matchState.over}
      Current Score: ${matchState.score}
      Wickets Lost: ${matchState.wickets}
      Batter on Strike: ${matchState.batterOnStrike}
      Current Bowler: ${matchState.bowler}
      Pitch Condition: ${matchState.pitch}
      Dew Factor: ${matchState.dew}
      Venue: ${matchState.venue}
      Additional Tactical Context: ${matchState.additionalContext}
    `;

    try {
      const response = await fetch('http://localhost:3001/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: fullContext, geminiKey })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setDebate(data.transcript);
      
      const captainDecision = data.transcript.find(t => t.agent === "The Virtual Captain");
      if (captainDecision) speak(captainDecision.text);
      
    } catch (error) {
      alert("Debate failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <RiDashboardFill className="w-8 h-8 text-white" aria-hidden="true" />
            <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white leading-none">The Brain Room</h1>
          </div>
          <div className="flex items-center space-x-6">
            <p className="text-zinc-400 font-bold uppercase tracking-[0.4em] text-[10px]">Active Multi-Agent Session</p>
            <div className="h-4 w-[1px] bg-white/20" />
            <button 
              aria-pressed={voiceEnabled}
              aria-label="Toggle Voice Synthesis"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full border transition-all ${voiceEnabled ? 'bg-white/10 border-white/30 text-white focus:ring focus:ring-white' : 'bg-transparent border-white/20 text-zinc-400 hover:text-white focus:ring focus:ring-white'}`}
            >
              {voiceEnabled ? <RiVolumeUpFill className="w-3.5 h-3.5" aria-hidden="true" /> : <RiVolumeMuteFill className="w-3.5 h-3.5" aria-hidden="true" />}
              <span className="text-[9px] font-black uppercase tracking-widest">{voiceEnabled ? 'Voice Synthesis Active' : 'Synthesis Offline'}</span>
            </button>
          </div>
        </div>
        
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/20 backdrop-blur-md">
          <button 
            aria-pressed={mode === 'manual'}
            onClick={() => setMode('manual')}
            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-white ${mode === 'manual' ? 'bg-white text-black shadow-lg shadow-white/20' : 'text-zinc-400 hover:text-white'}`}
          >
            Tactical Manual
          </button>
          <button 
            aria-pressed={mode === 'real-time'}
            onClick={() => setMode('real-time')}
            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-white ${mode === 'real-time' ? 'bg-white text-black shadow-lg shadow-white/20' : 'text-zinc-400 hover:text-white'}`}
          >
            Real-Time Scraper
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 space-y-8 bg-white/[0.02] border-white/10"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3 text-white">
                <RiTerminalBoxFill className="w-5 h-5" aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] italic">Strategy Engine</span>
              </div>
              {mode === 'real-time' && <RiPulseFill className="w-4 h-4 text-green-400 animate-pulse" aria-hidden="true" />}
            </div>
            
            <AnimatePresence mode="wait">
              {mode === 'real-time' ? (
                <motion.div 
                  key="real-time"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="space-y-3">
                    <InputField 
                      label="Live Match URL" 
                      value={matchState.liveUrl}
                      onChange={(v) => setMatchState({...matchState, liveUrl: v})}
                      placeholder="espncricinfo.com/series/..."
                      icon={RiGlobalFill}
                      ariaLabel="Live Match URL Input"
                    />
                    <div className="flex items-center space-x-2 px-1">
                      <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">Quick Inject:</span>
                      <button
                        onClick={() => setMatchState({...matchState, liveUrl: 'https://www.espncricinfo.com/series/ipl-2026-1510719'})}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                      >
                        ⚡ IPL 2026
                      </button>
                    </div>
                  </div>
                  <div 
                    role="button"
                    tabIndex={0}
                    aria-label="Upload Scorecard Screenshot"
                    className="p-6 bg-white/[0.03] border border-white/10 rounded-[32px] space-y-4 group cursor-pointer hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <RiImageFill className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" aria-hidden="true" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors">Multimodal Context</span>
                    </div>
                    <div className="h-32 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center space-y-3 group-hover:border-white/40 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <RiPlayFill className="w-4 h-4 rotate-90 text-zinc-300" aria-hidden="true" />
                      </div>
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Inject Scorecard Data</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="manual"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Innings</label>
                      <select 
                        aria-label="Innings Selection"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-white/30 text-white font-black uppercase tracking-widest shadow-inner"
                        value={matchState.innings}
                        onChange={(e) => setMatchState({...matchState, innings: e.target.value})}
                      >
                        <option value="1">1st Phase</option>
                        <option value="2">2nd Phase</option>
                      </select>
                    </div>
                    <InputField 
                      label="Over/Ball" 
                      value={matchState.over}
                      onChange={(v) => setMatchState({...matchState, over: v})}
                      placeholder="19.4"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <InputField 
                      label="Score" 
                      value={matchState.score}
                      onChange={(v) => setMatchState({...matchState, score: v})}
                      placeholder="188/2"
                    />
                    <InputField 
                      label="Wickets" 
                      value={matchState.wickets}
                      onChange={(v) => setMatchState({...matchState, wickets: v})}
                      placeholder="2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <InputField 
                      label="On Strike" 
                      value={matchState.batterOnStrike}
                      onChange={(v) => setMatchState({...matchState, batterOnStrike: v})}
                      placeholder="Rohit S."
                      icon={RiGroupFill}
                    />
                    <InputField 
                      label="Bowler" 
                      value={matchState.bowler}
                      onChange={(v) => setMatchState({...matchState, bowler: v})}
                      placeholder="Jasprit B."
                      icon={RiGroupFill}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center space-x-2">
                        <RiWindyFill className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Pitch</span>
                      </label>
                      <select 
                        aria-label="Pitch Condition"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-white/30 text-white font-black uppercase tracking-widest shadow-inner"
                        value={matchState.pitch}
                        onChange={(e) => setMatchState({...matchState, pitch: e.target.value})}
                      >
                        <option>Flat Track</option>
                        <option>Turning</option>
                        <option>Green Top</option>
                        <option>Two-paced</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center space-x-2">
                        <RiWaterPercentFill className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Dew</span>
                      </label>
                      <select 
                        aria-label="Dew Factor"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-white/30 text-white font-black uppercase tracking-widest shadow-inner"
                        value={matchState.dew}
                        onChange={(e) => setMatchState({...matchState, dew: e.target.value})}
                      >
                        <option>Zero</option>
                        <option>Light</option>
                        <option>Extreme</option>
                      </select>
                    </div>
                  </div>

                  <InputField 
                    label="Venue" 
                    value={matchState.venue}
                    onChange={(v) => setMatchState({...matchState, venue: v})}
                    placeholder="Eden Gardens"
                    icon={RiMapPin2Fill}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Analytical Context</label>
              <textarea 
                aria-label="Additional Context"
                value={matchState.additionalContext}
                onChange={(e) => setMatchState({...matchState, additionalContext: e.target.value})}
                placeholder="Simulate specific scenario constraints..."
                className="w-full h-32 bg-black/60 border border-white/10 rounded-2xl p-4 text-xs focus:outline-none focus:border-white/30 transition-all resize-none text-white italic font-medium shadow-inner"
              />
            </div>

            <button 
              aria-label="Simulate Next Phase"
              onClick={runDebate}
              disabled={loading}
              className="clay-button w-full flex items-center justify-center space-x-4 disabled:opacity-50 py-5 group focus:outline-none focus:ring-4 focus:ring-white"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <RiPlayFill className="w-5 h-5 group-hover:scale-125 transition-transform" aria-hidden="true" />
                  <span className="tracking-[0.3em] text-[11px] font-black italic">SIMULATE NEXT PHASE</span>
                </>
              )}
            </button>
          </motion.div>
          <SettingsDashboard />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 glass-panel p-12 bg-white/[0.02] border-white/10 flex flex-col min-h-[900px] relative overflow-hidden"
          role="log"
          aria-live="polite"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-12">
              <div className="flex items-center space-x-4">
                <RiMessage3Fill className="w-6 h-6 text-zinc-400" aria-hidden="true" />
                <h3 className="font-black uppercase tracking-tight text-xl italic text-white">The Brain Room Transcript <span className="text-zinc-400 ml-4 font-mono text-[10px] not-italic tracking-[0.4em] uppercase">ADK-PRO-02</span></h3>
              </div>
              <div className="flex space-x-2" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/60 animate-pulse" />
              </div>
            </div>

            <div className="flex-1 space-y-12 overflow-y-auto pr-6 custom-scrollbar">
              {debate.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-700 space-y-10">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-24 h-24 border-2 border-white/20 rounded-[40px] flex items-center justify-center"
                  >
                    <RiArrowRightSLine className="w-12 h-12 text-zinc-300" aria-hidden="true" />
                  </motion.div>
                  <div className="text-center space-y-3">
                    <p className="text-[12px] uppercase font-black tracking-[1em] italic text-zinc-400">System Standby</p>
                    <p className="text-[9px] text-zinc-300 uppercase tracking-widest font-mono">Awaiting tactical match data injection...</p>
                  </div>
                </div>
              ) : (
                debate.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3 }}
                    className="space-y-6 group"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="h-[1px] w-16 bg-white/30 group-hover:w-24 transition-all duration-1000 ease-out" />
                      <div className="flex items-center space-x-3">
                         <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white italic">
                          {step.agent}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">TRACE_LOG_0{i+1}</span>
                      </div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.06] p-10 rounded-[48px] group-hover:bg-white/[0.06] group-hover:border-white/10 transition-all duration-700 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6">
                        <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" aria-hidden="true" />
                      </div>
                      <p className="text-base md:text-lg leading-relaxed text-zinc-200 font-medium italic relative z-10 selection:bg-white selection:text-black">
                        "{step.text}"
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

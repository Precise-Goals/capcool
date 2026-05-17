import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, Footer } from './components/Navigation';
import { Home, About } from './components/Pages';
import { AuthGateway, SettingsDashboard } from './components/AuthComponents';
import { Play, MessageSquare, Terminal, ChevronRight, Wind, Droplets, MapPin, Users } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, walletAddress, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
    </div>
  );
  if (!user && !walletAddress) return <Navigate to="/auth" />;
  return children;
};

const InputField = ({ label, value, onChange, placeholder, icon: Icon }) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center space-x-2">
      {Icon && <Icon className="w-3 h-3" />}
      <span>{label}</span>
    </label>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-white/20 transition-all font-mono"
    />
  </div>
);

const BrainRoom = () => {
  const { geminiKey } = useAuth();
  const [loading, setLoading] = useState(false);
  const [debate, setDebate] = useState([]);
  
  // Structured Match State
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
    additionalContext: ''
  });

  const runDebate = async () => {
    if (!geminiKey) return;
    setLoading(true);
    
    const fullContext = `
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
    } catch (error) {
      alert("Debate failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">The Brain Room</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">Active Multi-Agent Session</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Match State Input Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 space-y-6 bg-white/[0.02]">
            <div className="flex items-center space-x-2 text-zinc-400 pb-2 border-b border-white/5">
              <Terminal className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Match State Engine</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Innings</label>
                <select 
                  className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-white/20"
                  value={matchState.innings}
                  onChange={(e) => setMatchState({...matchState, innings: e.target.value})}
                >
                  <option value="1">1st Innings</option>
                  <option value="2">2nd Innings</option>
                </select>
              </div>
              <InputField 
                label="Over/Ball" 
                value={matchState.over}
                onChange={(v) => setMatchState({...matchState, over: v})}
                placeholder="15.2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField 
                label="Score" 
                value={matchState.score}
                onChange={(v) => setMatchState({...matchState, score: v})}
                placeholder="142/4"
              />
              <InputField 
                label="Wickets" 
                value={matchState.wickets}
                onChange={(v) => setMatchState({...matchState, wickets: v})}
                placeholder="4"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField 
                label="On Strike" 
                value={matchState.batterOnStrike}
                onChange={(v) => setMatchState({...matchState, batterOnStrike: v})}
                placeholder="Virat K."
                icon={Users}
              />
              <InputField 
                label="Bowler" 
                value={matchState.bowler}
                onChange={(v) => setMatchState({...matchState, bowler: v})}
                placeholder="Rashid K."
                icon={Users}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center space-x-2">
                  <Wind className="w-3 h-3" />
                  <span>Pitch</span>
                </label>
                <select 
                  className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-white/20"
                  value={matchState.pitch}
                  onChange={(e) => setMatchState({...matchState, pitch: e.target.value})}
                >
                  <option>Flat</option>
                  <option>Turning</option>
                  <option>Green</option>
                  <option>Two-paced</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center space-x-2">
                  <Droplets className="w-3 h-3" />
                  <span>Dew</span>
                </label>
                <select 
                  className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-white/20"
                  value={matchState.dew}
                  onChange={(e) => setMatchState({...matchState, dew: e.target.value})}
                >
                  <option>No</option>
                  <option>Light</option>
                  <option>Heavy</option>
                </select>
              </div>
            </div>

            <InputField 
              label="Venue" 
              value={matchState.venue}
              onChange={(v) => setMatchState({...matchState, venue: v})}
              placeholder="Wankhede, Mumbai"
              icon={MapPin}
            />

            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Tactical Context</label>
              <textarea 
                value={matchState.additionalContext}
                onChange={(e) => setMatchState({...matchState, additionalContext: e.target.value})}
                placeholder="Any additional details..."
                className="w-full h-24 bg-black/40 border border-white/5 rounded-xl p-3 text-xs focus:outline-none focus:border-white/20 transition-all resize-none"
              />
            </div>

            <button 
              onClick={runDebate}
              disabled={loading}
              className="clay-button w-full flex items-center justify-center space-x-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="tracking-[0.2em] text-[10px]">SIMULATE NEXT BALL</span>
                </>
              )}
            </button>
          </div>
          <SettingsDashboard />
        </div>

        {/* Debate Visualization Panel */}
        <div className="lg:col-span-8 glass-panel p-8 bg-white/[0.01] flex flex-col min-h-[800px] relative overflow-hidden">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-zinc-400" />
                <h3 className="font-bold uppercase tracking-tight text-sm italic">Debate Visualizer <span className="text-zinc-600 ml-2 font-mono text-[10px] not-italic tracking-widest uppercase">ADK-v2.0</span></h3>
              </div>
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <div className="w-2 h-2 rounded-full bg-green-500/20" />
              </div>
            </div>

            <div className="flex-1 space-y-10 overflow-y-auto pr-4 custom-scrollbar">
              {debate.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-800 space-y-6">
                  <div className="w-20 h-20 border border-white/5 rounded-full flex items-center justify-center animate-pulse">
                    <ChevronRight className="w-10 h-10 text-zinc-800" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-[10px] uppercase font-bold tracking-[0.8em]">System Standby</p>
                    <p className="text-[8px] text-zinc-700 uppercase tracking-widest font-mono">Awaiting match context injection...</p>
                  </div>
                </div>
              ) : (
                debate.map((step, i) => (
                  <div key={i} className="space-y-4 group">
                    <div className="flex items-center space-x-4">
                      <div className="h-[1px] w-12 bg-white/10 group-hover:w-20 transition-all duration-700 ease-out" />
                      <div className="flex items-center space-x-2">
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white italic">
                          {step.agent}
                        </span>
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">0{i+1}</span>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl group-hover:bg-white/[0.04] group-hover:border-white/10 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4">
                        <div className="w-2 h-2 rounded-full bg-white/5 animate-pulse" />
                      </div>
                      <p className="text-sm md:text-base leading-relaxed text-zinc-400 font-medium italic relative z-10">
                        "{step.text}"
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col selection:bg-white selection:text-black">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<div className="pt-40"><AuthGateway /></div>} />
              <Route 
                path="/brain-room" 
                element={
                  <ProtectedRoute>
                    <BrainRoom />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

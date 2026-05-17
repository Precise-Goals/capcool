import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Zap, Globe, ShieldCheck } from 'lucide-react';

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <Zap className="w-4 h-4 text-white animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Powered by Gemini 2.0 Pro</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.9] text-white">
          Master The <span className="text-zinc-600">Game.</span><br />
          AI Captaincy.
        </h1>
        
        <p className="max-w-2xl mx-auto text-zinc-500 text-lg md:text-xl font-medium leading-relaxed">
          The first adversarial multi-agent debate engine designed to solve T20 cricket's most complex tactical moments in real-time.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
          <Link to="/auth" className="clay-button group flex items-center space-x-3">
            <span>GET STARTED</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/about" className="px-8 py-3 rounded-full border border-white/10 font-bold tracking-widest text-[10px] uppercase hover:bg-white/5 transition-colors text-white">
            Learn the Protocol
          </Link>
        </div>
      </motion.div>
    </div>
    
    {/* Animated background elements */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.02] rounded-full blur-3xl -z-10" />
  </section>
);

const Features = () => {
  const features = [
    { icon: Cpu, title: "Multi-Agent Debate", desc: "Three specialized Gemini instances debating historical data vs. contrarian risks." },
    { icon: Globe, title: "Live Tooling", desc: "Native function calling connects directly to live scoreboards for real-time context." },
    { icon: ShieldCheck, title: "Secure Protocol", desc: "Dual-layer auth using MetaMask and Firebase for maximum security." }
  ];

  return (
    <section className="py-24 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="glass-panel p-8 space-y-4 border-white/5"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
              <f.icon className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight italic text-white">{f.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const Home = () => (
  <div className="min-h-screen">
    <Hero />
    <Features />
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto glass-panel p-20 text-center space-y-8 bg-white/5 border-white/10">
        <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white">Ready to simulate?</h2>
        <p className="text-zinc-500 max-w-xl mx-auto text-lg font-medium">Enter the Brain Room and let the agents solve your next match-winning scenario.</p>
        <Link to="/auth" className="clay-button inline-block">LAUNCH ENGINE</Link>
      </div>
    </section>
  </div>
);

export const About = () => (
  <div className="min-h-screen pt-32 pb-20">
    <div className="max-w-4xl mx-auto px-6 space-y-20">
      <div className="space-y-6">
        <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">The Protocol</h1>
        <p className="text-zinc-400 text-xl leading-relaxed font-medium">
          Captain Cool isn't just an AI; it's a high-fidelity simulation of elite tactical decision-making. We use an adversarial debate loop to ensure every decision is vetted by multiple perspectives.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-12">
        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white bg-white/10 px-3 py-1 rounded">Phase 01</span>
          <h3 className="text-3xl font-black uppercase italic text-white">The Head Analyst</h3>
          <p className="text-zinc-500 font-medium leading-relaxed">Grounded in the "Matchups" philosophy. It analyzes bowler-batsman history, ground dimensions, and historical run-rates to propose the most statistically sound move.</p>
        </div>
        
        <div className="space-y-4 border-l-2 border-white/5 pl-8">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white bg-white/10 px-3 py-1 rounded">Phase 02</span>
          <h3 className="text-3xl font-black uppercase italic text-white">The Devil's Advocate</h3>
          <p className="text-zinc-500 font-medium leading-relaxed">The risk-seeker. It looks for the unexpected—the dew factor, psychological pressure, and contrarian tactics that data might overlook.</p>
        </div>
        
        <div className="space-y-4 border-l-2 border-white/5 pl-8">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white bg-white/10 px-3 py-1 rounded">Phase 03</span>
          <h3 className="text-3xl font-black uppercase italic text-white">The Virtual Captain</h3>
          <p className="text-zinc-500 font-medium leading-relaxed">The final arbiter. It synthesizes the debate, weighs the risks, and delivers the definitive tactical call in authentic commentator prose.</p>
        </div>
      </div>
    </div>
  </div>
);

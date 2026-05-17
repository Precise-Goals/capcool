import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  RiArrowRightLine, 
  RiCpuFill, 
  RiFlashlightFill, 
  RiGlobalFill, 
  RiShieldCheckFill,
  RiTerminalBoxFill,
  RiDatabaseFill,
  RiMagicFill
} from 'react-icons/ri';

const Hero = () => (
  <section className="relative pt-40 pb-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-10"
      >
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
          <RiFlashlightFill className="w-4 h-4 text-white animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">Gemini 2.0 Pro Activated</span>
        </div>
        
        <h1 className="text-8xl md:text-[10rem] font-black uppercase tracking-tighter italic leading-[0.8] text-white">
          Tactical <span className="text-zinc-800">Zen.</span><br />
          AI <span className="underline decoration-zinc-800 underline-offset-8">Captain.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-zinc-500 text-lg md:text-xl font-medium leading-relaxed italic">
          "The first adversarial multi-agent debate engine designed to solve T20 cricket's most complex tactical moments in real-time."
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-10">
          <Link to="/auth" className="clay-button group flex items-center space-x-3 px-10 py-4">
            <span className="text-xs">INITIALIZE ENGINE</span>
            <RiArrowRightLine className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/about" className="px-10 py-4 rounded-full border border-white/5 font-black tracking-[0.3em] text-[10px] uppercase hover:bg-white/5 transition-all text-white italic">
            READ THE PROTOCOL
          </Link>
        </div>
      </motion.div>
    </div>
    
    {/* Animated background elements */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.01] rounded-full blur-[120px] -z-10" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] -z-10" />
  </section>
);

const Features = () => {
  const features = [
    { icon: RiCpuFill, title: "Adversarial Debate", desc: "Three specialized Gemini instances debating historical data vs. contrarian risks in a multi-turn loop." },
    { icon: RiGlobalFill, title: "Real-Time Scraping", desc: "Native function calling connects directly to live scoreboards for instantaneous match state injection." },
    { icon: RiShieldCheckFill, title: "Dual-Auth Protocol", desc: "Military-grade access using MetaMask Web3 and Firebase Auth for maximum analytical security." }
  ];

  return (
    <section className="py-32 bg-zinc-950/30 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.03)" }}
            className="glass-panel p-10 space-y-6 border-white/[0.03] transition-colors"
          >
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <f.icon className="w-7 h-7 text-black" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white leading-none">{f.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">{f.desc}</p>
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
    <section className="py-40 px-6">
      <motion.div 
        whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
        className="max-w-7xl mx-auto glass-panel p-24 text-center space-y-10 bg-white/[0.01] border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
        <h2 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter text-white leading-none relative z-10">Ready to <span className="text-zinc-800 underline decoration-white/10 underline-offset-8">Simulate?</span></h2>
        <p className="text-zinc-500 max-w-xl mx-auto text-xl font-medium italic relative z-10">"The Brain Room is open. Let the agents solve your next match-winning scenario."</p>
        <Link to="/auth" className="clay-button inline-block px-12 py-5 relative z-10">LAUNCH ENGINE</Link>
      </motion.div>
    </section>
  </div>
);

export const About = () => (
  <div className="min-h-screen pt-48 pb-32">
    <div className="max-w-5xl mx-auto px-6 space-y-32">
      <div className="space-y-8 text-center">
        <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none">The Protocol.</h1>
        <p className="text-zinc-500 text-2xl leading-relaxed font-medium italic max-w-3xl mx-auto">
          "Captain Cool isn't just an AI; it's a high-fidelity simulation of elite tactical decision-making, vetted by multiple perspectives."
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="group space-y-6 bg-white/[0.01] p-12 rounded-[40px] border border-white/5 hover:border-white/10 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
              <RiTerminalBoxFill className="w-6 h-6 text-white" />
            </div>
            <span className="text-[12px] font-black uppercase tracking-[0.5em] text-zinc-600 group-hover:text-white transition-colors">Phase 01</span>
          </div>
          <h3 className="text-5xl font-black uppercase italic text-white tracking-tighter">The Head Analyst</h3>
          <p className="text-zinc-500 text-lg leading-relaxed font-medium italic">Analyzes bowler-batsman history, ground dimensions, and historical run-rates to propose the most statistically sound move based on "The Stats Don't Lie" methodology.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="group space-y-6 bg-white/[0.01] p-12 rounded-[40px] border border-white/5 hover:border-white/10 transition-all ml-0 md:ml-12"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
              <RiDatabaseFill className="w-6 h-6 text-white" />
            </div>
            <span className="text-[12px] font-black uppercase tracking-[0.5em] text-zinc-600 group-hover:text-white transition-colors">Phase 02</span>
          </div>
          <h3 className="text-5xl font-black uppercase italic text-white tracking-tighter">The Devil's Advocate</h3>
          <p className="text-zinc-500 text-lg leading-relaxed font-medium italic">The skeptic. Looks for the unexpected—the dew factor, psychological pressure, and contrarian tactics that raw data often overlooks.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="group space-y-6 bg-white/[0.01] p-12 rounded-[40px] border border-white/5 hover:border-white/10 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
              <RiMagicFill className="w-6 h-6 text-white" />
            </div>
            <span className="text-[12px] font-black uppercase tracking-[0.5em] text-zinc-600 group-hover:text-white transition-colors">Phase 03</span>
          </div>
          <h3 className="text-5xl font-black uppercase italic text-white tracking-tighter">The Virtual Captain</h3>
          <p className="text-zinc-500 text-lg leading-relaxed font-medium italic">The final arbiter. Synthesizes the debate, weighs the risks, and delivers the definitive tactical call in authentic commentator prose.</p>
        </motion.div>
      </div>
    </div>
  </div>
);

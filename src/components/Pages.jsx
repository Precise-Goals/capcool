import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Zap, Globe, ShieldCheck, ChevronRight } from 'lucide-react';

/* ─── Shared animation variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Hero ───────────────────────────────────────────────────────────────── */
const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    {/* Ambient glow blob */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full -z-10"
      style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="text-center space-y-8"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 text-white animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Powered by Gemini 2.5 Pro
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.9] text-white"
        >
          Master The <span className="text-zinc-600">Game.</span>
          <br />AI Captaincy.
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-zinc-500 text-lg md:text-xl font-medium leading-relaxed"
        >
          The first adversarial multi-agent debate engine designed to solve T20 cricket's most
          complex tactical moments in real-time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
        >
          <Link to="/auth" className="clay-button group flex items-center space-x-3">
            <span>GET STARTED</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 rounded-full border border-white/10 font-bold tracking-widest text-[10px] uppercase hover:bg-white/5 transition-colors text-white"
          >
            Learn the Protocol
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── Feature Cards ──────────────────────────────────────────────────────── */
const Features = () => {
  const features = [
    {
      icon: Cpu,
      title: 'Multi-Agent Debate',
      desc: 'Three specialized Gemini instances debating historical data vs. contrarian risks.',
    },
    {
      icon: Globe,
      title: 'Live Tooling',
      desc: 'Native function calling connects directly to live scoreboards for real-time context.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Protocol',
      desc: 'Dual-layer auth using MetaMask and Firebase for maximum security.',
    },
  ];

  return (
    <section className="py-24 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -10, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="glass-panel p-8 space-y-4 border-white/5 cursor-default"
            >
              <motion.div
                className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6"
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <f.icon className="w-6 h-6 text-black" />
              </motion.div>
              <h3 className="text-xl font-black uppercase tracking-tight italic text-white">
                {f.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Agent Debate Steps ─────────────────────────────────────────────────── */
const agentSteps = [
  {
    phase: '01',
    label: 'The Head Analyst',
    color: 'bg-white',
    desc: 'Grounds proposals in match history, player matchups, boundary dimensions & venue run-rates. Proposes the initial tactical move via max-probability outcomes.',
  },
  {
    phase: '02',
    label: "The Devil's Advocate",
    color: 'bg-zinc-400',
    desc: 'Risk-seeking, contrarian mindset. Exploits dew factors, pitch behavior & psychological pressure. Aggressively challenges every proposal.',
  },
  {
    phase: '03',
    label: 'The Virtual Captain',
    color: 'bg-zinc-700',
    desc: 'Pragmatic leadership. Synthesizes the debate, weighs resources & game phase, delivers the final definitive decision in authentic commentator prose.',
  },
];

const AgentFlow = () => (
  <section className="py-24 px-6">
    <div className="max-w-4xl mx-auto space-y-4">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mb-14"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
          The Debate Engine
        </span>
        <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white mt-2">
          How the agents think.
        </h2>
      </motion.div>

      {agentSteps.map((step, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          whileHover={{ x: 6 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="glass-panel p-8 flex items-start gap-6 group cursor-default"
        >
          <div className={`w-10 h-10 ${step.color} rounded-full flex-shrink-0 flex items-center justify-center`}>
            <span className="text-[10px] font-black text-black">{step.phase}</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-black uppercase italic tracking-tight text-white text-lg">
              {step.label}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium">{step.desc}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 ml-auto self-center transition-colors duration-200" />
        </motion.div>
      ))}
    </div>
  </section>
);

/* ─── CTA Banner ─────────────────────────────────────────────────────────── */
const CtaBanner = () => (
  <section className="py-32 px-6">
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="max-w-7xl mx-auto glass-panel p-20 text-center space-y-8 bg-white/5 border-white/10"
    >
      <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
        Ready to simulate?
      </h2>
      <p className="text-zinc-500 max-w-xl mx-auto text-lg font-medium">
        Enter the Brain Room and let the agents solve your next match-winning scenario.
      </p>
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
        <Link to="/auth" className="clay-button inline-block">
          LAUNCH ENGINE
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

/* ─── Exports ────────────────────────────────────────────────────────────── */
export const Home = () => (
  <div className="min-h-screen">
    <Hero />
    <Features />
    <AgentFlow />
    <CtaBanner />
  </div>
);

export const About = () => (
  <div className="min-h-screen pt-32 pb-20">
    <div className="max-w-4xl mx-auto px-6 space-y-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.h1
          variants={fadeUp}
          className="text-6xl font-black uppercase italic tracking-tighter text-white"
        >
          The Protocol
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-zinc-400 text-xl leading-relaxed font-medium"
        >
          Captain Cool isn't just an AI; it's a high-fidelity simulation of elite tactical
          decision-making. We use an adversarial debate loop to ensure every decision is vetted
          by multiple perspectives before the captain commits.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 gap-12">
        {[
          {
            phase: 'Phase 01',
            title: 'The Head Analyst',
            body: 'Grounded in the "Matchups" philosophy. Analyzes bowler-batsman history, ground dimensions, and historical run-rates to propose the most statistically sound move.',
          },
          {
            phase: 'Phase 02',
            title: "The Devil's Advocate",
            body: 'The risk-seeker. Looks for the unexpected — the dew factor, psychological pressure, and contrarian tactics that data might overlook.',
            indent: true,
          },
          {
            phase: 'Phase 03',
            title: 'The Virtual Captain',
            body: 'The final arbiter. Synthesizes the debate, weighs the risks, and delivers the definitive tactical call in authentic commentator prose.',
            indent: true,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className={`space-y-4 ${item.indent ? 'border-l-2 border-white/5 pl-8' : ''}`}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white bg-white/10 px-3 py-1 rounded">
              {item.phase}
            </span>
            <h3 className="text-3xl font-black uppercase italic text-white">{item.title}</h3>
            <p className="text-zinc-500 font-medium leading-relaxed">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

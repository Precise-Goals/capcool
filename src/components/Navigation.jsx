import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutGrid, Info, Shield, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { user, walletAddress, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: LayoutGrid },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Brain Room', path: '/brain-room', icon: Shield },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center"
            whileHover={{ rotate: 12, scale: 1.08 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="w-5 h-5 bg-black rounded-sm rotate-45" />
          </motion.div>
          <div className="flex flex-col -space-y-1">
            <span className="font-black uppercase tracking-tighter text-xl italic text-white">Captain</span>
            <span className="font-bold uppercase tracking-[0.3em] text-[10px] text-zinc-500">Cool</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  isActive ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          {(user || walletAddress) ? (
            <button 
              onClick={logout}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <LogOut className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            </button>
          ) : (
            <Link to="/auth" className="clay-button !py-2 !px-6 !text-[10px] tracking-[0.2em]">
              GET ACCESS
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-black border-t border-white/5 py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-2 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-black uppercase tracking-tighter text-xl italic text-white">Captain Cool</span>
        </div>
        <p className="text-zinc-500 text-sm max-w-sm leading-relaxed font-medium">
          The world's first multi-agent agentic framework for high-stakes IPL tactical decision making. Powered by Google Gemini.
        </p>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Navigation</h4>
        <ul className="space-y-2 text-zinc-500 text-sm font-medium">
          <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
          <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
          <li><Link to="/brain-room" className="hover:text-white transition-colors">Brain Room</Link></li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Stack</h4>
        <ul className="space-y-2 text-zinc-500 text-sm font-medium">
          <li>Gemini 2.0 Pro</li>
          <li>Google ADK</li>
          <li>MetaMask Web3</li>
          <li>Firebase Auth</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.4em]">
        © 2026 Captain Cool • Built for Google Hackathon
      </p>
      <div className="flex space-x-6">
        <div className="text-zinc-700 hover:text-white transition-colors"><Shield className="w-4 h-4" /></div>
      </div>
    </div>
  </footer>
);

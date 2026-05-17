import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  RiLayoutGridFill, 
  RiInformationFill, 
  RiShieldFlashFill, 
  RiLogoutCircleRFill,
  RiTerminalBoxFill,
  RiGoogleFill,
  RiGithubFill,
  RiDiscordFill,
  RiTwitterFill
} from 'react-icons/ri';
import { SiVite, SiReact } from 'react-icons/si';

export const Navbar = () => {
  const { user, walletAddress, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: RiLayoutGridFill },
    { name: 'About', path: '/about', icon: RiInformationFill },
    { name: 'Brain Room', path: '/brain-room', icon: RiShieldFlashFill },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-transform duration-300"
          >
            <div className="w-5 h-5 bg-black rounded-sm rotate-45" />
          </motion.div>
          <div className="flex flex-col -space-y-1">
            <span className="font-black uppercase tracking-tighter text-xl italic text-white">Captain</span>
            <span className="font-bold uppercase tracking-[0.3em] text-[10px] text-zinc-400">Cool</span>
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
                className={`relative flex items-center space-x-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  isActive ? 'text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-bg"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          {(user || walletAddress) ? (
            <div className="flex items-center space-x-4">
              {user?.photoURL && (
                <img src={user.photoURL} className="w-8 h-8 rounded-full border border-white/10" alt="Profile" />
              )}
              <button 
                onClick={logout}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <RiLogoutCircleRFill className="w-4 h-4 text-zinc-400 group-hover:text-white" />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="clay-button !py-2.5 !px-6 !text-[9px] tracking-[0.3em]">
              GET ACCESS
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-black border-t border-white/5 py-24 px-6 relative overflow-hidden">
    {/* Decorative background grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_100%)]" />

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
      <div className="col-span-2 space-y-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <div className="w-5 h-5 bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-black uppercase tracking-tighter text-2xl italic text-white">Captain Cool</span>
        </div>
        <p className="text-zinc-400 text-sm max-w-sm leading-relaxed font-medium italic">
          "The ultimate adversarial multi-agent brain designed to simulate elite tactical decision-making at the speed of light."
        </p>
        <div className="flex space-x-4">
          <a href="#" className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-all"><RiGithubFill className="w-5 h-5" /></a>
          <a href="#" className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-all"><RiTwitterFill className="w-5 h-5" /></a>
          <a href="#" className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-all"><RiDiscordFill className="w-5 h-5" /></a>
        </div>
      </div>
      
      <div className="space-y-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic">Navigation</h4>
        <ul className="space-y-3 text-zinc-400 text-[11px] font-black uppercase tracking-widest">
          <li><Link to="/" className="hover:text-white transition-colors flex items-center space-x-2"><RiLayoutGridFill className="w-3.5 h-3.5" /><span>Home</span></Link></li>
          <li><Link to="/about" className="hover:text-white transition-colors flex items-center space-x-2"><RiInformationFill className="w-3.5 h-3.5" /><span>About</span></Link></li>
          <li><Link to="/brain-room" className="hover:text-white transition-colors flex items-center space-x-2"><RiShieldFlashFill className="w-3.5 h-3.5" /><span>Brain Room</span></Link></li>
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic">Technology</h4>
        <ul className="space-y-3 text-zinc-400 text-[11px] font-black uppercase tracking-widest">
          <li className="flex items-center space-x-2"><RiTerminalBoxFill className="w-3.5 h-3.5" /><span>Gemini 2.0 Pro</span></li>
          <li className="flex items-center space-x-2"><SiReact className="w-3.5 h-3.5" /><span>React High-Fid</span></li>
          <li className="flex items-center space-x-2"><SiVite className="w-3.5 h-3.5" /><span>Vite Engine</span></li>
          <li className="flex items-center space-x-2"><RiShieldFlashFill className="w-3.5 h-3.5" /><span>Web3 Meta</span></li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
      <div className="flex items-center space-x-4">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.4em]">
          © 2026 Captain Cool • Google Hackathon Entry
        </p>
      </div>
      <div className="flex items-center space-x-2 text-zinc-800 text-[8px] font-black uppercase tracking-[0.3em]">
        <span>Validated by</span>
        <div className="w-4 h-4 bg-zinc-900 rounded-full" />
        <span>Antigravity</span>
      </div>
    </div>
  </footer>
);

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiMetamask, 
  SiGoogle, 
  SiFirebase 
} from 'react-icons/si';
import { 
  RiMailFill, 
  RiLockPasswordFill, 
  RiUserFill, 
  RiSettings4Fill, 
  RiShieldCheckFill,
  RiArrowRightLine,
  RiArrowLeftLine
} from 'react-icons/ri';

export const AuthGateway = () => {
  const { user, walletAddress, loginWithGoogle, loginWithEmail, signupWithEmail, connectWallet } = useAuth();
  const [authMode, setAuthMode] = useState('selection'); // selection, login, signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (authMode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password, displayName);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <motion.div 
        initial="hidden"
        animate="visible"
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-none">
          Captain <span className="text-zinc-700">Cool</span>
        </h1>
        <p className="text-zinc-500 font-bold tracking-[0.4em] uppercase text-[10px]">
          Access The Multi-Agent Strategy Engine
        </p>
      </motion.div>

      <div className="glass-panel p-1 w-full max-w-md relative overflow-hidden">
        <AnimatePresence mode="wait">
          {authMode === 'selection' && (
            <motion.div 
              key="selection"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-10 space-y-6"
            >
              <div className="space-y-4">
                <button 
                  onClick={connectWallet}
                  className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <SiMetamask className="w-6 h-6 text-[#F6851B]" />
                    <span className="font-bold text-white text-sm tracking-tight">Web3 MetaMask</span>
                  </div>
                  {walletAddress ? <RiShieldCheckFill className="w-5 h-5 text-green-500" /> : <RiArrowRightLine className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />}
                </button>

                <button 
                  onClick={loginWithGoogle}
                  className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <SiGoogle className="w-5 h-5 text-white" />
                    <span className="font-bold text-white text-sm tracking-tight">Google Account</span>
                  </div>
                  {user ? <RiShieldCheckFill className="w-5 h-5 text-green-500" /> : <RiArrowRightLine className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />}
                </button>

                <div className="relative py-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                  <span className="relative bg-zinc-950 px-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest italic">Protocol Direct</span>
                </div>

                <button 
                  onClick={() => setAuthMode('login')}
                  className="w-full flex items-center justify-between px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <RiMailFill className="w-5 h-5 text-zinc-400" />
                    <span className="font-bold text-white text-sm tracking-tight">Email & Password</span>
                  </div>
                  <RiArrowRightLine className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {(user || walletAddress) && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pt-6 border-t border-white/5"
                >
                  <button className="clay-button w-full uppercase tracking-widest text-[10px] flex items-center justify-center space-x-2">
                    <span>LAUNCH ENGINE</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {(authMode === 'login' || authMode === 'signup') && (
            <motion.div 
              key="email-auth"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-10 space-y-6"
            >
              <button 
                onClick={() => setAuthMode('selection')}
                className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors group"
              >
                <RiArrowLeftLine className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest italic">Back to Selection</span>
              </button>

              <div className="space-y-1">
                <h3 className="text-2xl font-black uppercase italic text-white tracking-tighter">
                  {authMode === 'login' ? 'System Login' : 'Register Protocol'}
                </h3>
                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                  Secure Multi-Agent Access Point
                </p>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 ml-2">Display Name</label>
                    <div className="relative">
                      <RiUserFill className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input 
                        required
                        type="text"
                        placeholder="Mahendra S."
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-white/20 transition-all text-white font-medium"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 ml-2">Email Address</label>
                  <div className="relative">
                    <RiMailFill className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input 
                      required
                      type="email"
                      placeholder="captain@cool.ai"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-white/20 transition-all text-white font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 ml-2">Secret Code</label>
                  <div className="relative">
                    <RiLockPasswordFill className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input 
                      required
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-white/20 transition-all text-white font-medium"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500/80 text-[10px] font-bold uppercase italic tracking-wider bg-red-500/5 p-3 rounded-lg border border-red-500/10 animate-shake">{error}</p>}

                <button 
                  disabled={loading}
                  className="clay-button w-full uppercase tracking-[0.2em] text-[10px] py-4 mt-4 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (authMode === 'login' ? 'AUTHORIZE ACCESS' : 'INITIALIZE PROTOCOL')}
                </button>
              </form>

              <div className="text-center">
                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-zinc-600 hover:text-white text-[9px] font-black uppercase tracking-[0.2em] transition-colors"
                >
                  {authMode === 'login' ? "Don't have access? Request here" : "Already authorized? Login here"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const SettingsDashboard = () => {
  const { geminiKey, updateGeminiKey } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-8 max-w-2xl mx-auto space-y-6 bg-white/[0.02]"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center space-x-3">
          <RiSettings4Fill className="w-6 h-6 text-zinc-500 animate-spin-slow" />
          <h2 className="text-2xl font-black uppercase tracking-tight italic text-white">System Provisioning</h2>
        </div>
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1 italic">
            Gemini Core API Key
          </label>
          <div className="flex items-center space-x-1.5 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Secure Storage</span>
          </div>
        </div>
        <div className="relative">
          <RiLockPasswordFill className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="password"
            value={geminiKey}
            onChange={(e) => updateGeminiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-white/20 transition-all text-white font-mono placeholder:text-zinc-800"
          />
        </div>
        <div className="p-4 bg-white/[0.01] rounded-xl border border-white/5 flex items-start space-x-4">
          <RiShieldCheckFill className="w-5 h-5 text-zinc-700 mt-1 shrink-0" />
          <p className="text-[10px] text-zinc-600 uppercase font-bold leading-relaxed tracking-wider">
            Your analytical token is hashed and stored in local volatile memory. It is never transmitted beyond the official ADK multi-turn loop endpoints.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

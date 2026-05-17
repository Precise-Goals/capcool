import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiMetamask, 
  SiGoogle 
} from 'react-icons/si';
import { 
  RiMailFill, 
  RiLockPasswordFill, 
  RiUserFill, 
  RiSettings4Fill, 
  RiShieldCheckFill,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiDownloadCloud2Fill,
  RiCloseFill
} from 'react-icons/ri';

export const AuthGateway = () => {
  const { user, walletAddress, loginWithGoogle, loginWithEmail, signupWithEmail, connectWallet } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('selection');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [showMetaMaskModal, setShowMetaMaskModal] = useState(false);

  useEffect(() => {
    if (user || walletAddress) {
      setIsRouting(true);
      const timer = setTimeout(() => {
        navigate('/brain-room');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, walletAddress, navigate]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address format.');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return false;
    }
    if (authMode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (authMode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password, displayName);
      }
    } catch (err) {
      let msg = err.message;
      if (msg.includes('auth/weak-password')) msg = 'Password is too weak.';
      else if (msg.includes('auth/email-already-in-use')) msg = 'Email is already registered.';
      else if (msg.includes('auth/user-not-found') || msg.includes('auth/invalid-credential')) msg = 'Invalid credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleWeb3Connect = async () => {
    setError('');
    setLoading(true);
    try {
      await connectWallet();
    } catch (err) {
      if (err.message === 'METAMASK_NOT_INSTALLED') {
        setShowMetaMaskModal(true);
      } else {
        setError(err.message || 'Signature verification failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleConnect = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError('Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (addr) => addr ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : '';

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: isRouting ? 0 : 1 }} 
      transition={{ duration: 0.8 }}
      className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] px-6 gap-16 w-full max-w-7xl mx-auto"
    >
      <AnimatePresence>
        {showMetaMaskModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel p-8 max-w-sm w-full bg-white/[0.02] border-white/10 space-y-6 relative"
            >
              <button 
                onClick={() => setShowMetaMaskModal(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <RiCloseFill className="w-6 h-6" />
              </button>
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                <SiMetamask className="w-8 h-8 text-[#F6851B]" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">MetaMask Required</h3>
                <p className="text-zinc-400 text-sm mt-2">A Web3 wallet is necessary to sign the cryptographic challenge and access the trustless protocol.</p>
              </div>
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noreferrer"
                className="clay-button w-full flex items-center justify-center space-x-2 py-4"
              >
                <RiDownloadCloud2Fill className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-black">Install Extension</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-8 text-center lg:text-left"
      >
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md">
          <RiShieldCheckFill className="w-4 h-4 text-white" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 italic">AI-Orchestrated / Trustless Architecture</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-white leading-[0.9]">
          The <span className="text-zinc-700">Gateway.</span>
        </h1>
        <p className="text-zinc-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm max-w-md mx-auto lg:mx-0 leading-relaxed">
          Authenticate via cryptographic signature or decentralized protocol to initialize the Brain Room.
        </p>
      </motion.div>

      <div className="flex-1 w-full max-w-md relative">
        <div className="glass-panel p-2 overflow-hidden bg-white/[0.01]">
          <AnimatePresence mode="wait">
            {authMode === 'selection' && (
              <motion.div 
                key="selection"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-8 space-y-6"
              >
                <div className="space-y-4">
                  <button 
                    onClick={handleWeb3Connect}
                    disabled={loading}
                    className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center space-x-4">
                      <SiMetamask className="w-6 h-6 text-[#F6851B]" />
                      <span className="font-bold text-white text-sm tracking-tight">Web3 Cryptographic Sign</span>
                    </div>
                    {walletAddress ? (
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{formatAddress(walletAddress)}</span>
                    ) : (
                      <RiArrowRightLine className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>

                  <button 
                    onClick={handleGoogleConnect}
                    disabled={loading}
                    className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center space-x-4">
                      <SiGoogle className="w-5 h-5 text-white" />
                      <span className="font-bold text-white text-sm tracking-tight">Google Connect</span>
                    </div>
                    {user ? (
                      <RiShieldCheckFill className="w-5 h-5 text-green-500" />
                    ) : (
                      <RiArrowRightLine className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>

                  <div className="relative py-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                    <span className="relative bg-[#050505] px-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest italic">Protocol Direct</span>
                  </div>

                  <button 
                    onClick={() => setAuthMode('login')}
                    className="w-full flex items-center justify-between px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-all group"
                  >
                    <div className="flex items-center space-x-4">
                      <RiMailFill className="w-5 h-5 text-zinc-400" />
                      <span className="font-bold text-white text-sm tracking-tight">Standard Credentials</span>
                    </div>
                    <RiArrowRightLine className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3">
                    <RiCloseFill className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider leading-relaxed">{error}</p>
                  </div>
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
                className="p-8 space-y-6"
              >
                <button 
                  onClick={() => { setAuthMode('selection'); setError(''); }}
                  className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors group"
                >
                  <RiArrowLeftLine className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">Return</span>
                </button>

                <div className="space-y-1">
                  <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter">
                    {authMode === 'login' ? 'System Login' : 'Register'}
                  </h3>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                    Direct Gateway Access
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

                  {authMode === 'signup' && (
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600 ml-2">Confirm Code</label>
                      <div className="relative">
                        <RiLockPasswordFill className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                          required
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-white/20 transition-all text-white font-medium"
                        />
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3 mt-2">
                          <RiCloseFill className="w-5 h-5 text-red-500 shrink-0" />
                          <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider leading-relaxed">{error}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    disabled={loading}
                    className="clay-button w-full uppercase tracking-[0.2em] text-[10px] py-4 mt-6 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : (authMode === 'login' ? 'AUTHORIZE ACCESS' : 'INITIALIZE PROTOCOL')}
                  </button>
                </form>

                <div className="text-center">
                  <button 
                    onClick={() => {
                      setAuthMode(authMode === 'login' ? 'signup' : 'login');
                      setError('');
                    }}
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
    </motion.div>
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

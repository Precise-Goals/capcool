import { useAuth } from '../context/AuthContext';
import { Wallet, LogIn, Settings, ShieldCheck } from 'lucide-react';

export const AuthGateway = () => {
  const { user, walletAddress, loginWithGoogle, connectWallet } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black tracking-tighter uppercase italic text-white">
          Captain <span className="text-white">Cool</span>
        </h1>
        <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">
          Multi-Agent Agentic IPL Strategy Engine
        </p>
      </div>

      <div className="glass-panel p-12 max-w-md w-full space-y-8">
        <div className="space-y-6">
          <button 
            onClick={connectWallet}
            className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <Wallet className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              <span className="font-bold text-white text-sm">Connect MetaMask</span>
            </div>
            {walletAddress ? (
              <ShieldCheck className="w-5 h-5 text-green-500" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
            )}
          </button>

          <button 
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <LogIn className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              <span className="font-bold text-white text-sm">Web2 Login</span>
            </div>
            {user ? (
              <ShieldCheck className="w-5 h-5 text-green-500" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
            )}
          </button>
        </div>

        {(user || walletAddress) && (
          <div className="pt-6 border-t border-white/5">
            <button className="clay-button w-full uppercase tracking-widest text-[10px]">
              Enter The Brain Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const SettingsDashboard = () => {
  const { geminiKey, updateGeminiKey } = useAuth();

  return (
    <div className="glass-panel p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Settings className="w-6 h-6 text-zinc-400" />
        <h2 className="text-2xl font-bold uppercase tracking-tight text-white">AI Provisioning</h2>
      </div>
      
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Gemini Pro API Key
        </label>
        <input 
          type="password"
          value={geminiKey}
          onChange={(e) => updateGeminiKey(e.target.value)}
          placeholder="••••••••••••••••••••••••••••"
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white"
        />
        <p className="text-[10px] text-zinc-600 uppercase font-medium">
          Your key is stored locally and never exposed to the client console.
        </p>
      </div>
    </div>
  );
};

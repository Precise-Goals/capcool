import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { ethers } from 'ethers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geminiKey, setGeminiKey] = useState(
    localStorage.getItem('GEMINI_API_KEY') || import.meta.env.VITE_GEMINI_API_KEY || ''
  );

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Firebase Google Auth Error:", error);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Firebase Email Login Error:", error);
      throw error;
    }
  };

  const signupWithEmail = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Firebase Email Signup Error:", error);
      throw error;
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        // Cryptographic Challenge
        const nonce = Date.now();
        const message = `Verify wallet ownership for Captain Cool (AI-Orchestrated / Trustless Architecture):\nNonce: ${nonce}`;
        
        const signature = await signer.signMessage(message);
        const recoveredAddress = ethers.verifyMessage(message, signature);
        
        if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
          setWalletAddress(address);
          return address;
        } else {
          throw new Error("Signature verification failed.");
        }
      } catch (error) {
        console.error("MetaMask Verification Error:", error);
        throw error;
      }
    } else {
      throw new Error("METAMASK_NOT_INSTALLED");
    }
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setWalletAddress(null);
  };

  const updateGeminiKey = (key) => {
    setGeminiKey(key);
    localStorage.setItem('GEMINI_API_KEY', key);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      walletAddress, 
      loading, 
      geminiKey,
      loginWithGoogle, 
      loginWithEmail,
      signupWithEmail,
      connectWallet, 
      logout,
      updateGeminiKey
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';
import './firebase'; // Ensure firebase is initialized

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem('GEMINI_API_KEY') || '');

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Firebase Auth Error:", error);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("MetaMask Error:", error);
      }
    } else {
      alert("Please install MetaMask!");
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
      connectWallet, 
      logout,
      updateGeminiKey
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

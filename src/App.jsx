import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, Footer } from './components/Navigation';
import { Home, About } from './components/Pages';
import { AuthGateway } from './components/AuthComponents';
import { BrainRoom } from './components/BrainRoom';

const ProtectedRoute = ({ children }) => {
  const { user, walletAddress, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-16 h-16 border-4 border-white/5 border-t-white rounded-full animate-spin" />
    </div>
  );
  if (!user && !walletAddress) return <Navigate to="/auth" />;
  return children;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col selection:bg-white selection:text-black bg-black">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<div className="pt-40"><AuthGateway /></div>} />
              <Route 
                path="/brain-room" 
                element={
                  <ProtectedRoute>
                    <BrainRoom />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

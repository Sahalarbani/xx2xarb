import React, { useState, useEffect } from 'react';
import { User } from './types';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { SkinDetails } from './pages/SkinDetails';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Footer } from './components/Footer';

// Mock Router Implementation since we are in SPA without react-router-dom library
const App: React.FC = () => {
  // Navigation State
  const [currentRoute, setCurrentRoute] = useState('home');
  const [routeId, setRouteId] = useState<string | undefined>();
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);

  // Hash Navigation Listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const parts = hash.split('/');
      const page = parts[0] || 'home';
      const id = parts[1];
      
      setCurrentRoute(page);
      setRouteId(id);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple Router Logic
  const navigate = (page: string, id?: string) => {
    const hash = id ? `#${page}/${id}` : `#${page}`;
    window.location.hash = hash;
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('home');
  };

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'detail':
        return routeId ? <SkinDetails id={routeId} onBack={() => navigate('home')} /> : <Home onNavigate={navigate} />;
      case 'dashboard':
        return user ? <Dashboard /> : <Login onLoginSuccess={handleLogin} />;
      case 'login':
        return <Login onLoginSuccess={handleLogin} />;
      case 'about':
        return (
          <div className="min-h-screen pt-24 px-4 text-center">
            <h1 className="text-4xl font-display text-white mb-4">About Arbskinz</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Arbskinz is the premier destination for high-fidelity livery downloads. 
              We focus on community-driven content for the best racing simulators.
            </p>
          </div>
        );
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-gray-200 selection:bg-brand-accent selection:text-black font-sans">
      <Navbar 
        user={user} 
        onLogin={() => navigate('login')} 
        onLogout={handleLogout}
      />
      
      <main>
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
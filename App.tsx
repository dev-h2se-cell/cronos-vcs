
import React, { useState, Suspense } from 'react';
import { Navbar } from './components/Navbar';

// --- Code Splitting: Lazy-load screen components ---
const ChronosProductScreen = React.lazy(() => import('./components/ChronosProductScreen').then(m => ({ default: m.ChronosProductScreen })));
const RetinalProductPage = React.lazy(() => import('./components/RetinalProductPage').then(m => ({ default: m.RetinalProductPage })));
const LongevityProtocolScreen = React.lazy(() => import('./components/LongevityProtocolScreen').then(m => ({ default: m.LongevityProtocolScreen })));
const HydroLockProductScreen = React.lazy(() => import('./components/HydroLockProductScreen').then(m => ({ default: m.HydroLockProductScreen })));
const InvisibleShieldProductScreen = React.lazy(() => import('./components/InvisibleShieldProductScreen').then(m => ({ default: m.InvisibleShieldProductScreen })));
// --- End Code Splitting ---

import { Chatbot } from './components/Chatbot';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

// View type definition
type AppView = 'chronos' | 'infinity' | 'hydrolock' | 'shield' | 'protocol';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('chronos');
  const [cartCount, setCartCount] = useState(1);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleNavigate = (view: AppView) => {
    // Scroll to top when switching views for a fresh feel
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  // Render content based on current view
  const renderContent = () => {
    if (currentView === 'protocol') {
      return (
        <LongevityProtocolScreen 
          onBack={() => setCurrentView('chronos')}
          onAddToCart={handleAddToCart}
        />
      );
    }

    if (currentView === 'infinity') {
      return (
        <RetinalProductPage 
          onAddToCart={handleAddToCart} 
          onNavigateToProtocol={() => handleNavigate('protocol')} 
        />
      );
    }

    if (currentView === 'hydrolock') {
      return (
        <HydroLockProductScreen 
          onAddToCart={handleAddToCart}
        />
      );
    }

    if (currentView === 'shield') {
      return (
        <InvisibleShieldProductScreen 
          onAddToCart={handleAddToCart}
        />
      );
    }

    // Default: Chronos View (Unified Screen)
    return (
      <ChronosProductScreen 
        onAddToCart={handleAddToCart}
        onNavigateToRetinal={() => handleNavigate('infinity')}
        onNavigateToProtocol={() => handleNavigate('protocol')}
      />
    );
  };

  const getNavbarView = () => {
     if (currentView === 'infinity') return 'infinity';
     if (currentView === 'hydrolock') return 'hydrolock';
     if (currentView === 'shield') return 'shield';
     return 'chronos';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${currentView === 'protocol' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* Hide standard Navbar on the Sales Page to reduce distractions, or show customized version */}
      {currentView !== 'protocol' && (
        <Navbar 
          cartCount={cartCount} 
          currentView={getNavbarView()}
          onNavigate={(view) => handleNavigate(view)}
        />
      )}
      
      <main className="flex-grow">
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-500">Cargando...</p></div>}>
          {renderContent()}
        </Suspense>
      </main>

      {/* Hide standard Footer on Sales Page */}
      {currentView !== 'protocol' && <Footer />}

      {/* Floating Widgets */}
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
}

export default App;

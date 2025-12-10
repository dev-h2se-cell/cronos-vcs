import React, { useState, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import productsData from './products.json'; // Import the JSON data
import { ProductData } from './types'; // Import the interface for type safety

const typedProductsData: ProductData = productsData as ProductData; // Type assertion

// --- Code Splitting: Lazy-load screen components ---
const ChronosProductScreen = React.lazy(() => import('./components/ChronosProductScreen'));
const RetinalProductPage = React.lazy(() => import('./components/RetinalProductPage'));
const LongevityProtocolScreen = React.lazy(() => import('./components/LongevityProtocolScreen'));
const HydroLockProductScreen = React.lazy(() => import('./components/HydroLockProductScreen'));
const InvisibleShieldProductScreen = React.lazy(() => import('./components/InvisibleShieldProductScreen'));
const ProtocolsScreen = React.lazy(() => import('./components/ProtocolsScreen'));
// --- End Code Splitting ---

import WhatsAppButton from './components/WhatsAppButton';
import { Footer } from './components/Footer';

// View type definition
type AppView = 'chronos' | 'infinity' | 'hydrolock' | 'shield' | 'protocol' | 'protocols';

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
    if (currentView === 'protocols') {
      return (
        <ProtocolsScreen 
          onAddToCart={handleAddToCart}
          productsData={typedProductsData} // Added
        />
      );
    }

    if (currentView === 'protocol') {
      return (
        <LongevityProtocolScreen 
          onBack={() => setCurrentView('chronos')}
          onAddToCart={handleAddToCart}
          productsData={typedProductsData} // Added
        />
      );
    }

    if (currentView === 'infinity') {
      return (
        <RetinalProductPage 
          onAddToCart={handleAddToCart} 
          onNavigateToProtocol={() => handleNavigate('protocol')} 
          onNavigateToProtocols={() => handleNavigate('protocols')}
          productsData={typedProductsData} // Added
        />
      );
    }

    if (currentView === 'hydrolock') {
      return (
        <HydroLockProductScreen 
          onAddToCart={handleAddToCart}
          onNavigateToProtocols={() => handleNavigate('protocols')}
          productsData={typedProductsData} // Added
        />
      );
    }

    if (currentView === 'shield') {
      return (
        <InvisibleShieldProductScreen 
          onAddToCart={handleAddToCart}
          onNavigateToProtocols={() => handleNavigate('protocols')}
          productsData={typedProductsData} // Added
        />
      );
    }

    // Default: Chronos View (Unified Screen)
    return (
      <ChronosProductScreen 
        onAddToCart={handleAddToCart}
        onNavigateToProtocol={() => handleNavigate('protocol')}
        productsData={typedProductsData} // Added
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
    </div>
  );
}

export default App;
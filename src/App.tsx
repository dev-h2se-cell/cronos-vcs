import React, { useState, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { ProductData } from './types'; // Import the interface for type safety
import { productService } from './services/productService'; // Import the dynamic service
import { useEffect } from 'react';

// --- Custom Hooks & Context ---
import { useCart } from './context/CartContext';

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
import { Cart } from './components/Cart'; // Import the Cart component
import Chat from './components/Chat'; // Import the Chatbot component
import { Toast } from './components/Toast'; // Import the Toast component

// View type definition
type AppView = 'chronos' | 'infinity' | 'hydrolock' | 'shield' | 'protocol' | 'protocols';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('chronos');
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control cart visibility
  const [dynamicProductsData, setDynamicProductsData] = useState<ProductData>({ products: [], protocols: [], others: [] });
  const { toastMessage, hideToast } = useCart(); // Get toast state from context

  useEffect(() => {
    async function loadMasterData() {
      try {
        const products = await productService.getProducts();
        const protocols = await productService.getProtocols(products);
        const others = await productService.getOthers();

        setDynamicProductsData({
          products,
          protocols,
          others
        });
      } catch (error) {
        console.error("Error loading master data into Cronos:", error);
      } finally {
        // Nada extra por ahora
      }
    }
    loadMasterData();
  }, []);

  const handleNavigate = (view: AppView) => {
    // Scroll to top when switching views for a fresh feel
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  // Render content based on current view
  const renderContent = () => {
    if (currentView === 'protocols') {
      return (
        <ProtocolsScreen
          productsData={dynamicProductsData}
        />
      );
    }

    if (currentView === 'protocol') {
      return (
        <LongevityProtocolScreen
          onBack={() => setCurrentView('chronos')}
          productsData={dynamicProductsData}
        />
      );
    }

    if (currentView === 'infinity') {
      return (
        <RetinalProductPage
          onAddToCart={handleOpenCart}
          onNavigateToProtocol={() => handleNavigate('protocol')}
          onNavigateToProtocols={() => handleNavigate('protocols')}
          productsData={dynamicProductsData}
        />
      );
    }

    if (currentView === 'hydrolock') {
      return (
        <HydroLockProductScreen
          onAddToCart={handleOpenCart}
          onNavigateToProtocols={() => handleNavigate('protocols')}
          productsData={dynamicProductsData}
        />
      );
    }

    if (currentView === 'shield') {
      return (
        <InvisibleShieldProductScreen
          onAddToCart={handleOpenCart}
          onNavigateToProtocols={() => handleNavigate('protocols')}
          productsData={dynamicProductsData}
        />
      );
    }

    // Default: Chronos View (Unified Screen)
    return (
      <ChronosProductScreen
        onNavigateToProtocol={() => handleNavigate('protocol')}
        productsData={dynamicProductsData}
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
          currentView={getNavbarView()}
          onNavigate={(view) => handleNavigate(view)}
          onOpenCart={handleOpenCart}
        />
      )}

      <main className="flex-grow">
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-500">Cargando...</p></div>}>
          {renderContent()}
        </Suspense>
      </main>

      {/* Hide standard Footer on Sales Page */}
      {currentView !== 'protocol' && <Footer />}

      {/* --- Floating Widgets & Global Components --- */}
      <WhatsAppButton />
      <Cart isOpen={isCartOpen} onClose={handleCloseCart} />
      <Chat />
      {toastMessage && <Toast message={toastMessage} onClose={hideToast} />}
    </div>
  );
}


export default App;
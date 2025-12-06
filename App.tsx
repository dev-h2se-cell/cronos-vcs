import React, { useState, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import productsData from './products.json'; // Import the JSON data
import { ProductData, CartItem } from './types'; // Import the interface for type safety, and CartItem

const typedProductsData: ProductData = productsData as ProductData; // Type assertion

// --- Code Splitting: Lazy-load screen components ---
const ChronosProductScreen = React.lazy(() => import('./components/ChronosProductScreen'));
const RetinalProductPage = React.lazy(() => import('./components/RetinalProductPage'));
const LongevityProtocolScreen = React.lazy(() => import('./components/LongevityProtocolScreen'));
const HydroLockProductScreen = React.lazy(() => import('./components/HydroLockProductScreen'));
const InvisibleShieldProductScreen = React.lazy(() => import('./components/InvisibleShieldProductScreen'));
const ProtocolsScreen = React.lazy(() => import('./components/ProtocolsScreen'));
// --- End Code Splitting ---

import { Chatbot } from './components/Chatbot';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ChatbotButton } from './components/ChatbotButton'; // Import ChatbotButton
import { Footer } from './components/Footer';

// View type definition
type AppView = 'chronos' | 'infinity' | 'hydrolock' | 'shield' | 'protocol' | 'protocols';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('chronos');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [initialBotMessage, setInitialBotMessage] = useState<string | undefined>(undefined);

  const handleCtaToBot = (message: string) => {
    setInitialBotMessage(message);
    setChatbotOpen(true);
  };

  const handleAddToCart = (productId: string, quantity: number = 1) => {
    const allProducts = [...typedProductsData.products, ...typedProductsData.protocols];
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
      console.error(`Product with id ${productId} not found.`);
      return;
    }

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === productId);
      
      let newCart = [...prevCart];

      if (existingItemIndex > -1) {
        // Update quantity
        newCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        const priceNumber = parseFloat(product.price.replace(/\./g, ''));
        const newCartItem: CartItem = {
          id: product.id,
          name: product.name,
          price: priceNumber,
          quantity: quantity,
          currency: product.currency,
          image: (product as any).image || undefined
        };
        newCart.push(newCartItem);
      }
      
      console.log('Cart updated:', newCart); // For debugging
      return newCart;
    });
    
    // Open the chatbot to confirm the action
    setInitialBotMessage(`He añadido ${quantity} x ${product.name}.`);
    setChatbotOpen(true);
  };

  const getCartSummary = (): string => {
    if (cart.length === 0) {
      return "Tu carrito está vacío. ¿Quieres que te ayude a encontrar el producto perfecto para ti?";
    }

    let summary = "Tu pedido actual:\n\n";
    let total = 0;

    cart.forEach(item => {
      summary += `*${item.name}*\n`;
      summary += `Cantidad: ${item.quantity}\n`;
      summary += `Precio: $${(item.price * item.quantity).toLocaleString('es-CO')}\n\n`;
      total += item.price * item.quantity;
    });

    summary += `----------------------\n`;
    summary += `*Total: $${total.toLocaleString('es-CO')} COP*\n\n`;
    summary += `Para confirmar tu pedido y coordinar el pago/envío, haz clic en el botón de abajo para hablar con un asesor por WhatsApp.`;
    
    return summary;
  };

  const handleNavigate = (view: AppView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const renderContent = () => {
    if (currentView === 'protocols') {
      return (
        <ProtocolsScreen 
          onAddToCart={(productId: string) => handleCtaToBot(`Quiero el protocolo ${productId}`)}
          productsData={typedProductsData}
        />
      );
    }

    if (currentView === 'protocol') {
      return (
        <LongevityProtocolScreen 
          onBack={() => setCurrentView('chronos')}
          onAddToCart={(productId: string) => handleCtaToBot(`Quiero añadir ${productId} al carrito`)}
          productsData={typedProductsData}
        />
      );
    }

    if (currentView === 'infinity') {
      return (
        <RetinalProductPage 
          onAddToCart={(productId: string, quantity: number) => handleCtaToBot(`Quiero añadir ${quantity} ${productId} al carrito`)}
          onNavigateToProtocol={() => handleNavigate('protocol')} 
          onNavigateToProtocols={() => handleNavigate('protocols')}
          productsData={typedProductsData}
        />
      );
    }

    if (currentView === 'hydrolock') {
      return (
        <HydroLockProductScreen 
          onAddToCart={(productId: string, quantity: number) => handleCtaToBot(`Quiero añadir ${quantity} ${productId} al carrito`)}
          onNavigateToProtocols={() => handleNavigate('protocols')}
          productsData={typedProductsData}
        />
      );
    }

    if (currentView === 'shield') {
      return (
        <InvisibleShieldProductScreen 
          onAddToCart={(productId: string, quantity: number) => handleCtaToBot(`Quiero añadir ${quantity} ${productId} al carrito`)}
          onNavigateToProtocols={() => handleNavigate('protocols')}
          productsData={typedProductsData}
        />
      );
    }

    return (
      <ChronosProductScreen 
        onAddToCart={(productId: string, quantity: number) => handleCtaToBot(`Quiero añadir ${quantity} ${productId} al carrito`)}
        onNavigateToProtocol={() => handleNavigate('protocol')}
        productsData={typedProductsData}
      />
    );
  };

  const getNavbarView = () => {
     if (currentView === 'infinity') return 'infinity';
     if (currentView === 'hydrolock') return 'hydrolock';
     if (currentView === 'shield') return 'shield';
     return 'chronos';
  };

  const currentCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen flex flex-col font-sans ${currentView === 'protocol' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {currentView !== 'protocol' && (
        <Navbar 
          cartCount={currentCartCount}
          currentView={getNavbarView()}
          onNavigate={(view) => handleNavigate(view)}
        />
      )}
      
      <main className="flex-grow">
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-500">Cargando...</p></div>}>
          {renderContent()}
        </Suspense>
      </main>

      {currentView !== 'protocol' && <Footer />}

      <WhatsAppButton />
      <ChatbotButton onClick={() => setChatbotOpen(true)} />
      <Chatbot 
        isOpen={isChatbotOpen}
        onClose={() => setChatbotOpen(false)}
        initialMessage={initialBotMessage}
        onAddToCart={handleAddToCart}
        getCartSummary={getCartSummary}
        productsData={typedProductsData}
      />
    </div>
  );
}

export default App;

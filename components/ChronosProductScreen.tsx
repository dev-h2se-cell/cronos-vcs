import React, { useState, useEffect } from 'react';
import { Hero } from './Hero';
import { Comparison } from './Comparison';
import { SocialProof } from './SocialProof';
import { Science } from './Science';
import { Usage } from './Usage';
import { Offer } from './Offer';
import { ShopTheRoutine } from './ShopTheRoutine';
import { Guarantee } from './Guarantee';
import { FAQ } from './FAQ';
import { Button } from './Button';
import { ProductData } from '../types'; // Import ProductData
import { formatPrice } from '../utils/formatPrice'; // Import formatPrice

interface Props {
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigateToProtocol: () => void;
  productsData: ProductData;
}

const ChronosProductScreen: React.FC<Props> = ({ onAddToCart, onNavigateToProtocol, productsData }) => {
  const chronosProduct = productsData.products.find(p => p.id === 'chronos-c-shield');

  const [activeTab, setActiveTab] = useState<'overview' | 'science' | 'routine' | 'offers'>('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections: ('overview' | 'science' | 'routine' | 'offers')[] = ['overview', 'science', 'routine', 'offers'];
      // Offset calculated based on header height (~120px)
      const scrollPosition = window.scrollY + 150; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          // Check if we are at the bottom of the page to activate the last tab
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && section === 'offers') {
             setActiveTab('offers');
          } else {
             setActiveTab(section); 
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!chronosProduct) {
    // Handle case where product data is not found
    return <div>Error: Chronos-C Shield product data not found.</div>;
  }
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120, // Adjust for sticky header height
        behavior: 'smooth'
      });
      setActiveTab(id as typeof activeTab);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans animate-fade-in pb-24 relative">
      <Hero 
        productsData={productsData}
      />
      
      {/* Sticky Tab System - Unified Structure */}
      <div className="sticky top-[60px] md:top-[72px] z-40 bg-white/90 backdrop-blur-md border-y border-slate-200 shadow-sm transition-all duration-300">
         <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto no-scrollbar gap-8 md:gap-12 text-sm font-bold tracking-widest uppercase justify-start md:justify-center">
            {['overview', 'science', 'routine', 'offers'].map((tab) => (
               <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
               >
                  {tab === 'overview' ? 'Resumen' : tab === 'science' ? 'Ciencia' : tab === 'routine' ? 'Rutina' : 'Ofertas'}
               </button>
            ))}
         </div>
      </div>

      <div className="space-y-0">
        <div id="overview" className="scroll-mt-40">
           <Comparison />
           <SocialProof />
        </div>
        
        {/* Wrapper ID handles navigation. The internal Science component ID is ignored for nav purposes but kept for structure. */}
        <div id="science" className="scroll-mt-40">
           <Science />
        </div>

        <div id="routine" className="scroll-mt-40">
           <Usage />
        </div>

        <div id="offers" className="scroll-mt-40">
           <Offer onAddToCart={onAddToCart} onNavigateToProtocol={onNavigateToProtocol} productsData={productsData} />
           <ShopTheRoutine onAddToCart={onAddToCart} productsData={productsData} />
        </div>
      </div>

      <Guarantee />
      <FAQ />

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden z-50 flex items-center justify-between safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
         <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">{chronosProduct.name}</div>
            <div className="text-xl font-bold text-slate-900">{formatPrice(chronosProduct.price)}</div>
         </div>
         <Button onClick={() => onAddToCart(chronosProduct.id, 1)} className="py-3 px-8 bg-slate-900 text-white border-0 shadow-lg">
            AÑADIR
         </Button>
      </div>
    </div>
  );
};

export default ChronosProductScreen;
import React from 'react';
import { Button } from './Button';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

import { ProductData } from '../types'; // Import ProductData
import { formatPrice } from '../utils/formatPrice'; // Import formatPrice

interface HeroProps {
  productsData: ProductData; // Removed image paths from props, will get from productsData directly
}

export const Hero: React.FC<HeroProps> = ({ productsData }) => {
  const chronosProduct = productsData.products.find(p => p.id === 'chronos-c-shield');
  const protocoloNoche = productsData.protocols.find(p => p.id === 'protocolo-noche');

  if (!chronosProduct || !protocoloNoche || !chronosProduct.image || !chronosProduct.image400w || !chronosProduct.image800w) {
    return <div>Error: Chronos Product data or images for Hero not found.</div>;
  }

  // Use product data directly
  const _productImage = chronosProduct.image;
  const _productImage400 = chronosProduct.image400w;
  const _productImage800 = chronosProduct.image800w;

  const scrollToOffer = () => {
    const element = document.getElementById('offer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Content - Left */}
        <div className="order-2 md:order-1 flex flex-col items-start gap-6 z-10">
          <div className="inline-flex items-center gap-2 bg-slate-200 px-3 py-1 rounded-full text-slate-700 text-[10px] font-bold tracking-widest uppercase">
            <ShieldCheck size={12} className="text-orange-500" />
            Tecnología THD Ascorbate | 0% Oxidación
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            La Primera Vitamina C que Mantiene su Potencia de la <span className="text-orange-500">Noche 1</span> a la <span className="text-orange-500">Noche 90</span>.
          </h1>
          
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-lg">
            Potencia clínica sin el olor a metal ni la irritación. Bio-ingeniería estable para una piel luminosa y firme.
          </p>
          
          <div className="w-full md:w-auto flex flex-col gap-3">
            <Button onClick={scrollToOffer} fullWidth className="md:w-auto text-base">
              COMPRAR {protocoloNoche.name.toUpperCase()} - {formatPrice(protocoloNoche.price)} <ArrowRight size={16} />
            </Button>
            <p className="text-xs text-slate-400 text-center md:text-left flex items-center justify-center md:justify-start gap-1">
              <Zap size={12} className="fill-current" /> Envío Gratis en Colombia
            </p>
          </div>
        </div>

        {/* Visual - Right */}
        <div className="order-1 md:order-2 relative flex justify-center items-center">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-transparent rounded-full opacity-30 blur-3xl transform translate-x-10 translate-y-10"></div>
          
          {/* Product Image Container */}
          <div className="relative z-10 w-full max-w-sm mx-auto group cursor-pointer">
             <div className="aspect-[4/5] bg-gradient-to-b from-white to-slate-100 rounded-[3rem] shadow-2xl border border-slate-100 flex items-center justify-center overflow-hidden p-8 relative">
                {/* Tech overlay lines */}
                <div className="absolute top-8 right-8 w-16 h-[1px] bg-slate-300"></div>
                <div className="absolute top-8 right-8 h-16 w-[1px] bg-slate-300"></div>
                
                {/* Image - Primary Source: Local Public File */}
                <img 
                  src={_productImage}
                  srcSet={`${_productImage400} 400w, ${_productImage800} 800w, ${_productImage} 1000w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt="CHRONOS-C Shield Bottle"
                  width={800}
                  height={1000}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Floating "Drop" element */}
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-500 rounded-full opacity-80 blur-xl animate-pulse"></div>
                <div className="absolute bottom-12 right-12 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-20">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
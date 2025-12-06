import React from 'react';
import { Droplets } from 'lucide-react';
import { ProductData } from '../../types'; // Import ProductData

interface Props {
  productsData: ProductData;
}

export const HydroLockHero: React.FC<Props> = ({ productsData }) => {
  const hydroLockProduct = productsData.products.find(p => p.id === 'hydro-lock-serum');

  if (!hydroLockProduct || !hydroLockProduct.image || !hydroLockProduct.image400w || !hydroLockProduct.image800w) {
    return <div>Error: Hydro-Lock Product data or images not found.</div>;
  }

  const _productImage = hydroLockProduct.image;
  const _productImage400 = hydroLockProduct.image400w;
  const _productImage800 = hydroLockProduct.image800w;
  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      {/* Aqua Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 to-white pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-200 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Text Content */}
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2 bg-cyan-100/80 border border-cyan-200 px-3 py-1 rounded-full text-cyan-800 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Droplets size={12} className="text-cyan-600 fill-current" />
            Zero-Pill™ Complex | Cero Pegajosidad
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            El Arquitecto de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">tu Rutina.</span>
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed">
            Hidratación profunda que no se pelea con tu maquillaje. La base perfecta y ligera que tu piel necesita para funcionar.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
               <div className="w-2 h-2 rounded-full bg-cyan-500"></div> Piel de Vidrio
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
               <div className="w-2 h-2 rounded-full bg-teal-500"></div> Absorción 5s
            </div>
          </div>
        </div>

        {/* Visual - Dropper Bottle */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-72 h-96 group cursor-pointer overflow-hidden rounded-[3rem]">
            {/* Water Ripple Effect Back */}
            <div className="absolute inset-0 bg-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            
            <img 
              src={_productImage}
              srcSet={`${_productImage400} 400w, ${_productImage800} 800w, ${_productImage} 1000w`}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={hydroLockProduct.name}
              className="relative z-10 w-full h-full object-cover rounded-[3rem] shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
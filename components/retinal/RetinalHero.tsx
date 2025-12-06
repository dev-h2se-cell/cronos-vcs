import React from 'react';
import { Moon } from 'lucide-react';
import { ProductData } from '../../types'; // Import ProductData

interface Props {
  productsData: ProductData;
}

export const RetinalHero: React.FC<Props> = ({ productsData }) => {
  const retinalProduct = productsData.products.find(p => p.id === 'infinity-retinal');

  if (!retinalProduct || !retinalProduct.image || !retinalProduct.image400w || !retinalProduct.image800w) {
    return <div>Error: Retinal Product data or images for Hero not found.</div>;
  }

  const _productImage = retinalProduct.image;
  const _productImage400 = retinalProduct.image400w;
  const _productImage800 = retinalProduct.image800w;
  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-slate-950 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center relative z-10">
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 px-3 py-1 rounded-full text-purple-200 text-[10px] font-bold tracking-widest uppercase mb-6">
            <Moon size={12} className="text-purple-400 fill-current" />
            0.1% Retinal Encapsulado | Cero Irritación
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Renovación Celular Profunda. <span className="text-purple-500">Sin el Drama.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-lg">
            11x más rápido que el retinol tradicional. Despierta con piel nueva, no roja. La potencia clínica que tu piel necesita mientras duermes.
          </p>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-64 h-96 bg-gradient-to-tr from-purple-900/40 to-slate-800 rounded-3xl border border-white/5 relative flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden">
            <img 
              src={_productImage}
              srcSet={`${_productImage400} 400w, ${_productImage800} 800w, ${_productImage} 1000w`}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={retinalProduct.name}
              className="relative z-10 w-full h-full object-cover z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
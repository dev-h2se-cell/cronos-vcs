import React from 'react';
import { Sun } from 'lucide-react';
import { ProductData } from '../../types'; // Import ProductData

interface Props {
  productsData: ProductData;
}

export const InvisibleShieldHero: React.FC<Props> = ({ productsData }) => {
  const invisibleShieldProduct = productsData.products.find(p => p.id === 'invisible-shield-spf');

  if (!invisibleShieldProduct || !invisibleShieldProduct.image || !invisibleShieldProduct.image400w || !invisibleShieldProduct.image800w) {
    return <div>Error: Invisible Shield Product data or images not found.</div>;
  }

  const _productImage = invisibleShieldProduct.image;
  const _productImage400 = invisibleShieldProduct.image400w;
  const _productImage800 = invisibleShieldProduct.image800w;
  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      {/* Solar Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-100/40 to-white pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Text Content */}
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full text-amber-800 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Sun size={12} className="text-amber-600 fill-current" />
            0% Residuo Blanco | Primer Híbrido
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            El Techo de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">tu Rutina.</span>
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed">
            Protección solar +50, Hidratación de Ceramidas y Primer de Maquillaje. Todo en uno. El escudo que tu piel (y tu base) amarán.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
               <div className="w-2 h-2 rounded-full bg-yellow-400"></div> SPF 50+ PA++++
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
               <div className="w-2 h-2 rounded-full bg-amber-500"></div> Glow Finish
            </div>
          </div>
        </div>

        {/* Visual - Tube Render */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-64 h-96 group cursor-pointer perspective-1000 overflow-hidden rounded-[2rem]">
            <div className="absolute -top-10 -right-10 w-full h-full bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src={_productImage}
              srcSet={`${_productImage400} 400w, ${_productImage800} 800w, ${_productImage} 1000w`}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={invisibleShieldProduct.name}
              className="relative z-10 w-full h-full object-cover rounded-[2rem] shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
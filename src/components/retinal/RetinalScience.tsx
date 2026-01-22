import React from 'react';
import { BarChart, ChevronRight } from 'lucide-react';
import { ProductData } from '../../types'; // Import ProductData

interface Props {
  productsData: ProductData;
}

export const RetinalScience: React.FC<Props> = ({ productsData }) => {
  const retinalProduct = productsData.products.find(p => p.id === 'infinity-retinal');

  if (!retinalProduct) {
    return <div>Error: Retinal product data not found.</div>;
  }

  return (
    <section id="science" className="scroll-mt-40">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <BarChart className="text-purple-500" /> Retinol vs. Retinal
      </h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="bg-slate-900/50 p-6 rounded-xl border-l-2 border-slate-700">
            <h4 className="text-slate-400 text-xs uppercase tracking-widest mb-1">Retinol Tradicional</h4>
            <p className="font-mono text-sm text-slate-500">Retinol → Retinal → Ácido Retinoico</p>
            <p className="text-xs text-red-400 mt-2">2 Pasos de conversión (Lento e inestable)</p>
          </div>
          <div className="bg-purple-900/20 p-6 rounded-xl border-l-2 border-purple-500 relative overflow-hidden">
            <div className="absolute right-0 top-0 p-2 bg-purple-500 text-[8px] font-bold text-white uppercase rounded-bl-lg">
              Infinity Tech
            </div>
            <h4 className="text-purple-300 text-xs uppercase tracking-widest mb-1">{retinalProduct.name}</h4>
            <p className="font-mono text-lg text-white font-bold">Retinal → Ácido Retinoico</p>
            <p className="text-xs text-purple-400 mt-2">1 Paso directo (11x más rápido)</p>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 text-center">
          <h3 className="text-lg font-bold text-white mb-4">La Muerte del &quot;Sándwich&quot;</h3>
          <div className="flex justify-center items-center gap-8 mb-4 opacity-50 grayscale">
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 rounded-full mx-auto mb-2"></div>
              <span className="text-[10px]">Crema</span>
            </div>
            <ChevronRight size={12} />
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 rounded-full mx-auto mb-2 border border-white"></div>
              <span className="text-[10px]">Retinol</span>
            </div>
            <ChevronRight size={12} />
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 rounded-full mx-auto mb-2"></div>
              <span className="text-[10px]">Crema</span>
            </div>
          </div>
          <div className="relative inline-block">
            <div className="text-red-500 text-4xl font-bold absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 rotate-12">
              NO
            </div>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              ¿Haces &quot;Sándwich&quot; para evitar irritación? Estás diluyendo el efecto. Nuestra base rica en lípidos ya protege tu piel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
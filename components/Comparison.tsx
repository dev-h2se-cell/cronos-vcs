import React from 'react';
import { X, Check, AlertTriangle } from 'lucide-react';

export const Comparison: React.FC = () => {
  return (
    <section id="comparison" className="py-20 bg-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-2 block">El Problema Oculto</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">La Crisis de la Oxidación</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            La mayoría de los sueros de Vitamina C mueren antes de tocar tu piel. Si tu suero es cafe o huele a metal, ya es tarde.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* The Old Way */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-200 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-red-400"></div>
             <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-red-400" size={24} />
                <h3 className="text-xl font-bold text-slate-800">Vitamina C Tradicional</h3>
             </div>
             
             <div className="mb-6 flex justify-center">
                <div className="w-24 h-48 bg-amber-600/20 rounded-full flex items-end justify-center relative border border-amber-600/30">
                     <div className="w-full h-3/4 bg-amber-700/60 rounded-b-full blur-sm"></div>
                     <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-amber-800 text-xs">OXIDADO</span>
                </div>
             </div>

             <ul className="space-y-4">
                <li className="flex items-start gap-3">
                    <X className="text-red-500 shrink-0" size={20} />
                    <span className="text-slate-600 text-sm">Se oxida en 30 días (pierde 40% de potencia).</span>
                </li>
                <li className="flex items-start gap-3">
                    <X className="text-red-500 shrink-0" size={20} />
                    <span className="text-slate-600 text-sm">Olor desagradable (metal o comida rancia).</span>
                </li>
                <li className="flex items-start gap-3">
                    <X className="text-red-500 shrink-0" size={20} />
                    <span className="text-slate-600 text-sm">pH ácido que irrita la barrera cutánea.</span>
                </li>
             </ul>
          </div>

          {/* The Chronos Way */}
          <div className="bg-slate-900 text-white rounded-xl shadow-xl p-8 border border-slate-700 relative overflow-hidden transform md:-translate-y-4">
             <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
             <div className="absolute top-4 right-4 bg-orange-500 text-xs font-bold px-2 py-1 rounded text-white">NUEVO ESTÁNDAR</div>
             
             <div className="flex items-center gap-3 mb-6">
                <Check className="text-orange-500" size={24} />
                <h3 className="text-xl font-bold text-white">Chronos-C (Blindada)</h3>
             </div>

             <div className="mb-6 flex justify-center">
                <div className="w-24 h-48 bg-slate-800 rounded-lg flex items-center justify-center relative border border-slate-600 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                     <div className="w-full h-full bg-gradient-to-b from-slate-700 to-slate-800 opacity-50 absolute"></div>
                     {/* Airless Pump representation */}
                     <div className="w-20 h-40 bg-white/5 backdrop-blur-md rounded border border-white/10 z-10"></div>
                     <span className="absolute z-20 text-xs font-mono tracking-widest text-orange-400">AIRLESS</span>
                </div>
             </div>

             <ul className="space-y-4">
                <li className="flex items-start gap-3">
                    <Check className="text-orange-500 shrink-0" size={20} />
                    <span className="text-slate-300 text-sm">100% Estable hasta la última gota (90+ días).</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="text-orange-500 shrink-0" size={20} />
                    <span className="text-slate-300 text-sm">Con el olor correcto. Textura de seda.</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="text-orange-500 shrink-0" size={20} />
                    <span className="text-slate-300 text-sm">Cero irritación. Ideal para piel sensible.</span>
                </li>
             </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
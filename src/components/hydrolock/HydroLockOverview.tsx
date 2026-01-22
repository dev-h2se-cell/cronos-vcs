import React from 'react';
import { Sparkles, X, Check, Droplets, Zap, ShieldCheck } from 'lucide-react';

export const HydroLockOverview: React.FC = () => {
  return (
    <section id="overview" className="scroll-mt-40">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900">
        <Sparkles className="text-cyan-500" /> Adiós a las &apos;bolitas&apos;. Hola Piel de Vidrio.
      </h2>
      
      {/* Friction Killer Visual */}
      <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-slate-200 shadow-lg mb-12">
        <div className="bg-slate-100 p-8 flex flex-col items-center justify-center text-center relative border-r border-slate-200">
          <div className="absolute top-4 left-4 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded uppercase">Otros Serums</div>
          <div className="w-24 h-24 bg-amber-100 rounded-full mb-4 flex items-center justify-center border-4 border-white shadow-inner opacity-80">
            <div className="w-16 h-16 bg-amber-200/50 rounded-full animate-pulse blur-sm"></div>
          </div>
          <h3 className="font-bold text-slate-700">Pegajoso & Pilling</h3>
          <p className="text-xs text-slate-500 mt-2">Se hacen rollitos al aplicar maquillaje.</p>
          <X className="text-red-400 absolute bottom-4 right-4" />
        </div>
        <div className="bg-cyan-50 p-8 flex flex-col items-center justify-center text-center relative">
          <div className="absolute top-4 right-4 bg-cyan-100 text-cyan-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Hydro-Lock</div>
          <div className="w-24 h-24 bg-white rounded-full mb-4 flex items-center justify-center border-4 border-cyan-100 shadow-lg">
            <Droplets className="text-cyan-500" size={32} />
          </div>
          <h3 className="font-bold text-slate-900">Zero-Pill™ Complex</h3>
          <p className="text-xs text-slate-500 mt-2">Absorción total. Base perfecta.</p>
          <Check className="text-cyan-500 absolute bottom-4 right-4" />
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Zap className="text-blue-500" size={20} />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Efecto Plumping</h4>
          <p className="text-sm text-slate-500">Relleno instantáneo de líneas finas por deshidratación.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="text-purple-500" size={20} />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Makeup-Safe</h4>
          <p className="text-sm text-slate-500">El mejor primer hidratante para que tu base no se cuartee.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="text-green-500" size={20} />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Bio-Compatible</h4>
          <p className="text-sm text-slate-500">No comedogénico. No obstruye los poros. 100% Oil-free.</p>
        </div>
      </div>
    </section>
  );
};
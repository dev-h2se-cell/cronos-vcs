import React from 'react';
import { Eye, Shield, Zap } from 'lucide-react';

export const InvisibleShieldOverview: React.FC = () => {
  return (
    <section id="overview" className="scroll-mt-40">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900">
        <Eye className="text-amber-500" /> No es solar. Es un escudo invisible.
      </h2>
      
      {/* Video Placeholder */}
      <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-amber-100 mb-12 group">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
            </div>
            <p className="font-bold tracking-wider uppercase text-sm">Ver Prueba en Piel Oscura</p>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 text-white text-left">
          <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded uppercase mb-1 inline-block">Resultado Real</span>
          <p className="text-sm opacity-90">Desaparece en 3 segundos. Sin rastro gris.</p>
        </div>
      </div>

      {/* Benefits Icons */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-xl">👻</span>
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Ghost-Free</h4>
          <p className="text-sm text-slate-500">Invisible en todos los tonos de piel. Desde fototipo I hasta VI.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="text-amber-500" size={20} />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">SPF 50+</h4>
          <p className="text-sm text-slate-500">Defensa de amplio espectro UVA/UVB + Luz Azul (HEV).</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Zap className="text-blue-500" size={20} />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Ceramidas</h4>
          <p className="text-sm text-slate-500">Refuerza la barrera cutánea mientras protege.</p>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Hand, Clock, RotateCw } from 'lucide-react';

export const InvisibleShieldRoutine: React.FC = () => {
  return (
    <section id="routine" className="scroll-mt-40">
      <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">Tips de Uso: Master Class</h2>
      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
            <Hand size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">La Regla de los 2 Dedos</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Para asegurar el SPF 50+, extiende dos líneas de producto en tus dedos índice y corazón. Esa es la dosis exacta para rostro y cuello.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
            <Clock size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">El &quot;Set&quot; de 60 Segundos</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Aunque funciona como primer, deja que se asiente un minuto completo. Esto crea la película protectora perfecta antes de aplicar tu base.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
            <RotateCw size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Reaplicación Inteligente</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Si estás al aire libre, reaplica cada 2 horas. Si estás en oficina, una reaplicación a mediodía (sobre el maquillaje a toques) es suficiente.
          </p>
        </div>

      </div>
    </section>
  );
};
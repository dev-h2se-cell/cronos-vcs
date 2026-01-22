import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Guarantee: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-center px-6">
      <div className="max-w-3xl mx-auto border border-slate-700 bg-slate-800/50 p-10 rounded-2xl backdrop-blur-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700 rounded-full mb-6 text-orange-500">
          <ShieldCheck size={32} />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Garantía de Botella Vacía</h2>
        <p className="text-slate-300 leading-relaxed mb-0">
          Úsalo hasta la última gota. Si no ves tu piel más radiante o si el producto cambia de color (se oxida) en los primeros 60 días, te devolvemos el <span className="text-white font-bold">100% de tu dinero</span>. Sin preguntas. Sin letra pequeña.
        </p>
      </div>
    </section>
  );
};
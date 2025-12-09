import React from 'react';
import { Layers } from 'lucide-react';

export const HydroLockScience: React.FC = () => {
  return (
    <section id="science" className="scroll-mt-40">
      <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
        {/* Background Tech Mesh */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Matriz 5D</h2>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              No todos los ácidos hialurónicos son iguales. Nuestra matriz combina 5 pesos moleculares distintos.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 text-right text-xs font-mono text-cyan-400">LMW</div>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-cyan-500"></div>
                </div>
                <div className="text-xs text-slate-400 w-32">Penetración Profunda</div>
              </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-right text-xs font-mono text-teal-400">MMW</div>
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-teal-500"></div>
                  </div>
                  <div className="text-xs text-slate-400 w-32">Hidratación Media</div>
               </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-right text-xs font-mono text-blue-400">HMW</div>
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                     <div className="w-1/2 h-full bg-blue-500"></div>
                  </div>
                  <div className="text-xs text-slate-400 w-32">Escudo Superficial</div>
               </div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
            <Layers className="text-cyan-400 mb-4" size={32} />
            <h3 className="font-bold text-white text-xl mb-2">Absorción en 5 Segundos</h3>
            <p className="text-slate-400 text-sm">
              Al usar múltiples tamaños, las moléculas se &quot;entretejen&quot; perfectamente sin crear una película pegajosa en la superficie. No deja residuos poliméricos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
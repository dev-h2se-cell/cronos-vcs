import React from 'react';
import { Layers, ArrowDown } from 'lucide-react';

export const Science: React.FC = () => {
  return (
    <section id="science" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Graphic */}
        <div className="relative">
             <div className="aspect-square rounded-2xl bg-slate-800 border border-slate-700 relative overflow-hidden flex flex-col justify-between p-8">
                {/* Skin Layers Graphic (CSS Art) */}
                <div className="absolute inset-0 flex flex-col opacity-30">
                    <div className="flex-1 bg-slate-700 border-b border-slate-600"></div>
                    <div className="flex-1 bg-slate-700/80 border-b border-slate-600"></div>
                    <div className="flex-1 bg-slate-700/60 border-b border-slate-600"></div>
                    <div className="flex-1 bg-slate-700/40"></div>
                </div>

                {/* Penetration Visualization */}
                <div className="relative z-10 h-full flex justify-around">
                    {/* Competitor */}
                    <div className="flex flex-col items-center">
                        <div className="w-2 h-24 bg-red-500/50 rounded-full mb-2 blur-sm"></div>
                        <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 bg-red-500/10">
                            <ArrowDown className="transform rotate-180" size={20} />
                        </div>
                        <p className="mt-4 text-xs font-mono text-red-300 text-center">REBOTA EN<br/>SUPERFICIE</p>
                    </div>

                    {/* Chronos */}
                    <div className="flex flex-col items-center">
                         <div className="w-1 h-full bg-gradient-to-b from-orange-400 to-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                         <div className="mt-auto w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(249,115,22,0.6)] animate-bounce">
                            <ArrowDown size={20} />
                         </div>
                         <p className="mt-4 text-xs font-mono text-orange-300 text-center">PENETRACIÓN<br/>PROFUNDA</p>
                    </div>
                </div>
             </div>
        </div>

        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 text-orange-400 font-bold tracking-widest text-xs uppercase mb-4">
             <Layers size={14} /> Bio-Ingeniería
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Micro-dosificación Dérmica</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            El &quot;20%&quot; de Vitamina C no sirve de nada si se queda en la superficie e &quot;irrita&quot;. 
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Nuestra fórmula liposoluble (THD) es compatible con la grasa natural de tu piel, permitiendo que la molécula activa &quot;engañe&quot; a la barrera cutánea y penetre <span className="text-white font-bold">3x más profundo</span> donde realmente ocurre la producción de colágeno.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="border-l-2 border-orange-500 pl-4">
                <h4 className="text-2xl font-bold text-white">50x</h4>
                <p className="text-sm text-slate-400">Más potente que el Ácido L-Ascórbico tradicional.</p>
            </div>
             <div className="border-l-2 border-slate-600 pl-4">
                <h4 className="text-2xl font-bold text-white">100%</h4>
                <p className="text-sm text-slate-400">Liposoluble y Bio-disponible.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
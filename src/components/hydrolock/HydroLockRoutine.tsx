import React from 'react';
import { Droplets, ArrowRight } from 'lucide-react';

export const HydroLockRoutine: React.FC = () => {
  return (
    <section id="routine" className="scroll-mt-40">
      <h2 className="text-2xl font-bold mb-8 text-slate-900 text-center">El Secreto del Dermatólogo</h2>
      
      <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-cyan-200 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-white p-4 rounded-full shadow-md mb-6 animate-bounce">
            <Droplets className="text-cyan-500 fill-cyan-100" size={40} />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Aplica SIEMPRE sobre piel <span className="text-cyan-600 italic">HÚMEDA</span>
          </h3>
          
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            El Ácido Hialurónico actúa como una esponja. Si lo aplicas en seco, absorberá el agua de tu propia piel. Dale agua para beber y verás la diferencia.
          </p>

          {/* Routine Timeline */}
          <div className="flex justify-center items-center gap-2 md:gap-4 text-xs md:text-sm font-bold text-slate-500">
            <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100 opacity-50">Limpiador</div>
            <ArrowRight size={16} />
            <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100 opacity-75">Vitamina C</div>
            <ArrowRight size={16} />
            <div className="bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-md transform scale-110">HYDRO-LOCK™</div>
            <ArrowRight size={16} />
            <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100 opacity-50">Crema / SPF</div>
          </div>
        </div>
      </div>
    </section>
  );
};

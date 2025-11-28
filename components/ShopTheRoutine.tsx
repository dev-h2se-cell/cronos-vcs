import React from 'react';
import { Plus, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { Button } from './Button';

interface Props {
  onAddToCart: () => void;
}

export const ShopTheRoutine: React.FC<Props> = ({ onAddToCart }) => {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
            <span className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-3 block">Sinergia Clínica</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Compra la Rutina Completa</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              La Vitamina C es solo el primer paso. Potencia sus efectos antioxidantes combinándola con hidratación profunda y el escudo solar invisible definitivo.
            </p>
        </div>

        {/* Visual Flow */}
        <div className="relative max-w-5xl mx-auto mb-16">
             {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-orange-200 via-cyan-200 to-amber-200 -translate-y-1/2 -z-10"></div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:-translate-y-2 transition-transform duration-300 relative group">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase z-10">Paso 1</div>
                    <div className="aspect-square bg-gradient-to-b from-orange-50 to-white rounded-xl mb-6 flex items-center justify-center border border-orange-100 group-hover:shadow-orange-100/50 shadow-inner">
                         {/* Placeholder Graphic */}
                         <div className="w-16 h-32 bg-orange-200 rounded-lg opacity-80 backdrop-blur-sm border border-white/50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent"></div>
                         </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-slate-900 text-lg mb-1">Chronos-C Shield</h4>
                        <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-3">Antioxidante</p>
                        <p className="text-slate-500 text-sm">Neutraliza radicales libres y da luminosidad.</p>
                    </div>
                </div>

                 {/* Step 2 */}
                 <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:-translate-y-2 transition-transform duration-300 relative group">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase z-10">Paso 2</div>
                    <div className="hidden md:flex absolute top-1/2 -left-4 w-8 h-8 bg-white rounded-full border border-slate-200 items-center justify-center text-slate-400 z-10 transform -translate-y-1/2 shadow-sm">
                        <Plus size={14} />
                    </div>

                    <div className="aspect-square bg-gradient-to-b from-cyan-50 to-white rounded-xl mb-6 flex items-center justify-center border border-cyan-100 group-hover:shadow-cyan-100/50 shadow-inner">
                         <div className="w-16 h-32 bg-cyan-200 rounded-full opacity-80 backdrop-blur-sm border border-white/50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent"></div>
                         </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-slate-900 text-lg mb-1">Hydro-Lock Serum</h4>
                        <p className="text-cyan-600 text-xs font-bold uppercase tracking-wider mb-3">Hidratación</p>
                        <p className="text-slate-500 text-sm">Rellena líneas finas y prepara la piel.</p>
                    </div>
                </div>

                 {/* Step 3 */}
                 <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:-translate-y-2 transition-transform duration-300 relative group">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase z-10">Paso 3</div>
                    <div className="hidden md:flex absolute top-1/2 -left-4 w-8 h-8 bg-white rounded-full border border-slate-200 items-center justify-center text-slate-400 z-10 transform -translate-y-1/2 shadow-sm">
                        <Plus size={14} />
                    </div>

                    <div className="aspect-square bg-gradient-to-b from-amber-50 to-white rounded-xl mb-6 flex items-center justify-center border border-amber-100 group-hover:shadow-amber-100/50 shadow-inner">
                         <div className="w-16 h-32 bg-amber-200 rounded-b-lg opacity-80 backdrop-blur-sm border border-white/50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent"></div>
                         </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-slate-900 text-lg mb-1">Invisible Shield</h4>
                        <p className="text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">Protección SPF 50+</p>
                        <p className="text-slate-500 text-sm">Sella la hidratación y bloquea UV.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Offer Box */}
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-orange-400 font-bold uppercase text-xs tracking-widest mb-2">
                        <Sparkles size={14} /> Oferta Especial
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Kit "Glow de Mañana"</h3>
                    <p className="text-slate-400 text-sm mb-4 md:mb-0">Llévate la rutina completa de 3 pasos y transforma tu piel.</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                         <span className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded border border-slate-700 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Chronos-C</span>
                         <span className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded border border-slate-700 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div> Hydro-Lock</span>
                         <span className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded border border-slate-700 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div> Invisible Shield</span>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 w-full md:w-auto min-w-[300px] text-center hover:bg-white/15 transition-colors">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="text-slate-500 line-through text-lg font-mono">$135.00</div>
                        <div className="text-4xl font-bold text-white tracking-tight">$115.00</div>
                    </div>
                    <Button onClick={onAddToCart} fullWidth className="bg-white text-slate-900 hover:bg-slate-100 border-0 py-4 font-bold shadow-lg">
                        AÑADIR RUTINA <ArrowRight size={18} className="ml-2" />
                    </Button>
                    <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-slate-400">
                       <span className="flex items-center gap-1"><Layers size={10} /> Stock Limitado</span>
                       <span>•</span>
                       <span>Envío Gratis</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
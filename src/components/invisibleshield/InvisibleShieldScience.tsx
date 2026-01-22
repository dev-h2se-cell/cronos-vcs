import React from 'react';
import { Check, Zap, Shield } from 'lucide-react';

export const InvisibleShieldScience: React.FC = () => {
  return (
    <section id="science" className="scroll-mt-40 space-y-24">
      {/* Subsection: Primer */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Tu Base Nunca Se Vio Mejor</h2>
        
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col md:flex-row">
          {/* The Enemy */}
          <div className="md:w-1/2 p-8 bg-slate-50 border-r border-slate-100">
            <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs tracking-widest mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div> SPF Tradicional
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 opacity-60">
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">1</div>
                <p className="text-sm">Crea &quot;pilling&quot; (&quot;rollitos&quot;) al aplicar base.</p>
              </div>
              <div className="mt-8 h-32 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs italic">
                [Foto: Base Cuarteada]
              </div>
            </div>
          </div>

          {/* The Hero */}
          <div className="md:w-1/2 p-8 bg-amber-50/50">
            <div className="flex items-center gap-2 text-amber-600 font-bold uppercase text-xs tracking-widest mb-6">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div> Invisible Shield
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="text-amber-500 shrink-0" size={20} />
                <p className="text-sm font-bold text-slate-800">Efecto &quot;Grippy Primer&quot;.</p>
              </div>
              <p className="text-xs text-slate-500 pl-8">Su fórmula híbrida crea una superficie adherente que hace durar tu maquillaje 2x más.</p>
              
              <div className="flex items-start gap-3">
                <Check className="text-amber-500 shrink-0" size={20} />
                <p className="text-sm font-bold text-slate-800">Glow Satinado.</p>
              </div>
              <p className="text-xs text-slate-500 pl-8">Ni mate seco, ni grasoso. El brillo justo de piel sana.</p>

              <div className="mt-4 h-32 bg-gradient-to-br from-amber-100 to-white rounded-lg flex items-center justify-center text-amber-600/50 text-xs italic border border-amber-100">
                [Foto: Piel Radiante Perfecta]
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subsection: Defense */}
      <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

        <div className="md:w-1/2 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-500/30 px-3 py-1 rounded-full text-blue-200 text-[10px] font-bold tracking-widest uppercase mb-4">
            <Zap size={12} className="text-blue-400" /> Luz Azul & Polución
          </div>
          <h2 className="text-3xl font-bold mb-4">¿Usas Retinol? <br/>Esto es Obligatorio.</h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            El sol entra por la ventana. La luz de tu pantalla también envejece. Si inviertes en Retinol o Vitamina C, no proteger tu piel de día es tirar tu dinero a la basura.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-slate-300"><Shield size={14} className="text-amber-400" /> Protege la inversión de tu rutina nocturna.</li>
            <li className="flex items-center gap-2 text-sm text-slate-300"><Shield size={14} className="text-amber-400" /> Previene manchas futuras.</li>
          </ul>
        </div>

        <div className="md:w-1/2 relative">
          <div className="aspect-square bg-gradient-to-tr from-slate-800 to-slate-700 rounded-2xl border border-white/10 p-6 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-amber-500/50 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)]"></div>
              </div>
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-400/50 transform -rotate-45"></div>
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-400/50 transform rotate-45"></div>
              <div className="absolute -bottom-4 text-center w-full text-[10px] uppercase tracking-widest text-slate-400">Escudo Total</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
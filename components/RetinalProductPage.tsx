import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Moon, Sparkles, Check, ChevronRight, BarChart, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  onAddToCart: () => void;
  onNavigateToProtocol: () => void;
}

export const RetinalProductPage: React.FC<Props> = ({ onAddToCart, onNavigateToProtocol }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'science' | 'routine' | 'offers'>('overview');

  // Simple intersection observer to update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'science', 'routine', 'offers'];
      const scrollPosition = window.scrollY + 200; // Offset for sticky header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveTab(section as any);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120, // Adjust for sticky header height
        behavior: 'smooth'
      });
      setActiveTab(id as any);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans animate-fade-in pb-24">
      
      {/* 2. Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-slate-950 pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="order-2 md:order-1">
               <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 px-3 py-1 rounded-full text-purple-200 text-[10px] font-bold tracking-widest uppercase mb-6">
                  <Moon size={12} className="text-purple-400 fill-current" />
                  0.1% Retinal Encapsulado | Cero Irritación
               </div>
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Renovación Celular Profunda. <span className="text-purple-500">Sin el Drama.</span>
               </h1>
               <p className="text-slate-400 text-lg mb-8 max-w-lg">
                  11x más rápido que el retinol tradicional. Despierta con piel nueva, no roja. La potencia clínica que tu piel necesita mientras duermes.
               </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
               <div className="w-64 h-96 bg-gradient-to-tr from-purple-900/40 to-slate-800 rounded-3xl border border-white/5 relative flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden">
                  {/* Bottle Image - Local Source */}
                  <img 
                    src="/retinal-bottle.jpg" 
                    onError={(e) => e.currentTarget.style.display = 'none'} // Hide if missing to show backup CSS below
                    alt="Infinity Retinal Night Bottle"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  
                  {/* Backup CSS Bottle (Visible if img fails) */}
                  <div className="w-24 h-64 bg-slate-900 rounded-full border border-purple-900/50 relative overflow-hidden flex flex-col items-center z-10 -mb-4">
                      <div className="w-full h-12 bg-purple-900/20 border-b border-purple-900/50"></div>
                      <div className="mt-auto mb-8">
                         <div className="text-[10px] text-purple-400 tracking-[0.2em] font-bold text-center">INFINITY</div>
                         <div className="text-[8px] text-slate-500 text-center uppercase mt-1">Retinal Night</div>
                      </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-600 rounded-full blur-[60px] opacity-60 z-20"></div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. Sticky Tab System */}
      <div className="sticky top-[60px] md:top-[72px] z-40 bg-slate-950/90 backdrop-blur-md border-y border-white/5">
         <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto no-scrollbar gap-8 md:gap-12 text-sm font-bold tracking-widest uppercase">
            {['overview', 'science', 'routine', 'offers'].map((tab) => (
               <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-purple-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
               >
                  {tab === 'overview' ? 'Resumen' : tab === 'science' ? 'Ciencia' : tab === 'routine' ? 'Rutina' : 'Ofertas'}
               </button>
            ))}
         </div>
      </div>

      {/* 4. Content Sections */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-24">
         
         {/* OVERVIEW */}
         <section id="overview" className="scroll-mt-40">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Sparkles className="text-purple-500" /> Resultados Sin Compromiso</h2>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-slate-900 p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors">
                  <ShieldCheck size={32} className="text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Barrera Intacta</h3>
                  <p className="text-slate-400">Olvida la descamación. Nuestro sistema de entrega encapsulado libera el activo lentamente para prevenir la "purga".</p>
               </div>
               <div className="bg-slate-900 p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors">
                  <Moon size={32} className="text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Acción Nocturna</h3>
                  <p className="text-slate-400">Aprovecha el ritmo circadiano de tu piel. Repara el daño del día mientras duermes profundamente.</p>
               </div>
            </div>
            {/* Visual Proof Carousel Placeholder */}
            <div className="mt-8 bg-slate-900 h-64 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden group cursor-pointer">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:animate-shimmer"></div>
               <p className="text-slate-500 font-mono text-sm">[Simulación: Before/After Slider - Textura Suavizada Semana 4]</p>
            </div>
         </section>

         {/* SCIENCE */}
         <section id="science" className="scroll-mt-40">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><BarChart className="text-purple-500" /> Retinol vs. Retinal</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <div className="bg-slate-900/50 p-6 rounded-xl border-l-2 border-slate-700">
                     <h4 className="text-slate-400 text-xs uppercase tracking-widest mb-1">Retinol Tradicional</h4>
                     <p className="font-mono text-sm text-slate-500">Retinol → Retinal → Ácido Retinoico</p>
                     <p className="text-xs text-red-400 mt-2">2 Pasos de conversión (Lento e inestable)</p>
                  </div>
                  <div className="bg-purple-900/20 p-6 rounded-xl border-l-2 border-purple-500 relative overflow-hidden">
                     <div className="absolute right-0 top-0 p-2 bg-purple-500 text-[8px] font-bold text-white uppercase rounded-bl-lg">Infinity Tech</div>
                     <h4 className="text-purple-300 text-xs uppercase tracking-widest mb-1">Infinity Retinal</h4>
                     <p className="font-mono text-lg text-white font-bold">Retinal → Ácido Retinoico</p>
                     <p className="text-xs text-purple-400 mt-2">1 Paso directo (11x más rápido)</p>
                  </div>
               </div>
               
               <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 text-center">
                  <h3 className="text-lg font-bold text-white mb-4">La Muerte del "Sándwich"</h3>
                  <div className="flex justify-center items-center gap-8 mb-4 opacity-50 grayscale">
                     <div className="text-center">
                        <div className="w-10 h-10 bg-white/10 rounded-full mx-auto mb-2"></div>
                        <span className="text-[10px]">Crema</span>
                     </div>
                     <ChevronRight size={12} />
                     <div className="text-center">
                        <div className="w-10 h-10 bg-white/10 rounded-full mx-auto mb-2 border border-white"></div>
                        <span className="text-[10px]">Retinol</span>
                     </div>
                     <ChevronRight size={12} />
                     <div className="text-center">
                        <div className="w-10 h-10 bg-white/10 rounded-full mx-auto mb-2"></div>
                        <span className="text-[10px]">Crema</span>
                     </div>
                  </div>
                  <div className="relative inline-block">
                     <div className="text-red-500 text-4xl font-bold absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 rotate-12">NO</div>
                     <p className="text-slate-400 text-sm max-w-xs mx-auto">
                        ¿Haces "Sándwich" para evitar irritación? Estás diluyendo el efecto. Nuestra base rica en lípidos ya protege tu piel.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* ROUTINE */}
         <section id="routine" className="scroll-mt-40">
            <h2 className="text-2xl font-bold mb-8">Skin Cycling Simplificado</h2>
            <div className="flex flex-col md:flex-row gap-4">
               {[
                  { title: 'Noches 1-2', action: 'Tratamiento', desc: 'Aplica Infinity Retinal sobre piel limpia y seca.' },
                  { title: 'Noches 3-4', action: 'Recuperación', desc: 'Solo hidratación y descanso.' },
                  { title: 'Mañanas', action: 'Protección', desc: 'Siempre usa Chronos-C y protector solar.' }
               ].map((step, i) => (
                  <div key={i} className="flex-1 bg-slate-900 p-6 rounded-xl border border-white/5">
                     <span className="block text-purple-500 font-bold text-lg mb-2">{step.title}</span>
                     <h4 className="text-white font-bold mb-2">{step.action}</h4>
                     <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
               ))}
            </div>
         </section>

         {/* OFFERS */}
         <section id="offers" className="scroll-mt-40 pb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Elige tu Protocolo</h2>
            <div className="grid gap-6 max-w-md mx-auto">
               
               {/* Tier 1 */}
               <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 flex items-center justify-between group hover:border-purple-500/50 transition-colors">
                  <div>
                     <h3 className="font-bold text-white">Solo Serum</h3>
                     <p className="text-xs text-slate-500">Infinity Retinal 30ml</p>
                  </div>
                  <div className="text-right">
                     <div className="font-bold text-white text-xl">$52.00</div>
                     <button onClick={onAddToCart} className="text-xs text-purple-400 font-bold hover:text-purple-300">AÑADIR +</button>
                  </div>
               </div>

               {/* Tier 2 */}
               <div className="bg-slate-900 p-6 rounded-2xl border border-purple-500/30 flex items-center justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-purple-900 text-[8px] px-2 py-1 text-purple-200 uppercase font-bold">Piel Seca</div>
                  <div>
                     <h3 className="font-bold text-white">Protocolo de Recuperación</h3>
                     <p className="text-xs text-slate-500">Infinity + Barrier Lock Cream</p>
                  </div>
                  <div className="text-right">
                     <div className="font-bold text-white text-xl">$95.00</div>
                     <button onClick={onAddToCart} className="text-xs text-purple-400 font-bold hover:text-purple-300">AÑADIR +</button>
                  </div>
               </div>

               {/* Tier 3 (HERO) */}
               <div className="bg-gradient-to-b from-purple-900/40 to-slate-900 p-8 rounded-2xl border-2 border-purple-500 relative transform scale-105 shadow-2xl overflow-hidden">
                  
                  {/* Corner Ribbon */}
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20 pointer-events-none">
                      <div className="absolute top-6 -right-10 w-40 bg-gradient-to-r from-purple-500 to-pink-600 text-white transform rotate-45 text-center text-[10px] font-bold py-1.5 shadow-lg tracking-widest uppercase border-b border-white/20">
                        Mejor Valor
                      </div>
                  </div>

                  <div className="text-center mb-6 mt-2 relative z-10">
                     <h3 className="text-2xl font-bold text-white mb-1">PROTOCOLO DE LONGEVIDAD</h3>
                     <div className="flex justify-center items-center gap-3">
                        <span className="text-slate-500 line-through text-sm">$135.00</span>
                        <span className="text-3xl font-bold text-white">$98.00</span>
                     </div>
                  </div>

                  <ul className="space-y-3 mb-8 relative z-10">
                     <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-purple-500" /> Chronos-C (Día)</li>
                     <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-purple-500" /> Infinity Retinal (Noche)</li>
                     <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-purple-500" /> Barrier Lock Cream (Travel)</li>
                     <li className="flex items-center gap-2 text-sm text-purple-300 font-bold"><Sparkles size={16} /> Envío Gratis + Guía PDF</li>
                  </ul>

                  <Button onClick={onNavigateToProtocol} fullWidth className="bg-purple-600 hover:bg-purple-500 border-0 relative z-10">
                     VER DETALLES <ArrowRight size={16} />
                  </Button>
               </div>

            </div>
         </section>
      </div>

      {/* 1. Global Bottom Bar (Mobile Only CTA) */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 md:hidden z-50 flex items-center justify-between safe-area-bottom">
         <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Infinity Retinal</div>
            <div className="text-xl font-bold text-white">$52.00</div>
         </div>
         <Button onClick={onAddToCart} className="py-3 px-8 bg-purple-600 border-0">
            AÑADIR
         </Button>
      </div>
    </div>
  );
};
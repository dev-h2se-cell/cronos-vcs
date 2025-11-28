import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Droplets, ShieldCheck, Zap, Layers, ChevronRight, Check, Sparkles, RefreshCcw, ArrowRight, X } from 'lucide-react';

interface Props {
  onAddToCart: () => void;
}

export const HydroLockProductScreen: React.FC<Props> = ({ onAddToCart }) => {
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
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans animate-fade-in pb-24">
      
      {/* 1. Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
         {/* Aqua Background Effects */}
         <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 to-white pointer-events-none"></div>
         <div className="absolute top-0 right-0 w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-200 via-transparent to-transparent"></div>
         
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center relative z-10">
            
            {/* Text Content */}
            <div className="order-2 md:order-1">
               <div className="inline-flex items-center gap-2 bg-cyan-100/80 border border-cyan-200 px-3 py-1 rounded-full text-cyan-800 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
                  <Droplets size={12} className="text-cyan-600 fill-current" />
                  Zero-Pill™ Complex | Cero Pegajosidad
               </div>
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                  El Arquitecto de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">tu Rutina.</span>
               </h1>
               <p className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed">
                  Hidratación profunda que no se pelea con tu maquillaje. La base perfecta y ligera que tu piel necesita para funcionar.
               </p>
               <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div> Piel de Vidrio
                 </div>
                 <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div> Absorción 5s
                 </div>
               </div>
            </div>

            {/* Visual - Dropper Bottle */}
            <div className="order-1 md:order-2 flex justify-center">
               <div className="relative w-72 h-96 group cursor-pointer overflow-hidden rounded-[3rem]">
                  {/* Water Ripple Effect Back */}
                  <div className="absolute inset-0 bg-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                  
                  {/* Bottle Image - Local Source */}
                  <img 
                    src="/hydrolock-bottle.jpg" 
                    onError={(e) => e.currentTarget.style.display = 'none'} // Hide if missing to show backup CSS below
                    alt="Hydro-Lock Serum Bottle"
                    className="relative z-10 w-full h-full object-cover rounded-[3rem] shadow-2xl"
                  />

                  {/* Backup CSS Bottle (Visible if img fails) */}
                  <div className="relative z-0 w-full h-full bg-white/20 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-2xl flex flex-col items-center justify-center overflow-hidden absolute inset-0">
                      {/* Frosted Glass Texture */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-50"></div>
                      
                      {/* Liquid Inside */}
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-cyan-50/50 rounded-b-[3rem] backdrop-blur-md"></div>
                      
                      {/* Droplets on surface */}
                      <div className="absolute top-20 right-10 w-3 h-3 bg-white/80 rounded-full shadow-sm border border-white/50"></div>
                      <div className="absolute top-24 right-8 w-1.5 h-1.5 bg-white/80 rounded-full shadow-sm"></div>

                      <div className="relative z-20 text-center">
                          <h2 className="text-2xl font-bold text-slate-800 tracking-tighter">HYDRO<br/>LOCK™</h2>
                          <div className="w-8 h-1 bg-cyan-500 mx-auto my-2 rounded-full"></div>
                          <p className="text-[10px] uppercase tracking-widest text-slate-500">Serum Hialurónico</p>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 2. Sticky Tab System */}
      <div className="sticky top-[60px] md:top-[72px] z-40 bg-white/80 backdrop-blur-md border-y border-slate-200 shadow-sm">
         <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto no-scrollbar gap-8 md:gap-12 text-sm font-bold tracking-widest uppercase justify-start md:justify-center">
            {['overview', 'science', 'routine', 'offers'].map((tab) => (
               <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
               >
                  {tab === 'overview' ? 'Resumen' : tab === 'science' ? 'Ciencia' : tab === 'routine' ? 'Rutina' : 'Ofertas'}
               </button>
            ))}
         </div>
      </div>

      {/* 3. Content Sections */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-24">
         
         {/* OVERVIEW */}
         <section id="overview" className="scroll-mt-40">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900">
                <Sparkles className="text-cyan-500" /> Adiós a las 'bolitas'. Hola Piel de Vidrio.
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

         {/* SCIENCE (Formerly Tech) */}
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
                        Al usar múltiples tamaños, las moléculas se "entretejen" perfectamente sin crear una película pegajosa en la superficie. No deja residuos poliméricos.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* ROUTINE (Formerly Usage) */}
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

         {/* OFFERS */}
         <section id="offers" className="scroll-mt-40 pb-20">
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">Elige tu Hidratación</h2>
            <div className="grid md:grid-cols-2 gap-6">
               
               {/* Card 1: Single */}
               <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-cyan-300 transition-colors shadow-sm flex flex-col justify-between">
                  <div>
                     <h3 className="font-bold text-slate-900 text-lg">Solo Serum</h3>
                     <p className="text-sm text-slate-500 mb-4">Botella de 30ml</p>
                     <div className="text-3xl font-bold text-slate-900 mb-6">$42.00</div>
                  </div>
                  <Button onClick={onAddToCart} variant="outline" fullWidth className="border-slate-300 hover:border-cyan-500 hover:text-cyan-600">
                     AÑADIR AL CARRITO
                  </Button>
               </div>

               {/* Card 2: Subscription (Driver) */}
               <div className="bg-cyan-50 p-6 rounded-2xl border border-cyan-200 shadow-md relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">
                     Mejor Valor
                  </div>
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <RefreshCcw size={16} className="text-cyan-600" />
                        <h3 className="font-bold text-slate-900 text-lg">Suscríbete & Ahorra</h3>
                     </div>
                     <p className="text-sm text-slate-600 mb-4">Envío automático cada 45 días.</p>
                     <div className="flex items-center gap-3 mb-6">
                        <span className="text-slate-400 line-through text-sm">$42.00</span>
                        <span className="text-3xl font-bold text-cyan-700">$35.00</span>
                     </div>
                     <ul className="mb-6 space-y-2">
                        <li className="flex items-center gap-2 text-xs text-slate-600"><Check size={12} className="text-cyan-500"/> Cancela cuando quieras</li>
                        <li className="flex items-center gap-2 text-xs text-slate-600"><Check size={12} className="text-cyan-500"/> Nunca te quedes sin tu base</li>
                     </ul>
                  </div>
                  <Button onClick={onAddToCart} fullWidth className="bg-cyan-600 hover:bg-cyan-700 border-0 text-white">
                     SUSCRIBIRSE AHORA
                  </Button>
               </div>

               {/* Card 3: Bundle SOS */}
               <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors shadow-sm flex flex-col justify-between md:col-span-2 lg:col-span-1">
                  <div>
                     <h3 className="font-bold text-slate-900 text-lg">Kit de Barrera (SOS)</h3>
                     <p className="text-sm text-slate-500 mb-4">Hydro-Lock + Barrier Lock Cream</p>
                     <div className="text-3xl font-bold text-slate-900 mb-6">$88.00</div>
                  </div>
                  <Button onClick={onAddToCart} variant="primary" fullWidth className="bg-slate-800 text-white">
                     AÑADIR KIT
                  </Button>
               </div>

               {/* Card 4: Routine AM */}
               <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border border-blue-100 shadow-md flex flex-col justify-between md:col-span-2 lg:col-span-1">
                  <div>
                     <h3 className="font-bold text-slate-900 text-lg">Rutina AM (Power Pair)</h3>
                     <p className="text-sm text-slate-500 mb-4">Hydro-Lock + Invisible Shield SPF</p>
                     <div className="text-3xl font-bold text-slate-900 mb-6">$95.00</div>
                  </div>
                  <Button onClick={onAddToCart} fullWidth className="bg-blue-600 hover:bg-blue-700 text-white">
                     COMPRAR RUTINA AM
                  </Button>
               </div>

            </div>
         </section>

      </div>

      {/* 4. Global Bottom Bar (Mobile Only CTA) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden z-50 flex items-center justify-between safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
         <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Hydro-Lock Serum</div>
            <div className="text-xl font-bold text-slate-900">$42.00</div>
         </div>
         <Button onClick={onAddToCart} className="py-3 px-8 bg-cyan-500 hover:bg-cyan-600 text-white border-0 shadow-lg shadow-cyan-200">
            AÑADIR
         </Button>
      </div>
    </div>
  );
};
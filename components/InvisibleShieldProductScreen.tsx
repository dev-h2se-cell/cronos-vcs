import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Sun, Shield, Layers, Eye, Check, ArrowRight, Zap, RefreshCcw, Sparkles, Hand, Clock, RotateCw } from 'lucide-react';

import invisibleShieldHero400 from '../src/assets/images/invisible-shield-hero-400w.jpg';
import invisibleShieldHero800 from '../src/assets/images/invisible-shield-hero-800w.jpg';
import invisibleShieldHero from '../src/assets/images/invisible-shield-hero.jpg';

interface Props {
  onAddToCart: () => void;
}

export const InvisibleShieldProductScreen: React.FC<Props> = ({ onAddToCart }) => {
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
    <div className="bg-[#FFFBF0] min-h-screen text-slate-900 font-sans animate-fade-in pb-24">
      
      {/* 1. Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
         {/* Solar Background Effects */}
         <div className="absolute inset-0 bg-gradient-to-b from-orange-100/40 to-white pointer-events-none"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-[100px] pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center relative z-10">
            
            {/* Text Content */}
            <div className="order-2 md:order-1">
               <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full text-amber-800 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
                  <Sun size={12} className="text-amber-600 fill-current" />
                  0% Residuo Blanco | Primer Híbrido
               </div>
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                  El Techo de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">tu Rutina.</span>
               </h1>
               <p className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed">
                  Protección solar +50, Hidratación de Ceramidas y Primer de Maquillaje. Todo en uno. El escudo que tu piel (y tu base) amarán.
               </p>
               <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div> SPF 50+ PA++++
                 </div>
                 <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div> Glow Finish
                 </div>
               </div>
            </div>

            {/* Visual - Tube Render */}
            <div className="order-1 md:order-2 flex justify-center">
               <div className="relative w-64 h-96 group cursor-pointer perspective-1000 overflow-hidden rounded-[2rem]">
                  {/* Sun Rays Effect */}
                  <div className="absolute -top-10 -right-10 w-full h-full bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                  
                  {/* Tube Image - Local Source */}
                  <img 
                    src={invisibleShieldHero}
                    srcSet={`${invisibleShieldHero400} 400w, ${invisibleShieldHero800} 800w, ${invisibleShieldHero} 1000w`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="Invisible Shield SPF Tube"
                    className="relative z-10 w-full h-full object-cover rounded-[2rem] shadow-2xl"
                  />

                  {/* Backup CSS Tube (Visible if img fails) */}
                  <div className="relative z-0 w-full h-full bg-gradient-to-b from-white to-orange-50 rounded-[2rem] border border-amber-100 shadow-2xl flex flex-col items-center justify-end overflow-hidden transform transition-transform duration-700 hover:rotate-y-12 absolute inset-0">
                      {/* Cap */}
                      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-amber-200 to-yellow-100 border-b border-amber-200"></div>
                      
                      {/* Body Shine */}
                      <div className="absolute top-0 right-8 w-12 h-full bg-white/40 blur-md transform skew-x-12"></div>

                      <div className="relative z-20 text-center mb-16">
                          <Shield size={48} className="text-amber-400 mx-auto mb-4 stroke-1" />
                          <h2 className="text-2xl font-bold text-slate-800 tracking-wider uppercase">Invisible<br/>Shield</h2>
                          <div className="w-12 h-0.5 bg-amber-400 mx-auto my-3"></div>
                          <p className="text-[12px] font-bold tracking-widest text-slate-400">SPF 50+</p>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 2. Sticky Tab System */}
      <div className="sticky top-[60px] md:top-[72px] z-40 bg-[#FFFBF0]/90 backdrop-blur-md border-y border-amber-100/50 shadow-sm">
         <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto no-scrollbar gap-8 md:gap-12 text-sm font-bold tracking-widest uppercase justify-start md:justify-center">
            {['overview', 'science', 'routine', 'offers'].map((tab) => (
               <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-amber-500 text-amber-700' : 'border-transparent text-slate-400 hover:text-amber-600'}`}
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
                {/* Overlay Text */}
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

         {/* SCIENCE (Combined Primer & Defense) */}
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
                                <p className="text-sm">Grasoso, hace que el maquillaje se resbale.</p>
                           </div>
                           <div className="flex items-start gap-3 opacity-60">
                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">2</div>
                                <p className="text-sm">Crea "pilling" (rollitos) al aplicar base.</p>
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
                                <p className="text-sm font-bold text-slate-800">Efecto "Grippy Primer".</p>
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
                       {/* Abstract Graphic */}
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

         {/* ROUTINE (Formerly Usage) */}
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
                  <h3 className="font-bold text-slate-900 mb-2">El "Set" de 60 Segundos</h3>
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

         {/* OFFERS */}
         <section id="offers" className="scroll-mt-40 pb-20">
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">Protege tu Piel</h2>
            <div className="grid md:grid-cols-2 gap-6">
               
               {/* Card 1: Single */}
               <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-300 transition-colors shadow-sm flex flex-col justify-between">
                  <div>
                     <h3 className="font-bold text-slate-900 text-lg">Solo Escudo</h3>
                     <p className="text-sm text-slate-500 mb-4">Tubo Airless 50ml</p>
                     <div className="text-3xl font-bold text-slate-900 mb-6">$48.00</div>
                  </div>
                  <Button onClick={onAddToCart} variant="outline" fullWidth className="border-slate-300 hover:border-amber-500 hover:text-amber-600">
                     AÑADIR AL CARRITO
                  </Button>
               </div>

               {/* Card 2: Subscription */}
               <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 shadow-md relative overflow-hidden flex flex-col justify-between">
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <RefreshCcw size={16} className="text-amber-600" />
                        <h3 className="font-bold text-slate-900 text-lg">Suscríbete (Salud Diaria)</h3>
                     </div>
                     <p className="text-sm text-slate-600 mb-4">Envío automático cada 45 días.</p>
                     <div className="flex items-center gap-3 mb-6">
                        <span className="text-slate-400 line-through text-sm">$48.00</span>
                        <span className="text-3xl font-bold text-amber-700">$38.00</span>
                     </div>
                  </div>
                  <Button onClick={onAddToCart} fullWidth className="bg-amber-500 hover:bg-amber-600 border-0 text-white">
                     SUSCRIBIRSE
                  </Button>
               </div>

               {/* Card 3: Power Pair (HERO) */}
               <div className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl border-2 border-orange-200 shadow-xl flex flex-col justify-between md:col-span-2 relative">
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase shadow-sm">
                     Recomendado AM
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-1">
                         <h3 className="font-bold text-slate-900 text-xl mb-1 flex items-center gap-2">
                             EL POWER PAIR AM <Sparkles className="text-orange-500" size={18} />
                         </h3>
                         <p className="text-sm text-slate-500 mb-4">Chronos-C (Vit C) + Invisible Shield</p>
                         <div className="flex items-center gap-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded w-fit mb-4">
                             <Layers size={12} /> Doble Defensa: Antioxidante + Físico
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-slate-400 line-through text-sm">$93.00</span>
                            <span className="text-4xl font-bold text-slate-900">$85.00</span>
                         </div>
                      </div>
                      <div className="w-full md:w-auto">
                          <Button onClick={onAddToCart} fullWidth className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg shadow-lg shadow-orange-200">
                             COMPRAR DÚO
                          </Button>
                      </div>
                  </div>
               </div>

            </div>
         </section>

      </div>

      {/* 4. Global Bottom Bar (Mobile Only CTA) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden z-50 flex items-center justify-between safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
         <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Invisible Shield SPF</div>
            <div className="text-xl font-bold text-slate-900">$48.00</div>
         </div>
         <Button onClick={onAddToCart} className="py-3 px-8 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0 shadow-lg shadow-yellow-200">
            AÑADIR
         </Button>
      </div>
    </div>
  );
};
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Sun, Moon, Droplets, Shield, Layers } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  currentView: 'chronos' | 'infinity' | 'hydrolock' | 'shield' | 'protocols';
  onNavigate: (view: 'chronos' | 'infinity' | 'hydrolock' | 'shield' | 'protocols') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);
  const prevCartCountRef = useRef(cartCount); // To track previous cartCount

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation logic for cartCount change
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let initialSetTimeout: ReturnType<typeof setTimeout> | undefined; // Using ReturnType<typeof setTimeout> for both

    if (cartCount !== prevCartCountRef.current && cartCount > 0) { // Only animate if cartCount *actually changed* and is > 0
      initialSetTimeout = setTimeout(() => {
        setAnimateBadge(true);
        timer = setTimeout(() => setAnimateBadge(false), 300);
      }, 0); // Defer to next event loop tick
    } else if (cartCount === 0) { // If cart is empty, ensure badge is not animating
        setAnimateBadge(false);
    }
    prevCartCountRef.current = cartCount; // Update ref for next render

    return () => {
      if (initialSetTimeout) clearTimeout(initialSetTimeout);
      if (timer) clearTimeout(timer); // Clear animation timeout
    };
  }, [cartCount]);

  const isDark = currentView === 'infinity';
  const isHydro = currentView === 'hydrolock';
  const isShield = currentView === 'shield';
  const isProtocols = currentView === 'protocols';

  const themeText = isDark ? 'text-white' : 'text-slate-900';
  const themeBg = isDark ? 'bg-slate-950/90 border-slate-800' : isShield ? 'bg-[#FFFBF0]/90 border-amber-200' : isProtocols ? 'bg-slate-50/90 border-slate-200' : 'bg-white/95 border-slate-200';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans">
      {/* Top Banner */}
      <div className={`text-[10px] md:text-xs font-bold tracking-widest text-center py-2 px-4 uppercase transition-colors duration-500 ${
        isDark ? 'bg-purple-900 text-purple-100' : 
        isHydro ? 'bg-cyan-600 text-cyan-50' : 
        isShield ? 'bg-amber-500 text-white' :
        'bg-slate-900 text-white'
      }`}>
        Garantía de Botella Vacía: 60 Días de Prueba sin Riesgo
      </div>

      {/* Main Nav */}
      <nav className={`transition-all duration-300 border-b ${scrolled ? `${themeBg} backdrop-blur-sm py-3 shadow-sm` : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            {/* Product Switcher (The "Tabs") */}
            <div className="flex items-center bg-slate-200/50 p-1 rounded-full relative overflow-hidden backdrop-blur-sm w-full md:w-[500px]">
               {/* Slider Background */}
               <div
                 className={`absolute top-1 bottom-1 w-[calc(20%-1.6px)] bg-white rounded-full shadow-md transition-all duration-500 ease-in-out z-0
                   ${currentView === 'chronos' ? 'left-1' :
                     currentView === 'hydrolock' ? 'left-[calc(20%)]' :
                     currentView === 'shield' ? 'left-[calc(40%)]' :
                     currentView === 'infinity' ? 'left-[calc(60%)]' :
                     'left-[calc(80%)] bg-slate-800'
                   }`}
               ></div>

               <button
                 onClick={() => onNavigate('chronos')}
                 className={`relative z-10 py-1.5 flex items-center justify-center gap-1 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300 w-1/5 ${currentView === 'chronos' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  <Sun size={12} className={currentView === 'chronos' ? 'text-orange-500' : 'text-slate-400'} />
                  <span className="hidden md:inline">Vit C</span>
                  <span className="md:hidden">Vit C</span>
               </button>

               <button
                 onClick={() => onNavigate('hydrolock')}
                 className={`relative z-10 py-1.5 flex items-center justify-center gap-1 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300 w-1/5 ${currentView === 'hydrolock' ? 'text-cyan-700' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  <Droplets size={12} className={currentView === 'hydrolock' ? 'text-cyan-500' : 'text-slate-400'} />
                  <span className="hidden md:inline">Hydro</span>
                  <span className="md:hidden">Hydro</span>
               </button>

               <button
                 onClick={() => onNavigate('shield')}
                 className={`relative z-10 py-1.5 flex items-center justify-center gap-1 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300 w-1/5 ${currentView === 'shield' ? 'text-amber-700' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  <Shield size={12} className={currentView === 'shield' ? 'text-amber-500' : 'text-slate-400'} />
                  <span className="hidden md:inline">SPF</span>
                  <span className="md:hidden">SPF</span>
               </button>

               <button
                 onClick={() => onNavigate('infinity')}
                 className={`relative z-10 py-1.5 flex items-center justify-center gap-1 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300 w-1/5 ${currentView === 'infinity' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  <Moon size={12} className={currentView === 'infinity' ? 'text-purple-400' : 'text-slate-400'} />
                  <span className="hidden md:inline">Night</span>
                  <span className="md:hidden">Night</span>
               </button>

              <button
                onClick={() => onNavigate('protocols')}
                className={`relative z-10 py-1.5 flex items-center justify-center gap-1 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300 w-1/5 ${currentView === 'protocols' ? 'text-orange-500' : 'text-slate-500 hover:text-slate-700'}`}
              >
                  <Layers size={12} className={currentView === 'protocols' ? 'text-orange-500' : 'text-slate-400'} />
                  <span className="hidden md:inline">Kits</span>
                  <span className="md:hidden">Kits</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative group">
              <ShoppingBag className={`${themeText} transition-transform group-hover:scale-110`} size={24} strokeWidth={1.5} />
              <span className={`absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center transition-transform ${animateBadge ? 'scale-125' : 'scale-100'}`}>
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flame, Star, Sun, Moon, Clock, CheckCircle2, CreditCard } from 'lucide-react';
import { ProductData } from '../types'; // Import necessary types
import { formatPrice } from '../utils/formatPrice'; // Import formatPrice
import { Button } from './Button'; // Import Button component
import { useCart } from '../context/CartContext'; // Import useCart

interface Props {
  onBack: () => void;
  productsData: ProductData; // Added
}

const LongevityProtocolScreen: React.FC<Props> = ({ onBack, productsData }) => {
  const { addToCart } = useCart();
  const [timeLeft] = useState(12); // Fake scarcity counter

  const longevityProtocol = productsData.protocols.find(p => p.id === 'protocolo-longevidad');
  const chronosCProduct = productsData.products.find(p => p.id === 'chronos-c-shield');
  const retinalProduct = productsData.products.find(p => p.id === 'infinity-retinal');
  const hydroLockProduct = productsData.products.find(p => p.id === 'hydro-lock-serum');
  const invisibleShieldProduct = productsData.products.find(p => p.id === 'invisible-shield-spf');
  const guiaSkinStreaming = productsData.others.find(o => o.id === 'guia-skin-streaming');
  const shippingDetails = productsData.others.find(o => o.id === 'shipping');


  if (!longevityProtocol || !chronosCProduct || !retinalProduct || !hydroLockProduct || !invisibleShieldProduct || !guiaSkinStreaming || !shippingDetails) {
    return <div>Error: Product data for Longevity Protocol Screen not found.</div>;
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, type: string) => {
    // Fallback logic
    if (type === 'chronos') e.currentTarget.src = "https://picsum.photos/seed/chronosbottle/200/200";
    if (type === 'retinal') e.currentTarget.src = "https://picsum.photos/seed/purplebottle/200/200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-200 to-slate-950 font-sans animate-fade-in relative z-20">
      
      {/* 1. Sticky Header (Urgency) */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <span className="font-bold text-slate-900 tracking-wider text-sm uppercase hidden md:block">
            Longevity Protocol™
          </span>
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            <Flame size={12} className="fill-current" />
            Solo quedan {timeLeft} Kits
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto pb-32">
        
        {/* 2. Hero Section (The Promise) */}
        <section className="pt-8 px-6 text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            <Star className="text-orange-400 fill-current" size={16} />
            <Star className="text-orange-400 fill-current" size={16} />
            <Star className="text-orange-400 fill-current" size={16} />
            <Star className="text-orange-400 fill-current" size={16} />
            <Star className="text-orange-400 fill-current" size={16} />
            <span className="text-slate-500 text-xs font-bold ml-2">(842 Reseñas)</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            El Fin del Envejecimiento <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-600">Prematuro</span>.
          </h1>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Protege de día. Repara de noche. El único sistema clínico de 24 horas que tu piel necesita para detener el tiempo.
          </p>

          {/* Visual: Split Screen Render Simulation */}
          <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-12 group">
            <div className="absolute inset-0 flex">
              {/* Day Side */}
              <div className="w-1/2 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center relative">
                <Sun className="absolute top-4 left-4 text-orange-500/20" size={64} />
                <div className="w-24 h-48 bg-white/30 backdrop-blur-sm border border-orange-200 rounded-lg transform -rotate-6 translate-x-4 z-10 shadow-lg flex items-center justify-center">
                   <div className="text-[10px] font-bold text-orange-800 rotate-90 whitespace-nowrap">{chronosCProduct.name.split(' ')[0].toUpperCase()}</div>
                </div>
              </div>
              {/* Night Side */}
              <div className="w-1/2 bg-gradient-to-bl from-slate-900 to-purple-900 flex items-center justify-center relative">
                <Moon className="absolute top-4 right-4 text-purple-500/20" size={64} />
                <div className="w-24 h-48 bg-slate-800/80 backdrop-blur-sm border border-purple-500/50 rounded-lg transform rotate-6 -translate-x-4 z-20 shadow-2xl flex items-center justify-center">
                   <div className="text-[10px] font-bold text-purple-200 rotate-90 whitespace-nowrap">{retinalProduct.name.split(' ')[0].toUpperCase()}</div>
                </div>
              </div>
            </div>
            {/* Center Plus */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-30 font-bold text-slate-400">
              +
            </div>
          </div>
        </section>

        {/* 3. The Science (Circadian Rhythm) */}
        <section className="px-6 py-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center flex items-center justify-center gap-2">
              <Clock className="text-slate-400" /> Ciencia Circadiana
            </h2>
            
            <div className="relative border-l-2 border-slate-200 ml-6 space-y-10 my-4">
              {/* AM */}
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white shadow-sm"></div>
                <h3 className="font-bold text-slate-900 text-lg">08:00 AM • Modo Defensa</h3>
                <p className="text-slate-600 text-sm mt-1">
                  {hydroLockProduct.name} e {invisibleShieldProduct.name} protegen la piel de día, la hidratan profundamente y la preparan para los retos ambientales.
                </p>
              </div>

              {/* PM */}
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-sm"></div>
                <h3 className="font-bold text-slate-900 text-lg">10:00 PM • Modo Reparación</h3>
                <p className="text-slate-600 text-sm mt-1">
                  {retinalProduct.name} y {chronosCProduct.name} trabajan en sinergia para reparar el daño celular y estimular la renovación mientras duermes.
                </p>
              </div>
            </div>
            
            <p className="text-center text-slate-500 text-sm mt-6 font-medium italic">
              &quot;Tu piel tiene dos modos biológicos. Este protocolo optimiza ambos.&quot;
            </p>
          </div>
        </section>

        {/* 4. Value Stack */}
        <section className="px-6 py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">¿Qué Incluye el Kit?</h2>
          <div className="space-y-4">
            
            {/* Item 1 */}
            <div className="flex items-center bg-white p-4 rounded-xl border border-orange-100 shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-md shrink-0 mr-4 overflow-hidden">
                 <img 
                    src="/chronos-serum.jpg" 
                    onError={(e) => handleImageError(e, 'chronos')}
                    className="w-full h-full object-cover mix-blend-multiply opacity-80" 
                    alt={chronosCProduct.name}
                    loading="lazy" // Added
                 />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-900">{chronosCProduct.name}</h4>
                  <span className="text-slate-400 line-through text-xs">{formatPrice(chronosCProduct.price)}</span>
                </div>
                <p className="text-xs text-orange-600 font-medium">{chronosCProduct.benefits.join('. ')}</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center bg-slate-900 p-4 rounded-xl border border-purple-900 shadow-sm text-white">
              <div className="w-16 h-16 bg-slate-800 rounded-md shrink-0 mr-4 overflow-hidden">
                <img 
                    src="/retinal-bottle.jpg" 
                    onError={(e) => handleImageError(e, 'retinal')}
                    className="w-full h-full object-cover mix-blend-overlay opacity-80" 
                    alt={retinalProduct.name}
                    loading="lazy" // Added
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white">{retinalProduct.name}</h4>
                  <span className="text-slate-500 line-through text-xs">{formatPrice(retinalProduct.price)}</span>
                </div>
                <p className="text-xs text-purple-400 font-medium">{retinalProduct.benefits.join('. ')}</p>
              </div>
            </div>

            {/* Item 3 (Free) */}


            {/* Item 4 (Free) */}
            <div className="flex items-center bg-blue-50 p-4 rounded-xl border-2 border-blue-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-blue-200 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Gratis
              </div>
              <div className="w-16 h-16 bg-white rounded-md shrink-0 mr-4 flex items-center justify-center">
                <div className="text-xs font-bold text-blue-500">PDF</div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-900">{guiaSkinStreaming.name}</h4>
                  <span className="text-slate-400 line-through text-xs">{formatPrice(guiaSkinStreaming.price || '0')}</span>
                </div>
                <p className="text-xs text-blue-600 font-medium">{guiaSkinStreaming.details}</p>
              </div>
            </div>

          </div>
        </section>

        {/* 5. Recap Proofs */}
        <section className="px-6 py-8 grid grid-cols-2 gap-4">
           <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-slate-100">
              <div className="text-2xl mb-2">🍎</div>
              <div className="text-xs font-bold text-slate-900 uppercase">Test de Oxidación</div>
              <div className="text-[10px] text-slate-500">Protección de 24h comprobada.</div>
           </div>
           <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-slate-100">
              <div className="text-2xl mb-2 line-through text-slate-300">🥪</div>
              <div className="text-xs font-bold text-slate-900 uppercase">Sin Sándwich</div>
              <div className="text-[10px] text-slate-500">Formulación que no irrita.</div>
           </div>
        </section>

        {/* 6. The Close (Offer) */}
        <section className="bg-slate-900 rounded-t-3xl p-8 -mx-0 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-purple-600"></div>
          
          <div className="text-center mb-6">
            <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-1">Oferta Exclusiva</h3>
            <p className="text-slate-400 text-sm">Prueba sin riesgos por 60 días.</p>
          </div>

          <div className="flex justify-center items-end gap-3 mb-8">
            {longevityProtocol.originalPrice && <span className="text-slate-500 line-through text-xl font-mono decoration-red-500 decoration-2">{formatPrice(longevityProtocol.originalPrice)}</span>}
            <span className="text-5xl font-bold text-white tracking-tight">{formatPrice(longevityProtocol.price)}</span>
          </div>

          <Button 
            onClick={() => addToCart(longevityProtocol, 1)} 
            fullWidth 
            className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 border-0 text-lg py-5 mb-4 animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            {longevityProtocol.ctaText}
          </Button>

          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 size={14} /> Envío Gratis Inmediato
             </div>
             <div className="flex gap-3 opacity-50 grayscale hover:grayscale-0 transition-all">
                <CreditCard size={20} className="text-white" />
                <span className="text-xs text-white font-mono border border-white/30 px-1 rounded">VISA</span>
                <span className="text-xs text-white font-mono border border-white/30 px-1 rounded">MC</span>
                <span className="text-xs text-white font-mono border border-white/30 px-1 rounded">ADDI</span>
             </div>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className="px-6 py-12 bg-slate-950 text-slate-400">
           <div className="border-t border-slate-800 pt-8">
              <h4 className="text-white font-bold mb-4">Preguntas Frecuentes</h4>
              <div className="space-y-4 text-sm">
                 <div>
                    <p className="text-white font-medium mb-1">¿Tengo piel sensible, es para mí?</p>
                    <p>Sí. Ambos productos usan tecnologías (THD Ascorbate y Retinal Encapsulado) diseñadas específicamente para evitar la irritación.</p>
                 </div>
                 <div>
                    <p className="text-white font-medium mb-1">¿En cuánto tiempo veré resultados?</p>
                    <p>Luminosidad: 3 días. Textura: 1 semana. Arrugas profundas: 4 semanas.</p>
                 </div>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
};

export default LongevityProtocolScreen;
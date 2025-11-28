import React from 'react';
import { Button } from './Button';
import { ProductBundle } from '../types';
import { Check, Package, Sparkles, Truck } from 'lucide-react';

const bundles: ProductBundle[] = [
  {
    id: 'starter',
    title: 'El Iniciado',
    subtitle: 'Protección Diaria',
    products: ['1x Chronos-C Serum (30ml)'],
    price: 45.00,
    isBestSeller: false,
    features: ['Envío Estándar', 'Garantía 30 Días'],
    ctaText: 'AÑADIR AL CARRITO',
    image: '/chronos-serum.jpg' // Local Image Priority
  },
  {
    id: 'protocol',
    title: 'PROTOCOLO DE LONGEVIDAD',
    subtitle: 'Transformación Total AM/PM',
    products: ['1x Chronos-C Serum', '1x Infinity Retinal Night Cream'],
    price: 98.00,
    originalPrice: 135.00,
    isBestSeller: true,
    features: ['🎁 Regalo: Guía Skin Streaming', 'Envío Prioritario GRATIS', 'Garantía Extendida 90 Días'],
    ctaText: 'VER DETALLES DEL PROTOCOLO',
    image: '/bundle-protocol.jpg' // Local Image Priority
  }
];

interface OfferProps {
  onAddToCart: () => void;
  onNavigateToRetinal: () => void;
  onNavigateToProtocol: () => void;
}

export const Offer: React.FC<OfferProps> = ({ onAddToCart, onNavigateToRetinal, onNavigateToProtocol }) => {
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackIndex: number) => {
    // Fallback based on bundle index
    const fallbackUrls = [
        'https://picsum.photos/seed/bottle1/400/400',
        'https://picsum.photos/seed/bundle2/400/400'
    ];
    e.currentTarget.src = fallbackUrls[fallbackIndex] || 'https://via.placeholder.com/400';
  };

  return (
    <section id="offer" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Elige tu Nivel de Protección</h2>
            <p className="text-slate-600">Envío gratis a toda Colombia en pedidos superiores a $80.000</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
            
            {/* Decoy Option */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-bold text-slate-900">{bundles[0].title}</h3>
                <p className="text-slate-500 text-sm mb-6">{bundles[0].subtitle}</p>
                
                <div className="flex items-center gap-4 mb-8">
                     <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden">
                        <img 
                            src={bundles[0].image} 
                            onError={(e) => handleImageError(e, 0)}
                            alt="Single Bottle" 
                            className="w-full h-full object-cover" 
                        />
                     </div>
                     <div className="text-3xl font-bold text-slate-900">${bundles[0].price.toFixed(2)}</div>
                </div>

                <ul className="space-y-3 mb-8">
                    {bundles[0].products.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                             <Package size={16} /> {p}
                        </li>
                    ))}
                    {bundles[0].features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                             <Check size={16} className="text-slate-400" /> {f}
                        </li>
                    ))}
                </ul>

                <Button variant="outline" fullWidth onClick={onAddToCart}>{bundles[0].ctaText}</Button>
            </div>

            {/* Hero Option */}
            <div className="bg-white rounded-2xl p-8 border-2 border-orange-500 shadow-xl relative transform lg:-translate-y-6 overflow-hidden">
                {/* Corner Ribbon */}
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20 pointer-events-none">
                    <div className="absolute top-6 -right-10 w-40 bg-gradient-to-r from-orange-500 to-red-600 text-white transform rotate-45 text-center text-[10px] font-bold py-1.5 shadow-lg tracking-widest uppercase border-b border-white/20">
                      Mejor Valor
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2 relative z-10">
                    {bundles[1].title} <Sparkles className="text-orange-500" size={20} />
                </h3>
                <p className="text-slate-500 text-sm mb-6 relative z-10">{bundles[1].subtitle}</p>

                <div className="flex items-center gap-6 mb-8 bg-orange-50 p-4 rounded-xl relative z-10">
                     <div className="w-24 h-24 bg-white rounded-lg overflow-hidden border border-orange-100 shadow-sm">
                        <img 
                            src={bundles[1].image} 
                            onError={(e) => handleImageError(e, 1)}
                            alt="Bundle" 
                            className="w-full h-full object-cover" 
                        />
                     </div>
                     <div>
                         <div className="text-sm text-slate-400 line-through font-mono">${bundles[1].originalPrice?.toFixed(2)}</div>
                         <div className="text-4xl font-bold text-slate-900">${bundles[1].price.toFixed(2)}</div>
                     </div>
                </div>

                <ul className="space-y-4 mb-8 relative z-10">
                    {bundles[1].products.map((p, i) => (
                        <li key={i} className="flex items-center gap-3 font-semibold text-slate-800">
                             <Check size={18} className="text-orange-500" /> {p}
                        </li>
                    ))}
                     <li className="h-px bg-slate-100 my-2"></li>
                    {bundles[1].features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                             <Check size={18} className="text-orange-400" /> 
                             {f.includes('Envío') ? (
                               <span className="flex items-center gap-1.5">
                                 {f} <Truck size={14} className="text-orange-500" />
                               </span>
                             ) : f}
                        </li>
                    ))}
                </ul>

                <Button variant="secondary" fullWidth className="text-lg py-5 shadow-orange-200 relative z-10" onClick={onNavigateToProtocol}>
                    {bundles[1].ctaText}
                </Button>
                <p className="text-center text-xs text-slate-400 mt-3 relative z-10">Envío Gratis a toda Colombia - Entrega estimada en 3-5 días hábiles</p>
            </div>

        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Button } from './Button';
import { Check, Package, Sparkles, Truck } from 'lucide-react';
import { ProductData, ProductItem, ProtocolItem, OtherItem } from '../types'; // Import ProductData, ProductItem, ProtocolItem, OtherItem

import { formatPrice } from '../utils/formatPrice'; // Import formatPrice

interface OfferProps {
  onAddToCart: () => void;
  // onNavigateToRetinal: () => void; // Removed as it's not used in this component
  onNavigateToProtocol: () => void;
  productsData: ProductData; // Added
}

export const Offer: React.FC<OfferProps> = ({ onAddToCart, onNavigateToProtocol, productsData }) => {
  const chronosProduct = productsData.products.find((p: ProductItem) => p.id === 'chronos-c-shield');
  const longevityProtocol = productsData.protocols.find((p: ProtocolItem) => p.id === 'protocolo-longevidad');
  const shippingDetails = productsData.others.find((o: OtherItem) => o.id === 'shipping');

  if (!chronosProduct || !longevityProtocol || !shippingDetails) {
    return <div>Error: Product data for Offers not found.</div>;
  }
  
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
            <p className="text-slate-600">{shippingDetails.details}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
            
            {/* Decoy Option */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-bold text-slate-900">{chronosProduct.tagline}</h3>
                <p className="text-slate-500 text-sm mb-6">{chronosProduct.description}</p>
                
                <div className="flex items-center gap-4 mb-8">
                     {chronosProduct.image && <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden">
                        <img 
                            src={chronosProduct.image} 
                            onError={(e) => handleImageError(e, 0)} // Keep for now
                            alt={chronosProduct.name} 
                            className="w-full h-full object-cover"
                            loading="lazy" // Added
                        />
                     </div>}
                     <div className="text-3xl font-bold text-slate-900">{formatPrice(chronosProduct.price)}</div>
                </div>

                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                         <Package size={16} /> {chronosProduct.name}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-500">
                         <Check size={16} className="text-slate-400" /> Envío Estándar
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-500">
                         <Check size={16} className="text-slate-400" /> Garantía 30 Días
                    </li>
                </ul>

                <Button variant="outline" fullWidth onClick={onAddToCart}>AÑADIR AL CARRITO</Button>
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
                    {longevityProtocol.name} <Sparkles className="text-orange-500" size={20} />
                </h3>
                <p className="text-slate-500 text-sm mb-6 relative z-10">{longevityProtocol.description}</p>

                <div className="flex items-center gap-6 mb-8 bg-orange-50 p-4 rounded-xl relative z-10">
                     <div className="w-24 h-24 bg-white rounded-lg overflow-hidden border border-orange-100 shadow-sm">
                        <img 
                            src={longevityProtocol.image} 
                            onError={(e) => handleImageError(e, 1)} // Keep for now
                            alt={longevityProtocol.name} 
                            className="w-full h-full object-cover"
                            loading="lazy" // Added
                        />
                     </div>
                     <div>
                         {longevityProtocol.originalPrice && <div className="text-sm text-slate-400 line-through font-mono">{formatPrice(longevityProtocol.originalPrice)}</div>}
                         <div className="text-4xl font-bold text-slate-900">{formatPrice(longevityProtocol.price)}</div>
                     </div>
                </div>

                <ul className="space-y-4 mb-8 relative z-10">
                    {longevityProtocol.productsIncluded.map((productId: string, i: number) => {
                        const product = productsData.products.find((p: ProductItem) => p.id === productId);
                        const other = productsData.others.find((o: OtherItem) => o.id === productId);
                        const itemName = product ? product.name : (other ? other.name : 'Unknown Product');
                        return (
                            <li key={i} className="flex items-center gap-3 font-semibold text-slate-800">
                                 <Check size={18} className="text-orange-500" /> {itemName}
                            </li>
                        );
                    })}
                     <li className="h-px bg-slate-100 my-2"></li>
                    <li className="flex items-center gap-3 text-sm text-slate-600">
                         <Check size={18} className="text-orange-400" /> 
                         <span className="flex items-center gap-1.5">
                           Envío Prioritario GRATIS <Truck size={14} className="text-orange-500" />
                         </span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-600">
                         <Check size={18} className="text-orange-400" /> Garantía Extendida 90 Días
                    </li>
                </ul>

                <Button variant="secondary" fullWidth className="text-lg py-5 shadow-orange-200 relative z-10" onClick={onNavigateToProtocol}>
                    {longevityProtocol.ctaText}
                </Button>
                <p className="text-center text-xs text-slate-400 mt-3 relative z-10">Envío Gratis a toda Colombia - Entrega estimada en 3-5 días hábiles</p>
            </div>

        </div>
      </div>
    </section>
  );
};
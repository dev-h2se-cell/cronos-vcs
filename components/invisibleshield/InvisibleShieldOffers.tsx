import React from 'react';
import { Button } from '../Button';
import { RefreshCcw, Sparkles, Layers } from 'lucide-react';
import { ProductData } from '../../types';
import { formatPrice } from '../../utils/formatPrice'; // Import formatPrice

interface InvisibleShieldOffersProps {
  onAddToCart: () => void;
  onNavigateToProtocols: () => void;
  productsData: ProductData; // Added
}

export const InvisibleShieldOffers: React.FC<InvisibleShieldOffersProps> = ({ onAddToCart, onNavigateToProtocols, productsData }) => {
  const invisibleShieldProduct = productsData.products.find(p => p.id === 'invisible-shield-spf');
  const chronosProduct = productsData.products.find(p => p.id === 'chronos-c-shield');
  const protocoloDia = productsData.protocols.find(p => p.id === 'protocolo-dia'); // For price reference for Power Pair AM

  if (!invisibleShieldProduct || !chronosProduct || !protocoloDia) {
    return <div>Error: Product data for Invisible Shield Offers not found.</div>;
  }

  return (
    <section id="offers" className="scroll-mt-40 pb-20">
      <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">Protege tu Piel</h2>
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Card 1: Single */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-300 transition-colors shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{invisibleShieldProduct.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{invisibleShieldProduct.longDescription}</p>
            <div className="text-3xl font-bold text-slate-900 mb-6">{formatPrice(invisibleShieldProduct.price)}</div>
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
              {invisibleShieldProduct.subscriptionOriginalPrice && <span className="text-slate-400 line-through text-sm">{formatPrice(invisibleShieldProduct.subscriptionOriginalPrice)}</span>}
              <span className="text-3xl font-bold text-amber-700">{formatPrice(invisibleShieldProduct.subscriptionPrice || '0')}</span>
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
              <p className="text-sm text-slate-500 mb-4">{chronosProduct.name} + {invisibleShieldProduct.name}</p>
              <div className="flex items-center gap-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded w-fit mb-4">
                <Layers size={12} /> Doble Defensa: Antioxidante + Físico
              </div>
              <div className="flex items-center gap-3">
                {protocoloDia.originalPrice && <span className="text-slate-400 line-through text-sm">{formatPrice(protocoloDia.originalPrice)}</span>}
                <span className="text-4xl font-bold text-slate-900">{formatPrice(protocoloDia.price)}</span>
              </div>
            </div>
            <div className="w-full md:w-auto flex gap-2">
              <Button onClick={() => onNavigateToProtocols()} variant="outline" className="border-slate-300 hover:border-orange-500 hover:text-orange-600">
                VER DETALLES
              </Button>
              <Button onClick={onAddToCart} className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200 flex-grow">
                COMPRAR DÚO
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
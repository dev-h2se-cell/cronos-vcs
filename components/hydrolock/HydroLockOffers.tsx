import React from 'react';
import { Button } from '../Button';
import { Check, RefreshCcw } from 'lucide-react';
import { ProductData } from '../../types';
import { formatPrice } from '../../utils/formatPrice'; // Import formatPrice

interface HydroLockOffersProps {
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigateToProtocols: () => void;
  productsData: ProductData;
}

export const HydroLockOffers: React.FC<HydroLockOffersProps> = ({ onAddToCart, onNavigateToProtocols, productsData }) => {
  const hydroLockProduct = productsData.products.find(p => p.id === 'hydro-lock-serum');
  const protocoloDia = productsData.protocols.find(p => p.id === 'protocolo-dia');

  if (!hydroLockProduct || !protocoloDia) {
    return <div>Error: Product data for Hydro-Lock Offers not found.</div>;
  }

  return (
    <section id="offers" className="scroll-mt-40 pb-20">
      <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">Elige tu Hidratación</h2>
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Card 1: Single */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-cyan-300 transition-colors shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{hydroLockProduct.name}</h3>
            <p className="text-sm text-slate-500 mb-4">Botella de 30ml</p> {/* Keep hardcoded for now */}
            <div className="text-3xl font-bold text-slate-900 mb-6">{formatPrice(hydroLockProduct.price)}</div>
          </div>
          <Button onClick={() => onAddToCart(hydroLockProduct.id, 1)} variant="outline" fullWidth className="border-slate-300 hover:border-cyan-500 hover:text-cyan-600">
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
              {hydroLockProduct.subscriptionOriginalPrice && <span className="text-slate-400 line-through text-sm">{formatPrice(hydroLockProduct.subscriptionOriginalPrice)}</span>}
              <span className="text-3xl font-bold text-cyan-700">{formatPrice(hydroLockProduct.subscriptionPrice || '0')}</span>
            </div>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center gap-2 text-xs text-slate-600"><Check size={12} className="text-cyan-500"/> Cancela cuando quieras</li>
              <li className="flex items-center gap-2 text-xs text-slate-600"><Check size={12} className="text-cyan-500"/> Nunca te quedes sin tu base</li>
            </ul>
          </div>
          <Button onClick={() => onAddToCart(hydroLockProduct.id, 1)} fullWidth className="bg-cyan-600 hover:bg-cyan-700 border-0 text-white">
            SUSCRIBIRSE AHORA
          </Button>
        </div>

        {/* Card 3: Bundle SOS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors shadow-sm flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{protocoloDia.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{protocoloDia.description}</p>
            <div className="text-3xl font-bold text-slate-900 mb-6">{formatPrice(protocoloDia.price)}</div>
          </div>
          <Button onClick={() => onAddToCart(protocoloDia.id, 1)} variant="primary" fullWidth className="bg-slate-800 text-white">
            AÑADIR KIT
          </Button>
        </div>
        {/* Card 4: Routine AM */}
        <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border border-blue-100 shadow-md flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{protocoloDia.name} ({protocoloDia.tagline})</h3>
            <p className="text-sm text-slate-500 mb-4">{protocoloDia.description}</p>
            <div className="text-3xl font-bold text-slate-900 mb-6">{formatPrice(protocoloDia.price)}</div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onNavigateToProtocols()} variant="outline" fullWidth className="border-slate-300 hover:border-blue-500 hover:text-blue-600">
              VER DETALLES
            </Button>
            <Button onClick={() => onAddToCart(protocoloDia.id, 1)} fullWidth className="bg-blue-600 hover:bg-blue-700 text-white">
              AÑADIR
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
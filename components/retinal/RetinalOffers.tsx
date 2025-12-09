import React from 'react';
import { Button } from '../Button';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { ProductData, ProductItem, ProtocolItem, OtherItem } from '../../types'; // Import ProductData, ProductItem, ProtocolItem, OtherItem
import { formatPrice } from '../../utils/formatPrice';

interface RetinalOffersProps {
  onAddToCart: () => void;
  onNavigateToProtocol: () => void;
  onNavigateToProtocols: () => void;
  productsData: ProductData; // Added
}

export const RetinalOffers: React.FC<RetinalOffersProps> = ({ onAddToCart, onNavigateToProtocol, onNavigateToProtocols, productsData }) => {
  const retinalProduct = productsData.products.find((p: ProductItem) => p.id === 'infinity-retinal');
  const protocoloNoche = productsData.protocols.find((p: ProtocolItem) => p.id === 'protocolo-noche'); // Corresponds to "Protocolo de Recuperación"
  const protocoloLongevidad = productsData.protocols.find((p: ProtocolItem) => p.id === 'protocolo-longevidad');
  const chronosCProduct = productsData.products.find((p: ProductItem) => p.id === 'chronos-c-shield');
  const guiaSkinStreaming = productsData.others.find((o: OtherItem) => o.id === 'guia-skin-streaming');


  if (!retinalProduct || !protocoloNoche || !protocoloLongevidad || !chronosCProduct || !guiaSkinStreaming) {
    return <div>Error: Product data for Retinal Offers not found.</div>;
  }



  return (
    <section id="offers" className="scroll-mt-40 pb-20">
      <h2 className="text-2xl font-bold mb-8 text-center">Elige tu Protocolo</h2>
      <div className="grid gap-6 max-w-md mx-auto">

        {/* Tier 1 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 flex items-center justify-between group hover:border-purple-500/50 transition-colors">
          <div>
            <h3 className="font-bold text-white">{retinalProduct.name}</h3>
            <p className="text-xs text-slate-500">{retinalProduct.name} 30ml</p> {/* Keep 30ml hardcoded or get from product.size if added */}
          </div>
          <div className="text-right">
            <div className="font-bold text-white text-xl">{formatPrice(retinalProduct.price)}</div>
            <button onClick={onAddToCart} className="text-xs text-purple-400 font-bold hover:text-purple-300">AÑADIR +</button>
          </div>
        </div>

        {/* Tier 2 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-purple-500/30 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-purple-900 text-[8px] px-2 py-1 text-purple-200 uppercase font-bold">Piel Seca</div>
          <div>
            <h3 className="font-bold text-white">{protocoloNoche.name}</h3>
            <p className="text-xs text-slate-500">{protocoloNoche.description}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-white text-xl">{formatPrice(protocoloNoche.price)}</div>
            <button onClick={onNavigateToProtocols} className="text-xs text-purple-400 font-bold hover:text-purple-300 mr-2">VER DETALLES</button>
            <button onClick={onAddToCart} className="text-xs text-purple-400 font-bold hover:text-purple-300">AÑADIR +</button>
          </div>
        </div>

        {/* Tier 3 (HERO) */}
        <div className="bg-gradient-to-b from-purple-900/40 to-slate-900 p-8 rounded-2xl border-2 border-purple-500 relative transform scale-105 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20 pointer-events-none">
            <div className="absolute top-6 -right-10 w-40 bg-gradient-to-r from-purple-500 to-pink-600 text-white transform rotate-45 text-center text-[10px] font-bold py-1.5 shadow-lg tracking-widest uppercase border-b border-white/20">
              Mejor Valor
            </div>
          </div>
          <div className="text-center mb-6 mt-2 relative z-10">
            <h3 className="text-2xl font-bold text-white mb-1">{protocoloLongevidad.name}</h3>
            <div className="flex justify-center items-center gap-3">
              {protocoloLongevidad.originalPrice && <span className="text-slate-500 line-through text-sm">{formatPrice(protocoloLongevidad.originalPrice)}</span>}
              <span className="text-3xl font-bold text-white">{formatPrice(protocoloLongevidad.price)}</span>
            </div>
          </div>
          <ul className="space-y-3 mb-8 relative z-10">
            {protocoloLongevidad.productsIncluded.map((productId: string, i: number) => {
                const product = productsData.products.find((p: ProductItem) => p.id === productId);
                const other = productsData.others.find((o: OtherItem) => o.id === productId);
                const itemName = product ? (product.id === 'chronos-c-shield' ? `${product.name} (Noche)` : `${product.name} (Noche)`) : (other ? `${other.name} (Gratis)` : 'Unknown Product'); // Adjust for (Noche) and (Gratis)
                return (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <Check size={16} className="text-purple-500" /> {itemName}
                    </li>
                );
            })}
            <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-purple-500" /> Dejar 15 min entre aplicaciones</li>
            <li className="flex items-center gap-2 text-sm text-purple-300 font-bold"><Sparkles size={16} /> Envío Gratis + Guía PDF</li>
          </ul>
          <Button onClick={onNavigateToProtocol} fullWidth className="bg-purple-600 hover:bg-purple-500 border-0 relative z-10">
            {protocoloLongevidad.ctaText} <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};
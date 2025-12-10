import React, { useEffect } from 'react';
import { Button } from './Button';
import { Sun, Moon, Sparkles, Droplets, Shield, Zap } from 'lucide-react';
import { ProductData } from '../types';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

interface Props {
  productsData: ProductData;
}

const ProtocolsScreen: React.FC<Props> = ({ productsData }) => {
  const { addToCart } = useCart();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const protocoloDia = productsData.protocols.find(p => p.id === 'protocolo-dia');
  const protocoloNoche = productsData.protocols.find(p => p.id === 'protocolo-noche');
  const protocoloLongevidad = productsData.protocols.find(p => p.id === 'protocolo-longevidad');
  const protocoloUniversal = productsData.protocols.find(p => p.id === 'protocolo-universal');

  const hydroLockProduct = productsData.products.find(p => p.id === 'hydro-lock-serum');
  const invisibleShieldProduct = productsData.products.find(p => p.id === 'invisible-shield-spf');
  const retinalProduct = productsData.products.find(p => p.id === 'infinity-retinal');
  const chronosCProduct = productsData.products.find(p => p.id === 'chronos-c-shield');
  // Need to handle missing data gracefully, or ensure it exists

  if (!protocoloDia || !protocoloNoche || !protocoloLongevidad || !protocoloUniversal ||
      !hydroLockProduct || !invisibleShieldProduct || !retinalProduct || !chronosCProduct) {
    return <div>Error: Protocol data not found.</div>;
  }



  return (
    <div className="bg-slate-50 min-h-screen font-sans animate-fade-in">
      <header className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Protocolos de Sinergia Clínica
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Nuestras rutinas están diseñadas para trabajar en conjunto, optimizando los ciclos biológicos de tu piel para una máxima eficacia. Menos productos, mejores resultados.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Protocolo Día */}
        <section id="protocolo-dia" className="p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <Sun className="text-amber-500" />
                <h2 className="text-3xl font-bold text-slate-900">{protocoloDia.name}</h2>
              </div>
              <p className="text-slate-600 mb-6">
                {protocoloDia.description}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><Droplets className="text-cyan-500" /> {hydroLockProduct.name}</li>
                <li className="flex items-center gap-3"><Shield className="text-yellow-500" /> {invisibleShieldProduct.name}</li>
              </ul>
              <div className="bg-slate-100 p-4 rounded-lg flex items-center justify-between">
                <div>
                  {protocoloDia.originalPrice && <span className="text-slate-500 text-sm line-through">{formatPrice(protocoloDia.originalPrice)}</span>}
                  <div className="text-2xl font-bold text-slate-900">{formatPrice(protocoloDia.price)}</div>
                </div>
                <Button onClick={() => addToCart(protocoloDia, 1)}>{protocoloDia.ctaText}</Button>
              </div>
            </div>
            <div className="hidden md:block h-64 bg-gradient-to-br from-cyan-50 to-amber-50 rounded-xl">
              {/* Visual representation */}
            </div>
          </div>
        </section>

        {/* Protocolo Noche */}
        <section id="protocolo-noche" className="p-8 bg-slate-900 text-white rounded-2xl shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 mb-4">
                <Moon className="text-purple-400" />
                <h2 className="text-3xl font-bold">{protocoloNoche.name}</h2>
              </div>
              <p className="text-slate-300 mb-6">
                {protocoloNoche.description}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><Zap className="text-purple-400" /> {retinalProduct.name}</li>
                <li className="flex items-center gap-3"><Sparkles className="text-orange-400" /> {chronosCProduct.name}</li>
              </ul>
               <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
                <div>
                  {protocoloNoche.originalPrice && <span className="text-slate-500 text-sm line-through">{formatPrice(protocoloNoche.originalPrice)}</span>}
                  <div className="text-2xl font-bold text-white">{formatPrice(protocoloNoche.price)}</div>
                </div>
                <Button onClick={() => addToCart(protocoloNoche, 1)} variant="secondary" className="bg-purple-600 hover:bg-purple-500">{protocoloNoche.ctaText}</Button>
              </div>
            </div>
            <div className="order-1 md:order-2 hidden md:block h-64 bg-gradient-to-br from-purple-900 to-slate-800 rounded-xl">
              {/* Visual representation */}
            </div>
          </div>
        </section>

        {/* Protocolo Longevidad */}
        <section id="protocolo-longevidad" className="p-8 bg-slate-800 text-white rounded-2xl shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="text-orange-400" />
                <h2 className="text-3xl font-bold">{protocoloLongevidad.name}</h2>
              </div>
              <p className="text-slate-300 mb-6">
                {protocoloLongevidad.description}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><Zap className="text-purple-400" /> {retinalProduct.name}</li>
                <li className="flex items-center gap-3"><Sun className="text-orange-400" /> {chronosCProduct.name}</li>
              </ul>
               <div className="bg-slate-700 p-4 rounded-lg flex items-center justify-between">
                <div>
                  {protocoloLongevidad.originalPrice && <span className="text-slate-500 text-sm line-through">{formatPrice(protocoloLongevidad.originalPrice)}</span>}
                  <div className="text-2xl font-bold text-white">{formatPrice(protocoloLongevidad.price)}</div>
                </div>
                <Button onClick={() => addToCart(protocoloLongevidad, 1)} variant="secondary" className="bg-orange-600 hover:bg-orange-500">{protocoloLongevidad.ctaText}</Button>
              </div>
            </div>
            <div className="order-1 md:order-2 hidden md:block h-64 bg-gradient-to-br from-orange-800 to-slate-700 rounded-xl">
              {/* Visual representation */}
            </div>
          </div>
        </section>

        {/* Protocolo Universal */}
        <section id="protocolo-universal" className="p-8 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-2xl shadow-2xl transform scale-105">
          <div className="text-center">
             <div className="inline-flex items-center gap-2 mb-4 text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                <Sparkles size={14} /> {protocoloUniversal.tagline}
             </div>
            <h2 className="text-4xl font-bold mb-4">{protocoloUniversal.name}</h2>
            <p className="max-w-2xl mx-auto mb-8">
              {protocoloUniversal.description}
            </p>
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl max-w-lg mx-auto flex items-center justify-between">
              <div>
                {protocoloUniversal.originalPrice && <span className="text-white/70 text-sm line-through">{formatPrice(protocoloUniversal.originalPrice)}</span>}
                <div className="text-3xl font-bold text-white">{formatPrice(protocoloUniversal.price)}</div>
              </div>
              <Button onClick={() => addToCart(protocoloUniversal, 1)} size="lg" className="bg-white text-slate-900 hover:bg-slate-200">
                {protocoloUniversal.ctaText}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProtocolsScreen;
import React from 'react';
import { Button } from '../Button';
import { ProductData } from '../../types'; // Import ProductData
import { formatPrice } from '../../utils/formatPrice'; // Import formatPrice

interface HydroLockMobileCtaProps {
  onAddToCart: (productId: string, quantity: number) => void;
  productsData: ProductData;
}

export const HydroLockMobileCta: React.FC<HydroLockMobileCtaProps> = ({ onAddToCart, productsData }) => {
  const hydroLockProduct = productsData.products.find(p => p.id === 'hydro-lock-serum');

  if (!hydroLockProduct) {
    return <div>Error: Hydro-Lock product data not found.</div>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden z-50 flex items-center justify-between safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div>
        <div className="text-[10px] text-slate-400 uppercase tracking-wider">{hydroLockProduct.name}</div>
        <div className="text-xl font-bold text-slate-900">{formatPrice(hydroLockProduct.mobileCtaPrice || '0')}</div>
      </div>
      <Button onClick={() => onAddToCart(hydroLockProduct.id, 1)} className="py-3 px-8 bg-cyan-500 hover:bg-cyan-600 text-white border-0 shadow-lg shadow-cyan-200">
        AÑADIR
      </Button>
    </div>
  );
};
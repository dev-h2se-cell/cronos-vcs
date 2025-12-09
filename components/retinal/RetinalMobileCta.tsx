import React from 'react';
import { Button } from '../Button';
import { ProductData } from '../../types'; // Import ProductData
import { formatPrice } from '../../utils/formatPrice'; // Import formatPrice

interface RetinalMobileCtaProps {
  onAddToCart: () => void;
  productsData: ProductData; // Added
}

export const RetinalMobileCta: React.FC<RetinalMobileCtaProps> = ({ onAddToCart, productsData }) => {
  const retinalProduct = productsData.products.find(p => p.id === 'infinity-retinal');

  if (!retinalProduct) {
    return <div>Error: Retinal product data not found.</div>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 md:hidden z-50 flex items-center justify-between safe-area-bottom">
      <div>
        <div className="text-[10px] text-slate-400 uppercase tracking-wider">{retinalProduct.name}</div>
        <div className="text-xl font-bold text-white">{formatPrice(retinalProduct.mobileCtaPrice || '0')}</div>
      </div>
      <Button onClick={onAddToCart} className="py-3 px-8 bg-purple-600 border-0">
        AÑADIR
      </Button>
    </div>
  );
};
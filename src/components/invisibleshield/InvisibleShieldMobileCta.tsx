import React from 'react';
import { Button } from '../Button';
import { ProductData } from '../../types'; // Import ProductData
import { formatPrice } from '../../utils/formatPrice'; // Import formatPrice

interface InvisibleShieldMobileCtaProps {
  onAddToCart: () => void;
  productsData: ProductData; // Added
}

export const InvisibleShieldMobileCta: React.FC<InvisibleShieldMobileCtaProps> = ({ onAddToCart, productsData }) => {
  const invisibleShieldProduct = productsData.products.find(p => p.id === 'invisible-shield-spf');

  if (!invisibleShieldProduct) {
    return <div>Error: Invisible Shield product data not found.</div>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden z-50 flex items-center justify-between safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div>
        <div className="text-[10px] text-slate-400 uppercase tracking-wider">{invisibleShieldProduct.name}</div>
        <div className="text-xl font-bold text-slate-900">{formatPrice(invisibleShieldProduct.mobileCtaPrice || '0')}</div>
      </div>
      <Button onClick={onAddToCart} className="py-3 px-8 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0 shadow-lg shadow-yellow-200">
        AÑADIR
      </Button>
    </div>
  );
};
// utils/formatPrice.ts
export const formatPrice = (price: string | number | null | undefined): string => {
  // If price is falsy (null, undefined, 0, ''), default to '0'
  const priceAsString = String(price || '0');
  
  // Remove dots for thousands separators before parsing
  const numericPrice = parseFloat(priceAsString.replace(/\./g, ''));
  
  if (isNaN(numericPrice)) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(0);
  }

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericPrice);
};
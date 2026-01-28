// utils/formatPrice.ts
export const formatPrice = (price: string | number | null | undefined): string => {
  // If price is falsy (null, undefined, 0, ''), default to '0'
  const priceAsString = String(price || '0');

  // Remove dots for thousands separators before parsing
  const numericPrice = parseFloat(priceAsString.replace(/\./g, ''));

  if (isNaN(numericPrice)) {
    return '0 COP';
  }

  // Formato: 95.000 COP
  const formatted = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericPrice);

  return `${formatted} COP`;
};
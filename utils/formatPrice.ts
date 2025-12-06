// utils/formatPrice.ts
export const formatPrice = (price: string): string => {
  const numericPrice = parseFloat(price.replace(/\./g, '')); // Remove dots before parsing
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericPrice);
};
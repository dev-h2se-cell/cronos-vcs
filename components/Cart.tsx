import React from 'react';
import { X, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { Button } from './Button';
import { useCart } from '../context/CartContext'; // Import useCart

const formatPrice = (price: number | string) => {
  // Ensure price is a number for formatting
  const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/\./g, '')) : price;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(numericPrice);
};

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/\./g, '')) : item.price;
    return acc + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const phoneNumber = '573181436525'; // Replace with your WhatsApp number
    let message = "¡Hola! Me gustaría hacer un pedido:\n\n";

    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${formatPrice(item.price)})\n`;
    });

    message += `\nTotal: ${formatPrice(subtotal)}\n\n`;
    message += "Por favor, ayúdame a finalizar la compra. ¡Gracias!";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Optionally clear the cart after redirection
    clearCart();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-[90vw] max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">Tu Carrito</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-500">{formatPrice(item.price)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-slate-200 rounded">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-slate-500 hover:bg-slate-100">
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-slate-500 hover:bg-slate-100">
                          <Plus size={16} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <ShoppingCart size={48} className="text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700">Tu carrito está vacío</h3>
              <p className="text-slate-500 mt-2">Añade productos para verlos aquí.</p>
            </div>
          )}

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-slate-800">Subtotal:</span>
                <span className="text-xl font-bold text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <Button onClick={handleCheckout} fullWidth>
                Finalizar Pedido por WhatsApp
              </Button>
              <p className="text-xs text-slate-500 text-center mt-3">
                Serás redirigido a WhatsApp para confirmar tu pedido con un asesor.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

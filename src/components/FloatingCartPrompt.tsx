
import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

interface FloatingCartPromptProps {
    onOpenCart: () => void;
}

const FloatingCartPrompt: React.FC<FloatingCartPromptProps> = ({ onOpenCart }) => {
    const { cartItems } = useCart();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => {
        // Clean price string and parse (remove everything except digits)
        const rawPrice = parseFloat(String(item.price).replace(/[^0-9]/g, '')) || 0;
        return sum + (rawPrice * item.quantity);
    }, 0);

    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
            <button
                onClick={onOpenCart}
                className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 hover:scale-105 transition-transform duration-300 border border-slate-700/50"
            >
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <ShoppingBag size={20} className="text-orange-400" />
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-xs text-slate-400 font-medium">Total Estimado</span>
                        <span className="font-bold text-sm tracking-wide">{formatPrice(totalPrice)}</span>
                    </div>
                </div>

                <div className="h-8 w-[1px] bg-slate-700 mx-2"></div>

                <div className="flex items-center gap-2 font-bold text-sm text-orange-400">
                    Ver Bolsa
                    <ArrowRight size={16} />
                </div>
            </button>
        </div>
    );
};

export default FloatingCartPrompt;


import React, { useState, useEffect } from 'react';
import { ProductData, ProductItem } from '../types';
import { ShoppingBag, Plus, Minus, ArrowRight, Star, Sun, Moon, Zap } from 'lucide-react';
import { productService } from '../services/productService';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

interface ShopScreenProps {
    productsData: ProductData;
    onNavigateToProtocol: () => void; // Optional redirect
    onNavigateToProduct: (view: any) => void;
    onOpenCart: () => void;
}

const ShopScreen: React.FC<ShopScreenProps> = ({ productsData, onNavigateToProduct, onNavigateToProtocol, onOpenCart }) => {
    const { addToCart } = useCart();

    // Builder State: { 'product-id': quantity }
    const [builderState, setBuilderState] = useState<Record<string, number>>({});
    const [matrix, setMatrix] = useState<any>({ discount: 0, level: 'Standard', totalCount: 0 });
    const [builderTotal, setBuilderTotal] = useState(0);
    const [builderOriginalTotal, setBuilderOriginalTotal] = useState(0);

    // Initialize builder state with 0 for all products
    useEffect(() => {
        const initial: Record<string, number> = {};
        productsData.products.forEach(p => initial[p.id] = 0);
        setBuilderState(prev => (Object.keys(prev).length === 0 ? initial : prev));
    }, [productsData.products]);

    // Recalculate logic whenever state changes
    useEffect(() => {
        // Flatten selected products for the matrix calculator
        const selectedProducts: ProductItem[] = [];
        let rawTotal = 0;

        Object.entries(builderState).forEach(([id, qty]) => {
            const product = productsData.products.find(p => p.id === id);
            if (product) {
                for (let i = 0; i < qty; i++) {
                    selectedProducts.push(product);
                    rawTotal += parseFloat(product.price.replace(/\./g, '')) || 0;
                }
            }
        });

        const calculatedMatrix = productService.calculateRoutineMatrix(selectedProducts);
        setMatrix(calculatedMatrix);
        setBuilderOriginalTotal(rawTotal);
        setBuilderTotal(Math.floor(rawTotal * (1 - calculatedMatrix.discount)));

    }, [builderState, productsData.products]);


    const updateQty = (id: string, delta: number) => {
        setBuilderState(prev => {
            const current = prev[id] || 0;
            const next = Math.max(0, current + delta);
            return { ...prev, [id]: next };
        });
    };

    const handleAddRoutineToCart = () => {
        if (matrix.totalCount === 0) return;

        // Add each item individually to the cart context
        // Ideally, the cart context would support adding a "Bundle" but for now we aggregate
        Object.entries(builderState).forEach(([id, qty]) => {
            const product = productsData.products.find(p => p.id === id);
            if (product && qty > 0) {
                // En un mundo ideal, pasamos el descuento al carrito.
                // Por la arquitectura actual, agregamos items. 
                // TODO: Futuro -> Pasarle un flag de 'Bundle Discount' al cart.
                // Por ahora, añadimos los items. El usuario verá el precio en el checkout si lo implementamos, 
                // pero para MVP visual, agregamos items.
                for (let i = 0; i < qty; i++) addToCart(product, 1);
            }
        });

        // Reset builder? No, keep it.
        onOpenCart(); // ✨ Feedback Inmediato: Abrir carrito
    };

    // Helper to resolve view name from product ID
    const resolveView = (id: string) => {
        if (id.includes('hydro')) return 'hydrolock';
        if (id.includes('shield')) return 'shield';
        if (id.includes('retin')) return 'infinity';
        return 'chronos';
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">

            {/* --- HERO: ROUTINE BUILDER --- */}
            <section className="relative pt-28 pb-16 px-6 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2670&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />

                <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    {/* Left: Headline & Progress */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wider mb-6">
                            <Zap size={12} fill="currentColor" />
                            ALPHA BUILDER
                        </div>
                        <h1 className="text-4xl md:text-6xl font-sans font-bold mb-6 leading-tight">
                            Diseña tu <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-500">
                                Rutina Perfecta.
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 max-w-md">
                            Selecciona tus esenciales. Desbloquea descuentos progresivos automáticamente.
                        </p>

                        {/* Discount Progress Bar */}
                        <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-md border border-slate-700/50 mb-8">
                            <div className="flex justify-between text-sm mb-2 font-medium">
                                <span className={matrix.discount >= 0.1 ? "text-orange-400" : "text-slate-500"}>10%</span>
                                <span className={matrix.discount >= 0.15 ? "text-orange-400" : "text-slate-500"}>15%</span>
                                <span className={matrix.discount >= 0.25 ? "text-orange-400" : "text-slate-500"}>25%</span>
                                <span className={matrix.discount >= 0.35 ? "text-orange-400" : "text-slate-500"}>35%</span>
                            </div>
                            <div className="h-3 bg-slate-700 rounded-full overflow-hidden relative">
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-700 ease-out"
                                    style={{ width: `${(matrix.discount / 0.35) * 100}%` }}
                                />
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <div className="text-xs text-slate-400">
                                    {matrix.discount === 0 && "Agrega productos para desbloquear descuentos."}
                                    {matrix.discount === 0.10 && "¡Bien! Tienes 10%. Tip: Combina Día y Noche para subir a 15%."}
                                    {matrix.discount === 0.15 && "✨ ¡Sinergia Activada (15%)! Agrega un 3ro para el 25%."}
                                    {matrix.discount === 0.25 && "¡Casi! Estás a 1 producto del nivel Alpha (35%)."}
                                    {matrix.discount === 0.35 && "🔥 ¡Nivel Máximo Alcanzado!"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Selector */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
                        <div className="space-y-4">
                            {productsData.products.map(product => (
                                <div key={product.id} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 transition-colors group">
                                    {/* Product Info */}
                                    <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => onNavigateToProduct(resolveView(product.id))}>
                                        <img src={product.image400w} alt={product.name} className="w-12 h-12 rounded-md object-cover bg-slate-700" />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                {product.usage === 'AM' && <Sun size={12} className="text-amber-400" />}
                                                {product.usage === 'PM' && <Moon size={12} className="text-purple-400" />}
                                                <h3 className="font-bold text-slate-100 text-sm">{product.name}</h3>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-0.5">{formatPrice(product.price)}</p>
                                        </div>
                                    </div>

                                    {/* Counter */}
                                    <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-1 border border-slate-700">
                                        <button
                                            onClick={() => updateQty(product.id, -1)}
                                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-4 text-center font-bold text-sm">{builderState[product.id] || 0}</span>
                                        <button
                                            onClick={() => updateQty(product.id, 1)}
                                            className="w-8 h-8 flex items-center justify-center text-orange-400 hover:bg-orange-500/20 rounded-md transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total & CTA */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex justify-between items-end mb-4">
                                <div className="text-slate-400 text-sm">Tu Inversión</div>
                                <div className="text-right">
                                    {matrix.discount > 0 && (
                                        <div className="text-slate-500 text-sm line-through mb-1">
                                            {formatPrice(builderOriginalTotal)}
                                        </div>
                                    )}
                                    <div className="text-3xl font-bold text-white flex items-center gap-2 justify-end">
                                        {formatPrice(builderTotal)}
                                        {matrix.discount > 0 && (
                                            <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                                                -{Math.round(matrix.discount * 100)}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleAddRoutineToCart}
                                disabled={matrix.totalCount === 0}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                    ${matrix.totalCount > 0
                                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transform hover:-translate-y-1'
                                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                            >
                                <ShoppingBag size={18} />
                                {matrix.totalCount > 0 ? 'Agregar Rutina al Carrito' : 'Selecciona Productos'}
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- SEPARATOR --- */}
            <div className="w-full h-24 bg-gradient-to-b from-slate-900 to-slate-50" />

            {/* --- EXPERT KITS GRID --- */}
            <section className="px-6 pb-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Protocolos Expertos</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        ¿Prefieres no pensar? Elige uno de nuestros kits pre-configurados diseñados por dermatólogos.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productsData.protocols.map(protocol => (
                        <div key={protocol.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={protocol.image}
                                    alt={protocol.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                                    {protocol.ctaText.includes('%') ? protocol.ctaText.match(/-(\d+)%/)?.[0] : 'KIT'}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-slate-900 mb-1">{protocol.name}</h3>
                                <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider">{protocol.tagline}</p>

                                <div className="flex justify-between items-center mt-6">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 line-through">{formatPrice(protocol.originalPrice || 0)}</span>
                                        <span className="font-bold text-slate-900 text-lg">{formatPrice(protocol.price)}</span>
                                    </div>
                                    <button
                                        className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
                                        // In a real app we would add the bundle. Here we assume the user navigates or adds.
                                        // For MVP, navigate to Kits tab or just nothing (visual only as requested "Home")
                                        onClick={onNavigateToProtocol}
                                    >
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default ShopScreen;

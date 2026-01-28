
import { supabase } from '../lib/supabase';
import { ProductItem, ProtocolItem, OtherItem } from '../types';

export const productService = {
    /**
     * Obtiene los productos de Supabase filtrados para Cronos
     */
    async getProducts(): Promise<ProductItem[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', 'COSMÉTICA');

        if (error) {
            console.error('Error fetching products from Supabase:', error);
            return [];
        }

        const mapped = (data || []).map((item: any) => {
            // Mapeo Maestro de IDs para compatibilidad con UI Cronos
            const nameLower = item.name.toLowerCase();
            let mappedId = String(item.id);
            let defaultBenefits: string[] = [];
            let usage: 'AM' | 'PM' | 'BOTH' = 'BOTH';

            if (nameLower.includes('vitamina c')) {
                mappedId = 'chronos-c-shield';
                defaultBenefits = ['Estabilidad Total', 'Luminosidad', 'Antioxidante'];
                usage = 'PM'; // User requested: Noche
            } else if (nameLower.includes('retin')) {
                mappedId = 'infinity-retinal';
                defaultBenefits = ['Regeneración', 'Cero Irritación', 'Alta Potencia'];
                usage = 'PM'; // User requested: Noche
            } else if (nameLower.includes('hydro') || nameLower.includes('hialur')) {
                mappedId = 'hydro-lock-serum';
                defaultBenefits = ['Hidratación 5D', 'Absorción 5s', 'Zero-Pilling'];
                usage = 'AM'; // User requested: Día
            } else if (nameLower.includes('shield') || nameLower.includes('protector')) {
                mappedId = 'invisible-shield-spf';
                defaultBenefits = ['SPF 50+', 'Filtro Híbrido', 'Toque Seco'];
                usage = 'AM'; // User requested: Día
            }

            return {
                id: mappedId,
                name: item.name,
                tagline: item.description?.substring(0, 60) || 'Cuidado avanzado',
                type: 'individual',
                price: String(item.price), // Enviamos crudo para que formatPrice haga su magia
                currency: 'COP',
                description: item.description || '',
                longDescription: item.description || '',
                benefits: (item.active_ingredients && item.active_ingredients.length > 0) ? item.active_ingredients : defaultBenefits,
                size: '50ml',
                image: item.image_url || 'https://placehold.co/800x800/slate/white?text=Cronos+Product',
                image400w: item.image_url || 'https://placehold.co/400x400/slate/white?text=Cronos+Product',
                image800w: item.image_url || 'https://placehold.co/800x800/slate/white?text=Cronos+Product',
                usage: usage
            };
        }) as ProductItem[];



        console.log('[ProductService] Mapped Raw Products:', mapped.map(p => ({ id: p.id, name: p.name, price: p.price, usage: p.usage })));
        return mapped;
    },

    /**
     * Lógica Central de Descuentos (The Alpha Algorithm)
     * Reutilizable para el Builder del Frontend y los Kits del Backend.
     */
    calculateRoutineMatrix(products: ProductItem[]) {
        const countAM = products.filter(p => p.usage === 'AM').length;
        const countPM = products.filter(p => p.usage === 'PM').length;
        const totalCount = products.length;

        let discount = 0;
        let level = 'Standard';

        if (totalCount >= 4) {
            discount = 0.35; // Nivel 3: Alpha Total
            level = 'Alpha Total';
        } else if (totalCount === 3 && (countAM >= 2 || countPM >= 2)) {
            discount = 0.25; // Nivel 2: Trío Inteligente
            level = 'Smart Trio';
        } else if (totalCount === 2 && countAM === 1 && countPM === 1) {
            discount = 0.15; // Nivel 1.5: Sinergia Día/Noche
            level = 'Day & Night Synergy';
        } else if (totalCount === 2 && (countAM >= 2 || countPM >= 2)) {
            discount = 0.10; // Nivel 1: Par Perfecto
            level = 'Perfect Pair';
        }

        return { discount, level, countAM, countPM, totalCount };
    },

    /**
     * Obtiene protocolos (bundles) con lógica de up-sell dinámica
     */
    async getProtocols(availableProducts: ProductItem[]): Promise<ProtocolItem[]> {
        const formatter = new Intl.NumberFormat('es-CO', { minimumFractionDigits: 0 });

        // Motor de Reglas de Up-Sell (Definición de Kits)
        const rules = [
            {
                id: 'protocolo-dia',
                name: 'Defense Protocol (Día)',
                tagline: 'Protección y luminosidad diaria',
                products: ['hydro-lock-serum', 'invisible-shield-spf'],
                desc: 'La combinación perfecta de hidratación y escudo FPS.',
                img: 'https://images.unsplash.com/photo-1556228720-1987ba42a67d?auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'protocolo-noche',
                name: 'Repair Protocol (Noche)',
                tagline: 'Sistema nocturno regenerativo',
                products: ['infinity-retinal', 'chronos-c-shield'],
                desc: 'Reparación intensiva mientras duermes con Vitamina C y Retinal.',
                img: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'protocolo-universal',
                name: 'The Universal Core™',
                tagline: 'Esenciales Bio-Tech para todo tipo de piel',
                products: ['chronos-c-shield', 'invisible-shield-spf', 'hydro-lock-serum'],
                desc: 'Los pilares de la salud dermatológica. Simple, potente, esencial.',
                img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'protocolo-longevidad',
                name: 'Longevity Protocol™',
                tagline: 'El sistema definitivo de 24 horas',
                products: ['hydro-lock-serum', 'invisible-shield-spf', 'infinity-retinal', 'chronos-c-shield'],
                desc: 'Todo lo que tu piel necesita en un solo kit: Hidratación, Protección y Reparación.',
                img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
            }
        ];

        return rules.map(rule => {
            const included = availableProducts.filter(p => rule.products.includes(p.id));

            // Usamos la matriz centralizada
            const matrix = this.calculateRoutineMatrix(included);
            const calculatedDiscount = matrix.discount;

            const originalPriceTotal = included.reduce((sum, p) => sum + (parseFloat(p.price.replace(/\./g, '')) || 0), 0);
            const discountedPrice = Math.floor(originalPriceTotal * (1 - calculatedDiscount));

            return {
                id: rule.id,
                name: rule.name,
                tagline: rule.tagline,
                type: 'bundle' as const,
                price: String(discountedPrice), // Crudo
                originalPrice: String(originalPriceTotal), // Crudo
                currency: 'COP',
                description: rule.desc,
                productsIncluded: rule.products,
                ctaText: calculatedDiscount > 0
                    ? `Obtener Kit (-${Math.round(calculatedDiscount * 100)}%)`
                    : 'Obtener Kit',
                image: rule.img
            };
        });
    },

    /**
     * Obtiene otros ítems (misceláneos) requeridos por la UI
     */
    async getOthers(): Promise<OtherItem[]> {
        return [
            {
                id: 'guia-skin-streaming',
                name: 'Guía Skin-Streaming (PDF)',
                details: 'Manual optimizado para maximizar la absorción de tus productos Cronos.',
                price: '45000',
                currency: 'COP',
                type: 'digital'
            },
            {
                id: 'shipping',
                name: 'Envío VIP',
                details: 'Envío prioritario con seguro incluido.',
                price: '15000',
                currency: 'COP',
                threshold: '250000'
            }
        ];
    }
};

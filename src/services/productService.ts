
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

        return data.map((item: any) => {
            let mappedId = String(item.id);
            const nameLower = item.name.toLowerCase();

            // Mapeo Maestro de IDs para compatibilidad con UI Cronos
            if (nameLower.includes('vitamina c')) mappedId = 'chronos-c-shield';
            else if (nameLower.includes('retin')) mappedId = 'infinity-retinal';
            else if (nameLower.includes('hydrolock') || nameLower.includes('hialurónico')) mappedId = 'hydro-lock-serum';
            else if (nameLower.includes('shield') || nameLower.includes('protector')) mappedId = 'invisible-shield-spf';

            return {
                id: mappedId,
                name: item.name,
                tagline: item.description?.substring(0, 60) || 'Cuidado avanzado',
                type: 'individual',
                price: String(item.price),
                currency: 'COP',
                description: item.description || '',
                longDescription: item.description || '',
                benefits: item.active_ingredients || [],
                size: '50ml',
                image: item.image_url || 'https://placehold.co/800x800/slate/white?text=Cronos+Product',
                image400w: item.image_url || 'https://placehold.co/400x400/slate/white?text=Cronos+Product',
                image800w: item.image_url || 'https://placehold.co/800x800/slate/white?text=Cronos+Product'
            };
        }) as ProductItem[];
    },

    /**
     * Obtiene protocolos (bundles) con IDs compatibles
     */
    async getProtocols(_availableProducts: ProductItem[]): Promise<ProtocolItem[]> {
        return [
            {
                id: 'protocolo-dia',
                name: 'Defense Protocol (Día)',
                tagline: 'Protección y luminosidad diaria',
                type: 'bundle',
                price: '140.000',
                originalPrice: '165.000',
                currency: 'COP',
                description: 'La combinación perfecta de hidratación y escudo FPS.',
                productsIncluded: ['hydro-lock-serum', 'invisible-shield-spf'],
                ctaText: 'Comprar Protocolo Día',
                image: 'https://images.unsplash.com/photo-1556228720-1987ba42a67d?auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'protocolo-noche',
                name: 'Repair Protocol (Noche)',
                tagline: 'Sistema nocturno regenerativo',
                type: 'bundle',
                price: '180.000',
                originalPrice: '205.000',
                currency: 'COP',
                description: 'Reparación intensiva mientras duermes con Vitamina C y Retinal.',
                productsIncluded: ['infinity-retinal', 'chronos-c-shield'],
                ctaText: 'Comprar Protocolo Noche',
                image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'protocolo-longevidad',
                name: 'Longevity Protocol™',
                tagline: 'El sistema definitivo de 24 horas',
                type: 'bundle',
                price: '345.000',
                originalPrice: '420.000',
                currency: 'COP',
                description: 'Todo lo que tu piel necesita en un solo kit: Hidratación, Protección y Reparación.',
                productsIncluded: ['hydro-lock-serum', 'invisible-shield-spf', 'infinity-retinal', 'chronos-c-shield'],
                ctaText: 'Obtener Mi Kit de Longevidad',
                image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'protocolo-universal',
                name: 'The Universal Core™',
                tagline: 'Esenciales Bio-Tech para todo tipo de piel',
                type: 'bundle',
                price: '210.000',
                originalPrice: '240.000',
                currency: 'COP',
                description: 'Los pilares de la salud dermatológica. Simple, potente, esencial.',
                productsIncluded: ['chronos-c-shield', 'invisible-shield-spf', 'hydro-lock-serum'],
                ctaText: 'Comprar Core Universal',
                image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80'
            }
        ];
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
                price: '45.000',
                currency: 'COP',
                type: 'digital'
            },
            {
                id: 'shipping',
                name: 'Envío VIP',
                details: 'Envío prioritario con seguro incluido.',
                price: '15.000',
                currency: 'COP',
                threshold: '250.000'
            }
        ];
    }
};

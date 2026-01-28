
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function seedHydroProduct() {
    console.log('🌱  Sembrando producto faltante (Hydro-Lock) para Cronos...');

    const hydroProduct = {
        name: 'Hydro-Lock Serum (Hialurónico)',
        description: 'Complejo de hidratación profunda con 5 pesos moleculares de Ácido Hialurónico.',
        price: 95.00,
        stock: 45,
        category: 'COSMÉTICA',
        image_url: 'https://images.unsplash.com/photo-1556228720-1987ba42a67d?auto=format&fit=crop&w=500&q=80',
        active_ingredients: ['Ácido Hialurónico', 'B5', 'Ceramidas']
    };

    const { data, error } = await supabase
        .from('products')
        .insert(hydroProduct)
        .select();

    if (error) {
        console.error('❌ Error:', error);
    } else {
        console.log('✅ Éxito! Hydro-Lock insertado.');
        console.table(data);
    }
}

seedHydroProduct();

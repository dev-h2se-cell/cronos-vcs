
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function forceSeed() {
    console.log('🚀 Iniciando Siembra Forzada (Compatibilidad base)...');

    const hydro = {
        name: 'Hydro-Lock Serum (Hialurónico)',
        description: 'Matriz 5D de Ácido Hialurónico para hidratación profunda y cero pilling.',
        price: 95.00,
        stock: 100,
        category: 'COSMÉTICA',
        image_url: 'https://images.unsplash.com/photo-1556228720-1987ba42a67d?auto=format&fit=crop&w=800&q=80'
        // active_ingredients: [...] Removido temporalmente por falta de columna en Supabase
    };

    console.log('Intentando insertar Hydro-Lock...');
    const { data, error } = await supabase.from('products').insert(hydro).select();

    if (error) {
        console.error('❌ ERROR AL INSERTAR:', error);
    } else {
        console.log('✅ ÉXITO: Producto insertado corretamente.');
    }

    // Corregir Vitamina C
    console.log('Limpiando Vitamina C...');
    const { error: err2 } = await supabase
        .from('products')
        .update({
            name: 'Suero Vitamina C Alpha-THD',
            description: 'Antioxidante de alta potencia para luminosidad diaria.'
        })
        .ilike('name', '%Vitamina C%');

    if (err2) console.error('❌ Error limpiando Vitamina C:', err2);
    else console.log('✅ Vitamina C homogeneizada.');
}

forceSeed();

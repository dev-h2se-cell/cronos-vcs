
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function fixProducts() {
    console.log('🛠️  Corrigiendo catálogo en Supabase...');

    // 1. Limpiar el producto de Vitamina C (quitar el hialurónico del nombre si está unido)
    const { error: err1 } = await supabase
        .from('products')
        .update({ name: 'Suero Vitamina C (Alpha)', description: 'Potencia antioxidante pura. Vitamina C estable de grado clínico.' })
        .ilike('name', '%Vitamina C%');

    // 2. Asegurar que Hydro-Lock existe con nombre limpio
    const { data: existingHydro } = await supabase
        .from('products')
        .select('id')
        .ilike('name', '%Hydro%')
        .single();

    if (!existingHydro) {
        console.log('🆕 Insertando Hydro-Lock Serum...');
        await supabase.from('products').insert({
            name: 'Hydro-Lock Serum (Hialurónico)',
            description: 'Matriz 5D de Ácido Hialurónico para hidratación profunda y cero pilling.',
            price: 95.00,
            stock: 50,
            category: 'COSMÉTICA',
            image_url: 'https://images.unsplash.com/photo-1556228720-1987ba42a67d?auto=format&fit=crop&w=800&q=80',
            active_ingredients: ['5 Pesos de Ácido Hialurónico', 'B5', 'Ceramidas']
        });
    } else {
        console.log('✅ Hydro-Lock ya existe.');
        await supabase.from('products').update({
            name: 'Hydro-Lock Serum (Hialurónico)',
            description: 'Matriz 5D de Ácido Hialurónico para hidratación profunda y cero pilling.'
        }).eq('id', existingHydro.id);
    }

    console.log('🚀 Catálogo rectificado.');
}

fixProducts();

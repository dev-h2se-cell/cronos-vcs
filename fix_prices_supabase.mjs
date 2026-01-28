
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function fixPrices() {
    console.log('--- RE-SCALING PRICES TO COP ---');

    const updates = [
        { name: 'Hydro-Lock', price: 95000 },
        { name: 'Vitamina C', price: 85000 },
        { name: 'Retin', price: 110000 },
        { name: 'Shield', price: 75000 }
    ];

    for (const update of updates) {
        const { data, error } = await supabase
            .from('products')
            .update({ price: update.price })
            .ilike('name', `%${update.name}%`);

        if (error) {
            console.error(`Error updating ${update.name}:`, error);
        } else {
            console.log(`Updated ${update.name} to ${update.price} COP`);
        }
    }
}

fixPrices();

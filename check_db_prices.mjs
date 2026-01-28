
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkPrices() {
    const { data, error } = await supabase.from('products').select('name, price');
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('--- DATABASE PRICES ---');
    data.forEach(p => {
        console.log(`${p.name}: [${p.price}] (type: ${typeof p.price})`);
    });
}

checkPrices();

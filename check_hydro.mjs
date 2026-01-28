
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkHydro() {
    const { data, error } = await supabase.from('products').select('*').ilike('name', '%Hydro%');
    if (error) {
        console.error(error);
    } else {
        console.log('--- PRODUCTOS ENCONTRADOS CON "HYDRO" ---');
        console.log(JSON.stringify(data, null, 2));
    }
}

checkHydro();

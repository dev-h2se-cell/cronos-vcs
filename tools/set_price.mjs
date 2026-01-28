
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de entorno
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

// USO: node tools/set_price.mjs "Nombre Producto" NuevoPrecio
// Ejemplo: node tools/set_price.mjs "Hydro" 98000

async function setPrice() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log('⚠️  Uso: node tools/set_price.mjs "Nombre Parcial" Precio');
        console.log('   Ejemplo: node tools/set_price.mjs "Hydro" 98000');
        process.exit(1);
    }

    const productName = args[0];
    const newPrice = parseInt(args[1]);

    if (isNaN(newPrice)) {
        console.error('❌ El precio debe ser un número válido.');
        process.exit(1);
    }

    console.log(`🔍 Buscando productos que coincidan con "${productName}"...`);

    // 1. Buscar producto(s)
    const { data: products, error: searchError } = await supabase
        .from('products')
        .select('id, name, price')
        .ilike('name', `%${productName}%`);

    if (searchError) {
        console.error('Error buscando:', searchError.message);
        return;
    }

    if (!products || products.length === 0) {
        console.log('❌ No se encontraron productos.');
        return;
    }

    // 2. Actualizar cada uno
    for (const p of products) {
        console.log(`   -> Actualizando "${p.name}" de $${p.price} a $${newPrice}...`);

        const { error: updateError } = await supabase
            .from('products')
            .update({ price: newPrice })
            .eq('id', p.id);

        if (updateError) {
            console.error(`      ❌ Error: ${updateError.message}`);
        } else {
            console.log(`      ✅ ¡Precio actualizado correctamente!`);
        }
    }

    console.log('\n✨ Sincronización completa. El frontend y los Kits reflejarán el cambio automáticamente.');
}

setPrice();

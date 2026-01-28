
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function diagnoseProtocols() {
    console.log('🔍 Diagnóstico de Protocolos...\n');

    // 1. Fetch Products like Service
    const { data } = await supabase.from('products').select('*').eq('category', 'COSMÉTICA');

    // 2. Map Products
    const availableProducts = data.map((item) => {
        const nameLower = item.name.toLowerCase();
        let mappedId = String(item.id);
        let usage = 'BOTH';

        if (nameLower.includes('vitamina c')) {
            mappedId = 'chronos-c-shield';
            usage = 'PM';
        } else if (nameLower.includes('retin')) {
            mappedId = 'infinity-retinal';
            usage = 'PM';
        } else if (nameLower.includes('hydro') || nameLower.includes('hialur')) {
            mappedId = 'hydro-lock-serum';
            usage = 'AM';
        } else if (nameLower.includes('shield') || nameLower.includes('protector')) {
            mappedId = 'invisible-shield-spf';
            usage = 'AM';
        }

        return { id: mappedId, name: item.name, price: String(item.price), usage };
    });

    console.log(`✅ Productos Mapeados: ${availableProducts.length}`);
    availableProducts.forEach(p => console.log(`   - ${p.name} (${p.id}) [${p.usage}] $${p.price}`));

    // 3. Define Rules (All Kits)
    const rules = [
        {
            id: 'protocolo-dia',
            name: 'Defense Protocol (Día)',
            products: ['hydro-lock-serum', 'invisible-shield-spf']
        },
        {
            id: 'protocolo-noche',
            name: 'Repair Protocol (Noche)',
            products: ['infinity-retinal', 'chronos-c-shield']
        },
        {
            id: 'protocolo-universal',
            name: 'The Universal Core™',
            products: ['chronos-c-shield', 'invisible-shield-spf', 'hydro-lock-serum']
        },
        {
            id: 'protocolo-longevidad',
            name: 'Longevity Protocol™',
            products: ['hydro-lock-serum', 'invisible-shield-spf', 'infinity-retinal', 'chronos-c-shield']
        }
    ];

    // 4. Calculate Logic for EACH rule
    rules.forEach(rule => {
        const included = availableProducts.filter(p => rule.products.includes(p.id));

        console.log(`\n📦 Kit: ${rule.name}`);
        console.log(`   Productos esperados: ${rule.products.length}`);
        console.log(`   Productos encontrados: ${included.length}`);

        // Count Logic
        const countAM = included.filter(p => p.usage === 'AM').length;
        const countPM = included.filter(p => p.usage === 'PM').length;

        included.forEach(p => console.log(`      + ${p.name} ($${p.price}) [${p.usage}]`));

        const totalCount = included.length;
        let calculatedDiscount = 0;
        let discountLevel = "Ninguno";

        if (totalCount >= 4) {
            calculatedDiscount = 0.35;
            discountLevel = "Nivel 3 (Alpha Total)";
        } else if (totalCount === 3 && (countAM >= 2 || countPM >= 2)) {
            calculatedDiscount = 0.20;
            discountLevel = "Nivel 2 (Trío Inteligente)";
        } else if (totalCount === 2 && (countAM >= 2 || countPM >= 2)) {
            calculatedDiscount = 0.10;
            discountLevel = "Nivel 1 (Par Perfecto)";
        }

        const originalPriceTotal = included.reduce((sum, p) => sum + parseFloat(p.price), 0);
        const discountedPrice = Math.floor(originalPriceTotal * (1 - calculatedDiscount));

        console.log(`   📊 Lógica: AM=${countAM}, PM=${countPM}, Total=${totalCount} -> ${discountLevel}`);
        console.log(`   💰 Cálculos:`);
        console.log(`      Total Original: $${originalPriceTotal.toLocaleString('es-CO')}`);
        console.log(`      Descuento: ${(calculatedDiscount * 100)}%`);
        console.log(`      Precio Final: $${discountedPrice.toLocaleString('es-CO')}`);
    });
}

diagnoseProtocols();


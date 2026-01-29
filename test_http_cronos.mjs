
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ NO API KEY");
    process.exit(1);
}

async function testHttp() {
    console.log("🌐 Testing HTTP Raw Request...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
            console.error("❌ HTTP ERROR:", res.status, res.statusText);
            console.error(JSON.stringify(data, null, 2));
        } else {
            console.log("✅ API KEY VALIDA. Modelos disponibles:");
            data.models.forEach(m => {
                if (m.name.includes("gemini")) console.log(`- ${m.name}`);
            });
        }
    } catch (e) {
        console.error("❌ FETCH ERROR:", e);
    }
}

testHttp();

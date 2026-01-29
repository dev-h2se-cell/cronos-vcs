
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config({ path: '.env.local' });

async function testGemini() {
    console.log("🧪 Testing Cronos Gemini Config...");

    // 1. Check API Key
    const apiKey = process.env.GEMINI_API_KEY; // Nota: Cronos usa GEMINI_API_KEY en api/gemini.ts
    if (!apiKey) {
        console.error("❌ NO GEMINI_API_KEY found in .env.local");
        return;
    }
    console.log("✅ API Key found:", apiKey.substring(0, 5) + "...");

    // 2. Instantiate Client
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const modelName = 'gemini-2.5-flash';

        // DEBUG: List models first
        console.log("🔍 Listing available models for this Key...");
        // Hack: The SDK doesn't always expose listModels simply, so we try a direct fetch if needed, 
        // but let's try to proceed with generation first to see if it was a fluke.

        console.log(`🤖 Connecting to model: ${modelName}`);

        const model = genAI.getGenerativeModel({ model: modelName });

        // 3. Send Message
        console.log("📤 Sending 'Hola'...");
        const result = await model.generateContent("Hola, ¿estás operativo?");
        const response = await result.response;
        const text = response.text();

        console.log("✅ SUCCESS! Response received:");
        console.log(text);

    } catch (error) {
        console.error("❌ ERROR CONNECTING TO GEMINI:");
        console.error(error);
    }
}

testGemini();

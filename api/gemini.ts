/// <reference types="node" />
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// --- Configuration ---
// Pure HTTP implementation to avoid SDK compatibility issues in Serverless
const MODEL_ID = 'gemini-2.0-flash';
const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function (request: VercelRequest, response: VercelResponse) {
  // CORS Setup
  response.setHeader('Access-Control-Allow-Credentials', "true");
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (request.method === 'OPTIONS') return response.status(200).end();
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method Not Allowed' });

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return response.status(200).json({ text: "⚠️ Error de Configuración: Falta API Key." });
  }

  try {
    // 1. Fetch Dynamic Context (Lightweight)
    let contextText = "";
    const { data: products } = await supabase.from('products').select('nombre, descripcion, precio, category').eq('category', 'COSMÉTICA').limit(10);
    if (products) {
      contextText = "PRODUCTOS DISPONIBLES:\n" + products.map(p => `- ${p.nombre}: ${p.descripcion} ($${p.precio})`).join('\n');
    }

    const { history } = request.body || {};
    // Extract last user message
    const lastMessage = history?.reverse().find((m: any) => m.role === 'user');
    const userPrompt = lastMessage?.parts?.[0]?.text || "Hola";

    // 2. Pure HTTP Request to Google (No SDK)
    const url = `${API_BASE_URL}/${MODEL_ID}:generateContent?key=${API_KEY}`;

    console.log(`[API] Calling Gemini REST: ${MODEL_ID}`);

    const payload = {
      contents: [{
        role: "user",
        parts: [{ text: `Eres Calíope, asistente experta de Cronos. Responde breve y profesional.\n\nCONTEXTO:\n${contextText}\n\nUSUARIO: ${userPrompt}` }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };

    const googleRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!googleRes.ok) {
      const errText = await googleRes.text();
      console.error('[GEMINI HTTP ERROR]', googleRes.status, errText);
      throw new Error(`Google API Error: ${googleRes.status}`);
    }

    const data = await googleRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No pude generar respuesta.";

    return response.status(200).json({ text: reply });

  } catch (error: any) {
    console.error('[CRONOS API ERROR]:', error);
    return response.status(200).json({
      text: "Lo siento, tuve un problema conexión. Intenta de nuevo.",
      debug: error.message
    });
  }
}
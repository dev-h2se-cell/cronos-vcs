/// <reference types="node" />
import type { VercelRequest, VercelResponse } from '@vercel/node';

// --- ZERO DEPENDENCY CONFIGURATION ---
const MODEL_ID = 'gemini-2.0-flash';
const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// HARDCODED CONTEXT (To avoid DB dependencies causing crashes)
const SYSTEM_PROMPT = `Eres Calíope, asistente experta de Cronos. Responde breve y profesional.
Contexto de Productos:
- Cronos Vitamin C: Suero de alta potencia.
- Alpha Kit: Rutina completa AM/PM.`;

export default async function (request: VercelRequest, response: VercelResponse) {
  // CORS Setup
  response.setHeader('Access-Control-Allow-Credentials', "true");
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (request.method === 'OPTIONS') return response.status(200).end();

  // Basic Check
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method Not Allowed' });

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    // Return JSON to avoid syntax error in frontend
    return response.status(200).json({ text: "⚠️ Error: Falta API Key en Servidor." });
  }

  try {
    const { history } = request.body || {};
    // Extract last user message or default
    let userPrompt = "Hola";
    if (history && Array.isArray(history)) {
      const lastUserMsg = history.reverse().find((m: any) => m.role === 'user');
      if (lastUserMsg?.parts?.[0]?.text) userPrompt = lastUserMsg.parts[0].text;
    }

    // 2. Pure HTTP Request to Google (No SDK)
    const url = `${API_BASE_URL}/${MODEL_ID}:generateContent?key=${API_KEY}`;

    // Construct simplified payload
    const payload = {
      contents: [{
        role: "user",
        parts: [{ text: `${SYSTEM_PROMPT}\n\nUSUARIO: ${userPrompt}` }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500
      }
    };

    const googleRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!googleRes.ok) {
      const errText = await googleRes.text();
      console.error('[GEMINI EXTERNAL API ERROR]', googleRes.status, errText);
      throw new Error(`Google API returned ${googleRes.status}`);
    }

    const data = await googleRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No tengo respuesta para eso.";

    return response.status(200).json({ text: reply });

  } catch (error: any) {
    console.error('[CRONOS API CRASH]:', error);
    return response.status(200).json({
      text: "Lo siento, mis sistemas están en mantenimiento. (Error: 500 Shield)",
      debug: error.message
    });
  }
}
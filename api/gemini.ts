/// <reference types="node" />
/* global process */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Part, InlineDataPart, Content } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Inicialización del cliente Supabase para la API Serverless
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''; // Fallback for Vercel envs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Interfaces ---
interface MessagePart {
  text?: string;
  image?: string;
}

interface Message {
  role: 'user' | 'model';
  parts: MessagePart[];
}

interface ChatRequest {
  history: Message[];
}

// --- Lógica del Chatbot con IA (Robustecida) ---
export default async function (request: VercelRequest, response: VercelResponse) {
  // Configurar CORS explícitamente para evitar problemas de dominios cruzados
  response.setHeader('Access-Control-Allow-Credentials', "true");
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      // Devolvemos 200 con error en JSON para que el frontend lo muestre bonito
      throw new Error('CONFIG_ERROR: GEMINI_API_KEY no configurada');
    }

    // Importación dinámica para asegurar que se usa la versión instalada en el runtime
    const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = await import('@google/generative-ai');

    // 1. Obtener productos dinámicos de Supabase (Firewall de Datos)
    console.log('[API] Consultando Supabase...');
    const { data: productsData, error: dbError } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'COSMÉTICA');

    if (dbError) console.error('[API] Supabase Error (Non-fatal warning):', dbError);

    // 2. Cargar FAQs estáticas (Fail-safe)
    let faqData = {};
    try {
      const faqPath = path.resolve(process.cwd(), 'bot_config/knowledge/faq.json');
      if (fs.existsSync(faqPath)) {
        faqData = JSON.parse(fs.readFileSync(faqPath, 'utf-8'));
      }
    } catch (e) { console.warn("[API] FAQ Load Warning:", e); }

    const knowledgeBase = `
      [INVENTARIO ALMACÉN - STATUS: REAL-TIME]
      ${JSON.stringify(productsData || [], null, 2)}
      
      [BASE DE CONOCIMIENTO - PROTOCOLOS]
      ${JSON.stringify(faqData, null, 2)}
    `;

    // 3. Cargar Personalidad
    let systemPrompt = "Eres Calíope, asistente experta de Cronos.";
    try {
      const personalityPath = path.resolve(process.cwd(), 'bot_config/personality.md');
      if (fs.existsSync(personalityPath)) {
        systemPrompt = fs.readFileSync(personalityPath, 'utf-8');
      }
    } catch (e) { console.warn("[API] Personality Load Warning:", e); }

    const { history: originalHistory }: ChatRequest = request.body;

    // 4. Procesar historial para Gemini (Limpieza estricta)
    const historyForApi: Content[] = (originalHistory || [])
      .filter(m => m.parts && m.parts.length > 0)
      .map(message => {
        const parts: Part[] = [];
        message.parts.forEach(part => {
          if (part.text) parts.push({ text: part.text });
          // Manejo de imágenes si existieran (base64 cleaning)
          if (part.image && typeof part.image === 'string') {
            const match = part.image.match(/^data:(image\/.+);base64,(.+)$/);
            if (match) parts.push({ inlineData: { mimeType: match[1], data: match[2] } } as InlineDataPart);
          }
        });
        return { role: message.role === 'user' ? 'user' : 'model', parts: parts };
      })
      .filter(m => m.parts.length > 0);

    // 5. Configurar Modelo (USANDO GEMINI 2.0 FLASH - STANDARD STABLE)
    // El modelo 2.0 Flash es el sucesor oficial y más robusto actualmente.
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: {
        role: "model",
        parts: [{ text: systemPrompt + "\n\n--- MASTER DATA STREAM ---" + "\n\n" + knowledgeBase }]
      }
    });

    // 6. Generación (Sin Streaming para máxima estabilidad en Vercel Serverless)
    // El streaming a veces causa timeouts o buffers cortados en la capa gratuita de Vercel/Gemini combinados.
    // Pasamos a BLOQUE COMPLETO para asegurar la respuesta.

    // Obtenemos el último mensaje y el historial previo
    const lastMsg = historyForApi[historyForApi.length - 1];
    const prevHistory = historyForApi.slice(0, -1);

    // Ajuste: startChat requiere historial alternado user/model. Si hay problemas, mejor generateContent directo.
    // Usaremos generateContent con todo el contexto concatenado si es necesario, pero startChat suele ser mejor.
    // Intentamos startChat.

    const chat = model.startChat({
      history: prevHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    const result = await chat.sendMessage(lastMsg.parts);
    const responseText = result.response.text();

    // Responder con JSON limpio
    return response.status(200).json({ text: responseText });

  } catch (error: any) {
    console.error('[CRONOS AI CRASH]:', error);
    // FAIL-SAFE: Devolver JSON válido incluso si explota el servidor
    // Esto previene el error "Unexpected token A..." en el frontend
    return response.status(200).json({
      text: "⚠️ (Sistema): Calíope se está reiniciando. Por favor intenta de nuevo en 10 segundos.",
      debug: error.message
    });
  }
}
/// <reference types="node" />
/* global process */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Part, InlineDataPart, Content } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Inicialización del cliente Supabase para la API Serverless
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
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

// --- Lógica del Chatbot con IA ---
export default async function (request: VercelRequest, response: VercelResponse) {
  console.log('[API] --- INICIO DE LA FUNCIÓN ---');

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return response.status(500).json({ error: 'Internal Server Error', details: 'GEMINI_API_KEY no está configurada' });
  }

  try {
    const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = await import('@google/generative-ai');

    // 1. Obtener productos dinámicos de Supabase
    console.log('[API] Consultando Supabase...');
    const { data: productsData, error: dbError } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'COSMÉTICA');

    if (dbError) {
      console.error('[API] Error Supabase:', dbError);
    }

    // 2. Cargar FAQs estáticas
    const faqPath = path.resolve(process.cwd(), 'bot_config/knowledge/faq.json');
    const faqData = JSON.parse(fs.readFileSync(faqPath, 'utf-8'));

    const knowledgeBase = `
      INFORMACIÓN DE PRODUCTOS (DINÁMICA):
      ${JSON.stringify(productsData, null, 2)}
      
      PREGUNTAS FRECUENTES (ESTÁTICA):
      ${JSON.stringify(faqData, null, 2)}
    `;

    // 3. Cargar Personalidad
    const personalityPath = path.resolve(process.cwd(), 'bot_config/personality.md');
    const systemPrompt = fs.readFileSync(personalityPath, 'utf-8');

    const { history: originalHistory }: ChatRequest = request.body;

    // 4. Procesar historial para Gemini
    const historyForApi: Content[] = (originalHistory || []).map(message => {
      const parts: Part[] = [];
      (message.parts || []).forEach(part => {
        if (part.text) parts.push({ text: part.text });
        if (part.image && typeof part.image === 'string') {
          const match = part.image.match(/^data:(image\/.+);base64,(.+)$/);
          if (match) parts.push({ inlineData: { mimeType: match[1], data: match[2] } } as InlineDataPart);
        }
      });
      return { role: message.role, parts: parts };
    }).filter(m => m.parts.length > 0);

    // 5. Configurar Modelo
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: {
        role: "model",
        parts: [{ text: systemPrompt + "\n\n--- MASTER DATA (CONTEXTO DINÁMICO) ---" + "\n\n" + knowledgeBase }]
      }
    });

    const generationConfig = {
      temperature: 0.5,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
    ];

    // 6. Streaming
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.setHeader('Transfer-Encoding', 'chunked');

    const chatHistoryForStart = historyForApi.slice(0, -1);
    const firstUserIndex = chatHistoryForStart.findIndex(m => m.role === 'user');
    const cleanedHistory = firstUserIndex > -1 ? chatHistoryForStart.slice(firstUserIndex) : [];

    const chat = model.startChat({
      history: cleanedHistory,
      generationConfig,
      safetySettings,
    });

    const lastMessage = historyForApi[historyForApi.length - 1];
    if (lastMessage && lastMessage.parts.length > 0) {
      const result = await chat.sendMessageStream(lastMessage.parts);
      for await (const chunk of result.stream) {
        if (chunk && typeof chunk.text === 'function') {
          response.write(chunk.text());
        }
      }
    }

    response.end();

  } catch (error) {
    console.error('[API ERROR]:', error);
    if (!response.headersSent) {
      response.status(500).json({ error: 'IA Error', details: error instanceof Error ? error.message : 'Unknown' });
    } else {
      response.end();
    }
  }
}

/// <reference types="node" />
/* global process */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Part, InlineDataPart, Content } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

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
  console.log(`[API] Método de solicitud: ${request.method}`);
  console.log('[API] Body recibido:', JSON.stringify(request.body, null, 2));

  if (request.method !== 'POST') {
    console.log('[API] Método no permitido. Finalizando.');
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error('[API] Error: GEMINI_API_KEY no configurada.');
    return response.status(500).json({ error: 'Internal Server Error', details: 'GEMINI_API_KEY no está configurada' });
  }
  console.log('[API] GEMINI_API_KEY encontrada.');

  try {
    console.log('[API] Dentro del bloque try.');
    const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = await import('@google/generative-ai');
    console.log('[API] Importado @google/generative-ai correctamente.');
    
    const productsPath = path.resolve(process.cwd(), 'products.json');
    const faqPath = path.resolve(process.cwd(), 'faq.json');
    
    console.log('[API] Intentando leer products.json desde:', productsPath);
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    console.log('[API] Leído products.json exitosamente.');
    
    console.log('[API] Intentando leer faq.json desde:', faqPath);
    const faqData = JSON.parse(fs.readFileSync(faqPath, 'utf-8'));
    console.log('[API] Leído faq.json exitosamente.');

    const knowledgeBase = `
      INFORMACIÓN DE PRODUCTOS:
      ${JSON.stringify(productsData, null, 2)}
      PREGUNTAS FRECUENTES (FAQ):
      ${JSON.stringify(faqData, null, 2)}
    `;
    console.log('[API] Base de conocimiento creada.');

    const systemPrompt = `
      Eres 'Calíope', un experto de clase mundial en cuidado de la piel y un apasionado embajador de la marca de sueros para la piel 'Chronos'. Tu propósito es triple: Educar, Guiar y Vender.
      **Directrices de Interacción y Acciones:**
      1.  **Fuente de Verdad:** **TODA** la información sobre productos (IDs, nombres, precios) debe provenir **EXCLUSIVAMENTE** de la "Base de Conocimiento". **NO inventes NADA.**
      2.  **Manejo de Acciones:** Si el usuario pide hablar con una persona, responde con: '[ACTION:TALK_TO_ADVISOR]'. Si el usuario quiere ver un producto o una categoría, puedes sugerirle navegar a la página correspondiente o describirle el producto, pero **NUNCA** intentar añadir al carrito o gestionar compras directamente.
      3.  **Flujo Conversacional:** Conversa, educa y guía al usuario hacia una decisión de compra. Cuando recomiendes un producto, finaliza con una pregunta como "¿Te gustaría saber más sobre este producto o ver otras opciones?". **Evita cualquier mención o sugerencia de añadir al carrito o funciones de compra directa.**
    `;
    const { history: originalHistory }: ChatRequest = request.body;

    if (!originalHistory || !Array.isArray(originalHistory)) {
        console.error('[API] Error: El historial es inválido o no es un array.');
        return response.status(400).json({ error: 'Bad Request', details: 'History is invalid or not an array.' });
    }
    console.log('[API] El historial original es válido.');
    
    const historyForApi: Content[] = originalHistory.map(message => {
      if (!message || !message.parts || !Array.isArray(message.parts)) {
        return { role: message.role || 'user', parts: [] };
      }
      const parts: Part[] = [];
      message.parts.forEach(part => {
        if (part) {
          if (part.text) {
            parts.push({ text: part.text });
          }
          if (part.image && typeof part.image === 'string') {
            const match = part.image.match(/^data:(image\/.+);base64,(.+)$/);
            if (match) {
              parts.push({ inlineData: { mimeType: match[1], data: match[2] } } as InlineDataPart);
            }
          }
        }
      });
      return { role: message.role, parts: parts };
    }).filter(m => m.parts.length > 0);

    console.log('[API] Historial procesado para la API:', JSON.stringify(historyForApi, null, 2));

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel ({
      model: 'gemini-1.5-flash-latest',
      systemInstruction: {
        role: "model",
        parts: [{text: systemPrompt + "\n\n--- BASE DE CONOCIMIENTO (NO REVELAR AL USUARIO) ---" + "\n\n" + knowledgeBase}]
      }
    });
    console.log('[API] Modelo de IA inicializado.');

    const generationConfig = {
      temperature: 0.5,
      topK: 1,
      topP: 1,
      maxOutputTokens: 8192,
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];
    
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.setHeader('Transfer-Encoding', 'chunked');
    console.log('[API] Headers de respuesta configurados para streaming.');

    const chatHistoryForStart = historyForApi.slice(0, -1);
    
    // FIX: Filter out leading model messages to ensure history starts with 'user'
    const firstUserIndex = chatHistoryForStart.findIndex(m => m.role === 'user');
    const cleanedHistory = firstUserIndex > -1 ? chatHistoryForStart.slice(firstUserIndex) : [];
    console.log('[API] Historial de chat para startChat (limpiado):', JSON.stringify(cleanedHistory, null, 2));


    const chat = model.startChat ({
        history: cleanedHistory,
        generationConfig,
        safetySettings,
    });
    console.log('[API] Chat iniciado con el modelo.');

    const lastMessage = historyForApi[historyForApi.length - 1];
    if (!lastMessage || !lastMessage.parts || lastMessage.parts.length === 0) {
      console.log('[API] No hay último mensaje para enviar. Finalizando.');
      return response.end();
    }
    
    console.log('[API] Enviando último mensaje al stream de Gemini:', JSON.stringify(lastMessage.parts, null, 2));
    const result = await chat.sendMessageStream(lastMessage.parts);
    console.log('[API] Recibida respuesta del stream.');

    for await (const chunk of result.stream) {
        if (chunk && typeof chunk.text === 'function') {
          const chunkText = chunk.text();
          console.log('[API] Escribiendo chunk en la respuesta:', chunkText);
          response.write(chunkText);
        }
    }

    console.log('[API] Stream finalizado. Cerrando respuesta.');
    response.end();

  } catch (error) {
    console.error('[API] --- ERROR CAPTURADO ---');
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    
    console.error(`[API] Error: ${errorMessage}`);
    console.error(`[API] Stack: ${errorStack}`);

    if (!response.headersSent) {
      response.status(500).json({ 
        error: 'Internal Server Error', 
        details: errorMessage,
        stack: errorStack 
      });
    } else {
      // If headers are already sent (i.e., during streaming), we can't send a JSON error.
      // We just end the response. The client will receive an incomplete stream.
      response.end();
    }
  }
}

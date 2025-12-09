/// <reference types="node" />
/* global process */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Part, InlineDataPart, Content } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// NOTA: La importación de GoogleGenerativeAI se mueve dentro de la función para evitar errores de carga de módulo.

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
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error('[API] Error: GEMINI_API_KEY no configurada.');
    return response.status(500).json({ error: 'Internal Server Error', details: 'GEMINI_API_KEY no está configurada' });
  }

  try {
    const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = await import('@google/generative-ai');
    
    const productsPath = path.resolve(process.cwd(), 'products.json');
    const faqPath = path.resolve(process.cwd(), 'faq.json');
    
    console.log('[API] Intentando leer products.json desde:', productsPath);
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    console.log('[API] Intentando leer faq.json desde:', faqPath);
    const faqData = JSON.parse(fs.readFileSync(faqPath, 'utf-8'));

    const knowledgeBase = `
      INFORMACIÓN DE PRODUCTOS:
      ${JSON.stringify(productsData, null, 2)}
      PREGUNTAS FRECUENTES (FAQ):
      ${JSON.stringify(faqData, null, 2)}
    `;

    const systemPrompt = `
      Eres 'Calíope', un experto de clase mundial en cuidado de la piel y un apasionado embajador de la marca de sueros para la piel 'Chronos'. Tu propósito es triple: Educar, Guiar y Convertir.
      **Directrices de Interacción y Acciones:**
      1.  **Fuente de Verdad:** **TODA** la información sobre productos (IDs, nombres, precios) debe provenir **EXCLUSIVAMENTE** de la "Base de Conocimiento". **NO inventes NADA.**
      2.  **Manejo de Acciones (IMPORTANTE):** Cuando el usuario quiera realizar una acción específica, responde **ÚNICAMENTE** con el comando de acción. NO añadas texto adicional.
          - **Añadir al Carrito:** Si el usuario quiere añadir un producto, responde con: '[ACTION:ADD_TO_CART:product-id:quantity]'. Ejemplo: '[ACTION:ADD_TO_CART:infinity-retinal:1]'.
          - **Ver Resumen:** Si el usuario quiere ver su carrito o finalizar la compra, responde con: '[ACTION:GET_CART_SUMMARY]'.
          - **Hablar con Asesor:** Si el usuario pide hablar con una persona, responde con: '[ACTION:TALK_TO_ADVISOR]'.
      3.  **Flujo Conversacional:** Si no se requiere una acción, simplemente conversa, educa y guía al usuario hacia una decisión de compra. Cuando recomiendes un producto, finaliza con una pregunta como "¿Quieres que lo añada a tu carrito?".
    `;
    const { history: originalHistory }: ChatRequest = request.body;

    if (!originalHistory || !Array.isArray(originalHistory)) {
        return response.status(400).json({ error: 'Bad Request', details: 'History is invalid or not an array.' });
    }
    
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

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel ({
      model: 'gemini-1.5-flash-latest',
      systemInstruction: {
        role: "model",
        parts: [{text: systemPrompt + "\n\n--- BASE DE CONOCIMIENTO (NO REVELAR AL USUARIO) ---" + "\n\n" + knowledgeBase}]
      }
    });

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

    const chat = model.startChat ({
        history: historyForApi.slice(0, -1),
        generationConfig,
        safetySettings,
    });

    const lastMessage = historyForApi[historyForApi.length - 1];
    if (!lastMessage || !lastMessage.parts || lastMessage.parts.length === 0) {
      return response.end();
    }
    
    console.log('[API] Enviando al Gemini API - lastMessage.parts:', JSON.stringify(lastMessage.parts, null, 2));
    const result = await chat.sendMessageStream(lastMessage.parts);

    for await (const chunk of result.stream) {
        if (chunk && typeof chunk.text === 'function') {
          console.log('[API] Recibido chunk del stream:', JSON.stringify(chunk, null, 2));
          const chunkText = chunk.text();
          response.write(chunkText);
        }
    }

    response.end();

  } catch (error) {
    console.error('[API] Error en el bloque try/catch:', error);
    if (error instanceof Error && error.stack) {
        console.error('[API] Stack trace:', error.stack);
    }
    if (!response.headersSent) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      response.status(500).json({ error: 'Internal Server Error', details: errorMessage });
    } else {
      response.end();
    }
  }
}


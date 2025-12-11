import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function (request: VercelRequest, response: VercelResponse) {
  console.log('[API-DIAGNÓSTICO] Iniciando listado de modelos.');

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error('[API-DIAGNÓSTICO] Error: GEMINI_API_KEY no configurada.');
    return response.status(500).json({ error: 'La variable de entorno GEMINI_API_KEY no está configurada en Vercel.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    // Note: In a real app, you should cache this result, but for diagnostics, we call it directly.
    const models = await genAI.listModels();
    
    console.log('[API-DIAGNÓSTICO] Modelos encontrados:', JSON.stringify(models, null, 2));
    
    // We will return a simplified list of model names for clarity.
    const modelNames = models.map(m => m.name);

    return response.status(200).json({
      message: 'Modelos disponibles para tu clave de API:',
      models: modelNames,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    
    console.error(`[API-DIAGNÓSTICO] Error al listar modelos: ${errorMessage}`);
    console.error(`[API-DIAGNÓSTICO] Stack: ${errorStack}`);

    return response.status(500).json({ 
      error: 'Error al intentar listar los modelos de la API de Google.', 
      details: errorMessage,
    });
  }
}
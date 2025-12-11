import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function (request: VercelRequest, response: VercelResponse) {
  console.log('[API-DIAGNÓSTICO] Iniciando listado de modelos vía REST.');

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error('[API-DIAGNÓSTICO] Error: GEMINI_API_KEY no configurada.');
    return response.status(500).json({ error: 'La variable de entorno GEMINI_API_KEY no está configurada en Vercel.' });        
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    console.log('[API-DIAGNÓSTICO] Realizando fetch a:', url.replace(API_KEY, 'GEMINI_API_KEY_REDACTED'));

    const fetchResponse = await fetch(url);
    const data = await fetchResponse.json();

    if (!fetchResponse.ok) {
      console.error('[API-DIAGNÓSTICO] Error en la respuesta de la API de Google:', data);
      return response.status(fetchResponse.status).json({
        error: 'Error al contactar la API de Google.',
        details: data,
      });
    }

    console.log('[API-DIAGNÓSTICO] Modelos encontrados:', JSON.stringify(data, null, 2));

    // The response contains a 'models' array. We extract the 'name' from each.
    const modelNames = data.models.map((m: { name: string }) => m.name);

    return response.status(200).json({
      message: 'Modelos disponibles para tu clave de API (vía REST):',
      models: modelNames,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';

    console.error(`[API-DIAGNÓSTICO] Error durante el fetch: ${errorMessage}`);
    console.error(`[API-DIAGNÓSTICO] Stack: ${errorStack}`);

    return response.status(500).json({
      error: 'Error interno al intentar listar los modelos vía REST.',
      details: errorMessage,
    });
  }
}
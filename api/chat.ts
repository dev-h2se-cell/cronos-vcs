import type { VercelRequest, VercelResponse } from '@vercel/node';

interface MessagePart {
  text?: string;
  image?: string; // base64 encoded image
}

interface Message {
  role: 'user' | 'model';
  parts: MessagePart[];
}

interface ChatRequest {
  history: Message[];
  knowledgeBase: string; // JSON string of products and protocols
}

export default async function (request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { history, knowledgeBase }: ChatRequest = request.body;

    console.log('Received chat request:');
    console.log('History:', JSON.stringify(history, null, 2));
    console.log('Knowledge Base:', knowledgeBase);

    // Simulate AI response based on history
    let aiResponse = 'Hola, soy el asistente de Chronos. Has enviado un mensaje. ';
    const lastUserMessage = history[history.length - 1];

    if (lastUserMessage && lastUserMessage.role === 'user') {
      const textPart = lastUserMessage.parts.find(part => part.text);
      const imagePart = lastUserMessage.parts.find(part => part.image);

      if (textPart) {
        aiResponse += `Tu último mensaje de texto fue: "${textPart.text}". `;
      }
      if (imagePart) {
        aiResponse += `Has adjuntado una imagen. `;
      }

      // Very basic intent matching for the mock API
      const lowerCaseText = textPart?.text?.toLowerCase() || '';
      if (lowerCaseText.includes('hola') || lowerCaseText.includes('ayuda')) {
        aiResponse = 'Hola, ¿en qué puedo ayudarte hoy?';
      } else if (lowerCaseText.includes('producto')) {
        aiResponse = 'Claro, ¿qué producto te interesa?';
      } else if (lowerCaseText.includes('gracias')) {
        aiResponse = 'De nada, estoy aquí para ayudarte.';
      }
    }

    // Simulate a delay for AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return a simple mock response
    return response.status(200).json({
      message: {
        role: 'model',
        parts: [{ text: aiResponse + ' Actualmente, esta es una respuesta de prueba.' }],
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    return response.status(500).json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}


interface MessagePart {
  text?: string;
  image?: string;
}

interface Message {
  role: 'user' | 'model';
  parts: MessagePart[];
}

interface StreamChatResponseParams {
  history: Message[];
  onChunk: (chunk: string) => void;
  onError: (error: Error) => void;
  onComplete: () => void;
}

export const streamChatResponse = async ({
  history,
  onChunk,
  onError,
  onComplete,
}: StreamChatResponseParams): Promise<void> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from API:", errorData); // Log the full error object
      throw new Error(errorData.details || 'Error sending message to API.');
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Could not get reader from response body.');
    }

    const decoder = new TextDecoder();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value);
      onChunk(chunk);
    }
  } catch (error) {
    console.error('Chat API error:', error);
    const typedError = error instanceof Error ? error : new Error('An unknown error occurred.');
    onError(typedError);
  } finally {
    onComplete();
  }
};

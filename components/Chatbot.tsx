import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Image as ImageIcon, Bot, Loader2, MessageCircle, ShoppingCart } from 'lucide-react';

// --- Interfaces ---
interface MessagePart {
  text: string;
  image?: string; 
}

interface Message {
  id: string;
  role: 'user' | 'model';
  parts: MessagePart[];
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
  onAddToCart: (productId: string, quantity?: number) => void;
  getCartSummary: () => string;
}

// --- Helper Functions ---
const getWhatsAppUrl = (message?: string) => {
  const phoneNumber = '573181436525';
  const defaultMessage = 'Hola, vengo del chat de Chronos y necesito ayuda de un experto.';
  const finalMessage = message || defaultMessage;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
};

const parseAction = (text: string): { action: string, params: string[] } | null => {
    const match = text.match(/\[ACTION:([A-Z_]+):?([^\]]*)\]/);
    if (match) {
        return {
            action: match[1],
            params: match[2] ? match[2].split(':') : [],
        };
    }
    return null;
};

// --- Main Component ---
export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, initialMessage, onAddToCart, getCartSummary }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input
  const [processedInitialMessage, setProcessedInitialMessage] = useState(false);

  
  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome-' + Date.now(),
        role: 'model',
        parts: [{ text: "Hola. Soy Calíope, tu curadora de belleza personal. ¿Qué resultado buscas para tu piel hoy?" }]
      }]);
    }
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle initial message from CTAs
  useEffect(() => {
    if (isOpen && initialMessage && !processedInitialMessage) {
      handleSend(initialMessage);
      setProcessedInitialMessage(true); // Mark as processed
    }
    if (!isOpen) {
      setProcessedInitialMessage(false); // Reset when closed
    }
  }, [isOpen, initialMessage, processedInitialMessage]);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
    // Reset file input to allow re-uploading the same file
    if(e.target) e.target.value = '';
  };
  
  const handleSend = async (ctaMessage?: string) => {
    const currentInput = ctaMessage || inputText.trim();
    if (!currentInput && !selectedImage) return;

    setIsLoading(true);

    const userParts: MessagePart[] = [];
    if (currentInput) userParts.push({ text: currentInput });
    if (selectedImage && !currentInput) userParts.push({ text: "Analiza esta imagen de mi piel." });

    const userMessage: Message = {
      id: 'user-' + Date.now(),
      role: 'user',
      parts: userParts.map(part => selectedImage ? { ...part, image: selectedImage } : part),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);
    
    const newModelMessageId = 'model-' + Date.now();

    try {
      const historyForApi = [...messages, userMessage].map(msg => ({
        role: msg.role,
        parts: msg.parts.map(part => ({
          text: part.text,
          ...(part.image && { image: part.image }),
        })),
      }));

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: historyForApi }),
      });

      if (!response.ok) {
        // If response is not ok, read the body as text and throw it as an error.
        // This will be caught by the catch block below.
        const errorBody = await response.text();
        throw new Error(errorBody || `Error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('Response body is empty.');
      }

      setMessages(prev => [...prev, { id: newModelMessageId, role: 'model', parts: [{ text: '' }] }]);
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        setMessages(prev => prev.map(msg => 
            msg.id === newModelMessageId 
            ? { ...msg, parts: [{ text: accumulatedText }] }
            : msg
        ));
      }
      
      // --- Action Processing ---
      const action = parseAction(accumulatedText);
      if (action) {
        let actionResponseMessage = '';
        if (action.action === 'ADD_TO_CART') {
            const [productId, quantityStr] = action.params;
            const quantity = quantityStr ? parseInt(quantityStr, 10) : 1;
            if (productId) {
                onAddToCart(productId, quantity);
                actionResponseMessage = `¡Perfecto! He añadido el producto a tu carrito. ¿Deseas algo más o prefieres finalizar el pedido?`;
            }
        } else if (action.action === 'GET_CART_SUMMARY') {
            actionResponseMessage = getCartSummary();
        } else if (action.action === 'TALK_TO_ADVISOR') {
             actionResponseMessage = `Claro, para hablar con un asesor humano puedes hacer clic en el botón de abajo o en este enlace: ${getWhatsAppUrl()}`;
        }
        
        // Update the message with the user-friendly response or remove it if no response
        setMessages(prev => prev.map(msg => 
            msg.id === newModelMessageId && actionResponseMessage
            ? { ...msg, parts: [{ text: actionResponseMessage }] }
            : msg
        ).filter(msg => !(msg.id === newModelMessageId && !actionResponseMessage)));
      }

    } catch (error) {
      console.error("Chat streaming error:", error);
      let errorText = 'Lo siento, hubo un problema de comunicación. Por favor, inténtalo de nuevo.';
      
      if (error instanceof Error) {
        // The error message now contains the raw text from the server response
        const serverError = error.message;
        try {
            // Check if the raw text is actually JSON with a details property
            const jsonError = JSON.parse(serverError);
            errorText = jsonError.details || jsonError.error || serverError;
        } catch(e) {
            // If it's not JSON, it's the raw error message (like a Vercel crash page)
            // We show a snippet of it.
            errorText = serverError.substring(0, 500);
        }
      }

      // Add a new error message instead of replacing the placeholder
      setMessages(prev => [...prev.filter(m => m.id !== newModelMessageId), { id: 'error-' + Date.now(), role: 'model', parts: [{ text: errorText }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/30 z-40 flex justify-end items-end animate-fade-in-fast" 
      onClick={onClose}
      aria-label="Cerrar chat"
    >
      <div 
        className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[75vh] max-h-[700px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-200 overflow-hidden font-sans" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatbot-heading"
      >
          
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 id="chatbot-heading" className="text-white font-bold">Chronos Skin AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></span>
                  <span className="text-xs text-slate-400">{isLoading ? 'Escribiendo...' : 'Online'}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white" aria-label="Cerrar"><X size={20}/></button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm relative ${ 
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.parts.map((part, index) => (
                    <React.Fragment key={index}>
                      {part.image && (
                        <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                          <img src={part.image} alt="Imagen subida por el usuario" className="w-full h-auto object-cover max-h-40" />
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{part.text}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
             {isLoading && messages[messages.length - 1]?.role !== 'model' && (
              <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl p-3 text-sm bg-white text-slate-800 border border-slate-200 rounded-tl-none inline-flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-slate-500" />
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
            {selectedImage && (
              <div className="mb-2 flex items-center gap-2 bg-slate-100 p-2 rounded-lg text-xs text-slate-600">
                <ImageIcon size={14} />
                <span>Imagen adjunta</span>
                <button onClick={() => setSelectedImage(null)} className="ml-auto hover:text-red-500" aria-label="Quitar imagen"><X size={14}/></button>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                aria-label="Adjuntar imagen"
              >
                <ImageIcon size={18} />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (handleSend(), e.preventDefault())}
                  placeholder="Escribe tu duda..."
                  disabled={isLoading}
                  className="w-full bg-slate-100 text-slate-900 text-sm rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all disabled:opacity-50"
                  aria-label="Mensaje del chat"
                />
              </div>

              <button
                onClick={() => handleSend()}
                disabled={isLoading || (!inputText.trim() && !selectedImage)}
                className="p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 shadow-lg"
                aria-label="Enviar mensaje"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleSend("Quiero finalizar mi pedido y ver el resumen.")}
                  className="flex items-center justify-center gap-2 text-sm bg-slate-100 text-slate-700 font-medium py-2 px-3 rounded-lg hover:bg-slate-200 transition-colors"
                  title="Finalizar Pedido"
                >
                  <ShoppingCart size={16} />
                  Finalizar Pedido
                </button>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm bg-slate-100 text-slate-700 font-medium py-2 px-3 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <MessageCircle size={16} />
                  Hablar con Asesor
                </a>
            </div>

            <div className="text-[10px] text-center text-slate-400 mt-3">
              Usando Gemini 1.5 Flash
            </div>
          </div>
        </div>
    </div>
  );
};
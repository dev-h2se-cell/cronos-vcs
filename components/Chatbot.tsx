import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Image as ImageIcon, Bot, Loader2, MessageCircle } from 'lucide-react';
import { ProductData, ProductItem, ProtocolItem } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string;
  isThinking?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
  onAddToCart: (productId: string, quantity?: number) => void;
  getCartSummary: () => string;
  productsData: ProductData;
}

// WhatsAppLink as a standalone component for reusability
const WhatsAppLink: React.FC<{ message?: string }> = ({ message }) => {
  const phoneNumber = '573181436525';
  const defaultMessage = 'Hola, vengo del chat de Chronos y necesito ayuda de un experto.';
  const whatsappMessage = message || defaultMessage;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#20bd5a] transition-all"
    >
      <MessageCircle size={16} />
      Hablar por WhatsApp
    </a>
  );
};


export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, initialMessage, onAddToCart, getCartSummary, productsData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hola. Soy Chronos AI, tu especialista clínico. ¿En qué puedo ayudarte hoy?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  // Effect to handle initial message from CTA
  useEffect(() => {
    if (isOpen && initialMessage) {
      handleSend(initialMessage);
    }
  }, [isOpen, initialMessage]);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocalIntent = (lowerCaseMessage: string): boolean => {
    // --- Local Intent Detection ---
    const finalizeKeywords = ['finalizar pedido', 'resumen', 'cerrar compra', 'quiero pagar', 'asesor', 'whatsapp'];
    if (finalizeKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
      const summary = getCartSummary();
      setMessages(prev => [...prev, { id: 'summary-' + Date.now(), role: 'model', text: summary }]);
      setIsLoading(false);
      return true;
    }

    let foundProduct: ProductItem | ProtocolItem | undefined;
    let quantity = 1;
    for (const product of [...productsData.products, ...productsData.protocols]) {
      const productSearchTerms = [
        product.name.toLowerCase().replace(/[™+]/g, '').trim(),
        product.id.replace(/-/g, ' ').toLowerCase(),
        product.id.toLowerCase()
      ].filter(Boolean);
      const regexPatterns = productSearchTerms.map(term => term.split(/[\\s-]+/).filter(Boolean).join('[\\s-]*'));
      const combinedPattern = new RegExp(`(${regexPatterns.join('|')})`, 'i');
      if (combinedPattern.test(lowerCaseMessage)) {
        foundProduct = product;
        const quantityMatch = lowerCaseMessage.match(/(\d+)\s*(unidad|unidades)/i);
        if (quantityMatch && parseInt(quantityMatch[1]) > 0) quantity = parseInt(quantityMatch[1]);
        break;
      }
    }

    if (foundProduct) {
      onAddToCart(foundProduct.id, quantity);
      setMessages(prev => [...prev, {
        id: 'addtocart-' + Date.now(),
        role: 'model',
        text: `¡Perfecto! He añadido ${quantity} unidad(es) de "${foundProduct.name}" al carrito. ¿Deseas algo más o prefieres finalizar tu pedido?`,
      }]);
      setIsLoading(false);
      return true;
    }

    const humanKeywords = ['humano', 'persona', 'agente', 'asesor'];
    if (humanKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
      setMessages(prev => [...prev, {
        id: 'human-escalation-' + Date.now(),
        role: 'model',
        text: 'Entiendo. Para una consulta más personalizada, puedes hablar con un agente humano por WhatsApp.',
      }]);
      setIsLoading(false);
      return true;
    }
    return false;
  };

  const handleSend = async (ctaMessage?: string) => {
    const currentInputText = ctaMessage || inputText.trim();
    if (!currentInputText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: currentInputText,
      image: selectedImage || undefined, // Store image in local state for display
    };

    const newMessages: Message[] = [...messages, userMessage];
    setMessages(prev => [...prev, userMessage]);

    if (!ctaMessage) {
      setInputText('');
      setSelectedImage(null);
    }
    
    setIsLoading(true);

    const lowerCaseMessage = currentInputText.toLowerCase();

    if (handleLocalIntent(lowerCaseMessage)) {
      return;
    }

    // --- Secure API Call to Backend ---
    try {
      const historyForApi = newMessages
        .filter(msg => !msg.isThinking) // Don't send "thinking" messages
        .map(msg => {
          const parts: { text?: string; image?: string }[] = [];
          if (msg.text) {
            parts.push({ text: msg.text });
          }
          if (msg.image) {
            parts.push({ image: msg.image });
          }
          return {
            role: msg.role,
            parts: parts,
          };
        });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: historyForApi,
          knowledgeBase: `KNOWLEDGE BASE (Products & Protocols JSON):\n${JSON.stringify(productsData, null, 2)}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Error del servidor: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No se pudo leer la respuesta del servidor.');
      }

      const decoder = new TextDecoder();
      let fullResponseText = '';
      const responseMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, { id: responseMsgId, role: 'model', text: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResponseText += decoder.decode(value, { stream: true });
        setMessages(prev => prev.map(msg =>
          msg.id === responseMsgId ? { ...msg, text: fullResponseText } : msg
        ));
      }

    } catch (error) {
      console.error("Chat error:", error);
      let errorMessage = 'Lo siento, hubo un error técnico.';
      if (error instanceof Error) {
        errorMessage = error.message;
        // Attempt to parse API error details if available
        try {
          const errorJson = JSON.parse(error.message);
          if (errorJson.details) {
            errorMessage = errorJson.details;
          }
        } catch (e) {
          // Not a JSON error message, use the default error.message
        }
      }
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Determine if the last message requires a WhatsApp button
  const lastMessage = messages[messages.length - 1];
  const showWhatsAppForLastMessage = lastMessage.role === 'model' &&
    (lastMessage.text.includes("Tu pedido actual") || lastMessage.text.includes("hablar con un agente humano"));


  return (
    <div 
      className="fixed bottom-0 right-0 top-0 left-0 bg-black/30 z-40 flex justify-end items-end animate-fade-in-fast" 
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onClose();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Cerrar chat"
    >
      <div 
        className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[75vh] max-h-[700px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-200 overflow-hidden font-sans" 
        onClick={e => e.stopPropagation()}
        aria-labelledby="chatbot-heading"
      >
          
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 id="chatbot-heading" className="text-white font-bold">Chronos Skin AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full bg-green-500`}></span>
                  <span className="text-xs text-slate-400">Online</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white"><X size={20}/></button>
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
                  {msg.image && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                      <img src={msg.image} alt="Upload" className="w-full h-auto object-cover max-h-40" />
                    </div>
                  )}
                  
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {showWhatsAppForLastMessage && <WhatsAppLink message={lastMessage.text} />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            {selectedImage && (
              <div className="mb-2 flex items-center gap-2 bg-slate-100 p-2 rounded-lg text-xs text-slate-600">
                <ImageIcon size={14} />
                <span>Imagen adjunta</span>
                <button onClick={() => setSelectedImage(null)} className="ml-auto hover:text-red-500"><X size={14}/></button>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Analizar Foto"
              >
                <ImageIcon size={20} />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={"Escribe tu duda..."}
                  disabled={isLoading}
                  className="w-full bg-slate-100 text-slate-900 text-sm rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all disabled:opacity-50"
                />
              </div>

              <button
                onClick={() => handleSend()}
                disabled={isLoading || (!inputText.trim() && !selectedImage)}
                className="p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 shadow-lg"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <div className="text-[10px] text-center text-slate-400 mt-2">
              Usando Gemini 1.5 Flash
            </div>
          </div>
        </div>
    </div>
  );
};

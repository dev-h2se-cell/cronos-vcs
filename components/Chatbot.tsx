import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Image as ImageIcon, Sparkles, BrainCircuit, Bot, Loader2, MessageCircle } from 'lucide-react';
import productsData from '../products.json';
import type { Part } from "@google/genai"; // Static type import

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string;
  isThinking?: boolean;
  showWhatsAppButton?: boolean;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hola. Soy Chronos AI, tu especialista clínico. ¿En qué puedo ayudarte hoy?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

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

  const handleSend = async () => {
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);
    

    // Human escalation check
    const humanKeywords = ['humano', 'persona', 'agente', 'asesor'];
    if (humanKeywords.some(keyword => userMessage.text.toLowerCase().includes(keyword))) {
      setIsLoading(true); // Show thinking indicator briefly
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: 'human-escalation-' + Date.now(),
          role: 'model',
          text: 'Entiendo. Para una consulta más personalizada, puedes hablar con un agente humano por WhatsApp.',
          showWhatsAppButton: true,
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    setIsLoading(true);

    try {
      // Dynamic import to prevent app crash if SDK fails to load on init
      const { GoogleGenAI } = await import("@google/genai");

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });

      // --- Model Selection Strategy ---
      // 1. Image Analysis -> gemini-2.0-pro-exp-02-05 (Vision)
      // 2. Expert/Thinking Mode -> gemini-2.0-flash-thinking-exp-01-21
      // 3. Standard Chat -> gemini-2.0-flash-lite-preview-02-05 (Low Latency)
      
      const knowledgeBase = `KNOWLEDGE BASE (Products & Protocols JSON):\n${JSON.stringify(productsData, null, 2)}\n\n`;
      let modelName = 'gemini-2.0-flash-lite-preview-02-05';
      const config: { systemInstruction: string; thinkingConfig?: { thinkingBudget: number }; } = {
        systemInstruction: knowledgeBase + "Eres un experto dermatólogo y consultor de la marca 'CHRONOS'. Tu tono es clínico, preciso y sofisticado ('Bio-Tech Luxury'). Responde dudas sobre Chronos-C Shield (Vitamina C), Infinity Retinal y el Protocolo de Longevidad basándote en el KNOWLEDGE BASE. Sé conciso.",
      };

      if (userMessage.image) {
        modelName = 'gemini-2.0-pro-exp-02-05';
        // Pro model used for visual analysis
      } else if (isThinkingMode) {
        modelName = 'gemini-2.0-flash-thinking-exp-01-21';
        config.thinkingConfig = { thinkingBudget: 1024 }; 
        // Set a reasonable thinking budget for the experimental model
      }


      // Prepare Content Parts
      const parts: Part[] = [];
      if (userMessage.image) {
        const base64Data = userMessage.image.split(',')[1];
        parts.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Data
          }
        });
      }
      if (userMessage.text) {
        parts.push({ text: userMessage.text });
      }

      const responseStream = await ai.models.generateContentStream({
        model: modelName,
        contents: { parts },
        config
      });

      let fullResponseText = '';
      const responseMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, {
        id: responseMsgId,
        role: 'model',
        text: '',
        isThinking: isThinkingMode
      }]);

      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          fullResponseText += text;
          setMessages(prev => prev.map(msg => 
            msg.id === responseMsgId ? { ...msg, text: fullResponseText } : msg
          ));
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      let errorMessage = 'Lo siento, hubo un error técnico. Por favor intenta más tarde.';
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any)?.message?.includes('API Key')) {
        errorMessage = 'Error de configuración: API Key no encontrada.';
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any)?.status === 404) {
        errorMessage = 'Error: Modelo de IA no disponible temporalmente. Intenta recargar.';
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const WhatsAppLink: React.FC = () => {
    const phoneNumber = '573181436525'; 
    const message = 'Hola, vengo del chat de Chronos y necesito ayuda de un experto.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
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


  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 transition-all duration-300 hover:scale-110 border border-slate-700"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-200 overflow-hidden animate-fade-in font-sans">
          
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Chronos Skin AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isThinkingMode ? 'bg-purple-500 animate-pulse' : 'bg-green-500'}`}></span>
                  <span className="text-xs text-slate-400">
                    {isThinkingMode ? 'Modo Experto (Pro)' : 'Modo Rápido (Flash)'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Thinking Mode Toggle */}
            <button 
              onClick={() => setIsThinkingMode(!isThinkingMode)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold ${isThinkingMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' : 'bg-slate-800 text-slate-500 hover:text-slate-300'}`}
              title="Activar Modo Experto (Pensamiento Profundo)"
            >
              <BrainCircuit size={16} />
              {isThinkingMode ? 'ON' : 'OFF'}
            </button>
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
                  
                  {msg.role === 'model' && msg.isThinking && !msg.text && (
                    <div className="flex items-center gap-2 text-purple-600 text-xs font-bold animate-pulse mb-1">
                      <Sparkles size={12} /> Analizando clínicamente...
                    </div>
                  )}
                  
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {msg.showWhatsAppButton && <WhatsAppLink />}
                </div>
              </div>
            ))}
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
                  placeholder={isThinkingMode ? "Pregunta compleja..." : "Escribe tu duda..."}
                  disabled={isLoading}
                  className="w-full bg-slate-100 text-slate-900 text-sm rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all disabled:opacity-50"
                />
              </div>

              <button
                onClick={handleSend}
                disabled={isLoading || (!inputText.trim() && !selectedImage)}
                className="p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 shadow-lg"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <div className="text-[10px] text-center text-slate-400 mt-2">
              {isThinkingMode ? 'Usando Gemini 2.0 Thinking' : 'Usando Gemini 2.0 Flash Lite'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
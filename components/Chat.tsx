import React, { useState } from 'react';
import { Bot, BrainCircuit, MessageSquare, X } from 'lucide-react';
import { ChatMessage } from '../types';
import MessagesArea from './MessagesArea';
import ChatInput from './ChatInput';
import { streamChatResponse } from '../utils/chat-api';
import WhatsAppButtonChat from './WhatsAppButtonChat';

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: '¡Hola! Soy Calíope, tu experta en Chronos. Pregúntame sobre cuidado de la piel, productos o rutinas. Estoy aquí para ayudarte a lucir tu mejor versión.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);

  const handleSend = (inputText: string, image: string | null) => {
    if ((!inputText.trim() && !image) || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      ...(image && { image }),
    };
    setMessages(prev => [...prev, userMessage]);

    const humanKeywords = ['humano', 'persona', 'agente', 'asesor', 'ayuda'];
    if (humanKeywords.some(keyword => inputText.toLowerCase().includes(keyword))) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: 'human-escalation-' + Date.now(),
          role: 'model',
          content: <WhatsAppButtonChat />,
        }]);
      }, 500);
      return;
    }

    setIsLoading(true);

    const historyForApi = [...messages, userMessage]
      .filter(msg => typeof msg.content === 'string')
      .map(msg => ({
        role: msg.role,
        parts: msg.image ? [{ text: msg.content as string }, { image: msg.image }] : [{ text: msg.content as string }],
      }));

    const modelResponseId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelResponseId, role: 'model', content: "..." }]);

    streamChatResponse({
      history: historyForApi,
      onChunk: (chunk) => {
        setMessages(prev => prev.map(msg =>
          msg.id === modelResponseId
            ? { ...msg, content: (typeof msg.content === 'string' && msg.content !== '...' ? msg.content : '') + chunk }
            : msg
        ));
      },
      onError: (error) => {
        setMessages(prev => prev.map(msg =>
          msg.id === modelResponseId
            ? { ...msg, content: `Lo siento, hubo un error. ${error.message}` }
            : msg
        ));
      },
      onComplete: () => setIsLoading(false),
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 transition-all duration-300 hover:scale-110 border border-slate-700"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
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

          <MessagesArea messages={messages} />
          <ChatInput onSend={handleSend} isLoading={isLoading} isThinkingMode={isThinkingMode} />
        </div>
      )}
    </>
  );
};

export default Chat;
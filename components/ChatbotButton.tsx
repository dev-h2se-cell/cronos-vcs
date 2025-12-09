import React from 'react';
import { Bot } from 'lucide-react';

interface ChatbotButtonProps {
  onClick: () => void;
}

export const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 p-3 bg-gradient-to-tr from-orange-500 to-purple-600 text-white rounded-full shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-110 flex items-center justify-center border border-white/20"
      aria-label="Abrir Chatbot"
    >
      <Bot size={24} fill="white" />
    </button>
  );
};

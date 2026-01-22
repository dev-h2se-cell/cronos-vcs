import React from 'react';
import { X, Bot } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-slate-900 p-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h3 id="chatbot-heading" className="text-white font-bold">Chronos Skin AI</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-slate-400">Online</span>
          </div>
        </div>
      </div>
      <button onClick={onClose} className="p-2 text-slate-400 hover:text-white" aria-label="Cerrar chat">
        <X size={20} />
      </button>
    </div>
  );
};

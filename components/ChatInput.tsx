import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon, X, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string, image: string | null) => void;
  isLoading: boolean;
  isThinkingMode: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, isThinkingMode }) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSendClick = () => {
    if ((!inputText.trim() && !selectedImage) || isLoading) return;
    onSend(inputText, selectedImage);
    setInputText('');
    setSelectedImage(null);
  };

  return (
    <div className="p-4 bg-white border-t border-slate-100">
      {selectedImage && (
        <div className="mb-2 flex items-center gap-2 bg-slate-100 p-2 rounded-lg text-xs text-slate-600">
          <ImageIcon size={14} />
          <span>Imagen adjunta</span>
          <button onClick={() => setSelectedImage(null)} className="ml-auto hover:text-red-500">
            <X size={14} />
          </button>
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
          disabled={isLoading}
        >
          <ImageIcon size={20} />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendClick()}
            placeholder={isThinkingMode ? "Pregunta compleja..." : "Escribe tu duda..."}
            disabled={isLoading}
            className="w-full bg-slate-100 text-slate-900 text-sm rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all disabled:opacity-50"
          />
        </div>

        <button
          onClick={handleSendClick}
          disabled={isLoading || (!inputText.trim() && !selectedImage)}
          className="p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 shadow-lg"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </div>
      <div className="text-[10px] text-center text-slate-400 mt-2">
        {isThinkingMode ? 'Usando Gemini 1.5 Pro' : 'Usando Gemini 1.5 Flash'}
      </div>
    </div>
  );
};

export default ChatInput;

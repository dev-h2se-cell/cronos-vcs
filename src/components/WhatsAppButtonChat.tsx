import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButtonChat: React.FC = () => {
  const phoneNumber = '573181436525'; 
  const message = 'Hola, vengo del chat de Chronos y necesito ayuda de un experto.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  return (
    <div className="mt-2">
      <p className="text-sm mb-3">
        Entiendo. Para una consulta más personalizada, puedes hablar con un agente humano por WhatsApp.
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold py-2.5 px-4 rounded-lg hover:bg-[#20bd5a] transition-all"
      >
        <MessageCircle size={18} />
        Hablar por WhatsApp
      </a>
    </div>
  );
};

export default WhatsAppButtonChat;

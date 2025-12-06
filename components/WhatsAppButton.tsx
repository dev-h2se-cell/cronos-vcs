
import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  // Replace with your actual phone number (international format without +)
  const phoneNumber = '573181436525'; 
  const message = 'Hola, estoy interesado en los productos Chronos.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-40 right-6 z-40 p-3 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 flex items-center justify-center border border-white/20"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} fill="white" className="text-white" />
    </a>
  );
};

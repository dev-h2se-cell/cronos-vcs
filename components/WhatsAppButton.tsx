import React from 'react';
import { MessageCircle } from 'lucide-react'; // Using a generic message icon

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '573181436525';
  const message = 'Hola, vengo del sitio web de Chronos y me gustaría obtener más información.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-28 right-6 z-40 p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 border border-white/50"
    >
      <MessageCircle size={24} />
    </a>
  );
};

export default WhatsAppButton;

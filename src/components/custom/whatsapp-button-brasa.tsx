'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/lib/constants-sushi-brasa';

interface WhatsAppButtonProps {
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
}

export default function WhatsAppButton({ 
  message = WHATSAPP_CONFIG.defaultMessage,
  position = 'bottom-right' 
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed ${positionClasses} z-50 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group`}
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Pedido Rápido via WhatsApp
      </span>
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
    </button>
  );
}

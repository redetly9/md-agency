'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

const PHONE = (process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '').replace(/\D/g, '');

export default function WhatsAppButton() {
  const pathname = usePathname() || '';
  if (!PHONE || pathname.startsWith('/teaser') || pathname.startsWith('/offer')) return null;
  const text = encodeURIComponent('Здравствуйте! Хочу узнать про аренду с выкупом.');
  return (
    <a href={`https://wa.me/${PHONE}?text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp"
      className="fixed z-30 right-4 bottom-20 md:bottom-6 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] flex items-center justify-center hover:scale-105 transition">
      <MessageCircle size={26} />
    </a>
  );
}

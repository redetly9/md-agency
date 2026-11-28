'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

// WhatsApp менеджера: 8 707 700 41 14 в международном формате
const PHONE = '77077004114';

export default function WhatsAppButton() {
  const pathname = usePathname() || '';
  if (pathname.startsWith('/teaser') || pathname.startsWith('/offer')) return null;
  const text = encodeURIComponent('Здравствуйте! Хочу узнать про аренду с выкупом.');
  const url = `https://api.whatsapp.com/send?phone=${PHONE}&text=${text}`;
  // На телефонах новая вкладка часто блокируется (встроенные браузеры Instagram/Telegram, блокировщики всплывающих окон),
  // поэтому там открываем чат в этой же вкладке — так ссылка сразу передаётся приложению WhatsApp.
  const open = (e: React.MouseEvent) => {
    if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) { e.preventDefault(); window.location.href = url; }
  };
  return (
    <a href={url} onClick={open} target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp"
      className="fixed z-30 right-4 bottom-20 md:bottom-6 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] flex items-center justify-center hover:scale-105 transition">
      <MessageCircle size={26} />
    </a>
  );
}

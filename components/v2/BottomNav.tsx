'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Calculator, User } from 'lucide-react';
import { useT } from './i18n';

const ITEMS = [
  { href: '/', key: 'nav.home', icon: Home, match: (p: string) => p === '/' },
  { href: '/catalog', key: 'nav.flats', icon: Search, match: (p: string) => p.startsWith('/listings') || p.startsWith('/catalog') || p.startsWith('/compare') },
  { href: '/#calc', key: 'nav.calcShort', icon: Calculator, match: (p: string) => p.startsWith('/arenda') || p.startsWith('/calculator') },
  { href: '/profiles', key: 'nav.profile', icon: User, match: (p: string) => p.startsWith('/profiles') },
];

export default function BottomNav() {
  const pathname = usePathname() || '/';
  const { t } = useT();
  if (pathname.startsWith('/teaser') || pathname.startsWith('/start')) return null;
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4 h-16">
        {ITEMS.map(({ href, key, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link key={href} href={href} className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium ${active ? 'text-brand' : 'text-ink-3'}`}>
              <span className={`w-10 h-7 rounded-full flex items-center justify-center transition ${active ? 'bg-brand-light' : ''}`}><Icon size={20} /></span>
              {t(key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

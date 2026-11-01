'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import Button from './Button';
import { useUser } from './useUser';

const NAV = [
  { href: '/catalog', label: 'Квартиры' },
  { href: '/#how', label: 'Как это работает' },
  { href: '/#calc', label: 'Калькулятор' },
  { href: '/teaser', label: 'Инвесторам' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  if (pathname?.startsWith('/teaser')) return null;

  return (
    <header className={`sticky top-0 z-40 bg-white/85 backdrop-blur border-b transition ${scrolled ? 'border-line' : 'border-transparent'}`}>
      <div className="v2-container h-16 flex items-center justify-between gap-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="px-3 py-2 rounded-lg text-[15px] text-ink-2 hover:text-ink hover:bg-slate-100 transition">{n.label}</Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" href={user ? "/profiles" : "/login"}>{user ? "Кабинет" : "Войти"}</Button>
          <Button href="/start">Узнать мой лимит</Button>
        </div>
        <button className="md:hidden p-2 -mr-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(o => !o)} aria-label="Меню">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-white">
          <div className="v2-container py-3 flex flex-col">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className="py-3 text-[15px] text-ink border-b border-line last:border-0">{n.label}</Link>
            ))}
            <div className="pt-3 flex gap-2">
              <Button variant="secondary" href={user ? "/profiles" : "/login"} full>{user ? "Кабинет" : "Войти"}</Button>
              <Button href="/start" full>Узнать лимит</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

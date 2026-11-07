'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CountrySelect from './CountrySelect';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import Button from './Button';
import { useUser } from './useUser';
import { useT, LangSwitch } from './i18n';

const NAV = [
  { href: '/catalog', key: 'nav.flats' },
  { href: '/arenda-s-vykupom', key: 'nav.terms' },
  { href: '/sellers', key: 'nav.sellers' },
  { href: '/investors', key: 'nav.investors' },
  { href: '/about', key: 'nav.about' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isHome = pathname === '/';
  const goBack = () => { if (typeof window !== 'undefined' && window.history.length > 1) router.back(); else router.push('/'); };
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();
  const { t } = useT();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  if (pathname?.startsWith('/teaser')) return null;

  return (
    <header className={`sticky top-0 z-40 bg-white/85 backdrop-blur border-b transition ${scrolled ? 'border-line' : 'border-transparent'}`}>
      <div className="v2-container h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          {!isHome && <button type="button" onClick={goBack} aria-label="Назад" className="md:hidden -ml-2 w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-ink"><ArrowLeft size={20} /></button>}
          <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="px-3 py-2 rounded-lg text-[15px] text-ink-2 hover:text-ink hover:bg-slate-100 transition">{t(n.key)}</Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <CountrySelect />
          <LangSwitch />
          <Button variant="ghost" href={user ? "/profiles" : "/login"}>{user ? t("nav.cabinet") : t("nav.login")}</Button>
          <Button href="/start">{t("nav.limit")}</Button>
        </div>
        <div className="md:hidden flex items-center gap-1"><CountrySelect compact /><LangSwitch /><button className="p-2 -mr-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(o => !o)} aria-label="Меню">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button></div>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-white">
          <div className="v2-container py-3 flex flex-col">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className="py-3 text-[15px] text-ink border-b border-line last:border-0">{t(n.key)}</Link>
            ))}
            <div className="pt-3 flex gap-2">
              <Button variant="secondary" href={user ? "/profiles" : "/login"} full>{user ? t("nav.cabinet") : t("nav.login")}</Button>
              <Button href="/start" full>{t("nav.limit")}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

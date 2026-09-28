'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import {
  ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight,
  Home, Laptop, ShieldCheck, Users, Search, Calculator, FileText, CreditCard,
  UserCheck, TrendingUp, Coins, CalendarDays, RefreshCw, Building2, Globe,
  Landmark, Handshake, HeartHandshake, PiggyBank, Gem, Leaf, MapPin, Phone,
  Sparkles, BadgeCheck, Umbrella, Target, Layers, Database, Award, BarChart3,
} from 'lucide-react';
import { useMoveBack } from '@/hooks/useMoveBack';

const serif = Playfair_Display({ subsets: ['cyrillic', 'latin'], weight: ['500', '600', '700'], display: 'swap' });

const SLIDES = [
  { src: '/teaser/slide-1.jpg', mobile: '/teaser/mobile-1.jpg', title: 'Digital Rent-to-Own Platform' },
  { src: '/teaser/slide-2.jpg', mobile: '/teaser/mobile-2.jpg', title: 'Проблема' },
  { src: '/teaser/slide-3.jpg', mobile: '/teaser/mobile-3.jpg', title: 'Решение' },
  { src: '/teaser/slide-4.jpg', mobile: '/teaser/mobile-4.jpg', title: 'Бизнес-модель' },
  { src: '/teaser/slide-5.jpg', mobile: '/teaser/mobile-5.jpg', title: '5 шагов к масштабированию' },
  { src: '/teaser/slide-6.jpg', mobile: '/teaser/mobile-6.jpg', title: 'Для инвесторов и партнёров' },
  { src: '/teaser/slide-7.jpg', mobile: '/teaser/mobile-7.jpg', title: 'Защита инвесторов' },
  { src: '/teaser/slide-8.jpg', mobile: '/teaser/mobile-8.jpg', title: 'Больше, чем просто квартиры' },
];

/* ---------- small building blocks ---------- */

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase ${light ? 'text-[#8a6d2b]' : 'text-[#d4af5a]'}`}>
      <span className={`h-px w-6 ${light ? 'bg-[#8a6d2b]' : 'bg-[#d4af5a]'}`} />
      {children}
    </div>
  );
}

function GoldIcon({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${
      light ? 'border-[#d4af5a]/60 bg-white text-[#8a6d2b]' : 'border-[#d4af5a]/60 bg-[#d4af5a]/10 text-[#e6c87a]'
    }`}>
      {children}
    </div>
  );
}

function Feature({ icon, title, text, light = false }: { icon: React.ReactNode; title: string; text?: string; light?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <GoldIcon light={light}>{icon}</GoldIcon>
      <div>
        <div className={`text-sm font-semibold leading-snug ${light ? 'text-[#0b1626]' : 'text-white'}`}>{title}</div>
        {text && <div className={`text-xs mt-1 leading-relaxed ${light ? 'text-[#4b5563]' : 'text-white/60'}`}>{text}</div>}
      </div>
    </div>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-[#d4af5a]/40 bg-gradient-to-br from-[#152238] to-[#0b1626] p-5">
      <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#e6c87a] to-transparent" />
      <p className={`${serif.className} text-white text-lg leading-snug`}>{children}</p>
    </div>
  );
}

function Section({ id, children, light = false, className = '' }: { id?: string; children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <section id={id} className={`${light ? 'bg-[#f6f1e8] text-[#0b1626]' : 'bg-[#0b1626] text-white'} ${className}`}>
      <div className="max-w-5xl mx-auto px-5 py-12 md:py-20">{children}</div>
    </section>
  );
}

/* image with dark gradient, portrait on mobile / wide on desktop */
function Visual({ i, className = '' }: { i: number; className?: string }) {
  const s = SLIDES[i];
  return (
    <div className={`relative overflow-hidden rounded-3xl ring-1 ring-white/10 aspect-[9/16] md:aspect-auto ${className}`}>
      <picture>
        <source media="(min-width: 768px)" srcSet={s.src} />
        <img src={s.mobile} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
      </picture>
      <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-[#0b1626] via-transparent to-transparent" />
    </div>
  );
}

/* ---------- page ---------- */

export default function TeaserPage() {
  const moveBack = useMoveBack();
  const [open, setOpen] = useState<number | null>(null);
  const [touchX, setTouchX] = useState<number | null>(null);

  const next = useCallback(() => setOpen(o => (o === null ? null : (o + 1) % SLIDES.length)), []);
  const prev = useCallback(() => setOpen(o => (o === null ? null : (o - 1 + SLIDES.length) % SLIDES.length)), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, next, prev]);

  return (
    <div className="bg-[#0b1626] text-white overflow-x-clip">
      <style jsx global>{`
        .t-gold {
          background: linear-gradient(100deg, #f3dd9a 0%, #d4af5a 45%, #b8892e 70%, #f0d58a 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .t-snap { scroll-snap-type: x mandatory; }
        .t-snap > * { scroll-snap-align: center; }
      `}</style>

      {/* top bar */}
      <header className="sticky top-0 z-40 bg-[#0b1626]/85 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={moveBack} aria-label="Назад" className="text-white/80 hover:text-white">
              <ArrowLeft size={22} />
            </button>
            <img src="/teaser/logo.svg" alt="MD — Rent · Live · Own" className="h-9" />
          </div>
          <a href="#contact" className="text-xs md:text-sm px-4 py-2 rounded-full bg-gradient-to-r from-[#e6c87a] to-[#b8892e] text-[#0b1626] font-semibold">
            Стать инвестором
          </a>
        </div>
      </header>

      {/* ================= HERO ================= */}
      {/* mobile hero: ready-made portrait poster */}
      <section className="md:hidden">
        <img src="/teaser/mobile-1.jpg" alt="Аренда жилья с выкупом — цифровая платформа MD" className="w-full aspect-[9/16] object-cover" />
        <div className="px-5 py-6 grid grid-cols-2 gap-3">
          {[
            [<Home key="h" size={18} />, 'Современные квартиры'],
            [<Laptop key="l" size={18} />, 'Цифровая платформа'],
            [<ShieldCheck key="s" size={18} />, 'Прозрачные условия'],
            [<Users key="u" size={18} />, 'Доступно большему числу семей'],
          ].map(([icon, label], i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-white/85 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <span className="text-[#e6c87a]">{icon}</span>{label as string}
            </div>
          ))}
        </div>
      </section>

      <section className="relative hidden md:flex min-h-[80vh] items-end overflow-hidden">
        <img src="/teaser/slide-1.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1626] via-[#0b1626]/80 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-5 py-24 w-full">
          <Eyebrow>Инвестиционный teaser</Eyebrow>
          <h1 className={`${serif.className} mt-4 text-4xl s:text-5xl md:text-6xl leading-[1.05]`}>
            Digital<br />
            <span className="t-gold">Rent-to-Own</span><br />
            Platform
          </h1>
          <p className="mt-4 text-white/75 max-w-md text-base md:text-lg">
            Цифровая платформа аренды жилья с выкупом.
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
            <MapPin size={16} className="text-[#e6c87a]" /> Казахстан <ArrowRight size={14} /> Центральная Азия
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
            {[
              [<Home key="h" size={18} />, 'Современные квартиры'],
              [<Laptop key="l" size={18} />, 'Цифровая платформа'],
              [<ShieldCheck key="s" size={18} />, 'Прозрачные условия'],
              [<Users key="u" size={18} />, 'Доступно большему числу семей'],
            ].map(([icon, label], i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-white/85 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                <span className="text-[#e6c87a]">{icon}</span>{label as string}
              </div>
            ))}
          </div>

          <div className="mt-8 flex s:inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#f3dd9a] via-[#d4af5a] to-[#b8892e] text-[#0b1626] px-5 py-4 shadow-[0_10px_40px_rgba(212,175,90,0.35)]">
            <Coins size={30} className="hidden s:block shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] tracking-[0.2em] uppercase font-semibold opacity-80">Привлекаем инвестиции</div>
              <div className={`${serif.className} text-[22px] s:text-2xl md:text-3xl font-semibold leading-tight mt-1`}>$500 000 – $1 000 000</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <Section light>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Eyebrow light>Проблема</Eyebrow>
            <h2 className={`${serif.className} mt-4 text-3xl md:text-4xl leading-tight`}>
              Жильё есть.<br />Несоответствие требованиям ипотек.
            </h2>
            <p className="mt-4 text-[#4b5563] leading-relaxed">
              Многие потенциальные покупатели жилья не соответствуют стандартным требованиям банковской ипотеки.
              Одновременно собственникам недвижимости нужен понятный и быстрый способ продажи.
            </p>
            <div className="mt-6 grid grid-cols-1 s:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white border border-red-200 p-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center border border-red-300 bg-red-50 text-red-600"><Users size={20} /></div>
                <div className="mt-3 text-xs font-bold tracking-wide uppercase text-red-700">Проблемы покупателей</div>
                <ul className="mt-2 text-sm text-red-700 space-y-1.5">
                  {['не проходят ипотеку', 'нет достаточного дохода', 'высокая ставка', 'длительный процесс'].map(t => (
                    <li key={t} className="flex gap-2"><X size={14} className="shrink-0 mt-0.5" />{t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white border border-green-200 p-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center border border-green-300 bg-green-50 text-green-700"><Home size={20} /></div>
                <div className="mt-3 text-xs font-bold tracking-wide uppercase text-green-700">Потребности покупателей</div>
                <ul className="mt-2 text-sm text-green-700 space-y-1.5">
                  {['без подтверждения доходности', 'низкий процент годовой ставки', 'низкая сумма ежемесячных платежей', 'срок не менее 20–40 лет'].map(t => (
                    <li key={t} className="flex gap-2"><BadgeCheck size={14} className="shrink-0 mt-0.5" />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-[#0b1626] text-white p-4 flex items-center gap-4">
              <img src="/teaser/logo.svg" alt="MD" className="h-10" />
              <p className="text-sm"><b className="text-[#e6c87a]">MD соединяет эти две стороны</b> через модель аренды с последующим выкупом.</p>
            </div>
          </div>
          <Visual i={1} className="aspect-[4/5] md:aspect-auto md:h-[520px] order-first md:order-last" />
        </div>
      </Section>

      {/* ================= SOLUTION ================= */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Visual i={2} className="aspect-[4/5] md:aspect-auto md:h-[520px]" />
          <div>
            <Eyebrow>Решение</Eyebrow>
            <h2 className={`${serif.className} mt-4 text-3xl md:text-4xl leading-tight`}>
              MD — <span className="t-gold">цифровая инфраструктура</span> сделки
            </h2>
            <p className="mt-3 text-white/70">Платформа обеспечивает:</p>
            <div className="mt-6 grid grid-cols-1 s:grid-cols-2 gap-4">
              <Feature icon={<Search size={20} />} title="Подбор и проверку объекта" />
              <Feature icon={<Calculator size={20} />} title="Цифровой расчёт условий" />
              <Feature icon={<FileText size={20} />} title="Стандартизированное оформление сделки" />
              <Feature icon={<CreditCard size={20} />} title="Управление платежами и договором" />
              <Feature icon={<UserCheck size={20} />} title="Сопровождение покупателя" />
              <Feature icon={<TrendingUp size={20} />} title="Масштабирование модели на новые рынки" />
            </div>
            <div className="mt-8">
              <Quote>Недвижимость — базовый актив.<br /><span className="t-gold">Платформа — механизм масштабирования.</span></Quote>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= BUSINESS MODEL ================= */}
      <Section className="border-t border-white/5">
        <Eyebrow>Бизнес-модель</Eyebrow>
        <h2 className={`${serif.className} mt-4 text-4xl md:text-5xl`}>Аренда + <span className="t-gold">Выкуп</span></h2>
        <div className="grid md:grid-cols-2 gap-8 mt-6 items-start">
          <div>
            <p className="text-white/75 leading-relaxed">
              MD приобретает жилую недвижимость и предоставляет клиенту возможность проживать в объекте с последующим выкупом
              на заранее согласованных условиях.
            </p>
            <div className="mt-6 text-[11px] tracking-[0.25em] uppercase text-[#d4af5a]">Ключевой принцип</div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                [<Coins key="1" size={22} />, 'Фиксированная экономика сделки'],
                [<CalendarDays key="2" size={22} />, 'Длительный денежный поток'],
                [<RefreshCw key="3" size={22} />, 'Повторное использование капитала'],
              ].map(([icon, label], i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <GoldIcon>{icon}</GoldIcon>
                  <div className="text-[11px] leading-snug text-white/80">{label as string}</div>
                </div>
              ))}
            </div>
          </div>
          <Visual i={3} className="aspect-[4/5] md:aspect-auto md:h-[360px]" />
        </div>

        <div className="mt-10 rounded-3xl bg-[#f6f1e8] text-[#0b1626] p-5 md:p-7">
          <div className="flex items-start gap-3 text-sm text-[#4b5563]">
            <GoldIcon light><Landmark size={18} /></GoldIcon>
            <p className="pt-2">Модель может работать с различными юридическими структурами оформления права собственности в зависимости от условий сделки.</p>
          </div>
          <ol className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              [<Building2 key="a" size={20} />, 'Покупка объекта'],
              [<FileText key="b" size={20} />, 'Оформление договора аренды с выкупом'],
              [<ShieldCheck key="c" size={20} />, 'Регистрация обременения (при необходимости)'],
              [<UserCheck key="d" size={20} />, 'Сопровождение клиента на всех этапах'],
              [<Home key="e" size={20} />, 'Выкуп в собственность после полной оплаты'],
            ].map(([icon, label], i) => (
              <li key={i} className="relative flex md:flex-col items-center md:items-start gap-3 rounded-2xl bg-white border border-[#e7dcc4] p-4">
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#0b1626] text-[#e6c87a] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <GoldIcon light>{icon}</GoldIcon>
                <span className="text-sm font-medium leading-snug">{label as string}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ================= SCALING ================= */}
      <Section className="border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Eyebrow>Масштабирование · от отдельных сделок к платформе</Eyebrow>
            <h2 className={`${serif.className} mt-4 text-4xl md:text-5xl leading-tight`}>
              <span className="t-gold">5 шагов</span><br />к масштабированию
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Мы создаём не просто портфель квартир, а воспроизводимую цифровую платформу, которая может работать в разных городах и странах.
            </p>
            <ol className="mt-6 space-y-3">
              {[
                [<FileText key="1" size={18} />, 'Стандартизация сделки', 'Единые правила, юридические схемы и условия.'],
                [<Laptop key="2" size={18} />, 'Цифровизация клиентского пути', 'Онлайн-платформа, автоматизация и удобство.'],
                [<Database key="3" size={18} />, 'Централизованное управление портфелем', 'Прозрачность, контроль и эффективность.'],
                [<RefreshCw key="4" size={18} />, 'Реинвестирование денежных потоков', 'Больше объектов — больше оборота.'],
                [<Globe key="5" size={18} />, 'Выход в новые города и страны', 'Расширение географии и рост капитализации.'],
              ].map(([icon, title, text], i) => (
                <li key={i} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-transparent p-3"
                    style={{ marginLeft: `${i * 6}px` }}>
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e6c87a] to-[#b8892e] text-[#0b1626] font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-[#e6c87a]">{icon}</span>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide">{title as string}</div>
                    <div className="text-xs text-white/60">{text as string}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-4">
            <Visual i={4} className="aspect-[4/5] md:aspect-auto md:h-[380px]" />
            <div className="rounded-2xl border border-[#d4af5a]/40 p-5">
              <div className="text-[11px] tracking-[0.25em] uppercase text-[#d4af5a]">От Казахстана к Центральной Азии</div>
              <div className="text-xs text-white/50 mt-1">Дальше — по всему миру</div>
              <div className="mt-4 space-y-3">
                <Feature icon={<Building2 size={18} />} title="Города Казахстана" text="Алматы, Астана, Шымкент, другие регионы" />
                <Feature icon={<Globe size={18} />} title="Страны Центральной Азии" text="Казахстан, Узбекистан, Кыргызстан, Таджикистан, Туркменистан" />
                <Feature icon={<Layers size={18} />} title="Международные рынки" text="Выход на новые рынки по мере роста капитала и партнёрств" />
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-start gap-3">
              <Target className="text-[#e6c87a] shrink-0" size={22} />
              <p className="text-sm"><b>Цель:</b> создать воспроизводимую PropTech-модель, а не просто портфель квартир.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= INVESTORS ================= */}
      <Section light>
        <Eyebrow light>Привлечение инвесторов и партнёров</Eyebrow>
        <h2 className={`${serif.className} mt-4 text-3xl md:text-5xl leading-tight`}>
          Потенциал для стратегических инвесторов и партнёров
        </h2>
        <p className="mt-4 text-[#4b5563] max-w-2xl">Мы создаём устойчивый, масштабируемый бизнес с высокой доходностью и социальной значимостью.</p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            [<BarChart3 key="1" size={22} />, '20%', 'Годовая доходность'],
            [<Coins key="2" size={22} />, '$30.0B', 'Объём рынка (Казахстан)'],
            [<CalendarDays key="3" size={22} />, '6 лет', 'Срок инвестирования'],
          ].map(([icon, num, label], i) => (
            <div key={i} className="rounded-2xl bg-[#0b1626] text-white px-2 py-4 flex flex-col items-center text-center min-w-0">
              <span className="text-[#e6c87a]">{icon}</span>
              <div className={`${serif.className} t-gold text-2xl s:text-3xl md:text-4xl font-semibold mt-2`}>{num as string}</div>
              <div className="text-[10px] s:text-xs text-white/60 mt-1 leading-tight">{label as string}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
          <Visual i={5} className="aspect-[4/5] md:aspect-auto md:h-[420px]" />
          <div className="grid grid-cols-2 gap-4">
            <Feature light icon={<TrendingUp size={20} />} title="Стабильная доходность" text="Ежегодная прибыльность до 20%." />
            <Feature light icon={<Home size={20} />} title="Большой рынок" text="Объём рынка недвижимости в Казахстане — $30 млрд." />
            <Feature light icon={<ShieldCheck size={20} />} title="Надёжная модель" text="Проверенная схема аренды с выкупом и низкие риски." />
            <Feature light icon={<Handshake size={20} />} title="Партнёрство" text="Открыты к сотрудничеству со стратегическими инвесторами и локационными партнёрами." />
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-[1.2fr_1fr] gap-4">
          <div className="rounded-3xl bg-[#0b1626] text-white p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#d4af5a]/20 blur-3xl" />
            <div className="flex items-center gap-3">
              <GoldIcon><HeartHandshake size={22} /></GoldIcon>
              <div className="text-xs tracking-[0.2em] uppercase text-[#e6c87a]">Инвестиционное предложение</div>
            </div>
            <div className="mt-3 text-sm text-white/60">Инвестиции от</div>
            <div className={`${serif.className} t-gold text-4xl md:text-5xl font-semibold`}>$1 000 000</div>
            <ul className="mt-4 space-y-1.5 text-sm text-white/85">
              {['Участие в проекте на выгодных условиях', 'Доля в прибыли от арендного потока', 'Возможность увеличения капитала через масштабирование', 'Гибкие условия сотрудничества'].map(t => (
                <li key={t} className="flex gap-2"><BadgeCheck size={16} className="text-[#e6c87a] shrink-0 mt-0.5" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white border border-[#e7dcc4] p-6">
            <div className="text-xs tracking-[0.2em] uppercase font-bold">Мы ищем партнёров</div>
            <div className="mt-4 space-y-4">
              <Feature light icon={<Users size={20} />} title="Стратегические инвесторы" text="Для совместного роста и долгосрочного участия." />
              <Feature light icon={<MapPin size={20} />} title="Локационные партнёры" text="Агентства, риэлторы, девелоперы и региональные представители." />
            </div>
            <div className={`${serif.className} mt-6 text-lg`}>Вместе строим больше.</div>
          </div>
        </div>
      </Section>

      {/* ================= PROTECTION ================= */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Eyebrow>Наши возможности</Eyebrow>
            <h2 className={`${serif.className} mt-4 text-3xl md:text-5xl leading-tight`}>
              Защита инвесторов.<br /><span className="t-gold">Стабильный доход.</span>
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Мы предлагаем надёжную модель с прозрачной экономикой, поддержкой партнёров и государственным вектором развития в Казахстане и Центральной Азии.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              {[['🇰🇿', 'Казахстан', 'Основа проекта. Масштабирование по стране.'], ['🗺️', 'Центральная Азия', 'Узбекистан, Кыргызстан, Таджикистан, Туркменистан.'], ['🌐', 'Международный рынок', 'Выход на рынки других стран.']].map(([e, t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl">{e}</div>
                  <div className="text-xs font-bold uppercase tracking-wide mt-2">{t}</div>
                  <div className="text-[10px] text-white/55 mt-1 leading-snug">{d}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Quote>«Мы создаём не просто бизнес. <span className="t-gold">Мы создаём будущее для людей и стран»</span></Quote>
            </div>
          </div>
          <div className="space-y-4">
            <Visual i={6} className="aspect-[4/5] md:aspect-auto md:h-[320px]" />
            <div className="rounded-2xl border border-[#d4af5a]/40 p-5">
              <div className="text-[11px] tracking-[0.25em] uppercase text-[#d4af5a]">Почему MD — надёжный партнёр</div>
              <div className="mt-4 space-y-3">
                <Feature icon={<Landmark size={18} />} title="Государственная поддержка" text="Стратегия развития, льготы, инфраструктура." />
                <Feature icon={<Handshake size={18} />} title="Прозрачная модель" text="Чёткие финансовые потоки, контроль и отчётность." />
                <Feature icon={<TrendingUp size={18} />} title="Стабильная доходность" text="Ежегодный доход до 20%." />
                <Feature icon={<Users size={18} />} title="Социальная значимость" text="Доступное жильё для тысяч семей. Устойчивое развитие общества." />
                <Feature icon={<Umbrella size={18} />} title="Страховая защита" text="Партнёрство с международными страховыми компаниями." />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            [<PiggyBank key="1" size={20} />, 'Потребность в финансировании', '$38 млн', 'LOI — на ипотеку и аренду с выкупом.'],
            [<Users key="2" size={20} />, 'Привлечение инвесторов', '$10 млн', '30% годовых доля прибыли.'],
            [<Award key="3" size={20} />, 'Инвестиционный тикет', 'от $1 млн', 'Срок: 6 лет. Доходность: 30% годовых.'],
            [<Home key="4" size={20} />, 'Рынок недвижимости', '$30.0 млрд', 'Общий объём рынка в Казахстане.'],
          ].map(([icon, label, num, text], i) => (
            <div key={i} className="rounded-2xl bg-[#f6f1e8] text-[#0b1626] p-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide font-bold text-[#4b5563]">
                <span className="text-[#8a6d2b]">{icon}</span>{label as string}
              </div>
              <div className={`${serif.className} text-2xl md:text-3xl font-semibold mt-2`}>{num as string}</div>
              <div className="text-[11px] text-[#4b5563] mt-1">{text as string}</div>
            </div>
          ))}
        </div>
        <p className={`${serif.className} mt-6 text-center text-white/70 italic`}>Инвестиции сегодня — это стабильное будущее завтра.</p>
      </Section>

      {/* ================= MISSION ================= */}
      <Section light id="contact">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Visual i={7} className="aspect-[4/5] md:aspect-auto md:h-[520px]" />
          <div>
            <Eyebrow light>Наша миссия · строить лучшее будущее вместе</Eyebrow>
            <h2 className={`${serif.className} mt-4 text-3xl md:text-5xl leading-tight`}>Больше, чем просто квартиры</h2>
            <p className="mt-4 text-[#4b5563] leading-relaxed">
              Мы создаём не просто жильё, мы создаём сообщество людей, которые верят в стабильность, развитие и уверенность в завтрашнем дне.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Feature light icon={<ShieldCheck size={20} />} title="Надёжность" text="Прозрачные условия. Чёткие обязательства. Реальная поддержка." />
              <Feature light icon={<Users size={20} />} title="Сообщество" text="Клуб MD — это люди, которые растут вместе." />
              <Feature light icon={<TrendingUp size={20} />} title="Развитие" text="Инвестиции, карьера, образование, новые возможности." />
              <Feature light icon={<Sparkles size={20} />} title="Семья" text="Стабильность сегодня — уверенность завтра." />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {[[<BadgeCheck key="1" size={14} />, 'Честность'], [<Handshake key="2" size={14} />, 'Партнёрство'], [<Gem key="3" size={14} />, 'Качество'], [<Leaf key="4" size={14} />, 'Устойчивое развитие'], [<Users key="5" size={14} />, 'Люди']].map(([i, t], k) => (
                <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af5a]/60 bg-white px-3 py-1 text-xs font-medium text-[#8a6d2b]">{i}{t as string}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-[#0b1626] text-white p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="min-w-0">
            <p className={`${serif.className} italic text-white/80`}>«Сегодня мы помогаем людям обрести дом, а завтра — вместе строим сильный Казахстан».</p>
            <div className={`${serif.className} mt-3 text-xl`}>Ваш дом. <span className="t-gold">Наше общее будущее.</span></div>
          </div>
          <div className="flex flex-col gap-3 min-w-0">
            <Link href="/arenda-s-vykupom" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e6c87a] to-[#b8892e] text-[#0b1626] font-semibold px-6 py-3 text-sm">
              <Home size={16} /> Стать частью сообщества
            </Link>
            <Link href="/support" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm hover:bg-white/5">
              <Phone size={16} /> Консультация
            </Link>
          </div>
        </div>
      </Section>

      {/* ================= ORIGINAL SLIDES ================= */}
      <Section className="border-t border-white/5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Презентация</Eyebrow>
            <h2 className={`${serif.className} mt-3 text-2xl md:text-4xl`}>Слайды тизера</h2>
          </div>
          <div className="text-xs text-white/50">{SLIDES.length} слайдов · нажмите, чтобы открыть</div>
        </div>
        <div className="mt-6 -mx-5 px-5 flex gap-3 overflow-x-auto scrollbar-hide t-snap md:grid md:grid-cols-2 md:overflow-visible md:mx-0 md:px-0">
          {SLIDES.map((s, i) => (
            <button key={s.src} onClick={() => setOpen(i)}
              className="relative shrink-0 w-[70vw] max-w-[320px] md:w-auto md:max-w-none rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-[#d4af5a]/60 transition">
              <picture>
                <source media="(min-width: 768px)" srcSet={s.src} />
                <img src={s.mobile} alt={s.title} className="w-full aspect-[9/16] md:aspect-video object-cover" loading="lazy" />
              </picture>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-left">
                <div className="text-[10px] text-[#e6c87a] tracking-widest">{String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}</div>
                <div className="text-sm font-medium">{s.title}</div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <div className="bg-[#0b1626] text-center text-[10px] text-white/30 py-6 border-t border-white/5">
        MD · Rent · Live · Own — Инвестиционный teaser
      </div>

      {/* ================= LIGHTBOX ================= */}
      {open !== null && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center select-none"
          onTouchStart={e => setTouchX(e.touches[0].clientX)}
          onTouchEnd={e => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
            setTouchX(null);
          }}>
          <div className="absolute top-0 inset-x-0 h-14 flex items-center justify-between px-4 text-white z-10">
            <div className="text-xs text-white/70">{open + 1} / {SLIDES.length} · {SLIDES[open].title}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(null)} aria-label="Закрыть" className="p-2 rounded-full bg-white/10"><X size={20} /></button>
            </div>
          </div>
          <picture>
            <source media="(min-width: 768px)" srcSet={SLIDES[open].src} />
            <img src={SLIDES[open].mobile} alt={SLIDES[open].title} className="object-contain" style={{ maxWidth: '100vw', maxHeight: '100vh' }} />
          </picture>
          <button onClick={prev} aria-label="Предыдущий" className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white"><ChevronLeft size={24} /></button>
          <button onClick={next} aria-label="Следующий" className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white"><ChevronRight size={24} /></button>
        </div>,
        document.body
      )}
    </div>
  );
}

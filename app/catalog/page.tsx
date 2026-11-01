'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ListingCard from '@/components/v2/ListingCard';
import CompareBar from '@/components/v2/CompareBar';
import Button from '@/components/v2/Button';
import { fmt, maxPrice } from '@/components/v2/calc';
import type { Snap } from '@/components/v2/compare';

const CITIES = [['almaty', 'Алматы'], ['astana', 'Астана'], ['shymkent', 'Шымкент'], ['karaganda', 'Караганда'], ['aktobe', 'Актобе'], ['taraz', 'Тараз'], ['pavlodar', 'Павлодар'], ['atyrau', 'Атырау']];
const ROOMS = ['1', '2', '3', '4', '5'];
const BUDGETS = [150000, 200000, 250000, 300000, 400000, 500000];

function CatalogInner() {
  const sp = useSearchParams(); const router = useRouter();
  const region = sp.get('region') || 'almaty';
  const rooms = sp.get('rooms') || '';
  const priceTo = sp.get('priceTo') || '';
  const priceFrom = sp.get('priceFrom') || '';
  const budget = sp.get('budget') || '';
  const page = parseInt(sp.get('page') || '1', 10) || 1;
  const [data, setData] = useState<{ listings: Snap[]; totalPages: number } | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const set = (patch: Record<string, string | null>) => {
    const n = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => (v ? n.set(k, v) : n.delete(k)));
    if (!('page' in patch)) n.delete('page');
    router.push(`/catalog?${n.toString()}`);
  };

  // «платёж до N ₸/мес» → максимальная цена при взносе 30% и сроке 30 лет
  const budgetPrice = useMemo(() => (budget ? maxPrice(+budget, Number.MAX_SAFE_INTEGER, 360) : 0), [budget]);
  const effectivePriceTo = budget ? String(Math.round(budgetPrice / 0.7)) : priceTo;

  useEffect(() => {
    setData(null);
    const url = new URL('/api/krisha/listings', window.location.origin);
    url.searchParams.set('dealType', 'prodazha'); url.searchParams.set('propertyType', 'kvartiry');
    url.searchParams.set('region', region); url.searchParams.set('page', String(page));
    if (rooms) url.searchParams.set('rooms', rooms);
    if (priceFrom) url.searchParams.set('priceFrom', priceFrom);
    if (effectivePriceTo) url.searchParams.set('priceTo', effectivePriceTo);
    fetch(url).then(r => r.json()).then(d => setData({ listings: Array.isArray(d.listings) ? d.listings : [], totalPages: d.pagination?.totalPages || 1 })).catch(() => setData({ listings: [], totalPages: 1 }));
  }, [region, rooms, priceFrom, effectivePriceTo, page]);

  const selectedRooms = rooms ? rooms.split(',') : [];
  const toggleRoom = (r: string) => { const n = selectedRooms.includes(r) ? selectedRooms.filter(x => x !== r) : [...selectedRooms, r]; set({ rooms: n.join(',') || null }); };
  const active = [rooms, priceFrom, priceTo, budget].filter(Boolean).length;

  return (
    <div className="v2-container py-6 sm:py-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink">Квартиры в аренду с выкупом</h1>
          <p className="mt-1 text-ink-2">На карточке ваш ориентировочный платёж при взносе 30% и сроке 30 лет.</p>
        </div>
        <button type="button" onClick={() => setShowFilters(s => !s)} className="md:hidden inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-line text-sm font-semibold">
          <SlidersHorizontal size={16} /> Фильтры {active ? <span className="w-5 h-5 rounded-full bg-brand text-white text-[11px] flex items-center justify-center">{active}</span> : null}
        </button>
      </div>

      {/* city chips */}
      <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {CITIES.map(([id, name]) => (
          <button key={id} type="button" onClick={() => set({ region: id })}
            className={`shrink-0 h-9 px-4 rounded-full text-sm font-semibold border transition ${region === id ? 'bg-ink text-white border-ink' : 'border-line text-ink-2 hover:border-ink-3'}`}>{name}</button>
        ))}
      </div>

      <div className="mt-6 grid md:grid-cols-[260px_1fr] gap-6 items-start">
        {/* filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block v2-card p-4 md:sticky md:top-24`}>
          <div className="flex items-center justify-between"><div className="font-bold text-ink">Фильтры</div>{active ? <button type="button" onClick={() => set({ rooms: null, priceFrom: null, priceTo: null, budget: null })} className="text-xs text-brand font-semibold">Сбросить</button> : null}</div>
          <div className="mt-4">
            <div className="text-xs font-semibold text-ink-2 uppercase tracking-wide">Платёж в месяц до</div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {BUDGETS.map(b => (
                <button key={b} type="button" onClick={() => set({ budget: budget === String(b) ? null : String(b), priceTo: null })}
                  className={`h-9 rounded-lg text-xs font-semibold border transition ${budget === String(b) ? 'bg-brand-soft border-brand text-brand' : 'border-line text-ink-2'}`}>{fmt(b / 1000)} т.</button>
              ))}
            </div>
            {budget && <div className="mt-2 text-xs text-ink-3">Квартиры примерно до {fmt(budgetPrice / 0.7)} ₸ при взносе 30%.</div>}
          </div>
          <div className="mt-4">
            <div className="text-xs font-semibold text-ink-2 uppercase tracking-wide">Комнат</div>
            <div className="mt-2 flex gap-1.5">
              {ROOMS.map(r => (
                <button key={r} type="button" onClick={() => toggleRoom(r)} className={`flex-1 h-9 rounded-lg text-sm font-semibold border transition ${selectedRooms.includes(r) ? 'bg-ink text-white border-ink' : 'border-line text-ink-2'}`}>{r === '5' ? '5+' : r}</button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs font-semibold text-ink-2 uppercase tracking-wide">Цена, ₸</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input className="v2-input h-10 text-sm" placeholder="от" inputMode="numeric" defaultValue={priceFrom} onBlur={e => set({ priceFrom: e.target.value.replace(/\D/g, '') || null })} />
              <input className="v2-input h-10 text-sm" placeholder="до" inputMode="numeric" defaultValue={priceTo} onBlur={e => set({ priceTo: e.target.value.replace(/\D/g, '') || null, budget: null })} />
            </div>
          </div>
          <Button href="/start" variant="secondary" full className="mt-5">Узнать мой лимит</Button>
        </aside>

        {/* results */}
        <div>
          {active > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {budget && <Chip onX={() => set({ budget: null })}>до {fmt(+budget)} ₸/мес</Chip>}
              {rooms && <Chip onX={() => set({ rooms: null })}>{rooms.split(',').join(', ')} комн.</Chip>}
              {priceFrom && <Chip onX={() => set({ priceFrom: null })}>от {fmt(+priceFrom)} ₸</Chip>}
              {priceTo && <Chip onX={() => set({ priceTo: null })}>до {fmt(+priceTo)} ₸</Chip>}
            </div>
          )}
          {data === null ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">{Array.from({ length: 9 }).map((_, i) => <div key={i} className="aspect-[4/5] rounded-2xl bg-slate-100 animate-pulse" />)}</div>
          ) : data.listings.length === 0 ? (
            <div className="v2-card p-10 text-center text-ink-2">Ничего не нашли. Попробуйте изменить фильтры.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">{data.listings.map(l => <ListingCard key={l.id} l={l} />)}</div>
          )}
          {data && data.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button type="button" disabled={page <= 1} onClick={() => set({ page: String(page - 1) })} className="h-10 w-10 rounded-xl border border-line flex items-center justify-center disabled:opacity-40"><ChevronLeft size={18} /></button>
              <span className="text-sm text-ink-2">Страница {page} из {data.totalPages}</span>
              <button type="button" disabled={page >= data.totalPages} onClick={() => set({ page: String(page + 1) })} className="h-10 w-10 rounded-xl border border-line flex items-center justify-center disabled:opacity-40"><ChevronRight size={18} /></button>
            </div>
          )}
        </div>
      </div>
      <CompareBar />
    </div>
  );
}

function Chip({ children, onX }: { children: React.ReactNode; onX: () => void }) {
  return <span className="inline-flex items-center gap-1 h-8 pl-3 pr-2 rounded-full bg-brand-soft text-brand text-xs font-semibold">{children}<button type="button" onClick={onX} className="p-0.5"><X size={12} /></button></span>;
}

export default function CatalogPage() {
  return <Suspense fallback={<div className="v2-container py-10 text-ink-2">Загрузка…</div>}><CatalogInner /></Suspense>;
}

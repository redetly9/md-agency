'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Heart } from 'lucide-react';
import { fmt, quote } from './calc';

type L = { id: string; imageSrc: string; price: number; roomCount: number; street: string; district: string; city: string; area?: string };

export default function ListingsPreview({ limit = 6, maxPrice }: { limit?: number; maxPrice?: number }) {
  const [items, setItems] = useState<L[] | null>(null);
  useEffect(() => {
    const url = new URL('/api/krisha/listings', window.location.origin);
    url.searchParams.set('dealType', 'prodazha'); url.searchParams.set('propertyType', 'kvartiry'); url.searchParams.set('page', '1');
    if (maxPrice) url.searchParams.set('priceTo', String(maxPrice));
    fetch(url).then(r => r.json()).then(d => setItems(Array.isArray(d.listings) ? d.listings.slice(0, limit) : [])).catch(() => setItems([]));
  }, [limit, maxPrice]);

  if (items === null) return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
      {Array.from({ length: limit }).map((_, i) => <div key={i} className="aspect-[4/5] rounded-2xl bg-slate-100 animate-pulse" />)}
    </div>
  );
  if (items.length === 0) return <div className="text-ink-2">Пока нет объявлений. Загляните позже.</div>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
      {items.map(l => {
        const q = quote(l.price, 30, 360);
        return (
          <Link key={l.id} href={`/listings/view/${l.id}`} className="group v2-card overflow-hidden hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] transition">
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              <img src={l.imageSrc || '/images/placeholder.jpg'} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" loading="lazy" />
              <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-white/90 backdrop-blur text-[11px] font-semibold text-brand">от {fmt(q.first)} ₸/мес</span>
              <span className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-ink-3"><Heart size={15} /></span>
            </div>
            <div className="p-3 sm:p-4">
              <div className="font-extrabold text-ink tabular-nums">{fmt(l.price)} ₸</div>
              <div className="text-sm text-ink-2 mt-0.5">{l.roomCount}-комн.{l.area ? ` · ${l.area}` : ''}</div>
              <div className="text-xs text-ink-3 mt-1 flex items-center gap-1 truncate"><MapPin size={12} className="shrink-0" />{l.street || l.district}{l.city ? `, ${l.city}` : ''}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

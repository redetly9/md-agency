'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import FavButton from './FavButton';
import { fetchListings } from './fetchListings';
import { fmt, quote } from './calc';

type L = { id: string; imageSrc: string; price: number; roomCount: number; street: string; district: string; city: string; area?: string };

// all — показывать каталог целиком: всю первую страницу и кнопку «Показать ещё», а не первые limit карточек
export default function ListingsPreview({ limit = 6, maxPrice, region, all = false }: { limit?: number; maxPrice?: number; region?: string; all?: boolean }) {
  const [items, setItems] = useState<L[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const buildUrl = (p: number) => {
    const url = new URL('/api/krisha/listings', window.location.origin);
    url.searchParams.set('dealType', 'prodazha'); url.searchParams.set('propertyType', 'kvartiry'); url.searchParams.set('page', String(p));
    if (maxPrice) url.searchParams.set('priceTo', String(maxPrice));
    if (region) url.searchParams.set('region', region);
    return url;
  };
  const more = async () => {
    setLoadingMore(true);
    const d = await fetchListings(buildUrl(page + 1));
    setItems(prev => { const seen = new Set((prev || []).map(x => x.id)); return [...(prev || []), ...d.listings.filter((x: L) => !seen.has(x.id))]; });
    if (d.listings.length) { setPage(page + 1); setTotalPages(d.totalPages); } else { setTotalPages(page); }
    setLoadingMore(false);
  };
  useEffect(() => {
    const url = buildUrl(1); setPage(1);
    let alive = true;
    fetchListings(url).then(d => { if (alive) { setItems(all ? d.listings : d.listings.slice(0, limit)); setTotalPages(d.totalPages); } });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, maxPrice, region, all]);

  if (items === null) return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
      {Array.from({ length: limit }).map((_, i) => <div key={i} className="aspect-[4/5] rounded-2xl bg-slate-100 animate-pulse" />)}
    </div>
  );
  if (items.length === 0) return <div className="text-ink-2">Пока нет объявлений. Загляните позже.</div>;

  return (
    <>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
      {items.map(l => {
        const q = quote(l.price, 30, 360);
        return (
          <Link key={l.id} href={`/listings/view/${l.id}`} onClick={() => { try { sessionStorage.setItem(`md_snap_${l.id}`, JSON.stringify(l)); } catch {} }} className="group v2-card overflow-hidden hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] transition">
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              <img src={l.imageSrc || '/images/placeholder.jpg'} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" loading="lazy" />
              <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-white/90 backdrop-blur text-[11px] font-semibold text-brand">от {fmt(q.first)} ₸/мес</span>
              <FavButton id={String(l.id)} snapshot={{ imageSrc: l.imageSrc, price: l.price, roomCount: l.roomCount, street: l.street, district: l.district, city: l.city, area: l.area }} className="absolute top-2 right-2" />
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
    {all && page < totalPages && (
      <div className="mt-8 flex justify-center">
        <button type="button" onClick={more} disabled={loadingMore} className="h-12 px-8 rounded-xl border-2 border-brand text-brand font-bold hover:bg-brand-soft transition disabled:opacity-60">{loadingMore ? 'Загружаем…' : 'Показать ещё'}</button>
      </div>
    )}
    </>
  );
}

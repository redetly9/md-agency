'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MapPin, Scale } from 'lucide-react';
import FavButton from './FavButton';
import { fmt, quote } from './calc';
import { loadCompare, toggleCompare, Snap } from './compare';

export default function ListingCard({ l, down = 30, months = 360 }: { l: Snap; down?: number; months?: number }) {
  const q = quote(Number(l.price) || 0, down, months);
  const [cmp, setCmp] = useState(false);
  useEffect(() => {
    const sync = () => setCmp(loadCompare().some(x => x.id === l.id));
    sync(); window.addEventListener('md_compare', sync); return () => window.removeEventListener('md_compare', sync);
  }, [l.id]);
  return (
    <Link href={`/listings/view/${l.id}`} onClick={() => { try { sessionStorage.setItem(`md_snap_${l.id}`, JSON.stringify(l)); } catch {} }} className="group v2-card overflow-hidden hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] transition flex flex-col">
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img src={l.imageSrc || '/images/placeholder.jpg'} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" loading="lazy" />
        {l.price ? <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-white/90 backdrop-blur text-[11px] font-semibold text-brand">от {fmt(q.first)} ₸/мес</span> : null}
        <FavButton id={String(l.id)} snapshot={l} className="absolute top-2 right-2" />
        <button type="button" onClick={e => { e.preventDefault(); e.stopPropagation(); setCmp(toggleCompare(l)); }} aria-label="Сравнить"
          className={`absolute bottom-2 right-2 w-9 h-9 rounded-full shadow-sm flex items-center justify-center transition ${cmp ? 'bg-brand text-white' : 'bg-white/95 text-ink-3 hover:text-ink'}`}><Scale size={15} /></button>
      </div>
      <div className="p-3 sm:p-4">
        <div className="font-extrabold text-ink tabular-nums">{l.price ? `${fmt(l.price)} ₸` : 'Цена по запросу'}</div>
        <div className="text-sm text-ink-2 mt-0.5">{l.roomCount ? `${l.roomCount}-комн.` : ''}{l.area ? ` · ${l.area} м²` : ''}{l.floor ? ` · ${l.floor} эт.` : ''}</div>
        <div className="text-xs text-ink-3 mt-1 flex items-center gap-1 truncate"><MapPin size={12} className="shrink-0" />{l.street || l.district}{l.city ? `, ${l.city}` : ''}</div>
      </div>
    </Link>
  );
}

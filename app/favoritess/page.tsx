'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin } from 'lucide-react';
import Button from '@/components/v2/Button';
import FavButton from '@/components/v2/FavButton';
import { fmt, quote } from '@/components/v2/calc';

type Item = { listing_id: string; snapshot: any; created_at: string };

export default function FavoritesPage() {
  const [items, setItems] = useState<Item[] | null>(null);
  useEffect(() => { fetch('/api/saved').then(r => r.json()).then(d => setItems(Array.isArray(d.items) ? d.items : [])).catch(() => setItems([])); }, []);

  return (
    <div className="v2-container py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">Избранное</h1>
      <p className="mt-2 text-ink-2">Квартиры, которые вы отметили. Сохраняются на этом устройстве и в аккаунте после входа.</p>
      {items === null ? (
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="aspect-[4/5] rounded-2xl bg-slate-100 animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="mt-8 v2-card p-10 text-center">
          <span className="mx-auto w-14 h-14 rounded-2xl bg-slate-50 text-ink-3 flex items-center justify-center"><Heart size={26} /></span>
          <div className="mt-4 font-bold text-ink">Пока пусто</div>
          <div className="mt-1 text-sm text-ink-2">Нажмите на сердечко на карточке квартиры, и она появится здесь.</div>
          <Button href="/catalog" className="mt-5">Смотреть квартиры</Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {items.map(({ listing_id, snapshot: l }) => {
            const q = quote(Number(l.price) || 0, 30, 360);
            return (
              <Link key={listing_id} href={`/listings/view/${listing_id}`} className="group v2-card overflow-hidden hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] transition">
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img src={l.imageSrc || '/images/placeholder.jpg'} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
                  {l.price ? <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-white/90 text-[11px] font-semibold text-brand">от {fmt(q.first)} ₸/мес</span> : null}
                  <FavButton id={listing_id} snapshot={l} className="absolute top-2 right-2" />
                </div>
                <div className="p-3 sm:p-4">
                  <div className="font-extrabold text-ink tabular-nums">{l.price ? `${fmt(l.price)} ₸` : 'Цена по запросу'}</div>
                  <div className="text-sm text-ink-2 mt-0.5">{l.roomCount ? `${l.roomCount}-комн.` : ''}{l.area ? ` · ${l.area}` : ''}</div>
                  <div className="text-xs text-ink-3 mt-1 flex items-center gap-1 truncate"><MapPin size={12} className="shrink-0" />{l.street || l.district}{l.city ? `, ${l.city}` : ''}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

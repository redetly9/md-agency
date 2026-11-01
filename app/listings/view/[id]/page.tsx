'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Scale, ExternalLink, BedDouble, Ruler, Building2, Layers, Calendar, Paintbrush } from 'lucide-react';
import Button from '@/components/v2/Button';
import FavButton from '@/components/v2/FavButton';
import Cascade from '@/components/v2/Cascade';
import LeadForm from '@/components/v2/LeadForm';
import ListingsPreview from '@/components/v2/ListingsPreview';
import CompareBar from '@/components/v2/CompareBar';
import { fmt, quote } from '@/components/v2/calc';
import { loadCompare, toggleCompare } from '@/components/v2/compare';

type Listing = {
  id: string; title: string; description: string; imageSrc: string; price: number; city: string; district: string; street: string;
  roomCount: string; area: string; floor: string;
  additionalDetails: { city: string; houseType: string; complex: string; buildYear: string; area: string; bathroom: string; ceilingHeight: string; floor: string; condition: string };
};

const strip = (html: string) => html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
  .split('\n').map(l => l.trim()).filter(l => !/^(Перевести|Перевод может быть неточным|Показать оригинал)$/i.test(l)).join('\n').replace(/\n{3,}/g, '\n\n').trim();
const cleanAddr = (parts: string[]) => {
  const out: string[] = [];
  parts.map(p => (p || '').replace(/показать на карте/gi, '').trim()).filter(Boolean).forEach(p => { if (!out.some(o => o.toLowerCase() === p.toLowerCase())) out.push(p); });
  return out.join(', ');
};
async function fetchListing(id: string, tries = 3): Promise<any> {
  for (let i = 0; i < tries; i++) {
    try { const r = await fetch(`/api/krisha/listings/${id}`, { cache: 'no-store' }); if (r.ok) { const d = await r.json(); if (d && d.price) return d; } } catch {}
    await new Promise(res => setTimeout(res, 1200 * (i + 1)));
  }
  return null;
}

export default function ListingPage() {
  const { id } = useParams<{ id: string }>();
  const [l, setL] = useState<Listing | null | undefined>(undefined);
  const [down, setDown] = useState(30); const [years, setYears] = useState(30);
  const [cmp, setCmp] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [fallbackImg, setFallbackImg] = useState<string>('');
  useEffect(() => {
    try { const c = sessionStorage.getItem(`md_snap_${id}`); if (c) setFallbackImg(JSON.parse(c).imageSrc || ''); } catch {}
    fetchListing(String(id)).then(setL);
  }, [id]);
  useEffect(() => { const sync = () => setCmp(loadCompare().some(x => x.id === String(id))); sync(); window.addEventListener('md_compare', sync); return () => window.removeEventListener('md_compare', sync); }, [id]);

  const q = useMemo(() => quote(l?.price || 0, down, years * 12), [l, down, years]);

  if (l === undefined) return <div className="v2-container py-10"><div className="aspect-[16/9] rounded-3xl bg-slate-100 animate-pulse" /><div className="mt-6 h-8 w-2/3 rounded bg-slate-100 animate-pulse" /></div>;
  if (l === null) return <div className="v2-container py-16 text-center"><h1 className="text-2xl font-extrabold text-ink">Объявление недоступно</h1><p className="mt-2 text-ink-2">Возможно, его сняли с публикации.</p><Button href="/catalog" className="mt-5">В каталог</Button></div>;

  const img = l.imageSrc && /^https?:/.test(l.imageSrc) ? l.imageSrc : (fallbackImg || '/images/placeholder.jpg');
  const snap = { id: String(l.id), imageSrc: img, price: l.price, roomCount: l.roomCount, area: l.area, street: l.street, district: l.district, city: l.city, floor: l.floor };
  const addr = cleanAddr([l.street, l.district, l.city]);
  const title = `${l.roomCount || ''}-комн. квартира${l.area ? `, ${l.area} м²` : ''}`;
  const params = [
    [<BedDouble key="1" size={18} />, 'Комнат', l.roomCount], [<Ruler key="2" size={18} />, 'Площадь', l.area ? `${l.area} м²` : ''], [<Layers key="3" size={18} />, 'Этаж', l.additionalDetails?.floor || l.floor],
    [<Building2 key="4" size={18} />, 'Дом', l.additionalDetails?.houseType], [<Calendar key="5" size={18} />, 'Год', l.additionalDetails?.buildYear], [<Paintbrush key="6" size={18} />, 'Состояние', l.additionalDetails?.condition],
  ].filter(x => x[2]);

  return (
    <div className="v2-container py-4 sm:py-8">
      <Link href="/catalog" className="inline-flex items-center gap-1 text-sm text-ink-2 hover:text-ink"><ArrowLeft size={16} /> В каталог</Link>

      <div className="mt-4 grid lg:grid-cols-[1fr_400px] gap-8 items-start">
        <div>
          <div className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-[4/3] sm:aspect-[16/10]">
            <img src={img} alt={title} className="w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).src = fallbackImg || '/images/placeholder.jpg'; }} />
            <div className="absolute top-3 right-3 flex gap-2">
              <FavButton id={String(l.id)} snapshot={snap} />
              <button type="button" onClick={() => setCmp(toggleCompare(snap))} aria-label="Сравнить" className={`w-9 h-9 rounded-full shadow-sm flex items-center justify-center ${cmp ? 'bg-brand text-white' : 'bg-white/95 text-ink-3'}`}><Scale size={15} /></button>
            </div>
            <span className="absolute bottom-3 left-3 px-2.5 py-1.5 rounded-lg bg-white/90 backdrop-blur text-xs font-semibold text-brand">от {fmt(q.first)} ₸/мес в аренду с выкупом</span>
          </div>

          <div className="mt-6 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
              <div className="mt-1 text-ink-2 flex items-center gap-1"><MapPin size={16} className="shrink-0" />{addr}</div>
            </div>
            <div className="text-2xl xs:text-3xl font-extrabold text-ink tabular-nums">{fmt(l.price)} ₸</div>
          </div>

          <div className="mt-6 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-2">
            {params.map(([icon, k, v], i) => (
              <div key={i} className="v2-card p-3 min-w-0"><div className="text-brand">{icon}</div><div className="text-[11px] text-ink-3 mt-1.5">{k as string}</div><div className="text-sm font-bold text-ink truncate">{v as string}</div></div>
            ))}
          </div>

          {l.additionalDetails?.complex && <div className="mt-4 text-sm text-ink-2">ЖК: <b className="text-ink">{l.additionalDetails.complex}</b></div>}
          {l.description && (
            <div className="mt-8">
              <h2 className="text-lg font-bold text-ink">Описание</h2>
              <p className="mt-2 text-[15px] text-ink-2 leading-relaxed whitespace-pre-line">{strip(l.description)}</p>
            </div>
          )}
          <a href={`https://2gis.kz/search/${encodeURIComponent(addr)}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-sm text-brand font-semibold">Показать на карте 2ГИС <ExternalLink size={14} /></a>

          <div className="mt-10">
            <h2 className="text-lg font-bold text-ink">Похожие квартиры</h2>
            <div className="mt-4"><ListingsPreview limit={3} maxPrice={Math.round(l.price * 1.15)} /></div>
          </div>
        </div>

        {/* sticky calc */}
        <aside id="object-calc" className="lg:sticky lg:top-24 scroll-mt-24">
          <div className="v2-card p-5 shadow-[0_30px_80px_-40px_rgba(11,122,75,0.45)]">
            <div className="text-sm text-ink-2">Платёж за эту квартиру</div>
            <div className="mt-1 text-4xl font-extrabold text-brand tabular-nums">{fmt(q.first)} <span className="text-xl">₸/мес</span></div>
            <div className="text-xs text-ink-3 mt-1">в начале срока, далее снижается до {fmt(q.last)} ₸</div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div><div className="text-xs text-ink-3">Взнос</div><div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 mt-1">{[30, 50].map(v => <button key={v} type="button" onClick={() => setDown(v)} className={`h-9 rounded-lg font-semibold ${down === v ? 'bg-white shadow-sm text-ink' : 'text-ink-2'}`}>{v}%</button>)}</div></div>
              <div><div className="text-xs text-ink-3">Срок, лет</div><div className="grid grid-cols-3 p-1 rounded-xl bg-slate-100 mt-1">{[10, 20, 30].map(v => <button key={v} type="button" onClick={() => setYears(v)} className={`h-9 rounded-lg font-semibold ${years === v ? 'bg-white shadow-sm text-ink' : 'text-ink-2'}`}>{v}</button>)}</div></div>
            </div>
            <div className="mt-4"><Cascade tiers={q.tiers} principal={q.principal} months={years * 12} compact /></div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-slate-50 p-2.5"><div className="text-ink-3">Первый взнос</div><div className="font-bold text-ink">{fmt(q.down)} ₸</div></div>
              <div className="rounded-xl bg-slate-50 p-2.5"><div className="text-ink-3">К выкупу</div><div className="font-bold text-ink">{fmt(q.remaining)} ₸</div></div>
            </div>
            <Button full size="lg" className="mt-4" onClick={() => setShowForm(true)}>Хочу эту квартиру</Button>
            <Link href="/start" className="block mt-3 text-center text-sm text-brand font-semibold">Проверить, подхожу ли я</Link>
          </div>
          {showForm && (
            <div className="mt-4">
              <LeadForm title="Заявка на эту квартиру" subtitle={`${title}, ${fmt(l.price)} ₸. Взнос ${down}%, срок ${years} лет.`} context="listing" kind="lead"
                extra={{ listing_id: String(l.id), listing_title: `${title}, ${addr}`, property_price: l.price, down_payment: q.down, term_months: years * 12 }} />
            </div>
          )}
        </aside>
      </div>
      <CompareBar />
      <div className="lg:hidden fixed bottom-16 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-line px-4 py-2.5 flex items-center justify-between gap-3">
        <div><div className="text-[11px] text-ink-3">Платёж в месяц</div><div className="font-extrabold text-brand tabular-nums">{fmt(q.first)} ₸</div></div>
        <Button size="md" onClick={() => { setShowForm(true); document.getElementById('object-calc')?.scrollIntoView({ behavior: 'smooth' }); }}>Хочу эту квартиру</Button>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Scale } from 'lucide-react';
import Button from '@/components/v2/Button';
import { fmt, quote } from '@/components/v2/calc';
import { loadCompare, saveCompare, Snap } from '@/components/v2/compare';

export default function ComparePage() {
  const [list, setList] = useState<Snap[]>([]);
  const [down, setDown] = useState(30); const [years, setYears] = useState(30);
  useEffect(() => setList(loadCompare()), []);
  const remove = (id: string) => { const n = list.filter(x => x.id !== id); setList(n); saveCompare(n); };

  if (list.length === 0) return (
    <div className="v2-container py-16 text-center">
      <span className="mx-auto w-14 h-14 rounded-2xl bg-slate-50 text-ink-3 flex items-center justify-center"><Scale size={26} /></span>
      <h1 className="mt-4 text-2xl font-extrabold text-ink">Нечего сравнивать</h1>
      <p className="mt-1 text-ink-2">Отметьте до трёх квартир в каталоге значком весов.</p>
      <Button href="/catalog" className="mt-5">В каталог</Button>
    </div>
  );

  const rows: [string, (s: Snap) => React.ReactNode][] = [
    ['Цена', s => `${fmt(s.price)} ₸`],
    ['Комнат', s => s.roomCount || '—'],
    ['Площадь', s => (s.area ? `${s.area} м²` : '—')],
    ['Адрес', s => `${s.street || s.district || ''}${s.city ? `, ${s.city}` : ''}`],
    ['Первый взнос', s => `${fmt(quote(s.price, down, years * 12).down)} ₸`],
    ['Платёж в начале', s => <b className="text-brand">{fmt(quote(s.price, down, years * 12).first)} ₸</b>],
    ['Платёж в конце', s => `${fmt(quote(s.price, down, years * 12).last)} ₸`],
    ['В собственность в месяц', s => `${fmt(quote(s.price, down, years * 12).principal)} ₸`],
  ];

  return (
    <div className="v2-container py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">Сравнение квартир</h1>
      <div className="mt-4 flex flex-wrap gap-3 items-center text-sm">
        <span className="text-ink-2">Взнос</span>
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100">{[30, 50].map(v => <button key={v} type="button" onClick={() => setDown(v)} className={`h-8 px-4 rounded-lg font-semibold ${down === v ? 'bg-white shadow-sm text-ink' : 'text-ink-2'}`}>{v}%</button>)}</div>
        <span className="text-ink-2 ml-2">Срок</span>
        <div className="grid grid-cols-5 p-1 rounded-xl bg-slate-100">{[5, 10, 15, 20, 30].map(v => <button key={v} type="button" onClick={() => setYears(v)} className={`h-8 px-3 rounded-lg font-semibold ${years === v ? 'bg-white shadow-sm text-ink' : 'text-ink-2'}`}>{v}</button>)}</div>
      </div>
      <div className="mt-6 overflow-x-auto -mx-4 px-4">
        <table className="w-full min-w-[640px] text-sm">
          <thead><tr>
            <th className="text-left p-2 w-44"></th>
            {list.map(s => (
              <th key={s.id} className="p-2 align-top">
                <div className="relative v2-card overflow-hidden">
                  <Link href={`/listings/view/${s.id}`}><img src={s.imageSrc || '/images/placeholder.jpg'} alt="" className="w-full aspect-[4/3] object-cover" /></Link>
                  <button type="button" onClick={() => remove(s.id)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-ink-3"><X size={14} /></button>
                </div>
              </th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map(([k, f]) => (
              <tr key={k} className="border-t border-line">
                <td className="p-3 text-ink-2">{k}</td>
                {list.map(s => <td key={s.id} className="p-3 text-center font-medium text-ink">{f(s)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

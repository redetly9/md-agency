'use client';

import { useEffect, useState } from 'react';
import { Star, Send } from 'lucide-react';
import Button from './Button';

type R = { id: number; name: string; city?: string; rating: number; text: string; created_at: string };

export default function Reviews({ withForm = true }: { withForm?: boolean }) {
  const [list, setList] = useState<R[] | null>(null);
  const [f, setF] = useState({ name: '', city: '', rating: 5, text: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle');
  useEffect(() => { fetch('/api/reviews').then(r => r.json()).then(d => setList(Array.isArray(d.reviews) ? d.reviews : [])).catch(() => setList([])); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setState('sending');
    try { const r = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) }); setState(r.ok ? 'ok' : 'fail'); } catch { setState('fail'); }
  };

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
      <div>
        {list === null ? <div className="h-32 rounded-2xl bg-slate-100 animate-pulse" /> : list.length === 0 ? (
          <div className="v2-card p-6 text-ink-2">Отзывы появятся здесь после модерации. Мы публикуем только отзывы реальных клиентов.</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {list.map(r => (
              <div key={r.id} className="v2-card p-5">
                <div className="flex items-center gap-1 text-amber-500">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill={i < r.rating ? 'currentColor' : 'none'} />)}</div>
                <p className="mt-3 text-[15px] text-ink leading-relaxed">{r.text}</p>
                <div className="mt-3 text-sm text-ink-2"><b className="text-ink">{r.name}</b>{r.city ? `, ${r.city}` : ''} · {new Date(r.created_at).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {withForm && (state === 'ok' ? (
        <div className="v2-card p-6 border-brand-light bg-brand-soft"><div className="font-bold text-ink">Спасибо!</div><div className="text-sm text-ink-2 mt-1">Отзыв отправлен на модерацию и появится после проверки.</div></div>
      ) : (
        <form onSubmit={submit} className="v2-card p-6">
          <div className="font-bold text-ink">Оставить отзыв</div>
          <div className="mt-3 flex gap-1">{[1, 2, 3, 4, 5].map(n => <button key={n} type="button" onClick={() => setF({ ...f, rating: n })} className={`p-1 ${n <= f.rating ? 'text-amber-500' : 'text-slate-300'}`}><Star size={22} fill="currentColor" /></button>)}</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input className="v2-input h-11" placeholder="Имя" required value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
            <input className="v2-input h-11" placeholder="Город" value={f.city} onChange={e => setF({ ...f, city: e.target.value })} />
          </div>
          <textarea className="v2-input mt-2 h-auto py-3 min-h-[100px]" placeholder="Расскажите о вашем опыте" required value={f.text} onChange={e => setF({ ...f, text: e.target.value })} />
          {state === 'fail' && <div className="mt-2 text-sm text-red-600">Не удалось отправить, попробуйте позже.</div>}
          <Button type="submit" full className="mt-3" disabled={state === 'sending'}><Send size={16} /> Отправить</Button>
        </form>
      ))}
    </div>
  );
}

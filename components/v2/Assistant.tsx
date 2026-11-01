'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

type Msg = { role: 'user' | 'assistant'; content: string };
const QUICK = ['Сколько платить за квартиру 40 млн?', 'Нужна ли справка о доходах?', 'Что будет, если я выйду из договора?'];

export default function Assistant() {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'assistant', content: 'Здравствуйте! Я консультант MD. Помогу посчитать платёж и отвечу на вопросы про аренду с выкупом.' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [off, setOff] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => { box.current?.scrollTo({ top: 1e6, behavior: 'smooth' }); }, [msgs, open]);
  if (pathname.startsWith('/teaser') || pathname.startsWith('/offer')) return null;

  const send = async (text: string) => {
    const t = text.trim(); if (!t || busy) return;
    const next = [...msgs, { role: 'user' as const, content: t }]; setMsgs(next); setInput(''); setBusy(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next.slice(1).map(m => ({ role: m.role, content: m.content })) }) });
      if (r.status === 503) { setOff(true); setMsgs(m => [...m, { role: 'assistant', content: 'Консультант сейчас недоступен. Напишите менеджеру, он ответит в рабочее время.' }]); }
      else { const d = await r.json(); setMsgs(m => [...m, { role: 'assistant', content: d.text || 'Не понял вопрос, попробуйте переформулировать.' }]); }
    } catch { setMsgs(m => [...m, { role: 'assistant', content: 'Ошибка сети. Попробуйте ещё раз.' }]); }
    setBusy(false);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(o => !o)} aria-label="Консультант"
        className="fixed z-30 left-4 bottom-20 md:left-auto md:right-24 md:bottom-6 h-12 px-4 rounded-full bg-ink text-white shadow-[0_12px_30px_-8px_rgba(15,23,42,0.6)] flex items-center gap-2 text-sm font-semibold hover:scale-105 transition">
        <Sparkles size={16} className="text-brand-ring" /> Спросить
      </button>
      {open && (
        <div className="fixed z-40 inset-x-3 bottom-24 md:inset-x-auto md:right-6 md:bottom-24 md:w-[380px] h-[70vh] md:h-[520px] v2-card shadow-[0_30px_80px_-30px_rgba(15,23,42,0.5)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 h-12 border-b border-line bg-slate-50">
            <div className="flex items-center gap-2 font-bold text-ink"><span className="w-7 h-7 rounded-lg bg-brand text-white flex items-center justify-center"><Bot size={16} /></span>Консультант MD</div>
            <button type="button" onClick={() => setOpen(false)} className="p-1 text-ink-3 hover:text-ink"><X size={18} /></button>
          </div>
          <div ref={box} className="flex-1 overflow-y-auto p-3 space-y-2">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed ${m.role === 'user' ? 'ml-auto bg-brand text-white' : 'bg-slate-100 text-ink'}`}>{m.content}</div>
            ))}
            {busy && <div className="bg-slate-100 rounded-2xl px-3 py-2 text-sm text-ink-3 w-16">…</div>}
            {msgs.length === 1 && <div className="pt-2 flex flex-wrap gap-1.5">{QUICK.map(q => <button key={q} type="button" onClick={() => send(q)} className="text-xs px-2.5 py-1.5 rounded-full border border-line text-ink-2 hover:border-brand hover:text-brand">{q}</button>)}</div>}
            {off && <Link href="/messages" className="block text-center text-sm text-brand font-semibold pt-2">Написать менеджеру →</Link>}
          </div>
          <form onSubmit={e => { e.preventDefault(); send(input); }} className="p-2 border-t border-line flex gap-2">
            <input className="v2-input h-10 text-sm" placeholder="Ваш вопрос" value={input} onChange={e => setInput(e.target.value)} disabled={busy} />
            <button type="submit" disabled={busy || !input.trim()} className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center disabled:opacity-40"><Send size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
}

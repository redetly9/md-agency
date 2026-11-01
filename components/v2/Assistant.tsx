'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { fmt, quote, maxPrice } from './calc';

type Msg = { role: 'user' | 'assistant'; content: string };

const num = (t: string) => { const m = t.replace(/\s/g, '').match(/(\d+(?:[.,]\d+)?)(млн|m|млрд)?/i); if (!m) return 0; let v = parseFloat(m[1].replace(',', '.')); if (/млрд/i.test(m[2] || '')) v *= 1e9; else if (/млн|m/i.test(m[2] || '') || v < 1000) v *= 1e6; return v; };
const RULES: [RegExp, string][] = [
  [/справк|доход|подтвержд/i, 'Справки о доходах не нужны. Решение принимается по первоначальному взносу (30% или 50%) и выбранной квартире.'],
  [/взнос|первоначал/i, 'Первоначальный взнос 30% или 50% от стоимости квартиры. Чем больше взнос, тем ниже платёж.'],
  [/срок|лет|год/i, 'Срок от 5 до 30 лет. Досрочный выкуп возможен в любой момент по остатку.'],
  [/выйт|растор|вернут|назад/i, 'Накопленные платежи в счёт выкупа остаются вашими и возвращаются по условиям договора. Взаиморасчёты производятся в конце срока.'],
  [/собственн|кто владе|оформ|юрид|договор/i, 'В период выплат собственник квартиры MD, у вас право пользования и выкупа по договору, при необходимости регистрируется обременение. После полной оплаты квартира переоформляется на вас. Подробнее: /legal'],
  [/комисси|услуг|сколько стоит|оплат.*отдельно|нотар|страхов|оценк/i, 'Отдельно оплачивается: консультация 35 000 ₸, комиссия за оформление 10% от стоимости объекта, оценка, страховка и нотариус.'],
  [/аренд.*сниж|каскад|ступен|процент|%/i, 'Аренда считается от остатка после взноса и снижается по третям срока: 0,8% → 0,4% → 0,168% в месяц. Выкуп идёт равными частями в вашу собственность.'],
  [/ипотек|банк|отбасы/i, 'В отличие от банка: без справок о доходах и кредитной истории, срок до 30 лет, платёж известен заранее и только снижается. Квартира фиксируется по сегодняшней цене.'],
  [/город|астан|алмат|шымкент|караганд|актобе|где/i, 'Работаем в Астане, Алматы, Шымкенте, Караганде, Актобе и других регионах Казахстана.'],
  [/как получить|как начать|что нужно|заявк|одобрен/i, 'Пройдите предварительное одобрение за 2 минуты: /start. Или оставьте заявку, менеджер подберёт квартиру: /arenda-s-vykupom#lead'],
];
function localAnswer(t: string): string {
  const q = t.toLowerCase();
  if (/сколько|плат[её]ж|рассчит|посчит|за квартиру|стоимост/i.test(q) && num(q) >= 1e6) {
    const price = num(q); const down = /50\s*%/.test(q) ? 50 : 30; const years = (q.match(/(\d{1,2})\s*(лет|год)/) || [])[1]; const y = Math.max(5, Math.min(30, +(years || 30)));
    const r = quote(price, down, y * 12);
    return `Квартира ${fmt(price)} ₸, взнос ${down}% (${fmt(r.down)} ₸), срок ${y} лет:\n• первые ${Math.round(y / 3)} лет: ${fmt(r.first)} ₸/мес\n• затем ${fmt(r.principal + (r.tiers[1]?.rent ?? 0))} ₸/мес\n• последняя треть: ${fmt(r.last)} ₸/мес\nИз них ${fmt(r.principal)} ₸ каждый месяц идёт в вашу собственность. Точный график: /arenda-s-vykupom#calculator`;
  }
  if (/лимит|на какую|могу позволить|бюджет/i.test(q) && num(q) > 0) {
    const b = num(q) >= 1e6 ? 0 : num(q); if (b) { const lim = maxPrice(b, Number.MAX_SAFE_INTEGER, 360); return `При платеже ${fmt(b)} ₸/мес и сроке 30 лет доступны квартиры примерно до ${fmt(lim / 0.7)} ₸ (взнос 30%). Точный лимит с учётом взноса: /start`; }
  }
  for (const [re, a] of RULES) if (re.test(q)) return a;
  return 'Могу посчитать платёж (напишите, например, «квартира 40 млн, взнос 30%, 20 лет») или ответить про условия: взнос, срок, договор, расходы. Для подбора квартиры оставьте заявку: /arenda-s-vykupom#lead';
}
const QUICK = ['Сколько платить за квартиру 40 млн?', 'Нужна ли справка о доходах?', 'Что будет, если я выйду из договора?'];

export default function Assistant() {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'assistant', content: 'Здравствуйте! Я консультант MD. Помогу посчитать платёж и отвечу на вопросы про аренду с выкупом.' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);

  const box = useRef<HTMLDivElement>(null);
  useEffect(() => { box.current?.scrollTo({ top: 1e6, behavior: 'smooth' }); }, [msgs, open]);
  if (pathname.startsWith('/teaser') || pathname.startsWith('/offer')) return null;

  const send = async (text: string) => {
    const t = text.trim(); if (!t || busy) return;
    const next = [...msgs, { role: 'user' as const, content: t }]; setMsgs(next); setInput(''); setBusy(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next.slice(1).map(m => ({ role: m.role, content: m.content })) }) });
      if (r.status === 503) { setMsgs(m => [...m, { role: 'assistant', content: localAnswer(t) }]); }
      else { const d = await r.json(); setMsgs(m => [...m, { role: 'assistant', content: d.text || 'Не понял вопрос, попробуйте переформулировать.' }]); }
    } catch { setMsgs(m => [...m, { role: 'assistant', content: localAnswer(t) }]); }
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
              <div key={i} className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed ${m.role === 'user' ? 'ml-auto bg-brand text-white' : 'bg-slate-100 text-ink'}`}>{m.content.split(/(\/[a-z-]+(?:#[a-z-]+)?)/g).map((part, j) => /^\/[a-z-]+/.test(part) ? <Link key={j} href={part} className="text-brand font-semibold underline">{part}</Link> : part)}</div>
            ))}
            {busy && <div className="bg-slate-100 rounded-2xl px-3 py-2 text-sm text-ink-3 w-16">…</div>}
            {msgs.length === 1 && <div className="pt-2 flex flex-wrap gap-1.5">{QUICK.map(q => <button key={q} type="button" onClick={() => send(q)} className="text-xs px-2.5 py-1.5 rounded-full border border-line text-ink-2 hover:border-brand hover:text-brand">{q}</button>)}</div>}
            {msgs.length > 2 && <Link href="/messages" className="block text-center text-xs text-ink-3 hover:text-brand pt-2">Не нашли ответ? Написать менеджеру →</Link>}
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

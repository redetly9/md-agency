'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Sparkles, FileText, MessageCircle, SlidersHorizontal, ArrowRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import PaymentSchedule, { CalcParams, DEFAULT_CALC, loadCalcParams, saveCalcParams } from '@/components/PaymentSchedule';
import Button from '@/components/v2/Button';
import Cascade from '@/components/v2/Cascade';
import { fmt, quote } from '@/components/v2/calc';
import { loadRequests, LocalRequest } from '@/components/v2/requests';

const DURATIONS = [60, 120, 180, 240, 360];
type Start = { s?: { city?: string; budget?: number; down?: number; years?: number; name?: string; phone?: string }; done?: boolean };

export default function ProfilePage() {
  const [calc, setCalc] = useState<CalcParams>(DEFAULT_CALC);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState<Start | null>(null);
  const [reqs, setReqs] = useState<LocalRequest[]>([]);
  useEffect(() => {
    setCalc(loadCalcParams()); setReady(true); setReqs(loadRequests());
    try { const r = localStorage.getItem('md_start'); if (r) setStart(JSON.parse(r)); } catch {}
  }, []);
  useEffect(() => { if (ready) saveCalcParams(calc); }, [calc, ready]);

  const q = quote(calc.propertyValue, calc.initialPaymentPercent, calc.duration);
  const name = start?.s?.name?.trim();

  return (
    <div className="v2-container py-6 sm:py-10 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">Личный кабинет</h1>

      <div className="v2-card mt-5 p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-light text-brand flex items-center justify-center shrink-0"><User size={26} /></div>
        <div className="min-w-0">
          <div className="font-bold text-ink truncate">{name || 'Гость'}</div>
          <div className="text-sm text-ink-2 truncate">{start?.s?.phone || 'Расчёты и заявки сохраняются на этом устройстве'}</div>
        </div>
      </div>

      {start?.done && start.s ? (
        <div className="v2-card mt-4 p-5 border-brand-light bg-brand-soft">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand"><Sparkles size={14} /> Предварительное одобрение</div>
          <div className="mt-2 text-sm text-ink-2">Доступны квартиры в {start.s.city} до</div>
          <div className="text-3xl font-extrabold text-ink tabular-nums">{fmt(calc.propertyValue)} ₸</div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-line">платёж от {fmt(q.first)} ₸/мес</span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-line">взнос {fmt(start.s.down ?? q.down)} ₸</span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-line">{Math.round(calc.duration / 12)} лет</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button href="/start#fit" size="sm">Квартиры под лимит <ArrowRight size={14} /></Button>
            <Button href="/start" variant="ghost" size="sm">Пересчитать</Button>
          </div>
        </div>
      ) : (
        <div className="v2-card mt-4 p-5 flex items-center justify-between gap-4">
          <div><div className="font-bold text-ink">Узнайте свой лимит</div><div className="text-sm text-ink-2 mt-0.5">Пять вопросов, результат сразу на экране.</div></div>
          <Button href="/start" size="sm">Начать</Button>
        </div>
      )}

      {/* cascade */}
      <div className="v2-card mt-4 p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-ink">Мои платежи</h2>
          <Link href="/arenda-s-vykupom#calculator" className="inline-flex items-center gap-1 text-sm text-brand font-semibold"><SlidersHorizontal size={14} /> Калькулятор</Link>
        </div>
        <div className="text-sm text-ink-2 mb-4">Квартира {fmt(calc.propertyValue)} ₸ · взнос {calc.initialPaymentPercent}% · {calc.duration / 12} лет. Платёж снижается каскадом.</div>
        <Cascade tiers={q.tiers} principal={q.principal} months={calc.duration} compact />
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
          <input type="text" inputMode="numeric" aria-label="Стоимость жилья" value={calc.propertyValue.toLocaleString('ru-RU')}
            onChange={e => setCalc(c => ({ ...c, propertyValue: Math.max(0, parseInt(e.target.value.replace(/\D/g, ''), 10) || 0) }))}
            className="v2-input h-11 font-semibold" />
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 h-11">
            {[30, 50].map(v => (
              <button key={v} type="button" onClick={() => setCalc(c => ({ ...c, initialPaymentPercent: v }))}
                className={`px-3 rounded-lg text-sm font-semibold ${calc.initialPaymentPercent === v ? 'bg-white text-ink shadow-sm' : 'text-ink-2'}`}>{v}%</button>
            ))}
          </div>
        </div>
        <div className="mt-2 grid grid-cols-5 p-1 rounded-xl bg-slate-100">
          {DURATIONS.map(d => (
            <button key={d} type="button" onClick={() => setCalc(c => ({ ...c, duration: d }))}
              className={`h-9 rounded-lg text-sm font-semibold ${calc.duration === d ? 'bg-white text-ink shadow-sm' : 'text-ink-2'}`}>{d / 12}</button>
          ))}
        </div>
      </div>

      {/* requests */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-ink">Мои заявки</h2>
          <Link href="/messages" className="inline-flex items-center gap-1 text-sm text-brand font-semibold"><MessageCircle size={14} /> Задать вопрос</Link>
        </div>
        {reqs.length === 0 ? (
          <div className="v2-card p-5 flex items-center gap-4">
            <span className="w-11 h-11 rounded-xl bg-slate-50 text-ink-3 flex items-center justify-center shrink-0"><FileText size={20} /></span>
            <div className="text-sm text-ink-2">Заявок пока нет. Пройдите <Link href="/start" className="text-brand font-semibold">предодобрение</Link> или оставьте заявку на странице <Link href="/arenda-s-vykupom#lead" className="text-brand font-semibold">аренды с выкупом</Link>.</div>
          </div>
        ) : (
          <div className="v2-card divide-y divide-line">
            {reqs.map(r => (
              <div key={r.id} className="p-4 flex items-start gap-3">
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${r.sent ? 'bg-brand-light text-brand' : 'bg-amber-50 text-amber-600'}`}>{r.sent ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-ink truncate">{r.kind}</div>
                  {r.note && <div className="text-sm text-ink-2 truncate">{r.note}</div>}
                  <div className="text-xs text-ink-3 mt-1 flex items-center gap-1"><Clock size={12} />{new Date(r.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} · {r.sent ? 'отправлена менеджеру' : 'сохранена, не доставлена'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold text-ink mb-3">График по месяцам</h2>
        <PaymentSchedule params={calc} compact title="Платежи по рассрочке" showTiers={false} />
      </div>
    </div>
  );
}

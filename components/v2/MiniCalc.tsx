'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Info, FileDown } from 'lucide-react';
import Button from './Button';
import Cascade from './Cascade';
import { fmt, quote } from './calc';
import PaymentSchedule, { loadCalcParams, saveCalcParams } from '@/components/PaymentSchedule';

const TERMS = [5, 10, 15, 20, 30];
const QUICK = [15, 25, 35, 50, 75];

export default function MiniCalc({ compact = false, withSchedule = false }: { compact?: boolean; withSchedule?: boolean }) {
  const [price, setPrice] = useState(30_000_000);
  const [down, setDown] = useState(30);
  const [years, setYears] = useState(30);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!withSchedule) return;
    const p = loadCalcParams();
    setPrice(p.propertyValue || 30_000_000); setDown(p.initialPaymentPercent === 50 ? 50 : 30); setYears(Math.max(5, Math.round(p.duration / 12)) || 30); setReady(true);
  }, [withSchedule]);
  useEffect(() => { if (withSchedule && ready) saveCalcParams({ propertyValue: price, initialPaymentPercent: down, duration: years * 12 }); }, [withSchedule, ready, price, down, years]);

  const months = years * 12;
  const q = useMemo(() => quote(price, down, months), [price, down, months]);
  const totalRent = q.tiers.reduce((a, t) => a + t.rent * (t.to - t.from + 1), 0);
  const totalPaid = q.remaining + totalRent;
  const pct = (price - 5e6) / 115e6 * 100;

  return (
    <>
      <div className="v2-card overflow-hidden shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
        <div className="grid lg:grid-cols-[1fr_1.15fr]">
          {/* inputs */}
          <div className="p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-line">
            <div className="flex items-end justify-between gap-3">
              <div className="text-sm font-medium text-ink-2">Стоимость квартиры</div>
              <div className="flex items-baseline gap-1">
                <input type="text" inputMode="numeric" aria-label="Стоимость квартиры" value={fmt(price)}
                  onChange={e => setPrice(Math.min(120_000_000, Math.max(0, parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)))}
                  className="w-[190px] sm:w-[230px] bg-transparent text-right text-3xl sm:text-4xl font-extrabold text-ink tabular-nums focus:outline-none" />
                <span className="text-xl font-bold text-ink-3">₸</span>
              </div>
            </div>
            <input type="range" min={5_000_000} max={120_000_000} step={500_000} value={price} onChange={e => setPrice(+e.target.value)}
              className="v2-range w-full mt-4" style={{ background: `linear-gradient(to right, var(--brand) ${Math.max(0, Math.min(100, pct))}%, #E5E7EB 0)` }} />
            <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
              {QUICK.map(m => (
                <button key={m} type="button" onClick={() => setPrice(m * 1_000_000)}
                  className={`shrink-0 px-3 h-8 rounded-full text-xs font-semibold border transition ${price === m * 1_000_000 ? 'bg-brand text-white border-brand' : 'border-line text-ink-2 hover:border-ink-3'}`}>{m} млн</button>
              ))}
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between text-sm"><span className="font-medium text-ink-2">Первый взнос</span><span className="text-ink-3">{fmt(q.down)} ₸</span></div>
              <div className="mt-2 grid grid-cols-2 p-1 rounded-xl bg-slate-100">
                {[30, 50].map(v => (
                  <button key={v} type="button" onClick={() => setDown(v)} className={`h-11 rounded-lg text-sm font-bold transition ${down === v ? 'bg-white text-ink shadow-sm' : 'text-ink-2'}`}>{v}%</button>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-sm"><span className="font-medium text-ink-2">Срок выкупа</span><span className="text-ink-3">{months} месяцев</span></div>
              <div className="mt-2 grid grid-cols-5 p-1 rounded-xl bg-slate-100">
                {TERMS.map(v => (
                  <button key={v} type="button" onClick={() => setYears(v)} className={`h-11 rounded-lg text-sm font-bold transition ${years === v ? 'bg-white text-ink shadow-sm' : 'text-ink-2'}`}>{v}<span className="hidden sm:inline text-[11px] font-medium text-ink-3"> лет</span></button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {[['К выкупу', fmt(q.remaining)], ['В собственность', `${fmt(q.principal)}/мес`], ['Аренда за срок', fmt(totalRent)]].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 p-3 min-w-0"><div className="text-[11px] text-ink-3">{k}</div><div className="text-sm font-bold text-ink tabular-nums truncate">{v} ₸</div></div>
              ))}
            </div>
          </div>

          {/* result */}
          <div className="p-5 sm:p-7 bg-brand-soft/60">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-ink-2">Ваш платёж в месяц</div>
              <span className="text-[11px] font-semibold text-brand bg-brand-light px-2 py-1 rounded-full">снижается каскадом</span>
            </div>
            <div className="mt-1 flex items-baseline gap-2 flex-wrap">
              <div className="text-5xl sm:text-6xl font-extrabold text-brand tabular-nums tracking-tight v2-pop" key={q.first}>{fmt(q.first)}</div>
              <div className="text-xl font-bold text-brand">₸</div>
              <div className="text-sm text-ink-2 ml-1">в первые {Math.round(months / 3) % 12 === 0 ? `${months / 36} лет` : `${Math.round(months / 3)} мес`}</div>
            </div>
            <div className="mt-5"><Cascade tiers={q.tiers} principal={q.principal} months={months} /></div>
            <div className="mt-5 flex items-start gap-2 text-xs text-ink-2 leading-relaxed">
              <Info size={14} className="shrink-0 mt-0.5 text-ink-3" />
              <span>Выкуп {fmt(q.principal)} ₸ каждый месяц идёт в вашу долю. Аренда считается от остатка {fmt(q.remaining)} ₸ и снижается: 0,8% → 0,4% → 0,168%. Всего за срок {fmt(totalPaid)} ₸, из них {fmt(q.remaining)} ₸ в собственность.</span>
            </div>
            {!compact && (
              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                {withSchedule
                  ? <>
                      <Button href={`/offer?price=${price}&down=${down}&years=${years}&print=1`} variant="secondary" size="lg"><FileDown size={16} /> PDF</Button>
                      <Button href="#lead" size="lg" className="sm:flex-1">Оставить заявку с этими условиями <ArrowRight size={16} /></Button>
                    </>
                  : <>
                      <Button href="/arenda-s-vykupom#calculator" variant="secondary" size="lg" onClick={() => saveCalcParams({ propertyValue: price, initialPaymentPercent: down, duration: months })}>График по месяцам</Button>
                      <Button href="/start" size="lg" className="sm:flex-1">Получить одобрение <ArrowRight size={16} /></Button>
                    </>}
              </div>
            )}
          </div>
        </div>
      </div>
      {withSchedule && <div className="mt-4"><PaymentSchedule params={{ propertyValue: price, initialPaymentPercent: down, duration: months }} showTiers={false} /></div>}
    </>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import { fmt, quote } from './calc';
import { saveCalcParams } from '@/components/PaymentSchedule';

const TERMS = [5, 10, 15, 20, 30];

export default function MiniCalc({ compact = false }: { compact?: boolean }) {
  const [price, setPrice] = useState(30_000_000);
  const [down, setDown] = useState(30);
  const [years, setYears] = useState(30);
  const q = useMemo(() => quote(price, down, years * 12), [price, down, years]);

  return (
    <div className="v2-card p-5 sm:p-7 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)]">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-7">
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium text-ink-2">Стоимость квартиры</label>
              <div className="text-2xl font-extrabold text-ink tabular-nums v2-pop" key={price}>{fmt(price)} ₸</div>
            </div>
            <input type="range" min={5_000_000} max={120_000_000} step={500_000} value={price} onChange={e => setPrice(+e.target.value)}
              className="v2-range w-full mt-3" style={{ background: `linear-gradient(to right, var(--brand) ${(price - 5e6) / 115e6 * 100}%, #E5E7EB 0)` }} />
            <div className="flex justify-between text-xs text-ink-3 mt-1"><span>5 млн</span><span>120 млн</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-ink-2">Первый взнос</label>
              <div className="mt-2 grid grid-cols-2 p-1 rounded-xl bg-slate-100">
                {[30, 50].map(v => (
                  <button key={v} type="button" onClick={() => setDown(v)} className={`h-10 rounded-lg text-sm font-semibold transition ${down === v ? 'bg-white text-ink shadow-sm' : 'text-ink-2'}`}>{v}%</button>
                ))}
              </div>
              <div className="text-xs text-ink-3 mt-1.5">{fmt(q.down)} ₸</div>
            </div>
            <div>
              <label className="text-sm font-medium text-ink-2">Срок, лет</label>
              <div className="mt-2 grid grid-cols-5 p-1 rounded-xl bg-slate-100">
                {TERMS.map(v => (
                  <button key={v} type="button" onClick={() => setYears(v)} className={`h-10 rounded-lg text-sm font-semibold transition ${years === v ? 'bg-white text-ink shadow-sm' : 'text-ink-2'}`}>{v}</button>
                ))}
              </div>
              <div className="text-xs text-ink-3 mt-1.5">{years * 12} месяцев</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-brand-soft border border-brand-light p-5 flex flex-col">
          <div className="text-sm text-ink-2">Платёж в месяц</div>
          <div className="mt-1 text-4xl sm:text-5xl font-extrabold text-brand tabular-nums v2-pop" key={q.first}>{fmt(q.first)} <span className="text-2xl">₸</span></div>
          <div className="text-sm text-ink-2 mt-1">первые {Math.round(years / 3 * 10) / 10} лет, далее снижается до <b className="text-ink">{fmt(q.last)} ₸</b></div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {q.tiers.map((t, i) => (
              <div key={i} className="rounded-xl bg-white border border-line p-2.5">
                <div className="text-[11px] text-ink-3">{['I', 'II', 'III'][i]} треть срока</div>
                <div className="text-sm font-bold text-ink tabular-nums">{fmt(q.principal + t.rent)}</div>
                <div className="h-1 rounded-full bg-brand-light mt-2"><div className="h-1 rounded-full bg-brand" style={{ width: `${(q.principal + t.rent) / q.first * 100}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-ink-2 leading-relaxed">
            Выкуп {fmt(q.principal)} ₸/мес идёт в вашу собственность. Аренда 0,8% → 0,4% → 0,168% от остатка {fmt(q.remaining)} ₸.
          </div>
          {!compact && (
            <div className="mt-auto pt-5 flex flex-col sm:flex-row gap-2">
              <Button href="/arenda-s-vykupom#calculator" variant="secondary" onClick={() => saveCalcParams({ propertyValue: price, initialPaymentPercent: down, duration: years * 12 })}>Полный график</Button>
              <Button href="/start" className="sm:flex-1">Получить одобрение <ArrowRight size={16} /></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

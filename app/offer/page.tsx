'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Printer } from 'lucide-react';
import { fmt, quote } from '@/components/v2/calc';
import { buildSchedule } from '@/components/v2/schedule-core';

function OfferInner() {
  const sp = useSearchParams();
  const price = parseInt(sp.get('price') || '30000000', 10) || 30000000;
  const down = parseInt(sp.get('down') || '30', 10) === 50 ? 50 : 30;
  const years = Math.max(5, Math.min(30, parseInt(sp.get('years') || '30', 10) || 30));
  const months = years * 12;
  const q = quote(price, down, months);
  const rows = buildSchedule({ propertyValue: price, initialPaymentPercent: down, duration: months });
  const totalRent = rows.reduce((a, r) => a + r.rent, 0);
  const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  useEffect(() => { if (sp.get('print') === '1') setTimeout(() => window.print(), 600); }, [sp]);

  return (
    <div className="bg-white text-ink">
      <style>{`@media print { header, nav, .no-print { display: none !important } main { padding: 0 !important } .page { break-after: page } body { background: #fff } }`}</style>
      <div className="max-w-3xl mx-auto px-6 py-8 print:py-0">
        <div className="no-print flex items-center justify-between mb-6">
          <a href="/arenda-s-vykupom#calculator" className="text-sm text-ink-2">← Назад к калькулятору</a>
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-brand text-white text-sm font-semibold"><Printer size={16} /> Сохранить в PDF</button>
        </div>

        <div className="flex items-center justify-between border-b border-line pb-5">
          <div className="flex items-center gap-2"><span className="w-9 h-9 rounded-xl bg-brand text-white font-extrabold text-sm flex items-center justify-center">MD</span><div><div className="font-extrabold">md.kz</div><div className="text-[10px] tracking-[0.2em] uppercase text-ink-3">rent · live · own</div></div></div>
          <div className="text-right text-sm text-ink-2">Предварительное предложение<br />{today}</div>
        </div>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight">Аренда с выкупом: ваши условия</h1>
        <p className="mt-2 text-ink-2">Расчёт ориентировочный, окончательные условия фиксируются в договоре.</p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[['Стоимость квартиры', `${fmt(price)} ₸`], ['Первый взнос', `${fmt(q.down)} ₸ (${down}%)`], ['Срок', `${years} лет`], ['К выкупу', `${fmt(q.remaining)} ₸`]].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line p-3"><div className="text-[11px] text-ink-3">{k}</div><div className="font-bold">{v}</div></div>
          ))}
        </div>

        <h2 className="mt-8 text-xl font-bold">Платёж снижается каскадом</h2>
        <table className="mt-3 w-full text-sm border-collapse">
          <thead><tr className="text-left text-ink-3 border-b border-line"><th className="py-2">Период</th><th className="py-2 text-right">Выкуп</th><th className="py-2 text-right">Аренда</th><th className="py-2 text-right">Итого в месяц</th></tr></thead>
          <tbody>
            {q.tiers.map((t, i) => (
              <tr key={i} className="border-b border-line"><td className="py-2">{Math.floor((t.from - 1) / 12) + 1}–{Math.ceil(t.to / 12)} год · {(t.rate * 100).toLocaleString('ru-RU')}%</td><td className="py-2 text-right tabular-nums">{fmt(q.principal)}</td><td className="py-2 text-right tabular-nums">{fmt(t.rent)}</td><td className="py-2 text-right font-bold tabular-nums">{fmt(q.principal + t.rent)} ₸</td></tr>
            ))}
            <tr><td className="py-2 font-bold">Итого за {years} лет</td><td className="py-2 text-right tabular-nums font-bold">{fmt(q.remaining)}</td><td className="py-2 text-right tabular-nums font-bold">{fmt(totalRent)}</td><td className="py-2 text-right font-bold tabular-nums">{fmt(q.remaining + totalRent)} ₸</td></tr>
          </tbody>
        </table>

        <h2 className="mt-8 text-xl font-bold">Условия</h2>
        <ul className="mt-2 text-sm text-ink-2 space-y-1 list-disc list-inside">
          <li>Выкуп {fmt(q.principal)} ₸ ежемесячно накапливается в счёт стоимости квартиры.</li>
          <li>Аренда считается от остатка {fmt(q.remaining)} ₸: 0,8% в месяц первую треть срока, 0,4% вторую, 0,168% третью.</li>
          <li>Досрочный выкуп возможен в любой момент по остатку. Условия и цена фиксируются в договоре.</li>
          <li>Отдельно: консультация 35 000 ₸, комиссия за оформление 10% от стоимости объекта, оценка, страховка и нотариус.</li>
        </ul>

        <h2 className="mt-8 text-xl font-bold page">График первых 12 месяцев</h2>
        <table className="mt-3 w-full text-xs border-collapse">
          <thead><tr className="text-left text-ink-3 border-b border-line"><th className="py-1.5">№</th><th className="py-1.5">Месяц</th><th className="py-1.5 text-right">Выкуп</th><th className="py-1.5 text-right">Аренда</th><th className="py-1.5 text-right">Итого</th><th className="py-1.5 text-right">Остаток</th></tr></thead>
          <tbody>{rows.slice(0, 12).map(r => <tr key={r.n} className="border-b border-line"><td className="py-1.5">{r.n}</td><td className="py-1.5">{r.date.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' })}</td><td className="py-1.5 text-right tabular-nums">{fmt(r.principal)}</td><td className="py-1.5 text-right tabular-nums">{fmt(r.rent)}</td><td className="py-1.5 text-right tabular-nums font-semibold">{fmt(r.total)}</td><td className="py-1.5 text-right tabular-nums">{fmt(r.balance)}</td></tr>)}</tbody>
        </table>
        <div className="mt-8 text-xs text-ink-3">md.kz · marketplacedeposit.com · Полный график доступен в калькуляторе на сайте и в личном кабинете.</div>
      </div>
    </div>
  );
}

export default function OfferPage() { return <Suspense fallback={null}><OfferInner /></Suspense>; }

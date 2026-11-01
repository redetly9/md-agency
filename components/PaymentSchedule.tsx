'use client';

import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

import { CalcParams, RentTier, ScheduleRow, buildSchedule, rentTiers, tierLength, loadCalcParams, saveCalcParams, DEFAULT_CALC, RENT_TIERS, rentForMonth, CALC_STORAGE_KEY } from '@/components/v2/schedule-core';
export type { CalcParams, RentTier, ScheduleRow };
export { buildSchedule, rentTiers, tierLength, loadCalcParams, saveCalcParams, DEFAULT_CALC, RENT_TIERS, rentForMonth, CALC_STORAGE_KEY };

const fmt = (n: number) => Math.round(n).toLocaleString('ru-RU');
const MONTHS = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const fmtDate = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

export default function PaymentSchedule({ params, compact = false, title = 'График платежей', showTiers = true }: { params: CalcParams; compact?: boolean; title?: string; showTiers?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const rows = useMemo(() => buildSchedule(params), [params]);
  const totals = useMemo(() => rows.reduce(
    (a, r) => ({ principal: a.principal + r.principal, rent: a.rent + r.rent, total: a.total + r.total }),
    { principal: 0, rent: 0, total: 0 },
  ), [rows]);
  const initial = params.propertyValue * (params.initialPaymentPercent / 100);
  const tiers = useMemo(() => rentTiers(Math.max(0, params.propertyValue - initial), params.duration), [params, initial]);
  const previewCount = compact ? 6 : 12;
  const visible = expanded ? rows : rows.slice(0, previewCount);

  // годовые столбики: накопление + аренда
  const years = useMemo(() => {
    const map: { label: string; principal: number; rent: number }[] = [];
    rows.forEach(r => {
      const label = String(r.date.getFullYear());
      let y = map.find(m => m.label === label);
      if (!y) { y = { label, principal: 0, rent: 0 }; map.push(y); }
      y.principal += r.principal; y.rent += r.rent;
    });
    return map;
  }, [rows]);
  const maxYear = Math.max(1, ...years.map(y => y.principal + y.rent));

  const downloadCsv = () => {
    const head = '№;Месяц;Накопление;Аренда;Итого;Остаток';
    const body = rows.map(r => [r.n, fmtDate(r.date), r.principal, r.rent, r.total, r.balance].join(';'));
    const blob = new Blob(['﻿' + [head, ...body].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'grafik-platezhey.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  if (rows.length === 0) {
    return <div className="text-sm text-ink-2">Укажите стоимость жилья, чтобы увидеть график платежей.</div>;
  }

  return (
    <div className="v2-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-base font-bold text-ink">{title}</h3>
          <p className="text-xs text-ink-3 mt-0.5">
            Взнос {params.initialPaymentPercent}% · {fmt(initial)} ₸ · срок {params.duration} мес · аренда {tiers.map(t => fmt(t.rent)).join(' → ')} ₸/мес
          </p>
        </div>
        <button type="button" onClick={downloadCsv} className="shrink-0 inline-flex items-center gap-1 text-xs text-brand border border-brand-light bg-brand-soft rounded-lg px-2.5 py-1.5 font-semibold">
          <Download size={14} /> CSV
        </button>
      </div>

      {/* summary */}
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-1.5 mb-4">
        <div className="bg-slate-50 rounded-lg p-2.5 min-w-0 overflow-hidden">
          <div className="text-[10px] uppercase tracking-wide text-ink-3">Накопления</div>
          <div className="text-[13px] font-bold text-brand mt-0.5 whitespace-nowrap">{fmt(totals.principal)} ₸</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 min-w-0 overflow-hidden">
          <div className="text-[10px] uppercase tracking-wide text-ink-3">Аренда за срок</div>
          <div className="text-[13px] font-bold text-ink mt-0.5 whitespace-nowrap">{fmt(totals.rent)} ₸</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 min-w-0 overflow-hidden">
          <div className="text-[10px] uppercase tracking-wide text-ink-3">Платёж в месяц</div>
          <div className="text-[13px] font-bold text-ink mt-0.5 whitespace-nowrap">{fmt(rows[0].total)} ₸</div>
          <div className="text-[10px] text-ink-3 mt-0.5 whitespace-nowrap">в начале срока</div>
        </div>
      </div>

      {/* rent tiers */}
      {showTiers && <div className="grid gap-1.5 mb-4" style={{ gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))` }}>
        {tiers.map((t, k) => (
          <div key={k} className="rounded-lg border border-brand-light bg-brand-soft p-2 min-w-0">
            <div className="text-[10px] text-ink-3 whitespace-nowrap">{k === 0 ? 'Первые' : k === 1 ? 'Вторые' : 'Третьи'} {tierLength(t)} · {(t.rate * 100).toLocaleString('ru-RU')}%</div>
            <div className="text-[13px] font-bold text-brand mt-0.5 whitespace-nowrap">{fmt(t.rent)} ₸/мес</div>
            <div className="text-[10px] text-ink-3 whitespace-nowrap">аренда</div>
          </div>
        ))}
      </div>}

      {/* yearly bars */}
      {!compact && years.length > 1 && (
        <div className="mb-4">
          <div className="flex items-end gap-1 h-24">
            {years.map(y => {
              const h = (y.principal + y.rent) / maxYear;
              const pr = y.principal / Math.max(1, y.principal + y.rent);
              return (
                <div key={y.label} className="flex-1 flex flex-col justify-end h-full" title={`${y.label}: ${fmt(y.principal + y.rent)} ₸`}>
                  <div className="w-full rounded-t-sm overflow-hidden flex flex-col" style={{ height: `${Math.max(4, h * 100)}%` }}>
                    <div className="bg-slate-300" style={{ height: `${(1 - pr) * 100}%` }} />
                    <div className="bg-brand flex-1" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-ink-3 mt-1">
            <span>{years[0].label}</span><span>{years[years.length - 1].label}</span>
          </div>
          <div className="flex gap-4 text-[11px] text-ink-3 mt-1">
            <span className="inline-flex items-center gap-1"><i className="w-2.5 h-2.5 rounded-sm bg-brand" />накопление</span>
            <span className="inline-flex items-center gap-1"><i className="w-2.5 h-2.5 rounded-sm bg-slate-300" />аренда</span>
          </div>
        </div>
      )}

      {/* table */}
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-[11px] sm:text-xs">
          <thead>
            <tr className="text-left text-ink-3 border-b border-line">
              <th className="py-2 pr-1.5 font-medium">№</th>
              <th className="py-2 pr-1.5 font-medium">Месяц</th>
              <th className="py-2 pr-1.5 font-medium text-right">Накопление</th>
              <th className="py-2 pr-1.5 font-medium text-right">Аренда</th>
              <th className="py-2 pr-1.5 font-medium text-right">Итого</th>
              <th className="py-2 font-medium text-right hidden sm:table-cell">Остаток</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(r => (
              <tr key={r.n} className="border-b border-line text-ink">
                <td className="py-1.5 pr-1.5 text-ink-3">{r.n}</td>
                <td className="py-1.5 pr-1.5 whitespace-nowrap">{fmtDate(r.date)}</td>
                <td className="py-1.5 pr-1.5 text-right text-brand font-semibold whitespace-nowrap">{fmt(r.principal)}</td>
                <td className="py-1.5 pr-1.5 text-right whitespace-nowrap">{fmt(r.rent)}</td>
                <td className="py-1.5 pr-1.5 text-right font-semibold whitespace-nowrap">{fmt(r.total)}</td>
                <td className="py-1.5 text-right text-ink-3 whitespace-nowrap hidden sm:table-cell">{fmt(r.balance)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-ink font-bold">
              <td className="py-2 pr-1.5 whitespace-nowrap" colSpan={2}>Итого</td>
              <td className="py-2 pr-1.5 text-right text-brand whitespace-nowrap">{fmt(totals.principal)}</td>
              <td className="py-2 pr-1.5 text-right whitespace-nowrap">{fmt(totals.rent)}</td>
              <td className="py-2 pr-1.5 text-right whitespace-nowrap">{fmt(totals.total)}</td>
              <td className="py-2 text-right text-ink-3 hidden sm:table-cell">0</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {rows.length > previewCount && (
        <button type="button" onClick={() => setExpanded(e => !e)} className="mt-3 w-full inline-flex items-center justify-center gap-1 text-sm text-brand font-semibold py-2.5 rounded-xl bg-brand-soft">
          {expanded ? <>Свернуть <ChevronUp size={16} /></> : <>Показать все {rows.length} платежей <ChevronDown size={16} /></>}
        </button>
      )}
      <p className="text-[11px] text-ink-3 mt-2">Аренда считается от суммы после взноса и уменьшается ступенями по трети срока, внутри ступени сумма не меняется. Взаиморасчёты производятся в конце срока. Покупатель вправе вернуть накопленные средства. Точные условия фиксируются в договоре.</p>
    </div>
  );
}

'use client';

import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

export type CalcParams = {
  propertyValue: number;
  initialPaymentPercent: number;
  duration: number; // months
};

export const CALC_STORAGE_KEY = 'md_calc_params';
export const RENT_RATE = 0.006; // 0,6% в месяц от остатка

export const DEFAULT_CALC: CalcParams = { propertyValue: 6000000, initialPaymentPercent: 50, duration: 60 };

export function loadCalcParams(): CalcParams {
  if (typeof window === 'undefined') return DEFAULT_CALC;
  try {
    const raw = window.localStorage.getItem(CALC_STORAGE_KEY);
    if (!raw) return DEFAULT_CALC;
    const p = JSON.parse(raw);
    if (typeof p.propertyValue === 'number' && typeof p.initialPaymentPercent === 'number' && typeof p.duration === 'number') return p;
  } catch {}
  return DEFAULT_CALC;
}

export function saveCalcParams(p: CalcParams) {
  try { window.localStorage.setItem(CALC_STORAGE_KEY, JSON.stringify(p)); } catch {}
}

export type ScheduleRow = {
  n: number;
  date: Date;
  principal: number; // накопление (выкуп)
  rent: number;      // аренда 0,6% от остатка
  total: number;
  balance: number;   // остаток после платежа
};

export function buildSchedule(p: CalcParams, start = new Date()): ScheduleRow[] {
  const initial = p.propertyValue * (p.initialPaymentPercent / 100);
  const remaining = Math.max(0, p.propertyValue - initial);
  const principal = p.duration > 0 ? Math.ceil(remaining / p.duration / 1000) * 1000 : 0;
  const rows: ScheduleRow[] = [];
  let balance = remaining;
  for (let i = 1; i <= p.duration; i++) {
    const rent = Math.round(balance * RENT_RATE);
    const pay = Math.min(principal, balance);
    balance = Math.max(0, balance - pay);
    const date = new Date(start.getFullYear(), start.getMonth() + i, 1);
    rows.push({ n: i, date, principal: pay, rent, total: pay + rent, balance });
  }
  return rows;
}

const fmt = (n: number) => Math.round(n).toLocaleString('ru-RU');
const MONTHS = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const fmtDate = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

export default function PaymentSchedule({ params, compact = false, title = 'График платежей' }: { params: CalcParams; compact?: boolean; title?: string }) {
  const [expanded, setExpanded] = useState(false);
  const rows = useMemo(() => buildSchedule(params), [params]);
  const totals = useMemo(() => rows.reduce(
    (a, r) => ({ principal: a.principal + r.principal, rent: a.rent + r.rent, total: a.total + r.total }),
    { principal: 0, rent: 0, total: 0 },
  ), [rows]);
  const initial = params.propertyValue * (params.initialPaymentPercent / 100);
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
    return <div className="text-sm text-white/55">Укажите стоимость жилья, чтобы увидеть график платежей.</div>;
  }

  return (
    <div className="bg-[#122037] rounded-xl border border-white/5 p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-xs text-white/55 mt-0.5">
            Взнос {params.initialPaymentPercent}% · {fmt(initial)} ₸ · срок {params.duration} мес · аренда 0,6% от остатка
          </p>
        </div>
        <button type="button" onClick={downloadCsv} className="shrink-0 inline-flex items-center gap-1 text-xs text-[#e6c87a] border border-[#d4af5a]/40 rounded-lg px-2.5 py-1.5">
          <Download size={14} /> CSV
        </button>
      </div>

      {/* summary */}
      <div className="grid grid-cols-3 gap-1.5 mb-4">
        <div className="bg-[#0b1626] rounded-lg p-2 min-w-0 overflow-hidden">
          <div className="text-[10px] uppercase tracking-wide text-white/55">Накопления</div>
          <div className="text-[13px] font-bold text-[#e6c87a] mt-0.5 whitespace-nowrap">{fmt(totals.principal)} ₸</div>
        </div>
        <div className="bg-[#0b1626] rounded-lg p-2 min-w-0 overflow-hidden">
          <div className="text-[10px] uppercase tracking-wide text-white/55">Аренда за срок</div>
          <div className="text-[13px] font-bold text-white mt-0.5 whitespace-nowrap">{fmt(totals.rent)} ₸</div>
        </div>
        <div className="bg-[#0b1626] rounded-lg p-2 min-w-0 overflow-hidden">
          <div className="text-[10px] uppercase tracking-wide text-white/55">Первый платёж</div>
          <div className="text-[13px] font-bold text-white mt-0.5 whitespace-nowrap">{fmt(rows[0].total)} ₸</div>
        </div>
      </div>

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
                    <div className="bg-white/15" style={{ height: `${(1 - pr) * 100}%` }} />
                    <div className="bg-[#d4af5a] flex-1" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-white/55 mt-1">
            <span>{years[0].label}</span><span>{years[years.length - 1].label}</span>
          </div>
          <div className="flex gap-4 text-[11px] text-white/55 mt-1">
            <span className="inline-flex items-center gap-1"><i className="w-2.5 h-2.5 rounded-sm bg-[#d4af5a]" />накопление</span>
            <span className="inline-flex items-center gap-1"><i className="w-2.5 h-2.5 rounded-sm bg-white/15" />аренда</span>
          </div>
        </div>
      )}

      {/* table */}
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-[11px] sm:text-xs">
          <thead>
            <tr className="text-left text-white/55 border-b border-white/10">
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
              <tr key={r.n} className="border-b border-white/5 text-white">
                <td className="py-1.5 pr-1.5 text-white/40">{r.n}</td>
                <td className="py-1.5 pr-1.5 whitespace-nowrap">{fmtDate(r.date)}</td>
                <td className="py-1.5 pr-1.5 text-right text-[#e6c87a] font-medium whitespace-nowrap">{fmt(r.principal)}</td>
                <td className="py-1.5 pr-1.5 text-right whitespace-nowrap">{fmt(r.rent)}</td>
                <td className="py-1.5 pr-1.5 text-right font-semibold whitespace-nowrap">{fmt(r.total)}</td>
                <td className="py-1.5 text-right text-white/55 whitespace-nowrap hidden sm:table-cell">{fmt(r.balance)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-white font-semibold">
              <td className="py-2 pr-1.5 whitespace-nowrap" colSpan={2}>Итого</td>
              <td className="py-2 pr-1.5 text-right text-[#e6c87a] whitespace-nowrap">{fmt(totals.principal)}</td>
              <td className="py-2 pr-1.5 text-right whitespace-nowrap">{fmt(totals.rent)}</td>
              <td className="py-2 pr-1.5 text-right whitespace-nowrap">{fmt(totals.total)}</td>
              <td className="py-2 text-right text-white/55 hidden sm:table-cell">0</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {rows.length > previewCount && (
        <button type="button" onClick={() => setExpanded(e => !e)} className="mt-3 w-full inline-flex items-center justify-center gap-1 text-sm text-[#e6c87a] py-2 rounded-lg bg-[#0b1626]">
          {expanded ? <>Свернуть <ChevronUp size={16} /></> : <>Показать все {rows.length} платежей <ChevronDown size={16} /></>}
        </button>
      )}
      <p className="text-[11px] text-white/40 mt-2">Расчёт ориентировочный. Точные условия фиксируются в договоре.</p>
    </div>
  );
}

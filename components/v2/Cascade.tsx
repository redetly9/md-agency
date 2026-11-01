'use client';

import { fmt } from './calc';
import type { RentTier } from './schedule-core';

/** Каскад платежей: три ступени вниз, как в примере 200 000 → 100 000 → 42 000. */
export default function Cascade({ tiers, principal, months, compact = false }: { tiers: RentTier[]; principal: number; months: number; compact?: boolean }) {
  if (!tiers.length) return null;
  const totals = tiers.map(t => principal + t.rent);
  const max = Math.max(...totals, 1);
  const heights = [100, 68, 44];
  const years = (t: RentTier) => {
    const m = t.to - t.from + 1;
    return m % 12 === 0 ? `${m / 12} лет` : `${m} мес`;
  };
  const range = (t: RentTier) => {
    const y1 = Math.floor((t.from - 1) / 12) + 1, y2 = Math.ceil(t.to / 12);
    return months >= 36 ? `${y1}–${y2} год` : `${t.from}–${t.to} мес`;
  };

  return (
    <div>
      <div className={`grid gap-2 ${compact ? 'h-32' : 'h-44'}`} style={{ gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))` }}>
        {tiers.map((t, i) => (
          <div key={i} className="flex flex-col justify-end min-w-0">
            <div className={`text-center ${compact ? 'text-xs xs:text-sm' : 'text-sm xs:text-base sm:text-lg'} font-extrabold text-ink tabular-nums whitespace-nowrap v2-pop`} key={totals[i]}>
              {fmt(totals[i])} <span className="text-xs font-semibold text-ink-3">₸</span>
            </div>
            {!compact && <div className="hidden sm:block text-center text-[11px] text-ink-3 mb-1.5 whitespace-nowrap">выкуп {fmt(principal)} + аренда {fmt(t.rent)}</div>}
            <div className="relative rounded-t-xl bg-gradient-to-b from-brand to-brand-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
              style={{ height: `${Math.max(18, heights[i] ?? 40)}%`, opacity: 1 - i * 0.18 }}>
              {i < tiers.length - 1 && (
                <span className="absolute -right-3 top-2 w-6 h-6 rounded-full bg-white border border-line text-brand text-[11px] font-bold flex items-center justify-center shadow-sm z-10">↓</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-2 mt-2 border-t border-line pt-2" style={{ gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))` }}>
        {tiers.map((t, i) => (
          <div key={i} className="text-center min-w-0">
            <div className="text-[11px] xs:text-xs font-semibold text-ink whitespace-nowrap">{range(t)}</div>
            <div className="text-[10px] xs:text-[11px] text-ink-3 whitespace-nowrap">{years(t)} · {(t.rate * 100).toLocaleString('ru-RU')}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

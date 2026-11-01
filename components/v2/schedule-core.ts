// Чистая математика аренды с выкупом. Без 'use client', чтобы работать и на сервере.

export type CalcParams = {
  propertyValue: number;
  initialPaymentPercent: number;
  duration: number; // months
};

export const CALC_STORAGE_KEY = 'md_calc_params';
// Аренда считается от остатка после первоначального взноса и уменьшается ступенями:
// первая треть срока 0,8% в месяц, вторая 0,4%, третья 0,168% (для 30 лет: 10/10/10 лет).
export const RENT_TIERS = [0.008, 0.004, 0.00168];

export type RentTier = { from: number; to: number; rate: number; rent: number };

export function rentTiers(remaining: number, duration: number): RentTier[] {
  if (duration <= 0) return [];
  const len = Math.ceil(duration / RENT_TIERS.length);
  return RENT_TIERS.map((rate, k) => ({
    from: k * len + 1,
    to: Math.min(duration, (k + 1) * len),
    rate,
    rent: Math.round(remaining * rate),
  })).filter(t => t.from <= duration);
}

export function tierLength(t: RentTier): string {
  const m = t.to - t.from + 1;
  if (m % 12 === 0) { const y = m / 12; return `${y} ${y === 1 ? 'год' : y < 5 ? 'года' : 'лет'}`; }
  return `${m} мес`;
}

export function rentForMonth(tiers: RentTier[], month: number): number {
  return tiers.find(t => month >= t.from && month <= t.to)?.rent ?? 0;
}

export const DEFAULT_CALC: CalcParams = { propertyValue: 30000000, initialPaymentPercent: 30, duration: 360 };

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
  rent: number;      // аренда 0,6%, одинаковая каждый месяц
  total: number;
  balance: number;   // остаток после платежа
};

export function buildSchedule(p: CalcParams, start = new Date()): ScheduleRow[] {
  const initial = p.propertyValue * (p.initialPaymentPercent / 100);
  const remaining = Math.max(0, p.propertyValue - initial);
  const principal = p.duration > 0 ? Math.ceil(remaining / p.duration / 1000) * 1000 : 0;
  // аренда ступенями от суммы после взноса; внутри ступени сумма не меняется
  const tiers = rentTiers(remaining, p.duration);
  const rows: ScheduleRow[] = [];
  let balance = remaining;
  for (let i = 1; i <= p.duration; i++) {
    const rent = rentForMonth(tiers, i);
    const pay = Math.min(principal, balance);
    balance = Math.max(0, balance - pay);
    const date = new Date(start.getFullYear(), start.getMonth() + i, 1);
    rows.push({ n: i, date, principal: pay, rent, total: pay + rent, balance });
  }
  return rows;
}


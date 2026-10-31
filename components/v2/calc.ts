import { rentTiers } from '@/components/PaymentSchedule';

export const fmt = (n: number) => Math.round(n).toLocaleString('ru-RU');

export function quote(price: number, downPercent: number, months: number) {
  const down = price * downPercent / 100;
  const remaining = Math.max(0, price - down);
  const principal = months > 0 ? Math.ceil(remaining / months / 1000) * 1000 : 0;
  const tiers = rentTiers(remaining, months);
  const first = principal + (tiers[0]?.rent ?? 0);
  const last = principal + (tiers[tiers.length - 1]?.rent ?? 0);
  return { down, remaining, principal, tiers, first, last };
}

/** Максимальная цена квартиры при заданном ежемесячном бюджете и доступном взносе. */
export function maxPrice(monthlyBudget: number, downAvailable: number, months: number, minDownPercent = 30) {
  const k = 1 / months + 0.008; // выкуп + аренда первой ступени
  const byBudget = monthlyBudget / k + downAvailable;
  const byDown = downAvailable / (minDownPercent / 100);
  return Math.max(0, Math.floor(Math.min(byBudget, byDown) / 100000) * 100000);
}

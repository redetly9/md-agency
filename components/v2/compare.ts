'use client';
export type Snap = { id: string; imageSrc?: string; price: number; roomCount?: number | string; area?: string; street?: string; district?: string; city?: string; floor?: string };
const KEY = 'md_compare';
export function loadCompare(): Snap[] { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
export function saveCompare(list: Snap[]) { try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, 3))); window.dispatchEvent(new Event('md_compare')); } catch {} }
export function toggleCompare(s: Snap): boolean {
  const list = loadCompare(); const i = list.findIndex(x => x.id === s.id);
  if (i >= 0) { list.splice(i, 1); saveCompare(list); return false; }
  if (list.length >= 3) list.shift();
  list.push(s); saveCompare(list); return true;
}

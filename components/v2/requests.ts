export type LocalRequest = { id: string; date: string; kind: string; name?: string; contact: string; note?: string; sent: boolean };
const KEY = 'md_requests';

export function loadRequests(): LocalRequest[] {
  if (typeof window === 'undefined') return [];
  try { const r = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(r) ? r : []; } catch { return []; }
}
export function addRequest(r: Omit<LocalRequest, 'id' | 'date'>) {
  try {
    const list = loadRequests();
    list.unshift({ ...r, id: Date.now().toString(36), date: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
  } catch {}
}

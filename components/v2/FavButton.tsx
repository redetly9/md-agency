'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const KEY = 'md_saved_ids';
function readIds(): string[] { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
function writeIds(ids: string[]) { try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch {} }

export default function FavButton({ id, snapshot, className = '' }: { id: string; snapshot: Record<string, unknown>; className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => { setOn(readIds().includes(id)); }, [id]);
  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const next = !on; setOn(next);
    const ids = readIds(); writeIds(next ? Array.from(new Set([...ids, id])) : ids.filter(x => x !== id));
    try {
      if (next) await fetch('/api/saved', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ listing_id: id, snapshot }) });
      else await fetch(`/api/saved?listing_id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch {}
  };
  return (
    <button type="button" onClick={toggle} aria-label={on ? 'Убрать из избранного' : 'В избранное'}
      className={`w-9 h-9 rounded-full bg-white/95 shadow-sm flex items-center justify-center transition ${on ? 'text-red-500' : 'text-ink-3 hover:text-ink'} ${className}`}>
      <Heart size={16} fill={on ? 'currentColor' : 'none'} />
    </button>
  );
}

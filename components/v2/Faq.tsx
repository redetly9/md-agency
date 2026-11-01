'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="v2-card divide-y divide-line overflow-hidden">
      {items.map((it, i) => (
        <div key={i}>
          <button type="button" onClick={() => setOpen(o => (o === i ? null : i))} className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-slate-50">
            <span className="font-semibold text-ink">{it.q}</span>
            <ChevronDown size={18} className={`shrink-0 text-ink-3 transition ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && <div className="px-5 pb-5 text-ink-2 text-[15px] leading-relaxed whitespace-pre-line">{it.a}</div>}
        </div>
      ))}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

const COUNTRIES = [['kz', '🇰🇿', 'Казахстан', true], ['uz', '🇺🇿', 'Узбекистан', false], ['kg', '🇰🇬', 'Кыргызстан', false], ['tr', '🇹🇷', 'Турция', false], ['ae', '🇦🇪', 'ОАЭ', false], ['ge', '🇬🇪', 'Грузия', false]] as const;

export default function CountrySelect({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(o => !o)} className={`inline-flex items-center gap-1.5 h-9 rounded-lg border border-line bg-white text-sm font-medium text-ink hover:border-ink-3 ${compact ? 'px-2' : 'px-3'}`}>
        🇰🇿 {!compact && 'Казахстан'} <ChevronDown size={14} className="text-ink-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 z-50 w-56 v2-card shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] p-1">
            {COUNTRIES.map(([id, flag, name, on]) => (
              <button key={id} type="button" onClick={() => { setOpen(false); if (!on) toast(`${name}: скоро`, { icon: '🚧' }); }}
                className={`w-full flex items-center gap-2 px-3 h-10 rounded-lg text-sm text-left ${on ? 'text-ink hover:bg-slate-50' : 'text-ink-3'}`}>
                <span>{flag}</span><span className="flex-1">{name}</span>{on ? <Check size={14} className="text-brand" /> : <span className="text-[10px] uppercase tracking-wide">скоро</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

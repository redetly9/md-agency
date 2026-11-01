'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Scale, X } from 'lucide-react';
import { loadCompare, saveCompare, Snap } from './compare';

export default function CompareBar() {
  const [list, setList] = useState<Snap[]>([]);
  useEffect(() => { const sync = () => setList(loadCompare()); sync(); window.addEventListener('md_compare', sync); return () => window.removeEventListener('md_compare', sync); }, []);
  if (list.length === 0) return null;
  return (
    <div className="fixed bottom-20 md:bottom-6 inset-x-4 md:inset-x-auto md:right-6 z-40 md:w-96 v2-card shadow-[0_20px_50px_-20px_rgba(15,23,42,0.4)] p-3 flex items-center gap-3">
      <div className="flex -space-x-2">
        {list.map(s => <img key={s.id} src={s.imageSrc || '/images/placeholder.jpg'} alt="" className="w-10 h-10 rounded-lg object-cover border-2 border-white" />)}
      </div>
      <div className="flex-1 min-w-0"><div className="text-sm font-bold text-ink">Сравнить {list.length} из 3</div><div className="text-xs text-ink-3">по платежу и параметрам</div></div>
      <Link href="/compare" className="h-9 px-3 rounded-lg bg-brand text-white text-sm font-semibold inline-flex items-center gap-1"><Scale size={14} /> Открыть</Link>
      <button type="button" onClick={() => saveCompare([])} className="p-1 text-ink-3 hover:text-ink" aria-label="Очистить"><X size={16} /></button>
    </div>
  );
}

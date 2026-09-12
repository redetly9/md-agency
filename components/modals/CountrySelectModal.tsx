'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export interface Country {
  code: string;
  name: string;
  flag: string;
  /** Страна доступна для выбора. Остальные показываются как «Скоро». */
  available: boolean;
}

export const COUNTRIES: Country[] = [
  { code: 'kz', name: 'Казахстан', flag: '🇰🇿', available: true },
  { code: 'uz', name: 'Узбекистан', flag: '🇺🇿', available: false },
  { code: 'ge', name: 'Грузия', flag: '🇬🇪', available: false },
  { code: 'tr', name: 'Турция', flag: '🇹🇷', available: false },
  { code: 'ae', name: 'ОАЭ', flag: '🇦🇪', available: false },
  { code: 'eu', name: 'Европа', flag: '🇪🇺', available: false },
  { code: 'id', name: 'Индонезия', flag: '🇮🇩', available: false },
];

const STORAGE_KEY = 'md_country';
const CHANGE_EVENT = 'md:country-changed';

export function useSelectedCountry() {
  const [country, setCountry] = useState<Country | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        setCountry(COUNTRIES.find((c) => c.code === saved && c.available) ?? null);
      } catch {}
    };
    read();
    setLoaded(true);
    window.addEventListener(CHANGE_EVENT, read);
    return () => window.removeEventListener(CHANGE_EVENT, read);
  }, []);

  const select = (c: Country) => {
    setCountry(c);
    try {
      localStorage.setItem(STORAGE_KEY, c.code);
    } catch {}
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return { country, select, loaded };
}

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onSelect: (country: Country) => void;
  selected?: Country | null;
}

export default function CountrySelectModal({ isOpen, onClose, onSelect, selected }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 pt-4 pb-24 sm:pb-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-full bg-white rounded-2xl p-6 max-[374px]:p-4 shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#016a80] font-semibold">MD international</p>
            <h2 className="text-lg max-[374px]:text-base font-bold text-black leading-snug">Цифровая платформа «Аренда с выкупом»</h2>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-3" aria-label="Закрыть">
              <X size={22} />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-4 max-[374px]:mb-3">Выберите страну</p>

        <ul className="space-y-2 max-[374px]:space-y-1.5 overflow-y-auto">
          {COUNTRIES.map((c) => {
            const active = selected?.code === c.code;
            return (
              <li key={c.code}>
                <button
                  type="button"
                  disabled={!c.available}
                  onClick={() => c.available && onSelect(c)}
                  className={`w-full flex items-center gap-3 px-4 py-3 max-[374px]:px-3 max-[374px]:py-2.5 max-[374px]:gap-2 rounded-lg border text-left transition-colors ${
                    active
                      ? 'bg-[#016a80] text-white border-[#016a80]'
                      : c.available
                        ? 'bg-white text-black border-gray-200 hover:border-[#016a80]'
                        : 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed'
                  }`}
                >
                  <span className={`text-2xl max-[374px]:text-xl leading-none ${c.available ? '' : 'grayscale opacity-60'}`}>{c.flag}</span>
                  <span className="font-medium max-[374px]:text-sm flex-1">{c.name}</span>
                  {!c.available && (
                    <span className="text-xs max-[374px]:text-[11px] text-gray-400 whitespace-nowrap">Скоро</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

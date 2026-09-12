'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: 'kz', name: 'Казахстан', flag: '🇰🇿' },
  { code: 'uz', name: 'Узбекистан', flag: '🇺🇿' },
  { code: 'ge', name: 'Грузия', flag: '🇬🇪' },
  { code: 'tr', name: 'Турция', flag: '🇹🇷' },
  { code: 'ae', name: 'ОАЭ', flag: '🇦🇪' },
  { code: 'eu', name: 'Европа', flag: '🇪🇺' },
  { code: 'id', name: 'Индонезия', flag: '🇮🇩' },
];

const STORAGE_KEY = 'md_country';

export function useSelectedCountry() {
  const [country, setCountry] = useState<Country | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const found = COUNTRIES.find((c) => c.code === saved) ?? null;
      setCountry(found);
    } catch {}
    setLoaded(true);
  }, []);

  const select = (c: Country) => {
    setCountry(c);
    try {
      localStorage.setItem(STORAGE_KEY, c.code);
    } catch {}
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-full bg-white rounded-2xl p-6 shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#016a80] font-semibold">MD international</p>
            <h2 className="text-lg font-bold text-black">Цифровая платформа «Аренда с выкупом»</h2>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-3" aria-label="Закрыть">
              <X size={22} />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-4">Выберите страну</p>

        <ul className="space-y-2 overflow-y-auto">
          {COUNTRIES.map((c) => {
            const active = selected?.code === c.code;
            return (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => onSelect(c)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-colors ${
                    active
                      ? 'bg-[#016a80] text-white border-[#016a80]'
                      : 'bg-white text-black border-gray-200 hover:border-[#016a80]'
                  }`}
                >
                  <span className="text-2xl leading-none">{c.flag}</span>
                  <span className="font-medium">{c.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import CountrySelectModal, { useSelectedCountry } from '@/components/modals/CountrySelectModal';

const OPEN_EVENT = 'md:open-country-modal';

/** Кнопка с флагом выбранной страны — открывает попап выбора. */
export function CountryButton({ className = '' }: { className?: string }) {
  const { country } = useSelectedCountry();
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={`flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-2 text-sm hover:border-[#016a80] transition-colors ${className}`}
      aria-label="Выбрать страну"
    >
      <span className="text-lg leading-none">{country?.flag ?? '🌍'}</span>
      <span className="hidden sm:inline text-black">{country?.name ?? 'Страна'}</span>
    </button>
  );
}

/** Попап выбора страны: показывается при первом входе, пока страна не выбрана. */
export default function CountryGate() {
  const { country, select, loaded } = useSelectedCountry();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  const isOpen = open || (loaded && !country);

  return (
    <CountrySelectModal
      isOpen={isOpen}
      selected={country}
      onClose={country ? () => setOpen(false) : undefined}
      onSelect={(c) => {
        select(c);
        setOpen(false);
      }}
    />
  );
}

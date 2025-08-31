'use client';

import { create } from 'zustand';

interface LanguageStore {
  language: 'ru' | 'en';
  setLanguage: (lang: 'ru' | 'en') => void;
}

export const useLanguage = create<LanguageStore>((set) => ({
  language: 'ru',
  setLanguage: (lang) => set({ language: lang }),
}));

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Обрабатываем CSS-классы из папки pages
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Обрабатываем CSS-классы из компонентов
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Обрабатываем CSS-классы из папки app
  ],
  theme: {
    extend: {
      // Расширение стандартной темы
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))', // Градиент круговой
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))', // Конусный градиент
      },
      colors: {
        primary: '#45e7d5',
        secondary: '#f3f4f6',
        accent: '#45e7d5',
        background: '#f9fafb',
        textPrimary: '#111827',
        textSecondary: '#6b7280',
      },
    },
    screens: {
      // Добавляем кастомные брейкпоинты для адаптивности
      s: '360px',
      sm: '640px', // Мобильные устройства (добавлено)
      md: '768px', // Планшеты (добавлено)
      lg: '1024px', // Десктопы (добавлено)
      xl: '1280px', // Большие экраны (добавлено)
      '2xl': '1536px', // Очень большие экраны (оставлено по умолчанию)
    },
  },
  plugins: [],
};

export default config;

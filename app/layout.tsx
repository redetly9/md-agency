import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthProvider } from '@/hooks/useAuth';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Providers from '@/components/Provider';
import Navigation from '@/components/Navigation';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: false
});

export const metadata: Metadata = {
  title: 'md.kz - Агентство недвижимости',
  description: 'Найдите свою идеальную недвижимость',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <main className="flex-grow pb-24 pb-[env(safe-area-inset-bottom)]">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}

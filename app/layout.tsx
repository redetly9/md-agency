import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthProvider } from '@/hooks/useAuth';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Providers from '@/components/Provider';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <main className="flex-grow pb-20">
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

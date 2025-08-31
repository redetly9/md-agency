import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthProvider } from '@/hooks/useAuth';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Providers from '@/components/Provider';
import Navigation from '@/components/Navigation';
import { Toaster } from 'react-hot-toast';

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
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <main className="flex-grow pb-20">
                {children}
              </main>
              <Footer />
              <Toaster
                position="bottom-center"
                toastOptions={{
                  duration: 5000,
                  style: {
                    fontSize: '16px',
                    padding: '16px',
                    maxWidth: '500px',
                  },
                  success: {
                    style: {
                      background: '#10B981',
                      color: '#fff',
                    },
                  },
                  error: {
                    style: {
                      background: '#EF4444',
                      color: '#fff',
                    },
                  },
                }}
              />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}

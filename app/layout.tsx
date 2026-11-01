import type { Metadata, Viewport } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthProvider } from '@/hooks/useAuth';
import Providers from '@/components/Provider';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/v2/Header';
import BottomNav from '@/components/v2/BottomNav';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], weight: ['500', '600', '700'], display: 'swap', variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'MD — квартира в собственность без ипотеки',
  description: 'Аренда с выкупом: живите в своей квартире уже сегодня и выкупайте её постепенно. Без подтверждения дохода, взнос от 30%, срок до 30 лет.',
};

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <AuthProvider>
          <Providers>
            <Header />
            <main className="min-h-screen pb-24 md:pb-0">{children}</main>
            <BottomNav />
            <Toaster position="bottom-center" toastOptions={{ duration: 4000, style: { fontSize: '15px', borderRadius: '12px' } }} />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}

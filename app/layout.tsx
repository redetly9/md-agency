import type { Metadata, Viewport } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthProvider } from '@/hooks/useAuth';
import Providers from '@/components/Provider';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/v2/Header';
import BottomNav from '@/components/v2/BottomNav';
import WhatsAppButton from '@/components/v2/WhatsAppButton';
import Assistant from '@/components/v2/Assistant';
import { I18nProvider } from '@/components/v2/i18n';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], weight: ['500', '600', '700'], display: 'swap', variable: '--font-serif' });

export const metadata: Metadata = {
  metadataBase: new URL('https://marketplacedeposit.com'),
  title: { default: 'MD — квартира в собственность без ипотеки', template: '%s' },
  description: 'Аренда с выкупом: живите в своей квартире уже сегодня и выкупайте её постепенно. Без подтверждения дохода, взнос от 30%, срок до 30 лет.',
  openGraph: { type: 'website', siteName: 'MD · md.kz', locale: 'ru_KZ', url: 'https://marketplacedeposit.com', title: 'MD — квартира в собственность без ипотеки', description: 'Аренда с выкупом: взнос от 30%, срок до 30 лет, без справок о доходах. Платёж снижается каскадом.' },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://marketplacedeposit.com' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <AuthProvider>
          <Providers>
            <I18nProvider>
            <Header />
            <main className="min-h-screen pb-24 md:pb-0">{children}</main>
            <BottomNav />
            <WhatsAppButton />
            <Assistant />
            </I18nProvider>
            <Toaster position="bottom-center" toastOptions={{ duration: 4000, style: { fontSize: '15px', borderRadius: '12px' } }} />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Providers from '@/components/Provider';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VacationHub',
  description:
    'Your Ultimate Destination Connection. Discover a world of endless possibilities and seamless vacation planning at VacationHub.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <Header />
          {/* <Navigation /> */}
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Квартиры в аренду с выкупом — каталог | MD', description: 'Каталог квартир с расчётом платежа по аренде с выкупом. Фильтр по платежу в месяц, городу, комнатам и цене.' };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

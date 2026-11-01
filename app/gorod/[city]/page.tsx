import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Percent, CalendarDays, UserCheck } from 'lucide-react';
import Button from '@/components/v2/Button';
import MiniCalc from '@/components/v2/MiniCalc';
import ListingsPreview from '@/components/v2/ListingsPreview';
import Faq from '@/components/v2/Faq';
import { CITIES } from '@/components/v2/cities';
import { fmt, quote } from '@/components/v2/calc';

export function generateStaticParams() { return CITIES.map(c => ({ city: c.slug })); }

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const c = CITIES.find(x => x.slug === params.city);
  if (!c) return {};
  return {
    title: `Аренда с выкупом ${c.loc} — квартира без ипотеки | MD`,
    description: `Квартиры в аренду с выкупом ${c.loc}: взнос от 30%, срок до 30 лет, без подтверждения дохода. Платёж снижается каскадом. Предварительное одобрение за 2 минуты.`,
    alternates: { canonical: `https://marketplacedeposit.com/gorod/${c.slug}` },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const c = CITIES.find(x => x.slug === params.city);
  if (!c) notFound();
  const q = quote(c.avgPrice, 30, 360);
  const faq = [
    { q: `Какие квартиры доступны ${c.loc}?`, a: `Любые квартиры на вторичном рынке и в новостройках ${c.loc}, которые проходят проверку MD. Выберите из каталога или предложите свою.` },
    { q: 'Сколько нужно на первый взнос?', a: `От 30% стоимости. Для средней квартиры ${c.loc} за ${fmt(c.avgPrice)} ₸ это ${fmt(q.down)} ₸.` },
    { q: 'Какой будет платёж?', a: `Для квартиры за ${fmt(c.avgPrice)} ₸ при взносе 30% и сроке 30 лет: ${fmt(q.first)} ₸ в месяц первые 10 лет, затем ${fmt(q.principal + q.tiers[1].rent)} ₸ и ${fmt(q.last)} ₸.` },
    { q: 'Нужна ли справка о доходах?', a: 'Нет. Решение принимается по взносу и выбранной квартире.' },
  ];
  const ld = { '@context': 'https://schema.org', '@type': 'Service', name: `Аренда с выкупом ${c.loc}`, provider: { '@type': 'Organization', name: 'MD', url: 'https://marketplacedeposit.com' }, areaServed: c.name, serviceType: 'Rent-to-own', url: `https://marketplacedeposit.com/gorod/${c.slug}` };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,#E6F4EC_0%,rgba(230,244,236,0)_70%)]" />
        <div className="v2-container pt-10 pb-10 sm:pt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">{c.name}</div>
          <h1 className="v2-h1 mt-5 max-w-3xl">Аренда с выкупом {c.loc}: квартира <span className="text-brand">без ипотеки</span></h1>
          <p className="mt-5 text-lg text-ink-2 max-w-2xl leading-relaxed">{c.intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button size="lg" href="/start">Узнать мой лимит <ArrowRight size={18} /></Button>
            <Button size="lg" variant="secondary" href={`/catalog?region=${c.region}`}>Квартиры {c.loc}</Button>
          </div>
          <div className="mt-8 grid grid-cols-1 xs:grid-cols-3 gap-2 max-w-lg">
            {[[<UserCheck key="1" size={18} />, 'Без справок'], [<Percent key="2" size={18} />, 'Взнос от 30%'], [<CalendarDays key="3" size={18} />, 'До 30 лет']].map(([i, t], k) => <div key={k} className="flex items-center gap-2 text-sm text-ink-2"><span className="text-brand">{i}</span>{t as string}</div>)}
          </div>
        </div>
      </section>
      <section className="bg-slate-50 border-y border-line"><div className="v2-container py-14">
        <h2 className="v2-h2">Пример для {c.name}</h2>
        <p className="mt-2 text-ink-2">Квартира за {fmt(c.avgPrice)} ₸, взнос 30%, срок 30 лет: платёж {fmt(q.first)} ₸ в месяц, затем снижается. Посчитайте свой вариант:</p>
        <div className="mt-8"><MiniCalc /></div>
      </div></section>
      <section className="v2-container py-14">
        <div className="flex items-end justify-between gap-4 flex-wrap"><h2 className="v2-h2">Квартиры {c.loc}</h2><Link href={`/catalog?region=${c.region}`} className="text-brand font-semibold inline-flex items-center gap-1">Все квартиры <ArrowRight size={16} /></Link></div>
        <div className="mt-8"><ListingsPreview limit={6} region={c.region} /></div>
      </section>
      <section className="v2-container pb-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
        <div><h2 className="v2-h2">Вопросы про {c.name}</h2><p className="mt-2 text-ink-2">Другие города: {CITIES.filter(x => x.slug !== c.slug).map((x, i) => <span key={x.slug}>{i > 0 ? ', ' : ''}<Link href={`/gorod/${x.slug}`} className="text-brand font-semibold">{x.name}</Link></span>)}.</p></div>
        <Faq items={faq} />
      </section>
    </>
  );
}

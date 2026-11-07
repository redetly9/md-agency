import { ArrowRight, Zap, ShieldCheck, Clock, Banknote, Flame, TrendingUp, Check } from 'lucide-react';
import Button from '@/components/v2/Button';
import LeadForm from '@/components/v2/LeadForm';
import Faq from '@/components/v2/Faq';
import { LISTING_TARIFFS } from '@/components/v2/tariffs';
import { fmt } from '@/components/v2/calc';

export const metadata = { title: 'Продавцам — выставить квартиру | MD', description: 'Продайте квартиру через MD: быстрая сделка по схеме аренды с выкупом или размещение объявления с продвижением в каталоге.' };

const FAQ = [
  { q: 'Как MD покупает квартиру?', a: 'Если на вашу квартиру есть клиент по программе аренды с выкупом, MD выкупает её у вас по рыночной цене: клиент вносит 30–50%, остальное финансирует MD. Вы получаете деньги при сделке, не ждёте ипотечного одобрения покупателя.' },
  { q: 'Сколько стоит выставить квартиру?', a: 'Первое объявление бесплатно на 30 дней. Продвижение (ТОП, «Горячее», пакеты) оплачивается отдельно по тарифам ниже.' },
  { q: 'Что нужно для размещения?', a: 'Фото, адрес, площадь, цена и ваш контакт. Документы на собственность запросим при выходе на сделку.' },
  { q: 'Как оплачивается продвижение?', a: 'Картой или через Kaspi после подтверждения менеджером. Услуга включается после оплаты.' },
];

export default function SellersPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_100%_0%,#E6F4EC_0%,rgba(230,244,236,0)_70%)]" />
        <div className="v2-container pt-10 pb-10 sm:pt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">Продавцам</div>
          <h1 className="v2-h1 mt-5 max-w-3xl">Продайте квартиру <span className="text-brand">быстро и без ипотечных ожиданий</span></h1>
          <p className="mt-5 text-lg text-ink-2 max-w-2xl leading-relaxed">Два пути: MD выкупает вашу квартиру под клиента по аренде с выкупом, или вы размещаете объявление в каталоге и продвигаете его.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button size="lg" href="#list">Выставить квартиру <ArrowRight size={18} /></Button>
            <Button size="lg" variant="secondary" href="#tariffs">Тарифы продвижения</Button>
          </div>
          <div className="mt-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3">
            {[[<Clock key="1" />, 'Быстрая сделка', 'без ожидания ипотеки покупателя'], [<Banknote key="2" />, 'Рыночная цена', 'оценка независимым оценщиком'], [<ShieldCheck key="3" />, 'Юридическая чистота', 'проверка и сопровождение MD'], [<TrendingUp key="4" />, 'Продвижение', 'ТОП, «Горячие», пакеты']].map(([i, t, d], k) => (
              <div key={k} className="v2-card p-4 flex items-start gap-3"><span className="w-10 h-10 rounded-xl bg-brand-light text-brand flex items-center justify-center shrink-0">{i}</span><div><div className="font-bold text-ink">{t as string}</div><div className="text-xs text-ink-2 mt-0.5">{d as string}</div></div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="tariffs" className="bg-slate-50 border-y border-line scroll-mt-20">
        <div className="v2-container py-14 sm:py-20">
          <h2 className="v2-h2">Тарифы на размещение и продвижение</h2>
          <p className="mt-2 text-ink-2 max-w-2xl">Первое объявление бесплатно. Продвижение поднимает карточку в выдаче и в блок «Горячие предложения».</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LISTING_TARIFFS.map(t => (
              <div key={t.id} className={`v2-card p-5 flex flex-col ${t.highlight ? 'border-brand ring-4 ring-brand/10' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-ink">{t.name}</div>
                  {t.badge && <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-brand-light text-brand">{t.badge}</span>}
                </div>
                <div className="mt-3 text-3xl font-extrabold text-ink tabular-nums">{t.price === 0 ? 'Бесплатно' : `${fmt(t.price)} ₸`}</div>
                <div className="text-xs text-ink-3">{t.period}</div>
                <p className="mt-3 text-sm text-ink-2 leading-relaxed flex-1">{t.desc}</p>
                <Button href="#list" variant={t.highlight ? 'primary' : 'secondary'} className="mt-4" full>{t.price === 0 ? 'Разместить' : 'Подключить'}</Button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xs text-ink-3">Цены указаны в тенге с учётом НДС. Услуги продвижения активируются после подтверждения объявления менеджером MD.</div>
        </div>
      </section>

      <section className="v2-container py-14 sm:py-20">
        <h2 className="v2-h2">Как MD покупает квартиру</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[['Заявка', 'Оставляете адрес, цену и контакт. Менеджер связывается в течение дня.'], ['Оценка и проверка', 'Независимая оценка, проверка документов и обременений.'], ['Клиент MD', 'Под вашу квартиру подбирается клиент по аренде с выкупом с взносом 30–50%.'], ['Сделка', 'MD выкупает квартиру, вы получаете деньги при подписании. Переоформление за наш счёт.']].map(([t, d], i) => (
            <div key={i} className="v2-card p-5"><div className="text-xs font-bold text-ink-3">0{i + 1}</div><div className="mt-2 font-bold text-ink">{t}</div><div className="mt-1.5 text-sm text-ink-2 leading-relaxed">{d}</div></div>
          ))}
        </div>
      </section>

      <section id="list" className="bg-slate-50 border-t border-line scroll-mt-20">
        <div className="v2-container py-14 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <div>
            <h2 className="v2-h2">Выставить квартиру</h2>
            <p className="mt-3 text-ink-2">Опишите квартиру: город, адрес, площадь, цену. Фото пришлёте менеджеру в WhatsApp после заявки.</p>
            <ul className="mt-5 space-y-2 text-sm text-ink-2">{['Первое объявление бесплатно', 'Проверим документы и цену', 'Подберём клиента по аренде с выкупом'].map(t => <li key={t} className="flex gap-2"><Check size={16} className="text-brand shrink-0 mt-0.5" />{t}</li>)}</ul>
            <div className="mt-8"><Faq items={FAQ} /></div>
          </div>
          <LeadForm title="Заявка продавца" subtitle="Город, адрес, площадь, цена и желаемый тариф продвижения." context="sellers" kind="property" role="partner" />
        </div>
      </section>
    </>
  );
}

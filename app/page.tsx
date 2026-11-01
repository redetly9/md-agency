import Link from 'next/link';
import { ArrowRight, ShieldCheck, Percent, CalendarDays, UserCheck, Search, FileSignature, KeyRound, Home, Check, X } from 'lucide-react';
import Button from '@/components/v2/Button';
import MiniCalc from '@/components/v2/MiniCalc';
import ListingsPreview from '@/components/v2/ListingsPreview';
import Faq from '@/components/v2/Faq';

const FAQ = [
  { q: 'Как получить квартиру в аренду с выкупом?', a: 'Выберите квартиру из предложений MD, пройдите предварительное одобрение, внесите первоначальный взнос от 30% и заключите договор аренды с последующим выкупом. Вы заселяетесь сразу и ежемесячно платите аренду и часть выкупа. После полной оплаты квартира переходит в вашу собственность.' },
  { q: 'Нужно ли подтверждать доход?', a: 'Нет. Мы не запрашиваем справки о доходах и не проверяем кредитную историю так, как это делает банк. Решение принимается по первоначальному взносу и выбранной квартире.' },
  { q: 'Из чего состоит платёж?', a: 'Из двух частей: выкуп, который равными долями идёт в вашу собственность, и аренда от остатка. Аренда снижается ступенями: первая треть срока 0,8% в месяц, вторая 0,4%, третья 0,168%.' },
  { q: 'Что будет, если я захочу выйти из договора?', a: 'Накопленные платежи в счёт выкупа остаются вашими. Взаиморасчёты производятся по условиям договора, вы вправе вернуть накопленные средства.' },
  { q: 'Чем это лучше ипотеки?', a: 'Без подтверждения дохода, без депозита и очередей, срок до 30 лет, платёж снижается со временем. Квартира фиксируется по сегодняшней цене.' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,#E6F4EC_0%,rgba(230,244,236,0)_70%)]" />
        <div className="v2-container pt-10 pb-12 sm:pt-16 sm:pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" /> Аренда с выкупом · Казахстан
            </div>
            <h1 className="v2-h1 mt-5">Квартира в собственность <span className="text-brand">без ипотеки</span></h1>
            <p className="mt-5 text-lg text-ink-2 max-w-xl leading-relaxed">
              Живите в своей квартире уже сегодня и выкупайте её постепенно. Без подтверждения дохода, взнос от 30%, срок до 30 лет, платёж снижается со временем.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" href="/start">Узнать мой лимит за 2 минуты <ArrowRight size={18} /></Button>
              <Button size="lg" variant="secondary" href="#catalog">Смотреть квартиры</Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
              {[
                [<UserCheck key="1" size={18} />, 'Без справок о доходах'],
                [<Percent key="2" size={18} />, 'Взнос от 30%'],
                [<CalendarDays key="3" size={18} />, 'Срок до 30 лет'],
              ].map(([icon, t], i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-ink-2"><span className="text-brand">{icon}</span>{t as string}</div>
              ))}
            </div>
          </div>

          {/* approval card */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-light/60 blur-2xl" />
            <div className="v2-card p-6 shadow-[0_30px_80px_-40px_rgba(11,122,75,0.45)]">
              <div className="flex items-center justify-between">
                <div className="text-sm text-ink-2">Предварительное одобрение</div>
                <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-brand-light text-brand">2 минуты</span>
              </div>
              <div className="mt-3 text-sm text-ink-3">Доступны квартиры до</div>
              <div className="text-4xl font-extrabold text-ink tabular-nums">42 000 000 ₸</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3"><div className="text-[11px] text-ink-3">Платёж в месяц</div><div className="font-bold text-ink">от 317 200 ₸</div></div>
                <div className="rounded-xl bg-slate-50 p-3"><div className="text-[11px] text-ink-3">Первый взнос</div><div className="font-bold text-ink">12 600 000 ₸</div></div>
              </div>
              <div className="mt-4 space-y-2">
                {['Город: Астана', 'Срок: 30 лет', 'Без подтверждения дохода'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-ink-2"><span className="w-5 h-5 rounded-full bg-brand-light text-brand flex items-center justify-center"><Check size={12} /></span>{t}</div>
                ))}
              </div>
              <Button href="/start" full className="mt-5">Рассчитать мой лимит</Button>
              <div className="mt-3 text-[11px] text-ink-3 text-center">Пример расчёта. Ваш лимит зависит от взноса и срока.</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="v2-container py-14 sm:py-20 scroll-mt-20">
        <h2 className="v2-h2">Как это работает</h2>
        <p className="mt-2 text-ink-2 max-w-2xl">Четыре шага от заявки до ключей. Всё онлайн, договор подписываете в офисе MD.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            [<Search key="1" />, 'Выберите квартиру', 'Из каталога MD или предложите свою. Мы проверим объект и зафиксируем цену.'],
            [<ShieldCheck key="2" />, 'Получите одобрение', 'Пять вопросов и персональный лимит. Без справок и визита в банк.'],
            [<FileSignature key="3" />, 'Внесите взнос и подпишите договор', 'От 30% стоимости. Условия и ставка фиксируются на весь срок.'],
            [<KeyRound key="4" />, 'Заселяйтесь и выкупайте', 'Платите ежемесячно, доля в квартире растёт. После последнего платежа квартира ваша.'],
          ].map(([icon, t, d], i) => (
            <div key={i} className="v2-card p-5">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-xl bg-brand-light text-brand flex items-center justify-center">{icon}</span>
                <span className="text-xs font-bold text-ink-3">0{i + 1}</span>
              </div>
              <div className="mt-4 font-bold text-ink">{t as string}</div>
              <div className="mt-1.5 text-sm text-ink-2 leading-relaxed">{d as string}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CALC */}
      <section id="calc" className="bg-slate-50 border-y border-line scroll-mt-20">
        <div className="v2-container py-14 sm:py-20">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="v2-h2">Посчитайте платёж</h2>
              <p className="mt-2 text-ink-2">Честные цифры без скрытых комиссий. Аренда снижается каждые треть срока.</p>
            </div>
            <Link href="/arenda-s-vykupom#calculator" className="text-brand font-semibold inline-flex items-center gap-1">Полный график по месяцам <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-8"><MiniCalc /></div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="v2-container py-14 sm:py-20 scroll-mt-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="v2-h2">Квартиры в аренду с выкупом</h2>
            <p className="mt-2 text-ink-2">На каждой карточке ваш ориентировочный платёж при взносе 30% и сроке 30 лет.</p>
          </div>
          <Link href="/listings/search/prodazha/kvartiry" className="text-brand font-semibold inline-flex items-center gap-1">Все квартиры <ArrowRight size={16} /></Link>
        </div>
        <div className="mt-8"><ListingsPreview limit={6} /></div>
      </section>

      {/* COMPARE */}
      <section className="bg-ink text-white">
        <div className="v2-container py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Честно про ипотеку</h2>
            <p className="mt-3 text-slate-300 leading-relaxed">Мы не обещаем «дешевле банка». Мы даём квартиру тем, кому банк отказал, и делаем платёж предсказуемым: он известен на 30 лет вперёд и только снижается.</p>
            <Button href="/start" variant="primary" size="lg" className="mt-7">Проверить, подхожу ли я</Button>
          </div>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] text-sm">
              <div className="p-4 text-slate-400">Условие</div><div className="p-4 font-bold text-brand-ring">MD</div><div className="p-4 text-slate-400">Банк</div>
              {[
                ['Подтверждение дохода', true, false],
                ['Кредитная история', true, false],
                ['Срок', '30 лет', '19–25 лет'],
                ['Взнос', '30–50%', '20–50%'],
                ['Платёж', 'снижается', 'фиксированный'],
                ['Решение', '2 минуты', 'до 2 недель'],
              ].map(([k, a, b], i) => (
                <div key={i} className="contents">
                  <div className="p-4 border-t border-white/10 text-slate-300">{k as string}</div>
                  <div className="p-4 border-t border-white/10 font-semibold">{a === true ? <span className="inline-flex items-center gap-1 text-brand-ring"><Check size={16} /> не нужно</span> : (a as string)}</div>
                  <div className="p-4 border-t border-white/10 text-slate-300">{b === false ? <span className="inline-flex items-center gap-1"><X size={16} /> требуется</span> : (b as string)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="v2-container py-14 sm:py-20">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          <div>
            <h2 className="v2-h2">Частые вопросы</h2>
            <p className="mt-2 text-ink-2">Не нашли ответ? Напишите нам, отвечаем в рабочее время.</p>
            <Button href="/messages" variant="secondary" className="mt-5">Задать вопрос</Button>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      {/* CTA */}
      <section className="v2-container pb-16">
        <div className="rounded-3xl bg-brand text-white p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10" />
          <div className="relative">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">Узнайте свой лимит сегодня</div>
            <div className="mt-2 text-white/80">Пять вопросов, никаких документов. Результат сразу на экране.</div>
          </div>
          <Button href="/start" variant="dark" size="lg" className="relative bg-white !text-brand hover:bg-white/90">Начать <ArrowRight size={18} /></Button>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="v2-container py-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-sm text-ink-3">
          <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-lg bg-brand text-white text-[10px] font-extrabold flex items-center justify-center">MD</span>© {new Date().getFullYear()} md.kz · Rent · Live · Own</div>
          <div className="flex gap-5">
            <Link href="/refinance" className="hover:text-ink">Рефинансирование</Link>
            <Link href="/mortgage" className="hover:text-ink">Ипотека</Link>
            <Link href="/teaser" className="hover:text-ink">Инвесторам</Link>
            <Link href="/messages" className="hover:text-ink">Контакты</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

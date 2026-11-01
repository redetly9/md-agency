import Link from 'next/link';
import { ArrowRight, Percent, CalendarDays, UserCheck, ShieldCheck, Home, Check, X, Search, PiggyBank, FileSignature, KeyRound, Building2 } from 'lucide-react';
import Button from '@/components/v2/Button';
import MiniCalc from '@/components/v2/MiniCalc';
import LeadForm from '@/components/v2/LeadForm';

export const metadata = { title: 'Аренда с выкупом — MD', description: 'Квартира в собственность без ипотеки: взнос от 30%, срок до 30 лет, платёж снижается со временем.' };

const STEPS = [
  [<Search key="1" />, 'Выбор квартиры', 'Из базы MD или предложите свою. Мы проверяем объект и фиксируем цену.'],
  [<PiggyBank key="2" />, 'Первоначальный взнос', 'От 30% до 50% стоимости жилья. Чем больше взнос, тем ниже платёж.'],
  [<FileSignature key="3" />, 'Договор', 'Договор аренды с правом выкупа, все условия и ставка фиксируются на весь срок.'],
  [<KeyRound key="4" />, 'Проживание и платежи', 'Вы въезжаете сразу и платите ежемесячно: аренда плюс часть выкупа.'],
  [<Home key="5" />, 'Собственность', 'После последнего платежа квартира переходит в вашу собственность.'],
];

const COMPARE: [string, string | boolean, string | boolean][] = [
  ['Первоначальный взнос', '30–50%', '20–30%'],
  ['Проверка кредитной истории', 'минимальная', 'строгая'],
  ['Подтверждение дохода', true, false],
  ['Платёж', 'снижается ступенями', 'фиксированный'],
  ['Срок', 'до 30 лет', '19–25 лет'],
  ['Подходит при нестабильном доходе', true, false],
  ['Решение', '2 минуты онлайн', 'до 2 недель'],
];

export default function ArendaPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_100%_0%,#E6F4EC_0%,rgba(230,244,236,0)_70%)]" />
        <div className="v2-container pt-10 pb-10 sm:pt-16 sm:pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">Аренда с выкупом</div>
          <h1 className="v2-h1 mt-5 max-w-3xl">Накопить и выкупить: квартира без <span className="text-brand">ипотечного бремени</span></h1>
          <p className="mt-5 text-lg text-ink-2 max-w-2xl leading-relaxed">MD покупает квартиру, вы в ней живёте и выкупаете её по заранее согласованным условиям. Без банковских проверок, без справок о доходах.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button size="lg" href="/start">Узнать мой лимит <ArrowRight size={18} /></Button>
            <Button size="lg" variant="secondary" href="#calculator">Рассчитать платёж</Button>
          </div>
          <div className="mt-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              [<Percent key="1" />, 'Взнос 30–50%', 'от стоимости квартиры'],
              [<CalendarDays key="2" />, 'До 30 лет', 'срок выкупа'],
              [<UserCheck key="3" />, 'Без справок', 'о доходах и кредитах'],
              [<ShieldCheck key="4" />, 'Условия в договоре', 'фиксируются на весь срок'],
            ].map(([icon, t, d], i) => (
              <div key={i} className="v2-card p-4 flex items-start gap-3">
                <span className="w-10 h-10 rounded-xl bg-brand-light text-brand flex items-center justify-center shrink-0">{icon}</span>
                <div><div className="font-bold text-ink">{t as string}</div><div className="text-xs text-ink-2 mt-0.5">{d as string}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="bg-slate-50 border-y border-line scroll-mt-20">
        <div className="v2-container py-14 sm:py-20">
          <h2 className="v2-h2">Рассчитайте свой вариант</h2>
          <p className="mt-2 text-ink-2">Платёж состоит из выкупа и аренды. Аренда считается от остатка после взноса и снижается по третям срока: 0,8% → 0,4% → 0,168% в месяц.</p>
          <div className="mt-8"><MiniCalc withSchedule /></div>
        </div>
      </section>

      <section className="v2-container py-14 sm:py-20">
        <h2 className="v2-h2">Как работает аренда с выкупом</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {STEPS.map(([icon, t, d], i) => (
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

      <section className="bg-ink text-white">
        <div className="v2-container py-14 sm:py-20">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Сравнение с ипотекой</h2>
          <p className="mt-3 text-slate-300 max-w-2xl">По переплате банк может быть выгоднее, если вы проходите его требования. Мы даём квартиру тем, кому банк отказывает, и платёж, который известен на весь срок.</p>
          <div className="mt-8 rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] text-[11px] xs:text-xs sm:text-sm">
              <div className="p-2.5 sm:p-4 text-slate-400">Параметр</div><div className="p-2.5 sm:p-4 font-bold text-brand-ring">Аренда с выкупом</div><div className="p-2.5 sm:p-4 text-slate-400">Ипотека</div>
              {COMPARE.map(([k, a, b], i) => (
                <div key={i} className="contents">
                  <div className="p-2.5 sm:p-4 border-t border-white/10 text-slate-300">{k}</div>
                  <div className="p-2.5 sm:p-4 border-t border-white/10 font-semibold">{a === true ? <span className="inline-flex items-center gap-1 text-brand-ring"><Check size={16} /> не нужно</span> : a}</div>
                  <div className="p-2.5 sm:p-4 border-t border-white/10 text-slate-300">{b === false ? <span className="inline-flex items-center gap-1"><X size={16} /> требуется</span> : b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="v2-container py-14 sm:py-20 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="v2-h2">Стоимость услуг</h2>
          <p className="mt-2 text-ink-2">Без скрытых платежей. Всё, что оплачивается отдельно:</p>
          <ul className="mt-6 space-y-3">
            {[['Консультация', '35 000 ₸'], ['Комиссия за оформление', '10% от стоимости объекта'], ['Оценка квартиры', 'оплачивает арендатор'], ['Страховка', 'оплачивает арендатор'], ['Нотариальные услуги', 'оплачивает арендатор']].map(([k, v]) => (
              <li key={k} className="flex items-center justify-between gap-4 py-3 border-b border-line text-[15px]"><span className="text-ink-2">{k}</span><span className="font-semibold text-ink text-right">{v}</span></li>
            ))}
          </ul>
        </div>
        <div className="v2-card p-6 bg-brand-soft border-brand-light">
          <Building2 className="text-brand" size={28} />
          <div className="mt-3 text-xl font-extrabold tracking-tight text-ink">Нет подходящей квартиры в каталоге?</div>
          <p className="mt-2 text-ink-2">Предложите свою: мы проверим объект, договоримся с собственником и оформим сделку по той же схеме.</p>
          <Button href="#lead" className="mt-5">Предложить квартиру</Button>
        </div>
      </section>

      <section id="lead" className="bg-slate-50 border-t border-line scroll-mt-20">
        <div className="v2-container py-14 sm:py-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <div>
            <h2 className="v2-h2">Начните путь к собственному жилью</h2>
            <p className="mt-3 text-ink-2 leading-relaxed">Оставьте контакт, и мы подберём квартиру под ваш бюджет и взнос. Или пройдите <Link href="/start" className="text-brand font-semibold">предварительное одобрение</Link> за две минуты.</p>
          </div>
          <LeadForm title="Заявка на аренду с выкупом" context="arenda-s-vykupom" kind="lead" />
        </div>
      </section>
    </>
  );
}

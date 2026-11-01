import { ShieldCheck, Building2, Users, Globe, Handshake, Landmark, Umbrella } from 'lucide-react';
import Button from '@/components/v2/Button';
import LeadForm from '@/components/v2/LeadForm';

export const metadata = { title: 'О компании MD — аренда с выкупом', description: 'MD — цифровая платформа аренды жилья с выкупом в Казахстане. Прозрачная модель, фиксированные условия, поддержка на всех этапах.' };

export default function AboutPage() {
  return (
    <>
      <section className="v2-container pt-10 pb-12 sm:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">О компании</div>
        <h1 className="v2-h1 mt-5 max-w-3xl">Больше, чем просто квартиры</h1>
        <p className="mt-5 text-lg text-ink-2 max-w-2xl leading-relaxed">MD — цифровая платформа аренды жилья с выкупом. Мы покупаем квартиру, вы живёте в ней и выкупаете по заранее согласованным условиям. Без банковских проверок и справок о доходах.</p>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[['30 лет', 'максимальный срок выкупа'], ['30–50%', 'первоначальный взнос'], ['3 ступени', 'снижения платежа'], ['Казахстан', 'Астана, Алматы, Шымкент и регионы']].map(([v, k]) => (
            <div key={k} className="v2-card p-4"><div className="text-2xl font-extrabold text-brand">{v}</div><div className="text-sm text-ink-2 mt-1">{k}</div></div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-y border-line">
        <div className="v2-container py-14 sm:py-20">
          <h2 className="v2-h2">Как мы работаем</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              [<Building2 key="1" />, 'Недвижимость как базовый актив', 'MD приобретает квартиру на себя и передаёт её клиенту в пользование с правом выкупа. Цена фиксируется в договоре.'],
              [<ShieldCheck key="2" />, 'Прозрачная модель', 'Платёж состоит из выкупа и аренды, обе части видны в графике на весь срок. Никаких скрытых комиссий.'],
              [<Users key="3" />, 'Сопровождение клиента', 'Личный менеджер от заявки до перехода права собственности. Помогаем с документами и оценкой.'],
              [<Landmark key="4" />, 'Юридическая защита', 'Договор аренды с последующим выкупом, при необходимости регистрация обременения в пользу клиента.'],
              [<Umbrella key="5" />, 'Страхование', 'Партнёрство со страховыми компаниями для защиты объекта и платежей.'],
              [<Globe key="6" />, 'Масштабирование', 'Стандартизированная сделка и цифровой клиентский путь, чтобы работать в разных городах и странах.'],
            ].map(([icon, t, d], i) => (
              <div key={i} className="v2-card p-5"><span className="w-11 h-11 rounded-xl bg-brand-light text-brand flex items-center justify-center">{icon}</span><div className="mt-4 font-bold text-ink">{t as string}</div><div className="mt-1.5 text-sm text-ink-2 leading-relaxed">{d as string}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-container py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="v2-h2">Наши ценности</h2>
          <ul className="mt-6 space-y-4">
            {[['Честность', 'В каждом решении и в каждом слове. Условия известны до подписания.'], ['Партнёрство', 'Вместе достигаем большего: с клиентами, собственниками, инвесторами.'], ['Качество', 'В каждой детали и на каждом этапе сделки.'], ['Устойчивое развитие', 'Для людей, города и страны.'], ['Люди', 'Наша главная ценность.']].map(([t, d]) => (
              <li key={t} className="flex gap-3"><Handshake size={20} className="text-brand shrink-0 mt-0.5" /><div><div className="font-bold text-ink">{t}</div><div className="text-sm text-ink-2">{d}</div></div></li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3 flex-wrap">
            <Button href="/legal" variant="secondary">Юридическая схема</Button>
            <Button href="/investors" variant="secondary">Инвесторам</Button>
            <Button href="/reviews" variant="secondary">Отзывы</Button>
          </div>
        </div>
        <LeadForm title="Связаться с нами" subtitle="Консультация, партнёрство, вопросы по сделке." context="about" kind="question" />
      </section>
    </>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, TrendingUp, Building2, Handshake, ShieldCheck, Globe, BarChart3 } from 'lucide-react';
import Button from '@/components/v2/Button';
import LeadForm from '@/components/v2/LeadForm';
import { fmt, quote } from '@/components/v2/calc';

export default function InvestorsPage() {
  const [amount, setAmount] = useState(100_000_000);
  const [years, setYears] = useState(30);
  // один объект: инвестор покрывает остаток после взноса клиента 30%
  const calc = useMemo(() => {
    const price = amount / 0.7; const q = quote(price, 30, years * 12);
    const rent = q.tiers.reduce((a, t) => a + t.rent * (t.to - t.from + 1), 0);
    const avgYearlyYield = rent / years / amount * 100;
    const firstYearYield = (q.tiers[0]?.rent ?? 0) * 12 / amount * 100;
    return { price, q, rent, avgYearlyYield, firstYearYield };
  }, [amount, years]);

  return (
    <>
      <section className="v2-container pt-10 pb-10 sm:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">Инвесторам и партнёрам</div>
        <h1 className="v2-h1 mt-5 max-w-3xl">Недвижимость как базовый актив. Платформа как механизм масштабирования.</h1>
        <p className="mt-5 text-lg text-ink-2 max-w-2xl leading-relaxed">MD покупает квартиры и передаёт их клиентам в аренду с выкупом. Капитал инвестора обеспечен недвижимостью, доход формирует арендный поток, а тело возвращается выкупными платежами.</p>
        <div className="mt-8 flex gap-3 flex-wrap">
          <Button size="lg" href="#invest">Обсудить участие <ArrowRight size={18} /></Button>
          <Button size="lg" variant="secondary" href="/teaser">Смотреть презентацию</Button>
        </div>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[['до 20%', 'годовая доходность по модели'], ['$30 млрд', 'рынок недвижимости Казахстана'], ['6 лет', 'горизонт инвестирования'], ['от $1 млн', 'инвестиционный билет']].map(([v, k]) => (
            <div key={k} className="v2-card p-4"><div className="text-2xl font-extrabold text-brand">{v}</div><div className="text-sm text-ink-2 mt-1">{k}</div></div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-y border-line">
        <div className="v2-container py-14 sm:py-20">
          <h2 className="v2-h2">Калькулятор инвестора</h2>
          <p className="mt-2 text-ink-2">Один объект: клиент вносит 30%, инвестор финансирует остаток. Доход — арендная часть платежа, тело возвращается выкупом.</p>
          <div className="mt-8 v2-card p-5 sm:p-7 grid lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-end justify-between"><label className="text-sm text-ink-2">Сумма инвестиции</label><div className="text-2xl font-extrabold tabular-nums">{fmt(amount)} ₸</div></div>
              <input type="range" min={20_000_000} max={500_000_000} step={5_000_000} value={amount} onChange={e => setAmount(+e.target.value)} className="v2-range w-full mt-3" style={{ background: `linear-gradient(to right, var(--brand) ${(amount - 2e7) / 4.8e8 * 100}%, #E5E7EB 0)` }} />
              <div className="mt-5 text-sm text-ink-2">Срок выкупа клиентом</div>
              <div className="mt-2 grid grid-cols-5 p-1 rounded-xl bg-slate-100">{[5, 10, 15, 20, 30].map(v => <button key={v} type="button" onClick={() => setYears(v)} className={`h-10 rounded-lg text-sm font-bold ${years === v ? 'bg-white shadow-sm text-ink' : 'text-ink-2'}`}>{v}</button>)}</div>
            </div>
            <div className="rounded-2xl bg-brand-soft border border-brand-light p-5">
              <div className="text-sm text-ink-2">Доходность первого года</div>
              <div className="text-4xl font-extrabold text-brand">{calc.firstYearYield.toFixed(1)}%</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl bg-white p-3"><div className="text-[11px] text-ink-3">Средняя за срок</div><div className="font-bold">{calc.avgYearlyYield.toFixed(1)}% годовых</div></div>
                <div className="rounded-xl bg-white p-3"><div className="text-[11px] text-ink-3">Арендный доход за срок</div><div className="font-bold">{fmt(calc.rent)} ₸</div></div>
                <div className="rounded-xl bg-white p-3"><div className="text-[11px] text-ink-3">Объект стоимостью</div><div className="font-bold">{fmt(calc.price)} ₸</div></div>
                <div className="rounded-xl bg-white p-3"><div className="text-[11px] text-ink-3">Возврат тела</div><div className="font-bold">{fmt(calc.q.principal)} ₸/мес</div></div>
              </div>
              <div className="mt-3 text-xs text-ink-2">Расчёт по клиентской схеме 0,8% → 0,4% → 0,168% в месяц без учёта комиссий, налогов и затрат на сделку.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-container py-14 sm:py-20">
        <h2 className="v2-h2">Почему MD</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[[<ShieldCheck key="1" />, 'Обеспечение активом', 'Каждый рубль капитала обеспечен конкретной квартирой на балансе MD.'], [<TrendingUp key="2" />, 'Предсказуемый поток', 'Платежи по графику на весь срок, ступени известны заранее.'], [<Building2 key="3" />, 'Проверенные объекты', 'Юридическая проверка, оценка, страхование.'], [<Handshake key="4" />, 'Гибкие форматы', 'Долевое участие, финансирование объектов, локальное партнёрство.'], [<BarChart3 key="5" />, 'Отчётность', 'Прозрачные финансовые потоки, отчёты по портфелю.'], [<Globe key="6" />, 'Масштаб', 'Казахстан → Центральная Азия, стандартизированная сделка.']].map(([icon, t, d], i) => (
            <div key={i} className="v2-card p-5"><span className="w-11 h-11 rounded-xl bg-brand-light text-brand flex items-center justify-center">{icon}</span><div className="mt-4 font-bold text-ink">{t as string}</div><div className="mt-1.5 text-sm text-ink-2 leading-relaxed">{d as string}</div></div>
          ))}
        </div>
      </section>

      <section id="invest" className="bg-slate-50 border-t border-line scroll-mt-20">
        <div className="v2-container py-14 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <div><h2 className="v2-h2">Обсудить участие</h2><p className="mt-3 text-ink-2">Стратегическим инвесторам и локальным партнёрам: агентствам, риэлторам, девелоперам. Условия участия согласовываются индивидуально.</p></div>
          <LeadForm title="Заявка инвестора" subtitle="Ответим в течение рабочего дня и пришлём материалы." context="investors" kind="investor" role="investor" />
        </div>
      </section>
    </>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, MapPin, Wallet, PiggyBank, CalendarDays, Phone, Sparkles } from 'lucide-react';
import Button from '@/components/v2/Button';
import ListingsPreview from '@/components/v2/ListingsPreview';
import { fmt, maxPrice, quote } from '@/components/v2/calc';
import { saveCalcParams } from '@/components/PaymentSchedule';
import { addRequest } from '@/components/v2/requests';

const CITIES = ['Астана', 'Алматы', 'Шымкент', 'Караганда', 'Актобе', 'Другой город'];
const BUDGETS = [150_000, 200_000, 250_000, 300_000, 400_000, 500_000];
const DOWNS = [5_000_000, 8_000_000, 10_000_000, 15_000_000, 20_000_000, 30_000_000];
const TERMS = [10, 15, 20, 30];
const STEPS = ['Город', 'Платёж', 'Взнос', 'Срок', 'Контакт'];

type S = { city: string; budget: number; down: number; years: number; name: string; phone: string };
const KEY = 'md_start';

export default function StartPage() {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<S>({ city: '', budget: 250_000, down: 10_000_000, years: 30, name: '', phone: '' });
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | 'ok' | 'fail'>(null);

  useEffect(() => { try { const r = localStorage.getItem(KEY); if (r) { const p = JSON.parse(r); setS(x => ({ ...x, ...p.s })); if (p.done) setDone(true); } } catch {} }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify({ s, done })); } catch {} }, [s, done]);

  const limit = useMemo(() => maxPrice(s.budget, s.down, s.years * 12), [s.budget, s.down, s.years]);
  const q = useMemo(() => quote(limit, Math.max(30, Math.round(s.down / Math.max(1, limit) * 100)), s.years * 12), [limit, s.down, s.years]);
  const downPct = limit > 0 ? Math.round(s.down / limit * 100) : 0;

  const canNext = [!!s.city, s.budget > 0, s.down > 0, s.years > 0, s.phone.replace(/\D/g, '').length >= 10][step];

  const finish = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/questions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: s.name, contact: s.phone, role: 'client', message: `Предодобрение: ${s.city}, платёж до ${fmt(s.budget)} ₸/мес, взнос ${fmt(s.down)} ₸, срок ${s.years} лет → лимит ${fmt(limit)} ₸` }),
      });
      setSent(res.ok ? 'ok' : 'fail');
      addRequest({ kind: 'Предварительное одобрение', name: s.name, contact: s.phone, note: `${s.city} · лимит ${fmt(limit)} ₸ · ${s.years} лет`, sent: res.ok });
    } catch { setSent('fail'); addRequest({ kind: 'Предварительное одобрение', name: s.name, contact: s.phone, note: `${s.city} · лимит ${fmt(limit)} ₸`, sent: false }); }
    saveCalcParams({ propertyValue: limit, initialPaymentPercent: downPct >= 50 ? 50 : 30, duration: s.years * 12 });
    setSending(false); setDone(true);
  };

  if (done) return (
    <div className="v2-container py-8 sm:py-14 max-w-3xl">
      <div className="v2-card p-6 sm:p-8 shadow-[0_30px_80px_-40px_rgba(11,122,75,0.45)]">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-light text-brand px-3 py-1.5 text-xs font-semibold"><Sparkles size={14} /> Предварительное одобрение</div>
        <div className="mt-4 text-ink-2">{s.name ? `${s.name}, вам` : 'Вам'} доступны квартиры в {s.city} до</div>
        <div className="mt-1 text-4xl sm:text-5xl font-extrabold text-ink tabular-nums">{fmt(limit)} ₸</div>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[['Платёж в месяц', `${fmt(q.first)} ₸`], ['Первый взнос', `${fmt(s.down)} ₸ · ${downPct}%`], ['Срок', `${s.years} лет`], ['Через ' + Math.round(s.years / 3) + ' лет платёж', `${fmt(q.principal + (q.tiers[1]?.rent ?? 0))} ₸`]].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-slate-50 p-3"><div className="text-[11px] text-ink-3">{k}</div><div className="font-bold text-ink text-sm sm:text-base">{v}</div></div>
          ))}
        </div>
        <div className="mt-4 text-sm text-ink-2 flex items-start gap-2"><Check size={16} className="text-brand shrink-0 mt-0.5" />{sent === 'ok' ? 'Заявка отправлена, менеджер свяжется с вами.' : 'Расчёт сохранён в вашем профиле. Менеджер свяжется с вами по указанному номеру.'}</div>
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <Button href="/arenda-s-vykupom#calculator" variant="secondary">Полный график платежей</Button>
          <Button href="#fit" className="sm:flex-1">Смотреть квартиры до {fmt(limit / 1_000_000)} млн <ArrowRight size={16} /></Button>
        </div>
        <button type="button" onClick={() => { setDone(false); setStep(0); setSent(null); }} className="mt-4 text-sm text-ink-3 hover:text-ink">Пересчитать</button>
      </div>
      <div id="fit" className="mt-10 scroll-mt-24">
        <h2 className="v2-h2">Квартиры под ваш лимит</h2>
        <p className="mt-2 text-ink-2">До {fmt(limit)} ₸ в {s.city}.</p>
        <div className="mt-6"><ListingsPreview limit={6} maxPrice={limit} /></div>
      </div>
    </div>
  );

  return (
    <div className="v2-container py-6 sm:py-12 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-ink-2 hover:text-ink"><ArrowLeft size={16} /> На главную</Link>
        <div className="text-sm text-ink-3">Шаг {step + 1} из {STEPS.length}</div>
      </div>
      <div className="mt-4 flex gap-1.5">
        {STEPS.map((_, i) => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-brand' : 'bg-slate-200'}`} />)}
      </div>

      <div className="v2-card mt-6 p-6 sm:p-8">
        {step === 0 && (
          <>
            <StepHead icon={<MapPin />} title="В каком городе ищете квартиру?" sub="Мы работаем по всему Казахстану, начиная с крупных городов." />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CITIES.map(c => <Choice key={c} active={s.city === c} onClick={() => setS({ ...s, city: c })}>{c}</Choice>)}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <StepHead icon={<Wallet />} title="Сколько вы готовы платить в месяц?" sub="Аренда плюс выкуп. Сумма со временем будет только снижаться." />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BUDGETS.map(b => <Choice key={b} active={s.budget === b} onClick={() => setS({ ...s, budget: b })}>{fmt(b)} ₸</Choice>)}
            </div>
            <CustomNumber label="Другая сумма" value={s.budget} onChange={v => setS({ ...s, budget: v })} />
          </>
        )}
        {step === 2 && (
          <>
            <StepHead icon={<PiggyBank />} title="Сколько есть на первый взнос?" sub="Минимум 30% от стоимости квартиры. Чем больше взнос, тем выше лимит." />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DOWNS.map(d => <Choice key={d} active={s.down === d} onClick={() => setS({ ...s, down: d })}>{fmt(d / 1_000_000)} млн ₸</Choice>)}
            </div>
            <CustomNumber label="Другая сумма" value={s.down} onChange={v => setS({ ...s, down: v })} />
          </>
        )}
        {step === 3 && (
          <>
            <StepHead icon={<CalendarDays />} title="На какой срок?" sub="Чем дольше срок, тем ниже платёж. Досрочный выкуп возможен в любой момент." />
            <div className="mt-6 grid grid-cols-4 gap-2">
              {TERMS.map(t => <Choice key={t} active={s.years === t} onClick={() => setS({ ...s, years: t })}>{t} лет</Choice>)}
            </div>
            <div className="mt-6 rounded-xl bg-brand-soft border border-brand-light p-4">
              <div className="text-sm text-ink-2">Предварительно вам доступны квартиры до</div>
              <div className="text-3xl font-extrabold text-brand tabular-nums v2-pop" key={limit}>{fmt(limit)} ₸</div>
              <div className="text-sm text-ink-2 mt-1">платёж от {fmt(q.first)} ₸/мес</div>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <StepHead icon={<Phone />} title="Куда прислать расчёт?" sub="Менеджер MD свяжется, чтобы подобрать квартиру под ваш лимит." />
            <div className="mt-6 grid gap-3">
              <input className="v2-input" placeholder="Ваше имя" value={s.name} onChange={e => setS({ ...s, name: e.target.value })} />
              <input className="v2-input" placeholder="+7 ___ ___ __ __" inputMode="tel" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} />
            </div>
            <div className="mt-3 text-xs text-ink-3">Нажимая «Получить одобрение», вы соглашаетесь на обработку персональных данных.</div>
          </>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => setStep(x => Math.max(0, x - 1))} disabled={step === 0}><ArrowLeft size={16} /> Назад</Button>
          {step < STEPS.length - 1
            ? <Button onClick={() => setStep(x => x + 1)} disabled={!canNext}>Далее <ArrowRight size={16} /></Button>
            : <Button onClick={finish} disabled={!canNext || sending}>{sending ? 'Считаем…' : 'Получить одобрение'} <Check size={16} /></Button>}
        </div>
      </div>
    </div>
  );
}

function StepHead({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div>
      <span className="w-11 h-11 rounded-xl bg-brand-light text-brand flex items-center justify-center">{icon}</span>
      <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
      <p className="mt-2 text-ink-2">{sub}</p>
    </div>
  );
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className={`h-12 rounded-xl border text-sm font-semibold transition ${active ? 'border-brand bg-brand-soft text-brand ring-4 ring-brand/10' : 'border-line text-ink hover:border-ink-3'}`}>
      {children}
    </button>
  );
}

function CustomNumber({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block mt-4 text-sm text-ink-2">
      {label}
      <input className="v2-input mt-1.5" inputMode="numeric" value={value.toLocaleString('ru-RU')} onChange={e => onChange(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)} />
    </label>
  );
}

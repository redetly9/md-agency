'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, MapPin, Wallet, PiggyBank, CalendarDays, Sparkles } from 'lucide-react';
import Button from '@/components/v2/Button';
import ListingsPreview from '@/components/v2/ListingsPreview';
import { fmt, maxPrice, quote } from '@/components/v2/calc';
import { saveCalcParams } from '@/components/PaymentSchedule';
import { addRequest } from '@/components/v2/requests';
import { useT } from '@/components/v2/i18n';

const CITIES = ['Астана', 'Алматы', 'Шымкент', 'Караганда', 'Актобе', 'Другой город'];
const BUDGETS = [150_000, 200_000, 250_000, 300_000, 400_000, 500_000];
const DOWNS = [5_000_000, 8_000_000, 10_000_000, 15_000_000, 20_000_000, 30_000_000];
const TERMS = [10, 15, 20, 30];
const STEPS = ['Город', 'Платёж', 'Взнос', 'Срок'];

type S = { city: string; budget: number; down: number; years: number; name: string; phone: string };
const KEY = 'md_start';

export default function StartPage() {
  const { t } = useT();
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

  const canNext = [!!s.city, s.budget > 0, s.down > 0, s.years > 0][step];
  const phoneOk = s.phone.replace(/\D/g, '').length >= 10;

  const finish = async () => {
    if (!phoneOk) return;
    setSending(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'preapproval', name: s.name, contact: s.phone, phone: s.phone, city: s.city, budget: s.budget, down_payment: s.down, term_months: s.years * 12, limit_price: limit, source: 'start' }),
      });
      setSent(res.ok ? 'ok' : 'fail');
      addRequest({ kind: 'Предварительное одобрение', name: s.name, contact: s.phone, note: `${s.city} · лимит ${fmt(limit)} ₸ · ${s.years} лет`, sent: res.ok });
    } catch { setSent('fail'); addRequest({ kind: 'Предварительное одобрение', name: s.name, contact: s.phone, note: `${s.city} · лимит ${fmt(limit)} ₸`, sent: false }); }
    saveCalcParams({ propertyValue: limit, initialPaymentPercent: downPct >= 50 ? 50 : 30, duration: s.years * 12 });
    setSending(false);
  };

  if (done) return (
    <div className="v2-container py-8 sm:py-14 max-w-3xl">
      <div className="v2-card p-6 sm:p-8 shadow-[0_30px_80px_-40px_rgba(11,122,75,0.45)]">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-light text-brand px-3 py-1.5 text-xs font-semibold"><Sparkles size={14} /> {t('st.approved')}</div>
        <div className="mt-4 text-ink-2">{s.name ? `${s.name}, ` : ''}{t('st.youUpTo')} {s.city}</div>
        <div className="mt-1 text-3xl xs:text-4xl sm:text-5xl font-extrabold text-ink tabular-nums">{fmt(limit)} ₸</div>
        <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3">
          {[[t('st.monthly'), `${fmt(q.first)} ₸`], [t('st.downL'), `${fmt(s.down)} ₸ · ${downPct}%`], [t('st.termL'), `${s.years} ${t('st.years')}`], [`${t('st.after')} ${Math.round(s.years / 3)} ${t('st.yearsPay')}`, `${fmt(q.principal + (q.tiers[1]?.rent ?? 0))} ₸`]].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-slate-50 p-3"><div className="text-[11px] text-ink-3">{k}</div><div className="font-bold text-ink text-sm sm:text-base">{v}</div></div>
          ))}
        </div>
        {sent === 'ok' ? (
          <div className="mt-4 text-sm text-ink-2 flex items-start gap-2"><Check size={16} className="text-brand shrink-0 mt-0.5" />{t('st.sent')}</div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (phoneOk) finish(); }} className="mt-5 rounded-2xl bg-slate-50 border border-line p-4">
            <div className="font-bold text-ink">{t('st.get')}</div>
            <div className="text-sm text-ink-2 mt-0.5">{t('st.getP')}</div>
            <div className="mt-3 grid sm:grid-cols-[1fr_1fr_auto] gap-2">
              <input className="v2-input" placeholder={t('st.name')} value={s.name} onChange={e => setS({ ...s, name: e.target.value })} />
              <input className="v2-input" placeholder="+7 ___ ___ __ __" inputMode="tel" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} />
              <Button type="submit" disabled={!phoneOk || sending}>{sending ? t('st.sending') : t('st.send')}</Button>
            </div>
            {sent === 'fail' && <div className="mt-2 text-xs text-red-600">{t('st.fail')}</div>}
          </form>
        )}
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <Button href="/arenda-s-vykupom#calculator" variant="secondary">{t('st.schedule')}</Button>
          <Button href="#fit" className="sm:flex-1">{t('st.flats')} {fmt(limit / 1_000_000)} {t('mc.mln')} <ArrowRight size={16} /></Button>
        </div>
        <button type="button" onClick={() => { setDone(false); setStep(0); setSent(null); }} className="mt-4 text-sm text-ink-3 hover:text-ink">{t('st.recalc')}</button>
      </div>
      <div id="fit" className="mt-10 scroll-mt-24">
        <h2 className="v2-h2">{t('st.fit')}</h2>
        <p className="mt-2 text-ink-2">{t('st.upTo')} {fmt(limit)} ₸ · {s.city}.</p>
        <div className="mt-6"><ListingsPreview limit={6} maxPrice={limit} /></div>
      </div>
    </div>
  );

  return (
    <div className="v2-container py-6 sm:py-12 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-ink-2 hover:text-ink"><ArrowLeft size={16} /> {t('st.home')}</Link>
        <div className="text-sm text-ink-3">{t('st.step')} {step + 1} {t('st.of')} {STEPS.length}</div>
      </div>
      <div className="mt-4 flex gap-1.5">
        {STEPS.map((_, i) => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-brand' : 'bg-slate-200'}`} />)}
      </div>

      <div className="v2-card mt-6 p-6 sm:p-8">
        {step === 0 && (
          <>
            <StepHead icon={<MapPin />} title={t('st.city.h')} sub={t('st.city.p')} />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CITIES.map(c => <Choice key={c} active={s.city === c} onClick={() => setS({ ...s, city: c })}>{c}</Choice>)}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <StepHead icon={<Wallet />} title={t('st.budget.h')} sub={t('st.budget.p')} />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BUDGETS.map(b => <Choice key={b} active={s.budget === b} onClick={() => setS({ ...s, budget: b })}>{fmt(b)} ₸</Choice>)}
            </div>
            <CustomNumber label={t('st.other')} value={s.budget} onChange={v => setS({ ...s, budget: v })} />
          </>
        )}
        {step === 2 && (
          <>
            <StepHead icon={<PiggyBank />} title={t('st.down.h')} sub={t('st.down.p')} />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DOWNS.map(d => <Choice key={d} active={s.down === d} onClick={() => setS({ ...s, down: d })}>{fmt(d / 1_000_000)} млн ₸</Choice>)}
            </div>
            <CustomNumber label={t('st.other')} value={s.down} onChange={v => setS({ ...s, down: v })} />
          </>
        )}
        {step === 3 && (
          <>
            <StepHead icon={<CalendarDays />} title={t('st.term.h')} sub={t('st.term.p')} />
            <div className="mt-6 grid grid-cols-4 gap-2">
              {TERMS.map(y => <Choice key={y} active={s.years === y} onClick={() => setS({ ...s, years: y })}>{y} {t('st.years')}</Choice>)}
            </div>
            <div className="mt-6 rounded-xl bg-brand-soft border border-brand-light p-4">
              <div className="text-sm text-ink-2">{t('st.prelim')}</div>
              <div className="text-3xl font-extrabold text-brand tabular-nums v2-pop" key={limit}>{fmt(limit)} ₸</div>
              <div className="text-sm text-ink-2 mt-1">{t('st.from')} {fmt(q.first)} ₸</div>
            </div>
          </>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => setStep(x => Math.max(0, x - 1))} disabled={step === 0}><ArrowLeft size={16} /> {t('st.back')}</Button>
          {step < STEPS.length - 1
            ? <Button onClick={() => setStep(x => x + 1)} disabled={!canNext}>{t('st.next')} <ArrowRight size={16} /></Button>
            : <Button onClick={() => { setSent(null); setDone(true); }} disabled={!canNext}>{t('st.result')} <Check size={16} /></Button>}
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

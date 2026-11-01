'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Settings, User, ChevronRight, Sparkles, Heart, FileText, MessageCircle, SlidersHorizontal, ArrowRight } from 'lucide-react';
import PaymentSchedule, { CalcParams, DEFAULT_CALC, loadCalcParams, saveCalcParams } from '@/components/PaymentSchedule';
import Button from '@/components/v2/Button';
import { fmt, quote } from '@/components/v2/calc';

const DURATIONS = [60, 120, 180, 240, 360];
type Start = { s?: { city?: string; budget?: number; down?: number; years?: number; name?: string; phone?: string }; done?: boolean };

export default function ProfilePage() {
  const [calc, setCalc] = useState<CalcParams>(DEFAULT_CALC);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState<Start | null>(null);
  useEffect(() => {
    setCalc(loadCalcParams()); setReady(true);
    try { const r = localStorage.getItem('md_start'); if (r) setStart(JSON.parse(r)); } catch {}
  }, []);
  useEffect(() => { if (ready) saveCalcParams(calc); }, [calc, ready]);

  const q = quote(calc.propertyValue, calc.initialPaymentPercent, calc.duration);
  const name = start?.s?.name?.trim();

  return (
    <div className="v2-container py-6 sm:py-10 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">Личный кабинет</h1>
        <Link href="/profiles/settings" className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-ink-2" aria-label="Настройки"><Settings size={20} /></Link>
      </div>

      {/* user */}
      <div className="v2-card mt-5 p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-light text-brand flex items-center justify-center"><User size={26} /></div>
        <div className="min-w-0">
          <div className="font-bold text-ink truncate">{name || 'Гость'}</div>
          <div className="text-sm text-ink-2 truncate">{start?.s?.phone || 'Войдите, чтобы сохранять заявки и избранное'}</div>
        </div>
        {!start?.done && <Button href="/login" variant="secondary" size="sm" className="ml-auto">Войти</Button>}
      </div>

      {/* approval */}
      {start?.done && start.s ? (
        <div className="v2-card mt-4 p-5 border-brand-light bg-brand-soft">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand"><Sparkles size={14} /> Предварительное одобрение</div>
          <div className="mt-2 text-sm text-ink-2">Доступны квартиры в {start.s.city} до</div>
          <div className="text-3xl font-extrabold text-ink tabular-nums">{fmt(calc.propertyValue)} ₸</div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-line">платёж от {fmt(q.first)} ₸/мес</span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-line">взнос {fmt(start.s.down ?? q.down)} ₸</span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-line">{Math.round(calc.duration / 12)} лет</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button href="/start#fit" size="sm">Квартиры под лимит <ArrowRight size={14} /></Button>
            <Button href="/start" variant="ghost" size="sm">Пересчитать</Button>
          </div>
        </div>
      ) : (
        <div className="v2-card mt-4 p-5 flex items-center justify-between gap-4">
          <div>
            <div className="font-bold text-ink">Узнайте свой лимит</div>
            <div className="text-sm text-ink-2 mt-0.5">Пять вопросов, результат сразу на экране.</div>
          </div>
          <Button href="/start" size="sm">Начать</Button>
        </div>
      )}

      {/* quick links */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          [<FileText key="1" size={20} />, 'Заявки', '/messages'],
          [<Heart key="2" size={20} />, 'Избранное', '/favoritess'],
          [<MessageCircle key="3" size={20} />, 'Вопрос', '/messages'],
        ].map(([icon, label, href]) => (
          <Link key={label as string} href={href as string} className="v2-card p-4 flex flex-col items-center gap-2 text-sm font-semibold text-ink hover:border-brand-ring transition">
            <span className="w-10 h-10 rounded-xl bg-slate-50 text-brand flex items-center justify-center">{icon}</span>{label as string}
          </Link>
        ))}
      </div>

      {/* schedule */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-ink">Мой график платежей</h2>
          <Link href="/arenda-s-vykupom#calculator" className="inline-flex items-center gap-1 text-sm text-brand font-semibold"><SlidersHorizontal size={14} /> Калькулятор</Link>
        </div>
        <div className="v2-card p-4 sm:p-5 mb-3">
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <label className="text-xs text-ink-2">Стоимость жилья, ₸
              <input type="text" inputMode="numeric" value={calc.propertyValue.toLocaleString('ru-RU')}
                onChange={e => setCalc(c => ({ ...c, propertyValue: Math.max(0, parseInt(e.target.value.replace(/\D/g, ''), 10) || 0) }))}
                className="v2-input mt-1 h-11 font-semibold" />
            </label>
            <div className="text-xs text-ink-2">Взнос
              <div className="mt-1 grid grid-cols-2 p-1 rounded-xl bg-slate-100 h-11">
                {[30, 50].map(v => (
                  <button key={v} type="button" onClick={() => setCalc(c => ({ ...c, initialPaymentPercent: v }))}
                    className={`px-3 rounded-lg text-sm font-semibold ${calc.initialPaymentPercent === v ? 'bg-white text-ink shadow-sm' : 'text-ink-2'}`}>{v}%</button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-5 p-1 rounded-xl bg-slate-100">
            {DURATIONS.map(d => (
              <button key={d} type="button" onClick={() => setCalc(c => ({ ...c, duration: d }))}
                className={`h-9 rounded-lg text-sm font-semibold ${calc.duration === d ? 'bg-white text-ink shadow-sm' : 'text-ink-2'}`}>{d / 12} лет</button>
            ))}
          </div>
        </div>
        <PaymentSchedule params={calc} compact title="Платежи по рассрочке" />
      </div>

      <Link href="/profiles/settings" className="v2-card mt-4 p-4 flex items-center justify-between text-ink font-semibold hover:border-brand-ring transition">
        Настройки профиля <ChevronRight size={18} className="text-ink-3" />
      </Link>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Mail, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import Button from './Button';
import { authHeaders } from './useUser';

export default function AuthForm({ onDone }: { onDone?: () => void }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code' | 'done'>('email');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr(null);
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim(), options: { shouldCreateUser: true } });
    setBusy(false);
    if (error) { setErr(error.message === 'Signups not allowed for otp' ? 'Регистрация по email отключена в настройках.' : 'Не удалось отправить код. Проверьте email.'); return; }
    setStep('code');
  };
  const verify = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr(null);
    const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token: code.trim(), type: 'email' });
    if (error) { setBusy(false); setErr('Неверный или просроченный код.'); return; }
    try { await fetch('/api/me', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(await authHeaders()) }, body: '{}' }); } catch {}
    setBusy(false); setStep('done'); onDone?.();
  };

  if (step === 'done') return (
    <div className="v2-card p-6 flex items-start gap-3 border-brand-light bg-brand-soft">
      <CheckCircle2 className="text-brand shrink-0" size={24} />
      <div><div className="font-bold text-ink">Вы вошли</div><div className="text-sm text-ink-2 mt-0.5">Заявки и расчёты с этого устройства привязаны к вашему аккаунту.</div></div>
    </div>
  );

  return (
    <form onSubmit={step === 'email' ? sendCode : verify} className="v2-card p-6 sm:p-8">
      <span className="w-11 h-11 rounded-xl bg-brand-light text-brand flex items-center justify-center">{step === 'email' ? <Mail /> : <KeyRound />}</span>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">{step === 'email' ? 'Вход по email' : 'Введите код из письма'}</h1>
      <p className="mt-1 text-sm text-ink-2">{step === 'email' ? 'Без пароля: пришлём одноразовый код на почту.' : `Код отправлен на ${email}. Действует 10 минут.`}</p>
      {step === 'email'
        ? <input className="v2-input mt-5" type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
        : <input className="v2-input mt-5 tracking-[0.3em] text-center text-lg font-bold" inputMode="numeric" required placeholder="••••••" value={code} onChange={e => setCode(e.target.value)} autoComplete="one-time-code" />}
      {err && <div className="mt-3 text-sm text-red-600">{err}</div>}
      <Button type="submit" size="lg" full className="mt-4" disabled={busy}>{busy ? 'Секунду…' : step === 'email' ? 'Получить код' : 'Войти'} <ArrowRight size={16} /></Button>
      {step === 'code' && <button type="button" onClick={() => setStep('email')} className="mt-3 text-sm text-ink-3 hover:text-ink">Другой email</button>}
    </form>
  );
}

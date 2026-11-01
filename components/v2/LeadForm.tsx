'use client';

import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import Button from './Button';
import { addRequest } from './requests';

export default function LeadForm({ title = 'Оставить заявку', subtitle = 'Менеджер MD свяжется с вами в рабочее время.', context = '', role = 'client' }: { title?: string; subtitle?: string; context?: string; role?: 'client' | 'investor' | 'partner' }) {
  const [f, setF] = useState({ name: '', contact: '', message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.contact.trim()) return;
    setState('sending');
    try {
      const res = await fetch('/api/questions', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name, contact: f.contact, role, message: `${context ? context + '\n' : ''}${f.message || 'Заявка с сайта'}` }) });
      addRequest({ kind: title, name: f.name, contact: f.contact, note: f.message, sent: res.ok });
      setState(res.ok ? 'ok' : 'fail');
    } catch { addRequest({ kind: title, name: f.name, contact: f.contact, note: f.message, sent: false }); setState('fail'); }
  };

  if (state === 'ok') return (
    <div className="v2-card p-6 flex items-start gap-3 border-brand-light bg-brand-soft">
      <CheckCircle2 className="text-brand shrink-0" size={24} />
      <div><div className="font-bold text-ink">Заявка отправлена</div><div className="text-sm text-ink-2 mt-0.5">Мы свяжемся с вами по указанному контакту.</div></div>
    </div>
  );

  return (
    <form onSubmit={submit} className="v2-card p-6 sm:p-8">
      <h3 className="text-xl font-extrabold tracking-tight text-ink">{title}</h3>
      <p className="text-sm text-ink-2 mt-1">{subtitle}</p>
      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        <input className="v2-input" placeholder="Ваше имя" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
        <input className="v2-input" placeholder="Телефон или email" required inputMode="tel" value={f.contact} onChange={e => setF({ ...f, contact: e.target.value })} />
      </div>
      <textarea className="v2-input mt-3 h-auto py-3 min-h-[96px]" placeholder="Комментарий (необязательно)" value={f.message} onChange={e => setF({ ...f, message: e.target.value })} />
      {state === 'fail' && <div className="mt-3 text-sm text-red-600">Не удалось отправить. Попробуйте ещё раз или напишите нам в разделе «Сообщения».</div>}
      <Button type="submit" size="lg" full className="mt-4" disabled={state === 'sending'}><Send size={16} /> {state === 'sending' ? 'Отправка…' : 'Отправить'}</Button>
      <div className="mt-3 text-[11px] text-ink-3">Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.</div>
    </form>
  );
}

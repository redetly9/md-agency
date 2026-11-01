import { FileSignature, ShieldCheck, KeyRound, Scale, Undo2, Building2 } from 'lucide-react';
import LeadForm from '@/components/v2/LeadForm';
import Faq from '@/components/v2/Faq';

export const metadata = { title: 'Юридическая схема аренды с выкупом — MD', description: 'Кто собственник на каждом этапе, что фиксируется в договоре, что происходит при досрочном выкупе или выходе из сделки.' };

const STAGES = [
  [<Building2 key="1" />, 'Покупка объекта', 'MD приобретает квартиру у собственника. Право собственности регистрируется на MD, объект проверяется на обременения и долги.'],
  [<FileSignature key="2" />, 'Договор аренды с выкупом', 'Подписывается в офисе MD. В договоре фиксируются: цена выкупа, размер взноса, срок, график платежей с тремя ступенями аренды, порядок досрочного выкупа и выхода.'],
  [<ShieldCheck key="3" />, 'Регистрация обременения', 'При необходимости обременение в пользу клиента регистрируется в госреестре. Квартира не может быть продана или заложена третьим лицам.'],
  [<Scale key="4" />, 'Период выплат', 'Клиент проживает в квартире и платит по графику. Часть «выкуп» накапливается в счёт стоимости, часть «аренда» является платой за пользование.'],
  [<Undo2 key="5" />, 'Досрочный выкуп или выход', 'Досрочно выкупить можно в любой момент по остатку. При выходе из договора накопленные платежи в счёт выкупа возвращаются по условиям договора.'],
  [<KeyRound key="6" />, 'Переход права собственности', 'После полной оплаты право собственности переоформляется на клиента. Все расходы по переоформлению прописаны в договоре заранее.'],
];

const FAQ = [
  { q: 'Кто собственник квартиры в период выплат?', a: 'MD. Клиент владеет правом пользования и правом выкупа по договору, при необходимости защищённым обременением в госреестре.' },
  { q: 'Что будет, если MD перестанет существовать?', a: 'Договор и зарегистрированное обременение сохраняют силу при смене собственника. Это одна из причин, почему мы рекомендуем регистрацию обременения.' },
  { q: 'Можно ли прописаться в квартире?', a: 'Да, регистрация по месту жительства возможна на основании договора аренды.' },
  { q: 'Что если я пропущу платёж?', a: 'Порядок и сроки урегулирования прописаны в договоре. Мы связываемся с клиентом и ищем решение, а не расторгаем договор по первой просрочке.' },
  { q: 'Можно ли получить образец договора заранее?', a: 'Да. Оставьте заявку ниже, менеджер отправит образец договора и ответит на вопросы до подписания.' },
];

export default function LegalPage() {
  return (
    <>
      <section className="v2-container pt-10 pb-10 sm:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">Юридическая схема</div>
        <h1 className="v2-h1 mt-5 max-w-3xl">Как защищены ваши деньги и ваша квартира</h1>
        <p className="mt-5 text-lg text-ink-2 max-w-2xl leading-relaxed">Шесть этапов сделки: кто собственник, что фиксируется в договоре и что происходит при досрочном выкупе или выходе.</p>
        <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAGES.map(([icon, t, d], i) => (
            <li key={i} className="v2-card p-5"><div className="flex items-center justify-between"><span className="w-11 h-11 rounded-xl bg-brand-light text-brand flex items-center justify-center">{icon}</span><span className="text-xs font-bold text-ink-3">0{i + 1}</span></div><div className="mt-4 font-bold text-ink">{t as string}</div><div className="mt-1.5 text-sm text-ink-2 leading-relaxed">{d as string}</div></li>
          ))}
        </ol>
      </section>
      <section className="bg-slate-50 border-y border-line">
        <div className="v2-container py-14 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div><h2 className="v2-h2 mb-6">Частые юридические вопросы</h2><Faq items={FAQ} /></div>
          <LeadForm title="Запросить образец договора" subtitle="Отправим образец и ответим на вопросы до подписания." context="legal" kind="question" />
        </div>
      </section>
    </>
  );
}

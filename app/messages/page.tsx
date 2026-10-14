'use client';

import { useState } from 'react';
import { HelpCircle, Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '').replace(/\D/g, '');

// FAQ вопросы и ответы
const faqData = [
  {
    id: 'faq-0',
    question: 'Как получить квартиру в «Аренду с выкупом»?',
    answer: `Чтобы получить квартиру в аренду с выкупом, нужно:

• Выбрать квартиру из доступных предложений MD.
• Зарегистрироваться и подать заявку.
• Внести первоначальный взнос согласно условиям программы.
• Заключить договор аренды с последующим выкупом.
• Заселиться в квартиру и ежемесячно оплачивать аренду и платежи в счёт выкупа.
• После выполнения условий договора стать полноправным собственником квартиры.

MD — возможность жить в собственной будущей квартире уже сегодня, оплачивая её стоимость постепенно.`
  },
  {
    id: 'faq-1',
    question: 'Как снять квартиру?',
    answer: 'Выберите понравившийся вариант на сайте, свяжитесь с владельцем через форму или по телефону, указанному в объявлении.'
  },
  {
    id: 'faq-2',
    question: 'Как арендовать квартиру без посредников?',
    answer: 'Используйте фильтр "Без посредников" и проверяйте объявления напрямую от собственников.'
  },
  {
    id: 'faq-3',
    question: 'Как посмотреть квартиру?',
    answer: 'Договоритесь с владельцем о встрече через контактные данные в объявлении.'
  },
  {
    id: 'faq-4',
    question: 'Что входит в стоимость аренды?',
    answer: 'Обычно это аренда и коммунальные услуги. Некоторые владельцы включают интернет и ТВ.'
  },
  {
    id: 'faq-5',
    question: 'Можно ли снять квартиру с животными?',
    answer: 'В фильтрах есть опция "Разрешено с животными". Также уточните этот момент у владельца.'
  },
  {
    id: 'faq-6',
    question: 'Как оставить заявку на аренду?',
    answer: 'Нажмите кнопку "Оставить заявку", заполните форму и ждите ответа от владельца.'
  },
  {
    id: 'faq-7',
    question: 'Как проверить документы на квартиру?',
    answer: 'Запросите у владельца свидетельство о праве собственности и договор аренды.'
  },
  {
    id: 'faq-8',
    question: 'Как найти квартиру в нужном районе?',
    answer: 'Используйте карту на сайте или укажите район в поисковом фильтре.'
  },
  {
    id: 'faq-9',
    question: 'Как забронировать квартиру?',
    answer: 'После договорённости с владельцем внесите предоплату и подпишите договор.'
  },
  {
    id: 'faq-10',
    question: 'Что делать, если владелец не выходит на связь?',
    answer: 'Попробуйте связаться повторно. Если ответа нет, обратитесь в поддержку.'
  }
];

export default function MessagesPage() {
  const [showFaq, setShowFaq] = useState(true);
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', contact: '', role: 'client', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const waText = encodeURIComponent(
    `Здравствуйте! ${form.role === 'investor' ? 'Я инвестор.' : form.role === 'partner' ? 'Я партнёр.' : ''} ${form.message}${form.name ? `\n${form.name}` : ''}${form.contact ? `, ${form.contact}` : ''}`.trim()
  );
  const waLink = WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${waText}` : null;

  const submitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contact.trim() || !form.message.trim()) { setSendError('Укажите контакт и текст вопроса'); return; }
    setSending(true); setSendError(null);
    try {
      const res = await fetch('/api/questions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error((await res.json()).error || 'Ошибка отправки');
      setSent(true);
    } catch (err: any) {
      setSendError(err?.message || 'Не удалось отправить. Напишите нам в WhatsApp.');
    } finally { setSending(false); }
  };

  const handleFaqSelect = (faqId: string) => {
    setSelectedFaq(faqId);
    setShowFaq(false);
  };

  const handleBackToFaq = () => {
    setSelectedFaq(null);
    setShowFaq(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0b1626]">
      {/* Header */}
      <header className="bg-[#122037] px-4 py-4 border-b border-white/10">
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Сообщения</h1>
          </div>
        </div>
      </header>

      {/* Ask a question */}
      <div className="px-4 py-6 border-b border-white/10">
        <div className="max-w-screen-md mx-auto">
          <div className="rounded-2xl border border-[#d4af5a]/40 bg-[#122037] p-5">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <MessageCircle size={20} className="mr-2 text-[#e6c87a]" />
              Задать вопрос
            </h2>
            <p className="text-sm text-white/60 mt-1">Для клиентов, инвесторов и партнёров. Ответим в рабочее время.</p>

            {sent ? (
              <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#d4af5a]/15 border border-[#d4af5a]/40 p-4">
                <CheckCircle2 className="text-[#e6c87a] shrink-0" size={22} />
                <div>
                  <div className="font-medium text-white">Вопрос отправлен</div>
                  <div className="text-sm text-white/70 mt-0.5">Мы свяжемся с вами по указанному контакту.</div>
                  {waLink && (
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-sm text-[#e6c87a] hover:underline">
                      <MessageCircle size={16} /> Продублировать в WhatsApp
                    </a>
                  )}
                  <button type="button" onClick={() => { setSent(false); setForm({ name: '', contact: '', role: 'client', message: '' }); }} className="block mt-3 text-xs text-white/50 hover:text-white">
                    Задать ещё один вопрос
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitQuestion} className="mt-4 space-y-3">
                <div className="flex gap-1">
                  {[['client', 'Клиент'], ['investor', 'Инвестор'], ['partner', 'Партнёр']].map(([v, l]) => (
                    <button key={v} type="button" onClick={() => setForm(f => ({ ...f, role: v }))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium ${form.role === v ? 'bg-[#d4af5a] text-[#0b1626]' : 'bg-white/5 text-white/80 border border-white/10'}`}>
                      {l}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ваше имя"
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af5a]" />
                  <input value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Телефон или email" required
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af5a]" />
                </div>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Ваш вопрос" rows={4} required
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#d4af5a] resize-y" />
                {sendError && <div className="text-sm text-red-300">{sendError}</div>}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button type="submit" disabled={sending}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e6c87a] to-[#b8892e] text-[#0b1626] font-semibold py-3 rounded-lg disabled:opacity-50">
                    <Send size={16} /> {sending ? 'Отправка…' : 'Отправить вопрос'}
                  </button>
                  {waLink && (
                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 border border-[#d4af5a]/60 text-[#e6c87a] font-medium py-3 rounded-lg hover:bg-white/5">
                      <MessageCircle size={16} /> Написать в WhatsApp
                    </a>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-[#122037] px-4 py-6 border-b border-white/10">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-lg font-semibold text-white mb-4">Свяжитесь с нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-[#e6c87a]" />
              <div>
                <p className="text-sm font-medium text-white">Email</p>
                <p className="text-sm text-white/75">support@example.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-[#e6c87a]" />
              <div>
                <p className="text-sm font-medium text-white">Телефон</p>
                <p className="text-sm text-white/75">+7 (999) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={20} className="text-[#e6c87a]" />
              <div>
                <p className="text-sm font-medium text-white">Адрес</p>
                <p className="text-sm text-white/75">Москва, ул. Примерная, 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="flex-1 bg-[#122037] px-4 py-6">
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <HelpCircle size={20} className="mr-2 text-[#e6c87a]" />
              Часто задаваемые вопросы
            </h2>
            {!showFaq && (
              <button
                onClick={handleBackToFaq}
                className="text-sm text-[#e6c87a] hover:text-[#015a6b] transition-colors"
              >
                ← Вернуться к вопросам
              </button>
            )}
          </div>
          
          {showFaq ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {faqData.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleFaqSelect(faq.id)}
                  className="text-left p-4 bg-[#0b1626] hover:bg-white/10 rounded-lg border border-white/10 transition-colors hover:border-[#d4af5a]"
                >
                  <h3 className="font-medium text-white text-sm mb-2 line-clamp-2">
                    {faq.question}
                  </h3>
                  <p className="text-xs text-white/55">
                    Нажмите для получения ответа
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-[#d4af5a]/15 border border-[#d4af5a]/40 rounded-lg p-4">
              <h3 className="font-medium text-[#e6c87a] mb-3">
                {faqData.find(faq => faq.id === selectedFaq)?.question}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line">
                {faqData.find(faq => faq.id === selectedFaq)?.answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

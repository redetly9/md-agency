'use client';

import { useState } from 'react';
import { Plus, Search, MessageCircle, Mail, Phone, MapPin, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// FAQ вопросы и ответы
const faqData = [
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showFaq, setShowFaq] = useState(true);
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);

  const handleFaqSelect = (faqId: string) => {
    setSelectedFaq(faqId);
    setShowFaq(false);
  };

  const handleBackToFaq = () => {
    setSelectedFaq(null);
    setShowFaq(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Сообщения</h1>
            <Link
              href="/messages/new"
              className="flex items-center px-4 py-2 bg-[#016a80] text-white rounded-lg hover:bg-[#015a6b] transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Новое сообщение
            </Link>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="bg-white px-4 pb-4 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по сообщениям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#F5F5F5] rounded-[38px] text-[#999999] text-sm font-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white px-4 py-6 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Свяжитесь с нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-[#016a80]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">support@example.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-[#016a80]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Телефон</p>
                <p className="text-sm text-gray-600">+7 (999) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={20} className="text-[#016a80]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Адрес</p>
                <p className="text-sm text-gray-600">Москва, ул. Примерная, 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="flex-1 bg-white px-4 py-6">
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <HelpCircle size={20} className="mr-2 text-[#016a80]" />
              Часто задаваемые вопросы
            </h2>
            {!showFaq && (
              <button
                onClick={handleBackToFaq}
                className="text-sm text-[#016a80] hover:text-[#015a6b] transition-colors"
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
                  className="text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors hover:border-[#016a80]"
                >
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                    {faq.question}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Нажмите для получения ответа
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-3">
                {faqData.find(faq => faq.id === selectedFaq)?.question}
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                {faqData.find(faq => faq.id === selectedFaq)?.answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

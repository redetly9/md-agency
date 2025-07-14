'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, X, Phone, Mail, MapPin, Clock, Users, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function ArendaSVykupomPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyValue: '',
    initialPayment: '',
    duration: '60',
    monthlyIncome: '',
    message: ''
  });

  const [calculator, setCalculator] = useState({
    propertyValue: 6000000,
    monthlyPayment: 100000,
    totalAmount: 6000000,
    duration: 60
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value.replace(/\s/g, ''));
    
    setCalculator(prev => {
      const newCalculator = { ...prev, [name]: numValue };
      
      // Расчет ежемесячного платежа
      newCalculator.monthlyPayment = Math.round(newCalculator.propertyValue * 0.017);
      newCalculator.totalAmount = newCalculator.monthlyPayment * newCalculator.duration;
      
      return newCalculator;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-screen-md mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft size={24} className="text-gray-700" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Аренда с выкупом</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat text-white px-4 py-12"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('/arenda_s_vykupov.png')`
        }}
      >
        <div className="max-w-screen-md mx-auto text-left px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            АРЕНДА С ВЫКУПОМ
          </h1>
          <p className="text-lg md:text-xl font-semibold mb-4">
            (НАКОПИТЬ И ВЫКУПИТЬ)
          </p>
          <p className="text-base md:text-lg mb-8 text-gray-100">
            Ваш путь к собственному жилью без ипотечного бремени и сложных банковских проверок
          </p>
          <div className="flex flex-col gap-4 max-w-md">
            <button className="bg-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Получить консультацию
            </button>
            <Link 
              href="/"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors text-center"
            >
              Смотреть каталог
            </Link>
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="px-4 py-12">
        <div className="max-w-screen-md mx-auto">
          <div className="space-y-6">
            {[
              "Не хватает средств на покупку жилья?",
              "Банк отказывает в ипотеке?",
              "Нет справок о доходах?",
              "Плохая кредитная история?",
              "Высокие процентные ставки?",
              "Сложная процедура оформления?"
            ].map((question, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <X size={14} className="text-white" />
                </div>
                <span className="text-gray-800 text-base">{question}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Application Section */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Быстрая заявка на аренду жилья которую можно купить
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Введите ваше имя"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Желаемая стоимость жилья
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="propertyValue"
                  value={formData.propertyValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Введите стоимость жилья"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₸</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Первоначальный взнос
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="initialPayment"
                  value={formData.initialPayment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Сумма первоначального взноса"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₸</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Срок программы
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="24">24 месяца</option>
                <option value="36">36 месяцев</option>
                <option value="48">48 месяцев</option>
                <option value="60">60 месяцев</option>
                <option value="72">72 месяца</option>
                <option value="84">84 месяца</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваш ежемесячный доход
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Ваш ежемесячный доход"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₸</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дополнительные пожелания
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Расскажите о ваших пожеланиях..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Отправить заявку
            </button>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-screen-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Результаты расчета
          </h2>
          
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="text-4xl font-bold text-red-600 mb-2">
              6 000 000 ₸
            </div>
            <div className="text-gray-600 mb-6">
              Стоимость жилья
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xl font-semibold text-gray-900">100 000 ₸</div>
                <div className="text-sm text-gray-600">Ежемесячный платеж</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xl font-semibold text-gray-900">60 мес</div>
                <div className="text-sm text-gray-600">Срок программы</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xl font-semibold text-gray-900">0%</div>
                <div className="text-sm text-gray-600">Процентная ставка</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Преимущества аренды с выкупом
          </h2>
          
          <div className="space-y-6">
            {[
              "Без банков и кредитных проверок",
              "Нулевая процентная ставка",
              "Быстрое оформление документов",
              "Въезд сразу после подписания договора",
              "Фиксированный ежемесячный платеж",
              "Право досрочного выкупа"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-800 text-base">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Fields Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Требования к участникам программы
          </h2>
          
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Общие требования</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Возраст от 21 до 65 лет</li>
                  <li>• Гражданство Республики Казахстан</li>
                  <li>• Постоянная регистрация в РК</li>
                  <li>• Подтверждение дохода</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Финансовые условия</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Первоначальный взнос от 20%</li>
                  <li>• Стабильный доход не менее 6 месяцев</li>
                  <li>• Отсутствие просроченной задолженности</li>
                  <li>• Положительная кредитная история</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Image Section */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-screen-md mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/images/placeholder.jpg" 
                alt="Интерьер квартиры" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Начните путь к собственному жилью уже сегодня
              </h3>
              <p className="text-gray-600 mb-6">
                Программа аренды с выкупом - это простой и доступный способ стать собственником недвижимости без банковских кредитов и сложных процедур.
              </p>
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Начать сейчас
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="max-w-screen-md mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">md.kz</h3>
              <p className="text-gray-400 text-sm">
                Ваш надежный партнер в сфере недвижимости. Помогаем найти идеальное жилье и оформить выгодные условия покупки.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/rent-to-own" className="hover:text-white">Аренда</Link></li>
                <li><Link href="/arenda-s-vykupom" className="hover:text-white">Аренда с выкупом</Link></li>
                <li><Link href="/refinance" className="hover:text-white">Рефинансирование</Link></li>
                <li><Link href="/mortgage" className="hover:text-white">Ипотека</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+7 (727) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>info@md.kz</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>г. Алматы, ул. Толе би, 101</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Twitter size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 md.kz. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
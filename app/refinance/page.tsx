'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, X, Percent, TrendingDown, Shield, Clock, CheckCircle, Facebook, Instagram, Twitter, CreditCard, Banknote } from 'lucide-react';
import { useMoveBack } from '@/hooks/useMoveBack';

export default function RefinancePage() {
  const moveBack = useMoveBack();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-screen-md mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={moveBack} className="mr-4">
              <ArrowLeft size={24} className="text-gray-700" />
          </button>
            <h1 className="text-xl font-semibold text-gray-900">Рефинансирование</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop')`
        }}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-screen-md mx-auto px-4 text-white">
            <h1 className="text-xl font-bold mb-4 leading-tight">
              Снизьте ежемесячный платеж по ипотеке на 25-35%
            </h1>
            <p className="text-gray-200 mb-6 text-sm leading-relaxed font-light">
              Если вы испытываете финансовые трудности по ежемесячной оплате ипотечного займа перед банком, 
              мы предоставим вам условия с пониженной ежемесячной оплатой, что позволит высвободить средства на ваши нужды.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-[#016a80] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#016a80] transition-colors"
            >
              Получить консультацию
            </a>
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="px-4 py-6 bg-gray-50">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-xl font-bold text-center mb-8 text-gray-900">
            Задайте себе эти вопросы
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                  <Percent size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Устраивает ли вас текущая ставка по ипотеке?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Мы предлагаем ипотеки с более выгодными условиями, которые могут значительно снизить ваши расходы.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                  <Banknote size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Хотели бы вы снизить ежемесячный платёж?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Наша программа рефинансирования позволяет снизить ежемесячный платеж благодаря рефинансированию.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Есть ли у вас другие кредиты, которые вы хотели бы объединить?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Объедините все кредиты и снизьте их ипотечными условиями и их процентными ставками.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-4 bg-white">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-xl font-bold text-center mb-8 text-gray-900">
            Преимущества рефинансирования
          </h2>
          <div className="space-y-4">
            <div className="bg-white shadow-lg rounded-lg p-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingDown size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Снижение ежемесячного платежа</h3>
                  <p className="text-gray-600 text-sm">
                    Уменьшите ваш ежемесячный платеж на 25-35% процентов ставки и сэкономьте средства для других проектов.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                  <Percent size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Выгодные процентные ставки</h3>
                  <p className="text-gray-600 text-sm">
                    Получите доступ к сниженным процентным ставкам от 7% годовых с более гибкими условиями погашения.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Дополнительные возможности</h3>
                  <p className="text-gray-600 text-sm">
                    Получите возможность получения ипотечного недвижимости на льготных условиях для семейного бюджета.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="px-4 py-6 bg-gray-50">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-xl font-bold text-center mb-8 text-gray-900">
            Условия рефинансирования
          </h2>
          
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Основные параметры</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#016a80] rounded-full"></div>
                <span className="text-gray-700">Сумма от 1 000 000 ₸</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#016a80] rounded-full"></div>
                <span className="text-gray-700">Срок до 20 лет</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#016a80] rounded-full"></div>
                <span className="text-gray-700">Ставка от 7% годовых</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#016a80] rounded-full"></div>
                <span className="text-gray-700">Досрочное погашение без комиссий</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Требования к заёмщикам</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-700">Возраст от 21 года</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-700">Стаж работы от 6 месяцев</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-700">Положительная кредитная история</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Погашение ипотеки</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#016a80] rounded-full"></div>
                <span className="text-gray-700">Аннуитетные платежи</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#016a80] rounded-full"></div>
                <span className="text-gray-700">Гибкий график погашения</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#016a80] rounded-full"></div>
                <span className="text-gray-700">Досрочное погашение</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section 
        id="contact" 
        className="relative px-4 py-12 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/ekonpmit.jpeg')`
        }}
      >
        <div className="max-w-screen-md mx-auto">
          <div className="text-left mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              Начните экономить уже сегодня
            </h2>
            <p className="text-gray-200 font-light">
              Многие клиенты уже сумели снизить свои ежемесячные выплаты по рефинансированию
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ваше имя"
                required
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Номер телефона"
                required
              />
            </div>
            
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Сообщение"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#016a80] text-white py-3 rounded-lg font-semibold hover:bg-[#016a80] transition-colors"
            >
              Отправить заявку
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="max-w-screen-md mx-auto">
          <div className="space-y-8">
            {/* About Company */}
            <div>
              <h3 className="font-semibold mb-4">О компании</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                md.kz - надёжный партнёр в сфере рефинансирования ипотечных кредитов в Казахстане.
              </p>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">+7 777 777 77 77</p>
                <p className="text-gray-400">md.kz</p>
                <p className="text-gray-400">г. Алматы, ул. Толе би, 123</p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">Рефинансирование ипотеки</p>
                <p className="text-gray-400">Консультации</p>
                <p className="text-gray-400">Оценка недвижимости</p>
                <p className="text-gray-400">Страхование</p>
              </div>
            </div>

            {/* Social Networks */}
            <div>
              <h3 className="font-semibold mb-4">Мы в соцсетях</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm text-center">
                © 2024 md.kz. Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 
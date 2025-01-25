'use client';

import Link from 'next/link';
import React, { useState } from 'react';

interface HomeProps {
  searchParams?: { [key: string]: string | undefined };
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const [activeProduct, setActiveProduct] = useState('product1');

  const renderProduct = () => {
    switch (activeProduct) {
      case 'product1':
        return (
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto">
              <h2 className="text-3xl font-extrabold text-center mb-8">
                Наши преимущества — Покупка квартиры
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'ГЭСВ от 12%', description: 'Минимальная ставка на рынке – 20%, а у нас почти в два раза ниже.' },
                  { title: 'Первоначальный взнос от 5%', description: 'На рынке взносы начинаются от 20%, а с нами жилье становится доступнее.' },
                  { title: 'Огромный выбор квартир', description: 'Более 200 000 вариантов на любой вкус и бюджет.' },
                  { title: 'Удобный фильтр', description: 'Найдите квартиру за несколько секунд, используя наши современные инструменты поиска.' },
                  { title: 'На рынке 3 года', description: 'Дополнить текст' },
                  { title: '128 заявок', description: 'Дополнить текст' },
                ].map((item, index) => (
                  <div key={index} className="p-6 border border-gray-300 shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'product2':
        return (
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto">
              <h2 className="text-3xl font-extrabold text-center mb-8">
                Наши преимущества — Рефинансирование
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Снижение ставки до 12%', description: 'Сократите свои расходы с минимальной ставкой рефинансирования.' },
                  { title: 'Уменьшение ежемесячного платежа', description: 'Рассчитайте новый график выплат с учетом снижения платежа.' },
                  { title: 'Простое оформление', description: 'Мы поможем вам легко перенести текущую ипотеку в наш банк.' },
                  { title: 'Гибкие условия', description: 'Выберите срок кредитования, который подойдет именно вам.' },
                  { title: 'Аренда с выкупом', description: 'Рефинансирование происходит вместе с арендой выкупом, которая позволит уменьшить ставку до 12%, а не платить банкам 25%' },
                ].map((item, index) => (
                  <div key={index} className="p-6 border border-gray-300 shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">Квартира вашей мечты с минимальной ставкой 12%!</h1>
          <p className="text-lg mb-6">
            Минимальная ставка на рынке – 20% ГЭСВ, у нас всего 12%.<br />
            Первоначальный взнос на рынке – от 20%, у нас от 5%.
          </p>
          <div className="space-x-4">
            <Link href="/" className="bg-accent text-white py-3 px-6 inline-block text-lg font-medium hover:bg-blue-700 transition">
              Подобрать квартиру
            </Link>
            <Link href="/calculator-new" className="bg-white text-primary py-3 px-6 inline-block text-lg font-medium border border-primary hover:bg-gray-100 transition">
              Калькулятор
            </Link>
          </div>
        </div>
      </section>

      {/* Product Switcher */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto text-center">
          <div className="inline-flex space-x-2 bg-gray-200 p-2 rounded-md">
            <button
              onClick={() => setActiveProduct('product1')}
              className={`py-2 px-4 rounded-md text-sm font-medium ${
                activeProduct === 'product1' ? 'bg-primary text-white' : 'bg-gray-200 text-primary'
              }`}
            >
              Покупка квартиры
            </button>
            <button
              onClick={() => setActiveProduct('product2')}
              className={`py-2 px-4 rounded-md text-sm font-medium ${
                activeProduct === 'product2' ? 'bg-primary text-white' : 'bg-gray-200 text-primary'
              }`}
            >
              Рефинансирование
            </button>
            {/* <button
              onClick={() => setActiveProduct('product3')}
              className={`py-2 px-4 rounded-md text-sm font-medium ${
                activeProduct === 'product3' ? 'bg-primary text-white' : 'bg-gray-200 text-primary'
              }`}
            >
              Аренда
            </button>
            <button
              onClick={() => setActiveProduct('product4')}
              className={`py-2 px-4 rounded-md text-sm font-medium ${
                activeProduct === 'product4' ? 'bg-primary text-white' : 'bg-gray-200 text-primary'
              }`}
            >
              Аренда с выкупом
            </button> */}
          </div>
        </div>
      </section>

      {/* Render Active Product */}
      {renderProduct()}

      {/* Footer */}
      <footer className="bg-primary text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2025 Ваше Название Компании. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import KrishaList from '@/components/KrishaList';
import Link from 'next/link';
import React from 'react';

interface HomeProps {
  searchParams?: { [key: string]: string | undefined };
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  return <div className="bg-background text-textPrimary font-sans">
  {/* Hero Section */}
  <section className="bg-primary text-white py-20 text-center">
    <h1 className="text-5xl font-bold">Квартира вашей мечты с минимальной ставкой 11%!</h1>
    <p className="mt-4 text-lg font-light">
      Минимальная ставка на рынке – 20% ГЭСВ, у нас всего 11%.<br />
      Первоначальный взнос на рынке – от 20%, у нас от 5%.
    </p>
    <div className="mt-6 space-x-4">
      <Link href="/" className="bg-accent hover:bg-blue-700 px-8 py-3 rounded-full text-lg font-medium">Подобрать квартиру</Link>
      <Link href="/calculator-new" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium">Калькулятор</Link>
    </div>
  </section>

  {/* Преимущества */}
  <section className="py-16 text-center bg-secondary">
    <h2 className="text-4xl font-bold">Наши преимущества – Ваша выгода!</h2>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
      {[
        { title: 'ГЭСВ от 11%', description: 'Минимальная ставка на рынке – 20%, а у нас почти в два раза ниже.' },
        { title: 'Первоначальный взнос от 5%', description: 'На рынке взносы начинаются от 20%, а с нами жилье становится доступнее.' },
        { title: 'Огромный выбор квартир', description: 'Более 200 000 вариантов на любой вкус и бюджет.' },
        { title: 'Удобный фильтр', description: 'Найдите квартиру за несколько секунд, используя наши современные инструменты поиска.' },
      ].map((item, index) => (
        <div key={index} className="bg-white shadow-lg p-8 rounded-xl">
          <h3 className="text-2xl font-semibold text-primary">{item.title}</h3>
          <p className="mt-4 text-textSecondary">{item.description}</p>
        </div>
      ))}
    </div>
  </section>

  {/* Фильтр */}
  <section className="py-16 bg-gray-100 text-center">
    <h2 className="text-4xl font-bold">Найдите квартиру своей мечты</h2>
    <p className="mt-4 text-lg text-textSecondary">Выберите параметры ниже:</p>
    <form className="mt-8 space-y-6 max-w-xl mx-auto">
      {['Бюджет', 'Площадь', 'Район'].map((placeholder, index) => (
        <input
          key={index}
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
      ))}
      <Link href="/"
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
        Применить фильтр
      </Link>
    </form>
  </section>

  {/* Рекламный блок */}
  <section className="bg-accent text-white py-16 text-center">
    <h2 className="text-4xl font-bold">Доступное жилье – это реальность!</h2>
    <p className="mt-4 text-lg font-light">Ставка от 11% и первоначальный взнос всего 5%.</p>
    <Link href="/" className="mt-6 bg-white text-accent hover:bg-gray-100 px-8 py-3 rounded-full font-medium">
      Оставить заявку на консультацию
    </Link>
  </section>

  {/* FAQ */}
  <section className="py-16 bg-secondary text-center">
    <h2 className="text-4xl font-bold">Часто задаваемые вопросы</h2>
    <div className="mt-12 space-y-8 max-w-3xl mx-auto">
      {[
        { question: 'Как работает ставка 11%?', answer: 'Ответ на вопрос о том, как мы обеспечиваем минимальную ставку.' },
        { question: 'Что нужно для первоначального взноса 5%?', answer: 'Узнайте, какие документы и условия необходимы.' },
      ].map((faq, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-primary">{faq.question}</h3>
          <p className="mt-4 text-textSecondary">{faq.answer}</p>
        </div>
      ))}
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-primary text-white py-8 text-center">
    <p>&copy; 2025 Ваше Название Компании. Все права защищены.</p>
  </footer>
</div>
};

export default Home;

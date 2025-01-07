// @ts-nocheck
"use client"
import { useState } from "react";

export default function Calculator() {
  const [price, setPrice] = useState(20000000); // Стоимость квартиры
  const [downPayment, setDownPayment] = useState(4000000); // Первоначальный взнос
  const [years, setYears] = useState(15); // Срок кредита

  const yourRate = 11; // Ваша процентная ставка
  const marketRate = 22; // Процентная ставка на рынке

  const calculateMonthlyPayment = (loanAmount, rate, termYears) => {
    const monthlyRate = rate / 100 / 12;
    const termMonths = termYears * 12;
    return (
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -termMonths))
    ).toFixed(2);
  };

  const loanAmount = price - downPayment;

  const yourPayment = calculateMonthlyPayment(loanAmount, yourRate, years);
  const marketPayment = calculateMonthlyPayment(loanAmount, marketRate, years);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-10">
    <h2 className="text-3xl font-bold text-primary text-center mb-6">Калькулятор ипотеки</h2>
    <div className="space-y-6">
      {/* Стоимость квартиры */}
      <div>
        <label className="block text-textPrimary font-medium mb-2">Стоимость квартиры:</label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Введите стоимость"
        />
      </div>
      {/* Первоначальный взнос */}
      <div>
        <label className="block text-textPrimary font-medium mb-2">Первоначальный взнос:</label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          placeholder="Введите сумму"
        />
      </div>
      {/* Срок кредита */}
      <div>
        <label className="block text-textPrimary font-medium mb-2">Срок кредита (лет):</label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          placeholder="Введите срок"
        />
      </div>
    </div>
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-primary mb-4">Результаты:</h3>
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner text-textSecondary">
        <p className="mb-2">Сумма кредита: <span className="font-semibold">{loanAmount.toLocaleString()} ₸</span></p>
        <p className="mb-2">Ежемесячный платеж (вы): <span className="font-semibold text-accent">{yourPayment} ₸</span></p>
        <p className="mb-2">Ежемесячный платеж (другие банки): <span className="font-semibold text-red-600">{marketPayment} ₸</span></p>
        <p className="font-bold text-green-600">Ваша экономия: {(marketPayment - yourPayment).toFixed(2)} ₸</p>
      </div>
    </div>
  </div>
  );
}

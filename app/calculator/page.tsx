'use client';
import React, { useState } from 'react';
import { Slider, TextField } from '@mui/material';

const Calculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('mortgage'); // Вкладка по умолчанию: "Ипотека"
  const [propertyValue, setPropertyValue] = useState<number>(4000000); // Стоимость недвижимости
  const [initialPayment, setInitialPayment] = useState<number>(2500000); // Первоначальный взнос
  const [loanTerm, setLoanTerm] = useState<number>(20); // Срок кредита в годах
  const [interestRate, setInterestRate] = useState<number>(10.5); // Ставка
  const [results, setResults] = useState<null | {
    monthlyPayment: number;
    totalPayment: number;
    overpayment: number;
    recommendedIncome: number;
    taxDeduction: number;
    loanAmount: number;
  }>(null);

  const calculateMortgage = () => {
    const loanAmount = propertyValue - initialPayment; // Сумма кредита
    const monthlyRate = interestRate / 100 / 12; // Месячная процентная ставка
    const numberOfPayments = loanTerm * 12; // Количество месяцев

    if (loanAmount > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const monthlyPayment =
        (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      const totalPayment = monthlyPayment * numberOfPayments;
      const overpayment = totalPayment - loanAmount;
      const recommendedIncome = monthlyPayment * 3; // Рекомендуемый доход = платеж * 3
      const taxDeduction = Math.min(loanAmount * 0.13, 260000); // Налоговый вычет (макс. 260000₽)

      setResults({
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(totalPayment),
        overpayment: Math.round(overpayment),
        recommendedIncome: Math.round(recommendedIncome),
        taxDeduction: Math.round(taxDeduction),
        loanAmount,
      });
    } else {
      alert('Пожалуйста, заполните все поля корректно.');
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }).replace(',00', '');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Навигация по вкладкам */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('mortgage')}
          style={{
            padding: '10px 20px',
            border: activeTab === 'mortgage' ? '2px solid #007BFF' : '1px solid #ccc',
            backgroundColor: activeTab === 'mortgage' ? '#f0f8ff' : '#fff',
            cursor: 'pointer',
          }}>
          Ипотека
        </button>
        <button
          onClick={() => setActiveTab('rent')}
          style={{
            padding: '10px 20px',
            border: activeTab === 'rent' ? '2px solid #007BFF' : '1px solid #ccc',
            backgroundColor: activeTab === 'rent' ? '#f0f8ff' : '#fff',
            cursor: 'pointer',
          }}>
          Аренда с последующим выкупом
        </button>
      </div>

      {/* Содержимое вкладок */}
      {activeTab === 'mortgage' && (
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Левая часть: Ввод данных */}
          <div style={{ flex: 1 }}>
            <h1>Ипотека</h1>
            {/* Стоимость недвижимости */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Стоимость недвижимости:
              </label>
              <TextField
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                variant="outlined"
                fullWidth
              />
              <Slider
                value={propertyValue}
                onChange={(e, value) => setPropertyValue(value as number)}
                step={100000}
                min={1000000}
                max={10000000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => formatCurrency(value)}
              />
            </div>

            {/* Первоначальный взнос */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Первоначальный взнос:
              </label>
              <TextField
                type="number"
                value={initialPayment}
                onChange={(e) => setInitialPayment(Number(e.target.value))}
                variant="outlined"
                fullWidth
              />
              <Slider
                value={initialPayment}
                onChange={(e, value) => setInitialPayment(value as number)}
                step={50000}
                min={0}
                max={propertyValue} // Первоначальный взнос не может быть больше стоимости
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => formatCurrency(value)}
              />
            </div>

            {/* Срок кредита */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Срок кредита (в годах):
              </label>
              <TextField
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                variant="outlined"
                fullWidth
              />
            </div>

            {/* Ставка */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>Ставка (%):</label>
              <TextField
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                variant="outlined"
                fullWidth
              />
            </div>

            <button
              onClick={calculateMortgage}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                marginTop: '10px',
              }}>
              Рассчитать
            </button>
          </div>

          {/* Правая часть: Результаты */}
          {results && (
            <div
              style={{ flex: 1, border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
              <h2>Результаты</h2>
              <p>
                <strong>Ежемесячный платёж:</strong> {formatCurrency(results.monthlyPayment)}
              </p>
              <p>
                <strong>Сумма кредита:</strong> {formatCurrency(results.loanAmount)}
              </p>
              <p>
                <strong>Переплата по кредиту:</strong> {formatCurrency(results.overpayment)}
              </p>
              <p>
                <strong>Общая выплата:</strong> {formatCurrency(results.totalPayment)}
              </p>
              <p>
                <strong>Рекомендуемый доход:</strong> {formatCurrency(results.recommendedIncome)}
              </p>
              <p>
                <strong>Налоговый вычет:</strong> {formatCurrency(results.taxDeduction)}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'rent' && (
        <div>
          <h1>Аренда с последующим выкупом</h1>
          <p>Здесь будет контент для аренды с последующим выкупом.</p>
        </div>
      )}
    </div>
  );
};

export default Calculator;
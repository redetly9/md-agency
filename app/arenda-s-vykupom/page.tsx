'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, X, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useMoveBack } from '@/hooks/useMoveBack';

export default function ArendaSVykupomPage() {
  const moveBack = useMoveBack();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyValue: '',
    initialPayment: '',
    duration: '60',
    monthlyIncome: '',
    message: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const [calculator, setCalculator] = useState({
    propertyValue: 6000000,
    monthlyPayment: 100000,
    duration: 60
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleCalculatorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setCalculator(prev => {
      const newCalculator = { ...prev };
      
      if (name === 'propertyValue') {
        const numValue = parseInt(value.replace(/\D/g, '')) || 0;
        newCalculator.propertyValue = numValue;
        newCalculator.monthlyPayment = Math.round(numValue * 0.017);
      } else if (name === 'duration') {
        newCalculator.duration = parseInt(value);
        newCalculator.monthlyPayment = Math.round(newCalculator.propertyValue * 0.017);
      }
      
      return newCalculator;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (selectedFile) {
      console.log('Selected file:', selectedFile.name, selectedFile.size);
    }
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #016a80;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #016a80;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        
        .slider::-webkit-slider-track {
          height: 4px;
          border-radius: 2px;
        }
        
        .slider::-moz-range-track {
          height: 4px;
          border-radius: 2px;
          background: #E5E7EB;
          border: none;
        }
        
        .slider:focus {
          outline: none;
        }
      `}</style>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3">
        <div className="max-w-screen-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={moveBack} className="text-gray-500">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <span className="text-2xl font-medium text-[#016a80]">md.kz</span>
          </div>
          <button className="bg-[#016a80] text-white px-5 py-2 rounded-lg font-light hover:bg-[#016a80] transition-colors text-sm">
            Связаться с нами
          </button>
        </div>
      </header>
      
      {/* Divider Line */}
      <div className="border-b border-[#F3F4F6] mb-2"></div>

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
            <button className="bg-[#016a80] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#016a80] transition-colors">
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


  {/* Calculator Section */}
  <section className="px-2 py-6 bg-white">
        <div className="max-w-screen-md mx-auto">
          <h2 className="text-m font-bold text-gray-900 mb-4 text-center">
            Рассчитайте свой вариант аренды с выкупом
          </h2>
          
          {/* Property Value Slider */}
          <div className="mb-1">
            <label className="block text-black font-light mb-1 text-m">
              Стоимость жилья:
            </label>
            <div className="mb-1">
              <input
                type="range"
                name="propertyValue"
                min="1000000"
                max="50000000"
                step="100000"
                value={calculator.propertyValue}
                onChange={handleCalculatorChange}
                className="w-full h-[3px] bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #016a80 0%, #016a80 ${((calculator.propertyValue - 1000000) / (50000000 - 1000000)) * 100}%, #E5E7EB ${((calculator.propertyValue - 1000000) / (50000000 - 1000000)) * 100}%, #E5E7EB 100%)`
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-[#6B7280] font-light">
              <span>0 ₸</span>
              <span>50 000 000 ₸</span>
            </div>
            </div>

          {/* Monthly Payment Slider */}
          <div className="mb-8">
            <label className="block text-black font-light mb-2 text-m">
              Буду пополнять ежемесячно накопительный фонд:
            </label>
            <div className="mb-2">
              <input
                type="range"
                min="0"
                max="1000000"
                step="10000"
                value={calculator.monthlyPayment}
                onChange={(e) => setCalculator(prev => ({ ...prev, monthlyPayment: parseInt(e.target.value) }))}
                className="w-full h-[3px] bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #016a80 0%, #016a80 ${(calculator.monthlyPayment / 1000000) * 100}%, #E5E7EB ${(calculator.monthlyPayment / 1000000) * 100}%, #E5E7EB 100%)`
                }}
              />
            </div>
            <p className="text-sm text-[#6B7280] font-light">
              Минимальная сумма пополнения: 100 000 ₸
            </p>
            </div>

          {/* Duration Slider */}
          <div className="mb-8">
            <label className="block text-black font-light mb-2 text-m">
              Срок накопления, мес:
            </label>
            <div className="mb-2">
              <input
                type="range"
                name="duration"
                min="12"
                max="120"
                step="1"
                value={calculator.duration}
                onChange={(e) => setCalculator(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full h-[3px] bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #016a80 0%, #016a80 ${((calculator.duration - 12) / (120 - 12)) * 100}%, #E5E7EB ${((calculator.duration - 12) / (120 - 12)) * 100}%, #E5E7EB 100%)`
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-[#6B7280] font-light">
              <span>12 мес</span>
              <span>120 мес</span>
            </div>
        </div>

          {/* Results */}
          <div className="bg-white rounded-lg p-2 mb-6">
            <h3 className="text-xl font-medium text-black mb-6">Результаты расчета</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 mb-2">Общая сумма накоплений:</p>
                <p className="text-3xl font-bold text-[#016a80]">
                  {(calculator.monthlyPayment * calculator.duration).toLocaleString('ru-RU')} ₸
                </p>
                <p className="text-sm text-[#6B7280] font-light mt-1">
                  Это ваши денежные средства, которые вы можете использовать для выкупа
                </p>
              </div>
              
              <div>
                <p className="text-black font-light">Ежемесячная сумма накоплений:</p>
                <p className="text-xl font-bold text-black">
                  {calculator.monthlyPayment.toLocaleString('ru-RU')} ₸/мес
                </p>
              </div>
              
              <div>
                <p className="text-gray-700">Ежемесячная аренда (%):</p>
                <p className="text-xl font-bold text-gray-900">0 ₸/мес</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button className="bg-[#016a80] text-white px-8 py-4 rounded-lg font-medium text-base hover:bg-red-600 transition-colors w-full">
              Накопить и купить
            </button>
          </div>
        </div>
      </section>

        {/* Advantages Section */}
        <section className="px-4 py-4 bg-gray-50">
          <div className="max-w-screen-md mx-auto">
            <h2 className="text-2xl font-medium text-black text-center mb-8">
              Преимущества аренды с выкупом
          </h2>
          
            <div className="grid gap-4">
              {/* Первоначальный накопительный взнос */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="">
                    <span className="text-[#016a80] text-2xl font-bold">%</span>
                  <div>
                    <h3 className="text-base font-semibold text-black mb-2">
                      Первоначальный накопительный взнос
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Всего 5% от стоимости квартиры вместо 20-30% при ипотеке
                    </p>
                  </div>
                </div>
              </div>

              {/* Гибкие условия договора */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="">
                    <svg className="w-8 h-8 text-[#016a80]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                      <path d="M6 8h8v2H6V8z"/>
                      <path d="M6 11h8v1H6v-1z"/>
                    </svg>
                  <div>
                    <h3 className="text-base font-semibold text-black mb-2">
                      Гибкие условия договора
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Индивидуальный подход к каждому клиенту
                    </p>
                  </div>
                </div>
              </div>

              {/* Возможность тестировать жильё */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="">
                    <svg className="w-8 h-8 text-[#016a80]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H16a1 1 0 110 2h-1.265l-1.5 6H15a1 1 0 110 2h-1.735l-.552 2.207a1 1 0 11-1.94-.486L11.265 16H8.735l-.552 2.207a1 1 0 11-1.94-.486L6.735 16H5a1 1 0 110-2h1.265l1.5-6H6a1 1 0 010-2h1.735l.552-2.207a1 1 0 011.213-.727zM8.97 8l-1.5 6h2.56l1.5-6H8.97z" clipRule="evenodd"/>
                    </svg>
                  <div>
                    <h3 className="text-base font-semibold text-black mb-2">
                      Возможность тестировать жильё
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Поживите в квартире до момента выкупа
                    </p>
                  </div>
            </div>
            </div>
            
              {/* Простой процесс оформления */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="">
                    <svg className="w-8 h-8 text-[#016a80]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  <div>
                    <h3 className="text-base font-semibold text-black mb-2">
                      Простой процесс оформления
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Никаких сложных банковских проверок
                    </p>
                  </div>
                </div>
              </div>

              {/* Отсутствие процентной ставки */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="">
                    <span className="text-[#016a80] text-2xl font-bold">$</span>
                  <div>
                    <h3 className="text-base font-semibold text-black mb-2">
                      Отсутствие процентной ставки
                    </h3>
                    <p className="text-gray-600 text-sm">
                      В рассрочку или сразу, без дополнительных процентов
                    </p>
                  </div>
                </div>
              </div>

              {/* Защита от переплат */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="">
                    <svg className="w-8 h-8 text-[#016a80]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  <div>
                    <h3 className="text-base font-semibold text-black mb-2">
                      Защита от переплат
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Стабильные платежи, независимо от рынка
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
                  </section>
                                     {/* Comparison Table */}
                   <section className="px-4 py-4 bg-white">
                    <h3 className="text-2xl font-medium text-black text-center mb-4">Сравнение условий</h3>
                     <div className="max-w-screen-md mx-auto">
                       <div className="overflow-hidden rounded-lg shadow-sm">
                         {/* Table Header */}
                         <div className="bg-gray-900 text-white">
                           <div className="grid grid-cols-3 py-4 px-4">
                             <div className="font-medium">Параметр</div>
                             <div className="font-medium text-center">Аренда с выкупом</div>
                             <div className="font-medium text-center">Ипотека</div>
                           </div>
                         </div>
                         
                         {/* Table Body */}
                         <div className="bg-gray-50">
                           {/* Первоначальный накопительный взнос */}
                           <div className="grid grid-cols-3 py-4 px-4 border-b border-gray-200">
                             <div className="text-gray-900 text-sm font-light">Первоначальный накопительный взнос</div>
                             <div className="text-[#016a80] font-light text-center text-sm">От 5%</div>
                             <div className="text-gray-900 text-center text-sm font-light">От 20-30%</div>
                           </div>
                           
                           {/* Проверка кредитной истории */}
                           <div className="grid grid-cols-3 py-4 px-4 border-b border-gray-200">
                             <div className="text-gray-900 text-sm font-light">Проверка кредитной истории</div>
                             <div className="text-[#016a80] font-light text-center text-sm">Минимальная</div>
                             <div className="text-gray-900 text-center text-sm font-light">Строгая</div>
                           </div>
                           
                           {/* Процентная ставка */}
                           <div className="grid grid-cols-3 py-4 px-4 border-b border-gray-200">
                             <div className="text-gray-900 text-sm font-light">Процентная ставка</div>
                             <div className="text-[#016a80] font-light text-center text-sm">От 7% до 13.8%</div>
                             <div className="text-gray-900 text-center text-sm font-light">От 19% до 24.5%</div>
                           </div>
                           
                           {/* Возможность тестировать жильё */}
                           <div className="grid grid-cols-3 py-4 px-4 border-b border-gray-200">
                             <div className="text-gray-900 text-sm font-light">Возможность тестировать жильё</div>
                             <div className="text-[#016a80] font-light text-center text-sm">Да</div>
                             <div className="text-gray-900 text-center text-sm font-light">Нет</div>
                           </div>
                           
                           {/* Гибкость условий */}
                           <div className="grid grid-cols-3 py-4 px-4 border-b border-gray-200">
                             <div className="text-gray-900 text-sm font-light">Гибкость условий</div>
                             <div className="text-[#016a80] font-light text-center text-sm">Высокая</div>
                             <div className="text-gray-900 text-center text-sm font-light">Низкая</div>
                           </div>
                           
                           {/* Подходит для нестабильного дохода */}
                           <div className="grid grid-cols-3 py-4 px-4">
                             <div className="text-gray-900 text-sm font-light">Подходит для нестабильного дохода</div>
                             <div className="text-[#016a80] font-light text-center text-sm">Да</div>
                             <div className="text-gray-900 text-center text-sm font-light">Нет</div>
              </div>
            </div>
          </div>
        </div>
      </section>

                   {/* Services Cost Section */}
      <section className="px-4 py-8 bg-gray-50">
        <div className="max-w-screen-md mx-auto">
                       <h2 className="text-2xl font-medium text-black text-center mb-8">
                         Стоимость наших услуг
          </h2>
          
                       <div className="grid md:grid-cols-2 gap-8">
                         {/* Services List */}
                         <div className="space-y-4">
                           <div className="flex items-center gap-3">
                             <div className="w-6 h-6 bg-[#016a80] rounded flex items-center justify-center flex-shrink-0">
                               <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                               </svg>
                             </div>
                             <span className="text-gray-800 text-sm">Консультация - 35000 тг</span>
                           </div>
                           
                           <div className="flex items-center gap-3">
                             <div className="w-6 h-6 bg-[#016a80] rounded flex items-center justify-center flex-shrink-0">
                               <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                               </svg>
                             </div>
                             <span className="text-gray-800 text-sm">Оплата оценки квартиры - оплачивает арендатор</span>
                           </div>
                           
                           <div className="flex items-center gap-3">
                             <div className="w-6 h-6 bg-[#016a80] rounded flex items-center justify-center flex-shrink-0">
                               <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                               </svg>
                             </div>
                             <span className="text-gray-800 text-sm">Страховка - оплачивает арендатор</span>
                           </div>
                           
                           <div className="flex items-center gap-3">
                             <div className="w-6 h-6 bg-[#016a80] rounded flex items-center justify-center flex-shrink-0">
                               <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                               </svg>
                             </div>
                             <span className="text-gray-800 text-sm">Нотариальные услуги - оплачивает арендатор</span>
                           </div>
                           
                           <div className="flex items-start gap-3">
                             <div className="w-6 h-6 bg-[#016a80] rounded flex items-center justify-center flex-shrink-0 mt-1">
                               <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                               </svg>
                             </div>
                             <div>
                               <div className="text-gray-800 text-sm font-medium">Комиссия за оформление - 10% от стоимости объекта</div>
                               <div className="text-gray-600 text-xs">(данная оплата производится при расторжении договора или ежемесячной оплатой)</div>
                             </div>
                           </div>
                         </div>
                         
                                                  {/* Interior Image */}
                         <div className="rounded-lg overflow-hidden h-64">
                           <img 
                             src="/price_uslug.png" 
                             alt="Интерьер квартиры" 
                             className="w-full h-full object-cover"
                           />
                         </div>
          </div>
        </div>
      </section>

           {/* How It Works Section */}
          <section className="px-4 py-4 bg-white">
        <div className="max-w-screen-md mx-auto">
              <h2 className="text-2xl font-medium text-black text-center mb-8">
                Как работает аренда с выкупом
          </h2>
          
              <div className="space-y-8">
                {/* Выбор объекта недвижимости */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Выбор объекта недвижимости
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Выберите подходящий объект из нашей базы или предложите свой вариант
                    </p>
                  </div>
                </div>

                {/* Внесение первоначального взноса */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Внесение первоначального взноса
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Внесите первоначальный взнос в размере 5% от стоимости жилья
                    </p>
                  </div>
                </div>

                {/* Заключение договора */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                      <path d="M8 8h4v1H8V8z"/>
                      <path d="M8 10h4v1H8v-1z"/>
                      <path d="M8 12h2v1H8v-1z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Заключение договора
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Подписание договора аренды с правом выкупа, где фиксируются все условия
                    </p>
                  </div>
                </div>

                {/* Проживание и выплаты */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-9.12 5.19L3 17a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707L5.88 9.12A6 6 0 1118 8zm-6 0a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
              <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Проживание и выплаты
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Вы въезжаете в квартиру и вносите ежемесячные платежи
                    </p>
                  </div>
              </div>
              
                {/* Полный выкуп объекта */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#016a80] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
              <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Полный выкуп объекта
                    </h3>
                    <p className="text-gray-600 text-sm">
                      По окончании срока договора вы становитесь владельцем недвижимости
                    </p>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* CTA Section with Background */}
       <section 
         className="relative bg-cover bg-center bg-no-repeat text-white px-6 py-16"
         style={{
           backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/start_row.png')`
         }}
       >
         <div className="max-w-screen-md mx-auto">
           <div className="text-left mb-12">
             <h2 className="text-2xl font-bold mb-6">
               Начните путь к собственному жилью сегодня
             </h2>
             <p className="text-lg opacity-90 mb-8 font-light">
               Наши специалисты помогут подобрать оптимальные условия аренды с выкупом, 
               учитывая ваши финансовые возможности и пожелания
             </p>
           </div>

           <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto">
             <h3 className="text-xl font-semibold mb-6 text-left">
               Оставьте заявку на консультацию
            </h3>
             
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <input
                   type="text"
                   name="name"
                   value={formData.name}
                   onChange={handleInputChange}
                   className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm"
                   placeholder="Ваше имя"
                 />
               </div>
               
               <div>
                 <input
                   type="tel"
                   name="phone"
                   value={formData.phone}
                   onChange={handleInputChange}
                   className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm"
                   placeholder="Номер телефона"
                 />
               </div>

               <div>
                 <input
                   type="email"
                   name="email"
                   value={formData.email || ''}
                   onChange={handleInputChange}
                   className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm"
                   placeholder="E-mail"
                 />
               </div>

               <div>
                 <label className="block w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg focus-within:ring-2 focus-within:ring-white focus-within:border-transparent cursor-pointer hover:bg-opacity-10 transition-colors backdrop-blur-sm">
                   <div className="flex items-center justify-between text-white">
                     <span className="opacity-70">
                       {selectedFile ? fileName : 'Прикрепите документ'}
                     </span>
                     <span className="text-sm opacity-70 bg-white bg-opacity-20 px-2 py-1 rounded">
                       Выбрать файл
                     </span>
                   </div>
                   <input
                     type="file"
                     name="file"
                     onChange={handleFileChange}
                     className="hidden"
                     accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                   />
                 </label>
                 {selectedFile && (
                   <p className="mt-2 text-sm text-green-400 flex items-center">
                     ✓ Файл успешно загружен
                   </p>
                 )}
               </div>

               <button
                 type="submit"
                 className="w-full bg-[#016a80] hover:bg-[#016a80] text-white py-3 px-6 rounded-lg font-semibold transition-colors mt-6"
               >
                 Отправить заявку
            </button>
             </form>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white px-4 py-8">
        <div className="max-w-screen-md mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">md.kz</h3>
              <p className="text-gray-400 text-xs">
                Ваш надежный партнер в сфере недвижимости. Помогаем найти идеальное жилье и оформить выгодные условия покупки.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Услуги</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><Link href="/rent-to-own" className="hover:text-white">Аренда</Link></li>
                <li><Link href="/arenda-s-vykupom" className="hover:text-white">Аренда с выкупом</Link></li>
                <li><Link href="/refinance" className="hover:text-white">Рефинансирование</Link></li>
                <li><Link href="/mortgage" className="hover:text-white">Ипотека</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Контакты</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>+7 (727) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>info@md.kz</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>г. Алматы, ул. Толе би, 101</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Социальные сети</h4>
              <div className="flex gap-2">
                <a href="#" className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Instagram size={12} />
                </a>
                <a href="#" className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Facebook size={12} />
                </a>
                <a href="#" className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Twitter size={12} />
                </a>
                <a href="#" className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Linkedin size={12} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs text-gray-400">
            <p>&copy; 2024 md.kz. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
} 
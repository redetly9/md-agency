'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MapPin, 
  Camera, 
  ChevronDown
} from 'lucide-react';

const AddListingPage = () => {
  const [listingType, setListingType] = useState('sell'); // 'sell' или 'rent'
  const [formData, setFormData] = useState({
    rooms: '1',
    price: '',
    isInMortgage: false,
    totalArea: '',
    kitchenArea: '',
    location: '',
    condition: '',
    contactType: '',
    phone: ''
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto flex items-center">
          <Link href="/profile" className="mr-4">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Подать объявление</h1>
        </div>
      </header>

      {/* Основной контент */}
      <main className="flex-grow px-4 py-6 pb-20">
        <div className="max-w-screen-md mx-auto space-y-6">
          
          {/* Переключатель типа объявления */}
          <div className="bg-white rounded-lg p-1">
            <div className="flex">
              <button 
                className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  listingType === 'sell' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-600'
                }`}
                onClick={() => setListingType('sell')}
              >
                Продать
              </button>
              <button 
                className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  listingType === 'rent' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-600'
                }`}
                onClick={() => setListingType('rent')}
              >
                Сдать
              </button>
            </div>
          </div>

          {/* Количество комнат */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-gray-900 font-medium mb-3">
              Количество комнат
            </label>
            <div className="relative">
              <select 
                value={formData.rooms}
                onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg appearance-none bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Цена */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-gray-900 font-medium mb-3">
              Цена
            </label>
            <div className="flex">
              <input 
                type="text"
                placeholder="Например, 12 000 000"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-200 rounded-r-lg text-gray-600">
                тенге
              </div>
            </div>
          </div>

          {/* В залоге */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-gray-900 font-medium mb-3">
              В залоге
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input 
                  type="radio"
                  name="mortgage"
                  checked={formData.isInMortgage === true}
                  onChange={() => setFormData({...formData, isInMortgage: true})}
                  className="mr-2 w-4 h-4 text-teal-500 focus:ring-teal-500"
                />
                <span className="text-gray-900">да</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio"
                  name="mortgage"
                  checked={formData.isInMortgage === false}
                  onChange={() => setFormData({...formData, isInMortgage: false})}
                  className="mr-2 w-4 h-4 text-teal-500 focus:ring-teal-500"
                />
                <span className="text-gray-900">нет</span>
              </label>
            </div>
          </div>

          {/* Площадь */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-gray-900 font-medium mb-3">
              Площадь, м²
            </label>
            <div className="flex gap-4">
              <input 
                type="text"
                placeholder="Общая"
                value={formData.totalArea}
                onChange={(e) => setFormData({...formData, totalArea: e.target.value})}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input 
                type="text"
                placeholder="Кухня"
                value={formData.kitchenArea}
                onChange={(e) => setFormData({...formData, kitchenArea: e.target.value})}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Расположение */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-gray-900 font-medium mb-3">
              Расположение
            </label>
            <div className="relative mb-3">
              <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Поиск по городу, району, микрорайо..."
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
              <MapPin size={20} />
              Указать на карте
            </button>
          </div>

          {/* Фотографии */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-gray-900 font-medium mb-3">
              Фотографии
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Camera size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Объявление с фотографиями получает в 5 раз больше просмотров
              </p>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium">
                Добавить фото
              </button>
            </div>
          </div>

          {/* Состояние */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-gray-900 font-medium mb-3">
              Состояние
            </label>
            <div className="space-y-3">
              {[
                'свежий ремонт',
                'не новый, но аккуратный ремонт',
                'требует ремонта',
                'свободная планировка',
                'черновая отделка'
              ].map((condition) => (
                <label key={condition} className="flex items-center">
                  <input 
                    type="radio"
                    name="condition"
                    value={condition}
                    checked={formData.condition === condition}
                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                    className="mr-3 w-4 h-4 text-teal-500 focus:ring-teal-500"
                  />
                  <span className="text-gray-900">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Контактная информация */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-gray-900 font-medium mb-3">
              Контактная информация
            </label>
            <p className="text-gray-600 text-sm mb-4">
              От чьего имени вы хотите подавать объявления?
            </p>
            <div className="space-y-3 mb-4">
              {[
                'Хозяин',
                'Специалист',
                'Компания'
              ].map((type) => (
                <label key={type} className="flex items-center">
                  <input 
                    type="radio"
                    name="contactType"
                    value={type}
                    checked={formData.contactType === type}
                    onChange={(e) => setFormData({...formData, contactType: e.target.value})}
                    className="mr-3 w-4 h-4 text-teal-500 focus:ring-teal-500"
                  />
                  <span className="text-gray-900">{type}</span>
                </label>
              ))}
            </div>
            
            {/* Телефоны */}
            <label className="block text-gray-900 font-medium mb-3">
              Телефоны
            </label>
            <input 
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
            />
            
            {/* Согласие */}
            <label className="flex items-start gap-3">
              <input 
                type="checkbox"
                className="mt-1 w-4 h-4 text-teal-500 focus:ring-teal-500 rounded"
              />
              <span className="text-gray-600 text-sm">
                Согласен с правилами размещения объявлений
              </span>
            </label>
          </div>

          {/* Кнопка продолжить */}
          <button className="w-full bg-teal-500 text-white py-4 rounded-lg font-medium text-lg">
            Продолжить
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddListingPage; 
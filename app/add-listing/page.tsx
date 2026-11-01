'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MapPin, 
  Camera, 
  ChevronDown
} from 'lucide-react';
import { useMoveBack } from '@/hooks/useMoveBack';

const AddListingPage = () => {
  const moveBack = useMoveBack();
  
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
    <div className="bg-white">
      {/* Шапка */}
      <header className="bg-white px-4 py-3 border-b border-line">
        <div className="max-w-screen-md mx-auto flex items-center">
          <button onClick={moveBack} className="mr-4">
            <ArrowLeft size={24} className="text-ink-2" />
          </button>
          <h1 className="text-xl font-semibold text-ink">Подать объявление</h1>
        </div>
      </header>

      {/* Основной контент */}
      <div className="px-4 py-6">
        <div className="max-w-screen-md mx-auto space-y-6">
          
          {/* Переключатель типа объявления */}
          <div className="bg-white rounded-lg p-1">
            <div className="flex">
              <button 
                className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  listingType === 'sell' 
                  ? 'bg-brand text-ink' 
                  : 'text-ink-2'
                }`}
                onClick={() => setListingType('sell')}
              >
                Продать
              </button>
              <button 
                className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  listingType === 'rent' 
                  ? 'bg-brand text-ink' 
                  : 'text-ink-2'
                }`}
                onClick={() => setListingType('rent')}
              >
                Сдать
              </button>
            </div>
          </div>

          {/* Количество комнат */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-ink font-medium mb-3">
              Количество комнат
            </label>
            <div className="relative">
              <select 
                value={formData.rooms}
                onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                className="w-full px-4 py-3 border border-line rounded-lg appearance-none bg-white text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-ink-3 pointer-events-none" />
            </div>
          </div>

          {/* Цена */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-ink font-medium mb-3">
              Цена
            </label>
            <div className="flex">
              <input 
                type="text"
                placeholder="Например, 12 000 000"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="flex-1 px-4 py-3 border border-line rounded-l-lg focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
              <div className="px-4 py-3 bg-slate-50 border border-l-0 border-line rounded-r-lg text-ink-2">
                тенге
              </div>
            </div>
          </div>

          {/* В залоге */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-ink font-medium mb-3">
              В залоге
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input 
                  type="radio"
                  name="mortgage"
                  checked={formData.isInMortgage === true}
                  onChange={() => setFormData({...formData, isInMortgage: true})}
                  className="mr-2 w-4 h-4 text-brand focus:ring-brand/30"
                />
                <span className="text-ink">да</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio"
                  name="mortgage"
                  checked={formData.isInMortgage === false}
                  onChange={() => setFormData({...formData, isInMortgage: false})}
                  className="mr-2 w-4 h-4 text-brand focus:ring-brand/30"
                />
                <span className="text-ink">нет</span>
              </label>
            </div>
          </div>

          {/* Площадь */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-ink font-medium mb-3">
              Площадь, м²
            </label>
            <div className="flex gap-4">
              <input 
                type="text"
                placeholder="Общая"
                value={formData.totalArea}
                onChange={(e) => setFormData({...formData, totalArea: e.target.value})}
                className="flex-1 px-4 py-3 w-1/2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
              <input 
                type="text"
                placeholder="Кухня"
                value={formData.kitchenArea}
                onChange={(e) => setFormData({...formData, kitchenArea: e.target.value})}
                className="flex-1 px-4 py-3 w-1/2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
          </div>

          {/* Расположение */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-ink font-medium mb-3">
              Расположение
            </label>
            <div className="relative mb-3">
              <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-3" />
              <input 
                type="text"
                placeholder="Поиск по городу, району, микрорайо..."
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <button className="w-full bg-brand text-ink py-3 rounded-lg font-medium flex items-center justify-center gap-2">
              <MapPin size={20} />
              Указать на карте
            </button>
          </div>

          {/* Фотографии */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-ink font-medium mb-3">
              Фотографии
            </label>
            <div className="border-2 border-dashed border-line rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Camera size={24} className="text-ink-3" />
              </div>
              <p className="text-ink-2 text-sm mb-4">
                Объявление с фотографиями получает в 5 раз больше просмотров
              </p>
              <button className="bg-slate-50 text-ink-2 px-6 py-3 rounded-lg font-medium">
                Добавить фото
              </button>
            </div>
          </div>

          {/* Состояние */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-ink font-medium mb-3">
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
                    className="mr-3 w-4 h-4 text-brand focus:ring-brand/30"
                  />
                  <span className="text-ink">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Контактная информация */}
          <div className="bg-white rounded-lg p-4">
            <label className="block text-ink font-medium mb-3">
              Контактная информация
            </label>
            <p className="text-ink-2 text-sm mb-4">
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
                    className="mr-3 w-4 h-4 text-brand focus:ring-brand/30"
                  />
                  <span className="text-ink">{type}</span>
                </label>
              ))}
            </div>
            
            {/* Телефоны */}
            <label className="block text-ink font-medium mb-3">
              Телефоны
            </label>
            <input 
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 mb-4"
            />
            
            {/* Согласие */}
            <label className="flex items-start gap-3">
              <input 
                type="checkbox"
                className="mt-1 w-4 h-4 text-brand focus:ring-brand/30 rounded"
              />
              <span className="text-ink-2 text-sm">
                Согласен с правилами размещения объявлений
              </span>
            </label>
          </div>

          {/* Кнопка продолжить */}
          <button className="w-full bg-brand text-ink py-4 rounded-lg font-medium text-lg">
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListingPage; 
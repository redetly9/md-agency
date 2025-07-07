'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Settings, User, ChevronRight, Plus } from 'lucide-react';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('active'); // 'active' или 'inactive'

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Шапка */}
            <header className="bg-white px-4 py-3">
                <div className="max-w-screen-md mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-900">Личный кабинет</h1>
                    <Link href="/profile/settings">
                        <Settings size={24} className="text-gray-600" />
                    </Link>
                </div>
            </header>

            {/* Основной контент */}
            <main className="flex-grow px-4 py-6 pb-20">
                <div className="max-w-screen-md mx-auto space-y-4">
                    {/* Профиль пользователя */}
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <User size={32} className="text-gray-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">
                                    user@example.com
                                </h2>
                                <p className="text-gray-500">Хозяин</p>
                                <p className="text-gray-400 text-sm">Кабинет №1234</p>
                            </div>
                        </div>
                    </div>

                    {/* Баланс */}
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900">0 ед.</h3>
                            </div>
                            <button className="bg-teal-500 text-white px-6 py-2 rounded-lg font-medium">
                                Пополнить
                            </button>
                        </div>
                    </div>

                    {/* Счет и платежи */}
                    <Link href="/payments" className="bg-white rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-900">Счёт и платежи</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </Link>

                    {/* Мои объявления */}
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex gap-2 mb-6">
                            <button 
                                className={`flex-1 py-3 rounded-lg text-center font-medium ${
                                    activeTab === 'active' 
                                    ? 'bg-teal-500 text-white' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                                onClick={() => setActiveTab('active')}
                            >
                                Активные
                            </button>
                            <button 
                                className={`flex-1 py-3 rounded-lg text-center font-medium ${
                                    activeTab === 'inactive' 
                                    ? 'bg-teal-500 text-white' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                                onClick={() => setActiveTab('inactive')}
                            >
                                Неактивные
                            </button>
                        </div>

                        {/* Пустое состояние */}
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                            </div>
                            <p className="text-gray-500 text-center mb-6">
                                Ваши объявления увидят тысячи покупателей и арендаторов недвижимости
                            </p>
                        </div>

                        {/* Кнопка добавления объявления */}
                        <Link href="/add-listing" className="w-full bg-teal-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium">
                            <Plus size={20} />
                            Подать объявление
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
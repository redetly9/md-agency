'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

const ProfilePage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('active'); // 'active' или 'inactive'

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Шапка */}
            <header className="bg-white border-b px-4 py-3">
                <div className="max-w-screen-md mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-textPrimary">Личный кабинет</h1>
                    <Link href="/settings">
                        <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </Link>
                </div>
            </header>

            {/* Основной контент */}
            <main className="flex-grow px-4 py-4">
                <div className="max-w-screen-md mx-auto">
                    {/* Профиль пользователя */}
                    <div className="bg-white rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-medium text-textPrimary">
                                    {user?.email || 'id23603253'}
                                </h2>
                                <p className="text-gray-500">Хозяин</p>
                            </div>
                        </div>
                    </div>

                    {/* Баланс и номер кабинета */}
                    <div className="bg-white rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h3 className="text-2xl font-bold">0 ед.</h3>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <span>№ кабинета: 1217043</span>
                                    <button className="text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button className="bg-primary/10 text-primary px-6 py-2 rounded-lg font-medium">
                                Пополнить
                            </button>
                        </div>
                    </div>

                    {/* Счет и платежи */}
                    <Link href="/payments" className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                            </svg>
                            <span className="text-textPrimary">Счёт и платежи</span>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </Link>

                    {/* Мои объявления */}
                    <div className="bg-white rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-4">Мои объявления</h3>
                        <div className="flex gap-2 mb-4">
                            <button 
                                className={`flex-1 py-2 rounded-lg text-center ${
                                    activeTab === 'active' 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'bg-gray-100 text-gray-500'
                                }`}
                                onClick={() => setActiveTab('active')}
                            >
                                Активные
                            </button>
                            <button 
                                className={`flex-1 py-2 rounded-lg text-center ${
                                    activeTab === 'inactive' 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'bg-gray-100 text-gray-500'
                                }`}
                                onClick={() => setActiveTab('inactive')}
                            >
                                Неактивные
                            </button>
                        </div>
                        <p className="text-gray-500 text-center mb-4">
                            Ваши объявления увидят тысячи покупателей и арендаторов недвижимости
                        </p>
                        <button className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Подать объявление
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
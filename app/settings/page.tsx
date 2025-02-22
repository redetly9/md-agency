'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Шапка */}
            <header className="bg-white border-b px-4 py-3">
                <div className="max-w-screen-md mx-auto flex items-center gap-3">
                    <button onClick={() => router.back()} className="text-gray-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <h1 className="text-xl font-medium text-textPrimary">Настройки</h1>
                </div>
            </header>

            {/* Основной контент */}
            <main className="flex-grow px-4 py-4">
                <div className="max-w-screen-md mx-auto">
                    {/* Профиль */}
                    <div className="bg-white rounded-lg overflow-hidden mb-4">
                        <div className="p-4">
                            <h2 className="text-lg font-medium text-textPrimary mb-4">Профиль</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Имя</p>
                                        <p className="text-textPrimary">{user?.user_metadata?.name || 'Не указано'}</p>
                                    </div>
                                    <button className="text-primary">
                                        Изменить
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-textPrimary">{user?.email}</p>
                                    </div>
                                    <button className="text-primary">
                                        Изменить
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Телефон</p>
                                        <p className="text-textPrimary">{user?.phone || 'Не указан'}</p>
                                    </div>
                                    <button className="text-primary">
                                        Изменить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Безопасность */}
                    <div className="bg-white rounded-lg overflow-hidden mb-4">
                        <div className="p-4">
                            <h2 className="text-lg font-medium text-textPrimary mb-4">Безопасность</h2>
                            <div className="space-y-4">
                                <Link 
                                    href="/settings/password" 
                                    className="flex items-center justify-between text-textPrimary"
                                >
                                    <span>Изменить пароль</span>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Уведомления */}
                    <div className="bg-white rounded-lg overflow-hidden mb-4">
                        <div className="p-4">
                            <h2 className="text-lg font-medium text-textPrimary mb-4">Уведомления</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-textPrimary">Push-уведомления</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-textPrimary">Email-уведомления</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Выход */}
                    <button 
                        onClick={handleLogout}
                        className="w-full bg-white text-red-500 py-4 rounded-lg font-medium"
                    >
                        Выйти
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage; 
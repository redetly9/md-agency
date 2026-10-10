'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Если пользователь не авторизован, редиректим на страницу входа
    React.useEffect(() => {
        if (!user && !isLoggingOut) {
            router.push('/login');
        }
    }, [user, router, isLoggingOut]);

    // Показываем загрузку или пустой экран пока идет процесс выхода
    if (isLoggingOut || !user) {
        return <div className="flex min-h-screen items-center justify-center">
            <div className="text-white/55">Загрузка...</div>
        </div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Шапка */}
            <header className="bg-[#122037] border-b px-4 py-3">
                <div className="max-w-screen-md mx-auto flex items-center gap-3">
                    <button onClick={() => router.back()} className="text-white/55">
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
                    <div className="bg-[#122037] rounded-lg overflow-hidden mb-4">
                        <div className="p-4">
                            <h2 className="text-lg font-medium text-textPrimary mb-4">Профиль</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-white/55">Имя</p>
                                        <p className="text-textPrimary">{user?.user_metadata?.name || 'Не указано'}</p>
                                    </div>
                                    <button className="text-primary">
                                        Изменить
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-white/55">Email</p>
                                        <p className="text-textPrimary">{user?.email}</p>
                                    </div>
                                    <button className="text-primary">
                                        Изменить
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-white/55">Телефон</p>
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
                    <div className="bg-[#122037] rounded-lg overflow-hidden mb-4">
                        <div className="p-4">
                            <h2 className="text-lg font-medium text-textPrimary mb-4">Безопасность</h2>
                            <div className="space-y-4">
                                <Link 
                                    href="/settings/password" 
                                    className="flex items-center justify-between text-textPrimary"
                                >
                                    <span>Изменить пароль</span>
                                    <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Уведомления */}
                    <div className="bg-[#122037] rounded-lg overflow-hidden mb-4">
                        <div className="p-4">
                            <h2 className="text-lg font-medium text-textPrimary mb-4">Уведомления</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-textPrimary">Push-уведомления</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4af5a]"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-textPrimary">Email-уведомления</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4af5a]"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Выход */}
                    <button 
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full bg-[#122037] text-red-500 py-4 rounded-lg font-medium disabled:opacity-50"
                    >
                        {isLoggingOut ? 'Выход...' : 'Выйти'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage; 
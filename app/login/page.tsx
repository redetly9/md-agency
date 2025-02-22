import Auth from '@/components/Auth';
import React from 'react';

const LoginPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Шапка */}
            <header className="bg-white border-b px-4 py-3">
                <div className="max-w-screen-md mx-auto">
                    <h1 className="text-2xl font-bold text-textPrimary">Вход</h1>
                </div>
            </header>

            {/* Основной контент */}
            <main className="flex-grow flex items-center justify-center px-4 py-4">
                <div className="w-full max-w-md">
                    <Auth />
                </div>
            </main>
        </div>
    );
};

export default LoginPage; 
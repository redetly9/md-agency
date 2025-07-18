'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Plus, MessageCircle, User } from 'lucide-react';

const Footer: React.FC = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    
    // Специальный футер для страницы добавления объявления
    if (pathname === '/add-listing') {
        return (
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-20">
                <div className="max-w-screen-md mx-auto h-full flex items-center justify-center px-4">
                    <button className="w-full max-w-sm bg-[#4ECDC4] text-white py-4 rounded-2xl font-medium text-lg flex items-center justify-center gap-2">
                        <Plus size={24} />
                        Подать объявление
                    </button>
                </div>
            </footer>
        );
    }

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-20">
            <div className="max-w-screen-md mx-auto h-full">
                <div className="flex items-center justify-around h-full">
                    <Link 
                        href="/" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/') ? 'text-primary' : 'text-gray-600'
                        }`}
                    >
                        <Home size={24} />
                        <span className="text-xs mt-1 text-[#4B5563] font-light">Главная</span>
                    </Link>
                    
                    <Link 
                        href="/favoritess" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/favoritess') ? 'text-primary' : 'text-gray-600'
                        }`}
                    >
                        <Heart size={24} />
                        <span className="text-xs mt-1 text-[#4B5563] font-light">Избранное</span>
                    </Link>
                    
                    <Link 
                        href="/add-listing" 
                        className="flex flex-col items-center justify-center py-2 px-3 h-16"
                    >
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0" style={{ borderRadius: '50%', minWidth: '48px', minHeight: '48px', maxWidth: '48px', maxHeight: '48px' }}>
                            <Plus size={24} className="text-white" />
                        </div>
                        <span className="text-xs text-gray-600 mt-1 text-[#4B5563] font-light">Подать</span>
                    </Link>
                    
                    <Link 
                        href="/messages" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/messages') ? 'text-primary' : 'text-gray-600'
                        }`}
                    >
                        <MessageCircle size={24} />
                        <span className="text-xs mt-1 text-[#4B5563] font-light">Сообщения</span>
                    </Link>
                    
                    <Link 
                        href="/profiles" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/profiles') ? 'text-primary' : 'text-gray-600'
                        }`}
                    >
                        <User size={24} />
                        <span className="text-xs mt-1 text-[#4B5563] font-light">Кабинет</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 
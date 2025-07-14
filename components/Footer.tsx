'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Plus, MessageCircle, User } from 'lucide-react';

const Footer: React.FC = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-20">
            <div className="max-w-screen-md mx-auto px-4 h-full">
                <div className="flex items-center justify-around h-full">
                    <Link 
                        href="/" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/') ? 'text-primary' : 'text-gray-600'
                        }`}
                    >
                        <Home size={24} />
                        <span className="text-xs mt-1">Главная</span>
                    </Link>
                    
                    <Link 
                        href="/favoritess" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/favoritess') ? 'text-primary' : 'text-gray-600'
                        }`}
                    >
                        <Heart size={24} />
                        <span className="text-xs mt-1">Избранное</span>
                    </Link>
                    
                    <Link 
                        href="/add-listing" 
                        className="flex flex-col items-center justify-center py-2 px-3 h-16"
                    >
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                            <Plus size={24} className="text-white" />
                        </div>
                        <span className="text-xs text-gray-600 mt-1">Подать</span>
                    </Link>
                    
                    <Link 
                        href="/messages" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/messages') ? 'text-primary' : 'text-gray-600'
                        }`}
                    >
                        <MessageCircle size={24} />
                        <span className="text-xs mt-1">Сообщения</span>
                    </Link>
                    
                    <Link 
                        href="/profiles" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/profiles') ? 'text-primary' : 'text-gray-600'
                        }`}
                    >
                        <User size={24} />
                        <span className="text-xs mt-1">Кабинет</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 
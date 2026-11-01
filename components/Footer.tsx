'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Plus, MessageCircle, User } from 'lucide-react';

const Footer: React.FC = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    


    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-line z-50 h-20">
            <div className="max-w-screen-md mx-auto h-full">
                <div className="flex items-center justify-around h-full">
                    <Link 
                        href="/" 
                        className={`flex flex-col items-center justify-center py-2 px-1 flex-1 min-w-0 rounded-lg transition-colors h-16 ${
                            isActive('/') ? 'text-brand' : 'text-ink-2'
                        }`}
                    >
                        <Home size={24} />
                        <span className="text-[11px] mt-1 text-ink-2 font-light whitespace-nowrap">Главная</span>
                    </Link>
                    
                    <Link 
                        href="/favoritess" 
                        className={`flex flex-col items-center justify-center py-2 px-1 flex-1 min-w-0 rounded-lg transition-colors h-16 ${
                            isActive('/favoritess') ? 'text-brand' : 'text-ink-2'
                        }`}
                    >
                        <Heart size={24} />
                        <span className="text-[11px] mt-1 text-ink-2 font-light whitespace-nowrap">Избранное</span>
                    </Link>
                    
				<Link 
						href="/add-listing" 
						className={`flex flex-col items-center justify-center py-2 px-1 flex-1 min-w-0 rounded-lg transition-colors h-16 ${
							isActive('/add-listing') ? 'text-brand' : 'text-ink-2'
						}`}
					>
						<div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center">
							<Plus size={20} className="text-ink" />
						</div>
						<span className="text-[11px] mt-1 text-ink-2 font-light whitespace-nowrap">Подать</span>
					</Link>
				
                    <Link 
                        href="/messages" 
                        className={`flex flex-col items-center justify-center py-2 px-1 flex-1 min-w-0 rounded-lg transition-colors h-16 ${
                            isActive('/messages') ? 'text-brand' : 'text-ink-2'
                        }`}
                    >
                        <MessageCircle size={24} />
                        <span className="text-[11px] mt-1 text-ink-2 font-light whitespace-nowrap">Сообщения</span>
                    </Link>

                    <Link 
                        href="/profiles" 
                        className={`flex flex-col items-center justify-center py-2 px-1 flex-1 min-w-0 rounded-lg transition-colors h-16 ${
                            pathname.startsWith('/profiles') ? 'text-brand' : 'text-ink-2'
                        }`}
                    >
                        <User size={24} />
                        <span className="text-[11px] mt-1 text-ink-2 font-light whitespace-nowrap">Кабинет</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 
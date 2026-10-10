'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Plus, MessageCircle, User } from 'lucide-react';

const Footer: React.FC = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    


    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-[#122037] border-t border-white/10 z-50 h-20">
            <div className="max-w-screen-md mx-auto h-full">
                <div className="flex items-center justify-around h-full">
                    <Link 
                        href="/" 
                        className={`flex flex-col items-center justify-center py-2 px-1 flex-1 min-w-0 rounded-lg transition-colors h-16 ${
                            isActive('/') ? 'text-[#e6c87a]' : 'text-white/75'
                        }`}
                    >
                        <Home size={24} />
                        <span className="text-[11px] mt-1 text-white/55 font-light whitespace-nowrap">Главная</span>
                    </Link>
                    
                    <Link 
                        href="/favoritess" 
                        className={`flex flex-col items-center justify-center py-2 px-1 flex-1 min-w-0 rounded-lg transition-colors h-16 ${
                            isActive('/favoritess') ? 'text-[#e6c87a]' : 'text-white/75'
                        }`}
                    >
                        <Heart size={24} />
                        <span className="text-[11px] mt-1 text-white/55 font-light whitespace-nowrap">Избранное</span>
                    </Link>
                    
				<Link 
						href="/add-listing" 
						className={`flex flex-col items-center justify-center py-2 px-1 flex-1 min-w-0 rounded-lg transition-colors h-16 ${
							isActive('/add-listing') ? 'text-[#e6c87a]' : 'text-white/75'
						}`}
					>
						<div className="w-10 h-10 bg-[#d4af5a] rounded-full flex items-center justify-center">
							<Plus size={20} className="text-white" />
						</div>
						<span className="text-[11px] mt-1 text-white/55 font-light whitespace-nowrap">Подать</span>
					</Link>
				
                    <Link 
                        href="/messages" 
                        className={`flex flex-col items-center justify-center py-2 px-1 flex-1 min-w-0 rounded-lg transition-colors h-16 ${
                            isActive('/messages') ? 'text-[#e6c87a]' : 'text-white/75'
                        }`}
                    >
                        <MessageCircle size={24} />
                        <span className="text-[11px] mt-1 text-white/55 font-light whitespace-nowrap">Сообщения</span>
                    </Link>

                    <Link 
                        href="/profiles" 
                        className={`flex flex-col items-center justify-center py-2 px-1 flex-1 min-w-0 rounded-lg transition-colors h-16 ${
                            pathname.startsWith('/profiles') ? 'text-[#e6c87a]' : 'text-white/75'
                        }`}
                    >
                        <User size={24} />
                        <span className="text-[11px] mt-1 text-white/55 font-light whitespace-nowrap">Кабинет</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 
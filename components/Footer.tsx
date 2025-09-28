'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Plus, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    


    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-20">
            <div className="max-w-screen-md mx-auto h-full">
                <div className="flex items-center justify-around h-full">
                    <Link 
                        href="/" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/') ? 'text-[#016a80]' : 'text-gray-600'
                        }`}
                    >
                        <Home size={24} />
                        <span className="text-xs mt-1 text-[#4B5563] font-light">Главная</span>
                    </Link>
                    
                    <Link 
                        href="/favoritess" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/favoritess') ? 'text-[#016a80]' : 'text-gray-600'
                        }`}
                    >
                        <Heart size={24} />
                        <span className="text-xs mt-1 text-[#4B5563] font-light">Избранное</span>
                    </Link>
                    
				<Link 
						href="/add-listing" 
						className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
							isActive('/add-listing') ? 'text-[#016a80]' : 'text-gray-600'
						}`}
					>
						<div className="w-10 h-10 bg-[#016a80] rounded-full flex items-center justify-center">
							<Plus size={20} className="text-white" />
						</div>
						<span className="text-xs mt-1 text-[#4B5563] font-light">Подать</span>
					</Link>
				
                    <Link 
                        href="/messages" 
                        className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors h-16 ${
                            isActive('/messages') ? 'text-[#016a80]' : 'text-gray-600'
                        }`}
                    >
                        <MessageCircle size={24} />
                        <span className="text-xs mt-1 text-[#4B5563] font-light">Сообщения</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 
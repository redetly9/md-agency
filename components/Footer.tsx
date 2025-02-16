'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
            <div className="max-w-screen-md mx-auto px-4 py-2">
                <div className="flex justify-between items-center">
                    <Link href="/" className={`flex flex-col items-center ${isActive('/') ? 'text-primary' : 'text-gray-400'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <span className="text-xs">md.kz</span>
                    </Link>
                    <Link href="/favorites" className={`flex flex-col items-center ${isActive('/favorites') ? 'text-primary' : 'text-gray-400'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                        <span className="text-xs">Избранное</span>
                    </Link>
                    <button className="flex flex-col items-center text-textSecondary">
                        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center -mt-5">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                            </svg>
                        </div>
                        <span className="text-xs -mt-1">Подать</span>
                    </button>
                    <Link href="/messages" className={`flex flex-col items-center ${isActive('/messages') ? 'text-primary' : 'text-gray-400'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        <span className="text-xs">Сообщения</span>
                    </Link>
                    <Link href="/profile" className={`flex flex-col items-center ${isActive('/profile') ? 'text-primary' : 'text-gray-400'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <span className="text-xs">Кабинет</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 
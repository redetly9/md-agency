import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-[#122037] border-b px-4 py-3">
            <div className="max-w-screen-md mx-auto">
                <Link href="/" className="text-2xl font-bold">
                    <img src="/teaser/logo.svg" alt="MD" className="h-8" />
                </Link>
            </div>
        </header>
    );
};

export default Header; 
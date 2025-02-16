import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-white border-b px-4 py-3">
            <div className="max-w-screen-md mx-auto">
                <Link href="/" className="text-2xl font-bold">
                    md.kz
                </Link>
            </div>
        </header>
    );
};

export default Header; 
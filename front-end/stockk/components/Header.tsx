import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-background p-4 border-b border-gray-400">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-7xl pl-3">Stockk</h1>
                <div className="flex space-x-16 text-text font-medium text-5xl px-8">
                    <Link href="/login" legacyBehavior>
                        <a>Login</a>
                    </Link>
                    <Link href="/register" legacyBehavior>
                        <a>Register</a>
                    </Link>
                    <Link href="/stock" legacyBehavior>
                        <a>Stock</a>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

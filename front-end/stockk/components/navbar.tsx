import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4 mt-8">
            <div className="container mx-auto flex justify-center items-center">
                <div className="flex space-x-8 text-white text-2xl">
                    <Link href="/login" legacyBehavior>
                        <a className="hover:text-gray-400">Login</a>
                    </Link>
                    <Link href="/stock" legacyBehavior>
                        <a className="hover:text-gray-400">Stock</a>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
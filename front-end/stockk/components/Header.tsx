import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageSwitcher from '@components/LanguageSwitcher';
import { useTranslation } from 'next-i18next';

const Navbar: React.FC = () => {
    const { t } = useTranslation('common');
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const router = useRouter();

    const handleLogout = () => {
        setLoggedInUser(null);
        sessionStorage.clear();
        router.push('/login');
    };

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        const token = sessionStorage.getItem('token');

        if (username && token) {
            setLoggedInUser(username);
        } else {
            setLoggedInUser(null);
        }
    }, []);

    return (
        <nav className="bg-background p-4 border-b border-gray-400">
            <div className="flex justify-between items-center">
                <a href="/">
                    <h1 className="font-bold text-7xl pl-3">Stockk</h1>
                </a>
                <div className="flex space-x-16 text-text font-medium text-5xl px-8">
                    {!loggedInUser && (
                        <Link href="/login" legacyBehavior>
                            <a>{t('login')}</a>
                        </Link>
                    )}
                    {!loggedInUser && (
                        <Link href="/register" legacyBehavior>
                            <a>{t('register')}</a>
                        </Link>
                    )}
                    {loggedInUser && (
                        <Link href="/stock" legacyBehavior>
                            <a>{t('stock')}</a>
                        </Link>
                    )}
                    {loggedInUser && <button onClick={handleLogout}>{t('logout')}</button>}
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const NotLoggedIn = () => {
    const { t } = useTranslation('common');
    const router = useRouter();

    return (
        <div className=" min-h-screen pt-3 flex flex-col items-center flex-grow space-y-8">
            <h1 className="text-6xl font-bold mt-52">{t('welcome_message')}</h1>
            <p className="text-4xl font-light">{t('login_message')}</p>
            <div className="flex flex-row space-x-8 pt-10">
                <div className="bg-primary px-20 py-5 border rounded-lg">
                    <button
                        className="text-4xl font-bold"
                        onClick={async () => await router.push('/login')}
                    >
                        {t('login')}
                    </button>
                </div>
                <div className="bg-secondary px-14 py-5 border rounded-lg">
                    <button
                        className="text-4xl font-bold"
                        onClick={async () => await router.push('/register')}
                    >
                        {t('register')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotLoggedIn;

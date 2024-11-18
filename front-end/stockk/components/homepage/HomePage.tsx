import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface HomePageProps {
    username: string;
}

export const HomePage: React.FC<HomePageProps> = ({ username }) => {
    const router = useRouter();

    return (
        <div className=" min-h-screen pt-3 flex flex-col items-center flex-grow space-y-8">
            <h1 className="text-6xl font-bold mt-52">Welcome to Stockk, {username} </h1>
            <p className="text-4xl font-light">You can check your stock.</p>
            <p className="text-4xl font-light">Or manage your organisation.</p>
            <div className="flex flex-row space-x-8 pt-10">
                <div className="bg-primary px-7 py-5 border rounded-lg">
                    <button
                        className="text-4xl font-bold"
                        onClick={async () => await router.push('/stock')}
                    >
                        Stock
                    </button>
                </div>
                <div className="bg-secondary px-7 py-5 border rounded-lg">
                    <button
                        className="text-4xl font-bold"
                        onClick={async () => await router.push('/organisation')}
                    >
                        Organisation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

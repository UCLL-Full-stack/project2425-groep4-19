import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface NotLoggedInProps {
    username: string;
}

export const NotLoggedIn: React.FC<NotLoggedInProps> = ({ username }) => {
    const router = useRouter();

    return (
        <div className=" min-h-screen pt-3 flex flex-col items-center flex-grow space-y-8">
            <h1 className="text-6xl font-bold mt-52">Welcome to Stockk, {username} </h1>
            <p className="text-4xl font-light">You have not been added to an organisation yet.</p>
            <p className="text-4xl font-light">Please ask your administrator to add you.</p>
            <p className="text-4xl font-light">Or create your own organisation.</p>
            <div className="bg-primary px-12 py-5 border rounded-lg">
                <button
                    className="text-4xl font-bold"
                    onClick={async () => await router.push('/create-organisation')}
                >
                    Create Organisation
                </button>
            </div>
        </div>
    );
};

export default NotLoggedIn;

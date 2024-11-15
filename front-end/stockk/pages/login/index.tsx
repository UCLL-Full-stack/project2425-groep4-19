import Navbar from '@components/Header';
import { LoginForm } from '@components/login/LoginForm';
import React from 'react';

export const LoginPage = () => {
    return (
        <>
            <Navbar />
            <div className="relative bg-background">
                <div className=" min-h-screen pt-3 flex flex-col items-center flex-grow space-y-8">
                    <LoginForm />
                </div>
            </div>
        </>
    );
};

export default LoginPage;

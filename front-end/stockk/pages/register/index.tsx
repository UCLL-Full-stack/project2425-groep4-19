import Navbar from '@components/Header';
import { LoginForm } from '@components/account/LoginForm';
import { RegisterForm } from '@components/account/RegisterForm';
import React from 'react';

export const RegisterPage = () => {
    return (
        <>
            <Navbar />
            <div className="relative bg-background">
                <div className=" min-h-screen pt-3 flex flex-col items-center flex-grow space-y-8">
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default RegisterPage;

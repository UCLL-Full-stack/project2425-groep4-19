import UserService from '@services/UserService';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const router = useRouter();

    const validate = () => {
        let result = true;
        if (email.length === 0) {
            setEmailError('Email is incorrect');
            result = false;
        }

        if (password.length === 0) {
            setPasswordError('Password is incorrect');
            result = false;
        }
        return result;
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
        setLoginError('');
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        const validateBool = validate();
        if (!validateBool) {
            return;
        }

        try {
            const data = await UserService.userLogin({ email, password });
            console.log('Login response data:', data); // Log the response data
            if (data && data.token) {
                sessionStorage.setItem('username', email);
                sessionStorage.setItem('token', JSON.stringify(data.token));
                console.log('Successful login'); // Log successful login
                router.push('/');
            } else {
                console.error('Login failed: No token received');
                setLoginError('Username or password is wrong'); // Set login error message
            }
        } catch (error: any) {
            console.error('Login error:', error.message); // Log the error message
            if (error.message === 'Email is incorrect.') {
                setEmailError('Email is incorrect'); // Set email error message
            } else if (error.message === 'Password is incorrect.') {
                setPasswordError('Password is incorrect'); // Set password error message
            } else {
                setLoginError('Username or password is wrong'); // Set generic login error message
            }
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-600 flex justify-center h-screen mx-3 font-barlow">
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white px-6 py-8">
                    Login:
                </h1>
                <div className="flex flex-col items-center justify-center lg:py-0">
                    <label
                        className="block mb-2 text-sm font-medium text-gray dark:text-white"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-gray-50 border border-gray-300 text-black w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Login
                    </button>
                </div>
                {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}{' '}
                {/* Display login error message */}
            </form>
        </section>
    );
};

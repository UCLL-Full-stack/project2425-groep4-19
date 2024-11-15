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
            console.log('Email: ', email, 'Password: ', password);
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
        <section className=" flex justify-center h-screen mx-3 ">
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <h1 className="mt-32 text-6xl font-bold mb-24">Login</h1>
                <div className="space-y-16 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            style={{ width: '550px' }}
                            className="px-4 py-5 text-3xl bg-gray-200 rounded-lg text-text placeholder-text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-red-500 text-xl pt-2">{emailError}</p>}
                    </div>
                    <div className="flex flex-col items-center justify-center ">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            style={{ width: '550px' }}
                            className="px-4 py-5 text-3xl bg-gray-200 rounded-lg text-text placeholder-text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                            <p className="text-red-500 text-xl pt-2">{passwordError}</p>
                        )}
                    </div>
                    <div className="bg-primary px-20 py-5 border rounded-lg">
                        <button className="text-4xl font-bold" type="submit">
                            Login
                        </button>
                    </div>
                    {loginError && <p className="text-red-500 text-xl mt-2">{loginError}</p>}{' '}
                </div>
            </form>
        </section>
    );
};

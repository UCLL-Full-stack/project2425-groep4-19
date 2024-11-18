import UserService from '@services/UserService';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const router = useRouter();

    const validate = () => {
        let result = true;
        if (username.length === 0) {
            setUsernameError('Email is incorrect');
            result = false;
        }

        if (password.length === 0) {
            setPasswordError('Password is incorrect');
            result = false;
        }
        return result;
    };

    const clearErrors = () => {
        setUsernameError('');
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
            console.log('Username: ', username, 'Password: ', password);
            const data = await UserService.userLogin({ username, password });
            console.log('Login response data:', data); // Log the response data
            if (data && data.token) {
                sessionStorage.setItem('username', username);
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
                setUsernameError('Username is incorrect'); // Set username error message
            } else if (error.message === 'Password is incorrect.') {
                setPasswordError('Password is incorrect'); // Set password error message
            } else {
                setLoginError('Username or password is wrong'); // Set generic login error message
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className=" flex justify-center h-screen mx-3 ">
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <h1 className="mt-32 text-6xl font-bold mb-24">Login</h1>
                <div className="space-y-16 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            style={{ width: '550px' }}
                            className="px-4 py-5 text-3xl bg-gray-200 rounded-lg text-text placeholder-text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameError && (
                            <p className="text-red-500 text-xl pt-2">{usernameError}</p>
                        )}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative" style={{ width: '550px' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Password"
                                className="px-4 py-5 text-3xl bg-gray-200 rounded-lg text-text placeholder-text w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 pr-1"
                            >
                                {showPassword ? <FaEyeSlash size={28} /> : <FaEye size={28} />}
                            </button>
                        </div>

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

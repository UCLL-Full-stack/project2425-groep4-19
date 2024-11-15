import UserService from '@services/UserService';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [registerError, setregisterError] = useState('');
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
        setregisterError('');
    };

    //TODO - Implement handleRegister function
    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        const validateBool = validate();
        if (!validateBool) {
            return;
        }

        try {
            console.log('Email: ', email, 'Password: ', password, 'Username: ', username);
            const data = await UserService.userRegister({
                email,
                password,
                username,
                role: 'user',
            });
            console.log('Login response data:', data); // Log the response data
            if (data && data.token) {
                sessionStorage.setItem('username', email);
                sessionStorage.setItem('token', JSON.stringify(data.token));
                console.log('Successful login'); // Log successful login
                router.push('/');
            } else {
                console.error('Failed to create user!');
                setregisterError('Failed to create user!'); // Set login error message
            }
        } catch (error: any) {
            console.error('Login error:', error.message); // Log the error message
        }
    };

    return (
        <section className=" flex justify-center h-screen mx-3 ">
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                <h1 className="mt-28 text-6xl font-bold mb-24">Register</h1>
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
                            Register
                        </button>
                    </div>
                    {registerError && <p className="text-red-500 text-xl mt-2">{registerError}</p>}{' '}
                </div>
            </form>
        </section>
    );
};

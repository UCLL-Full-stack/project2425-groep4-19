import UserService from '@services/UserService';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

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

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        const validateBool = validate();
        if (!validateBool) {
            return;
        }

        try {
            // Call the userRegister function from the UserService
            const data = await UserService.userRegister({
                email,
                password,
                username,
                role: 'user',
            });
            // check if the data and token is received - this means the login was successful
            if (data && data.token) {
                // Store the username and token in the cookies
                document.cookie = `token=${data.token}; path=/;`;

                console.log('Successful register'); // Log successful login
                router.push('/');
            } else {
                console.error('Failed to create user!');
                setregisterError('Failed to create user!'); // Set login error message
            }
        } catch (error: any) {
            console.error('Login error:', error.message); // Log the error message
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                            Register
                        </button>
                    </div>
                    {registerError && <p className="text-red-500 text-xl mt-2">{registerError}</p>}{' '}
                </div>
            </form>
        </section>
    );
};

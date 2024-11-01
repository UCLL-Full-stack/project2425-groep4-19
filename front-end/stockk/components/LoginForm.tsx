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
        <>
            <div className="flex flex-col justify-center">
                <form>
                    <label>
                        Email:
                        <input type="text" name="email" />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

import React from 'react';

export const LoginForm = () => {
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

import { User } from '@types';

const userLogin = async (user: User) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(apiUrl + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'login failed');
    }
    return response.json();
};

export default {
    userLogin,
};

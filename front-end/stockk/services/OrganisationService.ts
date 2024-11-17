import { Organisation } from '@types';

const createOrganisation = async (organisation: Organisation) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const username = sessionStorage.getItem('username');
    const response = await fetch(apiUrl + '/organisations/' + username, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(organisation),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'organisation creation failed');
    }
    return response.json();
};

export default {
    createOrganisation,
};

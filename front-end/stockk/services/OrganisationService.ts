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

const getOrganisationByName = async (name: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(apiUrl + '/organisations/' + name);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'organisation fetch failed');
    }
    return response.json();
};

const getOrganisationById = async (id: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(apiUrl + '/organisations/id/' + id);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'organisation fetch failed');
    }
    return response.json();
};

export default {
    createOrganisation,
    getOrganisationByName,
    getOrganisationById,
};

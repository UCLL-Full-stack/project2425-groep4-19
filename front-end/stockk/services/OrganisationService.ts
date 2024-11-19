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

const getOrganisationByUser = async (username: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(apiUrl + '/organisations/user/' + username);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'organisation fetch failed');
    }
    return response.json();
};

const addUserToOrganisation = async (username: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const organisationName = sessionStorage.getItem('organisationName');
    if (!organisationName) {
        throw new Error('No organisation name found in session storage');
    }
    const parsedName = organisationName.replace(/["]+/g, '');
    const response = await fetch(apiUrl + '/organisations/adduser/' + username + '/' + parsedName, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'user addition failed');
    }
    return response.json();
};

export default {
    createOrganisation,
    getOrganisationByName,
    getOrganisationById,
    getOrganisationByUser,
    addUserToOrganisation,
};

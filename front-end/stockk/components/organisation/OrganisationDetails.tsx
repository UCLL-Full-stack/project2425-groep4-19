import React, { useEffect, useState } from 'react';
import OrganisationService from '@services/OrganisationService';
import { Organisation } from '@types';
import AddUserForm from './AddUserForm';

export const OrganisationDetails = () => {
    const [organisation, setOrganisation] = useState<Organisation | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        // get organisation name from session storage
        const orgName = sessionStorage.getItem('organisationName');
        if (orgName) {
            // set and remove quotes from the string
            setName(JSON.parse(orgName));
        }
        // fetch organisation by name
        const fetchOrganisation = async () => {
            if (!name) {
                throw new Error('No organisation name');
            }
            const organisation = await OrganisationService.getOrganisationByName(name);
            setOrganisation(organisation);
        };
        // call fetch function
        fetchOrganisation();
    }, []);

    return (
        <>
            <h1 className="text-6xl font-bold mt-20">{name}</h1>
            {organisation && organisation.users && (
                <table className="bg-background border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Username</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organisation.users.map((user: any) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.id}</td>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4} className="border px-4 py-2 text-center">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                                    Add User
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
            <AddUserForm />
        </>
    );
};

export default OrganisationDetails;

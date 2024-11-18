import React, { useEffect, useState } from 'react';
import OrganisationService from '@services/OrganisationService';
import { Organisation } from '@types';
import AddUserForm from './AddUserForm';

export const OrganisationDetails = () => {
    const [organisation, setOrganisation] = useState<Organisation | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);

    useEffect(() => {
        // get organisation name from session storage
        const orgName = sessionStorage.getItem('organisationName');

        if (orgName) {
            // set name and remove quotes from the string
            const parsedName = JSON.parse(orgName);
            setName(parsedName);
            console.log('Organisation name:', parsedName);

            // fetch organisation by name
            const fetchOrganisation = async () => {
                console.log('Fetching organisation:', parsedName);

                if (!parsedName) {
                    throw new Error('No organisation name');
                }
                const organisation = await OrganisationService.getOrganisationByName(parsedName);
                setOrganisation(organisation);
            };
            // call fetch function
            fetchOrganisation();
        }
    }, []);

    if (!name) {
        return <h1 className="text-6xl font-bold mt-20">No organisation name</h1>;
    }

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
                    </tbody>
                </table>
            )}
            {!showAddUserForm && (
                <div className="pt-12">
                    <div className="bg-primary px-7 py-5 border rounded-lg">
                        <button
                            className="text-4xl font-bold"
                            onClick={() => setShowAddUserForm(true)}
                        >
                            Add User
                        </button>
                    </div>
                </div>
            )}
            {showAddUserForm && <AddUserForm onCancel={() => setShowAddUserForm(false)} />}
        </>
    );
};

export default OrganisationDetails;

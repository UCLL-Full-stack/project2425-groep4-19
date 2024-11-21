import React, { useEffect, useState } from 'react';
import OrganisationService from '@services/OrganisationService';
import { Organisation } from '@types';
import AddUserForm from './AddUserForm';
import UserTable from './userTable/UserTable';

export const OrganisationDetails = () => {
    const [organisation, setOrganisation] = useState<Organisation | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    // todo - change call to users endpoint for minimal payload size
    useEffect(() => {
        // get organisation name from session storage
        const orgName = sessionStorage.getItem('organisationName');

        if (orgName) {
            // set name and remove quotes from the string
            const parsedName = orgName.replace(/["]+/g, '');

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

    const handleOnSuccessfulAdd = () => {
        // refresh organisation
        const orgName = sessionStorage.getItem('organisationName');
        if (orgName) {
            const parsedName = orgName.replace(/["]+/g, '');
            const fetchOrganisation = async () => {
                if (!parsedName) {
                    throw new Error('No organisation name');
                }
                const organisation = await OrganisationService.getOrganisationByName(parsedName);
                setOrganisation(organisation);
                console.log('Organisation:', organisation);
            };
            fetchOrganisation();
        }
        setShowAddUserForm(false);
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 2000);
    };

    if (!name) {
        return <h1 className="text-6xl font-bold mt-20">No organisation name</h1>;
    }

    return (
        <>
            <h1 className="text-6xl font-bold mt-20">{name}</h1>
            {organisation && organisation.users && <UserTable organisation={organisation} />}
            {showSuccessMessage && <p className="text-primary">Succesfully added user!</p>}
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
            {showAddUserForm && (
                <AddUserForm
                    onCancel={() => setShowAddUserForm(false)}
                    onSuccessfulAdd={() => handleOnSuccessfulAdd()}
                />
            )}
        </>
    );
};

export default OrganisationDetails;

import Navbar from '@components/Header';
import { OrganisationForm } from '@components/organisation/OrganisationForm';
import React from 'react';

export const CreateOrganisation = () => {
    return (
        <>
            <Navbar />
            <div className="relative bg-background">
                <OrganisationForm />
            </div>
        </>
    );
};

export default CreateOrganisation;

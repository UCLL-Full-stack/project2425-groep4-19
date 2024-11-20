import Navbar from '@components/Header';
import OrganisationDetails from '@components/organisation/OrganisationDetails';
import React from 'react';

export const Organisation = () => {
    return (
        <>
            <Navbar />
            <div className="relative bg-background">
                <div className=" min-h-screen pt-3 flex flex-col items-center flex-grow space-y-8">
                    <OrganisationDetails />
                </div>
            </div>
        </>
    );
};

export default Organisation;

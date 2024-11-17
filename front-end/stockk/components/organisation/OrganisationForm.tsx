import OrganisationService from '@services/OrganisationService';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const OrganisationForm = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [createError, setCreateError] = useState('');
    const router = useRouter();

    const validate = () => {
        let result = true;
        if (name.length === 0) {
            setNameError('Email is incorrect');
            result = false;
        }
        return result;
    };

    const clearErrors = () => {
        setNameError('');
        setCreateError('');
    };

    const handleCreateOrganisation = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        const validateBool = validate();
        if (!validateBool) {
            return;
        }

        try {
            const data = await OrganisationService.createOrganisation({ name });
            console.log('Organisation creation response data:', data); // Log the response data
            if (data) {
                sessionStorage.setItem('organisationName', JSON.stringify(data.name));
                console.log('Successful creation'); // Log successful creation
                router.push('/');
            } else {
                console.error('Creation failed');
                setCreateError('Organisation could not be created'); // Set create error message
            }
        } catch (error: any) {
            console.error('Creation error:', error.message); // Log the error message
            setCreateError('Organisation could not be created'); // Set create error message
        }
    };

    return (
        <section className=" flex justify-center h-screen mx-3 ">
            <form className="space-y-4 md:space-y-6" onSubmit={handleCreateOrganisation}>
                <h1 className="mt-32 text-6xl font-bold mb-24">Create Organisation</h1>
                <div className="space-y-16 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            style={{ width: '550px' }}
                            className="px-4 py-5 text-3xl bg-gray-200 rounded-lg text-text placeholder-text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {nameError && <p className="text-red-500 text-xl pt-2">{nameError}</p>}
                    </div>
                    <div className="bg-primary px-20 py-5 border rounded-lg">
                        <button className="text-4xl font-bold" type="submit">
                            Create
                        </button>
                    </div>
                    {createError && <p className="text-red-500 text-xl mt-2">{createError}</p>}
                </div>
            </form>
        </section>
    );
};

export default OrganisationForm;

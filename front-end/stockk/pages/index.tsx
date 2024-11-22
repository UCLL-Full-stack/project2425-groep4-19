import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from '@components/Header';
import NotLoggedIn from '@components/homepage/NotLoggedIn';
import NotAssignedToOrganisation from '@components/homepage/NotAssignedToOrganisation';
import HomePage from '@components/homepage/HomePage';

import { jwtDecode, JwtPayload } from 'jwt-decode';
import utils from '@services/utils';

interface CustomJwtPayload extends JwtPayload {
    role?: 'user' | 'manager' | 'admin';
    username: string;
    organisationId: string;
}

const Home: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [organisation, setOrganisation] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = utils.getCookie('token');
        console.log('Token:', token);

        if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token);

            const username = decodedToken.username;
            const organisationId = decodedToken.organisationId;
            console.log('Organisation ID:', organisationId);

            setLoggedInUser(username);
            if (organisationId) {
                console.log('User is logged in and assigned to an organisation');
                setOrganisation(organisationId);
            }
        } else {
            console.log('No token found');
            router.push('/login');
            setLoggedInUser(null);
            setOrganisation(null);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Demo Project</title>
                <meta name="description" content="Exam app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.webp" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Navbar />
            <div className="relative bg-background">
                <>
                    {!loggedInUser && !organisation && <NotLoggedIn />}
                    {loggedInUser && !organisation && (
                        <NotAssignedToOrganisation username={loggedInUser} />
                    )}
                    {loggedInUser && organisation && <HomePage username={loggedInUser} />}
                </>
            </div>
        </>
    );
};

export default Home;

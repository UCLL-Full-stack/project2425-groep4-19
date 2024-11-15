import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { LoginForm } from '../components/account/LoginForm';
import Navbar from '../components/Header'; // Adjust the path as necessary
import { useRouter } from 'next/router';
import NotLoggedIn from '@components/homepage/NotLoggedIn';
import NotAssignedToOrganisation from '@components/homepage/NotAssignedToOrganisation';

const Home: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        const token = sessionStorage.getItem('token');

        if (username && token) {
            setLoggedInUser(username);
        } else {
            setLoggedInUser(null);
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
                    {!loggedInUser && <NotLoggedIn />}
                    {loggedInUser && <NotAssignedToOrganisation username={loggedInUser} />}
                </>
            </div>
        </>
    );
};

export default Home;

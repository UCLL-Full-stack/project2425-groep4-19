import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { LoginForm } from '../components/account/LoginForm';
import Navbar from '../components/Header'; // Adjust the path as necessary
import { useRouter } from 'next/router';
import NotLoggedIn from '@components/homepage/NotLoggedIn';
import NotAssignedToOrganisation from '@components/homepage/NotAssignedToOrganisation';
import OrganisationForm from '@components/organisation/OrganisationForm';
import HomePage from '@components/homepage/HomePage';
import OrganisationService from '@services/OrganisationService';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: React.FC = () => {
    const { t } = useTranslation('common');
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [organisation, setOrganisation] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        const token = sessionStorage.getItem('token');
        const organisationName = sessionStorage.getItem('organisationName');

        if (username && token) {
            setLoggedInUser(username);
            setOrganisation(organisationName);
        } else {
            setLoggedInUser(null);
            setOrganisation(null);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{t('title')}</title>
                <meta name="description" content={t('description')} />
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

export const getStaticProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default Home;

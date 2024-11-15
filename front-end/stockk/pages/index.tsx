import React from 'react';
import Head from 'next/head';
import { LoginForm } from '../components/login/LoginForm';
import Navbar from '../components/Header'; // Adjust the path as necessary

const Home: React.FC = () => {
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
                <div className=" min-h-screen pt-3 flex flex-col items-center flex-grow space-y-8">
                    <h1 className="text-6xl font-bold mt-52">Welcome to Stockk</h1>
                    <p className="text-4xl font-light">Please log in or register</p>
                    <div className="flex flex-row space-x-8 pt-10">
                        <div className="bg-primary px-20 py-5 border rounded-lg">
                            <button className="text-4xl font-bold ">Login</button>
                        </div>
                        <div className="bg-secondary px-14 py-5 border rounded-lg">
                            <button className="text-4xl font-bold ">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

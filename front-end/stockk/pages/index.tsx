import Head from 'next/head';
import { LoginForm } from '../components/LoginForm';

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

            <div className="relative">
                <div className="bg-custom-image bg-cover bg-center min-h-screen pt-3 flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <h1 className="text-white text-4xl mb-8">Stockk - A stock counting app</h1>
                        <div className="flex-grow flex items-center justify-between"></div>
                    </div>
                </div>
            </div>
            <LoginForm />
        </>
    );
};

export default Home;

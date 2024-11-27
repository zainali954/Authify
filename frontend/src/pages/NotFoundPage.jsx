import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { IconExclamationMark } from '@tabler/icons-react';

const NotFoundPage = () => {
    const navigate = useNavigate(); 

    const handleGoHome = () => {
        navigate('/'); 
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-900 text-center">
            <IconExclamationMark size={100} className="text-red-500 mb-4" />
            <h1 className="text-4xl font-bold mb-2 text-zinc-800 dark:text-zinc-100">404 - Page Not Found</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-4">
                Oops! It looks like the page you were looking for doesn't exist.
            </p>
            <button
                onClick={handleGoHome}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default NotFoundPage;

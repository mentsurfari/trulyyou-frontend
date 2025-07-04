
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import the centralized api client

const GeneralForumRedirectPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getGeneralForum = async () => {
            try {
                // Use the centralized api client
                const response = await api.get('/api/cohorts/general-forum');
                const cohortId = response.data._id;
                if (cohortId) {
                    navigate(`/sanctuary/cohorts/${cohortId}`, { replace: true });
                } else {
                    setError('Could not find the General Forum.');
                }
            } catch (err) {
                console.error("Failed to fetch general forum:", err);
                setError('There was an error accessing the General Forum. Please try again later.');
            }
        };

        getGeneralForum();
    }, [navigate]);

    return (
        <div className="flex flex-col justify-center items-center py-40 text-center">
            {error ? (
                <>
                    <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
                    <button onClick={() => navigate('/sanctuary')} className="mt-4 bg-brand-teal text-white font-semibold px-6 py-2 rounded-full">
                        Back to The Sanctuary
                    </button>
                </>

            ) : (
                <>
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-teal"></div>
                    <p className="mt-4 text-slate-600">Entering The Sanctuary...</p>
                </>
            )}
        </div>
    );
};

export default GeneralForumRedirectPage;

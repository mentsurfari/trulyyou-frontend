
import React, { useState, useEffect } from 'react';
import api from '../api';

interface Candidate {
    motivationCompass: {
        profile: string;
        scores: Record<string, number>;
    };
    prepKit: {
        journeyWhy: string;
        hopes: string;
        fears: string;
        desiredFeelings: string;
    };
}

const PageHeader: React.FC<{ title: string; subtitle: string; }> = ({ title, subtitle }) => (
    <div className="bg-brand-light-gray border-b border-gray-200">
        <div className="container mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-deep-blue">{title}</h1>
            <p className="mt-2 text-slate-600 max-w-2xl">{subtitle}</p>
        </div>
    </div>
);

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold font-serif text-brand-teal mb-4">
            {candidate.motivationCompass.profile} Profile
        </h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-brand-charcoal">Core Motivation (My 'Why')</h4>
                <p className="text-slate-600 italic mt-1 bg-gray-50 p-2 rounded">"{candidate.prepKit.journeyWhy}"</p>
            </div>
             <div>
                <h4 className="font-semibold text-brand-charcoal">Hopes</h4>
                <p className="text-slate-600 italic mt-1 bg-gray-50 p-2 rounded">"{candidate.prepKit.hopes}"</p>
            </div>
             <div>
                <h4 className="font-semibold text-brand-charcoal">Fears</h4>
                <p className="text-slate-600 italic mt-1 bg-gray-50 p-2 rounded">"{candidate.prepKit.fears}"</p>
            </div>
        </div>
    </div>
);

const SurgeonDashboardPage: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCandidates = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/api/users/qualified-candidates');
                setCandidates(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load candidates.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCandidates();
    }, []);

    return (
        <div>
            <PageHeader
                title="Surgeon Portal"
                subtitle="Review anonymized profiles of qualified, psychologically-prepared candidates."
            />
            <div className="container mx-auto px-6 py-12">
                {isLoading ? (
                    <p className="text-center">Loading candidates...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : candidates.length === 0 ? (
                    <div className="text-center bg-white p-10 rounded-lg shadow-md border">
                        <h3 className="text-2xl font-serif text-brand-charcoal">No Qualified Candidates Yet</h3>
                        <p className="text-slate-500 mt-2">Check back later as new members complete their preparation journey.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {candidates.map((candidate, index) => (
                            <CandidateCard key={index} candidate={candidate} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SurgeonDashboardPage;

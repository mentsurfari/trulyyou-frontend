

import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader: React.FC<{ title: string; subtitle: string; imageUrl: string; }> = ({ title, subtitle, imageUrl }) => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-brand-deep-blue/60" />
        <div className="relative container mx-auto px-6 py-20 md:py-24 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-white">{title}</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">{subtitle}</p>
        </div>
    </div>
);

const FeatureCard: React.FC<{ title: string, description: string, ctaLink: string, ctaText: string, icon: React.ReactNode, imageUrl: string, disabled?: boolean }> = 
({ title, description, ctaLink, ctaText, icon, imageUrl, disabled = false }) => (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 ${disabled ? 'opacity-60' : 'hover:shadow-xl hover:-translate-y-1'}`}>
        <div className="relative h-56 bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
            <div className="absolute inset-0 bg-brand-deep-blue/40" />
        </div>
        <div className="p-8 text-center flex flex-col items-center flex-grow -mt-16">
             <div className="bg-brand-light-teal p-4 rounded-full mb-4 z-10 border-4 border-white shadow-md">
                {icon}
            </div>
            <h3 className="text-2xl font-bold font-serif text-brand-charcoal mb-4">{title}</h3>
            <p className="text-slate-600 flex-grow mb-6">{description}</p>
            {disabled ? (
                 <span className="mt-auto bg-gray-300 text-gray-500 font-semibold px-8 py-3 rounded-full cursor-not-allowed">
                    {ctaText}
                </span>
            ) : (
                <Link to={ctaLink} className="mt-auto bg-brand-teal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-charcoal transition-all duration-300 transform hover:scale-105">
                    {ctaText}
                </Link>
            )}
        </div>
    </div>
);

const JourneyTogetherIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 00-9 0m9 0a9.094 9.094 0 01-9 0m9 0v-4.634c0-1.141-.935-2.071-2.09-2.071H7.09c-1.155 0-2.09.93-2.09 2.071v4.634m13.82 0A11.933 11.933 0 0112 21.75c-2.676 0-5.14-1.057-7.022-2.799m14.044 0a11.933 11.933 0 00-14.044 0" />
    </svg>
);

const GeneralForumIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
);


const SanctuaryPage: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="Welcome to The Sanctuary"
                subtitle="A shared space for members and ethos-aligned surgeons to connect, share, and support one another. This is your community hub."
                imageUrl="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=1600&h=900&auto=format=fit=crop"
            />
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                     <FeatureCard 
                        title="General Forum & Expert Insights"
                        description="Engage in broader discussions with the entire community. A place for general questions, starting discussion threads, and finding shared wisdom."
                        ctaLink="/sanctuary/general-forum"
                        ctaText="Enter Forum"
                        icon={<GeneralForumIcon />}
                        imageUrl="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&h=600&auto=format&fit=crop"
                        disabled={false}
                     />
                     <FeatureCard 
                        title="Journey Together: Peer Cohorts"
                        description="Connect with a small, private group of peers who are on a similar step of a similar journey. Find support and share experiences in a safe, AI-assisted, and moderated space."
                        ctaLink="/journey-together"
                        ctaText="Find Your Cohort"
                        icon={<JourneyTogetherIcon />}
                        imageUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&h=600&auto=format&fit=crop"
                     />
                </div>
                 <div className="mt-20 text-center bg-brand-deep-blue/5 p-10 rounded-lg border border-brand-deep-blue/10">
                    <h3 className="text-2xl font-bold font-serif text-brand-charcoal">Our Foundation of Trust</h3>
                    <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                        All interactions within The Sanctuary are guided by our Covenant, a shared promise to ensure this remains a safe, respectful, and empowering space for everyone.
                    </p>
                    <div className="mt-6">
                        <Link to="/sanctuary-covenant" className="text-brand-teal font-semibold hover:underline">
                            Read The Sanctuary Covenant &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SanctuaryPage;
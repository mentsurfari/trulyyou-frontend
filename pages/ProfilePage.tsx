
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import OnboardingModal from '../components/OnboardingModal';
import api from '../api';

const PageHeader: React.FC<{ title: string; subtitle: string; imageUrl: string; }> = ({ title, subtitle, imageUrl }) => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-brand-deep-blue/60" />
        <div className="relative container mx-auto px-6 py-20 md:py-24 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">{title}</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">{subtitle}</p>
        </div>
    </div>
);

const DiscoverabilityToggle: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [isChecked, setIsChecked] = useState(user?.isDiscoverable || false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsChecked(user?.isDiscoverable || false);
    }, [user?.isDiscoverable]);

    const isQualified = user?.motivationCompass && user?.prepKit;

    const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isQualified) return;
        const newCheckedState = e.target.checked;
        setIsChecked(newCheckedState);
        setIsLoading(true);
        try {
            const response = await api.put('/api/users/profile/discoverability', { isDiscoverable: newCheckedState });
            updateUser(response.data);
        } catch (error) {
            console.error('Failed to update discoverability', error);
            setIsChecked(!newCheckedState); // Revert on error
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md border ${!isQualified ? 'opacity-60' : ''}`}>
             <h3 className="text-lg font-bold font-serif text-brand-deep-blue mb-4">Profile Discoverability</h3>
             <div className="flex items-center justify-between">
                <span className="text-brand-charcoal font-medium">Visible to Surgeons</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={isChecked} onChange={handleToggle} className="sr-only peer" disabled={!isQualified || isLoading} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-teal/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal"></div>
                </label>
             </div>
             <p className="text-sm text-slate-500 mt-3">
                {isQualified
                    ? "Toggle on to allow vetted surgeon partners to view your anonymized profile summary."
                    : "Complete your Motivation Compass and Prep Kit to enable this feature."
                }
            </p>
        </div>
    );
};


const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [showOnboarding, setShowOnboarding] = useState(location.state?.isNewUser || false);

    const handleCloseOnboarding = () => {
        setShowOnboarding(false);
        window.history.replaceState({}, document.title); 
    };

    if (!user) {
        return <div className="text-center py-20"><p>Loading profile...</p></div>;
    }
    
    const compassData = user.motivationCompass;
    const prepKitData = user.prepKit;

    const getNextStep = () => {
        if (!compassData) {
            return {
                title: "Discover Your 'Why'",
                description: "The Motivation Compass is the perfect first step. This personal reflection tool helps you understand the core drivers of your journey.",
                ctaText: "Start the Compass",
                ctaLink: "/motivation-compass",
            };
        }
        if (!prepKitData || !prepKitData.journeyWhy) {
            return {
                title: "Build Your Prep Kit",
                description: "You've found your 'why,' now it's time to prepare for your consultation. The Prep Kit helps you organize your thoughts and questions.",
                ctaText: "Start My Prep Kit",
                ctaLink: "/prep-kit",
            };
        }
        return {
            title: "Join the Conversation",
            description: "You're well-prepared. Now, connect with peers in The Sanctuary to share experiences and find support.",
            ctaText: "Enter The Sanctuary",
            ctaLink: "/sanctuary",
        };
    };

    const nextStep = getNextStep();

    return (
        <div className="bg-brand-light-gray">
            {showOnboarding && <OnboardingModal onClose={handleCloseOnboarding} username={user.email.split('@')[0]} />}
            <PageHeader 
                title={`Welcome, ${user.email.split('@')[0]}`} 
                subtitle="This is your personal dashboard—a home base for your entire journey."
                imageUrl="https://images.unsplash.com/photo-1497091071254-cc9b2ba7d48a?q=80&w=1600&h=900&auto=format&fit=crop"
             />
            <div className="container mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Main column */}
                    <div className="lg:col-span-2 space-y-8">
                         {/* Next Step Card */}
                        <div className="bg-brand-sand/30 p-8 rounded-lg border-2 border-brand-sand/50">
                             <h2 className="text-2xl font-bold font-serif text-brand-deep-blue mb-2">Your Recommended Next Step</h2>
                             <h3 className="text-xl font-semibold text-brand-charcoal mb-4">{nextStep.title}</h3>
                             <p className="text-slate-700 mb-6">{nextStep.description}</p>
                             <Link to={nextStep.ctaLink} className="bg-brand-charcoal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-teal transition-all duration-300 transform hover:scale-105 inline-block">
                                {nextStep.ctaText} &rarr;
                             </Link>
                        </div>
                    </div>
                    {/* Side column */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md border">
                             <h3 className="text-lg font-bold font-serif text-brand-deep-blue mb-4">My Motivation Compass</h3>
                            {compassData ? (
                                <div>
                                    <p>Your Profile: <strong className="text-brand-teal">{compassData.profile}</strong></p>
                                    <Link to="/motivation-compass" className="text-sm text-brand-teal hover:underline mt-2 inline-block">View Full Playbook</Link>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500">Not yet completed.</p>
                            )}
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md border">
                             <h3 className="text-lg font-bold font-serif text-brand-deep-blue mb-4">My Prep Kit</h3>
                            {prepKitData?.journeyWhy ? (
                                <div>
                                    <p className="text-sm text-slate-500">Status: In Progress</p>
                                    <Link to="/prep-kit" className="text-sm text-brand-teal hover:underline mt-2 inline-block">View & Edit My Kit</Link>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500">Not yet started.</p>
                            )}
                        </div>
                        <DiscoverabilityToggle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

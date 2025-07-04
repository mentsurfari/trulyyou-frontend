

import React from 'react';
import { Link } from 'react-router-dom';
import FadeInSection from '../components/FadeInSection';

const PageHeader: React.FC<{ title: string; subtitle: string; imageUrl: string }> = ({ title, subtitle, imageUrl }) => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-brand-deep-blue/70" />
        <div className="relative container mx-auto px-6 py-20 md:py-24 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">{title}</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">{subtitle}</p>
        </div>
    </div>
);

interface FeatureProps {
    title: string;
    description: string;
    visual: string;
    reverse?: boolean;
    cta?: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ title, description, visual, reverse = false, cta }) => (
    <div className={`container mx-auto px-6 py-16 md:py-20`}>
        <div className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold font-serif text-brand-deep-blue mb-4">{title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed">{description}</p>
                {cta && <div className="mt-8">{cta}</div>}
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
                 <img src={visual} alt={title} className="rounded-lg shadow-xl object-cover h-96 w-full" />
            </div>
        </div>
    </div>
);

const PlatformPage: React.FC = () => {
    return (
        <div>
            <PageHeader
                title="The TrulyYou Platform"
                subtitle="A suite of purpose-built tools designed to support your journey from the inside out. Each feature is grounded in psychology and a commitment to ethical, empathetic care."
                imageUrl="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1600&h=900&auto=format&fit=crop"
            />

            <div className="bg-white">
                <FadeInSection>
                    <Feature
                        title="The Motivation Compass"
                        description="A personal reflection quiz to uncover the 'why' behind your journey. Understand your core motivations and receive a personalized 'Journey Playbook' to guide your next steps."
                        visual="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800&h=600&auto=format&fit=crop"
                        cta={
                            <Link to="/motivation-compass" className="bg-brand-teal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-charcoal transition-all duration-300 transform hover:scale-105 inline-block">
                                Discover Your 'Why'
                            </Link>
                        }
                    />
                </FadeInSection>
            </div>

            <div className="bg-brand-light-gray">
                 <FadeInSection>
                    <Feature
                        title="The Consultation Prep Kit"
                        description="A transformative tool to shift your mindset from a passive 'patient' to an active 'partner' in your care. Articulate your goals, hopes, and fears, and prepare for a deeper, more collaborative dialogue with your surgeon."
                        visual="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&h=600&auto=format&fit=crop"
                        reverse={true}
                        cta={
                             <Link to="/prep-kit" className="bg-brand-teal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-charcoal transition-all duration-300 transform hover:scale-105 inline-block">
                                 Start Your Prep Kit
                            </Link>
                        }
                    />
                </FadeInSection>
            </div>

            <div className="bg-white">
                <FadeInSection>
                    <Feature
                        title="Journey Together"
                        description="Find and connect with a personalized cohort of peers who are on a similar path. Share experiences and offer support within a safe, moderated space governed by our 'Sanctuary Covenant.' This is community, not comparison."
                        visual="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=800&h=600&auto=format&fit=crop"
                         cta={
                            <Link to="/journey-together" className="bg-brand-teal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-charcoal transition-all duration-300 transform hover:scale-105 inline-block">
                                Find Your Cohort
                            </Link>
                        }
                    />
                </FadeInSection>
            </div>
        </div>
    );
};

export default PlatformPage;
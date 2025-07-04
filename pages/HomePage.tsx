

import React from 'react';
import { Link } from 'react-router-dom';
import PillarIcon from '../components/icons/PillarIcon';
import FadeInSection from '../components/FadeInSection';

const HeroSection: React.FC = () => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1600&h=900&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-brand-deep-blue/70" />
        <div className="relative container mx-auto px-6 py-24 md:py-32 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight leading-tight">
                The Sanctuary, not The Marketplace.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-200">
                A platform dedicated to one thing: helping you become who you truly feel you are. We provide the ethical support, community, and personalized tools for your unique journey.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/signup" className="w-full sm:w-auto bg-brand-teal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-charcoal transition-all duration-300 transform hover:scale-105">
                    Join The Sanctuary
                </Link>
                <Link to="/philosophy" className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-brand-charcoal transition-all duration-300 transform hover:scale-105">
                    Learn Our Philosophy
                </Link>
            </div>
        </div>
    </div>
);

const ProblemSection: React.FC = () => (
    <div className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-xl font-semibold text-brand-sand uppercase tracking-widest">The Challenge</h2>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl text-brand-deep-blue leading-tight max-w-3xl mx-auto">
                The Digital Journey is Overwhelming. You Deserve Better.
            </h3>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                The current online landscape is a chaotic, transactional space filled with conflicting information and social media distortion. It's easy to feel overwhelmed and under-supported, lacking the clarity to become a true partner in your own care.
            </p>
        </div>
    </div>
);


interface PillarCardProps {
    iconType: 'philosophy' | 'platform' | 'library' | 'partners' | 'motivation-compass' | 'prep-kit' | 'journey-together';
    title: string;
    description: string;
    linkTo: string;
    imageUrl: string;
}

const PillarCard: React.FC<PillarCardProps> = ({ iconType, title, description, linkTo, imageUrl }) => (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6 flex flex-col text-center items-center flex-grow">
            <div className="bg-brand-light-teal p-3 rounded-full mb-4 -mt-16 z-10 border-4 border-white shadow-md">
                <PillarIcon type={iconType} />
            </div>
            <h3 className="text-xl font-bold font-serif text-brand-charcoal mb-3">{title}</h3>
            <p className="text-slate-600 flex-grow">{description}</p>
            <Link to={linkTo} className="mt-6 text-brand-teal font-semibold hover:underline">
                Learn More &rarr;
            </Link>
        </div>
    </div>
);

const SolutionSection: React.FC = () => (
    <div className="bg-brand-light-gray py-20 md:py-28">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-deep-blue font-serif">
                    Your Guided Path to Clarity
                </h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                    TrulyYou provides a structured path away from the chaos. Our tools and community are designed to empower you before you ever step into a consultation.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PillarCard 
                    iconType="journey-together" 
                    title="Journey Together" 
                    description="Connect with peers in a safe, moderated space for shared experiences." 
                    linkTo="/journey-together"
                    imageUrl="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&h=600&auto=format&fit=crop" 
                />
                <PillarCard 
                    iconType="library" 
                    title="The Library" 
                    description="Empathetic, evidence-based content." 
                    linkTo="/library" 
                    imageUrl="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&h=600&auto=format&fit=crop"
                />
                <PillarCard 
                    iconType="motivation-compass" 
                    title="Motivation Compass" 
                    description="Uncover your 'why' with a personal reflection quiz to guide your journey." 
                    linkTo="/motivation-compass" 
                    imageUrl="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=800&h=600&auto=format&fit=crop"
                />
                <PillarCard 
                    iconType="prep-kit" 
                    title="Consultation Prep Kit" 
                    description="Become an active partner in your care with our Consultation Prep Kit." 
                    linkTo="/prep-kit"
                    imageUrl="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&h=600&auto=format&fit=crop" 
                />
                <PillarCard 
                    iconType="philosophy" 
                    title="Our Philosophy" 
                    description="A foundational commitment to dignity and self-alignment." 
                    linkTo="/philosophy"
                    imageUrl="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=800&h=600&auto=format&fit=crop" 
                />
                <PillarCard 
                    iconType="partners" 
                    title="Our Partners" 
                    description="An exclusive network of vetted, ethos-aligned surgeons." 
                    linkTo="/for-surgeons"
                    imageUrl="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&h=600&auto=format&fit=crop" 
                />
            </div>
        </div>
    </div>
);

const NextStepSection: React.FC = () => (
    <div className="bg-brand-light-gray py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-deep-blue">
                Your Journey Begins with a Single, Intentional Step.
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-700">
                Clarity is the kindest thing you can give yourself. The Motivation Compass is our confidential, personal reflection tool designed to help you discover your 'why'. It's the perfect first step.
            </p>
            <div className="mt-10">
                <Link to="/motivation-compass" className="bg-brand-sand text-brand-charcoal font-bold px-10 py-4 rounded-full hover:bg-brand-charcoal hover:text-white transition-all duration-300 transform hover:scale-105 text-lg shadow-lg">
                    Start My Reflection
                </Link>
            </div>
        </div>
    </div>
);


const HomePage: React.FC = () => {
  return (
    <div>
        <HeroSection />
        <FadeInSection><ProblemSection /></FadeInSection>
        <FadeInSection><SolutionSection /></FadeInSection>
        <FadeInSection><NextStepSection /></FadeInSection>
    </div>
  );
};

export default HomePage;
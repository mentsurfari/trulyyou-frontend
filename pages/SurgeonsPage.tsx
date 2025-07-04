

import React from 'react';
import FadeInSection from '../components/FadeInSection';

const PageHeader: React.FC<{ title: string; subtitle: string; imageUrl: string; }> = ({ title, subtitle, imageUrl }) => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-brand-deep-blue/80" />
        <div className="relative container mx-auto px-6 py-20 md:py-24 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">{title}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">{subtitle}</p>
        </div>
    </div>
);

const ProblemSection: React.FC = () => (
    <div className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-deep-blue font-serif">
                Escape the Revolving Door of Unprepared Patients.
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                Tired of consultations dominated by unrealistic expectations, price shopping, and social media-driven wishlists? The traditional digital funnel delivers leads, not partners, wasting your valuable time and compromising the quality of care.
            </p>
        </div>
    </div>
);


const CheckIcon: React.FC = () => (
    <svg className="h-7 w-7 text-brand-teal" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1.44 14.39L6.5 12.33l1.06-1.06 3 3L16.44 8.7l1.06 1.06-7.06 7.06-1.44-.43z" fill="currentColor"/>
    </svg>
);


interface BenefitItemProps {
    title: string;
    children: React.ReactNode;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ title, children }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 mr-5 mt-1">
            <CheckIcon />
        </div>
        <div>
            <h3 className="text-xl font-bold font-serif text-brand-charcoal">{title}</h3>
            <p className="mt-1 text-slate-600">{children}</p>
        </div>
    </div>
);

const SolutionSection: React.FC = () => (
    <div className="py-20 md:py-28 bg-brand-light-gray">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-deep-blue">Our Solution: A Patient Qualification Engine</h2>
                 <p className="mt-6 text-lg text-slate-600">
                    TrulyYou is your pre-consultation sanctuary. We filter for and cultivate psychological readiness, transforming anxious explorers into educated, self-aware partners before they ever reach your office.
                </p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-12">
                <BenefitItem title="High-Trust Environment">
                    Connect with psychologically prepared individuals who have been vetted for their commitment to a healthy, introspective journey—not just a transaction.
                </BenefitItem>
                 <BenefitItem title="Deep Patient Preparation">
                    Our platform, with its expansive content library, Motivation Compass, and Consultation Prep Kits, empowers patients to define their 'why' and align expectations with reality.
                </BenefitItem>
                 <BenefitItem title="Guided Community Support">
                    Expert-led peer groups provide crucial emotional support and a safe space for managing expectations, reducing the burden on your practice to handle non-clinical concerns.
                </BenefitItem>
            </div>
        </div>
    </div>
);

const ResultSection: React.FC = () => (
    <div className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
             <div className="md:pr-8">
                 <h2 className="text-3xl font-bold font-serif text-brand-deep-blue mb-4">The 'TrulyYou Consultation'</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    The result is a consultation focused not on basic education or price, but on your expertise and a shared, realistic goal. This is a true patient partnership, built on a foundation of trust and clarity from day one.
                </p>
                 <h3 className="text-2xl font-bold font-serif text-brand-charcoal mb-4 mt-8">Our Unwavering Ethical Framework</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                    We've mastered the ethical minefield. Our 'Ethical Gallery' of patient journeys features mandatory AI-powered anonymity, granular user consent (revocable anytime), and a deliberate absence of social metrics like 'likes' to prevent objectification.
                </p>
            </div>
            <div>
                 <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&h=600&auto=format&fit=crop" alt="Collaborative Consultation" className="rounded-lg shadow-xl" />
            </div>
        </div>
    </div>
);

const InvitationSection: React.FC = () => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&h=900&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-brand-light-gray/90" />
        <div className="relative container mx-auto px-6 py-20 md:py-28 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-deep-blue">Become a Founding Partner</h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                We are extending a private invitation to a select group of highly qualified, board-certified surgeons to become Founding Partners. This is a commitment to a higher standard of patient care—and a mark of true prestige.
            </p>
            
            <div className="mt-10 grid sm:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                 <div className="bg-white/70 p-4 rounded-lg border border-gray-300">
                    <h4 className="font-bold text-brand-charcoal">Zero Cost, Zero Risk</h4>
                    <p className="text-sm text-slate-600">This foundational role is offered at no charge, with a complimentary 12-month full membership included.</p>
                </div>
                 <div className="bg-white/70 p-4 rounded-lg border border-gray-300">
                    <h4 className="font-bold text-brand-charcoal">Permanent Prestige</h4>
                    <p className="text-sm text-slate-600">Receive permanent Founding Partner status and a digital seal to distinguish your practice.</p>
                </div>
                 <div className="bg-white/70 p-4 rounded-lg border border-gray-300 col-span-full">
                    <h4 className="font-bold text-brand-charcoal">Your Personal Content Team</h4>
                    <p className="text-sm text-slate-600">Let us be your production team. We'll help you create articles and videos to build your brand with minimal effort on your part.</p>
                </div>
            </div>

            <div className="mt-12">
                <a href="mailto:partners@trulyyou.com?subject=Founding Partner Inquiry" className="bg-brand-sand text-brand-charcoal font-bold px-10 py-4 rounded-full hover:bg-brand-charcoal hover:text-white transition-all duration-300 transform hover:scale-105 text-lg shadow-lg inline-block">
                    Secure Your Place
                </a>
            </div>
        </div>
    </div>
);


const SurgeonsPage: React.FC = () => {
  return (
    <div>
        <PageHeader 
            title="A Partnership in Patient Care" 
            subtitle="Align your practice with the most informed, emotionally-prepared patients."
            imageUrl="https://images.unsplash.com/photo-1631217871002-c7150058b456?q=80&w=1600&h=900&auto=format&fit=crop"
        />
        <FadeInSection><ProblemSection /></FadeInSection>
        <FadeInSection><SolutionSection /></FadeInSection>
        <FadeInSection><ResultSection /></FadeInSection>
        <FadeInSection><InvitationSection /></FadeInSection>
    </div>
  );
};

export default SurgeonsPage;
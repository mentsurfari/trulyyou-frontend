

import React from 'react';
import FadeInSection from '../components/FadeInSection';

const PageHeader: React.FC<{ title: string; imageUrl: string }> = ({ title, imageUrl }) => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-brand-deep-blue/70" />
        <div className="relative container mx-auto px-6 py-20 md:py-24 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">
                {title}
            </h1>
        </div>
    </div>
);

const MissionSection: React.FC = () => (
    <div className="py-20 md:py-24">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-xl font-semibold text-brand-teal uppercase tracking-widest">Our North Star</h2>
                <h3 className="mt-6 font-serif text-4xl md:text-5xl text-brand-charcoal leading-tight">
                    To help you become who you truly feel you are.
                </h3>
            </div>
        </div>
    </div>
);

interface ConstitutionItemProps {
    title: string;
    children: React.ReactNode;
}

const ConstitutionItem: React.FC<ConstitutionItemProps> = ({ title, children }) => (
    <div className="bg-white p-8 rounded-lg border border-gray-200">
         <div className="flex items-start">
            <svg className="w-6 h-6 text-brand-teal mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
                <h3 className="text-xl font-bold font-serif text-brand-charcoal">{title}</h3>
                <p className="mt-2 text-slate-600">{children}</p>
            </div>
        </div>
    </div>
);

const ConstitutionSection: React.FC = () => (
    <div className="bg-brand-light-gray py-20 md:py-28">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-deep-blue">Our Community Constitution</h2>
                <p className="mt-4 text-lg text-slate-600">
                    This is our public promise. It is the unbreakable framework of principles that guides our platform, our content, and our partnerships. It is our commitment to every member and every partner.
                </p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-6">
                 <ConstitutionItem title="We Commit to Dignity">
                    We treat every member's journey with the respect and seriousness it deserves. We champion aesthetic surgery as a valid tool for personal evolution, free from stigma.
                </ConstitutionItem>
                <ConstitutionItem title="We Believe in Anti-Objectification">
                    Our platform is a space for introspection, not comparison. We focus on the emotional arc and internal motivations, deliberately avoiding the before-and-after metrics that fuel objectification.
                </ConstitutionItem>
                <ConstitutionItem title="We Prioritize Psychological Well-being">
                    A successful outcome is measured by inner confidence, not just physical change. We provide tools and support to ensure our members are psychologically prepared for their journey.
                </ConstitutionItem>
                <ConstitutionItem title="We Uphold Unyielding Transparency">
                    Our business model, our surgeon vetting process, and our use of data will always be clear, honest, and public. Trust is our most valuable asset.
                </ConstitutionItem>
            </div>
        </div>
    </div>
);


const PhilosophyPage: React.FC = () => {
  return (
    <div>
        <PageHeader title="The 'Why' Behind TrulyYou" imageUrl="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&h=900&auto=format&fit=crop" />
        <FadeInSection>
            <MissionSection />
        </FadeInSection>
        <FadeInSection>
            <ConstitutionSection />
        </FadeInSection>
    </div>
  );
};

export default PhilosophyPage;

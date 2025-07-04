
import React from 'react';

const PageHeader: React.FC<{ title: string; subtitle: string; imageUrl: string; }> = ({ title, subtitle, imageUrl }) => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-brand-deep-blue/60" />
        <div className="relative container mx-auto px-6 py-20 md:py-24 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">{title}</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">{subtitle}</p>
        </div>
    </div>
);

interface PrincipleItemProps {
    title: string;
    description: React.ReactNode;
    reason: string;
}

const PrincipleItem: React.FC<PrincipleItemProps> = ({ title, description, reason }) => (
    <div className="bg-white p-8 rounded-lg border border-gray-200 transition-shadow duration-300 hover:shadow-md">
        <div className="flex items-start">
            <svg className="w-8 h-8 text-brand-teal mr-5 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
                <h3 className="text-xl font-bold font-serif text-brand-charcoal">{title}</h3>
                <div className="mt-3 text-slate-700 space-y-2">{description}</div>
                <p className="mt-4 text-sm text-brand-teal bg-brand-light-teal/50 p-3 rounded-md">
                    <strong className="font-semibold">Why it matters:</strong> {reason}
                </p>
            </div>
        </div>
    </div>
);


const SanctuaryCovenantPage: React.FC = () => {
    const principles = [
        {
            title: "Share Your Experience, Not Advice.",
            description: <p>We encourage you to share your personal stories, feelings, and insights from your unique journey. However, please refrain from offering direct medical advice, diagnoses, or prescriptive solutions to other members.</p>,
            reason: "This protects everyone from misinformation and ensures that medical decisions are made in consultation with licensed professionals. It fosters a space for empathetic listening and validation, rather than unsolicited (and potentially harmful) peer advice."
        },
        {
            title: "Celebrate Vulnerability.",
            description: <p>This is a safe space to share your authentic emotions, fears, and challenges without judgment. Your openness strengthens our collective bond and reminds us that we are not alone.</p>,
            reason: "When vulnerability is met with compassion, it builds deep psychological safety and trust. This reduces feelings of isolation and fosters genuine connection, which is crucial for emotional healing and support during a sensitive journey."
        },
        {
            title: "Honor Each Unique Journey.",
            description: <p>Every member's experience, motivations, and outcomes are unique and valid. We commit to respecting individual differences, avoiding comparison, and recognizing that personal transformation is deeply personal.</p>,
            reason: "This principle combats the pervasive societal pressure for 'perfect' outcomes and the tendency for social comparison, which can be detrimental to self-esteem and body image. It promotes acceptance and reduces the potential for envy or judgment."
        },
        {
            title: "Assume Best Intent.",
            description: <p>In all interactions, we encourage you to interpret others' words and actions with the most charitable assumption possible. If confusion or offense arises, seek clarification privately rather than immediately assigning negative intent.</p>,
            reason: "This is a cornerstone of healthy communication and conflict resolution. It reduces misinterpretation, de-escalates potential conflicts, and encourages a culture of grace and understanding, building trust through positive interactions."
        },
        {
            title: "Practice Active Listening & 'I' Statements.",
            description: <p>Engage with others by truly hearing and understanding their perspective, rather than just waiting to respond. When expressing your personal feelings or needs, use "I" statements (e.g., "I feel [emotion] when [situation] because [need]") to communicate clearly without blaming or criticizing.</p>,
            reason: "Active listening fosters deeper connection and prevents misunderstandings. 'I' statements reduce defensiveness and hostility, opening pathways for constructive dialogue and mutual understanding, even in conflict."
        }
    ];

    const prohibitedBehaviors = [
        "Medical Advice: Do not offer or solicit medical advice, diagnoses, or treatment plans.",
        "Harassment & Bullying: Any form of personal attack, intimidation, or derogatory language.",
        "Hate Speech: Discrimination or prejudice based on race, ethnicity, gender, sexual orientation, etc.",
        "Misinformation: Spreading false or misleading information.",
        "Commercial Solicitation: Promoting products, services, or personal businesses.",
        "Sharing Private Information: Do not share personally identifiable information of others without their explicit consent.",
        "Graphic Content: Posting explicit, violent, or otherwise disturbing images or videos.",
        "Unrealistic Expectations: Promoting or glorifying unrealistic surgical outcomes or implying perfection."
    ];

    return (
        <div>
            <PageHeader
                title="The Sanctuary Covenant"
                subtitle="Our Shared Commitment to a Healing Space"
                imageUrl="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1600&h=900&auto=format&fit=crop"
            />
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Welcome to The Sanctuary, a community built on trust, empathy, and mutual support for your unique aesthetic journey. This Covenant outlines the principles that guide our interactions, ensuring this remains a safe, respectful, and empowering space for everyone.
                        </p>
                        <div className="mt-8 bg-brand-light-teal/60 p-6 rounded-lg border border-brand-teal/30">
                            <h3 className="text-xl font-semibold text-brand-deep-blue uppercase tracking-widest">Our Core Philosophy</h3>
                            <p className="mt-3 font-serif text-3xl text-brand-charcoal">Partner, Not Patient.</p>
                             <p className="mt-2 text-slate-600">Here, you are not just a user; you are a valued partner in your own journey and a compassionate peer to others.</p>
                        </div>
                    </div>

                    <div className="mb-20">
                        <h2 className="text-3xl font-bold font-serif text-center text-brand-deep-blue mb-12">Principles We Actively Encourage</h2>
                        <div className="grid md:grid-cols-1 gap-8">
                            {principles.map(p => (
                                <PrincipleItem key={p.title} title={p.title} description={p.description} reason={p.reason} />
                            ))}
                        </div>
                    </div>

                    <div className="bg-red-50 p-8 rounded-lg border border-red-200">
                         <h2 className="text-3xl font-bold font-serif text-center text-red-800 mb-8">Behaviors We Do Not Tolerate</h2>
                         <ul className="space-y-3">
                             {prohibitedBehaviors.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="text-red-900">{item}</span>
                                 </li>
                             ))}
                         </ul>
                    </div>

                    <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg border">
                        <h3 className="text-xl font-bold font-serif text-brand-charcoal">Enforcement</h3>
                        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Our Sanctuary Guardians and Cohort Facilitators are here to uphold this Covenant with compassionate oversight. Violations may result in warnings, temporary suspension, or permanent removal from the community.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SanctuaryCovenantPage;


import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import api from '../api';
import { useNavigate } from 'react-router-dom';

// AI Configuration
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `
ROLE & PERSONA:
You are an expert AI agent specializing in the development of sophisticated, patient-centric digital health platforms. Your core competencies are in empathetic user experience design, ethical AI, and strict regulatory compliance.

PRIMARY OBJECTIVE:
Your primary objective is to dynamically create personalized recovery cohorts for aesthetic surgery patients. You must synthesize complex patient data to foster a supportive, empathetic, and legally compliant online community.

COHORT SEGMENTATION LOGIC:
Apply hierarchical logic to create cohorts based on:
1.  **procedure_type**: (e.g., Rhinoplasty, Abdominoplasty).
2.  **recovery_phase**: (e.g., Pre-Op, Immediate Post-Op, Mid-Term Recovery).
3.  **shared_experience_and_goals**: Create thematic sub-cohorts (e.g., Managing_Pain, Navigating_Body_Image_Changes).

CONTENT GENERATION:
For each cohort, generate content that is supportive, informative, and safe.
-   **Tone**: Empathetic, non-judgmental, empowering, and inclusive. Use clear, plain language.
-   **Elements**: Cohort Name and Description.

CRITICAL CONSTRAINTS (NON-NEGOTIABLE):
-   **ZERO_MEDICAL_ADVICE**: ABSOLUTELY PROHIBIT content that could be interpreted as medical advice.
-   **ETHICAL AI**: DO NOT perpetuate beauty biases. Frame content around self-acceptance.
-   **SAFETY**: DO NOT generate content promoting unrealistic expectations or self-harm.

REQUIRED OUTPUT FORMAT:
Deliver content in a structured JSON format. The output must be a single cohort JSON object with only name and description. Example:
{
  "name": "Navigating Body Image: 1-6 Months Post-Tummy Tuck",
  "description": "A supportive space for those adjusting to their new body shape and managing expectations."
}
`;

// --- Data ---
const proceduresData = [
    { name: 'Rhinoplasty', imageUrl: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800&h=600&auto=format&fit=crop' },
    { name: 'Abdominoplasty', imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&h=600&auto=format&fit=crop' },
    { name: 'Breast Augmentation', imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=800&h=600&auto=format&fit=crop' },
    { name: 'Post-Bariatric Body Contouring', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&h=600&auto=format&fit=crop' },
    { name: 'Facelift', imageUrl: 'https://images.unsplash.com/photo-1508921340878-ba53e1f416ec?q=80&w=800&h=600&auto=format&fit=crop' },
    { name: 'Liposuction', imageUrl: 'https://images.unsplash.com/photo-1506259091721-347e791bab0f?q=80&w=800&h=600&auto=format&fit=crop' },
];

// --- Components ---

const PageHeader: React.FC<{ title: string; subtitle: string; imageUrl: string; }> = ({ title, subtitle, imageUrl }) => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-brand-deep-blue/70" />
        <div className="relative container mx-auto px-6 py-20 md:py-24 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">{title}</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">{subtitle}</p>
        </div>
    </div>
);

const CohortFinderModal: React.FC<{ procedure: string; onClose: () => void }> = ({ procedure, onClose }) => {
    const navigate = useNavigate();
    const [recoveryPhase, setRecoveryPhase] = useState('Immediate Post-Op (Weeks 0-6)');
    const [motivation, setMotivation] = useState('Aesthetic Enhancement');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const phases = ['Pre-Op Preparation', 'Immediate Post-Op (Weeks 0-6)', 'Mid-Term Recovery (Months 1-6)', 'Long-Term Adjustment (6+ Months)'];
    const motivations = ['Functional Improvement', 'Aesthetic Enhancement', 'Psychological Well-being'];

    const handleFindCohort = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const userPrompt = `Generate one personalized recovery cohort concept based on the following patient profile:\n- Procedure Type: ${procedure}\n- Recovery Phase: ${recoveryPhase}\n- Primary Motivation: ${motivation}\n\nStrictly adhere to all constraints and output the data in the specified JSON format with only 'name' and 'description'.`;

        try {
            const aiResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-04-17",
                contents: userPrompt,
                config: { systemInstruction, responseMimeType: "application/json" },
            });
            let jsonStr = aiResponse.text.trim();
            const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
            const match = jsonStr.match(fenceRegex);
            if (match && match[2]) jsonStr = match[2].trim();
            const aiConcept = JSON.parse(jsonStr);

            const payload = {
                name: aiConcept.name,
                description: aiConcept.description,
                procedure_type: procedure,
                recovery_phase: recoveryPhase
            };
            const backendResponse = await api.post('/api/cohorts/find-or-create', payload);
            const cohort = backendResponse.data;
            navigate(`/sanctuary/cohorts/${cohort._id}`);
        } catch (e: any) {
            console.error("Failed to find or create cohort:", e);
            setError(e.response?.data?.message || "We're sorry, but we couldn't create a cohort at this time. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200">
                     <h2 className="text-2xl font-bold font-serif text-brand-deep-blue">Find Your {procedure} Cohort</h2>
                     <p className="text-slate-600 mt-1">Refine your search to connect with the right peers.</p>
                </div>
                <form onSubmit={handleFindCohort} className="p-6 grid grid-cols-1 gap-6">
                     <div>
                        <label htmlFor="recoveryPhase" className="block text-sm font-medium text-brand-charcoal">Recovery Phase</label>
                        <select id="recoveryPhase" value={recoveryPhase} onChange={e => setRecoveryPhase(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm rounded-md shadow-sm">
                            {phases.map(p => <option key={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="motivation" className="block text-sm font-medium text-brand-charcoal">Primary Motivation</label>
                        <select id="motivation" value={motivation} onChange={e => setMotivation(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm rounded-md shadow-sm">
                            {motivations.map(m => <option key={m}>{m}</option>)}
                        </select>
                    </div>
                    {error && <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md">{error}</p>}
                    <div className="flex justify-end items-center gap-4 border-t border-gray-200 pt-6">
                        <button type="button" onClick={onClose} className="text-sm font-semibold text-slate-600 hover:underline">Cancel</button>
                        <button type="submit" disabled={isLoading} className="bg-brand-teal text-white font-semibold px-8 py-2 rounded-full hover:bg-brand-charcoal transition-all duration-300 disabled:bg-gray-400">
                            {isLoading ? 'Searching...' : 'Find My Cohort'}
                        </button>
                    </div>
                </form>
            </div>
            <style>{`.animate-fade-in { animation: fade-in 0.3s ease-out forwards; } @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
        </div>
    );
};

const ProcedureCard: React.FC<{ name: string, imageUrl: string, onSelect: () => void }> = ({ name, imageUrl, onSelect }) => (
    <div onClick={onSelect} className="rounded-lg shadow-lg overflow-hidden group cursor-pointer transform hover:-translate-y-2 transition-transform duration-300">
        <div className="relative h-64">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundImage: `url('${imageUrl}')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold font-serif text-white">{name}</h3>
            </div>
        </div>
    </div>
);

const JourneyTogetherPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState('');

    const handleSelectProcedure = (procedureName: string) => {
        setSelectedProcedure(procedureName);
        setIsModalOpen(true);
    };

    return (
        <div>
            {isModalOpen && <CohortFinderModal procedure={selectedProcedure} onClose={() => setIsModalOpen(false)} />}
            <PageHeader
                title="Journey Together"
                subtitle="You are not alone. Find your personalized recovery cohort by first selecting your procedure type."
                imageUrl="https://images.unsplash.com/photo-1535350356005-fd52b36243f1?q=80&w=1600&h=900&auto=format&fit=crop"
            />
            <div className="container mx-auto px-6 py-20">
                 <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold font-serif text-brand-deep-blue">Step 1: Choose Your Journey</h2>
                    <p className="mt-4 text-lg text-slate-600">Select the procedure that most closely matches your own to begin finding your community.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {proceduresData.map(proc => (
                        <ProcedureCard 
                            key={proc.name}
                            name={proc.name}
                            imageUrl={proc.imageUrl}
                            onSelect={() => handleSelectProcedure(proc.name)}
                        />
                    ))}
                </div>
                 <MedicalDisclaimer />
            </div>
        </div>
    );
};

export default JourneyTogetherPage;

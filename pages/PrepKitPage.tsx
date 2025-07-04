

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { GoogleGenAI } from '@google/genai';

type MotivationProfile = 'IA' | 'EE' | 'CV' | 'Balanced';

// AI Configuration
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = useRef<number | null>(null);
    return (...args: any[]) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => callback(...args), delay);
    };
};

const getPersonalizedPrompt = (profile: MotivationProfile | null) => {
    switch (profile) {
        case 'IA': return "My primary goal is inner peace. How will this procedure help me achieve that, and what support do you offer for the emotional side of recovery?";
        case 'EE': return "I see this as a catalyst for my goals. How will recovery impact my timeline, and what strategies do you recommend to integrate it seamlessly?";
        case 'CV': return "I'm sensitive to others' reactions. How can we ensure the result is natural and authentically 'me,' and how do you guide patients in navigating social feedback?";
        default: return "My motivations are balanced. How can we approach this to honor my internal goals, practical ambitions, and social comfort all at once?";
    }
};

const AIJournalPrompt: React.FC<{ userText: string }> = ({ userText }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState<string | null>(null);
    const [error, setError] = useState('');

    const getAIPrompt = async () => {
        if (!userText.trim()) {
            setError('Please write something first.');
            return;
        }
        setIsLoading(true);
        setError('');
        setPrompt(null);
        
        const systemInstruction = "You are an empathetic, insightful journaling assistant. Your role is to help a user explore their feelings about an upcoming aesthetic procedure. Ask ONE gentle, open-ended follow-up question to encourage deeper reflection. Do NOT offer advice, opinions, or affirmations. Keep your question concise and under 25 words. Your tone is calm and supportive.";
        const userPrompt = `Based on the user's reflection: "${userText}", what is one gentle, open-ended follow-up question you could ask?`;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-preview-04-17',
                contents: userPrompt,
                config: { systemInstruction, temperature: 0.7 },
            });
            setPrompt(response.text.replace(/"/g, ''));
        } catch (e) {
            console.error(e);
            setError('Could not generate a prompt right now.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
         <div className="mt-4 p-4 bg-brand-light-teal/50 rounded-lg text-center">
            <button onClick={getAIPrompt} disabled={isLoading} className="text-sm font-semibold text-brand-teal hover:underline disabled:text-slate-500">
                {isLoading ? 'Thinking...' : 'Need a prompt? Ask the AI Journaling Assistant.'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {prompt && (
                <div className="mt-3 text-left p-3 bg-white/70 rounded-md border border-brand-teal/30 animate-fade-in">
                    <p className="text-brand-charcoal italic">"{prompt}"</p>
                </div>
            )}
            <style>{`.animate-fade-in { animation: fade-in 0.5s ease-out forwards; } @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
        </div>
    );
};


const PageHeader: React.FC<{ title: string; subtitle: string; imageUrl: string; }> = ({ title, subtitle, imageUrl }) => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-brand-deep-blue/70" />
        <div className="relative container mx-auto px-6 py-20 md:py-24 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">{title}</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">{subtitle}</p>
        </div>
    </div>
);

const GuidancePanel: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-light-gray p-6 rounded-lg border border-gray-200/80 h-full">
        <h3 className="font-semibold text-brand-charcoal">{title}</h3>
        <div className="mt-2 text-sm text-slate-600 space-y-2">{children}</div>
    </div>
);

const Textarea: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; rows?: number }> = ({ label, name, value, onChange, rows = 4 }) => (
    <div>
        <label htmlFor={name} className="block text-md font-semibold text-brand-charcoal mb-2">{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-brand-teal focus:border-brand-teal text-brand-charcoal"
        />
    </div>
);

const JournalEntry: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; guidanceTitle: string; guidanceContent: React.ReactNode; rows?: number, enableAI?: boolean }> = ({ label, name, value, onChange, guidanceTitle, guidanceContent, rows, enableAI = false }) => (
    <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Textarea label={label} name={name} value={value} onChange={onChange} rows={rows} />
            {enableAI && <AIJournalPrompt userText={value} />}
        </div>
        <GuidancePanel title={guidanceTitle}>{guidanceContent}</GuidancePanel>
    </div>
);

const PrepKitPage: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated, user, updateUser } = useAuth();
    const motivationProfile = (location.state?.profile || user?.motivationCompass?.profile || null) as MotivationProfile | null;
    
    const [state, setState] = useState({
        journeyWhy: '', hopes: '', fears: '', desiredFeelings: '', medicalSnapshot: '', supportSystem: '', customQuestions: ''
    });
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const printableAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user?.prepKit) {
            setState(prevState => ({ ...prevState, ...user.prepKit }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const debouncedSave = useDebounce(async (currentState) => {
        if (!isAuthenticated) return;
        setIsSaving(true);
        try {
            const response = await api.put('/api/profile/prep-kit', currentState);
            updateUser(response.data);
        } catch (error) {
            console.error("Failed to save Prep Kit data:", error);
        } finally {
            setIsSaving(false);
        }
    }, 2000);

    useEffect(() => {
        debouncedSave(state);
    }, [state, debouncedSave]);
    
    const handleDownloadPdf = async () => {
        const capture = printableAreaRef.current;
        if (!capture) return;
        setIsDownloading(true);
        try {
            const canvas = await html2canvas(capture, { scale: 2, useCORS: true, logging: false });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); 
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const ratio = canvas.width / canvas.height;
            const canvasImageHeight = pdfWidth / ratio;
            let heightLeft = canvasImageHeight;
            let position = 0;
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasImageHeight);
            heightLeft -= pdfHeight;
            while (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasImageHeight);
                heightLeft -= pdfHeight;
            }
            pdf.save('TrulyYou_Prep_Kit.pdf');
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Sorry, there was an error generating the PDF.");
        } finally {
            setIsDownloading(false);
        }
    };
    
    return (
        <div>
            <PageHeader
                title="Your Consultation Prep Kit"
                subtitle="Shift from a passive 'patient' to an active 'partner' by preparing your thoughts, questions, and goals."
                imageUrl="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1600&h=900&auto=format&fit=crop"
            />
            <div className="container mx-auto px-6 py-12">
                <div className="text-right mb-4 h-6">
                    {isAuthenticated && isSaving && <p className="text-slate-500 text-sm animate-pulse">Auto-saving...</p>}
                </div>
                <div className="space-y-12">
                    <JournalEntry
                        label="My 'Why'"
                        name="journeyWhy"
                        value={state.journeyWhy}
                        onChange={handleChange}
                        guidanceTitle="Why this matters"
                        guidanceContent={<p>This is the foundation of your journey. Connecting with your core motivation helps you and your surgeon stay aligned on what truly matters for your long-term satisfaction.</p>}
                    />
                    <JournalEntry
                        label="My Hopes"
                        name="hopes"
                        value={state.hopes}
                        onChange={handleChange}
                        enableAI={true}
                        guidanceTitle="Articulating your hopes"
                        guidanceContent={<p>What positive changes are you envisioning? Be specific. "I hope to feel more comfortable in my work clothes" is more actionable than "I hope to feel better."</p>}
                    />
                    <JournalEntry
                        label="My Fears"
                        name="fears"
                        value={state.fears}
                        onChange={handleChange}
                        enableAI={true}
                        guidanceTitle="Acknowledging your fears"
                        guidanceContent={<p>Voicing your fears is a sign of strength. It allows your surgeon to address them directly and provide reassurance, building a foundation of trust.</p>}
                    />
                    <JournalEntry
                        label="My Desired Feelings"
                        name="desiredFeelings"
                        value={state.desiredFeelings}
                        onChange={handleChange}
                        guidanceTitle="Focusing on feelings"
                        guidanceContent={<p>Beyond the physical, how do you want to *feel*? Words like 'Confident,' 'At peace,' 'Unhindered,' or 'Empowered' help your surgeon understand your emotional goals.</p>}
                    />
                     <div className="bg-brand-light-teal p-8 rounded-lg">
                        <h2 className="text-2xl font-bold font-serif text-brand-deep-blue text-center mb-6">Key Questions & Red Flags</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                             <div>
                                <h3 className="font-bold text-brand-charcoal mb-3">Your Personalized Question</h3>
                                <p className="text-brand-charcoal italic p-4 bg-white/50 rounded-md">"{getPersonalizedPrompt(motivationProfile)}"</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-charcoal mb-3">Custom Questions for Your Surgeon</h3>
                                <Textarea label="" name="customQuestions" value={state.customQuestions} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <button 
                        onClick={handleDownloadPdf}
                        disabled={isDownloading}
                        className="bg-brand-sand text-brand-charcoal font-bold px-10 py-4 rounded-full hover:bg-brand-charcoal hover:text-white transition-all duration-300 transform hover:scale-105 text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isDownloading ? 'Generating PDF...' : 'Download Summary (PDF)'}
                    </button>
                </div>
            </div>
            
             {/* Hidden printable area */}
            <div className="absolute -left-[9999px] top-auto w-[800px] overflow-auto">
                <div ref={printableAreaRef} className="p-10 bg-white">
                    <h1 className="text-3xl font-serif text-brand-deep-blue border-b pb-4 mb-6">My Consultation Prep Kit</h1>
                    {Object.entries(state).map(([key, value]) => {
                        const labels: { [key: string]: string } = {
                            journeyWhy: "My 'Why'",
                            hopes: "My Hopes",
                            fears: "My Fears",
                            desiredFeelings: "My Desired Feelings",
                            medicalSnapshot: "My Medical Snapshot",
                            supportSystem: "My Support System",
                            customQuestions: "My Custom Questions"
                        };
                        return (
                             <div key={key} className="mb-6">
                                <h2 className="text-xl font-serif font-bold text-brand-charcoal">{labels[key]}</h2>
                                <p className="text-slate-700 whitespace-pre-wrap mt-2">{value || 'Not specified'}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default PrepKitPage;

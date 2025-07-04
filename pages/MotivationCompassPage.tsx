
import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Import the centralized api client
import { useAuth } from '../context/AuthContext';

type Dimension = 'IA' | 'EE' | 'CV';
type Stage = 'intro' | 'quiz' | 'results';
type ProfileType = 'IA' | 'EE' | 'CV' | 'Balanced';

interface Question {
    id: number;
    text: string;
    dimension: Dimension;
}

const questions: Question[] = [
    { id: 1, text: "My sense of satisfaction with my appearance is primarily determined by how I feel about it, regardless of others' opinions.", dimension: 'IA' },
    { id: 2, text: "My desire for this change is rooted in a feeling that I deserve to feel good and comfortable in my own body, purely for my own well-being.", dimension: 'IA' },
    { id: 3, text: "Thoughts about my appearance often distract me from focusing on other important tasks or conversations.", dimension: 'IA' },
    { id: 4, text: "I believe changing my appearance will help me feel more like my 'true' self.", dimension: 'IA' },
    { id: 5, text: "I'm doing this to improve a specific physical function, and the aesthetic change is a secondary benefit.", dimension: 'IA' },
    { id: 6, text: "Achieving my desired appearance would empower me to pursue a long-held personal dream or ambition that feels out of reach right now.", dimension: 'EE' },
    { id: 7, text: "I imagine my enhanced appearance would allow me to participate more fully in activities I genuinely enjoy with others, without self-consciousness.", dimension: 'EE' },
    { id: 8, text: "If my appearance changed, I would feel more comfortable initiating conversations with new people, even if they didn't comment on my looks.", dimension: 'EE' },
    { id: 9, text: "This change is a way for me to move on from a past phase of my life and start fresh.", dimension: 'EE' },
    { id: 10, text: "I feel like a better appearance would give me a competitive edge in my career or social life.", dimension: 'EE' },
    { id: 11, text: "If someone I respected didn't notice or comment on my aesthetic change, I would feel deeply disappointed.", dimension: 'CV' },
    { id: 12, text: "I sometimes feel a strong pressure to look a certain way to 'fit in' with a particular group or social circle.", dimension: 'CV' },
    { id: 13, text: "I'm looking forward to the confidence boost I'll get when I see positive reactions from friends and family.", dimension: 'CV' },
    { id: 14, text: "I often compare my appearance to people I see on social media and wish I could look like them.", dimension: 'CV' },
    { id: 15, text: "A big part of this decision is wanting to please my partner or improve my romantic relationships.", dimension: 'CV' },
];

const likertOptions = [
    { value: 1, text: "Doesn't feel true for me at all." },
    { value: 2, text: "Not quite true for me." },
    { value: 3, text: "Sometimes true, sometimes not." },
    { value: 4, text: "Mostly true for me." },
    { value: 5, text: "This feels very true for me." },
];

const PageHeader: React.FC<{ title: string; subtitle: string; imageUrl: string; }> = ({ title, subtitle, imageUrl }) => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-brand-deep-blue/70" />
        <div className="relative container mx-auto px-6 py-16 md:py-20 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">{title}</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">{subtitle}</p>
        </div>
    </div>
);

const IntroScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
    <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-serif text-brand-charcoal mb-4">Welcome to your Motivation Compass.</h2>
        <p className="text-lg text-slate-600 mb-8">
            This isn't a test, but a personal reflection tool designed to help you explore the unique reasons guiding your interest in aesthetic changes. Your insights here will illuminate your path, helping you discover what truly aligns with your deepest desires for well-being and confidence.
        </p>
        <button onClick={onStart} className="bg-brand-teal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-charcoal transition-all duration-300 transform hover:scale-105">
            Begin Reflection
        </button>
    </div>
);

const QuizScreen: React.FC<{ onComplete: (scores: Record<Dimension, number>) => void }> = ({ onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const handleAnswer = (questionId: number, value: number) => {
        const newAnswers = { ...answers, [questionId]: value };
        setAnswers(newAnswers);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const scores: Record<Dimension, number> = { IA: 0, EE: 0, CV: 0 };
            questions.forEach(q => {
                scores[q.dimension] += newAnswers[q.id] || 0;
            });
            onComplete(scores);
        }
    };

    const handleSkip = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // This is the last question, so we complete the quiz.
            const scores: Record<Dimension, number> = { IA: 0, EE: 0, CV: 0 };
            questions.forEach(q => {
                scores[q.dimension] += answers[q.id] || 0;
            });
            onComplete(scores);
        }
    };

    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                <div className="bg-brand-teal h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}></div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 text-center">
                <p className="text-sm font-semibold text-brand-teal uppercase tracking-wider mb-4">Question {currentQuestionIndex + 1} of {questions.length}</p>
                <h3 className="text-2xl md:text-3xl font-serif text-brand-charcoal mb-8 min-h-[100px] flex items-center justify-center">{questions[currentQuestionIndex].text}</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    {likertOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(questions[currentQuestionIndex].id, option.value)}
                            className="p-3 border rounded-md hover:bg-brand-light-teal hover:border-brand-teal transition-colors duration-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
                <div className="mt-6">
                    <button
                        onClick={handleSkip}
                        className="text-sm text-slate-500 hover:text-brand-teal font-semibold hover:underline"
                    >
                        Skip this question
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- ResultsScreen and its Sub-components ---

const playbookData: any = {
    IA: {
        metaphor: "Your Inner Compass: Guiding You Home.",
        description: "Your motivations are strongly aligned with a deep, internal sense of self. You're seeking a change that resonates with who you truly are, aiming for a feeling of rightness and peace that is independent of external opinions. This is a powerful foundation for a fulfilling journey.",
        profile: {
            strengths: "Authenticity & Self-Direction. You have a strong connection to your inner world and a clear sense of what feels right for you. This makes you less susceptible to passing trends and more likely to achieve a result that brings you long-term satisfaction.",
            growthAreas: "Holistic Preparation. Your focus on inner feeling is a strength, but don't forget the practical side. Ensure you're just as prepared for the physical recovery and logistical aspects of your journey as you are for the emotional ones."
        },
        actionPlan: {
            'Mindful Self-Exploration': "Practice the 'Resilience Test': Imagine you've had the procedure, but for some reason, no one notices. Sit with that feeling. Does your desire for the change remain strong? This journaling exercise reinforces that you're doing this for yourself.",
            'Practical Preparation': "Focus your research on a surgeon's philosophy. Ask them to describe their approach to 'natural results.' Your goal is to find a partner whose aesthetic sense aligns with your internal vision.",
            'Empowered Communication': "Practice articulating your 'why' to a trusted friend. Can you explain your motivation without mentioning anyone else's opinion? This strengthens your narrative and prepares you for your consultation."
        },
        journalPrompt: "The 'Resilience Test' Prompt: Imagine you've undergone your procedure and are happy with the result, but no one in your life comments on it. How do you feel? What does this tell you about the true source of your desire for this change?",
        firstStep: {
            text: "Your Inner Compass is strong. Your next step is to translate that inner vision into a concrete plan. Start by building your Consultation Prep Kit, focusing on the 'My Vision' section.",
            link: "/prep-kit"
        }
    },
    EE: {
        metaphor: "The Catalyst for Your Next Chapter.",
        description: "You see this journey as a key to unlocking new experiences and capabilities. Your motivation is about empowerment—gaining the confidence to engage with the world more fully, pursue new goals, and live a life with fewer self-imposed limitations. This is a proactive and ambitious path.",
        profile: {
            strengths: "Ambition & Proactivity. You're a goal-setter who sees this journey as a strategic step toward a fuller life. Your proactive mindset is a huge asset for planning and navigating recovery.",
            growthAreas: "Patience Through Process. Your ambition is powerful, but remember that recovery has its own timeline. Practice patience and self-compassion, and celebrate small milestones along the way."
        },
        actionPlan: {
            'Mindful Self-Exploration': "Explore 'Non-Surgical Actions': Beyond surgery, what are 1-2 non-surgical actions you can take right now to move toward your larger life goals? This builds momentum and reinforces that your power isn't solely tied to the procedure.",
            'Practical Preparation': "Map your recovery against your goals. Create a realistic timeline that accounts for downtime. How can you use your recovery period productively to plan your next steps?",
            'Empowered Communication': "Frame your consultation questions around your goals. Ask, 'Given my goal to [e.g., confidently network at events], what is a realistic timeline for feeling socially ready post-procedure?'"
        },
        journalPrompt: "The 'Non-Surgical Actions' Prompt: Beyond this procedure, what are 1-2 non-surgical actions you could take in the next month to start building the confidence or skills needed for your next chapter? How can this journey be one part of a larger strategy for growth?",
        firstStep: {
            text: "Your motivation is a powerful catalyst. To build on this momentum, your next step is to create a strategic plan. Use the Consultation Prep Kit to map out your key questions and recovery timeline.",
            link: "/prep-kit"
        }
    },
    CV: {
        metaphor: "Your Social Mirror: Reflecting Connection.",
        description: "You possess a Sensitive Social Radar. You have a keen awareness of how your appearance might be perceived, and you deeply value harmonious social connections. This sensitivity can be a powerful asset in navigating relationships. Let's explore how this strength can guide your journey, ensuring your inner peace is always your truest north star.",
        profile: {
            strengths: "Empathy & Social Attunement. You are highly skilled at understanding social dynamics and the feelings of others. This makes you a thoughtful friend and partner.",
            growthAreas: "Anchoring in Self-Validation. Your social radar is a gift, but it can sometimes be overwhelming. The key is to add an 'Inner Compass' to your toolkit, ensuring that your own feelings and satisfaction are the ultimate measure of success."
        },
        actionPlan: {
            'Mindful Self-Exploration': "Practice the 'Powerful Juxtaposition': Journal about this scenario: 'If everyone in my life praised my change, but I didn't feel inner peace, would it be a success?' This helps differentiate external validation from internal satisfaction.",
            'Practical Preparation': "Focus on finding a surgeon who excels at subtle, natural-looking results. In your consultation, use the phrase, 'My goal is to look like the best version of myself, not a different person.'",
            'Empowered Communication': "Prepare responses for navigating feedback. Think about a kind but firm way to respond to intrusive questions. Having a script ready (e.g., 'Thank you for your thoughts, this was a very personal decision for me') can be empowering."
        },
        journalPrompt: "The 'Powerful Juxtaposition' Prompt: If everyone in your life praised your change, but you didn't feel inner peace or satisfaction, would the journey have been a success? Conversely, if you felt deep inner peace but no one noticed, would that be enough? What does this reveal about what you truly seek?",
        firstStep: {
            text: "Your Social Mirror reflects a keen awareness. Your next step is to build a bridge between that awareness and your inner voice by articulating your goals. The Consultation Prep Kit is the perfect place to start.",
            link: "/prep-kit"
        }
    },
    Balanced: {
        metaphor: "A Harmonious Blend: The Complete Picture.",
        description: "Your motivations are well-balanced across internal, external, and social dimensions. You have a healthy mix of self-awareness, ambition, and social connection guiding your journey. This holistic perspective is a significant strength, allowing you to prepare for your journey from all angles.",
        profile: {
            strengths: "Holistic Perspective & Adaptability. You see the big picture. You understand that this journey has internal, practical, and social dimensions, which prepares you to handle its complexities with grace.",
            growthAreas: "Prioritizing Your Primary Driver. With balance comes the challenge of focus. In moments of stress or uncertainty, which dimension—your inner feeling, your goals, or your social harmony—will you prioritize as your 'truest north'? Knowing this in advance is a source of strength."
        },
        actionPlan: {
            'Mindful Self-Exploration': "Identify your 'tie-breaker' motivation. If you had to choose, which is most important: feeling at peace with yourself (IA), achieving a specific life goal (EE), or feeling confident in your relationships (CV)? Knowing your primary driver helps in decision-making.",
            'Practical Preparation': "Use the 'Consultation Prep Kit' to its fullest. Your balanced profile means you're naturally inclined to think about all the angles—from your 'why' to your support system. The kit is tailor-made for your comprehensive approach.",
            'Empowered Communication': "Your balanced view makes you a great communicator. Practice explaining your decision in a way that touches on all three aspects: 'I'm doing this for me, to help me achieve X, and to feel more comfortable with others.'"
        },
        journalPrompt: "The 'Tie-Breaker' Prompt: Imagine you are faced with a difficult decision during your journey. If you could only satisfy one of these needs, which would you prioritize: your own sense of inner peace, the achievement of an external goal, or the harmony of your social relationships? What does your choice tell you about your ultimate priority?",
        firstStep: {
            text: "Your balanced profile is a great strength. Your next step is to organize your holistic perspective into an actionable plan. The Consultation Prep Kit is the perfect tool for you.",
            link: "/prep-kit"
        }
    }
};

const ResultsScreen: React.FC<{ profile: ProfileType; onRetake: () => void; scores: Record<Dimension, number> | null }> = ({ profile, onRetake, scores }) => {
    const data = playbookData[profile];
    if (!data) return null;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-brand-teal">{data.metaphor}</h2>
                <p className="mt-4 text-lg text-slate-600">{data.description}</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200">
                <h3 className="text-2xl md:text-3xl font-bold font-serif text-brand-deep-blue text-center mb-8">Your Personal Journey Playbook</h3>
                
                <div className="space-y-6">
                    <div className="bg-brand-light-gray p-6 rounded-lg border border-gray-200/80">
                        <h4 className="font-bold text-lg font-serif text-brand-charcoal">Part 1: Your Motivational Profile</h4>
                        <p className="mt-2 text-slate-600"><strong className="font-semibold text-slate-700">Key Strengths:</strong> {data.profile.strengths}</p>
                        <p className="mt-2 text-slate-600"><strong className="font-semibold text-slate-700">Potential Growth Areas:</strong> {data.profile.growthAreas}</p>
                    </div>
                     <div className="bg-brand-light-gray p-6 rounded-lg border border-gray-200/80">
                        <h4 className="font-bold text-lg font-serif text-brand-charcoal">Part 2: Your Curated Action Plan</h4>
                        <p className="mt-2 text-slate-600"><strong className="font-semibold text-slate-700">Mindful Self-Exploration:</strong> {data.actionPlan['Mindful Self-Exploration']}</p>
                        <p className="mt-2 text-slate-600"><strong className="font-semibold text-slate-700">Practical Preparation:</strong> {data.actionPlan['Practical Preparation']}</p>
                        <p className="mt-2 text-slate-600"><strong className="font-semibold text-slate-700">Empowered Communication:</strong> {data.actionPlan['Empowered Communication']}</p>
                    </div>
                     <div className="bg-brand-light-gray p-6 rounded-lg border border-gray-200/80">
                        <h4 className="font-bold text-lg font-serif text-brand-charcoal">Part 3: Deep Reflections</h4>
                         <p className="mt-2 text-slate-600"><strong className="font-semibold text-slate-700">Your Personal Journaling Prompt:</strong> {data.journalPrompt}</p>
                    </div>
                </div>

                 <div className="mt-10 p-6 bg-brand-sand/40 rounded-lg text-center border border-brand-sand/60">
                    <h4 className="font-bold text-lg font-serif text-brand-charcoal">Your First Step</h4>
                    <p className="mt-2 text-brand-charcoal max-w-xl mx-auto">{data.firstStep.text}</p>
                    <Link to={data.firstStep.link} state={{ profile: profile, scores: scores }} className="mt-4 inline-block bg-brand-charcoal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-teal transition-all duration-300 transform hover:scale-105">
                        Let's Go &rarr;
                    </Link>
                </div>
            </div>
            
            <div className="text-center mt-12">
                <p className="text-slate-500 mb-4">Your Motivation Compass Blueprint is a living document, designed to evolve with you. Revisit it anytime.</p>
                <button onClick={onRetake} className="text-sm text-brand-teal hover:underline font-semibold">
                    Retake the Reflection
                </button>
            </div>
        </div>
    );
}


const MotivationCompassPage: React.FC = () => {
    const [stage, setStage] = useState<Stage>('intro');
    const [scores, setScores] = useState<Record<Dimension, number> | null>(null);
    const { isAuthenticated, token, updateUser } = useAuth();

    const profile = useMemo((): ProfileType | null => {
        if (!scores) return null;
        const { IA, EE, CV } = scores;
        const maxScore = Math.max(IA, EE, CV);
        const winners = [];
        if (IA === maxScore) winners.push('IA');
        if (EE === maxScore) winners.push('EE');
        if (CV === maxScore) winners.push('CV');
        
        if (winners.length > 1) return 'Balanced';
        return winners[0] as ProfileType;

    }, [scores]);

    const handleStart = () => setStage('quiz');

    const handleQuizComplete = async (finalScores: Record<Dimension, number>) => {
        setScores(finalScores);
        setStage('results');

        const { IA, EE, CV } = finalScores;
        const maxScore = Math.max(IA, EE, CV);
        const winners = [];
        if (IA === maxScore) winners.push('IA');
        if (EE === maxScore) winners.push('EE');
        if (CV === maxScore) winners.push('CV');
        
        const finalProfile = winners.length > 1 ? 'Balanced' : (winners[0] as ProfileType);

        if (isAuthenticated) {
            try {
                const compassResult = {
                    scores: finalScores,
                    profile: finalProfile,
                };
                
                // Use the centralized api client
                const response = await api.put('/api/profile/compass', compassResult);

                if(response.data) {
                    updateUser(response.data);
                }

            } catch (error) {
                console.error("Failed to save compass results:", error);
            }
        }
    };
    const handleRetake = () => {
        setScores(null);
        setStage('intro');
    };

    const renderContent = () => {
        switch (stage) {
            case 'intro':
                return <IntroScreen onStart={handleStart} />;
            case 'quiz':
                return <QuizScreen onComplete={handleQuizComplete} />;
            case 'results':
                if (profile) {
                    return <ResultsScreen profile={profile} onRetake={handleRetake} scores={scores} />;
                }
                return <div>Calculating results...</div>;
            default:
                return <IntroScreen onStart={handleStart} />;
        }
    };

    return (
        <div>
            <PageHeader
                title="Your Motivation Compass"
                subtitle="A personal reflection tool to illuminate your path to self-alignment."
                imageUrl="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&h=900&auto=format&fit=crop"
            />
            <div className="container mx-auto px-6 py-12">
                {renderContent()}
            </div>
        </div>
    );
};

export default MotivationCompassPage;

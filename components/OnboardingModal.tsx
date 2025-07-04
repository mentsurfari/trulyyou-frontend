
import React from 'react';
import { Link } from 'react-router-dom';

interface OnboardingModalProps {
  onClose: () => void;
  username: string;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose, username }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fade-in">
        <div 
            className="bg-white rounded-lg shadow-2xl max-w-lg w-full text-center p-8 m-4"
        >
            <h2 className="text-3xl font-serif text-brand-deep-blue mb-4">Welcome to TrulyYou, {username}</h2>
            <p className="text-slate-600 mb-8">
                Your sanctuary is ready. The best way to begin your journey is by discovering your 'why'. The Motivation Compass is a short, personal reflection to help you find it.
            </p>
            <Link 
                to="/motivation-compass" 
                onClick={onClose}
                className="w-full bg-brand-teal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-charcoal transition-all duration-300 transform hover:scale-105 inline-block"
            >
                Start My Reflection
            </Link>
            <button 
                onClick={onClose} 
                className="mt-4 text-sm text-slate-500 hover:text-brand-teal font-semibold hover:underline"
            >
                Maybe Later
            </button>
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
            }
        `}</style>
    </div>
);

export default OnboardingModal;

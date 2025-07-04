import React from 'react';

const MedicalDisclaimer: React.FC = () => {
    return (
        <div className="mt-16 bg-gray-50 border-t border-gray-200 p-6 rounded-lg text-center max-w-4xl mx-auto">
            <h4 className="font-semibold text-brand-charcoal">Medical Disclaimer</h4>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                The content on this platform, including community discussions and shared experiences, is for informational and support purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
        </div>
    );
};

export default MedicalDisclaimer;

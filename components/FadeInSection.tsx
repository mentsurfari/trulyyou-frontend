
import React, { useState, useRef, useEffect } from 'react';

const FadeInSection: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    // No need to observe anymore
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

        const { current } = domRef;
        if (current) {
            observer.observe(current);
        }
        
        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);
    return (
        <div
            ref={domRef}
            className={`transition-opacity duration-1000 ease-in ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'}`}
            style={{transitionProperty: 'opacity, transform', transform: isVisible ? 'translateY(0)' : 'translateY(20px)'}}
        >
            {children}
        </div>
    );
};

export default FadeInSection;

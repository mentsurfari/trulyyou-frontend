
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-deep-blue text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div>
                <p className="font-serif text-2xl mb-2">TrulyYou</p>
                <p className="text-sm text-gray-400">A new standard in patient care.</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 md:mt-0">
                <Link to="/philosophy" className="text-gray-300 hover:text-white transition-colors">Our Philosophy</Link>
                <Link to="/sanctuary-covenant" className="text-gray-300 hover:text-white transition-colors">Sanctuary Covenant</Link>
                <Link to="/for-surgeons" className="text-gray-300 hover:text-white transition-colors">For Surgeons</Link>
            </nav>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
             <p>&copy; {new Date().getFullYear()} TrulyYou Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'; // Import the centralized api client
import { useAuth } from '../context/AuthContext';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register, login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await register(email, password);
            // Automatically log in after successful registration
            const response = await api.post('/api/auth/login', { email, password });
            await login(response.data.access_token);
            // Navigate to profile page with state to trigger onboarding
            navigate('/profile', { state: { isNewUser: true }, replace: true });
        } catch (err: any) {
             setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-brand-light-gray py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-brand-deep-blue font-serif text-center mb-6">
                        Create Your Account
                    </h1>
                     <p className="text-center text-slate-600 mb-6">Join the Sanctuary to begin your journey.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-brand-charcoal">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-teal hover:bg-brand-charcoal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal disabled:bg-gray-400"
                            >
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-brand-teal hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

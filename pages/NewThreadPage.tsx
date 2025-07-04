
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const NewThreadPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        navigate('/login', { state: { from: { pathname: '/sanctuary/new-thread' } } });
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/api/forum/threads', { title, content });
            const newThread = response.data;
            navigate(`/sanctuary/threads/${newThread._id}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create thread. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-brand-light-gray py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h1 className="text-3xl font-bold font-serif text-brand-deep-blue mb-6">Start a New Discussion</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-brand-charcoal">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
                                placeholder="A clear and concise title for your discussion"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-brand-charcoal">
                                Your Message
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={10}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
                                placeholder="Share your thoughts, questions, or experiences here. Remember to follow the Sanctuary Covenant."
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => navigate(-1)} className="text-sm font-semibold text-slate-600 hover:underline">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || !title || !content}
                                className="bg-brand-teal text-white font-semibold px-8 py-2 rounded-full hover:bg-brand-charcoal transition-all duration-300 disabled:bg-gray-400"
                            >
                                {isLoading ? 'Posting...' : 'Post Discussion'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewThreadPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

interface Author {
    _id: string;
    email: string;
}

interface Thread {
    _id: string;
    title: string;
    author: Author;
    createdAt: string;
    replyCount: number;
}

const PageHeader: React.FC<{ title: string; subtitle: string; cta: React.ReactNode }> = ({ title, subtitle, cta }) => (
    <div className="bg-brand-light-gray border-b border-gray-200">
        <div className="container mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-deep-blue">{title}</h1>
                    <p className="mt-2 text-slate-600 max-w-2xl">{subtitle}</p>
                </div>
                <div>{cta}</div>
            </div>
        </div>
    </div>
);

const ThreadRow: React.FC<{ thread: Thread }> = ({ thread }) => (
    <Link to={`/sanctuary/threads/${thread._id}`} className="block hover:bg-brand-light-teal/30 transition-colors duration-200">
        <div className="p-4 md:p-6 grid grid-cols-12 gap-4 items-center border-b border-gray-200">
            <div className="col-span-12 md:col-span-7">
                <h2 className="font-semibold text-brand-charcoal group-hover:text-brand-teal">{thread.title}</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Started by {thread.author.email.split('@')[0]}
                </p>
            </div>
            <div className="col-span-6 md:col-span-2 text-center text-sm text-slate-600">
                {thread.replyCount} {thread.replyCount === 1 ? 'Reply' : 'Replies'}
            </div>
            <div className="col-span-6 md:col-span-3 text-right text-sm text-slate-500">
                {new Date(thread.createdAt).toLocaleDateString()}
            </div>
        </div>
    </Link>
);

const GeneralForumPage: React.FC = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchThreads = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/api/forum/threads');
                setThreads(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load discussions.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchThreads();
    }, []);

    return (
        <div>
            <PageHeader
                title="The General Forum"
                subtitle="A shared space for all members to engage in broader discussions, ask general questions, and find shared wisdom."
                cta={
                    <Link to="/sanctuary/new-thread" className="bg-brand-teal text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-charcoal transition-all duration-300 inline-block shadow-sm">
                        Start a New Discussion
                    </Link>
                }
            />
            <div className="container mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-4 grid grid-cols-12 gap-4 bg-gray-50 border-b border-gray-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div className="col-span-12 md:col-span-7">Discussion</div>
                        <div className="hidden md:block col-span-2 text-center">Replies</div>
                        <div className="hidden md:block col-span-3 text-right">Activity</div>
                    </div>

                    {isLoading ? (
                        <p className="text-center p-10">Loading discussions...</p>
                    ) : error ? (
                        <p className="text-center p-10 text-red-500">{error}</p>
                    ) : threads.length === 0 ? (
                        <p className="text-center p-10 text-slate-500">No discussions yet. Be the first to start one!</p>
                    ) : (
                        <div>
                            {threads.map(thread => <ThreadRow key={thread._id} thread={thread} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GeneralForumPage;

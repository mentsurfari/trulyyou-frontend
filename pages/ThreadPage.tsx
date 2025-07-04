

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { io, Socket } from 'socket.io-client';

// Types
interface Author {
    _id: string;
    email: string;
}

interface Thread {
    _id: string;
    title: string;
    content: string;
    author: Author;
    createdAt: string;
}

interface Reply {
    _id: string;
    content: string;
    author: Author;
    thread: string;
    createdAt: string;
}

const colors = [ 'bg-red-200', 'bg-orange-200', 'bg-amber-200', 'bg-yellow-200', 'bg-lime-200', 'bg-green-200', 'bg-emerald-200', 'bg-teal-200', 'bg-cyan-200', 'bg-sky-200', 'bg-blue-200', 'bg-indigo-200', 'bg-violet-200', 'bg-purple-200', 'bg-fuchsia-200', 'bg-pink-200', 'bg-rose-200' ];
const nameToColor = (name: string) => { let hash = 0; for (let i = 0; i < name.length; i++) { hash = name.charCodeAt(i) + ((hash << 5) - hash); } return colors[Math.abs(hash % colors.length)]; };

// Components
const UserAvatar: React.FC<{ name: string; color: string }> = ({ name, color }) => (
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center font-bold text-brand-deep-blue text-lg flex-shrink-0`}>
        {name.charAt(0).toUpperCase()}
    </div>
);

const PostCard: React.FC<{ post: { author: Author; content: string; createdAt: string } }> = ({ post }) => (
    <div className="flex items-start space-x-4">
        <UserAvatar name={post.author.email} color={nameToColor(post.author.email)} />
        <div className="flex-1">
            <div className="flex items-baseline justify-between">
                <p className="font-bold text-brand-charcoal">{post.author.email.split('@')[0]}</p>
                <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
            <p className="mt-2 text-slate-700 whitespace-pre-wrap">{post.content}</p>
        </div>
    </div>
);

const ReplyForm: React.FC<{ threadId: string }> = ({ threadId }) => {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <div className="mt-8 text-center bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-brand-charcoal">Want to join the conversation?</h3>
                <Link to="/login" state={{ from: location }} className="mt-2 font-semibold text-brand-teal hover:underline">
                    Login or Sign Up to reply.
                </Link>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        setIsSubmitting(true);
        setError('');
        try {
            await api.post(`/api/forum/threads/${threadId}/replies`, { content: content.trim() });
            setContent('');
        } catch (err) {
            setError('Failed to submit reply. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-lg border-t-4 border-brand-teal">
            <h3 className="font-bold font-serif text-xl text-brand-deep-blue">Add Your Reply</h3>
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-teal focus:border-brand-teal mt-4"
                rows={5}
                placeholder="Share your thoughts..."
                required
            />
             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="text-right mt-4">
                <button 
                    type="submit" 
                    disabled={isSubmitting || !content.trim()}
                    className="bg-brand-teal text-white font-semibold px-6 py-2 rounded-full hover:bg-brand-charcoal transition-all duration-300 disabled:bg-gray-400"
                >
                    {isSubmitting ? 'Posting...' : 'Post Reply'}
                </button>
            </div>
        </form>
    );
};

const ThreadPage: React.FC = () => {
    const { threadId } = useParams<{ threadId: string }>();
    const [thread, setThread] = useState<Thread | null>(null);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!threadId) return;

        const fetchThread = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/api/forum/threads/${threadId}`);
                setThread(response.data.thread);
                setReplies(response.data.replies);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load discussion.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchThread();

        socketRef.current = io('https://trulyyou-backend.onrender.com');
        socketRef.current.emit('join_thread', { threadId });
        socketRef.current.on('new_reply', (newReply: Reply) => {
            setReplies(prevReplies => {
                if (prevReplies.some(r => r._id === newReply._id)) return prevReplies;
                return [...prevReplies, newReply];
            });
        });
        
        return () => { if (socketRef.current) socketRef.current.disconnect(); };
    }, [threadId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [replies]);

    if (isLoading) return <p className="text-center p-20">Loading discussion...</p>;
    if (error) return <p className="text-center p-20 text-red-500">{error}</p>;
    if (!thread) return <p className="text-center p-20">Discussion not found.</p>;

    return (
        <div className="bg-brand-light-gray py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-sm mb-4">
                         <Link to="/sanctuary/general-forum" className="text-brand-teal hover:underline">
                            &larr; Back to General Forum
                        </Link>
                    </div>

                    {/* Original Post */}
                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
                        <h1 className="text-2xl md:text-3xl font-bold font-serif text-brand-deep-blue">{thread.title}</h1>
                        <div className="mt-6 pt-6 border-t">
                            <PostCard post={thread} />
                        </div>
                    </div>

                    {/* Replies */}
                    <div className="space-y-6 mt-8">
                        {replies.map(reply => (
                            <div key={reply._id} className="bg-white p-6 rounded-lg shadow-sm border">
                                <PostCard post={reply} />
                            </div>
                        ))}
                         <div ref={bottomRef} />
                    </div>

                    {/* Reply Form */}
                    <ReplyForm threadId={threadId!} />
                </div>
            </div>
        </div>
    );
};

export default ThreadPage;

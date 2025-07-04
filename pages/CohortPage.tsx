

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import api from '../api'; // Import the centralized api client
import { useAuth } from '../context/AuthContext';
import { io, Socket } from 'socket.io-client';

// Types
interface PostAuthor {
    _id: string;
    email: string;
}

interface Post {
    _id: string;
    content: string;
    author: PostAuthor;
    cohort: string;
    createdAt: string;
}

interface Cohort {
    _id: string;
    name: string;
    description: string;
    procedure_type: string;
    recovery_phase: string;
}

const colors = [
    'bg-red-200', 'bg-orange-200', 'bg-amber-200', 'bg-yellow-200', 'bg-lime-200',
    'bg-green-200', 'bg-emerald-200', 'bg-teal-200', 'bg-cyan-200', 'bg-sky-200',
    'bg-blue-200', 'bg-indigo-200', 'bg-violet-200', 'bg-purple-200', 'bg-fuchsia-200',
    'bg-pink-200', 'bg-rose-200'
];

const nameToColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
};


const UserAvatar: React.FC<{ name: string; color: string }> = ({ name, color }) => (
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center font-bold text-brand-deep-blue text-lg flex-shrink-0`}>
        {name.charAt(0).toUpperCase()}
    </div>
);

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="flex items-start space-x-4">
        <UserAvatar name={post.author.email} color={nameToColor(post.author.email)} />
        <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-baseline justify-between">
                <p className="font-bold text-brand-charcoal">{post.author.email.split('@')[0]}</p>
                <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
            <p className="mt-2 text-slate-700 whitespace-pre-wrap">{post.content}</p>
        </div>
    </div>
);

const PostForm: React.FC<{ cohortId: string }> = ({ cohortId }) => {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !isAuthenticated) return;

        setIsSubmitting(true);
        setError('');
        try {
            // Use the centralized api client, interceptor handles the token
            await api.post(`/api/cohorts/${cohortId}/posts`, { content: content.trim() });
            setContent('');
        } catch (err) {
            setError('Failed to submit post. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-lg border">
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-teal focus:border-brand-teal"
                rows={4}
                placeholder="Share your experience..."
                required
            />
             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="text-right mt-2">
                <button 
                    type="submit" 
                    disabled={isSubmitting || !content.trim()}
                    className="bg-brand-teal text-white font-semibold px-6 py-2 rounded-full hover:bg-brand-charcoal transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Posting...' : 'Post'}
                </button>
            </div>
        </form>
    );
};


const SanctuaryCovenant: React.FC = () => (
    <div className="bg-brand-light-teal/30 p-6 rounded-lg border-2 border-brand-teal/50 sticky top-24">
        <h3 className="text-xl font-bold font-serif text-brand-deep-blue mb-4 text-center">Our Sanctuary Covenant</h3>
        <ul className="space-y-2 text-sm text-brand-charcoal">
            <li><strong>Share Your Experience, Not Advice</strong></li>
            <li><strong>Celebrate Vulnerability</strong></li>
            <li><strong>Honor Each Unique Journey</strong></li>
            <li><strong>Assume Best Intent</strong></li>
        </ul>
        <div className="text-center mt-4">
             <Link to="/sanctuary-covenant" className="text-sm text-brand-teal font-semibold hover:underline">Read the full Covenant &rarr;</Link>
        </div>
    </div>
);

const LoginToPost: React.FC = () => {
    const location = useLocation();
    return (
        <div className="mt-8 text-center bg-white p-6 rounded-lg border">
            <h3 className="font-semibold text-brand-charcoal">Want to join the conversation?</h3>
            <p className="text-slate-600 mt-2">Create an account or sign in to share your experience.</p>
            <div className="mt-4 flex gap-4 justify-center">
                <Link to="/login" state={{ from: location }} className="bg-brand-sand text-brand-charcoal font-semibold px-6 py-2 rounded-full hover:bg-brand-charcoal hover:text-white transition-all duration-300">
                    Login
                </Link>
                <Link to="/signup" className="bg-brand-teal text-white font-semibold px-6 py-2 rounded-full hover:bg-brand-charcoal transition-all duration-300">
                    Sign Up
                </Link>
            </div>
        </div>
    )
};


const CohortPage: React.FC = () => {
    const { cohortId } = useParams<{ cohortId: string }>();
    const { isAuthenticated } = useAuth();
    const [cohort, setCohort] = useState<Cohort | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cohortId) return;

        const fetchCohortAndPosts = async () => {
            setIsLoading(true);
            try {
                // Use the centralized api client
                const postsResponse = await api.get(`/api/cohorts/${cohortId}/posts`);
                setPosts(postsResponse.data.posts);
                setCohort(postsResponse.data.cohort);
            } catch (err: any) {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to load cohort data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCohortAndPosts();

        // Setup WebSocket connection using the environment variable
        if (process.env.REACT_APP_API_URL) {
            socketRef.current = io(process.env.REACT_APP_API_URL);
            
            socketRef.current.emit('join_cohort', { cohortId });

            socketRef.current.on('new_post', (newPost: Post) => {
                // Avoid adding duplicate posts from the sender
                setPosts(prevPosts => {
                    if (prevPosts.some(p => p._id === newPost._id)) {
                        return prevPosts;
                    }
                    return [...prevPosts, newPost];
                });
            });
            
            // Clean up on component unmount
            return () => {
                if (socketRef.current) {
                    socketRef.current.disconnect();
                }
            };
        }

    }, [cohortId]);
    
    useEffect(() => {
        // Scroll to bottom when new post is added
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [posts]);


    if (isLoading) {
        return (
             <div className="flex justify-center items-center py-40">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-teal"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-600 bg-red-100 p-4 rounded-md my-20 container mx-auto">{error}</p>;
    }

    if (!cohort) {
        return <p className="text-center my-20">Cohort not found.</p>;
    }

    return (
        <div className="bg-brand-light-gray min-h-screen">
            <div className="container mx-auto px-6 py-12">
                 <div className="relative bg-cover bg-center rounded-lg shadow-lg overflow-hidden border border-gray-200 p-8 md:p-12 text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1600&h=900&auto=format&fit=crop')" }}>
                    <div className="absolute inset-0 bg-brand-deep-blue/60 rounded-lg" />
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-4xl font-bold font-serif">{cohort.name}</h1>
                        <p className="mt-2 text-lg text-gray-200">{cohort.description}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    <div className="md:col-span-2">
                        <div className="space-y-6">
                            {posts.map(post => <PostCard key={post._id} post={post} />)}
                             <div ref={bottomRef} />
                        </div>
                        {isAuthenticated ? (
                            <PostForm cohortId={cohortId!} />
                        ) : (
                            <LoginToPost />
                        )}
                    </div>
                    <div className="md:col-span-1">
                        <SanctuaryCovenant />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CohortPage;
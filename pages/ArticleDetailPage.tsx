
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from './libraryData';

const ArticleDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const article = articles.find(a => a.slug === slug);

    if (!article) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold font-serif">Article not found</h2>
                <Link to="/library" className="text-brand-teal hover:underline mt-4 inline-block">
                    &larr; Back to The Library
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url('${article.imageUrl}')` }}>
                <div className="absolute inset-0 bg-brand-deep-blue/60" />
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-12">
                    <p className="text-sm font-semibold text-brand-sand uppercase tracking-wider">{article.category}</p>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-white mt-2 max-w-4xl">{article.title}</h1>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                 <div className="max-w-3xl mx-auto">
                    <div 
                        className="prose max-w-none" 
                        dangerouslySetInnerHTML={{ __html: article.htmlContent }} 
                    />
                    <div className="mt-12 border-t pt-8">
                        <Link to="/library" className="text-brand-teal font-semibold hover:underline">
                             &larr; Back to The Library
                        </Link>
                    </div>
                 </div>
            </div>

             <style>{`
                .prose {
                    color: #264653;
                    line-height: 1.7;
                }
                .prose h3 {
                    font-family: 'Lora', serif;
                    font-size: 1.75rem;
                    line-height: 1.4;
                    font-weight: 700;
                    color: #0D2C40;
                    margin-top: 2.5em;
                    margin-bottom: 1em;
                    padding-bottom: 0.25em;
                    border-bottom: 1px solid #e5e7eb;
                }
                .prose h4 {
                    font-family: 'Lora', serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #264653;
                    margin-top: 2em;
                    margin-bottom: 0.5em;
                }
                .prose p, .prose ul, .prose li, .prose table {
                    font-family: 'Inter', sans-serif;
                    margin-bottom: 1.25em;
                }
                 .prose ul {
                    list-style-position: outside;
                    padding-left: 1.5rem;
                 }
                 .prose ol {
                    list-style-position: outside;
                    padding-left: 1.5rem;
                 }
                .prose strong {
                    color: #0D2C40;
                }
                .prose a {
                    color: #2A9D8F;
                    text-decoration: none;
                    font-weight: 500;
                }
                .prose a:hover {
                    text-decoration: underline;
                }
                .prose .takeaways-box {
                    background-color: #E9F5F3;
                    border-left: 4px solid #2A9D8F;
                    padding: 1.5rem;
                    margin: 2rem 0;
                    border-radius: 0.25rem;
                }
                .prose .takeaways-box p, .prose .takeaways-box ul, .prose .takeaways-box li {
                     margin-bottom: 0.75rem;
                }
                 .prose th, .prose td {
                    color: #0D2C40;
                    border: 1px solid #e5e7eb;
                    padding: 0.5rem 1rem;
                }
                 .prose th {
                    background-color: #F7F9FA;
                 }
            `}</style>
        </div>
    );
};

export default ArticleDetailPage;

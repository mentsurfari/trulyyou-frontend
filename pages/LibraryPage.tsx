
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { articles as allArticles, Article } from './libraryData';
import FadeInSection from '../components/FadeInSection';

const PageHeader: React.FC<{ title: string; subtitle: string; imageUrl: string; }> = ({ title, subtitle, imageUrl }) => (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-brand-deep-blue/70" />
        <div className="relative container mx-auto px-6 py-20 md:py-24 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">{title}</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">{subtitle}</p>
        </div>
    </div>
);

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
    <Link to={`/library/${article.slug}`} className="block group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1">
        <div className="overflow-hidden">
            <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <p className="text-sm font-semibold text-brand-teal uppercase tracking-wider">{article.category}</p>
            <h3 className="text-xl font-bold font-serif text-brand-charcoal mt-2 mb-3">{article.title}</h3>
            <p className="text-slate-600 text-sm flex-grow">{article.description}</p>
            <div className="mt-4 text-brand-teal font-semibold group-hover:underline">
                Read More &rarr;
            </div>
        </div>
    </Link>
);


const LibraryPage: React.FC = () => {
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(allArticles.map(a => a.category))];
        return ['All', ...uniqueCategories];
    }, []);

    const [activeCategory, setActiveCategory] = useState('All');

    const filteredArticles = useMemo(() => {
        if (activeCategory === 'All') {
            return allArticles;
        }
        return allArticles.filter(article => article.category === activeCategory);
    }, [activeCategory]);

    return (
        <div>
            <PageHeader
                title="The Library"
                subtitle="Your Sanctuary for empathetic, evidence-based content. Explore articles designed to support and inform your unique journey."
                imageUrl="https://images.unsplash.com/photo-1505043203333-e18ae13a3a41?q=80&w=1600&h=900&auto=format&fit=crop"
            />
            
            <div className="container mx-auto px-6 py-16">
                 {allArticles.length > 0 ? (
                    <>
                        <div className="flex justify-center flex-wrap gap-2 mb-12">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                                        activeCategory === category
                                            ? 'bg-brand-teal text-white shadow'
                                            : 'bg-white text-brand-charcoal hover:bg-brand-light-teal border border-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <FadeInSection>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredArticles.map(article => (
                                    <ArticleCard key={article.slug} article={article} />
                                ))}
                            </div>
                        </FadeInSection>
                    </>
                ) : (
                    <div className="text-center py-20 bg-brand-light-gray rounded-lg">
                        <h3 className="text-2xl font-serif text-brand-deep-blue">The Library is Currently Empty</h3>
                        <p className="mt-2 text-slate-600">Please check back soon for new content.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LibraryPage;

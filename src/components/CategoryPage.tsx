/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tag as TagIcon, Search, Eye, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Category, Article, Author } from '../types';
import { SEED_AUTHORS } from '../seedData';

interface CategoryPageProps {
  category: Category;
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export default function CategoryPage({
  category,
  articles,
  onSelectArticle,
}: CategoryPageProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState('');

  // Collect and deduplicate tags for this category's articles
  const availableTags = Array.from(
    new Set(articles.flatMap((art) => art.tags))
  );

  const getAuthorName = (authorId: string) => {
    return SEED_AUTHORS.find(a => a.id === authorId)?.name || 'Editorial Team';
  };

  const filteredArticles = articles.filter((art) => {
    const matchesTag = activeTag ? art.tags.includes(activeTag) : true;
    const matchesSearch = localSearch.trim()
      ? art.title.toLowerCase().includes(localSearch.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(localSearch.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id={`category-page-${category.id}`}>
      
      {/* Category Banner Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[240px] md:min-h-[300px] flex items-center p-6 md:p-12 mb-8 shadow-md">
        <div className="absolute inset-0 z-0">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 font-mono bg-orange-950/80 px-3 py-1 rounded-full border border-orange-850">
            Active Channel
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white m-0">
            {category.name}
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
            {category.description}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar row */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs mb-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        
        {/* Tag Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
            <TagIcon className="w-3.5 h-3.5" /> Filter tags:
          </span>
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
              activeTag === null
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            All Tags
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                activeTag === tag
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Local Search input */}
        <div className="relative w-full md:w-64 flex-shrink-0">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search this channel..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
          />
        </div>

      </div>

      {/* Post List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((art) => (
            <article 
              key={art.id}
              onClick={() => onSelectArticle(art.slug)}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group cursor-pointer"
            >
              {/* Featured Image wrapper */}
              <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src={art.featuredImage} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-gray-700 shadow-sm">
                  {art.readTime}
                </div>
              </div>

              {/* Main Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-2 text-[10px] text-gray-400 font-mono uppercase">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {art.publishDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {art.views} reads</span>
                  </div>

                  <h3 className="text-base font-bold font-display text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-700">{getAuthorName(art.authorId)}</span>
                  </div>
                  <span className="text-xs font-bold text-orange-600 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                    Read Post <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-500 bg-white border border-gray-100 rounded-2xl">
            <p className="text-sm font-semibold text-gray-800">No articles found matching filters</p>
            <p className="text-xs mt-1">Try resetting tags or structural keywords</p>
          </div>
        )}
      </div>

      {/* SEO Content Block — High authority contextual text used on world-class blog directory sites */}
      <div className="bg-slate-50 border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-2xs leading-relaxed" id="seo-authority-content">
        <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">Topic Authority Deep Dive</h3>
        <div className="text-xs text-gray-600 space-y-4">
          <p>{category.seoBlock}</p>
          <p>
            By consolidating practical conditioning guides, verified workout templates, nutritional reviews, and sport-specific physical benchmarks, we establish structured clusters of topical relevance. Our coaching and research team constantly validates training plans, athletic studies, and product testing data to serve our reader base with state-of-the-art conditioning models.
          </p>
        </div>
      </div>

    </div>
  );
}

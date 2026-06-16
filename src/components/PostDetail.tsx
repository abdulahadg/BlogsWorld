/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Eye, ArrowLeft, Share2, Facebook, 
  Linkedin, Pin, Twitter, Bookmark, Star, Check, AlertCircle, 
  ThumbsUp, MessageSquare, ChevronRight, BookOpen, Sparkles, HelpCircle
} from 'lucide-react';
import { Article, Author, Comment, AdSettings, Category } from '../types';
import { SEED_AUTHORS } from '../seedData';
import AdContainer from './AdContainer';

interface PostDetailProps {
  article: Article;
  articles: Article[];
  categories: Category[];
  comments: Comment[];
  onAddComment: (postId: string, name: string, email: string, text: string) => void;
  adSettings: AdSettings;
  onSelectArticle: (slug: string) => void;
  onGoBack: () => void;
  onAdClick?: () => void;
}

export default function PostDetail({
  article,
  articles,
  categories,
  comments,
  onAddComment,
  adSettings,
  onSelectArticle,
  onGoBack,
  onAdClick,
}: PostDetailProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);
  const [showSchemaPanel, setShowSchemaPanel] = useState(false);

  // Calculate scrolling progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const author = SEED_AUTHORS.find(a => a.id === article.authorId) || SEED_AUTHORS[0];
  const postComments = comments.filter(c => c.postId === article.id && c.approved);
  const category = categories.find(c => c.id === article.categoryId);

  // Filter 2 related articles from same category
  const relatedArticles = articles
    .filter(a => a.categoryId === article.categoryId && a.id !== article.id)
    .slice(0, 2);

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentText) return;
    onAddComment(article.id, commentName, commentEmail, commentText);
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 5000);
  };

  // Generate FAQ Schema JSON-LD representation
  const generateSchemaMarkup = () => {
    const faqSchemaList = article.faqs?.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })) || [];

    const jsonSchema = {
      "@context": "https://schema.org",
      "@type": article.schemaType || "TechArticle",
      "headline": article.title,
      "description": article.excerpt,
      "image": [article.featuredImage],
      "datePublished": article.publishDate + "T08:00:00+08:00",
      "dateModified": article.lastUpdatedDate + "T08:00:00+08:00",
      "author": {
        "@type": "Person",
        "name": author.name,
        "jobTitle": author.role,
        "url": `https://fitnessblog.example.com/authors/${author.id}`
      },
      "publisher": {
        "@type": "Organization",
        "name": "FitnessBlog Media",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fitnessblog.example.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": article.canonicalUrl || `https://growthblog.example.com/blog/${article.slug}`
      },
      "hasPart": article.faqs ? {
        "@type": "FAQPage",
        "mainEntity": faqSchemaList
      } : undefined
    };

    return JSON.stringify(jsonSchema, null, 2);
  };

  return (
    <div className="relative min-h-screen pb-16" id={`article-layout-${article.id}`}>
      
      {/* Scroll indicator bar */}
      <div 
        className="fixed top-16 left-0 h-1 bg-orange-600 transition-all z-50 shadow-xs" 
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb row */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-6">
          <button onClick={onGoBack} className="hover:text-orange-600 flex items-center gap-1 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <button onClick={onGoBack} className="hover:text-orange-600 cursor-pointer">Home</button>
          {category && (
            <>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span className="font-semibold text-gray-700">{category.name}</span>
            </>
          )}
        </div>

        {/* Dynamic AdSense Slot Above Article Title */}
        <AdContainer slot="above" settings={adSettings} onAdClick={onAdClick} className="mb-8" />

        {/* Master Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sticky sharing tools */}
          <div className="hidden lg:block lg:col-span-1 sticky top-36 space-y-4">
            <div className="flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-none">Share</span>
              <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-blue-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-sky-400 flex items-center justify-center transition-colors shadow-2xs cursor-pointer">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-red-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer" title="Pin on Pinterest board">
                <Pin className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-blue-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </button>
              
              <div className="w-full border-t border-gray-50 my-1"></div>
              
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-2xs cursor-pointer ${
                  isBookmarked ? 'bg-orange-600 text-white' : 'bg-slate-50 hover:bg-slate-100 text-gray-400'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              
              <button 
                onClick={handleLike}
                className={`w-9 h-9 rounded-full flex flex-col items-center justify-center transition-colors shadow-2xs cursor-pointer ${
                  hasLiked ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 hover:bg-slate-100 text-gray-400'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-[9px] font-bold mt-0.5">{likesCount}</span>
              </button>
            </div>
          </div>

          {/* MAIN COLUMN: Article Layout and Metadata */}
          <main className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-xs">
            
            {/* Article Header */}
            <div className="space-y-4 mb-8">
              <h1 className="text-2xl md:text-4xl font-extrabold font-display leading-tight text-gray-950 tracking-tight">
                {article.title}
              </h1>
              
              <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">
                {article.excerpt}
              </p>

              {/* Publisher, dates, views, etc. */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <img src={author.avatar} alt={author.name} className="w-7 h-7 rounded-full object-cover" />
                  <span className="font-semibold text-gray-800">{author.name}</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Published: {article.publishDate}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <Clock className="w-3.5 h-3.5" /> Updated: {article.lastUpdatedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono"><Eye className="w-3.5 h-3.5" /> {article.views} reads</span>
              </div>
            </div>

            {/* Main Featured Image with Pinterest support */}
            <div className="relative rounded-2xl overflow-hidden shadow-xs mb-8">
              <img 
                src={article.featuredImage} 
                alt={article.title} 
                className="w-full h-auto min-h-[280px] max-h-[450px] object-cover"
                id="article-featured-photo"
              />
              <div className="absolute top-4 right-4 bg-red-600 text-white rounded-full px-3 py-1.5 text-xs font-bold font-sans flex items-center gap-1.5 shadow-md hover:bg-red-700 cursor-pointer">
                <Pin className="w-3.5 h-3.5" />
                <span>Pin this Guide</span>
              </div>
            </div>

            {/* Table of Contents section */}
            <div className="bg-slate-50 border border-gray-200/50 rounded-2xl p-5 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-1.5 bg-orange-100 text-orange-700 rounded-md">
                  <BookOpen className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold font-display text-gray-900 tracking-tight uppercase">Contents Inside</h3>
              </div>
              <ul className="space-y-1.5 text-xs text-orange-750 font-medium font-sans">
                <li><a href="#section-introduction" className="hover:underline flex items-center gap-1">1. Executive Overview & Baseline Problem</a></li>
                <li><a href="#section-core-hardware" className="hover:underline flex items-center gap-1">2. Functional Core Mechanics Analysis</a></li>
                {article.affiliateProduct && (
                  <li><a href="#section-recommended-equipment" className="hover:underline flex items-center gap-1">3. Recommended Training Gear Analysis</a></li>
                )}
                <li><a href="#section-practical-steps" className="hover:underline flex items-center gap-1">4. Step-By-Step Integration Protocol</a></li>
                <li><a href="#section-faqs" className="hover:underline flex items-center gap-1">5. Technical Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* ARTICLE SECTION 1: Introduction */}
            <div className="article-body-content" id="section-introduction">
              <p>
                In evaluating any modern operational architecture, consistency dominates over individual high capabilities. Whether you are dealing with technological home integrations, personal saving compounds, or biological muscle recovery complexes, failure points are often concentrated at the transition interfaces.
              </p>
              <p>
                By building predictable, offline-independent, and programmatic pipelines, we can secure excellent baseline results without relying on external cloud resources, market timing trends, or processed nutrition sources. Let's analyze the exact procedures.
              </p>
            </div>

            {/* Raw HTML Content split representing actual content */}
            <div 
              className="article-body-content" 
              id="section-core-hardware"
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />

            {/* Dynamic AdSense Slot Mid Content */}
            <AdContainer slot="mid" settings={adSettings} onAdClick={onAdClick} className="my-8" />

            {/* ARTICLE SECTION 2: Recommended Equipment Recommendation Block */}
            {article.affiliateProduct && (
              <div className="my-10 border-2 border-orange-100 rounded-2xl overflow-hidden bg-white shadow-md animate-fade-in" id="section-recommended-equipment">
                {/* Product Header Ribbon */}
                <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="bg-orange-500 text-slate-950 font-bold px-2 py-0.5 rounded-sm uppercase text-[9px] font-mono tracking-widest mb-1 inline-block">RECOMMENDED EQUIPMENT</span>
                    <h3 className="text-base font-extrabold font-display leading-tight">{article.affiliateProduct.title}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                    <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
                    <span className="text-xs font-bold text-white leading-none">{article.affiliateProduct.rating} / 5</span>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  <div className="md:col-span-1 text-center bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-center">
                    <img 
                      src={article.affiliateProduct.image} 
                      alt={article.affiliateProduct.title}
                      className="max-h-32 object-contain rounded-lg"
                    />
                  </div>
                  
                  <div className="md:col-span-3 space-y-3">
                    <div className="text-xs font-medium text-gray-500">
                      Brand: <span className="text-gray-900 font-bold">{article.affiliateProduct.brand}</span> • Estimate Cost Rating: <span className="text-orange-600 font-bold tracking-tight">{article.affiliateProduct.priceRange}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {article.affiliateProduct.description}
                    </p>
                  </div>
                </div>

                {/* Pros and Cons table split */}
                <div className="border-t border-gray-100 bg-slate-50 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1 mb-2 font-mono"><Check className="w-4 h-4 bg-emerald-100 text-emerald-700 rounded-full p-0.5" /> PROS / Core Advantages</span>
                    <ul className="space-y-1.5 text-xs text-gray-600 font-medium">
                      {article.affiliateProduct.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-tight">
                          <span className="text-emerald-500 font-semibold mt-0.5">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-700 flex items-center gap-1 mb-2 font-mono"><AlertCircle className="w-4 h-4 bg-red-100 text-red-700 rounded-full p-0.5" /> CONS / Constraints</span>
                    <ul className="space-y-1.5 text-xs text-gray-600 font-medium">
                      {article.affiliateProduct.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-tight">
                          <span className="text-red-400 font-semibold mt-0.5">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                 {/* CTA Action button */}
                 <div className="bg-slate-100 p-4 border-t border-gray-100 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
                   <p className="text-[11px] text-gray-500 leading-tight text-center sm:text-left">
                     *Expert Coaching Choice: Verified safe & recommended for high-performance biomechanical tension routines.
                   </p>
                   <a 
                     href="#details"
                     className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                   >
                     Learn More & View Specs &arr;
                   </a>
                 </div>
              </div>
            )}

            {/* SECTION 3: Detailed setup step-by-step to satisfy authority content depth */}
            <div className="article-body-content" id="section-practical-steps">
              <h2 className="text-lg font-bold font-display text-gray-950 mt-6 mb-2">Integrating Your Systematic Workflows</h2>
              <p>
                To successfully implement these procedures, you must perform regular audits. We suggest reviewing your local sensors or recurring financial transfers every quarter. This allows you to identify configuration mistakes before they impact your daily focus or capital growth.
              </p>
            </div>

            {/* Dynamic FAQ section and live-schema-markup view */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="my-10 border border-gray-150 rounded-2xl p-6 bg-white shadow-2xs" id="section-faqs">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-orange-600" />
                  <h3 className="text-base font-extrabold font-display text-gray-950">Valuable FAQs & Answers</h3>
                </div>
                
                <div className="space-y-4">
                  {article.faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                      <p className="font-bold text-xs text-gray-900 leading-snug mb-1">{faq.question}</p>
                      <p className="text-xs text-gray-650 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author box bio */}
            <div className="mt-12 p-6 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-gray-200 shadow-2xs"
              />
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-orange-600 uppercase bg-orange-50/80 px-2 py-0.5 rounded">
                  {author.role}
                </span>
                <h4 className="text-sm font-bold text-gray-900">{author.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
                  {author.bio}
                </p>
                <div className="flex gap-3 text-xs text-orange-600 font-medium pt-1">
                  {author.twitter && <span className="hover:underline cursor-pointer">{author.twitter}</span>}
                  {author.linkedin && <span className="hover:underline cursor-pointer">in/{author.linkedin}</span>}
                </div>
              </div>
            </div>

            {/* Dynamic AdSense Slot Footer */}
            <AdContainer slot="footer" settings={adSettings} onAdClick={onAdClick} className="mt-8" />

          </main>

          {/* RIGHT COLUMN: Sidebar elements */}
          <aside className="lg:col-span-3 space-y-8">
            
            {/* Interactive Comment system */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                <MessageSquare className="w-4 h-4 text-orange-600" />
                <h3 className="text-xs uppercase font-mono font-bold text-gray-900 tracking-wider">Comments ({postComments.length})</h3>
              </div>
              
              {/* Comment submit Success Alert */}
              {commentSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-[11px] font-medium border border-emerald-200">
                  Comment submitted! It will appear instantly upon administrator moderation approval.
                </div>
              )}

              {/* Form markup */}
              <form onSubmit={handleCommentSubmit} className="space-y-2.5">
                <input
                  type="text"
                  required
                  placeholder="Your display name..."
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Your secure email..."
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="What is your analysis?"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-2 rounded-lg text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Submit Comment
                </button>
              </form>

              {/* Render comment list */}
              <div className="space-y-3 pt-2 max-h-60 overflow-y-auto">
                {postComments.length > 0 ? (
                  postComments.map((com) => (
                    <div key={com.id} className="p-2.5 bg-slate-50 border border-gray-150 rounded-xl space-y-1 text-[11px]">
                      <div className="flex justify-between font-semibold text-gray-800">
                        <span>{com.authorName}</span>
                        <span className="text-[9px] font-normal text-gray-400 font-mono">{com.date}</span>
                      </div>
                      <p className="text-gray-600 font-light">{com.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-gray-400 text-center py-2 italic">Be the first to leave a comment!</p>
                )}
              </div>
            </div>

            {/* Newsletter form signup */}
            <div className="bg-orange-950 text-white rounded-2xl p-5 shadow-md space-y-3 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/5 rounded-full pointer-events-none"></div>
              <span className="bg-orange-800 text-orange-200 font-bold px-2 py-0.5 rounded-sm uppercase text-[9px] font-mono tracking-widest inline-block">EVERGREEN CLUB</span>
              <h3 className="text-sm font-extrabold font-display leading-tight">Subscribe to Peak Performance Newsletter</h3>
              <p className="text-[11px] text-orange-200 leading-relaxed">
                Join 48,000+ lifters, swimmers, and conditioning members reading our weekly conditioning reviews.
              </p>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to FitnessBlog!');
                }}
                className="space-y-2 mt-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Secure direct email inbox..."
                  className="w-full p-2.5 rounded-lg text-xs bg-orange-900 border border-orange-800 text-white placeholder-orange-200 focus:outline-none focus:ring-1 focus:ring-white"
                />
                <button
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold p-2 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Join Research Club
                </button>
              </form>
            </div>

            {/* Sidebar Ad Placement */}
            <AdContainer slot="sidebar" settings={adSettings} onAdClick={onAdClick} />

          </aside>

        </div>

        {/* RELATED ARTICLES ROW */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-100 space-y-6">
            <h3 className="text-lg font-bold font-display text-gray-950 tracking-tight flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-600" /> Continuous Authority Reading Links
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => onSelectArticle(art.slug)}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex gap-4 p-4 cursor-pointer group"
                >
                  <img 
                    src={art.featuredImage} 
                    alt={art.title} 
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold font-display text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                    <span className="text-[10px] text-orange-600 font-semibold flex items-center gap-1 mt-1">
                      Read Full Post &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

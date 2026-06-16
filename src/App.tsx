/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Sparkles, TrendingUp, Mail, Shield, CheckCircle, 
  ArrowRight, Users, Facebook, Twitter, Pin, Layers, Eye, 
  ChevronRight, Calendar, Bookmark, Clock, Sliders, PlayCircle
} from 'lucide-react';

import { Article, Category, Comment, AdSettings, GlobalSEO, Subscriber } from './types';
import { SEED_ARTICLES, SEED_CATEGORIES, SEED_AUTHORS } from './seedData';

import Header from './components/Header';
import Footer from './components/Footer';
import PostDetail from './components/PostDetail';
import CategoryPage from './components/CategoryPage';
import AdminPanel from './components/AdminPanel';
import TrustPages from './components/TrustPages';
import AdContainer from './components/AdContainer';
import CookieConsent from './components/CookieConsent';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

// Default comments to seed with
const SEED_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    postId: 'scientific-progressive-overload-manual',
    authorName: 'David K., Trainer',
    authorEmail: 'david.k@physiquecoach.net',
    content: 'Fantastic breakdown of progressive overload. I have been teaching my clients to focus on reps in reserve (RIR) rather than going to complete failure on every single set, and their safety has doubled.',
    date: '2026-06-11',
    approved: true,
  },
  {
    id: 'c-2',
    postId: 'scientific-progressive-overload-manual',
    authorName: 'Clara Jenkins',
    authorEmail: 'clara@fitnesshub.com',
    content: 'Thank you Sarah! Quick question: how do you recommend tracking weekly volume load indices for athletes with inconsistent schedules?',
    date: '2026-06-12',
    approved: true,
  },
  {
    id: 'c-3',
    postId: 'thermodynamics-of-calculated-fat-loss',
    authorName: 'Kenji T.',
    authorEmail: 'kenji@bodybuilders.co',
    content: 'Tracking BMR vs NEAT completely saved my physique prep. Everyone focuses on the 1 hour in the gym, but spontaneous walking accounts for so much more burned energy.',
    date: '2026-06-13',
    approved: true,
  }
];

const DEFAULT_SEO: GlobalSEO = {
  siteName: 'FitnessBlog Authority Group',
  siteTitle: 'FitnessBlog - Actionable Muscle Building, Calculated Fat Loss, and Swimming Conditioning',
  siteDescription: 'An independent publishing portal specializing in evidence-based lifting biomechanics, metabolic fat mobilization, hydrodynamic aquatic parameters, and athletic muscular recovery.',
  robotsTxt: 'User-agent: *\nAllow: /\nSitemap: https://fitnessblog.example.com/sitemap.xml',
  googleAnalyticsId: 'G-72BXLM82',
  pinterestVerification: 'pin_verification_code_2026'
};

const DEFAULT_AD_SETTINGS: AdSettings = {
  enableAboveContent: false,
  enableMidContent: false,
  enableSidebar: false,
  enableInFeed: false,
  enableFooter: false,
  adSensePublisherId: 'pub-9482017382012930',
  simulatedClicks: 421,
  simulatedRPM: 12.50
};

const DEFAULT_SUBSCRIBERS: Subscriber[] = [
  { id: 'sub-1', email: 'coach@strengthlabs.com', date: '2026-06-01', source: 'hero' },
  { id: 'sub-2', email: 'sarah.l@aquathletics.co', date: '2026-06-05', source: 'exit-intent' },
  { id: 'sub-3', email: 'member_fit@healthhub.net', date: '2026-06-10', source: 'sidebar' }
];

export default function App() {
  // Navigation & Page routing States
  const [activePage, setActivePage] = useState<'home' | 'post' | 'category' | 'about' | 'contact' | 'admin'>('home');
  const [activePostSlug, setActivePostSlug] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  
  // Custom niche brand coloration state ('gym' | 'fat-loss' | 'swimming' | 'recovery')
  const [currentNiche, setCurrentNiche] = useState<string>('gym');

  // Core Database lists saved in localStorage
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>(SEED_CATEGORIES);
  const [comments, setComments] = useState<Comment[]>([]);
  const [adSettings, setAdSettings] = useState<AdSettings>(DEFAULT_AD_SETTINGS);
  const [globalSEO, setGlobalSEO] = useState<GlobalSEO>(DEFAULT_SEO);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(DEFAULT_SUBSCRIBERS);

  // Modal displays toggle triggers
  const [trustPageId, setTrustPageId] = useState<string | null>(null);

  // Hero newsletter state
  const [heroEmail, setHeroEmail] = useState('');
  const [heroSubscribed, setHeroSubscribed] = useState(false);

  // Carousel slide state
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Latest Articles pagination simulator
  const [visiblePageCount, setVisiblePageCount] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedArticles = localStorage.getItem('gb_articles');
      if (savedArticles && savedArticles.includes('scientific-progressive-overload-manual')) {
        setArticles(JSON.parse(savedArticles));
      } else {
        setArticles(SEED_ARTICLES);
        localStorage.setItem('gb_articles', JSON.stringify(SEED_ARTICLES));
        // Force reset details that depend on articles
        setComments(SEED_COMMENTS);
        localStorage.setItem('gb_comments', JSON.stringify(SEED_COMMENTS));
        setGlobalSEO(DEFAULT_SEO);
        localStorage.setItem('gb_seo', JSON.stringify(DEFAULT_SEO));
      }

      const savedComments = localStorage.getItem('gb_comments');
      if (savedComments && savedComments.includes('scientific-progressive-overload-manual')) {
        setComments(JSON.parse(savedComments));
      } else {
        setComments(SEED_COMMENTS);
        localStorage.setItem('gb_comments', JSON.stringify(SEED_COMMENTS));
      }

      const savedAds = localStorage.getItem('gb_ads');
      if (savedAds) {
        setAdSettings(JSON.parse(savedAds));
      } else {
        setAdSettings(DEFAULT_AD_SETTINGS);
      }

      const savedSEO = localStorage.getItem('gb_seo');
      if (savedSEO) {
        setGlobalSEO(JSON.parse(savedSEO));
      } else {
        setGlobalSEO(DEFAULT_SEO);
      }

      const savedSubs = localStorage.getItem('gb_subs');
      if (savedSubs) {
        setSubscribers(JSON.parse(savedSubs));
      } else {
        setSubscribers(DEFAULT_SUBSCRIBERS);
      }
    } catch (e) {
      console.warn('Could not load localStorage, using in-memory fallbacks.', e);
      setArticles(SEED_ARTICLES);
      setComments(SEED_COMMENTS);
    }
  }, []);

  // Load AdSense Script Tag Dynamically if configured in Live mode
  useEffect(() => {
    if (adSettings.adLayoutMode === 'actual_code' && adSettings.adSenseHeaderScript) {
      const existingScript = document.getElementById('adsense-header-script-element');
      if (!existingScript) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(adSettings.adSenseHeaderScript, 'text/html');
        const scriptEl = doc.querySelector('script');
        if (scriptEl) {
          const newScript = document.createElement('script');
          newScript.id = 'adsense-header-script-element';
          newScript.async = true;
          newScript.crossOrigin = scriptEl.getAttribute('crossorigin') || 'anonymous';
          const srcAttr = scriptEl.getAttribute('src');
          if (srcAttr) {
            newScript.src = srcAttr;
            document.head.appendChild(newScript);
          }
        }
      }
    }
  }, [adSettings.adLayoutMode, adSettings.adSenseHeaderScript]);

  // Auto-slide carousel every 6 seconds
  useEffect(() => {
    const featuredList = articles.filter(a => a.featured || a.editorPick || a.trending).slice(0, 4);
    const len = featuredList.length > 0 ? featuredList.length : articles.slice(0, 4).length;
    if (len <= 1) return;
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % len);
    }, 6000);
    return () => clearInterval(interval);
  }, [articles]);

  // Sync state to localStorage when updated
  const syncArticles = (updated: Article[]) => {
    setArticles(updated);
    localStorage.setItem('gb_articles', JSON.stringify(updated));
  };

  const syncAdSettings = (updated: AdSettings) => {
    setAdSettings(updated);
    localStorage.setItem('gb_ads', JSON.stringify(updated));
  };

  const registerAdClick = () => {
    const updated = {
      ...adSettings,
      simulatedClicks: (adSettings.simulatedClicks || 0) + 1
    };
    syncAdSettings(updated);
  };

  const syncSEO = (updated: GlobalSEO) => {
    setGlobalSEO(updated);
    localStorage.setItem('gb_seo', JSON.stringify(updated));
  };

  const addComment = (postId: string, name: string, email: string, text: string) => {
    const newCom: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      authorName: name,
      authorEmail: email,
      content: text,
      date: new Date().toISOString().split('T')[0],
      approved: false, // Default to false representing pending moderation
    };
    const updated = [newCom, ...comments];
    setComments(updated);
    localStorage.setItem('gb_comments', JSON.stringify(updated));
  };

  const approveComment = (id: string) => {
    const updated = comments.map(c => c.id === id ? { ...c, approved: true } : c);
    setComments(updated);
    localStorage.setItem('gb_comments', JSON.stringify(updated));
  };

  const deleteComment = (id: string) => {
    const updated = comments.filter(c => c.id !== id);
    setComments(updated);
    localStorage.setItem('gb_comments', JSON.stringify(updated));
  };

  const subscribeEmail = (email: string, source: string) => {
    if (!email) return;
    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      email,
      date: new Date().toISOString().split('T')[0],
      source
    };
    const updated = [newSub, ...subscribers];
    setSubscribers(updated);
    localStorage.setItem('gb_subs', JSON.stringify(updated));
  };

  const handleResetToSeeds = () => {
    localStorage.removeItem('gb_articles');
    localStorage.removeItem('gb_comments');
    setArticles(SEED_ARTICLES);
    setComments(SEED_COMMENTS);
    triggerNicheChange('technology');
  };

  // Triggering visual branding palette changes on niche switches
  const triggerNicheChange = (nicheId: string) => {
    setCurrentNiche(nicheId);
    setActiveCategoryId(nicheId);
    setActivePage('category');
  };

  // Load more articles simulation
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisiblePageCount(prev => prev + 1);
      setIsLoadingMore(false);
    }, 850);
  };

  // Selectors
  const activePost = articles.find(art => art.slug === activePostSlug);
  const activeCategory = categories.find(cat => cat.id === activeCategoryId);

  // Sorting featured content
  const carouselArticles = articles.length > 0 
    ? (articles.filter(a => a.featured || a.editorPick || a.trending).length > 0 
        ? articles.filter(a => a.featured || a.editorPick || a.trending).slice(0, 4) 
        : articles.slice(0, 4)) 
    : [];
  const currentCarouselArticle = carouselArticles[carouselIndex] || carouselArticles[0] || null;

  const featuredArticle = currentCarouselArticle || articles[0];
  const editorPicks = articles.filter(a => a.editorPick && a.id !== featuredArticle?.id);
  const trendingArticles = articles.filter(a => a.trending);
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 4);

  // Paginator slice for latest articles
  const latestArticlesDraft = articles.filter(a => !carouselArticles.some(ca => ca.id === a.id));
  const visibleLatestCount = visiblePageCount * 3;
  const visibleLatestArticles = latestArticlesDraft.slice(0, visibleLatestCount);

  // Dynamic branding color helper maps
  const getNicheStyles = () => {
    switch (currentNiche) {
      case 'gym':
        return {
          accent: 'slate',
          accentText: 'text-slate-800',
          accentBg: 'bg-slate-800 hover:bg-slate-950',
          focusRing: 'focus:ring-slate-700',
          borderAccent: 'border-slate-300',
          heroGradient: 'from-slate-950 via-slate-900 to-slate-950',
        };
      case 'fat-loss':
        return {
          accent: 'orange',
          accentText: 'text-orange-600',
          accentBg: 'bg-orange-600 hover:bg-orange-700',
          focusRing: 'focus:ring-orange-500',
          borderAccent: 'border-orange-150',
          heroGradient: 'from-orange-950 via-slate-950 to-orange-950',
        };
      case 'swimming':
        return {
          accent: 'cyan',
          accentText: 'text-cyan-600',
          accentBg: 'bg-cyan-600 hover:bg-cyan-700',
          focusRing: 'focus:ring-cyan-500',
          borderAccent: 'border-cyan-150',
          heroGradient: 'from-cyan-950 via-slate-950 to-cyan-950',
        };
      case 'recovery':
        return {
          accent: 'emerald',
          accentText: 'text-emerald-600',
          accentBg: 'bg-emerald-600 hover:bg-emerald-700',
          focusRing: 'focus:ring-emerald-500',
          borderAccent: 'border-emerald-150',
          heroGradient: 'from-zinc-950 via-slate-950 to-emerald-950',
        };
      default:
        return {
          accent: 'orange',
          accentText: 'text-orange-600',
          accentBg: 'bg-orange-600 hover:bg-orange-700',
          focusRing: 'focus:ring-orange-500',
          borderAccent: 'border-orange-150',
          heroGradient: 'from-slate-900 via-slate-950 to-orange-950',
        };
    }
  };

  const style = getNicheStyles();

  return (
    <div className="min-h-screen bg-slate-50/20 text-gray-800 flex flex-col justify-between" id="platform-root">
      
      {/* Dynamic Header */}
      <Header
        categories={categories}
        articles={articles}
        currentNiche={currentNiche}
        onSelectNiche={triggerNicheChange}
        onSelectArticle={(slug) => {
          setActivePostSlug(slug);
          setActivePage('post');
          window.scrollTo(0, 0);
        }}
        onSelectCategory={(id) => {
          if (id === null) {
            setActivePage('home');
          } else {
            setActiveCategoryId(id);
            setCurrentNiche(id);
            setActivePage('category');
          }
          window.scrollTo(0, 0);
        }}
        onOpenAdmin={() => {
          setActivePage('admin');
          window.scrollTo(0, 0);
        }}
        onOpenPage={(id) => {
          if (id === 'about' || id === 'contact') {
            setActivePage(id);
            window.scrollTo(0, 0);
          } else {
            setTrustPageId(id);
          }
        }}
        onGoHome={() => {
          setActivePage('home');
          window.scrollTo(0, 0);
        }}
      />

      {/* CORE ROUTING CONTROLLER VIEWPORT */}
      <div className="flex-grow">
        
        {/* VIEW 1: AUTHORITY BLOG HOMEPAGE LOOP */}
        {activePage === 'home' && (
          <div id="homepage-root">
            
            {/* HERO SECTION WITH CURATED CONTENT & LEAD NEWSLETTER */}
            <section className="relative py-14 md:py-20 overflow-hidden bg-slate-50 border-b border-gray-100" id="niche-hero">
              {/* Dynamic subtle glowing background blobs for visual depth and premium feel */}
              <div className="absolute top-12 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  
                  {/* Curated Blog introduction & lead subscription block */}
                  <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
                    <div className="space-y-4">
                      <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider text-orange-700 bg-orange-100/60 border border-orange-200 px-3 py-1.5 rounded-full shadow-2xs w-fit">
                        <Sparkles className="w-3.5 h-3.5 text-orange-550 animate-pulse" /> Certified Athletic Medicine
                      </span>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display leading-[1.1] tracking-tight text-slate-900 m-0">
                        Systematic blueprints for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">athletic progress</span>.
                      </h1>
                      <p className="text-sm text-gray-600 leading-relaxed font-light max-w-xl">
                        A peer-reviewed repository for strength athletes, runners, and lifters. Our clinical-grade sports science training platform transforms complex laboratory data into direct, high-yield progressive loading guides.
                      </p>
                    </div>
                  </div>
 
                  {/* Hero Right Side: Featured Spot Article Display (Horizontal Editorial Layout with Carousel transition) */}
                  {carouselArticles.length > 0 && (
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div className="relative flex-grow flex items-stretch">
                        
                        {carouselArticles.map((art, idx) => {
                          const isActive = idx === carouselIndex;
                          return (
                            <div 
                              key={art.id}
                              onClick={() => {
                                if (isActive) {
                                  setActivePostSlug(art.slug);
                                  setActivePage('post');
                                  window.scrollTo(0,0);
                                }
                              }}
                              className={`bg-white border border-gray-150 hover:border-orange-500/40 rounded-3xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer group transition-all duration-500 ease-in-out absolute inset-0 flex flex-col sm:flex-row w-full ${
                                isActive 
                                  ? 'opacity-100 scale-100 z-10 pointer-events-auto shadow-sm' 
                                  : 'opacity-0 scale-98 z-0 pointer-events-none'
                              }`}
                            >
                              {/* Interactive glass card corner highlight */}
                              <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-orange-550 border-r-orange-550 opacity-25 group-hover:opacity-100 transition-opacity duration-300"></div>

                              {/* Image element occupying left portion */}
                              <div className="relative w-full sm:w-2/5 min-h-[160px] sm:min-h-full overflow-hidden flex-shrink-0 bg-gray-50">
                                <img 
                                  src={art.featuredImage} 
                                  alt={art.title} 
                                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-550"
                                />
                                <span className="absolute top-3 left-3 bg-slate-900/90 text-[8px] tracking-widest font-mono font-bold text-white uppercase px-2.5 py-1 rounded border border-white/10 shadow-sm leading-none">
                                  {idx === 0 ? 'Featured Blueprint' : 'Curated Spotlight'}
                                </span>
                              </div>
                              
                              {/* Content element occupying the right portion */}
                              <div className="p-6 sm:p-7 sm:w-3/5 flex flex-col justify-between flex-grow space-y-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold text-orange-655 text-orange-600 uppercase tracking-widest">
                                    <span>{categories.find(c => c.id === art.categoryId)?.name || 'TRAINING'}</span>
                                    <span>•</span>
                                    <span className="text-gray-400 flex items-center gap-1 font-sans">
                                      <Clock className="w-3 h-3 text-gray-400" /> {art.readTime}
                                    </span>
                                  </div>
                                  <h3 className="text-base sm:text-lg md:text-xl font-extrabold font-display text-gray-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2 m-0">
                                    {art.title}
                                  </h3>
                                  <p className="text-xs text-gray-500 font-light line-clamp-3 leading-relaxed m-0">
                                    {art.excerpt}
                                  </p>
                                </div>
                                
                                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-mono font-bold text-orange-600 group-hover:text-orange-700 select-none">
                                  <div className="flex items-center gap-1 transition-colors uppercase tracking-wider text-[10px]">
                                    <span>Read In-Depth Blueprint</span>
                                    <span className="transform group-hover:translate-x-1 transition-transform duration-200 text-sm font-sans font-light">&rarr;</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1 font-light">
                                    <Calendar className="w-3 h-3 text-gray-400" /> {art.publishDate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* Dummy layout spacer to let the absolute container maintain healthy dimensions */}
                        <div className="invisible flex flex-col sm:flex-row w-full h-full pointer-events-none">
                          <div className="w-full sm:w-2/5 min-h-[220px] sm:min-h-[280px]"></div>
                          <div className="p-6 sm:p-7 sm:w-3/5 space-y-4">
                            <div className="space-y-3">
                              <div className="h-1 animate-pulse bg-gray-200 rounded"></div>
                              <h3 className="text-base sm:text-lg md:text-xl font-extrabold leading-snug line-clamp-2">Spacer</h3>
                              <p className="text-xs">This is a layout height placeholder for absolute carousel items.</p>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Carousel Indicator Navigation Controls */}
                      <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 select-none">
                        <div className="flex gap-2">
                          {carouselArticles.map((_, idx) => {
                            const isActive = idx === carouselIndex;
                            return (
                              <button
                                key={idx}
                                onClick={() => setCarouselIndex(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={`cursor-pointer transition-all duration-300 rounded-full h-1.5 ${
                                  isActive 
                                    ? 'w-6 bg-orange-600' 
                                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                                }`}
                              />
                            );
                          })}
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 tracking-wider font-semibold uppercase">
                          Auto-rotates • 6s
                        </span>
                      </div>
                    </div>
                  )}
 
                </div>
              </div>
            </section>

            {/* CLEAN CATEGORY FILTERS BAR INSTEAD OF BULKY GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="category-filter-bar">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-mono font-extrabold text-orange-650 bg-orange-50 px-2.5 py-1 rounded text-orange-600 uppercase tracking-widest leading-none">
                    Sports Science Portals
                  </span>
                  <h3 className="text-xl md:text-2xl font-black font-display text-gray-900 uppercase tracking-tight m-0 pt-1">
                    Explore Research Fields
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setActiveCategoryId(null);
                      setCurrentNiche('all');
                      setActivePage('home');
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                      activeCategoryId === null
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                        : 'bg-white border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-950'
                    }`}
                  >
                    All Disciplines
                  </button>
                  {categories.map((cat) => {
                    const articleCount = articles.filter(a => a.categoryId === cat.id).length;
                    const isActive = activeCategoryId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategoryId(cat.id);
                          setCurrentNiche(cat.id);
                          setActivePage('category');
                          window.scrollTo(0, 0);
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                          isActive
                            ? 'bg-orange-600 border-orange-600 text-white shadow-xs'
                            : 'bg-white border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-950'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className={`font-sans font-bold text-[10px] px-1.5 py-0.5 rounded-full leading-none transition-all ${
                          isActive ? 'bg-orange-700 text-orange-100' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {articleCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* THREE COLUMN GRID: Editor's Picks & Trending Loops on side */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* COLUMN A (lg:col-span-8): Latest Blueprints Grid */}
                <div className="lg:col-span-8 space-y-6" id="latest-blueprints">
                  <div className="flex justify-between items-end pb-3 border-b border-gray-100">
                    <h3 className="text-xs uppercase font-mono tracking-widest text-gray-400 font-bold leading-none">Latest Systematic Entries</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    {visibleLatestArticles.map((art) => (
                      <article 
                        key={art.id}
                        onClick={() => {
                          setActivePostSlug(art.slug);
                          setActivePage('post');
                          window.scrollTo(0, 0);
                        }}
                        className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 hover:shadow-lg hover:border-orange-500/10 transition-all duration-300 cursor-pointer group relative"
                      >
                        <div className="w-full sm:w-52 h-40 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 relative">
                          <img 
                            src={art.featuredImage} 
                            alt={art.title} 
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                          <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-[9px] font-mono font-bold text-white uppercase tracking-widest px-2 py-0.5 rounded border border-white/5">
                            {categories.find(c => c.id === art.categoryId)?.name || 'Blog'}
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-extrabold text-orange-600 uppercase bg-orange-50/70 px-2 py-0.5 rounded">
                                {categories.find(c => c.id === art.categoryId)?.name}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-400">
                                <Clock className="w-3 h-3 text-gray-350" /> {art.readTime || '5 min read'}
                              </span>
                            </div>
                            
                            <h3 className="text-base sm:text-lg font-extrabold font-display leading-snug text-gray-905 group-hover:text-orange-650 transition-colors">
                              {art.title}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-light">
                              {art.excerpt}
                            </p>
                          </div>

                          <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-3 text-[11px] text-gray-450 font-mono">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gray-400" /> {art.publishDate}</span>
                            <div className="flex items-center gap-1 text-orange-600 font-bold group-hover:text-orange-700 transition-colors">
                              <span>Read Blueprint</span>
                              <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 text-sm font-light">&rarr;</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Load more dispatcher button representing pagination */}
                  {visibleLatestCount < latestArticlesDraft.length && (
                    <div className="text-center pt-4">
                      <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mx-auto disabled:opacity-50 cursor-pointer"
                      >
                        {isLoadingMore ? (
                          <>
                            <span className="w-3 h-3 border-2 border-white border-t-transparent animate-spin rounded-full"></span>
                            <span>Parsing metadata entries...</span>
                          </>
                        ) : (
                          <span>Load More Blueprints</span>
                        )}
                      </button>
                    </div>
                  )}

                </div>

                {/* COLUMN B (lg:col-span-4): Sideways Trending & Key Insights */}
                <aside className="lg:col-span-4 space-y-6">
                  
                  {/* Trending segment */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-3xs space-y-4">
                    <h3 className="text-xs font-mono font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-50 pb-2.5">
                      <TrendingUp className="w-4 h-4 text-orange-500 animate-pulse" /> Weekly Popularity tracks
                    </h3>

                    <div className="space-y-4">
                      {popularArticles.map((art, idx) => (
                        <div 
                          key={art.id}
                          onClick={() => {
                            setActivePostSlug(art.slug);
                            setActivePage('post');
                            window.scrollTo(0, 0);
                          }}
                          className="flex items-start gap-3.5 cursor-pointer group pb-3 last:pb-0 border-b border-slate-50 last:border-b-0"
                        >
                          <span className="text-base font-mono font-black text-gray-305 text-gray-300 w-5 flex-shrink-0 group-hover:text-orange-500 transition-colors">
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                          <div className="space-y-0.5">
                            <h4 className="text-xs sm:text-sm font-bold font-display text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                              {art.title}
                            </h4>
                            <span className="text-[9px] text-gray-400 font-mono font-bold uppercase tracking-wider block">
                              {art.views.toLocaleString()} Readers
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clean Partner Promo Spotlight */}
                  {adSettings.enableSidebar && (
                    <div className="bg-orange-50/50 rounded-2xl border border-orange-100/60 p-5 text-center relative overflow-hidden">
                      <div className="space-y-2 font-sans justify-center">
                        <span className="bg-orange-100 text-orange-600 font-mono font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded border border-orange-200/40">
                          Partner Spotlight
                        </span>
                        <span className="text-gray-900 font-bold block text-xs mt-1">High-Yield Micronutrients Isolated</span>
                        <span className="text-gray-500 text-[10px] leading-normal font-sans block">Pure active ingredients, independent-tested compound elements.</span>
                      </div>
                    </div>
                  )}

                </aside>

              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: ARTICLE READING DETAILS */}
        {activePage === 'post' && activePost && (
          <PostDetail
            article={activePost}
            articles={articles}
            categories={categories}
            comments={comments}
            onAddComment={addComment}
            adSettings={adSettings}
            onSelectArticle={(slug) => {
              setActivePostSlug(slug);
              setActivePage('post');
              window.scrollTo(0, 0);
            }}
            onGoBack={() => {
              setActivePage('home');
              window.scrollTo(0, 0);
            }}
            onAdClick={registerAdClick}
          />
        )}

        {/* VIEW 3: CATEGORY BRIDGED SITEMAPS */}
        {activePage === 'category' && activeCategory && (
          <CategoryPage
            category={activeCategory}
            articles={articles.filter(a => a.categoryId === activeCategoryId)}
            onSelectArticle={(slug) => {
              setActivePostSlug(slug);
              setActivePage('post');
              window.scrollTo(0, 0);
            }}
          />
        )}

        {/* VIEW 4: DEDICATED ABOUT US PAGE */}
        {activePage === 'about' && (
          <AboutPage 
            onGoHome={() => {
              setActivePage('home');
              window.scrollTo(0, 0);
            }}
            onSelectCategory={(id) => {
              if (id === null) {
                setActivePage('home');
              } else {
                setActiveCategoryId(id);
                setCurrentNiche(id);
                setActivePage('category');
              }
              window.scrollTo(0, 0);
            }}
            categories={categories}
          />
        )}

        {/* VIEW 5: DEDICATED CONTACT US PAGE */}
        {activePage === 'contact' && (
          <ContactPage 
            onGoHome={() => {
              setActivePage('home');
              window.scrollTo(0, 0);
            }}
          />
        )}

        {/* VIEW 6: PROPER DEDICATED ADMIN PANEL PAGE */}
        {activePage === 'admin' && (
          <AdminPanel
            articles={articles}
            categories={categories}
            comments={comments}
            adSettings={adSettings}
            globalSEO={globalSEO}
            subscribers={subscribers}
            onSaveArticles={syncArticles}
            onSaveAdSettings={syncAdSettings}
            onSaveSEO={syncSEO}
            onApproveComment={approveComment}
            onDeleteComment={deleteComment}
            onResetToSeeds={handleResetToSeeds}
            onClose={() => {
              setActivePage('home');
              window.scrollTo(0, 0);
            }}
          />
        )}

      </div>

      {/* CORE FOOTER */}
      <Footer
        categories={categories}
        articles={articles}
        onSelectCategory={(id) => {
          if (id === null) {
            setActivePage('home');
          } else {
            setActiveCategoryId(id);
            setCurrentNiche(id);
            setActivePage('category');
          }
          window.scrollTo(0, 0);
        }}
        onSelectArticle={(slug) => {
          setActivePostSlug(slug);
          setActivePage('post');
          window.scrollTo(0, 0);
        }}
        onOpenPage={(id) => {
          if (id === 'about' || id === 'contact') {
            setActivePage(id);
            window.scrollTo(0, 0);
          } else {
            setTrustPageId(id);
          }
        }}
      />



      {/* MODAL 2: TRUST COMPLIANCE POLICY PAGES SCREEN */}
      {trustPageId && (
        <TrustPages
          pageId={trustPageId}
          categories={categories}
          articles={articles}
          onClose={() => setTrustPageId(null)}
          onSelectArticle={(slug) => {
            setActivePostSlug(slug);
            setActivePage('post');
            window.scrollTo(0, 0);
          }}
          onSelectCategory={(id) => {
            if (id === null) {
              setActivePage('home');
            } else {
              setActiveCategoryId(id);
              setCurrentNiche(id);
              setActivePage('category');
            }
            window.scrollTo(0, 0);
          }}
        />
      )}

      {/* GDPR AdSense Privacy Banner */}
      <CookieConsent 
        onOpenPrivacyPage={(id) => setTrustPageId(id)} 
        enabled={adSettings.enableCookieConsentWidget !== false} 
      />

    </div>
  );
}

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
  const [activePage, setActivePage] = useState<'home' | 'post' | 'category' | 'about' | 'contact'>('home');
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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [trustPageId, setTrustPageId] = useState<string | null>(null);

  // Hero newsletter state
  const [heroEmail, setHeroEmail] = useState('');
  const [heroSubscribed, setHeroSubscribed] = useState(false);

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
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const editorPicks = articles.filter(a => a.editorPick && a.id !== featuredArticle?.id);
  const trendingArticles = articles.filter(a => a.trending);
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 4);

  // Paginator slice for latest articles
  const latestArticlesDraft = articles.filter(a => a.id !== featuredArticle?.id);
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
        onOpenAdmin={() => setIsAdminOpen(true)}
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
            <section className={`relative text-white py-12 md:py-20 overflow-hidden bg-gradient-to-r ${style.heroGradient}`} id="niche-hero">
              <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Curated Blog introduction & lead subscription block */}
                  <div className="lg:col-span-7 space-y-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-orange-400 uppercase bg-orange-950/80 px-3 py-1 rounded-full border border-orange-900/60 shadow-sm leading-none">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Growth & Authority Platform
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold font-display leading-tight tracking-tight text-white m-0">
                      Systematic blueprints for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-405">athletic progress</span>.
                    </h1>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light max-w-xl">
                      Unlock your peak athletic potential. Our scientific training platform delivers expert-vetted muscle mechanics, physical conditioning plans, and sports-performance dietary blueprints built for daily progress.
                    </p>

                    {/* Newsletter Subscription CTAs */}
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl max-w-lg backdrop-blur-md">
                      {heroSubscribed ? (
                        <div className="flex items-center gap-3 text-emerald-400 text-sm font-semibold">
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          <span>Access Granted! Check your inbox for your physical training protocols guide.</span>
                        </div>
                      ) : (
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!heroEmail) return;
                            subscribeEmail(heroEmail, 'hero-section');
                            setHeroSubscribed(true);
                          }}
                          className="space-y-3"
                        >
                          <p className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 leading-tight">Join 48,000+ Active Athletes</p>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="email"
                              required
                              value={heroEmail}
                              onChange={(e) => setHeroEmail(e.target.value)}
                              placeholder="Enter your email address..."
                              className="w-full bg-slate-900/60 border border-slate-750 px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-400 outline-none focus:ring-1 focus:ring-orange-400"
                            />
                            <button
                              type="submit"
                              className={`sm:w-auto font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider text-slate-950 cursor-pointer bg-amber-400 hover:bg-amber-500`}
                            >
                              Join Club
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-400">✓ Secure privacy standard. Your credentials remain 100% confidential.</p>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Hero Right Side: Featured Spot Article Display */}
                  {featuredArticle && (
                    <div className="lg:col-span-5">
                      <div 
                        onClick={() => {
                          setActivePostSlug(featuredArticle.slug);
                          setActivePage('post');
                          window.scrollTo(0,0);
                        }}
                        className="bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md cursor-pointer group transition-all"
                      >
                        <div className="relative h-48 sm:h-56">
                          <img 
                            src={featuredArticle.featuredImage} 
                            alt={featuredArticle.title} 
                            className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
                          />
                          <span className="absolute top-4 left-4 bg-orange-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                            Featured Post
                          </span>
                        </div>
                        <div className="p-5 sm:p-6 space-y-2">
                          <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest">{featuredArticle.readTime}</span>
                          <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-orange-300 transition-colors leading-snug line-clamp-2">
                            {featuredArticle.title}
                          </h3>
                          <p className="text-xs text-slate-300 font-light line-clamp-3 leading-relaxed">
                            {featuredArticle.excerpt}
                          </p>
                          <div className="pt-2 flex items-center justify-between text-xs text-orange-300 font-semibold">
                            <span>Read Full Guide &rarr;</span>
                            <span className="text-[10px] font-mono text-slate-400">{featuredArticle.publishDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </section>

            {/* INTEGRATED AD PLACEMENT below hero */}
            <div className="max-w-7xl mx-auto px-4 mt-8" id="home-infeed-ad">
              <AdContainer slot="infeed" settings={adSettings} onAdClick={registerAdClick} />
            </div>

            {/* GRID OF FEATURED NICHE CHANNELS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="niche-channels">
              <div className="flex justify-between items-end pb-4 border-b border-gray-105 mb-6">
                <div>
                  <h2 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest leading-none">Authority Channels</h2>
                  <h3 className="text-lg font-bold font-display text-gray-900 mt-1">Explore Topic Cluster Streams</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategoryId(cat.id);
                      setCurrentNiche(cat.id);
                      setActivePage('category');
                      window.scrollTo(0, 0);
                    }}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-3xs p-4 flex flex-col items-start gap-3 hover:shadow-md hover:border-indigo-100 text-left transition-all cursor-pointer"
                  >
                    <div className="w-full h-24 rounded-xl overflow-hidden bg-gray-50">
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-mono font-bold text-gray-550 uppercase">Channel</h4>
                      <h3 className="text-sm font-bold font-display text-gray-900 leading-tight">{cat.name}</h3>
                    </div>
                  </button>
                ))}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                    {visibleLatestArticles.map((art) => (
                      <article 
                        key={art.id}
                        onClick={() => {
                          setActivePostSlug(art.slug);
                          setActivePage('post');
                          window.scrollTo(0, 0);
                        }}
                        className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img 
                            src={art.featuredImage} 
                            alt={art.title} 
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1 space-y-3">
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">
                              {categories.find(c => c.id === art.categoryId)?.name}
                            </span>
                            <h3 className="text-sm sm:text-base font-extrabold font-display leading-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {art.title}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                              {art.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {art.publishDate}</span>
                            <span className="text-indigo-600 font-bold">Discover Entry &rarr;</span>
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

                {/* COLUMN B (lg:col-span-4): Sideways Trending & Most Popular List */}
                <aside className="lg:col-span-4 space-y-8">
                  
                  {/* Trending segment */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-3xs space-y-4">
                    <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 border-b border-gray-50 pb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" /> Weekly Popularity metrics
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
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <span className="text-lg font-mono font-bold text-gray-300 w-5 flex-shrink-0">
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold font-display text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                              {art.title}
                            </h4>
                            <span className="text-[9px] text-gray-400 font-mono font-bold uppercase block tracking-wider">
                              {art.views} Reads
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Ad Placement - Sidebar */}
                  {adSettings.enableSidebar && (
                    <div className="bg-amber-50/50 rounded-2xl border border-amber-250/60 p-4 text-center relative overflow-hidden">
                      <span className="absolute top-1 left-2 text-[8px] font-mono text-amber-500 uppercase tracking-widest font-bold">AdSense Placement - Sidebar Tower</span>
                      <div className="py-8 space-y-1.5 font-sans justify-center">
                        <span className="text-gray-900 font-bold block text-xs">Maximize Muscle Protein Synthesis</span>
                        <span className="text-gray-550 text-[10px] leading-normal font-mono block">Zero sugar, third-party tested isolates 25% off. Coupon: RECOVERY</span>
                        <button className="bg-amber-400 font-bold text-[9px] uppercase tracking-wider p-1 rounded mt-2 px-3">Shop Offer</button>
                      </div>
                    </div>
                  )}

                  {/* Operational Social Proof / Community metrics */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Users className="w-4 h-4 text-orange-400" />
                      <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest leading-none">Fitness Community</h4>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Newsletter Club:</span>
                        <span className="font-extrabold text-white">48,200+ members</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Monthly Viewers:</span>
                        <span className="font-extrabold text-white">250,000+ reads</span>
                      </div>
                    </div>
                  </div>

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

      {/* MODAL 1: ADMINISTRATIVE WORKSPACE */}
      {isAdminOpen && (
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
          onClose={() => setIsAdminOpen(false)}
        />
      )}

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

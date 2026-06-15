/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Dumbbell, Flame, Waves, HeartPulse, Menu, X, Sliders, ChevronDown, BookOpen } from 'lucide-react';
import { Category, Article } from '../types';

interface HeaderProps {
  categories: Category[];
  articles: Article[];
  currentNiche: string;
  onSelectNiche: (nicheId: string) => void;
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (id: string | null) => void;
  onOpenAdmin: () => void;
  onOpenPage: (pageId: string) => void;
  onGoHome: () => void;
}

export default function Header({
  categories,
  articles,
  currentNiche,
  onSelectNiche,
  onSelectArticle,
  onSelectCategory,
  onOpenAdmin,
  onOpenPage,
  onGoHome,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Close suggestions if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? articles.filter(art =>
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSuggestionClick = (slug: string) => {
    onSelectArticle(slug);
    setSearchQuery('');
    setShowSuggestions(false);
    setMobileMenuOpen(false);
  };

  const getNicheIcon = (nicheId: string) => {
    switch (nicheId) {
      case 'gym': return <Dumbbell className="w-4 h-4" />;
      case 'fat-loss': return <Flame className="w-4 h-4" />;
      case 'swimming': return <Waves className="w-4 h-4" />;
      case 'recovery': return <HeartPulse className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getNicheColorClass = (nicheId: string) => {
    switch (nicheId) {
      case 'gym': return 'text-slate-800';
      case 'fat-loss': return 'text-orange-600';
      case 'swimming': return 'text-cyan-600';
      case 'recovery': return 'text-emerald-600';
      default: return 'text-orange-600';
    }
  };

  const getNicheHoverClass = (nicheId: string) => {
    switch (nicheId) {
      case 'gym': return 'hover:text-slate-900';
      case 'fat-loss': return 'hover:text-orange-600';
      case 'swimming': return 'hover:text-cyan-600';
      case 'recovery': return 'hover:text-emerald-600';
      default: return 'hover:text-orange-600';
    }
  };

  const getNicheBgClass = (id: string, active: boolean) => {
    if (!active) return 'bg-gray-50 hover:bg-gray-100 text-gray-500';
    switch (id) {
      case 'gym': return 'bg-slate-800 text-white shadow-xs';
      case 'fat-loss': return 'bg-orange-600 text-white shadow-xs';
      case 'swimming': return 'bg-cyan-600 text-white shadow-xs';
      case 'recovery': return 'bg-emerald-600 text-white shadow-xs';
      default: return 'bg-orange-600 text-white shadow-xs';
    }
  };

  const activeColor = getNicheColorClass(currentNiche);
  const activeHover = getNicheHoverClass(currentNiche);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-xs backdrop-blur-md bg-opacity-95" id="authority-header">
      {/* Top minimal news ticker / quick affiliate notice */}
      <div className="w-full bg-slate-900 text-white text-xs py-1 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="bg-orange-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-sm uppercase text-[10px]">Affiliate Notice</span>
        <span>As an Amazon & Brand Associate we earn from qualifying purchases. No extra cost to you.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Brand elements */}
          <div className="flex items-center gap-8">
            <button 
              onClick={onGoHome}
              className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-gray-900 hover:opacity-90 cursor-pointer"
              id="header-logo"
            >
              <span className={`p-2 bg-slate-100 rounded-lg ${activeColor} flex items-center justify-center`}>
                <Dumbbell className="w-6 h-6" />
              </span>
              <span>Fitness<span className={`${activeColor} font-extrabold font-display`}>Blog</span></span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <button 
                onClick={onGoHome}
                className={`${activeHover} transition-colors py-2 cursor-pointer text-gray-700`}
              >
                Home
              </button>

              <div className="relative">
                <button 
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className={`flex items-center gap-1 ${activeHover} py-2 transition-colors cursor-pointer text-gray-700`}
                >
                  Categories <ChevronDown className="w-4 h-4" />
                </button>
                {categoryDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5 divide-y divide-gray-50 z-50">
                    <div className="p-1">
                      <button
                        onClick={() => {
                          onSelectCategory(null);
                          setCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-slate-50 ${activeHover} flex items-center gap-2`}
                      >
                        All Categories
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onSelectCategory(cat.id);
                            setCategoryDropdownOpen(false);
                          }}
                          className={`w-full text-left rounded-md px-3 py-2 text-sm flex items-center gap-2 ${
                            currentNiche === cat.id 
                              ? `bg-slate-100 ${activeColor} font-bold` 
                              : `text-gray-700 hover:bg-slate-50 ${getNicheHoverClass(cat.id)}`
                          }`}
                        >
                          {getNicheIcon(cat.id)}
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => onOpenPage('about')}
                className={`${activeHover} transition-colors py-2 cursor-pointer text-gray-700`}
              >
                About Us
              </button>
              <button 
                onClick={() => onOpenPage('contact')}
                className={`${activeHover} transition-colors py-2 cursor-pointer text-gray-700`}
              >
                Contact Desk
              </button>
            </nav>
          </div>

          {/* Right Elements (Search, Niche Picker & Admin link) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search Input Box */}
            <div className="relative w-64" ref={suggestionRef}>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search training logs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-800"
                  id="header-search-input"
                />
              </div>

              {/* Suggestions Popup */}
              {showSuggestions && searchQuery.trim() !== '' && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50">
                  <div className="p-2 border-b border-gray-50 bg-gray-50 text-[11px] font-mono font-medium text-gray-500 tracking-wider">
                    SUGGESTED READING ({filteredSuggestions.length})
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((art) => (
                        <button
                          key={art.id}
                          onClick={() => handleSuggestionClick(art.slug)}
                          className="w-full text-left p-3 hover:bg-slate-50 border-b border-gray-50 last:border-0 flex gap-2.5 cursor-pointer"
                        >
                          <img 
                            src={art.featuredImage} 
                            alt="" 
                            className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                          />
                          <div>
                            <p className="text-xs font-semibold text-gray-900 line-clamp-1">{art.title}</p>
                            <p className="text-[10px] text-gray-500 line-clamp-1 leading-normal">{art.excerpt}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-500">
                        No articles match "{searchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Command button */}
            <button
              onClick={onOpenAdmin}
              className="ml-2 bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-900 font-semibold px-4 py-1.5 rounded-full text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-gray-200"
              id="header-admin-btn"
            >
              <Sliders className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmin}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-900 font-semibold px-2.5 py-1.5 rounded-full text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
            >
              Admin
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg cursor-pointer"
              id="header-mobile-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-4">
            
            {/* Search */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search training logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              />
              {searchQuery.trim() !== '' && (
                <div className="mt-1 bg-white border border-gray-100 rounded-lg divide-y divide-gray-50 overflow-hidden">
                  {filteredSuggestions.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => handleSuggestionClick(art.slug)}
                      className="w-full text-left p-3 hover:bg-slate-50 flex gap-2 cursor-pointer"
                    >
                      <img src={art.featuredImage} alt="" className="w-8 h-8 object-cover rounded" />
                      <div>
                        <p className="text-xs font-semibold text-gray-900 line-clamp-1">{art.title}</p>
                        <p className="text-[10px] text-gray-500 line-clamp-1">{art.excerpt}</p>
                      </div>
                    </button>
                  ))}
                  {filteredSuggestions.length === 0 && (
                    <div className="p-3 text-center text-xs text-gray-500">
                      No matching articles
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">Sitemap</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onGoHome(); setMobileMenuOpen(false); }}
                  className="text-left py-2 px-3 text-sm rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => { onOpenPage('about'); setMobileMenuOpen(false); }}
                  className="text-left py-2 px-3 text-sm rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                >
                  About Us
                </button>
                <button
                  onClick={() => { onOpenPage('contact'); setMobileMenuOpen(false); }}
                  className="text-left py-2 px-3 text-sm rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                >
                  Contact Form
                </button>
                <button
                  onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                  className="text-left py-2 px-3 text-sm rounded-lg bg-slate-100 text-slate-800 font-bold"
                >
                  Admin Portal
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">Categories</p>
              <div className="space-y-1">
                <button
                  onClick={() => { onSelectCategory(null); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-slate-50 rounded"
                >
                  All Channels
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded flex items-center gap-2 ${
                      currentNiche === cat.id ? `bg-slate-100 ${activeColor} font-bold` : 'text-gray-600 hover:bg-slate-50'
                    }`}
                  >
                    {getNicheIcon(cat.id)}
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

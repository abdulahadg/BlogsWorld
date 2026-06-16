/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Github, Twitter, Facebook, Instagram, Shield, HelpCircle, ArrowUpRight, CheckCircle } from 'lucide-react';
import { Category, Article } from '../types';

interface FooterProps {
  categories: Category[];
  articles: Article[];
  onSelectCategory: (id: string | null) => void;
  onSelectArticle: (slug: string) => void;
  onOpenPage: (pageId: string) => void;
}

export default function Footer({
  categories,
  articles,
  onSelectCategory,
  onSelectArticle,
  onOpenPage,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800" id="authority-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Pitch */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-display text-xl font-bold tracking-tight">
              <span className="p-1.5 bg-orange-600 rounded-md text-white flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </span>
              <span>Fitness<span className="text-orange-400 font-extrabold font-display">Blog</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              FitnessBlog is a professional authority publisher dedicated to evidence-based strength coaching, metabolic fat loss science, hydrodynamic stroke conditioning, and sports physical therapy.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Categories mapping */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-widest">Fitness Categories</h4>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-orange-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onSelectCategory(null)}
                  className="font-semibold text-orange-400 hover:text-orange-300 cursor-pointer"
                >
                  All Categories &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Authority Articles mapping */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-widest">Editor's Picks</h4>
            <ul className="space-y-2.5 text-xs">
              {articles.slice(0, 3).map((art) => (
                <li key={art.id}>
                  <button
                    onClick={() => onSelectArticle(art.slug)}
                    className="hover:text-orange-400 transition-colors text-left line-clamp-2 focus:outline-none cursor-pointer"
                  >
                    {art.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Trust policies */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-widest">Trust & Policies</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenPage('editorial')} className="hover:text-white cursor-pointer text-left">
                  Editorial Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('disclosure')} className="hover:text-white cursor-pointer text-left flex items-center gap-1">
                  Disclosure Policy <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('privacy')} className="hover:text-white cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('terms')} className="hover:text-white cursor-pointer text-left">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('disclaimer')} className="hover:text-white cursor-pointer text-left">
                  General Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('dmca')} className="hover:text-white cursor-pointer text-left">
                  DMCA Compliance
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Corporate bottom line */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {currentYear} FitnessBlog Authority Group. All Rights Reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => onOpenPage('sitemap')} className="hover:text-orange-400 cursor-pointer">
              Sitemap Index
            </button>
            <span>•</span>
            <button onClick={() => onOpenPage('contact')} className="hover:text-orange-400 cursor-pointer">
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

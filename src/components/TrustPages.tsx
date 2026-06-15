/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Send, CheckCircle, FileText, Globe, FileDiff, ShieldAlert, Check } from 'lucide-react';
import { Category, Article } from '../types';

interface TrustPagesProps {
  pageId: string;
  categories: Category[];
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (id: string | null) => void;
}

export default function TrustPages({
  pageId,
  categories,
  articles,
  onClose,
  onSelectArticle,
  onSelectCategory,
}: TrustPagesProps) {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('General Enquiry');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;
    setFormSubmitted(true);
  };

  const getPageTitle = () => {
    switch (pageId) {
      case 'about': return 'About Our Athletic Mission';
      case 'contact': return 'Get In Touch - Core Operations';
      case 'editorial': return 'Scientific Editorial & Review Standards';
      case 'disclosure': return 'FTC Affiliate Compensation Disclosure';
      case 'privacy': return 'Privacy Policy & Reader Agreements';
      case 'terms': return 'Terms of Service - Readership Contract';
      case 'disclaimer': return 'Medical & Athletic Performance Disclaimer';
      case 'dmca': return 'DMCA Intellectual Property Guidelines';
      case 'sitemap': return 'Static XML and Reader Sitemap';
      default: return 'Information Document';
    }
  };

  const renderContent = () => {
    switch (pageId) {
      case 'about':
        return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-sm">
            <p className="text-base text-slate-900 font-semibold font-display">
              FitnessBlog is an independent athletic authority established in 2026. Custom biomechanical assessment is the central cornerstone of our operations.
            </p>
            <p>
              We believe that physical training misinformation is the single biggest barrier to personal strength and health goals. Modern fitness consumers are flooded with generalized, low-quality routines designed purely for click-through visibility. We bypass the shallow trends to deliver rigorous, peer-reviewed conditioning systems.
            </p>
            <h3 className="text-lg font-bold font-display text-slate-900 pt-2 border-b border-gray-100 pb-2">Our Core Editorial Pillars</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-650 text-orange-600 font-mono">I. Unbiased Testing</span>
                <p className="text-[12px] text-gray-500 mt-1">We refuse paid product rankings. Our performance reviews remain non-negotiable.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-650 text-orange-600 font-mono">II. Scientific Peer Review</span>
                <p className="text-[12px] text-gray-500 mt-1">Our strength and cardio data maps onto clinical, peer-reviewed sports journals.</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-650 text-orange-600 font-mono">III. Movement Integrity</span>
                <p className="text-[12px] text-gray-500 mt-1">Every recommended weight template or swimming drill is curated by CSCS instructors.</p>
              </div>
            </div>
            <p>
              Whether you are calculation-dosing proteins, maximizing muscle fiber hypertrophy, or mastering hydrodynamic swim strokes, our specialist team provides structured, tested blueprints.
            </p>
          </div>
        );

      case 'contact':
        return (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm uppercase font-mono font-bold tracking-widest text-slate-400">Desk Address</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                FitnessBlog Digital Media Group<br />
                824 Systemic Tower Ave, Suite 400<br />
                San Francisco, CA 94105
              </p>
              <h3 className="text-sm uppercase font-mono font-bold tracking-widest text-slate-400">Inquiries</h3>
              <p className="text-xs text-slate-600">
                General desk: desk@fitnessblog-example.com<br />
                Editorial Review: board@fitnessblog-example.com<br />
                Affiliation: affiliate-desk@fitnessblog-example.com
              </p>
              <div className="p-3.5 bg-yellow-50 text-yellow-800 text-xs rounded-lg border border-yellow-250 leading-relaxed">
                <strong>Response Window Check</strong>: Due to active training and testing publication schedules, our coaching desk team guarantees a response timeline of 48 business hours. We do not evaluate unrequested guest postings.
              </div>
            </div>
            
            <div className="md:col-span-3">
              {formSubmitted ? (
                <div className="p-6 bg-slate-50 border border-gray-200 rounded-xl text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display text-gray-900">Message Transmitted</h3>
                    <p className="text-xs text-slate-500 mt-1">Your dispatch details were logged. A training advisor will review it shortly.</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-150 p-3 rounded-lg text-left text-xs space-y-1 text-slate-600 max-w-sm mx-auto">
                    <p><strong>Subject:</strong> {formSubject}</p>
                    <p><strong>Email Address:</strong> {formEmail}</p>
                  </div>
                  <button 
                    onClick={() => { setFormSubmitted(false); setFormMessage(''); }}
                    className="text-xs text-orange-600 font-bold hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full border border-gray-205 border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full border border-gray-205 border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Subject Matter</label>
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full border border-gray-250 border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Affiliate Collaboration">Affiliate Collaboration</option>
                      <option value="Technical Corrections">Movement / Diet Errata</option>
                      <option value="Privacy / GDPR">Privacy & GDPR Data Access</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Inquiry Statement</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Detail your conditioning inquiry..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full border border-gray-205 border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-slate-900 text-white rounded-lg p-3 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Dispatch Request
                  </button>
                </form>
              )}
            </div>
          </div>
        );

      case 'editorial':
        return (
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              At FitnessBlog, we maintain strict editorial independence. We do not accept sponsorship incentives or native product advertisement blocks within our conditioning workflows.
            </p>
            <h4 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-400 mt-4">1. Product Testing Methodology</h4>
            <p>
              Product reviews in our guides are based on detailed internal review protocols. For lift gear and tracking wearables, we execute physical load cycles inside real environments. For sports nutrition, we analyze certified formula lists and clinical trials from public databases.
            </p>
            <h4 className="text-xs font-bold font-mono tracking-widest uppercase text-slate-400 mt-4">2. Corrections Workflow & Errata Log</h4>
            <p>
              Accuracy is vital for authority. If you identify a factual error, scientific calculation mistake, or incorrect formula documentation, please get in touch with our Review Board. We record any substantial updates in our active article logs.
            </p>
          </div>
        );

      case 'disclosure':
        return (
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p className="bg-orange-50 text-orange-950 p-4 border border-orange-200 rounded-lg text-xs leading-relaxed">
              <strong>Compliance Declaration:</strong> The Federal Trade Commission (FTC) requires digital publishers to clearly state any relationship with affiliate networks or conditioning equipment providers.
            </p>
            <p>
              FitnessBlog participates in various selective affiliate recruitment networks, including the Amazon Services LLC Associates Program. This program is designed to provide a process for platforms to earn advertising compensation by directing traffic and links to Amazon properties.
            </p>
            <p>
              This means we may receive a commission on purchases made via our outbound tracking links. This has no impact on product prices, nor does it affect our editorial analysis. If you buy a recommended training gear item, we receive a small commission that helps support our research, laboratory operations, and writing costs.
            </p>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4 text-slate-700 leading-relaxed text-xs">
            <p><strong>Effective Date:</strong> June 14, 2026</p>
            <p>
              At FitnessBlog, we prioritize your digital privacy. This document outlines how we collect, process, and protect your personal information when you subscribe to our training newsletters, browse our logs, or submit comments.
            </p>
            <h4 className="font-bold text-slate-900">1. Data Collected & Tracking Protocols</h4>
            <p>
              We collect user-submitted email addresses through newsletter subscription inputs and inquiry forms. We also use tracking systems to monitor traffic trends (such as Pageviews, active sessions, and browser devices). This information helps us optimize reading layouts.
            </p>
            <h4 className="font-bold text-slate-900">2. Cookies and Third-Party Ad Systems</h4>
            <p>
              Our website works with digital advertising partners, including Google AdSense. Ad networks may place cookies on your browser to deliver personalized ads based on your visit history. You can adjust your browser cookie settings at any time.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4 text-slate-700 leading-relaxed text-xs">
            <p>By using the FitnessBlog Authority Platform, you agree to these terms of service. If you do not accept these terms, please stop using our website.</p>
            <h4 className="font-bold text-slate-900">1. Intellectual Property Usage</h4>
            <p>All content on this website, including articles, layouts, custom code, comparison tables, and graphics, is key intellectual wealth owned by FitnessBlog. You may not republish our text, code, or images without official permission.</p>
            <h4 className="font-bold text-slate-900">2. Safety and Physical Warnings</h4>
            <p>Our workout, performance science, and diet guides are produced by certified trainers for general educational purposes. None of our articles should be taken as personal clinical medical advice. Constantly consult a physician before launching a heavy program. Read our general disclaimer for details.</p>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200 text-xs font-mono">
              <strong>Critical physical Information Notice:</strong> All training structures, cardio calculations, and calorie indices on FitnessBlog are provided strictly for educational purposes.
            </div>
            <p className="font-semibold text-slate-900">1. Not Personal Medical Consultations</p>
            <p className="text-xs font-light text-slate-500">
              Dr. Elena Ramirez is a licensed physical therapist and clinical dietitian, but her articles are not individual consultations. Heavy progressive overload and diet modifications hold high intrinsic strain risks. Check with a physician before starting any routine.
            </p>
            <p className="font-semibold text-slate-900">2. Workout Template Warnings</p>
            <p className="text-xs font-light text-slate-500">
              All weightlifting templates, swimming metrics, and tissue recovery programs are configured for educational reference only. Execute exercises at your own discretion.
            </p>
          </div>
        );

      case 'dmca':
        return (
          <div className="space-y-3 text-slate-700 leading-relaxed text-xs">
            <p>FitnessBlog complies with the Digital Millennium Copyright Act (DMCA). We respect intellectual property rights and respond promptly to verified claims of copyright infringement.</p>
            <p>If you believe your copyrighted work has been republished on our website without authorization, please send a written DMCA Notice to our copyright agent:</p>
            <pre className="p-3 bg-gray-50 border border-gray-200 rounded font-mono text-[10px] leading-relaxed">
              Attn: DMCA Copyright Agent, FitnessBlog Legal Desk
              Email: legal-copyright@fitnessblog-example.com
              Include: Exact URL paths, contact details, and physical sig confirmation.
            </pre>
          </div>
        );

      case 'sitemap':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-150 mb-4 text-xs font-mono text-gray-500">
              <span>Sitemap Format: <strong>XML-Schema + Human Reading</strong></span>
              <span className="text-orange-650 text-orange-600">Total Index Nodes: {9 + articles.length}</span>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-gray-400 mb-2">Primary Index Gateways</h4>
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden divide-y divide-gray-50 text-xs">
                  <div className="p-3 flex justify-between hover:bg-slate-50">
                    <span className="font-mono text-orange-600 font-semibold">https://fitnessblog-example.com/</span>
                    <span className="text-slate-400">priority: 1.0 • changefreq: daily</span>
                  </div>
                  <div className="p-3 flex justify-between hover:bg-slate-50">
                    <span className="font-mono text-slate-700">https://fitnessblog-example.com/categories/gym</span>
                    <span className="text-slate-400">priority: 0.8 • changefreq: weekly</span>
                  </div>
                  <div className="p-3 flex justify-between hover:bg-slate-50">
                    <span className="font-mono text-slate-700">https://fitnessblog-example.com/categories/fat-loss</span>
                    <span className="text-slate-400">priority: 0.8 • changefreq: weekly</span>
                  </div>
                  <div className="p-3 flex justify-between hover:bg-slate-550 hover:bg-slate-50">
                    <span className="font-mono text-slate-700">https://fitnessblog-example.com/categories/swimming</span>
                    <span className="text-slate-400">priority: 0.8 • changefreq: weekly</span>
                  </div>
                  <div className="p-3 flex justify-between hover:bg-slate-50">
                    <span className="font-mono text-slate-700">https://fitnessblog-example.com/categories/recovery</span>
                    <span className="text-slate-400">priority: 0.8 • changefreq: weekly</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-gray-400 mb-2">Live Article Nodes</h4>
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden divide-y divide-gray-50 text-xs font-mono max-h-48 overflow-y-auto">
                  {articles.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => {
                        onSelectArticle(art.slug);
                        onClose();
                      }}
                      className="w-full text-left p-2.5 flex justify-between hover:bg-orange-50"
                    >
                      <span className="text-orange-650 text-orange-600 truncate max-w-sm">https://fitnessblog-example.com/blog/{art.slug}</span>
                      <span className="text-slate-400 flex-shrink-0">priority: 0.7 • lastmod: {art.lastUpdatedDate}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 animation-fade-in">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-101 border-gray-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-orange-100 text-orange-700 rounded-lg">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-base font-bold font-display text-gray-900">{getPageTitle()}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-sm font-semibold"
          >
            Close ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500 rounded-b-2xl flex justify-between items-center font-mono">
          <span>Official Publication document</span>
          <span>FitnessBlog Representative Desk</span>
        </div>

      </div>
    </div>
  );
}

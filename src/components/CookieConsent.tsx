/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shield, Eye, Lock, Check, AlignJustify } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacyPage: (id: string) => void;
  enabled?: boolean;
}

export default function CookieConsent({ onOpenPrivacyPage, enabled = true }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }
    try {
      const accepted = localStorage.getItem('gb_cookies_accepted');
      if (!accepted) {
        // Trigger with a subtle delay for visual elegance
        const timer = setTimeout(() => {
          setVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('localStorage block, showing banner as transient component.');
      setVisible(true);
    }
  }, [enabled]);

  const handleAccept = () => {
    try {
      localStorage.setItem('gb_cookies_accepted', 'true');
    } catch (_) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-md z-50 animate-fade-in"
      id="gdpr-cookie-consent"
    >
      <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl shadow-2xl space-y-4 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500"></div>

        <div className="flex items-start gap-3">
          <div className="bg-orange-950/80 p-2 rounded-xl border border-orange-900/40 flex-shrink-0 mt-0.5">
            <Shield className="w-5 h-5 text-orange-400" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-900/40 leading-none">
                Privacy Node
              </span>
              <h4 className="text-xs font-bold font-display text-white">AdSense GDPR / CCPA Compliance Verification</h4>
            </div>
            <p className="text-[11px] text-slate-350 leading-relaxed font-light">
              This publishing portal deploys local cookies and anonymized sitemap trackers to personalize content, audit outbound FTC links, and render high-CTR Google AdSense network banners safely.
            </p>
          </div>
        </div>

        <div className="pt-1 flex flex-col xs:flex-row gap-2 justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-slate-850">
          <button
            onClick={() => onOpenPrivacyPage('privacy')}
            className="text-[10px] text-orange-400 hover:text-orange-300 font-mono font-medium hover:underline flex items-center gap-1 cursor-pointer"
          >
            Review Cookie Disclosures &rarr;
          </button>
          
          <div className="flex items-center gap-2 w-full xs:w-auto">
            <button
              onClick={handleAccept}
              className="w-full text-center xs:w-auto bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-[10px] px-4 py-2 rounded-lg uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Check className="w-3 h-3" />
              Accept Parameters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Code, CheckCircle, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { AdSettings } from '../types';

interface AdContainerProps {
  slot: 'above' | 'mid' | 'sidebar' | 'infeed' | 'footer';
  settings: AdSettings;
  onAdClick?: () => void;
  className?: string;
}

export default function AdContainer({
  slot,
  settings,
  onAdClick,
  className = '',
}: AdContainerProps) {
  const [clicked, setClicked] = useState(false);

  // Check if slot is enabled in configurations
  const isEnabled = () => {
    switch (slot) {
      case 'above': return settings.enableAboveContent;
      case 'mid': return settings.enableMidContent;
      case 'sidebar': return settings.enableSidebar;
      case 'infeed': return settings.enableInFeed;
      case 'footer': return settings.enableFooter;
      default: return false;
    }
  };

  if (!isEnabled()) return null;

  // Retrieve actual live ad code or default placeholder mock details
  const getAdCodeAndDetails = () => {
    switch (slot) {
      case 'above':
        return {
          code: settings.aboveContentCode || '',
          placeholderTitle: 'Premium CPM Banner - Above Content Slot',
          placeholderCompany: 'Sponsored: Nexus Capital Investment Inverters',
          placeholderDesc: '⚡ High Efficiency 98.4% MPPT Solar Controllers. Accelerate capital deductions with green tax incentives. Tap to evaluate.',
          dimensionsClass: 'min-h-[100px] sm:min-h-[140px]',
          bgColorClass: 'bg-orange-50/50 border-orange-100 text-slate-900',
          badgeClass: 'bg-orange-650 text-white',
        };
      case 'mid':
        return {
          code: settings.midContentCode || '',
          placeholderTitle: 'Contextual Lead Ad - Mid Article Slot',
          placeholderCompany: 'CloudIngress Edge Protections',
          placeholderDesc: '🛡️ Deploy low-latency ZTNA tunnels and globally cached reverse DNS proxies in under 2 minutes. Secure your personal workspace nodes today.',
          dimensionsClass: 'min-h-[120px]',
          bgColorClass: 'bg-slate-900 border-slate-800 text-slate-100',
          badgeClass: 'bg-amber-450 bg-amber-500 text-slate-950',
        };
      case 'sidebar':
        return {
          code: settings.sidebarCode || '',
          placeholderTitle: 'Vertical Core Ad - Column Sticky Slot',
          placeholderCompany: 'Walnut Designs: Ergonomic Workspace Essentials',
          placeholderDesc: '🌿 Elevate your biological productivity index. Real American Walnut monitor risers and natural wool felt desk pads 30% off. Code: FLOURISH.',
          dimensionsClass: 'min-h-[250px] py-10 flex flex-col justify-center',
          bgColorClass: 'bg-amber-50/30 border-amber-200 text-amber-950',
          badgeClass: 'bg-amber-550 bg-amber-600 text-white',
        };
      case 'infeed':
        return {
          code: settings.inFeedCode || '',
          placeholderTitle: 'Dynamic Contextual Link - In-Feed Slot',
          placeholderCompany: 'TaxDesk Software Suite 2026',
          placeholderDesc: '📊 Streamline quarterly algorithmic passive capital payouts and sitemap-driven corporate expenses under modern FTC filing routines. Instant preview.',
          dimensionsClass: 'min-h-[90px] sm:min-h-[110px]',
          bgColorClass: 'bg-emerald-50/40 border-emerald-150 text-emerald-950',
          badgeClass: 'bg-emerald-550 bg-emerald-600 text-white',
        };
      case 'footer':
        return {
          code: settings.footerCode || '',
          placeholderTitle: 'Link Cluster Ads - Matching Footer Slot',
          placeholderCompany: 'Explore High Affinity Sponsored Blueprints:',
          placeholderDesc: '🔗 1. Compare High-yield Capital Nodes • 2. Self-hosted Matter Gateways • 3. Biological Protein Synergies',
          dimensionsClass: 'min-h-[80px]',
          bgColorClass: 'bg-slate-50 border-slate-200 text-slate-700',
          badgeClass: 'bg-slate-600 text-white',
        };
      default:
        return {
          code: '',
          placeholderTitle: 'Responsive Slot Block',
          placeholderCompany: 'Sponsored Contextual Solutions',
          placeholderDesc: 'High efficiency ad blocks designed for maximum CTR. Customize settings in panel.',
          dimensionsClass: 'min-h-[100px]',
          bgColorClass: 'bg-gray-50 border-gray-150 text-gray-800',
          badgeClass: 'bg-gray-500 text-white',
        };
    }
  };

  const ad = getAdCodeAndDetails();
  const isActualCodeMode = settings.adLayoutMode === 'actual_code';

  const handleAdClickSim = () => {
    setClicked(true);
    if (onAdClick) {
      onAdClick();
    }
    setTimeout(() => setClicked(false), 2000);
  };

  // If in custom code mode AND a code is available, inject it directly
  if (isActualCodeMode && ad.code.trim().length > 0) {
    return (
      <div 
        className={`w-full overflow-hidden flex justify-center items-center py-2 ${className}`}
        id={`live-ad-slot-${slot}`}
      >
        <div 
          className="w-full relative min-h-[50px]"
          dangerouslySetInnerHTML={{ __html: ad.code }}
          onClick={() => {
            if (onAdClick) onAdClick();
          }}
        />
      </div>
    );
  }

  // If live mode is selected but code is empty, show a guidance block
  if (isActualCodeMode && ad.code.trim().length === 0) {
    return (
      <div 
        className={`w-full bg-slate-50 border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center select-none flex flex-col justify-center items-center py-6 ${className}`}
        id={`awaiting-ad-code-${slot}`}
      >
        <div className="bg-slate-200/60 p-2 rounded-full mb-2">
          <Code className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-xs font-bold text-gray-800 font-display">AdSense Slot Active (Awaiting Tag)</p>
        <p className="text-[10px] text-gray-400 mt-1 max-w-sm">
          Please paste your live Google AdSense `<span className="font-mono text-gray-500">{"<ins>"}</span>` element code block for the <strong>{slot} slot</strong> in the Admin Panel settings to render it live here.
        </p>
      </div>
    );
  }

  // Otherwise, render our designed, interactive simulator layout with click logs
  return (
    <div 
      onClick={handleAdClickSim}
      className={`w-full border rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all duration-300 hover:shadow-sm cursor-pointer select-none group ${ad.bgColorClass} ${ad.dimensionsClass} ${className}`}
      id={`simulated-ad-slot-${slot}`}
    >
      {/* Top Banner Tags */}
      <div className="absolute top-1 left-2 flex items-center gap-1.5 z-10">
        <span className={`text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded leading-none ${ad.badgeClass}`}>
          AD SLOT
        </span>
        <span className="text-[8px] font-mono opacity-60 tracking-wider font-semibold uppercase">
          AdSense: ca-pub-{settings.adSensePublisherId || '9482017382012930'}
        </span>
      </div>

      <div className="absolute top-1 right-2 flex items-center gap-1 opacity-40 group-hover:opacity-75 transition-opacity">
        <span className="text-[7px] font-mono uppercase tracking-widest font-bold">Simulator</span>
        <ExternalLink className="w-2.5 h-2.5" />
      </div>

      {/* Main Container Content */}
      <div className="pt-2 sm:pt-3 space-y-1.5">
        <span className="block text-[10px] font-mono font-bold tracking-widest uppercase opacity-40 leading-none">
          {ad.placeholderTitle}
        </span>
        <div className="space-y-0.5">
          <span className="text-xs font-extrabold font-display leading-snug block hover:underline">
            {ad.placeholderCompany}
          </span>
          <p className="text-[11px] font-light leading-relaxed opacity-90">
            {ad.placeholderDesc}
          </p>
        </div>
      </div>

      {/* Click Visual Alert */}
      {clicked && (
        <div className="absolute inset-0 bg-emerald-650 bg-emerald-600/95 text-white backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in text-center z-20">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 font-bold text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-250 text-emerald-350" />
              <span>Click Registered Safely!</span>
            </div>
            <p className="text-[10px] text-emerald-100 max-w-xs mx-auto leading-tight">
              Simulated RPM Earnings +${(settings.simulatedRPM / 100).toFixed(2)} logged to the Administrator Dashboard.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

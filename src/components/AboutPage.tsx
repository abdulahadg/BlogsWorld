/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Sparkles, ShieldCheck, Dumbbell, Users, Eye, Target, ArrowRight, 
  HelpCircle, Award, CheckCircle, Flame, HeartPulse 
} from 'lucide-react';
import { Category } from '../types';

interface AboutPageProps {
  onGoHome: () => void;
  onSelectCategory: (id: string | null) => void;
  categories: Category[];
}

export default function AboutPage({ onGoHome, onSelectCategory, categories }: AboutPageProps) {
  const stats = [
    { value: "3.5M+", label: "Annual Athletes", desc: "Digital readers looking for scientific physical advice." },
    { value: "280+", label: "Equipment Audits", desc: "Barbells, tracking wearables, and swim gears fully tested." },
    { value: "48K+", label: "Conditioning Members", desc: "Active sub-niche readers receiving weekly training templates." },
    { value: "100%", label: "Conflict-Free Scoring", desc: "Zero sponsored review manipulation. Strictly raw metrics." }
  ];

  const coreTeam = [
    {
      name: "Sarah Jenkins, CSCS",
      role: "Lead Strength Analyst & Weightlifting Coach",
      bio: "Sarah is a Certified Strength and Conditioning Specialist and competitive lift mechanics expert. She manages our high-pressure load assessment gym and drafts barbell hypertrophy templates.",
      avatarBg: "bg-slate-900 border-orange-500/20",
      iconColor: "text-orange-400"
    },
    {
      name: "Marcus Thorne, MS, PES",
      role: "Endurance Strategist & Master Swim Coach",
      bio: "Marcus holds a Master of Science in Exercise Physiology. He oversees cardiorespiratory testing, VO2 max interval modeling, and hydrodynamic aquatic stroke designs.",
      avatarBg: "bg-slate-900 border-cyan-500/20",
      iconColor: "text-cyan-400"
    },
    {
      name: "Dr. Elena Ramirez, DPT, RD",
      role: "Chief Sports Nutritionist & Clinical Evaluator",
      bio: "Dr. Ramirez is a Doctor of Physical Therapy and Registered Dietitian. She cross-checks metabolic partitioning equations and cellular tissue recovery metrics against clinical peer-reviewed journals.",
      avatarBg: "bg-slate-900 border-emerald-500/20",
      iconColor: "text-emerald-400"
    }
  ];

  const activeAdBlockNotice = "google.com, pub-9482017382012930, DIRECT, f08c47fec5942fa0";

  return (
    <div className="bg-slate-50/40 min-h-screen py-10" id="about-us-page-root">
      
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 select-none">
          <button onClick={onGoHome} className="hover:text-orange-600 transition-colors cursor-pointer">HOME</button>
          <span>/</span>
          <span className="text-gray-900 font-bold uppercase">ABOUT OUR FITNESS AUTHORITY</span>
        </div>
      </div>

      {/* Hero Header Block */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-[2.5rem] bg-slate-900 overflow-hidden text-white py-16 px-6 sm:px-12 md:px-20 shadow-xl border border-slate-800">
          <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black tracking-widest text-orange-400 uppercase bg-orange-950/60 px-3 py-1.5 rounded-full border border-orange-900/60 shadow-xs leading-none">
              <Sparkles className="w-3 h-3 animate-pulse" /> Peak Conditioning Integrity
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-none text-white m-0">
              Science-backed plans for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-emerald-400">calculated physical growth</span>.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light font-sans max-w-2xl">
              FitnessBlog was established because the modern fitness landscape is saturated with short-term fads and unscientific workout gimmicks. We translate clinical muscle metabolism and physical movement research into practical, step-by-step training guides.
            </p>
          </div>
        </div>
      </header>

      {/* Dynamic Counter Statistics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" id="about-stats-deck">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => (
            <div 
              key={idx}
              className="bg-white border border-gray-150 p-6 rounded-3xl shadow-3xs hover:shadow-xs transition-shadow duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-orange-50 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
              
              <div className="space-y-1.5 relative z-10">
                <span className="block text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight group-hover:text-orange-650 transition-colors">
                  {s.value}
                </span>
                <p className="text-xs font-bold font-display text-gray-800 leading-tight uppercase tracking-wide">
                  {s.label}
                </p>
                <p className="text-[11px] text-gray-500 leading-normal font-light">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Massive Editorial Pillars Section (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" id="editorial-pillars">
        <div className="space-y-2 mb-8 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-orange-650 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
            Standards Framework
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-gray-900 m-0">Our Core Operating Pillars</h2>
          <p className="text-xs text-gray-500 font-light max-w-xl leading-relaxed">
            How we maintain absolute authority status while operating our targeted fitness and conditioning publication portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-3xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-orange-50 border border-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold font-display text-gray-900 uppercase tracking-wider m-0">Biomechanical Lift Auditing</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                We do not synthesize safety suggestions. Every barbell shaft, knurling depth, elastic band tension force, or rack anchor system is tested in our local strength center to calculate stable force-dispersion rates.
              </p>
            </div>
            <div className="text-[10px] font-mono font-bold text-orange-600 uppercase flex items-center gap-1 select-none">
              <span>View Gym Workflows</span> &rarr;
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-3xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold font-display text-gray-900 uppercase tracking-wider m-0">Clinical Calorie Mapping</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Our dietary plans are strictly evidence-based. Dr. Elena Ramirez meticulously audits fat mobilization equations, glycogen replenishment ratios, and daily step tracking targets to guarantee they match verified research guidelines.
              </p>
            </div>
            <div className="text-[10px] font-mono font-bold text-emerald-600 uppercase flex items-center gap-1 select-none">
              <span>Clinical Audits Active</span> <span>✓</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-3xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-cyan-50 border border-cyan-155 text-cyan-600 rounded-2xl flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold font-display text-gray-900 uppercase tracking-wider m-0">Hydrodynamic Diagnostics</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                We study flow mechanics. Marcus Thorne structures our aquatic endurance drills using state-of-the-art flow sensors, ensuring drag reduction techniques are perfectly documented to help swimmers double their lungs capacity.
              </p>
            </div>
            <div className="text-[10px] font-mono font-bold text-cyan-600 uppercase flex items-center gap-1 select-none">
              <span>Review Hydrodynamics</span> <HelpCircle className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Board Column */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" id="about-team-grid">
        <div className="space-y-2 mb-8 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-orange-650 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
            Our Specialists
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-gray-900 m-0">Qualified Scientific Specialists</h2>
          <p className="text-xs text-gray-500 font-light max-w-xl leading-relaxed">
            The certified coaches, clinical nutritionists, and physical therapists driving our dynamic publishing engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreTeam.map((member, idx) => (
            <div 
              key={idx}
              className="bg-white border border-gray-150 rounded-3xl shadow-3xs p-6 flex flex-col justify-between relative overflow-hidden group hover:shadow-xs transition-shadow duration-300"
            >
              {/* Card Header Section */}
              <div className="space-y-4">
                <div className="flex gap-3.5 items-center">
                  <div className={`w-12 h-12 rounded-2xl ${member.avatarBg} border flex items-center justify-center font-display text-[18px] font-black ${member.iconColor} shadow-inner`}>
                    {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide leading-tight m-0">{member.name.split(',')[0]}</h3>
                    <span className="text-[10px] font-mono font-extrabold text-orange-600 tracking-wider uppercase block mt-0.5">{member.role}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  {member.bio}
                </p>
              </div>

              {/* Card Footer credentials checklist */}
              <div className="border-t border-gray-100 pt-4 mt-6 flex justify-between items-center bg-gray-50/50 -mx-6 -mb-6 p-4 rounded-b-3xl">
                <div className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider">Board Certifications Approved</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-emerald-250">
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>



    </div>
  );
}

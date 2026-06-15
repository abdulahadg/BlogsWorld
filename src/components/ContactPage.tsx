/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Send, Mail, Phone, MapPin, CheckCircle, Clock, Trash2, 
  HelpCircle, AlertCircle, FileText, ArrowLeft, ShieldCheck, Ticket, Dumbbell 
} from 'lucide-react';

interface ContactPageProps {
  onGoHome: () => void;
}

interface SubmittedTicket {
  id: string;
  name: string;
  email: string;
  department: string;
  message: string;
  priority: string;
  sla: string;
  date: string;
}

export default function ContactPage({ onGoHome }: ContactPageProps) {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDept, setFormDept] = useState('General Desk');
  const [formPriority, setFormPriority] = useState('Medium');
  const [formMessage, setFormMessage] = useState('');
  const [submittedTickets, setSubmittedTickets] = useState<SubmittedTicket[]>([]);
  const [justSubmitted, setJustSubmitted] = useState<SubmittedTicket | null>(null);

  const departments = [
    { name: "General Operations Desk", value: "General Desk", sla: "Within 24 Hours" },
    { name: "Affiliate & Corporate Partnerships", value: "Business Partnerships", sla: "Within 48 Hours" },
    { name: "Strength Center & Gear Auditing Lab", value: "Strength Auditing Lab", sla: "Within 12 Hours" },
    { name: "Sports Nutrition Errata & Editorial Standards", value: "Dietary Review Board", sla: "Within 6 Hours" }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    const matchedDept = departments.find(d => d.value === formDept);
    const selectedSLA = matchedDept ? matchedDept.sla : "Within 24 Hours";

    // Generate simulated Ticket ID
    const ticketId = `FB-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: SubmittedTicket = {
      id: ticketId,
      name: formName,
      email: formEmail,
      department: formDept,
      message: formMessage,
      priority: formPriority,
      sla: selectedSLA,
      date: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setSubmittedTickets([newTicket, ...submittedTickets]);
    setJustSubmitted(newTicket);

    // Reset Form Input State
    setFormMessage('');
  };

  const removeTicket = (id: string) => {
    setSubmittedTickets(submittedTickets.filter(t => t.id !== id));
    if (justSubmitted?.id === id) {
      setJustSubmitted(null);
    }
  };

  const clearForm = () => {
    setFormName('');
    setFormEmail('');
    setFormDept('General Desk');
    setFormPriority('Medium');
    setFormMessage('');
    setJustSubmitted(null);
  };

  return (
    <div className="bg-slate-50/40 min-h-screen py-10" id="contact-page-root">
      
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 select-none">
          <button onClick={onGoHome} className="hover:text-orange-600 transition-colors cursor-pointer">HOME</button>
          <span>/</span>
          <span className="text-gray-900 font-bold uppercase">TRAINING CONNECTION DESK</span>
        </div>
      </div>

      {/* Hero Intro Banner */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-[2.5rem] bg-slate-900 overflow-hidden text-white py-16 px-6 sm:px-12 md:px-20 shadow-xl border border-slate-800">
          <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black tracking-widest text-orange-300 uppercase bg-orange-950/70 px-3 py-1.5 rounded-full border border-orange-905 shadow-xs leading-none">
              <Dumbbell className="w-3 h-3 text-orange-400" /> Direct Athletics Dispatch
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-none text-white m-0">
              Get in touch with our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-orange-400">credentialed conditioning desk</span>.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light font-sans max-w-2xl">
              Have questions about physical muscle mechanics, equipment endurance metrics, or sports performance diet guidelines? Fill out the direct dispatch card below to communicate with our certified editorial board.
            </p>
          </div>
        </div>
      </header>

      {/* Master Layout - Centered Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          
          {/* CENTRAL CONTENT FOR INTERACTIVE CONTACT FORM & TICKET OUTPUT */}
          <main className="space-y-8">
            
            {justSubmitted ? (
              /* TICKETING SUCCESS BOARD */
              <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden animation-fade-in" id="ticket-success">
                <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500"></div>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 animate-bounce" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-black font-display text-gray-900 m-0 uppercase tracking-wide">Inquiry Submitted</h3>
                      <p className="text-xs text-gray-500">
                        Thank you for reaching out. Your inquiry has been registered in our system.
                      </p>
                    </div>
                  </div>

                  {/* Ticket UI Representation */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 font-mono shadow-inner relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-slate-850/80">
                      <Ticket className="w-12 h-12 rotate-12" />
                    </div>

                    <div className="space-y-4 relative z-10 text-[11px] leading-relaxed">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <span className="font-extrabold text-orange-400">🎫 INQUIRY CONFIRMATION</span>
                        <span className="bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] tracking-widest border border-emerald-900">
                          STATUS: SUBMITTED
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 border-b border-slate-800 pb-4">
                        <div>
                          <span className="text-slate-500 uppercase font-bold text-[9px] block">Reference ID</span>
                          <span className="text-slate-300 font-bold text-xs">{justSubmitted.id}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 uppercase font-bold text-[9px] block">Your Name</span>
                          <span className="text-slate-300 truncate block">{justSubmitted.name}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 uppercase font-bold text-[9px] block">Desk</span>
                          <span className="text-slate-300">{justSubmitted.department}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 uppercase font-bold text-[9px] block">Est Response Time</span>
                          <span className="text-amber-400 font-bold">{justSubmitted.sla}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-slate-500 uppercase font-bold text-[9px] block">Message Summary</span>
                        <p className="text-slate-350 italic m-0 line-clamp-2">"{justSubmitted.message}"</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={clearForm}
                      className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl py-3 px-5 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      File New Inquiry
                    </button>
                    <button
                      onClick={() => setJustSubmitted(null)}
                      className="border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl py-3 px-5 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Hide Receipt
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* MODERN CONTACT FORM CARD */
              <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-3xs" id="contact-form-card">
                <div className="space-y-4 mb-6">
                  <h2 className="text-lg font-black font-display text-gray-900 m-0 uppercase tracking-tight">Send a Message</h2>
                  <p className="text-xs text-gray-500 font-light">
                    Have questions or feedback? Drop us a message below and we will get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Johnathan Doe"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. jdoe@company.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={formDept}
                        onChange={(e) => setFormDept(e.target.value)}
                        className="w-full border border-gray-100 bg-white rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-orange-550 focus:border-orange-500 font-sans"
                      >
                        {departments.map((d, idx) => (
                          <option key={idx} value={d.value}>{d.name} ({d.sla})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600 mb-1">
                        Urgency & Priority Class
                      </label>
                      <div className="flex gap-2.5 mt-1.5">
                        {['Standard', 'Medium', 'Critical'].map((pri) => (
                          <button
                            key={pri}
                            type="button"
                            onClick={() => setFormPriority(pri)}
                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                              formPriority === pri 
                                ? 'bg-orange-600 border-orange-600 text-white shadow-xs' 
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-500 border-gray-150'
                            }`}
                          >
                            {pri}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600 mb-1">
                      Message <span className="text-red-550 text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-3xs"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </div>
            )}

            {/* DYNAMIC LOCAL TICKETS GRID LIST */}
            {submittedTickets.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-3xs space-y-4 animation-fade-in">
                <div className="flex justify-between items-center pb-2 border-b border-gray-150">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 bg-orange-50 text-orange-700 rounded-md">
                      <Ticket className="w-4 h-4" />
                    </span>
                    <h3 className="text-xs font-black font-mono text-gray-900 uppercase">Your Submitted Messages ({submittedTickets.length})</h3>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Client-Side State Storage</span>
                </div>

                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {submittedTickets.map((tc) => (
                    <div 
                      key={tc.id} 
                      className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between gap-4 group animation-slide-up"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono font-black text-xs text-orange-600">{tc.id}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-[9px] font-mono bg-orange-50 text-orange-850 hover:text-orange-950 border border-orange-200 px-1.5 py-0.5 rounded font-extrabold uppercase">
                            {tc.department}
                          </span>
                          <span className={`${
                            tc.priority === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                          } text-[8px] font-mono border px-1.5 py-0.5 rounded font-bold`}>
                            {tc.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-1 italic max-w-md m-0">"{tc.message}"</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-gray-400">{tc.date}</span>
                        <button
                          onClick={() => removeTicket(tc.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Purge Ticket"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  );
}

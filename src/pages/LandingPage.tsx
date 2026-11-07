import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { ScholarshipCard } from '../components/ScholarshipCard';
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Search,
  Sliders,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Award,
  Users,
  Coins,
  Columns2
} from 'lucide-react';
import { Logo } from '../components/Logo';
import heroStudents from '../assets/images/grantly_hero_students_1794036376671.jpg';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setAuthModal, scholarships } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featured = scholarships.filter((s) => s.featured).slice(0, 3);

  const faqs = [
    {
      q: 'How does the Smart Eligibility Checker work?',
      a: 'The engine compares your self-reported academic aggregate, family income bracket, domicile state, and course level against official scholarship eligibility criteria. It breaks down exactly which thresholds are met and flags missing requirements before you submit.'
    },
    {
      q: 'Is GRANTLY an official government authority?',
      a: 'GRANTLY is a centralized EdTech discovery and management platform. In this hackathon demonstration environment, all data and applications are managed locally in client storage to show the seamless student user journey without contacting external ministerial networks.'
    },
    {
      q: 'Can I compare multiple scholarships side by side?',
      a: 'Yes! You can select up to 3 scholarships from the explorer and open our comparison matrix to evaluate grants, GPA cutoffs, domicile constraints, and required documents side by side.'
    },
    {
      q: 'Are my uploaded certificates and personal data kept private?',
      a: 'All documents and profile modifications are stored securely inside your browser’s local storage. No files or personal data are transmitted to any external server or unauthorized third parties.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unified Scholarship Discovery & Management Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Find the Scholarship That Moves Your Future Forward.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Tired of scattered portals, opaque eligibility rules, and missed deadlines?
                GRANTLY unifies scholarship search, automated criteria auditing, side-by-side comparison,
                and application tracking into one seamless student experience.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentView('explorer')}
                  className="px-6 py-3.5 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-indigo-500/20 transition flex items-center justify-center gap-2"
                >
                  <span>Explore Scholarships</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setAuthModal('register')}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2"
                >
                  <span>Get Started Demo</span>
                </button>
              </div>

              {/* Small Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Rule-Based Eligibility Audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero Application Brokerage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Client-Side Privacy</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-[4/3] group">
                <img
                  src={heroStudents}
                  alt="Students collaborating on scholarship research"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white space-y-1">
                    <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">
                      Empowering Ambition
                    </p>
                    <p className="text-sm font-bold">
                      Centralizing financial pathways for university scholars nationwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-10 bg-slate-100/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 mx-auto flex items-center justify-center mb-2">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                {scholarships.length}+ Schemes
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Active Scholarships Listed
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tabular-nums">
                14,200+
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Students Guided (Demo)
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 mx-auto flex items-center justify-center mb-2">
                <Coins className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700 tabular-nums">
                ₹18.4 Cr+
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Total Funding Represented
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How GRANTLY Powers Your Funding Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Designed from the ground up to replace fragmented portals with clear, guided workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Build Your Profile',
                desc: 'Enter your degree, academic percentages, family income, and state domicile once.',
                icon: Sliders
              },
              {
                num: '02',
                title: 'Discover Grants',
                desc: 'Filter by technical stream, merit, need, or minority schemes with instant search.',
                icon: Search
              },
              {
                num: '03',
                title: 'Check Eligibility',
                desc: 'Audit your scores against official criteria with transparent "Why Am I Eligible" checklists.',
                icon: ShieldCheck
              },
              {
                num: '04',
                title: 'Apply & Track',
                desc: 'Organize required documents, track stages in one timeline, and never miss a cutoff.',
                icon: Calendar
              }
            ].map((step, idx) => {
              const IconC = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 p-6 rounded-2xl border border-slate-200/70 hover:border-indigo-200 transition relative space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-200 font-mono">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                      <IconC className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest block mb-1">
                Curated Opportunities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Scholarships
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                High-impact financial grants actively accepting student applications.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('explorer')}
              className="text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 transition"
            >
              <span>View All {scholarships.length} Scholarships</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose GRANTLY */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
              Built for Students
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Choose GRANTLY?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Every feature solves a concrete obstacle students face when funding their education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Smart Discovery</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter by domicile, category, education level, and income limits without scrolling through hundreds of irrelevant pdf notices.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Eligibility Matching</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant audit checklists break down satisfied conditions and alert you to state domicile or percentage thresholds before you apply.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Deadline Intelligence</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prioritized countdown timers and urgent notices prevent missed deadlines and keep document preparation on schedule.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Columns2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Scholarship Comparison</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select and stack multiple grant options side-by-side to compare funding amounts, bond requirements, and document checklists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Sample Content) */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
              Student Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              What Scholars Say About Us
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Sample student feedback illustrating application impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Priya Deshmukh',
                course: 'B.Tech Mechanical Engineering, VJTI',
                quote:
                  'Before Grantly, I spent weeks looking through obscure government circulars. The Eligibility Checker confirmed my scholarship fit in 30 seconds.',
                grant: '₹80,000 Awarded'
              },
              {
                name: 'Karan Mehra',
                course: 'M.Sc Applied Physics, Delhi University',
                quote:
                  'The side-by-side comparison made it simple to evaluate research grants versus private fellowships. The deadline radar kept me on track.',
                grant: '₹3,60,000 Doctoral Grant'
              },
              {
                name: 'Ananya Sen',
                course: 'MBBS 2nd Year, Bangalore Medical College',
                quote:
                  'Having a centralized document vault where my income certificate and marksheets are organized made applying completely stress-free.',
                grant: '₹1,50,000 Medical Stipend'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
              >
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{item.name}</h5>
                    <p className="text-[11px] text-slate-400">{item.course}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 tabular-nums">
                    {item.grant}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Discover the Right Educational Grant?
          </h2>
          <p className="text-indigo-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Join thousands of students who have simplified their scholarship journey with GRANTLY’s automated eligibility audit and tracking suite.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setCurrentView('explorer')}
              className="px-6 py-3 bg-white text-indigo-900 hover:bg-slate-100 font-semibold text-xs sm:text-sm rounded-xl shadow-md transition"
            >
              Browse All Grants
            </button>
            <button
              onClick={() => setCurrentView('checker')}
              className="px-6 py-3 bg-indigo-800 hover:bg-indigo-700 border border-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition"
            >
              Check My Eligibility
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7" />
            <span className="font-bold text-white text-sm">GRANTLY</span>
            <span className="text-slate-500">· "Your Future. Your Funding. One Platform."</span>
          </div>
          <p className="text-slate-500">
            © {new Date().getFullYear()} GRANTLY Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

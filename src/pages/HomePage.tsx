// ============================================================
// ARRIS LIBRARY — Home Page
// ============================================================

import Hero from '../components/Hero';
import { BOOK_CATEGORIES } from '../data/books';
import { TRAINING_CATEGORIES } from '../data/courses';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Vast Book Collection',
    desc: 'Access thousands of books spanning 15+ disciplines — from pure sciences to business and personal development.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Practical Training Schools',
    desc: 'World-class training in Technology, AI & Robotics, Cybersecurity, Business, Cloud Engineering, and Soft Skills.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'No Sign-Up Required',
    desc: 'Every device automatically receives a unique ID for seamless, frictionless access. No accounts, no barriers.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Curated by Experts',
    desc: 'All content is vetted and curated by industry professionals — educators, engineers, doctors, and business leaders.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Always Up to Date',
    desc: 'Our admin team continuously adds new books, courses, and announcements to keep the library fresh and relevant.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Global Standards',
    desc: 'Designed to match the quality and breadth of the world\'s finest academic and professional resource centres.',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />

      {/* ── Featured Categories ── */}
      <section className="py-20 bg-obsidian-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block font-inter font-semibold text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">Browse by Subject</span>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-3">
              Explore Our <span className="text-gold-400">Book Categories</span>
            </h2>
            <p className="font-inter text-obsidian-400 text-base max-w-xl mx-auto">
              From the foundations of science to the heights of human achievement — every field of knowledge awaits.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3">
            {BOOK_CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('library')}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-obsidian-800 border border-obsidian-700 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-200 hover:-translate-y-0.5 animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                <span className="font-inter font-medium text-obsidian-300 group-hover:text-gold-300 text-[11px] text-center leading-tight transition-colors">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('library')}
              className="inline-flex items-center gap-2 font-inter font-semibold text-gold-400 hover:text-gold-300 text-sm border border-gold-500/30 hover:border-gold-400/60 px-6 py-3 rounded-xl hover:bg-gold-500/8 transition-all"
            >
              Browse All Books
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Training Schools Preview ── */}
      <section className="py-20 bg-obsidian-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block font-inter font-semibold text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">Professional Development</span>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-3">
              Practical <span className="text-gold-400">Training Schools</span>
            </h2>
            <p className="font-inter text-obsidian-400 text-base max-w-xl mx-auto">
              Industry-led training programmes that bridge the gap between knowledge and real-world application.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {TRAINING_CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('training')}
                className="group relative text-left p-5 rounded-2xl bg-obsidian-900 border border-obsidian-700 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/8 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${cat.color} transition-opacity duration-300`} />
                <span className="text-3xl block mb-3">{cat.icon}</span>
                <h3 className="font-playfair font-bold text-white text-sm mb-1.5 group-hover:text-gold-200 transition-colors">{cat.label}</h3>
                <p className="font-inter text-obsidian-500 text-xs leading-relaxed">{cat.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-gold-500 font-inter text-xs font-semibold">
                  Explore
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('training')}
              className="inline-flex items-center gap-2 font-inter font-bold text-base text-obsidian-950 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-lg shadow-gold-500/20 hover:shadow-gold-400/40 transition-all duration-200 hover:-translate-y-px"
            >
              View All Training Programmes
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Why Arris Library ── */}
      <section className="py-20 bg-obsidian-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block font-inter font-semibold text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">Why Choose Us</span>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white">
              Built for <span className="text-gold-400">Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl bg-obsidian-800/60 border border-obsidian-700 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-0.5 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-4 group-hover:bg-gold-500/15 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-playfair font-bold text-white text-lg mb-2 group-hover:text-gold-200 transition-colors">{f.title}</h3>
                <p className="font-inter text-obsidian-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-obsidian-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gold-500/4 blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/8 border border-gold-500/25 rounded-full px-5 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-inter font-semibold text-gold-300 text-xs tracking-[0.2em] uppercase">Open to Everyone</span>
          </div>
          <h2 className="font-playfair font-black text-4xl md:text-5xl text-white mb-5 leading-tight">
            Start Learning<br />
            <span className="text-gold-400">Right Now</span>
          </h2>
          <p className="font-inter text-obsidian-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            No registration required. Your device has already been assigned a unique ID.
            Dive straight into the library or enrol in a training programme today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('library')}
              className="inline-flex items-center justify-center gap-2 font-inter font-bold text-base text-obsidian-950 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-xl shadow-gold-500/25 hover:shadow-gold-400/40 transition-all duration-200 hover:-translate-y-px"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Enter the Library
            </button>
            <button
              onClick={() => onNavigate('training')}
              className="inline-flex items-center justify-center gap-2 font-inter font-semibold text-base text-gold-300 px-8 py-4 rounded-xl border-2 border-gold-500/40 hover:border-gold-400/70 hover:bg-gold-500/8 transition-all duration-200 hover:-translate-y-px"
            >
              View Training Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

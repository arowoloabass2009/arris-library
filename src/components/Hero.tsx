// ============================================================
// ARRIS LIBRARY — Hero Section
// ============================================================

interface HeroProps {
  onNavigate: (page: string) => void;
}

const STATS = [
  { value: '10,000+', label: 'Books & References' },
  { value: '50+',     label: 'Training Courses' },
  { value: '15+',     label: 'Subject Categories' },
  { value: '24/7',    label: 'Always Available' },
];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-obsidian-950"
    >
      {/* ── Background Decoration ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gold radial glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-gold-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gold-600/4 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold-500/3" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-gold-500/20 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-gold-500/20 rounded-br-3xl" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-gold-400/40 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/3 w-2 h-2 rounded-full bg-gold-500/30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-gold-300/25 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <div className="max-w-4xl">

          {/* ── Badge ── */}
          <div className="inline-flex items-center gap-2.5 bg-gold-500/8 border border-gold-500/25 rounded-full px-5 py-2 mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-inter font-semibold text-gold-300 text-xs tracking-[0.25em] uppercase">
              World-Class Knowledge Hub
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          </div>

          {/* ── Headline ── */}
          <h1 className="font-playfair font-black leading-[1.05] text-white mb-6 animate-fade-in-up"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            The World's Premier
            <br />
            <span className="relative">
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #FFD700 0%, #E6C200 40%, #C9A800 70%, #FFD700 100%)' }}
              >
                Digital Library
              </span>
              {/* Underline accent */}
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #FFD700, #C9A800, transparent)' }} />
            </span>
            <br />
            <span className="text-obsidian-200">& Training Academy</span>
          </h1>

          {/* ── Sub-heading ── */}
          <p className="font-inter font-light text-obsidian-300 leading-relaxed max-w-2xl mb-10 animate-fade-in-up"
             style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', animationDelay: '0.2s' }}>
            Arris Library houses an extraordinary collection of books across Mathematics, Physics,
            Chemistry, Medicine, IT, Business, History, and more — paired with world-class practical
            training schools in Technology, AI & Robotics, Cybersecurity, and Business.
          </p>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up mb-16" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => onNavigate('library')}
              className="group inline-flex items-center justify-center gap-3 font-inter font-bold text-base text-obsidian-950 px-8 py-4 rounded-xl shadow-2xl shadow-gold-500/20 hover:shadow-gold-400/40 transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #FFD700 0%, #E6C200 50%, #C9A800 100%)' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Explore the Library
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => onNavigate('training')}
              className="group inline-flex items-center justify-center gap-3 font-inter font-semibold text-base text-gold-300 px-8 py-4 rounded-xl border-2 border-gold-500/40 hover:border-gold-400/70 hover:bg-gold-500/8 transition-all duration-300 hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Training Schools
            </button>
          </div>

          {/* ── Stats ── */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gold-500/15 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            {STATS.map(stat => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-playfair font-black text-3xl text-gold-400 leading-none">{stat.value}</p>
                <p className="font-inter font-medium text-obsidian-400 text-xs mt-1 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-inter text-gold-600 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

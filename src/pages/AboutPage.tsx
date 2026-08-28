// ============================================================
// ARRIS LIBRARY — About Page
// ============================================================

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const TEAM = [
  { name: 'Dr. Emeka Okonkwo', role: 'Chief Librarian & Founder', area: 'Academic Leadership', initials: 'EO' },
  { name: 'Amara Nwosu, MBA', role: 'Head of Training Schools', area: 'Professional Development', initials: 'AN' },
  { name: 'Prof. Adaeze Eze', role: 'Academic Director', area: 'Curriculum Excellence', initials: 'AE' },
  { name: 'Tunde Adeyemi', role: 'Head of Technology', area: 'Digital Infrastructure', initials: 'TA' },
  { name: 'Dr. Fatima Al-Hassan', role: 'Research Coordinator', area: 'Scientific Collections', initials: 'FA' },
  { name: 'Chukwuemeka Obi', role: 'Tech Lead', area: 'Cloud & Engineering', initials: 'CO' },
];

const VALUES = [
  { icon: '🎯', title: 'Excellence', desc: 'We hold every resource, programme, and interaction to the highest possible standard.' },
  { icon: '🌍', title: 'Accessibility', desc: 'Knowledge must be open to all. No barriers, no registration walls — just learning.' },
  { icon: '⚡', title: 'Innovation', desc: 'We continuously update our collection and methodologies to stay ahead of the world.' },
  { icon: '🤝', title: 'Community', desc: 'A shared library of human knowledge, built for and by a community of curious minds.' },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-obsidian-950 pt-20">
      {/* ── Hero ── */}
      <div className="relative bg-obsidian-900 border-b border-obsidian-800 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-gold-500/4 blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="inline-block font-inter font-semibold text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">Our Story</span>
          <h1 className="font-playfair font-black text-4xl md:text-5xl text-white mb-4">
            About <span className="text-gold-400">Arris Library</span>
          </h1>
          <p className="font-inter text-obsidian-300 text-lg max-w-3xl leading-relaxed">
            Born from a vision to democratise access to world-class knowledge, Arris Library is a
            premier digital resource centre that fuses an expansive book collection with hands-on
            professional training programmes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ── Mission ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <span className="inline-block font-inter font-semibold text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">Our Mission</span>
            <h2 className="font-playfair font-bold text-3xl text-white mb-4">
              Empowering minds with the world's <span className="text-gold-400">finest knowledge</span>
            </h2>
            <p className="font-inter text-obsidian-300 text-base leading-relaxed mb-4">
              We believe that access to quality knowledge is a fundamental right, not a privilege.
              Arris Library was built on this principle — to provide every person, on every device,
              with instant access to a world-class collection of academic and professional resources.
            </p>
            <p className="font-inter text-obsidian-400 text-base leading-relaxed">
              From a student studying mathematics in Lagos to a software engineer mastering cloud
              architecture in Abuja — Arris Library serves them both with equal depth and dedication.
            </p>
          </div>
          <div className="relative">
            <div className="relative h-full min-h-[300px] rounded-2xl bg-gradient-to-br from-obsidian-800 to-obsidian-900 border border-gold-500/15 p-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-60 h-60 rounded-full bg-gold-500/5 blur-[50px]" />
              </div>
              <div className="relative">
                <p className="font-playfair italic text-gold-200 text-xl leading-relaxed mb-6">
                  "The more that you read, the more things you will know. The more that you learn, the more places you'll go."
                </p>
                <p className="font-inter text-gold-500 font-semibold text-sm">— Dr. Seuss</p>
              </div>
              <div className="relative mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: '10,000+', label: 'Books Catalogued' },
                  { value: '50+', label: 'Training Programmes' },
                  { value: '15+', label: 'Subject Areas' },
                  { value: '∞', label: 'Open Access' },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 rounded-xl bg-obsidian-800/60 border border-obsidian-700">
                    <p className="font-playfair font-black text-gold-400 text-2xl">{s.value}</p>
                    <p className="font-inter text-obsidian-400 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Values ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="inline-block font-inter font-semibold text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">What We Stand For</span>
            <h2 className="font-playfair font-bold text-3xl text-white">Our Core <span className="text-gold-400">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div key={v.title} className="p-6 rounded-2xl bg-obsidian-900 border border-obsidian-700 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-0.5 text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="text-4xl block mb-3">{v.icon}</span>
                <h3 className="font-playfair font-bold text-white text-lg mb-2">{v.title}</h3>
                <p className="font-inter text-obsidian-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="inline-block font-inter font-semibold text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">The People Behind It</span>
            <h2 className="font-playfair font-bold text-3xl text-white">Our <span className="text-gold-400">Team</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member, i) => (
              <div key={member.name} className="group flex items-center gap-4 p-5 rounded-2xl bg-obsidian-900 border border-obsidian-700 hover:border-gold-500/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-playfair font-bold text-gold-400 text-sm">{member.initials}</span>
                </div>
                <div>
                  <p className="font-inter font-bold text-white text-sm group-hover:text-gold-200 transition-colors">{member.name}</p>
                  <p className="font-inter text-gold-500 text-xs font-medium">{member.role}</p>
                  <p className="font-inter text-obsidian-500 text-xs">{member.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-obsidian-800 to-obsidian-900 border border-gold-500/15 p-10 text-center">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
          <h3 className="font-playfair font-black text-3xl text-white mb-3">
            Ready to Start <span className="text-gold-400">Learning?</span>
          </h3>
          <p className="font-inter text-obsidian-300 text-base mb-6 max-w-xl mx-auto">
            No sign-up. No barriers. Your device ID is already your key. Dive straight into thousands of books and courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('library')}
              className="inline-flex items-center gap-2 font-inter font-bold text-base text-obsidian-950 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-lg shadow-gold-500/20 transition-all">
              Browse the Library
            </button>
            <button onClick={() => onNavigate('training')}
              className="inline-flex items-center gap-2 font-inter font-semibold text-base text-gold-300 px-8 py-4 rounded-xl border border-gold-500/40 hover:border-gold-400/70 hover:bg-gold-500/8 transition-all">
              Explore Training
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

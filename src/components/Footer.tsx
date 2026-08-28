// ============================================================
// ARRIS LIBRARY — Footer
// ============================================================

interface FooterProps {
  onNavigate: (page: string) => void;
}

const FOOTER_LINKS = {
  Library: [
    { label: 'Mathematics',   page: 'library' },
    { label: 'Physics',       page: 'library' },
    { label: 'IT & Technology', page: 'library' },
    { label: 'Business',      page: 'library' },
    { label: 'Medicine',      page: 'library' },
    { label: 'Motivational',  page: 'library' },
  ],
  'Training Schools': [
    { label: 'Tech & IT',         page: 'training' },
    { label: 'AI & Robotics',     page: 'training' },
    { label: 'Cybersecurity',     page: 'training' },
    { label: 'Business Mastery',  page: 'training' },
    { label: 'Soft Skills',       page: 'training' },
    { label: 'Data Science',      page: 'training' },
  ],
  Resources: [
    { label: 'About Us',   page: 'about' },
    { label: 'Contact',    page: 'contact' },
    { label: 'Announcements', page: 'home' },
  ],
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-obsidian-950 border-t border-gold-500/10 relative overflow-hidden">
      {/* Top gold accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-500/3 blur-[80px]" />
        <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-gold-600/2 blur-[60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main Footer Grid ── */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group mb-5 focus:outline-none">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/30">
                <span className="font-playfair font-black text-obsidian-950 text-xl">A</span>
              </div>
              <div>
                <span className="font-playfair font-bold text-xl text-white">Arris<span className="text-gold-400">Library</span></span>
                <p className="font-inter text-gold-600 text-[9px] tracking-[0.2em] uppercase">Knowledge & Excellence</p>
              </div>
            </button>

            <p className="font-inter text-obsidian-400 text-sm leading-relaxed mb-6 max-w-xs">
              The world's premier digital library and professional training academy. Empowering minds
              with knowledge across every discipline — from science to business, technology to arts.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { label: 'Twitter/X', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
                { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM10 15V9l6 3-6 3z' },
              ].map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-obsidian-800 border border-obsidian-700 hover:border-gold-500/40 hover:bg-gold-500/10 flex items-center justify-center text-obsidian-400 hover:text-gold-300 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-playfair font-bold text-gold-400 text-sm mb-4 uppercase tracking-wider">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="font-inter text-obsidian-400 hover:text-gold-300 text-sm transition-colors duration-200 text-left flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-obsidian-600 group-hover:bg-gold-400 transition-colors flex-shrink-0" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div className="py-8 border-t border-obsidian-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-playfair font-bold text-white text-lg mb-1">Stay in the know</h4>
              <p className="font-inter text-obsidian-400 text-sm">Get notified about new books, courses, and announcements.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3 max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20 rounded-xl px-4 py-3 font-inter text-white text-sm placeholder:text-obsidian-500 focus:outline-none transition-all"
              />
              <button className="px-5 py-3 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-obsidian-950 font-inter font-bold text-sm rounded-xl shadow-lg shadow-gold-500/20 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-6 border-t border-obsidian-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-obsidian-500 text-xs">
            © {new Date().getFullYear()} Arris Library. All rights reserved. Built with excellence.
          </p>
          <div className="flex items-center gap-5">
            <button className="font-inter text-obsidian-500 hover:text-gold-400 text-xs transition-colors">Privacy Policy</button>
            <button className="font-inter text-obsidian-500 hover:text-gold-400 text-xs transition-colors">Terms of Service</button>
            <button className="font-inter text-obsidian-500 hover:text-gold-400 text-xs transition-colors">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// ARRIS LIBRARY — Navigation Bar
// ============================================================

import { useState } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import DeviceBadge from './DeviceBadge';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onAdminClick: () => void;
}

const NAV_LINKS = [
  { id: 'home',     label: 'Home' },
  { id: 'library',  label: 'Library' },
  { id: 'training', label: 'Training Schools' },
  { id: 'about',    label: 'About' },
  { id: 'contact',  label: 'Contact' },
];

export default function Navbar({ currentPage, onNavigate, onAdminClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAdmin, logout } = useAdmin();

  const handleNav = (page: string) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian-950/95 backdrop-blur-xl border-b border-gold-500/10 shadow-2xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Go to home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/30 group-hover:shadow-gold-400/50 transition-all duration-300">
              <span className="font-playfair font-black text-obsidian-950 text-lg">A</span>
              <div className="absolute inset-0 rounded-xl bg-gold-300/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-playfair font-bold text-xl text-white group-hover:text-gold-300 transition-colors tracking-wide">
                Arris<span className="text-gold-400">Library</span>
              </span>
              <span className="font-inter text-gold-600 text-[9px] font-semibold tracking-[0.2em] uppercase mt-0.5">
                Knowledge & Excellence
              </span>
            </div>
          </button>

          {/* ── Desktop Navigation ── */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className={`relative px-4 py-2 font-inter font-medium text-sm rounded-lg transition-all duration-200 ${
                    currentPage === link.id
                      ? 'text-gold-400 bg-gold-500/10'
                      : 'text-obsidian-200 hover:text-gold-300 hover:bg-obsidian-800/60'
                  }`}
                >
                  {link.label}
                  {currentPage === link.id && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400" />
                  )}
                </button>
              </li>
            ))}
            {isAdmin && (
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className={`relative px-4 py-2 font-inter font-medium text-sm rounded-lg transition-all duration-200 ${
                    currentPage === 'admin'
                      ? 'text-gold-400 bg-gold-500/10'
                      : 'text-gold-500 hover:text-gold-300 hover:bg-obsidian-800/60'
                  }`}
                >
                  Admin Panel
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-md bg-gold-500/20 border border-gold-500/30 text-gold-400 text-[9px] font-bold tracking-widest uppercase">
                    ADMIN
                  </span>
                </button>
              </li>
            )}
          </ul>

          {/* ── Right Section ── */}
          <div className="hidden lg:flex items-center gap-3">
            <DeviceBadge />
            {isAdmin ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 font-inter font-semibold text-sm text-red-400 border border-red-500/30 hover:border-red-400/60 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Exit Admin
              </button>
            ) : (
              <button
                onClick={onAdminClick}
                className="flex items-center gap-2 px-5 py-2 font-inter font-bold text-sm text-obsidian-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-lg shadow-lg shadow-gold-500/20 hover:shadow-gold-400/40 transition-all duration-200 hover:-translate-y-px"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Admin Access
              </button>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(prev => !prev)}
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-obsidian-800 transition-colors"
          >
            <span className={`block w-6 h-0.5 bg-gold-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gold-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gold-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-obsidian-800 pt-3 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-left px-4 py-3 font-inter font-medium text-sm rounded-lg transition-all duration-200 ${
                  currentPage === link.id
                    ? 'text-gold-400 bg-gold-500/10 border-l-2 border-gold-400'
                    : 'text-obsidian-200 hover:text-gold-300 hover:bg-obsidian-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => handleNav('admin')}
                className="text-left px-4 py-3 font-inter font-medium text-sm text-gold-500 hover:text-gold-300 hover:bg-obsidian-800/60 rounded-lg"
              >
                Admin Panel ✦
              </button>
            )}
            <div className="px-4 pt-3 flex flex-col gap-3 border-t border-obsidian-800 mt-2">
              <DeviceBadge />
              {isAdmin ? (
                <button
                  onClick={logout}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 font-inter font-semibold text-sm text-red-400 border border-red-500/30 rounded-lg"
                >
                  Exit Admin Session
                </button>
              ) : (
                <button
                  onClick={() => { onAdminClick(); setMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 px-5 py-3 font-inter font-bold text-sm text-obsidian-950 bg-gradient-to-r from-gold-400 to-gold-500 rounded-lg"
                >
                  Admin Access
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

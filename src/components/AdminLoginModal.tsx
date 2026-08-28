// ============================================================
// ARRIS LIBRARY — Admin Login Modal
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { useToast } from '../hooks/useToast';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { login } = useAdmin();
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter your admin ID');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const ok = login(code.trim());
      setLoading(false);
      if (ok) {
        showToast('Admin access granted. Welcome!', 'success');
        onSuccess();
        onClose();
      } else {
        setError('Invalid admin ID. Access denied.');
        setCode('');
      }
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Admin authentication"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-obsidian-900 border border-gold-500/20 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-gold-500/10 animate-scale-in">

        {/* Gold accent top */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-obsidian-400 hover:text-gold-300 hover:bg-obsidian-800 rounded-lg transition-all"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/30 flex items-center justify-center animate-pulse-gold">
            <svg className="w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>

        <h2 className="font-playfair font-bold text-2xl text-white text-center mb-2">Admin Access</h2>
        <p className="font-inter text-obsidian-400 text-sm text-center mb-6">
          Enter your Admin ID to access the management panel
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label className="block font-inter font-semibold text-xs text-gold-400 uppercase tracking-wider mb-2">
              Admin ID Number
            </label>
            <input
              ref={inputRef}
              type="password"
              value={code}
              onChange={e => { setCode(e.target.value); setError(''); }}
              placeholder="Enter your admin ID"
              className={`w-full bg-obsidian-800 border rounded-xl px-4 py-3 font-inter font-semibold text-white text-center tracking-[0.3em] text-xl placeholder:text-obsidian-600 placeholder:tracking-normal placeholder:font-normal focus:outline-none focus:ring-2 transition-all ${
                error
                  ? 'border-red-500/60 focus:ring-red-500/30 focus:border-red-400'
                  : 'border-obsidian-700 focus:ring-gold-500/30 focus:border-gold-500/60'
              }`}
              autoComplete="off"
            />
            {error && (
              <p className="mt-2 font-inter text-red-400 text-xs flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-inter font-bold text-base text-obsidian-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-gold-500/20 hover:shadow-gold-400/40 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Authenticating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Authenticate
              </>
            )}
          </button>
        </form>

        <p className="mt-4 font-inter text-obsidian-600 text-xs text-center">
          Protected administrative area. Unauthorised access is prohibited.
        </p>
      </div>
    </div>
  );
}

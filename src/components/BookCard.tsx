// ============================================================
// ARRIS LIBRARY — Book Card Component
// ============================================================

import { useState } from 'react';
import type { Book } from '../types';
import { BOOK_CATEGORIES } from '../data/books';
import { BooksService } from '../lib/supabase';

interface BookCardProps {
  book: Book;
}

const StarRating = ({ rating }: { rating?: number }) => {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? 'text-gold-400' : 'text-obsidian-600'}`}
          fill="currentColor" viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="font-inter text-obsidian-400 text-[11px] ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function BookCard({ book }: BookCardProps) {
  const cat = BOOK_CATEGORIES.find(c => c.id === book.category);
  const [downloading, setDownloading] = useState(false);

  // ── Download handler ──
  const handleDownload = async () => {
    if (!book.download_url) return;
    setDownloading(true);

    try {
      // Increment the download counter in Supabase (fire-and-forget, don't block UI)
      const newCount = (book.downloads ?? 0) + 1;
      BooksService.update(book.id, { downloads: newCount }).catch(() => {});

      // Trigger browser download
      const link = document.createElement('a');
      link.href = book.download_url;
      // Try to force download; falls back to open-in-tab for non-downloadable URLs
      link.setAttribute('download', `${book.title}.pdf`);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setDownloading(false), 1200);
    }
  };

  return (
    <article className="group relative bg-obsidian-900 border border-obsidian-700 hover:border-gold-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/10 flex flex-col">

      {/* ── Book Cover ── */}
      <div className={`relative h-44 bg-gradient-to-br ${book.cover_color || 'from-obsidian-800 to-obsidian-700'} flex items-center justify-center overflow-hidden flex-shrink-0`}>
        {/* Book spine */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/30" />
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />

        <div className="flex flex-col items-center gap-2 px-8 text-center">
          <span className="text-4xl opacity-80">{cat?.icon || '📚'}</span>
          <div>
            <p className="font-playfair font-bold text-white text-sm leading-tight line-clamp-2">{book.title}</p>
            <p className="font-inter text-white/60 text-xs mt-1">{book.author}</p>
          </div>
        </div>

        {/* Featured badge */}
        {book.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-inter font-semibold text-[10px] tracking-wider uppercase">
              ✦ Featured
            </span>
          </div>
        )}

        {/* Draft badge — shown to everyone if book is unpublished, but since
            public library only loads published books this won't appear in practice */}
        {!book.is_published && (
          <div className="absolute top-3 left-6">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-900/60 border border-red-500/40 text-red-300 font-inter font-semibold text-[10px] uppercase tracking-wider">
              Draft
            </span>
          </div>
        )}

        {/* Download available indicator on cover */}
        {book.download_url && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-inter font-semibold text-[9px] uppercase tracking-wider">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Available
            </span>
          </div>
        )}

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* ── Book Info ── */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-inter font-semibold uppercase tracking-wider bg-gradient-to-r ${cat?.color || 'from-obsidian-700 to-obsidian-600'} text-white/80`}>
            {cat?.icon} {cat?.label || book.category}
          </span>
          {book.year && (
            <span className="text-obsidian-500 font-inter text-xs flex-shrink-0">{book.year}</span>
          )}
        </div>

        <h3 className="font-playfair font-bold text-white text-base leading-snug mb-1 line-clamp-2 group-hover:text-gold-200 transition-colors">
          {book.title}
        </h3>
        <p className="font-inter text-gold-500/80 text-xs font-medium mb-2">{book.author}</p>

        <p className="font-inter text-obsidian-400 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
          {book.description}
        </p>

        {/* Rating + pages */}
        <div className="flex items-center justify-between mb-3">
          <StarRating rating={book.rating} />
          <div className="flex items-center gap-2">
            {book.downloads !== undefined && book.downloads > 0 && (
              <span className="font-inter text-obsidian-500 text-[10px] flex items-center gap-0.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {book.downloads.toLocaleString()}
              </span>
            )}
            {book.pages && (
              <span className="font-inter text-obsidian-500 text-xs">{book.pages.toLocaleString()}p</span>
            )}
          </div>
        </div>

        {/* ── Download Button ── */}
        {book.download_url ? (
          <button
            onClick={handleDownload}
            disabled={downloading}
            aria-label={`Download ${book.title}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-inter font-bold text-sm text-obsidian-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 disabled:opacity-70 disabled:cursor-wait shadow-md shadow-gold-500/15 hover:shadow-gold-400/30 transition-all duration-200 hover:-translate-y-px"
          >
            {downloading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Downloading...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Book
              </>
            )}
          </button>
        ) : (
          <button
            disabled
            aria-label="No download available"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-inter font-semibold text-sm text-obsidian-500 bg-obsidian-800/50 border border-obsidian-700 cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Not Available Yet
          </button>
        )}

      </div>
    </article>
  );
}

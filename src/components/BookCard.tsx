// ============================================================
// ARRIS LIBRARY — Book Card Component
// ============================================================

import type { Book } from '../types';
import { BOOK_CATEGORIES } from '../data/books';
import { useAdmin } from '../hooks/useAdmin';

interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (id: string) => void;
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

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const { isAdmin } = useAdmin();
  const cat = BOOK_CATEGORIES.find(c => c.id === book.category);

  return (
    <article className="group relative bg-obsidian-900 border border-obsidian-700 hover:border-gold-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/10">

      {/* ── Book Cover ── */}
      <div className={`relative h-44 bg-gradient-to-br ${book.cover_color || 'from-obsidian-800 to-obsidian-700'} flex items-center justify-center overflow-hidden`}>
        {/* Decorative book spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/30" />
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />

        {/* Book icon */}
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

        {/* Unpublished badge */}
        {!book.is_published && isAdmin && (
          <div className="absolute top-3 left-6">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-900/60 border border-red-500/40 text-red-300 font-inter font-semibold text-[10px] uppercase tracking-wider">
              Draft
            </span>
          </div>
        )}

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* ── Book Info ── */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-inter font-semibold uppercase tracking-wider bg-gradient-to-r ${cat?.color || 'from-obsidian-700 to-obsidian-600'} text-white/80`}>
            {cat?.icon} {cat?.label || book.category}
          </span>
          {book.year && (
            <span className="text-obsidian-500 font-inter text-xs">{book.year}</span>
          )}
        </div>

        <h3 className="font-playfair font-bold text-white text-base leading-snug mb-1 line-clamp-2 group-hover:text-gold-200 transition-colors">
          {book.title}
        </h3>
        <p className="font-inter text-gold-500/80 text-xs font-medium mb-2">{book.author}</p>

        <p className="font-inter text-obsidian-400 text-xs leading-relaxed line-clamp-2 mb-3">
          {book.description}
        </p>

        <div className="flex items-center justify-between">
          <StarRating rating={book.rating} />
          {book.pages && (
            <span className="font-inter text-obsidian-500 text-xs">{book.pages.toLocaleString()} pages</span>
          )}
        </div>

        {/* Admin Actions */}
        {isAdmin && (onEdit || onDelete) && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-obsidian-700">
            {onEdit && (
              <button
                onClick={() => onEdit(book)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-400/40 text-gold-400 font-inter font-semibold text-xs transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(book.id)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-400/40 text-red-400 font-inter font-semibold text-xs transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

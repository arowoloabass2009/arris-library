// ============================================================
// ARRIS LIBRARY — Library Page (Books)
// ============================================================

import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { BooksService } from '../lib/supabase';
import { BOOK_CATEGORIES } from '../data/books';
import { useAdmin } from '../hooks/useAdmin';
import { useToast } from '../hooks/useToast';
import type { Book } from '../types';

const ALL_OPTION = { id: 'all', label: 'All Books', icon: '📚', color: '' };

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[] | null>(null);
  const [searching, setSearching] = useState(false);
  const { isAdmin } = useAdmin();
  const { showToast } = useToast();

  // Load books from live Supabase
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await BooksService.getAll({ published: isAdmin ? undefined : true });
        setBooks(data);
      } catch (err) {
        console.error('Failed to load books:', err);
        showToast('Could not load books. Check your connection.', 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isAdmin]);

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults(null);
      return;
    }
    setSearching(true);
    try {
      const results = await BooksService.search(q);
      setSearchResults(results);
    } catch {
      // fallback to client-side filter on already-loaded books
      setSearchResults(
        books.filter(b =>
          b.title.toLowerCase().includes(q.toLowerCase()) ||
          b.author.toLowerCase().includes(q.toLowerCase()) ||
          b.description.toLowerCase().includes(q.toLowerCase())
        )
      );
    } finally {
      setSearching(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await BooksService.delete(id);
      setBooks(prev => prev.filter(b => b.id !== id));
      showToast('Book deleted successfully', 'success');
    } catch {
      showToast('Failed to delete book', 'error');
    }
  };

  const displayedBooks = searchResults !== null
    ? searchResults
    : activeCategory === 'all'
      ? books
      : books.filter(b => b.category === activeCategory);

  const categories = [ALL_OPTION, ...BOOK_CATEGORIES];

  return (
    <div className="min-h-screen bg-obsidian-950 pt-20">
      {/* ── Page Header ── */}
      <div className="bg-obsidian-900 border-b border-obsidian-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-full opacity-10 bg-gradient-to-l from-gold-500/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block font-inter font-semibold text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">
                Arris Library Collection
              </span>
              <h1 className="font-playfair font-black text-4xl md:text-5xl text-white mb-2">
                The <span className="text-gold-400">Library</span>
              </h1>
              <p className="font-inter text-obsidian-400 text-base">
                {books.length.toLocaleString()} books across {BOOK_CATEGORIES.length} disciplines
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-96">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search books, authors..."
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                className="w-full bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20 rounded-xl pl-11 pr-4 py-3 font-inter text-white text-sm placeholder:text-obsidian-500 focus:outline-none transition-all"
              />
              {searching && (
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {searchQuery && !searching && (
                <button
                  onClick={() => { setSearchQuery(''); setSearchResults(null); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-obsidian-400 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          {!searchQuery && (
            <div className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl font-inter font-semibold text-xs transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-gold-500/15 border border-gold-500/40 text-gold-300'
                      : 'bg-obsidian-800 border border-obsidian-700 text-obsidian-300 hover:border-gold-500/25 hover:text-gold-400'
                  }`}
                >
                  {'icon' in cat && cat.icon && <span>{cat.icon}</span>}
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Books Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {searchQuery && (
          <div className="mb-6 flex items-center gap-3">
            <span className="font-inter text-obsidian-300 text-sm">
              {searchResults?.length ?? 0} results for <span className="text-gold-400 font-semibold">"{searchQuery}"</span>
            </span>
            <button
              onClick={() => { setSearchQuery(''); setSearchResults(null); }}
              className="text-obsidian-500 hover:text-gold-400 font-inter text-xs border border-obsidian-700 hover:border-gold-500/30 px-3 py-1 rounded-lg transition-all"
            >
              Clear search
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-obsidian-900 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-obsidian-800" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-obsidian-700 rounded w-1/3" />
                  <div className="h-4 bg-obsidian-700 rounded w-5/6" />
                  <div className="h-3 bg-obsidian-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedBooks.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">📚</span>
            <h3 className="font-playfair font-bold text-white text-xl mb-2">No books found</h3>
            <p className="font-inter text-obsidian-400 text-sm">
              {searchQuery ? 'Try a different search term' : 'No books in this category yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={isAdmin ? () => {} : undefined}
                onDelete={isAdmin ? handleDelete : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ARRIS LIBRARY — Admin Panel Page
// ============================================================

import { useState, useEffect } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { useToast } from '../hooks/useToast';
import { BooksService, TrainingService, AnnouncementsService, ContactService } from '../lib/supabase';
import { BOOK_CATEGORIES, SAMPLE_BOOKS } from '../data/books';
import { TRAINING_CATEGORIES, SAMPLE_COURSES } from '../data/courses';
import type { Book, TrainingCourse, Announcement, ContactMessage, BookCategory, TrainingCategory, CourseLevel } from '../types';

type AdminTab = 'dashboard' | 'books' | 'courses' | 'announcements' | 'messages';

const EMPTY_BOOK: Omit<Book, 'id' | 'created_at' | 'updated_at'> = {
  title: '', author: '', category: 'mathematics', description: '',
  cover_color: 'from-blue-900 to-blue-700', is_featured: false, is_published: true,
};

const EMPTY_COURSE: Omit<TrainingCourse, 'id' | 'created_at' | 'updated_at'> = {
  title: '', instructor: '', category: 'tech_it', description: '',
  level: 'beginner', duration_hours: 10, modules: 5,
  is_featured: false, is_published: true, cover_color: 'from-cyan-900 to-sky-700',
};

const EMPTY_ANN: Omit<Announcement, 'id' | 'created_at' | 'updated_at'> = {
  title: '', content: '', is_published: true, is_pinned: false,
};

export default function AdminPage() {
  const { isAdmin } = useAdmin();
  const { showToast } = useToast();
  const [tab, setTab] = useState<AdminTab>('dashboard');

  // Books state
  const [books, setBooks] = useState<Book[]>([]);
  const [bookForm, setBookForm] = useState<Omit<Book, 'id' | 'created_at' | 'updated_at'>>(EMPTY_BOOK);
  const [editingBook, setEditingBook] = useState<string | null>(null);
  const [bookModal, setBookModal] = useState(false);

  // Courses state
  const [courses, setCourses] = useState<TrainingCourse[]>([]);
  const [courseForm, setCourseForm] = useState<Omit<TrainingCourse, 'id' | 'created_at' | 'updated_at'>>(EMPTY_COURSE);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [courseModal, setCourseModal] = useState(false);

  // Announcements
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [annForm, setAnnForm] = useState<Omit<Announcement, 'id' | 'created_at' | 'updated_at'>>(EMPTY_ANN);
  const [editingAnn, setEditingAnn] = useState<string | null>(null);

  // Messages
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Load data
  useEffect(() => {
    if (!isAdmin) return;
    loadAll();
  }, [isAdmin]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [bk, cs, an, msg] = await Promise.allSettled([
        BooksService.getAll(),
        TrainingService.getAll(),
        AnnouncementsService.getAll(),
        ContactService.getAll(),
      ]);
      if (bk.status === 'fulfilled' && bk.value.length > 0) setBooks(bk.value);
      else setBooks(SAMPLE_BOOKS.map((b, i) => ({ ...b, id: `s-${i}`, created_at: '', updated_at: '' }) as Book));
      if (cs.status === 'fulfilled' && cs.value.length > 0) setCourses(cs.value);
      else setCourses(SAMPLE_COURSES.map((c, i) => ({ ...c, id: `sc-${i}`, created_at: '', updated_at: '' }) as TrainingCourse));
      if (an.status === 'fulfilled') setAnnouncements(an.value);
      if (msg.status === 'fulfilled') setMessages(msg.value);
    } catch {
      /* non-critical */
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-obsidian-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-red-900/20 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h2 className="font-playfair font-bold text-2xl text-white mb-2">Access Denied</h2>
          <p className="font-inter text-obsidian-400 text-sm">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  // ── Book CRUD ──
  const saveBook = async () => {
    if (!bookForm.title || !bookForm.author) { showToast('Title and author are required', 'error'); return; }
    try {
      if (editingBook && !editingBook.startsWith('s-')) {
        const updated = await BooksService.update(editingBook, bookForm);
        setBooks(prev => prev.map(b => b.id === editingBook ? updated : b));
        showToast('Book updated', 'success');
      } else {
        const created = await BooksService.create(bookForm);
        setBooks(prev => [created, ...prev]);
        showToast('Book added', 'success');
      }
      setBookModal(false);
      setBookForm(EMPTY_BOOK);
      setEditingBook(null);
    } catch (err) {
      showToast('Failed to save book. Check Supabase connection.', 'error');
      console.error(err);
    }
  };

  const deleteBook = async (id: string) => {
    if (!confirm('Delete this book?')) return;
    try {
      if (!id.startsWith('s-')) await BooksService.delete(id);
      setBooks(prev => prev.filter(b => b.id !== id));
      showToast('Book deleted', 'success');
    } catch { showToast('Failed to delete', 'error'); }
  };

  // ── Course CRUD ──
  const saveCourse = async () => {
    if (!courseForm.title || !courseForm.instructor) { showToast('Title and instructor are required', 'error'); return; }
    try {
      if (editingCourse && !editingCourse.startsWith('sc-')) {
        const updated = await TrainingService.update(editingCourse, courseForm);
        setCourses(prev => prev.map(c => c.id === editingCourse ? updated : c));
        showToast('Course updated', 'success');
      } else {
        const created = await TrainingService.create(courseForm);
        setCourses(prev => [created, ...prev]);
        showToast('Course added', 'success');
      }
      setCourseModal(false);
      setCourseForm(EMPTY_COURSE);
      setEditingCourse(null);
    } catch { showToast('Failed to save course', 'error'); }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    try {
      if (!id.startsWith('sc-')) await TrainingService.delete(id);
      setCourses(prev => prev.filter(c => c.id !== id));
      showToast('Course deleted', 'success');
    } catch { showToast('Failed to delete', 'error'); }
  };

  // ── Announcement CRUD ──
  const saveAnn = async () => {
    if (!annForm.title || !annForm.content) { showToast('Title and content are required', 'error'); return; }
    try {
      if (editingAnn) {
        const updated = await AnnouncementsService.update(editingAnn, annForm);
        setAnnouncements(prev => prev.map(a => a.id === editingAnn ? updated : a));
        showToast('Announcement updated', 'success');
      } else {
        const created = await AnnouncementsService.create(annForm);
        setAnnouncements(prev => [created, ...prev]);
        showToast('Announcement posted', 'success');
      }
      setAnnForm(EMPTY_ANN);
      setEditingAnn(null);
    } catch { showToast('Failed to save announcement', 'error'); }
  };

  const deleteAnn = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    try {
      await AnnouncementsService.delete(id);
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      showToast('Announcement deleted', 'success');
    } catch { showToast('Failed to delete', 'error'); }
  };

  const markMessageRead = async (id: string) => {
    try {
      await ContactService.markRead(id);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    } catch { /* non-critical */ }
  };

  const TABS: { id: AdminTab; label: string; icon: string; count?: number }[] = [
    { id: 'dashboard',     label: 'Dashboard',     icon: '📊' },
    { id: 'books',         label: 'Books',         icon: '📚', count: books.length },
    { id: 'courses',       label: 'Courses',       icon: '🎓', count: courses.length },
    { id: 'announcements', label: 'Announcements', icon: '📢', count: announcements.length },
    { id: 'messages',      label: 'Messages',      icon: '✉️', count: messages.filter(m => !m.is_read).length },
  ];

  return (
    <div className="min-h-screen bg-obsidian-950 pt-20">
      {/* ── Admin Header ── */}
      <div className="bg-obsidian-900 border-b border-obsidian-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-playfair font-bold text-2xl text-white">Admin Panel</h1>
                <span className="px-2 py-0.5 rounded-lg bg-gold-500/15 border border-gold-500/30 text-gold-300 font-inter font-bold text-xs tracking-wider">ID: 202608</span>
              </div>
              <p className="font-inter text-obsidian-400 text-sm">Manage all library content, training courses, and communications</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-inter font-semibold text-sm transition-all ${
                  tab === t.id
                    ? 'bg-gold-500/15 border border-gold-500/40 text-gold-300'
                    : 'bg-obsidian-800 border border-obsidian-700 text-obsidian-300 hover:border-gold-500/25 hover:text-gold-400'
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
                {t.count !== undefined && t.count > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-bold min-w-[18px] text-center">
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ═══════════════════════ DASHBOARD ═══════════════════════ */}
        {tab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Books', value: books.length, icon: '📚', change: 'Library collection' },
                { label: 'Courses',     value: courses.length, icon: '🎓', change: 'Training programmes' },
                { label: 'Announcements', value: announcements.length, icon: '📢', change: 'Published notices' },
                { label: 'Messages',   value: messages.filter(m => !m.is_read).length, icon: '✉️', change: 'Unread inbox' },
              ].map(stat => (
                <div key={stat.label} className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className="font-inter text-obsidian-500 text-xs">{stat.change}</span>
                  </div>
                  <p className="font-playfair font-black text-3xl text-gold-400 mb-1">{stat.value}</p>
                  <p className="font-inter text-obsidian-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6">
                <h3 className="font-playfair font-bold text-white text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Add New Book', tab: 'books' as AdminTab, icon: '➕' },
                    { label: 'Create Course', tab: 'courses' as AdminTab, icon: '🎓' },
                    { label: 'Post Announcement', tab: 'announcements' as AdminTab, icon: '📢' },
                    { label: 'View Messages', tab: 'messages' as AdminTab, icon: '✉️' },
                  ].map(action => (
                    <button
                      key={action.label}
                      onClick={() => setTab(action.tab)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 border border-obsidian-700 hover:border-gold-500/30 text-left transition-all group"
                    >
                      <span>{action.icon}</span>
                      <span className="font-inter text-obsidian-200 group-hover:text-gold-300 text-sm font-medium transition-colors">{action.label}</span>
                      <svg className="w-4 h-4 text-obsidian-600 group-hover:text-gold-500 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6">
                <h3 className="font-playfair font-bold text-white text-lg mb-4">Recent Announcements</h3>
                {announcements.length === 0 ? (
                  <p className="font-inter text-obsidian-500 text-sm">No announcements yet.</p>
                ) : (
                  <div className="space-y-3">
                    {announcements.slice(0, 4).map(a => (
                      <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl bg-obsidian-800">
                        <span className="text-lg flex-shrink-0">{a.is_pinned ? '📌' : '📢'}</span>
                        <div className="min-w-0">
                          <p className="font-inter font-semibold text-white text-sm truncate">{a.title}</p>
                          <p className="font-inter text-obsidian-400 text-xs mt-0.5 line-clamp-2">{a.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════ BOOKS ═══════════════════════ */}
        {tab === 'books' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair font-bold text-2xl text-white">Books Management</h2>
              <button
                onClick={() => { setBookForm(EMPTY_BOOK); setEditingBook(null); setBookModal(true); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-obsidian-950 font-inter font-bold text-sm shadow-lg shadow-gold-500/20 hover:shadow-gold-400/40 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Book
              </button>
            </div>

            {loading ? <p className="text-obsidian-400 font-inter text-sm">Loading...</p> : (
              <div className="overflow-hidden rounded-2xl border border-obsidian-700">
                <table className="w-full text-left">
                  <thead className="bg-obsidian-800 border-b border-obsidian-700">
                    <tr>
                      {['Title', 'Author', 'Category', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 font-inter font-semibold text-obsidian-300 text-xs uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-obsidian-800">
                    {books.map(book => (
                      <tr key={book.id} className="bg-obsidian-900 hover:bg-obsidian-800/60 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-inter font-semibold text-white text-sm">{book.title}</p>
                            {book.is_featured && <span className="text-gold-400 text-[10px] font-inter">✦ Featured</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-inter text-obsidian-300 text-sm">{book.author}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-lg bg-obsidian-800 border border-obsidian-700 font-inter text-obsidian-300 text-xs capitalize">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-inter font-semibold ${
                            book.is_published
                              ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40'
                              : 'bg-red-900/40 text-red-300 border border-red-700/40'
                          }`}>
                            {book.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setBookForm({ title: book.title, author: book.author, category: book.category, description: book.description, cover_color: book.cover_color, is_featured: book.is_featured, is_published: book.is_published }); setEditingBook(book.id); setBookModal(true); }}
                              className="px-3 py-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/20 text-gold-400 font-inter text-xs font-semibold transition-all"
                            >Edit</button>
                            <button
                              onClick={() => deleteBook(book.id)}
                              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-inter text-xs font-semibold transition-all"
                            >Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {books.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="font-inter text-obsidian-500 text-sm">No books yet. Add the first one!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════ COURSES ═══════════════════════ */}
        {tab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair font-bold text-2xl text-white">Courses Management</h2>
              <button
                onClick={() => { setCourseForm(EMPTY_COURSE); setEditingCourse(null); setCourseModal(true); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-obsidian-950 font-inter font-bold text-sm shadow-lg shadow-gold-500/20 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Course
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-obsidian-700">
              <table className="w-full text-left">
                <thead className="bg-obsidian-800 border-b border-obsidian-700">
                  <tr>
                    {['Title', 'Instructor', 'Category', 'Level', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 font-inter font-semibold text-obsidian-300 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-obsidian-800">
                  {courses.map(c => (
                    <tr key={c.id} className="bg-obsidian-900 hover:bg-obsidian-800/60 transition-colors">
                      <td className="px-4 py-3 font-inter font-semibold text-white text-sm max-w-xs">
                        <p className="truncate">{c.title}</p>
                        {c.is_featured && <span className="text-gold-400 text-[10px]">✦ Featured</span>}
                      </td>
                      <td className="px-4 py-3 font-inter text-obsidian-300 text-sm">{c.instructor}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-lg bg-obsidian-800 border border-obsidian-700 font-inter text-obsidian-300 text-xs capitalize">
                          {c.category.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-inter text-obsidian-300 text-xs capitalize">{c.level}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-inter font-semibold ${c.is_published ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40' : 'bg-red-900/40 text-red-300 border border-red-700/40'}`}>
                          {c.is_published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => { setCourseForm({ title: c.title, instructor: c.instructor, category: c.category, description: c.description, level: c.level, duration_hours: c.duration_hours, modules: c.modules, is_featured: c.is_featured, is_published: c.is_published, cover_color: c.cover_color }); setEditingCourse(c.id); setCourseModal(true); }}
                            className="px-3 py-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/20 text-gold-400 font-inter text-xs font-semibold transition-all">Edit</button>
                          <button onClick={() => deleteCourse(c.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-inter text-xs font-semibold transition-all">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {courses.length === 0 && (
                <div className="py-12 text-center">
                  <p className="font-inter text-obsidian-500 text-sm">No courses yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════ ANNOUNCEMENTS ═══════════════════════ */}
        {tab === 'announcements' && (
          <div>
            <h2 className="font-playfair font-bold text-2xl text-white mb-6">Announcements</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6">
                <h3 className="font-playfair font-bold text-white text-lg mb-4">
                  {editingAnn ? 'Edit Announcement' : 'New Announcement'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-inter font-semibold text-xs text-gold-400 uppercase tracking-wider mb-1.5">Title *</label>
                    <input type="text" value={annForm.title} onChange={e => setAnnForm(p => ({ ...p, title: e.target.value }))}
                      className="w-full bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20 rounded-xl px-4 py-3 font-inter text-white text-sm focus:outline-none transition-all" placeholder="Announcement title" />
                  </div>
                  <div>
                    <label className="block font-inter font-semibold text-xs text-gold-400 uppercase tracking-wider mb-1.5">Content *</label>
                    <textarea value={annForm.content} onChange={e => setAnnForm(p => ({ ...p, content: e.target.value }))} rows={4}
                      className="w-full bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20 rounded-xl px-4 py-3 font-inter text-white text-sm focus:outline-none transition-all resize-none" placeholder="Announcement content..." />
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={annForm.is_published} onChange={e => setAnnForm(p => ({ ...p, is_published: e.target.checked }))}
                        className="w-4 h-4 accent-gold-400" />
                      <span className="font-inter text-obsidian-200 text-sm">Published</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={annForm.is_pinned} onChange={e => setAnnForm(p => ({ ...p, is_pinned: e.target.checked }))}
                        className="w-4 h-4 accent-gold-400" />
                      <span className="font-inter text-obsidian-200 text-sm">Pin to top</span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={saveAnn}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-obsidian-950 font-inter font-bold text-sm shadow-lg shadow-gold-500/20 transition-all">
                      {editingAnn ? 'Update' : 'Post Announcement'}
                    </button>
                    {editingAnn && (
                      <button onClick={() => { setAnnForm(EMPTY_ANN); setEditingAnn(null); }}
                        className="px-4 py-3 rounded-xl bg-obsidian-800 border border-obsidian-700 text-obsidian-300 font-inter font-semibold text-sm">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* List */}
              <div>
                <h3 className="font-playfair font-bold text-white text-lg mb-4">All Announcements ({announcements.length})</h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {announcements.length === 0 ? (
                    <p className="font-inter text-obsidian-500 text-sm">No announcements yet.</p>
                  ) : announcements.map(a => (
                    <div key={a.id} className="p-4 rounded-xl bg-obsidian-900 border border-obsidian-700 hover:border-gold-500/20 transition-all">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {a.is_pinned && <span className="text-sm">📌</span>}
                          <span className="font-inter font-semibold text-white text-sm">{a.title}</span>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => { setAnnForm({ title: a.title, content: a.content, is_published: a.is_published, is_pinned: a.is_pinned }); setEditingAnn(a.id); }}
                            className="text-gold-400 hover:text-gold-300 font-inter text-xs border border-gold-500/20 px-2 py-1 rounded-lg transition-colors">Edit</button>
                          <button onClick={() => deleteAnn(a.id)}
                            className="text-red-400 hover:text-red-300 font-inter text-xs border border-red-500/20 px-2 py-1 rounded-lg transition-colors">Del</button>
                        </div>
                      </div>
                      <p className="font-inter text-obsidian-400 text-xs leading-relaxed line-clamp-2">{a.content}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-[10px] font-inter font-semibold px-2 py-0.5 rounded-full ${a.is_published ? 'text-emerald-300 bg-emerald-900/30' : 'text-red-300 bg-red-900/30'}`}>
                          {a.is_published ? 'Live' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════ MESSAGES ═══════════════════════ */}
        {tab === 'messages' && (
          <div>
            <h2 className="font-playfair font-bold text-2xl text-white mb-6">
              Inbox <span className="text-gold-400 text-lg">({messages.filter(m => !m.is_read).length} unread)</span>
            </h2>
            {messages.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-5xl mb-4 block">✉️</span>
                <p className="font-inter text-obsidian-400 text-sm">No messages yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(m => (
                  <div key={m.id} className={`p-5 rounded-2xl border transition-all ${m.is_read ? 'bg-obsidian-900 border-obsidian-700' : 'bg-obsidian-900 border-gold-500/25 shadow-lg shadow-gold-500/5'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {!m.is_read && <span className="w-2 h-2 rounded-full bg-gold-400 flex-shrink-0" />}
                          <p className="font-inter font-bold text-white text-sm">{m.name}</p>
                          <span className="font-inter text-obsidian-500 text-xs">&lt;{m.email}&gt;</span>
                        </div>
                        <p className="font-inter font-semibold text-gold-300 text-sm mb-2">{m.subject}</p>
                        <p className="font-inter text-obsidian-300 text-sm leading-relaxed">{m.message}</p>
                        <p className="font-inter text-obsidian-600 text-xs mt-2">
                          {new Date(m.created_at).toLocaleString()}
                        </p>
                      </div>
                      {!m.is_read && (
                        <button onClick={() => markMessageRead(m.id)}
                          className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/20 text-gold-400 font-inter text-xs font-semibold transition-all">
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ Book Modal ═══ */}
      {bookModal && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-md" onClick={() => setBookModal(false)} />
          <div className="relative bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair font-bold text-white text-xl">{editingBook ? 'Edit Book' : 'Add New Book'}</h3>
              <button onClick={() => setBookModal(false)} className="text-obsidian-400 hover:text-white p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              {([['Title *', 'title', 'text', 'Book title'], ['Author *', 'author', 'text', 'Author name'], ['ISBN', 'isbn', 'text', 'ISBN number'], ['Pages', 'pages', 'number', '0'], ['Year', 'year', 'number', '2024']] as [string, keyof typeof bookForm, string, string][]).map(([label, field, type, placeholder]) => (
                <div key={field}>
                  <label className="block font-inter font-semibold text-xs text-gold-400 uppercase tracking-wider mb-1.5">{label}</label>
                  <input type={type} value={(bookForm[field] as string | number) ?? ''} onChange={e => setBookForm(p => ({ ...p, [field]: type === 'number' ? Number(e.target.value) : e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20 rounded-xl px-4 py-2.5 font-inter text-white text-sm focus:outline-none transition-all" />
                </div>
              ))}
              <div>
                <label className="block font-inter font-semibold text-xs text-gold-400 uppercase tracking-wider mb-1.5">Category</label>
                <select value={bookForm.category} onChange={e => setBookForm(p => ({ ...p, category: e.target.value as BookCategory }))}
                  className="w-full bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/60 rounded-xl px-4 py-2.5 font-inter text-white text-sm focus:outline-none transition-all">
                  {BOOK_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-inter font-semibold text-xs text-gold-400 uppercase tracking-wider mb-1.5">Description</label>
                <textarea value={bookForm.description} onChange={e => setBookForm(p => ({ ...p, description: e.target.value }))} rows={3}
                  className="w-full bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/60 rounded-xl px-4 py-2.5 font-inter text-white text-sm focus:outline-none transition-all resize-none" placeholder="Book description..." />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={bookForm.is_featured} onChange={e => setBookForm(p => ({ ...p, is_featured: e.target.checked }))} className="w-4 h-4 accent-gold-400" />
                  <span className="font-inter text-obsidian-200 text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={bookForm.is_published} onChange={e => setBookForm(p => ({ ...p, is_published: e.target.checked }))} className="w-4 h-4 accent-gold-400" />
                  <span className="font-inter text-obsidian-200 text-sm">Published</span>
                </label>
              </div>
              <button onClick={saveBook}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-obsidian-950 font-inter font-bold text-sm shadow-lg shadow-gold-500/20 transition-all">
                {editingBook ? 'Update Book' : 'Add Book'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Course Modal ═══ */}
      {courseModal && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-md" onClick={() => setCourseModal(false)} />
          <div className="relative bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair font-bold text-white text-xl">{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
              <button onClick={() => setCourseModal(false)} className="text-obsidian-400 hover:text-white p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              {([['Title *', 'title', 'text', 'Course title'], ['Instructor *', 'instructor', 'text', 'Instructor name'], ['Duration (hours)', 'duration_hours', 'number', '10'], ['Modules', 'modules', 'number', '5']] as [string, keyof typeof courseForm, string, string][]).map(([label, field, type, placeholder]) => (
                <div key={field}>
                  <label className="block font-inter font-semibold text-xs text-gold-400 uppercase tracking-wider mb-1.5">{label}</label>
                  <input type={type} value={(courseForm[field] as string | number) ?? ''} onChange={e => setCourseForm(p => ({ ...p, [field]: type === 'number' ? Number(e.target.value) : e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20 rounded-xl px-4 py-2.5 font-inter text-white text-sm focus:outline-none transition-all" />
                </div>
              ))}
              <div>
                <label className="block font-inter font-semibold text-xs text-gold-400 uppercase tracking-wider mb-1.5">Category</label>
                <select value={courseForm.category} onChange={e => setCourseForm(p => ({ ...p, category: e.target.value as TrainingCategory }))}
                  className="w-full bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/60 rounded-xl px-4 py-2.5 font-inter text-white text-sm focus:outline-none">
                  {TRAINING_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-inter font-semibold text-xs text-gold-400 uppercase tracking-wider mb-1.5">Level</label>
                <select value={courseForm.level} onChange={e => setCourseForm(p => ({ ...p, level: e.target.value as CourseLevel }))}
                  className="w-full bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/60 rounded-xl px-4 py-2.5 font-inter text-white text-sm focus:outline-none">
                  {['beginner', 'intermediate', 'advanced', 'expert'].map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-inter font-semibold text-xs text-gold-400 uppercase tracking-wider mb-1.5">Description</label>
                <textarea value={courseForm.description} onChange={e => setCourseForm(p => ({ ...p, description: e.target.value }))} rows={3}
                  className="w-full bg-obsidian-800 border border-obsidian-700 focus:border-gold-500/60 rounded-xl px-4 py-2.5 font-inter text-white text-sm focus:outline-none resize-none" placeholder="Course description..." />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={courseForm.is_featured} onChange={e => setCourseForm(p => ({ ...p, is_featured: e.target.checked }))} className="w-4 h-4 accent-gold-400" />
                  <span className="font-inter text-obsidian-200 text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={courseForm.is_published} onChange={e => setCourseForm(p => ({ ...p, is_published: e.target.checked }))} className="w-4 h-4 accent-gold-400" />
                  <span className="font-inter text-obsidian-200 text-sm">Published</span>
                </label>
              </div>
              <button onClick={saveCourse}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-obsidian-950 font-inter font-bold text-sm shadow-lg shadow-gold-500/20">
                {editingCourse ? 'Update Course' : 'Add Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

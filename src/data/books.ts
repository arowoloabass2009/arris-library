// ============================================================
// ARRIS LIBRARY — Books Catalogue Data
// ============================================================

import type { Book } from '../types';

export const BOOK_CATEGORIES = [
  { id: 'mathematics',  label: 'Mathematics',     icon: '∑', color: 'from-blue-900 to-blue-700' },
  { id: 'physics',      label: 'Physics',          icon: '⚛', color: 'from-purple-900 to-purple-700' },
  { id: 'chemistry',    label: 'Chemistry',        icon: '⚗', color: 'from-green-900 to-green-700' },
  { id: 'biology',      label: 'Biology',          icon: '🧬', color: 'from-emerald-900 to-emerald-700' },
  { id: 'medicine',     label: 'Medicine',         icon: '🩺', color: 'from-red-900 to-red-700' },
  { id: 'history',      label: 'History',          icon: '📜', color: 'from-amber-900 to-amber-700' },
  { id: 'business',     label: 'Business',         icon: '📊', color: 'from-yellow-900 to-yellow-700' },
  { id: 'it',           label: 'Information Tech', icon: '💻', color: 'from-cyan-900 to-cyan-700' },
  { id: 'motivational', label: 'Motivational',     icon: '🌟', color: 'from-orange-900 to-orange-700' },
  { id: 'literature',   label: 'Literature',       icon: '📖', color: 'from-rose-900 to-rose-700' },
  { id: 'science',      label: 'Science',          icon: '🔬', color: 'from-teal-900 to-teal-700' },
  { id: 'engineering',  label: 'Engineering',      icon: '⚙', color: 'from-slate-900 to-slate-700' },
  { id: 'economics',    label: 'Economics',        icon: '📈', color: 'from-lime-900 to-lime-700' },
  { id: 'philosophy',   label: 'Philosophy',       icon: '🏛', color: 'from-violet-900 to-violet-700' },
  { id: 'psychology',   label: 'Psychology',       icon: '🧠', color: 'from-pink-900 to-pink-700' },
] as const;

export const SAMPLE_BOOKS: Partial<Book>[] = [
  // Mathematics
  { title: 'Principles of Mathematical Analysis', author: 'Walter Rudin', category: 'mathematics', description: 'The gold standard of mathematical analysis texts used in universities worldwide. Covers real and complex number systems, metric spaces, and continuity.', cover_color: 'from-blue-900 to-indigo-800', is_featured: true, is_published: true, pages: 342, year: 1976, rating: 4.9 },
  { title: 'Introduction to Linear Algebra', author: 'Gilbert Strang', category: 'mathematics', description: 'A comprehensive introduction to linear algebra, covering vectors, matrices, determinants, eigenvalues, and their applications in engineering and science.', cover_color: 'from-blue-800 to-blue-600', is_featured: false, is_published: true, pages: 584, year: 2016, rating: 4.8 },
  { title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'mathematics', description: 'The most widely used calculus textbook. From limits and derivatives to integration and infinite series, mastering the language of change.', cover_color: 'from-indigo-900 to-blue-800', is_featured: false, is_published: true, pages: 1368, year: 2015 },

  // Physics
  { title: 'The Feynman Lectures on Physics', author: 'Richard P. Feynman', category: 'physics', description: 'Nobel laureate Richard Feynman\'s legendary lecture series. The most iconic physics educational resource ever created, covering mechanics, radiation, and quantum physics.', cover_color: 'from-purple-900 to-violet-700', is_featured: true, is_published: true, pages: 1552, year: 1964, rating: 5.0 },
  { title: 'University Physics with Modern Physics', author: 'Young & Freedman', category: 'physics', description: 'A comprehensive physics textbook combining classical mechanics, thermodynamics, electromagnetism, optics, and modern physics.', cover_color: 'from-violet-900 to-purple-700', is_featured: false, is_published: true, pages: 1600, year: 2019 },

  // Chemistry
  { title: 'Organic Chemistry', author: 'Paula Yurkanis Bruice', category: 'chemistry', description: 'Master organic chemistry from functional groups to reaction mechanisms. An essential resource for pre-med and chemistry students.', cover_color: 'from-green-900 to-teal-800', is_featured: true, is_published: true, pages: 1344, year: 2016, rating: 4.7 },
  { title: 'Physical Chemistry', author: 'Peter Atkins', category: 'chemistry', description: 'Bridging chemistry, physics, and mathematics. Covers thermodynamics, quantum mechanics, spectroscopy, and statistical thermodynamics.', cover_color: 'from-teal-900 to-green-700', is_featured: false, is_published: true, pages: 1028, year: 2018 },

  // Biology
  { title: 'Campbell Biology', author: 'Jane B. Reece et al.', category: 'biology', description: 'The definitive resource for biology education. From cells to ecosystems, this comprehensive text is the gold standard in biological sciences.', cover_color: 'from-emerald-900 to-green-700', is_featured: true, is_published: true, pages: 1488, year: 2020, rating: 4.9 },
  { title: 'Molecular Biology of the Cell', author: 'Alberts et al.', category: 'biology', description: 'The leading advanced cell biology textbook used by universities worldwide. Essential reading for understanding life at the molecular level.', cover_color: 'from-green-800 to-emerald-600', is_featured: false, is_published: true, pages: 1342, year: 2017 },

  // Medicine
  { title: "Gray's Anatomy", author: 'Henry Gray', category: 'medicine', description: 'The most famous anatomy textbook in existence. Over 150 years of medical education excellence. An indispensable reference for medical students and professionals.', cover_color: 'from-red-900 to-rose-800', is_featured: true, is_published: true, pages: 1576, year: 2016, rating: 4.9 },
  { title: 'Harrison\'s Principles of Internal Medicine', author: 'Kasper et al.', category: 'medicine', description: 'The definitive guide to internal medicine. Comprehensive coverage of diseases, diagnostics, and treatments used by clinicians globally.', cover_color: 'from-rose-900 to-red-700', is_featured: false, is_published: true, pages: 4012, year: 2018 },

  // History
  { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', category: 'history', description: 'A riveting journey through 100,000 years of human history. From the Stone Age to the modern era, Harari explores what made Homo sapiens the dominant species.', cover_color: 'from-amber-900 to-yellow-800', is_featured: true, is_published: true, pages: 443, year: 2011, rating: 4.8 },
  { title: 'The Guns of August', author: 'Barbara Tuchman', category: 'history', description: 'The Pulitzer Prize-winning account of the first month of World War I. A masterpiece of narrative history that reads like a thriller.', cover_color: 'from-amber-800 to-orange-700', is_featured: false, is_published: true, pages: 511, year: 1962 },

  // Business
  { title: 'The Lean Startup', author: 'Eric Ries', category: 'business', description: 'How modern entrepreneurs use continuous innovation to create successful businesses. A methodology that has transformed how companies are built and products are launched.', cover_color: 'from-yellow-900 to-amber-700', is_featured: true, is_published: true, pages: 336, year: 2011, rating: 4.7 },
  { title: 'Good to Great', author: 'Jim Collins', category: 'business', description: 'A landmark study of 28 companies over 30 years. Collins identifies the specific disciplines that transform good companies into truly great ones.', cover_color: 'from-amber-900 to-yellow-700', is_featured: false, is_published: true, pages: 320, year: 2001, rating: 4.6 },
  { title: 'Zero to One', author: 'Peter Thiel', category: 'business', description: 'Notes on startups, or how to build the future. Thiel argues that true innovation creates monopolies and shares lessons from building PayPal and Palantir.', cover_color: 'from-yellow-800 to-amber-600', is_featured: false, is_published: true, pages: 224, year: 2014 },

  // IT
  { title: 'Clean Code', author: 'Robert C. Martin', category: 'it', description: 'A handbook of agile software craftsmanship. Learn to write code that is readable, maintainable, and elegant. Required reading for every professional developer.', cover_color: 'from-cyan-900 to-sky-700', is_featured: true, is_published: true, pages: 464, year: 2008, rating: 4.8 },
  { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', category: 'it', description: 'From journeyman to master. The timeless guide to software development that has transformed how developers think about code, careers, and craft.', cover_color: 'from-sky-900 to-blue-700', is_featured: false, is_published: true, pages: 352, year: 2019, rating: 4.9 },
  { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', category: 'it', description: 'The best guide to building reliable, scalable, and maintainable systems. Covers databases, distributed systems, and data processing pipelines.', cover_color: 'from-teal-900 to-cyan-700', is_featured: true, is_published: true, pages: 611, year: 2017, rating: 4.9 },

  // Motivational
  { title: 'Think and Grow Rich', author: 'Napoleon Hill', category: 'motivational', description: 'The all-time bestseller on success and wealth. Based on interviews with 500 of the most successful people of the early 20th century. Timeless wisdom on achievement.', cover_color: 'from-orange-900 to-amber-700', is_featured: true, is_published: true, pages: 238, year: 1937, rating: 4.7 },
  { title: 'Atomic Habits', author: 'James Clear', category: 'motivational', description: 'An easy and proven way to build good habits and break bad ones. The most comprehensive guide on how tiny changes can produce remarkable results.', cover_color: 'from-orange-800 to-red-700', is_featured: true, is_published: true, pages: 320, year: 2018, rating: 4.9 },
  { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', category: 'motivational', description: 'One of the most influential books ever written. A principle-centered approach to both personal and interpersonal effectiveness.', cover_color: 'from-amber-800 to-orange-600', is_featured: false, is_published: true, pages: 432, year: 1989, rating: 4.7 },

  // Engineering
  { title: 'Fundamentals of Engineering Thermodynamics', author: 'Moran & Shapiro', category: 'engineering', description: 'The definitive engineering thermodynamics textbook. Rigorous treatment of the fundamentals with extensive engineering applications.', cover_color: 'from-slate-900 to-gray-700', is_featured: false, is_published: true, pages: 936, year: 2018 },

  // Economics
  { title: 'Freakonomics', author: 'Levitt & Dubner', category: 'economics', description: 'A rogue economist explores the hidden side of everything. Applies economic thinking to unconventional topics, revealing surprising truths about the world.', cover_color: 'from-lime-900 to-green-700', is_featured: false, is_published: true, pages: 336, year: 2005, rating: 4.5 },

  // Psychology
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'psychology', description: 'Nobel laureate Kahneman\'s masterpiece on the two systems that drive the way we think. A transformative exploration of human judgment and decision-making.', cover_color: 'from-pink-900 to-rose-700', is_featured: true, is_published: true, pages: 499, year: 2011, rating: 4.8 },
];

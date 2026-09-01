// ============================================================
// ARRIS LIBRARY — Training Schools Page
// ============================================================

import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { TrainingService } from '../lib/supabase';
import { TRAINING_CATEGORIES } from '../data/courses';
import { useAdmin } from '../hooks/useAdmin';
import { useToast } from '../hooks/useToast';
import type { TrainingCourse } from '../types';

const LEVEL_OPTIONS = [
  { id: 'all',          label: 'All Levels' },
  { id: 'beginner',     label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced',     label: 'Advanced' },
  { id: 'expert',       label: 'Expert' },
];

export default function TrainingPage() {
  const [courses, setCourses] = useState<TrainingCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const { isAdmin } = useAdmin();
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await TrainingService.getAll({ published: isAdmin ? undefined : true });
        setCourses(data);
      } catch (err) {
        console.error('Failed to load courses:', err);
        showToast('Could not load courses. Check your connection.', 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isAdmin]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await TrainingService.delete(id);
      setCourses(prev => prev.filter(c => c.id !== id));
      showToast('Course deleted', 'success');
    } catch {
      showToast('Failed to delete course', 'error');
    }
  };

  const displayed = courses.filter(c => {
    const catMatch = activeCategory === 'all' || c.category === activeCategory;
    const lvlMatch = activeLevel === 'all' || c.level === activeLevel;
    return catMatch && lvlMatch;
  });

  const totalEnrolled = courses.reduce((s, c) => s + (c.enrollment_count || 0), 0);
  const totalHours = courses.reduce((s, c) => s + (c.duration_hours || 0), 0);

  return (
    <div className="min-h-screen bg-obsidian-950 pt-20">
      {/* ── Hero Header ── */}
      <div className="relative bg-obsidian-900 border-b border-obsidian-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
          <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-gold-500/4 blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <span className="inline-block font-inter font-semibold text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">Professional Development</span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h1 className="font-playfair font-black text-4xl md:text-5xl text-white mb-3">
                Training <span className="text-gold-400">Schools</span>
              </h1>
              <p className="font-inter text-obsidian-400 text-base max-w-2xl">
                Industry-led, practical programmes designed by experts. From software engineering to AI & Robotics,
                Cybersecurity to Business Strategy — develop skills that matter.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              {[
                { value: courses.length, label: 'Courses' },
                { value: `${totalHours.toLocaleString()}h`, label: 'Content' },
                { value: `${(totalEnrolled / 1000).toFixed(0)}k+`, label: 'Enrolled' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-playfair font-black text-2xl text-gold-400">{s.value}</p>
                  <p className="font-inter text-obsidian-500 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-inter font-semibold text-xs transition-all ${
                activeCategory === 'all'
                  ? 'bg-gold-500/15 border border-gold-500/40 text-gold-300'
                  : 'bg-obsidian-800 border border-obsidian-700 text-obsidian-300 hover:border-gold-500/25 hover:text-gold-400'
              }`}
            >
              All Schools
            </button>
            {TRAINING_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl font-inter font-semibold text-xs transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gold-500/15 border border-gold-500/40 text-gold-300'
                    : 'bg-obsidian-800 border border-obsidian-700 text-obsidian-300 hover:border-gold-500/25 hover:text-gold-400'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Level filter */}
          <div className="mt-3 flex gap-2">
            {LEVEL_OPTIONS.map(l => (
              <button
                key={l.id}
                onClick={() => setActiveLevel(l.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg font-inter font-medium text-xs transition-all ${
                  activeLevel === l.id
                    ? 'bg-obsidian-700 text-gold-300 border border-gold-500/30'
                    : 'text-obsidian-500 hover:text-obsidian-300 border border-transparent'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Courses Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="font-inter text-obsidian-400 text-sm">
            Showing <span className="text-gold-400 font-semibold">{displayed.length}</span> courses
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-obsidian-900 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-40 bg-obsidian-800" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-obsidian-700 rounded w-5/6" />
                  <div className="h-3 bg-obsidian-700 rounded w-1/2" />
                  <div className="h-16 bg-obsidian-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🎓</span>
            <h3 className="font-playfair font-bold text-white text-xl mb-2">No courses found</h3>
            <p className="font-inter text-obsidian-400 text-sm">Try a different category or level filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayed.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={isAdmin ? () => {} : undefined}
                onDelete={isAdmin ? handleDelete : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── School Intro Banner ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-obsidian-800 to-obsidian-900 border border-gold-500/15 p-8 md:p-12">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-gold-500/5 blur-[60px]" />
          </div>
          <div className="relative max-w-2xl">
            <span className="inline-block font-inter font-semibold text-gold-400 text-xs tracking-[0.25em] uppercase mb-4">Our Approach</span>
            <h3 className="font-playfair font-black text-3xl text-white mb-4">
              Learn by <span className="text-gold-400">Doing</span>
            </h3>
            <p className="font-inter text-obsidian-300 text-base leading-relaxed mb-6">
              Every training programme at Arris Library is built around practical, hands-on learning.
              Our instructors are industry practitioners — not just academics — who bring real-world
              experience into every module. From coding labs to business simulations and AI project
              deployments, you build real skills from day one.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: '🎯', text: 'Project-Based' },
                { icon: '👨‍🏫', text: 'Expert Instructors' },
                { icon: '🏆', text: 'Certificates' },
                { icon: '🌍', text: 'Global Standards' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-inter text-obsidian-200 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

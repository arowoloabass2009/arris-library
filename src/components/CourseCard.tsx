// ============================================================
// ARRIS LIBRARY — Training Course Card Component
// ============================================================

import type { TrainingCourse } from '../types';
import { TRAINING_CATEGORIES } from '../data/courses';
import { useAdmin } from '../hooks/useAdmin';

interface CourseCardProps {
  course: TrainingCourse;
  onEdit?: (course: TrainingCourse) => void;
  onDelete?: (id: string) => void;
}

const LEVEL_STYLES: Record<string, string> = {
  beginner:     'bg-emerald-900/50 border-emerald-600/30 text-emerald-300',
  intermediate: 'bg-blue-900/50 border-blue-600/30 text-blue-300',
  advanced:     'bg-purple-900/50 border-purple-600/30 text-purple-300',
  expert:       'bg-gold-900/50 border-gold-500/30 text-gold-300',
};

export default function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  const { isAdmin } = useAdmin();
  const cat = TRAINING_CATEGORIES.find(c => c.id === course.category);

  return (
    <article className="group relative bg-obsidian-900 border border-obsidian-700 hover:border-gold-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/10 flex flex-col">

      {/* ── Course Header ── */}
      <div className={`relative h-40 bg-gradient-to-br ${course.cover_color || 'from-obsidian-800 to-obsidian-700'} flex items-center justify-center p-5`}>
        <div className="text-center">
          <span className="text-5xl block mb-2">{cat?.icon || '🎓'}</span>
          <p className="font-inter text-white/70 text-xs font-medium tracking-wider uppercase">{cat?.label || course.category}</p>
        </div>

        {/* Featured badge */}
        {course.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-inter font-semibold text-[10px] tracking-wider uppercase">
              ✦ Featured
            </span>
          </div>
        )}

        {/* Level badge */}
        <div className="absolute bottom-3 left-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border font-inter font-semibold text-[10px] tracking-wider uppercase ${LEVEL_STYLES[course.level] || LEVEL_STYLES.beginner}`}>
            {course.level}
          </span>
        </div>

        {/* Draft badge */}
        {!course.is_published && isAdmin && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-900/60 border border-red-500/40 text-red-300 font-inter font-semibold text-[10px] uppercase tracking-wider">
              Draft
            </span>
          </div>
        )}
      </div>

      {/* ── Course Info ── */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-playfair font-bold text-white text-base leading-snug mb-1 line-clamp-2 group-hover:text-gold-200 transition-colors">
          {course.title}
        </h3>
        <p className="font-inter text-gold-500/80 text-xs font-medium mb-2">
          by {course.instructor}
        </p>

        <p className="font-inter text-obsidian-400 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {course.description}
        </p>

        {/* Meta */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex flex-col items-center bg-obsidian-800/60 rounded-lg py-2">
            <span className="font-playfair font-bold text-gold-400 text-sm">{course.duration_hours}h</span>
            <span className="font-inter text-obsidian-500 text-[10px] mt-0.5">Duration</span>
          </div>
          <div className="flex flex-col items-center bg-obsidian-800/60 rounded-lg py-2">
            <span className="font-playfair font-bold text-gold-400 text-sm">{course.modules}</span>
            <span className="font-inter text-obsidian-500 text-[10px] mt-0.5">Modules</span>
          </div>
          <div className="flex flex-col items-center bg-obsidian-800/60 rounded-lg py-2">
            <span className="font-playfair font-bold text-gold-400 text-sm">
              {course.enrollment_count ? `${(course.enrollment_count / 1000).toFixed(1)}k` : 'New'}
            </span>
            <span className="font-inter text-obsidian-500 text-[10px] mt-0.5">Enrolled</span>
          </div>
        </div>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {course.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-obsidian-800 border border-obsidian-700 text-obsidian-300 font-inter text-[10px]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Enroll button */}
        <button className="w-full mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-400/50 text-gold-300 font-inter font-semibold text-sm transition-all duration-200 group-hover:text-gold-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Enroll Now
        </button>

        {/* Admin Actions */}
        {isAdmin && (onEdit || onDelete) && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-obsidian-700">
            {onEdit && (
              <button
                onClick={() => onEdit(course)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/20 text-gold-400 font-inter font-semibold text-xs transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(course.id)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-inter font-semibold text-xs transition-all"
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

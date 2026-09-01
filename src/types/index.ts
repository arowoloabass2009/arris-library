// ============================================================
// ARRIS LIBRARY — Core TypeScript Types
// ============================================================

export type BookCategory =
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'medicine'
  | 'history'
  | 'business'
  | 'it'
  | 'motivational'
  | 'literature'
  | 'science'
  | 'engineering'
  | 'economics'
  | 'philosophy'
  | 'psychology';

export type TrainingCategory =
  | 'tech_it'
  | 'soft_skills'
  | 'business'
  | 'critical_thinking'
  | 'ai_robotics'
  | 'cybersecurity'
  | 'cloud'
  | 'data_science';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  description: string;
  cover_color: string;
  pages?: number;
  year?: number;
  isbn?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
  content_url?: string;
  download_url?: string;
  rating?: number;
  downloads?: number;
}

export interface TrainingCourse {
  id: string;
  title: string;
  instructor: string;
  category: TrainingCategory;
  description: string;
  level: CourseLevel;
  duration_hours: number;
  modules: number;
  is_featured: boolean;
  is_published: boolean;
  cover_color: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  enrollment_count?: number;
  rating?: number;
  tags?: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface DeviceSession {
  device_id: string;
  device_type: 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'unknown';
  browser: string;
  os: string;
  first_visit: string;
  last_visit: string;
  visit_count: number;
  is_admin: boolean;
}

export interface AdminSession {
  is_admin: boolean;
  admin_id: string;
  authenticated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

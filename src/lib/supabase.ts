// ============================================================
// ARRIS LIBRARY — Supabase Client
// Project: vpfjwievtbbgepwlogls.supabase.co
// ============================================================

import { createClient } from '@supabase/supabase-js';
import type { Book, TrainingCourse, Announcement, ContactMessage } from '../types';

const SUPABASE_URL = 'https://vpfjwievtbbgepwlogls.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZmp3aWV2dGJiZ2Vwd2xvZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MDM2ODgsImV4cCI6MjEwMzQ3OTY4OH0.EPb_lipPD1baaQM9VgEYzXDbh3AIIH7_9TQX10hGcvI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, storageKey: 'arris_library_vpfjwievtbbgepwlogls' },
});

// ─────────────────── Books Service ───────────────────
export const BooksService = {
  async getAll(filters?: { category?: string; featured?: boolean; published?: boolean }) {
    let q = supabase.from('books').select('*').order('created_at', { ascending: false });
    if (filters?.category) q = q.eq('category', filters.category);
    if (filters?.featured !== undefined) q = q.eq('is_featured', filters.featured);
    if (filters?.published !== undefined) q = q.eq('is_published', filters.published);
    else q = q.eq('is_published', true);
    const { data, error } = await q;
    if (error) throw error;
    return (data || []) as Book[];
  },

  async getById(id: string) {
    const { data, error } = await supabase.from('books').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Book;
  },

  async create(book: Omit<Book, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('books').insert(book).select().single();
    if (error) throw error;
    return data as Book;
  },

  async update(id: string, updates: Partial<Book>) {
    const { data, error } = await supabase
      .from('books').update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id).select().single();
    if (error) throw error;
    return data as Book;
  },

  async delete(id: string) {
    const { error } = await supabase.from('books').delete().eq('id', id);
    if (error) throw error;
  },

  async getFeatured() {
    return this.getAll({ featured: true, published: true });
  },

  async search(query: string) {
    const { data, error } = await supabase
      .from('books').select('*')
      .eq('is_published', true)
      .or(`title.ilike.%${query}%,author.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(20);
    if (error) throw error;
    return (data || []) as Book[];
  },
};

// ─────────────────── Training Service ───────────────────
export const TrainingService = {
  async getAll(filters?: { category?: string; featured?: boolean; published?: boolean }) {
    let q = supabase.from('training_courses').select('*').order('created_at', { ascending: false });
    if (filters?.category) q = q.eq('category', filters.category);
    if (filters?.featured !== undefined) q = q.eq('is_featured', filters.featured);
    if (filters?.published !== undefined) q = q.eq('is_published', filters.published);
    else q = q.eq('is_published', true);
    const { data, error } = await q;
    if (error) throw error;
    return (data || []) as TrainingCourse[];
  },

  async getById(id: string) {
    const { data, error } = await supabase.from('training_courses').select('*').eq('id', id).single();
    if (error) throw error;
    return data as TrainingCourse;
  },

  async create(course: Omit<TrainingCourse, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('training_courses').insert(course).select().single();
    if (error) throw error;
    return data as TrainingCourse;
  },

  async update(id: string, updates: Partial<TrainingCourse>) {
    const { data, error } = await supabase
      .from('training_courses').update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id).select().single();
    if (error) throw error;
    return data as TrainingCourse;
  },

  async delete(id: string) {
    const { error } = await supabase.from('training_courses').delete().eq('id', id);
    if (error) throw error;
  },

  async getFeatured() {
    return this.getAll({ featured: true, published: true });
  },
};

// ─────────────────── Announcements Service ───────────────────
export const AnnouncementsService = {
  async getPublished() {
    const { data, error } = await supabase
      .from('announcements').select('*')
      .eq('is_published', true)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Announcement[];
  },

  async getAll() {
    const { data, error } = await supabase
      .from('announcements').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Announcement[];
  },

  async create(a: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('announcements').insert(a).select().single();
    if (error) throw error;
    return data as Announcement;
  },

  async update(id: string, updates: Partial<Announcement>) {
    const { data, error } = await supabase
      .from('announcements').update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id).select().single();
    if (error) throw error;
    return data as Announcement;
  },

  async delete(id: string) {
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) throw error;
  },
};

// ─────────────────── Contact Service ───────────────────
export const ContactService = {
  async send(msg: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>) {
    const { error } = await supabase.from('contact_messages').insert(msg);
    if (error) throw error;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('contact_messages').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as ContactMessage[];
  },

  async markRead(id: string) {
    const { error } = await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    if (error) throw error;
  },
};

// ─────────────────── Device Sessions Service ───────────────────
export const DeviceSessionService = {
  async upsert(session: { device_id: string; device_type: string; browser: string; os: string; is_admin?: boolean }) {
    const { error } = await supabase.from('device_sessions').upsert(
      { ...session, last_visit: new Date().toISOString() },
      { onConflict: 'device_id', ignoreDuplicates: false }
    );
    if (error) console.warn('Device session upsert:', error.message);
  },
};

// ============================================================
// ARRIS LIBRARY — Supabase Client & Services
// Project: vpfjwievtbbgepwlogls.supabase.co  ✅ Connected
// ============================================================
'use strict';

const SUPABASE_URL = 'https://vpfjwievtbbgepwlogls.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZmp3aWV2dGJiZ2Vwd2xvZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MDM2ODgsImV4cCI6MjEwMzQ3OTY4OH0.EPb_lipPD1baaQM9VgEYzXDbh3AIIH7_9TQX10hGcvI';
const ADMIN_DEVICE_ID = '202608';

const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

// ============================================================
// DEVICE IDENTITY SERVICE
// Generates/persists a unique device ID for every visitor
// Admin: device ID === ADMIN_DEVICE_ID ('202608')
// ============================================================
const DeviceService = {
  STORAGE_KEY: 'arris_lib_device_id',

  getOrCreate() {
    let id = localStorage.getItem(this.STORAGE_KEY);
    if (!id) {
      id = this._generate();
      localStorage.setItem(this.STORAGE_KEY, id);
    }
    return id;
  },

  _generate() {
    const ts   = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return 'DEV-' + ts + '-' + rand;
  },

  isAdmin() {
    return this.getOrCreate() === ADMIN_DEVICE_ID;
  },

  setAdminMode(code) {
    if (String(code) === ADMIN_DEVICE_ID) {
      localStorage.setItem(this.STORAGE_KEY, ADMIN_DEVICE_ID);
      return true;
    }
    return false;
  },

  exitAdminMode() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.getOrCreate(); // regenerate a normal ID
  },

  getDeviceType() {
    const ua = navigator.userAgent;
    if (/tablet|ipad/i.test(ua)) return 'Tablet';
    if (/mobile|android|iphone/i.test(ua)) return 'Mobile';
    return 'Desktop';
  }
};

// ============================================================
// BOOKS SERVICE
// ============================================================
const BooksService = {

  async getAll(category = null, search = null, page = 1, limit = 12) {
    let q = _sb.from('books').select('*', { count: 'exact' });
    if (category && category !== 'all') q = q.eq('category', category);
    if (search) q = q.or('title.ilike.%' + search + '%,author.ilike.%' + search + '%,description.ilike.%' + search + '%');
    const from = (page - 1) * limit;
    q = q.order('created_at', { ascending: false }).range(from, from + limit - 1);
    const { data, error, count } = await q;
    if (error) throw error;
    return { books: data || [], total: count || 0, page, limit };
  },

  async getById(id) {
    const { data, error } = await _sb.from('books').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async getFeatured() {
    const { data } = await _sb.from('books').select('*').eq('featured', true).limit(8);
    return data || [];
  },

  async getByCategory(category) {
    const { data } = await _sb.from('books').select('*').eq('category', category).limit(20);
    return data || [];
  },

  async create(payload) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const { data, error } = await _sb.from('books').insert({
      ...payload,
      device_id:  DeviceService.getOrCreate(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const { data, error } = await _sb.from('books')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const { error } = await _sb.from('books').delete().eq('id', id);
    if (error) throw error;
  },

  async uploadCover(file) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const ext  = file.name.split('.').pop();
    const path = 'covers/' + Date.now() + '.' + ext;
    const { error } = await _sb.storage.from('library-assets').upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = _sb.storage.from('library-assets').getPublicUrl(path);
    return data.publicUrl;
  },

  async uploadFile(file) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const ext  = file.name.split('.').pop();
    const path = 'books/' + Date.now() + '.' + ext;
    const { error } = await _sb.storage.from('library-assets').upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = _sb.storage.from('library-assets').getPublicUrl(path);
    return data.publicUrl;
  }
};

// ============================================================
// TRAINING COURSES SERVICE
// ============================================================
const CoursesService = {

  async getAll(track = null, search = null) {
    let q = _sb.from('courses').select('*');
    if (track && track !== 'all') q = q.eq('track', track);
    if (search) q = q.or('title.ilike.%' + search + '%,description.ilike.%' + search + '%');
    q = q.order('created_at', { ascending: false });
    const { data, error } = await q;
    if (error) throw error;
    return data || [];
  },

  async getById(id) {
    const { data, error } = await _sb.from('courses').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async getFeatured() {
    const { data } = await _sb.from('courses').select('*').eq('featured', true).limit(6);
    return data || [];
  },

  async create(payload) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const { data, error } = await _sb.from('courses').insert({
      ...payload,
      device_id:  DeviceService.getOrCreate(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const { data, error } = await _sb.from('courses')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const { error } = await _sb.from('courses').delete().eq('id', id);
    if (error) throw error;
  }
};

// ============================================================
// ANNOUNCEMENTS / BLOG SERVICE
// ============================================================
const AnnouncementsService = {

  async getAll() {
    const { data } = await _sb.from('announcements').select('*').order('created_at', { ascending: false }).limit(10);
    return data || [];
  },

  async create(payload) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const { data, error } = await _sb.from('announcements').insert({
      ...payload,
      device_id:  DeviceService.getOrCreate(),
      created_at: new Date().toISOString(),
    }).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const { data, error } = await _sb.from('announcements')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const { error } = await _sb.from('announcements').delete().eq('id', id);
    if (error) throw error;
  }
};

// ============================================================
// DEVICE VISITS SERVICE (analytics)
// ============================================================
const VisitsService = {
  async record() {
    const deviceId   = DeviceService.getOrCreate();
    const deviceType = DeviceService.getDeviceType();
    await _sb.from('device_visits').upsert(
      { device_id: deviceId, device_type: deviceType, last_seen: new Date().toISOString() },
      { onConflict: 'device_id' }
    );
  },

  async getStats() {
    if (!DeviceService.isAdmin()) throw new Error('Admin access required');
    const { data: visits }   = await _sb.from('device_visits').select('*');
    const { data: books }    = await _sb.from('books').select('id');
    const { data: courses }  = await _sb.from('courses').select('id');
    return {
      totalVisitors: (visits || []).length,
      totalBooks:    (books   || []).length,
      totalCourses:  (courses || []).length,
      desktop:       (visits  || []).filter(v => v.device_type === 'Desktop').length,
      mobile:        (visits  || []).filter(v => v.device_type === 'Mobile').length,
      tablet:        (visits  || []).filter(v => v.device_type === 'Tablet').length,
    };
  }
};

// ============================================================
// CONTACT SERVICE
// ============================================================
const ContactService = {
  async send({ name, email, subject, message }) {
    const { error } = await _sb.from('contact_messages').insert(
      { name, email, subject, message, device_id: DeviceService.getOrCreate() }
    );
    if (error) throw error;
  }
};

// Expose globally
window.DeviceService       = DeviceService;
window.BooksService        = BooksService;
window.CoursesService      = CoursesService;
window.AnnouncementsService = AnnouncementsService;
window.VisitsService       = VisitsService;
window.ContactService      = ContactService;
window.ADMIN_DEVICE_ID     = ADMIN_DEVICE_ID;
window._sb                 = _sb;

-- ============================================================
-- ARRIS LIBRARY — Row Level Security Policies
-- Run AFTER 001_initial_schema.sql
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE books               ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_courses    ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements       ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages    ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_sessions     ENABLE ROW LEVEL SECURITY;

-- ─────────────────── Books: Public read, anon write (admin manages via app) ───────────────────
CREATE POLICY "books_public_read"
  ON books FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "books_all_for_service"
  ON books FOR ALL
  USING (true)
  WITH CHECK (true);

-- ─────────────────── Training Courses ───────────────────
CREATE POLICY "courses_public_read"
  ON training_courses FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "courses_all_for_service"
  ON training_courses FOR ALL
  USING (true)
  WITH CHECK (true);

-- ─────────────────── Announcements ───────────────────
CREATE POLICY "announcements_public_read"
  ON announcements FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "announcements_all_for_service"
  ON announcements FOR ALL
  USING (true)
  WITH CHECK (true);

-- ─────────────────── Contact Messages ───────────────────
CREATE POLICY "messages_insert_public"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "messages_read_service"
  ON contact_messages FOR SELECT
  USING (true);

CREATE POLICY "messages_update_service"
  ON contact_messages FOR UPDATE
  USING (true);

-- ─────────────────── Device Sessions ───────────────────
CREATE POLICY "device_sessions_upsert_all"
  ON device_sessions FOR ALL
  USING (true)
  WITH CHECK (true);

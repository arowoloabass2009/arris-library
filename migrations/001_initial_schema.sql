-- ============================================================
-- ARRIS LIBRARY — Initial Database Schema
-- Run in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────── Books Table ───────────────────
CREATE TABLE IF NOT EXISTS books (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  author        TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN (
    'mathematics','physics','chemistry','biology','medicine',
    'history','business','it','motivational','literature',
    'science','engineering','economics','philosophy','psychology'
  )),
  description   TEXT,
  cover_color   TEXT DEFAULT 'from-obsidian-800 to-obsidian-700',
  pages         INTEGER,
  year          INTEGER,
  isbn          TEXT,
  is_featured   BOOLEAN DEFAULT FALSE,
  is_published  BOOLEAN DEFAULT TRUE,
  content_url   TEXT,
  rating        DECIMAL(2,1),
  downloads     INTEGER DEFAULT 0,
  created_by    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────── Training Courses Table ───────────────────
CREATE TABLE IF NOT EXISTS training_courses (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title             TEXT NOT NULL,
  instructor        TEXT NOT NULL,
  category          TEXT NOT NULL CHECK (category IN (
    'tech_it','soft_skills','business','critical_thinking',
    'ai_robotics','cybersecurity','cloud','data_science'
  )),
  description       TEXT,
  level             TEXT NOT NULL CHECK (level IN ('beginner','intermediate','advanced','expert')),
  duration_hours    INTEGER DEFAULT 10,
  modules           INTEGER DEFAULT 5,
  is_featured       BOOLEAN DEFAULT FALSE,
  is_published      BOOLEAN DEFAULT TRUE,
  cover_color       TEXT DEFAULT 'from-cyan-900 to-sky-700',
  enrollment_count  INTEGER DEFAULT 0,
  rating            DECIMAL(2,1),
  tags              TEXT[],
  created_by        TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────── Announcements Table ───────────────────
CREATE TABLE IF NOT EXISTS announcements (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  content       TEXT NOT NULL,
  is_published  BOOLEAN DEFAULT TRUE,
  is_pinned     BOOLEAN DEFAULT FALSE,
  created_by    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────── Contact Messages Table ───────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  is_read    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────── Device Sessions Table ───────────────────
CREATE TABLE IF NOT EXISTS device_sessions (
  device_id    TEXT PRIMARY KEY,
  device_type  TEXT,
  browser      TEXT,
  os           TEXT,
  is_admin     BOOLEAN DEFAULT FALSE,
  first_visit  TIMESTAMPTZ DEFAULT NOW(),
  last_visit   TIMESTAMPTZ DEFAULT NOW(),
  visit_count  INTEGER DEFAULT 1
);

-- ─────────────────── Updated_at triggers ───────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER books_updated_at
  BEFORE UPDATE ON books FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER courses_updated_at
  BEFORE UPDATE ON training_courses FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER announcements_updated_at
  BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────── Device session visit counter ───────────────────
CREATE OR REPLACE FUNCTION upsert_device_session()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.visit_count = 1;
    NEW.first_visit = NOW();
  ELSIF TG_OP = 'UPDATE' THEN
    NEW.visit_count = OLD.visit_count + 1;
    NEW.first_visit = OLD.first_visit;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER device_sessions_upsert
  BEFORE INSERT OR UPDATE ON device_sessions FOR EACH ROW EXECUTE FUNCTION upsert_device_session();

-- ─────────────────── Indexes ───────────────────
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_published ON books(is_published);
CREATE INDEX IF NOT EXISTS idx_books_featured ON books(is_featured);
CREATE INDEX IF NOT EXISTS idx_courses_category ON training_courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_published ON training_courses(is_published);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(is_published);
CREATE INDEX IF NOT EXISTS idx_messages_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_books_search ON books USING gin(to_tsvector('english', title || ' ' || COALESCE(author, '') || ' ' || COALESCE(description, '')));

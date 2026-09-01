-- ============================================================
-- ARRIS LIBRARY — Migration 005: Add download_url to books
-- Run in Supabase SQL Editor AFTER migrations 001–004
-- ============================================================

-- Add the download_url column (nullable — books without a link show "Not Available")
ALTER TABLE books
  ADD COLUMN IF NOT EXISTS download_url TEXT DEFAULT NULL;

-- Add a comment for clarity
COMMENT ON COLUMN books.download_url IS
  'Direct URL to a downloadable file (PDF, EPUB, etc.). NULL means no download available.';

-- Optional index for quickly finding books that have a download link
CREATE INDEX IF NOT EXISTS idx_books_has_download
  ON books (id)
  WHERE download_url IS NOT NULL;

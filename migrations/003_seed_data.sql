-- ============================================================
-- ARRIS LIBRARY — Seed Data (Optional)
-- Run AFTER 001 and 002 to populate initial content
-- ============================================================

-- Sample Announcements
INSERT INTO announcements (title, content, is_published, is_pinned, created_by) VALUES
(
  'Welcome to Arris Library!',
  'We are thrilled to launch Arris Library — a world-class digital knowledge hub. Explore thousands of books across 15+ disciplines and enrol in our practical training schools today. No registration required — your device ID is your key.',
  TRUE, TRUE, 'admin-202608'
),
(
  'New AI & Robotics Courses Now Available',
  'Our latest cohort of AI & Robotics training programmes is now live. From Machine Learning fundamentals to Advanced Robotics Engineering, enrol today and start building the future.',
  TRUE, FALSE, 'admin-202608'
),
(
  'Library Hours & Access',
  'Arris Library is available 24/7 — digital access never closes. Browse our collection at any time from any device. Your unique device ID gives you seamless, barrier-free access to all public resources.',
  TRUE, FALSE, 'admin-202608'
);

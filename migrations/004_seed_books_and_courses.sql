-- ============================================================
-- ARRIS LIBRARY — Seed: Books & Training Courses (Live Data)
-- Run in Supabase SQL Editor AFTER 001, 002, 003
-- This inserts all books and courses into your live database.
-- Uses INSERT ... ON CONFLICT DO NOTHING so it is safe to re-run.
-- ============================================================

-- ─────────────────── BOOKS ───────────────────
INSERT INTO books (title, author, category, description, cover_color, pages, year, is_featured, is_published, rating) VALUES

-- Mathematics
('Principles of Mathematical Analysis', 'Walter Rudin', 'mathematics',
 'The gold standard of mathematical analysis texts used in universities worldwide. Covers real and complex number systems, metric spaces, and continuity.',
 'from-blue-900 to-indigo-800', 342, 1976, TRUE, TRUE, 4.9),

('Introduction to Linear Algebra', 'Gilbert Strang', 'mathematics',
 'A comprehensive introduction to linear algebra, covering vectors, matrices, determinants, eigenvalues, and their applications in engineering and science.',
 'from-blue-800 to-blue-600', 584, 2016, FALSE, TRUE, 4.8),

('Calculus: Early Transcendentals', 'James Stewart', 'mathematics',
 'The most widely used calculus textbook. From limits and derivatives to integration and infinite series, mastering the language of change.',
 'from-indigo-900 to-blue-800', 1368, 2015, FALSE, TRUE, NULL),

-- Physics
('The Feynman Lectures on Physics', 'Richard P. Feynman', 'physics',
 'Nobel laureate Richard Feynman''s legendary lecture series. The most iconic physics educational resource ever created, covering mechanics, radiation, and quantum physics.',
 'from-purple-900 to-violet-700', 1552, 1964, TRUE, TRUE, 5.0),

('University Physics with Modern Physics', 'Young & Freedman', 'physics',
 'A comprehensive physics textbook combining classical mechanics, thermodynamics, electromagnetism, optics, and modern physics.',
 'from-violet-900 to-purple-700', 1600, 2019, FALSE, TRUE, NULL),

-- Chemistry
('Organic Chemistry', 'Paula Yurkanis Bruice', 'chemistry',
 'Master organic chemistry from functional groups to reaction mechanisms. An essential resource for pre-med and chemistry students.',
 'from-green-900 to-teal-800', 1344, 2016, TRUE, TRUE, 4.7),

('Physical Chemistry', 'Peter Atkins', 'chemistry',
 'Bridging chemistry, physics, and mathematics. Covers thermodynamics, quantum mechanics, spectroscopy, and statistical thermodynamics.',
 'from-teal-900 to-green-700', 1028, 2018, FALSE, TRUE, NULL),

-- Biology
('Campbell Biology', 'Jane B. Reece et al.', 'biology',
 'The definitive resource for biology education. From cells to ecosystems, this comprehensive text is the gold standard in biological sciences.',
 'from-emerald-900 to-green-700', 1488, 2020, TRUE, TRUE, 4.9),

('Molecular Biology of the Cell', 'Alberts et al.', 'biology',
 'The leading advanced cell biology textbook used by universities worldwide. Essential reading for understanding life at the molecular level.',
 'from-green-800 to-emerald-600', 1342, 2017, FALSE, TRUE, NULL),

-- Medicine
('Gray''s Anatomy', 'Henry Gray', 'medicine',
 'The most famous anatomy textbook in existence. Over 150 years of medical education excellence. An indispensable reference for medical students and professionals.',
 'from-red-900 to-rose-800', 1576, 2016, TRUE, TRUE, 4.9),

('Harrison''s Principles of Internal Medicine', 'Kasper et al.', 'medicine',
 'The definitive guide to internal medicine. Comprehensive coverage of diseases, diagnostics, and treatments used by clinicians globally.',
 'from-rose-900 to-red-700', 4012, 2018, FALSE, TRUE, NULL),

-- History
('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'history',
 'A riveting journey through 100,000 years of human history. From the Stone Age to the modern era, Harari explores what made Homo sapiens the dominant species.',
 'from-amber-900 to-yellow-800', 443, 2011, TRUE, TRUE, 4.8),

('The Guns of August', 'Barbara Tuchman', 'history',
 'The Pulitzer Prize-winning account of the first month of World War I. A masterpiece of narrative history that reads like a thriller.',
 'from-amber-800 to-orange-700', 511, 1962, FALSE, TRUE, NULL),

-- Business
('The Lean Startup', 'Eric Ries', 'business',
 'How modern entrepreneurs use continuous innovation to create successful businesses. A methodology that has transformed how companies are built and products are launched.',
 'from-yellow-900 to-amber-700', 336, 2011, TRUE, TRUE, 4.7),

('Good to Great', 'Jim Collins', 'business',
 'A landmark study of 28 companies over 30 years. Collins identifies the specific disciplines that transform good companies into truly great ones.',
 'from-amber-900 to-yellow-700', 320, 2001, FALSE, TRUE, 4.6),

('Zero to One', 'Peter Thiel', 'business',
 'Notes on startups, or how to build the future. Thiel argues that true innovation creates monopolies and shares lessons from building PayPal and Palantir.',
 'from-yellow-800 to-amber-600', 224, 2014, FALSE, TRUE, NULL),

-- IT
('Clean Code', 'Robert C. Martin', 'it',
 'A handbook of agile software craftsmanship. Learn to write code that is readable, maintainable, and elegant. Required reading for every professional developer.',
 'from-cyan-900 to-sky-700', 464, 2008, TRUE, TRUE, 4.8),

('The Pragmatic Programmer', 'Hunt & Thomas', 'it',
 'From journeyman to master. The timeless guide to software development that has transformed how developers think about code, careers, and craft.',
 'from-sky-900 to-blue-700', 352, 2019, FALSE, TRUE, 4.9),

('Designing Data-Intensive Applications', 'Martin Kleppmann', 'it',
 'The best guide to building reliable, scalable, and maintainable systems. Covers databases, distributed systems, and data processing pipelines.',
 'from-teal-900 to-cyan-700', 611, 2017, TRUE, TRUE, 4.9),

-- Motivational
('Think and Grow Rich', 'Napoleon Hill', 'motivational',
 'The all-time bestseller on success and wealth. Based on interviews with 500 of the most successful people of the early 20th century. Timeless wisdom on achievement.',
 'from-orange-900 to-amber-700', 238, 1937, TRUE, TRUE, 4.7),

('Atomic Habits', 'James Clear', 'motivational',
 'An easy and proven way to build good habits and break bad ones. The most comprehensive guide on how tiny changes can produce remarkable results.',
 'from-orange-800 to-red-700', 320, 2018, TRUE, TRUE, 4.9),

('The 7 Habits of Highly Effective People', 'Stephen Covey', 'motivational',
 'One of the most influential books ever written. A principle-centered approach to both personal and interpersonal effectiveness.',
 'from-amber-800 to-orange-600', 432, 1989, FALSE, TRUE, 4.7),

-- Engineering
('Fundamentals of Engineering Thermodynamics', 'Moran & Shapiro', 'engineering',
 'The definitive engineering thermodynamics textbook. Rigorous treatment of the fundamentals with extensive engineering applications.',
 'from-slate-900 to-gray-700', 936, 2018, FALSE, TRUE, NULL),

-- Economics
('Freakonomics', 'Levitt & Dubner', 'economics',
 'A rogue economist explores the hidden side of everything. Applies economic thinking to unconventional topics, revealing surprising truths about the world.',
 'from-lime-900 to-green-700', 336, 2005, FALSE, TRUE, 4.5),

-- Psychology
('Thinking, Fast and Slow', 'Daniel Kahneman', 'psychology',
 'Nobel laureate Kahneman''s masterpiece on the two systems that drive the way we think. A transformative exploration of human judgment and decision-making.',
 'from-pink-900 to-rose-700', 499, 2011, TRUE, TRUE, 4.8)

ON CONFLICT DO NOTHING;


-- ─────────────────── TRAINING COURSES ───────────────────
INSERT INTO training_courses (title, instructor, category, description, level, duration_hours, modules, is_featured, is_published, cover_color, rating, enrollment_count, tags) VALUES

-- Tech / IT
('Full-Stack Web Development Masterclass', 'Arris Tech Faculty', 'tech_it',
 'Master modern web development from frontend to backend. Build real-world applications using React, Node.js, TypeScript, PostgreSQL, and cloud deployment.',
 'beginner', 120, 24, TRUE, TRUE, 'from-cyan-900 to-sky-700', 4.9, 2840,
 ARRAY['React','Node.js','TypeScript','PostgreSQL']),

('Advanced System Design & Architecture', 'Dr. Emeka Okonkwo', 'tech_it',
 'Design scalable distributed systems. Learn microservices, event-driven architecture, API design patterns, caching strategies, and system resilience.',
 'advanced', 80, 16, FALSE, TRUE, 'from-blue-900 to-cyan-700', 4.8, 1620,
 ARRAY['Microservices','Distributed Systems','API Design']),

('Mobile App Development with React Native', 'Amara Nwosu', 'tech_it',
 'Build cross-platform mobile applications for iOS and Android. From setup to deployment on app stores, covering navigation, state management, and native integrations.',
 'intermediate', 90, 18, FALSE, TRUE, 'from-teal-900 to-cyan-700', 4.7, 1890, NULL),

-- Soft Skills
('Executive Communication & Presentation Mastery', 'Prof. Chidi Okafor', 'soft_skills',
 'Develop powerful communication skills for the boardroom and beyond. Master public speaking, persuasion, storytelling, and executive presence.',
 'intermediate', 40, 10, TRUE, TRUE, 'from-teal-900 to-green-700', 4.8, 3200,
 ARRAY['Communication','Leadership','Public Speaking']),

('Emotional Intelligence for Leaders', 'Dr. Fatima Al-Hassan', 'soft_skills',
 'Develop the emotional intelligence competencies that separate good managers from great leaders. Self-awareness, empathy, resilience, and motivating teams.',
 'beginner', 30, 8, FALSE, TRUE, 'from-emerald-900 to-teal-700', 4.9, 4100, NULL),

-- Business
('Entrepreneurship & Startup Funding Strategies', 'Tunde Adeyemi, MBA', 'business',
 'From idea to funded startup. Learn business model canvas, MVP development, pitch deck creation, fundraising strategies, and navigating the Nigerian and global startup ecosystem.',
 'intermediate', 60, 12, TRUE, TRUE, 'from-amber-900 to-yellow-700', 4.7, 2560,
 ARRAY['Startup','Fundraising','Business Model']),

('Digital Marketing & Growth Hacking', 'Kemi Adeleke', 'business',
 'Master digital marketing strategies: SEO, social media marketing, email campaigns, content strategy, paid advertising, and analytics to grow any business online.',
 'beginner', 45, 10, FALSE, TRUE, 'from-yellow-900 to-amber-700', 4.6, 5800, NULL),

('Financial Analysis & Investment Strategy', 'Dr. Bola Ogundimu', 'business',
 'Understand financial statements, valuation methods, portfolio theory, and investment analysis. Build the financial acumen needed for corporate finance or personal investing.',
 'advanced', 70, 14, FALSE, TRUE, 'from-lime-900 to-yellow-700', 4.8, 1720, NULL),

-- Critical Thinking
('Critical Thinking & Problem-Solving Framework', 'Prof. Adaeze Eze', 'critical_thinking',
 'Develop razor-sharp analytical thinking. Learn structured problem-solving frameworks, logical reasoning, cognitive bias recognition, and decision-making under uncertainty.',
 'beginner', 35, 9, TRUE, TRUE, 'from-purple-900 to-violet-700', 4.9, 3880,
 ARRAY['Logic','Problem Solving','Decision Making']),

('Design Thinking & Innovation', 'Uche Mbadiwe', 'critical_thinking',
 'Apply human-centred design principles to solve complex problems. Learn empathy mapping, ideation techniques, prototyping, and testing methodologies used by leading innovators.',
 'intermediate', 50, 11, FALSE, TRUE, 'from-violet-900 to-purple-700', 4.7, 2100, NULL),

-- AI & Robotics
('Artificial Intelligence & Machine Learning', 'Dr. Nnamdi Eze', 'ai_robotics',
 'Comprehensive AI/ML programme covering supervised and unsupervised learning, neural networks, deep learning, NLP, and real-world AI project deployment.',
 'intermediate', 150, 30, TRUE, TRUE, 'from-blue-900 to-indigo-700', 4.9, 4200,
 ARRAY['Python','TensorFlow','PyTorch','NLP']),

('Robotics Engineering & Automation', 'Engr. Seun Babatunde', 'ai_robotics',
 'Build intelligent robotic systems from scratch. Programming robots, sensor integration, kinematics, computer vision, and autonomous navigation systems.',
 'advanced', 100, 20, TRUE, TRUE, 'from-indigo-900 to-blue-700', 4.8, 1340, NULL),

('Generative AI & Large Language Models', 'Dr. Aisha Mohammed', 'ai_robotics',
 'Deep dive into LLMs, prompt engineering, fine-tuning, RAG systems, and building AI-powered applications. Work with GPT, Claude, and open-source models.',
 'expert', 80, 16, FALSE, TRUE, 'from-sky-900 to-indigo-700', 4.9, 3760, NULL),

-- Cybersecurity
('Ethical Hacking & Penetration Testing', 'Olawale Cyber-Expert', 'cybersecurity',
 'Learn cybersecurity from an attacker''s perspective. Penetration testing, vulnerability assessment, web security, network security, and ethical hacking certifications.',
 'intermediate', 90, 18, TRUE, TRUE, 'from-red-900 to-rose-700', 4.8, 2980,
 ARRAY['Ethical Hacking','Kali Linux','OWASP']),

('Security Operations & Incident Response', 'Blessing Nwofor', 'cybersecurity',
 'Operate a security operations centre. Learn threat detection, log analysis, SIEM tools, incident response playbooks, and forensic investigation techniques.',
 'advanced', 75, 15, FALSE, TRUE, 'from-rose-900 to-red-700', 4.7, 1560, NULL),

-- Cloud Engineering
('AWS Cloud Architecture Professional', 'Chukwuemeka Obi', 'cloud',
 'Master Amazon Web Services architecture. Design highly available, scalable, cost-optimized cloud solutions. Prepare for AWS Solutions Architect certification.',
 'intermediate', 110, 22, TRUE, TRUE, 'from-sky-900 to-blue-700', 4.9, 3640,
 ARRAY['AWS','CloudFormation','Lambda','RDS']),

('DevOps & CI/CD Pipeline Engineering', 'Ibrahim Hassan', 'cloud',
 'Streamline software delivery with DevOps practices. Docker, Kubernetes, CI/CD pipelines, infrastructure as code, monitoring, and GitOps workflow automation.',
 'intermediate', 95, 19, FALSE, TRUE, 'from-blue-900 to-sky-700', 4.8, 2780, NULL),

-- Data Science
('Data Science & Analytics Bootcamp', 'Dr. Ngozi Anigbo', 'data_science',
 'Complete data science training: Python, Pandas, NumPy, data visualization, statistical analysis, machine learning, and building data-driven business insights.',
 'beginner', 130, 26, TRUE, TRUE, 'from-green-900 to-teal-700', 4.8, 5200,
 ARRAY['Python','Pandas','Tableau','SQL'])

ON CONFLICT DO NOTHING;

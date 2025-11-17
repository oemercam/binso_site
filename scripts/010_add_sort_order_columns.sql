-- Add sort_order column to all content tables for custom ordering

-- Services
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Update existing services with incremental sort_order
UPDATE services 
SET sort_order = subquery.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_num 
  FROM services
) AS subquery 
WHERE services.id = subquery.id;

-- Team Members
ALTER TABLE team_members 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Update existing team members with incremental sort_order
UPDATE team_members 
SET sort_order = subquery.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_num 
  FROM team_members
) AS subquery 
WHERE team_members.id = subquery.id;

-- Testimonials
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Update existing testimonials with incremental sort_order
UPDATE testimonials 
SET sort_order = subquery.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_num 
  FROM testimonials
) AS subquery 
WHERE testimonials.id = subquery.id;

-- FAQs
ALTER TABLE faqs 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Update existing FAQs with incremental sort_order
UPDATE faqs 
SET sort_order = subquery.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_num 
  FROM faqs
) AS subquery 
WHERE faqs.id = subquery.id;

-- Portfolio Projects
ALTER TABLE portfolio_projects 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Update existing portfolio projects with incremental sort_order
UPDATE portfolio_projects 
SET sort_order = subquery.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_num 
  FROM portfolio_projects
) AS subquery 
WHERE portfolio_projects.id = subquery.id;

-- Blog Posts
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Update existing blog posts with incremental sort_order
UPDATE blog_posts 
SET sort_order = subquery.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_num 
  FROM blog_posts
) AS subquery 
WHERE blog_posts.id = subquery.id;

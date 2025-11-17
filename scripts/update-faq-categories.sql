-- Update FAQ categories to match service-based categories
-- This script updates existing FAQs to use the new category structure

UPDATE faqs 
SET category = 'cloud-azure'
WHERE category = 'Allgemein' AND question LIKE '%Cloud%' OR question LIKE '%Azure%' OR question LIKE '%Infrastruktur%' OR question LIKE '%Netzwerk%';

UPDATE faqs 
SET category = 'security-support'
WHERE category = 'Support' OR category = 'Technik' OR question LIKE '%Security%' OR question LIKE '%Support%' OR question LIKE '%Cyber%' OR question LIKE '%Sicherheit%';

UPDATE faqs 
SET category = 'workplace-ki'
WHERE question LIKE '%KI%' OR question LIKE '%Modern Workplace%' OR question LIKE '%Website%' OR question LIKE '%Web-App%' OR question LIKE '%Microsoft 365%';

UPDATE faqs 
SET category = 'outsourcing-consulting'
WHERE question LIKE '%Outsourcing%' OR question LIKE '%Consulting%' OR category = 'Preise';

-- For any remaining FAQs without a proper category, set to cloud-azure as default
UPDATE faqs 
SET category = 'cloud-azure'
WHERE category NOT IN ('cloud-azure', 'security-support', 'workplace-ki', 'outsourcing-consulting');

-- Verify the update
SELECT category, COUNT(*) as count, string_agg(LEFT(question, 50), ' | ') as sample_questions
FROM faqs
GROUP BY category
ORDER BY category;

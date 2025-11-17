-- Füge Demo-Projekte mit ansprechenden Bildern hinzu
-- Hinweis: Dieses Script fügt nur neue Projekte hinzu, wenn sie nicht bereits existieren

-- Lösche zuerst existierende Demo-Projekte
DELETE FROM portfolio_projects WHERE slug IN (
  'ki-chatbot-kundenservice',
  'cloud-azure-migration',
  'e-commerce-marketplace',
  'workplace-automation',
  'security-compliance-system'
);

-- KI Chatbot für Kundenservice
INSERT INTO portfolio_projects (
  id,
  slug,
  title,
  category,
  description,
  long_description,
  image_url,
  client,
  date,
  technologies,
  features,
  website_url,
  published,
  sort_order,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'ki-chatbot-kundenservice',
  'KI-Chatbot für Kundenservice',
  'ki-automation',
  'Intelligenter Chatbot zur Automatisierung des Kundensupports mit 24/7 Verfügbarkeit',
  'Entwicklung eines KI-gestützten Chatbots, der häufige Kundenanfragen automatisch beantwortet und komplexe Anfragen an menschliche Mitarbeiter weiterleitet. Das System nutzt Natural Language Processing (NLP) und maschinelles Lernen, um kontinuierlich dazuzulernen und die Antwortqualität zu verbessern.',
  '/placeholder.svg?height=600&width=800',
  'TechCorp AG',
  '2024-01',
  ARRAY['Next.js', 'TypeScript', 'AI SDK', 'OpenAI', 'Supabase'],
  ARRAY['Natural Language Processing', 'Automatische Ticketerstellung', '24/7 Verfügbarkeit', 'Multi-Sprachen Support', 'Sentiment Analysis'],
  'https://example.com',
  true,
  1,
  now(),
  now()
);

-- Cloud Migration zu Azure
INSERT INTO portfolio_projects (
  id,
  slug,
  title,
  category,
  description,
  long_description,
  image_url,
  client,
  date,
  technologies,
  features,
  website_url,
  published,
  sort_order,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'cloud-azure-migration',
  'Cloud Migration zu Microsoft Azure',
  'cloud-infrastructure',
  'Komplette Migration der IT-Infrastruktur in die Azure Cloud mit Zero-Downtime',
  'Umfassendes Migrationsprojekt einer On-Premise-Infrastruktur in die Microsoft Azure Cloud. Inklusive Architekturplanung, Datenmigratio, Sicherheitskonzept und Schulung der IT-Teams. Erreicht wurde eine 99.9% Verfügbarkeit und 40% Kosteneinsparung.',
  '/placeholder.svg?height=600&width=800',
  'FinanceGroup Schweiz',
  '2024-02',
  ARRAY['Microsoft Azure', 'Azure DevOps', 'Kubernetes', 'Docker', 'Terraform'],
  ARRAY['Zero-Downtime Migration', 'Auto-Scaling', 'Disaster Recovery', 'Security Compliance', 'Cost Optimization'],
  'https://example.com',
  true,
  2,
  now(),
  now()
);

-- E-Commerce Marketplace
INSERT INTO portfolio_projects (
  id,
  slug,
  title,
  category,
  description,
  long_description,
  image_url,
  client,
  date,
  technologies,
  features,
  website_url,
  published,
  sort_order,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'e-commerce-marketplace',
  'B2B E-Commerce Marketplace',
  'web-development',
  'Moderne B2B-Handelsplattform mit über 10.000 Produkten und automatisiertem Bestellmanagement',
  'Entwicklung einer skalierbaren B2B E-Commerce-Lösung mit umfangreichem Produktkatalog, automatisiertem Bestellprozess, Lagerverwaltung und Integration in bestehende ERP-Systeme. Die Plattform verarbeitet täglich über 1.000 Bestellungen.',
  '/placeholder.svg?height=600&width=800',
  'SwissRetail AG',
  '2024-03',
  ARRAY['Next.js', 'React', 'Stripe', 'PostgreSQL', 'Redis'],
  ARRAY['Multi-Vendor Support', 'Payment Gateway', 'Inventory Management', 'Order Tracking', 'Analytics Dashboard'],
  'https://example.com',
  true,
  3,
  now(),
  now()
);

-- Workplace Automation
INSERT INTO portfolio_projects (
  id,
  slug,
  title,
  category,
  description,
  long_description,
  image_url,
  client,
  date,
  technologies,
  features,
  website_url,
  published,
  sort_order,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'workplace-automation',
  'Workplace Automation System',
  'automation',
  'Automatisierung repetitiver Geschäftsprozesse zur Steigerung der Produktivität um 60%',
  'Implementierung eines umfassenden Automatisierungssystems für manuelle Geschäftsprozesse. Inklusive Dokumentenverarbeitung, E-Mail-Automation, Dateneingabe und Berichtserstellung. Das System spart dem Kunden 200+ Arbeitsstunden pro Monat.',
  '/placeholder.svg?height=600&width=800',
  'MediaCorp International',
  '2023-12',
  ARRAY['Python', 'Power Automate', 'AI Document Processing', 'SQL Server', 'REST APIs'],
  ARRAY['Document OCR', 'Email Automation', 'Workflow Designer', 'Reporting Engine', 'Integration Hub'],
  'https://example.com',
  true,
  4,
  now(),
  now()
);

-- Security & Compliance System
INSERT INTO portfolio_projects (
  id,
  slug,
  title,
  category,
  description,
  long_description,
  image_url,
  client,
  date,
  technologies,
  features,
  website_url,
  published,
  sort_order,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'security-compliance-system',
  'Security & Compliance Management',
  'security',
  'Zentrales System zur Verwaltung von IT-Sicherheit und Compliance-Anforderungen',
  'Entwicklung einer Compliance-Management-Plattform zur Überwachung und Verwaltung von Sicherheitsrichtlinien, Audit-Logs und Compliance-Anforderungen. Das System automatisiert Sicherheitsprüfungen und erstellt detaillierte Compliance-Reports für Regulierungsbehörden.',
  '/placeholder.svg?height=600&width=800',
  'SecureBank Zürich',
  '2024-01',
  ARRAY['Next.js', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Docker'],
  ARRAY['Audit Logging', 'Compliance Reporting', 'Security Scanning', 'Risk Assessment', 'Policy Management'],
  'https://example.com',
  true,
  5,
  now(),
  now()
);

-- Erfolgreiche Einfügung bestätigen
SELECT 'Demo-Projekte erfolgreich eingefügt!' as status,
       COUNT(*) as anzahl_projekte
FROM portfolio_projects
WHERE slug IN (
  'ki-chatbot-kundenservice',
  'cloud-azure-migration',
  'e-commerce-marketplace',
  'workplace-automation',
  'security-compliance-system'
);

-- Seed Demo-Daten für die Webseite
-- Dieses Script fügt Beispiel-Inhalte ein, damit die Webseite und das Dashboard nicht leer sind

-- Services (Dienstleistungen)
INSERT INTO services (id, title, slug, short_description, icon, price_from, price_note, features, benefits, use_cases, process_steps, published, sort_order, created_at, updated_at)
VALUES
(gen_random_uuid(), 'KI-Chatbots', 'ki-chatbots', 'Intelligente Chatbots für Kundenservice und Lead-Generierung', '🤖', 2500, 'ab', 
'[{"title": "24/7 Verfügbarkeit", "description": "Ihr Chatbot antwortet rund um die Uhr"}, {"title": "Mehrsprachig", "description": "Unterstützung für über 50 Sprachen"}, {"title": "KI-Training", "description": "Lernt kontinuierlich aus Gesprächen"}]'::jsonb,
'[{"title": "Zeitersparnis", "description": "Bis zu 80% weniger Support-Anfragen"}, {"title": "Höhere Conversion", "description": "30% mehr Leads durch 24/7 Erreichbarkeit"}]'::jsonb,
ARRAY['Kundenservice', 'Lead-Generierung', 'FAQ-Automation'],
'[{"step": 1, "title": "Analyse", "description": "Wir analysieren Ihre Anforderungen"}, {"step": 2, "title": "Training", "description": "Der Chatbot wird auf Ihre Daten trainiert"}, {"step": 3, "title": "Integration", "description": "Nahtlose Integration in Ihre Website"}, {"step": 4, "title": "Optimierung", "description": "Kontinuierliche Verbesserung"}]'::jsonb,
true, 1, NOW(), NOW()),

(gen_random_uuid(), 'WhatsApp Automation', 'whatsapp-automation', 'Automatisieren Sie Ihre WhatsApp-Kommunikation', '💬', 1800, 'ab',
'[{"title": "Automatische Antworten", "description": "Sofortige Reaktion auf Kundenanfragen"}, {"title": "Terminbuchung", "description": "Automatische Terminverwaltung"}, {"title": "Produktempfehlungen", "description": "KI-basierte Produktvorschläge"}]'::jsonb,
'[{"title": "Schnellere Reaktionszeit", "description": "Unter 1 Minute durchschnittliche Antwortzeit"}, {"title": "Mehr Umsatz", "description": "25% höhere Conversion durch WhatsApp"}]'::jsonb,
ARRAY['E-Commerce', 'Terminbuchungen', 'Kundenbetreuung'],
'[{"step": 1, "title": "WhatsApp Business Setup", "description": "Einrichtung Ihres Business-Accounts"}, {"step": 2, "title": "Workflow-Design", "description": "Gestaltung der Automatisierungsabläufe"}, {"step": 3, "title": "Testing", "description": "Umfangreiche Tests vor Go-Live"}, {"step": 4, "title": "Go-Live", "description": "Aktivierung und Monitoring"}]'::jsonb,
true, 2, NOW(), NOW()),

(gen_random_uuid(), 'Webentwicklung', 'webentwicklung', 'Moderne, schnelle Websites mit Next.js', '🌐', 3500, 'ab',
'[{"title": "Next.js 15", "description": "Neueste Technologie für maximale Performance"}, {"title": "SEO-optimiert", "description": "Perfekte Rankings bei Google"}, {"title": "Responsive Design", "description": "Perfekt auf allen Geräten"}]'::jsonb,
'[{"title": "Schnelle Ladezeiten", "description": "Unter 1 Sekunde durchschnittlich"}, {"title": "Bessere Rankings", "description": "Top 3 Platzierungen bei Google"}]'::jsonb,
ARRAY['Unternehmenswebsites', 'Landing Pages', 'E-Commerce'],
'[{"step": 1, "title": "Design", "description": "Individuelles Design nach Ihren Wünschen"}, {"step": 2, "title": "Entwicklung", "description": "Professionelle Umsetzung"}, {"step": 3, "title": "Testing", "description": "Qualitätssicherung"}, {"step": 4, "title": "Launch", "description": "Go-Live und Support"}]'::jsonb,
true, 3, NOW(), NOW()),

(gen_random_uuid(), 'Prozessautomatisierung', 'prozessautomatisierung', 'Optimieren Sie Ihre Geschäftsprozesse mit KI', '⚡', 2000, 'ab',
'[{"title": "Workflow-Automation", "description": "Automatisierung wiederkehrender Aufgaben"}, {"title": "Datenintegration", "description": "Verbindung verschiedener Systeme"}, {"title": "Reporting", "description": "Automatische Berichte und Dashboards"}]'::jsonb,
'[{"title": "Zeitersparnis", "description": "Bis zu 10 Stunden pro Woche"}, {"title": "Fehlerreduktion", "description": "95% weniger manuelle Fehler"}]'::jsonb,
ARRAY['Buchhaltung', 'Projektmanagement', 'Marketing'],
'[{"step": 1, "title": "Prozessanalyse", "description": "Identifikation von Optimierungspotenzialen"}, {"step": 2, "title": "Konzeption", "description": "Entwicklung der Automatisierungsstrategie"}, {"step": 3, "title": "Implementierung", "description": "Umsetzung der Lösung"}, {"step": 4, "title": "Schulung", "description": "Training Ihres Teams"}]'::jsonb,
true, 4, NOW(), NOW()),

(gen_random_uuid(), 'AI Consulting', 'ai-consulting', 'Strategische Beratung für den Einsatz von KI', '🎯', 1500, 'ab',
'[{"title": "Potenzialanalyse", "description": "Identifikation von KI-Einsatzmöglichkeiten"}, {"title": "Roadmap-Entwicklung", "description": "Strategische Planung"}, {"title": "Technologie-Auswahl", "description": "Auswahl der passenden Tools"}]'::jsonb,
'[{"title": "Klare Strategie", "description": "Wissen, wo KI Mehrwert bringt"}, {"title": "ROI-Berechnung", "description": "Transparente Kosten-Nutzen-Analyse"}]'::jsonb,
ARRAY['Strategieberatung', 'Change Management', 'Technology Assessment'],
'[{"step": 1, "title": "Ist-Analyse", "description": "Analyse Ihrer aktuellen Situation"}, {"step": 2, "title": "Potenzial-Workshop", "description": "Gemeinsame Erarbeitung von Use Cases"}, {"step": 3, "title": "Roadmap", "description": "Entwicklung eines Umsetzungsplans"}, {"step": 4, "title": "Begleitung", "description": "Unterstützung bei der Umsetzung"}]'::jsonb,
true, 5, NOW(), NOW()),

(gen_random_uuid(), 'Datenanalyse & BI', 'datenanalyse-bi', 'Intelligente Datenauswertung und Visualisierung', '📊', 2200, 'ab',
'[{"title": "Dashboards", "description": "Interaktive Business Intelligence Dashboards"}, {"title": "Predictive Analytics", "description": "Vorhersagen auf Basis historischer Daten"}, {"title": "Datenintegration", "description": "Anbindung aller Datenquellen"}]'::jsonb,
'[{"title": "Bessere Entscheidungen", "description": "Datengestützte Unternehmensführung"}, {"title": "Früherkennung", "description": "Trends rechtzeitig erkennen"}]'::jsonb,
ARRAY['Verkaufsanalyse', 'Kundenverhalten', 'Forecasting'],
'[{"step": 1, "title": "Datenquellen", "description": "Identifikation und Anbindung"}, {"step": 2, "title": "Datenmodellierung", "description": "Strukturierung der Daten"}, {"step": 3, "title": "Dashboard-Design", "description": "Visualisierung der KPIs"}, {"step": 4, "title": "Training", "description": "Schulung Ihres Teams"}]'::jsonb,
true, 6, NOW(), NOW());

-- Portfolio-Projekte
INSERT INTO portfolio_projects (id, title, slug, description, long_description, client, category, date, image_url, technologies, features, website_url, results, published, sort_order, created_at, updated_at)
VALUES
(gen_random_uuid(), 'AI-Chatbot für Versicherung', 'ai-chatbot-versicherung', 'Intelligenter Chatbot zur Beratung und Lead-Generierung', 
'<p>Für einen führenden Versicherungsanbieter haben wir einen KI-gestützten Chatbot entwickelt, der Kunden bei der Auswahl der richtigen Versicherungsprodukte unterstützt.</p><p>Der Chatbot beantwortet Fragen zu verschiedenen Versicherungsprodukten, erstellt personalisierte Empfehlungen und leitet qualifizierte Leads an das Vertriebsteam weiter.</p>',
'Versicherung AG', 'AI & Automatisierung', '2024-01', '/placeholder.svg?height=600&width=800', 
ARRAY['Next.js', 'OpenAI GPT-4', 'Supabase', 'Tailwind CSS'],
ARRAY['24/7 Verfügbarkeit', 'Mehrsprachig (DE, FR, IT)', 'Lead-Qualifizierung', 'CRM-Integration'],
'https://example.com',
'{"leads": "350% mehr qualifizierte Leads", "satisfaction": "92% Kundenzufriedenheit", "response_time": "< 2 Sekunden Antwortzeit"}'::jsonb,
true, 1, NOW(), NOW()),

(gen_random_uuid(), 'E-Commerce Platform', 'ecommerce-platform', 'Moderne Online-Shop-Lösung mit AI-Produktempfehlungen',
'<p>Entwicklung einer vollständigen E-Commerce-Plattform für einen Fashion-Retailer mit über 5.000 Produkten.</p><p>Die Plattform nutzt KI für personalisierte Produktempfehlungen und automatische Kategorisierung.</p>',
'Fashion Store GmbH', 'Webentwicklung', '2024-02', '/placeholder.svg?height=600&width=800', 
ARRAY['Next.js 15', 'Stripe', 'Supabase', 'AI Recommendations'],
ARRAY['Personalisierte Empfehlungen', 'Schnelle Ladezeiten', 'Mobile-First Design', 'One-Click Checkout'],
'https://example.com',
'{"conversion": "+45% Conversion Rate", "cart_value": "+35% durchschnittlicher Warenkorbwert", "performance": "98/100 Lighthouse Score"}'::jsonb,
true, 2, NOW(), NOW()),

(gen_random_uuid(), 'WhatsApp Automation für Restaurant', 'whatsapp-restaurant', 'Automatisierte Reservierungsverwaltung via WhatsApp',
'<p>Für eine Restaurantkette mit 8 Standorten haben wir ein WhatsApp-basiertes Reservierungssystem entwickelt.</p><p>Kunden können über WhatsApp Tische reservieren, Menüs einsehen und Sonderangebote erhalten.</p>',
'Ristorante Italiano', 'Automatisierung', '2024-03', '/placeholder.svg?height=600&width=800', 
ARRAY['WhatsApp Business API', 'Node.js', 'Supabase', 'Twilio'],
ARRAY['Automatische Reservierungen', 'Menü-Übersicht', 'Reminder-System', 'Multi-Location Support'],
NULL,
'{"reservations": "+280% mehr Reservierungen", "cancellations": "-65% No-Shows", "satisfaction": "4.8/5 Kundenbewertung"}'::jsonb,
true, 3, NOW(), NOW());

-- Team-Mitglieder
INSERT INTO team_members (id, name, role, bio, email, linkedin, image_url, published, sort_order, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Ömer Cam', 'CEO & Gründer', 'KI-Experte mit 8+ Jahren Erfahrung in der Entwicklung intelligenter Automatisierungslösungen. Leidenschaft für innovative Technologien und kundenorientierte Lösungen.', 
'oemer@binso.ch', 'https://linkedin.com/in/oemercam', '/placeholder.svg?height=400&width=400', true, 1, NOW(), NOW()),

(gen_random_uuid(), 'Sarah Müller', 'Lead Developer', 'Full-Stack-Entwicklerin spezialisiert auf Next.js und AI-Integration. Verantwortlich für die technische Umsetzung unserer Projekte.', 
'sarah.mueller@binso.ch', 'https://linkedin.com/in/sarahmueller', '/placeholder.svg?height=400&width=400', true, 2, NOW(), NOW()),

(gen_random_uuid(), 'Michael Weber', 'AI Consultant', 'Strategischer Berater für KI-Projekte mit Fokus auf Business Value und ROI. Hilft Unternehmen, die richtigen KI-Use-Cases zu identifizieren.', 
'michael.weber@binso.ch', 'https://linkedin.com/in/michaelweber', '/placeholder.svg?height=400&width=400', true, 3, NOW(), NOW()),

(gen_random_uuid(), 'Anna Meier', 'UX/UI Designer', 'Kreative Designerin mit Fokus auf benutzerfreundliche und moderne Interfaces. Sorgt dafür, dass unsere Lösungen nicht nur funktional, sondern auch visuell ansprechend sind.', 
'anna.meier@binso.ch', 'https://linkedin.com/in/annameier', '/placeholder.svg?height=400&width=400', true, 4, NOW(), NOW());

-- Testimonials
INSERT INTO testimonials (id, client_name, client_role, client_company, testimonial, rating, project_reference, image_url, published, sort_order, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Thomas Schneider', 'CEO', 'Versicherung AG', 
'Die Zusammenarbeit mit Binso war hervorragend. Der AI-Chatbot hat unsere Lead-Generierung um 350% gesteigert. Das Team war professionell und hat alle Deadlines eingehalten.',
5, 'ai-chatbot-versicherung', '/placeholder.svg?height=200&width=200', true, 1, NOW(), NOW()),

(gen_random_uuid(), 'Anna Meier', 'Marketing Director', 'Fashion Store GmbH',
'Unsere neue E-Commerce-Plattform übertrifft alle Erwartungen. Die AI-Produktempfehlungen haben unseren Umsatz signifikant gesteigert. Absolute Empfehlung!',
5, 'ecommerce-platform', '/placeholder.svg?height=200&width=200', true, 2, NOW(), NOW()),

(gen_random_uuid(), 'Marco Rossi', 'Geschäftsführer', 'Ristorante Italiano',
'Die WhatsApp-Automatisierung hat unser Reservierungsmanagement revolutioniert. Wir haben jetzt viel mehr Buchungen und deutlich weniger No-Shows. Danke Binso!',
5, 'whatsapp-restaurant', '/placeholder.svg?height=200&width=200', true, 3, NOW(), NOW());

-- FAQs
INSERT INTO faqs (id, question, answer, category, published, sort_order, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Wie lange dauert die Entwicklung eines AI-Chatbots?', 
'Die Entwicklungszeit hängt von der Komplexität ab. Ein einfacher Chatbot kann in 2-3 Wochen fertig sein, während komplexere Lösungen mit CRM-Integration 6-8 Wochen benötigen.',
'Allgemein', true, 1, NOW(), NOW()),

(gen_random_uuid(), 'Was kostet ein AI-Chatbot?', 
'Die Preise starten ab CHF 2.500 für einen Basis-Chatbot. Der finale Preis hängt von Features, Integrationen und Trainingsaufwand ab. Wir erstellen gerne ein individuelles Angebot.',
'Preise', true, 2, NOW(), NOW()),

(gen_random_uuid(), 'Welche Programmiersprachen nutzen Sie?', 
'Wir arbeiten hauptsächlich mit modernen Technologien wie Next.js, React, Node.js und Python. Für AI-Projekte nutzen wir OpenAI GPT-4, Claude und weitere KI-Modelle.',
'Technik', true, 3, NOW(), NOW()),

(gen_random_uuid(), 'Bieten Sie auch Wartung und Support an?', 
'Ja, wir bieten verschiedene Support-Pakete an. Nach Projektabschluss können Sie zwischen monatlicher Wartung oder On-Demand-Support wählen.',
'Support', true, 4, NOW(), NOW()),

(gen_random_uuid(), 'Arbeiten Sie auch mit kleinen Unternehmen?', 
'Absolut! Wir arbeiten mit Unternehmen jeder Größe - von Startups bis zu etablierten Konzernen. Jedes Projekt ist uns wichtig.',
'Allgemein', true, 5, NOW(), NOW());

-- Blog Posts
INSERT INTO blog_posts (id, title, slug, excerpt, content, author, category, tags, featured_image, status, published_at, meta_title, meta_description, views, sort_order, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Die Zukunft von AI-Chatbots in der Schweiz', 'zukunft-ai-chatbots-schweiz',
'Erfahren Sie, wie KI-Chatbots die Kundeninteraktion revolutionieren und welche Trends 2024 wichtig werden.',
'<p>Künstliche Intelligenz verändert die Art und Weise, wie Unternehmen mit ihren Kunden kommunizieren. In diesem Artikel beleuchten wir die wichtigsten Trends und Entwicklungen im Bereich AI-Chatbots.</p><h2>Warum AI-Chatbots?</h2><p>Chatbots bieten 24/7 Verfügbarkeit, schnelle Antwortzeiten und können Tausende von Anfragen gleichzeitig bearbeiten.</p>',
'Ömer Cam', 'AI & Technologie', ARRAY['AI', 'Chatbots', 'Digitalisierung'], '/placeholder.svg?height=400&width=800',
'published', NOW() - INTERVAL '10 days', 'Die Zukunft von AI-Chatbots in der Schweiz | Binso Blog', 
'Entdecken Sie die neuesten Trends im Bereich AI-Chatbots und wie sie Ihr Geschäft transformieren können.', 
245, 1, NOW() - INTERVAL '10 days', NOW()),

(gen_random_uuid(), '5 Wege, wie KI Ihr Marketing verbessern kann', '5-wege-ki-marketing',
'Praktische Tipps zur Integration von künstlicher Intelligenz in Ihre Marketingstrategie.',
'<p>Künstliche Intelligenz ist nicht nur ein Buzzword - sie kann Ihr Marketing messbar verbessern. Hier sind 5 konkrete Anwendungsfälle.</p><h2>1. Personalisierung</h2><p>KI kann Kundendaten analysieren und personalisierte Inhalte ausspielen.</p>',
'Sarah Müller', 'Marketing', ARRAY['KI', 'Marketing', 'Automatisierung'], '/placeholder.svg?height=400&width=800',
'published', NOW() - INTERVAL '5 days', '5 Wege, wie KI Ihr Marketing verbessern kann | Binso', 
'Lernen Sie 5 praktische Möglichkeiten kennen, wie Sie KI für besseres Marketing nutzen können.', 
189, 2, NOW() - INTERVAL '5 days', NOW());

-- Site Settings (Grundkonfiguration)
INSERT INTO site_settings (
  id, company_name, company_slogan, company_email, company_phone, company_address,
  meta_title, meta_description, header_visible, footer_visible, chatbot_enabled, maintenance_mode,
  created_at, updated_at
)
VALUES (
  gen_random_uuid(), 
  'Binso - AI Agentur', 
  'Intelligente Automatisierung für Ihr Business',
  'info@binso.ch',
  '+41 79 123 45 67',
  'Musterstrasse 123, 8000 Zürich, Schweiz',
  'Binso - AI & Automatisierung | KI-Chatbots, Webentwicklung',
  'Professionelle AI-Lösungen und Automatisierung für Schweizer Unternehmen. Chatbots, Webentwicklung und Prozessoptimierung.',
  true, true, true, false,
  NOW(), NOW()
)
ON CONFLICT (id) DO NOTHING;

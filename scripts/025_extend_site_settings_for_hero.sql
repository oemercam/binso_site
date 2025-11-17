-- Erweitere site_settings Tabelle für Hero und weitere Sektionen
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS hero_title TEXT DEFAULT 'Digitale Lösungen mit',
ADD COLUMN IF NOT EXISTS hero_title_highlight TEXT DEFAULT 'KI & Automatisierung',
ADD COLUMN IF NOT EXISTS hero_subtitle TEXT DEFAULT 'Wir entwickeln intelligente Chatbots, automatisieren Ihre Geschäftsprozesse und bauen moderne Web- und Mobile-Apps – damit Sie mehr Zeit für Ihr Kerngeschäft haben.',
ADD COLUMN IF NOT EXISTS hero_cta_primary_text TEXT DEFAULT 'Jetzt Kontakt aufnehmen',
ADD COLUMN IF NOT EXISTS hero_cta_primary_link TEXT DEFAULT '/kontakt',
ADD COLUMN IF NOT EXISTS hero_cta_secondary_text TEXT DEFAULT 'Mehr erfahren',
ADD COLUMN IF NOT EXISTS hero_cta_secondary_link TEXT DEFAULT '/ueber-uns',
ADD COLUMN IF NOT EXISTS footer_tagline TEXT DEFAULT 'Ihr KI-gestützter Entwicklungspartner für hochwertige, skalierbare Plattformen.',
ADD COLUMN IF NOT EXISTS footer_copyright TEXT DEFAULT '© {year} Binso GmbH. Alle Rechte vorbehalten.';

-- Setze initiale Werte falls noch kein Datensatz existiert
INSERT INTO site_settings (id, company_name, hero_title, hero_title_highlight, hero_subtitle)
VALUES (
  gen_random_uuid(),
  'Binso GmbH',
  'Digitale Lösungen mit',
  'KI & Automatisierung',
  'Wir entwickeln intelligente Chatbots, automatisieren Ihre Geschäftsprozesse und bauen moderne Web- und Mobile-Apps – damit Sie mehr Zeit für Ihr Kerngeschäft haben.'
)
ON CONFLICT DO NOTHING;

COMMENT ON COLUMN site_settings.hero_title IS 'Haupttitel der Hero-Section (erste Zeile)';
COMMENT ON COLUMN site_settings.hero_title_highlight IS 'Hervorgehobener Teil des Titels (zweite Zeile)';
COMMENT ON COLUMN site_settings.hero_subtitle IS 'Untertitel/Beschreibung in der Hero-Section';
COMMENT ON COLUMN site_settings.footer_tagline IS 'Tagline im Footer';
COMMENT ON COLUMN site_settings.footer_copyright IS 'Copyright-Text im Footer (verwende {year} für aktuelles Jahr)';

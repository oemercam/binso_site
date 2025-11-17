-- Einstellungen für die gesamte Webseite
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Firmeninformationen
  company_name VARCHAR(200) DEFAULT 'Binso GmbH',
  company_slogan TEXT DEFAULT 'Ihre Digitale Zukunft - Intelligent Automatisiert',
  company_email VARCHAR(200) DEFAULT 'info@binso.ch',
  company_phone VARCHAR(50) DEFAULT '+41 78 927 41 72',
  company_address TEXT DEFAULT 'Zürich, Schweiz',
  
  -- SEO Einstellungen
  meta_title VARCHAR(200) DEFAULT 'Binso - KI & Automatisierung für Schweizer KMUs',
  meta_description TEXT DEFAULT 'Professionelle KI-Integration, WhatsApp Business Automatisierung und massgeschneiderte Softwarelösungen für Schweizer Unternehmen. DSGVO-konform und zuverlässig.',
  meta_keywords TEXT DEFAULT 'KI Chatbot Schweiz, WhatsApp Automatisierung, Web Entwicklung Zürich, App Entwicklung Schweiz',
  meta_author VARCHAR(200) DEFAULT 'Binso GmbH',
  
  -- Social Media
  social_facebook VARCHAR(200),
  social_instagram VARCHAR(200),
  social_linkedin VARCHAR(200),
  social_twitter VARCHAR(200),
  social_youtube VARCHAR(200),
  
  -- Sprach-Einstellungen
  default_language VARCHAR(10) DEFAULT 'de',
  available_languages TEXT DEFAULT 'de,en',
  
  -- Design Einstellungen
  primary_color VARCHAR(7) DEFAULT '#10b981',
  header_visible BOOLEAN DEFAULT true,
  footer_visible BOOLEAN DEFAULT true,
  chatbot_enabled BOOLEAN DEFAULT true,
  
  -- Rechtliches
  privacy_policy_url VARCHAR(200),
  terms_url VARCHAR(200),
  imprint_url VARCHAR(200),
  
  -- Tracking & Analytics
  google_analytics_id VARCHAR(50),
  google_tag_manager_id VARCHAR(50),
  facebook_pixel_id VARCHAR(50),
  
  -- Weitere Einstellungen
  maintenance_mode BOOLEAN DEFAULT false,
  maintenance_message TEXT,
  contact_form_email VARCHAR(200) DEFAULT 'info@binso.ch',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nur eine Zeile für Einstellungen
INSERT INTO site_settings (id) VALUES (gen_random_uuid())
ON CONFLICT DO NOTHING;

-- RLS aktivieren
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann lesen
CREATE POLICY "Einstellungen sind öffentlich lesbar"
ON site_settings FOR SELECT
TO public
USING (true);

-- Policy: Nur admins können aktualisieren
CREATE POLICY "Nur Admins können Einstellungen ändern"
ON site_settings FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = current_setting('request.jwt.claims', true)::json->>'email'
  )
);

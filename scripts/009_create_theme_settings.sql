-- Theme Settings Tabelle
CREATE TABLE IF NOT EXISTS theme_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  type TEXT NOT NULL, -- color, font, image, text
  category TEXT NOT NULL, -- colors, typography, logos, layout
  label TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Standard Theme Settings einfügen
INSERT INTO theme_settings (key, value, type, category, label, description) VALUES
  ('primary_color', '#10b981', 'color', 'colors', 'Primärfarbe', 'Hauptfarbe für Buttons und Links'),
  ('secondary_color', '#000000', 'color', 'colors', 'Sekundärfarbe', 'Sekundäre Akzentfarbe'),
  ('background_color', '#ffffff', 'color', 'colors', 'Hintergrundfarbe', 'Hintergrundfarbe der Webseite'),
  ('text_color', '#000000', 'color', 'colors', 'Textfarbe', 'Primäre Textfarbe'),
  ('heading_font', 'Inter', 'font', 'typography', 'Überschriften-Schrift', 'Schriftart für Überschriften'),
  ('body_font', 'Inter', 'font', 'typography', 'Text-Schrift', 'Schriftart für Fliesstext'),
  ('logo_url', '', 'image', 'logos', 'Haupt-Logo', 'Logo für Header'),
  ('logo_dark_url', '', 'image', 'logos', 'Dunkles Logo', 'Logo für dunklen Hintergrund'),
  ('favicon_url', '', 'image', 'logos', 'Favicon', 'Icon im Browser-Tab')
ON CONFLICT (key) DO NOTHING;

-- RLS Policies
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all" ON theme_settings
  FOR SELECT USING (true);

CREATE POLICY "Enable update for authenticated users" ON theme_settings
  FOR UPDATE USING (true);

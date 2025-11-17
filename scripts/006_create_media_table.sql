-- Medien-Verwaltung Tabelle
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- image, document, video
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL, -- in bytes
  alt_text TEXT,
  title TEXT,
  description TEXT,
  category TEXT, -- logo, team, portfolio, blog, general
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für schnellere Suche
CREATE INDEX IF NOT EXISTS idx_media_category ON media(category);
CREATE INDEX IF NOT EXISTS idx_media_file_type ON media(file_type);

-- RLS Policies
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON media
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON media
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON media
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated users only" ON media
  FOR DELETE USING (true);

-- Admin Benutzer Tabelle
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Portfolio Projekte Tabelle
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT NOT NULL,
  client TEXT,
  date TEXT,
  technologies TEXT[], -- Array von Technologien
  results JSONB, -- Flexible Struktur für Projekt-Resultate
  features TEXT[], -- Array von Features
  website_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dienstleistungen Tabelle
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  icon TEXT NOT NULL,
  benefits JSONB, -- Array von Vorteilen
  features JSONB, -- Array von Features
  process_steps JSONB, -- 4 Prozess-Schritte
  use_cases TEXT[],
  price_from INTEGER,
  price_note TEXT,
  published BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Mitglieder Tabelle
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  email TEXT,
  linkedin TEXT,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referenzen/Testimonials Tabelle
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL,
  client_company TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  image_url TEXT,
  project_reference TEXT,
  published BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ Tabelle
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kontaktformular-Einträge Tabelle
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vorname TEXT NOT NULL,
  nachname TEXT NOT NULL,
  email TEXT NOT NULL,
  telefon TEXT,
  firma TEXT,
  nachricht TEXT NOT NULL,
  status TEXT DEFAULT 'neu',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_published ON portfolio_projects(published);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(published);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);

-- RLS (Row Level Security) Policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Admin Benutzer können alles lesen und schreiben
CREATE POLICY "Admins können alles in portfolio_projects" ON portfolio_projects
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admins können alles in services" ON services
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admins können alles in team_members" ON team_members
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admins können alles in testimonials" ON testimonials
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admins können alles in faqs" ON faqs
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admins können alles in contact_submissions" ON contact_submissions
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

-- Öffentlicher Lesezugriff für publizierte Inhalte
CREATE POLICY "Öffentlicher Lesezugriff auf publizierte Portfolios" ON portfolio_projects
  FOR SELECT USING (published = true);

CREATE POLICY "Öffentlicher Lesezugriff auf publizierte Services" ON services
  FOR SELECT USING (published = true);

CREATE POLICY "Öffentlicher Lesezugriff auf publizierte Team-Mitglieder" ON team_members
  FOR SELECT USING (published = true);

CREATE POLICY "Öffentlicher Lesezugriff auf publizierte Testimonials" ON testimonials
  FOR SELECT USING (published = true);

CREATE POLICY "Öffentlicher Lesezugriff auf publizierte FAQs" ON faqs
  FOR SELECT USING (published = true);

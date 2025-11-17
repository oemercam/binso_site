# binso - IT Dienstleistungen Landing Page & Portfolio

Moderne, hochperformante Website für IT-Dienstleistungen mit vollständigem Admin-Dashboard.

## 🚀 Funktionen

### Frontend
- ✅ Responsive Next.js 15 Landing Page
- ✅ AI-Chatbot Integration (GPT-4)
- ✅ Portfolio mit dynamischen Detailseiten
- ✅ Dienstleistungs-Übersicht
- ✅ Team-Sektion
- ✅ Kundenstimmen (Testimonials)
- ✅ FAQ-Bereich
- ✅ Kontaktformular mit Spam-Schutz
- ✅ Dark Mode Unterstützung
- ✅ Cookie Banner (DSGVO-konform)

### Admin Dashboard
- ✅ Vollständiges CMS für alle Inhalte
- ✅ Portfolio-Verwaltung
- ✅ Dienstleistungs-Management
- ✅ Team-Mitglieder verwalten
- ✅ Kundenstimmen bearbeiten
- ✅ FAQ-Editor
- ✅ Blog-System
- ✅ Medien-Bibliothek
- ✅ Analytics Dashboard
- ✅ Theme-Verwaltung
- ✅ Einstellungen (SEO, Social Media, etc.)

### Sicherheit
- ✅ Passwort-Komplexitäts-Validierung
- ✅ Brute-Force-Schutz
- ✅ Session-Management mit automatischem Logout
- ✅ Aktivitäts-Protokoll (Audit Trail)
- ✅ Security Headers (HSTS, CSP, etc.)
- ✅ CSRF-Schutz
- ✅ XSS & SQL-Injection-Schutz
- ✅ Rate Limiting

### Performance & SEO
- ✅ Lighthouse Score > 90
- ✅ Automatische Sitemap-Generierung
- ✅ robots.txt
- ✅ Strukturierte Daten (Schema.org)
- ✅ OpenGraph & Twitter Cards
- ✅ Vercel Analytics Integration
- ✅ Speed Insights

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **UI Komponenten:** Radix UI + shadcn/ui
- **Datenbank:** Supabase (PostgreSQL)
- **Authentifizierung:** Supabase Auth
- **Deployment:** Vercel
- **AI:** OpenAI GPT-4
- **Analytics:** Vercel Analytics

## 📦 Installation

\`\`\`bash
# Repository klonen
git clone <ihr-repo>
cd binso-website

# Abhängigkeiten installieren
npm install

# Umgebungsvariablen kopieren
cp .env.example .env.local

# Entwicklungsserver starten
npm run dev
\`\`\`

## 🔧 Umgebungsvariablen

Erstellen Sie eine `.env.local` Datei mit folgenden Variablen:

\`\`\`env
# Website
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=ihre-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ihr-anon-key
SUPABASE_SERVICE_ROLE_KEY=ihr-service-role-key

# Datenbank
DATABASE_URL=ihre-database-url

# OpenAI (für Chatbot)
OPENAI_API_KEY=ihr-openai-key

# Optional
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ihr-verification-code
\`\`\`

## 📊 Datenbank Einrichtung

1. Supabase Projekt erstellen auf [supabase.com](https://supabase.com)
2. SQL-Scripts ausführen in folgender Reihenfolge:

\`\`\`bash
scripts/001_create_admin_tables.sql
scripts/002_seed_admin_user.sql
scripts/005_create_settings_table.sql
scripts/006_create_media_table.sql
scripts/007_create_analytics_tables.sql
scripts/008_create_blog_tables.sql
scripts/009_create_theme_settings.sql
\`\`\`

3. Standard-Admin-Login:
   - E-Mail: `demo@binso.ch`
   - Passwort: `Demo123!`
   - **⚠️ Passwort sofort ändern nach erstem Login!**

## 🚀 Deployment

### Vercel Deployment (Empfohlen)

1. Repository mit Vercel verbinden
2. Umgebungsvariablen in Vercel setzen
3. Deployen!

\`\`\`bash
# Oder manuell deployen
vercel --prod
\`\`\`

### Plesk Deployment

Für detaillierte Anleitung siehe **[PLESK_DEPLOYMENT.md](PLESK_DEPLOYMENT.md)**

Kurzanleitung:
1. ZIP herunterladen und auf Server hochladen
2. Node.js 18.17+ in Plesk aktivieren
3. Umgebungsvariablen in Plesk setzen
4. `npm run plesk:build` ausführen
5. App mit `npm run plesk:start` starten

## 📱 Admin Dashboard

Zugriff: `https://ihre-domain.ch/admin/login`

### Funktionen:
- Dashboard mit Statistiken
- Content-Management für alle Bereiche
- Medien-Bibliothek mit Upload
- Analytics mit Diagrammen
- Blog-Editor
- Theme-Einstellungen
- Audit-Protokoll für alle Änderungen
- Profil-Verwaltung

## 🔒 Sicherheit

- Alle Passwörter müssen mindestens 10 Zeichen haben
- Brute-Force-Schutz: Max. 5 Versuche, dann 15min Sperrung
- Sessions laufen nach 30min Inaktivität ab
- Alle Admin-Aktionen werden protokolliert
- Security Headers implementiert
- HTTPS erzwungen
- CSRF-Schutz aktiv

## 📈 Performance

- Lighthouse Performance Score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

## 📝 Lizenz

Urheberrechtlich geschützt - binso

## 🤝 Support

Bei Fragen: info@binso.ch

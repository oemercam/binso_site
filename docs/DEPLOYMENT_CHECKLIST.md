# Deployment Checklist für Automatic Agency

## Vor dem Go-Live

### 1. Environment Variables setzen
- [ ] `NEXT_PUBLIC_SITE_URL` - Produktions-URL
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Supabase Projekt URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase Anon Key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase Service Role Key
- [ ] `DATABASE_URL` - Datenbank Connection String
- [ ] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google Search Console Verification (optional)

### 2. Datenbank Setup
- [ ] Alle SQL-Scripts ausgeführt (001-011)
- [ ] Admin-User erstellt
- [ ] Demo-Daten importiert (Services, Team, FAQs, etc.)
- [ ] Backups aktiviert

### 3. SEO & Analytics
- [ ] Sitemap generiert und getestet: `/sitemap.xml`
- [ ] robots.txt korrekt: `/robots.txt`
- [ ] OG-Image erstellt: `/og-image.jpg`
- [ ] Google Search Console hinzugefügt
- [ ] Vercel Analytics aktiviert
- [ ] Speed Insights aktiviert

### 4. Sicherheit
- [ ] Alle Security Headers aktiv (check mit securityheaders.com)
- [ ] HTTPS erzwungen
- [ ] Admin-Passwort geändert (min. 10 Zeichen)
- [ ] 2FA aktiviert (falls implementiert)
- [ ] Rate Limiting getestet
- [ ] CSRF-Schutz aktiv

### 5. Performance
- [ ] Lighthouse Score > 90
- [ ] Core Web Vitals optimiert
- [ ] Bilder optimiert (WebP/AVIF)
- [ ] Lazy Loading aktiviert
- [ ] Edge Caching getestet

### 6. Content
- [ ] Alle Platzhalter-Texte ersetzt
- [ ] Team-Fotos hochgeladen
- [ ] Portfolio-Projekte hinzugefügt
- [ ] FAQs ausgefüllt
- [ ] Kontakt-Informationen korrekt
- [ ] Impressum & Datenschutz aktualisiert

### 7. Funktionalität
- [ ] Kontaktformular getestet
- [ ] WhatsApp-Link funktioniert
- [ ] Chatbot antwortet korrekt
- [ ] Alle Admin-Bereiche getestet
- [ ] Login/Logout funktioniert
- [ ] Session-Timeout getestet

### 8. Domain & DNS
- [ ] Domain registriert
- [ ] DNS auf Vercel gezeigt
- [ ] www → apex Redirect
- [ ] SSL-Zertifikat aktiv

### 9. Monitoring
- [ ] Error Tracking eingerichtet (Sentry optional)
- [ ] Uptime Monitoring aktiv
- [ ] Vercel Deployment Notifications aktiv

### 10. Post-Launch
- [ ] Google Search Console Property erstellt
- [ ] Sitemap bei Google eingereicht
- [ ] Backup-Schedule verifiziert
- [ ] Admin-Zugriffe dokumentiert

## Wichtige URLs nach Deployment

- Webseite: `https://your-domain.com`
- Admin: `https://your-domain.com/admin/login`
- Sitemap: `https://your-domain.com/sitemap.xml`
- Robots: `https://your-domain.com/robots.txt`

## Notfall-Kontakte

- Vercel Support: https://vercel.com/help
- Supabase Support: https://supabase.com/support
- Domain Provider: [Ihr Provider]

## Performance Targets

- Lighthouse Performance: > 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

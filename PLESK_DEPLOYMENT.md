# Plesk Deployment Anleitung für Binso AI

## Voraussetzungen

- Plesk Server mit Node.js Support (mindestens Node.js 18.17 oder höher)
- SSH-Zugriff auf den Server
- Domain bereits in Plesk konfiguriert

## Schritt 1: Projekt herunterladen

1. In v0 auf die **drei Punkte (⋮)** oben rechts klicken
2. **"Download ZIP"** auswählen
3. ZIP-Datei lokal entpacken

## Schritt 2: Umgebungsvariablen vorbereiten

Erstelle eine `.env.local` Datei mit folgenden Werten:

\`\`\`env
# Production URL (deine Domain)
NEXT_PUBLIC_APP_URL=https://deine-domain.ch
NEXT_PUBLIC_API_URL=https://deine-domain.ch/api

# Supabase Credentials (aus der v0 Integration kopieren)
SUPABASE_URL=deine_supabase_url
NEXT_PUBLIC_SUPABASE_URL=deine_supabase_url
SUPABASE_ANON_KEY=deine_supabase_anon_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=deine_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=deine_supabase_service_role_key

# Postgres (aus Supabase)
POSTGRES_URL=deine_postgres_url
POSTGRES_PRISMA_URL=deine_postgres_prisma_url
POSTGRES_URL_NON_POOLING=deine_postgres_url_non_pooling
POSTGRES_USER=deine_postgres_user
POSTGRES_PASSWORD=deine_postgres_password
POSTGRES_DATABASE=deine_postgres_database
POSTGRES_HOST=deine_postgres_host

# Production Settings
NODE_ENV=production
VERCEL_ENV=production
NEXT_PUBLIC_MAINTENANCE_MODE=false
\`\`\`

## Schritt 3: Projekt auf Server hochladen

### Option A: Via Plesk File Manager
1. In Plesk zu **Dateien** navigieren
2. Zu `/httpdocs` oder `/your-domain/httpdocs` wechseln
3. ZIP hochladen und entpacken

### Option B: Via SSH/SFTP
\`\`\`bash
# Via SCP hochladen
scp -r /pfad/zum/projekt/* user@server:/var/www/vhosts/deine-domain.ch/httpdocs/

# Oder via SFTP Client (FileZilla, Cyberduck, etc.)
\`\`\`

## Schritt 4: In Plesk konfigurieren

### Node.js aktivieren

1. In Plesk zur Domain navigieren
2. **"Node.js"** auswählen
3. Node.js Version **18.17+** oder höher auswählen
4. **Application Mode:** Production
5. **Application Root:** `/httpdocs` (oder wo das Projekt liegt)
6. **Application Startup File:** `server.js`
7. **"Enable Node.js"** aktivieren

### Umgebungsvariablen in Plesk setzen

1. Im Node.js Bereich nach unten scrollen
2. **Environment Variables** Sektion finden
3. Alle Variablen aus `.env.local` einzeln hinzufügen:
   - Name: `NEXT_PUBLIC_APP_URL`
   - Value: `https://deine-domain.ch`
   - Auf **+** klicken für weitere Variablen

## Schritt 5: Projekt bauen und starten

### Via SSH auf dem Server:

\`\`\`bash
# Zum Projekt-Verzeichnis wechseln
cd /var/www/vhosts/deine-domain.ch/httpdocs

# Dependencies installieren
npm install --production=false

# Production Build erstellen
npm run build

# Starten (wird automatisch von Plesk gehandelt)
npm start
\`\`\`

### Via Plesk Node.js Interface:

1. Im Node.js Bereich auf **"NPM Install"** klicken
2. Warten bis Dependencies installiert sind
3. Im Custom Script Bereich eingeben: `npm run build`
4. Auf **"Run Script"** klicken
5. Nach erfolgreichem Build auf **"Restart App"** klicken

## Schritt 6: Domain & SSL konfigurieren

1. In Plesk zu **"Hosting-Einstellungen"** navigieren
2. **SSL/TLS-Zertifikat** aktivieren (Let's Encrypt kostenlos)
3. **"HTTP zu HTTPS umleiten"** aktivieren
4. Document Root sollte auf `/httpdocs` zeigen

## Schritt 7: Reverse Proxy einrichten (wenn nötig)

In Plesk zu **Apache & nginx Einstellungen** → **Zusätzliche nginx-Anweisungen**:

\`\`\`nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
\`\`\`

## Schritt 8: Datenbank initialisieren

Falls noch nicht geschehen, SQL-Skripte ausführen:

\`\`\`bash
# Via SSH mit psql
psql $POSTGRES_URL -f scripts/init-database.sql
psql $POSTGRES_URL -f scripts/add-portfolio-demo-projects.sql
psql $POSTGRES_URL -f scripts/update-faq-categories.sql
\`\`\`

Oder über Supabase Dashboard → SQL Editor

## Schritt 9: Testen

1. Öffne `https://deine-domain.ch` im Browser
2. Teste alle Funktionen:
   - Kontaktformular
   - Portfolio-Seiten
   - Admin-Bereich (falls vorhanden)
   - Responsive Design

## Troubleshooting

### App startet nicht
- Logs in Plesk prüfen: **Node.js → Logs**
- Node.js Version prüfen (mindestens 18.17)
- Umgebungsvariablen prüfen

### Build-Fehler
\`\`\`bash
# Cache löschen und neu bauen
rm -rf .next
npm run build
\`\`\`

### 502 Bad Gateway
- Node.js App läuft nicht → in Plesk neustarten
- Port 3000 bereits belegt → anderen Port in server.js konfigurieren

### Datenbank-Verbindungsfehler
- Umgebungsvariablen überprüfen
- Supabase erlaubt Server-IP in Network Restrictions

## Performance-Optimierungen

1. **PM2 Process Manager** verwenden (in Plesk unter Node.js)
2. **CDN** für statische Assets aktivieren
3. **Caching** in nginx konfigurieren
4. **Image Optimization** ist bereits aktiviert

## Support

Bei Problemen:
- Plesk Logs prüfen
- Browser Console prüfen
- Next.js Build-Logs prüfen

## Wichtige Dateien

- `server.js` - Custom Server für Plesk
- `.env.local` - Umgebungsvariablen (nicht committen!)
- `package.json` - Dependencies und Scripts
- `next.config.mjs` - Next.js Konfiguration

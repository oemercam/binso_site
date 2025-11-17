# Demo-User Setup Anleitung

Für die Entwicklung und Testing-Phase steht ein Demo-Admin-User zur Verfügung.

## Zugangsdaten

- **E-Mail:** demo@binso.ch
- **Passwort:** Demo123!@Secure

## Setup-Schritte

### Option 1: Über Supabase Dashboard (Empfohlen)

1. Gehe zum Supabase Dashboard → Authentication → Users
2. Klicke auf "Add user" → "Create new user"
3. Gebe die folgenden Daten ein:
   - Email: `demo@binso.ch`
   - Password: `Demo123!@Secure`
   - Setze "Auto Confirm User" auf true
4. Klicke auf "Create user"
5. Führe das SQL-Script aus: `scripts/021_create_demo_admin_user.sql`

### Option 2: Über Supabase Admin API

Verwende die Supabase Admin API um den User programmatisch zu erstellen:

\`\`\`bash
curl -X POST 'https://YOUR_PROJECT_URL.supabase.co/auth/v1/admin/users' \
  -H "apikey: YOUR_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@binso.ch",
    "password": "Demo123!@Secure",
    "email_confirm": true,
    "user_metadata": {
      "role": "admin",
      "name": "Demo Admin"
    }
  }'
\`\`\`

Dann führe das SQL-Script aus: `scripts/021_create_demo_admin_user.sql`

## Login

Nach dem Setup kannst du dich auf `/admin/login` mit dem One-Click-Button "Demo-Login" anmelden.

## Sicherheitshinweis

**WICHTIG:** Vor dem produktiven Betrieb:
1. Lösche oder deaktiviere den Demo-User
2. Ändere alle Standard-Passwörter
3. Erstelle produktive Admin-Accounts mit sicheren Passwörtern
4. Entferne den One-Click-Demo-Login-Button aus der Login-Seite

-- Behebe Demo-Admin Berechtigungen durch Deaktivierung von RLS auf admin_users
-- Dies behebt die infinite recursion und ermöglicht dem Demo-Admin vollen Zugriff

-- Schritt 1: Lösche alle RLS Policies von admin_users
DROP POLICY IF EXISTS "Admins können admin_users aktualisieren" ON admin_users;
DROP POLICY IF EXISTS "Admins können admin_users erstellen" ON admin_users;
DROP POLICY IF EXISTS "Admins können alle admin_users sehen" ON admin_users;
DROP POLICY IF EXISTS "Super-Admins können admin_users löschen" ON admin_users;

-- Schritt 2: Deaktiviere RLS auf admin_users komplett
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Erfolgsmeldung
SELECT 'Demo-Admin Berechtigungen erfolgreich konfiguriert!' as message;

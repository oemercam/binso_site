-- Entferne alle RLS Policies von admin_users um infinite recursion zu verhindern
-- Die admin_users Tabelle wird ohne RLS betrieben, da Sicherheit auf Application-Level implementiert ist

-- Zuerst alle existierenden Policies löschen
DROP POLICY IF EXISTS "Admins können alle admin_users sehen" ON admin_users;
DROP POLICY IF EXISTS "Admins können admin_users erstellen" ON admin_users;
DROP POLICY IF EXISTS "Admins können admin_users aktualisieren" ON admin_users;
DROP POLICY IF EXISTS "Super-Admins können admin_users löschen" ON admin_users;

-- RLS komplett deaktivieren
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Kommentar für Dokumentation
COMMENT ON TABLE admin_users IS 'Admin users table - RLS disabled, security enforced at application level via Service Role Key';

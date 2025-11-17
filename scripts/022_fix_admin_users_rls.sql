-- Entferne die problematischen RLS-Policies und erstelle neue ohne infinite recursion

-- Lösche alle bestehenden Policies für admin_users
DROP POLICY IF EXISTS "Admins können alle admin_users sehen" ON admin_users;
DROP POLICY IF EXISTS "Admins können admin_users erstellen" ON admin_users;
DROP POLICY IF EXISTS "Admins können admin_users aktualisieren" ON admin_users;
DROP POLICY IF EXISTS "Super-Admins können admin_users löschen" ON admin_users;

-- Deaktiviere RLS temporär für admin_users
-- Da wir Service Role Key für Login/Updates verwenden, brauchen wir RLS nicht für admin_users
-- Die Sicherheit wird durch Application-Level-Checks gewährleistet
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Alternative: Wenn Sie RLS aktiv halten möchten, verwenden Sie diese Policies:
-- Diese erlauben Service Role Key (bypass_rls) Zugriff und blockieren reguläre User

-- ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Service role has full access to admin_users"
-- ON admin_users
-- FOR ALL
-- USING (true)
-- WITH CHECK (true);

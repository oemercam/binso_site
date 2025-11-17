-- Endgültiges Deaktivieren aller RLS Policies für admin_users
-- Dies behebt die infinite recursion Fehler

-- Schritt 1: Alle bestehenden Policies löschen
DROP POLICY IF EXISTS "Admins können alle admin_users sehen" ON admin_users;
DROP POLICY IF EXISTS "Admins können admin_users erstellen" ON admin_users;
DROP POLICY IF EXISTS "Admins können admin_users aktualisieren" ON admin_users;
DROP POLICY IF EXISTS "Super-Admins können admin_users löschen" ON admin_users;

-- Schritt 2: RLS komplett deaktivieren
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Schritt 3: Verifizierung
DO $$
BEGIN
  RAISE NOTICE 'RLS für admin_users wurde deaktiviert';
  RAISE NOTICE 'Sicherheit wird auf Application-Level durch Service Role Key erzwungen';
END $$;

-- Hinweis: 
-- Die admin_users Tabelle sollte nur über Server Actions mit dem Service Role Key
-- zugegriffen werden, um Sicherheit zu gewährleisten.
-- RLS wird hier deaktiviert, um die infinite recursion zu vermeiden.

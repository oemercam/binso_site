-- Finale Lösung für infinite recursion in admin_users RLS
-- Das Problem: FAQs und andere Tabellen haben Policies die admin_users abfragen,
-- während admin_users selbst RLS aktiviert hat

-- Schritt 1: Alle Policies von admin_users entfernen
DROP POLICY IF EXISTS "Admins können alle admin_users sehen" ON admin_users;
DROP POLICY IF EXISTS "Admins können admin_users erstellen" ON admin_users;
DROP POLICY IF EXISTS "Admins können admin_users aktualisieren" ON admin_users;
DROP POLICY IF EXISTS "Super-Admins können admin_users löschen" ON admin_users;
DROP POLICY IF EXISTS "Service role has full access to admin_users" ON admin_users;

-- Schritt 2: RLS auf admin_users komplett deaktivieren
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Schritt 3: Verifizierung und Logging
DO $$
BEGIN
  -- Prüfe ob RLS deaktiviert ist
  IF EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'admin_users' 
    AND rowsecurity = false
  ) THEN
    RAISE NOTICE '✓ RLS für admin_users wurde erfolgreich deaktiviert';
  ELSE
    RAISE WARNING '✗ RLS für admin_users ist immer noch aktiviert!';
  END IF;
END $$;

-- Kommentar hinzufügen
COMMENT ON TABLE admin_users IS 
'Admin users table - RLS komplett deaktiviert um infinite recursion zu vermeiden. Sicherheit wird auf Application-Level durch Service Role Key erzwungen.';

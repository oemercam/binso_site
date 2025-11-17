-- Script zum Erstellen des Demo-Admin-Users
-- Dieser User kann für Entwicklung und Testing verwendet werden
-- WICHTIG: Vor dem produktiven Betrieb sollte dieser User gelöscht oder deaktiviert werden

-- Hinweis: Dieses Script erstellt nur den Eintrag in admin_users
-- Der eigentliche Auth-User muss über die Supabase Dashboard oder API erstellt werden

-- Prüfen ob Demo-User bereits existiert
DO $$
DECLARE
  demo_user_id uuid;
BEGIN
  -- Versuche, die User-ID aus auth.users zu holen
  SELECT id INTO demo_user_id
  FROM auth.users
  WHERE email = 'demo@binso.ch'
  LIMIT 1;

  -- Wenn User in auth.users existiert, erstelle Eintrag in admin_users
  IF demo_user_id IS NOT NULL THEN
    INSERT INTO admin_users (id, email, name, role, created_at)
    VALUES (
      demo_user_id,
      'demo@binso.ch',
      'Demo Admin',
      'admin',
      NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET
      name = 'Demo Admin',
      role = 'admin',
      email = 'demo@binso.ch';

    RAISE NOTICE 'Demo-Admin-User in admin_users aktualisiert/erstellt';
  ELSE
    RAISE NOTICE 'Auth-User demo@binso.ch existiert noch nicht. Bitte zuerst über Supabase Dashboard erstellen.';
    RAISE NOTICE 'E-Mail: demo@binso.ch';
    RAISE NOTICE 'Passwort: Demo123!@Secure';
  END IF;
END $$;

-- Audit-Log für Setup
INSERT INTO audit_logs (
  user_email,
  action,
  table_name,
  new_data,
  created_at
)
VALUES (
  'system',
  'setup',
  'admin_users',
  jsonb_build_object(
    'action', 'demo_user_setup',
    'email', 'demo@binso.ch'
  ),
  NOW()
);

-- Aktiviere RLS für Admin-Tabellen und füge strikte Security Policies hinzu

-- Aktiviere RLS für admin_sessions
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Aktiviere RLS für audit_logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Aktiviere RLS für login_attempts
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- ADMIN_USERS POLICIES
-- ==========================================

-- Policy: Admins können alle Admin-User sehen
CREATE POLICY "Admins können alle admin_users sehen"
ON admin_users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.id = auth.uid()
  )
);

-- Policy: Admins können Admin-User erstellen
CREATE POLICY "Admins können admin_users erstellen"
ON admin_users
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.id = auth.uid()
    AND au.role = 'super_admin'
  )
);

-- Policy: Admins können eigene Daten und Super-Admins alle Daten aktualisieren
CREATE POLICY "Admins können admin_users aktualisieren"
ON admin_users
FOR UPDATE
USING (
  -- Eigene Daten oder Super-Admin
  id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.id = auth.uid()
    AND au.role = 'super_admin'
  )
);

-- Policy: Nur Super-Admins können Admin-User löschen
CREATE POLICY "Super-Admins können admin_users löschen"
ON admin_users
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.id = auth.uid()
    AND au.role = 'super_admin'
  )
);

-- ==========================================
-- ADMIN_SESSIONS POLICIES
-- ==========================================

-- Policy: Admins können nur ihre eigenen Sessions sehen
CREATE POLICY "Admins können eigene admin_sessions sehen"
ON admin_sessions
FOR SELECT
USING (
  user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.id = auth.uid()
    AND au.role = 'super_admin'
  )
);

-- Policy: System kann Sessions erstellen (via Service Role)
CREATE POLICY "System kann admin_sessions erstellen"
ON admin_sessions
FOR INSERT
WITH CHECK (true); -- Wird über Service Role Key gesteuert

-- Policy: Admins können eigene Sessions aktualisieren
CREATE POLICY "Admins können eigene admin_sessions aktualisieren"
ON admin_sessions
FOR UPDATE
USING (
  user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.id = auth.uid()
    AND au.role = 'super_admin'
  )
);

-- Policy: Admins können eigene Sessions löschen
CREATE POLICY "Admins können eigene admin_sessions löschen"
ON admin_sessions
FOR DELETE
USING (
  user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.id = auth.uid()
    AND au.role = 'super_admin'
  )
);

-- ==========================================
-- AUDIT_LOGS POLICIES
-- ==========================================

-- Policy: Admins können alle Audit-Logs lesen
CREATE POLICY "Admins können audit_logs lesen"
ON audit_logs
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.id = auth.uid()
  )
);

-- Policy: System kann Audit-Logs erstellen (via Service Role)
CREATE POLICY "System kann audit_logs erstellen"
ON audit_logs
FOR INSERT
WITH CHECK (true); -- Wird über Service Role Key gesteuert

-- Policy: Niemand kann Audit-Logs ändern (Integrität)
-- Keine UPDATE oder DELETE Policies = keine Änderungen möglich

-- ==========================================
-- LOGIN_ATTEMPTS POLICIES
-- ==========================================

-- Policy: Super-Admins können Login-Attempts sehen
CREATE POLICY "Super-Admins können login_attempts sehen"
ON login_attempts
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.id = auth.uid()
    AND au.role = 'super_admin'
  )
);

-- Policy: System kann Login-Attempts erstellen (via Service Role)
CREATE POLICY "System kann login_attempts erstellen"
ON login_attempts
FOR INSERT
WITH CHECK (true); -- Wird über Service Role Key gesteuert

-- Policy: Super-Admins können alte Login-Attempts löschen (Cleanup)
CREATE POLICY "Super-Admins können alte login_attempts löschen"
ON login_attempts
FOR DELETE
USING (
  created_at < NOW() - INTERVAL '90 days'
  AND EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.id = auth.uid()
    AND au.role = 'super_admin'
  )
);

-- ==========================================
-- INDEXES für Performance
-- ==========================================

-- Index für schnellere Session-Lookups
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);

-- Index für Audit-Log-Suchen
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_action ON audit_logs(table_name, action);

-- Index für Login-Attempt-Analysen
CREATE INDEX IF NOT EXISTS idx_login_attempts_email_created ON login_attempts(email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_created ON login_attempts(ip_address, created_at DESC);

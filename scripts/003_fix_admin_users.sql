-- Füge fehlende Spalten zur admin_users Tabelle hinzu
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'admin';

-- Update existing records
UPDATE admin_users SET role = 'admin' WHERE role IS NULL;

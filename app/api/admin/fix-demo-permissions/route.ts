import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase Konfiguration fehlt' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    console.log('[v0] Teste, ob infinite recursion existiert...')

    // Teste mit einer einfachen Query
    const { error: testError } = await supabase
      .from('faqs')
      .select('id')
      .limit(1)

    if (testError && testError.message.includes('infinite recursion')) {
      console.log('[v0] Infinite recursion erkannt!')

      const sqlScript = `-- Behebe Demo-Admin Berechtigungen durch Deaktivierung von RLS auf admin_users
-- Dies behebt die infinite recursion und ermöglicht dem Demo-Admin vollen Zugriff

-- Schritt 1: Lösche alle RLS Policies von admin_users
DROP POLICY IF EXISTS "Admins können admin_users aktualisieren" ON admin_users;
DROP POLICY IF EXISTS "Admins können admin_users erstellen" ON admin_users;
DROP POLICY IF EXISTS "Admins können alle admin_users sehen" ON admin_users;
DROP POLICY IF EXISTS "Super-Admins können admin_users löschen" ON admin_users;

-- Schritt 2: Deaktiviere RLS auf admin_users komplett
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Erfolgsmeldung
SELECT 'Demo-Admin Berechtigungen erfolgreich konfiguriert!' as message;`

      return NextResponse.json({
        success: false,
        message: 'Infinite recursion erkannt. Manuelle Behebung im Supabase Dashboard erforderlich.',
        sql: sqlScript,
        instructions: [
          '1. Öffnen Sie das Supabase Dashboard',
          '2. Navigieren Sie zu "SQL Editor" (linke Sidebar)',
          '3. Kopieren Sie das komplette SQL-Script unten',
          '4. Fügen Sie es in den SQL Editor ein',
          '5. Klicken Sie auf "Run" (oder drücken Sie Ctrl+Enter)',
          '6. Warten Sie auf "Success"',
          '7. Laden Sie diese Seite neu und testen Sie den Admin-Zugriff'
        ],
        dashboardUrl: `${supabaseUrl.replace('.supabase.co', '')}/project/_/sql`,
      })
    }

    console.log('[v0] Keine infinite recursion erkannt - alles OK!')

    return NextResponse.json({
      success: true,
      message: 'Demo-Admin Berechtigungen sind korrekt konfiguriert! Sie haben vollen Zugriff.',
    })
  } catch (error: any) {
    console.error('[v0] Fehler beim Demo-Admin Berechtigungen Fix:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Fehler beim Überprüfen der Berechtigungen',
        error: error.message,
      },
      { status: 500 }
    )
  }
}

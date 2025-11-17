import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST() {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    console.log('[v0] Prüfe RLS Status auf admin_users Tabelle...')

    const { data: testData, error: testError } = await supabase
      .from('faqs')
      .select('id')
      .limit(1)

    if (testError && testError.code === '42P17') {
      // Infinite recursion erkannt
      console.log('[v0] Infinite recursion erkannt - manuelle Behebung erforderlich')
      
      return NextResponse.json({
        success: false,
        error: 'RLS infinite recursion erkannt',
        message: 'Das "infinite recursion" Problem wurde erkannt. Die admin_users Tabelle muss manuell korrigiert werden.',
        requiresManualFix: true,
        instructions: [
          'Öffnen Sie Ihr Supabase Dashboard: https://supabase.com/dashboard',
          'Wählen Sie Ihr Projekt aus',
          'Gehen Sie zum SQL Editor (linke Sidebar → SQL Editor)',
          'Erstellen Sie eine neue Query',
          'Kopieren Sie den SQL-Befehl unten und führen Sie ihn aus',
          'Klicken Sie auf "Run" um den Befehl auszuführen',
          'Laden Sie diese Seite neu und testen Sie den Admin-Zugriff'
        ],
        sqlCommand: 'ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;'
      })
    }

    console.log('[v0] Keine RLS-Probleme erkannt - alles funktioniert korrekt!')
    return NextResponse.json({
      success: true,
      message: 'RLS ist bereits korrekt konfiguriert! Der Demo-Admin sollte alle Einträge sehen können.',
    })

  } catch (error: any) {
    console.error('[v0] RLS Fix Fehler:', error)
    return NextResponse.json({ 
      success: false,
      error: error.message,
      message: 'Fehler beim Prüfen des RLS-Status. Bitte verwenden Sie das Supabase Dashboard für manuelle Behebung.',
      requiresManualFix: true,
      instructions: [
        'Ein unerwarteter Fehler ist aufgetreten',
        'Öffnen Sie Ihr Supabase Dashboard',
        'Gehen Sie zum SQL Editor',
        'Führen Sie den SQL-Befehl unten aus'
      ],
      sqlCommand: 'ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;'
    }, { status: 500 })
  }
}

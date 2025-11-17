import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    const categoryMapping = {
      'Allgemein': 'ki-chatbots',
      'Preise': 'preise-ablauf',
      'Technik': 'web-apps',
      'Support': 'automatisierung',
    }

    let updated = 0
    for (const [oldCategory, newCategory] of Object.entries(categoryMapping)) {
      const { error } = await supabase
        .from('faqs')
        .update({ category: newCategory })
        .eq('category', oldCategory)

      if (!error) {
        updated++
      }
    }

    return NextResponse.json({
      success: true,
      message: `${updated} FAQ-Kategorien wurden aktualisiert.`,
    })
  } catch (error: any) {
    console.error('[v0] FAQ-Kategorie-Update Fehler:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function POST() {
  try {
    const supabase = getSupabaseAdmin()

    const { error: sqlError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE site_settings 
        ADD COLUMN IF NOT EXISTS hero_title TEXT,
        ADD COLUMN IF NOT EXISTS hero_title_highlight TEXT,
        ADD COLUMN IF NOT EXISTS hero_subtitle TEXT,
        ADD COLUMN IF NOT EXISTS hero_cta_primary_text TEXT,
        ADD COLUMN IF NOT EXISTS hero_cta_primary_link TEXT,
        ADD COLUMN IF NOT EXISTS hero_cta_secondary_text TEXT,
        ADD COLUMN IF NOT EXISTS hero_cta_secondary_link TEXT,
        ADD COLUMN IF NOT EXISTS footer_tagline TEXT,
        ADD COLUMN IF NOT EXISTS footer_copyright TEXT;
      `
    })

    if (sqlError) {
      console.error('SQL Error:', sqlError)
      return NextResponse.json(
        { success: false, error: 'Schema setup failed. You may need to run the SQL script manually in Supabase.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Schema successfully updated with Hero and Footer fields'
    })
  } catch (error: any) {
    console.error('Schema setup error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Schema setup failed' },
      { status: 500 }
    )
  }
}

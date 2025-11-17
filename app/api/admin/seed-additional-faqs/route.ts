import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function POST() {
  try {
    const supabase = getSupabaseAdmin()

    // Neue FAQs für jede Kategorie
    const additionalFaqs = [
      // KI-Chatbots - mindestens 3
      {
        question: "Kann der Chatbot in meine bestehende Website integriert werden?",
        answer: "Ja, absolut! Unsere Chatbots lassen sich nahtlos in jede Website integrieren - egal ob WordPress, Shopify, Custom-CMS oder statische HTML-Seiten. Die Integration erfolgt über ein einfaches Code-Snippet.",
        category: "ki-chatbots",
        published: true,
        order_index: 10,
        sort_order: 10
      },
      {
        question: "Wie trainiere ich meinen KI-Chatbot?",
        answer: "Sie stellen uns Ihre Wissensbasis zur Verfügung (FAQ, Produktinfos, PDFs) und wir trainieren den Chatbot darauf. Danach können Sie über ein Dashboard selbst Antworten anpassen und neue Inhalte hinzufügen - ohne Programmierkenntnisse.",
        category: "ki-chatbots",
        published: true,
        order_index: 11,
        sort_order: 11
      },
      {
        question: "Welche Sprachen unterstützt der KI-Chatbot?",
        answer: "Unsere Chatbots unterstützen über 50 Sprachen, inkl. Deutsch, Schweizerdeutsch, Englisch, Französisch, Italienisch und alle gängigen europäischen und asiatischen Sprachen. Mehrsprachigkeit ist standardmässig integriert.",
        category: "ki-chatbots",
        published: true,
        order_index: 12,
        sort_order: 12
      },

      // Automatisierung - mindestens 3
      {
        question: "Brauche ich technische Kenntnisse für die Automatisierung?",
        answer: "Nein! Wir entwickeln die Automatisierungen für Sie und übergeben ein fertiges, benutzerfreundliches System. Sie bedienen es über intuitive Dashboards - keine Programmierung erforderlich.",
        category: "automatisierung",
        published: true,
        order_index: 13,
        sort_order: 13
      },
      {
        question: "Wie sicher sind meine Daten bei der Automatisierung?",
        answer: "Höchste Sicherheit durch SSL-Verschlüsselung, Schweizer Server-Hosting, DSGVO-konforme Datenspeicherung und regelmässige Security-Audits. Ihre Daten bleiben in Ihrem Besitz und werden niemals weitergegeben.",
        category: "automatisierung",
        published: true,
        order_index: 14,
        sort_order: 14
      },

      // Web & App Entwicklung - mindestens 3
      {
        question: "Entwickeln Sie auch Mobile Apps für iOS und Android?",
        answer: "Ja! Wir entwickeln native iOS-Apps, Android-Apps oder Cross-Platform-Apps (React Native, Flutter) - je nach Ihren Anforderungen und Budget. Eine App für beide Plattformen spart Zeit und Kosten.",
        category: "web-apps",
        published: true,
        order_index: 15,
        sort_order: 15
      },
      {
        question: "Kann ich meine bestehende Website modernisieren lassen?",
        answer: "Absolut! Wir analysieren Ihre aktuelle Website, identifizieren Schwachstellen und modernisieren Design, Performance und Funktionen. Oft günstiger als ein kompletter Neuaufbau und SEO-Rankings bleiben erhalten.",
        category: "web-apps",
        published: true,
        order_index: 16,
        sort_order: 16
      },
      {
        question: "Wer hostet meine Website oder App?",
        answer: "Wir empfehlen professionelle Schweizer oder europäische Hosting-Anbieter und richten alles für Sie ein. Alternativ hosten wir Ihre Lösung auf unserer Infrastruktur mit SLA-Garantie und 24/7 Monitoring.",
        category: "web-apps",
        published: true,
        order_index: 17,
        sort_order: 17
      },

      // Preise & Ablauf - bereits 3 vorhanden, aber weitere hinzufügen
      {
        question: "Bieten Sie auch Ratenzahlung an?",
        answer: "Ja! Bei Projekten ab CHF 10'000 bieten wir flexible Ratenzahlungen an - z.B. 30% Anzahlung, 40% bei Zwischenabnahme, 30% bei Fertigstellung. Auch monatliche Abo-Modelle sind möglich.",
        category: "preise-ablauf",
        published: true,
        order_index: 18,
        sort_order: 18
      },
      {
        question: "Was passiert, wenn ich mit dem Ergebnis nicht zufrieden bin?",
        answer: "Wir arbeiten iterativ mit regelmässigen Feedback-Runden. Sie sehen jede Entwicklungsphase und können Anpassungen verlangen. 100% Zufriedenheitsgarantie - erst bei Ihrer finalen Abnahme gilt das Projekt als beendet.",
        category: "preise-ablauf",
        published: true,
        order_index: 19,
        sort_order: 19
      },
      {
        question: "Gibt es versteckte Kosten?",
        answer: "Nein! Sie erhalten ein transparentes Angebot mit allen Kosten. Hosting, Domain und externe Tools werden separat aufgeführt. Änderungen am Scope werden immer zuerst besprochen und genehmigt.",
        category: "preise-ablauf",
        published: true,
        order_index: 20,
        sort_order: 20
      }
    ]

    // Insert FAQs with upsert to avoid duplicates
    const results = []
    
    for (const faq of additionalFaqs) {
      const { data, error } = await supabase
        .from('faqs')
        .upsert(
          {
            ...faq,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          { 
            onConflict: 'question',
            ignoreDuplicates: false 
          }
        )
        .select()

      if (error) {
        console.error(`Error inserting FAQ: ${faq.question}`, error)
        results.push({ question: faq.question, status: 'error', error: error.message })
      } else {
        results.push({ question: faq.question, status: 'success' })
      }
    }

    const successCount = results.filter(r => r.status === 'success').length
    const errorCount = results.filter(r => r.status === 'error').length

    return NextResponse.json({
      success: true,
      message: `${successCount} FAQs erfolgreich eingefügt, ${errorCount} Fehler`,
      details: results
    })

  } catch (error) {
    console.error('Error seeding FAQs:', error)
    return NextResponse.json(
      { error: 'Failed to seed FAQs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

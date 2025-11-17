import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function POST() {
  const supabase = getSupabaseAdmin()
  const results: { table: string; success: boolean; message: string }[] = []

  try {
    const { error: servicesError } = await supabase.from('services').upsert([
      {
        slug: 'ki-chatbot-entwicklung',
        title: 'KI-Chatbot Entwicklung',
        short_description: 'Intelligente Chatbots für automatisierten Kundensupport',
        icon: 'MessageSquare',
        price_from: 2500,
        price_note: 'ab',
        published: true,
        sort_order: 1,
        features: [
          { title: '24/7 Verfügbarkeit', description: 'Ihr Chatbot ist rund um die Uhr im Einsatz' },
          { title: 'Mehrsprachig', description: 'Unterstützung für über 50 Sprachen' },
          { title: 'Integrationen', description: 'Nahtlose Anbindung an CRM, ERP und mehr' }
        ],
        benefits: [
          { title: 'Kosteneinsparung', description: 'Bis zu 70% weniger Support-Kosten' },
          { title: 'Schnellere Antworten', description: 'Sofortige Reaktion auf Kundenanfragen' }
        ],
        process_steps: [
          { step: 'Analyse', description: 'Wir analysieren Ihre Anforderungen' },
          { step: 'Entwicklung', description: 'Wir entwickeln Ihren Chatbot' },
          { step: 'Integration', description: 'Wir integrieren den Chatbot in Ihre Systeme' }
        ],
        use_cases: ['Kundensupport', 'Lead-Generierung', 'FAQ-Automatisierung']
      },
      {
        slug: 'whatsapp-automation',
        title: 'WhatsApp Automation',
        short_description: 'Automatisierte WhatsApp-Kommunikation für Ihr Business',
        icon: 'MessageCircle',
        price_from: 1500,
        price_note: 'ab',
        published: true,
        sort_order: 2,
        features: [
          { title: 'Automatische Antworten', description: 'Sofortige Reaktion auf Nachrichten' },
          { title: 'Broadcast-Nachrichten', description: 'Senden Sie Nachrichten an viele Kontakte' }
        ],
        benefits: [
          { title: 'Höhere Erreichbarkeit', description: '98% Öffnungsrate bei WhatsApp' }
        ],
        process_steps: [
          { step: 'Setup', description: 'WhatsApp Business API Setup' },
          { step: 'Konfiguration', description: 'Automatisierungsregeln definieren' }
        ],
        use_cases: ['Terminbestätigung', 'Order Updates', 'Marketing']
      }
    ], { onConflict: 'slug' })

    results.push({
      table: 'Services',
      success: !servicesError,
      message: servicesError ? servicesError.message : '2 Services erfolgreich eingefügt/aktualisiert'
    })

    const { error: teamError } = await supabase.from('team_members').upsert([
      {
        email: 'thomas.mueller@binso.ch',
        name: 'Thomas Müller',
        role: 'CEO & KI-Stratege',
        bio: 'Mit über 10 Jahren Erfahrung in der KI-Entwicklung leitet Thomas unser Team und berät Kunden bei ihrer digitalen Transformation.',
        linkedin: 'https://linkedin.com/in/thomasmueller',
        image_url: '/professional-male-ceo.png',
        published: true,
        sort_order: 1
      },
      {
        email: 'sarah.schmidt@binso.ch',
        name: 'Sarah Schmidt',
        role: 'Lead Developer',
        bio: 'Sarah ist spezialisiert auf Machine Learning und entwickelt massgeschneiderte KI-Lösungen für unsere Kunden.', // Ersetze ß durch ss in Team-Bio
        linkedin: 'https://linkedin.com/in/sarahschmidt',
        image_url: '/professional-female-developer.jpg',
        published: true,
        sort_order: 2
      },
      {
        email: 'michael.weber@binso.ch',
        name: 'Michael Weber',
        role: 'Business Analyst',
        bio: 'Michael analysiert Geschäftsprozesse und identifiziert Automatisierungspotenziale für maximale Effizienz.',
        linkedin: 'https://linkedin.com/in/michaelweber',
        image_url: '/professional-male-analyst.jpg',
        published: true,
        sort_order: 3
      },
      {
        email: 'anna.meier@binso.ch',
        name: 'Anna Meier',
        role: 'UX/UI Designer',
        bio: 'Anna gestaltet intuitive Benutzeroberflächen für unsere KI-Anwendungen und sorgt für optimale User Experience.',
        linkedin: 'https://linkedin.com/in/annameier',
        image_url: '/professional-female-designer.png',
        published: true,
        sort_order: 4
      }
    ], { onConflict: 'email' })

    results.push({
      table: 'Team Members',
      success: !teamError,
      message: teamError ? teamError.message : '4 Team-Mitglieder erfolgreich eingefügt/aktualisiert'
    })

    const { error: portfolioError } = await supabase.from('portfolio_projects').upsert([
      {
        slug: 'ki-kundensupport-ecommerce',
        title: 'KI-Kundensupport für E-Commerce',
        description: 'Intelligenter Chatbot für 24/7 Kundensupport',
        long_description: 'Ein massgeschneiderter KI-Chatbot, der automatisch Kundenanfragen beantwortet und die Support-Kosten um 60% reduziert hat.', // Ersetze ß durch ss in Portfolio-Beschreibung
        client: 'SwissShop AG',
        date: '2024-03',
        category: 'KI & Automatisierung',
        image_url: '/ai-chatbot-interface.png',
        technologies: ['GPT-4', 'Next.js', 'WhatsApp API'],
        features: ['24/7 Verfügbarkeit', 'Mehrsprachig', 'CRM-Integration'],
        website_url: 'https://example.com',
        published: true,
        sort_order: 1
      }
    ], { onConflict: 'slug' })

    results.push({
      table: 'Portfolio Projects',
      success: !portfolioError,
      message: portfolioError ? portfolioError.message : '1 Portfolio-Projekt erfolgreich eingefügt/aktualisiert'
    })

    const { error: testimonialsError } = await supabase.from('testimonials').upsert([
      {
        client_email: 'peter.zimmermann@techstart.de',
        client_name: 'Peter Zimmermann',
        client_role: 'Geschäftsführer',
        client_company: 'TechStart GmbH',
        testimonial: 'Die KI-Lösung von BINSO hat unsere Effizienz um 40% gesteigert. Absolut empfehlenswert!',
        rating: 5,
        published: true,
        sort_order: 1
      }
    ], { onConflict: 'client_email' })

    results.push({
      table: 'Testimonials',
      success: !testimonialsError,
      message: testimonialsError ? testimonialsError.message : '1 Testimonial erfolgreich eingefügt/aktualisiert'
    })

    const faqsToSeed = [
      // KI & Chatbots (5 Fragen)
      {
        question: 'Was bringt mir ein KI-Chatbot für mein Unternehmen?',
        answer: 'Ein KI-Chatbot automatisiert Kundenanfragen 24/7, reduziert Support-Kosten um bis zu 70% und verbessert die Kundenzufriedenheit durch sofortige Antworten. Perfekt für FAQ, Terminbuchungen und Lead-Generierung.',
        category: 'ki-chatbots',
        published: true,
        sort_order: 1
      },
      {
        question: 'Wie lange dauert die Entwicklung eines Chatbots?',
        answer: 'Ein einfacher FAQ-Chatbot ist in 1-2 Wochen einsatzbereit. Komplexe KI-Chatbots mit Custom-Training und Integrationen benötigen 4-8 Wochen. Wir starten mit einem MVP und erweitern dann schrittweise.',
        category: 'ki-chatbots',
        published: true,
        sort_order: 2
      },
      {
        question: 'Kann der Chatbot in mehreren Sprachen antworten?',
        answer: 'Ja! Unsere KI-Chatbots unterstützen über 50 Sprachen und erkennen automatisch die Sprache des Nutzers. Perfekt für internationale Unternehmen oder mehrsprachige Märkte wie die Schweiz.',
        category: 'ki-chatbots',
        published: true,
        sort_order: 3
      },
      {
        question: 'Wie trainiere ich meinen Chatbot mit eigenen Daten?',
        answer: 'Wir trainieren Ihren Chatbot mit Ihren FAQs, Produkt-Dokumentationen, Support-Tickets und Wissensdatenbanken. Das Fine-Tuning dauert 1-2 Tage und der Bot lernt kontinuierlich aus Konversationen dazu.',
        category: 'ki-chatbots',
        published: true,
        sort_order: 4
      },
      {
        question: 'Kann der Chatbot auch komplexe Anfragen bearbeiten?',
        answer: 'Ja! Moderne KI-Chatbots verstehen Kontext, können Rückfragen stellen und komplexe mehrstufige Prozesse abwickeln. Bei sehr speziellen Anfragen übergibt der Bot nahtlos an einen menschlichen Mitarbeiter.',
        category: 'ki-chatbots',
        published: true,
        sort_order: 5
      },
      
      // Automatisierung & Integration (3 Fragen)
      {
        question: 'Wie unterscheidet sich WhatsApp Business Automation von normalen Chatbots?',
        answer: 'WhatsApp Business Automation erreicht Kunden direkt auf ihrem meistgenutzten Messenger mit personalisierten Nachrichten, Katalogen und Payment-Integration. Deutlich höhere Öffnungsraten als E-Mail (98% vs. 20%).',
        category: 'automatisierung',
        published: true,
        sort_order: 6
      },
      {
        question: 'Welche Prozesse kann ich automatisieren?',
        answer: 'Nahezu alle wiederkehrenden Aufgaben: Rechnungsstellung, Dateneingabe, E-Mail-Versand, Bestandsverwaltung, Reporting, Lead-Qualifizierung, Social Media Posting und vieles mehr.',
        category: 'automatisierung',
        published: true,
        sort_order: 7
      },
      {
        question: 'Welche Systeme können Sie integrieren?',
        answer: 'Wir integrieren CRM-Systeme (Salesforce, HubSpot), E-Commerce (Shopify, WooCommerce), ERP, Payment-Gateways (Stripe, PayPal), Marketing-Tools, Buchhaltungssoftware und praktisch jede API.',
        category: 'automatisierung',
        published: true,
        sort_order: 8
      },
      
      // Web & App Entwicklung (5 Fragen)
      {
        question: 'Ist meine Website/App DSGVO-konform?',
        answer: 'Absolut. Wir entwickeln alle Projekte nach Schweizer Datenschutzgesetz und DSGVO-Standards mit Verschlüsselung, Cookie-Consent, Datenschutzerklärung und sicherer Datenspeicherung.',
        category: 'web-apps',
        published: true,
        sort_order: 9
      },
      {
        question: 'Entwickeln Sie auch Mobile Apps für iOS und Android?',
        answer: 'Ja! Wir entwickeln native Apps (Swift/Kotlin) oder Cross-Platform Apps mit React Native/Flutter. Je nach Anforderung empfehlen wir die beste Lösung für Performance, Budget und Zeitplan.',
        category: 'web-apps',
        published: true,
        sort_order: 10
      },
      {
        question: 'Wird meine Website für Suchmaschinen optimiert (SEO)?',
        answer: 'Ja, SEO ist Standard bei allen Webprojekten. Wir optimieren Ladezeiten, Meta-Tags, strukturierte Daten, Mobile-Responsiveness und Content-Struktur für Top-Rankings bei Google.',
        category: 'web-apps',
        published: true,
        sort_order: 11
      },
      {
        question: 'Wie schnell ist meine Website nach der Entwicklung?',
        answer: 'Wir optimieren alle Websites auf maximale Performance mit Core Web Vitals, Lazy Loading, CDN, Bildkompression und Code-Splitting. Typische Ladezeiten unter 2 Sekunden, auch auf Mobile.',
        category: 'web-apps',
        published: true,
        sort_order: 12
      },
      {
        question: 'Können Sie meine bestehende Website modernisieren?',
        answer: 'Ja! Wir migrieren veraltete Websites auf moderne Technologien (Next.js, React), verbessern Performance, Design und Sicherheit. Migration inkl. Content-Übernahme und SEO-Erhalt.',
        category: 'web-apps',
        published: true,
        sort_order: 13
      },
      
      // Preise & Ablauf (3 Fragen)
      {
        question: 'Wie viel kostet eine Web- oder App-Entwicklung?',
        answer: 'Einfache Webseiten ab CHF 3\'000, komplexe Web-Apps ab CHF 15\'000, Mobile Apps ab CHF 25\'000. Der finale Preis hängt von Funktionsumfang, Design und Integrationen ab. Kostenlose Erstberatung!',
        category: 'preise-ablauf',
        published: true,
        sort_order: 14
      },
      {
        question: 'Wie lange dauert die Umsetzung eines Projekts?',
        answer: 'Kleine Projekte: 2-4 Wochen. Mittelgrosse Web-Apps: 6-12 Wochen. Komplexe Enterprise-Lösungen: 3-6 Monate. Wir arbeiten agil mit regelmässigen Updates und Feedback-Schleifen.',
        category: 'preise-ablauf',
        published: true,
        sort_order: 15
      },
      {
        question: 'Bieten Sie auch Support nach der Entwicklung?',
        answer: 'Ja! Wir bieten Wartungspakete ab CHF 200/Monat mit Updates, Bug-Fixes, Monitoring und technischem Support. Auch Ad-hoc-Support ist möglich.',
        category: 'preise-ablauf',
        published: true,
        sort_order: 16
      },
    ]

    await supabase.from('faqs').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    const { error: faqsError } = await supabase.from('faqs').insert(faqsToSeed)

    results.push({
      table: 'FAQs',
      success: !faqsError,
      message: faqsError 
        ? faqsError.message 
        : `${faqsToSeed.length} FAQs erfolgreich eingefügt`
    })

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unbekannter Fehler' },
      { status: 500 }
    )
  }
}

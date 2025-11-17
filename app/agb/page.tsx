import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AgbPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-16 md:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

            <div className="prose dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Geltungsbereich</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Dienstleistungen, die von der Binso GmbH
                  (nachfolgend "Auftragnehmer") erbracht werden. Mit der Auftragserteilung anerkennt der Auftraggeber
                  die Geltung dieser AGB. Abweichende Bedingungen des Auftraggebers werden nur anerkannt, wenn sie vom
                  Auftragnehmer ausdrücklich schriftlich bestätigt werden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Vertragsabschluss</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Der Vertrag zwischen Auftraggeber und Auftragnehmer kommt durch die Annahme eines Angebots oder durch
                  die Auftragsbestätigung zustande. Mündliche Nebenabreden bedürfen zu ihrer Gültigkeit der
                  schriftlichen Bestätigung.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Leistungsumfang</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Der Auftragnehmer erbringt folgende Dienstleistungen:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Entwicklung von KI-gestützten Chatbots und Assistenten</li>
                  <li>Automatisierung von Geschäftsprozessen</li>
                  <li>Entwicklung massgeschneiderter KI-Lösungen</li>
                  <li>Datenanalyse und Business Intelligence</li>
                  <li>API-Integration und -Entwicklung</li>
                  <li>KI-Beratung und Strategieentwicklung</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Der genaue Leistungsumfang wird in der jeweiligen Auftragsbestätigung oder im Projektvertrag
                  festgelegt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Mitwirkungspflichten des Auftraggebers</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Der Auftraggeber verpflichtet sich, alle für die Durchführung des Auftrags erforderlichen
                  Informationen, Daten und Unterlagen rechtzeitig und vollständig zur Verfügung zu stellen.
                  Verzögerungen, die durch unzureichende oder verspätete Mitwirkung des Auftraggebers entstehen, gehen
                  zu Lasten des Auftraggebers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Preise und Zahlungsbedingungen</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Alle Preise verstehen sich in Schweizer Franken (CHF) zuzüglich der gesetzlichen Mehrwertsteuer. Die
                  Rechnungsstellung erfolgt gemäss Vereinbarung. Zahlungen sind innerhalb von 30 Tagen nach
                  Rechnungsdatum ohne Abzug fällig.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Bei Zahlungsverzug ist der Auftragnehmer berechtigt, Verzugszinsen in Höhe von 5% p.a. zu berechnen.
                  Der Auftragnehmer behält sich das Recht vor, bei Zahlungsverzug die weitere Leistungserbringung
                  einzustellen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Lieferfristen</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Lieferfristen sind nur dann verbindlich, wenn sie vom Auftragnehmer ausdrücklich schriftlich als
                  verbindlich bestätigt wurden. Verzögerungen aufgrund höherer Gewalt oder aufgrund von Umständen, die
                  der Auftragnehmer nicht zu vertreten hat, berechtigen den Auftraggeber nicht zur Kündigung des
                  Vertrags oder zu Schadenersatzforderungen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Urheberrecht und Nutzungsrechte</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Alle im Rahmen des Auftrags erstellten Werke (Software, Dokumentationen, Designs, etc.) sind
                  urheberrechtlich geschützt. Der Auftraggeber erwirbt nach vollständiger Bezahlung ein
                  nicht-exklusives, zeitlich und räumlich unbegrenztes Nutzungsrecht an den vertraglich vereinbarten
                  Leistungen.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Der Quellcode und andere technische Dokumentationen bleiben, sofern nicht anders vereinbart, Eigentum
                  des Auftragnehmers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Gewährleistung</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Der Auftragnehmer gewährleistet, dass die erbrachten Leistungen zum Zeitpunkt der Abnahme die
                  vertraglich vereinbarte Beschaffenheit aufweisen und frei von Mängeln sind, die den Wert oder die
                  Tauglichkeit zu dem vertraglich vorausgesetzten Gebrauch aufheben oder mindern.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme. Bei berechtigten Mängelrügen ist der
                  Auftragnehmer nach seiner Wahl zur Nachbesserung oder Neulieferung verpflichtet.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Haftung</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Der Auftragnehmer haftet für Schäden nur bei Vorsatz oder grober Fahrlässigkeit. Die Haftung für
                  leichte Fahrlässigkeit ist ausgeschlossen. Die Haftung ist in jedem Fall auf den Auftragswert
                  begrenzt.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Für mittelbare Schäden, Folgeschäden, entgangenen Gewinn und Schäden aus Ansprüchen Dritter haftet der
                  Auftragnehmer nicht.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Geheimhaltung</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Beide Vertragsparteien verpflichten sich, über alle vertraulichen Informationen und
                  Geschäftsgeheimnisse, die im Rahmen der Zusammenarbeit bekannt werden, Stillschweigen zu bewahren.
                  Diese Verpflichtung besteht auch nach Beendigung des Vertrags fort.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Kündigung</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Beide Parteien können den Vertrag aus wichtigem Grund fristlos kündigen. Als wichtiger Grund gilt
                  insbesondere die erhebliche Verletzung vertraglicher Pflichten. Bei einer Kündigung durch den
                  Auftraggeber ohne wichtigen Grund sind bereits erbrachte Leistungen zu vergüten.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Datenschutz</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Der Auftragnehmer verpflichtet sich, die geltenden Datenschutzbestimmungen einzuhalten. Weitere
                  Informationen finden Sie in unserer{" "}
                  <Link href="/datenschutz" className="text-[#7A7FEE] hover:underline">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Schlussbestimmungen</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Es gilt ausschliesslich Schweizer Recht. Gerichtsstand ist Appenzell.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, berührt dies die Wirksamkeit der
                  übrigen Bestimmungen nicht. Die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem
                  wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
                </p>
              </section>

              <section className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Stand: {new Date().toLocaleDateString("de-CH", { year: "numeric", month: "long" })}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

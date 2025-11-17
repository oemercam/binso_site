import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export default function ImpressumPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Impressum</h1>

            <div className="prose dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Angaben gemäss Schweizerischem Obligationenrecht</h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p className="font-semibold text-lg">Binso GmbH</p>
                  <p>Weissbadstrasse 8b</p>
                  <p>9050 Appenzell</p>
                  <p>Schweiz</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Telefon:</span> +41 79 261 95 87
                  </p>
                  <p>
                    <span className="font-medium">E-Mail:</span>{" "}
                    <a href="mailto:info@binso.ch" className="text-[#7A7FEE] hover:underline">
                      info@binso.ch
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Handelsregister</h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Rechtsform:</span> Gesellschaft mit beschränkter Haftung (GmbH)
                  </p>
                  <p>
                    <span className="font-medium">Handelsregister-Nummer:</span> CH-310.4.003.501-7
                  </p>
                  <p>
                    <span className="font-medium">UID:</span> CHE-173.401.068
                  </p>
                  <p>
                    <span className="font-medium">MWST-Nummer:</span> CHE-173.401.068 MWST
                  </p>
                  <p>
                    <span className="font-medium">Handelsregisteramt:</span> Appenzell Innerrhoden
                  </p>
                  <p>
                    <span className="font-medium">Eintragungsdatum:</span> 01.12.2022
                  </p>
                  <p>
                    <span className="font-medium">Stammkapital:</span> CHF 20'000.00
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Vertretungsberechtigte Personen</h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Geschäftsführer:</span>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Simon Noah Steiner, Vorsitzender der Geschäftsführung</li>
                    <li>Oemer Cam, Geschäftsführer</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Zweck der Gesellschaft</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Die Gesellschaft bezweckt die Erbringung von IT-Dienstleistungen aller Art an Unternehmen und
                  Privatpersonen, speziell Internet-, Projektmanagement- sowie Beratungs- als auch
                  Supportdienstleistung. Die Gesellschaft kann mit Mitteln der Informationstechnologie (Hardware,
                  Software, Lizenzen etc.) handeln und Dienstleistungen oder Personal vermitteln.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Technische Realisierung</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="font-semibold mb-2">Hosting</h3>
                    <p>
                      Diese Website wird gehostet bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Datenbank & Backend</h3>
                    <p>
                      Für die Datenspeicherung und Backend-Services nutzen wir Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992.
                      Die Daten werden in der EU (Frankfurt, Deutschland) gespeichert.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Verwendete Technologien</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Next.js 16 (React Framework)</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>Supabase (PostgreSQL Datenbank)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Haftungsausschluss</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="font-semibold mb-2">Inhalt des Onlineangebotes</h3>
                    <p>
                      Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder
                      Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf
                      Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der
                      dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen
                      verursacht wurden, sind grundsätzlich ausgeschlossen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Verweise und Links</h3>
                    <p>
                      Bei direkten oder indirekten Verweisen auf fremde Webseiten ("Hyperlinks"), die ausserhalb des
                      Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschliesslich in dem
                      Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich
                      und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Urheberrecht</h3>
                    <p>
                      Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken,
                      Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Grafiken,
                      Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente,
                      Videosequenzen und Texte zurückzugreifen.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Rechtswirksamkeit</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese
                  Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden
                  Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des
                  Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
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

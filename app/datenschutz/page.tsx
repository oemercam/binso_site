import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"
import Link from "next/link"
import { ArrowLeft, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function DatenschutzPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Datenschutzerklärung</h1>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Ihre Datenschutzrechte</h3>
                  <p className="text-muted-foreground mb-4">
                    Sie haben das Recht, Ihre gespeicherten Daten einzusehen, zu exportieren oder zu löschen.
                  </p>
                  <Button asChild>
                    <Link href="/datenschutz/dsgvo-request">
                      Datenschutzrechte ausüben
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Allgemeines</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen
                  Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer
                  Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen
                  ein. Persönliche Daten werden streng vertraulich behandelt und weder an Dritte verkauft noch weiter
                  gegeben.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Verantwortliche Stelle</h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p className="font-semibold">Binso GmbH</p>
                  <p>Weissbadstrasse 8b</p>
                  <p>9050 Appenzell</p>
                  <p>Schweiz</p>
                  <p className="mt-4">UID: CHE-173.401.068</p>
                  <p className="mt-4">
                    E-Mail:{" "}
                    <a href="mailto:info@binso.ch" className="text-[#7A7FEE] hover:underline">
                      info@binso.ch
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Erhebung und Verarbeitung personenbezogener Daten</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Wir erheben personenbezogene Daten nur, wenn Sie uns diese im Rahmen Ihres Besuchs unserer Webseite
                  freiwillig mitteilen. Folgende Daten werden erhoben:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Vor- und Nachname</li>
                  <li>E-Mail-Adresse</li>
                  <li>Telefonnummer</li>
                  <li>Firma</li>
                  <li>Postleitzahl und Ort</li>
                  <li>Adresse</li>
                  <li>Nachrichteninhalt bei Kontaktaufnahme</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Zweck der Datenverarbeitung</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Die Verarbeitung Ihrer personenbezogenen Daten erfolgt ausschliesslich zur Bearbeitung Ihrer Anfragen
                  und zur Erbringung unserer Dienstleistungen. Eine Weitergabe an Dritte erfolgt nur, wenn dies zur
                  Vertragserfüllung notwendig ist oder Sie ausdrücklich eingewilligt haben.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Diese Webseite verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Computer gespeichert
                  werden und die Ihr Browser speichert. Cookies richten auf Ihrem Computer keinen Schaden an und
                  enthalten keine Viren.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Wir verwenden Cookies, um unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Die
                  meisten der von uns verwendeten Cookies sind so genannte "Session-Cookies". Sie werden nach Ende Ihres
                  Besuchs automatisch gelöscht. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von
                  Cookies informiert werden und Cookies nur im Einzelfall erlauben.
                </p>
                <p className="text-gray-700 dark:text-gray-300 font-medium mt-4 mb-2">Folgende Cookies werden verwendet:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Session-Cookies:</strong> Zur Authentifizierung im Admin-Dashboard (Supabase Auth)</li>
                  <li><strong>Präferenz-Cookies:</strong> Zur Speicherung Ihrer Dark Mode Einstellung</li>
                  <li><strong>Funktionale Cookies:</strong> Zur Sicherstellung der Website-Funktionalität</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5a. Hosting und technische Infrastruktur</h2>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Vercel Inc. (Hosting)</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Unsere Website wird auf Servern von Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet.
                    Vercel erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch
                    übermittelt (siehe Abschnitt 6).
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Rechtsgrundlage: Berechtigtes Interesse an einer sicheren, schnellen und effizienten Bereitstellung unserer Website.
                    Weitere Informationen finden Sie in der{" "}
                    <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#7A7FEE] hover:underline">
                      Datenschutzerklärung von Vercel
                    </a>.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Supabase Inc. (Datenbank & Backend)</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Wir verwenden Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992, für die Speicherung und
                    Verwaltung von Daten. Supabase verarbeitet folgende Daten in unserem Auftrag:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-2">
                    <li>Kontaktformular-Anfragen (Name, E-Mail, Telefon, Nachricht)</li>
                    <li>Admin-Benutzer-Authentifizierung</li>
                    <li>Website-Inhalte (Portfolio, Services, FAQs, Blog-Posts)</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300">
                    Datenstandort: EU (Frankfurt, Deutschland). Supabase ist ISO 27001 zertifiziert und DSGVO-konform.
                    Weitere Informationen finden Sie in der{" "}
                    <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#7A7FEE] hover:underline">
                      Datenschutzerklärung von Supabase
                    </a>.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Verwendete Technologien</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Diese Website verwendet folgende Open-Source-Technologien:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                    <li><strong>Next.js & React:</strong> Frontend-Framework für die Website-Darstellung</li>
                    <li><strong>Tailwind CSS:</strong> Styling-Framework</li>
                    <li><strong>TypeScript:</strong> Programmiersprache für type-safe Code</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    Diese Technologien werden lokal im Browser ausgeführt und senden keine Daten an Dritte.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Kontaktformular und E-Mail-Kommunikation</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben inklusive
                  der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
                  Anschlussfragen bei uns gespeichert.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Spam-Schutz:</strong> Unser Kontaktformular verwendet folgende Schutzmassnahmen:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Honeypot-Feld:</strong> Verstecktes Feld zur Erkennung automatisierter Bot-Anfragen</li>
                  <li><strong>Rate Limiting:</strong> Maximal 5 Anfragen pro 5 Minuten pro IP-Adresse</li>
                  <li><strong>Server-seitige Validierung:</strong> Alle Eingaben werden auf dem Server validiert und bereinigt</li>
                  <li><strong>Input-Sanitization:</strong> Schutz vor XSS und SQL-Injection</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Diese Daten werden ohne Ihre Einwilligung nicht an Dritte weitergegeben. Die Speicherung erfolgt auf
                  Grundlage unserer berechtigten Interessen zur Bearbeitung Ihrer Anfrage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Server-Log-Files</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log
                  Files, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen
                  Datenquellen wird nicht vorgenommen. Die Daten werden nach 30 Tagen automatisch gelöscht.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Ihre Rechte</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Sie haben jederzeit das Recht auf:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten</li>
                  <li>Berichtigung unrichtiger personenbezogener Daten</li>
                  <li>Löschung Ihrer bei uns gespeicherten personenbezogener Daten</li>
                  <li>Einschränkung der Datenverarbeitung</li>
                  <li>Datenübertragbarkeit</li>
                  <li>Widerspruch gegen die Verarbeitung Ihrer personenbezogener Daten</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Um diese Rechte auszuüben, nutzen Sie bitte unser{" "}
                  <Link href="/datenschutz/dsgvo-request" className="text-[#7A7FEE] hover:underline font-medium">
                    Datenschutzrechte-Portal
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Datensicherheit</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in
                  Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. Wir
                  bedienen uns geeigneter technischer und organisatorischer Sicherheitsmassnahmen, um Ihre Daten gegen
                  zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder
                  gegen den unbefugten Zugriff Dritter zu schützen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Änderungen</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Wir können diese Datenschutzerklärung jederzeit ohne Vorankündigung anpassen. Es gilt die jeweils
                  aktuelle, auf unserer Website publizierte Fassung.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Kontakt</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Für Fragen zum Datenschutz wenden Sie sich bitte an:{" "}
                  <a href="mailto:info@binso.ch" className="text-[#7A7FEE] hover:underline">
                    info@binso.ch
                  </a>
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

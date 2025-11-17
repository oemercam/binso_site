"use client"

import { useEffect, useState } from "react"
import { notFound } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { Cloud, Shield, Headphones, Network, Code, Users, Server, Briefcase, Zap, CheckCircle, TrendingUp, Clock, Target, Globe, Lock, Rocket } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"

const serviceDetails: Record<
  string,
  {
    hero: string
    subtitle: string
    whatIsIt: { headline: string; paragraphs: string[] }
    keyPoints: {
      headline: string
      description: string
      items: { icon: React.ReactNode; text: string }[]
      metrics?: { value: string; label: string }[]
    }
    howItWorks: { headline: string; paragraphs: string[] }
    benefits: { headline: string; text: string }
    image: string
  }
> = {
  "azure-m365-services": {
    hero: "Azure & Microsoft 365",
    subtitle: "Professionelle Cloud-Lösungen und Microsoft 365 Integration für moderne Arbeitsumgebungen.",
    whatIsIt: {
      headline: "Microsoft Cloud Services für Ihr Unternehmen",
      paragraphs: [
        "Microsoft Azure und Microsoft 365 bieten eine umfassende Cloud-Plattform für moderne Unternehmen. Von E-Mail und Office-Anwendungen über Cloud-Speicher bis hin zu hochskalierbaren Rechenressourcen – wir helfen Ihnen, das volle Potenzial der Microsoft Cloud zu nutzen.",
        "Mit Microsoft 365 erhalten Sie Zugriff auf vertraute Tools wie Word, Excel, PowerPoint, Teams und Outlook – überall und auf jedem Gerät. Azure ermöglicht es Ihnen, Anwendungen in der Cloud zu betreiben, Daten sicher zu speichern und flexibel zu skalieren.",
        "Wir begleiten Sie von der Planung über die Migration bis zum laufenden Betrieb und Support."
      ]
    },
    keyPoints: {
      headline: "Ideal für:",
      description: "Unternehmen, die moderne Cloud-Technologie nutzen möchten:",
      metrics: [
        { value: "99,9%", label: "Verfügbarkeit" },
        { value: "24/7", label: "Zugriff" },
        { value: "Enterprise", label: "Sicherheit" },
        { value: "Weltweit", label: "Verfügbar" }
      ],
      items: [
        { icon: <Cloud className="w-6 h-6 text-[#7A7FEE]" />, text: "Unternehmen, die in die Cloud migrieren möchten" },
        { icon: <Users className="w-6 h-6 text-[#7A7FEE]" />, text: "Teams, die moderne Collaboration-Tools benötigen" },
        { icon: <Lock className="w-6 h-6 text-[#7A7FEE]" />, text: "Organisationen mit hohen Sicherheitsanforderungen" },
        { icon: <Globe className="w-6 h-6 text-[#7A7FEE]" />, text: "Firmen mit verteilten Standorten" },
        { icon: <TrendingUp className="w-6 h-6 text-[#7A7FEE]" />, text: "Wachsende Unternehmen, die skalierbare Lösungen brauchen" }
      ]
    },
    howItWorks: {
      headline: "Ihre Cloud-Transformation mit binso",
      paragraphs: [
        "Wir beginnen mit einer umfassenden Analyse Ihrer aktuellen IT-Infrastruktur. Welche Systeme nutzen Sie? Welche Daten müssen migriert werden? Welche Anforderungen haben Ihre Mitarbeiter?",
        "Basierend darauf erstellen wir einen maßgeschneiderten Migrations-Plan. Die Umstellung erfolgt schrittweise und ohne Unterbrechung Ihres Betriebs. Wir konfigurieren Microsoft 365 nach Ihren Bedürfnissen, richten Azure-Services ein und migrieren Ihre Daten sicher in die Cloud.",
        "Nach der Migration schulen wir Ihre Mitarbeiter im Umgang mit den neuen Tools und stehen für laufenden Support zur Verfügung."
      ]
    },
    benefits: {
      headline: "Ihre Vorteile mit Microsoft Cloud",
      text: "Arbeiten Sie von überall und auf jedem Gerät. Profitieren Sie von automatischen Updates und neuesten Features. Ihre Daten sind durch Enterprise-Grade-Sicherheit geschützt. Skalieren Sie flexibel nach Bedarf und zahlen Sie nur für das, was Sie nutzen. Teams können nahtlos zusammenarbeiten mit integrierten Tools wie Microsoft Teams, SharePoint und OneDrive."
    },
    image: "/azure-cloud-microsoft-365.jpg"
  },
  "cyber-security": {
    hero: "Cyber Security",
    subtitle: "Umfassende IT-Sicherheitslösungen zum Schutz Ihrer Daten und Systeme vor Cyber-Bedrohungen.",
    whatIsIt: {
      headline: "Schützen Sie Ihr Unternehmen vor Cyber-Angriffen",
      paragraphs: [
        "Cyber Security ist heute wichtiger denn je. Hacker-Angriffe, Ransomware und Datenlecks können verheerende Folgen für Unternehmen haben. Wir schützen Ihre IT-Infrastruktur mit modernen Sicherheitslösungen.",
        "Unser Angebot umfasst Firewalls, Endpoint-Protection, E-Mail-Security, Backup-Lösungen und Security-Monitoring. Wir führen regelmäßige Security-Audits durch und schulen Ihre Mitarbeiter im Umgang mit Cyber-Risiken.",
        "Prävention ist besser als Reaktion – wir helfen Ihnen, Sicherheitsvorfälle zu verhindern, bevor sie entstehen."
      ]
    },
    keyPoints: {
      headline: "Ideal für:",
      description: "Unternehmen, die ihre IT-Sicherheit ernst nehmen:",
      metrics: [
        { value: "24/7", label: "Monitoring" },
        { value: "99,9%", label: "Schutzrate" },
        { value: "< 1 Min", label: "Reaktionszeit" },
        { value: "ISO", label: "Zertifiziert" }
      ],
      items: [
        { icon: <Shield className="w-6 h-6 text-[#7A7FEE]" />, text: "Unternehmen mit sensiblen Kundendaten" },
        { icon: <Lock className="w-6 h-6 text-[#7A7FEE]" />, text: "Organisationen mit Compliance-Anforderungen" },
        { icon: <Server className="w-6 h-6 text-[#7A7FEE]" />, text: "Firmen mit kritischer IT-Infrastruktur" },
        { icon: <Target className="w-6 h-6 text-[#7A7FEE]" />, text: "KMUs, die Cyber-Risiken minimieren möchten" },
        { icon: <Globe className="w-6 h-6 text-[#7A7FEE]" />, text: "Remote-Teams mit dezentraler IT" }
      ]
    },
    howItWorks: {
      headline: "Umfassender Schutz durch binso",
      paragraphs: [
        "Wir starten mit einem Security-Assessment, um Schwachstellen in Ihrer IT-Infrastruktur zu identifizieren. Danach implementieren wir mehrschichtige Sicherheitslösungen: Firewalls zum Schutz Ihres Netzwerks, Endpoint-Protection für alle Geräte, E-Mail-Security gegen Phishing und Malware.",
        "Regelmäßige Backups stellen sicher, dass Ihre Daten im Notfall wiederhergestellt werden können. Unser Security-Monitoring überwacht Ihre Systeme rund um die Uhr und erkennt Bedrohungen frühzeitig.",
        "Wir schulen Ihre Mitarbeiter in Security-Awareness, denn der Mensch ist oft das schwächste Glied in der Sicherheitskette."
      ]
    },
    benefits: {
      headline: "Sicherheit, die schützt",
      text: "Schützen Sie Ihr Unternehmen vor finanziellen und Reputationsschäden durch Cyber-Angriffe. Erfüllen Sie gesetzliche Compliance-Anforderungen wie DSGVO. Ihre Kunden vertrauen Ihnen ihre Daten an – zeigen Sie, dass Sie dieses Vertrauen verdienen. Mit proaktiven Sicherheitsmaßnahmen minimieren Sie Ausfallzeiten und Geschäftsunterbrechungen."
    },
    image: "/cyber-security-shield-protection.jpg"
  },
  "it-consulting-support": {
    hero: "IT Consulting & Support",
    subtitle: "Kompetente Beratung und zuverlässiger IT-Support für Ihr Unternehmen – individuell und persönlich.",
    whatIsIt: {
      headline: "Ihr IT-Partner für alle Fragen",
      paragraphs: [
        "IT-Probleme kosten Zeit und Geld. Unser IT-Support hilft Ihnen schnell und unkompliziert bei technischen Herausforderungen – von einfachen Fragen bis zu komplexen Störungen.",
        "Neben reaktivem Support bieten wir auch proaktives IT-Consulting. Wir beraten Sie bei der Auswahl der richtigen Technologien, planen IT-Projekte und helfen bei strategischen Entscheidungen.",
        "Remote oder vor Ort – wir sind für Sie da, wenn Sie uns brauchen."
      ]
    },
    keyPoints: {
      headline: "Ideal für:",
      description: "Unternehmen, die einen verlässlichen IT-Partner suchen:",
      metrics: [
        { value: "< 15 Min", label: "Reaktionszeit" },
        { value: "98%", label: "Zufriedenheit" },
        { value: "24/7", label: "Verfügbar" },
        { value: "Remote + Vor Ort", label: "Flexibel" }
      ],
      items: [
        { icon: <Headphones className="w-6 h-6 text-[#7A7FEE]" />, text: "KMUs ohne eigene IT-Abteilung" },
        { icon: <Rocket className="w-6 h-6 text-[#7A7FEE]" />, text: "Startups, die IT-Expertise benötigen" },
        { icon: <Users className="w-6 h-6 text-[#7A7FEE]" />, text: "Unternehmen mit temporärem IT-Bedarf" },
        { icon: <Clock className="w-6 h-6 text-[#7A7FEE]" />, text: "Organisationen, die schnelle Hilfe brauchen" },
        { icon: <Briefcase className="w-6 h-6 text-[#7A7FEE]" />, text: "Firmen mit komplexen IT-Projekten" }
      ]
    },
    howItWorks: {
      headline: "Support, wenn Sie ihn brauchen",
      paragraphs: [
        "Kontaktieren Sie uns per Telefon, E-Mail oder WhatsApp. Unser Support-Team nimmt Ihr Anliegen auf und beginnt sofort mit der Fehleranalyse. Die meisten Probleme können wir remote lösen – schnell und unkompliziert.",
        "Bei Bedarf kommen wir auch vor Ort vorbei. Für wiederkehrende Anfragen bieten wir Support-Verträge mit definierten Service-Levels an.",
        "Im Consulting-Bereich analysieren wir Ihre IT-Landschaft, identifizieren Optimierungspotenziale und entwickeln gemeinsam mit Ihnen eine IT-Strategie, die zu Ihrem Unternehmen passt."
      ]
    },
    benefits: {
      headline: "Ihr Vorteil: Zeit und Nerven sparen",
      text: "Konzentrieren Sie sich auf Ihr Kerngeschäft, während wir uns um Ihre IT kümmern. Keine langen Ausfallzeiten mehr. Profitieren Sie von unserer Expertise ohne eigenes IT-Personal einstellen zu müssen. Planbare Kosten durch flexible Support-Verträge. Wir sprechen verständlich und erklären technische Zusammenhänge auf Augenhöhe."
    },
    image: "/it-consulting-business-support.jpg"
  },
  "netzwerk-infrastruktur": {
    hero: "Netzwerk & Infrastruktur",
    subtitle: "Planung, Installation und Wartung moderner Netzwerk- und IT-Infrastruktur für maximale Performance.",
    whatIsIt: {
      headline: "Stabile Netzwerke für reibungslose Abläufe",
      paragraphs: [
        "Ein zuverlässiges Netzwerk ist das Rückgrat jedes modernen Unternehmens. Wir planen, installieren und warten Ihre gesamte Netzwerk-Infrastruktur – vom Switch über WLAN bis zur Verkabelung.",
        "Unsere Lösungen umfassen LAN/WAN-Netzwerke, WLAN-Infrastruktur, VPN-Verbindungen, Netzwerk-Segmentierung und professionelle Verkabelung nach neuesten Standards.",
        "Wir sorgen für hohe Verfügbarkeit, Geschwindigkeit und Sicherheit in Ihrem Netzwerk."
      ]
    },
    keyPoints: {
      headline: "Ideal für:",
      description: "Unternehmen, die auf stabiles Netzwerk angewiesen sind:",
      metrics: [
        { value: "10 Gbit/s", label: "Geschwindigkeit" },
        { value: "99,9%", label: "Uptime" },
        { value: "Enterprise", label: "Hardware" },
        { value: "Redundant", label: "Ausfallsicher" }
      ],
      items: [
        { icon: <Network className="w-6 h-6 text-[#7A7FEE]" />, text: "Büros mit vielen Arbeitsplätzen" },
        { icon: <Server className="w-6 h-6 text-[#7A7FEE]" />, text: "Unternehmen mit Server-Infrastruktur" },
        { icon: <Globe className="w-6 h-6 text-[#7A7FEE]" />, text: "Firmen mit mehreren Standorten" },
        { icon: <Lock className="w-6 h-6 text-[#7A7FEE]" />, text: "Organisationen mit Sicherheitsanforderungen" },
        { icon: <Zap className="w-6 h-6 text-[#7A7FEE]" />, text: "Betriebe mit hohen Performance-Anforderungen" }
      ]
    },
    howItWorks: {
      headline: "Professionelle Netzwerk-Lösungen von binso",
      paragraphs: [
        "Wir beginnen mit einer Standortanalyse. Wie viele Arbeitsplätze? Welche Anforderungen an Geschwindigkeit und Verfügbarkeit? Benötigen Sie WLAN oder kabelgebundene Verbindungen?",
        "Basierend darauf planen wir Ihre Netzwerk-Topologie. Wir setzen auf Enterprise-Hardware von führenden Herstellern wie Cisco, HP oder Ubiquiti. Die Installation umfasst Verkabelung, Switch-Konfiguration, WLAN-Access-Points und Router-Setup.",
        "Nach der Inbetriebnahme überwachen wir Ihr Netzwerk kontinuierlich und führen regelmäßige Wartungen durch. Bei Problemen sind wir sofort zur Stelle."
      ]
    },
    benefits: {
      headline: "Investition in die Zukunft",
      text: "Ein professionelles Netzwerk steigert die Produktivität Ihrer Mitarbeiter. Schnelle Verbindungen bedeuten keine Wartezeiten mehr beim Zugriff auf Dateien oder Cloud-Services. Redundante Systeme verhindern Ausfallzeiten. Ihre Netzwerk-Infrastruktur wächst mit Ihrem Unternehmen mit und lässt sich flexibel erweitern."
    },
    image: "/network-infrastructure-servers.jpg"
  },
  "website-entwicklung": {
    hero: "Website-Entwicklung",
    subtitle: "Professionelle Entwicklung moderner Websites und Webanwendungen nach Ihren Anforderungen.",
    whatIsIt: {
      headline: "Ihre digitale Visitenkarte im Web",
      paragraphs: [
        "Eine moderne Website ist heute unverzichtbar. Wir entwickeln responsive Websites, die auf allen Geräten perfekt aussehen und Ihre Besucher begeistern.",
        "Von einfachen Unternehmenswebsites über Online-Shops bis zu komplexen Web-Applikationen – wir setzen Ihre Anforderungen mit modernen Technologien um.",
        "SEO-Optimierung, schnelle Ladezeiten und benutzerfreundliches Design sind für uns selbstverständlich."
      ]
    },
    keyPoints: {
      headline: "Ideal für:",
      description: "Unternehmen, die online präsent sein möchten:",
      metrics: [
        { value: "< 2 Sek", label: "Ladezeit" },
        { value: "100%", label: "Responsive" },
        { value: "SEO", label: "Optimiert" },
        { value: "Modern", label: "Design" }
      ],
      items: [
        { icon: <Code className="w-6 h-6 text-[#7A7FEE]" />, text: "Unternehmen ohne Online-Präsenz" },
        { icon: <Rocket className="w-6 h-6 text-[#7A7FEE]" />, text: "Startups, die schnell eine Website brauchen" },
        { icon: <TrendingUp className="w-6 h-6 text-[#7A7FEE]" />, text: "Firmen mit veralteter Website" },
        { icon: <Globe className="w-6 h-6 text-[#7A7FEE]" />, text: "E-Commerce Händler" },
        { icon: <Users className="w-6 h-6 text-[#7A7FEE]" />, text: "Dienstleister, die Kunden gewinnen möchten" }
      ]
    },
    howItWorks: {
      headline: "Von der Idee zur fertigen Website",
      paragraphs: [
        "Wir starten mit einem Konzept-Gespräch. Was sind Ihre Ziele? Wer ist Ihre Zielgruppe? Welche Funktionen benötigen Sie? Dann erstellen wir Design-Entwürfe, die Sie vorab begutachten können.",
        "Die Entwicklung erfolgt mit modernen Frameworks wie Next.js und React. Wir integrieren alle gewünschten Features: Kontaktformulare, Blogs, Online-Shops, Buchungssysteme und mehr.",
        "Vor dem Launch testen wir ausführlich auf allen Geräten. Nach der Veröffentlichung stehen wir für Support und Weiterentwicklung zur Verfügung."
      ]
    },
    benefits: {
      headline: "Ihre Website – Ihr Erfolg",
      text: "Eine professionelle Website steigert Ihre Glaubwürdigkeit und hilft Ihnen, neue Kunden zu gewinnen. Sie sind 24/7 erreichbar und können Ihre Produkte und Dienstleistungen präsentieren. SEO-Optimierung sorgt dafür, dass Sie in Suchmaschinen gefunden werden. Schnelle Ladezeiten und modernes Design verbessern die User Experience."
    },
    image: "/modern-web-development-responsive.jpg"
  },
  "it-outsourcing": {
    hero: "IT-Outsourcing",
    subtitle: "Qualifizierte IT-Fachkräfte für Ihr Unternehmen – flexibel, kompetent und kosteneffizient.",
    whatIsIt: {
      headline: "IT-Experten für Ihr Team",
      paragraphs: [
        "IT-Fachkräfte sind schwer zu finden. Mit unserem IT-Outsourcing erhalten Sie Zugriff auf qualifizierte Experten – ohne langwierige Recruiting-Prozesse und ohne Festanstellung.",
        "Wir stellen Ihnen System Engineers, Netzwerk-Spezialisten, Support-Mitarbeiter, Entwickler und weitere IT-Fachkräfte zur Verfügung – temporär oder langfristig.",
        "Flexibel, kostenkontrolliert und ohne HR-Aufwand für Sie."
      ]
    },
    keyPoints: {
      headline: "Ideal für:",
      description: "Unternehmen mit temporärem oder langfristigem IT-Bedarf:",
      metrics: [
        { value: "< 1 Woche", label: "Vermittlungszeit" },
        { value: "Flexibel", label: "Einsatzdauer" },
        { value: "Qualifiziert", label: "Fachkräfte" },
        { value: "Kosteneffizient", label: "Planbar" }
      ],
      items: [
        { icon: <Users className="w-6 h-6 text-[#7A7FEE]" />, text: "Unternehmen ohne eigene IT-Abteilung" },
        { icon: <Rocket className="w-6 h-6 text-[#7A7FEE]" />, text: "Firmen mit IT-Projekten" },
        { icon: <Clock className="w-6 h-6 text-[#7A7FEE]" />, text: "Organisationen mit Personalengpässen" },
        { icon: <Target className="w-6 h-6 text-[#7A7FEE]" />, text: "Unternehmen, die Kosten sparen möchten" },
        { icon: <TrendingUp className="w-6 h-6 text-[#7A7FEE]" />, text: "Wachsende Firmen mit flexiblem Bedarf" }
      ]
    },
    howItWorks: {
      headline: "IT-Personal auf Abruf",
      paragraphs: [
        "Teilen Sie uns Ihren Bedarf mit: Welche Skills benötigen Sie? Für wie lange? Remote oder vor Ort? Wir finden passende IT-Experten aus unserem Netzwerk.",
        "Die Fachkräfte arbeiten entweder direkt bei Ihnen vor Ort oder remote. Sie bleiben unsere Mitarbeiter, sodass Sie keinen HR-Aufwand haben.",
        "Die Abrechnung erfolgt transparent auf Stunden- oder Tagesbasis. Sie behalten volle Kostenkontrolle und können den Einsatz jederzeit anpassen."
      ]
    },
    benefits: {
      headline: "Flexibilität trifft Expertise",
      text: "Sparen Sie Recruiting-Kosten und -Zeit. Keine Lohnnebenkosten, keine Sozialabgaben. Zugriff auf Spezialisten, die Sie vielleicht nicht dauerhaft benötigen. Flexibel skalierbar je nach Projektanforderungen. Reduzieren Sie Ihre Fixkosten und zahlen Sie nur für tatsächlich geleistete Arbeit."
    },
    image: "/it-team-outsourcing-professionals.jpg"
  },
  "cloud-services": {
    hero: "Cloud-Lösungen",
    subtitle: "Sichere und skalierbare Cloud-Services für moderne Geschäftsanforderungen.",
    whatIsIt: {
      headline: "Die Cloud als Ihr IT-Rückgrat",
      paragraphs: [
        "Cloud-Services bieten Ihnen Flexibilität, Skalierbarkeit und Kosteneffizienz. Statt teure Hardware vor Ort zu betreiben, nutzen Sie Rechenressourcen aus der Cloud – bezahlen Sie nur für das, was Sie tatsächlich nutzen.",
        "Wir helfen Ihnen bei der Auswahl der richtigen Cloud-Plattform (AWS, Azure, Google Cloud), migrieren Ihre Systeme in die Cloud und optimieren Ihre Cloud-Infrastruktur kontinuierlich.",
        "Von Cloud-Storage über virtuelle Server bis zu Container-Orchestrierung – wir realisieren Ihre Cloud-Strategie."
      ]
    },
    keyPoints: {
      headline: "Ideal für:",
      description: "Unternehmen, die in die Cloud wechseln möchten:",
      metrics: [
        { value: "99,99%", label: "Verfügbarkeit" },
        { value: "Automatisch", label: "Skalierbar" },
        { value: "Pay-as-you-go", label: "Kostenmodell" },
        { value: "Weltweit", label: "Erreichbar" }
      ],
      items: [
        { icon: <Cloud className="w-6 h-6 text-[#7A7FEE]" />, text: "Unternehmen, die Hardware-Kosten reduzieren möchten" },
        { icon: <Rocket className="w-6 h-6 text-[#7A7FEE]" />, text: "Startups ohne eigenes Rechenzentrum" },
        { icon: <TrendingUp className="w-6 h-6 text-[#7A7FEE]" />, text: "Wachsende Firmen mit variablem Ressourcenbedarf" },
        { icon: <Lock className="w-6 h-6 text-[#7A7FEE]" />, text: "Organisationen mit hohen Sicherheitsanforderungen" },
        { icon: <Globe className="w-6 h-6 text-[#7A7FEE]" />, text: "Verteilte Teams, die globalen Zugriff benötigen" }
      ]
    },
    howItWorks: {
      headline: "Ihre Cloud-Migration mit binso",
      paragraphs: [
        "Wir analysieren Ihre aktuelle IT-Landschaft und bewerten, welche Systeme für die Cloud geeignet sind. Dann erstellen wir eine Cloud-Strategie und wählen die passende Plattform aus.",
        "Die Migration erfolgt schrittweise mit minimaler Downtime. Wir konfigurieren Cloud-Services, migrieren Daten und Applikationen und richten Backup- und Monitoring-Lösungen ein.",
        "Nach dem Go-Live optimieren wir Ihre Cloud-Kosten kontinuierlich und skalieren Ressourcen nach Bedarf."
      ]
    },
    benefits: {
      headline: "Cloud-Vorteile für Ihr Unternehmen",
      text: "Reduzieren Sie Investitionen in teure Hardware. Skalieren Sie Ressourcen je nach Bedarf innerhalb von Minuten. Profitieren Sie von hoher Verfügbarkeit und automatischen Backups. Greifen Sie von überall auf Ihre Systeme zu. Ihre Daten sind durch Enterprise-Sicherheit geschützt."
    },
    image: "/cloud-computing-services.png"
  },
  "modern-workplace": {
    hero: "Modern Workplace",
    subtitle: "Transformation zu modernen digitalen Arbeitsplätzen mit Microsoft 365 und Teams.",
    whatIsIt: {
      headline: "Digitale Arbeitsplätze für die Zukunft",
      paragraphs: [
        "Der Modern Workplace ist mehr als nur Software – es ist eine neue Art zu arbeiten. Mit Tools wie Microsoft Teams, SharePoint und OneDrive arbeiten Teams effizienter zusammen, egal wo sie sich befinden.",
        "Wir helfen Ihnen bei der Transformation zu modernen Arbeitsplätzen: von der Tool-Auswahl über die Implementierung bis zur Change-Management-Begleitung.",
        "Remote Work, hybride Teams und flexible Arbeitsmodelle werden damit zum Kinderspiel."
      ]
    },
    keyPoints: {
      headline: "Ideal für:",
      description: "Unternehmen, die moderne Arbeitsformen ermöglichen möchten:",
      metrics: [
        { value: "+30%", label: "Produktivität" },
        { value: "Remote", label: "Arbeitsfähig" },
        { value: "Hybrid", label: "Work-Modell" },
        { value: "Integriert", label: "Tools" }
      ],
      items: [
        { icon: <Users className="w-6 h-6 text-[#7A7FEE]" />, text: "Teams mit Remote-Mitarbeitern" },
        { icon: <Globe className="w-6 h-6 text-[#7A7FEE]" />, text: "Unternehmen mit mehreren Standorten" },
        { icon: <Rocket className="w-6 h-6 text-[#7A7FEE]" />, text: "Firmen, die Collaboration verbessern möchten" },
        { icon: <Clock className="w-6 h-6 text-[#7A7FEE]" />, text: "Organisationen mit flexiblen Arbeitszeiten" },
        { icon: <TrendingUp className="w-6 h-6 text-[#7A7FEE]" />, text: "Wachsende Unternehmen mit modernem Mindset" }
      ]
    },
    howItWorks: {
      headline: "Ihr Weg zum Modern Workplace",
      paragraphs: [
        "Wir analysieren Ihre aktuellen Arbeitsprozesse und identifizieren Optimierungspotenziale. Dann implementieren wir Microsoft 365 Tools wie Teams, SharePoint, OneDrive und Planner.",
        "Wir konfigurieren die Tools nach Ihren Bedürfnissen, richten Collaboration-Spaces ein und integrieren bestehende Systeme. Ihre Mitarbeiter werden in der Nutzung geschult.",
        "Durch Change Management begleiten wir den kulturellen Wandel hin zu neuen Arbeitsformen."
      ]
    },
    benefits: {
      headline: "Modern Workplace = Zufriedene Mitarbeiter",
      text: "Ihre Mitarbeiter können von überall produktiv arbeiten. Teams collaborieren effizienter durch integrierte Tools. Meetings werden durch Microsoft Teams digital und hybrid möglich. Dokumente werden gemeinsam in Echtzeit bearbeitet. Die Work-Life-Balance Ihrer Mitarbeiter verbessert sich durch flexible Arbeitsmodelle."
    },
    image: "/modern-workplace-digital-office.jpg"
  },
  "ki-automation": {
    hero: "KI & Automation",
    subtitle: "Intelligente Automatisierungslösungen und KI-Integration für effizientere Geschäftsprozesse.",
    whatIsIt: {
      headline: "Künstliche Intelligenz für Ihr Unternehmen",
      paragraphs: [
        "KI und Automatisierung revolutionieren, wie Unternehmen arbeiten. Von intelligenten Chatbots über automatisierte Datenanalyse bis zu KI-gestützten Entscheidungsprozessen – wir helfen Ihnen, KI sinnvoll in Ihrem Unternehmen einzusetzen.",
        "Automatisieren Sie repetitive Aufgaben, lassen Sie KI Muster in Ihren Daten erkennen oder nutzen Sie Machine Learning für Vorhersagen.",
        "Wir identifizieren die richtigen Anwendungsfälle und setzen KI-Lösungen um, die echten Mehrwert schaffen."
      ]
    },
    keyPoints: {
      headline: "Ideal für:",
      description: "Unternehmen, die von KI profitieren möchten:",
      metrics: [
        { value: "60%", label: "Zeitersparnis" },
        { value: "Automatisiert", label: "Prozesse" },
        { value: "Intelligente", label: "Insights" },
        { value: "Skalierbar", label: "Lösungen" }
      ],
      items: [
        { icon: <Zap className="w-6 h-6 text-[#7A7FEE]" />, text: "Unternehmen mit repetitiven manuellen Aufgaben" },
        { icon: <TrendingUp className="w-6 h-6 text-[#7A7FEE]" />, text: "Firmen, die Daten für Insights nutzen möchten" },
        { icon: <Users className="w-6 h-6 text-[#7A7FEE]" />, text: "Kundenservice-Teams mit hohem Anfragevolumen" },
        { icon: <Target className="w-6 h-6 text-[#7A7FEE]" />, text: "Organisationen, die effizienter werden möchten" },
        { icon: <Rocket className="w-6 h-6 text-[#7A7FEE]" />, text: "Innovative Unternehmen mit Zukunftsvision" }
      ]
    },
    howItWorks: {
      headline: "KI-Integration leicht gemacht",
      paragraphs: [
        "Wir starten mit einem KI-Assessment: Welche Prozesse können von KI profitieren? Wo liegt das größte Potenzial? Dann entwickeln wir gemeinsam einen Umsetzungsplan.",
        "Die Implementierung kann von einfachen No-Code-KI-Tools bis zu maßgeschneiderten Machine-Learning-Modellen reichen. Wir trainieren KI-Modelle mit Ihren Daten und integrieren sie in Ihre Systeme.",
        "Nach dem Launch monitoren wir die Performance und optimieren die Modelle kontinuierlich."
      ]
    },
    benefits: {
      headline: "KI als Wettbewerbsvorteil",
      text: "Sparen Sie Zeit durch Automatisierung repetitiver Aufgaben. Treffen Sie bessere Entscheidungen durch KI-gestützte Insights. Verbessern Sie Ihren Kundenservice mit intelligenten Chatbots. Erkennen Sie Muster in Ihren Daten, die Menschen übersehen würden. Skalieren Sie Prozesse ohne proportional mehr Personal einzustellen."
    },
    image: "/ai-automation-artificial-intelligence.jpg"
  }
}

interface Service {
  id: number
  slug: string
  title: string
  description: string
  image: string
  category: string
  published: boolean
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  if (!serviceDetails[params.slug]) {
    notFound()
  }

  const ALL_SERVICES = [
    { slug: "azure-m365-services", name: "Azure & Microsoft 365" },
    { slug: "cyber-security", name: "Cyber Security" },
    { slug: "it-consulting-support", name: "IT Consulting & Support" },
    { slug: "netzwerk-infrastruktur", name: "Netzwerk & Infrastruktur" },
    { slug: "website-entwicklung", name: "Website-Entwicklung" },
    { slug: "it-outsourcing", name: "IT-Outsourcing" },
    { slug: "cloud-services", name: "Cloud-Lösungen" },
    { slug: "modern-workplace", name: "Modern Workplace" },
    { slug: "ki-automation", name: "KI & Automation" }
  ]

  const SERVICE_ORDER = ALL_SERVICES.map(s => s.slug)

  const currentIndex = SERVICE_ORDER.indexOf(params.slug)
  const previousSlug = currentIndex > 0 ? SERVICE_ORDER[currentIndex - 1] : null
  const nextSlug = currentIndex < SERVICE_ORDER.length - 1 ? SERVICE_ORDER[currentIndex + 1] : null

  useEffect(() => {
    setService({
      id: 0,
      slug: params.slug,
      title: serviceDetails[params.slug].hero,
      description: serviceDetails[params.slug].subtitle,
      image: serviceDetails[params.slug].image,
      category: 'IT Services',
      published: true
    })
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white dark:bg-[#111111]">
          <div className="container pt-8 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-8"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-6"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const details = serviceDetails[params.slug]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-[#111111]">
        {/* Hero Section */}
        <section className="relative pt-8 pb-4">
          <div className="container">
            <div className="max-w-full">
              <div className="inline-block px-3 py-1 bg-[#7A7FEE]/10 text-[#7A7FEE] rounded-full text-sm font-medium mb-4">
                {service?.category}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {service?.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {details.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="pb-8">
          <div className="container">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src={service?.image || "/placeholder.svg"}
                alt={service?.title || "Service"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="container">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Weitere IT-Services entdecken:</p>
            <div className="flex flex-wrap gap-2">
              {ALL_SERVICES.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/dienstleistungen/${svc.slug}`}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${svc.slug === params.slug 
                      ? 'bg-[#7A7FEE] text-white' 
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  {svc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What Is It Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {details.whatIsIt.headline}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
                {details.whatIsIt.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Cards */}
        {details.keyPoints.metrics && (
          <section className="py-12 bg-gradient-to-br from-[#7A7FEE]/5 to-transparent">
            <div className="container">
              <div className="max-w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {details.keyPoints.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-[#111111] rounded-xl p-6 text-center border-2 border-[#7A7FEE]/20 shadow-lg"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-[#7A7FEE] mb-2">{metric.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Ideal For Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-full">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {details.keyPoints.headline}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {details.keyPoints.description}
              </p>

              <ul className="space-y-4">
                {details.keyPoints.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1">{item.icon}</span>
                    <span className="text-lg text-gray-700 dark:text-gray-300 pt-1">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {details.howItWorks.headline}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
                {details.howItWorks.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="container">
            <div className="max-w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {details.benefits.headline}
              </h2>
              <ul className="space-y-4">
                {details.benefits.text.split('. ').filter(Boolean).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#7A7FEE] flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">
                      {benefit.trim()}{benefit.endsWith('.') ? '' : '.'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#7A7FEE]">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bereit für professionelle IT-Services?
            </h2>
            <p className="text-white/90 mb-4 max-w-2xl mx-auto text-lg">
              Lassen Sie uns gemeinsam Ihre IT-Anforderungen besprechen.
            </p>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg font-medium">
              Wir beraten Sie gerne und erstellen ein maßgeschneidertes Angebot.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#7A7FEE] hover:bg-gray-100"
                onClick={() => {
                  const event = new CustomEvent("openContactDrawer")
                  window.dispatchEvent(event)
                }}
              >
                Jetzt Beratung anfragen
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <a href="https://wa.me/41792619587" target="_blank" rel="noopener noreferrer">
                  WhatsApp Chat starten
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

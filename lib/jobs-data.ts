export interface Job {
  id: number
  slug: string
  title: string
  department: string
  location: string
  type: string
  description: string
  published: boolean
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  startDate?: string
  hybridWork?: string
  heroImage: string
}

export const jobsData: Job[] = [
  {
    id: 1,
    slug: "it-system-engineer",
    title: "IT System Engineer",
    department: "Infrastructure",
    location: "Bern, Schweiz",
    type: "Vollzeit",
    description: "Wir suchen einen erfahrenen System Engineer für den Aufbau und die Betreuung moderner IT-Infrastrukturen.",
    published: true,
    heroImage: "/jobs/system-engineer-hero.jpg",
    startDate: "Ab sofort",
    hybridWork: "Ja, möglich",
    requirements: [
      "Abgeschlossene Ausbildung in Informatik oder vergleichbare Qualifikation",
      "Mehrjährige Erfahrung in der IT-Infrastruktur und Systemadministration",
      "Fundierte Kenntnisse in Windows Server, Linux und Virtualisierungstechnologien",
      "Erfahrung mit Cloud-Plattformen (Azure, AWS) von Vorteil",
      "Zertifizierungen wie MCSA, RHCE oder ähnliche sind ein Plus",
      "Teamfähigkeit und selbstständige Arbeitsweise",
      "Sehr gute Deutsch- und gute Englischkenntnisse"
    ],
    responsibilities: [
      "Planung, Implementierung und Betrieb von IT-Infrastrukturen für unsere Kunden",
      "Installation und Konfiguration von Servern, Netzwerken und Storage-Systemen",
      "Durchführung von Migrationen und Systemupdates",
      "Monitoring und Troubleshooting von IT-Systemen",
      "Dokumentation der durchgeführten Arbeiten",
      "Second- und Third-Level-Support für unsere Kunden",
      "Zusammenarbeit mit dem Team bei komplexen Projekten"
    ],
    benefits: [
      "Attraktives Gehalt und moderne Arbeitsausstattung",
      "Flexible Arbeitszeiten und Home-Office-Möglichkeiten",
      "Spannende Projekte bei renommierten Kunden",
      "Weiterbildungsmöglichkeiten und Zertifizierungen",
      "Familiäres Arbeitsklima in einem motivierten Team",
      "Betriebliche Altersvorsorge",
      "Modernes Büro in Bern mit guter Verkehrsanbindung"
    ],
  },
  {
    id: 2,
    slug: "cloud-consultant-azure-m365",
    title: "Cloud Consultant (Azure/M365)",
    department: "Consulting",
    location: "Bern, Schweiz / Remote",
    type: "Vollzeit",
    description: "Unterstütze Unternehmen bei der Migration und Optimierung ihrer Cloud-Infrastruktur mit Azure und Microsoft 365.",
    published: true,
    heroImage: "/jobs/cloud-consultant-hero.jpg",
    startDate: "März 2025",
    hybridWork: "Ja, Remote möglich",
    requirements: [
      "Abgeschlossenes Studium oder Ausbildung in Informatik",
      "Mehrjährige Erfahrung mit Microsoft Azure und Microsoft 365",
      "Kenntnisse in Cloud-Architekturen und Best Practices",
      "Erfahrung mit Cloud-Migrationen und Hybrid-Szenarien",
      "Microsoft-Zertifizierungen (Azure Administrator, Solutions Architect) von Vorteil",
      "Ausgeprägte Beratungs- und Kommunikationsfähigkeiten",
      "Fließende Deutsch- und gute Englischkenntnisse"
    ],
    responsibilities: [
      "Beratung von Kunden bei Cloud-Strategien und -Migrationen",
      "Planung und Durchführung von Azure- und M365-Projekten",
      "Design und Implementierung von Cloud-Lösungen",
      "Optimierung bestehender Cloud-Infrastrukturen",
      "Schulung von Kunden und internen Teams",
      "Erstellung von Konzepten und Dokumentationen",
      "Unterstützung im Pre-Sales bei technischen Fragen"
    ],
    benefits: [
      "Überdurchschnittliches Gehalt mit Bonusregelung",
      "Flexible Arbeitsgestaltung und Remote-Arbeit möglich",
      "Arbeit mit neuesten Cloud-Technologien",
      "Microsoft-Zertifizierungen werden vollständig finanziert",
      "Firmenwagen oder ÖV-Abo",
      "Teilnahme an Konferenzen und Community-Events",
      "Dynamisches Team mit flachen Hierarchien"
    ],
  },
  {
    id: 3,
    slug: "cyber-security-specialist",
    title: "Cyber Security Specialist",
    department: "Security",
    location: "Bern, Schweiz",
    type: "Vollzeit",
    description: "Schütze Unternehmen vor Cyberbedrohungen und entwickle umfassende Sicherheitskonzepte.",
    published: true,
    heroImage: "/jobs/cyber-security-hero.jpg",
    startDate: "April 2025",
    hybridWork: "Teilweise",
    requirements: [
      "Hochschulabschluss in Informatik oder IT-Security",
      "Fundierte Erfahrung in Cyber Security und IT-Sicherheit",
      "Kenntnisse in Penetration Testing und Security Assessments",
      "Erfahrung mit SIEM-Systemen und Security-Tools",
      "Zertifizierungen wie CISSP, CEH, OSCP von Vorteil",
      "Analytisches Denkvermögen und Problemlösungskompetenz",
      "Sehr gute Deutsch- und Englischkenntnisse"
    ],
    responsibilities: [
      "Entwicklung und Implementierung von Security-Konzepten",
      "Durchführung von Security Assessments und Penetration Tests",
      "Monitoring und Analyse von Sicherheitsvorfällen",
      "Beratung von Kunden zu IT-Sicherheitsthemen",
      "Incident Response und Forensik",
      "Schulung von Mitarbeitern zu Security Awareness",
      "Evaluation und Implementierung von Security-Lösungen"
    ],
    benefits: [
      "Top-Gehalt für Sicherheitsexperten",
      "Arbeit an kritischen Sicherheitsprojekten",
      "Regelmäßige Security-Trainings und Zertifizierungen",
      "Zugang zu modernsten Security-Tools",
      "Flexible Arbeitszeiten",
      "Home-Office-Optionen",
      "Beteiligung an Bug-Bounty-Programmen"
    ],
  },
  {
    id: 4,
    slug: "full-stack-web-developer",
    title: "Full-Stack Web Developer",
    department: "Development",
    location: "Remote",
    type: "Vollzeit / Teilzeit",
    description: "Entwickle moderne Webanwendungen mit React, Next.js und anderen aktuellen Technologien.",
    published: true,
    heroImage: "/jobs/web-developer-hero.jpg",
    startDate: "Flexibel",
    hybridWork: "100% Remote",
    requirements: [
      "Abgeschlossene Ausbildung oder Studium in Informatik",
      "Erfahrung in der Entwicklung von Webanwendungen",
      "Sehr gute Kenntnisse in JavaScript/TypeScript, React und Next.js",
      "Erfahrung mit Backend-Technologien (Node.js, APIs, Datenbanken)",
      "Kenntnisse in modernem CSS und UI/UX-Design",
      "Git und agile Entwicklungsmethoden",
      "Gute Deutsch- und Englischkenntnisse"
    ],
    responsibilities: [
      "Entwicklung moderner Webanwendungen und Websites",
      "Frontend-Entwicklung mit React, Next.js und Tailwind CSS",
      "Backend-Entwicklung mit Node.js und APIs",
      "Datenbank-Design und -Integration",
      "Code Reviews und Qualitätssicherung",
      "Zusammenarbeit mit Designern und Projektmanagern",
      "Technische Dokumentation"
    ],
    benefits: [
      "100% Remote-Arbeit möglich",
      "Flexible Arbeitszeiten und Work-Life-Balance",
      "Teilzeit-Optionen verfügbar",
      "Arbeit mit modernem Tech-Stack",
      "Weiterbildungsbudget für Kurse und Konferenzen",
      "MacBook oder Linux-Laptop nach Wahl",
      "Junges, kreatives Team"
    ],
  },
]

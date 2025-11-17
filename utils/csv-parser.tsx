export interface PortfolioItem {
  slug: string
  title: string
  logo: string
  mainImage: string
  shortDescription: string
  projectUrl: string
  content: string
  sortOrder: string
  categories?: string[] // We'll add this for filtering
}

// Add a check for client-side environment at the top of the fetchPortfolioData function

export async function fetchPortfolioData(): Promise<PortfolioItem[]> {
  // Use a cache to avoid refetching the data multiple times
  if (typeof window !== "undefined" && (window as any).__portfolioCache) {
    return (window as any).__portfolioCache
  }

  try {
    // Use local sample file as primary source for template
    const response = await fetch("/data/portfolio-sample.csv", {
      // Add cache: 'no-store' for server components to always fetch fresh data
      cache: typeof window === "undefined" ? "no-store" : "default",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio CSV: ${response.status}`)
    }

    const csvText = await response.text()
    const parsedData = parseCSV(csvText)

    // Cache the data on the client side
    if (typeof window !== "undefined") {
      ;(window as any).__portfolioCache = parsedData
    }

    return parsedData
  } catch (error) {
    console.error("Error fetching portfolio data:", error)
    // Return fallback sample data if CSV fails to load
    return getFallbackPortfolioData()
  }
}

// Fallback data in case CSV file fails to load
function getFallbackPortfolioData(): PortfolioItem[] {
  return [
    {
      slug: "domicil-bern-ag",
      title: "Domicil Bern AG – Infrastruktur- & Migrationsprojekte",
      logo: "/domicil-bern-logo.jpg",
      mainImage: "/it-infrastructure-server-room.jpg",
      shortDescription: "Sicherstellung des IT-Betriebs und Einführung neuer Citrix- und Druckerumgebungen für Alters- und Pflegeheime",
      projectUrl: "https://www.domicilbern.ch",
      content: `<h3>Projektübersicht</h3><p>Für die Domicil Bern AG übernahm die Binso GmbH die Betriebsunterstützung und Modernisierung der IT-Infrastruktur. Dazu gehörten der Aufbau neuer Drucker- und Citrix-Umgebungen, die Optimierung der bestehenden ICT-Plattformen sowie die Bearbeitung von Service- und Change Requests. Durch strukturierte Prozesse, saubere Dokumentation und einen starken 2nd-/3rd-Level-Support konnte der Betrieb stabilisiert und fit für zukünftige Anforderungen gemacht werden.</p><h3>Hauptleistungen</h3><ul><li>Betriebsunterstützung IT-Infrastruktur</li><li>Aufbau neuer Drucker- und Citrix-Umgebungen</li><li>Optimierung der ICT-Plattformen</li><li>2nd-/3rd-Level-Support</li><li>Service- und Change Request Management</li></ul><h3>Technologien</h3><p>Citrix, Windows Server, Active Directory, Druckermanagement-Systeme</p>`,
      sortOrder: "2024-03-15",
      categories: ["all", "enterprise", "infrastructure"],
    },
    {
      slug: "bit-migration-agroscope",
      title: "BIT – Migration Büroautomation WBF – Teilprojekt Agroscope",
      logo: "/bit-switzerland-logo.jpg",
      mainImage: "/government-office-it-migration.jpg",
      shortDescription: "Planung und Umsetzung der Migration der Büroautomation für Agroscope im WBF",
      projectUrl: "https://www.bit.admin.ch",
      content: `<h3>Projektübersicht</h3><p>Im Teilprojekt „Migration Büroautomation WBF – Agroscope" unterstützte Binso das BIT bei der Einführung einer neuen Büroautomationsplattform. Neben Migrations- und Einführungskonzepten wurden Installationshandbücher, Paketierungsanleitungen und End-User-Guides erstellt. Die technische Migration von Usern, Gruppen, Exchange, UserHomes, UCC und Netzwerkberechtigungen erfolgte in enger Abstimmung mit den Fachbereichen – inklusive Incident-Management, Monitoring und 2nd-/3rd-Level-Support.</p><h3>Hauptleistungen</h3><ul><li>Migrations- und Einführungskonzepte</li><li>Paketierungsanleitungen und Installationshandbücher</li><li>End-User-Dokumentation</li><li>Technische Migration (User, Gruppen, Exchange, UCC)</li><li>Incident-Management und Monitoring</li><li>2nd-/3rd-Level-Support</li></ul><h3>Technologien</h3><p>Microsoft Exchange, Active Directory, Citrix, Windows Server, UCC-Plattformen</p>`,
      sortOrder: "2024-03-10",
      categories: ["all", "enterprise", "migration"],
    },
    {
      slug: "bit-transform-it-bundesanwaltschaft",
      title: "BIT – Transform IT Bundesanwaltschaft",
      logo: "/swiss-federal-prosecution-logo.jpg",
      mainImage: "/modern-office-workplace-it.jpg",
      shortDescription: "Modernisierung der Büroautomation für die Bundesanwaltschaft im Rahmen des Programms Transform IT",
      projectUrl: "https://www.bundesanwaltschaft.ch",
      content: `<h3>Projektübersicht</h3><p>Im Projekt „Transform IT – Bundesanwaltschaft" begleitete Binso die Modernisierung der gesamten Büroautomationsumgebung. Dazu gehörten die Erstellung von Einführungskonzepten, Migrationsleitfädens und End-User-Dokumentationen, die Paketierung und das Testen von Anwendungen sowie die technische Migration von Accounts, Gruppen, Exchange, UserHomes und UCC. Durch strukturiertes Incident-Management, PoC-Migrationstests und Early-Life-Support wurde ein sicherer Übergang in den produktiven Betrieb gewährleistet.</p><h3>Hauptleistungen</h3><ul><li>Einführungskonzepte und Migrationsleitfadens</li><li>Paketierung und Testing von Anwendungen</li><li>End-User-Dokumentationen</li><li>Technische Migration (Accounts, Exchange, UCC)</li><li>PoC-Migrationstests</li><li>Early-Life-Support und Incident-Management</li></ul><h3>Technologien</h3><p>Microsoft 365, Exchange, Active Directory, Application Packaging, Windows 10/11</p>`,
      sortOrder: "2024-03-05",
      categories: ["all", "enterprise", "migration"],
    },
    {
      slug: "kantonsspital-aarau-pia",
      title: "Kantonsspital Aarau – Persönlicher Informatik-Arbeitsplatz (PIA)",
      logo: "/hospital-it-logo.jpg",
      mainImage: "/hospital-it-workstation-healthcare.jpg",
      shortDescription: "Betriebsunterstützung und Modernisierung der IT-Arbeitsplätze im Spitalumfeld",
      projectUrl: "https://www.ksa.ch",
      content: `<h3>Projektübersicht</h3><p>Im Projekt „PIA – Persönlicher Informatik-Arbeitsplatz" unterstützte Binso das Kantonsspital Aarau beim Betrieb und der Weiterentwicklung der IT-Arbeitsplätze. Schwerpunkte waren die Einführung neuer Druckerlösungen und Citrix-Umgebungen, die Optimierung der ICT-Plattformen sowie die zuverlässige Bearbeitung von Service- und Change Requests. Dank klarer Prozesse, sauberer Berechtigungskonzepte und professionellem Support wurde eine stabile Arbeitsumgebung für medizinisches Personal und Verwaltung geschaffen.</p><h3>Hauptleistungen</h3><ul><li>Betriebsunterstützung IT-Arbeitsplätze</li><li>Einführung neuer Druckerlösungen</li><li>Citrix-Umgebungen Aufbau und Optimierung</li><li>ICT-Plattformen Optimierung</li><li>Service- und Change Request Bearbeitung</li><li>2nd-/3rd-Level-Support</li></ul><h3>Technologien</h3><p>Citrix, Windows Server, Active Directory, Healthcare IT-Systeme, Druckermanagement</p>`,
      sortOrder: "2024-02-28",
      categories: ["all", "enterprise", "healthcare"],
    },
    {
      slug: "stadt-bern-base4kids",
      title: "Stadt Bern – Base4Kids",
      logo: "/city-of-bern-logo.jpg",
      mainImage: "/school-classroom-computers-education-it.jpg",
      shortDescription: "Schul-IT-Arbeitsplätze für die Stadt Bern",
      projectUrl: "https://www.bern.ch",
      content: `<h3>Projektübersicht</h3><p>Im Projekt „Base4Kids" wirkten wir bei der Bereitstellung und Stabilisierung von IT-Arbeitsplätzen für Schulen der Stadt Bern mit. Binso erstellte Installations- und Paketierungsanleitungen, dokumentierte Abnahmetests und lieferte End-User-Guides für Lehrpersonen und Administration. Durch zielgerichtete Fehleranalyse und 2nd-/3rd-Level-Support konnten Störungen reduziert und ein zuverlässiger Betrieb für den Unterricht sichergestellt werden.</p><h3>Hauptleistungen</h3><ul><li>Installations- und Paketierungsanleitungen</li><li>Abnahmetests Dokumentation</li><li>End-User-Guides für Lehrpersonen</li><li>Fehleranalyse und Störungsbehebung</li><li>2nd-/3rd-Level-Support</li><li>Betriebsstabilisierung für Schulen</li></ul><h3>Technologien</h3><p>Windows 10, Educational Software, Application Packaging, Active Directory</p>`,
      sortOrder: "2024-02-20",
      categories: ["all", "enterprise", "education"],
    },
    {
      slug: "bernmobil-clipx",
      title: "BERNMOBIL – CLiPx",
      logo: "/bernmobil-tram-logo.jpg",
      mainImage: "/public-transport-office-it-workplace.jpg",
      shortDescription: "Modernisierung der Arbeitsplatzumgebung bei BERNMOBIL",
      projectUrl: "https://www.bernmobil.ch",
      content: `<h3>Projektübersicht</h3><p>Für BERNMOBIL unterstützte Binso das Projekt „CLiPx", eine moderne Client-Plattform für die Mitarbeitenden. Aufgaben waren die Erstellung von Installations- und Paketierungsanleitungen, Abnahmetests für Fachanwendungen sowie die Koordination des Rollouts inklusive Bereitstellung der Anwendungen. Durch strukturierte Test- und Rolloutprozesse konnte eine stabile, für den ÖV-Betrieb geeignete Arbeitsplatzumgebung bereitgestellt werden.</p><h3>Hauptleistungen</h3><ul><li>Installations- und Paketierungsanleitungen</li><li>Abnahmetests für Fachanwendungen</li><li>Rollout-Koordination</li><li>Anwendungsbereitstellung</li><li>Testing und Qualitätssicherung</li><li>Dokumentation und Support</li></ul><h3>Technologien</h3><p>Windows 10/11, Application Packaging, Client Management Tools, ÖV-spezifische Fachanwendungen</p>`,
      sortOrder: "2024-02-15",
      categories: ["all", "enterprise", "transport"],
    },
    {
      slug: "stadt-bern-clipx",
      title: "Stadt Bern – CLiPx (Informatikdienste)",
      logo: "/city-administration-logo.jpg",
      mainImage: "/city-administration-office-modern-workplace.jpg",
      shortDescription: "Client-Plattform für die Stadtverwaltung Bern",
      projectUrl: "https://www.bern.ch",
      content: `<h3>Projektübersicht</h3><p>Parallel zum Einsatz bei BERNMOBIL war Binso auch im CLiPx-Projekt der Informatikdienste der Stadt Bern tätig. Neben Installationshandbüchern und End-User-Dokumentationen wurden Abnahmetests für Fachanwendungen durchgeführt und der Rollout der neuen Client-Plattform koordiniert. Ziel war eine einheitliche, gut wartbare Arbeitsplatzumgebung für die Stadtverwaltung.</p><h3>Hauptleistungen</h3><ul><li>Installationshandbücher und Dokumentationen</li><li>End-User-Dokumentationen</li><li>Abnahmetests für Fachanwendungen</li><li>Rollout-Koordination</li><li>Einheitliche Client-Plattform</li><li>Support und Qualitätssicherung</li></ul><h3>Technologien</h3><p>Windows 10/11, Application Packaging, Client Management, Verwaltungs-Fachanwendungen</p>`,
      sortOrder: "2024-02-10",
      categories: ["all", "enterprise", "government"],
    },
  ]
}

function parseCSV(csvText: string): PortfolioItem[] {
  // Split the CSV into lines
  const lines = csvText.split("\n").filter((line) => line.trim())

  if (lines.length === 0) {
    return getFallbackPortfolioData()
  }

  // Extract headers (first line)
  const headers = lines[0].split(",").map((header) => header.trim().replace(/^"/, "").replace(/"$/, ""))

  // Map CSV columns to our interface properties
  const columnMap: Record<string, keyof PortfolioItem> = {
    Slug: "slug",
    Title: "title",
    Logo: "logo",
    "Main Image": "mainImage",
    "Short Description": "shortDescription",
    "Project URL": "projectUrl",
    Content: "content",
    "Sort Order": "sortOrder",
  }

  // Parse the data rows
  const items: PortfolioItem[] = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue // Skip empty lines

    // Handle CSV values that might contain commas within quotes
    const values: string[] = []
    let currentValue = ""
    let insideQuotes = false

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j]

      if (char === '"') {
        insideQuotes = !insideQuotes
      } else if (char === "," && !insideQuotes) {
        const trimmedValue = currentValue ? currentValue.trim().replace(/^"/, "").replace(/"$/, "") : ""
        values.push(trimmedValue)
        currentValue = ""
      } else {
        currentValue += char
      }
    }

    // Add the last value
    const lastValue = currentValue ? currentValue.trim().replace(/^"/, "").replace(/"$/, "") : ""
    values.push(lastValue)

    // Create the portfolio item
    const item: Partial<PortfolioItem> = {}

    // Map values to properties
    headers.forEach((header, index) => {
      const key = columnMap[header]
      if (key && index < values.length) {
        item[key] = values[index] || ""
      }
    })

    if (item.slug && item.title) {
      // Add categories based on content or title for filtering
      item.categories = inferCategories(item as PortfolioItem)
      items.push(item as PortfolioItem)
    }
  }

  if (items.length === 0) {
    return getFallbackPortfolioData()
  }

  // Sort by sortOrder
  return items.sort((a, b) => {
    return new Date(b.sortOrder).getTime() - new Date(a.sortOrder).getTime()
  })
}

function inferCategories(item: PortfolioItem): string[] {
  const categories: string[] = ["all"]

  const contentLower = (item.content || "").toLowerCase()
  const titleLower = (item.title || "").toLowerCase()
  const descriptionLower = (item.shortDescription || "").toLowerCase()

  // Check for enterprise/government projects
  if (
    titleLower.includes("bit") ||
    titleLower.includes("bundesanwaltschaft") ||
    titleLower.includes("stadt bern") ||
    titleLower.includes("bernmobil") ||
    contentLower.includes("migration") ||
    contentLower.includes("verwaltung")
  ) {
    categories.push("enterprise")
  }

  // Check for migration projects
  if (contentLower.includes("migration") || titleLower.includes("migration")) {
    categories.push("migration")
  }

  // Check for infrastructure projects
  if (
    contentLower.includes("infrastruktur") ||
    contentLower.includes("infrastructure") ||
    contentLower.includes("server") ||
    contentLower.includes("netzwerk")
  ) {
    categories.push("infrastructure")
  }

  // Check for healthcare projects
  if (
    titleLower.includes("spital") ||
    titleLower.includes("hospital") ||
    contentLower.includes("healthcare") ||
    contentLower.includes("gesundheit")
  ) {
    categories.push("healthcare")
  }

  // Check for education projects
  if (
    titleLower.includes("schul") ||
    titleLower.includes("base4kids") ||
    contentLower.includes("education") ||
    contentLower.includes("lehrperson")
  ) {
    categories.push("education")
  }

  // Check for transport projects
  if (titleLower.includes("bernmobil") || contentLower.includes("öv") || contentLower.includes("transport")) {
    categories.push("transport")
  }

  // Check for government projects
  if (
    titleLower.includes("stadt") ||
    titleLower.includes("bundes") ||
    contentLower.includes("verwaltung") ||
    contentLower.includes("government")
  ) {
    categories.push("government")
  }

  // Check for support projects
  if (contentLower.includes("support") || titleLower.includes("support")) {
    categories.push("support")
  }

  return categories
}

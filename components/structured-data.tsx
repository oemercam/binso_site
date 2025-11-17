'use client'

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://binso.ch/#organization',
        name: 'binso',
        url: 'https://binso.ch',
        logo: {
          '@type': 'ImageObject',
          url: 'https://binso.ch/favicon.jpg',
        },
        description: 'IT-Dienstleistungen für Privat und Geschäfte',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CH',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'kontakt@binso.ch',
          contactType: 'customer service',
          availableLanguage: ['de', 'en'],
        },
        sameAs: [
          'https://www.linkedin.com/company/binso',
          'https://twitter.com/binso',
        ],
        areaServed: {
          '@type': 'Country',
          name: 'Switzerland',
        },
        offers: [
          {
            '@type': 'Offer',
            name: 'Azure M365',
            description: 'Cloud-Lösungen mit Microsoft Azure und M365',
          },
          {
            '@type': 'Offer',
            name: 'Cyber Security',
            description: 'IT-Sicherheit und Datenschutz für Ihr Unternehmen',
          },
          {
            '@type': 'Offer',
            name: 'IT Consulting',
            description: 'Professionelle IT-Beratung und Strategieentwicklung',
          },
          {
            '@type': 'Offer',
            name: 'IT Support',
            description: 'Zuverlässiger Support für Ihre IT-Infrastruktur',
          },
          {
            '@type': 'Offer',
            name: 'Website-Entwicklung',
            description: 'Moderne, responsive Webseiten und Apps',
          },
          {
            '@type': 'Offer',
            name: 'IT-Outsourcing',
            description: 'Qualifizierte IT-Fachkräfte für Ihr Projekt',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://binso.ch/#website',
        url: 'https://binso.ch',
        name: 'binso',
        publisher: {
          '@id': 'https://binso.ch/#organization',
        },
        inLanguage: 'de-CH',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://binso.ch/suche?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://binso.ch/#webpage',
        url: 'https://binso.ch',
        name: 'binso - IT-Dienstleistungen für Privat und Geschäfte',
        description:
          'Wir bieten umfassende IT-Dienstleistungen: Azure M365, Cyber Security, Consulting, Support, Cloud, Modern Workplace, KI & Automation und Website-Entwicklung.',
        isPartOf: {
          '@id': 'https://binso.ch/#website',
        },
        about: {
          '@id': 'https://binso.ch/#organization',
        },
        inLanguage: 'de-CH',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://binso.ch/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://binso.ch',
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

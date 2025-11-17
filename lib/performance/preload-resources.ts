/**
 * Performance-Optimierung: Wichtige Ressourcen preloaden
 */
export function preloadCriticalResources() {
  if (typeof window === "undefined") return

  // Preload wichtige Fonts
  const fontLink = document.createElement("link")
  fontLink.rel = "preload"
  fontLink.as = "font"
  fontLink.type = "font/woff2"
  fontLink.crossOrigin = "anonymous"
  fontLink.href = "/fonts/outfit-variable.woff2"
  document.head.appendChild(fontLink)

  // DNS Prefetch für externe Domains
  const dnsPrefetchDomains = ["https://api.openai.com", "https://vercel.live"]

  dnsPrefetchDomains.forEach((domain) => {
    const link = document.createElement("link")
    link.rel = "dns-prefetch"
    link.href = domain
    document.head.appendChild(link)
  })

  // Preconnect für kritische Origins
  const preconnectDomains = ["https://api.openai.com"]

  preconnectDomains.forEach((domain) => {
    const link = document.createElement("link")
    link.rel = "preconnect"
    link.href = domain
    link.crossOrigin = "anonymous"
    document.head.appendChild(link)
  })
}

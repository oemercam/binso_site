import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://binsoai.ch"

  // Statische Seiten
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/start`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
  ]

  // Dynamische Portfolio-Projekte laden
  try {
    const response = await fetch(`${baseUrl}/api/public/portfolio`, {
      next: { revalidate: 3600 }, // Cache 1 Stunde
    })
    const projects = await response.json()

    const projectPages = projects.map((project: any) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(project.updated_at || project.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    return [...staticPages, ...projectPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticPages
  }
}

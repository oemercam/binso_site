import PortfolioPage from "@/components/portfolio/portfolio-page"
import { fetchPortfolioData } from "@/utils/csv-parser"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio | Binso AI",
  description:
    "Entdecken Sie unsere neuesten Projekte und Fallstudien. Von KI-gestützter Automatisierung bis zu massgeschneiderten E-Commerce-Lösungen – unsere Arbeit hilft Unternehmen, intelligenter zu wachsen.",
}

export default async function Portfolio() {
  const portfolioData = await fetchPortfolioData()

  return <PortfolioPage initialData={portfolioData} />
}

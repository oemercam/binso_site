import { fetchPortfolioData } from "@/utils/csv-parser"
import PortfolioDetailPage from "@/components/portfolio/portfolio-detail"
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"

interface PortfolioDetailProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PortfolioDetailProps, parent: ResolvingMetadata): Promise<Metadata> {
  const portfolioData = await fetchPortfolioData()
  const project = portfolioData.find((item) => item.slug === params.slug)

  if (!project) {
    return {
      title: "Projekt nicht gefunden | Binso GmbH",
      description: "Das angeforderte Projekt konnte nicht gefunden werden.",
    }
  }

  return {
    title: `${project.title} | Binso GmbH Portfolio`,
    description: project.shortDescription,
    openGraph: {
      images: [project.mainImage],
    },
  }
}

export default async function PortfolioDetail({ params }: PortfolioDetailProps) {
  const portfolioData = await fetchPortfolioData()
  const project = portfolioData.find((item) => item.slug === params.slug)

  if (!project) {
    notFound()
  }

  return <PortfolioDetailPage project={project} />
}

export async function generateStaticParams() {
  const portfolioData = await fetchPortfolioData()

  return portfolioData.map((item) => ({
    slug: item.slug,
  }))
}

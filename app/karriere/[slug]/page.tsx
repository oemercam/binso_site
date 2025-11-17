import { jobsData } from "@/lib/jobs-data"
import JobDetailClientPage from "./client-page"

interface JobDetailProps {
  params: {
    slug: string
  }
}

export default function JobDetailPage({ params }: JobDetailProps) {
  return <JobDetailClientPage slug={params.slug} />
}

export async function generateStaticParams() {
  return jobsData.map((job) => ({
    slug: job.slug,
  }))
}

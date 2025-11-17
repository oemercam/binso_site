"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { TestimonialForm } from "@/components/admin/testimonial-form"
import { use } from "react"

type Testimonial = {
  id: string
  client_name: string
  client_role: string
  client_company: string
  testimonial: string
  rating: number
  image_url: string
  project_reference: string
  published: boolean
  sort_order: number
}

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchTestimonial()
  }, [id])

  const fetchTestimonial = async () => {
    const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).single()

    if (!error && data) {
      setTestimonial(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Laden...</p>
      </div>
    )
  }

  if (!testimonial) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Testimonial nicht gefunden</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Testimonial bearbeiten</h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  )
}

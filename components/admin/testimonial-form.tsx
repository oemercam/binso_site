"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Star } from 'lucide-react'
import Link from "next/link"

type Testimonial = {
  id?: string
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

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const [formData, setFormData] = useState<Testimonial>(
    testimonial || {
      client_name: "",
      client_role: "",
      client_company: "",
      testimonial: "",
      rating: 5,
      image_url: "",
      project_reference: "",
      published: true,
      sort_order: 0,
    },
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const testimonialData = {
      ...formData,
      updated_at: new Date().toISOString(),
    }

    try {
      if (testimonial?.id) {
        const { error: updateError } = await supabase.from("testimonials").update(testimonialData).eq("id", testimonial.id)

        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("testimonials").insert([testimonialData])

        if (insertError) throw insertError
      }

      router.push("/admin/dashboard/testimonials")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Kundeninformationen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_name">Kundenname *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_role">Position</Label>
              <Input
                id="client_role"
                value={formData.client_role}
                onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                placeholder="z.B. CEO, Geschäftsführer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_company">Firma</Label>
            <Input
              id="client_company"
              value={formData.client_company}
              onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
              placeholder="Firmenname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Profilbild URL</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/profile.jpg"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testimonial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testimonial">Bewertungstext *</Label>
            <Textarea
              id="testimonial"
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
              placeholder="Was sagt der Kunde über Ihre Arbeit?"
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Bewertung (Sterne)</Label>
            <div className="flex items-center gap-4">
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                className="w-24"
              />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_reference">Projektbezug</Label>
            <Input
              id="project_reference"
              value={formData.project_reference}
              onChange={(e) => setFormData({ ...formData, project_reference: e.target.value })}
              placeholder="z.B. E-Commerce Website"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Einstellungen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sort_order">Sortierung</Label>
            <Input
              id="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              placeholder="0"
            />
            <p className="text-sm text-gray-600">Niedrigere Zahlen erscheinen zuerst</p>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="published">Veröffentlichen</Label>
              <p className="text-sm text-gray-600">Testimonial auf der Webseite anzeigen</p>
            </div>
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard/testimonials">
          <Button type="button" variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </Button>
        </Link>
        <Button type="submit" disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Wird gespeichert..." : "Speichern"}
        </Button>
      </div>
    </form>
  )
}

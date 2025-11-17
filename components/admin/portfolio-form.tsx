"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

type Project = {
  id?: string
  slug: string
  title: string
  category: string
  description: string
  long_description: string
  image_url: string
  client: string
  date: string
  technologies: string[]
  website_url: string
  published: boolean
}

export function PortfolioForm({ project }: { project?: Project }) {
  const [formData, setFormData] = useState<Project>(
    project || {
      slug: "",
      title: "",
      category: "",
      description: "",
      long_description: "",
      image_url: "",
      client: "",
      date: "",
      technologies: [],
      website_url: "",
      published: true,
    },
  )
  const [technologies, setTechnologies] = useState(project?.technologies?.join(", ") || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const projectData = {
      ...formData,
      technologies: technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      updated_at: new Date().toISOString(),
    }

    try {
      if (project?.id) {
        // Update
        const { error: updateError } = await supabase
          .from("portfolio_projects")
          .update(projectData)
          .eq("id", project.id)

        if (updateError) throw updateError
      } else {
        // Create
        const { error: insertError } = await supabase.from("portfolio_projects").insert([projectData])

        if (insertError) throw insertError
      }

      router.push("/admin/dashboard/portfolio")
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
          <CardTitle>Grundinformationen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Projekttitel *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL-Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="projekt-name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Kategorie *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="z.B. KI-Chatbot, E-Commerce"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Kunde</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Kundenname"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Kurzbeschreibung *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Kurze Projektbeschreibung für die Übersicht"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="long_description">Detaillierte Beschreibung</Label>
            <Textarea
              id="long_description"
              value={formData.long_description}
              onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
              placeholder="Ausführliche Projektbeschreibung für die Detailseite"
              rows={6}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medien & Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image_url">Bild-URL *</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">Projekt-URL</Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://projekt-website.ch"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zusätzliche Informationen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Projektdatum</Label>
            <Input
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="z.B. Januar 2024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologien (durch Komma getrennt)</Label>
            <Input
              id="technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="Next.js, React, TypeScript, Supabase"
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="published">Veröffentlichen</Label>
              <p className="text-sm text-gray-600">Projekt auf der Webseite anzeigen</p>
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
        <Link href="/admin/dashboard/portfolio">
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

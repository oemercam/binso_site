"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import Link from "next/link"

type Service = {
  id?: string
  slug: string
  title: string
  icon: string
  short_description: string
  features: { title: string; description: string }[]
  benefits: { title: string; description: string }[]
  process_steps: { step: number; title: string; description: string }[]
  use_cases: string[]
  price_from: number | null
  price_note: string
  order_index: number
  published: boolean
}

export function ServiceForm({ service }: { service?: Service }) {
  const [formData, setFormData] = useState<Service>(
    service || {
      slug: "",
      title: "",
      icon: "Sparkles",
      short_description: "",
      features: [],
      benefits: [],
      process_steps: [],
      use_cases: [],
      price_from: null,
      price_note: "",
      order_index: 0,
      published: true,
    },
  )
  const [useCases, setUseCases] = useState(service?.use_cases?.join(", ") || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const serviceData = {
      ...formData,
      use_cases: useCases
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean),
      updated_at: new Date().toISOString(),
    }

    try {
      if (service?.id) {
        const { error: updateError } = await supabase.from("services").update(serviceData).eq("id", service.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("services").insert([serviceData])
        if (insertError) throw insertError
      }

      router.push("/admin/dashboard/services")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten")
      setLoading(false)
    }
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { title: "", description: "" }],
    })
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    })
  }

  const updateFeature = (index: number, field: "title" | "description", value: string) => {
    const updated = [...formData.features]
    updated[index][field] = value
    setFormData({ ...formData, features: updated })
  }

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData.benefits, { title: "", description: "" }],
    })
  }

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    })
  }

  const updateBenefit = (index: number, field: "title" | "description", value: string) => {
    const updated = [...formData.benefits]
    updated[index][field] = value
    setFormData({ ...formData, benefits: updated })
  }

  const addProcessStep = () => {
    setFormData({
      ...formData,
      process_steps: [
        ...formData.process_steps,
        { step: formData.process_steps.length + 1, title: "", description: "" },
      ],
    })
  }

  const removeProcessStep = (index: number) => {
    const updated = formData.process_steps.filter((_, i) => i !== index)
    // Renumber steps
    updated.forEach((step, i) => {
      step.step = i + 1
    })
    setFormData({ ...formData, process_steps: updated })
  }

  const updateProcessStep = (index: number, field: "title" | "description", value: string) => {
    const updated = [...formData.process_steps]
    updated[index][field] = value
    setFormData({ ...formData, process_steps: updated })
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
              <Label htmlFor="title">Service-Titel *</Label>
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
                placeholder="service-name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Lucide Name)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="Sparkles"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order_index">Sortierung</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description">Kurzbeschreibung *</Label>
            <Textarea
              id="short_description"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="use_cases">Anwendungsfälle (durch Komma getrennt)</Label>
            <Input
              id="use_cases"
              value={useCases}
              onChange={(e) => setUseCases(e.target.value)}
              placeholder="E-Commerce, Kundensupport, Marketing"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Features</CardTitle>
            <Button type="button" onClick={addFeature} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Feature hinzufügen
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.features.map((feature, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label>Feature {index + 1}</Label>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Feature-Titel"
                value={feature.title}
                onChange={(e) => updateFeature(index, "title", e.target.value)}
              />
              <Textarea
                placeholder="Feature-Beschreibung"
                value={feature.description}
                onChange={(e) => updateFeature(index, "description", e.target.value)}
                rows={2}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Vorteile</CardTitle>
            <Button type="button" onClick={addBenefit} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Vorteil hinzufügen
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.benefits.map((benefit, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label>Vorteil {index + 1}</Label>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeBenefit(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Vorteil-Titel"
                value={benefit.title}
                onChange={(e) => updateBenefit(index, "title", e.target.value)}
              />
              <Textarea
                placeholder="Vorteil-Beschreibung"
                value={benefit.description}
                onChange={(e) => updateBenefit(index, "description", e.target.value)}
                rows={2}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prozess-Schritte</CardTitle>
            <Button type="button" onClick={addProcessStep} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Schritt hinzufügen
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.process_steps.map((step, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label>Schritt {step.step}</Label>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeProcessStep(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Schritt-Titel"
                value={step.title}
                onChange={(e) => updateProcessStep(index, "title", e.target.value)}
              />
              <Textarea
                placeholder="Schritt-Beschreibung"
                value={step.description}
                onChange={(e) => updateProcessStep(index, "description", e.target.value)}
                rows={2}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preise & Optionen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price_from">Preis ab (CHF)</Label>
            <Input
              id="price_from"
              type="number"
              value={formData.price_from || ""}
              onChange={(e) => setFormData({ ...formData, price_from: e.target.value ? parseInt(e.target.value) : null })}
              placeholder="z.B. 5000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_note">Preis-Hinweis</Label>
            <Textarea
              id="price_note"
              value={formData.price_note}
              onChange={(e) => setFormData({ ...formData, price_note: e.target.value })}
              placeholder="z.B. Individuelle Projektpreise auf Anfrage"
              rows={2}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="published">Veröffentlichen</Label>
              <p className="text-sm text-gray-600">Service auf der Webseite anzeigen</p>
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
        <Link href="/admin/dashboard/services">
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

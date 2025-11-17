"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Save } from 'lucide-react'

type Media = {
  id: string
  title: string
  description: string
  alt_text: string
  category: string
}

type MediaEditDialogProps = {
  media: Media
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateComplete: () => void
}

export function MediaEditDialog({ media, open, onOpenChange, onUpdateComplete }: MediaEditDialogProps) {
  const [formData, setFormData] = useState({
    title: media.title || "",
    description: media.description || "",
    alt_text: media.alt_text || "",
    category: media.category || "",
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const supabase = createClient()

  const handleSave = async () => {
    setSaving(true)
    setError("")

    try {
      const { error: updateError } = await supabase
        .from("media")
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", media.id)

      if (updateError) throw updateError

      onUpdateComplete()
      onOpenChange(false)
    } catch (err: any) {
      setError(err.message || "Aktualisierung fehlgeschlagen")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Datei bearbeiten</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit_title">Titel</Label>
            <Input
              id="edit_title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_description">Beschreibung</Label>
            <Textarea
              id="edit_description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_alt_text">Alt-Text</Label>
            <Input
              id="edit_alt_text"
              value={formData.alt_text}
              onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_category">Kategorie</Label>
            <Input
              id="edit_category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Wird gespeichert..." : "Speichern"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

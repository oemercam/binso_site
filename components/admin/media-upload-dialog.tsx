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
import { Upload } from 'lucide-react'

type MediaUploadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadComplete: () => void
}

export function MediaUploadDialog({ open, onOpenChange, onUploadComplete }: MediaUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [altText, setAltText] = useState("")
  const [category, setCategory] = useState("")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const supabase = createClient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      if (!title) {
        setTitle(selectedFile.name.split('.')[0])
      }
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Bitte wählen Sie eine Datei aus")
      return
    }

    setUploading(true)
    setError("")

    try {
      // Note: In a real implementation, you would upload to Vercel Blob or another storage
      // For now, we'll create a placeholder entry
      const mediaData = {
        title: title || file.name,
        description,
        filename: file.name,
        original_filename: file.name,
        file_path: `/uploads/${file.name}`, // Placeholder
        file_type: file.type.split('/')[0],
        mime_type: file.type,
        file_size: file.size,
        alt_text: altText,
        category,
        uploaded_by: "Admin",
      }

      const { error: insertError } = await supabase.from("media").insert([mediaData])

      if (insertError) throw insertError

      onUploadComplete()
      onOpenChange(false)
      
      // Reset form
      setFile(null)
      setTitle("")
      setDescription("")
      setAltText("")
      setCategory("")
    } catch (err: any) {
      setError(err.message || "Upload fehlgeschlagen")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Datei hochladen</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Datei *</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept="image/*,video/*,application/pdf"
            />
          </div>

          {file && (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Titel</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Datei-Titel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Beschreibung der Datei"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt_text">Alt-Text (für Bilder)</Label>
                <Input
                  id="alt_text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Alternativer Text für Screenreader"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategorie</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="z.B. Blog, Portfolio, Team"
                />
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleUpload} disabled={!file || uploading}>
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Wird hochgeladen..." : "Hochladen"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

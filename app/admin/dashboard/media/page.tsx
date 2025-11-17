"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Search, Grid3x3, List } from 'lucide-react'
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { MediaUploadDialog } from "@/components/admin/media-upload-dialog"
import { MediaEditDialog } from "@/components/admin/media-edit-dialog"

type Media = {
  id: string
  title: string
  description: string
  filename: string
  original_filename: string
  file_path: string
  file_type: string
  mime_type: string
  file_size: number
  alt_text: string
  category: string
  uploaded_by: string
  created_at: string
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<Media[]>([])
  const [filteredMedia, setFilteredMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [editingMedia, setEditingMedia] = useState<Media | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchMedia()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = media.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.filename?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredMedia(filtered)
    } else {
      setFilteredMedia(media)
    }
  }, [searchQuery, media])

  const fetchMedia = async () => {
    const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false })

    if (!error && data) {
      setMedia(data)
      setFilteredMedia(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Möchten Sie diese Datei wirklich löschen?")) return

    const { error } = await supabase.from("media").delete().eq("id", id)

    if (!error) {
      fetchMedia()
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Laden...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Datei hochladen
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredMedia.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-600">
              {searchQuery ? 'Keine Dateien gefunden.' : 'Noch keine Dateien hochgeladen.'}
            </p>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="relative aspect-square bg-gray-100">
                {item.mime_type?.startsWith('image/') ? (
                  <Image
                    src={item.file_path || '/placeholder.svg'}
                    alt={item.alt_text || item.title || ''}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-4xl mb-2">📄</p>
                      <p className="text-xs text-gray-600">{item.file_type?.toUpperCase()}</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Button size="sm" variant="secondary" onClick={() => setEditingMedia(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-medium text-sm truncate">{item.title || item.filename}</p>
                <p className="text-xs text-gray-600">{formatFileSize(item.file_size || 0)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredMedia.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 relative overflow-hidden">
                    {item.mime_type?.startsWith('image/') ? (
                      <Image
                        src={item.file_path || '/placeholder.svg'}
                        alt={item.alt_text || item.title || ''}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-2xl">📄</p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title || item.filename}</p>
                    <p className="text-sm text-gray-600 truncate">{item.description}</p>
                    <div className="flex gap-4 text-xs text-gray-600 mt-1">
                      <span>{item.file_type?.toUpperCase()}</span>
                      <span>{formatFileSize(item.file_size || 0)}</span>
                      <span>{new Date(item.created_at).toLocaleDateString('de-DE')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingMedia(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <MediaUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUploadComplete={fetchMedia}
      />

      {editingMedia && (
        <MediaEditDialog
          media={editingMedia}
          open={!!editingMedia}
          onOpenChange={(open) => !open && setEditingMedia(null)}
          onUpdateComplete={fetchMedia}
        />
      )}
    </div>
  )
}

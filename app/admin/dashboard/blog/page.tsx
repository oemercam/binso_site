"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  featured_image: string
  status: string
  views: number
  published_at: string
  created_at: string
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
  }, [filter])

  const fetchPosts = async () => {
    let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

    if (filter === 'published') {
      query = query.eq('status', 'published')
    } else if (filter === 'draft') {
      query = query.eq('status', 'draft')
    }

    const { data, error } = await query

    if (error) {
      if (error.message && error.message.includes("infinite recursion")) {
        router.push("/admin/dashboard/rls-fix-required")
        return
      }
      setError(error.message)
    }

    if (!error && data) {
      setPosts(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Möchten Sie diesen Blog-Post wirklich löschen?")) return

    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (!error) {
      fetchPosts()
    }
  }

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    const { error } = await supabase
      .from("blog_posts")
      .update({ 
        status: newStatus,
        published_at: newStatus === 'published' ? new Date().toISOString() : null
      })
      .eq("id", id)

    if (!error) {
      fetchPosts()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Laden...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">Fehler beim Laden</h3>
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Link href="/admin/dashboard/blog/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Neuer Beitrag
          </Button>
        </Link>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Alle
        </Button>
        <Button
          variant={filter === 'published' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('published')}
        >
          Veröffentlicht
        </Button>
        <Button
          variant={filter === 'draft' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('draft')}
        >
          Entwürfe
        </Button>
      </div>

      <div className="grid gap-6">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-600">
                {filter === 'all' ? 'Noch keine Blog-Posts vorhanden.' : `Keine ${filter === 'published' ? 'veröffentlichten' : 'Entwurf'}-Posts vorhanden.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      <span>Autor: {post.author}</span>
                      {post.category && <span>Kategorie: {post.category}</span>}
                      <span>Aufrufe: {post.views || 0}</span>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {post.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.status === 'published' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {post.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                      </span>
                      <span className="text-xs text-gray-600">
                        {new Date(post.created_at).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => toggleStatus(post.id, post.status)}>
                      {post.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Link href={`/admin/dashboard/blog/${post.id}`}>
                      <Button size="sm" variant="outline">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

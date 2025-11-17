"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import dynamic from "next/dynamic"
import { use } from "react"

const BlogPostForm = dynamic(
  () => import("@/components/admin/blog-post-form").then((mod) => ({ default: mod.BlogPostForm })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    ),
  }
)

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
  meta_title: string
  meta_description: string
  status: string
  sort_order: number
}

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

    if (!error && data) {
      setPost(data)
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

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Blog-Post nicht gefunden</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blog-Beitrag bearbeiten</h1>
      <BlogPostForm post={post} />
    </div>
  )
}

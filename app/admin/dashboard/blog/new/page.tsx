import dynamic from "next/dynamic"

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

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Neuer Blog-Beitrag</h1>
      <BlogPostForm />
    </div>
  )
}

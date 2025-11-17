"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react"

type FAQ = {
  id: string
  category: string
  question: string
  published: boolean
  order_index: number
}

export function FAQTable({ faqs }: { faqs: FAQ[] }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    setLoading(true)
    await supabase.from("faqs").update({ published: !currentStatus }).eq("id", id)
    router.refresh()
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("FAQ-Eintrag wirklich löschen?")) return
    setLoading(true)
    await supabase.from("faqs").delete().eq("id", id)
    router.refresh()
    setLoading(false)
  }

  const groupedFAQs = faqs.reduce(
    (acc, faq) => {
      if (!acc[faq.category]) acc[faq.category] = []
      acc[faq.category].push(faq)
      return acc
    },
    {} as Record<string, FAQ[]>,
  )

  if (faqs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-600">Noch keine FAQ-Einträge vorhanden.</p>
        <Link href="/admin/dashboard/faqs/new">
          <Button className="mt-4">Ersten Eintrag erstellen</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
        <div key={category} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-900">{category}</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Nr</TableHead>
                <TableHead>Frage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryFAQs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-mono text-sm">{faq.order_index}</TableCell>
                  <TableCell className="font-medium">{faq.question}</TableCell>
                  <TableCell>
                    {faq.published ? (
                      <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
                    ) : (
                      <Badge variant="outline">Entwurf</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTogglePublished(faq.id, faq.published)}
                        disabled={loading}
                      >
                        {faq.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Link href={`/admin/dashboard/faqs/${faq.id}`}>
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(faq.id)} disabled={loading}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}

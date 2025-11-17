"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'

type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  email: string
  linkedin: string
  image_url: string
  published: boolean
  sort_order: number
  created_at: string
}

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase.from("team_members").select("*").order("sort_order", { ascending: true })

    if (error) {
      if (error.message && error.message.includes("infinite recursion")) {
        router.push("/admin/dashboard/rls-fix-required")
        return
      }
      setError(error.message)
    }

    if (!error && data) {
      setTeamMembers(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Möchten Sie dieses Team-Mitglied wirklich löschen?")) return

    const { error } = await supabase.from("team_members").delete().eq("id", id)

    if (!error) {
      fetchTeamMembers()
    }
  }

  const togglePublished = async (id: string, published: boolean) => {
    const { error } = await supabase.from("team_members").update({ published: !published }).eq("id", id)

    if (!error) {
      fetchTeamMembers()
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
        <h1 className="text-3xl font-bold">Team-Mitglieder</h1>
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
        <h1 className="text-3xl font-bold">Team-Mitglieder</h1>
        <Link href="/admin/dashboard/team/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Neues Mitglied
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {teamMembers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-600">Noch keine Team-Mitglieder vorhanden.</p>
            </CardContent>
          </Card>
        ) : (
          teamMembers.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {member.image_url && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={member.image_url || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-gray-600 mt-1">{member.role}</p>
                        {member.bio && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{member.bio}</p>}
                        <div className="flex gap-4 mt-3 text-sm text-gray-600">
                          {member.email && <span>{member.email}</span>}
                          {member.linkedin && <span>LinkedIn</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => togglePublished(member.id, member.published)}
                        >
                          {member.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                        <Link href={`/admin/dashboard/team/${member.id}`}>
                          <Button size="sm" variant="outline">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(member.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {member.published ? "Veröffentlicht" : "Entwurf"}
                      </span>
                    </div>
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

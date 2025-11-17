"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import dynamic from "next/dynamic"
import { use } from "react"

const TeamMemberForm = dynamic(
  () => import("@/components/admin/team-member-form").then((mod) => ({ default: mod.TeamMemberForm })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    ),
  }
)

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
}

export default function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchTeamMember()
  }, [id])

  const fetchTeamMember = async () => {
    const { data, error } = await supabase.from("team_members").select("*").eq("id", id).single()

    if (!error && data) {
      setTeamMember(data)
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

  if (!teamMember) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Team-Mitglied nicht gefunden</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Team-Mitglied bearbeiten</h1>
      <TeamMemberForm teamMember={teamMember} />
    </div>
  )
}
